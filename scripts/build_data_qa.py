# -*- coding: utf-8 -*-
r"""build_data_qa.py — 三源合并生成 data/data_qa.js
源1: 66 张已产知识卡（D:\Workbuddy\2026-08-27-20-10-16\data\ 的 4 个 batch + 9 个单卡）→ 转换
源2: data/qa_clips_new.js 的 QA_CLIPS_NEW（Agent B 产，文件可能未就绪 → 容错跳过）
源3: 旧站 TOOLBOX_HTML 拆 4 问（内置）
输出: var QA_DATA + var RESULT_GUIDE_MAP
"""
import json, os, re, io, sys

SRC_DIR = r"D:\Workbuddy\2026-08-27-20-10-16\data"
OUT = r"D:\Workbuddy\yinyang-test\data\data_qa.js"
QA_CLIPS_PATH = r"D:\Workbuddy\yinyang-test\data\qa_clips_new.js"

FILES = [
    "kp_p1_batch.json", "kp_p2_batch.json", "kp_p3_batch.json", "kp_k1_batch.json",
    "kp-a1-qiande.json", "kp-a1-balance.json", "kp-a1b-bupeide.json", "kp-a4-yangqingan.json",
    "kp-b1-nanyang.json", "kp-b2-nvyang.json", "kp-b3-nvyin.json", "kp-b4-nanyin.json",
    "kp_a2_fight_or_flight.json",
]

C_Y = "阴阳能量"; C_T = "四型人格"; C_R = "关系与配对"; C_G = "成长课题"

