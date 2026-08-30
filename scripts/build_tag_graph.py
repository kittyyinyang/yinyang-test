# -*- coding: utf-8 -*-
r"""build_tag_graph.py — 从 CORPUS_REFINED 的 tags 字段聚合生成标签脑图数据
输出: data/tag_graph.js（var TAG_GRAPH = {groups:[{name, children:[标签词]}, ...]})

聚合规则（在交付说明中写清）：
- 统计各标签在 CORPUS_REFINED 条目 tags 字段的出现次数；
- 频次阈值 MIN_FREQ >= 4（过滤只出现 1~3 次的冷门词，避免脑图碎片化）；
- 停用词表 STOP_WORDS 过滤过泛/非主题词（如「阴阳能量」「关系」「双生火焰」「课题」
  等，它们在脑图中对应「一级分支」或中心概念，不宜再作为叶子节点）；
- 剩余标签按关键词规则归类到四大分支：四型人格 / 阴阳能量 / 关系与配对 / 成长课题；
  无法归类的标签丢弃并在统计中列出。
"""
import io
import json
import re
import collections

REFINED = r"D:\Workbuddy\yinyang-test\data\data_corpus_refined.js"
OUT = r"D:\Workbuddy\yinyang-test\data\tag_graph.js"

MARKER = "var CORPUS_REFINED = "

MIN_FREQ = 4

# 过泛/非主题词（脑图中心与一级分支已覆盖，叶子不再重复）
STOP_WORDS = {
    "阴阳能量", "关系", "双生火焰", "课题", "人格", "能量", "自我", "意识",
    "杂谈随笔", "剧情纪事", "实修案例", "学习方法", "热爱", "条件", "觉醒",
    "成长", "灵性", "双方", "相处", "理解",
}

# 精确命中即归类（优先于子串规则）
GROUP_RULES = {
    "四型人格": [
        "男阳", "女阳", "男阴", "女阴", "幼阴", "幼阳", "少阴", "少阳", "老阴", "老阳",
        "人格与自我", "面具与假自体", "自恋与自信", "真实与面具",
    ],
    "阴阳能量": [
        "阳性能量", "阴性能量", "阴阳平衡", "意识与觉察", "潜意识与无意识",
        "高我与小我", "灵魂与超灵", "情绪处理", "情绪表达", "业力", "使命与愿力",
        "投射与滤镜", "修行", "合一", "觉醒与灵性", "觉醒与成长", "能量链接",
        "吸能量", "慈悲", "无我", "源头", "空性", "大圆满", "九楼与楼层",
        "元神", "高维", "升维", "显化", "共振", "频率", "能量场", "魔法",
    ],
    "关系与配对": [
        "亲密关系", "信任与背叛", "试探与作", "边界", "断联拉黑", "冲突与吵架",
        "沟通与表达", "付出与讨好", "配对与搭配", "吃醋与嫉妒", "攻击与报复",
        "安全感", "拯救者", "暧昧", "三方与暧昧", "三方", "双标", "嘴硬",
        "小作文", "断联期", "想念", "演戏", "拒绝", "依赖", "无条件的爱",
    ],
    "成长课题": [
        "原生家庭", "创伤与疗愈", "亲子教育", "恐惧与防御", "信念与规训",
        "接纳与评判", "爱自己", "分离与独立", "不配得与自我价值", "情执",
        "内耗与外耗", "放下与分手", "受害者", "自我牺牲", "孤独", "敏感",
        "脆弱", "功课", "情绪价值", "价值感外包", "受害者心态", "独立",
        "分离创伤", "被抛弃", "边界感",
    ],
}

# 子串兜底规则（组顺序即优先级）
SUBSTRING_RULES = [
    ("四型人格", ["男阳", "女阳", "男阴", "女阴", "人格", "面具", "自恋", "自信"]),
    ("阴阳能量", ["能量", "意识", "觉察", "情绪", "业力", "修行", "觉醒", "灵性", "高我", "灵魂", "合一", "业", "投射", "空性", "无我"]),
    ("关系与配对", ["关系", "信任", "背叛", "试探", "边界", "断联", "暧昧", "吃醋", "嫉妒", "沟通", "表达", "配对", "吵架", "攻击", "报复", "依赖", "拉黑"]),
    ("成长课题", ["课题", "原生家庭", "创伤", "疗愈", "亲子", "恐惧", "防御", "信念", "规训", "接纳", "评判", "爱自己", "内耗", "外耗", "放下", "分手", "情执", "受害者", "功课", "价值", "独立", "脆弱"]),
]


def extract_array(raw):
    s0 = raw.index(MARKER) + len(MARKER)
    i = s0
    while i < len(raw) and raw[i] in " \t\r\n":
        i += 1
    assert raw[i] == "["
    depth = 0
    in_str = False
    esc = False
    j = i
    while j < len(raw):
        ch = raw[j]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
        else:
            if ch == '"':
                in_str = True
            elif ch == "[":
                depth += 1
            elif ch == "]":
                depth -= 1
                if depth == 0:
                    j += 1
                    break
        j += 1
    text = raw[i:j]
    text = text.rstrip()
    # 去掉 `]` 前多余的尾逗号（JS 允许，JSON 不允许）
    if text.endswith("]"):
        inner = text[:-1].rstrip()
        if inner.endswith(","):
            text = inner[:-1] + "]"
    return text


def classify(tag):
    """精确规则优先，子串兜底；返回组名或 None。"""
    for gname, words in GROUP_RULES.items():
        if tag in words:
            return gname
    for gname, kws in SUBSTRING_RULES:
        if any(kw in tag for kw in kws):
            return gname
    return None


def main():
    raw = io.open(REFINED, encoding="utf-8").read()
    arr = json.loads(extract_array(raw))

    counter = collections.Counter()
    for c in arr:
        for t in c.get("tags", []):
            counter[t] += 1

    freq_tags = {t for t, n in counter.items() if n >= MIN_FREQ}
    keep = freq_tags - STOP_WORDS
    dropped_generic = sorted(freq_tags & STOP_WORDS)

    groups = collections.OrderedDict([
        ("四型人格", []),
        ("阴阳能量", []),
        ("关系与配对", []),
        ("成长课题", []),
    ])
    unmatched = []
    for t in sorted(keep):
        g = classify(t)
        if g:
            groups[g].append(t)
        else:
            unmatched.append(t)

    tag_graph = {"groups": [{"name": g, "children": children} for g, children in groups.items()]}
    js_lines = [
        "// tag_graph.js — 标签脑图数据（由 scripts/build_tag_graph.py 生成，勿手改）",
        "// 中心：阴阳人格；一级分支：四型人格/阴阳能量/关系与配对/成长课题；叶子=语料高频标签",
        "var TAG_GRAPH = " + json.dumps(tag_graph, ensure_ascii=False, separators=(",", ":")) + ";",
        "",
    ]
    with io.open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(js_lines))

    print("CORPUS_REFINED 条目数: %d" % len(arr))
    print("标签种类: %d；频次>=%d 的标签: %d" % (len(counter), MIN_FREQ, len(freq_tags)))
    print("停用词过滤（过泛词）%d 个: %s" % (len(dropped_generic), ", ".join(dropped_generic)))
    print("无法归类丢弃 %d 个: %s" % (len(unmatched), ", ".join(unmatched)))
    for g, children in groups.items():
        print("%s: %d 个 -> %s" % (g, len(children), ", ".join(children)))


if __name__ == "__main__":
    main()
