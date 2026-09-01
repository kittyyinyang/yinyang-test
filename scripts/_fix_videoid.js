// _fix_videoid.js — 修正佐证里 videoId 与 bv 不匹配的条目（以 corpus_sents.js 的 bv->id 为准）
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const DATA = path.join(__dirname, '..', 'data');
const FILES = ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js','qa_core5.js','qa_core6.js','qa_core7.js','qa_core8.js','qa_core9.js','qa_core10.js','qa_core11.js','qa_core12.js','qa_clips_new.js','data_qa.js'];
const VARS = ['QA_CORE','QA_CORE2','QA_CORE3','QA_CORE4','QA_CORE5','QA_CORE6','QA_CORE7','QA_CORE8','QA_CORE9','QA_CORE10','QA_CORE11','QA_CORE12','QA_CLIPS_NEW','QA_DATA'];

const s = {}; vm.createContext(s);
vm.runInContext(fs.readFileSync(path.join(DATA, 'corpus_sents.js'), 'utf-8').replace(/var\s+CORPUS_SENTS\s*=/, 'globalThis.C = '), s);
const bv2id = new Map();
for (const x of s.C) if (!bv2id.has(x.bv)) bv2id.set(x.bv, x.id);
console.log(`corpus bv->id ${bv2id.size} 条`);

const bvOf = l => (/video\/(BV[\w]+)/.exec(l || '') || [])[1] || '';
const BACKUP = path.join(DATA, '_videoid_fix_' + Date.now());
fs.mkdirSync(BACKUP, { recursive: true });

let fixed = 0;
for (let i = 0; i < FILES.length; i++) {
  const fn = FILES[i], v = VARS[i];
  const p = path.join(DATA, fn); if (!fs.existsSync(p)) continue;
  const raw = fs.readFileSync(p, 'utf-8');
  const sb = {}; vm.createContext(sb);
  try { vm.runInContext(raw.replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA)\s*=/g, 'globalThis.$1 ='), sb, { filename: fn }); } catch (e) { console.log('skip', fn); continue; }
  const arr = sb[v]; if (!Array.isArray(arr)) continue;

  let changed = 0;
  for (const c of arr) {
    for (const key of ['evidence', 'answer']) {
      const evs = c[key]; if (!Array.isArray(evs)) continue;
      for (const e of evs) {
        const bv = bvOf(e.link); if (!bv) continue;
        const expect = bv2id.get(bv); if (!expect) continue;
        if (e.videoId !== expect) {
          console.log(`  ${c.qaId}  ${e.videoId || '(空)'} -> ${expect}   [${bv}]`);
          e.videoId = expect; changed++;
        }
      }
    }
  }
  if (!changed) continue;

  fs.copyFileSync(p, path.join(BACKUP, fn));
  // 用 JSON 重写（保留头部注释与 var 声明）
  const head = (/^[\s\S]*?(?=\n?\s*var\s+QA_)/.exec(raw) || [''])[0];
  const i0 = raw.indexOf('[', raw.indexOf('var ' + v) >= 0 ? raw.indexOf('var ' + v) : 0);
  let depth = 0, j0 = i0, inStr = false, sc = null;
  for (; j0 < raw.length; j0++) {
    const ch = raw[j0];
    if (inStr) { if (ch === '\\') { j0++; continue; } if (ch === sc) inStr = false; continue; }
    if (ch === '"' || ch === "'") { inStr = true; sc = ch; continue; }
    if (ch === '[') depth++; else if (ch === ']') { depth--; if (depth === 0) break; }
  }
  const suffix = raw.slice(j0 + 1);
  const headNl = head && !/\n\s*$/.test(head) ? '\n' : '';
  fs.writeFileSync(p, head + headNl + `var ${v} = \n` + JSON.stringify(arr, null, 2) + suffix, 'utf-8');
  fixed += changed;
  console.log(`  [write] ${fn}: ${changed} 条`);
}
console.log(`\n共修正 ${fixed} 条 | 备份 ${BACKUP}`);
