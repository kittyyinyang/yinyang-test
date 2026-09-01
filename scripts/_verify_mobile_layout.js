// _verify_mobile_layout.js — 移动端(375px)三按钮布局验证
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
const PORT = 9292;
const URL = 'http://127.0.0.1:8123/index.html';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '_tmp_m3');
const sleep = ms => new Promise(r => setTimeout(r, ms));
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
try { fs.rmSync(OUT + '/_ed', { recursive: true, force: true }); } catch (e) { }

const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`, `--user-data-dir=${OUT}/_ed`, 'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { process.kill(-edge.pid); } catch (e) { } };
process.on('exit', cleanup);

async function main() {
  for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) break; } catch (e) { } await sleep(250); }
  const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  let idc = 0; const pend = new Map();
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  const send = (m, p = {}) => new Promise((res, rej) => { const id = ++idc; pend.set(id, d => d.error ? rej(new Error(d.error.message)) : res(d.result)); ws.send(JSON.stringify({ id, method: m, params: p })); });
  const ev = async x => { const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result?.value; };
  const shot = async n => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(OUT, n + '.png'), Buffer.from(r.data, 'base64')); return n; };

  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 1200, deviceScaleFactor: 2, mobile: true, screenWidth: 375, screenHeight: 1200, positionX: 0, positionY: 0, screenOrientation: { type: 'portraitPrimary', angle: 0 } });
  await send('Page.navigate', { url: URL + '#qa' });
  await sleep(3500);

  const qa = await ev(`(()=>{
    /* 音频方案已移除：改为取第一张「有语料佐证且在 DOM 中」的卡 */
    for(var i=0;i<QA.length;i++){
      var c=QA[i];
      if((c.evidence||c.answer||[]).length && document.getElementById('card-'+c.qaId)){
        goQaCard(c.qaId); return c.qaId;
      }
    }
    return 'none';
  })()`);
  console.log('[目标卡]', qa);
  await sleep(1500);

  console.log('[布局]', await ev(`(()=>{
    var el=document.getElementById('card-${qa}'); if(!el) return 'nocard';
    el.classList.add('open');
    var it=el.querySelector('.ev-item');
    var r=it.getBoundingClientRect();
    var bs=[...it.querySelectorAll('.ev-go,.ev-ext')].map(function(b){
      var x=b.getBoundingClientRect();
      return b.textContent.trim()+' → '+Math.round(x.width)+'x'+Math.round(x.height)+' (y='+Math.round(x.top)+')';
    });
    return JSON.stringify({itemWidth:Math.round(r.width), itemHeight:Math.round(r.height), buttons:bs}, null, 1);
  })()`));
  await shot('mobile_3btn');

  console.log('[done]', OUT);
  cleanup(); process.exit(0);
}
main().catch(e => { console.error('FAIL:', e.message); cleanup(); process.exit(1); });
