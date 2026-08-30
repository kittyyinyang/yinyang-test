# -*- coding: utf-8 -*-
"""语料索引标签细分 v2：五轴体系（collection/domain/tags/types/scene）
输入：语料全量版-最新.md 篇首索引表
输出：data/data_corpus_refined.js + 统计报告（stdout）
原则：只增不删——所有原始标签保留在 rawTags；细分与归一只发生在加工轴上。
"""
import re, json, collections, io, os

SRC = r"D:\Workbuddy\2026-08-26-20-11-15\downloads\语料全量版-最新.md"
OUT = r"D:\Workbuddy\yinyang-test\data\data_corpus_refined.js"
DOC = r"D:\Workbuddy\yinyang-test\docs\标签体系_v2_细分设计.md"

text = open(SRC, encoding='utf-8').read()
idx = text.split('# 一、索引')[1].split('# 二、')[0]

# ---------- 解析索引行 ----------
rows = []          # (id, title, bv, module, subGroup, rawTags)
module = sub = ''
for line in idx.split('\n'):
    line = line.strip()
    m = re.match(r'^### (.+?)篇$', line)
    if m: module = m.group(1) + '篇'; continue
    m = re.match(r'^\*\*(.+?)（(\d+)条）\*\*', line)
    if m: sub = m.group(1); continue
    m = re.match(r'^\|(B\d+|N\d+)\s*\|(.+?)\|(.+?)\|', line)
    if not m: continue
    vid, title, bv = m.group(1), m.group(2).strip(), m.group(3).strip()
    raw = re.findall(r'#([^#\s|]+)', line)
    rows.append(dict(id=vid, title=re.sub(r'\s+', ' ', title), bv=bv,
                     module=module, subGroup=sub, rawTags=raw))

# ---------- 同义词归一表（概念标签 → 规范标签） ----------
SYN = {
    '阳性': '阳性能量', '阳能': '阳性能量', '阳性能量·综述': '阳性能量',
    '阴性': '阴性能量', '阴能': '阴性能量',
    '双火': '双生火焰', '双生': '双生火焰',
    '边界感': '边界', '无条件': '无条件的爱',
    '人格': '人格与自我', '自我认知': '人格与自我',
    '业力伴侣': '业力', '家族业力': '业力', '累世业力': '业力', '消业': '业力',
    '自爱': '爱自己', '自信': '自恋与自信', '自恋': '自恋与自信', '自卑': '自恋与自信', '自负': '自恋与自信',
    '不配得': '不配得与自我价值', '自我价值': '不配得与自我价值',
    '内耗': '内耗与外耗', '外耗': '内耗与外耗',
    '拉黑': '断联拉黑', '切断': '断联拉黑', '断联': '断联拉黑',
    '吃醋': '吃醋与嫉妒', '嫉妒': '吃醋与嫉妒',
    '投射': '投射与滤镜', '滤镜': '投射与滤镜',
    '高我': '高我与小我', '小我': '高我与小我', '真我': '高我与小我',
    '灵魂': '灵魂与超灵', '超灵': '灵魂与超灵', '灵魂碎片': '灵魂与超灵',
    '使命': '使命与愿力', '大愿': '使命与愿力', '愿力': '使命与愿力', '天赋': '使命与愿力',
    '恐惧': '恐惧与防御', '防御': '恐惧与防御', '焦虑': '恐惧与防御',
    '创伤': '创伤与疗愈', '疗愈': '创伤与疗愈',
    '面具': '面具与假自体', '假自体': '面具与假自体', '伪装': '面具与假自体',
    '觉醒': '觉醒与成长', '成长': '觉醒与成长', '突破': '觉醒与成长',
    '潜意识': '潜意识与无意识', '无意识': '潜意识与无意识', '意识': '意识与觉察', '觉察': '意识与觉察', '内观': '意识与觉察',
    '信念': '信念与规训', '限制性信念': '信念与规训', '集体信念': '信念与规训', '规训': '信念与规训',
    '原生家庭': '原生家庭', '家庭': '原生家庭', '父母': '原生家庭', '童年': '原生家庭', '内在小孩': '原生家庭',
    '亲密关系': '亲密关系', '感情': '亲密关系', '恋爱': '亲密关系',
    '付出': '付出与讨好', '讨好': '付出与讨好', '牺牲': '付出与讨好',
    '报复': '攻击与报复', '攻击': '攻击与报复', '复仇': '攻击与报复', '戾气': '攻击与报复', '怨气': '攻击与报复',
    '试探': '试探与作', '作': '试探与作', '测试': '试探与作',
    '信任': '信任与背叛', '背叛': '信任与背叛', '被抛弃': '信任与背叛',
    '控制': '控制与PUA', 'PUA': '控制与PUA', '奴役': '控制与PUA', '操控': '控制与PUA',
    '冲突': '冲突与吵架', '吵架': '冲突与吵架', '触发': '冲突与吵架',
    '平衡': '阴阳平衡', '整合': '阴阳平衡', '雌雄同体': '阴阳平衡',
    '九楼': '九楼与楼层', '爬楼': '九楼与楼层', '楼层': '九楼与楼层',
    '合一': '合一', '双火合一': '合一',
    '知行合一': '意识与觉察',
    '情绪': '情绪处理', '委屈': '情绪处理', '压抑': '情绪处理',
    '真实': '真实与面具', '接纳': '接纳与评判', '评判': '接纳与评判', '包容': '接纳与评判',
    '分离': '分离与独立', '独立': '分离与独立', '依赖': '分离与独立', '依附': '分离与独立',
    '课题': '课题', '卡点': '课题', '回避': '课题',
    '金钱': '金钱观', '金钱观': '金钱观',
    '主角': '剧情纪事', '主角相关': '剧情纪事', '高桌': '剧情纪事', '线圈': '剧情纪事', '苹果': '剧情纪事',
    '紫圈剧情': '紫圈纪事', '紫圈其他': '紫圈纪事', '紫圈': '紫圈纪事',
}

