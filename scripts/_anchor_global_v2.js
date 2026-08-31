// _anchor_global.js — 全量 491 条 evidence 在【全部 659 个 BV 语料】中做全局锚定
// 识别两类问题：
//   CROSS_BV : 证据原话实际来自另一个视频（点开 = 新视频开头）← 用户报的核心症状
//   OFFSET   : 视频对，但时间点偏差 > 8s
// 加速：bigram 倒排索引筛候选 BV，再在候选内做 LCS 精匹配
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const DATA = path.join(__dirname, '..', 'data');
const FILES = ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js','qa_core5.js','qa_core6.js','qa_core7.js','qa_core8.js','qa_core9.js','qa_core10.js','qa_core11.js','qa_core12.js','qa_clips_new.js','data_qa.js'];
const VARS = ['QA_CORE','QA_CORE2','QA_CORE3','QA_CORE4','QA_CORE5','QA_CORE6','QA_CORE7','QA_CORE8','QA_CORE9','QA_CORE10','QA_CORE11','QA_CORE12','QA_CLIPS_NEW','QA_DATA'];

const sb = {}; vm.createContext(sb);
for (const fn of FILES) {
  const p = path.join(DATA, fn); if (!fs.existsSync(p)) continue;
  const code = fs.readFileSync(p, 'utf-8').replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA)\s*=/g, 'globalThis.$1 =');
  try { vm.runInContext(code, sb, { filename: fn }); } catch (e) {}
}
const cards = []; for (const v of VARS) if (Array.isArray(sb[v])) cards.push(...sb[v]);

console.error('[load] 加载语料…');
const corpus = {};
{ const code = fs.readFileSync(path.join(DATA, 'corpus_sents.js'), 'utf-8');
  const c = {}; vm.createContext(c);
  vm.runInContext(code.replace(/var\s+CORPUS_SENTS\s*=/, 'globalThis.C = '), c);
  for (const s of (c.C || [])) { (corpus[s.bv] = corpus[s.bv] || []).push({ sec: s.sec, ts: s.ts, text: s.text }); } }
for (const k in corpus) corpus[k].sort((a, b) => a.sec - b.sec);
console.error('[load] BV=' + Object.keys(corpus).length);

const norm = s => String(s || '').replace(/[\s，。、！？；：""''（）《》…—\-·,.!?;:()\[\]]/g, '');
const bigrams = s => { const a = []; for (let i = 0; i + 2 <= s.length; i++) a.push(s.substr(i, 2)); return a; };
// 倒排：bigram -> Set(bv)
const inv = new Map();
let totalSent = 0;
for (const bv in corpus) for (const s of corpus[bv]) {
  totalSent++;
  const n = norm(s.text); const seen = new Set();
  for (const g of bigrams(n)) { if (seen.has(g)) continue; seen.add(g);
    let set = inv.get(g); if (!set) { set = new Set(); inv.set(g, set); } set.add(bv); }
}
console.error('[load] 句数=' + totalSent + ' bigram=' + inv.size);

function lcs(a, b) {
  const n = a.length, m = b.length; if (!n || !m) return 0;
  let prev = new Uint16Array(m + 1), cur = new Uint16Array(m + 1), best = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) { if (a[i - 1] === b[j - 1]) { cur[j] = prev[j - 1] + 1; if (cur[j] > best) best = cur[j]; } else cur[j] = 0; }
    const t = prev; prev = cur; cur = t; cur.fill(0);
  }
  return best;
}
const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

let n = 0, ok = 0, cross = 0, offset = 0, weak = 0;
const rows = [];
for (const c of cards) {
  const EV = Array.isArray(c.evidence) ? c.evidence : (Array.isArray(c.answer) ? c.answer : null);
  const field = Array.isArray(c.evidence) ? 'evidence' : (Array.isArray(c.answer) ? 'answer' : '');
  if (!EV) continue;
  for (let i = 0; i < EV.length; i++) {
    const e = EV[i]; n++;
    const link = e.link || '';
    const declBv = (/video\/(BV[\w]+)/.exec(link) || [])[1] || '';
    const declT = +((/[?&]t=(\d+)/.exec(link) || [])[1] ?? -1);
    const q = norm(e.text).slice(0, 44);
    if (!q) { weak++; continue; }
    // 候选 BV：bigram 命中数 top
    const score = new Map();
    for (const g of new Set(bigrams(q))) { const set = inv.get(g); if (set) for (const bv of set) score.set(bv, (score.get(bv) || 0) + 1); }
    const cands = [...score.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(x => x[0]);
    if (!cands.includes(declBv) && declBv && corpus[declBv]) cands.push(declBv);
    let best = null;
    for (const bv of cands) for (const s of (corpus[bv] || [])) {
      const L = lcs(q, norm(s.text));
      if (!best || L > best.L) best = { L, bv, sec: s.sec, text: s.text };
    }
    if (!best || best.L < 8) { weak++; rows.push({ qa: c.qaId, i, field, kind: 'WEAK', declBv, declT, L: best ? best.L : 0, txt: (e.text || '').slice(0, 36) }); continue; }
    const inDecl = corpus[declBv] ? Math.max(...corpus[declBv].map(s => lcs(q, norm(s.text)))) : 0;
    if (best.bv !== declBv && inDecl < best.L * 0.8) {
      cross++; rows.push({ qa: c.qaId, i, field, kind: 'CROSS_BV', declBv, declT, bestBv: best.bv, bestSec: best.sec, bestTs: fmt(best.sec), L: best.L, inDecl, txt: (e.text || '').slice(0, 36), hit: best.text.slice(0, 36) });
    } else if (Math.abs(best.sec - declT) > 8) {
      offset++; rows.push({ qa: c.qaId, i, field, kind: 'OFFSET', declBv, declT, bestBv: best.bv, bestSec: best.sec, bestTs: fmt(best.sec), L: best.L, txt: (e.text || '').slice(0, 36), hit: best.text.slice(0, 36) });
    } else ok++;
  }
}
console.log('\n=== 全量 evidence 全局锚定 ===');
console.log('总数', n, '| 一致', ok, '| 跨视频错配 CROSS_BV', cross, '| 时间点偏差 OFFSET', offset, '| 低置信 WEAK', weak);
const by = {}; rows.forEach(r => by[r.kind] = (by[r.kind] || 0) + 1);
console.log('\n--- CROSS_BV 明细（点开 = 新视频）---');
rows.filter(r => r.kind === 'CROSS_BV').slice(0, 30).forEach(r => console.log(`  ${r.qa} #${r.i}\n     声明 ${r.declBv}?t=${r.declT}  →  实际 ${r.bestBv}?t=${r.bestSec}(${r.bestTs}) lcs=${r.L} 本视频最高=${r.inDecl}\n     证据: ${r.txt}\n     语料: ${r.hit}`));
console.log('\n--- OFFSET 明细（时间点偏差 >8s）前 25 ---');
rows.filter(r => r.kind === 'OFFSET').slice(0, 25).forEach(r => console.log(`  ${r.qa} #${r.i} ${r.declBv} 声明t=${r.declT} → 实际 ${r.bestTs}(${r.bestSec}) lcs=${r.L}\n     证据: ${r.txt}`));
fs.writeFileSync(path.join(__dirname, '_global_anchor_v2.json'), JSON.stringify({ stat: { n, ok, cross, offset, weak }, rows }, null, 1), 'utf-8');
console.log('\n完整清单: scripts/_global_anchor_v2.json');
