// _repro_card_link.js — 实测：成长板块「去看卡」是否直达目标卡并展开
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
const PORT = 9231;
const URL = 'http://127.0.0.1:8123/index.html';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '_tmp_link');
const sleep = ms => new Promise(r => setTimeout(r, ms));
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=430,1600',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(OUT, '_ed')}`, 'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { process.kill(-edge.pid); } catch (e) { } };
process.on('exit', cleanup);

async function main() {
  for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) break; } catch (e) { } await sleep(250); }
  const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  let idc = 0; const pend = new Map();
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  const send = (method, params = {}) => new Promise((res, rej) => { const id = ++idc; pend.set(id, d => d.error ? rej(new Error(d.error.message)) : res(d.result)); ws.send(JSON.stringify({ id, method, params })); });
  const ev = async (x) => { const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result?.value; };
  const shot = async (n) => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(OUT, n + '.png'), Buffer.from(r.data, 'base64')); return n + '.png'; };

  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url: URL + '#heal' });
  await sleep(3500);

  console.log('[1] 页面初始状态');
  console.log('   ', await ev(`JSON.stringify({hash:location.hash, qaTotal:(typeof QA!=='undefined'?QA.length:-1), healRendered:!!document.querySelector('.h-step')})`));

  console.log('\n[2] 成长板块方法线三张卡的存在性 / 归属');
  console.log('   ', await ev(`JSON.stringify(['q-kp-c3-01','q-kp-c11-01','q-y1-06-01'].map(id=>{const c=qaById(id);return id+':'+(c?(c.category||'?')+'|'+(c.question||'').slice(0,20):'MISSING')}))`));

  console.log('\n[3] 点「① 觉察 · 看见反应 → 去看卡」');
  // 真实点击，而非直接 eval goQaCard
  const clicked = await ev(`(()=>{ const steps=document.querySelectorAll('.h-step'); if(!steps.length) return 'no-h-step'; const go=steps[0].querySelector('.hs-go'); if(!go) return 'no-hs-go'; go.click(); return 'clicked:'+go.getAttribute('onclick'); })()`);
  console.log('   ', clicked);
  await sleep(1200);
  const st = await ev(`(()=>{ const el=document.getElementById('card-q-kp-c3-01'); return JSON.stringify({hash:location.hash, cardExists:!!el, cardOpen:el?el.classList.contains('open'):null, pending:window._pendingQaCard||'-', firstCardId:(document.querySelector('.qcard')||{}).id||'-', visibleCards:document.querySelectorAll('.qcard').length, scrollY:Math.round(window.scrollY)}); })()`);
  console.log('   ', st);
  await shot('link_after_click');

  console.log('\n[4] 检查 route() 展开逻辑是否执行 scrollIntoView');
  console.log('   ', await ev(`(()=>{ const el=document.getElementById('card-q-kp-c3-01'); if(!el) return 'no-card'; const r=el.getBoundingClientRect(); return JSON.stringify({top:Math.round(r.top), inView:(r.top>-50&&r.top<window.innerHeight)}); })()`));

  console.log('\n[5] 另一条路径：从结果页「去看卡」类链接');
  await send('Page.navigate', { url: URL + '#qa' });
  await sleep(2500);
  await ev(`goQaCard('q-kp-c3-01'); 'ok';`);
  await sleep(1000);
  console.log('   ', await ev(`(()=>{ const el=document.getElementById('card-q-kp-c3-01'); return JSON.stringify({hash:location.hash, cardExists:!!el, cardOpen:el?el.classList.contains('open'):null}); })()`));

  console.log('\n[6] 重复 qaId 检查');
  console.log('   ', await ev(`(()=>{ const cnt={}; QA.forEach(c=>{cnt[c.qaId]=(cnt[c.qaId]||0)+1}); const dup=Object.keys(cnt).filter(k=>cnt[k]>1); return JSON.stringify({total:QA.length, unique:Object.keys(cnt).length, dupCount:dup.length, dupSample:dup.slice(0,8)}); })()`));

  console.log('\n[done] 截图在', OUT);
  cleanup(); process.exit(0);
}
main().catch(e => { console.error('FAIL:', e.message); cleanup(); process.exit(1); });
