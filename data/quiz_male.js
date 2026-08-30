// =====================================================================
// 阴阳人格 · 男版双轨题卷 v2-demo（20 题）
// schema 契约：docs/工作契约_v2_新站施工.md §3.4
//  - 每题 2 选项：k:+1 阳 / k:-1 阴（陷阱题除外，两选项 k:0 只计 M）
//  - warp:1 = 反规训加权选项（男选示弱求助/关系优先方向，计票 ×1.3，由引擎执行）
//  - isTrap:true 题：选项不计内核分；soc:1 标记「体面/期许选项」，命中计 M+1
//  - dualOf：人前版 ↔ 独处版对偶配对（极性反转 M+2，同向 M+0；内核判定以独处版为主）
//  - weight:1.5 = 核心维度（战逃 kp-a2 / 核心信念 y1-06 / 内外耗 y1-08）
//
// 题目溯源表（题号 → kpLink → 语料依据 视频 id + 时间戳范围）：
//  M01 y1-06 核心信念   B39 03:44-04:01；B377 00:00-00:28；B46 00:18-00:32
//  M02 y1-07 情绪表达   B23 16:57-17:27；B3 04:40-05:07
//  M03 y1-17 请求方式   B314 08:57-09:09；B605 03:51-03:59
//  M04 y1-12 信任路径   B3 01:53-02:05；B56 00:59-01:47
//  M05 y1-01 能量方向   B39 02:36-03:07；B667 00:46-01:06
//  M06 y1-09 决策模式   B117 00:00-00:35；B60 01:47-02:24
//  M07 y1-11 充电方式   B497 01:10-01:24；B416 00:58-01:40
//  M08 y1-10 沟通风格   B22 00:30-00:57；B23 05:18-06:12（对偶A·人前，dualOf M17）
//  M09 kp-a2 战逃本能   B39 02:36-03:07；B666 00:00-00:14
//  M10 y1-03 自我强弱   B377 01:43-02:09；B671 01:29-01:43
//  M11 y1-18 边界感     B314 01:32-02:53；B56 09:01-09:55
//  M12 y1-17 请求方式   B314 08:57-09:09；B36 02:37-03:02
//  M13 kp-a2 战逃本能   B39 02:36-03:07；B666 00:00-00:14
//  M14 y1-08 内外耗     B23 16:10-16:28；B684 00:11-00:33（对偶B·人前，dualOf M18）
//  M15 isTrap 期许陷阱  y1-07；B23 16:59-17:27（不计内核分，soc 选项计 M+1）
//  M16 y1-04 价值权重   B3 02:06-02:16；B671 01:05-01:15（第五章首题，深夜抉择语境）
//  M17 y1-10 沟通风格   B23 05:18-06:12（对偶A·独处，dualOf M08）
//  M18 y1-08 内外耗     B23 16:10-16:28；B684 00:11-00:33（对偶B·独处，dualOf M14）
//  M19 isTrap 期许陷阱  y1-11；B416 00:58-01:53（不计内核分，soc 选项计 M+1）
//  M20 y1-16 控制纠缠   B118 00:00-00:29；B36 05:03-05:14
//
// 双轨分布：both 共用 8 题（M01/M04/M07/M08/M14/M17/M18/M19），分性别撰写 12 题；
// warp 反规训选项 4 处（M07阴=拉人回血、M10阴=承认状态不行、M12阴=等TA先来、M16阴=关系优先）。
// =====================================================================

