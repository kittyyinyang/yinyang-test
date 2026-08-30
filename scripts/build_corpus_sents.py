# -*- coding: utf-8 -*-
r"""build_corpus_sents.py — 从《语料全量版-最新.md》的「二、完整转录」生成句子级语料
输出: data/corpus_sents.js（var CORPUS_SENTS = [...]）

解析规则：
- 仅解析 `# 二、完整转录` 之后的正文；
- 条目标题 `### B{n} ...` / `### N{n} ...`（N=经验包，但经验包无 bv，跳过）；
- 条目元信息行必须以 `> bv: ` 开头（无 bv 的不产出，视为占位/无源）；
- 标签从该条目的 `> ... 标签: ...` 部分提取（保留 `#` 前缀）；
- 代码块内每行 `[MM:SS] 文本` 产出一条；sec = MM*60+SS（兼容 MM 超过两位，如 [100:00]）；
- 输出 UTF-8 无 BOM、LF 换行；可重跑、幂等（纯生成，不依赖旧产物）。
"""
import io
import json
import re

SRC = r"D:\Workbuddy\2026-08-26-20-11-15\downloads\语料全量版-最新.md"
OUT = r"D:\Workbuddy\yinyang-test\data\corpus_sents.js"

ENTRY_RE = re.compile(r"^### (B\d+|N\d+)\b")
BV_RE = re.compile(r"`(BV[a-zA-Z0-9]+)`")
SENT_RE = re.compile(r"^\[(\d+):(\d{2})(?::(\d{2}))?\]\s*(.*)$")


def parse_tags(meta_line):
    """从 '> bv: ... ｜ 标签: #a #b ...' 提取标签列表（保留 # 前缀）。"""
    m = re.search(r"标签:\s*(.*)$", meta_line)
    if not m:
        return []
    tags = []
    for tok in m.group(1).split():
        if tok.startswith("#"):
            tags.append(tok)
    return tags


def main():
    lines = io.open(SRC, encoding="utf-8").read().split("\n")
    start = next(i for i, l in enumerate(lines) if l.startswith("# 二、完整转录"))

    entries = []          # 产出的条目（有 bv + 有正文）
    cur = None            # {id, title, bv, tags, in_code, sents}
    in_code = False
    no_body_ids = []      # 有 bv 但无正文
    no_bv_body_ids = []   # 无 bv 但有正文（N 经验包等）
    stub_ids = []         # 无 bv 无正文（跨篇重复占位）
    total_head = 0        # B/N 标题总数
    skipped_sent_lines = 0
    seen_ids = set()

    def finalize():
        nonlocal cur
        if cur is None:
            return
        entry = cur
        cur = None
        if not entry["bv"]:
            if entry["sents"]:
                no_bv_body_ids.append(entry["id"])
            else:
                stub_ids.append(entry["id"])
            return
        if not entry["sents"]:
            no_body_ids.append(entry["id"])
            return
        entries.append(entry)

    for i in range(start, len(lines)):
        l = lines[i]
        if l.startswith("```"):
            if cur is not None:
                cur["in_code"] = not cur["in_code"]
            else:
                in_code = not in_code
            continue
        if l.startswith("### "):
            finalize()
            total_head += 1
            m = ENTRY_RE.match(l)
            if m:
                cur = {
                    "id": m.group(1),
                    "title": l[4:].strip(),
                    "bv": "",
                    "tags": [],
                    "in_code": False,
                    "sents": [],
                }
            else:
                cur = None  # 分组标题（如「### 阴阳能量篇」），不产出
            continue
        if cur is None:
            continue
        if l.startswith("> bv:"):
            bm = BV_RE.search(l)
            if bm:
                cur["bv"] = bm.group(1)
                cur["tags"] = parse_tags(l)
            continue
        if l.startswith(">"):
            continue  # 其它元信息行忽略
        if not cur["in_code"]:
            continue
        m = SENT_RE.match(l)
        if not m:
            skipped_sent_lines += 1
            continue
        mm, ss, hh = int(m.group(1)), int(m.group(2)), m.group(3)
        sec = mm * 60 + ss + (int(hh) * 3600 if hh else 0)
        ts = "%02d:%02d" % (mm, ss)
        if hh:
            ts = "%02d:%s" % (int(hh), ts)
        text = m.group(4).strip()
        if not text:
            continue
        cur["sents"].append({
            "id": cur["id"],
            "bv": cur["bv"],
            "sec": sec,
            "ts": ts,
            "text": text,
            "tags": cur["tags"],
        })
    finalize()

    # 组装 JS 输出（紧凑分隔符控体积；每句一行，便于 diff 审阅）
    js_lines = [
        "// corpus_sents.js — 句子级语料（由 scripts/build_corpus_sents.py 生成，勿手改）",
        "// 每条 = 一帧字幕：id=语料条目号, bv=B站AV, sec=秒（用于 ?t= 跳转）, ts=MM:SS, text=原句, tags=条目标签",
        "var CORPUS_SENTS = [",
    ]
    sent_lines = []
    for e in entries:
        for s in e["sents"]:
            sent_lines.append(json.dumps(s, ensure_ascii=False, separators=(",", ":")))
    js_lines.append(",\n".join(sent_lines))
    js_lines.append("];")
    with io.open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(js_lines) + "\n")

    # 统计
    sent_total = sum(len(e["sents"]) for e in entries)
    print("B/N 标题总数: %d" % total_head)
    print("含 > bv: 的条目数: %d" % (len(entries) + len(no_body_ids)))
    print("解析条目数（有 bv + 有正文）: %d" % len(entries))
    print("句子总数: %d" % sent_total)
    print("bv 缺失（产出的条目中）: 0")
    print("有 bv 但无正文的 id 清单（%d 条）: %s" % (len(no_body_ids), ", ".join(no_body_ids)))
    print("无 bv 但有正文（N 经验包，%d 条）: %s" % (len(no_bv_body_ids), ", ".join(no_bv_body_ids)))
    print("无 bv 无正文（跨篇重复占位，%d 条）: %s" % (len(stub_ids), ", ".join(stub_ids[:5]) + ("…" if len(stub_ids) > 5 else "")))
    print("代码块内未匹配时间戳的行: %d" % skipped_sent_lines)
    # 校验：id 唯一性
    id_set = {e["id"] for e in entries}
    print("产出条目 id 唯一: %s（%d 个）" % (len(id_set) == len(entries), len(id_set)))


if __name__ == "__main__":
    main()
