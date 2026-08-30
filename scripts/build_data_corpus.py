# -*- coding: utf-8 -*-
"""build_data_corpus.py — 解析《语料全量版-最新.md》篇首索引区 → data/data_corpus.js
只读索引区（# 一、索引 到 # 二、完整转录 之间，约 1040 行），严禁整读 21 万行正文。
advanced = tags 含 双生火焰/紫圈/九楼/新游戏规则/双生魔法学校/实操撸双/线圈 等深水集合标签。
"""
import io, re, json

SRC = r"D:\Workbuddy\2026-08-26-20-11-15\downloads\语料全量版-最新.md"
OUT = r"D:\Workbuddy\yinyang-test\data\data_corpus.js"

ADVANCED_PAT = ("双生火焰", "紫圈", "九楼", "新游戏规则", "双生魔法学校", "实操撸双", "线圈")


def main():
    n_start = n_end = None
    with io.open(SRC, "r", encoding="utf-8") as f:
        lines = []
        for i, line in enumerate(f):
            if line.startswith("# 一、索引"):
                n_start = i
            if line.startswith("# 二、完整转录"):
                n_end = i
                break
            if n_start is not None:
                lines.append(line.rstrip("\n"))
    assert n_start is not None and n_end is not None, "索引区定位失败"

    module = ""
    sub_group = ""
    items = {}
    order = []
    n_rows = 0
    for line in lines:
        if line.startswith("### "):
            module = line[4:].strip()
            continue
        m = re.match(r"^\*\*(.+?)（\d+条）\*\*", line.strip())
        if m:
            sub_group = m.group(1).strip()
            continue
        if not (line.startswith("|B") or line.startswith("|N")):
            continue
        parts = [p.strip() for p in line.split("|")]
        # ['', id, title, bv, source, rows, tags, '']
        if len(parts) < 7:
            continue
        pid, title, bv, tags_raw = parts[1], parts[2], parts[3], parts[6]
        if not re.match(r"^[BN]\d+$", pid):
            continue
        n_rows += 1
        tags = [t.strip() for t in tags_raw.split("#") if t.strip()]
        advanced = any(any(p in t for p in ADVANCED_PAT) for t in tags)
        if pid in items:
            it = items[pid]
            for t in tags:
                if t not in it["tags"]:
                    it["tags"].append(t)
            if advanced:
                it["advanced"] = True
            continue
        items[pid] = {
            "id": pid,
            "title": title,
            "bv": "" if bv in ("—", "-", "") else bv,
            "module": module,
            "subGroup": sub_group,
            "tags": tags,
            "advanced": advanced,
        }
        order.append(pid)

    data = [items[k] for k in order]
    n_adv = sum(1 for d in data if d["advanced"])
    js = []
    js.append("// data_corpus.js — 语料索引（搜一搜二级召回）")
    js.append("// 来源：《转录合并全集·全量版》篇首索引区解析；索引行 %d（含跨模块重复），去重后 %d 条，进阶 %d 条。" % (n_rows, len(data), n_adv))
    js.append("// advanced=true = 深水内容（双生/紫圈/九楼等）：无任何导航入口与运营位，仅搜一搜主动命中时召回并带「进阶」徽标。")
    js.append("var CORPUS_DATA = ")
    js.append(json.dumps(data, ensure_ascii=False, separators=(",", ":")))
    js.append(";\n")
    with io.open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(js))
    mods = {}
    for d in data:
        mods[d["module"]] = mods.get(d["module"], 0) + 1
    print("CORPUS_DATA 共 %d 条（索引行 %d，去重去除 %d）；进阶 %d 条" % (len(data), n_rows, n_rows - len(data), n_adv))
    for k, v in mods.items():
        print("  ", k, v)


if __name__ == "__main__":
    main()
