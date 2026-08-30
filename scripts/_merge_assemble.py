# -*- coding: utf-8 -*-
"""总装配：把 preview-static.html 上验证过的内容升级移植到视觉升级后的 index.html
12 处替换，逐处 assert 防静默失败。"""
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

P = r"D:\Workbuddy\yinyang-test\index.html"
src = open(P, encoding='utf-8').read()
n0 = len(src)

def rep(s, old, new, tag):
    assert old in s, 'NOT FOUND [' + tag + ']: ' + old[:60]
    return s.replace(old, new, 1)

# 1) script 引入 qa_core.js
src = rep(src, '<script src="data/data_qa.js"></script>',
          '<script src="data/data_qa.js"></script>\n<script src="data/qa_core.js"></script>', 'script')

# 2) QA 池合并（core 优先 + QA_CORE2 预埋 + LEARN_ORDER 学习编号）
old_pool = """var QA = [];
(function(){
  var seen = {};
  function push(c){ if(c && c.qaId && !seen[c.qaId]){ seen[c.qaId] = 1; QA.push(c); } }
  if(typeof QA_DATA !== 'undefined' && QA_DATA) QA_DATA.forEach(push);
  if(typeof QA_CLIPS_NEW !== 'undefined' && QA_CLIPS_NEW && QA_CLIPS_NEW.forEach) QA_CLIPS_NEW.forEach(push);
})();"""
new_pool = """var QA = [];
(function(){
  var seen = {}, coreKp = {};
  function absorbCore(list){
    (list||[]).forEach(function(c){
      if(!c || !c.qaId || seen[c.qaId]) return;
      seen[c.qaId] = 1; c._core = 1;
      if(c.kpId) coreKp[c.kpId] = 1;
      QA.push(c);
    });
  }
  if(typeof QA_CORE !== 'undefined') absorbCore(QA_CORE);
  if(typeof QA_CORE2 !== 'undefined') absorbCore(QA_CORE2);
  function push(c){
    if(!c || !c.qaId || seen[c.qaId]) return;
    if(c.kpId && coreKp[c.kpId]) return;
    seen[c.qaId] = 1; QA.push(c);
  }
  if(typeof QA_DATA !== 'undefined' && QA_DATA) QA_DATA.forEach(push);
  if(typeof QA_CLIPS_NEW !== 'undefined' && QA_CLIPS_NEW && QA_CLIPS_NEW.forEach) QA_CLIPS_NEW.forEach(push);
  var LEARN_ORDER = ['y0-02','y0-11','y0-04','kp-a2','y1-01','y1-03','y1-04','y1-06','y1-08','y1-11','y1-07','y1-17','y1-12','y1-09','y1-10','y1-16','y1-13','y1-18','y1-20','y1-15','y1-22','y1-23','y1-24','y1-25','y1-14','y1-19','y1-21','y2-03','y2-05','y2-10','y3-01','y3-08','y3-09','y3-10','y3-11','y3-b3d','y3-age','y4-01','y4-02','y4-04','y5-08','y5-12','B714'];
  var orderIdx = {};
  LEARN_ORDER.forEach(function(k,i){ orderIdx[k]=i; });
  QA.filter(function(c){ return c._core; }).sort(function(a,b){
    var ia = (a.kpId in orderIdx) ? orderIdx[a.kpId] : 90 + (a.stage||9)*10;
    var ib = (b.kpId in orderIdx) ? orderIdx[b.kpId] : 90 + (b.stage||9)*10;
    return ia - ib;
  }).forEach(function(c,i){ c.seq = i+1; });
})();"""
src = rep(src, old_pool, new_pool, 'pool')

