# -*- coding: utf-8 -*-
"""首页调整 v2：今日一问下沉 + 搜一搜高频标签（写后立即验证）"""
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

P = r"D:\Workbuddy\yinyang-test\index.html"
s = open(P, encoding='utf-8').read()

def rep(s, old, new, tag):
    assert old in s, 'NOT FOUND [' + tag + ']'
    return s.replace(old, new, 1)

# 1) 删除原 homeDaily 挂载行（plate-grid 之前）
s = rep(s, '      <div id="homeDaily"></div>\n      <div id="homeLastResult"></div>',
           '      <div id="homeLastResult"></div>', 'remove-daily')

# 2) plate-grid 收尾后插入 homeDaily（用搜一搜卡的「进入搜一搜」之后定位，精准不误伤）
anchor = '<a class="btn btn-sm go" href="#search">进入搜一搜</a>\n        </div>\n      </div>'
s = rep(s, anchor,
        anchor + '\n      <div id="homeDaily"></div>', 'insert-daily')

# 3) 搜一搜卡预览：静态 chips → 动态高频标签容器
old_chips = """            <div class="pv hint-chips" style="background:transparent;padding:0;">
              <span class="chip" onclick="goSearch('边界')">边界</span>
              <span class="chip" onclick="goSearch('内耗')">内耗</span>
              <span class="chip" onclick="goSearch('试探')">试探</span>
              <span class="chip" onclick="goSearch('信任')">信任</span>
            </div>"""
new_chips = """            <div class="pv hint-chips" id="homeHotTags" style="background:transparent;padding:0;"></div>"""
s = rep(s, old_chips, new_chips, 'hot-tags-html')

# 4) renderHome：高频标签填充（插在今日一问渲染之前）
s = rep(s, "    var box=$('homeDaily'); if(!box) return;",
"""    var ht=$('homeHotTags');
    if(ht && typeof TAG_FREQ!=='undefined' && TAG_FREQ){
      ht.innerHTML=TAG_FREQ.slice(0,12).map(function(t){
        return '<span class="chip" onclick="goSearch(\\''+t[0]+'\\')">'+t[0]+'</span>';
      }).join('');
    }
    var box=$('homeDaily'); if(!box) return;""", 'hot-tags-js')

open(P, 'w', encoding='utf-8', newline='\n').write(s)

# 立即验证写盘结果
s2 = open(P, encoding='utf-8').read()
i_daily = s2.find('id="homeDaily"')
i_grid = s2.find('class="plate-grid"')
i_hot = s2.find('id="homeHotTags"')
print('验证：homeDaily 位置', i_daily, '> plate-grid 位置', i_grid, '→', '✅ 已下沉' if i_daily > i_grid else '❌')
print('验证：homeHotTags 存在', i_hot > 0, '｜renderHome 填充代码', 'hot-tags-js' if "homeHotTags';" in s2 or "homeHotTags\";" in s2 else '检查')
