// _classify_manual.js — 对 _ev_fix_applied.json 的 manual 条目做 A/B/C 归类
// 方法：全语料 10 字归一化子串窗口索引（stride 1），证据首句前 10~14 字精确命中 → A 类（对齐建议）
//       未命中但同视频 LCS>=6 → B 类（润色改写，跳转大体正确或需改卡文）
//       全无线索 → C 类（编造嫌疑，交用户裁决）
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const DATA = path.join(__dirname, '..', 'data');
const FILES = ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js','qa_core5.js','qa_core6.js','qa_core7.js','qa_core8.js','qa_core9.js','qa_core10.js','qa_core11.js','qa_core12.js','qa_clips_new.js','data_qa.js'];
const VARS = ['QA_CORE','QA_CORE2','QA_CORE3','QA_CORE4','QA_CORE5','QA_CORE6','QA_CORE7','QA_CORE8','QA_CORE9','QA_CORE10','QA_CORE11','QA_CORE12','QA_CLIPS_NEW','QA_DATA'];

const rep = JSON.parse(fs.readFileSync(path.join(__dirname, '_ev_fix_applied.json'), 'utf8'));
const manual = rep.manual;
console.log('manual 条数:', manual.length);

console.error('[load] 语料…');
const corpus = {};
{ const code = fs.readFileSync(path.join(DATA, 'corpus_sents.js'), 'utf-8');
  const c = {}; vm.createContext(c);
  vm.runInContext(code.replace(/var\s+CORPUS_SENTS\s*=/, 'globalThis.C = '), c);
  for (const s of (c.C || [])) { (corpus[s.bv] = corpus[s.bv] || []).push({ sec: s.sec, text: s.text }); } }

const norm = s => String(s || '').replace(/[\s，。、！？；：""''（）《》…—\-·,.!?;:()\[\]]/g, '').toLowerCase();

// 10 字窗口索引
console.error('[load] 建 10 字窗口索引…');
const W = 10;
const idx = new Map();   // window -> [{bv, sec}]
for (const bv in corpus) for (const s of corpus[bv]) {
  const n = norm(s.text);
  for (let i = 0; i + W <= n.length; i++) {
    const w = n.substr(i, W);
    let a = idx.get(w); if (!a) { a = []; idx.set(w, a); }
    a.push({ bv, sec: s.sec });
  }
}
console.error('[load] 窗口数:', idx.size);

function lcs(a, b) {
  const n = a.length, m = b.length; if (!n || !m) return 0;
  let prev = new Uint16Array(m + 1), cur = new Uint16Array(m + 1), best = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) { if (a[i - 1] === b[j - 1]) { cur[j] = prev[j - 1] + 1; if (cur[j] > best) best = cur[j]; } else cur[j] = 0; }
    [prev, cur] = [cur, prev]; cur.fill(0);
  }
  return best;
}
const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

let A = 0, B = 0, C = 0;
const out = [];
for (const r of manual) {
  const q = norm(r.txt).slice(0, 14);
  let cls = 'C', sug = null, sameLcs = 0;
  // A 类：首 10 字窗口精确命中
  if (q.length >= W) {
    const wins = [q.slice(0, W)];
    if (q.length >= 14) wins.push(q.slice(4, 4 + W));
    let hit = null;
    for (const w of wins) {
      const arr = idx.get(w);
      if (arr && arr.length) {
        // 多命中取与声明 bv 相同的优先
        hit = arr.find(h => h.bv === r.declBv) || arr[0];
        break;
      }
    }
    if (hit) { cls = 'A'; sug = { bv: hit.bv, sec: hit.sec, ts: fmt(hit.sec) }; A++; }
  }
  if (cls !== 'A') {
    // B 类：同视频内最高 LCS >= 6
    const list = corpus[r.declBv] || [];
    const qn = norm(r.txt).slice(0, 40);
    let best = 0;
    for (const s of list) { const L = lcs(qn, norm(s.text)); if (L > best) best = L; }
    sameLcs = best;
    if (best >= 6) { cls = 'B'; B++; } else C++;
  }
  out.push({ ...r, cls, sug, sameLcs });
}
console.log('\n=== 126 条人工佐证归类 ===');
console.log('A 可对齐(全语料精确命中):', A, '| B 润色改写(同视频近似):', B, '| C 编造嫌疑/无线索:', C);
console.log('\n--- A 类样例(前 12) ---');
out.filter(o => o.cls === 'A').slice(0, 12).forEach(o => console.log(`  ${o.qa}#${o.i} 声明${o.declBv}?t=${o.declT} → 建议 ${o.sug.bv}?t=${o.sug.sec}(${o.sug.ts}) | ${o.txt.slice(0, 28)}`));
console.log('\n--- C 类全部(需你裁决) ---');
out.filter(o => o.cls === 'C').forEach(o => console.log(`  ${o.qa}#${o.i} ${o.declBv}?t=${o.declT} | ${o.txt.slice(0, 34)}`));
fs.writeFileSync(path.join(__dirname, '_manual_classified.json'), JSON.stringify({ stat: { A, B, C }, rows: out }, null, 1), 'utf-8');
console.log('\n完整清单: scripts/_manual_classified.json');