# kpId → (question钩子, answerBrief≤40字, category, scene[], forTypes[])
CARD_MAP = {
    "y0-01": ("为什么相似的经历，反应却完全不同？", "阴阳内核是灵魂落地时就定好的能量属性，不随经历改变。", C_Y, [], []),
    "y0-02": ("为什么阴阳只有两种，人格却有四种？", "内核只有阴阳两种，乘上性别规训，才分化出四种人格。", C_Y, [], []),
    "y0-03": ("测出来的和自我感觉对不上，怎么办？", "阴阳判断没有量化标准——测评是探索工具，不是诊断。", C_G, [], []),
    "y0-04": ("为什么测出来的和真实的自己不一样？", "很多阴戴着阳的面具生活——测不准，多半是面具在答题。", C_G, [], []),
    "y1-01": ("被否定时，为什么有人顶回去，有人自我怀疑？", "同样的刺激，阳向外顶，阴向内收——两种能量的基本方向。", C_Y, ["love", "work"], []),
    "y1-03": ("为什么有人气场撑得满，有人收得柔？", "阳的自我非常强，阴的自我比较弱——但弱不等于没有。", C_Y, [], []),
    "y1-04": ("事业和感情打架时，你的排序是什么？", "阴把感情放内在第一位，阳把事业放前面——权重不同，不是有无。", C_Y, ["love", "work"], []),
    "y1-06": ("你更怕「做不到」，还是「配不上」？", "阳怕「无能=不被爱」，阴怕「不配被爱」——同一恐惧，两个方向。", C_Y, ["love", "work"], []),
    "y1-07": ("为什么很多人一难过就说「我没事」？", "阳不表达情绪：在他的信念里，展示情感=脆弱，脆弱=毁灭。", C_Y, ["love", "family"], []),
    "y1-08": ("明明做的事差不多，为什么你更累？", "阳的能量不用于内耗，阴的能量大多耗在自己身上。", C_Y, ["work"], []),
    "y1-09": ("接手新事，你先定路线还是先干第一步？", "阳定方向做决策，阴把事情做到细处——决策与执行各有所长。", C_Y, ["work"], []),
    "y1-10": ("消息半天不回，你的第一反应是什么？", "阳沟通为解决问题，阴沟通为确认连接——同一句沉默，两种含义。", C_Y, ["love", "family"], []),
    "y1-11": ("累到极限，你想独处还是想被听见？", "阳靠成就和独处充电，阴靠被理解和被看见充电。", C_Y, ["work", "love"], []),
    "y1-12": ("你的信任是一层层给，还是试出来的？", "阳的信任像砌砖墙一层层给权限；阴的信任靠反复试探确认。", C_Y, ["love"], []),
    "y1-13": ("你「攻击」一个人的方式是哪一种？", "阳的攻击是爆发式一击毙命，阴的攻击是消耗式反复拉扯。", C_Y, ["love", "family"], []),
    "y1-14": ("你容易被强者吸引，还是和强者做朋友？", "阴性慕强、依赖人；阳不慕强，只和强者交朋友。", C_Y, ["love"], []),
    "y1-15": ("你的成长是直线冲刺，还是螺旋绕圈？", "阳认定方向一往直前，阴的成长是螺旋反复——节奏不同，不是优劣。", C_Y, [], []),
    "y2-03": ("为什么你总是忍到极限才爆发？", "阳被触发是先忍后炸，阴被触发是即时爆发——形态相反。", C_Y, ["family", "love"], []),
    "y2-05": ("你说的「没事」，是真的没事吗？", "女阳说「没事」是真没事，阴说「没事」往往是反话。", C_Y, ["love", "family"], []),
    "y3-01": ("同样是阴，为什么有人舒展有人拧巴？", "阴阳两内核乘性别规训分出四型；阳多清楚自己是阳，阴更易判断不清。", C_T, [], []),
    "y3-02": ("同是阳性，孤狼和灯塔差在哪？", "男阳是「孤狼→头狼」，女阳是「战士→灯塔」——同阳不同样。", C_T, [], []),
    "y3-03": ("低谷时，你演小剧场还是当悲情主角？", "女阴偏「小剧场」，男阴偏「大叙事」——男阴是四型里最压抑的群体。", C_T, [], []),
    "y3-b1a": ("什么事都自己扛，是从什么时候开始的？", "男阳的强，是原生家庭里求助无效后对无力感的反向补偿。", C_T, ["family"], ["yang-male"]),
    "y3-b1b": ("明明撑不住，为什么就是开不了口求助？", "男阳越要强越难开口求助——求助本身会伤到他的自恋。", C_T, ["work"], ["yang-male"]),
    "y3-b1c": ("职场冲突里，你的第一本能是战还是退？", "男阳在职场是开创者与承重者，冲突第一本能是迎上去战。", C_T, ["work"], ["yang-male"]),
    "y3-b1d": ("「这事没有我也转不动」是自信还是膨胀？", "「狂妄目中无人」是自我过大、自恋膨胀的外显——健康则强，膨胀则盲。", C_T, ["work"], ["yang-male"]),
    "y3-b2a": ("被说「太强势、不像女孩」时你在想什么？", "女阳是阳性内核撞上「女孩要温柔」的期待，反弹出来的活法。", C_T, ["family"], ["yang-female"]),
    "y3-b2b": ("做成一件大事，你敢停下来歇口气吗？", "女阳最有破局动能，但冲得太猛停不下来，功课是沉得下来。", C_T, ["work"], ["yang-female"]),
    "y3-b2c": ("看不得他可怜去「捞人」，是在帮他还是证明强？", "女阳会周期性想「捞」可怜的男阴，捞不动又嫌弃——自恋底色的典型动作。", C_T, ["work"], ["yang-female"]),
    "y3-b2d": ("为什么女阳说的「没事」是真没事？", "女阳说「没事」多半真没事——她觉得我能搞定，不是钓关心。", C_T, ["love"], ["yang-female"]),
    "y3-b3a": ("拼命对一个人好，是在爱还是在换爱？", "女阴自我弱、重感情，被植入「爱=自我牺牲」后，连接带上讨好。", C_T, ["love"], ["yin-female"]),
    "y3-b3b": ("爱得越深抓得越紧，是爱还是怕丢？", "女阴越深情越怕失去就越抓——被抛弃恐惧一触发，就变成「想跑没门」。", C_T, ["love"], ["yin-female"]),
    "y3-b3c": ("脑内循环播放「他会不会回来」，累不累？", "女阴的依恋是「抓不住就内耗」：脑内自编自导一整出戏。", C_T, ["love"], ["yin-female"]),
    "y3-b3d": ("事业很强的你，为什么还是会被骗？", "女阴易被骗，因在外撑「我很强」的壳，内在仍是渴爱的阴。", C_T, ["love"], ["yin-female"]),
    "y3-b4a": ("你拿捏人的那套，是从谁那学来的？", "男阴被强势母亲与阴性内核双重塑造——他学来的爱是控制。", C_T, ["family"], ["yin-male"]),
    "y3-b4b": ("维护面子时，你在讲理还是在排剧本？", "男阴既权衡利弊又藏心机——表面占道德高地，内里在算计。", C_T, ["love"], ["yin-male"]),
    "y3-b4c": ("「我都为你做了这么多」想换什么？", "男阴抓住又推开，靠细节炫技证明「我也不差」——渴望被看见。", C_T, ["love", "work"], ["yin-male"]),
    "y3-b4d": ("答应时热血上头，兑现时怎么就没了？", "男阴「花大饼」是情绪上头许下兑现不了的承诺——根子是不愿全力以赴。", C_T, ["work", "love"], ["yin-male"]),
    "y3-08": ("被冷落时，你先找事做还是先怀疑自己？", "同一情境，阳组第一反应向外，阴组向内——四型再分化出不同剧本。", C_T, ["work", "love"], []),
    "y3-09": ("性格这么像，为什么就是不来电？", "两个阳不来电、进不了亲密；两个阴能在一起，但本质是共生。", C_R, ["love"], []),
    "y3-10": ("为别人花钱后，你心里会记账吗？", "阳花钱是「我有多的，支持你」；阴花钱是「让你记住我的恩」。", C_T, ["love", "family"], []),
    "y3-11": ("你的嫉妒和分手，是在表达什么？", "阴的嫉妒性远比阳明显；阳几乎不吃醋——不爽只觉得你眼瞎。", C_T, ["love"], []),
    "y4-01": ("一段好的合作，谁定方向谁落地？", "阳负责定方向做决策，阴负责落地执行——阴阳配合的基础位。", C_R, ["work", "love"], []),
    "y4-02": ("争夺「谁说了算」，你是在抢还是在怕？", "权力争夺表面抢主导权，根子两套：阴怕失控，阳要掌控。", C_R, ["love", "family"], []),
    "y4-03": ("全部心思挂在对方身上，安全吗？", "阴把全部注意力投给阳就会滑向依附——健康配比是各自留一份给自己。", C_R, ["love"], []),
    "y4-04": ("迟迟不开始一段关系，是真的不需要吗？", "亲密关系最能照见真实自我——靠人设撑起的关系一崩就散。", C_R, ["love"], []),
    "y5-02": ("太满的人修承载，太弱的人修自强，你呢？", "阳修厚德载物（坤德），阴修自强不息（乾德）——互补修行。", C_G, [], []),
    "y5-03": ("「我不够好」这句话，你信了多久？", "对阴而言，自我接纳是修行第一关——以柔克刚是可习得的能力。", C_G, [], []),
    "y5-04": ("你的坚强，是力量还是耗电的面具？", "面具持续耗能——修行要「卸掉」而非「内化」，且要一点一点卸。", C_G, ["work", "love"], []),
    "y5-t1": ("「他哪配跟我比」的念头，你削它还是养它？", "男阳的出口：把撑得太大的自恋与自我膨胀，一点一点削掉。", C_G, ["work"], ["yang-male"]),
    "y5-t2": ("占理的那一刻，你留余地了吗？", "女阳的出口：把自我收回来，沉得下来、放得下来、能承载。", C_G, ["work", "love"], ["yang-female"]),
    "y5-t3": ("想说「不」却咽回去，是怕什么？", "女阴的出口：长出独立人格——先立边界，再学拒绝。", C_G, ["love", "family"], ["yin-female"]),
    "y5-t4": ("说「我不行」之前，你真的试过了吗？", "男阴的出口：不再劝退自己——遇事先全力以赴去试。", C_G, ["work", "love"], ["yin-male"]),
    "y5-05": ("放不下的，是他还是「被他承认的我」？", "有「我」才有情执；阴阳修行的尽头是回归平衡。", C_G, ["love"], []),
    "y1-20": ("受了大伤，你是生戾气还是积怨气？", "阳被背叛起仇念生戾气，阴被抛弃生恨意积怨气——两条路径。", C_Y, ["love", "family"], []),
    "y1-21": ("关系没定前，身体和心是同一个开关吗？", "阳容易性爱分离，阴很难——性爱不分离、身心一体。", C_Y, ["love"], []),
    "y1-22": ("难缠的问题，你正面击破还是慢慢磨？", "阳是金刚道——短促爆发正面破题；阴是菩萨道——持续承载缠磨化解。", C_Y, ["work"], []),
    "kp-a1-qiande": ("为什么要强的人和重感情的人互相看不惯？", "阳的内核是乾德——自强不息；阴的内核是坤德——厚德载物。", C_Y, [], []),
    "kp-a1-balance": ("一路冲到爆，和把自己排最后，哪个是你？", "自强没有厚德约束会自我毁灭，厚德没有自强会困在原地。", C_Y, [], []),
    "kp-a1b-bupeide": ("有人真心对你好，你的第一反应是什么？", "阴性能量深处藏着「不配得」——来自灵魂层面的分离恐惧，不是经历造成。", C_Y, ["love"], []),
    "kp-a4-yangqingan": ("为什么阳难过时只会说「我没事」？", "阳把脆弱等同于破碎，于是本能把情绪挡在墙外——墙越厚越看不见自己。", C_Y, ["family", "love"], []),
    "kp-b1-nanyang": ("坚持自我和听不进人话，边界在哪？", "男阳自我强到极致会膨胀成自恋、目中无人——修行难在削下去。", C_T, ["work"], ["yang-male"]),
    "kp-b2-nvyang": ("认准就冲的人，缺的到底是什么课？", "女阳自我强、一往直前，但自我容易膨胀——方向是沉下来承载。", C_T, ["work"], ["yang-female"]),
    "kp-b3-nvyin": ("恋爱脑的底，缺的其实是什么？", "女阴把感情放第一、容易恋爱脑——最大课题是长出独立人格。", C_T, ["love"], ["yin-female"]),
    "kp-b4-nanyin": ("明明很敏感，为什么要装作无所谓？", "男阴是阴性内核长在男人身上，与阳刚期待冲突——活得最压抑。", C_T, ["love", "work"], ["yin-male"]),
    "kp-a2-fight-or-flight": ("冲突来了，你的身体先想战还是先想逃？", "面对同一场景，阳启动战斗（fight），阴启动逃跑（flight）。", C_Y, ["work", "love"], []),
}

