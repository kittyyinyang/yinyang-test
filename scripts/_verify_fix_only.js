// 只验证已修正的 74 条 evidence 现在是否一致（快）
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const DATA = path.join(__dirname, '..', 'data');
const FILES = ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js','qa_core5.js','qa_core6.js','qa_core7.js','qa_core8.js','qa_core9.js','qa_core10.js','qa_core11.js','qa_core12.js','qa_clips_new.js','data_qa.js'];
const VARS = ['QA_CORE','QA_CORE2','QA_CORE3','QA_CORE4','QA_CORE5','QA_CORE6','QA_CORE7','QA_CORE8','QA_CORE9','QA_CORE10','QA_CORE11','QA_CORE12','QA_CLIPS_NEW','QA_DATA'];

const applied = JSON.parse(fs.readFileSync(path.join(__dirname, '_ev_fix_applied.json'), 'utf8')).applied;
const targets = new Set(applied.map(a => a.qa + '#' + a.i + '_' + a.field));

// 逐文件单独 context 加载，避免同名 qaId 互相覆盖
const cardsByFile = {};   // file -> Map(qaId -> card)
for (const fn of FILES) {
  const p = path.join(DATA, fn); if (!fs.existsSync(p)) continue;
  const s2 = {}; vm.createContext(s2);
  const code = fs.readFileSync(p, 'utf-8').replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA)\s*=/g, 'globalThis.$1 =');
  try { vm.runInContext(code, s2, { filename: fn }); } catch (e) { continue; }
  const m = new Map();
  for (const v of VARS) if (Array.isArray(s2[v])) s2[v].forEach(c => { if (c && c.qaId) m.set(c.qaId, c); });
  cardsByFile[fn] = m;
}
const byId = new Map();
for (const fn of FILES) for (const [k, v] of (cardsByFile[fn] || new Map())) byId.set(k, v);

const corpus = {};
{ const code = fs.readFileSync(path.join(DATA, 'corpus_sents.js'), 'utf-8');
  const c = {}; vm.createContext(c);
  vm.runInContext(code.replace(/var\s+CORPUS_SENTS\s*=/, 'globalThis.C = '), c);
  for (const s of (c.C || [])) { (corpus[s.bv] = corpus[s.bv] || []).push({ sec: s.sec, text: s.text }); } }

const norm = s => String(s || '').replace(/[\s，。、！？；：""''（）《》…—\-·,.!?;:()\[\]]/g, '');
function lcs(a, b) {
  const n = a.length, m = b.length; if (!n || !m) return 0;
  let prev = new Uint16Array(m + 1), cur = new Uint16Array(m + 1), best = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) { if (a[i - 1] === b[j - 1]) { cur[j] = prev[j - 1] + 1; if (cur[j] > best) best = cur[j]; } else cur[j] = 0; }
    [prev, cur] = [cur, prev]; cur.fill(0);
  }
  return best;
}

let ok = 0, stillOff = 0, notFound = 0;
for (const a of applied) {
  // 优先用 recorded 的 _file 精确定位，回退到全局 Map
  const c = (a._file && cardsByFile[a._file] && cardsByFile[a._file].get(a.qa)) || byId.get(a.qa);
  if (!c) { notFound++; continue; }
  const EV = Array.isArray(c.evidence) ? c.evidence : (Array.isArray(c.answer) ? c.answer : null);
  if (!EV || a.i >= EV.length) { notFound++; continue; }
  const e = EV[a.i];
  const link = e.link || '';
  const bv = (/video\/(BV[\w]+)/.exec(link) || [])[1] || '';
  const t = +((/[?&]t=(\d+)/.exec(link) || [])[1] ?? -1);
  if (bv !== a.bestBv || Math.abs(t - a.bestSec) > 2) {
    stillOff++;
    console.log('  still off:', a.qa + '#' + a.i, 'now', bv + '?t=' + t, 'expected', a.bestBv + '?t=' + a.bestSec);
  } else {
    ok++;
  }
}
console.log(`\n已修正条目复核: ok=${ok} 仍错=${stillOff} 未找到=${notFound} / 共 ${applied.length}`);