# ---------- 粗标签细分（标题关键词 → 细标签；仅当该条只有粗标签时补充） ----------
REFINE_RULES = [
    (r'吵架|冲突|打架|气人', '冲突与吵架'),
    (r'吃醋|嫉妒', '吃醋与嫉妒'),
    (r'试探|测试|套娃|拉扯', '试探与作'),
    (r'拉黑|断联|删除|切断', '断联拉黑'),
    (r'信任|背叛', '信任与背叛'),
    (r'付出|牺牲|讨好', '付出与讨好'),
    (r'配对|搭配|合适|在一起|结婚|相遇', '配对与搭配'),
    (r'报复|复仇|报仇', '攻击与报复'),
    (r'三方|第三者|暧昧|小三', '三方与暧昧'),
    (r'小作文|沟通|表达|回应|回复', '沟通与表达'),
    (r'分手|离开|放下', '放下与分手'),
    (r'内耗|体力|累|能量低', '内耗与外耗'),
    (r'装逼|凡尔赛|自恋', '自恋与自信'),
    (r'不配得|值得|配得', '不配得与自我价值'),
    (r'无能|没用|靠自己', '无能恐惧'),
    (r'嘴硬|没事|不说|压抑', '情绪表达'),
    (r'撒娇|脆弱|柔软', '柔软与脆弱'),
    (r'原生家庭|父母|妈妈|父亲|家长', '原生家庭'),
    (r'孩子|亲子|教育|青春期|叛逆|成绩', '亲子教育'),
    (r'觉察|内观|复盘', '意识与觉察'),
    (r'信念|相信|观念', '信念与规训'),
    (r'投射|滤镜', '投射与滤镜'),
    (r'业力|因果', '业力'),
    (r'高我|灵魂|超灵', '高我与小我'),
    (r'九楼|楼层|爬楼', '九楼与楼层'),
    (r'使命|愿力|大愿|天赋|热爱', '使命与愿力'),
    (r'面具|人设|伪装', '面具与假自体'),
    (r'创伤|疗愈', '创伤与疗愈'),
    (r'边界', '边界'),
    (r'金钱|钱|工资', '金钱观'),
    (r'职场|工作|事业|领导|同事|开会|团队|公司|创业|员工|老板', '职场能量'),
    (r'孤独|独处|一个人', '独处与孤独'),
    (r'游戏|玩家|NPC|剧本|主角|高桌|线圈', '剧情纪事'),
]

# ---------- domain 主题域判定 ----------
def domain_of(r, tags):
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

