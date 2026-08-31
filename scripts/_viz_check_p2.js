// P1/P2 新增能力验证：①分享图 canvas 生成 ②goQaCard 直达展开 ③?ch=N 直达章节 ④旅程回放条
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 9226;
const URL_BASE = 'http://127.0.0.1:8123/index.html';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '_tmp_viz2');
const sleep = ms => new Promise(r => setTimeout(r, ms));

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const userDir = path.resolve(__dirname, '_tmp_viz2/_ed3');
try { execSync(`Remove-Item -Recurse -Force -ErrorAction SilentlyContinue '${userDir}'`, { stdio: 'ignore', shell: 'powershell' }); } catch (e) {}

const edge = spawn(EDGE, ['--headless=new','--disable-gpu','--hide-scrollbars','--window-size=430,1700',`--remote-debugging-port=${PORT}`,`--user-data-dir=${userDir}`,'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { process.kill(-edge.pid); } catch (e) {} };
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(1); });

const BOOT = (extra) => `(async()=>{
  const T = (window.T ||= {view:'cover',gender:null,quiz:null,answers:{},idx:0,snap:null,chapters:[],shuffled:{},meta:{}});
  const quiz = await new Promise(res=>loadQuiz('male', q=>res(q)));
  if(!quiz) throw new Error('quiz load fail');
  const chs = chaptersOf(quiz, (typeof META_LAST!=='undefined')?META_LAST:null);
  ${extra}
})()`;

