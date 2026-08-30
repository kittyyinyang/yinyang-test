// 用 node 直接执行数据文件，dump 所有 evidence 检查链接
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data');
const FILES = ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js','qa_clips_new.js','data_qa.js'];
const VARS = ['QA_CORE','QA_CORE2','QA_CORE3','QA_CORE4','QA_CLIPS_NEW','QA_DATA'];

// 从每个文件中提取数组变量（用 vm 执行）
const vm = require('vm');
const sandbox = {};
vm.createContext(sandbox);

for (const fn of FILES) {
  let code = fs.readFileSync(path.join(DATA, fn), 'utf-8');
  // 把顶层 var NAME = 换成 globalThis.NAME = 以便读取
  code = code.replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA|RESULT_GUIDE_MAP)\s*=/g, 'globalThis.$1 =');
  try {
    vm.runInContext(code, sandbox, {filename: fn});
  } catch (e) {
    console.error(`[执行失败] ${fn}: ${e.message}`);
  }
}

const tsToSec = (ts) => {
  if (ts == null) return null;
  ts = String(ts).trim();
  let m = ts.match(/^(\d+):(\d{2})(?::(\d{2}))?$/);
  if (m) return parseInt(m[1])*60 + parseInt(m[2]) + (m[3] ? parseInt(m[3]) : 0);
  if (/^\d+$/.test(ts)) return parseInt(ts);
  return null;
};

const problems = [];
let totalCards = 0, totalEv = 0;

for (const v of VARS) {
  const arr = sandbox[v];
  if (!Array.isArray(arr)) continue;
  totalCards += arr.length;
  for (const card of arr) {
    const evs = card && card.evidence ? card.evidence : [];
    for (const ev of evs) {
      totalEv++;
      const link = ev.link, bv = ev.bv, ts = ev.ts;
      const sec = tsToSec(ts);
      if (!link) { problems.push([v, card.qaId, 'LINK缺失', ts, bv, '']); continue; }
      const tm = link.match(/t=(\d+)/);
      if (!tm) { problems.push([v, card.qaId, 'LINK无t参数(从头播放)', ts, bv, link]); continue; }
      const linkSec = parseInt(tm[1]);
      if (sec != null && linkSec !== sec) {
        problems.push([v, card.qaId, `t与ts不符(link=${linkSec}s vs ts=${ts}->${sec}s)`, ts, bv, link]);
      }
      const bm = link.match(/(BV[a-zA-Z0-9]+)/);
      if (bm && bv && bm[1] !== bv) {
        problems.push([v, card.qaId, `link的BV≠bv字段(${bm[1]} vs ${bv})`, ts, bv, link]);
      }
    }
  }
}

console.log(`扫描 ${VARS.join(',')}: ${totalCards} 张卡, ${totalEv} 条 evidence`);
console.log(`发现问题 ${problems.length} 条`);
console.log('='.repeat(80));
for (const [v, qaId, issue, ts, bv, link] of problems) {
  console.log(`[${v}] ${qaId} | ${issue} | ts=${ts} bv=${bv} | ${link}`);
}
const byFile = {};
for (const p of problems) byFile[p[0]] = (byFile[p[0]]||0)+1;
console.log('='.repeat(80));
console.log('按文件分布:', JSON.stringify(byFile));
