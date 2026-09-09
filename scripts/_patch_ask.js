// _patch_ask.js — 插入「智能问答（语料检索式）」到问一问顶部
const fs = require('fs');
const P = 'index.html';
let s = fs.readFileSync(P, 'utf-8');

const HTML = `
      <!-- 智能问答（语料检索式）：问 → 匹配卡片 + 老师原话 + B站精确秒 -->
      <div class="qa-ask-wrap">
        <div class="qa-ask-head"><span class="qa-ask-icon">✦</span><span>问老师 · 用语料回答</span></div>
        <div class="qa-ask-row">
          <input id="qaAskInput" class="qa-ask-input" type="search" placeholder="问一句，比如：为什么阴总是内耗？" onkeydown="if(event.key==='Enter')qaAsk()" autocomplete="off">
          <button class="qa-ask-btn" onclick="qaAsk()">问</button>
        </div>
        <div class="qa-ask-egs" id="qaAskEgs"></div>
        <div id="qaAskResult"></div>
      </div>
      <!-- 知识树导引 -->`.replace(/^\n/, '');

const CSS = `
/* ── 智能问答（问一问顶部）── */
.qa-ask-wrap{margin:0 0 14px;padding:14px;background:linear-gradient(135deg,rgba(232,145,58,.07),rgba(78,110,158,.07));border:1px solid var(--card-line);border-radius:var(--r-md)}
.qa-ask-head{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--ink);margin-bottom:9px}
.qa-ask-icon{color:var(--yang);font-size:14px}
.qa-ask-row{display:flex;gap:8px}
.qa-ask-input{flex:1;min-width:0;padding:10px 14px;font-size:14px;font-family:inherit;color:var(--ink);background:var(--card);border:1.5px solid var(--line);border-radius:999px;outline:none}
.qa-ask-input:focus{border-color:var(--yang)}
.qa-ask-btn{flex:none;padding:10px 20px;font-size:14px;font-family:inherit;font-weight:600;color:#fff;background:var(--yang);border:none;border-radius:999px;cursor:pointer}
.qa-ask-egs{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}
.qa-ask-eg{padding:5px 11px;font-size:12px;color:var(--ink-2);background:rgba(255,255,255,.7);border:1px solid var(--line);border-radius:999px;cursor:pointer}
.qa-ask-eg:hover{border-color:var(--yang);color:var(--yang)}
.qa-ans{margin-top:12px;padding:13px;background:var(--card);border:1px solid var(--card-line);border-radius:var(--r-sm)}
.qa-ans-top{display:flex;align-items:baseline;gap:8px;margin-bottom:8px}
.qa-ans-q{font-size:13.5px;font-weight:600;color:var(--ink);flex:1;min-width:0}
.qa-ans-score{font-size:11px;color:var(--fog);flex:none}
.qa-ans-body{font-size:14px;line-height:1.75;color:var(--ink-2);padding:10px 12px;background:var(--yang-soft);border-left:3px solid var(--yang);border-radius:6px;margin-bottom:10px}
.qa-ans-sub{font-size:12px;color:var(--fog);margin:10px 0 6px}
.qa-ans-ev{padding:9px 11px;background:var(--soft);border-radius:6px;margin-bottom:7px;font-size:13px;line-height:1.7}
.qa-ans-ev-meta{display:flex;align-items:center;gap:10px;margin-top:5px;font-size:11.5px}
.qa-ans-rel{display:flex;flex-direction:column;gap:5px}
.qa-ans-rel-item{padding:8px 11px;background:var(--card);border:1px solid var(--line);border-radius:6px;font-size:13px;cursor:pointer}
.qa-ans-rel-item:hover{border-color:var(--yin);color:var(--yin)}
.qa-ans-empty{padding:12px;font-size:13px;color:var(--fog);text-align:center}
`;

