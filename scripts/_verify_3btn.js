// _verify_3btn.js — 三种播放入口并排验证
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
const PORT = 9282;
const URL = 'http://127.0.0.1:8123/index.html';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '_tmp_3btn');
const sleep = ms => new Promise(r => setTimeout(r, ms));
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
try { fs.rmSync(OUT + '/_ed', { recursive: true, force: true }); } catch (e) { }

const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=430,1600',
  '--autoplay-policy=no-user-gesture-required', `--remote-debugging-port=${PORT}`, `--user-data-dir=${OUT}/_ed`, 'about:blank'], { stdio: 'ignore' });
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
  await send('Page.navigate', { url: URL + '#qa' });
  await sleep(3500);

  // 找第一张「有音频且在 DOM 中」的卡
  const info = await ev(`(()=>{
    var keys=Object.keys(AUDIO_MANIFEST||{});
    for(var i=0;i<keys.length;i++){
      var p=keys[i].split('__');
      if(document.getElementById('card-'+p[0])){ return JSON.stringify({qaId:p[0], idx:+p[1]}); }
    }
    return 'none';
  })()`);
  console.log('[目标卡]', info);
  if (info === 'none') { console.log('无可用卡'); cleanup(); process.exit(0); }
  const o = JSON.parse(info);
  await ev(`goQaCard('${o.qaId}'); 'ok';`);
  await sleep(1400);

  console.log('[按钮清单]', await ev(`(()=>{
    var el=document.getElementById('card-${o.qaId}'); if(!el) return 'nocard';
    el.classList.add('open');
    return JSON.stringify([...el.querySelectorAll('.ev-go,.ev-ext')].map(function(b){
      return b.textContent.trim()+' | '+b.className;
    }));
  })()`));

  // ① 音频
  await ev(`(()=>{var b=document.querySelector('#card-${o.qaId} .ev-go-audio'); if(b) toggleEvPlayer(b,'audio'); return 'ok';})()`);
  await sleep(1500);
  console.log('[①🔊音频]', await ev(`JSON.stringify({audio:!!document.querySelector('.ev-audio'), iframe:!!document.querySelector('.evp-frame'), paused:(document.querySelector('.ev-audio')||{}).paused, src:(document.querySelector('.ev-audio')||{}).getAttribute?document.querySelector('.ev-audio').getAttribute('src'):''})`));
  await shot('btn_audio');

  // ② 视频（切换到同一条的内嵌视频）
  await ev(`(()=>{var b=document.querySelector('#card-${o.qaId} .ev-go-video'); if(b) toggleEvPlayer(b,'video'); return 'ok';})()`);
  await sleep(2000);
  console.log('[②▶视频]', await ev(`JSON.stringify({audio:!!document.querySelector('.ev-audio'), iframe:!!document.querySelector('.evp-frame'), src:(document.querySelector('.evp-frame')||{}).src||''})`));
  await shot('btn_video');

  // ③ 停止后按钮文本恢复
  await ev(`(()=>{var b=document.querySelector('.ev-go[data-on="1"]'); if(b) destroyEvPlayer(b.getAttribute('data-qa'), parseInt(b.getAttribute('data-idx'),10), b); return 'stopped';})()`);
  await sleep(700);
  console.log('[③停止后]', await ev(`(()=>{var el=document.getElementById('card-${o.qaId}'); return JSON.stringify([...el.querySelectorAll('.ev-go')].map(function(b){return b.textContent.trim()}));})()`));

  // ④ 外跳链接
  console.log('[④B站↗]', await ev(`(()=>{var b=document.querySelector('#card-${o.qaId} .ev-ext'); return b?b.getAttribute('href'):'none';})()`));

  console.log('\n[done]', OUT);
  cleanup(); process.exit(0);
}
main().catch(e => { console.error('FAIL:', e.message); cleanup(); process.exit(1); });