var QUIZ = [
  {
    id:'M01', gender:'both',
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
    id:'M02', gender:'male',
    chapter:1, chapterTitle:'小时候的家', scene:'family',
    intro:'',
    text:'那年你挨了顿没来由的骂，委屈得要命。晚饭桌上，你的样子更接近——',
    opts:[
      {t:'扒两口饭说「没事，学校里的小事」——说不出来，也不觉得这种事该说', k:1, warp:0},
      {t:'话比平时少了一半，就盼着有人问一句「今天怎么了」——问了可能还嘴硬，但不问真的难受', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-07', kpCard:'q-y1-07', weight:1.0
  },
  {
    id:'M03', gender:'male',
    chapter:1, chapterTitle:'小时候的家', scene:'family',
    intro:'',
    text:'小时候你特别想要一双贵的球鞋（或一台游戏机），终于决定跟家里开口。你的做法更像——',
    opts:[
      {t:'直接摊牌：「期中考进前十，你们给我买」——条件明码标价，行不行给个痛快话', k:1, warp:0},
      {t:'先念叨半个月「我们班某某都换了」，观察爸妈脸色松动了几分，再找时机提正事', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-17', kpCard:'q-y1-17', weight:1.0
  },
  {
    id:'M04', gender:'both',
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
    id:'M05', gender:'male',
    chapter:2, chapterTitle:'校园与少年', scene:'school',
    intro:'背着书包的日子，第一次有了「别人」：老师、同学、球场上的裁判。你向外顶还是向内收的样子，在这里开始定形。',
    text:'球场上裁判一个明显的误判，把关键一分判给了对面。你当场的第一反应是——',
    opts:[
      {t:'冲上去比划：「您再看一遍，那球明显出界了！」——不争这口气咽不下', k:1, warp:0},
      {t:'憋着没吭声，回程一路没说话——这一球，你记了很多天', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-01', kpCard:'q-y1-01', weight:1.0
  },
  {
    id:'M06', gender:'male',
    chapter:2, chapterTitle:'校园与少年', scene:'school',
    intro:'',
    text:'高三填志愿，你对自己想去的方向其实有点数。那两个星期，你更像——',
    opts:[
      {t:'先圈定城市和专业，把表一交——细节到学校再说，先定大方向', k:1, warp:0},
      {t:'把每一所的就业率、宿舍、学长评价查了个遍，问了七八个人，还是迟迟没落笔', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-09', kpCard:'q-y1-09', weight:1.0
  },
  {
    id:'M07', gender:'both',
    chapter:2, chapterTitle:'校园与少年', scene:'school',
    intro:'',
    text:'大考结束的那个周末，终于没人管你了。你最想——',
    opts:[
      {t:'一个人骑车跑到没人的地方，或者睡到自然醒——不被打扰，才叫歇过来', k:1, warp:0},
      {t:'拉上好友逛一整天，把考试攒的苦水全倒完——说完，人就活了', k:-1, warp:1}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-11', kpCard:'q-y1-11', weight:1.0
  },
  {
    id:'M08', gender:'both',
    chapter:3, chapterTitle:'职场里的你', scene:'work',
    intro:'会议室的灯很亮，会议室的话很轻。成年人的世界里，最考验人的往往就是接不住也得接的那几秒钟。',
    text:'复盘会上，你负责的方案被同事当众指出一处硬伤。你嘴上冒出来的第一句更像——',
    opts:[
      {t:'「确实是我漏了，明天给修正版」——错就认，改完翻篇', k:1, warp:0},
      {t:'笑着先接住场面：「这块我们回去再核一下」——散会后私下找TA把来龙去脉讲清楚', k:-1, warp:0}
    ],
    dualOf:'M17', isTrap:false,
    kpLink:'y1-10', kpCard:'q-y1-10', weight:1.0
  },
  {
    id:'M09', gender:'male',
    chapter:3, chapterTitle:'职场里的你', scene:'work',
    intro:'',
    text:'庆功宴上，隔壁组的人把你熬了三周的方案，讲成了他们的主意。你当场——',
    opts:[
      {t:'举杯笑着开口：「刚好，我来讲讲这方案当时是怎么磨出来的」——把事实当场摆回来', k:1, warp:0},
      {t:'没接话，自己又倒了一杯——当晚翻来覆去，把每一句该怼回去的话都想了一遍', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'kp-a2', kpCard:'q-kp-a2', weight:1.5
  },
  {
    id:'M10', gender:'male',
    chapter:3, chapterTitle:'职场里的你', scene:'work',
    intro:'',
    text:'项目要黄了，会议室里一圈人都看着领导。领导问：「这个烂摊子，谁来接？」——你心里更接近——',
    opts:[
      {t:'「我来」——嘴上说着试试，心里其实已经在盘算怎么把它盘活', k:1, warp:0},
      {t:'「看安排吧」——不是不敢，是你清楚这阵子自己状态不行，怕接了砸手里', k:-1, warp:1}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-03', kpCard:'q-y1-03', weight:1.0
  },
  {
    id:'M11', gender:'male',
    chapter:3, chapterTitle:'职场里的你', scene:'work',
    intro:'',
    text:'周五晚上十一点，领导在群里@你：明早要一份材料。你——',
    opts:[
      {t:'回「明天上午十点前给」——话说定了，晚上照常约球', k:1, warp:0},
      {t:'回「好的马上弄」——其实烦得要命，材料做到凌晨两点，气了自己一晚上', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-18', kpCard:'q-y1-18', weight:1.0
  },
  {
    id:'M12', gender:'male',
    chapter:4, chapterTitle:'亲密关系里的你', scene:'love',
    intro:'亲密关系是一面不客气的镜子——照出来的，常常是你自己都没见过的那一面。',
    text:'和TA冷战两天了，其实你早就想和好。更接近你的做法——',
    opts:[
      {t:'「今晚回家吃饭吗？我们谈谈」——直接把话约出来', k:1, warp:0},
      {t:'不发消息，就等TA先开口——等的时候，十分钟看了八次手机', k:-1, warp:1}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-17', kpCard:'q-y1-17', weight:1.0
  },
  {
    id:'M13', gender:'male',
    chapter:4, chapterTitle:'亲密关系里的你', scene:'love',
    intro:'',
    text:'吵到最凶那晚，TA摔门出去了——走之前撂下一句「你根本不在乎我」。半小时后，你的手机——',
    opts:[
      {t:'「回来，把话说完。天大的事，说开才睡得着」', k:1, warp:0},
      {t:'什么都没发。聊天框开了又关——TA回来之前，你已经在心里把TA的台词全演完了', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'kp-a2', kpCard:'q-kp-a2', weight:1.5
  },
  {
    id:'M14', gender:'both',
    chapter:4, chapterTitle:'亲密关系里的你', scene:'love',
    intro:'',
    text:'聚会上老同学随口问：「你和TA最近怎么样？」——你俩其实正在冷战。你——',
    opts:[
      {t:'「在磨合呗，哪有不吵的」——大大方方说两句，说完就翻篇', k:1, warp:0},
      {t:'「挺好的呀」——笑着说，说完心里那点酸一直坠到散场，没人察觉', k:-1, warp:0}
    ],
    dualOf:'M18', isTrap:false,
    kpLink:'y1-08', kpCard:'q-y1-08', weight:1.5
  },
  {
    id:'M15', gender:'male',
    chapter:4, chapterTitle:'亲密关系里的你', scene:'love',
    intro:'',
    text:'兄弟聚会，有人起哄让你讲讲你和TA怎么好上的——其实你俩最近正闹别扭。你——',
    opts:[
      {t:'声情并茂讲成段子，把最甜的细节全抖出来——气氛正好，不能冷场', k:0, warp:0, soc:1},
      {t:'摆摆手：「下回，今天说点别的」——你不太想在这种局里演恩爱', k:0, warp:0}
    ],
    dualOf:'', isTrap:true,
    kpLink:'y1-07', kpCard:'q-y1-07', weight:1.0
  },
  {
    id:'M16', gender:'male',
    chapter:5, chapterTitle:'深夜独处的你', scene:'self',
    intro:'凌晨的房间没有观众。小时候攥着卷子站在门口的那个孩子长大了——但深夜里先开口的，往往还是TA。',
    text:'凌晨两点，你还是睡不着。桌上放着那份调令——外地新部门，职级薪资都上一个台阶，但TA不想动。此刻你心里更接近——',
    opts:[
      {t:'这机会等了三年，错过不会再有——明天就跟TA认真谈一次：「你能不能为我来一次？」', k:1, warp:0},
      {t:'「算了，工作再找也有。两个人拆在两座城，日子就散了」——推了吧', k:-1, warp:1}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-04', kpCard:'q-y1-04', weight:1.0
  },
  {
    id:'M17', gender:'both',
    chapter:5, chapterTitle:'深夜独处的你', scene:'self',
    intro:'',
    text:'凌晨一点，你睡不着。白天复盘会上被指出的那处硬伤又浮上来了。此刻你脑子里更像——',
    opts:[
      {t:'把明天的修正版提纲在脑子里过了一遍，列完三条就困了——认了就翻篇', k:1, warp:0},
      {t:'反复回放TA当时的语气和表情——「他是不是早就看我不顺眼」', k:-1, warp:0}
    ],
    dualOf:'M08', isTrap:false,
    kpLink:'y1-10', kpCard:'q-y1-10', weight:1.0
  },
  {
    id:'M18', gender:'both',
    chapter:5, chapterTitle:'深夜独处的你', scene:'self',
    intro:'',
    text:'凌晨两点，白天聚会上那句「你和TA最近怎么样」突然又冒出来。此刻——',
    opts:[
      {t:'也就那一下，翻个身睡了——日子是自己的，说给谁听无所谓', k:1, warp:0},
      {t:'一遍遍回放自己那句「挺好的」笑得自不自然——越想越觉得，白天像是说给别人听的', k:-1, warp:0}
    ],
    dualOf:'M14', isTrap:false,
    kpLink:'y1-08', kpCard:'q-y1-08', weight:1.5
  },
  {
    id:'M19', gender:'both',
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
    id:'M20', gender:'male',
    chapter:5, chapterTitle:'深夜独处的你', scene:'self',
    intro:'',
    text:'深夜，前任突然发来一句「在吗」。你——',
    opts:[
      {t:'已读不回。第二天回了句「往前走吧，别再联系了」——结束了就是结束了', k:1, warp:0},
      {t:'回了，绕来绕去聊到凌晨——其实你就是想确认，她过得没你想象中好', k:-1, warp:0}
    ],
    dualOf:'', isTrap:false,
    kpLink:'y1-16', kpCard:'q-y1-16', weight:1.0
  }
];

var QUIZ_META = { version:'v2-demo', total:20, chapters:['小时候的家','校园与少年','职场里的你','亲密关系里的你','深夜独处的你'] };
