// _audit_videoid_bv.js — 校验每张卡佐证的 videoId 与 bv 是否匹配（语料库污染排查）
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const DATA = path.join(__dirname, '..', 'data');
const FILES = ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js','qa_core5.js','qa_core6.js','qa_core7.js','qa_core8.js','qa_core9.js','qa_core10.js','qa_core11.js','qa_core12.js','qa_clips_new.js','data_qa.js'];
const VARS = ['QA_CORE','QA_CORE2','QA_CORE3','QA_CORE4','QA_CORE5','QA_CORE6','QA_CORE7','QA_CORE8','QA_CORE9','QA_CORE10','QA_CORE11','QA_CORE12','QA_CLIPS_NEW','QA_DATA'];

// 1) corpus_sents.js: id <-> bv 权威映射
const s = {}; vm.createContext(s);
vm.runInContext(fs.readFileSync(path.join(DATA, 'corpus_sents.js'), 'utf-8').replace(/var\s+CORPUS_SENTS\s*=/, 'globalThis.C = '), s);
const id2bv = new Map(), bv2id = new Map();
for (const x of s.C) { if (!id2bv.has(x.id)) id2bv.set(x.id, x.bv); if (!bv2id.has(x.bv)) bv2id.set(x.bv, x.id); }
console.log(`corpus: ${id2bv.size} 个编号 / ${bv2id.size} 个 BV`);

// 2) video_titles.js（语料 md 提取的标题）
let TITLES = {};
{ const p = path.join(DATA, 'video_titles.js');
  if (fs.existsSync(p)) { const t = {}; vm.createContext(t); try { vm.runInContext(fs.readFileSync(p, 'utf-8'), t); TITLES = t.VIDEO_TITLES || {}; } catch (e) { } } }

// 3) 卡片
const sb = {}; vm.createContext(sb);
for (const fn of FILES) { try { vm.runInContext(fs.readFileSync(path.join(DATA, fn), 'utf-8').replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA)\s*=/g, 'globalThis.$1 ='), sb, { filename: fn }); } catch (e) { } }
const seen = new Set(); const cards = [];
for (const v of VARS) if (Array.isArray(sb[v])) for (const c of sb[v]) if (c && c.qaId && !seen.has(c.qaId)) { seen.add(c.qaId); cards.push(c); }

const bvOf = l => (/video\/(BV[\w]+)/.exec(l || '') || [])[1] || '';
let total = 0, ok = 0, mismatch = [], noBv = [], notInCorpus = [], noTitle = [];
for (const c of cards) {
  const evs = c.evidence || c.answer || [];
  evs.forEach((e, i) => {
    total++;
    const bv = bvOf(e.link), vid = e.videoId || '';
    if (!bv) { noBv.push([c.qaId, i]); return; }
    const expect = bv2id.get(bv);
    if (!expect) { notInCorpus.push([c.qaId, i, bv, vid]); return; }
    if (!vid || vid === expect) ok++;
    else mismatch.push([c.qaId, i, vid, bv, expect]);
    if (!TITLES[bv]) noTitle.push([c.qaId, i, bv]);
  });
}

console.log(`\n佐证总数 ${total}`);
console.log(`  ✅ videoId 与 bv 一致: ${ok}`);
console.log(`  ❌ videoId 与 bv 不一致: ${mismatch.length}`);
console.log(`  ⚠  bv 不在 corpus 中: ${notInCorpus.length}`);
console.log(`  ⚠  无 bv 链接: ${noBv.length}`);
console.log(`  ⚠  无标题映射: ${noTitle.length}`);

if (mismatch.length) {
  console.log('\n--- videoId / bv 错配明细（前 30）---');
  mismatch.slice(0, 30).forEach(([qa, i, vid, bv, expect]) => {
    console.log(`  ${qa}#${i}  标 ${vid} / ${bv}  应为 ${expect}　标题: ${TITLES[bv] || '（无）'}`);
  });
}
if (notInCorpus.length) {
  console.log('\n--- bv 不在 corpus（前 15）---');
  notInCorpus.slice(0, 15).forEach(([qa, i, bv, vid]) => console.log(`  ${qa}#${i}  ${bv} (标 ${vid})`));
}
fs.writeFileSync(path.join(__dirname, '_videoid_mismatch.json'),
  JSON.stringify({ mismatch, notInCorpus, noBv, noTitle }, null, 1), 'utf-8');
console.log('\n明细: scripts/_videoid_mismatch.json');
