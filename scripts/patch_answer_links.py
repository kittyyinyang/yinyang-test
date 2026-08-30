# -*- coding: utf-8 -*-
r"""patch_answer_links.py — 为缺 link 的 answer 条目补 B站 ?t= 直达链接

覆盖两个数据文件（只增不改，幂等可重跑）：
  1. data/data_qa.js（var QA_DATA，JSON 格式）——解析数组→补 link→按原格式写回；
  2. data/qa_clips_new.js（var QA_CLIPS_NEW，手写 JS 单行对象）——正则插入 link。

补丁规则：answer 条目有 ts（MM:SS）且有 bv，但缺 link 时，
补 link = https://www.bilibili.com/video/{bv}?t={MM*60+SS}。
无 ts/bv 的编辑整理条目不补（本就无视频源）。
"""
import io
import json
import re

DATA = r"D:\Workbuddy\yinyang-test\data"
QA_DATA_PATH = DATA + r"\data_qa.js"
QA_CLIPS_PATH = DATA + r"\qa_clips_new.js"

MARKER = "var QA_DATA = "


def ts_to_sec(ts):
    m = re.match(r"^(\d+):(\d{2})(?::(\d{2}))?$", str(ts or "").strip())
    if not m:
        return None
    return int(m.group(1)) * 60 + int(m.group(2)) + (int(m.group(3)) * 3600 if m.group(3) else 0)


def make_link(bv, sec):
    return "https://www.bilibili.com/video/%s?t=%d" % (bv, sec)


def extract_array(raw):
    """从 'var QA_DATA = ' 之后定位顶层 JSON 数组 [..]（括号配平，兼容字符串）。"""
    s0 = raw.index(MARKER) + len(MARKER)
    i = s0
    while i < len(raw) and raw[i] in " \t\r\n":
        i += 1
    assert raw[i] == "[", "QA_DATA 数组起始异常"
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
    return i, j, raw[i:j]


def patch_data_qa(path):
    raw = io.open(path, encoding="utf-8", newline="\n").read()
    a_start, a_end, arr_text = extract_array(raw)
    arr = json.loads(arr_text)
    changed = 0
    for card in arr:
        for a in card.get("answer", []) or []:
            if a.get("link"):
                continue
            ts, bv = a.get("ts"), a.get("bv")
            if not ts or not bv:
                continue
            sec = ts_to_sec(ts)
            if sec is None:
                continue
            a["link"] = make_link(bv, sec)
            changed += 1
    new_raw = raw[:a_start] + json.dumps(arr, ensure_ascii=False, indent=1) + raw[a_end:]
    io.open(path, "w", encoding="utf-8", newline="\n").write(new_raw)
    return changed, len(arr)


# qa_clips_new.js 的单行 answer 对象：{ts:'MM:SS', videoId:'X', bv:'BV...', text:'...'}
CLIP_OBJ_RE = re.compile(
    r"\{ts:'(\d+):(\d{2})'([^}]*?)bv:'(BV[^']+)'(?!.*link:)([^}]*?)text:'"
)


def _clip_repl(m):
    mm, ss = int(m.group(1)), int(m.group(2))
    sec = mm * 60 + ss
    bv = m.group(4)
    return ("{ts:'%s:%s'%sbv:'%s'%slink:'%s', text:'"
            % (m.group(1), m.group(2), m.group(3), bv, m.group(5), make_link(bv, sec)))


def patch_qa_clips(path):
    raw = io.open(path, encoding="utf-8", newline="\n").read()
    new_raw, n = CLIP_OBJ_RE.subn(_clip_repl, raw)
    io.open(path, "w", encoding="utf-8", newline="\n").write(new_raw)
    return n


def main():
    n1, cards = patch_data_qa(QA_DATA_PATH)
    print("data_qa.js：%d 张卡，补 link %d 条" % (cards, n1))
    n2 = patch_qa_clips(QA_CLIPS_PATH)
    print("qa_clips_new.js：补 link %d 条" % n2)
    print("合计补 %d 条（幂等：重跑为 0）" % (n1 + n2))


if __name__ == "__main__":
    main()
