// _verify_v33.js — V3.3 三阶段脉络验证
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
const PORT = 9321;
const URL = 'http://127.0.0.1:8123/index.html';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '_tmp_v33');
const sleep = ms => new Promise(r => setTimeout(r, ms));
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
const PROFILE = OUT + '/_ed_' + Date.now();

const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=430,1700',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, 'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { process.kill(-edge.pid); } catch (e) { } };
process.on('exit', cleanup);

async function main() {
  for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) break; } catch (e) { } await sleep(250); }
  const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  let idc = 0; const pend = new Map(); const errs = [];
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } if (d.method === 'Runtime.exceptionThrown') errs.push((d.params.exceptionDetails.exception?.description || '').slice(0, 130)); };
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  const send = (m, p = {}) => new Promise((res, rej) => { const id = ++idc; pend.set(id, d => d.error ? rej(new Error(d.error.message)) : res(d.result)); ws.send(JSON.stringify({ id, method: m, params: p })); });
  const ev = async x => { const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result?.value; };
  const shot = async n => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(OUT, n + '.png'), Buffer.from(r.data, 'base64')); return n; };

  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.navigate', { url: URL + '#qa' });
  await sleep(3600);

  console.log('[1] 入口三阶段');
  console.log('   ', await ev(`JSON.stringify({
    hasSearch: !!document.getElementById('qaTreeSearch'),
    stages: [...document.querySelectorAll('.qt-branch')].map(function(b){
      return b.querySelector('.qt-name').textContent + ' ' + b.querySelector('.qt-num').textContent;
    }),
    polTabHidden: (function(){ var t=document.querySelector('.qa-pol-tabs'); return !t || t.offsetParent===null; })()
  })`));
  await shot('v33_tree');

  console.log('\n[2] 各阶段章数与卡片分布（静态统计）');
  console.log('   ', await ev(`JSON.stringify(V33_STAGES.map(function(s){
    var n=0; var chs=s.chs.map(function(ch){ var k=qaChCards(ch.id).length; n+=k; return ch.id+':'+k; });
    return s.name+' 合计'+n+' → '+chs.join(' ');
  }), null, 1)`));

  console.log('\n[3] 点「认识你自己」→ 章目录');
  await ev(`qaNavStage('s1'); 'ok'`);
  await sleep(900);
  console.log('   ', await ev(`JSON.stringify({
    crumbs: [...document.querySelectorAll('.qc-item')].map(function(x){return x.textContent}),
    chapters: [...document.querySelectorAll('.qs-card')].map(function(x){
      return x.querySelector('.qsc-name').textContent+' → '+x.querySelector('.qsc-num').textContent;
    })
  }, null, 1)`));
  await shot('v33_chapters');

  console.log('\n[4] 点「第二章」→ 卡片清单');
  await ev(`qaNavCh('ch2'); 'ok'`);
  await sleep(900);
  console.log('   ', await ev(`JSON.stringify({
    crumbs: [...document.querySelectorAll('.qc-item')].map(function(x){return x.textContent}),
    count: document.querySelectorAll('.qtitle-item').length,
    first3: [...document.querySelectorAll('.qti-t')].slice(0,3).map(function(x){return x.textContent.slice(0,24)})
  }, null, 1)`));
  await shot('v33_titles');

  console.log('\n[5] 点第一张 → 单卡');
  await ev(`qaNavCard(0); 'ok'`);
  await sleep(900);
  console.log('   ', await ev(`JSON.stringify({
    pos: (document.querySelector('.qsn-pos')||{}).textContent,
    cardOpen: !!document.querySelector('.qa-single .qcard.open'),
    nextEnabled: document.querySelectorAll('.qsn-btn')[1].disabled===false
  })`));
  await shot('v33_single');

  console.log('\n[6] 翻页 + 搜索');
  await ev(`qaNavStep(1); 'ok'`);
  await sleep(600);
  console.log('    翻页后:', await ev(`(document.querySelector('.qsn-pos')||{}).textContent`));
  await ev(`qaNavGo('tree'); 'ok'`);
  await sleep(600);
  await ev(`(()=>{var i=document.getElementById('qaTreeSearch'); i.value='内耗'; qaTreeSearch('内耗'); return 'ok';})()`);
  await sleep(700);
  console.log('    搜索「内耗」:', await ev(`JSON.stringify({
    head:(document.querySelector('.qts-head')||{}).textContent||'none',
    n:document.querySelectorAll('.qts-item').length
  })`));
  await ev(`(()=>{var it=document.querySelector('.qts-item'); if(it){it.click(); return 'clicked';} return 'none';})()`);
  await sleep(800);
  console.log('    点结果直达:', await ev(`JSON.stringify({level:QA_NAV.level, ch:QA_NAV.ch, pos:(document.querySelector('.qsn-pos')||{}).textContent})`));

  if (errs.length) { console.log('\n[运行时错误]'); errs.slice(0, 5).forEach(e => console.log('   ', e)); }
  console.log('\n[done]', OUT);
  cleanup(); process.exit(0);
}
main().catch(e => { console.error('FAIL:', e.message); cleanup(); process.exit(1); });
