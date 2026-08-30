# -*- coding: utf-8 -*-
"""搜索评分排序精准补丁（对齐视觉版 runSearch 实际文本）"""
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

P = r"D:\Workbuddy\yinyang-test\index.html"
src = open(P, encoding='utf-8').read()

def rep(s, old, new, tag):
    assert old in s, 'NOT FOUND [' + tag + ']'
    return s.replace(old, new, 1)

# 1) 函数前插 scoreText
src = rep(src, 'function runSearch(){',
"""function scoreText(hay, words, weight){
  if(!hay) return 0;
  var s=0;
  for(var i=0;i<words.length;i++){
    var idx=hay.indexOf(words[i]);
    if(idx>=0) s += weight * (idx===0 ? 1.5 : 1) * Math.min(words[i].length/2, 2);
  }
  return s;
}
function runSearch(){""", 'scoreText')

# 2) 空态 → 推荐标签
src = rep(src,
"""    out.innerHTML='<div class="empty-tip">输入关键词开始搜索<br><span style="font-size:12px;">深水内容（双生 / 九楼等）没有入口，只有你主动搜索时才会出现</span></div>';
    return;""",
"""    var tags=(typeof TAG_FREQ!=='undefined'&&TAG_FREQ)?TAG_FREQ.slice(0,12):[];
    out.innerHTML='<div class="empty-tip">输入关键词开始搜索，或试试大家都在搜：</div>'
      +'<div class="hint-chips" style="justify-content:center;padding:10px 0 20px;">'
      + tags.map(function(t){ return '<span class="chip" onclick="goSearch(\\''+t[0]+'\\')">'+t[0]+' <span style="color:#bbb">'+t[1]+'</span></span>'; }).join('')
      +'</div>';
    track('search_query',{q:'',empty:true});
    return;""", 'empty-state')

# 3) 问答卡命中 → 评分排序
old_qa = """  var qaHits=QA.filter(function(c){
    var blob=(c.question||'')+(c.answerBrief||'')+(c.quote||'')+((c.answer||[]).map(function(a){return a.text||'';}).join(''));
    return blob.indexOf(q)>=0;
  }).slice(0,12);
  var corpusHits=CORPUS.filter(function(c){
    return ((c.title||'')+(c.tags||[]).join(' ')+(c.domain||'')+(c.subGroup||'')).indexOf(q)>=0;
  });"""
new_qa = """  var words=q.split(/\\s+/).filter(function(w){return w.length>=1;});
  function blob(c){ return (c.question||'')+' '+(c.answerBrief||'')+' '+(c.quote||'')+' '+((c.answer||[]).map(function(a){return a.text||'';}).join(' ')); }
  var qaHits=QA.map(function(c){
    var s=scoreText(c.question||'',words,10)+scoreText(c.answerBrief||'',words,6)
         +scoreText(c.quote||'',words,4)+scoreText(blob(c),words,2);
    return {c:c,s:s};
  }).filter(function(x){return x.s>0;}).sort(function(a,b){return b.s-a.s;}).slice(0,12)
    .map(function(x){return x.c;});
  var corpusHits=CORPUS.map(function(c){
    var s=scoreText(c.title||'',words,10)+scoreText((c.tags||[]).join(' '),words,5)
         +scoreText((c.domain||'')+' '+(c.subGroup||''),words,2);
    return {c:c,s:s};
  }).filter(function(x){return x.s>0;}).sort(function(a,b){return b.s-a.s;})
    .map(function(x){return x.c;});
  track('search_query',{q:q});"""
src = rep(src, old_qa, new_qa, 'scoring')

# 4) 命中文案加「按相关度」
src = rep(src, "html+='<div class=\"search-sec\">问答卡 · 命中 '+qaHits.length+' 条</div>';",
              "html+='<div class=\"search-sec\">问答卡 · 命中 '+qaHits.length+' 条（按相关度）</div>';", 'sec1')
src = rep(src, "html+='<div class=\"search-sec\">语料条目 · 命中 '+corpusHits.length+' 条（显示前 30）</div>';",
              "html+='<div class=\"search-sec\">语料条目 · 命中 '+corpusHits.length+' 条（按相关度，显示前 30）</div>';", 'sec2')

# 5) 搜一搜副标题：12 处装配时已改为用户友好文案，此处无需再改

open(P, 'w', encoding='utf-8', newline='\n').write(src)
print('搜索评分补丁：4 处全部命中（scoreText/空态推荐标签/评分排序/按相关度文案）；副标题此前已更新')
