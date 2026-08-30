# -*- coding: utf-8 -*-
"""补丁：主题域改两级体系（阴阳人格/自我成长 × 二级课题），D8 删除、D9 融入。"""
import io

P = r"D:\Workbuddy\yinyang-test\scripts\build_corpus_refined.py"
src = open(P, encoding='utf-8').read()

def rep(s, old, new):
    assert old in s, 'NOT FOUND: ' + old[:60]
    return s.replace(old, new, 1)

# 1) domain_of 整函数替换
old_fn = src[src.index("def domain_of(r):"):src.index("# ---------- types 受众型 ----------")]
new_fn = '''def domain_of(r, tags):
    """两级归类：block(阴阳人格/自我成长) × domain(二级课题)。目录(篇/子组)优先，标签只做自我成长内细分。"""
    m, sub = r['module'], r['subGroup']
    T = set(tags)
    if m == '双生关系篇': return ('阴阳人格', '关系互动')
    if m == '阴阳能量篇':
        if sub.startswith('阳性能量') or sub.startswith('阴性能量'): return ('阴阳人格', '四型人格')
        if sub == '亲子教育': return ('自我成长', '亲子教育')
        if any(t in T for t in ('亲密关系','三方','三方与暧昧','配对与搭配','剧情纪事')): return ('阴阳人格', '关系互动')
        return ('阴阳人格', '能量本质')
    if sub in ('原生家庭','亲子教育','人格成长'): return ('自我成长', '亲子教育')
    if sub in ('链接高我','生命意义','业力·因果','灵魂·高我','道·本体','佛魔·修行相'): return ('自我成长', '灵性觉醒')
    if sub in ('实修','疗愈渡人'): return ('自我成长', '实修与疗愈')
    if sub == '亲密关系': return ('自我成长', '情感关系')
    if sub in ('学习方法','综合运营·随笔'): return ('自我成长', '觉察与信念')
    if sub == '灵性随笔·成长感悟': return ('自我成长', '灵性觉醒')
    if any(t in T for t in ('意识与觉察','信念与规训','投射与滤镜','潜意识与无意识')): return ('自我成长', '觉察与信念')
    if any(t in T for t in ('边界','恐惧与防御','冲突与吵架','情绪处理','情绪表达')): return ('自我成长', '情绪与边界')
    if any(t in T for t in ('爱自己','自恋与自信','不配得与自我价值','接纳与评判','人格与自我','真实与面具','面具与假自体')): return ('自我成长', '爱自己与自我价值')
    if any(t in T for t in ('亲密关系','付出与讨好','试探与作','信任与背叛','沟通与表达','吃醋与嫉妒','攻击与报复','断联拉黑','三方','三方与暧昧','配对与搭配')): return ('自我成长', '情感关系')
    if any(t in T for t in ('使命与愿力','高我与小我','灵魂与超灵','业力','九楼与楼层','合一','觉醒与灵性')): return ('自我成长', '灵性觉醒')
    if any(t in T for t in ('创伤与疗愈','实修案例')): return ('自我成长', '实修与疗愈')
    return ('自我成长', '觉察与信念')

'''
src = rep(src, old_fn, new_fn)

# 2) DOMAIN_ORDER → DOMAIN_BLOCKS
old_def = (
    "DOMAIN_ORDER = ['D1 能量本质','D2 四型人格','D3 关系互动','D4 自我成长','D5 家庭与养育',\n"
    "                'D6 觉醒与灵性','D7 实修与疗愈','D8 剧情纪事','D9 杂谈与随笔']"
)
new_def = (
    "DOMAIN_BLOCKS = {'阴阳人格': ['能量本质','四型人格','关系互动'],\n"
    "                 '自我成长': ['觉察与信念','情绪与边界','爱自己与自我价值','情感关系','亲子教育','灵性觉醒','实修与疗愈']}"
)
src = rep(src, old_def, new_def)

# 3) 组装处 block/domain
src = rep(src,
    "        collection=coll, domain=domain_of(r), types=types_of(r), scenes=scenes_of(r),",
    "        collection=coll, block=domain_of(r,tags)[0], domain=domain_of(r,tags)[1], types=types_of(r), scenes=scenes_of(r),")

# 4) JS 输出段（注意：源码中的 \n 是两个字符，此处用 chr 拼接规避转义）
BSN = chr(92) + 'n'   # 源码级反斜杠 n
old_out = (
    "buf.write('// 主题域枚举" + BSN + "')\n"
    "buf.write('var DOMAIN_ENUM = ' + jdump(DOMAIN_ORDER) + ';" + BSN + "')"
)
new_out = (
    "buf.write('// 主题域两级枚举：大块 × 二级课题" + BSN + "')\n"
    "buf.write('var DOMAIN_ENUM = ' + jdump(DOMAIN_BLOCKS) + ';" + BSN + "')"
)
src = rep(src, old_out, new_out)

# 5) 统计段两级输出
i0 = src.index("主题域分布")
j = src.index("受众型覆盖")
i1 = src.rindex("print(", 0, j)
old_stat = src[i0-8:i1]
new_stat = (
    "print('\\n主题域分布（大块 × 二级课题）:')\n"
    "bc = collections.Counter(r['block'] for r in records)\n"
    "dc = collections.Counter((r['block'], r['domain']) for r in records)\n"
    "for blk, doms in DOMAIN_BLOCKS.items():\n"
    "    print(f'  [{blk}] {bc.get(blk,0)} 条')\n"
    "    for d in doms:\n"
    "        print(f'     {dc.get((blk,d),0):4d}  {d}')\n"
)
src = rep(src, old_stat, new_stat)

open(P, 'w', encoding='utf-8', newline='\n').write(src)
print('patched ok')
