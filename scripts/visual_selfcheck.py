# -*- coding: utf-8 -*-
"""视觉升级自查：id diff / 标签平衡 / 函数集合 / typeof 守卫 / 括号平衡"""
import io, re, sys
from html.parser import HTMLParser

OLD = io.open('index.pre-visual.html', encoding='utf-8').read()
NEW = io.open('index.html', encoding='utf-8').read()
ok = True

def fail(msg):
    global ok
    ok = False
    print('  FAIL:', msg)

# ── 1) id 清单 diff（静态 id="..." 与 JS/CSS 内字面量）──
def ids_of(s):
    return set(re.findall(r'id="([^"]*)"', s)) | set(re.findall(r"id='([^']*)'", s))
o_ids, n_ids = ids_of(OLD), ids_of(NEW)
removed = o_ids - n_ids
added = n_ids - o_ids
print('[1] id diff: old=%d new=%d' % (len(o_ids), len(n_ids)))
# 允许的纯装饰新增：SVG 渐变/滤镜 defs id + CSS 噪点 data-uri 内部 id
ALLOWED_ADDED = {'yyDefs', 'wgDayG', 'wgNightG', 'wgSG', 'wgBrush', 'wgInk', 'wgHalo', 'n'}
if removed: fail('ids removed: %s' % sorted(removed))
bad_added = added - ALLOWED_ADDED
if bad_added: fail('unexpected ids added: %s' % sorted(bad_added))
print('  added(decor allowed): %s' % sorted(added))

# ── 2) 函数集合 diff（不得删除/改名任何函数）──
def funcs_of(s):
    return sorted(set(re.findall(r'\bfunction\s+([A-Za-z_$][\w$]*)\s*\(', s)))
o_f, n_f = funcs_of(OLD), funcs_of(NEW)
print('[2] functions: old=%d new=%d' % (len(o_f), len(n_f)))
if set(o_f) - set(n_f): fail('functions removed: %s' % (set(o_f) - set(n_f)))
if set(n_f) - set(o_f): print('  functions added (should be none):', set(n_f) - set(o_f))

# ── 3) typeof 守卫未被破坏 ──
GUARDS = ['typeof CORPUS_REFINED', 'typeof CORPUS_DATA', 'typeof PAIR_DATA', 'typeof QA_DATA',
          'typeof QA_CLIPS_NEW', 'typeof RESULT_GUIDE_MAP', 'typeof QUIZ !==', 'typeof QUIZ_META',
          'typeof QUIZ_MALE', 'typeof QUIZ_FEMALE']
print('[3] typeof guards:')
for g in GUARDS:
    o_cnt, n_cnt = OLD.count(g), NEW.count(g)
    if n_cnt < o_cnt: fail('guard weakened: %r %d -> %d' % (g, o_cnt, n_cnt))
print('  all %d guards preserved' % len(GUARDS))

# ── 4) 关键交互钩子存在（注意 JS 内 \' 转义按字面匹配）──
HOOKS = ['id="toast"', 'id="wechatLayer"', 'id="tnNav"', 'id="main"', 'id="page-home"', 'id="page-qa"',
         'id="page-test"', 'id="page-search"', 'id="page-me"', 'id="homeLastResult"', 'id="homeQaPreview"',
         'id="qaShareNote"', 'id="qaRecommend"', 'id="qaGroups"', 'id="qaScenes"', 'id="qaList"',
         'id="testBox"', 'id="searchInput"', 'id="searchOut"', 'id="meBox"', 'id="tabbar"',
         'onclick="runSearch()"', 'onclick="toggleQa(this)"', 'pickOpt(', 'shareKp(',
         'onclick="startGender(\\\'male\\\')"', 'onclick="startGender(\\\'female\\\')"',
         'onclick="viewHistory(', 'onclick="clearHistory()"', 'onclick="resumeQuiz()"',
         'onclick="hideWechat()"', 'onclick="nextQuestion()"', 'onclick="showResultFlow()"',
         'onclick="showQuestion()"', 'goNextChapter(',
         'onclick="shareResult(', 'data-r="home"', 'data-r="qa"', 'data-r="test"', 'data-r="search"', 'data-r="me"',
         'space.bilibili.com/25583807', 'href="#home"', 'href="#test"', 'hashchange']
print('[4] interaction hooks:')
missing = [h for h in HOOKS if h not in NEW]
if missing: fail('missing hooks: %s' % missing)
else: print('  all %d hooks present' % len(HOOKS))

