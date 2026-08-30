// =====================================================================
// 阴阳人格 · 女版双轨题卷 v2-demo（20 题）
// schema 契约：docs/工作契约_v2_新站施工.md §3.4
//  - 每题 2 选项：k:+1 阳 / k:-1 阴（陷阱题除外，两选项 k:0 只计 M）
//  - warp:1 = 反规训加权选项（女选直面竞争/独处充电方向，计票 ×1.3，由引擎执行）
//  - isTrap:true 题：选项不计内核分；soc:1 标记「体面/期许选项」，命中计 M+1
//  - dualOf：人前版 ↔ 独处版对偶配对（极性反转 M+2，同向 M+0；内核判定以独处版为主）
//  - weight:1.5 = 核心维度（战逃 kp-a2 / 核心信念 y1-06 / 内外耗 y1-08）
//
// 题目溯源表（题号 → kpLink → 语料依据 视频 id + 时间戳范围）：
//  F01 y1-06 核心信念   B39 03:44-04:01；B377 00:00-00:28；B46 00:18-00:32
//  F02 y1-07 情绪表达   B23 16:57-17:27；B3 04:40-05:07
//  F03 y1-17 请求方式   B314 08:57-09:09；B605 03:51-03:59
//  F04 y1-12 信任路径   B3 01:53-02:05；B56 00:59-01:47
//  F05 y1-01 能量方向   B39 02:36-03:07；B667 00:46-01:06
//  F06 y1-09 决策模式   B117 00:00-00:35；B60 01:47-02:24
//  F07 y1-11 充电方式   B497 01:10-01:24；B416 00:58-01:40
//  F08 y1-10 沟通风格   B22 00:30-00:57；B23 05:18-06:12（对偶A·人前，dualOf F17）
//  F09 kp-a2 战逃本能   B39 02:36-03:07；B666 00:00-00:14
//  F10 y1-03 自我强弱   B377 01:43-02:09；B671 01:29-01:43
//  F11 y1-18 边界感     B314 01:32-02:53；B56 09:01-09:55
//  F12 y1-17 请求方式   B314 08:57-09:09；B36 02:37-03:02
//  F13 kp-a2 战逃本能   B39 02:36-03:07；B666 00:00-00:14
//  F14 y1-08 内外耗     B23 16:10-16:28；B684 00:11-00:33（对偶B·人前，dualOf F18）
//  F15 isTrap 期许陷阱  y1-07；B23 16:59-17:27（不计内核分，soc 选项计 M+1）
//  F16 y1-04 价值权重   B3 02:06-02:16；B671 01:05-01:15（第五章首题，深夜抉择语境）
//  F17 y1-10 沟通风格   B23 05:18-06:12（对偶A·独处，dualOf F08）
//  F18 y1-08 内外耗     B23 16:10-16:28；B684 00:11-00:33（对偶B·独处，dualOf F14）
//  F19 isTrap 期许陷阱  y1-11；B416 00:58-01:53（不计内核分，soc 选项计 M+1）
//  F20 y1-16 控制纠缠   B118 00:00-00:29；B36 05:03-05:14
//
// 双轨分布：both 共用 8 题（F01/F04/F07/F08/F14/F17/F18/F19），分性别撰写 12 题；
// warp 反规训选项 4 处（F07阳=独处充电、F10阳=直面竞争、F11阳=当面立界、F16阳=事业优先）。
// =====================================================================

