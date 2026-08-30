# -*- coding: utf-8 -*-
"""为 qa_core1-4 的 111 张卡回填 scene（应用场景）标签。
映射原则：主题 → 最典型场景（love 情感 / work 职场·校园 / family 家庭 / self 自我·独处）；
通用能量基础卡标其主要适用场景（2-3 个），保证场景筛选有区分度。"""
import re, io, sys, collections
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
B = r"D:\Workbuddy\yinyang-test\data\\"

SCENE = {
    # ── 阶0 认知/判定 ──
    'y0-02': ['self','love','work','family'], 'y0-11': ['self','work','love','family'], 'y0-04': ['self','love'],
    # ── 阶1 能量基础 ──
    'kp-a1-qiande': ['self','work','love'],
    'y1-01': ['self','work'], 'y1-03': ['self','work'], 'y1-04': ['work','love'],
    'kp-a2': ['love','work'], 'y1-06': ['family','self'], 'y1-23': ['self'], 'y1-24': ['self'],
    'y1-08': ['work','self'], 'y1-11': ['self','love'], 'y1-25': ['self','love'],
    'y1-07': ['love','family'], 'y1-09': ['work','love'], 'y1-10': ['work','love'],
    'y1-17': ['love'], 'y1-15': ['self'], 'y1-22': ['work','love'],
    'y1-13': ['love','work'], 'y1-16': ['love','work'], 'y1-20': ['love'],
    'y1-14': ['love'], 'y1-12': ['love'], 'y1-18': ['work','family','love'],
    'y1-19': ['love'], 'y1-21': ['love'],
    # ── 阶2 场景体验 ──
    'kp-a1b-bupeide': ['love','self'], 'kp-a4-yangqingan': ['love','work'],
    'y2-03': ['love','family'], 'y2-05': ['love'], 'y2-06': ['family','work'],
    'y2-07': ['love'], 'y2-08': ['work'], 'y2-09': ['work','love'],
    'y2-10': ['love'], 'y2-11': ['love'], 'y2-12': ['love'],
    'y2-13': ['love','family'], 'y2-14': ['work','family'], 'y2-15': ['work','family'],
    # ── 阶3 四型 ──
    'y3-01': ['self','love'], 'y3-02': ['work','self'], 'y3-03': ['love','self'],
    'y3-08': ['work','love','family'],
    'y3-09': ['love'], 'y3-10': ['work','love'], 'y3-11': ['love'],
    'y3-12': ['self','love'], 'y3-13': ['love'], 'y3-14': ['love','work'],
    'y3-b3d': ['love'], 'y3-age': ['self','family'],
}
for k in ['kp-b1-nanyang','kp-b2-nvyang','kp-b3-nvyin','kp-b4-nanyin']: SCENE[k] = ['self','love']
for pre in ['b1','b2','b4']: 
    for suf in ['a','b','c','d','e','f','g','h','i','j']: SCENE['y3-'+pre+suf] = ['self','love'] if pre!='b4' else ['self','love']
for suf in ['a','b','c','d','e','f','g','h','i','j']: SCENE['y3-b3'+suf] = ['love','self']
# 男阳职场/女阳职场特化
SCENE['y3-b1c'] = ['work']; SCENE['y3-b1d'] = ['work','self']; SCENE['y3-b1g'] = ['work','self']
SCENE['y3-b2c'] = ['love','work']; SCENE['y3-b2g'] = ['work','self']
SCENE['y3-b3c'] = ['love']; SCENE['y3-b3g'] = ['love']; SCENE['y3-b3h'] = ['love']
SCENE['y3-b4c'] = ['work','love']; SCENE['y3-b4d'] = ['love','work']; SCENE['y3-b4g'] = ['love','work']
# ── 阶4 关系 ──
SCENE['y4-01'] = ['work']; SCENE['y4-02'] = ['love','work']; SCENE['y4-03'] = ['love']; SCENE['y4-04'] = ['love']
# ── 阶5 修行 ──
SCENE['kp-a1-balance'] = ['self','love','work']; SCENE['y5-06'] = ['self']; SCENE['y5-07'] = ['self','love']
SCENE['y5-08'] = ['self','love','work']; SCENE['y5-02'] = ['self','love']; SCENE['y5-11'] = ['love','self']
SCENE['y5-12'] = ['work','family','love']; SCENE['y5-03'] = ['self','love']; SCENE['y5-04'] = ['self','work']
SCENE['y5-09'] = ['self','work','love']; SCENE['y5-10'] = ['self','love']; SCENE['y5-05'] = ['self']

def assign(m):
    body = m.group(0)
    kp = re.search(r"kpId:\s*'([^']+)'", body)
    if not kp: return body
    sc = SCENE.get(kp.group(1))
    if not sc: return body
    tag = "scene:[" + ','.join("'"+s+"'" for s in sc) + "]"
    return re.sub(r"scene:\s*\[[^\]]*\]", tag, body, count=1)

total, dist = 0, collections.Counter()
for f in ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js']:
    p = B + f
    s = open(p, encoding='utf-8').read()
    s2 = re.sub(r"\{\s*qaId:\s*'[^']+'.*?\n\s*\}", assign, s, flags=re.S)
    n = len(re.findall(r"scene:\s*\['", s2)) - len(re.findall(r"scene:\s*\[\]", s2))
    open(p, 'w', encoding='utf-8', newline='\n').write(s2)
    total += n
    print(f, '回填后非空 scene 卡数:', n)
print('总回填:', total)