# ── 5) HTML 标签平衡 ──
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Chk(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.stack = []
        self.errors = []
    def handle_starttag(self, tag, attrs):
        if tag in VOID: return
        self.stack.append((tag, self.getpos()))
    def handle_startendtag(self, tag, attrs):
        pass
    def handle_endtag(self, tag):
        if tag in VOID: return
        if not self.stack:
            self.errors.append('extra </%s> at %s' % (tag, self.getpos())); return
        top, pos = self.stack.pop()
        if top != tag:
            self.errors.append('mismatch: <%s>(line %d) closed by </%s> at %s' % (top, pos[0], tag, self.getpos()))
p = Chk()
p.feed(NEW)
p.close()
print('[5] tag balance:')
if p.errors: fail(' / '.join(p.errors[:6]))
if p.stack: fail('unclosed: %s' % [(t, pos[0]) for t, pos in p.stack][:8])
if not p.errors and not p.stack: print('  all tags balanced')

# ── 6) CSS 花括号平衡 ──
m = re.search(r'<style>\n(.*?)\n</style>', NEW, re.S)
css = m.group(1) if m else ''
o_, c_ = css.count('{'), css.count('}')
print('[6] css braces: %d open / %d close' % (o_, c_))
if o_ != c_: fail('css braces unbalanced')
for need in ['var(--serif)', 'energyFlow', 'wheelSpin', 'pageIn', 'prefers-reduced-motion']:
    if need not in css: fail('css missing: ' + need)

# ── 7) 内联 JS 括号平衡（字符串/注释/正则感知剥离）──
def js_of(s):
    return re.findall(r'<script>(.*?)</script>', s, re.S)[-1]
def strip_smart(s):
    out, i, n = [], 0, len(s)
    prev = ''
    while i < n:
        ch = s[i]
        if ch in ('"', "'"):
            q = ch; i += 1
            while i < n:
                if s[i] == '\\':
                    i += 2; continue
                if s[i] == q:
                    break
                i += 1
            i += 1
            out.append('S'); prev = 'S'
        elif s.startswith('//', i) and prev not in 'S':
            while i < n and s[i] != '\n':
                i += 1
        elif s.startswith('/*', i) and prev not in 'S':
            j = s.find('*/', i + 2)
            i = n if j < 0 else j + 2
        elif ch == '/' and prev in '(,=:!&|?;[{}+-*%~^':
            i += 1; in_cls = False
            while i < n:
                if s[i] == '\\':
                    i += 2; continue
                if s[i] == '[':
                    in_cls = True
                elif s[i] == ']':
                    in_cls = False
                elif s[i] == '/' and not in_cls:
                    break
                i += 1
            i += 1
            while i < n and s[i].isalpha():
                i += 1
            out.append('R'); prev = 'R'
        else:
            if not ch.isspace():
                prev = ch
            out.append(ch)
            i += 1
    return ''.join(out)
flat = strip_smart(js_of(NEW))
flat_old = strip_smart(js_of(OLD))
print('[7] js balance: new ( %d / %d )  { %d / %d }  [ %d / %d ]' % (
    flat.count('('), flat.count(')'), flat.count('{'), flat.count('}'),
    flat.count('['), flat.count(']')))
if (flat.count('('), flat.count(')')) != (flat_old.count('('), flat_old.count(')')) :
    if flat.count('(') != flat.count(')'): fail('js () unbalanced')
if flat.count('{') != flat.count('}'): fail('js {} unbalanced')
if flat.count('[') != flat.count(']'): fail('js [] unbalanced')
for name in ['WHEEL_SVG', 'CH_NUM', 'SEAL_CHAR', 'wheel-orbit', 'ch-seal', 'ch-ticks', 'seal-type']:
    if name not in js_of(NEW): fail('visual addition missing in JS: ' + name)

# ── 8) 视觉验收点静态存在性 ──
VIS = ['wheel-orbit', 'wgDayG', 'wgNightG', 'wgInk', 'wgHalo', 'brush-divider', 'brand-seal',
       'pico', 'ch-seal', 'ch-tick', 'energyFlow', 'pageIn', 'wheelSpin', 'seal-type',
       'quote::before', 'qcard-q::before', 'ev-item::after', 'pair-avatars::before', 'mi-date']
print('[8] visual landmarks:')
miss2 = [v for v in VIS if v not in NEW]
if miss2: fail('missing: %s' % miss2)
else: print('  all %d landmarks present' % len(VIS))

print('=' * 40)
print('SELF-CHECK %s' % ('PASSED' if ok else 'FAILED'))
sys.exit(0 if ok else 1)
