// _verify_after_fix.js — 修正后浏览器实测：卡片直达 + evidence 播放跳转时间点
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
const PORT = 9241;
const URL = 'http://127.0.0.1:8123/index.html';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '_tmp_after');
const sleep = ms => new Promise(r => setTimeout(r, ms));
if (fs.existsSync(OUT + '/_ed')) { try { fs.rmSync(OUT + '/_ed', { recursive: true }); } catch (e) { } }
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=430,1600',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${OUT}/_ed`, 'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { process.kill(-edge.pid); } catch (e) { } };
process.on('exit', cleanup);

// 抽查清单：qaId -> 证据索引 -> 期望 t（来自 _ev_fix_applied.json 的前若干条）
const applied = JSON.parse(fs.readFileSync(path.join(__dirname, '_ev_fix_applied.json'), 'utf8')).applied;
const samples = applied.slice(0, 12);

async function main() {
  for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) break; } catch (e) { } await sleep(250); }
  const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  let idc = 0; const pend = new Map();
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
  await new Promise(r => ws.onopen = r);
  const send = (m, p = {}) => new Promise((res, rej) => { const id = ++idc; pend.set(id, d => d.error ? rej(new Error(d.error.message)) : res(d.result)); ws.send(JSON.stringify({ id, method: m, params: p })); });
  const ev = async x => { const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result?.value; };
  const shot = async n => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(OUT, n + '.png'), Buffer.from(r.data, 'base64')); return n; };

  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url: URL + '#qa' });
  await sleep(3500);

  console.log('[1] evidence 时间点抽查（链接 t 值 vs 期望）');
  const check = await ev(`JSON.stringify(${JSON.stringify(samples)}.map(function(s){
    var c=qaById(s.qa); if(!c) return {qa:s.qa, err:'no-card'};
    var EV=c.evidence||c.answer||[]; var e=EV[s.i]; if(!e) return {qa:s.qa, err:'no-ev'};
    var m=/video\\/(BV[\\w]+)/.exec(e.link||''), t=/[?&]t=(\\d+)/.exec(e.link||'');
    return {qa:s.qa, i:s.i, bv:m?m[1]:'', t:t?+t[1]:-1, expBv:s.bestBv, expT:s.bestSec,
            ok:(m&&m[1]===s.bestBv&&t&&Math.abs(+t[1]-s.bestSec)<=2)};
  }))`);
  const arr = JSON.parse(check);
  const bad = arr.filter(x => !x.ok);
  console.log(`   ${arr.length - bad.length}/${arr.length} 正确`);
  bad.forEach(b => console.log('   ❌', JSON.stringify(b)));

  console.log('\n[2] 播放器 iframe URL 实际生成（抽查前 3 条）');
  const ifr = await ev(`(()=>{
    var out=[];
    ${JSON.stringify(samples.slice(0, 3))}.forEach(function(s){
      var c=qaById(s.qa); if(!c) return;
      var e=(c.evidence||c.answer||[])[s.i]; if(!e) return;
      var p=parseBili(e.link||'');
      out.push({qa:s.qa, i:s.i, bv:p.bv, sec:p.sec, url:'https://player.bilibili.com/player.html?bvid='+p.bv+'&page=1&high_quality=1&danmaku=0&autoplay=1'+(p.sec>=0?('&t='+p.sec):'')});
    });
    return JSON.stringify(out);
  })()`);
  JSON.parse(ifr).forEach(x => console.log('   ', x.qa + '#' + x.i, x.bv, 't=' + x.sec, '\n      ', x.url));

  console.log('\n[3] 成长板块「去看卡」直达（3 条方法线）');
  await send('Page.navigate', { url: URL + '#heal' });
  await sleep(3000);
  for (const idx of [0, 1, 2]) {
    await send('Page.navigate', { url: URL + '#heal' });
    await sleep(2200);
    const r = await ev(`(()=>{
      var steps=document.querySelectorAll('.h-step'); if(steps.length<=${idx}) return 'no-step';
      var go=steps[${idx}].querySelector('.hs-go'); if(!go) return 'no-go';
      var id=(go.getAttribute('onclick')||'').match(/'([^']+)'/); var qid=id?id[1]:'';
      go.click(); return qid;
    })()`);
    await sleep(900);
    const st = await ev(`(()=>{ var el=document.getElementById('card-${'${r}'}'); if(!el) return 'no-card'; var b=el.getBoundingClientRect();
      return JSON.stringify({open:el.classList.contains('open'), top:Math.round(b.top), inView:(b.top>-80&&b.top<window.innerHeight)}); })()`.replace('${r}', r));
    console.log(`   ${idx}: ${r} → ${st}`);
  }
  await shot('after_heal_card');

  console.log('\n[4] 知识卡 UI：语料佐证区按钮数量（应为 1 个 ▶，无「B站 ↗」）');
  await send('Page.navigate', { url: URL + '#qa' });
  await sleep(2800);
  const btns = await ev(`(()=>{ var c=document.querySelector('.qcard'); if(!c) return 'no-card'; c.click();
    setTimeout(function(){},0);
    return JSON.stringify({evGo:c.querySelectorAll('.ev-go').length, evExt:c.querySelectorAll('.ev-ext').length, head:(c.querySelector('.ev-head')||{}).textContent||''}); })()`);
  console.log('   ', btns);

  console.log('\n[done] 截图', OUT);
  cleanup(); process.exit(0);
}
main().catch(e => { console.error('FAIL:', e.message); cleanup(); process.exit(1); });
