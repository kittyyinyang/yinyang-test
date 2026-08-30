# -*- coding: utf-8 -*-
"""阴阳人格 index.html 视觉升级补丁（晨昏光谱 v2）
只改视觉层：样式块整体重写 + 新增纯装饰元素 + 3 处 JS 模板纯展示插入。
所有 id / class 钩子 / 函数 / 数据字段 / 交互逻辑保持不变。
"""
import io, sys

PATH = 'index.html'
CSS_PATH = 'scripts/_v2_style.css'

src = io.open(PATH, encoding='utf-8').read()
css = io.open(CSS_PATH, encoding='utf-8').read().replace('\r\n', '\n')
orig_len = len(src)

def must_replace(s, old, new, tag):
    assert s.count(old) == 1, 'ANCHOR NOT UNIQUE/FOUND [%s]: %r (count=%d)' % (tag, old[:80], s.count(old))
    return s.replace(old, new, 1)

# ─────────────────────────────────────────────────────────────
# 1) 样式块整体替换
# ─────────────────────────────────────────────────────────────
i1 = src.index('<style>')
i2 = src.index('</style>') + len('</style>')
src = src[:i1] + '<style>\n' + css + '</style>' + src[i2:]
print('[1] style block replaced, css %d chars' % len(css))

# ─────────────────────────────────────────────────────────────
# 2) 共享 SVG 资源（渐变 / 滤镜 defs，隐藏放置，全文引用）
# ─────────────────────────────────────────────────────────────
DEFS_SVG = '''<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="wgDayG" cx="66%" cy="30%" r="95%">
      <stop offset="0" stop-color="#F6C384"/><stop offset="0.45" stop-color="#E8913A"/><stop offset="1" stop-color="#C9742A"/>
    </radialGradient>
    <radialGradient id="wgNightG" cx="34%" cy="70%" r="100%">
      <stop offset="0" stop-color="#5F81AE"/><stop offset="0.5" stop-color="#4E6E9E"/><stop offset="1" stop-color="#31486C"/>
    </radialGradient>
    <linearGradient id="wgSG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFF4E2" stop-opacity="0.95"/><stop offset="0.5" stop-color="#F3E3C8" stop-opacity="0.85"/><stop offset="1" stop-color="#E7EEF8" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="wgBrush" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8A8794" stop-opacity="0"/><stop offset="0.16" stop-color="#C9742A" stop-opacity="0.5"/><stop offset="0.5" stop-color="#B5483A" stop-opacity="0.55"/><stop offset="0.84" stop-color="#4E6E9E" stop-opacity="0.5"/><stop offset="1" stop-color="#4E6E9E" stop-opacity="0"/>
    </linearGradient>
    <filter id="wgInk" x="-25%" y="-25%" width="150%" height="150%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="3" seed="7" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="16"/>
      <feGaussianBlur stdDeviation="1.2"/>
    </filter>
    <filter id="wgHalo" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="12"/>
    </filter>
  </defs>
</svg>

<header class="topnav">'''
src = must_replace(src, '<header class="topnav">', DEFS_SVG, 'defs-svg')

# ─────────────────────────────────────────────────────────────
# 3) 导航 logo 位：双字小方印
# ─────────────────────────────────────────────────────────────
src = must_replace(
    src,
    '<a class="tn-brand serif" href="#home">阴<span class="dot">·</span>阳人格</a>',
    '<a class="tn-brand serif" href="#home"><span class="brand-seal" aria-hidden="true"><span>阴</span><span>阳</span></span>阴<span class="dot">·</span>阳人格</a>',
    'brand-seal')

