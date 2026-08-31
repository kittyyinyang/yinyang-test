// 搜索性能验证：用户关键词"觉察"的响应时延 + 命中数
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 9227;
const URL_BASE = 'http://127.0.0.1:8123/index.html';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '_tmp_viz_search');
const sleep = ms => new Promise(r => setTimeout(r, ms));

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
const userDir = path.resolve(__dirname, '_tmp_viz_search/_ed3');
try { execSync(`Remove-Item -Recurse -Force -ErrorAction SilentlyContinue '${userDir}'`, { stdio: 'ignore', shell: 'powershell' }); } catch (e) {}

const edge = spawn(EDGE, ['--headless=new','--disable-gpu','--hide-scrollbars','--window-size=430,1700',`--remote-debugging-port=${PORT}`,`--user-data-dir=${userDir}`,'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { process.kill(-edge.pid); } catch (e) {} };
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(1); });

async function main(){
  for(let i=0;i<40;i++){
    try{ const r=await fetch(`http://127.0.0.1:${PORT}/json/version`); if(r.ok) break; }catch(e){}
    await sleep(250);
  }
  const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const tab = tabs.find(t=>t.type==='page');
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  let idc=0; const pend=new Map();
  ws.onmessage = m=>{ const d=JSON.parse(m.data); if(d.id&&pend.has(d.id)){ pend.get(d.id)(d); pend.delete(d.id); } };
  await new Promise((res,rej)=>{ ws.onopen=res; ws.onerror=rej; });
  const send = (method,params={})=>new Promise((res,rej)=>{ const id=++idc; pend.set(id,d=>d.error?rej(new Error(d.error.message)):res(d.result)); ws.send(JSON.stringify({id,method,params})); });
  const evalx = async (expr)=>{ const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true}); if(r.exceptionDetails) throw new Error('EVAL ERR: '+(r.exceptionDetails.exception?.description||r.exceptionDetails.text)); return r.result?.value; };
  const shot = async(name)=>{ const r=await send('Page.captureScreenshot',{format:'png'}); const p=path.join(OUT,name+'.png'); fs.writeFileSync(p,Buffer.from(r.data,'base64')); console.log('  [shot]',name+'.png',((fs.statSync(p).size)/1024).toFixed(1)+'KB'); };

  await send('Page.enable'); await send('Runtime.enable');

  // 进搜索页
  await send('Page.navigate',{url:URL_BASE+'#search'});
  await sleep(1500);

  // 量：搜索"觉察"耗时（同步主路径，不再触发 33MB 加载）
  console.log('[1] search "觉察" timing');
  const t0 = Date.now();
  await evalx(`document.getElementById('searchInput').value='觉察'; runSearch(); 'done';`);
  // 等候渲染完成（DOM 更新 + 计算 scoreText + 渲染 hit list）
  await sleep(50);
  const hitInfo = await evalx(`(()=>{
    const out=document.getElementById('searchOut');
    const qa=out.querySelectorAll('.qa-card, [class*="qa"]').length;
    const sec=out.querySelectorAll('.search-sec');
    const corpus=out.querySelectorAll('.s-corpus').length;
    return JSON.stringify({sec:sec.length, qa, corpus, txt:out.innerText.slice(0,200)});
  })()`);
  const t1 = Date.now();
  console.log('   elapsed:', (t1-t0)+'ms');
  console.log('   hits:', hitInfo);
  await shot('viz_search_juecha');

  // 搜索"亲密"验证另一个常见关键词
  console.log('[2] search "亲密" timing');
  const t2 = Date.now();
  await evalx(`document.getElementById('searchInput').value='亲密'; runSearch(); 'done';`);
  await sleep(50);
  const hit2 = await evalx(`(()=>{
    const out=document.getElementById('searchOut');
    const sec=out.querySelectorAll('.search-sec');
    const corpus=out.querySelectorAll('.s-corpus').length;
    return JSON.stringify({sec:sec.length, corpus});
  })()`);
  const t3 = Date.now();
  console.log('   elapsed:', (t3-t2)+'ms', 'hits:', hit2);
  await shot('viz_search_qinmi');

  console.log('\n[done] shots in', OUT);
  cleanup(); process.exit(0);
}
main().catch(e=>{ console.error('FAIL:',e.message); cleanup(); process.exit(1); });