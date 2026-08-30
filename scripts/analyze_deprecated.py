# -*- coding: utf-8 -*-
"""旧卡替代分析：找出与核心层（qa_core1-4）主题重复的长尾卡，生成 DEPRECATED 清单。
重复判定：长尾卡（data_qa/qa_clips_new 中未被 kpId 覆盖者）的 evidence 首视频 ∈ 核心卡引用视频集合，
且 category 相同 → 视为同一主题的旧版，剔除。
输出：data/deprecated_qa.js（var DEPRECATED_QA=[qaId,...]）+ 对照表 stdout。"""
import re, io, sys, json, collections
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
B = r"D:\Workbuddy\yinyang-test\data\\"

def parse(path):
    s = open(path, encoding='utf-8').read()
    cards = []
    for m in re.finditer(r"\{\s*qaId:\s*'([^']+)'(.*?)\n\s*\}", s, re.S):
        seg = m.group(2)
        kp = re.search(r"kpId:\s*'([^']*)'", seg)
        cat = re.search(r"category:\s*'([^']*)'", seg)
        vid = re.search(r"videoId:\s*'([^']*)'", seg)
        q = re.search(r"question:\s*'([^']+)'", seg)
        cards.append(dict(qaId=m.group(1), kpId=kp.group(1) if kp else '',
                          category=cat.group(1) if cat else '',
                          videoId=vid.group(1) if vid else '',
                          question=q.group(1) if q else ''))
    return cards

core = []
for f in ['qa_core.js', 'qa_core2.js', 'qa_core3.js', 'qa_core4.js']:
    core += parse(B + f)
core_kp = {c['kpId'] for c in core if c['kpId']}
core_vid_cat = {(c['videoId'], c['category']) for c in core if c['videoId']}
core_vids = {c['videoId'] for c in core if c['videoId']}

tail, seen = [], set()
for f in ['data_qa.js', 'qa_clips_new.js']:
    for c in parse(B + f):
        if c['qaId'] in seen: continue
        seen.add(c['qaId'])
        if c['kpId'] and c['kpId'] in core_kp: continue     # 同 kpId 已被核心覆盖
        tail.append(c)

dep, keep = [], []
for c in tail:
    key = (c['videoId'], c['category'])
    if c['videoId'] and key in core_vid_cat:
        dep.append(c)
    elif c['videoId'] and c['videoId'] in core_vids and c['category'] == next((x['category'] for x in core if x['videoId'] == c['videoId']), ''):
        dep.append(c)
    else:
        keep.append(c)

print('核心卡:', len(core), '｜长尾(未被kpId覆盖):', len(tail), '｜判重复剔除:', len(dep), '｜保留:', len(keep))
print('\n--- 剔除清单（重复主题旧卡）---')
for c in dep: print(f"  {c['qaId']:20s} [{c['category']}] {c['question'][:34]}  (视频{c['videoId']})")
print('\n--- 保留长尾（独立价值）---')
for c in keep[:40]: print(f"  {c['qaId']:20s} [{c['category']}] {c['question'][:34]}")
if len(keep) > 40: print(f'  ... 其余 {len(keep)-40} 条')

out = 'var DEPRECATED_QA=' + json.dumps([c['qaId'] for c in dep], ensure_ascii=False) + ';\n'
open(B + 'deprecated_qa.js', 'w', encoding='utf-8', newline='\n').write(out)
print('\n已生成 data/deprecated_qa.js')