# ---------- types 受众型 ----------
TYPE_RULES = [('男阴','yin-male'),('女阴','yin-female'),('女阳','yang-female'),('男阳','yang-male')]
def types_of(r):
    s = r['title'] + ' ' + ' '.join(r['rawTags'])
    out = []
    for kw, t in TYPE_RULES:
        if kw in s and t not in out: out.append(t)
    return out

# ---------- scene 场景 ----------
SCENE_RULES = [
    ('love', r'恋爱|亲密关系|对象|分手|冷战|暧昧|吃醋|婚姻|恋人|情侣|情关|情执|表达需要|撒娇|试探|作|小作文'),
    ('work', r'职场|工作|事业|领导|同事|开会|面试|团队|创业|员工|老板|金钱|钱|合伙|副业'),
    ('family', r'原生家庭|父母|妈妈|父亲|家长|孩子|亲子|教育|家庭|童年|婆婆|亲戚|儿女'),
    ('self', r'觉察|自我|独处|爱自己|信念|成长|孤独|灵魂|高我|小我|使命|天赋|能量|边界'),
]
def scenes_of(r):
    s = r['title'] + ' ' + ' '.join(r['rawTags'])
    out = [sc for sc, pat in SCENE_RULES if re.search(pat, s)]
    return out[:3]

ADV_PAT = re.compile(r'九楼|超灵|灵魂碎片|累世|魔考|灌顶|切断|高桌|灵魂之爱|五我境|果因律|佛魔|元神')

# ---------- 组装 ----------
records, tag_counter = [], collections.Counter()
DOMAIN_BLOCKS = {'阴阳人格': ['能量本质','四型人格','关系互动'],
                 '自我成长': ['觉察与信念','情绪与边界','爱自己与自我价值','情感关系','亲子教育','灵性觉醒','实修与疗愈']}
seen = set()
for r in rows:
    if r['id'] in seen: continue      # 跨子组重复行去重（取首个）
    if r['module'] == '玄学紫圈篇': continue   # 用户拍板：玄学紫圈不进搜索
    if r['id'].startswith('N'): continue      # 用户拍板：经验包 N1-N5 未发布B站（无bv不可跳），剔除；发布后恢复并做超链接
    seen.add(r['id'])
    # 子组默认标签（结构性补充，保证细分后每条仍有可导航标签）
    SUBGROUP_TAG = {
        '综述':'阴阳能量','阴阳平衡·整合':'阴阳平衡','阴阳特质':'阴阳能量',
        '阳性能量·综述':'阳性能量','阳性能量·男阳':'男阳','阳性能量·女阳':'女阳',
        '阴性能量·综述':'阴性能量','阴性能量·女阴':'女阴','阴性能量·男阴':'男阴',
        '双火综述':'双生火焰','双生确认·鉴别':'双生火焰','双火冲突':'冲突与吵架',
        '双生断联':'断联拉黑','双生切断':'断联拉黑','双生的三方课题':'三方与暧昧',
        '双火合一':'合一','双火能量':'双生火焰','双火苹果趣事':'剧情纪事','双生修行':'双生火焰',
        '觉察方法':'意识与觉察','人格成长':'人格与自我','自我认知':'人格与自我','爱自己':'爱自己',
        '链接高我':'高我与小我','生命意义':'使命与愿力','边界课题':'边界','业力·因果':'业力',
        '原生家庭':'原生家庭','亲子教育':'亲子教育','亲密关系':'亲密关系','疗愈渡人':'创伤与疗愈',
        '实修':'实修案例','面具·阴影·潜意识':'面具与假自体','恐惧·防御':'恐惧与防御',
        '道·本体':'觉醒与灵性','佛魔·修行相':'觉醒与灵性','用道·功夫':'觉醒与灵性',
        '修行·生活智慧':'觉醒与成长','灵魂·高我':'灵魂与超灵','学习方法':'学习方法',
        '灵性随笔·成长感悟':'杂谈随笔','综合运营·随笔':'杂谈随笔',
    }
    # 概念标签：归一（剔除合集前缀与子组名）
    groups = {'综述','阴阳平衡·整合','阴阳特质','阳性能量·综述','阳性能量·男阳','阳性能量·女阳',
              '阴性能量·综述','阴性能量·女阴','阴性能量·男阴','双火综述','双生确认·鉴别','双火冲突',
              '双生断联','双生切断','双生的三方课题','双火合一','双火能量','双火苹果趣事','双生修行',
              '觉察方法','人格成长','自我认知','爱自己','链接高我','生命意义','边界课题','业力·因果',
              '原生家庭','亲子教育','亲密关系','疗愈渡人','实修','面具·阴影·潜意识','恐惧·防御',
              '道·本体','佛魔·修行相','用道·功夫','修行·生活智慧','灵魂·高我','学习方法',
              '灵性随笔·成长感悟','综合运营·随笔'}
    tags = []
    for t in r['rawTags']:
        if t.startswith('合集·') or t in groups: continue
        nt = SYN.get(t, t)
        if nt not in tags: tags.append(nt)
    if r['subGroup'] in SUBGROUP_TAG and SUBGROUP_TAG[r['subGroup']] not in tags:
        tags.insert(0, SUBGROUP_TAG[r['subGroup']])   # 目录为准：子组标签注入
    if '紫圈纪事' in tags: continue   # 紫圈剧情类不进搜索
    # 粗标签细分：标题规则补充
    for pat, lab in REFINE_RULES:
        if re.search(pat, r['title']) and lab not in tags: tags.append(lab)
    for t in tags: tag_counter[t] += 1
    coll = [t.split('·',1)[1] for t in r['rawTags'] if t.startswith('合集·')]
    records.append(dict(
        id=r['id'], title=r['title'], bv=r['bv'], module=r['module'], subGroup=r['subGroup'],
        collection=coll, block=domain_of(r,tags)[0], domain=domain_of(r,tags)[1], types=types_of(r), scenes=scenes_of(r),
        tags=tags, rawTags=r['rawTags'],
        advanced=(r['module'] in ('双生关系篇','玄学紫圈篇')) or bool(ADV_PAT.search(' '.join(r['rawTags']) + ' ' + r['title'])),
        hasVideo=r['bv'].startswith('BV'),
    ))

