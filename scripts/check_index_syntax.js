// 校验 index.html 内联脚本语法 + 关键函数/变量存在性
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');

// 提取所有内联 <script>（无 src 属性）
const blocks = [];
const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
let m;
while ((m = re.exec(html)) !== null) {
  blocks.push(m[1]);
}
console.log(`内联 script 块: ${blocks.length}`);

// 逐个做语法检查（用 new Function 包装）
const sandbox = { window:{}, document:{}, console, location:{hash:''}, setTimeout, clearTimeout };
sandbox.window = sandbox;
let ok = 0, fail = 0;
const failList = [];
for (let i = 0; i < blocks.length; i++) {
  const code = blocks[i].trim();
  if (!code) continue;
  try {
    new vm.Script(code, {filename: `inline-${i}.js`});
    ok++;
  } catch (e) {
    fail++;
    failList.push(`block#${i}: ${e.message}`);
  }
}
console.log(`语法通过: ${ok}, 失败: ${fail}`);
if (failList.length) console.log(failList.slice(0,10).join('\n'));

// 关键元素检查
const checks = [
  ['corpus_sent_first.js 引入', html.includes('data/corpus_sent_first.js')],
  ['corpus_sents.js 静态引入已移除', !html.includes('<script src="data/corpus_sents.js">')],
  ['loadCorpusSents 函数', html.includes('function loadCorpusSents')],
  ['runSearch 动态加载守卫', html.includes("typeof CORPUS_SENTS==='undefined'")],
  ['CORPUS_SENT_FIRST_DATA 引用', html.includes('CORPUS_SENT_FIRST_DATA')],
  ['tag_graph.js 引入', html.includes('data/tag_graph.js')],
  ['renderTagGraph 函数', html.includes('function renderTagGraph')],
  ['sc-go 带 ?t= 模板', html.includes("?t='+sec") || html.includes("?t=")],
];
console.log('---关键元素---');
for (const [name, pass] of checks) console.log(`${pass?'✓':'✗'} ${name}`);
