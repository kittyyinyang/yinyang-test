# -*- coding: utf-8 -*-
"""build_data_pair.py — 生成 data/data_pair.js（10 键：6 异型对 + 4 同型对）
异型对文案从旧站 index.html RESULT_DATA[*].pairGuide 反查改写；
同型对语料依据 B666（两个阳不来电/两个阴共生）与 B678。
键 = 'A|B'（按 CANON 顺序规范化），查找时正反都试。
"""
import io, json

OUT = r"D:\Workbuddy\yinyang-test\data\data_pair.js"

CANON = ["yang-male", "yang-female", "yin-female", "yin-male"]

B666_URL = "https://www.bilibili.com/video/BV1A7gK6HEmc"
B678_URL = "https://www.bilibili.com/video/BV1UjMX6DE33"

# (a, b, headline, tag, text, quote, jumpUrl)
PAIRS = [
    ("yang-male", "yin-female", "经典阴阳配 · 互相成全", "最佳拍档",
     "最经典的阴阳平衡。她擅长连接和付出，你擅长担当和保护。但需警惕：她的「付出」容易被你当成理所当然——看见彼此的给予，是这门功课的全部。",
     "阳者学柔，阴者学刚——配对是彼此的修行道场。", ""),
    ("yang-male", "yang-female", "强强相遇 · 并肩或较劲", "强强相遇",
     "两个阳性内核容易成为战友，也可能变成权力博弈。课题是：不要竞争谁更强大，学会互相钦佩——你拼你的局，他守他的城，不抢方向盘。",
     "两个阳互相不来电——可做战友，不可能亲密；但做事业上的头狼同盟，没人比你们更合适。", B666_URL),
    ("yang-male", "yin-male", "镜像对照 · 一个向外一个向内", "镜像对照",
     "你们都习惯沉默，但他向内、你向外。事业上你冲锋他兜底；亲密关系中，你们需要一个人先开口——先开口的那个人，不是输，是先长大。",
     "阳的沉默是扛，阴的沉默是藏——读懂对方的沉默，关系才开始。", ""),
    ("yang-female", "yin-male", "经典阴阳配 · 互补拉扯", "最佳拍档",
     "你最互补的配对。你负责破局和行动，他负责深度感受和连接。他能接住你的强度，你能把他从过度思考中拉出来。她是你的铠甲，你是她的港湾。",
     "阳者学柔，阴者学刚——配对是彼此的修行道场。", ""),
    ("yang-female", "yin-female", "镜像对照 · 你是她羡慕的样子", "镜像对照",
     "她是你「不愿意成为」的自己——柔软、依赖、会撒娇；反过来，你是她羡慕的样子。你们可以互相学习，但别互相改造、互相评判。",
     "阴者不必装阳，阳者不必装柔——做自己，才接得住对方。", ""),
    ("yin-female", "yin-male", "镜像对照 · 谁先稳定下来", "镜像对照",
     "你们都敏感、都怕被抛弃、都容易想太多。你们能深度理解彼此，但也可能一起沉入情绪漩涡。课题是：谁来当那个先稳定下来的人？",
     "两个阴的结合是共生——彼此缺爱，互补童年安全感的缺失；先自爱，才养得起这段关系。", B678_URL),
    ("yang-male", "yang-male", "同型对 · 战友不来电", "同型对",
     "两个男阳互相欣赏、互相点头，却很难来电——你们是彼此最好的战友，不是彼此的亲密关系。别用「感情淡了」解释，这是两个阳的天然互斥。",
     "两个阳互相不来电——可做战友，不可能亲密。", B666_URL),
    ("yang-female", "yang-female", "同型对 · 灯塔不相靠", "同型对",
     "两个女阳像两座各自的灯塔——互相照亮，互不靠近。你们能一起打天下，但亲密需要一个人先学会示弱，而这恰恰是你们共同的功课。",
     "两个阳互相不来电——可做战友，不可能亲密。", B666_URL),
    ("yin-female", "yin-female", "同型对 · 共生式联结", "同型对",
     "两个女阴能很快热起来——彼此懂、彼此暖。但这段关系的底是共生：靠彼此缺爱维系，情绪一来容易一起下沉。先各自立住，再互相依靠。",
     "两个阴的结合是共生——彼此缺爱，互补童年安全感的缺失。", B678_URL),
    ("yin-male", "yin-male", "同型对 · 深水里的两个人", "同型对",
     "两个男阴能聊到最深处——敏感对敏感。但谁都不敢先交付时，关系会在「想靠近又退缩」里空转。总得有一个人先全力游上岸，再回来接另一个人。",
     "两个阴的结合是共生——彼此缺爱，互补童年安全感的缺失。", B678_URL),
]


def key(a, b):
    ia, ib = CANON.index(a), CANON.index(b)
    if ia > ib:
        a, b = b, a
    return a + "|" + b


def main():
    data = {}
    for a, b, headline, tag, text, quote, jump in PAIRS:
        data[key(a, b)] = {
            "a": a, "b": b, "headline": headline, "tag": tag,
            "text": text, "quote": quote, "jumpUrl": jump,
        }
    assert len(data) == 10, "应有 10 键，实际 %d" % len(data)
    js = []
    js.append("// data_pair.js — 配对报告数据（10 键：6 异型对 + 4 同型对）")
    js.append("// 异型对：旧站 RESULT_DATA.pairGuide 反查改写；同型对：语料 B666/B678。")
    js.append("// 键按 CANON 顺序规范化，查找时正反方向都应尝试（见页面 findPair）。")
    js.append("var PAIR_DATA = ")
    js.append(json.dumps(data, ensure_ascii=False, indent=1))
    js.append(";\n")
    with io.open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(js))
    print("PAIR_DATA 共 %d 键" % len(data))


if __name__ == "__main__":
    main()