TOOLBOX_CARDS = [
    {
        "qaId": "q-toolbox-01", "kpId": "", "category": C_G, "scene": [], "forTypes": [],
        "question": "「他不在乎我了」是事实，还是你加的戏？",
        "answerBrief": "觉察的第一步：把「事实」和「故事」分开——看见反应，而不是评判反应。",
        "answer": [{"ts": "", "videoId": "", "bv": "", "text": "区分「事实」与「故事」。对方晚回消息是事实；「他不在乎我了」是你自己编的故事。识别情绪触发点：不压抑情绪，而是看见情绪背后的信息——情绪是身体在说话。随时自问：此刻我被触发了吗？我看见的是事实，还是我加的戏？这个反应，指向我心里哪一处旧伤？"}],
        "quote": "觉察把它们分开：伤被看见，信念松动，反应自然改变。",
        "videoTitle": "成长工具箱 · 觉察", "jumpUrl": "",
    },
    {
        "qaId": "q-toolbox-02", "kpId": "", "category": C_G, "scene": ["love", "family"], "forTypes": [],
        "question": "为什么最亲的人，一句话就能踩中你的旧伤？",
        "answerBrief": "每个强烈反应背后都有一处没愈合的伤——触发是「被看见」的入口。",
        "answer": [{"ts": "", "videoId": "", "bv": "", "text": "完美镜像触发：最亲近的人一句话，常常精准踩中你旧有的创伤——因为你们相遇的设计，本就是彼此照见、加速清醒。震荡期：自我探索初期，会经历「触发→释放情绪→回溯→挖到最源头的伤与信念→让它在被看见中松动」的循环。每次恢复的基线都比上次略高一点，是螺旋上升，不是失败。核心原则：「苦不能白吃」——每一次触发都是一份礼物，把礼物挖干净再走。"}],
        "quote": "每一次触发都是一份礼物——把礼物挖干净再走。",
        "videoTitle": "成长工具箱 · 创伤", "jumpUrl": "",
    },
    {
        "qaId": "q-toolbox-03", "kpId": "", "category": C_G, "scene": [], "forTypes": [],
        "question": "阳信「只有靠自己」，阴信「我不配」——你信哪个？",
        "answerBrief": "核心信念是最底层的自动程序，往往察觉不到——松动它，上层建筑随之改变。",
        "answer": [{"ts": "", "videoId": "", "bv": "", "text": "阳性核心信念：「只有靠自己才靠得住」「求助没有用」「信任必须靠自己挣得」。阴性核心信念：「我不配得被爱」「我需要牺牲自己才值得被爱」「情绪越激烈=越爱我」。信念在后台自动运行，你往往察觉不到它。试着质疑它：这是事实，还是我被植入的故事？"}],
        "quote": "改变一个核心信念，就等于改变了整座上层建筑的根基。",
        "videoTitle": "成长工具箱 · 信念", "jumpUrl": "",
    },
    {
        "qaId": "q-toolbox-04", "kpId": "", "category": C_G, "scene": [], "forTypes": [],
        "question": "觉察、创伤、信念，怎么连成一条成长的路？",
        "answerBrief": "先看见反应，再挖到伤，最后松动信念——一条共通的方法线。",
        "answer": [{"ts": "", "videoId": "", "bv": "", "text": "无论你是哪一种人格，通往自我和解的路都有一条共通的方法线：先看见反应（觉察），再挖到伤（创伤），最后松动信念。自测：同一个触发点再来时，你的情绪波动是不是更轻了？如果是，你正在成长，不是走错了路。"}],
        "quote": "事实+故事搅在一起 → 觉察把它们分开 → 伤被看见 → 信念松动 → 反应自然改变。",
        "videoTitle": "成长工具箱 · 方法线", "jumpUrl": "",
    },
]


