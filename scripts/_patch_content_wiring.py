# -*- coding: utf-8 -*-
"""总汇合补丁：core2/3/4 接线 + deprecated 过滤 + LEARN_ORDER 140 项 + mirror 渲染
在 _patch_search.py 之后应用。"""
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

P = r"D:\Workbuddy\yinyang-test\index.html"
src = open(P, encoding='utf-8').read()
LO = open(r"D:\Workbuddy\yinyang-test\data\_learn_order.js.txt", encoding='utf-8').read().strip()

def rep(s, old, new, tag):
    assert old in s, 'NOT FOUND [' + tag + ']'
    return s.replace(old, new, 1)

# 1) script 引入：deprecated + core2/3/4
src = rep(src, '<script src="data/qa_core.js"></script>',
"""<script src="data/qa_core.js"></script>
<script src="data/deprecated_qa.js"></script>
<script src="data/qa_core2.js"></script>
<script src="data/qa_core3.js"></script>
<script src="data/qa_core4.js"></script>""", 'scripts')

# 2) QA 池：QA_CORE2 行扩展为 2/3/4 + DEPRECATED 过滤
old_pool = """  if(typeof QA_CORE !== 'undefined') absorbCore(QA_CORE);
  if(typeof QA_CORE2 !== 'undefined') absorbCore(QA_CORE2);
  function push(c){
    if(!c || !c.qaId || seen[c.qaId]) return;
    if(c.kpId && coreKp[c.kpId]) return;
    seen[c.qaId] = 1; QA.push(c);
  }"""
new_pool = """  if(typeof QA_CORE !== 'undefined') absorbCore(QA_CORE);
  if(typeof QA_CORE2 !== 'undefined') absorbCore(QA_CORE2);
  if(typeof QA_CORE3 !== 'undefined') absorbCore(QA_CORE3);
  if(typeof QA_CORE4 !== 'undefined') absorbCore(QA_CORE4);
  var DEP = (typeof DEPRECATED_QA !== 'undefined') ? DEPRECATED_QA : [];
  var depSet = {};
  DEP.forEach(function(id){ depSet[id] = 1; });
  function push(c){
    if(!c || !c.qaId || seen[c.qaId]) return;
    if(c.kpId && coreKp[c.kpId]) return;
    if(depSet[c.qaId]) return;
    seen[c.qaId] = 1; QA.push(c);
  }"""
src = rep(src, old_pool, new_pool, 'pool')

# 3) LEARN_ORDER 43 项 → 140 项（v3 教学序）+ 兜底 90→500
import re as _re
m = _re.search(r"  var LEARN_ORDER = \[[^\]]+\];", src)
assert m, 'LEARN_ORDER NOT FOUND'
src = rep(src, m.group(0), '  ' + LO, 'learn_order')
src = rep(src, "90 + (a.stage||9)*10", "500 + (a.stage||9)*10", 'fb-a')
src = rep(src, "90 + (b.stage||9)*10", "500 + (b.stage||9)*10", 'fb-b')

# 4) mirror 渲染：quote 前插镜子块（qaCardHtml 内）
old_q = """      +evidenceHtml
      +(c.quote?('<div class="quote">'+hl(c.quote,q)+'</div>'):'')"""
new_q = """      +evidenceHtml
      +(c.mirror?('<div class="mirror-block"><span class="mi-ico">🪞</span><span>'+hl(c.mirror,q)+'</span></div>'):'')
      +(c.quote?('<div class="quote">'+hl(c.quote,q)+'</div>'):'')"""
src = rep(src, old_q, new_q, 'mirror')

# 5) mirror 样式追加到注入 CSS（锚点：path-flow 规则后）
src = rep(src, ".path-flow .pf-arrow{color:#B5483A;font-weight:700;margin:0 6px}",
""".path-flow .pf-arrow{color:#B5483A;font-weight:700;margin:0 6px}
.mirror-block{display:flex;gap:8px;align-items:flex-start;margin:10px 0 2px;padding:9px 12px;background:rgba(78,110,158,.07);border-radius:10px;font-size:13px;line-height:1.7;color:#4a5568}
.mirror-block .mi-ico{flex:none}""", 'mirror-css')

open(P, 'w', encoding='utf-8', newline='\n').write(src)
print('内容接线补丁完成：scripts/deprecated/pool/LEARN_ORDER-140/mirror 五处全部命中')
