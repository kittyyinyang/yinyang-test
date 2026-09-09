# _tmp_gram_stat.py — 统计全量语料 n-gram 的「段落覆盖率 df」，产出：
#   1) data/qa_generic.js  泛词黑名单（df 过高，无区分度）
#   2) 候选术语表（df 适中）供人工挑选
import json, re, collections, io

src = io.open('data/corpus_chunks.js', encoding='utf-8').read()
data = json.loads(src[src.index('{'):].rstrip().rstrip(';'))
texts = [d[2] for d in data['d']]
N = len(texts)
print('段落数', N)

df = collections.defaultdict(collections.Counter)  # n -> gram -> 段落数
for t in texts:
    segs = re.findall(r'[\u4e00-\u9fa5]{2,}', t)
    seen = {n: set() for n in (2, 3, 4)}
    for s in segs:
        for n in (2, 3, 4):
            for k in range(len(s) - n + 1):
                seen[n].add(s[k:k + n])
    for n in (2, 3, 4):
        for g in seen[n]:
            df[n][g] += 1

# 1) 泛词：df/N 超过阈值 → 无区分度
TH = 0.015
generic = []
for n in (2, 3, 4):
    for g, c in df[n].items():
        if c / N > TH:
            generic.append(g)
generic = sorted(set(generic))
print('泛词数(阈值 %.1f%%): %d' % (TH * 100, len(generic)))

with io.open('data/qa_generic.js', 'w', encoding='utf-8') as f:
    f.write('/* 泛词黑名单：在超过 %.1f%% 的语料段落中出现，检索无区分度（自动生成）*/\n' % (TH * 100))
    f.write('var QA_GENERIC = (%r).split("|");\n' % '|'.join(generic))

# 2) 候选术语：df 在 [25, N*TH) 之间，且不是泛词的 2-4gram
cand = []
for n in (2, 3, 4):
    for g, c in df[n].items():
        if 25 <= c < N * TH and g not in generic:
            cand.append((c, g, n))
cand.sort(reverse=True)
print('\n候选术语（df, 词）前 400：')
out = []
for c, g, n in cand[:400]:
    out.append('%s(%d)' % (g, c))
print(' '.join(out))