# 3) qaCardHtml（insight 主体 + evidence「」原话 + ▶ 圆钮 + emLead 条内分层）
old_card = """function qaCardHtml(c, q){
  var scenes=(c.scene||[]).map(function(s){
    var m={love:['💗 情感','scene-love'],work:['💼 职场','scene-work'],family:['🏠 家庭','scene-family'],school:['📚 校园','scene-work'],self:['🌙 独处','scene-work']};
    return m[s]?('<span class="scene-chip '+m[s][1]+'">'+m[s][0]+'</span>'):'';
  }).join('');
  var src=(c.videoTitle?('《'+c.videoTitle+'》'):'');
  return '<div class="qcard" id="card-'+esc(c.qaId)+'" onclick="toggleQa(this)">'
    +'<div><span class="cat-badge">'+esc(c.category||'问答')+'</span>'+scenes+'</div>'
    +'<div class="qcard-q">'+hl(c.question,q)+'</div>'
    +'<div class="qcard-brief">'+hl(c.answerBrief,q)+'</div>'
    +'<div class="qcard-toggle">展开证据 ▾</div>'
    +'<div class="qcard-body">'
      +qaEvidenceHtml(c)
      +(c.quote?('<div class="quote">'+hl(c.quote,q)+'</div>'):'')
      +'<div class="qcard-foot">'
        +'<span class="video-src">'+esc(src)+'</span>'
        +'<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();shareKp(\\''+esc(c.qaId)+'\\')">分享这一条</button>'
      +'</div>'
      +'<div class="share-tip">朋友打开链接会直达这张卡 · 也可以把整卷测评分享出去</div>'
    +'</div>'
  +'</div>';
}"""
new_card = """function qaCardHtml(c, q){
  var scenes=(c.scene||[]).map(function(s){
    var m={love:['💗 情感','scene-love'],work:['💼 职场','scene-work'],family:['🏠 家庭','scene-family'],school:['📚 校园','scene-work'],self:['🌙 独处','scene-work']};
    return m[s]?('<span class="scene-chip '+m[s][1]+'">'+m[s][0]+'</span>'):'';
  }).join('');
  var src=(c.videoTitle?('《'+c.videoTitle+'》'):'');
  var coreBadge=(c._core?('<span class="seq-badge">'+(c.seq?('第 '+c.seq+' 讲'):'核心')+'</span>'):'')+(c._core?'<span class="core-badge">核心</span>':'');
  var insightHtml='';
  if(c.insight && c.insight.length){
    function emLead(s){
      var idx=s.indexOf('：'); if(idx<0) idx=s.indexOf(':');
      if(idx>0 && idx<=14) return '<b>'+hl(s.slice(0,idx+1),q)+'</b>'+hl(s.slice(idx+1),q);
      return hl(s,q);
    }
    insightHtml='<div class="insight-list">'
      + c.insight.map(function(s,i){
          return '<div class="insight-item"><span class="ii-n">'+(i+1)+'</span><span>'+emLead(s)+'</span></div>';
        }).join('')
      + '</div>';
  }
  var evidenceHtml=(c.evidence && c.evidence.length)
    ? '<div class="ev-head">▶ 语料佐证 · 原话 '+c.evidence.length+' 条 —— 点右侧播放按钮，跳到B站视频对应位置</div>'
      + c.evidence.map(function(e){
          return '<div class="ev-item"><span class="ev-quote">「'+hl(e.text||'',q)+'」</span>'
            +'<a class="ev-go" href="'+esc(e.link||('#'))+'" target="_blank" rel="noopener" title="去B站看原话" aria-label="去B站看原话" onclick="event.stopPropagation()">▶</a></div>';
        }).join('')
    : qaEvidenceHtml(c);
  return '<div class="qcard" id="card-'+esc(c.qaId)+'" onclick="toggleQa(this)">'
    +'<div><span class="cat-badge">'+esc(c.category||'问答')+'</span>'+coreBadge+scenes+'</div>'
    +'<div class="qcard-q">'+hl(c.question,q)+'</div>'
    +(c.answerBrief?('<div class="qcard-brief">'+hl(c.answerBrief,q)+'</div>'):'')
    +insightHtml
    +'<div class="qcard-toggle">展开语料佐证 ▾</div>'
    +'<div class="qcard-body">'
      +evidenceHtml
      +(c.quote?('<div class="quote">'+hl(c.quote,q)+'</div>'):'')
      +'<div class="qcard-foot">'
        +'<span class="video-src">'+esc(src)+'</span>'
        +'<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();shareKp(\\''+esc(c.qaId)+'\\')">分享这一条</button>'
      +'</div>'
      +'<div class="share-tip">朋友打开链接会直达这张卡 · 也可以把整卷测评分享出去</div>'
    +'</div>'
  +'</div>';
}"""
src = rep(src, old_card, new_card, 'card')

# 4) 分组：核心知识置顶默认
src = rep(src, "var qaFilter={group:'全部', scene:''};\nvar QA_GROUPS=['全部','阴阳能量','四型人格','关系与配对','成长课题'];",
          "var qaFilter={group:'⭐ 核心知识', scene:''};\nvar QA_GROUPS=['⭐ 核心知识','全部','阴阳能量','四型人格','关系与配对','成长课题'];", 'groups')

