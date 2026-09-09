// build_corpus_chunks.js — 语料精炼：句子合并成语义片段 + 去冗余字段 + 分片
// 输入 data/corpus_sents.js (32.5MB / 197,802 句)
// 输出 data/corpus_chunks.js（按视频分组的片段）+ data/corpus_shard_*.js（按章节分片）
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const DATA = path.join(__dirname, '..', 'data');

// 读原语料
const s = {}; vm.createContext(s);
vm.runInContext(fs.readFileSync(path.join(DATA, 'corpus_sents.js'), 'utf-8').replace(/var\s+CORPUS_SENTS\s*=/, 'globalThis.C = '), s);
const C = s.C;
console.log(`原始：${C.length.toLocaleString()} 句 / ${(fs.statSync(path.join(DATA, 'corpus_sents.js')).size / 1048576).toFixed(1)} MB`);

// 1) 按视频分组 + 按秒排序
const byBv = new Map();
for (const x of C) {
  if (!byBv.has(x.bv)) byBv.set(x.bv, []);
  byBv.get(x.bv).push({ sec: x.sec | 0, text: (x.text || '').trim() });
}

// 2) 合并：同一视频内，间隔 <= GAP 秒且累计长度 <= MAXLEN 的连续句合并为一段
const GAP = 4, MAXLEN = 90, MINLEN = 12;
const chunks = [];   // {bv, sec, text, id}
let bvList = [...byBv.keys()];
for (const bv of bvList) {
  const arr = byBv.get(bv).sort((a, b) => a.sec - b.sec);
  let cur = null;
  for (const it of arr) {
    if (!it.text) continue;
    if (cur && it.sec - cur.lastSec <= GAP && cur.text.length + it.text.length <= MAXLEN) {
      cur.text += it.text; cur.lastSec = it.sec;
    } else {
      if (cur && cur.text.length >= MINLEN) chunks.push(cur);
      cur = { bv, sec: it.sec, text: it.text, lastSec: it.sec, id: (arr[0] && arr[0].id) || '' };
    }
  }
  if (cur && cur.text.length >= MINLEN) chunks.push(cur);
}
chunks.forEach(c => { delete c.lastSec; });
console.log(`合并后：${chunks.length.toLocaleString()} 段（压缩 ${(C.length / chunks.length).toFixed(1)}×）`);
console.log(`总字符：${chunks.reduce((a, c) => a + c.text.length, 0).toLocaleString()}`);

// 3) 精简结构：bv -> 索引，去掉 id/ts/tags
const bvIdx = new Map(); const bvs = [];
chunks.forEach(c => { if (!bvIdx.has(c.bv)) { bvIdx.set(c.bv, bvs.length); bvs.push(c.bv); } });
const slim = chunks.map(c => [bvIdx.get(c.bv), c.sec, c.text]);   // [视频下标, 秒, 文本]
const out = { v: bvs, d: slim };

const full = 'var CORPUS_CHUNKS = ' + JSON.stringify(out) + ';\n';
fs.writeFileSync(path.join(DATA, 'corpus_chunks.js'), full, 'utf-8');
console.log(`\n精简全量：${(full.length / 1048576).toFixed(2)} MB  （原 32.5 MB）`);
console.log(`  平均片段长度 ${Math.round(chunks.reduce((a, c) => a + c.text.length, 0) / chunks.length)} 字`);

// 4) 分片：按视频分组，每片控制在 ~250KB
const SHARD_TARGET = 250 * 1024;
const shards = []; let buf = [], cur = { v: [], d: [] }, curSize = 0;
const byVid = new Map();
chunks.forEach(c => { const i = bvIdx.get(c.bv); if (!byVid.has(i)) byVid.set(i, []); byVid.get(i).push(c); });
for (const [vi, list] of [...byVid.entries()].sort((a, b) => a[0] - b[0])) {
  const piece = list.map(c => [vi, c.sec, c.text]);
  const sz = JSON.stringify(piece).length;
  if (curSize + sz > SHARD_TARGET && cur.d.length) { shards.push(cur); cur = { v: [], d: [] }; curSize = 0; }
  cur.v.push(bvs[vi]); cur.d.push(...piece); curSize += sz;
}
if (cur.d.length) shards.push(cur);
console.log(`\n分片：${shards.length} 个`);
shards.forEach((sh, i) => {
  const txt = 'var CORPUS_SHARD_' + i + ' = ' + JSON.stringify(sh) + ';\n';
  fs.writeFileSync(path.join(DATA, `corpus_shard_${i}.js`), txt, 'utf-8');
  console.log(`  shard_${i}.js  ${(txt.length / 1024).toFixed(0)} KB  ${sh.v.length} 个视频 / ${sh.d.length} 段`);
});
// 分片总表（视频 -> 分片号），前端常驻
const map = {};
shards.forEach((sh, i) => sh.v.forEach(bv => { map[bv] = i; }));
fs.writeFileSync(path.join(DATA, 'corpus_shard_map.js'),
  'var CORPUS_SHARD_MAP = ' + JSON.stringify({ n: shards.length, m: map }) + ';\n', 'utf-8');
console.log(`\n分片索引表：${(fs.statSync(path.join(DATA, 'corpus_shard_map.js')).size / 1024).toFixed(0)} KB`);