const JS = `
/* ══════ 智能问答（语料检索式，零依赖纯前端）═════
   问句 → 匹配 265 张卡 + 513 条佐证原话 → 返回老师原话 + B站精确秒 + 相关卡片 */
var QA_ASK_STOP=('的 了 是 在 我 有 和 就 不 人 都 一 一个 上 也 很 到 说 要 去 你 会 着 没有 看 好 自己 这 那 '+
  '什么 为什么 怎么 如何 吗 呢 吧 啊 请问 一下 可以 能 它 他 她 我们 你们 他们 因为 所以 但是 如果 真的 到底 总是 一直 常常 觉得 感觉').split(' ');
var QA_ASK_EGS=['为什么阴总是内耗','阳和阴怎么判断','男阳为什么不会求助','女阴为什么越爱越抓','怎么生发对侧能量','四型人格怎么来的'];
var _qaAskIdx=null;
function qaAskIdx(){
  if(_qaAskIdx) return _qaAskIdx;
  _qaAskIdx=QA.map(function(c){
    return {c:c,q:c.question||'',a:c.answerBrief||'',ins:(c.insight||[]).join(' '),qt:c.quote||'',evs:(c.evidence||c.answer||[])};
  });
  return _qaAskIdx;
}
function qaAskTokens(s){
  var t=(s||'').replace(/[^\\u4e00-\\u9fa5a-zA-Z0-9]/g,' ').toLowerCase().split(/\\s+/)
    .filter(function(w){ return w && QA_ASK_STOP.indexOf(w)<0; });
  var g=[];
  t.forEach(function(w){
    if(/[\\u4e00-\\u9fa5]/.test(w)){
      if(w.length<=2){ g.push(w); }
      else{ g.push(w); for(var i=0;i<w.length-1;i++) g.push(w.substr(i,2)); }
    } else if(w.length>1){ g.push(w); }
  });
  return g;
}
function qaAskScore(it,g){
  var evTxt=it.evs.map(function(e){ return e.text||''; }).join(' ');
  var s=0,hit=0;
  for(var i=0;i<g.length;i++){
    var w=g[i],f=0;
    if(it.q.indexOf(w)>=0) f=6;
    if(!f && it.a.indexOf(w)>=0) f=4;
    if(!f && it.qt.indexOf(w)>=0) f=3;
    if(!f && evTxt.indexOf(w)>=0) f=3;
    if(!f && it.ins.indexOf(w)>=0) f=2;
    if(f){ s+=f; hit++; }
  }
  return s>0?{s:s+hit*hit,hit:hit}:null;
}
function qaAskSearch(q,topN){
  var g=qaAskTokens(q); if(!g.length) return [];
  var out=[];
  qaAskIdx().forEach(function(it){ var r=qaAskScore(it,g); if(r) out.push({c:it.c,evs:it.evs,s:r.s,hit:r.hit}); });
  out.sort(function(a,b){ return b.s-a.s; });
  return out.slice(0,topN||3);
}
function qaAsk(){
  var el=$('qaAskInput'),q=(el&&el.value||'').trim(),box=$('qaAskResult');
  if(!box) return;
  if(!q){ box.innerHTML='<div class="qa-ans-empty">先写个问题</div>'; return; }
  var top=qaAskSearch(q,3);
  if(!top.length){ box.innerHTML='<div class="qa-ans"><div class="qa-ans-empty">语料里没找到相关的，换个说法试试（试试「内耗」「男阳」「边界」）</div></div>'; return; }
  var best=top[0],c=best.c,h='<div class="qa-ans">';
  h+='<div class="qa-ans-top"><span class="qa-ans-q">'+esc(q)+'</span><span class="qa-ans-score">匹配 '+best.hit+' 个词</span></div>';
  var body=c.answerBrief||(c.insight&&c.insight[0])||(best.evs[0]&&best.evs[0].text)||'';
  if(body) h+='<div class="qa-ans-body">'+esc(body)+'</div>';
  var evShow=best.evs.slice(0,3);
  if(evShow.length){
    h+='<div class="qa-ans-sub">老师原话</div>';
    evShow.forEach(function(e,i){
      var bv=(/video\\/(BV[\\w]+)/.exec(e.link||'')||[])[1];
      var sec=(/[?&]t=(\\d+)/.exec(e.link||'')||[])[1];
      var mm=sec!=null?Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0'):'--:--';
      h+='<div class="qa-ans-ev">'+String(i+1)+'. '+esc(e.text||'')+'<div class="qa-ans-ev-meta">'
        +(bv?'<a class="ev-go" href="javascript:void(0)" onclick="event.stopPropagation();qaAskPlay(this,\\\\''+bv+'\\\\','+(sec||0)+')" title="网页内嵌播放">▶ '+mm+'</a>':'')
        +(bv?'<a class="ev-ext" href="https://www.bilibili.com/video/'+bv+'/'+(sec!=null?'?t='+sec:'')+'" target="_blank" rel="noopener">B站 ↗</a>':'')
        +(e.videoId?'<span style="color:var(--fog)">'+esc(e.videoId)+'</span>':'')
        +'</div></div>';
    });
  }
  if(c.quote) h+='<div class="qa-ans-sub">金句</div><div class="qa-ans-body" style="background:var(--yin-soft);border-left-color:var(--yin)">'+esc(c.quote)+'</div>';
  var rel=top.slice(1).filter(function(x){ return x.c.qaId!==c.qaId; });
  if(rel.length){
    h+='<div class="qa-ans-sub">相关卡片</div><div class="qa-ans-rel">';
    rel.forEach(function(x){ h+='<div class="qa-ans-rel-item" onclick="goQaCard(\\\\''+esc(x.c.qaId)+'\\\\')">▸ '+esc(x.c.question||'')+'</div>'; });
    h+='</div>';
  }
  h+='<div class="qa-ans-rel-item" style="margin-top:8px;text-align:center" onclick="qaNavCardDirect(\\\\''+esc(c.qaId)+'\\\\')">查看完整卡片 ›</div></div>';
  box.innerHTML=h;
}
function qaAskPlay(btn,bv,sec){
  var box=$('qaAskResult'); if(!box) return;
  var old=box.querySelector('.qa-ask-player'); if(old) old.remove();
  var d=document.createElement('div'); d.className='qa-ask-player';
  d.style.cssText='margin-top:10px;position:relative;padding-top:56.25%';
  var ifr=document.createElement('iframe');
  ifr.src='https://player.bilibili.com/player.html?bvid='+bv+'&page=1&high_quality=1&danmaku=0'
    +(isMobileDevice()?'':'&autoplay=1')+(sec?('&t='+sec):'');
  ifr.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;border:0;border-radius:8px';
  ifr.setAttribute('scrolling','no'); ifr.setAttribute('frameborder','0');
  d.appendChild(ifr); box.appendChild(d);
  try{ d.scrollIntoView({behavior:'smooth',block:'nearest'}); }catch(e){}
}
function renderQaAskEgs(){
  var box=$('qaAskEgs'); if(!box) return;
  box.innerHTML=QA_ASK_EGS.map(function(t){
    return '<span class="qa-ask-eg" onclick="qaAskFill(this.textContent)">'+esc(t)+'</span>';
  }).join('');
}
function qaAskFill(t){ var el=$('qaAskInput'); if(el){ el.value=t; qaAsk(); } }
`;

// 1) HTML
const hAnchor = '      <div id="qaNav"></div>';
if (!s.includes(hAnchor)) { console.error('HTML anchor not found'); process.exit(1); }
s = s.replace(hAnchor, HTML + '\n      <div id="qaNav"></div>', 1);

// 2) CSS
const i = s.lastIndexOf('</style>');
s = s.slice(0, i) + CSS + '\n' + s.slice(i);

// 3) JS
const jAnchor = 'function renderQaNav(){';
const j = s.indexOf(jAnchor);
if (j < 0) { console.error('JS anchor not found'); process.exit(1); }
s = s.slice(0, j) + JS + '\n' + s.slice(j);

// 4) 挂载
const tAnchor = '  try{ renderQaNav(); }catch(e){}';
if (!s.includes(tAnchor)) { console.error('tail anchor not found'); process.exit(1); }
s = s.replace(tAnchor, '  try{ renderQaNav(); renderQaAskEgs(); }catch(e){}\n}', 1);

fs.writeFileSync(P, s, 'utf-8');
console.log('插入完成，文件大小', s.length);
