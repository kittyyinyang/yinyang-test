// _apply_evidence_fix.js — 用 Node 的 vm 正确解析 data/*.js（保留 JS 字面量语义），
// 修改 evidence/answer 的 ts/bv/link/videoId 后重写文件。
// 保留文件头部块注释 + var 声明，数组体用 JSON.stringify(2空格) 输出。
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const DATA = path.join(__dirname, '..', 'data');
const ANCHOR = path.join(__dirname, '_global_anchor_v2.json');
const BACKUP = DATA + '/_ev_fix_node_' + new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

const FILES = ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js','qa_core5.js','qa_core6.js','qa_core7.js','qa_core8.js','qa_core9.js','qa_core10.js','qa_core11.js','qa_core12.js','qa_clips_new.js','data_qa.js'];
const VARS = ['QA_CORE','QA_CORE2','QA_CORE3','QA_CORE4','QA_CORE5','QA_CORE6','QA_CORE7','QA_CORE8','QA_CORE9','QA_CORE10','QA_CORE11','QA_CORE12','QA_CLIPS_NEW','QA_DATA'];

const anchor = JSON.parse(fs.readFileSync(ANCHOR, 'utf8'));
// 去重
const seen = new Set(); const rows = [];
for (const r of anchor.rows) {
  const k = r.qa + '#' + r.i + '_' + (r.field || 'evidence');
  if (seen.has(k)) continue; seen.add(k); rows.push(r);
}
const auto = rows.filter(r => (r.kind === 'CROSS_BV' && r.L >= 10) || (r.kind === 'OFFSET' && r.L >= 8));
const manual = rows.filter(r => !auto.includes(r));
console.log(`去重后 ${rows.length} 条 | 自动修正 ${auto.length} | 人工确认 ${manual.length}`);

// bv -> videoId 映射（从 corpus_sents.js 抽样，正则快速扫描）
const sentsRaw = fs.readFileSync(path.join(DATA, 'corpus_sents.js'), 'utf8');
const bv2id = new Map();
for (const m of sentsRaw.matchAll(/\{"id":"([BN]\d+)","bv":"(BV[0-9A-Za-z]+)"/g)) bv2id.set(m[2], m[1]);
console.log(`bv→videoId 映射 ${bv2id.size} 条`);

fs.mkdirSync(BACKUP, { recursive: true });
const applied = [];

for (let fi = 0; fi < FILES.length; fi++) {
  const fn = FILES[fi], varName = VARS[fi];
  const p = path.join(DATA, fn);
  if (!fs.existsSync(p)) continue;
  const text = fs.readFileSync(p, 'utf8');

  let arr;
  try {
    const sb = {}; vm.createContext(sb);
    vm.runInContext(text.replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA)\s*=/, 'globalThis.$1 ='), sb, { filename: fn });
    arr = sb[varName];
  } catch (e) { console.log(`[skip] ${fn}: ${e.message.slice(0, 60)}`); continue; }
  if (!Array.isArray(arr)) { console.log(`[skip] ${fn}: not array`); continue; }

  let changed = 0;
  for (const it of auto) {
    const card = arr.find(c => c && c.qaId === it.qa);
    if (!card) continue;
    const field = it.field || 'evidence';
    const evs = card[field];
    if (!Array.isArray(evs) || it.i >= evs.length) continue;
    const e = evs[it.i];
    // 精确校验：只有当前 link 与锚定时的声明值完全一致才应用（避免同名卡跨文件误改）
    const curBv = (/video\/(BV[\w]+)/.exec(e.link || '') || [])[1] || '';
    const curT = +((/[?&]t=(\d+)/.exec(e.link || '') || [])[1] ?? -1);
    if (curBv !== it.declBv || curT !== it.declT) continue;
    const newBv = it.bestBv || it.declBv;
    const newSec = it.bestSec;
    const newTs = Math.floor(newSec / 60) + ':' + String(newSec % 60).padStart(2, '0');
    e.ts = newTs;
    e.bv = newBv;
    e.link = `https://www.bilibili.com/video/${newBv}?t=${newSec}`;
    if (it.kind === 'CROSS_BV') {
      const vid = bv2id.get(newBv);
      if (vid) e.videoId = vid;
    }
    changed++; applied.push({ ...it, _file: fn, newTs, newLink: e.link });
  }
  if (!changed) continue;

  fs.copyFileSync(p, path.join(BACKUP, fn));

  // 头部块注释（var 声明之前的内容）
  const headM = /^[\s\S]*?(?=\n?\s*var\s+QA_)/.exec(text);
  const head = headM ? headM[0] : '';
  // 尾部（数组 ] 之后的内容）
  const i0 = text.indexOf('[', text.indexOf('var ' + varName) >= 0 ? text.indexOf('var ' + varName) : 0);
  let depth = 0, j0 = i0, inStr = false, sc = null;
  for (; j0 < text.length; j0++) {
    const c = text[j0];
    if (inStr) { if (c === '\\') { j0++; continue; } if (c === sc) inStr = false; continue; }
    if (c === '"' || c === "'") { inStr = true; sc = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) break; }
  }
  const suffix = text.slice(j0 + 1);
  const headNl = head && !/\n\s*$/.test(head) ? '\n' : '';
  const out = head + headNl + `var ${varName} = \n` + JSON.stringify(arr, null, 2) + suffix;
  fs.writeFileSync(p, out, 'utf8');
  console.log(`[write] ${fn}: ${changed} 条`);
}

fs.writeFileSync(path.join(__dirname, '_ev_fix_applied.json'), JSON.stringify({ applied, manual, stats: { auto: auto.length, manual: manual.length } }, null, 1), 'utf8');
console.log(`\n备份 ${BACKUP}\n报告 scripts/_ev_fix_applied.json`);