# ─────────────────────────────────────────────────────────────
# 4) 首页 hero：晨昏轮主视觉（内联 SVG）
# ─────────────────────────────────────────────────────────────
WHEEL_STATIC = '''        <div class="wheel-wrap" aria-hidden="true">
          <svg class="wheel" viewBox="0 0 420 420" role="img" aria-label="晨昏轮：一轮分昼夜，阴阳各半">
            <g filter="url(#wgInk)" opacity=".1">
              <circle cx="210" cy="210" r="150" fill="#8A8794"/>
              <circle cx="330" cy="112" r="26" fill="#E8913A"/>
              <circle cx="92" cy="304" r="30" fill="#4E6E9E"/>
            </g>
            <circle cx="210" cy="210" r="146" fill="none" stroke="#D4A574" stroke-opacity=".22" stroke-width="10" filter="url(#wgHalo)"/>
            <g class="wheel-orbit">
              <circle cx="210" cy="210" r="186" fill="none" stroke="#232230" stroke-opacity=".12" stroke-width="1"/>
              <circle cx="210" cy="210" r="166" fill="none" stroke="#232230" stroke-opacity=".35" stroke-width="7" stroke-dasharray="1.6 41.86" transform="rotate(-90 210 210)"/>
              <g stroke="#232230" stroke-opacity=".3" stroke-width="1.5" stroke-linecap="round">
                <line x1="210" y1="32" x2="210" y2="40"/>
                <line x1="210" y1="388" x2="210" y2="380"/>
                <line x1="32" y1="210" x2="40" y2="210"/>
                <line x1="388" y1="210" x2="380" y2="210"/>
              </g>
              <g fill="#4E6E9E">
                <circle cx="349" cy="88" r="2" opacity=".55"/>
                <circle cx="63" cy="136" r="1.6" opacity=".4"/>
                <circle cx="86" cy="326" r="1.4" opacity=".45"/>
                <circle cx="344" cy="336" r="2.1" opacity=".5"/>
                <circle cx="262" cy="35" r="1.3" opacity=".4"/>
              </g>
              <path d="M56,82 q14,-10 28,0 q12,8 24,2" fill="none" stroke="#8A8794" stroke-opacity=".55" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M330,360 q16,-10 30,0 q10,7 22,1" fill="none" stroke="#8A8794" stroke-opacity=".5" stroke-width="1.4" stroke-linecap="round"/>
            </g>
            <g class="wheel-core">
              <path d="M210,70 A140,140 0 0 1 210,350 C270,317 270,243 210,210 C150,177 150,103 210,70 Z" fill="url(#wgDayG)"/>
              <path d="M210,70 A140,140 0 0 0 210,350 C270,317 270,243 210,210 C150,177 150,103 210,70 Z" fill="url(#wgNightG)"/>
              <circle cx="262" cy="146" r="19" fill="#FFEFD6" opacity=".95"/>
              <g stroke="#FFF3DE" stroke-opacity=".7" stroke-width="1.6" stroke-linecap="round">
                <line x1="262" y1="116" x2="262" y2="122"/>
                <line x1="262" y1="170" x2="262" y2="176"/>
                <line x1="232" y1="146" x2="238" y2="146"/>
                <line x1="286" y1="146" x2="292" y2="146"/>
                <line x1="241" y1="125" x2="245" y2="129"/>
                <line x1="279" y1="163" x2="283" y2="167"/>
                <line x1="283" y1="125" x2="279" y2="129"/>
                <line x1="245" y1="163" x2="241" y2="167"/>
              </g>
              <path d="M226,196 q16,-7 32,-1" fill="none" stroke="#FFF7E8" stroke-opacity=".55" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M238,214 q13,-6 26,-1" fill="none" stroke="#FFF7E8" stroke-opacity=".4" stroke-width="1.3" stroke-linecap="round"/>
              <path d="M154,260 A17,17 0 1,0 154,294 A21,21 0 0,1 154,260 Z" fill="#F2F6FC" opacity=".96"/>
              <g fill="#EAF0F7">
                <circle cx="185" cy="242" r="1.6" opacity=".9"/>
                <circle cx="205" cy="262" r="1.2" opacity=".75"/>
                <circle cx="172" cy="308" r="1.4" opacity=".8"/>
                <circle cx="132" cy="286" r="1.1" opacity=".6"/>
              </g>
              <g stroke="#EAF0F7" stroke-opacity=".8" stroke-width="1.1" stroke-linecap="round" fill="none">
                <path d="M196,296 v6 M193,299 h6"/>
                <path d="M148,318 v5 M145.5,320.5 h5"/>
              </g>
              <path d="M120,180 q14,-9 28,-1" fill="none" stroke="#CBD8EA" stroke-opacity=".5" stroke-width="1.3" stroke-linecap="round"/>
              <path d="M210,70 C150,103 150,177 210,210 C270,243 270,317 210,350" fill="none" stroke="#FDF6EA" stroke-opacity=".28" stroke-width="6" stroke-linecap="round"/>
              <path d="M210,70 C150,103 150,177 210,210 C270,243 270,317 210,350" fill="none" stroke="url(#wgSG)" stroke-width="2.2" stroke-linecap="round"/>
              <circle cx="210" cy="210" r="140" fill="none" stroke="#232230" stroke-opacity=".16" stroke-width="1"/>
              <circle cx="210" cy="210" r="3" fill="#FDF6EA" opacity=".9"/>
            </g>
          </svg>
        </div>
'''
src = must_replace(
    src,
    '      <div class="hero-main">\n        <div class="hero-seals">',
    '      <div class="hero-main">\n' + WHEEL_STATIC + '        <div class="hero-seals">',
    'hero-wheel')

