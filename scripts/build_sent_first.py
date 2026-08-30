# -*- coding: utf-8 -*-
"""从 corpus_sents.js 生成轻量首句索引 corpus_sent_first.js（id -> 首句秒数）"""
import re, os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, 'data', 'corpus_sents.js')
DST = os.path.join(BASE, 'data', 'corpus_sent_first.js')

text = open(SRC, encoding='utf-8').read()
# 格式: {"id":"B3","bv":"BV...","sec":3,"ts":"00:03","text":"..."}
objs = re.findall(r'"id":"([^"]+)","bv":"([^"]+)","sec":(\d+),"ts":"([^"]+)"', text)
first = {}
order = []
for oid, bv, sec, ts in objs:
    if oid not in first:
        first[oid] = int(sec)
        order.append(oid)

lines = ['// 语料条目首句时间索引（由 corpus_sents.js 生成，勿手改；重跑 scripts/build_sent_first.py）',
         '// 供搜一搜语料条目精确跳转：点击 ▶ B站 时拼 ?t=首句秒数（句子级全文按需另加载 corpus_sents.js）',
         'var CORPUS_SENT_FIRST_DATA = {']
for oid in order:
    lines.append(f'  "{oid}":{first[oid]},')
lines.append('};')

out = '\n'.join(lines) + '\n'
with open(DST, 'w', encoding='utf-8', newline='\n') as f:
    f.write(out)

print(f"生成 {DST}: {len(order)} 条 id（源句子 {len(objs)} 条）")
print(f"文件大小: {os.path.getsize(DST)/1024:.1f} KB")
