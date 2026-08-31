// _stats_evidence_t.js — 只统计 evidence 链接形态，不加载 33MB 语料（快）
// 核查：bv 存在率 / t 参数存在率 / ts 字段与 link.t 一致性 / ts 为 0 的"开头"嫌疑
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const DATA = path.join(__dirname, '..', 'data');
const FILES = ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js','qa_core5.js','qa_core6.js','qa_core7.js','qa_core8.js','qa_core9.js','qa_core10.js','qa_core11.js','qa_core12.js','qa_clips_new.js','data_qa.js'];
const VARS = ['QA_CORE','QA_CORE2','QA_CORE3','QA_CORE4','QA_CORE5','QA_CORE6','QA_CORE7','QA_CORE8','QA_CORE9','QA_CORE10','QA_CORE11','QA_CORE12','QA_CLIPS_NEW','QA_DATA'];

const sb = {}; vm.createContext(sb);
for (const fn of FILES) {
  const p = path.join(DATA, fn); if (!fs.existsSync(p)) continue;
  let code = fs.readFileSync(p, 'utf-8').replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA)\s*=/g, 'globalThis.$1 =');
  try { vm.runInContext(code, sb, { filename: fn }); } catch (e) { console.error('[skip]', fn, e.message); }
}
const cards = [];
for (const v of VARS) if (Array.isArray(sb[v])) cards.push(...sb[v]);

const tsToSec = (ts) => {
  if (ts == null) return -1;
  const s = String(ts).trim();
  let m = /^(\d+):([0-5]?\d)$/.exec(s); if (m) return (+m[1]) * 60 + (+m[2]);
  m = /^(\d+):([0-5]?\d):([0-5]?\d)$/.exec(s); if (m) return (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]);
  return /^\d+$/.test(s) ? parseInt(s, 10) : -1;
};

let total = 0, noBv = 0, noT = 0, tZero = 0, tsMissT = 0, noTs = 0;
const byFile = {}; const zeroList = []; const missList = []; const noTList = [];
for (const c of cards) {
  if (!Array.isArray(c.evidence)) continue;
  for (const e of c.evidence) {
    total++;
    const link = e.link || '';
    const bv = (/video\/(BV[\w]+)/.exec(link) || [])[1] || '';
    const t  = (/[?&]t=(\d+)/.exec(link) || [])[1];
    const tsSec = tsToSec(e.ts);
    if (!bv) { noBv++; continue; }
    if (t === undefined) { noT++; if (noTList.length < 12) noTList.push(c.qaId + ' | ' + link); }
    else if (+t === 0) { tZero++; if (zeroList.length < 15) zeroList.push(c.qaId + ' | ts=' + e.ts + ' | ' + link); }
    if (tsSec < 0) noTs++;
    else if (t !== undefined && Math.abs(+t - tsSec) > 1) { tsMissT++; if (missList.length < 12) missList.push(c.qaId + ' | ts=' + e.ts + '(' + tsSec + 's) vs link t=' + t); }
    const f = (c.srcFile || '?'); byFile[f] = byFile[f] || { n: 0, noT: 0, zero: 0 };
    byFile[f].n++; if (t === undefined) byFile[f].noT++; if (t !== undefined && +t === 0) byFile[f].zero++;
  }
}
console.log('evidence 总数:', total);
console.log('  无 bv:', noBv, '| 无 t 参数:', noT, '| t=0(跳开头):', tZero, '| 无 ts 字段:', noTs, '| ts≠link.t:', tsMissT);
console.log('\n--- 无 t 参数样例 ---'); noTList.forEach(x => console.log('  ', x));
console.log('\n--- t=0（必然从头播）样例 ---'); zeroList.forEach(x => console.log('  ', x));
console.log('\n--- ts 与 link.t 不一致样例 ---'); missList.forEach(x => console.log('  ', x));
