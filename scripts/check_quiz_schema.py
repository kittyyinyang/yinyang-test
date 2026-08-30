# -*- coding: utf-8 -*-
"""check_quiz_schema.py — 用 esprima AST 校验 Agent B 题卷与引擎契约的匹配度。"""
import io, json
import esprima

def lit_to_py(node):
    t = node.type
    if t == "ObjectExpression":
        out = {}
        for p in node.properties:
            key = p.key.name if p.key.type == "Identifier" else p.key.value
            out[key] = lit_to_py(p.value)
        return out
    if t == "ArrayExpression":
        return [lit_to_py(e) for e in node.elements if e is not None]
    if t == "Literal":
        return node.value
    if t == "UnaryExpression" and node.operator == "-":
        return -lit_to_py(node.argument)
    if t == "Identifier":
        return "<id:%s>" % node.name
    return "<%s>" % t

def extract_vars(path):
    raw = io.open(path, encoding="utf-8").read()
    tree = esprima.parseScript(raw)
    out = {}
    for stmt in tree.body:
        if stmt.type == "VariableDeclaration":
            for d in stmt.declarations:
                if d.init is not None:
                    out[d.id.name] = lit_to_py(d.init)
    return out

ok = True
for path, g in [("data/quiz_male.js", "male"), ("data/quiz_female.js", "female")]:
    vs = extract_vars(path)
    quiz = vs.get("QUIZ")
    meta = vs.get("QUIZ_META") or {}
    print("==", path, "| QUIZ:", len(quiz) if quiz else None, "| META:", meta)
    if not quiz:
        print("  [FAIL] 无 QUIZ"); ok = False; continue
    ids = [q["id"] for q in quiz]
    if len(set(ids)) != len(ids):
        print("  [FAIL] 题号重复"); ok = False
    chs = []
    for q in quiz:
        miss = [k for k in ("id","chapter","scene","text","opts","kpLink","weight") if k not in q]
        if miss:
            print("  [FAIL]", q.get("id"), "缺字段:", miss); ok = False
        if len(q["opts"]) != 2:
            print("  [FAIL]", q["id"], "选项数≠2"); ok = False
        for o in q["opts"]:
            if "t" not in o or "k" not in o:
                print("  [FAIL]", q["id"], "选项缺 t/k"); ok = False
        if q.get("isTrap"):
            if not any(o.get("soc") for o in q["opts"]):
                print("  [FAIL]", q["id"], "陷阱题无 soc:1 选项"); ok = False
        if not q.get("chapterTitle") and q.get("intro"):
            pass
        if q.get("chapter") not in chs:
            chs.append(q["chapter"])
    print("  chapters:", chs, "| scene分布:", {s: sum(1 for q in quiz if q['scene']==s) for s in sorted(set(q['scene'] for q in quiz))})
    print("  weight:1.5 题数:", sum(1 for q in quiz if q.get("weight") == 1.5),
          "| warp:1 选项数:", sum(1 for q in quiz for o in q['opts'] if o.get('warp') == 1),
          "| dualOf:", [q['id'] for q in quiz if q.get('dualOf')],
          "| isTrap:", [q['id'] for q in quiz if q.get('isTrap')])
    selfq = [q for q in quiz if q["scene"] == "self"]
    print("  self 题数:", len(selfq))
    # gender 快照鉴定
    gset = set(q.get("gender") for q in quiz)
    print("  gender 集合:", gset, "→ snapshotGender =", "male" if "male" in gset else ("female" if "female" in gset else None))

# 模拟：男版「人前阳独处阴」用例（Python 复刻 computeResult 逻辑做设计验证）
vs_m = extract_vars("data/quiz_male.js")
quiz = vs_m["QUIZ"]
def simulate(answers):
    wy = wn = M = 0.0
    selfY = selfN = 0.0
    scenes = {"family": [0.0, 0.0], "work": [0.0, 0.0], "love": [0.0, 0.0]}
    byid = {q["id"]: q for q in quiz}
    seen = set()
    for q in quiz:
        a = answers.get(q["id"])
        if a is None: continue
        opt = q["opts"][a]
        w = q.get("weight", 1.0)
        if q["scene"] == "self": w *= 1.5
        wv = w * (1.3 if opt.get("warp") else 1)
        sc = "work" if q["scene"] == "school" else q["scene"]
        if opt["k"] > 0:
            wy += wv
            if sc != "self" and sc in scenes: scenes[sc][0] += wv
            if q["scene"] == "self": selfY += w
        elif opt["k"] < 0:
            wn += wv
            if sc != "self" and sc in scenes: scenes[sc][1] += wv
            if q["scene"] == "self": selfN += w
        if q.get("isTrap") and (opt.get("soc") or opt["k"] > 0): M += 1
        if q.get("dualOf") and q["dualOf"] in byid:
            key = "|".join(sorted([q["id"], q["dualOf"]]))
            if key in seen: continue
            seen.add(key)
            o = byid[q["dualOf"]]
            a2 = answers.get(o["id"])
            if a2 is not None:
                k1, k2 = opt["k"], o["opts"][a2]["k"]
                if k1 * k2 < 0: M += 2
    K = round(wy * 100 / (wy + wn)) if (wy + wn) else 50
    isY = K >= 50
    crit = abs(K - 50) < 10
    typ = ("yang" if isY else "yin") + "-male"
    ratio = selfY / (selfY + selfN) if (selfY + selfN) else 0.5
    shell = isY and (selfY + selfN) >= 2 and ratio < 0.4
    sc2 = {k: (round(v[0] * 100 / (v[0] + v[1])) if (v[0] + v[1]) else None) for k, v in scenes.items()}
    return dict(K=K, type=typ, critical=crit, M=M, shell=shell, scenes=sc2)

# 全阳 → 男阳；构造人前阳独处阴：chapter3/4 全阳，chapter5(self) 全阴
ans_yang = {}
for q in quiz:
    if q["scene"] == "self":
        for i, o in enumerate(q["opts"]):
            if o["k"] < 0: ans_yang[q["id"]] = i
    else:
        for i, o in enumerate(q["opts"]):
            if o["k"] > 0: ans_yang[q["id"]] = i
# 陷阱题 k:0 → 若未答补 0
for q in quiz:
    ans_yang.setdefault(q["id"], 0)
print("\n[用例1 人前阳/独处阴] ", simulate(ans_yang))

ans_yin = {}
for q in quiz:
    for i, o in enumerate(q["opts"]):
        if o["k"] < 0 and not (q.get("isTrap") and o.get("soc")):
            ans_yin[q["id"]] = i
for q in quiz:
    ans_yin.setdefault(q["id"], 0)
print("[用例2 全阴(陷阱选真实)] ", simulate(ans_yin))

ans_trap = {q["id"]: 0 for q in quiz}
for q in quiz:
    if q.get("isTrap"):
        for i, o in enumerate(q["opts"]):
            if o.get("soc"): ans_trap[q["id"]] = i
print("[用例3 陷阱选体面+全阳] ", simulate(ans_trap))
print("\nOK" if ok else "\nSCHEMA-FAIL")