# ─────────────────────────────────────────────────────────────
# 5) 首页「一画」笔触分隔
# ─────────────────────────────────────────────────────────────
src = must_replace(
    src,
    '      <div id="homeLastResult"></div>\n      <div class="plate-grid">',
    '      <div id="homeLastResult"></div>\n'
    '      <div class="brush-divider" aria-hidden="true"><svg viewBox="0 0 640 20" preserveAspectRatio="none" role="presentation"><path d="M6,13 C110,5 205,17 320,10 C435,3 530,16 634,9" fill="none" stroke="url(#wgBrush)" stroke-width="2.2" stroke-linecap="round"/></svg></div>\n'
    '      <div class="plate-grid">',
    'brush-divider')

# ─────────────────────────────────────────────────────────────
# 6) 三板块手绘线条小图标
# ─────────────────────────────────────────────────────────────
src = must_replace(
    src,
    '<span class="plate-ico" style="color:var(--yang);border:1.5px solid rgba(232,145,58,.4);">问</span>',
    '<span class="plate-ico" style="color:var(--yang);" title="问"><svg class="pico" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M31,5 A17,17 0 1,0 43,25 A13.5,13.5 0 0,1 31,5 Z" fill="rgba(232,145,58,.16)"/><path d="M19.5,19 h13 a5,5 0 0 1 5,5 v5.5 a5,5 0 0 1 -5,5 h-5.5 l-6,5.5 v-5.5 h-1.5 a5,5 0 0 1 -5,-5 V24 a5,5 0 0 1 5,-5 Z" fill="rgba(255,255,255,.85)"/><circle cx="23.5" cy="26.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="28.5" cy="26.5" r="1.3" fill="currentColor" stroke="none"/></svg></span>',
    'ico-qa')
src = must_replace(
    src,
    '<span class="plate-ico" style="color:var(--amber);border:1.5px solid rgba(212,165,116,.5);">测</span>',
    '<span class="plate-ico" style="color:var(--yang-deep);" title="测"><svg class="pico" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5,37 L19,15.5 L26.5,27 L32,19 L42.5,37 Z" fill="rgba(212,165,116,.18)"/><path d="M4,42.5 h40" stroke-dasharray="1 5"/><circle cx="35.5" cy="9.5" r="4.5" fill="rgba(232,145,58,.22)"/><path d="M35.5,1.5 v2.5 M43.5,9.5 h-2.5 M41,4 l-1.8,1.8 M41,15 l-1.8,-1.8" stroke-width="1.6"/></svg></span>',
    'ico-test')
