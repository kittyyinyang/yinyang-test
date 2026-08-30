// =====================================================================
// 阴阳人格 · 新切片问答卡 v2-demo（Agent B 产，Agent A 并入 data_qa.js）
//  - var QA_CLIPS_NEW：格式同契约 §4.1 QA_DATA；kpId 为空 = 切片科普卡
//  - 语料源：转录合并全集·语料全量版-最新.md（先提取原文再写卡，时间戳逐条可溯）
//  - ASR 音近错字做了最小还原（羊→阳、鹰/应/音→阴、fly→逃 等），不改义
//  - forTypes 取值：yang-male / yang-female / yin-female / yin-male
//  - 合规：全部 web+mini（情与欲、情感诈骗两条亦为公开可讲的 PSA 级内容）
//  - 共 52 条：阴阳能量 13 / 四型人格 17 / 关系与配对 9 / 成长课题 13
//    四型覆盖：男阳 13、女阳 8、女阴 9、男阴 10（含多型共用）；通用（forTypes 空）25 条
// =====================================================================

var QA_CLIPS_NEW = [

  // ==================== 阴阳能量 ====================

  {
    qaId:'q-c-B39-01', kpId:'', category:'阴阳能量', scene:[], forTypes:[],
    question:'被逼到墙角时，你的第一本能是什么？',
    answerBrief:'面对冲突的本能只有两种：阳启动战斗，阴启动逃跑。',
    answer:[
      {ts:'02:36', videoId:'B39', bv:'BV1YJE4zFEJv', text:'人在遇到同一个场景的时候，最原始的本能只有两种：一个叫fight，一个叫flight，就要么是战斗，要么是逃跑。阴性能量是主逃跑的，阳性能量主战斗的。'},
      {ts:'02:49', videoId:'B39', bv:'BV1YJE4zFEJv', text:'所以阳性能量遇到外界任何的刺激，他都说我要战斗，我要刚，我要硬刚到底。阴性能量就是：哎呀这个是吧，算了吧算了吧，就会劝自己还是要多包容——但实际上是怂，他那个逃跑本能启动了。'}
    ],
    quote:'阳性能量主战斗，阴性能量主逃跑——一个说我要刚到底，一个说算了吧、多包容。',
    videoTitle:'为什么阴性会觉得不配得',
    jumpUrl:'https://www.bilibili.com/video/BV1YJE4zFEJv?t=156',
    compliance:'web+mini',
    shareText:'被逼到墙角的第一反应，藏着你的内核——看看你是「刚」还是「躲」。'
  },
  {
    qaId:'q-c-B666-01', kpId:'', category:'阴阳能量', scene:[], forTypes:[],
    question:'吵架时，为什么一个想赢，一个想撤？',
    answerBrief:'同一声争吵，阳的第一本能是迎战，阴的第一本能是撤退。',
    answer:[
      {ts:'00:00', videoId:'B666', bv:'BV1A7gK6HEmc', text:'战逃反应你知道吧，就是fight or flight。阴性能量它的第一本能启动的反应就是flight，逃；阳性能量第一本能启动的就是fight，战斗。'},
      {ts:'02:49', videoId:'B39', bv:'BV1YJE4zFEJv', text:'阳性能量就是：我要战斗，我要刚，我要硬刚到底。阴性能量就是：算了吧算了吧，劝自己还是要多包容——实际上是逃跑本能启动了。'}
    ],
    quote:'阴性能量的第一本能是flight，阳性能量的第一本能是fight。',
    videoTitle:'两个阳会在一起吗？两个阴在一起会怎么样？【新增·v4-630】',
    jumpUrl:'https://www.bilibili.com/video/BV1A7gK6HEmc?t=0',
    compliance:'web+mini',
    shareText:'吵架时一个想赢一个想撤？这不是性格差，是两种第一本能。'
  },
  {
    qaId:'q-c-B667-01', kpId:'', category:'成长课题', scene:[], forTypes:[],
    question:'阴不再逃的那天，为什么突然开始快长？',
    answerBrief:'直面而不是逃跑，就是阴生发阳性能量的开始。',
    answer:[
      {ts:'00:46', videoId:'B667', bv:'BV11W836nEup', text:'阴性能量它的第一本能启动的反应就是fly，逃。阳性能量第一本能启动的就是fight，战斗。'},
      {ts:'00:56', videoId:'B667', bv:'BV11W836nEup', text:'当一个阴开始不再自我逃避、不再自我欺骗的时候，他就进入到快速成长通道了——因为你开始生发阳性能量了。不逃、直面，这是阳性能量。'}
    ],
    quote:'当一个阴不再自我逃避，他就进入快速成长通道了。',
    videoTitle:'阳性的成长特点【新增·v4-623】',
    jumpUrl:'https://www.bilibili.com/video/BV11W836nEup?t=46',
    compliance:'web+mini',
    shareText:'成长提速的开关不在别处，就在「这次我不逃了」那一下。'
  },
  {
    qaId:'q-c-B23-01', kpId:'', category:'阴阳能量', scene:[], forTypes:[],
    question:'为什么阳把火发出去，阴把火吞下去？',
    answerBrief:'阳把情绪耗向外界，阴把情绪耗向自己——这就是内耗的来源。',
    answer:[
      {ts:'16:10', videoId:'B23', bv:'BV1qkVdzuEJa', text:'为什么阴性能量容易内耗呢？阳性能量是但凡能外耗的，绝对不内耗，没有内耗这一说——你要耗我，我一定耗你，这是阳性能量。阴性能量是但凡能内耗的，我都尽量不要去耗别人。'},
      {ts:'16:49', videoId:'B23', bv:'BV1qkVdzuEJa', text:'男阴他们是回避型，他就是自己情绪自己消化，就内攻击。'}
    ],
    quote:'阳性能量但凡能外耗的，绝对不内耗；阴性能量但凡能内耗的，都不去耗别人。',
    videoTitle:'双生重要经验包，双生阴阳能量之间的交换（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1qkVdzuEJa?t=970',
    compliance:'web+mini',
    shareText:'同样的火，阳发出去，阴吞下去——内耗就是这么来的。'
  },
  {
    qaId:'q-c-B684-01', kpId:'', category:'阴阳能量', scene:[], forTypes:[],
    question:'为什么阳精力旺，阴总觉得累？',
    answerBrief:'阴的疲劳多是内耗出来的；阳不跟自己较劲，所以精力旺。',
    answer:[
      {ts:'00:11', videoId:'B684', bv:'BV14wuz6mEUg', text:'阳的话还是相对来说比较真实，没有带那么多假面具。他不内耗啊——阴是能量都拿来内耗，自己耗完的。'},
      {ts:'00:22', videoId:'B684', bv:'BV14wuz6mEUg', text:'所以阴的话普遍就是这种易疲劳，然后阳的话就是有那种小太阳的感觉，绽放的感觉。阳不消耗自己。'}
    ],
    quote:'阴的能量都拿来内耗自己耗完了；阳不消耗自己，所以是小太阳。',
    videoTitle:'为什么阳性比阴性体力好【新增·v4-636】',
    jumpUrl:'https://www.bilibili.com/video/BV14wuz6mEUg?t=11',
    compliance:'web+mini',
    shareText:'总觉得累？先看看你的能量是不是都耗在了自己身上。'
  },
  {
    qaId:'q-c-B23-02', kpId:'', category:'阴阳能量', scene:['love'], forTypes:[],
    question:'为什么他受了委屈，只会说没事？',
    answerBrief:'阳的「没事」不是没事：从小表达情绪=虚弱=羞耻，喉轮封了。',
    answer:[
      {ts:'16:59', videoId:'B23', bv:'BV1qkVdzuEJa', text:'阳性能量在没有觉醒的状态下，他的喉轮是被封印的，他不知道怎么样去表达自己的情绪感受。为什么呢？因为他从小长大的历程当中，表达自己的情绪感受是一种虚弱的表现——他是抗拒脆弱、抗拒虚弱的。'},
      {ts:'17:20', videoId:'B23', bv:'BV1qkVdzuEJa', text:'羞耻感对于阳性能量来讲，那简直就是剧毒的能量。'}
    ],
    quote:'表达情绪是一种虚弱的表现——羞耻感对阳性能量来讲是剧毒。',
    videoTitle:'双生重要经验包，双生阴阳能量之间的交换（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1qkVdzuEJa?t=1019',
    compliance:'web+mini',
    shareText:'他说「没事」的时候，其实喉轮是封着的——从小，说感受=虚弱。'
  },
  {
    qaId:'q-c-B3-01', kpId:'', category:'阴阳能量', scene:['love'], forTypes:[],
    question:'为什么TA总要把你惹毛才安心？',
    answerBrief:'阴用你的情绪起伏确认爱：你越激动，TA越安心。',
    answer:[
      {ts:'04:40', videoId:'B3', bv:'BV15MVWzGEnh', text:'阴性能量普遍是情绪敏感型，善于觉察情绪，主要通过情绪起伏来判断对方是否在乎自己，深刻相信情绪越激烈，对方越爱自己。行为层面上就会有以下的表现：胡搅蛮缠，非要刺激并看到对方的情绪起伏。'},
      {ts:'03:51', videoId:'B605', bv:'BV1mNJ8zFEMv', text:'他好像不作的话，也感觉到不安全。你那么稳定，我怎么知道你在意我呢？只能通过作一作，看看能不能激起你的情绪，来判断你到底在不在意我。'}
    ],
    quote:'阴通过情绪起伏来判断对方是否在乎自己——情绪越激烈，越爱。',
    videoTitle:'双生通关秘籍（三）——阴阳能量的人格特质（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV15MVWzGEnh?t=280',
    compliance:'web+mini',
    shareText:'TA惹你生气不是无聊——TA在用你的情绪确认自己的位置。'
  },
  {
    qaId:'q-c-B377-01', kpId:'', category:'阴阳能量', scene:['work'], forTypes:['yang-male','yang-female'],
    question:'为什么他不敢停，哪怕已经做得很好？',
    answerBrief:'阳拼命奔跑不是贪，是「停下来=没价值=不值得被爱」。',
    answer:[
      {ts:'00:00', videoId:'B377', bv:'BV1oCY1zxEuh', text:'阳的内在信念当中，无能等于不被爱。其实就是出于不被爱的恐惧，就是缺爱。阳在内在信念当中，自己有能力、甚至全知全能才值得被爱。所以阳为什么难以接受自己无能？因为无能的自己是不配被爱的。'},
      {ts:'01:43', videoId:'B377', bv:'BV1oCY1zxEuh', text:'阳的卡点在于他不允许自己无能。他不允许自己无能了以后，就会在事业上、能力上疯狂的去追求卓越，停不下来。但事实上，就算一个阳允许自己无能，也不等于他就是无能——这是两个概念。'}
    ],
    quote:'阳的信念里无能等于不被爱——所以他不允许自己休息。',
    videoTitle:'阳为什么不允许自己无能',
    jumpUrl:'https://www.bilibili.com/video/BV1oCY1zxEuh?t=0',
    compliance:'web+mini',
    shareText:'他不是卷，是怕——「无用之人」这四个字，阳不敢往自己身上放。'
  },
  {
    qaId:'q-c-B39-02', kpId:'', category:'阴阳能量', scene:['family'], forTypes:['yin-female','yin-male'],
    question:'为什么TA总觉得「我不配」？',
    answerBrief:'不配得感是阴的底色：外面的贬低，TA会替你转成自判。',
    answer:[
      {ts:'00:00', videoId:'B39', bv:'BV1YJE4zFEJv', text:'阴性方觉得不配得感、自卑都是有的，这主要是因为他内在深刻的就是相信自己不配被爱，这是阴性的主要问题。'},
      {ts:'03:44', videoId:'B39', bv:'BV1YJE4zFEJv', text:'你看同样的场景，家里面有人说：哎呀你不配。阳性能量就说：我凭什么不配？你说我不配我就不配啊？阴性能量说：我不配，我爸妈都说我不配——然后他自己也相信他自己真的不配。'}
    ],
    quote:'同样的「你不配」：阳回一句凭什么，阴回自己一句「确实」。',
    videoTitle:'为什么阴性会觉得不配得',
    jumpUrl:'https://www.bilibili.com/video/BV1YJE4zFEJv?t=0',
    compliance:'web+mini',
    shareText:'「我不配」这三个字不是事实，是一句被自己信了很多年的旧话。'
  },
  {
    qaId:'q-c-B46-01', kpId:'', category:'阴阳能量', scene:[], forTypes:[],
    question:'快速自测：你有没有不配得感？',
    answerBrief:'判断内核的土办法：看有没有「我不配」这三个字。',
    answer:[
      {ts:'00:18', videoId:'B46', bv:'BV1cSJAzLEpA', text:'判断内核有一个很简单的方法，就是看你自己是不是有不配得。你只要有不配得，一定是阴。阳是没有不配得的，阳不会觉得自己不配得，阳会觉得自己太配了。'},
      {ts:'00:50', videoId:'B46', bv:'BV1cSJAzLEpA', text:'阳如果自己说出来他不配，他是在委婉体面的拒绝——他一定要把自己放得很低，然后他才跑得掉。但是他打心底里面不会觉得自己不配。'}
    ],
    quote:'有不配得感的一定是阴；阳不会觉得自己不配，阳觉得自己太配了。',
    videoTitle:'判断自己的阴阳属性',
    jumpUrl:'https://www.bilibili.com/video/BV1cSJAzLEpA?t=18',
    compliance:'web+mini',
    shareText:'一个土办法测内核：遇事先冒出来的是「我不配」，还是「凭什么」。'
  },
  {
    qaId:'q-c-B712-01', kpId:'', category:'阴阳能量', scene:[], forTypes:[],
    question:'你的人格，今年几岁了？',
    answerBrief:'阴阳不分年龄：心智停在几岁，才是你真实的「人格年龄」。',
    answer:[
      {ts:'00:00', videoId:'B712', bv:'BV1Jo8d6qEwQ', text:'我分的是这样，把心智的成熟度分为幼阴、少阴和老阴，幼阳、少阳、老阳。幼态的这个就是心智非常的小，如果说我用心理学的话就是巨婴，他的心智还停留在婴儿时期。'},
      {ts:'00:19', videoId:'B712', bv:'BV1Jo8d6qEwQ', text:'少阴少阳的话就是他的心智停留在青少年时期。老阴老阳的话就是成熟了，就成年了，心智已经是18岁了。'}
    ],
    quote:'幼阳是巨婴，少阳停在青少年，老阳的心智才是18岁。',
    videoTitle:'阴阳能量的三个阶段',
    jumpUrl:'https://www.bilibili.com/video/BV1Jo8d6qEwQ?t=0',
    compliance:'web+mini',
    shareText:'身份证30岁，人格可能才12岁——阴阳分幼、少、老三阶。'
  },
  {
    qaId:'q-c-B60-01', kpId:'', category:'阴阳能量', scene:[], forTypes:[],
    question:'明知该选A，为什么最后总选了B？',
    answerBrief:'心里选A脚选B——不是不懂，是恐惧在替你踩油门。',
    answer:[
      {ts:'01:47', videoId:'B60', bv:'BV1pdhwzrErv', text:'准确来讲是这样：他们的感觉通常是正确的，但是他们很容易用头脑的声音去盖过内心的声音，以此（之故）就是他们不太容易做选择。比如说A和B两个选择，他心里面知道选A是对的，但是他一定会去选B，通常他都会去选B。'},
      {ts:'02:24', videoId:'B60', bv:'BV1pdhwzrErv', text:'因为他的小我会用恐惧去驱动他选B。'}
    ],
    quote:'阴的感觉通常是对的，但小我会用恐惧驱动他选错的那个。',
    videoTitle:'了解阴性能量2',
    jumpUrl:'https://www.bilibili.com/video/BV1pdhwzrErv?t=107',
    compliance:'web+mini',
    shareText:'反复选错的那个人不是傻——是恐惧比感觉嗓门大。'
  },
  {
    qaId:'q-c-B60-03', kpId:'', category:'阴阳能量', scene:[], forTypes:['yin-female','yin-male'],
    question:'你那身「忍功」，是出厂设置吗？',
    answerBrief:'阴不是天生能忍，是出厂把技能点都加在了「耐受力」。',
    answer:[
      {ts:'07:45', videoId:'B60', bv:'BV1pdhwzrErv', text:'阴性能量和阳性能量，他那个天赋点了技能，点的那个技能不一样。阳性能量把技能点都点到反击上面去了，所以就是你搞我，我就搞你。阴性能量把那个技能点都点到那个耐受力上面去了——就是忍了。'},
      {ts:'10:44', videoId:'B60', bv:'BV1pdhwzrErv', text:'阴阳他就像那个游戏里面不同属性的英雄一样，有的是那种脆皮但是攻击力手（射程）比较长，有的是那种耐力型的英雄，就是技能树点的不一样。那个战士他就肯定是属阳的，那盗贼他肯定是属阴的。'}
    ],
    quote:'阳把技能点加在反击，阴把技能点加在耐受力。',
    videoTitle:'了解阴性能量2',
    jumpUrl:'https://www.bilibili.com/video/BV1pdhwzrErv?t=465',
    compliance:'web+mini',
    shareText:'能忍不是修养高，是加点不同——阳点反击，阴点耐受力。'
  },
  {
    qaId:'q-c-B22-01', kpId:'', category:'四型人格', scene:['love'], forTypes:['yin-female','yin-male'],
    question:'嘴上说不要，为什么三秒后就回了消息？',
    answerBrief:'「不能显得太热情」的内心戏，最多坚持三秒。',
    answer:[
      {ts:'05:09', videoId:'B22', bv:'BV17kVdzuEtE', text:'阴就是口是心非嘛：嘴巴说不要，但是那个口水已经滴到下巴了，他自己还不知道。'},
      {ts:'06:22', videoId:'B22', bv:'BV17kVdzuEtE', text:'阴性能量如果说他明明想要秒回，这个时候内心戏就来了：哎呀我这样秒回会不会显得我太热情了？不行，我不能显得这么主动……然后坚持了三秒钟，还是回他吧，然后就回了。只是他不是一秒回，他是三秒回。'}
    ],
    quote:'嘴上说不要，身体很诚实——阴的「三秒回」定律。',
    videoTitle:'阴性能量速看，阳性能量的性格特点（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV17kVdzuEtE?t=309',
    compliance:'web+mini',
    shareText:'那条「三秒回」的消息里，藏着一个演得很累的口是心非。'
  },
  {
    qaId:'q-c-B150-01', kpId:'', category:'四型人格', scene:[], forTypes:['yang-male','yin-male'],
    question:'同样过得惨，为什么有人卖惨有人吹牛？',
    answerBrief:'同样跌到谷底：阳喊「看我爬起来了」，阴喊「快心疼我」。',
    answer:[
      {ts:'00:08', videoId:'B150', bv:'BV1zqTtzjEgp', text:'男阴扎在一堆的话，他们聊的话题就是互相比惨。阴性能量扎堆都喜欢互相比惨，其实阴性只跟比自己惨的人玩儿，但凡有一个比自己过得幸福的，他就会脱离这些比惨圈。'},
      {ts:'00:27', videoId:'B150', bv:'BV1zqTtzjEgp', text:'阳从来不会卖惨，阳从来都是装逼。他就算是经历了惨，他都会把那个惨变成一个逼可以装：你看我当初剧情这么严重，我都挺过来了，我多牛逼。同样的境遇，男阴的出发点是完全不一样的：男阴是哎呀我好可怜呐，我好惨呐，你快同情一下我吧，你快疼我一下吧，哄哄我吧——这是男阴要的。'}
    ],
    quote:'阳把惨熬成勋章，阴把惨摊开求疼——同一个坑，两种喊法。',
    videoTitle:'男阴喜欢卖惨，男阳喜欢装逼（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1zqTtzjEgp?t=8',
    compliance:'web+mini',
    shareText:'摔进同一个坑，爬出来的姿势都不一样——看你怎么喊疼。'
  },

  // ==================== 四型人格 ====================

  {
    qaId:'q-c-B87-01', kpId:'', category:'四型人格', scene:['work'], forTypes:['yang-male','yang-female'],
    question:'「我只要不承认，就没有」——什么段位？',
    answerBrief:'阳的面具不在「谎话」，在「自大」——装逼装到不承认。',
    answer:[
      {ts:'01:15', videoId:'B87', bv:'BV1BdjtziEHj', text:'装逼是什么？不是说他自己实力有这个十分，然后他把自己的实力夸大到50分、60分夸大到100分，这是一种装逼。凡尔赛是什么呢？凡尔赛是他的实力真有十分，然后他说自己也是十分——他的自我认知是很清晰的，他知道自己几斤几两。'},
      {ts:'02:22', videoId:'B87', bv:'BV1BdjtziEHj', text:'我一说他在装逼，他就说：嗯，我只要不承认就没有。我说嗯，这就是阳的装逼，打死不承认。'}
    ],
    quote:'装逼是10分说成100分；凡尔赛是10分说10分，还带着云淡风轻。',
    videoTitle:'阳性装逼的等级',
    jumpUrl:'https://www.bilibili.com/video/BV1BdjtziEHj?t=75',
    compliance:'web+mini',
    shareText:'装逼的段位表：从「用力吹」到「凡尔赛」，最高级是不承认。'
  },
  {
    qaId:'q-c-B217-01', kpId:'', category:'四型人格', scene:['work'], forTypes:['yang-male'],
    question:'他说「帮我看看哪里还要改」，什么意思？',
    answerBrief:'阳的凡尔赛：嘴上求指正，心里等鼓掌。',
    answer:[
      {ts:'00:26', videoId:'B217', bv:'BV1EfMcz3E9F', text:'男阳会把他的方案分享给你——他在做这个方案的时候，情绪体验就是：哇靠，我这方案做得太牛逼了。他一定得分享给其他人，我不能独享这种perfect moment。然后发给你的时候就说：我这个方案，你帮我看看有没有哪些还有需要提高的。但是心里面肯定是在想：快看我的，看我这perfect你get到没有。'},
      {ts:'02:15', videoId:'B217', bv:'BV1EfMcz3E9F', text:'确实男阳很爱低姿态（分享），但夸了他牛逼以后也没有觉得他很得意——就凡尔赛嘛，用低调的方式去高调的炫耀，就男阳干的事情。'}
    ],
    quote:'「帮我看看哪里要改」翻译过来：快看，我是不是特别牛。',
    videoTitle:'【男阳的凡尔赛时刻】',
    jumpUrl:'https://www.bilibili.com/video/BV1EfMcz3E9F?t=26',
    compliance:'web+mini',
    shareText:'他发来方案让你「提意见」——记得夸，他是真想让你看。'
  },
  {
    qaId:'q-c-B159-01', kpId:'', category:'四型人格', scene:['love'], forTypes:['yang-male'],
    question:'TA分手前，为什么先把自己变「渣」？',
    answerBrief:'男阳不爱了不直说，会故意变得可恨，把分手让给你提。',
    answer:[
      {ts:'01:44', videoId:'B159', bv:'BV1jKTXzyEVs', text:'男阳为了分开，甚至有的时候会主动的去争取那个道德被告席，就是为了让你放弃我。我故意做一点事情，就让你觉得我是个渣男，让你觉得哎呀我这个人无可救药，你就动了念头了：我要离开你这个渣男。你只要动了这个念头，目的就达成了。'},
      {ts:'02:35', videoId:'B159', bv:'BV1jKTXzyEVs', text:'这就是男阳的做法呀：就是我不在意别人怎么评价我，我要让你下头，我把我下头（男相）一拿出来，你百分之百会下头。'}
    ],
    quote:'男阳分手会主动坐上「被告席」——让你先开口说离开。',
    videoTitle:'【阴阳属性的不同分手方式】',
    jumpUrl:'https://www.bilibili.com/video/BV1jKTXzyEVs?t=104',
    compliance:'web+mini',
    shareText:'突然变得可恨的那个人，可能在用最难看的方式放你走。'
  },
  {
    qaId:'q-c-B31-01', kpId:'', category:'关系与配对', scene:['love'], forTypes:['yang-male'],
    question:'TA没说「在一起」，就是没在一起吗？',
    answerBrief:'阳的关系要「官宣」才算数：没说出口的，都是没确认。',
    answer:[
      {ts:'02:33', videoId:'B31', bv:'BV1DpEBzdEUp', text:'男阳的确认关系是非常有仪式感的一件事情。他会非常确认的、稳定的跟你讲说：我们要在一起吧。阳性能量都是很注重仪式感的，对他来讲说出这句话是一个仪式，是一个关系确认的仪式。'},
      {ts:'02:54', videoId:'B31', bv:'BV1DpEBzdEUp', text:'如果他没有说出来，就说明你们关系并没有确认。'},
      {ts:'12:34', videoId:'B31', bv:'BV1DpEBzdEUp', text:'把家里钥匙给你，对于阳性能量意味着什么？阳性能量边界感那么重，对这些领地也是极为敏感、极为重视的——给你钥匙，这个已经很说明问题了。'}
    ],
    quote:'男阳没亲口说「在一起」，就是还没在一起——那句话对他是个仪式。',
    videoTitle:'男阳为什么不确定关系？',
    jumpUrl:'https://www.bilibili.com/video/BV1DpEBzdEUp?t=153',
    compliance:'web+mini',
    shareText:'别再猜了：阳的世界里，没说出口的确认，就是没确认。'
  },
  {
    qaId:'q-c-B31-02', kpId:'', category:'关系与配对', scene:['love'], forTypes:['yang-male'],
    question:'TA确定关系后，还会留着「备胎」吗？',
    answerBrief:'阳的专一不用你逼：确认那天，其他窗口自动关闭。',
    answer:[
      {ts:'11:27', videoId:'B31', bv:'BV1DpEBzdEUp', text:'他如果和一个人确定关系以后，不用你说，他都会把那些暧昧的、不清不楚的关系全部都处理掉。'},
      {ts:'11:42', videoId:'B31', bv:'BV1DpEBzdEUp', text:'阳性能量的思维是这样：我现在是单身的，这个窗口是打开，大家都有机会；但一旦他选定一个人确定关系以后，他就会把其他所有人的窗口全部关掉。'}
    ],
    quote:'单身时窗口大开，选定你之后——他亲手把其他窗口全关掉。',
    videoTitle:'男阳为什么不确定关系？',
    jumpUrl:'https://www.bilibili.com/video/BV1DpEBzdEUp?t=687',
    compliance:'web+mini',
    shareText:'判断他认没认定你，看一件事：其他窗口关没关。'
  },
  {
    qaId:'q-c-B671-01', kpId:'', category:'四型人格', scene:['work'], forTypes:['yang-male'],
    question:'为什么他宁愿扛到碎，也不开口求人？',
    answerBrief:'阳不是不会求助，是「求助」两个字本身就硌他的自恋。',
    answer:[
      {ts:'00:36', videoId:'B671', bv:'BV1mcuz67Eha', text:'对于阳来讲，寻求帮助这件事情本身会伤害到他的自恋。'},
      {ts:'00:59', videoId:'B671', bv:'BV1mcuz67Eha', text:'男阳要让他去寻求帮助，这种对他来讲太困难了。他那个自强的心里，核心的信念就是靠自己嘛，而且自己一定要比别人强才行，一定要站上高位。哪怕他是在寻求你帮助，你要给足他面子。'}
    ],
    quote:'男阳的核心信念是靠自己——求助对他不是技巧问题，是自尊问题。',
    videoTitle:'女阳会主动捞男阴吗？【新增·v4-635】',
    jumpUrl:'https://www.bilibili.com/video/BV1mcuz67Eha?t=36',
    compliance:'web+mini',
    shareText:'他不是不需要帮助，是开口这件事会硌到他的自恋。'
  },
  {
    qaId:'q-c-B79-01', kpId:'', category:'关系与配对', scene:['love'], forTypes:['yang-male','yang-female'],
    question:'TA只在你面前露软肋，意味着什么？',
    answerBrief:'阳把软肋给你，是最高级别的信任——接不住，就别怪壳更硬。',
    answer:[
      {ts:'00:00', videoId:'B79', bv:'BV1cejJzSEV6', text:'（阳）只会在他识别到他向你展现他的脆弱的时候，是会被你接纳、被你支持、被你滋养的情况下，他才会向你展示他的脆弱。如果你没有去接住你，反而是去羞辱他、去重伤他的话，那你们就是一定会断联的。'},
      {ts:'00:20', videoId:'B79', bv:'BV1cejJzSEV6', text:'他就像那个蚌壳一样，他向你打开了他的壳，把里面最柔软的部分展现了，结果你拿一个小刀拿（划）他一下——你觉得他还会再展开吗？'}
    ],
    quote:'他像蚌壳一样把最软的部分给你看，你再划一刀，就再也不会开了。',
    videoTitle:'阳性只会在信任的人面前展示自己的脆弱',
    jumpUrl:'https://www.bilibili.com/video/BV1cejJzSEV6?t=0',
    compliance:'web+mini',
    shareText:'他把软肋给你看，是他能给出的最高信任——请轻拿轻放。'
  },
  {
    qaId:'q-c-B56-03', kpId:'', category:'四型人格', scene:['love'], forTypes:['yang-male','yang-female'],
    question:'阳做错了事，是什么样子？',
    answerBrief:'阳错了不嘴硬：认错、愧疚、补偿，动作一整套。',
    answer:[
      {ts:'19:49', videoId:'B56', bv:'BV1EfE9z7Egt', text:'如果他真的是撒谎被戳穿的话，他第一个他会认，他不会胡搅蛮缠。他会认，他会因此而产生一些愧疚，他会觉得他自己破坏了这份信任，然后他会做很多补偿的动作，来修复这个信任。这是阳性能量。'},
      {ts:'20:55', videoId:'B56', bv:'BV1EfE9z7Egt', text:'阳是什么？他只要意识到是他的错，马上就立正——挨打就立正，马上就能认错，而且直接就能改的。'}
    ],
    quote:'阳认错的样子：挨打立正，认了就改，然后拼命补偿。',
    videoTitle:'阳性的信任有多重要',
    jumpUrl:'https://www.bilibili.com/video/BV1EfE9z7Egt?t=1189',
    compliance:'web+mini',
    shareText:'认错这件事，阳做起来反而最利索——错就立正，改了就补。'
  },
  {
    qaId:'q-c-B24-01', kpId:'', category:'阴阳能量', scene:['love'], forTypes:['yang-male','yang-female'],
    question:'TA越在乎你，为什么墙砌得越高？',
    answerBrief:'阳的冷和硬，多数时候是护着里面那块没长好的软肉。',
    answer:[
      {ts:'10:19', videoId:'B24', bv:'BV1Z6VdzzELD', text:'是因为他的自我的这个边际是铜墙铁壁，他不能允许自己的这个铜墙铁壁被破坏掉。'},
      {ts:'12:40', videoId:'B24', bv:'BV1Z6VdzzELD', text:'他用城墙来保护他的脆弱，他不让你看见——因为他自己都不能看见自己的脆弱，当然不能让另一个人看见了。'}
    ],
    quote:'他用城墙保护他的脆弱——自己都看不见的脆弱，更不让你看见。',
    videoTitle:'阳性能量为什么很难共情，阴性能量的重要课题（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1Z6VdzzELD?t=619',
    compliance:'web+mini',
    shareText:'那堵推不开的墙，其实是护着里面那块没长好的软肉。'
  },
  {
    qaId:'q-c-B151-01', kpId:'', category:'四型人格', scene:['love'], forTypes:['yang-female'],
    question:'她老「闯祸」让你收拾，是故意的吗？',
    answerBrief:'她递给你的每个「表现机会」，都是提前设计好的局。',
    answer:[
      {ts:'00:16', videoId:'B151', bv:'BV1FvTtzUEyk', text:'女阳：为什么要给你惹事？不就是需要她故意示弱，让你去表现嘛，然后就完美解决了，正中下怀。我翻译一下，就是故意设了一个局，来帮你们增强自信。'},
      {ts:'00:35', videoId:'B151', bv:'BV1FvTtzUEyk', text:'女阳会看到男阴不自信的部分，然后会做一些事情，想办法去帮这个男阴充值自信。你还觉得说是不是让女阳挫败了？结果你就在女阳的局里面。'},
      {ts:'03:21', videoId:'B151', bv:'BV1FvTtzUEyk', text:'阳很喜欢扮猪吃老虎的：他在你面前呈现出来的一个弱的象，这个象是假象——都是故意示弱。'}
    ],
    quote:'女阳的「惹事」是做局：故意示弱，帮你把自信充回来。',
    videoTitle:'女阳喜欢扮猪吃老虎',
    jumpUrl:'https://www.bilibili.com/video/BV1FvTtzUEyk?t=16',
    compliance:'web+mini',
    shareText:'她「闯的祸」里藏着温柔：每一步都是给你搭的表现台。'
  },
  {
    qaId:'q-c-B247-01', kpId:'', category:'四型人格', scene:['work'], forTypes:['yang-female'],
    question:'女阳的嫉妒：服输，还是开战？',
    answerBrief:'女阳的嫉妒长在实力轴上：够不着的服气，够得着的开战。',
    answer:[
      {ts:'04:31', videoId:'B247', bv:'BV1G384zREyi', text:'女阳是嫉妒别人能力比她强。你如果工作当中遇到有一个人实力还很强，和你不相上下，这个时候你的战斗欲就出来了——不是他死就是我活。'},
      {ts:'05:06', videoId:'B247', bv:'BV1G384zREyi', text:'女阳她如果遇见的是比自己强太多了，她够不着了，她会服气：你确实牛逼，老子服气。但如果说是没有比她强很多，却拿了很多，她就嫉妒就来了。'}
    ],
    quote:'女阳遇强太多的会服气；差得不多的还拿得多的，嫉妒就来了。',
    videoTitle:'阴阳能量嫉妒的表现',
    jumpUrl:'https://www.bilibili.com/video/BV1G384zREyi?t=271',
    compliance:'web+mini',
    shareText:'女阳的嫉妒很诚实：让TA不服的不是你拿得多，是你没TA强还拿得多。'
  },
  {
    qaId:'q-c-B247-02', kpId:'', category:'四型人格', scene:['love'], forTypes:['yin-male'],
    question:'「白菜被猪拱了」——男阴在嫉妒什么？',
    answerBrief:'男阴的嫉妒绕着「配不配」转：她怎么就选了他？',
    answer:[
      {ts:'03:44', videoId:'B247', bv:'BV1G384zREyi', text:'通常男阴嫉妒对象是另外一个男阴，他会觉得说：这么多妹子都围着你转。男阴的嫉妒是啥呢？比如说他的女神喜欢上了另外一个人，他就会觉得：这么好的白菜被猪拱了。'},
      {ts:'03:24', videoId:'B247', bv:'BV1G384zREyi', text:'男阴对于被众人崇拜这个东西是有天然的（向往）啊，他更喜欢的是那种受人追捧、被众人崇拜的那种感觉。'}
    ],
    quote:'男阴的嫉妒是「这么好的白菜被猪拱了」。',
    videoTitle:'阴阳能量嫉妒的表现',
    jumpUrl:'https://www.bilibili.com/video/BV1G384zREyi?t=224',
    compliance:'web+mini',
    shareText:'男阴的嫉妒不骂人，只在心里反复念一句：他配吗。'
  },
  {
    qaId:'q-c-B190-01', kpId:'', category:'四型人格', scene:['love'], forTypes:['yin-female'],
    question:'连猫的醋都吃？阴性吃醋有多野。',
    answerBrief:'阴性吃醋不挑对象：猫、狗、游戏，都能成为假想敌。',
    answer:[
      {ts:'00:32', videoId:'B190', bv:'BV1Y5TuzJEin', text:'阴要吃醋，可以跨物种。如果阴还没修好的情况下，他吃起来的时候——比如你养了一只猫或者养只狗，然后你经常的去抚摸，他连猫狗的醋他都会吃，他会觉得说：我连你家猫都不如。'},
      {ts:'01:53', videoId:'B190', bv:'BV1Y5TuzJEin', text:'他会怎么表达呢？阴阳怪气：是了，我已经人老珠黄了，我还不如一只猫在家里面地位高。'}
    ],
    quote:'阴吃醋可以跨物种——你多摸两下猫，他都觉得「我不如一只猫」。',
    videoTitle:'女阴的吃醋',
    jumpUrl:'https://www.bilibili.com/video/BV1Y5TuzJEin?t=32',
    compliance:'web+mini',
    shareText:'那声「我不如一只猫」，翻译过来是：多看看我。'
  },
  {
    qaId:'q-c-B255-01', kpId:'', category:'四型人格', scene:['love'], forTypes:['yin-male'],
    question:'为什么TA花钱，总要你记着恩情？',
    answerBrief:'阴的付出常裹着愧疚感，底下是对被抛弃的恐惧。',
    answer:[
      {ts:'00:00', videoId:'B255', bv:'BV1aTM3zdEix', text:'男阴会有一种营造，他会营造出一种氛围：他给你花这个钱有多么的不容易、多么的艰难，他才这么窘迫穷困潦倒的情况下，还愿意掏空自己为你付出、为你花钱。这个就是阴花钱和阳花钱不一样的地方。'},
      {ts:'01:21', videoId:'B255', bv:'BV1aTM3zdEix', text:'男阴会在关系里面有很多的付出，是在抬高你的抛弃成本。阴在关系里面的一些付出，是出于对被抛弃的恐惧来付出的。'}
    ],
    quote:'阴的付出带着「你可别忘」——因为那是怕被抛弃的筹码。',
    videoTitle:'阴阳能量的金钱观',
    jumpUrl:'https://www.bilibili.com/video/BV1aTM3zdEix?t=0',
    compliance:'web+mini',
    shareText:'「我为你花了这么多」——这句话的底下，是怕被丢下。'
  },
  {
    qaId:'q-c-B255-02', kpId:'', category:'四型人格', scene:['love'], forTypes:['yang-male','yang-female'],
    question:'TA的支持，为什么让你没有负担？',
    answerBrief:'阳给支持像给水喝：给了就给了，不记账、不压秤。',
    answer:[
      {ts:'00:19', videoId:'B255', bv:'BV1aTM3zdEix', text:'阳花钱的话就会觉得说，我有多的，你需要支持行，我支持你。这个支持给你的时候，是不会给你制造出来一种愧疚感，不求回报。'},
      {ts:'00:40', videoId:'B255', bv:'BV1aTM3zdEix', text:'如果说你觉得亏欠我，他反而会来帮助你去处理你那个亏欠：说你不用觉得亏欠，你也不用觉得好像什么多大一笔钱，你就好好的干你事情就行了——阳会帮你放轻松。'}
    ],
    quote:'阳的支持不求回报也不制造愧疚——你不用觉得亏欠我。',
    videoTitle:'阴阳能量的金钱观',
    jumpUrl:'https://www.bilibili.com/video/BV1aTM3zdEix?t=19',
    compliance:'web+mini',
    shareText:'有一种帮衬叫「阳式打款」：到账了，心也轻了。'
  },
  {
    qaId:'q-c-B188-01', kpId:'', category:'四型人格', scene:['love'], forTypes:['yin-male'],
    question:'面对太热情的人，TA为什么反而躲？',
    answerBrief:'男阴躲开的不是热情，是「我没见过、所以不敢信」的热情。',
    answer:[
      {ts:'02:57', videoId:'B188', bv:'BV1H6TCz8Eg5', text:'我们男阴有一个很明显的特点，就是无法接受这种无条件的热情。他的成长经历当中，他见识到的所有的人都是充满了利益、算计这些东西的。突然一下子来一个很真诚的、不算计的、没有心眼的、不套路的，他反而会觉得不真实。'},
      {ts:'03:33', videoId:'B188', bv:'BV1H6TCz8Eg5', text:'这个时候他的那个内在恐惧又会投射出来，对他不相信——他会觉得说：肯定是他一定是图我什么，他才来靠近我的。'}
    ],
    quote:'没见过不算计的好意——太真诚的人，反而让他觉得危险。',
    videoTitle:'男阴遇见女阳的内心戏（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1H6TCz8Eg5?t=177',
    compliance:'web+mini',
    shareText:'他后退不是不心动——是这种不带算计的好，他没见过。'
  },
  {
    qaId:'q-c-B605-01', kpId:'', category:'四型人格', scene:[], forTypes:['yin-female'],
    question:'越「独立要强」的她，为什么越累？',
    answerBrief:'硬撑出来的「大女主」，是用阳性壳子罩住阴性内核。',
    answer:[
      {ts:'00:46', videoId:'B605', bv:'BV1mNJ8zFEMv', text:'有很多这样的女阳是什么？假性大女主，就是装坚强硬撑的。内核是阴，有一个阳性能量的假面具，专业术语叫假自体。'},
      {ts:'01:26', videoId:'B605', bv:'BV1mNJ8zFEMv', text:'他那个壳是怎么产生的？他就是他不接纳自己的性别，要么就是他不接纳自己的脆弱，他就诞生出了一个假阳的壳。'}
    ],
    quote:'假性大女主：内核是阴，戴着一个阳性的面具，术语叫假自体。',
    videoTitle:'了解阴性能量',
    jumpUrl:'https://www.bilibili.com/video/BV1mNJ8zFEMv?t=46',
    compliance:'web+mini',
    shareText:'撑得越满越累的那股劲儿——可能不是强，是壳。'
  },
  {
    qaId:'q-c-B497-01', kpId:'', category:'四型人格', scene:['love'], forTypes:['yin-male','yang-male'],
    question:'TA说「其实我很孤独」，该怎么接？',
    answerBrief:'阳性的孤独不是求安慰，是求一句「你没有庸俗」。',
    answer:[
      {ts:'01:10', videoId:'B497', bv:'BV1y6AuzoEuw', text:'叔本华说，一个人只有在自己独处的时候，才能成为真正的自己。如果他不喜欢孤独，那么他也不会热爱自由——因为只有当他独自一人的时候，他才是真正自由的。'},
      {ts:'03:25', videoId:'B497', bv:'BV1y6AuzoEuw', text:'平庸的人用热闹填补空虚，优秀的人以独处成就自己。'}
    ],
    quote:'平庸的人用热闹填补空虚，优秀的人以独处成就自己。',
    videoTitle:'阳性说孤独怎么办？',
    jumpUrl:'https://www.bilibili.com/video/BV1y6AuzoEuw?t=70',
    compliance:'web+mini',
    shareText:'他跟你说的「孤独」，不是求抱抱——是想被认出「我不是庸俗的人」。'
  },

  // ==================== 关系与配对 ====================

  {
    qaId:'q-c-B678-01', kpId:'', category:'关系与配对', scene:['love'], forTypes:[],
    question:'两个阳为什么不来电？',
    answerBrief:'阳与阳不来电，阴与阴是共生——亲密需要的是互补。',
    answer:[
      {ts:'00:06', videoId:'B678', bv:'BV1UjMX6DE33', text:'两个阳是互相不来电的。两个阳他甚至可以做兄弟、战友，他就是不可能进入到那种亲密关系。但是两个阴可以，两个阴组成的这个亲密关系，它是共生。'},
      {ts:'03:40', videoId:'B678', bv:'BV1UjMX6DE33', text:'你一旦独立人格一出来了以后，你只会被阳吸引，你不会被阴吸引的。比如说阳身上散发出来的那种生命力呀、拼搏力呀、积极向上啊、进取心啊，这些都会吸引你——因为你本质上阴性是慕强的。'}
    ],
    quote:'两个阳能做战友，做不成亲密；两个阴能亲密，但那是共生。',
    videoTitle:'阴性遇到阳性时内心的感受想法【新增·v4-649】',
    jumpUrl:'https://www.bilibili.com/video/BV1UjMX6DE33?t=6',
    compliance:'web+mini',
    shareText:'为什么两个「很好的人」凑不成一对？来电这件事，认能量。'
  },
  {
    qaId:'q-c-B678-02', kpId:'', category:'关系与配对', scene:['love'], forTypes:[],
    question:'两个阴的甜蜜，为什么熬不过成长？',
    answerBrief:'阴阴共生靠互相补安全感；一个人长大了，关系就结束了。',
    answer:[
      {ts:'01:28', videoId:'B678', bv:'BV1UjMX6DE33', text:'准确来讲，你们之所以会共生，是因为你们两个彼此都缺爱，这个关系能让你们双方在关系当中体验到那种安全感，就是弥补你们童年的安全感缺失。这种安全感的缺失弥补到一定程度以后，这个关系是一定会结束的。'},
      {ts:'01:59', videoId:'B678', bv:'BV1UjMX6DE33', text:'除非两个人都因为怕孤独而甘愿放弃自己的精神追求，这种关系甚至可以走到最后——但是这两个人一定会过得非常的憋屈。因为他合在一起是因为恐惧，因为对孤独的恐惧。'}
    ],
    quote:'两个阴共生，是因为彼此缺爱——安全感补齐那天，关系就到了头。',
    videoTitle:'阴性遇到阳性时内心的感受想法【新增·v4-649】',
    jumpUrl:'https://www.bilibili.com/video/BV1UjMX6DE33?t=88',
    compliance:'web+mini',
    shareText:'抱团取暖的感情最怕一件事：有一个人先好了。'
  },
  {
    qaId:'q-c-B672-01', kpId:'', category:'关系与配对', scene:['love'], forTypes:[],
    question:'为什么人设一崩，关系就结束了？',
    answerBrief:'亲密关系终会卸妆——人设撑得了一时，撑不了同居的清晨。',
    answer:[
      {ts:'00:00', videoId:'B672', bv:'BV1ghuZ66Ens', text:'真正的亲密关系，一定是两个真实的自我建立起来的真实连接。靠人设、靠面具吸引来的人，面具一旦维持不住了，关系就要进入到结束了。'},
      {ts:'00:54', videoId:'B672', bv:'BV1ghuZ66Ens', text:'你认不认以前你打扮得多漂亮，你和亲密伴侣在一起的时候，你总得卸妆吧，你总不可能每天都带妆睡吧。'}
    ],
    quote:'靠人设吸引来的关系，面具维持不住的那天就是散场。',
    videoTitle:'女阳说没事是真没事吗？【新增·v4-637】',
    jumpUrl:'https://www.bilibili.com/video/BV1ghuZ66Ens?t=0',
    compliance:'web+mini',
    shareText:'亲密关系的终点站叫「卸妆」——妆前妆后都是你，才走得远。'
  },
  {
    qaId:'q-c-B670-01', kpId:'', category:'关系与配对', scene:['love'], forTypes:[],
    question:'为什么越亲密，越想争个输赢？',
    answerBrief:'越亲越想赢？你们在争的不是道理，是关系的主导权。',
    answer:[
      {ts:'00:10', videoId:'B670', bv:'BV1W7gK6HEpJ', text:'我发现我在和男性进入亲密关系之后，我就会类似于和他形成竞争关系。这个是你在情感关系当中的权力争夺。'},
      {ts:'00:29', videoId:'B670', bv:'BV1W7gK6HEpJ', text:'阴的话是来自于那一份不安全感；对于阳来讲，它更多的不是出于安全感，而是因为它的习性就是要掌控全局。无外乎就是在争夺谁在主导这段关系，这个关系的主导权。'}
    ],
    quote:'亲密关系里的权力争夺：争的从来不是对错，是主导权。',
    videoTitle:'为什么阳性不会被情感诈骗【新增·v4-629】',
    jumpUrl:'https://www.bilibili.com/video/BV1W7gK6HEpJ?t=10',
    compliance:'web+mini',
    shareText:'吵到后来早就忘了为什么吵——你们只是在抢方向盘。'
  },
  {
    qaId:'q-c-B36-01', kpId:'', category:'四型人格', scene:['love'], forTypes:['yin-female'],
    question:'说「我祝福你」的人，真在祝福吗？',
    answerBrief:'故意让你内疚再「原谅」你，是阴式控制的经典剧本。',
    answer:[
      {ts:'02:37', videoId:'B36', bv:'BV176ECzSEuC', text:'你这个背后还是控制。为什么我说是控制？所有的阴性能量都有一个特点——试图给对方制造愧疚感，来去掌控对方。如果你还是试图让他对你产生情感上的愧疚感，让他来给你超额补偿，这背后还是控制。'},
      {ts:'01:04', videoId:'B36', bv:'BV176ECzSEuC', text:'你这种频繁的试探，在阳的眼中会怎么看？阳会觉得第一你不自信，你是一个不自信的人。不自信的人在阳的眼中就是缺乏魅力的。'}
    ],
    quote:'用愧疚感去掌控对方——试探的背后，还是控制。',
    videoTitle:'阴性能量试探背后的控制',
    jumpUrl:'https://www.bilibili.com/video/BV176ECzSEuC?t=157',
    compliance:'web+mini',
    shareText:'那句大度的「我祝福你」，可能是钓愧疚的饵。'
  },
  {
    qaId:'q-c-B314-03', kpId:'', category:'关系与配对', scene:['love'], forTypes:['yin-female'],
    question:'「你应该懂我」——这个念头坑了多少人？',
    answerBrief:'「爱我就该懂我」是许愿，不是沟通——需要，要说出口。',
    answer:[
      {ts:'08:57', videoId:'B314', bv:'BV1iZ421M7Ev', text:'女性谈恋爱，尤其是女阴，就特别有一点这个误区：觉得你是我男朋友，你应该懂我。不是的。其实真正有爱的关系，一定是双方非常清晰、明确的去表达自己的需要的。'},
      {ts:'08:44', videoId:'B314', bv:'BV1iZ421M7Ev', text:'你如果表达你的需要的话，如果那个人是爱你的，他一定会尊重你的需要——你当然要表达呀。'}
    ],
    quote:'真正有爱的关系，一定是双方清晰明确地表达自己的需要。',
    videoTitle:'做自己、发出自己的光，自我的边界，如何面对自己的阴暗面，自我觉察与自我评判',
    jumpUrl:'https://www.bilibili.com/video/BV1iZ421M7Ev?t=537',
    compliance:'web+mini',
    shareText:'「懂我」是许愿，「说给TA」才是沟通——需要这件事，要出声。'
  },
  {
    qaId:'q-c-B714-01', kpId:'', category:'关系与配对', scene:['love'], forTypes:[],
    question:'有爱，就一定有欲吗？',
    answerBrief:'爱与欲不是对立：爱里必然有欲，欲却不一定通向爱。',
    answer:[
      {ts:'04:08', videoId:'B714', bv:'BV1wk496tEnz', text:'升华了之后它就不代表它不存在了，它其实还是存在的。一个人对自己爱的人不存在欲，这个是有可能出现的吗？不可能，是不可能的。所以有爱就必定有欲。但是反过来，欲它不一定是爱——但是爱里一定会有欲。'},
      {ts:'01:17', videoId:'B714', bv:'BV1wk496tEnz', text:'情是作为一个人的需求，欲是一个身体的需求。'}
    ],
    quote:'有爱就必定有欲；但欲不一定是爱。',
    videoTitle:'情和欲，爱和欲的区别。如何升维情升维欲',
    jumpUrl:'https://www.bilibili.com/video/BV1wk496tEnz?t=248',
    compliance:'web+mini',
    shareText:'不必为「有欲」羞耻，也不必把「有欲」当爱——它们不是一回事。'
  },

  // ==================== 成长课题 ====================

  {
    qaId:'q-c-B23-03', kpId:'', category:'成长课题', scene:['love'], forTypes:[],
    question:'他生起气来不骂人了，是好是坏？',
    answerBrief:'从直接爆炸到阴阳怪气，是攻击性学会了「留余地」。',
    answer:[
      {ts:'05:18', videoId:'B23', bv:'BV1qkVdzuEJa', text:'阳性能量在早期的时候，它的反应模式一被入侵边界，通常是比较单一的：就是爆炸、愤怒、攻击或者反击。但是他说话开始阴阳怪气的时候，实际上是一种进步——他不再是那种单一的动不动就愤怒的模式，走向了开始有婉转的余地。'},
      {ts:'06:00', videoId:'B23', bv:'BV1qkVdzuEJa', text:'就他说话阴阳怪气是什么意思？就是他既释放了他的攻击性，同时又有婉转的余地、又有回旋的余地。以前的话他是直接就释放攻击性，他不管有没有回旋的余地的。'}
    ],
    quote:'阴阳怪气是进步：既释放了攻击性，又留了回旋的余地。',
    videoTitle:'双生重要经验包，双生阴阳能量之间的交换（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1qkVdzuEJa?t=318',
    compliance:'web+mini',
    shareText:'他不再摔门改为阴阳怪气？别嫌弃，那是攻击性学会了拐弯。'
  },
  {
    qaId:'q-c-B314-01', kpId:'', category:'成长课题', scene:['work'], forTypes:[],
    question:'为什么你总是不好意思拒绝？',
    answerBrief:'不敢拒绝的底下是「拒绝=伤害」的错信念——拒绝只是守门。',
    answer:[
      {ts:'02:12', videoId:'B314', bv:'BV1iZ421M7Ev', text:'阴性能量最不善拒绝，非常不善于拒绝，而且阴性能量普遍内在都会有一个信念，觉得拒绝别人就是在伤害别人。原因是因为他们自己怕被别人拒绝。但实际上，拒绝别人本身是在维护自己的自我的边界。'},
      {ts:'02:43', videoId:'B314', bv:'BV1iZ421M7Ev', text:'如果你的自我边界就像你的家一样，四个陌生人都可以进来逛一下，那还叫家吗？那就在公共场所了。'},
      {ts:'02:55', videoId:'B314', bv:'BV1iZ421M7Ev', text:'所以为什么阴性能量的能量通常是比较低的、太容易内耗呢？因为你把你家的大门全部都敞开了——你的能量就外泄了。'}
    ],
    quote:'拒绝别人不是伤害别人，是在维护自己的边界。',
    videoTitle:'做自己、发出自己的光，自我的边界，如何面对自己的阴暗面，自我觉察与自我评判',
    jumpUrl:'https://www.bilibili.com/video/BV1iZ421M7Ev?t=132',
    compliance:'web+mini',
    shareText:'不敢拒绝的人，等于把家门钥匙配给了所有人。'
  },
  {
    qaId:'q-c-B314-02', kpId:'', category:'成长课题', scene:[], forTypes:[],
    question:'好边界长什么样？不是墙，也不是漏勺',
    answerBrief:'边界像弹簧网：你越用力越反弹，但它不会伤人也不塌。',
    answer:[
      {ts:'06:53', videoId:'B314', bv:'BV1iZ421M7Ev', text:'所以真正阴阳平衡的边界是一个弹簧网——它不是铜墙铁壁，他也不是千疮百孔，它是一个弹簧网。'},
      {ts:'04:35', videoId:'B314', bv:'BV1iZ421M7Ev', text:'有弹性边界是7.1的时候，你就要让对方感知到；7.2的时候你就要让对方明确感知到；7.3的时候你就要去强调：对不起，你过界了。'}
    ],
    quote:'真正平衡的边界是弹簧网——不是铜墙铁壁，也不是千疮百孔。',
    videoTitle:'做自己、发出自己的光，自我的边界，如何面对自己的阴暗面，自我觉察与自我评判',
    jumpUrl:'https://www.bilibili.com/video/BV1iZ421M7Ev?t=413',
    compliance:'web+mini',
    shareText:'边界的目标不是挡死所有人，是像弹簧网：能弹，不塌，不伤人。'
  },
  {
    qaId:'q-c-B713-01', kpId:'', category:'成长课题', scene:['work'], forTypes:['yin-female','yin-male'],
    question:'为什么你明明很累，还是答应了？',
    answerBrief:'两句甜话就接下所有活？不是心软，是价值感在外包。',
    answer:[
      {ts:'00:39', videoId:'B713', bv:'BV1ff8d6NEwk', text:'比如明明我已经很累了，已经都到那种程度，但是别人如果给你说两句甜话：你最好了、哎呀我不能没有你——然后我就会硬着头皮做这件事情，而且会很认真的做，就把自己弄得特别累。'},
      {ts:'01:02', videoId:'B713', bv:'BV1ff8d6NEwk', text:'有时候你也知道他说的这个话只是一个虚假的情绪价值，好像能从这句话里面去得到一点点认可和一点点爱，哪怕都知道这个是假的，但还是去做了。不拒绝，把价值外包给别人了，总觉得被需要才是有价值。'},
      {ts:'02:10', videoId:'B713', bv:'BV1ff8d6NEwk', text:'还是等于是我们阴的价值感外包给别人了嘛：通过帮别人做好了这件事，证明我是有用的、我是有价值的。'}
    ],
    quote:'不拒绝的人，是把价值感外包给了别人——总觉得被需要才有价值。',
    videoTitle:'阴要学会拒绝做情绪垃圾桶',
    jumpUrl:'https://www.bilibili.com/video/BV1ff8d6NEwk?t=39',
    compliance:'web+mini',
    shareText:'累到不行还答应下来的那一单，接的不是活，是「被需要」。'
  },
  {
    qaId:'q-c-B189-01', kpId:'', category:'成长课题', scene:[], forTypes:[],
    question:'总忍不住帮别人，你到底在帮谁？',
    answerBrief:'没被请求的帮助，多半是圣母心在给自己加戏。',
    answer:[
      {ts:'00:43', videoId:'B189', bv:'BV1EzKHzZENB', text:'你帮他，他有给你提这个需要吗？没有啊。那没有提需要，你认为是在帮他就是在帮他吗？人家要吃苹果，然后你说我帮他了，我给了他一个梨，然后人家对梨过敏。不是因为他需要，而你去帮他，是你自己需要。'},
      {ts:'01:06', videoId:'B189', bv:'BV1EzKHzZENB', text:'为啥呢？因为你需要有这出戏嘛：我帮了他，我牺牲了自己，你才能够感受到你自己是有价值的。这一切都只是你自己的自我感动而已，和他没有关系。'},
      {ts:'02:07', videoId:'B189', bv:'BV1EzKHzZENB', text:'你自己都不去维护你自己的边界，没有人会来帮助你维护你的边界。'}
    ],
    quote:'不是因为他需要你才帮，是你需要「帮」这出戏来自我感动。',
    videoTitle:'阴性缺乏边界感（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1EzKHzZENB?t=43',
    compliance:'web+mini',
    shareText:'帮之前先问一句：TA要的是苹果，还是你递的梨？'
  },
  {
    qaId:'q-c-B663-01', kpId:'', category:'成长课题', scene:['family'], forTypes:[],
    question:'拼成这样，还是在等爸妈一句夸？',
    answerBrief:'追着别人认可跑的人，追的常常是小时候缺的那句夸。',
    answer:[
      {ts:'06:57', videoId:'B663', bv:'BV195g56xEG4', text:'你为什么那么想获得认可？获得认可可以得到生存条件和安全吧。为什么别人的认可才能让你获得生存的安全？想一想——可能是因为小时候觉得没有父母的认可就会被丢掉吧。你看这就找到了。'},
      {ts:'07:20', videoId:'B663', bv:'BV195g56xEG4', text:'所以现在已经长大了，也不可能被丢掉了，自己可以养活自己了，所以别人的认可已经不怎么重要了。'},
      {ts:'03:08', videoId:'B663', bv:'BV195g56xEG4', text:'比如说承认自己这么多年过去了仍然还在求认可，就很难受很难受，非常难以接受。但是很难接受，你还是要去把它捡起来。'}
    ],
    quote:'小时候没有父母的认可就会被丢掉——求认可的根，多半在这。',
    videoTitle:'如何判断阴阳能量内核属性【新增·v4-632】',
    jumpUrl:'https://www.bilibili.com/video/BV195g56xEG4?t=417',
    compliance:'web+mini',
    shareText:'如果你到现在还怕「让人失望」——去查查，那是几岁的你在怕。'
  },
  {
    qaId:'q-c-B663-02', kpId:'', category:'成长课题', scene:['family'], forTypes:[],
    question:'你深信不疑的「应该」，是谁装的？',
    answerBrief:'你奉为真理的「应该」，很多只是爸妈当年顺手装上的。',
    answer:[
      {ts:'07:47', videoId:'B663', bv:'BV195g56xEG4', text:'（信念）现在是自己建立的吗？也不算是完全是自己建立。你小时候基本上是从父母那带进来的。准确来讲，你没有修之前，你的所有的信念都是从父母那带进来的。'},
      {ts:'01:48', videoId:'B664', bv:'BV1Fz8i67EgE', text:'比如说男大当婚、女大当嫁，这个东西是哪里来的？就是以前的生长环境灌输的。你首先得到这个东西肯定是从你父母那里得到的；当你突破了父母了以后，你就会发现这个东西父母又是从哪里得到——是从社会规训来的。'}
    ],
    quote:'你没修之前，所有的信念都是从父母那里带进来的。',
    videoTitle:'如何判断阴阳能量内核属性【新增·v4-632】',
    jumpUrl:'https://www.bilibili.com/video/BV195g56xEG4?t=467',
    compliance:'web+mini',
    shareText:'那句「应该如此」，查一下出厂信息——多半不是你自己装的。'
  },
  {
    qaId:'q-c-B665-01', kpId:'', category:'成长课题', scene:['work'], forTypes:[],
    question:'你的自信，其实是租来的？',
    answerBrief:'向外要认可的动作，是小时候内化的「等爸妈点头」。',
    answer:[
      {ts:'00:35', videoId:'B665', bv:'BV1rybe6GELJ', text:'我最近发现了我的寻求被认可的这个思维惯性，还有行为惯性，就是我的动作一直寻求被认可。以前的话我觉得已经改了，但是后面发现更深的行为动作还是指向那个目标。'},
      {ts:'01:00', videoId:'B665', bv:'BV1rybe6GELJ', text:'就说明你的自我价值需要重建，你的自我价值还是有很大一部分建立在外部世界的评价的基础之上。'},
      {ts:'01:38', videoId:'B665', bv:'BV1rybe6GELJ', text:'你们之所以会寻求外部世界的评价，其实就源自于你们小的时候内化了寻求父母评价。当你遇到一个权威角色的时候，你寻求权威的角色，实际上在寻求就是小时候寻求父亲的认可。'}
    ],
    quote:'讨好权威的每一步，都是小时候在等爸妈点头。',
    videoTitle:'阴和阳的工作搭配【新增·v4-625】',
    jumpUrl:'https://www.bilibili.com/video/BV1rybe6GELJ?t=35',
    compliance:'web+mini',
    shareText:'会议室里点头如捣蒜的你，可能还在等小时候那句「真棒」。'
  },
  {
    qaId:'q-c-B416-01', kpId:'', category:'成长课题', scene:[], forTypes:[],
    question:'怕孤独，到底在怕什么？',
    answerBrief:'独处时不用装——怕孤独的人，怕的是遇见没接纳的自己。',
    answer:[
      {ts:'00:58', videoId:'B416', bv:'BV16w8JzmE7S', text:'我们每个人所谓的怕孤独，怕的真的是孤独吗？其实怕的是自己和自己独处。那为什么会怕自己和自己独处呢？因为独处的时候你不需要装、不需要假，而独处时那个真实的自己，还有一部分我们没有接纳的部分。'},
      {ts:'01:44', videoId:'B416', bv:'BV16w8JzmE7S', text:'正因为不愿意接纳真实自己的某一部分，所以独处的时候会让我们看到这一部分，会让我们不得不去面对。而我们不想面对的方法，往往是把注意力投射到外部的关系上。'},
      {ts:'02:53', videoId:'B416', bv:'BV16w8JzmE7S', text:'一个人他自己和自己相处的能力，就是独处的能力越好的话，那么他和别人的外部的关系也会变好——不是指要很用力的去经营的那种变好，而是内在深刻的链接的变好。'}
    ],
    quote:'怕孤独，怕的其实是那个不用装的时候，自己看自己。',
    videoTitle:'怕失去外界关系的背后',
    jumpUrl:'https://www.bilibili.com/video/BV16w8JzmE7S?t=58',
    compliance:'web+mini',
    shareText:'排满的日程表，有时只是为了避开那个「不用装」的房间。'
  },
  {
    qaId:'q-c-B668-01', kpId:'', category:'成长课题', scene:[], forTypes:['yin-female','yin-male'],
    question:'阴性成长最难的一关，其实是它',
    answerBrief:'阴的慢，多数不是能力问题，是没放过自己。',
    answer:[
      {ts:'00:00', videoId:'B668', bv:'BV14wuz6mEUg', text:'对于阴来讲，只要把自我接纳这一关过了就会很快了。对于阴来讲，比较难的就是自我接纳。'},
      {ts:'00:58', videoId:'B668', bv:'BV14wuz6mEUg', text:'只要是能力就是可以习得的，就可以练习的。对于阴来讲只要把自我接纳这一关过了，就会很快了。'}
    ],
    quote:'对阴来讲，最难的是自我接纳；这一关过了，就快了。',
    videoTitle:'为什么阳性比阴性体力好【新增·v4-636】',
    jumpUrl:'https://www.bilibili.com/video/BV14wuz6mEUg?t=0',
    compliance:'web+mini',
    shareText:'「我怎么这么差」这关不过，学再多方法都是绕路。'
  },
  {
    qaId:'q-c-B24-02', kpId:'', category:'成长课题', scene:['family'], forTypes:[],
    question:'有一种冷，叫「妈妈觉得你冷」',
    answerBrief:'把自己塞给对方是移情；先问对方感受，才是共情。',
    answer:[
      {ts:'06:51', videoId:'B24', bv:'BV1Z6VdzzELD', text:'移情是什么？很典型的特点，就是你是把自己的感受凌驾于别人的感受之上。有一种冷叫妈妈觉得你冷，有一种饿叫外婆觉得你饿——这孩子也许已经热得很了，但是妈妈觉得你冷就给你加衣服，不考虑孩子是不是真的冷，这个叫移情，是一种强加。'},
      {ts:'07:50', videoId:'B24', bv:'BV1Z6VdzzELD', text:'共情是什么？共情是把别人的感受放在第一位的。比如说孩子有一个表现出来以后，你是去关心说你现在感觉怎么样啊、你觉得冷不冷——先去问别人，然后通过别人的表达，试图来感同身受别人的感受，这个叫共情。'}
    ],
    quote:'移情是「我觉得你冷」，共情是先问「你觉得冷吗」。',
    videoTitle:'阳性能量为什么很难共情，阴性能量的重要课题（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1Z6VdzzELD?t=411',
    compliance:'web+mini',
    shareText:'那些「为你好」的瞬间，可以自查一下：是共情，还是移情。'
  },
  {
    qaId:'q-c-B663-03', kpId:'', category:'成长课题', scene:[], forTypes:[],
    question:'情绪上头时还硬做事，为什么总砸？',
    answerBrief:'先处理情绪再处理事情——顺序反了，事陪情绪一起葬。',
    answer:[
      {ts:'00:15', videoId:'B663', bv:'BV195g56xEG4', text:'如果说情绪过于激烈的时候，这个时候你要优先去处理情绪。不是在说你情绪已经崩得不行了，然后你还要去干活，这个时候就反了——饭得一口一口的吃。'},
      {ts:'00:48', videoId:'B663', bv:'BV195g56xEG4', text:'这个就是像要动手术，你得先消炎吧，你不能带着一身炎症去上手术台呀。情绪都已经把你的体力精力都耗光了，然后你还去干那个，就顺序就搞反了：先处理情绪，然后再去处理信念。'},
      {ts:'04:41', videoId:'B663', bv:'BV195g56xEG4', text:'抽离并不是风暴消失了，是那个风暴影响不了你了，是它卷不动你了。'}
    ],
    quote:'你不能带着一身炎症去上手术台——先处理情绪，再处理事。',
    videoTitle:'如何判断阴阳能量内核属性【新增·v4-632】',
    jumpUrl:'https://www.bilibili.com/video/BV195g56xEG4?t=15',
    compliance:'web+mini',
    shareText:'硬扛着情绪做事，等于带炎症上手术台——先消炎，再开刀。'
  }
];
