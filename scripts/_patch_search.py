# -*- coding: utf-8 -*-
"""搜索优化补丁：①相关度评分排序（标题>标签>子组，多词支持）②推荐标签（TAG_FREQ 驱动）
应用时机：前端功能 Agent 交付后、走查前。锚点基于视觉版 runSearch（逻辑层未被视觉改动）。"""
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

P = r"D:\Workbuddy\yinyang-test\index.html"
src = open(P, encoding='utf-8').read()

def rep(s, old, new, tag):
    assert old in s, 'NOT FOUND [' + tag + ']'
    return s.replace(old, new, 1)

# ── 1) runSearch 重写：评分排序 + 多词支持（替换原 indexOf 布尔版） ──
old_rs = """function runSearch(){
  var q=($('searchInput').value||'').trim();
  var out=$('searchOut');
  if(!q){
    out.innerHTML='<div class="empty-tip">输入关键词开始搜索<br><span style="font-size:12px;">深水内容（双生 / 九楼等）没有入口，只有你主动搜索时才会出现</span></div>';
    return;
  }
  var qaHits=QA.filter(function(c){
    var blob=(c.question||'')+(c.answerBrief||'')+(c.quote||'')+((c.answer||[]).map(function(a){return a.text||'';}).join(''));
    return blob.indexOf(q)>=0;
  }).slice(0,12);
  var corpusHits=CORPUS.filter(function(c){
    return ((c.title||'')+(c.tags||[]).join(' ')+(c.subGroup||'')).indexOf(q)>=0;
  });
  var html='';
  html+='<div class="search-sec">问答卡 · 命中 '+qaHits.length+' 条</div>';
  html+=qaHits.length
    ? qaHits.map(function(c){ return qaCardHtml(c,q); }).join('')
    : '<div class="empty-tip" style="padding:18px;">没有命中的问答卡</div>';
  html+='<div class="search-sec">语料条目 · 命中 '+corpusHits.length+' 条（显示前 30）</div>';
  if(corpusHits.length){
    html+=corpusHits.slice(0,30).map(function(c){
      var badge=c.advanced?'<span class="adv-badge">进阶</span>':'';
      var go=c.bv?('<a class="sc-go" href="https://www.bilibili.com/video/'+esc(c.bv)+'" target="_blank" rel="noopener">▶ B站</a>'):'';
      return '<div class="s-corpus">'+badge
        +'<div style="flex:1;min-width:160px;"><div class="sc-t">'+hl(c.title,q)+'</div>'
        +'<div class="sc-meta">'+esc(c.id)+' · '+esc(c.module)+' · '+esc(c.subGroup||'')+' · '+esc((c.tags||[]).slice(0,4).join(' / '))+'</div></div></div>';
    }).join('');
    if(corpusHits.length>30) html+='<div class="empty-tip" style="padding:8px;">其余 '+(corpusHits.length-30)+' 条已省略，试试更精确的关键词</div>';
  } else {
    html+='<div class="empty-tip" style="padding:18px;">没有命中的语料条目</div>';
  }
  out.innerHTML=html;
}"""
new_rs = """function scoreText(hay, words, weight){
  if(!hay) return 0;
  var s=0;
  for(var i=0;i<words.length;i++){
    var idx=hay.indexOf(words[i]);
    if(idx>=0) s += weight * (idx===0 ? 1.5 : 1) * Math.min(words[i].length/2, 2);
  }
  return s;
}
function runSearch(){
  var q=($('searchInput').value||'').trim();
  var out=$('searchOut');
  if(!q){
    var tags=(typeof TAG_FREQ!=='undefined'&&TAG_FREQ)?TAG_FREQ.slice(0,12):[];
    out.innerHTML='<div class="empty-tip">输入关键词开始搜索，或试试大家都在搜：</div>'
      +'<div class="hint-chips" style="justify-content:center;padding:10px 0 20px;">'
      + tags.map(function(t){ return '<span class="chip" onclick="goSearch(\\''+t[0]+'\\')">'+t[0]+' <span style="color:#bbb">'+t[1]+'</span></span>'; }).join('')
      +'</div>';
    return;
  }
  var words=q.split(/\\s+/).filter(function(w){return w.length>=1;});
  function blob(c){ return (c.question||'')+' '+(c.answerBrief||'')+' '+(c.quote||'')+' '+((c.answer||[]).map(function(a){return a.text||'';}).join(' ')); }
  // 问答卡：question 权重最高
  var qaScored=QA.map(function(c){
    var s=scoreText(c.question||'',words,10)+scoreText(c.answerBrief||'',words,6)
         +scoreText(c.quote||'',words,4)+scoreText(blob(c),words,2);
    return {c:c,s:s};
  }).filter(function(x){return x.s>0;}).sort(function(a,b){return b.s-a.s;}).slice(0,12);
  // 语料条目：title 10 / tags 5 / 子组 2，全部带B站链接（N系列已数据层剔除）
  var corpusScored=CORPUS.map(function(c){
    var s=scoreText(c.title||'',words,10)+scoreText((c.tags||[]).join(' '),words,5)+scoreText(c.subGroup||'',words,2);
    return {c:c,s:s};
  }).filter(function(x){return x.s>0;}).sort(function(a,b){return b.s-a.s;});
  var html='';
  html+='<div class="search-sec">问答卡 · 命中 '+qaScored.length+' 条（按相关度）</div>';
  html+=qaScored.length
    ? qaScored.map(function(x){ return qaCardHtml(x.c,q); }).join('')
    : '<div class="empty-tip" style="padding:18px;">没有命中的问答卡 —— 试试下面的语料条目，或换个关键词</div>';
  html+='<div class="search-sec">语料条目 · 命中 '+corpusScored.length+' 条（按相关度，显示前 30）</div>';
  if(corpusScored.length){
    html+=corpusScored.slice(0,30).map(function(x){
      var c=x.c;
      var badge=c.advanced?'<span class="adv-badge">进阶</span>':'';
      var go=c.bv?('<a class="sc-go" href="https://www.bilibili.com/video/'+esc(c.bv)+'" target="_blank" rel="noopener">▶ B站</a>'):'';
      return '<div class="s-corpus">'+badge
        +'<div style="flex:1;min-width:160px;"><div class="sc-t">'+hl(c.title,q)+'</div>'
        +'<div class="sc-meta">'+esc(c.id)+' · '+esc(c.module)+' · '+esc(c.subGroup||'')+' · '+esc((c.tags||[]).slice(0,4).join(' / '))+'</div></div>'
        +go+'</div>';
    }).join('');
    if(corpusScored.length>30) html+='<div class="empty-tip" style="padding:8px;">其余 '+(corpusScored.length-30)+' 条已省略，试试更精确的关键词</div>';
  } else {
    html+='<div class="empty-tip" style="padding:18px;">没有命中的语料条目</div>';
  }
  track('search_query',{q:q});
  out.innerHTML=html;
}"""
src = rep(src, old_rs, new_rs, 'runSearch')

# ── 2) 搜一搜页副标题补推荐标签引导 ──
src = rep(src,
  '<p class="page-sub">问答卡 &gt; 语料条目，两级召回；深水内容仅搜索可达，请自行判断深浅。</p>',
  '<p class="page-sub">问一问没有找到的问题？用关键词搜全库语料，一键直达B站视频对应位置。</p>', 'search-sub-v2')

open(P, 'w', encoding='utf-8', newline='\n').write(src)
print('搜索优化补丁应用成功（评分排序 + 多词 + 推荐标签 + track 埋点）')
