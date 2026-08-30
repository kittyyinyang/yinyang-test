# -*- coding: utf-8 -*-
"""check_site.py — 静态自检：index.html 的内联 JS 语法（esprima）+ HTML 标签平衡 + 数据文件 JS 语法。"""
import io, re, sys
import esprima
from html.parser import HTMLParser

INDEX = r"D:\Workbuddy\yinyang-test\index.html"
VOID = {"area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"}

raw = io.open(INDEX, encoding="utf-8").read()

# 1) 提取所有 <script> 块；带 src 的跳过（数据文件单独查），内联的做语法解析
scripts = re.findall(r"<script(\s[^>]*)?>(.*?)</script>", raw, re.S)
n_inline = 0
for attrs, body in scripts:
    if attrs and "src=" in attrs:
        continue
    n_inline += 1
    try:
        esprima.parseScript(body, tolerant=False)
        print("[OK] 内联脚本 #%d 语法通过（%d 行）" % (n_inline, body.count("\n") + 1))
    except Exception as e:
        print("[FAIL] 内联脚本 #%d 语法错误: %s" % (n_inline, e))
        # 定位行号
        ln = getattr(e, "line_number", None)
        if ln:
            lines = body.split("\n")
            for i in range(max(0, ln - 3), min(len(lines), ln + 2)):
                print("   %4d| %s" % (i + 1, lines[i]))
        sys.exit_code = 1

# 2) 数据文件语法
for f in ["data/data_corpus.js", "data/data_pair.js", "data/data_qa.js"]:
    body = io.open(r"D:\Workbuddy\yinyang-test" + "\\" + f.replace("/", "\\"), encoding="utf-8").read()
    try:
        esprima.parseScript(body, tolerant=False)
        print("[OK] %s 语法通过" % f)
    except Exception as e:
        print("[FAIL] %s: %s" % (f, e))

# 3) HTML 标签平衡（忽略 script/style 内部内容）
class Checker(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []
        self.in_script = 0
    def handle_starttag(self, tag, attrs):
        if tag == "script":
            self.in_script += 1
        if tag not in VOID:
            self.stack.append((tag, self.getpos()))
    def handle_endtag(self, tag):
        if tag == "script":
            self.in_script = max(0, self.in_script - 1)
        if tag in VOID:
            return
        if not self.stack:
            self.errors.append("多余的闭合 </%s> @ %s" % (tag, self.getpos()))
            return
        while self.stack and self.stack[-1][0] != tag:
            t, p = self.stack.pop()
            self.errors.append("未闭合 <%s> @ %s（被 </%s> @ %s 截断）" % (t, p, tag, self.getpos()))
        if self.stack:
            self.stack.pop()

c = Checker()
c.feed(raw)
for t, p in c.stack:
    c.errors.append("未闭合 <%s> @ %s" % (t, p))
if c.errors:
    for e in c.errors[:20]:
        print("[HTML-FAIL]", e)
else:
    print("[OK] HTML 标签平衡")

# 4) 引用完整性：JS 里 onclick/元素 id 引用 vs 定义
ids_used = set(re.findall(r"\$\('([A-Za-z0-9_-]+)'\)", raw))
ids_defined = set(re.findall(r'id="([A-Za-z0-9_-]+)"', raw))
dynamic_ok = {"card-"}  # 动态 id 前缀不算缺失
missing = {i for i in ids_used if i not in ids_defined and not any(i.startswith(p) for p in dynamic_ok) and not i.startswith("page-")}
static_pages = set(re.findall(r'id="page-([a-z]+)"', raw))
missing -= {"page-" + p for p in static_pages}
missing -= {"page-" + p for p in ["home","qa","test","search","me"]}
print("[INFO] JS 引用但静态缺失的 id（多数为动态生成，需人工确认）:", sorted(missing) if missing else "无")

funcs_called = set(re.findall(r'onclick="([A-Za-z_$][\w$]*)\(', raw)) | set(re.findall(r'onkey\w+="[^"]*?([A-Za-z_$][\w$]*)\(', raw))
funcs_defined = set(re.findall(r"function\s+([A-Za-z_$][\w$]*)\s*\(", raw))
builtin = {"event", "confirm"}
fn_missing = {f for f in funcs_called if f not in funcs_defined and f not in builtin}
print("[INFO] onclick 调用但未定义的函数:", sorted(fn_missing) if fn_missing else "无")

# 5) JS 字符串模板里 onclick=\"fn(...)\" 的动态调用（生成的 HTML）
gen_calls = set(re.findall(r'onclick=\\?"([A-Za-z_$][\w$]*)\(', raw))
gen_missing = {f for f in gen_calls if f not in funcs_defined and f not in builtin}
print("[INFO] 生成 HTML 中调用但未定义的函数:", sorted(gen_missing) if gen_missing else "无")
