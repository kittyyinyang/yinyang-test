// _anchor_t0.js — 对 ts=00:00 的 evidence 用语料库做文本锚定，输出可修正清单
// 判据：evidence.text 去标点后取「最长连续公共子串」在目标 BV 语料句中匹配，
//       要求 LCS>=8 字（中文 8 字足够排除偶然），取命中句 sec 作为真实时间点。
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

console.error('[load] 加载 33MB 语料…');
const corpus = {};
{ const code = fs.readFileSync(path.join(DATA, 'corpus_sents.js'), 'utf-8');
  const c = {}; vm.createContext(c);
  vm.runInContext(code.replace(/var\s+CORPUS_SENTS\s*=/, 'globalThis.C = '), c);
  for (const s of (c.C || [])) { (corpus[s.bv] = corpus[s.bv] || []).push({ sec: s.sec, ts: s.ts, text: s.text }); } }
for (const k in corpus) corpus[k].sort((a, b) => a.sec - b.sec);
console.error('[load] 语料 BV 数=' + Object.keys(corpus).length);

const norm = s => String(s || '').replace(/[\s，。、！？；：""''（）《》…—\-·,.!?;:()\[\]]/g, '');
function lcs(a, b) {
  const n = a.length, m = b.length;
  if (!n || !m) return 0;
  let prev = new Uint16Array(m + 1), cur = new Uint16Array(m + 1), best = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) { cur[j] = prev[j - 1] + 1; if (cur[j] > best) best = cur[j]; } else cur[j] = 0;
    }
    [prev, cur] = [cur, prev]; cur.fill(0);
  }
  return best;
}
const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

let t0 = 0, fixed = 0, weak = 0, noCorpus = 0;
const out = [];
for (const c of cards) {
  if (!Array.isArray(c.evidence)) continue;
  for (let i = 0; i < c.evidence.length; i++) {
    const e = c.evidence[i];
    if (!/^[?&]t=0$/.test(('?' + (e.link || '').split('?')[1]) || '') && !/\?t=0(&|$)/.test(e.link || '') && !/&t=0(&|$)/.test(e.link || '')) continue;
    t0++;
    const bv = (/video\/(BV[\w]+)/.exec(e.link || '') || [])[1] || '';
    const list = corpus[bv];
    if (!list || !list.length) { noCorpus++; out.push({ qa: c.qaId, i, bv, sec: null, conf: 'NO_CORPUS', txt: (e.text || '').slice(0, 40) }); continue; }
    const q = norm(e.text).slice(0, 40);
    let bestS = null, bestL = 0;
    for (const s of list) {
      const L = lcs(q, norm(s.text));
      if (L > bestL) { bestL = L; bestS = s; }
    }
    if (bestL >= 8 && bestS) { fixed++; out.push({ qa: c.qaId, i, bv, sec: bestS.sec, ts: fmt(bestS.sec), conf: 'FIXABLE', lcs: bestL, txt: (e.text || '').slice(0, 40), hit: bestS.text.slice(0, 40) }); }
    else { weak++; out.push({ qa: c.qaId, i, bv, sec: null, conf: 'WEAK', lcs: bestL, txt: (e.text || '').slice(0, 40) }); }
  }
}
console.log('\n=== ts=00:00 证据锚定结果 ===');
console.log('总数:', t0, '| 可自动修正(LCS>=8):', fixed, '| 低置信需人工:', weak, '| 语料缺失:', noCorpus);
console.log('\n--- FIXABLE 前 20 条 ---');
out.filter(o => o.conf === 'FIXABLE').slice(0, 20).forEach(o => console.log(`  ${o.qa} #${o.i} → ${o.ts}(t=${o.sec}) lcs=${o.lcs}\n     证据: ${o.txt}\n     语料: ${o.hit}`));
console.log('\n--- WEAK 需人工 前 15 条 ---');
out.filter(o => o.conf === 'WEAK').slice(0, 15).forEach(o => console.log(`  ${o.qa} #${o.i} ${o.bv} lcs=${o.lcs} | ${o.txt}`));
fs.writeFileSync(path.join(__dirname, '_t0_anchor.json'), JSON.stringify(out, null, 1), 'utf-8');
console.log('\n完整清单: scripts/_t0_anchor.json');
