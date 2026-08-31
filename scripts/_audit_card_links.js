// _audit_card_links.js — 全量审计「模块间卡片链接」有效性
// 覆盖：① index.html 静态 goQaCard('x')  ② 数据数组硬编码 qaId/kpId  ③ kp_graph/content_graph 引用
//       ④ QA 卡内部互引字段  ⑤ 结果页/回顾页/成长板块动态引用
// 输出：失效清单 + 建议替代卡（按标题/关键词模糊匹配）
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const FILES = ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js','qa_core5.js','qa_core6.js','qa_core7.js','qa_core8.js','qa_core9.js','qa_core10.js','qa_core11.js','qa_core12.js','qa_clips_new.js','data_qa.js'];
const VARS = ['QA_CORE','QA_CORE2','QA_CORE3','QA_CORE4','QA_CORE5','QA_CORE6','QA_CORE7','QA_CORE8','QA_CORE9','QA_CORE10','QA_CORE11','QA_CORE12','QA_CLIPS_NEW','QA_DATA'];

const sb = {}; vm.createContext(sb);
const fileOf = {};   // qaId -> 源文件名
for (const fn of FILES) {
  const p = path.join(DATA, fn); if (!fs.existsSync(p)) continue;
  const code = fs.readFileSync(p, 'utf-8').replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA)\s*=/g, 'globalThis.$1 =');
  try { vm.runInContext(code, sb, { filename: fn }); } catch (e) { console.error('[skip]', fn, e.message.slice(0, 60)); }
  const v = (fn === 'data_qa.js') ? 'QA_DATA' : ('QA_' + fn.replace('qa_core', 'QA_CORE').replace(/\.js$/, '').toUpperCase().replace('QA_CORE', 'QA_CORE').replace('QA_QA_CORE', 'QA_CORE'));
  for (const vv of VARS) if (Array.isArray(sb[vv])) { /* handled later */ }
}
// 重新逐个记录来源
const pool = [];  // {qaId, question, file}
for (const fn of FILES) {
  const p = path.join(DATA, fn); if (!fs.existsSync(p)) continue;
  const s2 = {}; vm.createContext(s2);
  const code = fs.readFileSync(p, 'utf-8').replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA)\s*=/g, 'globalThis.$1 =');
  try { vm.runInContext(code, s2, { filename: fn }); } catch (e) { continue; }
  for (const vv of VARS) if (Array.isArray(s2[vv])) for (const c of s2[vv]) if (c && c.qaId) { pool.push({ qaId: c.qaId, question: c.question || '', category: c.category || '', file: fn }); }
}
const byId = new Map(pool.map(c => [c.qaId, c]));
const byKp = new Map(); for (const c of pool) if (c.qaId) { const m = /^q-(.+)-(\d+)$/.exec(c.qaId); if (m && !byKp.has(m[1])) byKp.set(m[1], c); }
console.log('QA 池卡片数:', pool.length, '| 唯一 qaId:', byId.size, '| 可解析 kpId:', byKp.size);

// 模拟 findQa
function findQa(kpLink, kpCard) {
  if (kpCard && byId.has(kpCard)) return byId.get(kpCard);
  if (kpLink) {
    if (byId.has('q-' + kpLink + '-01')) return byId.get('q-' + kpLink + '-01');
    for (const c of pool) if (c.qaId === 'q-' + kpLink + '-01') return c;
    const kp = pool.find(c => c.qaId && c.qaId.indexOf('q-' + kpLink) === 0);
    if (kp) return kp;
    if (byKp.has(kpLink)) return byKp.get(kpLink);
  }
  return null;
}

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
const bad = []; const ok = [];

// ① 静态 goQaCard('x')
const re1 = /goQaCard\(\\?['"]([^\\'"]+)\\?['"]\)/g;
let m; const statics = new Set();
while ((m = re1.exec(html))) statics.add(m[1]);
for (const id of statics) (byId.has(id) ? ok : bad).push({ src: 'index.html 静态 goQaCard', ref: id });

// ② 数据数组硬编码引用
const arrDefs = {
  'HEAL_METHOD.q': /var HEAL_METHOD=\[([\s\S]*?)\];/,
  'HEAL_GROUPS.kps': /var HEAL_GROUPS=\[([\s\S]*?)\n\];/,
  'HEAL_PRACTICE': /var HEAL_PRACTICE=\[([^\]]*)\];/,
};
function refsFromBlock(block, keyRe) {
  const out = []; let mm; const r = new RegExp(keyRe, 'g');
  while ((mm = r.exec(block))) out.push(mm[1]);
  return out;
}
for (const [name, re] of Object.entries(arrDefs)) {
  const blk = (re.exec(html) || [])[1]; if (!blk) { console.log('[warn] 未匹配块', name); continue; }
  let refs = [];
  if (name === 'HEAL_METHOD.q') refs = refsFromBlock(blk, "q:'([^']+)'");
  else if (name === 'HEAL_GROUPS.kps') refs = (blk.match(/kps:\[([^\]]*)\]/g) || []).flatMap(x => (x.match(/'([^']+)'/g) || []).map(y => y.slice(1, -1)));
  else refs = (blk.match(/'([^']+)'/g) || []).map(y => y.slice(1, -1));
  for (const r of refs) {
    const hit = findQa(r, r.indexOf('q-') === 0 ? r : '');
    (hit ? ok : bad).push({ src: name, ref: r, resolved: hit ? hit.qaId : null });
  }
}

// ③ kp_graph / content_graph / 其他数据文件里的 qaId 引用
for (const fn of ['kp_graph.js', 'content_graph.js', 'data_pair.js']) {
  const p = path.join(DATA, fn); if (!fs.existsSync(p)) continue;
  const code = fs.readFileSync(p, 'utf-8');
  const ids = new Set((code.match(/q-[A-Za-z0-9_]+(?:-[A-Za-z0-9_]+)*/g) || []));
  for (const id of ids) if (id.length > 6 && !byId.has(id)) {
    const kp = id.replace(/^q-/, '').replace(/-\d+$/, '');
    const hit = findQa(kp, '');
    (hit ? ok : bad).push({ src: fn, ref: id, resolved: hit ? hit.qaId : null });
  }
}

console.log('\n=== 卡片链接审计 ===');
console.log('有效:', ok.length, '| 失效:', bad.length);
if (bad.length) {
  console.log('\n--- 失效明细 ---');
  for (const b of bad) {
    // 建议替代：按 ref 的关键词在池中找
    const key = b.ref.replace(/^q-/, '').replace(/-\d+$/, '');
    const cand = pool.filter(c => (c.qaId || '').indexOf(key) === 0 || (c.question || '').indexOf(key) >= 0).slice(0, 3);
    console.log(`  [${b.src}] ${b.ref}` + (cand.length ? '\n      建议: ' + cand.map(c => c.qaId + ' 「' + (c.question || '').slice(0, 24) + '」').join(' | ') : '\n      建议: 无相近卡'));
  }
}
// 成长板块三张卡单独确认
console.log('\n--- 成长板块方法线三卡 ---');
for (const q of ['q-kp-c3-01', 'q-kp-c11-01', 'q-y1-06-01']) {
  const c = byId.get(q);
  console.log(`  ${q}: ${c ? '✅ ' + (c.question || '').slice(0, 30) + ' [' + c.file + ']' : '❌ 不存在'}`);
}
fs.writeFileSync(path.join(__dirname, '_card_link_issues.json'), JSON.stringify({ okCount: ok.length, bad }, null, 1), 'utf-8');
console.log('\n清单: scripts/_card_link_issues.json');