# ---------- 输出 JS ----------
def jdump(o): return json.dumps(o, ensure_ascii=False, separators=(',', ':'))
buf = io.StringIO()
buf.write('// 语料索引 · 标签细分 v2（五轴：collection/domain/tags/types/scene；rawTags 保留原始标签）\n')
buf.write('// 由 scripts/build_corpus_refined.py 生成，勿手改；重新生成请跑该脚本。\n')
buf.write('var CORPUS_REFINED = [\n')
for r in records:
    buf.write('  ' + jdump(r) + ',\n')
buf.write('];\n')
buf.write('// 细分标签词表（频次降序，供搜索标签云与筛选器）\n')
buf.write('var TAG_FREQ = ' + jdump(tag_counter.most_common()) + ';\n')
buf.write('// 主题域两级枚举：大块 × 二级课题\n')
buf.write('var DOMAIN_ENUM = ' + jdump(DOMAIN_BLOCKS) + ';\n')
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8', newline='\n').write(buf.getvalue())

# ---------- 统计报告 ----------
print('记录数(去重):', len(records), '  原始索引行:', len(rows))
print('细分标签种类:', len(tag_counter), '  平均标签数:', round(sum(len(r["tags"]) for r in records)/len(records),1))
adv = sum(1 for r in records if r['advanced'])
print('advanced(进阶内容):', adv, '  普通内容:', len(records)-adv)
print('\n主题域分布（大块 × 二级课题）:')
bc = collections.Counter(r['block'] for r in records)
dc = collections.Counter((r['block'], r['domain']) for r in records)
for blk, doms in DOMAIN_BLOCKS.items():
    print(f'  [{blk}] {bc.get(blk,0)} 条')
    for d in doms:
        print(f'     {dc.get((blk,d),0):4d}  {d}')
print('\n受众型覆盖:', {t: sum(1 for r in records if t in r['types']) for t in ['yang-male','yang-female','yin-female','yin-male']})
print('\n细分标签 TOP60:')
for t, c in tag_counter.most_common(60): print(f'  {c:4d} {t}')
print('\n长尾(1-2次)标签数:', sum(1 for t,c in tag_counter.items() if c<=2))