# 5) renderQa 过滤 + stage 排序
old_f = """  var list=QA.filter(function(c){
    if(qaFilter.group!=='全部' && (c.category||'')!==qaFilter.group) return false;
    if(qaFilter.scene && (c.scene||[]).indexOf(qaFilter.scene)<0) return false;
    return true;
  });"""
new_f = """  var list=QA.filter(function(c){
    if(qaFilter.group==='⭐ 核心知识'){ if(!c._core) return false; }
    else if(qaFilter.group!=='全部' && (c.category||'')!==qaFilter.group) return false;
    if(qaFilter.scene && (c.scene||[]).indexOf(qaFilter.scene)<0) return false;
    return true;
  });
  list.sort(function(a,b){ return (a.stage||9)-(b.stage||9); });"""
src = rep(src, old_f, new_f, 'filter')

# 6) CSS 注入（含 path-flow 路径条）
css = """</head>
<body>
<style>
/* 核心知识卡样式（总装配注入） */
.core-badge{display:inline-block;background:linear-gradient(135deg,#B5483A,#9a3a2f);color:#faf3ec;font-size:11px;font-weight:700;padding:2px 8px;border-radius:3px;margin-left:6px;letter-spacing:2px;box-shadow:0 1px 3px rgba(181,72,58,.3)}
.seq-badge{display:inline-block;background:rgba(35,34,48,.06);border:1px solid rgba(35,34,48,.14);color:#232230;font-size:11px;font-weight:700;padding:2px 8px;border-radius:3px;margin-left:6px;font-variant-numeric:tabular-nums}
.insight-list{margin:10px 0 4px;display:flex;flex-direction:column;gap:6px}
.insight-item{display:flex;gap:9px;padding:8px 12px;border-left:2.5px solid #D4A574;background:linear-gradient(90deg,rgba(212,165,116,.09),rgba(212,165,116,.02));border-radius:0 10px 10px 0;font-size:14px;line-height:1.75;font-weight:400;color:#4a4956}
.insight-item b{font-weight:700;color:#232230}
.insight-item .ii-n{flex:none;color:#B5483A;font-weight:800;font-family:"Noto Serif SC","Songti SC","STSong","SimSun",serif;font-size:13px;padding-top:1px}
.ev-head{font-size:12px;color:#8A8794;margin:10px 0 6px;letter-spacing:.5px}
.ev-item{display:flex;gap:10px;align-items:flex-start;padding:8px 2px;border-bottom:1px dashed rgba(0,0,0,.06);font-size:13px;line-height:1.8}
.ev-item .ev-quote{color:#5a5866}
.ev-item .ev-go{flex:none;width:30px;height:30px;display:flex;align-items:center;justify-content:center;color:#E8913A;font-size:13px;text-decoration:none;border:1.5px solid rgba(232,145,58,.55);border-radius:50%;background:rgba(232,145,58,.06);transition:all .2s}
.ev-item .ev-go:hover{background:#E8913A;color:#fff;border-color:#E8913A}
.path-flow{max-width:1080px;margin:0 auto 16px;padding:12px 18px;background:linear-gradient(90deg,rgba(232,145,58,.07),rgba(78,110,158,.07));border:1px solid rgba(35,34,48,.08);border-radius:14px;font-size:13.5px;color:#4a4956;text-align:center}
.path-flow b{color:#232230}
.path-flow .pf-arrow{color:#B5483A;font-weight:700;margin:0 6px}
</style>"""
src = rep(src, '</head>\n<body>', css, 'css')

# 7) 顶部导航顺序 测→问→搜
src = rep(src, """      <a href="#qa" data-r="qa">问一问</a>
      <a href="#test" data-r="test">测一测</a>
      <a href="#search" data-r="search">搜一搜</a>""",
"""      <a href="#test" data-r="test">测一测</a>
      <a href="#qa" data-r="qa">问一问</a>
      <a href="#search" data-r="search">搜一搜</a>""", 'topnav')

# 8) tabbar 顺序
src = rep(src, """  <a href="#qa" data-r="qa"><span class="ticon t-qa serif">问</span>问一问</a>
  <a href="#test" data-r="test"><span class="ticon t-test serif">测</span>测一测</a>""",
"""  <a href="#test" data-r="test"><span class="ticon t-test serif">测</span>测一测</a>
  <a href="#qa" data-r="qa"><span class="ticon t-qa serif">问</span>问一问</a>""", 'tabbar')