def fmt_video_id(v):
    if v is None:
        return ""
    if isinstance(v, int):
        return "B" + str(v)
    return str(v)


def fmt_ts(at_or_ts, start_sec=None):
    """'00:52' 优先；否则从 '?t=280' 解析成 mm:ss。"""
    s = (at_or_ts or "").strip()
    if re.match(r"^\d{1,2}:\d{2}(:\d{2})?$", s):
        return s
    m = re.search(r"\?t=(\d+)", s)
    if m:
        sec = int(m.group(1))
        return "%02d:%02d" % (sec // 60, sec % 60)
    if start_sec is not None:
        return "%02d:%02d" % (int(start_sec) // 60, int(start_sec) % 60)
    return ""


def ts_to_sec(ts):
    """'MM:SS'（或 'MM:SS:SS'）→ 秒；无法解析返回 None。"""
    m = re.match(r"^(\d+):(\d{2})(?::(\d{2}))?$", str(ts or "").strip())
    if not m:
        return None
    return int(m.group(1)) * 60 + int(m.group(2)) + (int(m.group(3)) * 3600 if m.group(3) else 0)


def fill_answer_links(answer):
    """为有 ts+bv 但缺 link 的 answer 条目补 link（B站 ?t=秒 直达）；幂等，只增不改。"""
    for a in answer or []:
        if a.get("link"):
            continue
        ts, bv = a.get("ts"), a.get("bv")
        if not ts or not bv:
            continue
        sec = ts_to_sec(ts)
        if sec is None:
            continue
        a["link"] = "https://www.bilibili.com/video/%s?t=%d" % (bv, sec)
    return answer


def pick_quote(bqs):
    """最佳金句：优先长度≥14 中最短的（更接近金句质感），否则第一条。"""
    if not bqs:
        return ""
    cand = [b["text"] for b in bqs if len(b.get("text", "")) >= 14] or [bqs[0].get("text", "")]
    return min(cand, key=len) if len(cand) > 1 else cand[0]


def convert_card(card):
    meta = card["meta"]
    kp_id = meta["kpId"]
    if kp_id not in CARD_MAP:
        print("  [WARN] 无映射，跳过:", kp_id)
        return None
    q, brief, cat, scenes, for_types = CARD_MAP[kp_id]
    kps = card.get("knowledge_points") or []
    kp = kps[0] if kps else {}
    bqs = kp.get("bodyQuotes") or []
    clips = {c.get("clipId"): c for c in card.get("clips", [])}

    answer = []
    first_link = ""
    video_title = ""
    clip_list = card.get("clips") or []
    default_clip = clip_list[0] if clip_list else None
    for b in bqs:
        clip = clips.get(b.get("clip")) or default_clip
        ts = fmt_ts(b.get("at"), clip.get("startSec") if clip else None)
        link = b.get("link") or (clip.get("link") if clip else "") or ""
        bv = (clip.get("bv") if clip else "") or ""
        vid = fmt_video_id(clip.get("videoId")) if clip else ""
        if clip and not video_title:
            video_title = clip.get("title", "")
        if link and not first_link:
            first_link = link
        answer.append({"ts": ts, "videoId": vid, "bv": bv, "text": b.get("text", ""), "link": link})
    answer = fill_answer_links(answer)
    if not video_title:
        video_title = clip_list[0].get("title", "") if clip_list else ""
    if not first_link:
        first_link = clip_list[0].get("link", "") if clip_list else ""
    quote = pick_quote(bqs)
    return {
        "qaId": "q-%s-01" % kp_id,
        "kpId": kp_id,
        "category": cat,
        "scene": scenes,
        "forTypes": for_types,
        "question": q,
        "answerBrief": brief,
        "answer": answer,
        "quote": quote,
        "videoTitle": video_title,
        "jumpUrl": first_link,
        "compliance": "web+mini",
        "shareText": "",
    }


def load_clips_new():
    """容错加载 Agent B 的 qa_clips_new.js（JS 风格：单引号/注释/尾逗号 → json5 解析；失败则跳过）。"""
    if not os.path.exists(QA_CLIPS_PATH):
        print("  [INFO] qa_clips_new.js 未就绪（Agent B 并行生产中）——构建期跳过，页面运行时守卫合并")
        return []
    try:
        raw = io.open(QA_CLIPS_PATH, "r", encoding="utf-8-sig").read()
        m = re.search(r"QA_CLIPS_NEW\s*=\s*(\[.*?\])\s*;", raw, re.S)
        if not m:
            print("  [WARN] qa_clips_new.js 格式无法识别，跳过")
            return []
        try:
            import json5
            arr = json5.loads(m.group(1))
        except ImportError:
            arr = json.loads(m.group(1))
        print("  [OK] qa_clips_new.js 并入 %d 条" % len(arr))
        return arr
    except Exception as e:
        print("  [WARN] qa_clips_new.js 解析失败，跳过:", e)
        return []


def main():
    qa, seen = [], set()
    for f in FILES:
        d = json.load(open(os.path.join(SRC_DIR, f), encoding="utf-8"))
        cards = d.get("cards", [d])
        for c in cards:
            item = convert_card(c)
            if item and item["qaId"] not in seen:
                seen.add(item["qaId"])
                qa.append(item)
    n_src1 = len(qa)
    for t in TOOLBOX_CARDS:
        if t["qaId"] not in seen:
            seen.add(t["qaId"])
            qa.append(t)
    n_src3 = len(TOOLBOX_CARDS)
    n_src2 = 0
    for item in load_clips_new():
        qid = item.get("qaId") or ("q-new-%d" % (n_src2 + 1))
        if qid in seen:
            continue
        item.setdefault("kpId", "")
        item.setdefault("category", C_Y)
        item.setdefault("scene", [])
        item.setdefault("forTypes", [])
        item.setdefault("compliance", "web+mini")
        item.setdefault("shareText", "")
        item["answer"] = fill_answer_links(item.get("answer") or [])
        seen.add(qid)
        qa.append(item)
        n_src2 += 1

    guide = {
        "yang-male": {
            "deep": ["q-y3-b1a-01", "q-y3-b1b-01", "q-y3-b1c-01", "q-y3-b1d-01", "q-kp-b1-nanyang-01", "q-y5-t1-01"],
            "scene": {
                "work": ["q-y3-b1c-01", "q-y1-09-01", "q-y1-08-01"],
                "love": ["q-y1-10-01", "q-y1-12-01", "q-y1-07-01"],
                "family": ["q-y3-b1a-01", "q-y2-03-01", "q-kp-a4-yangqingan-01"],
            },
            "shell": ["q-y0-04-01", "q-kp-a4-yangqingan-01", "q-y2-05-01"],
        },
        "yang-female": {
            "deep": ["q-y3-b2a-01", "q-y3-b2b-01", "q-y3-b2c-01", "q-y3-b2d-01", "q-kp-b2-nvyang-01", "q-y5-t2-01"],
            "scene": {
                "work": ["q-y3-b2b-01", "q-y1-09-01", "q-y1-08-01"],
                "love": ["q-y3-b2d-01", "q-y1-10-01", "q-y1-12-01"],
                "family": ["q-y3-b2a-01", "q-y2-03-01", "q-y2-05-01"],
            },
            "shell": ["q-y0-04-01", "q-y2-05-01", "q-y5-04-01"],
        },
        "yin-female": {
            "deep": ["q-y3-b3a-01", "q-y3-b3b-01", "q-y3-b3c-01", "q-y3-b3d-01", "q-kp-b3-nvyin-01", "q-y5-t3-01"],
            "scene": {
                "work": ["q-y1-09-01", "q-y1-08-01", "q-y4-01-01"],
                "love": ["q-y3-b3b-01", "q-y3-b3c-01", "q-y4-02-01"],
                "family": ["q-y3-b3a-01", "q-y2-05-01", "q-kp-a1b-bupeide-01"],
            },
            "shell": ["q-y0-04-01", "q-y3-b3d-01", "q-kp-a1b-bupeide-01"],
        },
        "yin-male": {
            "deep": ["q-y3-b4a-01", "q-y3-b4b-01", "q-y3-b4c-01", "q-y3-b4d-01", "q-kp-b4-nanyin-01", "q-y5-t4-01"],
            "scene": {
                "work": ["q-y3-b4c-01", "q-y1-09-01", "q-y1-08-01"],
                "love": ["q-y1-10-01", "q-y1-13-01", "q-y4-04-01"],
                "family": ["q-y3-b4a-01", "q-y2-03-01", "q-kp-a1b-bupeide-01"],
            },
            "shell": ["q-y0-04-01", "q-kp-b4-nanyin-01", "q-kp-a1b-bupeide-01"],
        },
    }

    js = []
    js.append("// data_qa.js — 统一问答层（全站唯一内容数据）")
    js.append("// 源1: 66 张已产知识卡转换 %d 条 | 源2: qa_clips_new.js 并入 %d 条 | 源3: 旧站成长工具箱拆卡 %d 条" % (n_src1, n_src2, n_src3))
    js.append("// 由 scripts/build_data_qa.py 生成；editorNotes 等治学信息不上前台。")
    js.append("var QA_DATA = ")
    js.append(json.dumps(qa, ensure_ascii=False, indent=1))
    js.append(";\n")
    js.append("// 测评结果 → 引导卡映射（四型 × deep/scene/shell）")
    js.append("var RESULT_GUIDE_MAP = ")
    js.append(json.dumps(guide, ensure_ascii=False, indent=1))
    js.append(";\n")
    with io.open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(js))
    scenes_count = {"work": 0, "love": 0, "family": 0}
    for item in qa:
        for s in item.get("scene", []):
            if s in scenes_count:
                scenes_count[s] += 1
    print("QA_DATA 共 %d 条（源1=%d 源2=%d 源3=%d）；场景卡组 work=%d love=%d family=%d" %
          (len(qa), n_src1, n_src2, n_src3, scenes_count["work"], scenes_count["love"], scenes_count["family"]))
    lens = [len(i["question"]) for i in qa if i.get("kpId")]
    print("question 最长 %d 字（源1 卡）" % max(lens))
    lens_b = [len(i["answerBrief"]) for i in qa if i.get("kpId")]
    print("answerBrief 最长 %d 字" % max(lens_b))


if __name__ == "__main__":
    main()
