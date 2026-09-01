// _repro_resume.js — 复现「续答 / 继续做题」按钮无反应
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
const PORT = 9303;
const URL = 'http://127.0.0.1:8123/index.html';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '_tmp_resume_' + Date.now());
const sleep = ms => new Promise(r => setTimeout(r, ms));
fs.mkdirSync(OUT, { recursive: true });

const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=430,1600',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${OUT}`, 'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { process.kill(-edge.pid); } catch (e) { } };
process.on('exit', cleanup);

async function main() {
  for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) break; } catch (e) { } await sleep(250); }
  const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  let idc = 0; const pend = new Map(); const errs = [];
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } if (d.method === 'Runtime.exceptionThrown') errs.push((d.params.exceptionDetails.exception?.description || '').slice(0, 160)); };
  await new Promise(r => ws.onopen = r);
  const send = (m, p = {}) => new Promise((res, rej) => { const id = ++idc; pend.set(id, d => d.error ? rej(new Error(d.error.message)) : res(d.result)); ws.send(JSON.stringify({ id, method: m, params: p })); });
  const ev = async x => { const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true }); return r.exceptionDetails ? 'ERR:' + (r.exceptionDetails.exception?.description || '').slice(0, 120) : r.result?.value; };
  const shot = async n => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(OUT, n + '.png'), Buffer.from(r.data, 'base64')); return n; };

  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.navigate', { url: URL + '#test' });
  await sleep(3500);

  console.log('[1] 测试页初始:', await ev(`JSON.stringify({view:T&&T.view, box:!!$('testBox'), html:($('testBox')||{}).innerHTML?(($('testBox')).innerHTML.length):0})`));

  // 直接调 startGender 模拟开始答题
  console.log('[2] startGender(male):', await ev(`(()=>{ try{ startGender('male'); return 'called'; }catch(e){ return 'ERR '+e.message; } })()`));
  await sleep(3000);
  console.log('    T 状态:', await ev(`JSON.stringify({view:T.view, quizLen:T.quiz?T.quiz.length:0, idx:T.idx})`));

  // 答 2 题
  console.log('[3] 答前两题:', await ev(`(()=>{
    try{
      for(var i=0;i<2;i++){ var q=T.quiz[T.idx]; if(!q) break; T.answers[q.id]=3; nextQuestion(); }
      return 'answered, idx='+T.idx;
    }catch(e){ return 'ERR '+e.message; }
  })()`));
  await sleep(1200);
  console.log('    进度对象:', await ev(`JSON.stringify({prog:loadJSON('yy_prog',null)||loadJSON(K_PROG,null)})`).then(s => String(s).slice(0, 200)));

  // 真正重新加载（模拟用户刷新页面），再进测试页
  await send('Page.reload', { ignoreCache: true });
  await sleep(4000);
  await send('Page.navigate', { url: URL + '#test' });
  await sleep(2000);
  console.log('[4] 重进测试页:', await ev(`JSON.stringify({view:T.view, hasStrip:!!document.querySelector('.last-strip'), stripTxt:(document.querySelector('.last-strip .lbl')||{}).textContent||''})`));
  console.log('    续答按钮:', await ev(`(()=>{ var b=[...document.querySelectorAll('button')].find(function(x){return /续答|继续/.test(x.textContent)}); return b?('找到: '+b.textContent+' onclick='+b.getAttribute('onclick')):'未找到'; })()`));
  await shot('resume_before');

  // 点击续答
  console.log('[5] 点击续答:', await ev(`(()=>{ var b=[...document.querySelectorAll('button')].find(function(x){return /续答|继续/.test(x.textContent)}); if(!b) return 'no-btn'; b.click(); return 'clicked'; })()`));
  await sleep(3500);
  console.log('    点击后 T:', await ev(`JSON.stringify({view:T.view, quizLen:T.quiz?T.quiz.length:0, idx:T.idx, boxLen:($('testBox')||{}).innerHTML?($('testBox')).innerHTML.length:0})`));
  console.log('    testBox 前 200 字:', await ev(`(($('testBox')||{}).innerHTML||'').slice(0,200)`));
  await shot('resume_after');

  if (errs.length) { console.log('\n[运行时错误]'); errs.slice(0, 5).forEach(e => console.log('   ', e)); }
  console.log('\n[done]', OUT);
  cleanup(); process.exit(0);
}
main().catch(e => { console.error('FAIL:', e.message); cleanup(); process.exit(1); });