# 9) hero 文案
src = rep(src, '<p class="hero-sub">晨与昏，动与静——每个人面对世界的第一反应，都带着自己的能量底色。问一问，测一测，搜一搜。</p>',
'<p class="hero-sub">为什么你总在关系里反复内耗？为什么有人天生要强、有人天生柔软？<br>从阴阳两种能量内核出发——<b>看清自己</b>的第一反应，<b>看懂他人</b>与你的不同，<b>找到相处的方式</b>，走向属于你的阴阳平衡。</p>', 'hero')

# 10) 三板块卡重排 + 文案 + path-flow
old_plates = src[src.index('<div class="plate-grid">'):src.index('</div>\n      </div>\n    </div>\n  </section>\n\n  <!-- ═══════════ 问一问')]
new_plates = """<div class="path-flow">一条自我成长的路径：<b>① 测一测</b> 看见自己 <span class="pf-arrow">→</span> <b>② 问一问</b> 理解差异 <span class="pf-arrow">→</span> <b>③ 搜一搜</b> 深挖原话</div>
      <div class="plate-grid">
        <div class="plate">
          <div class="plate-top"><span class="plate-ico" style="color:var(--amber);border:1.5px solid rgba(212,165,116,.5);">测</span><h3 class="serif">测一测 · 看见自己</h3></div>
          <p>一道叙事化的「人生选择题」：从小时候的家，走到深夜独处的你——测出你的能量内核，看清你面对世界的第一反应，以及你可能没意识到的「壳」。</p>
          <div class="previews">
            <div class="pv"><span class="q">20 题 · 约 4 分钟</span><br>每题 2 个选项，中断可续答</div>
            <div class="pv"><span class="q">结果：四型人格 + 场景能量剖面</span><br>男版 / 女版双轨题卷，看见性别规训</div>
          </div>
          <a class="btn btn-sm go" href="#test">进入测一测</a>
        </div>
        <div class="plate">
          <div class="plate-top"><span class="plate-ico" style="color:var(--yang);border:1.5px solid rgba(232,145,58,.4);">问</span><h3 class="serif">问一问 · 理解差异</h3></div>
          <p>测完从这里开始。阴阳在冲突、信念、边界、信任上到底有何不同？每张卡讲透一个差异维度——理论要点为主，原话佐证一键直达 B站。</p>
          <div class="previews" id="homeQaPreview"></div>
          <a class="btn btn-sm go" href="#qa">进入问一问</a>
        </div>
        <div class="plate">
          <div class="plate-top"><span class="plate-ico" style="color:var(--yin);border:1.5px solid rgba(78,110,158,.4);">搜</span><h3 class="serif">搜一搜 · 深挖原话</h3></div>
          <p>问一问里没找到的问题？用关键词搜全库 500+ 条语料，一键跳到B站视频对应位置，听 UP主 的原话。</p>
          <div class="previews">
            <div class="pv hint-chips" style="background:transparent;padding:0;">
              <span class="chip" onclick="goSearch('边界')">边界</span>
              <span class="chip" onclick="goSearch('内耗')">内耗</span>
              <span class="chip" onclick="goSearch('试探')">试探</span>
              <span class="chip" onclick="goSearch('信任')">信任</span>
            </div>
          </div>
          <a class="btn btn-sm go" href="#search">进入搜一搜</a>
        </div>"""
src = rep(src, old_plates, new_plates, 'plates')

# 11) 搜一搜简介
src = rep(src, '<p class="page-sub">问答卡 &gt; 语料条目，两级召回；深水内容仅搜索可达，请自行判断深浅。</p>',
          '<p class="page-sub">问一问没有找到的问题？用关键词在这里搜——问答卡、500+ 条语料，一键直达B站视频对应位置。</p>', 'search-sub')

# 12) 问一问简介
src = rep(src, '<p class="page-sub">一条一个知识点，回答都带 B站原话证据。</p>',
          '<p class="page-sub">测完从这里开始——每张卡讲透一个阴阳差异维度，理论要点为主，原话佐证可溯。</p>', 'qa-sub')

open(P, 'w', encoding='utf-8', newline='\n').write(src)
print('装配完成：12 处全部命中。文件', n0, '→', len(src), '字符')
