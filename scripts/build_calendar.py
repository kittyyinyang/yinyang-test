# -*- coding: utf-8 -*-
"""营销内容图谱 → 首月内容日历生成器（W-D4）
输入：data/content_graph.js（唯一数据源）+ data/qa_core.js 等卡片池（校验引用）
输出：docs/内容日历_首月_v1.md（30 天排期表）+ 校验报告（stdout）
排期规则（确定性模板，可重跑复现）：见 SCHEDULE_TEMPLATE
"""
import re, json, io, sys, collections

BASE = r"D:\Workbuddy\yinyang-test"
OUT = BASE + r"\docs\内容日历_首月_v1.md"

# ---------- 1. 读取图谱（纯 python 解析：JS 对象 → JSON） ----------
import os
src = open(BASE + r'\data\content_graph.js', encoding='utf-8').read()
i = src.index('{')
j = src.rindex('}')
body = src[i:j+1]
body = re.sub(r'^\s*//.*$', '', body, flags=re.M)              # 去行注释
body = re.sub(r'([{,]\s*)([A-Za-z_\u4e00-\u9fff][\w\u4e00-\u9fff]*)(\s*:)', r'\1"\2"\3', body)  # 键加引号（含中文键）
body = re.sub(r"'([^'\\]*)'", r'"\1"', body)                    # 单引号→双引号（文案内无 ASCII 引号）
body = re.sub(r',\s*([}\]])', r'\1', body)                      # 去尾逗号
try:
    G = json.loads(body)
except Exception as e:
    print('解析失败:', e); sys.exit(1)
print('图谱解析 OK：支柱', len(G['pillars']), '选题', sum(len(p['topics']) for p in G['pillars']))

# ---------- 2. 校验 sourceQa 引用 ----------
pool = set()
for f in ['qa_core.js', 'data_qa.js', 'qa_clips_new.js']:
    try:
        s = open(BASE + r'\data' + '\\' + f, encoding='utf-8').read()
        pool.update(re.findall(r"qaId:\s*'([^']+)'", s))
    except FileNotFoundError:
        print('  ⚠ 缺文件(跳过校验):', f)
bad, ok = [], 0
for p in G['pillars']:
    for t in p['topics']:
        sq = t['sourceQa']
        if sq.startswith('q-'):
            if sq in pool: ok += 1
            else: bad.append((t['id'], sq))
        else: ok += 1  # slogan:/pair:/cast:/types:/growth:/share: 为约定引用
print('sourceQa 校验：OK', ok, '｜失效', len(bad), bad[:5])

# ---------- 3. 确定性排期（4 周模板 + 收尾 2 天） ----------
# 周模板：星期 → (支柱id, 平台)；同支柱不连发两天
TPL = [
    (1, 'P2', '小红书'), (1, 'P1', '视频号'),
    (2, 'P1', '小红书'),
    (3, 'P3', '小红书'), (3, 'P3', '视频号'),
    (4, 'P1', '抖音'), (4, 'P2', '视频号'),
    (5, 'P4', '抖音'),
    (6, 'P3', '小红书'), (6, 'P5', '抖音'),
    (7, 'P6', '视频号'), (7, 'P4', '小红书'),
]
PLAT_CODE = {'小红书': 'x', '抖音': 'd', '视频号': 's', '公众号': 'g'}
WD = ['一', '二', '三', '四', '五', '六', '日']
cursor = collections.defaultdict(int)   # 各支柱选题游标
days = collections.defaultdict(list)    # day -> [rows]

def take(pid):
    topics = next(p['topics'] for p in G['pillars'] if p['id'] == pid)
    t = topics[cursor[pid] % len(topics)]
    cursor[pid] += 1
    return t

for day in range(1, 31):
    wd = (day - 1) % 7 + 1
    week = (day - 1) // 7 + 1
    if week == 5:   # 第 5 周只有 2 天：补当周轮空支柱（P5/P6 已覆盖，改补高频支柱）
        if day == 29: wd_rows = [('P2', '小红书')]
        else:         wd_rows = [('P3', '视频号')]
    else:
        wd_rows = [(pid, plat) for (d, pid, plat) in TPL if d == wd]
    for pid, plat in wd_rows:
        t = take(pid)
        cta = t['cta']
        if cta['type'] == 'test':
            link = '测评 `?from=' + t['id'] + '`'
        elif cta['type'] == 'card':
            link = '知识卡 `?kp=' + cta['kp'] + '`'
        elif cta['type'] == 'pair':
            link = '合盘邀请'
        else:
            link = cta['type']
        days[day].append(dict(pillar=pid, plat=plat, topic=t['id'], title=t['title'],
                              hook=t['hook'], fmt='/'.join(t['formats']), link=link,
                              comp=t['compliance'][:1]))

# ---------- 4. 输出日历 ----------
buf = io.StringIO()
buf.write('# 首月内容日历 v1（自动生成 · 可重跑）\n\n')
buf.write('> 生成：scripts/build_calendar.py ｜ 数据源：data/content_graph.js ｜ 规则：docs/营销内容图谱_v1.md\n')
buf.write('> 账号：全平台统一「阴阳人格手记」｜ 简介统一：「20 道人生选择题，测你是哪种能量内核」\n')
buf.write('> 每条内容结构：钩子(表内) + 要点(源卡 insight 前 3 条) + 金句(源卡 quote) + CTA(表内链接) + 文末来源行\n\n')
cur_week = 0
for day in range(1, 31):
    week = (day - 1) // 7 + 1
    if week != cur_week:
        cur_week = week
        buf.write('\n## 第 %d 周\n\n| 日期 | 平台 | 支柱 | 选题 | 钩子文案 | 形式 | 承接链接 | 合规 |\n|---|---|---|---|---|---|---|---|\n' % week)
    wd = WD[(day - 1) % 7]
    for row in days[day]:
        buf.write('| D%d周%s | %s | %s | %s《%s》 | %s | %s | %s | %s |\n' % (
            day, wd, row['plat'], row['pillar'], row['topic'], row['title'],
            row['hook'], row['fmt'], row['link'], row['comp']))
    if not days[day]:
        buf.write('| D%d周%s | — | — | 休整/数据复盘 | 记录本周各条互动数，低互动选题式淘汰 | — | — | — |\n' % (day, wd))
buf.write('''
## 执行备注
1. 同素材跨平台复用时改标题与封面（防查重）；抖音不出现「微信」字样，小红书不放链接（引导搜索「阴阳人格手记」）；
2. P5 影视类全部用文字解说+自绘角色卡；P6-4（情与欲）仅公众号；
3. 每周末填一次数据（互动数）到本表「休整」行，供下周加倍/淘汰；
4. 首周为试水周：若某类钩子互动显著高，第 2 周起在游标顺序上向其倾斜（人工调整后可改脚本重跑）。
''')
open(OUT, 'w', encoding='utf-8', newline='\n').write(buf.getvalue())
total = sum(len(v) for v in days.values())
print('日历生成 OK：', OUT)
print('总条目:', total, '｜支柱分布:', dict(collections.Counter(r['pillar'] for v in days.values() for r in v)))
print('平台分布:', dict(collections.Counter(r['plat'] for v in days.values() for r in v)))