src = must_replace(
    src,
    '<span class="plate-ico" style="color:var(--yin);border:1.5px solid rgba(78,110,158,.4);">搜</span>',
    '<span class="plate-ico" style="color:var(--yin);" title="搜"><svg class="pico" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24,4.5 C24,4.5 37.5,19.5 37.5,29 A13.5,13.5 0 1,1 10.5,29 C10.5,19.5 24,4.5 24,4.5 Z" fill="rgba(78,110,158,.12)"/><path d="M24,18.5 L28.5,31.5 L24,29 L19.5,31.5 Z" fill="rgba(78,110,158,.28)"/><circle cx="24" cy="27" r="2.2"/></svg></span>',
    'ico-search')

# ─────────────────────────────────────────────────────────────
# 7) JS 纯展示资源：晨昏轮（测一测封面）/ 章号印字 / 四型印字
# ─────────────────────────────────────────────────────────────
WHEEL_JS = (
    "/* [visual] 纯展示资源（不参与任何逻辑）：封面晨昏轮 / 章号印字 / 四型印字 */\n"
    "var WHEEL_SVG='<div class=\"wheel-wrap wheel-in-cover\" aria-hidden=\"true\"><svg class=\"wheel\" viewBox=\"0 0 420 420\" aria-hidden=\"true\">"
    "<g filter=\"url(#wgInk)\" opacity=\".1\"><circle cx=\"210\" cy=\"210\" r=\"150\" fill=\"#8A8794\"/><circle cx=\"330\" cy=\"112\" r=\"26\" fill=\"#E8913A\"/><circle cx=\"92\" cy=\"304\" r=\"30\" fill=\"#4E6E9E\"/></g>"
    "<circle cx=\"210\" cy=\"210\" r=\"146\" fill=\"none\" stroke=\"#D4A574\" stroke-opacity=\".22\" stroke-width=\"10\" filter=\"url(#wgHalo)\"/>"
    "<g class=\"wheel-orbit\">"
    "<circle cx=\"210\" cy=\"210\" r=\"186\" fill=\"none\" stroke=\"#232230\" stroke-opacity=\".12\" stroke-width=\"1\"/>"
    "<circle cx=\"210\" cy=\"210\" r=\"166\" fill=\"none\" stroke=\"#232230\" stroke-opacity=\".35\" stroke-width=\"7\" stroke-dasharray=\"1.6 41.86\" transform=\"rotate(-90 210 210)\"/>"
    "<g stroke=\"#232230\" stroke-opacity=\".3\" stroke-width=\"1.5\" stroke-linecap=\"round\"><line x1=\"210\" y1=\"32\" x2=\"210\" y2=\"40\"/><line x1=\"210\" y1=\"388\" x2=\"210\" y2=\"380\"/><line x1=\"32\" y1=\"210\" x2=\"40\" y2=\"210\"/><line x1=\"388\" y1=\"210\" x2=\"380\" y2=\"210\"/></g>"
    "<g fill=\"#4E6E9E\"><circle cx=\"349\" cy=\"88\" r=\"2\" opacity=\".55\"/><circle cx=\"63\" cy=\"136\" r=\"1.6\" opacity=\".4\"/><circle cx=\"86\" cy=\"326\" r=\"1.4\" opacity=\".45\"/><circle cx=\"344\" cy=\"336\" r=\"2.1\" opacity=\".5\"/></g>"
    "<path d=\"M56,82 q14,-10 28,0 q12,8 24,2\" fill=\"none\" stroke=\"#8A8794\" stroke-opacity=\".55\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>"
    "<path d=\"M330,360 q16,-10 30,0 q10,7 22,1\" fill=\"none\" stroke=\"#8A8794\" stroke-opacity=\".5\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>"
    "</g>"
    "<g class=\"wheel-core\">"
    "<path d=\"M210,70 A140,140 0 0 1 210,350 C270,317 270,243 210,210 C150,177 150,103 210,70 Z\" fill=\"url(#wgDayG)\"/>"
    "<path d=\"M210,70 A140,140 0 0 0 210,350 C270,317 270,243 210,210 C150,177 150,103 210,70 Z\" fill=\"url(#wgNightG)\"/>"
    "<circle cx=\"262\" cy=\"146\" r=\"19\" fill=\"#FFEFD6\" opacity=\".95\"/>"
    "<g stroke=\"#FFF3DE\" stroke-opacity=\".7\" stroke-width=\"1.6\" stroke-linecap=\"round\"><line x1=\"262\" y1=\"116\" x2=\"262\" y2=\"122\"/><line x1=\"262\" y1=\"170\" x2=\"262\" y2=\"176\"/><line x1=\"232\" y1=\"146\" x2=\"238\" y2=\"146\"/><line x1=\"286\" y1=\"146\" x2=\"292\" y2=\"146\"/><line x1=\"241\" y1=\"125\" x2=\"245\" y2=\"129\"/><line x1=\"279\" y1=\"163\" x2=\"283\" y2=\"167\"/><line x1=\"283\" y1=\"125\" x2=\"279\" y2=\"129\"/><line x1=\"245\" y1=\"163\" x2=\"241\" y2=\"167\"/></g>"
    "<path d=\"M226,196 q16,-7 32,-1\" fill=\"none\" stroke=\"#FFF7E8\" stroke-opacity=\".55\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>"
    "<path d=\"M238,214 q13,-6 26,-1\" fill=\"none\" stroke=\"#FFF7E8\" stroke-opacity=\".4\" stroke-width=\"1.3\" stroke-linecap=\"round\"/>"
    "<path d=\"M154,260 A17,17 0 1,0 154,294 A21,21 0 0,1 154,260 Z\" fill=\"#F2F6FC\" opacity=\".96\"/>"
    "<g fill=\"#EAF0F7\"><circle cx=\"185\" cy=\"242\" r=\"1.6\" opacity=\".9\"/><circle cx=\"205\" cy=\"262\" r=\"1.2\" opacity=\".75\"/><circle cx=\"172\" cy=\"308\" r=\"1.4\" opacity=\".8\"/><circle cx=\"132\" cy=\"286\" r=\"1.1\" opacity=\".6\"/></g>"
    "<g stroke=\"#EAF0F7\" stroke-opacity=\".8\" stroke-width=\"1.1\" stroke-linecap=\"round\" fill=\"none\"><path d=\"M196,296 v6 M193,299 h6\"/><path d=\"M148,318 v5 M145.5,320.5 h5\"/></g>"
    "<path d=\"M120,180 q14,-9 28,-1\" fill=\"none\" stroke=\"#CBD8EA\" stroke-opacity=\".5\" stroke-width=\"1.3\" stroke-linecap=\"round\"/>"
    "<path d=\"M210,70 C150,103 150,177 210,210 C270,243 270,317 210,350\" fill=\"none\" stroke=\"#FDF6EA\" stroke-opacity=\".28\" stroke-width=\"6\" stroke-linecap=\"round\"/>"
    "<path d=\"M210,70 C150,103 150,177 210,210 C270,243 270,317 210,350\" fill=\"none\" stroke=\"url(#wgSG)\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>"
    "<circle cx=\"210\" cy=\"210\" r=\"140\" fill=\"none\" stroke=\"#232230\" stroke-opacity=\".16\" stroke-width=\"1\"/>"
    "<circle cx=\"210\" cy=\"210\" r=\"3\" fill=\"#FDF6EA\" opacity=\".9\"/>"
    "</g></svg></div>';\n"
    "var CH_NUM={1:'壹',2:'贰',3:'叁',4:'肆',5:'伍',6:'陆',7:'柒',8:'捌',9:'玖',10:'拾'};\n"
    "var SEAL_CHAR={'yang-male':'承','yang-female':'破','yin-female':'连','yin-male':'潜'};\n"
)
src = must_replace(src, 'function renderTestCover(box){', WHEEL_JS + 'function renderTestCover(box){', 'js-consts')

