// 补充扫描：QA_DATA 旧卡 answer 数组 与 QA_CLIPS 的 answer 数组链接
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DATA = path.join(__dirname, '..', 'data');
const sandbox = {};
vm.createContext(sandbox);

for (const fn of ['data_qa.js','qa_clips_new.js']) {
  let code = fs.readFileSync(path.join(DATA, fn), 'utf-8');
  code = code.replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA|RESULT_GUIDE_MAP)\s*=/g, 'globalThis.$1 =');
  try { vm.runInContext(code, sandbox, {filename: fn}); }
  catch (e) { console.error(`[执行失败] ${fn}: ${e.message}`); }
}

const problems = [];
let totalAns = 0, noLink = 0, noT = 0;

for (const v of ['QA_DATA','QA_CLIPS_NEW']) {
  const arr = sandbox[v] || [];
  for (const card of arr) {
    const ans = (card && Array.isArray(card.answer)) ? card.answer : [];
    for (const a of ans) {
      totalAns++;
      if (!a.link) {
        noLink++;
        problems.push([v, card.qaId, 'answer.link缺失', a.ts, a.bv, '']);
        continue;
      }
      const tm = a.link.match(/t=(\d+)/);
      if (!tm) {
        noT++;
        problems.push([v, card.qaId, 'answer.link无t参数(从头播放)', a.ts, a.bv, a.link]);
      }
    }
  }
}

console.log(`QA_DATA+QA_CLIPS answer 条目: ${totalAns}, 无link: ${noLink}, link无t: ${noT}`);
console.log('='.repeat(80));
for (const p of problems) console.log(`[${p[0]}] ${p[1]} | ${p[2]} | ts=${p[3]} bv=${p[4]} | ${p[5]}`);
