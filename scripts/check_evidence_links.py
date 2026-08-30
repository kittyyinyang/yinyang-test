# -*- coding: utf-8 -*-
"""
全量检查知识卡数据文件中的 evidence.link 是否带正确的时间戳参数。
规则：link 应为 https://www.bilibili.com/video/BVxxx?t=秒数
      ts "MM:SS" -> t = MM*60+SS（也兼容 "H:MM:SS" / 纯秒数）
输出：缺失 link / link 无 t 参数 / t 与 ts 不符 / bv 与 link 不符 的条目清单
"""
import re, glob, os, sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASE, 'data')

FILES = [
    'qa_core.js', 'qa_core2.js', 'qa_core3.js', 'qa_core4.js',
    'qa_clips_new.js', 'data_qa.js',
]

def ts_to_sec(ts):
    ts = str(ts).strip()
    if ts.endswith('s') or ts.endswith('秒'):
        try:
            return int(float(ts[:-1]))
        except ValueError:
            return None
    try:
        parts = ts.split(':')
        parts = [int(p) for p in parts]
        if len(parts) == 2:
            return parts[0]*60 + parts[1]
        if len(parts) == 3:
            return parts[0]*3600 + parts[1]*60 + parts[2]
        if len(parts) == 1:
            return parts[0]
    except (ValueError, TypeError):
        pass
    return None

def extract_objects(text, varname):
    """抽取 var XXX = [ ... ]; 数组里的对象字面量列表（粗略切分，按 { } 平衡）"""
    m = re.search(r'var\s+' + varname + r'\s*=\s*\[', text)
    if not m:
        return []
    start = m.end()
    # 找匹配的 ]
    depth = 0
    i = start
    while i < len(text):
        c = text[i]
        if c == '[':
            depth += 1
        elif c == ']':
            depth -= 1
            if depth == 0:
                break
        i += 1
    arr_text = text[start:i]
    # 切对象
    objs = []
    cur = []
    depth = 0
    in_str = None
    j = 0
    while j < len(arr_text):
        c = arr_text[j]
        if in_str:
            cur.append(c)
            if c == '\\':
                j += 1
                if j < len(arr_text):
                    cur.append(arr_text[j])
            elif c == in_str:
                in_str = None
        elif c in ('"', "'"):
            in_str = c
            cur.append(c)
        elif c == '{':
            depth += 1
            cur.append(c)
        elif c == '}':
            depth -= 1
            cur.append(c)
            if depth == 0:
                objs.append(''.join(cur))
                cur = []
        else:
            cur.append(c)
        j += 1
    return objs

def parse_evidence(obj):
    """从对象文本中提取 evidence 数组条目（list of dict）"""
    m = re.search(r'evidence\s*:\s*\[(.*?)\]', obj, re.S)
    if not m:
        return []
    ev_text = m.group(1)
    # 切 evidence 对象
    evs = []
    cur = []
    depth = 0
    in_str = None
    j = 0
    while j < len(ev_text):
        c = ev_text[j]
        if in_str:
            cur.append(c)
            if c == '\\':
                j += 1
                if j < len(ev_text):
                    cur.append(ev_text[j])
            elif c == in_str:
                in_str = None
        elif c in ('"', "'"):
            in_str = c
            cur.append(c)
        elif c == '{':
            depth += 1
            cur.append(c)
        elif c == '}':
            depth -= 1
            cur.append(c)
            if depth == 0:
                evs.append(''.join(cur))
                cur = []
        else:
            cur.append(c)
        j += 1
    parsed = []
    for ev in evs:
        def grab(key):
            m2 = re.search(key + r'\s*:\s*(["\'])(.*?)\1', ev, re.S)
            return m2.group(2) if m2 else None
        parsed.append({
            'ts': grab('ts'),
            'videoId': grab('videoId'),
            'bv': grab('bv'),
            'text': grab('text'),
            'link': grab('link'),
        })
    return parsed

def main():
    problems = []
    total_ev = 0
    total_cards = 0
    for fn in FILES:
        path = os.path.join(DATA, fn)
        if not os.path.exists(path):
            print(f"[缺失文件] {fn}")
            continue
        text = open(path, encoding='utf-8').read()
        # 变量名：把 qa_core.js -> QA_CORE, data_qa.js -> DATA_QA
        base = os.path.splitext(fn)[0]
        varmap = {
            'qa_core': 'QA_CORE', 'qa_core2': 'QA_CORE2', 'qa_core3': 'QA_CORE3',
            'qa_core4': 'QA_CORE4', 'qa_clips_new': 'QA_CLIPS_NEW', 'data_qa': 'DATA_QA',
        }
        var = varmap.get(base, base.upper())
        objs = extract_objects(text, var)
        if not objs and fn != 'data_qa.js':
            # 尝试别的变量名
            for cand in re.findall(r'var\s+([A-Z0-9_]+)\s*=\s*\[', text):
                objs = extract_objects(text, cand)
                if objs:
                    var = cand
                    break
        total_cards += len(objs)
        for oi, obj in enumerate(objs):
            qaId = re.search(r'qaId\s*:\s*(["\'])(.*?)\1', obj)
            qaId = qaId.group(2) if qaId else f"{fn}#{oi}"
            evs = parse_evidence(obj)
            for ev in evs:
                total_ev += 1
                link = ev['link']
                bv = ev['bv']
                ts = ev['ts']
                sec = ts_to_sec(ts) if ts else None
                if not link:
                    problems.append((fn, qaId, 'LINK缺失', ts, bv, ''))
                    continue
                m = re.search(r't=(\d+)', link)
                if not m:
                    problems.append((fn, qaId, 'LINK无t参数(从头播放)', ts, bv, link))
                    continue
                link_sec = int(m.group(1))
                if sec is not None and link_sec != sec:
                    problems.append((fn, qaId, f't与ts不符(link={link_sec}s ts={ts}->{sec}s)', ts, bv, link))
                m2 = re.search(r'(BV[a-zA-Z0-9]+)', link)
                if m2 and bv and m2.group(1) != bv:
                    problems.append((fn, qaId, f'link的BV与bv字段不符({m2.group(1)} vs {bv})', ts, bv, link))
    print(f"扫描 {len(FILES)} 个文件, {total_cards} 张卡, {total_ev} 条 evidence")
    print(f"发现问题 {len(problems)} 条")
    print("=" * 70)
    for fn, qaId, issue, ts, bv, link in problems:
        print(f"[{fn}] {qaId} | {issue} | ts={ts} bv={bv} | {link}")
    # 按文件统计
    from collections import Counter
    c = Counter(p[0] for p in problems)
    print("=" * 70)
    print("按文件分布:", dict(c))

if __name__ == '__main__':
    main()