var QUIZ = [
  {
    id:'F01', gender:'both',
    chapter:1, chapterTitle:'小时候的家', scene:'family',
    intro:'有些反应不是长大后才学会的——它们在你还够不到门把手的时候，就已经长进了身体里。这一章，我们回到那扇家门口，看看最早的你是怎么接住这个世界的。',
    text:'小学考砸的那次，你攥着卷子站在家门口。推门前的几秒钟，脑子里最先冒出来的是——',
    opts:[
      {t:'「下回怎么把它追回来」——你已经在心里列好了复习的计划，这门课你就不信拿不下来', k:1, warp:0},
      {t:'「妈看到会是什么表情」——你先想的是怎么开口，怕的是那个失望的眼神落在你身上', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-06', kpCard:'q-y1-06', weight:1.5
  },
  {
    id:'F02', gender:'female',
    chapter:1, chapterTitle:'小时候的家', scene:'family',
    intro:'',
    text:'那天你在学校受了委屈，回家的路上一直憋着眼泪。晚饭桌上，你的样子更接近——',
    opts:[
      {t:'说是路上风大迷了眼，扒完饭就回了房间——这种事，说出来干嘛', k:1, warp:0},
      {t:'挑了件小事跟妈告状，绕来绕去，其实就是想把真正委屈的那件事说出来', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-07', kpCard:'q-y1-07', weight:1.0
  },
  {
    id:'F03', gender:'female',
    chapter:1, chapterTitle:'小时候的家', scene:'family',
    intro:'',
    text:'小时候你特别想要一套课外书（或一条裙子），终于决定跟家里开口。你的做法更像——',
    opts:[
      {t:'直接说想要，理由列好——行不行，给个痛快话', k:1, warp:0},
      {t:'先故意在爸妈面前翻别的书，叹气说可惜买不着——等他们自己接话', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-17', kpCard:'q-y1-17', weight:1.0
  },
  {
    id:'F04', gender:'both',
    chapter:1, chapterTitle:'小时候的家', scene:'family',
    intro:'',
    text:'你把一个秘密告诉了最好的朋友，几天后全班都知道了。那之后很长一段时间——',
    opts:[
      {t:'心里砌了道墙：朋友还是做，但有些话，永远到你自己为止', k:1, warp:0},
      {t:'表面照常，但你开始留意TA跟别人聊天时的眼神，隔三差五试一试TA还守不守得住', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-12', kpCard:'q-y1-12', weight:1.0
  },
  {
    id:'F05', gender:'female',
    chapter:2, chapterTitle:'校园与少年', scene:'school',
    intro:'背着书包的日子，第一次有了「别人」：老师、同学、操场上的目光。你向外顶还是向内收的样子，在这里开始定形。',
    text:'值日时明明不是你的责任，老师却当着全班批评了你。你当场的第一反应是——',
    opts:[
      {t:'举起手：「老师，今天是我做的，记录本上写着呢」——必须当场说清', k:1, warp:0},
      {t:'低着头没辩解——回家跟妈哭了一晚上', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-01', kpCard:'q-y1-01', weight:1.0
  },
  {
    id:'F06', gender:'female',
    chapter:2, chapterTitle:'校园与少年', scene:'school',
    intro:'',
    text:'高三填志愿，爸妈想让你留在本市，你自己其实想走远一点。那两个星期，你更像——',
    opts:[
      {t:'直接把外地的学校排在前面——大方向定了，剩下回家慢慢磨', k:1, warp:0},
      {t:'把两边的利弊写满两页纸，问遍班主任和亲戚，越问越不敢落笔', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-09', kpCard:'q-y1-09', weight:1.0
  },
  {
    id:'F07', gender:'both',
    chapter:2, chapterTitle:'校园与少年', scene:'school',
    intro:'',
    text:'大考结束的那个周末，终于没人管你了。你最想——',
    opts:[
      {t:'一个人骑车跑到没人的地方，或者睡到自然醒——不被打扰，才叫歇过来', k:1, warp:1},
      {t:'拉上好友逛一整天，把考试攒的苦水全倒完——说完，人就活了', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-11', kpCard:'q-y1-11', weight:1.0
  },
  {
    id:'F08', gender:'both',
    chapter:3, chapterTitle:'职场里的你', scene:'work',
    intro:'会议室的灯很亮，会议室的话很轻。成年人的世界里，最考验人的往往就是接不住也得接的那几秒钟。',
    text:'复盘会上，你负责的方案被同事当众指出一处硬伤。你嘴上冒出来的第一句更像——',
    opts:[
      {t:'「确实是我漏了，明天给修正版」——错就认，改完翻篇', k:1, warp:0},
      {t:'笑着先接住场面：「这块我们回去再核一下」——散会后私下找TA把来龙去脉讲清楚', k:-1, warp:0}
    ],
    dualOf:'F17', isTrap:false,
    kpLink:'y1-10', kpCard:'q-y1-10', weight:1.0
  },
  {
    id:'F09', gender:'female',
    chapter:3, chapterTitle:'职场里的你', scene:'work',
    intro:'',
    text:'部门例会上，同事把你的汇报成果顺口说成了「我们俩一起做的」——可从头到尾都是你一个人熬的。你当场——',
    opts:[
      {t:'等TA说完就接：「补充一句，数据这块是我上周通宵做的」——话不多，但得说清', k:1, warp:0},
      {t:'笑着点了点头——散会路上越想越气，跟闺蜜连发三十条语音', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'kp-a2', kpCard:'q-kp-a2', weight:1.5
  },
  {
    id:'F10', gender:'female',
    chapter:3, chapterTitle:'职场里的你', scene:'work',
    intro:'',
    text:'领导在会上问：「下季度的项目，谁愿意牵头？」——你其实很想试试。心里更接近——',
    opts:[
      {t:'手已经举到一半了——「我试试」说出口的那一刻，心跳得厉害但踏实', k:1, warp:1},
      {t:'先看了一眼几位老同事的脸色，把到嘴边的话咽了回去——怕显得自己出风头', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-03', kpCard:'q-y1-03', weight:1.0
  },
  {
    id:'F11', gender:'female',
    chapter:3, chapterTitle:'职场里的你', scene:'work',
    intro:'',
    text:'同事第五次把她的报表杂活推给你，理由还是那句「你做得细」。你——',
    opts:[
      {t:'这回当面把话说明白：「我手上有三个活，你这个真排不进来」', k:1, warp:1},
      {t:'又接了，嘴上说没事——回家路上，委屈得眼眶发热', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-18', kpCard:'q-y1-18', weight:1.0
  },
  {
    id:'F12', gender:'female',
    chapter:4, chapterTitle:'亲密关系里的你', scene:'love',
    intro:'亲密关系是一面不客气的镜子——照出来的，常常是你自己都没见过的那一面。',
    text:'明天你生日。你其实很想要一点仪式感，但TA一个字没提。你——',
    opts:[
      {t:'直接说：「明天我们去那家餐厅，你来安排」——想要就要，说出来不丢人', k:1, warp:0},
      {t:'什么都不说，想看看TA能不能自己想起来——想起来了，才算数', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-17', kpCard:'q-y1-17', weight:1.0
  },
  {
    id:'F13', gender:'female',
    chapter:4, chapterTitle:'亲密关系里的你', scene:'love',
    intro:'',
    text:'吵到最凶那晚，TA摔门出去了——走之前撂下一句「跟你根本没法沟通」。半小时后，你的手机——',
    opts:[
      {t:'「回来，把话说完。天大的事，说开才睡得着」', k:1, warp:0},
      {t:'什么都没发。聊天框开了又关——TA回来之前，你已经在心里把TA的台词全演完了', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'kp-a2', kpCard:'q-kp-a2', weight:1.5
  },
  {
    id:'F14', gender:'both',
    chapter:4, chapterTitle:'亲密关系里的你', scene:'love',
    intro:'',
    text:'聚会上老同学随口问：「你和TA最近怎么样？」——你俩其实正在冷战。你——',
    opts:[
      {t:'「在磨合呗，哪有不吵的」——大大方方说两句，说完就翻篇', k:1, warp:0},
      {t:'「挺好的呀」——笑着说，说完心里那点酸一直坠到散场，没人察觉', k:-1, warp:0}
    ],
    dualOf:'F18', isTrap:false,
    kpLink:'y1-08', kpCard:'q-y1-08', weight:1.5
  },
  {
    id:'F15', gender:'female',
    chapter:4, chapterTitle:'亲密关系里的你', scene:'love',
    intro:'',
    text:'闺蜜下午茶，有人起哄让你讲讲TA求婚（或表白）的细节——其实你俩最近正闹别扭。你——',
    opts:[
      {t:'从头到尾讲成偶像剧，细节再加三分渲染——大家都等着呢，不能扫兴', k:0, warp:0, soc:1},
      {t:'笑笑：「过了过了，聊点别的吧」——不想把还没顺过来的事，说成甜的', k:0, warp:0}
    ],
    dualOf:'', isTrap:true,
    kpLink:'y1-07', kpCard:'q-y1-07', weight:1.0
  },
  {
    id:'F16', gender:'female',
    chapter:5, chapterTitle:'深夜独处的你', scene:'self',
    intro:'凌晨的房间没有观众。小时候攥着卷子站在门口的那个孩子长大了——但深夜里先开口的，往往还是TA。',
    text:'凌晨两点，你还是睡不着。邮箱里躺着那份外地的 offer——等了三年的机会，但TA的工作走不开。此刻你心里更接近——',
    opts:[
      {t:'「去。三年就这一次，我们一起想办法」——还是想把它接住', k:1, warp:1},
      {t:'「算了吧，两个人在一座城才叫过日子」——明天就把它婉拒了', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-04', kpCard:'q-y1-04', weight:1.0
  },
  {
    id:'F17', gender:'both',
    chapter:5, chapterTitle:'深夜独处的你', scene:'self',
    intro:'',
    text:'凌晨一点，你睡不着。白天复盘会上被指出的那处硬伤又浮上来了。此刻你脑子里更像——',
    opts:[
      {t:'把明天的修正版提纲在脑子里过了一遍，列完三条就困了——认了就翻篇', k:1, warp:0},
      {t:'反复回放TA当时的语气和表情——「他是不是早就看我不顺眼」', k:-1, warp:0}
    ],
    dualOf:'F08', isTrap:false,
    kpLink:'y1-10', kpCard:'q-y1-10', weight:1.0
  },
  {
    id:'F18', gender:'both',
    chapter:5, chapterTitle:'深夜独处的你', scene:'self',
    intro:'',
    text:'凌晨两点，白天聚会上那句「你和TA最近怎么样」突然又冒出来。此刻——',
    opts:[
      {t:'也就那一下，翻个身睡了——日子是自己的，说给谁听无所谓', k:1, warp:0},
      {t:'一遍遍回放自己那句「挺好的」笑得自不自然——越想越觉得，白天像是说给别人听的', k:-1, warp:0}
    ],
    dualOf:'F14', isTrap:false,
    kpLink:'y1-08', kpCard:'q-y1-08', weight:1.5
  },
  {
    id:'F19', gender:'both',
    chapter:5, chapterTitle:'深夜独处的你', scene:'self',
    intro:'',
    text:'凌晨两点，心里堵得慌，你点开了朋友圈的发布框。对着输入框，你——',
    opts:[
      {t:'编辑了一条云淡风轻的文案，配一张白天的图，发了——发完好像舒坦了点', k:0, warp:0, soc:1},
      {t:'打了很长一段话，又一个字一个字删掉，锁屏睡觉', k:0, warp:0}
    ],
    dualOf:'', isTrap:true,
    kpLink:'y1-11', kpCard:'q-y1-11', weight:1.0
  },
  {
    id:'F20', gender:'female',
    chapter:5, chapterTitle:'深夜独处的你', scene:'self',
    intro:'',
    text:'深夜，前任突然发来一句「在吗」。你——',
    opts:[
      {t:'已读不回。第二天回了句「往前走吧，别再联系了」——结束了就是结束了', k:1, warp:0},
      {t:'回了，绕来绕去聊到凌晨——其实你就是想确认，他过得没你想象中好', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-16', kpCard:'q-y1-16', weight:1.0
  }
];

var QUIZ_META = { version:'v2-demo', total:20, chapters:['小时候的家','校园与少年','职场里的你','亲密关系里的你','深夜独处的你'] };
