// Edge headless + CDP 驱动测试流程：cover/chapter/question/selected/review 5 视图截屏（单 tab 复用）
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 9225;
const URL_BASE = 'http://127.0.0.1:8123/index.html';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '_tmp_viz');
const sleep = ms => new Promise(r => setTimeout(r, ms));

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const userDir = path.resolve(__dirname, '_tmp_viz/_ed3');
try { execSync(`Remove-Item -Recurse -Force -ErrorAction SilentlyContinue '${userDir}'`, { stdio: 'ignore', shell: 'powershell' }); } catch (e) {}

const edge = spawn(EDGE, ['--headless=new','--disable-gpu','--hide-scrollbars','--window-size=430,1700',`--remote-debugging-port=${PORT}`,`--user-data-dir=${userDir}`,'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { process.kill(-edge.pid); } catch (e) {} };
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(1); });

// 复用 quiz 注入的 eval 前缀（直接用站内 loadQuiz/chaptersOf，贴近真实流程）
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

  // 1) cover
  console.log('[1] cover');
  await send('Page.navigate',{url:URL_BASE+'#test'});
  await sleep(3200);
  await evalx(`document.getElementById('testBox')?.scrollIntoView({block:'start'});`);
  await sleep(250); await shot('viz_cover');

  // 2) chapter intro
  console.log('[2] chapter intro');
  await evalx(BOOT(`T.quiz=quiz; T.gender='male'; T.view='flow'; T.idx=0; T.chapters=chs; showChapterIntro(); return 'ok chs='+chs.length+' title='+chs[0].title;`));
  await sleep(300); await shot('viz_chapter');

  // 3) question
  console.log('[3] question');
  await evalx(BOOT(`T.quiz=quiz; T.gender='male'; T.view='flow'; T.idx=2; T.answers={}; T.chapters=chs; showQuestion(); return 'ok q-scene='+(quiz[2].scene||'NA');`));
  await sleep(300); await shot('viz_question');

  // 4) selected
  console.log('[4] selected');
  await evalx(`var o=document.querySelectorAll('.q-opt'); if(o.length>=2) o[1].click(); 'clicked='+o.length;`);
  await sleep(600); await shot('viz_question_selected');

  // 5) review ch1
  console.log('[5] chapter review');
  await evalx(BOOT(`T.quiz=quiz; T.gender='male'; T.view='flow'; T.idx=0; T.chapters=chs; T.answers={};
    for(let i=0;i<quiz.length;i++){ if(quiz[i].chapter===1){ T.answers[quiz[i].id]=i%2; } }
    showChapterReview(1);
    return 'ok items='+document.querySelectorAll('.review-item').length+' pols='+document.querySelectorAll('.pol').length;`));
  await sleep(300); await shot('viz_review');

  console.log('\n[done] all shots in', OUT);
  cleanup(); process.exit(0);
}
main().catch(e=>{ console.error('FAIL:',e.message); cleanup(); process.exit(1); });
