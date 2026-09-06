// _verify_android.js — 安卓多机型布局验证（横向溢出 / 元素越界 / 重叠）
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
const PORT = 9331;
const URL = 'http://127.0.0.1:8123/index.html';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '_tmp_android');
const sleep = ms => new Promise(r => setTimeout(r, ms));
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
const PROFILE = OUT + '/_ed_' + Date.now();

// 常见安卓机型
const DEVICES = [
  { n: '小屏安卓', w: 360, h: 640, dpr: 2, ua: 'Mozilla/5.0 (Linux; Android 10; SM-A105F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.99 Mobile Safari/537.36' },
  { n: 'Pixel 7', w: 412, h: 915, dpr: 2.6, ua: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' },
  { n: '华为Mate', w: 384, h: 854, dpr: 3, ua: 'Mozilla/5.0 (Linux; Android 10; ELS-NX9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 Mobile Safari/537.36' },
  { n: 'iPhone14', w: 390, h: 844, dpr: 3, ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' }
];

const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, 'about:blank'], { stdio: 'ignore' });
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

  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });

  for (const d of DEVICES) {
    await send('Emulation.setUserAgentOverride', { userAgent: d.ua, platform: d.n.includes('iPhone') ? 'iPhone' : 'Android' });
    await send('Emulation.setDeviceMetricsOverride', {
      width: d.w, height: d.h, deviceScaleFactor: d.dpr, mobile: true,
      screenWidth: d.w, screenHeight: d.h, positionX: 0, positionY: 0,
      screenOrientation: { type: 'portraitPrimary', angle: 0 }
    });
    const rows = [];
    for (const [tab, hash] of [['问一问', '#qa'], ['首页', '#home'], ['测一测', '#test']]) {
      await send('Page.navigate', { url: URL + hash });
      await sleep(2600);
      const r = await ev(`(()=>{
        var de=document.documentElement;
        var over=[];
        var vw=de.clientWidth;
        document.querySelectorAll('body *').forEach(function(el){
          var b=el.getBoundingClientRect();
          if(b.width>0 && (b.right>vw+2 || b.left<-2)){
            var t=(el.className&&el.className.baseVal===undefined?String(el.className):'').slice(0,26);
            over.push((el.tagName||'')+'.'+t+' r='+Math.round(b.right));
          }
        });
        return JSON.stringify({
          scrollW: de.scrollWidth, clientW: vw,
          hOverflow: de.scrollWidth > vw + 2,
          overflowCount: over.length,
          sample: over.slice(0,3)
        });
      })()`);
      rows.push([tab, JSON.parse(r)]);
      await send('Page.captureScreenshot', { format: 'png' }).then(res => {
        fs.writeFileSync(path.join(OUT, d.n.replace(/\s/g, '') + '_' + tab + '.png'), Buffer.from(res.data, 'base64'));
      });
    }
    console.log(`\n【${d.n}】${d.w}x${d.h} dpr${d.dpr}`);
    for (const [tab, r] of rows) {
      console.log(`   ${tab.padEnd(4)} 横向溢出=${r.hOverflow ? '❌ ' + r.scrollW + '>' + r.clientW : '否 ✅'}  越界元素=${r.overflowCount}${r.overflowCount ? ' → ' + r.sample.join(' | ') : ''}`);
    }
  }

  console.log('\n[done] 截图目录', OUT);
  cleanup(); process.exit(0);
}
main().catch(e => { console.error('FAIL:', e.message); cleanup(); process.exit(1); });
