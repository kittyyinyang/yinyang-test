# -*- coding: utf-8 -*-
"""从语料原文提取 视频标题映射：Bxxx -> 标题，再借 corpus_sents.js 的 id<->bv 得到 bv -> 标题
输出 data/video_titles.js（var VIDEO_TITLES = {...}）
"""
import re, io, json, sys
from pathlib import Path
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = Path(r"D:\Workbuddy\yinyang-test")
CORPUS_MD = Path(r"D:\Workbuddy\2026-08-26-20-11-15\downloads\语料全量版-最新.md")
SENTS = ROOT / "data" / "corpus_sents.js"
OUT = ROOT / "data" / "video_titles.js"

if not CORPUS_MD.exists():
    print("语料原文不存在:", CORPUS_MD); sys.exit(1)

# 1) 解析语料 md：### Bxxx · 标题 + 该 section 内的 bv
id2title, id2bv = {}, {}
cur_id = None
print("解析语料原文…")
with io.open(CORPUS_MD, encoding='utf-8') as f:
    for ln in f:
        m = re.match(r'^###\s+([BN]\d+)\s*[·・\-–—:：]\s*(.*)', ln)
        if m:
            cur_id = m.group(1)
            title = m.group(2).strip()
            if title:
                id2title.setdefault(cur_id, title)
            continue
        if cur_id:
            mb = re.search(r'bv:\s*`?(BV[0-9A-Za-z]+)', ln)
            if mb:
                id2bv.setdefault(cur_id, mb.group(1))
print(f"  视频 {len(id2title)} 个（含标题），带 bv {len(id2bv)} 个")

# 2) corpus_sents.js 的 id<->bv（补充语料 md 里没抓到的）
print("解析 corpus_sents.js…")
raw = io.open(SENTS, encoding='utf-8').read()
sents_id2bv = {}
for m in re.finditer(r'\{"id":"([BN]\d+)","bv":"(BV[0-9A-Za-z]+)"', raw):
    sents_id2bv.setdefault(m.group(1), m.group(2))
print(f"  sents 映射 {len(sents_id2bv)} 个")

# 3) 合成 bv -> 标题
# ⚠ 关键：语料原文(md) 与 corpus_sents.js 的 Bxxx 编号「不是同一套」，
#    若经 Bxxx 中转会把标题张冠李戴。这里只用语料 md 内部配对（### 标题 + 同 section 的 bv 行），
#    bv 才是唯一标识。
bv2title = {}
for vid, title in id2title.items():
    bv = id2bv.get(vid)
    if bv:
        bv2title.setdefault(bv, title)
# 仅当语料 md 没抓到 bv 时，才退回 corpus_sents.js 的编号映射（可能存在体系差异，故最后才用）
for vid, title in id2title.items():
    if vid in id2bv:
        continue
    bv = sents_id2bv.get(vid)
    if bv:
        bv2title.setdefault(bv, title)

# 4) 反查：只有 bv 没有 id 的（用 sents 里出现过的 bv，标题填 id 对应的）
print(f"  bv->标题 {len(bv2title)} 条")

OUT.parent.mkdir(exist_ok=True)
body = json.dumps(bv2title, ensure_ascii=False, indent=1, sort_keys=True)
io.open(OUT, 'w', encoding='utf-8').write(
    "// video_titles.js — 视频标题映射（自动生成，勿手改）\n"
    "// 由 scripts/build_video_titles.py 从语料原文提取（### Bxxx · 标题 + bv 行）\n"
    "// 用途：知识卡语料佐证按「该条佐证所属视频」显示标题，而非卡片级 videoTitle\n"
    "var VIDEO_TITLES = " + body + ";\n")
print(f"输出 {OUT}（{OUT.stat().st_size // 1024} KB）")

# 样例
for bv in list(bv2title)[:5]:
    print(f"  {bv} -> {bv2title[bv]}")