# 7a) 测一测封面：插入晨昏轮
src = must_replace(
    src,
    "box.innerHTML='<div class=\"t-cover\">'\n    +'<div class=\"hero-seals\">",
    "box.innerHTML='<div class=\"t-cover\">'\n    +WHEEL_SVG\n    +'<div class=\"hero-seals\">",
    'cover-wheel')

# 7b) 章节转场：章号印 + 刻度进度（挂接现有渲染时机，逻辑不变）
OLD_INTRO = """  $('testBox').innerHTML='<div class="ch-head"><div class="progress-bar"><div class="progress-fill" style="width:'+(answered*100/total)+'%"></div></div>'
    +'<div class="progress-meta"><span>第 '+Math.min(answered+1,total)+' / '+total+' 题</span><span>'+esc(no)+' · '+esc(ch.title||'')+'</span></div></div>'
    +'<div class="t-flow"><div class="ch-intro">'
    +'<div class="ch-no">'+esc(no)+'</div>'
    +'<h3 class="serif">'+esc(ch.title||'')+'</h3>'
    +(ch.intro?('<p>'+esc(ch.intro)+'</p>'):'')
    +'<button class="btn" onclick="showQuestion()">开始作答</button>'
    +'</div></div>';"""
NEW_INTRO = """  var tickTotal=T.chapters.length||1, ticksHtml='';
  for(var ti=1;ti<=tickTotal;ti++){ ticksHtml+='<span class="ch-tick'+(ti===ch.no?' on':'')+'"></span>'; }
  $('testBox').innerHTML='<div class="ch-head"><div class="progress-bar"><div class="progress-fill" style="width:'+(answered*100/total)+'%"></div></div>'
    +'<div class="progress-meta"><span>第 '+Math.min(answered+1,total)+' / '+total+' 题</span><span>'+esc(no)+' · '+esc(ch.title||'')+'</span></div></div>'
    +'<div class="t-flow"><div class="ch-intro">'
    +'<div class="ch-seal" aria-hidden="true">'+(CH_NUM[ch.no]||'章')+'</div>'
    +'<div class="ch-no">'+esc(no)+'</div>'
    +'<h3 class="serif">'+esc(ch.title||'')+'</h3>'
    +(ch.intro?('<p>'+esc(ch.intro)+'</p>'):'')
    +'<div class="ch-ticks" aria-hidden="true">'+ticksHtml+'</div>'
    +'<button class="btn" onclick="showQuestion()">开始作答</button>'
    +'</div></div>';"""
src = must_replace(src, OLD_INTRO, NEW_INTRO, 'chapter-intro')

# 7c) 结果页判定卡：四型大印（承/破/连/潜，回退 阳/阴）
OLD_SEAL = "    +(isYang?'<span class=\"seal seal-yang seal-lg\">阳</span>':'<span class=\"seal seal-yin seal-lg\">阴</span>')"
NEW_SEAL = "    +(SEAL_CHAR[snap.type]?('<span class=\"seal '+(isYang?'seal-yang':'seal-yin')+' seal-lg seal-type\">'+SEAL_CHAR[snap.type]+'</span>'):(isYang?'<span class=\"seal seal-yang seal-lg\">阳</span>':'<span class=\"seal seal-yin seal-lg\">阴</span>'))"
src = must_replace(src, OLD_SEAL, NEW_SEAL, 'verdict-seal')

# ─────────────────────────────────────────────────────────────
# 写回（LF）
# ─────────────────────────────────────────────────────────────
io.open(PATH, 'w', encoding='utf-8', newline='\n').write(src)
print('[done] index.html rewritten: %d -> %d chars' % (orig_len, len(src)))