async function main(){
  console.log('[0] waiting for debugger...');
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
  console.log('  ws ok');
  const send = (method,params={})=>new Promise((res,rej)=>{ const id=++idc; pend.set(id,d=>d.error?rej(new Error(d.error.message)):res(d.result)); ws.send(JSON.stringify({id,method,params})); });
  const evalx = async (expr)=>{ const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true}); if(r.exceptionDetails) throw new Error('EVAL ERR: '+(r.exceptionDetails.exception?.description||r.exceptionDetails.text)); return r.result?.value; };
  const shot = async(name)=>{ const r=await send('Page.captureScreenshot',{format:'png'}); const p=path.join(OUT,name+'.png'); fs.writeFileSync(p,Buffer.from(r.data,'base64')); console.log('  [shot]',name+'.png',((fs.statSync(p).size)/1024).toFixed(1)+'KB'); };

  await send('Page.enable'); await send('Runtime.enable');

  // ── ① 分享图 canvas 生成（章节封面 + 旅程图）──
  console.log('[1] share canvases');
  await send('Page.navigate',{url:URL_BASE+'#test'});
  await sleep(3000);
  const cvInfo = await evalx(BOOT(`
    T.quiz=quiz; T.gender='male'; T.view='flow'; T.idx=0; T.chapters=chs;
    const snap = computeResult('male', quiz, {});
    const c1 = makeChapterImage(3);
    const c2 = makeJourneyImage(snap);
    const px = (cv)=>{ const c=cv.getContext('2d'); const d=c.getImageData(0,0,cv.width,cv.height).data; let nz=0; for(let i=3;i<d.length;i+=4000){ if(d[i]>0) nz++; } return nz; };
    const d1 = c1?{w:c1.width,h:c1.height,nz:px(c1)}:null;
    const d2 = c2?{w:c2.width,h:c2.height,nz:px(c2)}:null;
    return JSON.stringify({ch3:d1, jny:d2, scenes:snap.scenes, type:snap.type});
  `));
  console.log('   canvas:', cvInfo);
  await sleep(300); await shot('viz2_share_canvas_ch3');
  // 用真实绘制到页面容器看效果（章节封面图绘制到可见 canvas）
  await evalx(`(function(){ const cv=makeChapterImage(3); if(!cv) return 'null'; const box=document.createElement('div'); box.style.cssText='position:fixed;top:0;left:0;width:430px;background:#fff;z-index:9999;'; cv.style.cssText='width:100%;height:auto;'; box.appendChild(cv); document.body.appendChild(box); return 'ok'; })()`);
  await sleep(400); await shot('viz2_chapter_card');
  // 清理 [1] 阶段注入的可视化层（fixed box），避免遮挡后续视图
  await evalx(`(()=>{ const fs=document.querySelectorAll('div[style*="position:fixed"]'); fs.forEach(d=>d.remove()); return 'cleaned='+fs.length; })()`);
  await sleep(150);

  // ── ② goQaCard 直达展开（构造回顾页场景：从第三章回顾点知识卡）──
  console.log('[2] goQaCard direct expand');
  await evalx(BOOT(`
    T.quiz=quiz; T.gender='male'; T.view='flow'; T.idx=0; T.chapters=chs; T.answers={};
    for(let i=0;i<quiz.length;i++){ if(quiz[i].chapter===3){ T.answers[quiz[i].id]=i%2; } }
    showChapterReview(3);
    return 'review items='+document.querySelectorAll('.review-item').length;
  `));
  await sleep(400);
  const targetQa = await evalx(BOOT(`
    T.quiz=quiz; T.gender='male'; T.view='flow'; T.idx=0; T.chapters=chs; T.answers={};
    for(let i=0;i<quiz.length;i++){ if(quiz[i].chapter===3){ T.answers[quiz[i].id]=i%2; } }
    showChapterReview(3);
    const lnk=document.querySelector('.review-item .review-link, .review-link');
    if(!lnk) return 'no-link';
    const qid = lnk.getAttribute('onclick').match(/'([^']+)'/)[1];
    goQaCard(qid);
    return 'qid='+qid;
  `));
  console.log('   goQaCard:', targetQa);
  await sleep(900);
  const expanded = await evalx(`(()=>{
    const el=document.getElementById('card-'+(window._lastQaId||''));
    return 'hash='+location.hash+' pending='+(window._pendingQaCard||'-')+' pin='+(window._qaPinReset||false);
  })()`);
  console.log('   post-state:', expanded);
  await sleep(400); await shot('viz2_qa_expanded');

  // ── ③ ?ch=N 直达章节（模拟 boot 解析后 startGender 跳章）──
  console.log('[3] ?ch=N direct chapter');
  await evalx(BOOT(`
    T.quiz=quiz; T.gender='male'; T.view='cover'; T.idx=0; T.answers={}; T.chapters=chs;
    window._pendingChapter=4;
    startGender('male', null);
    return 'triggered';
  `));
  await sleep(900);
  const chState = await evalx(`(()=>{ const t=window.T; return 'view='+t.view+' idx='+t.idx+' pending='+(window._pendingChapter||'-'); })()`);
  console.log('   ch-state:', chState);
  const chTitle = await evalx(`(()=>{ const el=document.querySelector('.ch-no'); return el?el.textContent:'no-ch-no'; })()`);
  console.log('   ch-head:', chTitle);
  await sleep(300); await shot('viz2_ch4_direct');

  // ── ④ 结果页旅程回放条 ──
  console.log('[4] journey recap on result');
  await evalx(BOOT(`
    T.quiz=quiz; T.gender='male'; T.view='flow'; T.idx=0; T.chapters=chs; T.answers={};
    for(let i=0;i<quiz.length;i++){ T.answers[quiz[i].id]=(i%3); }
    const snap=computeResult('male', quiz, T.answers);
    T.snap=snap; T.view='result';
    const box=document.getElementById('testBox'); box.innerHTML=''; renderResultInto(box, snap, {fresh:true});
    const n=document.querySelectorAll('.jr-node').length;
    const first=document.querySelector('.jr-node');
    return 'nodes='+n+' first='+(first?first.textContent.trim().slice(0,30):'-');
  `));
  await sleep(600); await shot('viz2_result_recap');
  const recapState = await evalx(`(()=>{ const el=document.querySelector('.journey-recap'); return el?'recap-ok':'recap-missing'; })()`);
  console.log('   recap:', recapState);

  console.log('\n[done] all shots in', OUT);
  cleanup(); process.exit(0);
}
main().catch(e=>{ console.error('FAIL:',e.message); cleanup(); process.exit(1); });
