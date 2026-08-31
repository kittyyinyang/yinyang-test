// =====================================================================
// 阴阳人格 · 问答知识层 · 含金量核心层第四批（qa_core4）
//  - var QA_CORE4：schema 与 qa_core.js 一致 + mirror 字段（v3【小镜子】）
//  - 蓝本：《知识切片_教材总纲对齐版_v3.md》——本批 = 阶3 四型全量（kp-b1~b4 画像 +
//    y3-b1a~j / b2a~j / b3a~j（b3d 已在 core）/ b4a~j 共 43 张）+ 阶5（kp-a1-balance、
//    y5-02/03/04/05/06/07/09/10/11 共 10 张；y5-08/y5-12 已在 core，不重复收录）
//  - v3【知识库讲解】错配句已甄别丢弃；insight 骨架 = 总纲论点 + V3.3 §3.2/3.6/3.7/
//    3.9/3.11（V2.5 画像刻画）/ §1.6/1.7/§5.2/§7-9 重构；每条 = 维度引导词 + 阴阳成对
//  - evidence 时间戳 100% 逐句核验（语料全量版）：新增核验 B3@01:09/03:54、B38、B669、
//    B680@04:48-05:13、B671@00:50-01:43、B679、B122、B185、B692、B694、B269、B160@01:02、
//    B667@01:21、B87@01:44、B271@00:34；其余复用 core/core2/切片层已验证窗口（编辑注标明）
//  - y5-05 情执与无我为「仅网页」卡（v3 标注 P3 仅网页）→ compliance:'web'
//  - 分类按 V3.3 章节：四型卡→四型人格；kp-a1-balance/y5-06/07/02→阴阳能量（§1.6/1.7/2.3.4）；
//    y5-03/04/05/09/10/11→成长课题（§5-9 章）；共 53 卡 ｜ 生成：2026-08-30
// =====================================================================

var QA_CORE4 = [

  // ==================== 男阳（11） ====================
  {
    qaId:'q-kp-b1-01', kpId:'kp-b1-nanyang', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-male'],
    question:'男阳画像：自我强到膨胀成自恋——太阳型人格长什么样',
    answerBrief:'男阳 = 向外扛的太阳：自我强、事业心重、靠实力说话；膨胀则目中无人。',
    insight:[
      '画像内核：男阳的独立精神长在「只有靠自己才能靠得住」的信念上——强势的母亲、被忽略的需求，逼出了刚硬的独立自我。',
      '优势面：领导力、决断力、行动力、抗压强、自爱本能旺——传统意义的「男子汉」、行动派领导者、创业者多出于此。',
      '挑战面：忽视他人情感需求、表达爱的方式笨拙、对信任极度谨慎——自我强到膨胀就成了目中无人。',
      '成长课题：削膨胀——把自我修到能容下人；健康则强、膨胀则盲。'
    ],
    evidence:[
      {ts:'01:12', videoId:'B680', bv:'BV195g56xEG4', text:'男阳的体现，就是他的事业心会非常强，然后他的自我也会非常强。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=72'},
      {ts:'00:36', videoId:'B671', bv:'BV11W836nEup', text:'对于阳来讲，寻求帮助这件事情本身会伤害到他的自恋。', link:'https://www.bilibili.com/video/BV11W836nEup?t=36'}
    ],
    quote:'男阳事业心非常强、自我也非常强——强到膨胀，就目中无人。',
    videoTitle:'如何判断阴阳能量内核属性',
    jumpUrl:'https://www.bilibili.com/video/BV195g56xEG4?t=72',
    compliance:'web+mini',
    shareText:'男阳 = 太阳：向外扛、靠实力说话——自我是引擎，膨胀是盲区。',
    mirror:'（男阳/身边男阳）自我强到什么时候会变成「容不下人」？',
    editorNotes:'总纲 kp-b1 男阳画像（阶3，✅KS0）；源 680/669；V3.3 §3.2.1、§3.11（V2.5 画像刻画）；证据 B680@01:12/B671@00:36（切片复用）。'
  },
  {
    qaId:'q-y3-b1a-01', kpId:'y3-b1a', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-male'],
    question:'男阳是怎么炼成的：求助无效 → 反向补偿 → 「只能靠自己」',
    answerBrief:'需求反复求助无果的童年，炼出男阳「只能靠自己」的承重信念。',
    insight:[
      '养育底片：强势的母亲 + 儿时需求被反复忽略——「我表达了需要，但得不到回应」，于是学会不表达。',
      '反向补偿：不是不需要，是「说了也没用」——对无力感的反向补偿，长成焦虑回避型依恋与刚硬的独立自我。',
      '信念定格：靠自己才能靠得住；求助 = 无效 = 危险——男阳的肩膀，是被失望压出来的。',
      '代价与馈赠：代价是不会示弱、苦自己咽；馈赠是极强的问题解决能力——他扛过的东西，多数人扛不动。'
    ],
    evidence:[
      {ts:'01:09', videoId:'B3', bv:'BV15MVWzGEnh', text:'阳性能量在婴儿时期的原生家庭成长环境，通常有一个强势的母亲，且在婴儿时期遭遇过自己的需求时而被响应、时而被冷漠对待的母婴养育体验……因为强力抵御父母反复入侵独立自我边界，就发育出来一个比较刚硬的独立自我。', link:'https://www.bilibili.com/video/BV15MVWzGEnh?t=69'},
      {ts:'01:32', videoId:'B3', bv:'BV15MVWzGEnh', text:'所以阳性能量通常有深刻的靠自己——只有靠自己才能靠得住的信念。', link:'https://www.bilibili.com/video/BV15MVWzGEnh?t=92'}
    ],
    quote:'强势的母亲、被忽略的需求——炼出「只有靠自己才能靠得住」的男阳。',
    videoTitle:'双生通关秘籍（三）——阴阳能量的人格特质（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV15MVWzGEnh?t=69',
    compliance:'web+mini',
    shareText:'男阳不是天生能扛——是求助无果的童年教会他：只能靠自己。',
    mirror:'男阳的「只能靠自己」是哪一年学会的？代价是什么？',
    editorNotes:'总纲 y3-b1a 承重者是怎么炼成的（阶3，✅P2）；源 §3.7.1；V3.3 §2.1.1（形成原因，B3@01:09 正源）、§3.3 起源故事；证据 B3@01:09/01:32（新提取逐句核验）。'
  },
  {
    qaId:'q-y3-b1b-01', kpId:'y3-b1b', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-male'],
    question:'孤狼悖论：越要强 vs 不会求——求助为什么伤男阳的自恋',
    answerBrief:'男阳的要强与不会求是同一个根：求助 = 承认「我不行」= 自恋受伤。',
    insight:[
      '悖论结构：越要强越开不了口——求助这件事本身伤害自恋；要强是铠甲，不开口是铠甲的锁扣。',
      '求协助议：男阳即使求助也要给足面子——你要假装是请教、还要捧着他；真服气之后他效率极高、心服口服。',
      '张力气：心里早已碎掉、拼不起来了才肯求助——男阳的求助电话，往往是最后的求助电话。',
      '破局点：把「求助」重新定义为调度资源——会借力的人才是真强者。'
    ],
    evidence:[
      {ts:'00:36', videoId:'B671', bv:'BV11W836nEup', text:'对于阳来讲，寻求帮助这件事情本身会伤害到他的自恋。', link:'https://www.bilibili.com/video/BV11W836nEup?t=36'},
      {ts:'00:44', videoId:'B671', bv:'BV11W836nEup', text:'女阳会比较容易啊，男阳是最困难的。', link:'https://www.bilibili.com/video/BV11W836nEup?t=44'}
    ],
    quote:'对阳来讲，寻求帮助这件事本身会伤害他的自恋——男阳是最困难的。',
    videoTitle:'阳性的成长特点',
    jumpUrl:'https://www.bilibili.com/video/BV11W836nEup?t=36',
    compliance:'web+mini',
    shareText:'孤狼悖论：要强与不会求是同一个根——男阳的求助电话，往往是最后的求助电话。',
    mirror:'越要强越开不了口求助——你卡在哪一件具体的事上？',
    editorNotes:'总纲 y3-b1b 孤狼悖论（阶3，✅P2）；源 §3.8.1；V3.3 §3.5 内在张力、§3.11（求助伤自恋）；证据 B671@00:36/00:44（切片复用）。'
  },
  {
    qaId:'q-y3-b1c-01', kpId:'y3-b1c', stage:3, category:'四型人格', scene:['work'], forTypes:['yang-male'],
    question:'职场与冲突中的男阳：开创者与「大小王」秩序',
    answerBrief:'男阳职场是开创者与扛大梁的；需要大小王秩序，冲突第一本能是战。',
    insight:[
      '职场角色：开创者（从零破局）与扛大梁的（扛最难的活）——男阳的价值感来自「这事非我不可」的核心位置。',
      '大小王秩序：男阳扎堆必须分出大小王——家族合影里两个 C 位都要争；秩序未定，内耗不止。',
      '冲突本能：第一反应是战——直面硬刚、就事论事；赢了做事，输了记仇。',
      '协作提示：给男阳明确的目标与授权（而不是过程管控），他会把「为什么服你」变成效率。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B217', bv:'BV1EfMcz3E9F', text:'男阳会把他的方案分享给你——他在做这个方案的时候，情绪体验就是：哇靠，我这方案做得太牛逼了。他一定得分享给其他人。', link:'https://www.bilibili.com/video/BV1EfMcz3E9F?t=0'},
      {ts:'00:00', videoId:'B666', bv:'BV1Fz8i67EgE', text:'战逃反应你知道吧，就是fight or flight。阴性能量它的第一本能启动的反应就是flight，逃；阳性能量第一本能启动的就是fight，战斗。', link:'https://www.bilibili.com/video/BV1Fz8i67EgE?t=0'}
    ],
    quote:'男阳做出好方案必须分享——「我这方案做得太牛逼了」；冲突第一本能是战。',
    videoTitle:'【男阳的凡尔赛时刻】',
    jumpUrl:'https://www.bilibili.com/video/BV1EfMcz3E9F?t=0',
    compliance:'web+mini',
    shareText:'职场男阳：开创者+扛大梁，要「大小王」秩序；冲突第一本能是战——给目标别给管控。',
    mirror:'男阳在职场是开创者还是扛大梁的？他需要身边有「大小王」吗？',
    editorNotes:'总纲 y3-b1c 职场与冲突中的男阳（阶3，✅P2）；源 §3.10.5/新语料；V3.3 §3.10.1、§2.10.2（战逃）；证据 B217@00:26/B666@00:00（切片复用）。'
  },
  {
    qaId:'q-y3-b1d-01', kpId:'y3-b1d', stage:3, category:'四型人格', scene:['work','self'], forTypes:['yang-male'],
    question:'狂妄与目中无人：男阳的自恋膨胀机制',
    answerBrief:'自我过大容不下人，根是阳的自恋——健康则强，膨胀则盲。',
    insight:[
      '膨胀机制：自我本自负责任与决断；但自我无限扩张就变成「眼里没有其他人」——目中无人是自恋的溢出。',
      '代价：膨胀则盲——看不见队友的价值、听不进反对的声音；项羽式的赢不起，输一次就崩。',
      '健康线：健康则强——自恋用来扛事是资产，用来压人是负债。',
      '修正路径：削膨胀（精神层面砍掉「我必须最大」）——削完之后，阴的柔软才长得进来。'
    ],
    evidence:[
      {ts:'04:48', videoId:'B680', bv:'BV195g56xEG4', text:'目中无人的这种就是男阳哦……但是已经膨胀到了没有其他人了啊。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=288'},
      {ts:'00:32', videoId:'B669', bv:'BV1gj8w6NEHY', text:'自宫实际上是精神层面——精神层面把自己的自恋和自大膨胀的（削掉）。', link:'https://www.bilibili.com/video/BV1gj8w6NEHY?t=32'}
    ],
    quote:'目中无人就是男阳——膨胀到了没有其他人了；修法是把自恋削掉。',
    videoTitle:'男阳的终极课题【新增·v4-621】',
    jumpUrl:'https://www.bilibili.com/video/BV195g56xEG4?t=288',
    compliance:'web+mini',
    shareText:'自恋健康则强、膨胀则盲——男阳的目中无人，是自我溢出了边界。',
    mirror:'自恋健康时是强，膨胀时是盲——你上一次「看不见人」是什么时候？',
    editorNotes:'总纲 y3-b1d 狂妄与目中无人（阶3，✅P2）；源 §3.8/669；V3.3 §3.11（男阳 狂妄自大、削膨胀）、§2.1.7 装逼段位；证据 B680@04:48/B669@00:32（新提取逐句核验）。'
  },
  {
    qaId:'q-y3-b1e-01', kpId:'y3-b1e', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-male'],
    question:'男阳的独处与社交：领地与应酬',
    answerBrief:'独处是充电（复盘/规划领地），社交是能量支出——单身窗口开放、选定即关闭。',
    insight:[
      '独处 = 充电：男阳一个人的时候最自洽——安静做事、复盘、规划领地；他的独处是主动选择，不是被迫孤独。',
      '社交 = 支出：对任何接近的人都有较长观察期、下意识呈现不信任表象——慢热是默认设置。',
      '窗口逻辑：单身时机会窗口打开（对所有人友好，易被误读为海王）；选定一人即关闭窗口、一心一意。',
      '收支法则：他的社交能量收支——无效应酬大亏，目标一致的合作大赚。'
    ],
    evidence:[
      {ts:'02:37', videoId:'B3', bv:'BV15MVWzGEnh', text:'当自己单身时，机会窗口打开，所有的追求者都有机会、且都可以暧昧，为的只是看哪一个人是最终值得交往……当阳性能量选定人选后，便会关闭机会窗口，才会一心一意地对待选定的人。换句话说就是你得先值得我信任，我才放心把心交给你。', link:'https://www.bilibili.com/video/BV15MVWzGEnh?t=157'},
      {ts:'01:37', videoId:'B3', bv:'BV15MVWzGEnh', text:'在深刻的靠自己的信念支配下，阳性能量在面对他人时，通常会下意识地呈现不信任的表象，对任何接近的他人都会存在较长的观察期。', link:'https://www.bilibili.com/video/BV15MVWzGEnh?t=97'}
    ],
    quote:'单身时机会窗口打开，选定后关闭——你得先值得我信任，我才放心把心交给你。',
    videoTitle:'双生通关秘籍（三）——阴阳能量的人格特质（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV15MVWzGEnh?t=157',
    compliance:'web+mini',
    shareText:'男阳的独处是充电、社交是支出——窗口期友好不是渣，是观察期；选定即关闭。',
    mirror:'男阳独处时在干嘛？他的社交能量收支是赚是亏？',
    editorNotes:'总纲 y3-b1e 男阳的独处与社交（阶3，K4）；充电维度归 y1-11、本卡落到男阳场景；V3.3 §2.1.2/2.1.3（B3 正源）；证据 B3@02:37/01:37（v3 金句佐证+逐句核验）。'
  },
  {
    qaId:'q-y3-b1f-01', kpId:'y3-b1f', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-male'],
    question:'男阳成熟度阶梯：从青铜装逼到沉稳承重',
    answerBrief:'未觉醒全自动装逼、半觉醒知道在装停不下来、成熟态沉稳承重。',
    insight:[
      '三阶标尺：先用幼/少/老定位心智年龄（幼=巨婴、少=青少年、老=成年），再看男阳的成长阶梯。',
      '未觉醒态：全自动装逼 + 有仇必报——用外在证明填内心的「我不行」。',
      '半觉醒态：知道在装但停不下来——自我觉察上线，能力还没跟上。',
      '成熟态：沉稳承重——不装了，存在本身让人安心；装逼于无形，是阴阳平衡的王段。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B712', bv:'BV1Jo8d6qEwQ', text:'我分的是这样，把心智的成熟度分为幼阴、少阴和老阴，幼阳、少阳、老阳。幼态的这个就是心智非常的小，如果说我用心理学的话就是巨婴，他的心智还停留在婴儿时期。', link:'https://www.bilibili.com/video/BV1Jo8d6qEwQ?t=0'},
      {ts:'02:22', videoId:'B87', bv:'BV1BdjtziEHj', text:'我一说他在装逼，他就说：嗯，我只要不承认就没有。我说嗯，这就是阳的装逼，打死不承认。', link:'https://www.bilibili.com/video/BV1BdjtziEHj?t=142'}
    ],
    quote:'「我只要不承认就没有」——这就是阳的装逼，打死不承认（未觉醒态）。',
    videoTitle:'阴阳能量的三个阶段',
    jumpUrl:'https://www.bilibili.com/video/BV1Jo8d6qEwQ?t=0',
    compliance:'web+mini',
    shareText:'男阳阶梯：青铜全自动装逼 → 白银知道在装 → 沉稳承重不装——终点是存在本身让人安心。',
    mirror:'男阳从青铜装逼到沉稳承重，你现在在哪一阶？转折点是什么？',
    editorNotes:'总纲 y3-b1f 男阳成熟度阶梯（阶3，K4）；终点画像归 y5-09；V3.3 §3.6.0（幼少老标尺）、§3.9.1、§2.1.7（装逼段位 B87 正源）；证据 B712@00:00/B87@02:22（切片复用）。'
  },
  {
    qaId:'q-y3-b1g-01', kpId:'y3-b1g', stage:3, category:'四型人格', scene:['work','self'], forTypes:['yang-male'],
    question:'装逼的段位体系：10 分说成 50 分',
    answerBrief:'装逼=夸大（10分说50分），凡尔赛=如实——背后是无能恐惧的补偿。',
    insight:[
      '定义分界：装逼 = 实力十分夸大成五十分；凡尔赛 = 实力十分说十分——区别在自我认知是否清晰。',
      '动机：装逼是无能恐惧的补偿——「无能 = 不被爱」，所以要显得全知全能才配被爱。',
      '段位谱系：青铜用力夸大 → 白银装时自知 → 黄金凡尔赛 → 钻石以道装逼（存在即气场） → 王者装逼于无形（不在意怎么看）。',
      '被拆穿时：未觉醒态打死不承认（「我只要不承认就没有」）——承认装逼 = 承认无能，太难。'
    ],
    evidence:[
      {ts:'01:15', videoId:'B87', bv:'BV1BdjtziEHj', text:'装逼是什么？不是说他自己实力有这个十分，然后他把自己的实力夸大到50分、60分夸大到100分，这是一种装逼。', link:'https://www.bilibili.com/video/BV1BdjtziEHj?t=75'},
      {ts:'02:22', videoId:'B87', bv:'BV1BdjtziEHj', text:'我一说他在装逼，他就说：嗯，我只要不承认就没有。我说嗯，这就是阳的装逼，打死不承认。', link:'https://www.bilibili.com/video/BV1BdjtziEHj?t=142'}
    ],
    quote:'装逼是 10 分说成 50 分；凡尔赛是 10 分说 10 分——自我认知清不清晰，是分界线。',
    videoTitle:'【阳性的装逼段位】',
    jumpUrl:'https://www.bilibili.com/video/BV1BdjtziEHj?t=75',
    compliance:'web+mini',
    shareText:'装逼谱系：夸大→自知→凡尔赛→以道装逼→于无形——本质是自我价值从外部认可回归内在笃定。',
    mirror:'把 10 分说成 50 分的那一刻，你在怕什么？',
    editorNotes:'总纲 y3-b1g 装逼的段位体系（阶3，K4）；狂妄机制归 y3-b1d；V3.3 §2.1.7 阳性装逼的等级体系（B87 正源）；证据 B87@01:15/02:22（切片复用）。'
  },
  {
    qaId:'q-y3-b1h-01', kpId:'y3-b1h', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-male'],
    question:'撒娇 = 终极信任：男阳的柔软开关',
    answerBrief:'男阳只对通过信任认证的人撒娇——那是完全放下防御的最高级别信号。',
    insight:[
      '信号级别：男阳在嶶对方面前像西装革履的精英男，突然变成穿大裤衩的大爷、冲你撒娇要东西——这不是堕落，是阴性能量生发的外显。',
      '为什么是终极信任：外人永远看不到这一面——他只在确认「这个人不会伤害我」之后才展露；撒娇 = 通过了最高级别的信任认证。',
      '能量机制：每一次剧烈触发与吵架，在能量层面完成互换——你的阴跑到他那里，他的阳跑到你这里。',
      '常见误读：把撒娇解读为「没出息/躺平」——正好读反；那是关系安全度的晴雨表。'
    ],
    evidence:[
      {ts:'00:04', videoId:'B38', bv:'BV1GnE4zbE6b', text:'他以前感觉像一个西装革履的精英男，但他最近在我面前的表现，就感觉穿着大裤衩子的大爷……穿大裤衩子还让你看见，说明他还是比较信任你的。', link:'https://www.bilibili.com/video/BV1GnE4zbE6b?t=4'},
      {ts:'00:33', videoId:'B38', bv:'BV1GnE4zbE6b', text:'而且他会冲你撒娇要东西。阴性能量生发了呀——你们每一次剧烈的触发和吵架，在能量层面实际上是已经在进行能量的互换、互相置换。', link:'https://www.bilibili.com/video/BV1GnE4zbE6b?t=33'}
    ],
    quote:'西装革履的精英男，变成穿大裤衩子的大爷——撒娇是男阳的终极信任。',
    videoTitle:'【当阳性开始撒娇】',
    jumpUrl:'https://www.bilibili.com/video/BV1GnE4zbE6b?t=4',
    compliance:'web+mini',
    shareText:'男阳对你撒娇 = 通过了最高级别的信任认证——那是他放下全部防御的样子。',
    mirror:'男阳对谁才会撒娇？你见过那个瞬间吗？你被托付过吗？',
    editorNotes:'总纲 y3-b1h 撒娇=终极信任（阶3，K4）；信任路径归 y1-12；V3.3 §2.1.8 阳性撒娇=终极信任（B38 正源）；证据 B38@00:04/00:33（新提取逐句核验）。'
  },
  {
    qaId:'q-y3-b1i-01', kpId:'y3-b1i', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-male'],
    question:'男阳的情绪模式：堵不住的火与说不出的苦',
    answerBrief:'愤怒走外显（先忍后炸），脆弱全封存（喉轮封印）——火在外、苦在内。',
    insight:[
      '愤怒外显：情绪先过水坝——拦得住一时，拦不住一直；爆发即断崖，爆发完就抽离。',
      '脆弱封存：表达情绪 = 虚弱 = 羞耻（剧毒）——苦字到嘴边咽回去，说了就是给别人递刀。',
      '双轨并行：所以男阳的怒是「堵不住的火」，伤是「说不出的苦」——外人只看见火，看不见苦。',
      '破口在哪：只对通过信任认证的人开一条缝（撒娇/露脆弱）——疏导火要给出口，看见苦要给安全。'
    ],
    evidence:[
      {ts:'16:59', videoId:'B23', bv:'BV1qkVdzuEJa', text:'阳性能量在没有觉醒的状态下，他的喉轮是被封印的，他不知道怎么样去表达自己的情绪感受……表达自己的情绪感受是一种虚弱的表现。羞耻感对于阳性能量来讲，那简直就是剧毒的能量。', link:'https://www.bilibili.com/video/BV1qkVdzuEJa?t=1019'},
      {ts:'01:00', videoId:'B59', bv:'BV1mNJ8zFEN3', text:'阳的情绪以前就像有个水坝，它把它拦住了——它生发阴性能量，它就是那个水坝开始放水了。', link:'https://www.bilibili.com/video/BV1mNJ8zFEN3?t=60'}
    ],
    quote:'喉轮被封印——表达情绪是虚弱的表现；羞耻感对阳是剧毒。',
    videoTitle:'双生重要经验包，双生阴阳能量之间的交换（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1qkVdzuEJa?t=1019',
    compliance:'web+mini',
    shareText:'男阳的情绪：火堵在外面炸，苦咽在里面烂——疏导火给出口，看见苦给安全。',
    mirror:'男阳的火堵在哪里、苦咽在哪里？他允许谁看见？',
    editorNotes:'总纲 y3-b1i 男阳的情绪模式（阶3，K4）；喉轮封印机制归 y1-07；V3.3 §3.6.1 卡点段、§2.4.3；证据 B23@16:59/B59@01:00（复用已验证窗口）。'
  },
  {
    qaId:'q-y3-b1j-01', kpId:'y3-b1j', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-male'],
    question:'识别信号：怎么认出男阳',
    answerBrief:'事业心、不来虚的、直接、不求助——四条信号命中越多越像男阳。',
    insight:[
      '行为清单：①事业心与自我都极强；②不来虚的、直来直去、讨厌绕弯；③被冒犯先反击、边界被踩进复仇模式；④打死不求助（求助伤自恋）。',
      '关系信号：先信任再谈感情——观察期长、慢热；单身窗口开放易被误读海王，选定后一心一意。',
      '与女阳区分：男阳向「位」发力（要头狼之位、压场），女阳向「能」发力（要破局、推进事情）；男阳的强是压场，女阳的强是冲劲。',
      '与阳壳女阴区分：看内核不看外壳——压力下的第一本能（战逃）比平时的表现诚实。'
    ],
    evidence:[
      {ts:'01:12', videoId:'B680', bv:'BV195g56xEG4', text:'男阳的体现，就是他的事业心会非常强，然后他的自我也会非常强。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=72'},
      {ts:'02:15', videoId:'B217', bv:'BV1EfMcz3E9F', text:'确实男阳很爱低姿态（分享），但夸了他牛逼以后也没有觉得他很得意——就凡尔赛嘛，用低调的方式去高调的炫耀，就男阳干的事情。', link:'https://www.bilibili.com/video/BV1EfMcz3E9F?t=135'}
    ],
    quote:'男阳爱低姿态分享、夸了也不见得意——凡尔赛，用低调的方式高调炫耀。',
    videoTitle:'【男阳的凡尔赛时刻】',
    jumpUrl:'https://www.bilibili.com/video/BV1EfMcz3E9F?t=135',
    compliance:'web+mini',
    shareText:'认男阳四条：事业心、不来虚的、直接、不求助——注意与女阳（向能发力）和阳壳女阴区分。',
    mirror:'用可观察行为清单认一下男阳：哪几条命中？容易和谁混？',
    editorNotes:'总纲 y3-b1j 识别信号：怎么认出男阳（阶3，K4）；判定原理归 y8-06/07；V3.3 §3.2.1、§3.11；证据 B680@01:12/B217@02:15（切片复用）。'
  },

  // ==================== 女阳（11） ====================
  {
    qaId:'q-kp-b2-01', kpId:'kp-b2-nvyang', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-female'],
    question:'女阳画像：一往直前，但自我容易过大——战士型人格长什么样',
    answerBrief:'女阳 = 阳性内核装进女性身体：破局动能最强，课题是自我过大。',
    insight:[
      '画像内核：天生一身傲骨、独立不是她的课题——一往直前、门槛高速度快、不反复。',
      '优势面：勇敢无畏、目标明确、创造力强、兼具刚柔——女企业家、打破常规的先行者多出于此。',
      '挑战面：自我容易过大（容不下人）、与传统性别期待冲突、易被误解「太强势」；自恋比男阳小，但隔三差五想「捞」男阴。',
      '成长课题：沉下来承载——从「证明我能」到「承载他人」，战士终成灯塔。'
    ],
    evidence:[
      {ts:'04:45', videoId:'B247', bv:'BV1G384zREyi', text:'女阳是嫉妒别人能力比她强。你如果工作当中遇到有一个人实力还很强，和你不相上下，这个时候你的战斗欲就出来了——不是他死就是我活。', link:'https://www.bilibili.com/video/BV1G384zREyi?t=285'},
      {ts:'00:44', videoId:'B671', bv:'BV11W836nEup', text:'女阳会比较容易啊，男阳是最困难的——女阳她如果说遇到障碍了以后，她会比男阳更快速地去寻求帮助。', link:'https://www.bilibili.com/video/BV11W836nEup?t=44'}
    ],
    quote:'女阳战斗欲一出，不是他死就是我活——但她遇障碍比男阳更快转弯求助。',
    videoTitle:'阴阳能量嫉妒的表现',
    jumpUrl:'https://www.bilibili.com/video/BV1G384zREyi?t=285',
    compliance:'web+mini',
    shareText:'女阳 = 战士：一往直前、破局最强——课题不是独立，是把自我过大修成承载。',
    mirror:'（女阳/身边女阳）一往直前的背后，自我是不是也容易过大？',
    editorNotes:'总纲 kp-b2 女阳画像（阶3，✅KS0）；源 680/671；V3.3 §3.2.3、§3.11（女阳通病：捞人自恋驱动）；证据 B247@04:31/B671@00:44（切片复用）。'
  },
  {
    qaId:'q-y3-b2a-01', kpId:'y3-b2a', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-female'],
    question:'战士的来历：阳性内核 × 女性身体 × 社会期待的三重碰撞',
    answerBrief:'阳性内核长在女性身上，与「女人该温柔」的期待冲突——反弹出活出自己的路。',
    insight:[
      '三重结构：阳性内核（独立、要赢）+ 女性身体 + 「女人该温柔顺从」的社会期待——三者天然打架。',
      '疏离感起源：从小融不进「女孩子该做的事」，被说「太野了、像假小子」——持续接收「你做自己是错的」的信号。',
      '反弹成战士：大多数女阳选破局——不是因为它容易，而是投降更痛苦；她不是「太强势」，是在走唯一能走的路。',
      '独特馈赠：她既有阳的视角、又体验过女性处境——整合得好，是四型中最具双重视角的人。'
    ],
    evidence:[
      {ts:'00:46', videoId:'B605', bv:'BV1mNJ8zFEMv', text:'有很多这样的女阳是什么？假性大女主，就是装坚强硬撑的。内核是阴，有一个阳性能量的假面具，专业术语叫假自体。', link:'https://www.bilibili.com/video/BV1mNJ8zFEMv?t=46'},
      {ts:'01:26', videoId:'B605', bv:'BV1mNJ8zFEMv', text:'他那个壳是怎么产生的？他就是他不接纳自己的性别，要么就是他不接纳自己的脆弱，他就诞生出了一个假阳的壳。', link:'https://www.bilibili.com/video/BV1mNJ8zFEMv?t=86'}
    ],
    quote:'不接纳自己的性别或不接纳自己的脆弱——就诞生出一个假阳的壳；真女阳是活出来的，不是装出来的。',
    videoTitle:'了解阴性能量',
    jumpUrl:'https://www.bilibili.com/video/BV1mNJ8zFEMv?t=46',
    compliance:'web+mini',
    shareText:'女阳的战士内核不是装的——是阳性内核撞上「女人该温柔」后，反弹出来的活法。',
    mirror:'女阳的「活出自己」是从哪一次反弹开始的？',
    editorNotes:'总纲 y3-b2a 战士的来历（阶3，✅P2）；源 §3.7.2；阳壳误判归 y0-04/y3-b3d；V3.3 §3.2.3、§3.3 起源故事；证据 B605@00:46/01:26（切片复用，兼作真女阳 vs 阳壳辨析）。'
  },
  {
    qaId:'q-y3-b2b-01', kpId:'y3-b2b', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-female'],
    question:'灯塔悖论：破局动能最强的人，为什么停不下来',
    answerBrief:'女阳破局动能最强（不怕阻力正面刚），卡点是冲得太猛停不下来。',
    insight:[
      '动能优势：阻力在她眼里只是「需要克服的障碍」——「给我理由，能说服我就改，说服不了我就走」。',
      '悖论结构：最强的破局引擎 + 缺失的刹车——一个战役接一个战役，赢了战场、丢了自己的节奏。',
      '能量账：一往直前不反复是天赋；但「不能停」背后常是「停下来 = 我没价值」的隐性等式。',
      '修法方向：不是关掉引擎，是加装刹车——允许自己「不动」，把价值感从战果挪回存在本身。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B671', bv:'BV11W836nEup', text:'阳是一旦认定方向了以后就一往直前，阴是很容易反复，男阴女阴都是这样。阳不容易反复，直接就一往直前往前冲——他门槛高，但是他速度快。', link:'https://www.bilibili.com/video/BV11W836nEup?t=0'}
    ],
    quote:'阳认定方向就一往直前、门槛高速度快——灯塔悖论是引擎太强、刹车缺席。',
    videoTitle:'阳性的成长特点',
    jumpUrl:'https://www.bilibili.com/video/BV11W836nEup?t=0',
    compliance:'web+mini',
    shareText:'灯塔悖论：破局最强的引擎 + 缺失的刹车——女阳要学的不是停，是允许自己「不动」。',
    mirror:'破局动能最强的人为什么停不下来？刹车在哪？',
    editorNotes:'总纲 y3-b2b 灯塔悖论（阶3，✅P2）；源 §3.8.2；V3.3 §3.5 内在张力；证据 B671@00:00（逐句核验，单证卡）。'
  },
  {
    qaId:'q-y3-b2c-01', kpId:'y3-b2c', stage:3, category:'四型人格', scene:['love','work'], forTypes:['yang-female'],
    question:'社交与冲突中的女阳：做局赋能与「捞男阴」情结',
    answerBrief:'女阳爱做局（帮男阴充值自信），周期性想捞男阴——捞不动又嫌弃，本质是自恋驱动。',
    insight:[
      '做局赋能：女阳看到男阴不自信的部分，会故意设局让对方去表现、去赢——「扶你上马」是她的关系语言。',
      '捞人情结：周期性想「捞」男阴——把他从泥里拽出来；捞不动又嫌弃——本质是自恋驱动（我能改造你）。',
      '风险：局是双刃剑——对方领情是赋能，对方不接是挫败；嫌弃一出，做局变控制。',
      '觉察点：问自己「我是在帮他，还是在证明我能改造他」——前者是爱，后者是自恋。'
    ],
    evidence:[
      {ts:'00:35', videoId:'B151', bv:'BV1FvTtzUEyk', text:'女阳会看到男阴不自信的部分，然后会做一些事情，想办法去帮这个男阴充值自信。你还觉得说是不是让女阳挫败了？结果你就在女阳的局里。', link:'https://www.bilibili.com/video/BV1FvTtzUEyk?t=35'}
    ],
    quote:'女阳想办法帮男阴「充值自信」——你以为是偶然，其实你在她的局里。',
    videoTitle:'女阳喜欢扮猪吃老虎',
    jumpUrl:'https://www.bilibili.com/video/BV1FvTtzUEyk?t=35',
    compliance:'web+mini',
    shareText:'女阳的做局赋能：帮你赢是爱，证明「我能改造你」是自恋——捞不动就嫌弃，是情结不是使命。',
    mirror:'女阳捞男阴：捞得动吗？捞不动之后的嫌弃是什么？',
    editorNotes:'总纲 y3-b2c 社交与冲突中的女阳（阶3，✅P2）；源 §3.10/新语料；做局机制归 y7-10；V3.3 §3.11（女阳捞人通病）；证据 B151@00:35（切片复用，单证卡）。'
  },
  {
    qaId:'q-y3-b2d-01', kpId:'y3-b2d', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-female'],
    question:'说没事是真没事：女阳的坚强不是倒挂的试探',
    answerBrief:'女阳的「没事」= 能搞定——不是钓关心，是真的自己坚强。',
    insight:[
      '语义对照：阴的「没事」是「我有事，你快来问」；女阳的「没事」是真没事——她觉得自己能搞定。',
      '机制根源：女阳的坚强是真的——不是心里想要你去关心她、不是倒挂的试探；阳是什么就是什么。',
      '相处提示：对她「关爱轰炸」她会觉得被小看；真想帮忙，问一句「需要我做什么」比硬塞关心有效。',
      '易混辨析：同样说「没事」，先分辨底色——阳壳女阴（假性大女主）说没事时，才是话里有话。'
    ],
    evidence:[
      {ts:'00:19', videoId:'B685', bv:'BV1ghuZ66Ens', text:'女阳的这种没事啊，她不是心里面想着要你去关心她——不是倒挂了，她是真的自己坚强，觉得没事。', link:'https://www.bilibili.com/video/BV1ghuZ66Ens?t=19'},
      {ts:'00:32', videoId:'B685', bv:'BV1ghuZ66Ens', text:'不一样。嘴上说没事，但是他心里可有事了。阳这方面是什么就是什么——如果女阳说没事，那是因为她觉得我能搞定。', link:'https://www.bilibili.com/video/BV1ghuZ66Ens?t=32'}
    ],
    quote:'女阳说没事是真没事——她不是想要你去关心她，她是真的自己坚强。',
    videoTitle:'女阳说没事是真没事吗？',
    jumpUrl:'https://www.bilibili.com/video/BV1ghuZ66Ens?t=19',
    compliance:'web+mini',
    shareText:'女阳的「没事」= 能搞定——不是倒挂的试探；关爱轰炸反而让她觉得被小看。',
    mirror:'女阳说「没事」的时候，你信吗？你自己是真没事吗？',
    editorNotes:'总纲 y3-b2d 说没事是真没事（阶3，✅P2）；源 685内容；阴阳对照机制归 y2-05；V3.3 §3.11（女阳 说没事是真没事）；证据 B685@00:19/00:32（切片复用，与 y2-05 同段、视角不同）。'
  },
  {
    qaId:'q-y3-b2e-01', kpId:'y3-b2e', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-female'],
    question:'女阳的独处与社交：战场与灯塔',
    answerBrief:'独处是战场复盘（总结战术），社交是发光与掌控——她要的是影响力不是陪伴。',
    insight:[
      '独处 = 战场复盘：她一个人的时候在总结战术——「今天怼得对吗？下次怎么更聪明」；不是自责，是战后分析会。',
      '社交 = 发光与掌控：女阳在人群里要么发光（被看见），要么推进事情（掌控感）——纯聊天对她是最难的社交。',
      '充电对照：她像阳一样靠成就回流——做成一件事、赢下一仗，电量就回来。',
      '失衡信号：复盘变成自我攻击（「我怎么连这都搞不定」）——说明灯塔在烧自己的油。'
    ],
    evidence:[
      {ts:'03:25', videoId:'B497', bv:'BV1y6AuzoEuw', text:'平庸的人用热闹填补空虚，优秀的人以独处成就自己。', link:'https://www.bilibili.com/video/BV1y6AuzoEuw?t=205'},
      {ts:'01:10', videoId:'B497', bv:'BV1y6AuzoEuw', text:'叔本华说，一个人只有在自己独处的时候，才能成为真正的自己。如果他不喜欢孤独，那么他也不会热爱自由。', link:'https://www.bilibili.com/video/BV1y6AuzoEuw?t=70'}
    ],
    quote:'平庸的人用热闹填补空虚，优秀的人以独处成就自己——女阳的独处是战后分析会。',
    videoTitle:'阳性说孤独怎么办？',
    jumpUrl:'https://www.bilibili.com/video/BV1y6AuzoEuw?t=205',
    compliance:'web+mini',
    shareText:'女阳的独处是战场复盘、社交是发光与掌控——复盘变自责，说明灯塔在烧自己的油。',
    mirror:'女阳独处在复盘什么战局？社交里她要的是发光还是掌控？',
    editorNotes:'总纲 y3-b2e 女阳的独处与社交（阶3，K4）；捞人细节归 y3-b2c；V3.3 §3.9.1（独处四象）；证据 B497@03:25/01:10（切片复用）。'
  },
  {
    qaId:'q-y3-b2f-01', kpId:'y3-b2f', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-female'],
    question:'女阳成熟度阶梯：从对抗式独立到榜样式发光',
    answerBrief:'未觉醒为对抗而对抗，半觉醒有觉察停不下，成熟态成榜样引发追随。',
    insight:[
      '三阶标尺：先定位心智年龄（幼/少/老），再看女阳阶梯——对抗式独立是起点，不是终点。',
      '未觉醒态：为对抗而对抗——「你们说我不能强，我偏要强」；赢是对抗的赢，输是对抗的输。',
      '半觉醒态：知道自己停不下来、开始比男阳更快转弯求助——弹性出现。',
      '成熟态：榜样式发光——不再需要观众，却自然引发追随；她活成的样子，就是别人想活的样子。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B712', bv:'BV1Jo8d6qEwQ', text:'我分的是这样，把心智的成熟度分为幼阴、少阴和老阴，幼阳、少阳、老阳。幼态的这个就是心智非常的小，如果说我用心理学的话就是巨婴，他的心智还停留在婴儿时期。', link:'https://www.bilibili.com/video/BV1Jo8d6qEwQ?t=0'},
      {ts:'00:50', videoId:'B671', bv:'BV11W836nEup', text:'她会比男阳更快速地去寻求帮助……因为他的自恋没有那么大嘛。', link:'https://www.bilibili.com/video/BV11W836nEup?t=50'}
    ],
    quote:'女阳自恋没那么大，遇障碍比男阳更快转弯——弹性出现，就是半觉醒的标志。',
    videoTitle:'阴阳能量的三个阶段',
    jumpUrl:'https://www.bilibili.com/video/BV1Jo8d6qEwQ?t=0',
    compliance:'web+mini',
    shareText:'女阳阶梯：对抗式独立 → 有觉察的冲刺 → 榜样式发光——终点是自然引发追随。',
    mirror:'从对抗式独立到榜样式发光——你在哪一段？',
    editorNotes:'总纲 y3-b2f 女阳成熟度阶梯（阶3，K4）；终点画像归 y5-09；V3.3 §3.6.0、§3.9.2、§3.11；证据 B712@00:00/B671@00:50（切片复用+新提取核验）。'
  },
  {
    qaId:'q-y3-b2g-01', kpId:'y3-b2g', stage:3, category:'四型人格', scene:['work','self'], forTypes:['yang-female'],
    question:'扮猪吃老虎：女阳的藏锋策略',
    answerBrief:'示弱是假象、布局是真章——藏锋为降敌意，亮锋看时机。',
    insight:[
      '策略结构：在你面前呈现「弱的象」——象是假象，局是真章；猪是伪装，虎是实力。',
      '藏锋动机：降低敌意、观察局势——先让子弹飞一会儿，看清牌桌再出手。',
      '亮锋时机：局势明了、胜负手出现时一击定调——平时不显山露水，出手就在要害。',
      '与男阳对照：男阳装逼是往上抬（让面前值钱），女阳藏锋是往下伏（让对手轻敌）——同为策略，方向相反。'
    ],
    evidence:[
      {ts:'03:21', videoId:'B151', bv:'BV1FvTtzUEyk', text:'阳很喜欢扮猪吃老虎的：他在你面前呈现出来的一个弱的象，这个象是假象——都是故意示弱。', link:'https://www.bilibili.com/video/BV1FvTtzUEyk?t=201'},
      {ts:'00:16', videoId:'B151', bv:'BV1FvTtzUEyk', text:'女阳：为什么要给你惹事？不就是需要她故意示弱，让你去表现嘛，然后就完美解决了，正中下怀。我翻译一下，就是故意设了一个局。', link:'https://www.bilibili.com/video/BV1FvTtzUEyk?t=16'}
    ],
    quote:'呈现出来的弱的象是假象——都是故意示弱，正中下怀，就是故意设了一个局。',
    videoTitle:'女阳喜欢扮猪吃老虎',
    jumpUrl:'https://www.bilibili.com/video/BV1FvTtzUEyk?t=201',
    compliance:'web+mini',
    shareText:'女阳的扮猪吃老虎：示弱是假象、设局是真章——藏锋降敌意，亮锋看时机。',
    mirror:'你藏锋是为了什么？亮锋的时机你把握过吗？',
    editorNotes:'总纲 y3-b2g 扮猪吃老虎（阶3，K4）；捞人机制归 y3-b2c；V3.3 §3.13（女阳 扮猪吃老虎式布局）；证据 B151@03:21/00:16（切片复用）。'
  },
  {
    qaId:'q-y3-b2h-01', kpId:'y3-b2h', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-female'],
    question:'更快求助的柔软开关：女阳比男阳先转弯',
    answerBrief:'同是阳，女阳自恋更小——遇障碍更快转弯求助，弹性是她的隐藏优势。',
    insight:[
      '转弯差异：遇障碍女阳比男阳更快开口——因为她的自恋没有那么大；男阳要自我碎掉才肯求助。',
      '柔的估值：求助在女阳这里是「调度资源」，不是「认输」——柔软开关没被无能恐惧焊死。',
      '性别加成：她既懂阳的独立、又体验过女性被对待的方式——双重视角让她的求助姿态更自然。',
      '成长意义：更快转弯 = 更快迭代——这是女阳常能后来居上的隐藏原因。'
    ],
    evidence:[
      {ts:'00:50', videoId:'B671', bv:'BV11W836nEup', text:'她会比男阳更快速地去寻求帮助……因为他的自恋没有那么大嘛。', link:'https://www.bilibili.com/video/BV11W836nEup?t=50'},
      {ts:'00:44', videoId:'B671', bv:'BV11W836nEup', text:'女阳会比较容易啊，男阳是最困难的——女阳她如果说遇到障碍了以后，她会比男阳更快速地去寻求帮助。', link:'https://www.bilibili.com/video/BV11W836nEup?t=44'}
    ],
    quote:'女阳遇障碍比男阳更快转弯求助——因为她的自恋没有那么大。',
    videoTitle:'阳性的成长特点',
    jumpUrl:'https://www.bilibili.com/video/BV11W836nEup?t=50',
    compliance:'web+mini',
    shareText:'同是阳，女阳更快转弯求助——自恋更小，弹性更大，迭代更快。',
    mirror:'遇到障碍你比男阳更快转弯求助吗？那次转弯发生了什么？',
    editorNotes:'总纲 y3-b2h 更快求助的柔软开关（阶3，K4）；孤狼悖论对照归 y3-b1b；V3.3 §3.11、§2.7.1；证据 B671@00:50/00:44（新提取逐句核验）。'
  },
  {
    qaId:'q-y3-b2i-01', kpId:'y3-b2i', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-female'],
    question:'女阳的情绪模式：破局冲动与不会停',
    answerBrief:'愤怒外显极猛（怼人直接开战），卡点是不会停——赢完这场还有下一场。',
    insight:[
      '愤怒外显：女阳的怼极猛——技能点全点在反击上，「你搞我，我就搞你」；情绪来得快、去得也快。',
      '破局冲动：情绪常转化为行动力——别人还在生气，她已经开始调整方案再打一轮。',
      '卡点：不会停——一场仗接一场仗；停下来的空虚感，比输赢更难熬。',
      '修法：把「怼」的火力留给边界（该怼就怼），把「停」还给日常（刻意留白）——火要会放，也要会收。'
    ],
    evidence:[
      {ts:'07:45', videoId:'B60', bv:'BV1pdhwzrErv', text:'阳性能量和阳性能量，他那个天赋点了技能，点的那个技能不一样。阳性能量把技能点都点到反击上面去了——所以就是你搞我，我就搞你。', link:'https://www.bilibili.com/video/BV1pdhwzrErv?t=465'},
      {ts:'04:45', videoId:'B247', bv:'BV1G384zREyi', text:'你如果工作当中遇到有一个人实力还很强，和你不相上下，这个时候你的战斗欲就出来了——不是他死就是我活。', link:'https://www.bilibili.com/video/BV1G384zREyi?t=285'}
    ],
    quote:'阳把技能点都点到反击上——你搞我，我就搞你；女阳的怼极猛。',
    videoTitle:'了解阴性能量2',
    jumpUrl:'https://www.bilibili.com/video/BV1pdhwzrErv?t=465',
    compliance:'web+mini',
    shareText:'女阳的情绪：怼得猛、转得快、停不下——火力留给边界，留白还给日常。',
    mirror:'女阳的怼有多猛、停不下来的时候是什么样？',
    editorNotes:'总纲 y3-b2i 女阳的情绪模式（阶3，K4）；沉下来承载归 y5-t2；V3.3 §3.6.3 卡点段；证据 B60@07:45/B247@04:31（切片复用）。'
  },
  {
    qaId:'q-y3-b2j-01', kpId:'y3-b2j', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yang-female'],
    question:'识别信号：怎么认出女阳',
    answerBrief:'果断、直、扛事、说没事是真没事——四条命中越多越像女阳；当心阳壳误判。',
    insight:[
      '行为清单：①果断、不按常理出牌；②直——有话直说、不怕表达不同意见；③扛事——出事她先上；④说没事是真没事（能搞定）。',
      '关系信号：用行动证明爱、共同成长式期待——她需要被看见「真实的内在」而非外表。',
      '与男阳区分：男阳向位（压场），女阳向能（推进）；男阳更慢热、女阳更快转弯求助。',
      '与阳壳女阴区分：假性大女主平时像女阳，压力下的第一本能（逃/向内归因）会暴露内核——看第一反应，不看平时人设。'
    ],
    evidence:[
      {ts:'00:19', videoId:'B685', bv:'BV1ghuZ66Ens', text:'女阳的这种没事啊，她不是心里面想着要你去关心她——不是倒挂了，她是真的自己坚强，觉得没事。', link:'https://www.bilibili.com/video/BV1ghuZ66Ens?t=19'},
      {ts:'00:46', videoId:'B605', bv:'BV1mNJ8zFEMv', text:'有很多这样的女阳是什么？假性大女主，就是装坚强硬撑的。内核是阴，有一个阳性能量的假面具，专业术语叫假自体。', link:'https://www.bilibili.com/video/BV1mNJ8zFEMv?t=46'}
    ],
    quote:'女阳的没事是真的（能搞定）；假性大女主的没事是装的（假自体）——看第一反应分辨。',
    videoTitle:'女阳说没事是真没事吗？',
    jumpUrl:'https://www.bilibili.com/video/BV1ghuZ66Ens?t=19',
    compliance:'web+mini',
    shareText:'认女阳四条：果断、直、扛事、说没事是真没事——当心假性大女主（阳壳女阴）混进来。',
    mirror:'认女阳：果断/直/扛事/说没事——命中几条？和男阳怎么区分？',
    editorNotes:'总纲 y3-b2j 识别信号：怎么认出女阳（阶3，K4）；阳壳误判归 y3-b3d；V3.3 §3.2.3、§2.3.2；证据 B685@00:19/B605@00:46（切片复用）。'
  },

  // ==================== 女阴（11，b3d 已在 core） ====================
  {
    qaId:'q-kp-b3-01', kpId:'kp-b3-nvyin', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yin-female'],
    question:'女阴画像：把感情放第一位，最大课题是独立',
    answerBrief:'女阴 = 月亮型：感情第一、共情力强；课题是从「不配得」修出独立人格。',
    insight:[
      '画像内核：内在世界感情最重要、事业弱很多——共情力、包容力、直觉力是天赋，温暖是她的默认语言。',
      '深层驱动：不配得信念——深深相信自己不配被爱，于是用测试验证、自我牺牲式付出换安全。',
      '典型卡点：边界感弱、过度测试、受害者心态、付出记账——「作」的根源都在「我不配」。',
      '成长课题：独立人格——难度与男阳削自恋对等；修好后「以柔克刚」极强，是非常优秀的群体。'
    ],
    evidence:[
      {ts:'01:02', videoId:'B680', bv:'BV195g56xEG4', text:'女阴的内在世界，这个感情是最重要的，然后她们的事业就弱很多。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=62'},
      {ts:'00:04', videoId:'B679', bv:'BV1pdgs6MEad', text:'修炼独立人格的话有什么好的方法吗？首先就是立边界啊——阴的独立人格之所以人格不够独立，是因为他的人格的边界是千疮百孔的。', link:'https://www.bilibili.com/video/BV1pdgs6MEad?t=4'}
    ],
    quote:'女阴感情第一、事业弱很多——独立人格的修法，从立边界开始。',
    videoTitle:'如何判断阴阳能量内核属性',
    jumpUrl:'https://www.bilibili.com/video/BV195g56xEG4?t=62',
    compliance:'web+mini',
    shareText:'女阴 = 月亮：感情第一、共情力强——最大课题是独立人格，修法从立边界开始。',
    mirror:'（女阴/身边女阴）把感情放第一位之后，独立成了最大的课题？',
    editorNotes:'总纲 kp-b3 女阴画像（阶3，✅KS0）；源 680/21；V3.3 §3.2.2、§3.11（女阴 最大最难课题=独立人格）；证据 B680@01:02/B679@00:04（切片复用+新提取核验）。'
  },
  {
    qaId:'q-y3-b3a-01', kpId:'y3-b3a', stage:3, category:'四型人格', scene:['love','self'], forTypes:['yin-female'],
    question:'女阴的形成：「爱 = 自我牺牲」的程序是谁装的',
    answerBrief:'自我弱 + 重感情 + 「爱=牺牲」程序 → 讨好与反复验证的女阴模式。',
    insight:[
      '程序植入：早年被灌输「爱 = 自我牺牲」——付出才配被爱；这个程序不删，付出就永远带着交换的尾巴。',
      '结构成因：自我弱（不配得）+ 重感情（连接是氧气）——两点一连，就走向讨好与反复验证。',
      '运行表现：帮别人时比对自己上心；对方没提需要也抢着给——「我帮了他牺牲了自己」，才能感到自己有价值。',
      '卸载路径：把「付出 = 被爱」的等式改成「存在 = 被爱」——先练习为自己花一次心力。'
    ],
    evidence:[
      {ts:'03:54', videoId:'B3', bv:'BV15MVWzGEnh', text:'阴性能量内在的潜意识有深刻的不配得信念——既深刻相信自己不配真爱或者不值得被爱。', link:'https://www.bilibili.com/video/BV15MVWzGEnh?t=234'},
      {ts:'01:06', videoId:'B189', bv:'BV1EzKHzZENB', text:'因为你需要有这出戏嘛：我帮了他，我牺牲了自己，你才能够感受到你自己是有价值的。这一切都只是你自己的自我感动而已。', link:'https://www.bilibili.com/video/BV1EzKHzZENB?t=66'}
    ],
    quote:'「我帮了他、牺牲了自己」——才能感受到自己有价值：这一切只是自我感动。',
    videoTitle:'阴性缺乏边界感（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1EzKHzZENB?t=66',
    compliance:'web+mini',
    shareText:'女阴的原厂程序：爱 = 自我牺牲——删掉等式，付出才不再带交换的尾巴。',
    mirror:'「爱=自我牺牲」这个程序是谁给你装的？',
    editorNotes:'总纲 y3-b3a 连接者的形成（阶3，✅P2）；源 §3.7.3；V3.3 §3.7.3、§2.2.1（B3@03:54 正源）；证据 B3@03:54/B189@01:06（B3 新提取核验，B189 切片复用）。'
  },
  {
    qaId:'q-y3-b3b-01', kpId:'y3-b3b', stage:3, category:'四型人格', scene:['love','self'], forTypes:['yin-female'],
    question:'深情悖论：越爱越抓——付出记账与「休想跑」',
    answerBrief:'怕失去 → 付出记账 → 被抛弃开关触发 →「我为你付出那么多，休想跑」。',
    insight:[
      '链条结构：怕失去 → 用付出绑住关系 → 付出自动记账 → 关系一晃，账本翻开：「你欠我的」。',
      '记账机制：阴的付出不留痕是假象——不管真付出假付出，一并算成你欠的情感账，迟早要还。',
      '开关引爆：被抛弃恐惧一触发（对方冷淡/离开信号），记的账全部变成怨气的燃料——「软控制」由此成形。',
      '出口：把账本换成礼物（不图回报的付出才不记账）——深情要提纯，不要计息。'
    ],
    evidence:[
      {ts:'00:19', videoId:'B269', bv:'BV1ufKpeWEBg', text:'你不要以为阴付出他不记账——不管真的付出还是假的付出，一并全部算成你欠的账，你欠的情感账都要找你还的。', link:'https://www.bilibili.com/video/BV1ufKpeWEBg?t=19'},
      {ts:'00:44', videoId:'B269', bv:'BV1ufKpeWEBg', text:'那就是你觉得就是一种软控制吗？其实就觉得啊付出的时候……', link:'https://www.bilibili.com/video/BV1ufKpeWEBg?t=44'}
    ],
    quote:'不要以为阴付出不记账——情感账一并记着，迟早找你还（软控制由此成形）。',
    videoTitle:'恋爱时的“软控制”多可怕？阴性能量纠缠让你痛不欲生！',
    jumpUrl:'https://www.bilibili.com/video/BV1ufKpeWEBg?t=19',
    compliance:'web+mini',
    shareText:'深情悖论：越爱越抓、付出记账——账本翻开的那天，深情变成软控制。',
    mirror:'从怕失去到付出记账到「休想跑」——你走到过第几步？',
    editorNotes:'总纲 y3-b3b 深情悖论（阶3，✅P2）；源 269；V3.3 §3.6.2、§2.3.4（B271 抓取反效果）；证据 B269@00:19/00:44（新提取逐句核验）。'
  },
  {
    qaId:'q-y3-b3c-01', kpId:'y3-b3c', stage:3, category:'四型人格', scene:['love'], forTypes:['yin-female'],
    question:'脑内连续剧与依恋模式：女阴的戏演到第几季',
    answerBrief:'刚认识就演到三四十集——女阴的脑内连续剧是依恋焦虑的放映厅。',
    insight:[
      '放映内容：他爱不爱我、为什么不回消息、他是不是那样——脑子里的电视剧 24 小时滚动播出。',
      '剧情速度：刚认识没多久，脑内已经演到「生猴子、孩子叫什么」——片头曲刚放完，戏已到三四十集。',
      '依恋机制：连续剧是焦虑的放映厅——现实信息越少，脑补越多；脑补越多的「他不爱我」，越要用测试去验证。',
      '关机键：回到事实层（「今天他知道的事实是什么」）——剧情再长，也只演在脑子里。'
    ],
    evidence:[
      {ts:'00:10', videoId:'B21', bv:'BV1okVdzME2G', text:'他到底爱不爱我呀？他到底是喜欢我还是不喜欢我呀？他为什么不回我信息呀？——脑子里演电视剧嘛。', link:'https://www.bilibili.com/video/BV1okVdzME2G?t=10'},
      {ts:'00:23', videoId:'B21', bv:'BV1okVdzME2G', text:'就刚刚一遇见没多久，然后脑子里面已经出现和他生猴子、生了好多猴子的这个画面了。', link:'https://www.bilibili.com/video/BV1okVdzME2G?t=23'}
    ],
    quote:'刚认识没多久，脑内已经演到「生了好多猴子」——女阴的连续剧 24 小时滚动。',
    videoTitle:'阴性能量为什么会作？女阴会怎么加戏？',
    jumpUrl:'https://www.bilibili.com/video/BV1okVdzME2G?t=10',
    compliance:'web+mini',
    shareText:'女阴的脑内连续剧：现实信息越少、脑补越多——关机键是回到事实层。',
    mirror:'你脑内那部连续剧演到第几季了？男女主是谁？',
    editorNotes:'总纲 y3-b3c 脑内连续剧与依恋模式（阶3，✅P2）；源 §3.10.2/21；与 y2-07 同段异窗；V3.3 §3.10.2；证据 B21@00:10/00:23（切片复用+逐句核验）。'
  },
  {
    qaId:'q-y3-b3e-01', kpId:'y3-b3e', stage:3, category:'四型人格', scene:['love','self'], forTypes:['yin-female'],
    question:'女阴的独处与社交：连接是氧气',
    answerBrief:'独处时空落（脑内戏上头），社交中靠关系网充电——怕的不是孤独，是面对自己。',
    insight:[
      '独处体验：女阴一个人的时候容易空落——脑内戏上头、把社交互动拿出来反复回放；她的独处是审判庭，不是充电站。',
      '社交充电：深度连接是她的氧气——被理解、被倾听、关系网里的温度，都是她的电量。',
      '怕的真相：怕孤独其实是怕和自己独处——独处会照见不愿接纳的那部分自己。',
      '升级路径：练「跟自己好好待着」——独处能力越好，外部关系反而越好。'
    ],
    evidence:[
      {ts:'00:58', videoId:'B416', bv:'BV16w8JzmE7S', text:'我们每个人所谓的怕孤独，怕的真的是孤独吗？其实怕的是自己和自己独处。', link:'https://www.bilibili.com/video/BV16w8JzmE7S?t=58'},
      {ts:'02:53', videoId:'B416', bv:'BV16w8JzmE7S', text:'一个人他自己和自己相处的能力，就是独处的能力越好的话，那么他和别人的外部的关系也会变好。', link:'https://www.bilibili.com/video/BV16w8JzmE7S?t=173'}
    ],
    quote:'怕孤独，其实怕的是自己和自己独处——独处能力越好，外部关系反而越好。',
    videoTitle:'怕失去外界关系的背后',
    jumpUrl:'https://www.bilibili.com/video/BV16w8JzmE7S?t=58',
    compliance:'web+mini',
    shareText:'女阴的连接是氧气、独处是审判庭——练独处，外部关系反而变好。',
    mirror:'独处时你空落吗？你的关系网在替你挡什么？',
    editorNotes:'总纲 y3-b3e 女阴的独处与社交（阶3，K5）；依恋模式归 y3-b3c；V3.3 §3.10.3/3.10.4；证据 B416@00:58/02:53（切片复用）。'
  },
  {
    qaId:'q-y3-b3f-01', kpId:'y3-b3f', stage:3, category:'四型人格', scene:['love','self'], forTypes:['yin-female'],
    question:'女阴成熟度阶梯：从「在关系里找妈」到独立后反而会连接',
    answerBrief:'未觉醒在关系里找妈，半觉醒看见模式，成熟态独立之后反而会连接。',
    insight:[
      '三阶标尺：先定位心智年龄，再看女阴阶梯——「找妈」是起点描述，不是罪名。',
      '未觉醒态：在关系里找妈——要对方无条件接住、反复测试验证；把童年缺的安全感外包给伴侣。',
      '半觉醒态：看见自己的测试与脑内戏——开始区分「他不爱我」和「我不配感在说话」。',
      '成熟态：独立人格立起来之后，连接反而更真实——不需要依附的温暖，才是真的温暖。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B712', bv:'BV1Jo8d6qEwQ', text:'我分的是这样，把心智的成熟度分为幼阴、少阴和老阴，幼阳、少阳、老阳。幼态的这个就是心智非常的小，如果说我用心理学的话就是巨婴，他的心智还停留在婴儿时期。', link:'https://www.bilibili.com/video/BV1Jo8d6qEwQ?t=0'},
      {ts:'00:00', videoId:'B668', bv:'BV1g58w6iEiv', text:'对于阴来讲，只要把自我接纳这一关过了就会很快了。对于阴来讲，比较难的就是自我接纳。', link:'https://www.bilibili.com/video/BV1g58w6iEiv?t=0'}
    ],
    quote:'对阴来讲，把自我接纳这一关过了，后面就快了——最难的是自我接纳。',
    videoTitle:'阴阳能量的三个阶段',
    jumpUrl:'https://www.bilibili.com/video/BV1Jo8d6qEwQ?t=0',
    compliance:'web+mini',
    shareText:'女阴阶梯：在关系里找妈 → 看见测试模式 → 独立后反而会连接——第一关是自我接纳。',
    mirror:'从在关系里找妈到独立后反而会连接——你在哪一阶？',
    editorNotes:'总纲 y3-b3f 女阴成熟度阶梯（阶3，K5）；独立课题归 y5-t3；V3.3 §3.6.0、§3.9.3；证据 B712@00:00/B668@00:00（切片复用）。'
  },
  {
    qaId:'q-y3-b3g-01', kpId:'y3-b3g', stage:3, category:'四型人格', scene:['love'], forTypes:['yin-female'],
    question:'以付出换爱的日常：牺牲式付出画像',
    answerBrief:'付出=被爱的兑换券：女阴的牺牲式付出，背后是一笔不敢明说的交换账。',
    insight:[
      '日常画像：把最好的留给别人、累了自己扛；帮别人做事比对自己上心——付出是她表达存在的默认语言。',
      '交换底账：付出常出于对被抛弃的恐惧——通过付出抬高对方的「抛弃成本」，用亏欠感绑定关系。',
      '自我感动：很多付出对方根本没要——「人家要吃苹果，你给了个梨」；那是演给自己看的需要感。',
      '提纯方法：付出前问一句「这是他需要的，还是我需要的」——不图回报的付出才不记账。'
    ],
    evidence:[
      {ts:'01:21', videoId:'B255', bv:'BV1aTM3zdEix', text:'男阴会在关系里面有很多的付出，是在抬高你的抛弃成本。阴在关系里面的一些付出，是出于对被抛弃的恐惧来付出的。', link:'https://www.bilibili.com/video/BV1aTM3zdEix?t=81'},
      {ts:'00:43', videoId:'B189', bv:'BV1EzKHzZENB', text:'你帮他，他有给你提这个需要吗？没有啊。那没有提需要，你认为是在帮他就是在帮他吗？人家要吃苹果，然后你说我帮他了。', link:'https://www.bilibili.com/video/BV1EzKHzZENB?t=43'}
    ],
    quote:'出于对被抛弃的恐惧来付出，是在抬高你的抛弃成本；人家要吃苹果，你给了个梨。',
    videoTitle:'阴阳能量的金钱观',
    jumpUrl:'https://www.bilibili.com/video/BV1aTM3zdEix?t=81',
    compliance:'web+mini',
    shareText:'牺牲式付出背后有笔交换账：抬高抛弃成本、换取不被丢下——提纯它，付出才自由。',
    mirror:'你牺牲式付出的一天长什么样？背后那笔交换账你算过吗？',
    editorNotes:'总纲 y3-b3g 以付出换爱的日常（阶3，K5）；付出记账主证归 y3-b3b（本卡不引记账论点）；V3.3 §3.6.2、§3.16；证据 B255@01:21/B189@00:43（切片复用）。'
  },
  {
    qaId:'q-y3-b3h-01', kpId:'y3-b3h', stage:3, category:'四型人格', scene:['love'], forTypes:['yin-female'],
    question:'吃醋的秒杀式表达：曲折与爆发的混合形态',
    answerBrief:'女阴吃醋先阴阳怪气后爆发——醋意跨物种，表达绕三弯。',
    insight:[
      '混合形态：曲折试探（阴阳怪气）+ 情绪爆发（哭闹指责）——先绕三弯，绕不动了直接引爆。',
      '跨物种醋意：修不好时连对方的猫狗都吃醋——醋的对象是「占据你注意力的任何东西」。',
      '经典台词：「是了，我人老珠黄了，还不如一只猫在家里的地位高」——用自贬完成攻击，是女阴的独门语法。',
      '与阳组对照：阳的吃醋是直球宣示或根本不吃——阴的醋意背后，是「注意力 = 爱的度量衡」。'
    ],
    evidence:[
      {ts:'00:32', videoId:'B190', bv:'BV1Y5TuzJEin', text:'阴要吃醋，可以跨物种。如果阴还没修好的情况下——比如你养了一只猫或者养只狗，你经常的去抚摸，他连猫狗的醋都吃。', link:'https://www.bilibili.com/video/BV1Y5TuzJEin?t=32'},
      {ts:'01:53', videoId:'B190', bv:'BV1Y5TuzJEin', text:'他会怎么表达呢？阴阳怪气：是了，我已经人老珠黄了，我还不如一只猫在家里面地位高。', link:'https://www.bilibili.com/video/BV1Y5TuzJEin?t=113'}
    ],
    quote:'「我人老珠黄了，还不如一只猫在家里的地位高」——用自贬完成攻击，女阴的独门语法。',
    videoTitle:'女阴的吃醋',
    jumpUrl:'https://www.bilibili.com/video/BV1Y5TuzJEin?t=32',
    compliance:'web+mini',
    shareText:'女阴吃醋：先阴阳怪气后爆发，连猫狗的醋都吃——注意力就是她的爱的度量衡。',
    mirror:'女阴吃醋的曲折-爆发混合形态，你见过吗？',
    editorNotes:'总纲 y3-b3h 吃醋的秒杀式表达（阶3，K5）；四型对照归 y3-11、体验层归 y2-11；V3.3 §3.15；证据 B190@00:32/01:53（切片复用）。'
  },
  {
    qaId:'q-y3-b3i-01', kpId:'y3-b3i', stage:3, category:'四型人格', scene:['love','self'], forTypes:['yin-female'],
    question:'女阴的情绪模式：卷入剧情与抽不出来',
    answerBrief:'情绪上头时是剧情主角，抽不出来就硬做事——先消炎再手术。',
    insight:[
      '卷入路径：情绪一上头就变成剧情主角——全部注意力进了戏，事实层与想象层搅在一起。',
      '抽不出来的卡点：越想抽越抽不出——因为「抽离」被理解成了压抑；其实抽离不是风暴消失，是风暴卷不动你了。',
      '顺序法则：情绪过于激烈时优先处理情绪——带着一身炎症上手术台，做事必砸。',
      '练习入口：给情绪命名（「我现在在不配得发作」）——命名即拉开半步距离，半步就够转身。'
    ],
    evidence:[
      {ts:'00:15', videoId:'B663', bv:'BV1M4hG6wEfy', text:'如果说情绪过于激烈的时候，这个时候你要优先去处理情绪——不是说你情绪已经崩得不行了，然后你还要去干活，这个时候就反了。', link:'https://www.bilibili.com/video/BV1M4hG6wEfy?t=15'},
      {ts:'04:41', videoId:'B663', bv:'BV1M4hG6wEfy', text:'抽离并不是风暴消失了，是那个风暴影响不了你了，是它卷不动你了。', link:'https://www.bilibili.com/video/BV1M4hG6wEfy?t=281'}
    ],
    quote:'情绪崩了还去干活就反了；抽离不是风暴消失——是风暴卷不动你了。',
    videoTitle:'从情绪到信念',
    jumpUrl:'https://www.bilibili.com/video/BV1M4hG6wEfy?t=15',
    compliance:'web+mini',
    shareText:'女阴的情绪卷入：先消炎再手术——抽离不是没风暴，是风暴卷不动你了。',
    mirror:'你卷入剧情时谁拉过你？抽出来那一次靠什么？',
    editorNotes:'总纲 y3-b3i 女阴的情绪模式（阶3，K5）；观察者方法归 y6-05、先情绪后信念归 y6-01；V3.3 §3.6.2、§14.6；证据 B663@00:15/04:41（切片复用）。'
  },
  {
    qaId:'q-y3-b3j-01', kpId:'y3-b3j', stage:3, category:'四型人格', scene:['love','self'], forTypes:['yin-female'],
    question:'识别信号：怎么认出女阴',
    answerBrief:'细节控、贴心、反复确认、重感情——四条命中越多越像女阴；当心与男阴互混。',
    insight:[
      '行为清单：①细节控、贴心——照顾人的精度极高；②反复确认——「你在不在乎我」要反复问；③重感情轻事业——关系是她的主战场；④情绪敏感——靠情绪起伏读关系。',
      '关系信号：先投入再验证——感情给出去再回头看值不值；付出的默认语言是照顾。',
      '与男阴区分：女阴的戏演在明处（情绪、加戏），男阴的戏藏在暗处（观察、权衡）；女阴要情绪确认，男阴要暗中掌控。',
      '口令提醒：判断看内核（不配得 + 连接渴求）不看外壳——社会化面具男女都有。'
    ],
    evidence:[
      {ts:'00:54', videoId:'B680', bv:'BV195g56xEG4', text:'女阴，就是女性的阴性能量——她们的内在世界感情最重要、事业弱很多。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=54'},
      {ts:'06:22', videoId:'B22', bv:'BV17kVdzuEtE', text:'阴性能量如果说他明明想要秒回，这个时候内心戏就来了：哎呀我这样秒回会不会显得我太热情了？不行，我不能显得这么主动……', link:'https://www.bilibili.com/video/BV17kVdzuEtE?t=382'}
    ],
    quote:'明明想秒回，内心戏却是「秒回会不会显得我太热情」——女阴的反复确认写在每条消息里。',
    videoTitle:'阴性能量速看，阳性能量的性格特点（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV17kVdzuEtE?t=382',
    compliance:'web+mini',
    shareText:'认女阴四条：细节控、贴心、反复确认、重感情——和男阴的区分在「戏演在明处还是暗处」。',
    mirror:'认女阴：细节控/贴心/反复确认/重感情——命中几条？',
    editorNotes:'总纲 y3-b3j 识别信号：怎么认出女阴（阶3，K5）；判定原理归 y8-06/07；V3.3 §3.2.2、§3.6.7；证据 B680@00:54/B22@06:22（切片复用）。'
  },

  // ==================== 男阴（11） ====================
  {
    qaId:'q-kp-b4-01', kpId:'kp-b4-nanyin', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yin-male'],
    question:'男阴画像：阴性内核长在男人身上，最压抑的群体',
    answerBrief:'男阴 = 月光藏在太阳里：细腻深情却顶着阳刚规训——最压抑，也最有深度。',
    insight:[
      '画像内核：阴性内核（细腻、深情、向内深潜）长在男人身上——与「男人要阳刚」的集体规训剧烈冲突。',
      '压抑之最：所有人群里活得最压抑的群体就是男阴——他的剧本常常最惨，且惨中带着自我消耗。',
      '天赋面：天然的情感理解力——既懂阴性世界的语言，又有男性身份的视角；整合得好是最具深度与创造力的人。',
      '成长课题：温柔而坚定地行动——把敏感从劣势翻成优势，把观察力落成行动力。'
    ],
    evidence:[
      {ts:'00:10', videoId:'B122', bv:'BV1As7WzKEqp', text:'所有的人群啊——女阴、女阳、男阴、男阳，其实活得最压抑的群体就是男阴。', link:'https://www.bilibili.com/video/BV1As7WzKEqp?t=10'},
      {ts:'00:20', videoId:'B122', bv:'BV1As7WzKEqp', text:'如果说是经历惨境哈，男阴的这个体验、他的这个剧本，也确确实实是最惨的剧本。', link:'https://www.bilibili.com/video/BV1As7WzKEqp?t=20'}
    ],
    quote:'所有人群里，活得最压抑的群体就是男阴——他的剧本也确实最惨。',
    videoTitle:'男阴是最压抑的群体',
    jumpUrl:'https://www.bilibili.com/video/BV1As7WzKEqp?t=10',
    compliance:'web+mini',
    shareText:'男阴 = 月光藏在太阳里：最压抑的群体，也最有深度——课题是温柔而坚定地行动。',
    mirror:'（男阴/身边男阴）阴性内核长在男人身上，他压住了什么？',
    editorNotes:'总纲 kp-b4 男阴画像（阶3，✅KS0）；源 122/146/132；V3.3 §3.2.4、§3.11（男阴段落）；证据 B122@00:10/00:20（新提取逐句核验）。'
  },
  {
    qaId:'q-y3-b4a-01', kpId:'y3-b4a', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yin-male'],
    question:'男阴的形成：强势母亲加阴性内核的双重塑造',
    answerBrief:'强势母亲 + 阴性内核双重塑造——内缩依赖，学来的却是「爱 = 控制」。',
    insight:[
      '双重塑造：强势母亲（控制式关爱）× 阴性内核（天然向内）——他从被控制里学会爱，也学会控制。',
      '内缩方向：不向外扩张、向内深潜——把需求藏起来，把期待变成等待「有人懂我」。',
      '反弹形态：压到极限会反弹成「你必须低下来和我平起平坐」——把身边的高能量者拉成同一水位。',
      '解法方向：把「被懂」的期待换成「自懂」——先自己看见自己，深潜才会变成深度而不是深渊。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B105', bv:'BV1r1jqzNEKP', text:'男阴的原生家庭是怎样的？实际上就是男阴的家里面肯定有一个极强控制欲的妈，这个妈把男阴的这个自我搓得千疮百孔，然后情感绑架、道德勒索。', link:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0'},
      {ts:'00:16', videoId:'B105', bv:'BV1r1jqzNEKP', text:'男阴的那些套路，什么情感道德绑架、情感勒索，全是跟他妈学的。', link:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=16'},
      {ts:'00:00', videoId:'B122', bv:'BV1As7WzKEqp', text:'男阴的话，他回头想要把女阳给扯下来啊——所以你不能那么高，你必须低下来和我平起平坐，他会这样。', link:'https://www.bilibili.com/video/BV1As7WzKEqp?t=0'}
    ],
    quote:'男阴会把高能量的女阳扯下来——「你必须低下来，和我平起平坐」。',
    videoTitle:'原生家庭对男阴的影响',
    jumpUrl:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0',
    compliance:'web+mini',
    shareText:'男阴的形成：强势母亲 × 阴性内核——被控制里学会爱，也学会控制。',
    mirror:'强势母亲加阴性内核，他学来的「爱=控制」用在谁身上了？',
    editorNotes:'总纲 y3-b4a 男阴的形成（阶3，✅P2）；源 §3.7.4；V3.3 §3.7.4、§3.11；证据 B105@00:00/00:16（原生家庭对男阴的影响，新核验）+ B122@00:00（反弹形态佐证）。'
  },
  {
    qaId:'q-y3-b4b-01', kpId:'y3-b4b', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yin-male'],
    question:'尊严悖论：既权衡又心机——被揭穿时的自证',
    answerBrief:'表面占道德高地，内里一直算计；被揭穿不认账——「我不是那个意思」。',
    insight:[
      '双面结构：表面占道德高地（我是为你好/我只是想帮你），内里精于权衡——每一笔付出都在心里过秤。',
      '识破口令：只要男阴一张口说「我不是那个意思」——你就按「就是那个意思」去理解，命中率极高。',
      '猜疑投影：他把自己的算计投射给对方——你突然热情，他解读「你肯定有所图、没安好心」。',
      '破局点：尊严不是保出来的——把「被看穿 = 完蛋」换成「被看穿 = 终于轻松」，悖论才解。'
    ],
    evidence:[
      {ts:'00:37', videoId:'B185', bv:'BV1evMtzrEXA', text:'只要男阴一张口说「我不是那个意思」，你就按他就是那个意思去理解就对了。', link:'https://www.bilibili.com/video/BV1evMtzrEXA?t=37'},
      {ts:'00:50', videoId:'B185', bv:'BV1evMtzrEXA', text:'比如说他会觉得你突然一下子热情，他会觉得你肯定有所图……你肯定没安好心。', link:'https://www.bilibili.com/video/BV1evMtzrEXA?t=50'}
    ],
    quote:'男阴一张口「我不是那个意思」——你就按「就是那个意思」去理解。',
    videoTitle:'男阴的心思',
    jumpUrl:'https://www.bilibili.com/video/BV1evMtzrEXA?t=37',
    compliance:'web+mini',
    shareText:'尊严悖论：表面道德高地、内里精于算计——识破口令是那句「我不是那个意思」。',
    mirror:'表面占道德高地、内里一直算计——被揭穿时他怎么自证？',
    editorNotes:'总纲 y3-b4b 尊严悖论（阶3，✅P2）；源 185；V3.3 §3.6.4、§2.3.2（自证）；证据 B185@00:37/00:50（新提取逐句核验）。'
  },
  {
    qaId:'q-y3-b4c-01', kpId:'y3-b4c', stage:3, category:'四型人格', scene:['work','love'], forTypes:['yin-male'],
    question:'拉扯模式与职场炫技：抓住又推开，靠细节证明「我也不差」',
    answerBrief:'抓住又推开是拉扯（内耗外投），抠细节炫技是证明——两招都是低能量期的自救。',
    insight:[
      '拉扯模式：一股力量推、一股力量拉——抓住你摇晃；不是玩弄，是体内两股力量自己搞不定自己（内耗投射进关系）。',
      '职场炫技：在你面前抠细节、给互补方案——用「让你省事」证明价值，想在心里占据更大分量。',
      '炫技 ≠ 开屏：开屏是求偶展示，炫技是价值证明——动机不同，读法不同。',
      '出口：把「证明我也不差」换成「我在成长」——拉扯停止于自我接纳，不停止于更高级的表演。'
    ],
    evidence:[
      {ts:'00:10', videoId:'B186', bv:'BV1jMTXzVETW', text:'这就是拉扯，无意识的拉扯撕裂——就是一股是推、推拉的一股力量，又在扯你，又在把你推开，这种力量叫摇晃，抓住你猛烈摇晃，无意识层面的。', link:'https://www.bilibili.com/video/BV1jMTXzVETW?t=10'},
      {ts:'00:27', videoId:'B692', bv:'BV1HoMy6HE5x', text:'他会炫技，他会在你面前炫技——炫技和开屏是不一样的哦。', link:'https://www.bilibili.com/video/BV1HoMy6HE5x?t=27'}
    ],
    quote:'一股推一股拉、抓住你摇晃（拉扯）；在你面前炫技——炫技和开屏不一样。',
    videoTitle:'【男阴的拉扯摇晃】',
    jumpUrl:'https://www.bilibili.com/video/BV1jMTXzVETW?t=10',
    compliance:'web+mini',
    shareText:'男阴两招：抓住又推开（拉扯摇晃）、抠细节炫技（证明不差）——出口是自我接纳。',
    mirror:'抓住又推开、靠抠细节炫技——你身边有这个模式吗？',
    editorNotes:'总纲 y3-b4c 拉扯模式与职场炫技（阶3，✅P2）；源 692内容/683；拉扯机制归 y1-19；V3.3 §3.11（男阴 炫技段）；证据 B186@00:10/B692@00:27（切片复用+逐句核验）。'
  },
  {
    qaId:'q-y3-b4d-01', kpId:'y3-b4d', stage:3, category:'四型人格', scene:['love','work'], forTypes:['yin-male'],
    question:'高我说话不算话（花大饼机制）：情绪上头的承诺兑现不了',
    answerBrief:'情绪到位什么都承诺——那一刻是真心的，但那是情绪的真话，不是能力的边界。',
    insight:[
      '机制：情绪到那个位置时什么话都说得出来——那一刻是发自内心的真话；但「真话」是情绪的，不是能力的。',
      '花大饼结构：情绪上头 → 狂表忠心、承诺 future → 情绪退潮 → 承诺悬空 → 找理由劝退自己（「我怂我有理」）。',
      '根子：根本不愿全力以赴——承诺是买当下的安全感（留住关系/留住场面），不是给未来的契约。',
      '识别与应对：听其言更要观其行——只认落地的 10%，不认嘴上的 100%；对花大饼者，把承诺写进日历而不是心里。'
    ],
    evidence:[
      {ts:'00:11', videoId:'B694', bv:'BV1ZouA6wEKp', text:'高我说话还真不算话……她情绪到那个位置的时候，她什么话都说出来——就是人家在那一刻是发自内心的，人家就是在那一秒钟说的就是真话。', link:'https://www.bilibili.com/video/BV1ZouA6wEKp?t=11'},
      {ts:'00:35', videoId:'B694', bv:'BV1ZouA6wEKp', text:'其实这个就是跟她这个情绪起伏太大有关系——她每个阶段说的话。', link:'https://www.bilibili.com/video/BV1ZouA6wEKp?t=35'}
    ],
    quote:'情绪到那个位置，什么话都说得出来——那一刻是真话，但那是情绪的真话。',
    videoTitle:'为什么男阴的话不可信',
    jumpUrl:'https://www.bilibili.com/video/BV1ZouA6wEKp?t=11',
    compliance:'web+mini',
    shareText:'花大饼机制：情绪上头的承诺是真话——是情绪的真话，不是能力的边界；只认落地的 10%。',
    mirror:'情绪上头时的大承诺，后来兑现了几个？',
    editorNotes:'总纲 y3-b4d 高我说话不算话（阶3，✅P2）；源 694；V3.3 §3.11（男阴 花大饼）、§6.x（高我辨别）；证据 B694@00:11/00:35（新提取逐句核验）。'
  },
  {
    qaId:'q-y3-b4e-01', kpId:'y3-b4e', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yin-male'],
    question:'男阴的独处与社交：深潜与观察——为什么不轻易进场',
    answerBrief:'独处是深海（进去了不想出来），社交先观察后判断——不轻易进场。',
    insight:[
      '独处 = 深海：内心世界极其丰富（音乐、文字、想象、梦境）——他享受深潜，但进去了就很难出来，也不告诉任何人他在里面看到了什么。',
      '社交 = 先观察：不轻易进场——先「会一会」考察你的水平，服了才认；他的信任靠观察积累，不靠氛围。',
      '热情过敏：无法接受无条件的热情——成长经历里满是利益算计，突然的靠近第一解读是「你图我什么」。',
      '相处提示：给他观察期与慢热空间；强行破冰 = 确认他的猜疑。'
    ],
    evidence:[
      {ts:'02:57', videoId:'B188', bv:'BV1H6TCz8Eg5', text:'我们男阴有一个很明显的特点，就是无法接受这种无条件的热情。他的成长经历当中，他见识到的所有的人都是充满了利益、算计这些。', link:'https://www.bilibili.com/video/BV1H6TCz8Eg5?t=177'},
      {ts:'03:33', videoId:'B188', bv:'BV1H6TCz8Eg5', text:'这个时候他的那个内在恐惧又会投射出来，对他不相信——他会觉得说：肯定是他一定是图我什么，他才来靠近我的。', link:'https://www.bilibili.com/video/BV1H6TCz8Eg5?t=213'}
    ],
    quote:'男阴无法接受无条件的热情——「他一定是图我什么，才来靠近我的」。',
    videoTitle:'男阴遇见女阳的内心戏（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1H6TCz8Eg5?t=177',
    compliance:'web+mini',
    shareText:'男阴的独处是深海、社交先观察后进场——无条件热情会被他读成有所图。',
    mirror:'男阴独处在深潜什么？社交里他为什么不轻易进场？',
    editorNotes:'总纲 y3-b4e 男阴的独处与社交（阶3，K5）；拉扯模式归 y3-b4c；V3.3 §3.10.3/3.10.4、§3.11（男阴靠观察判断）；证据 B188@02:57/03:33（切片复用）。'
  },
  {
    qaId:'q-y3-b4f-01', kpId:'y3-b4f', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yin-male'],
    question:'男阴成熟度阶梯：从算计卖惨到深潜成器',
    answerBrief:'未觉醒算计与卖惨，半觉醒看见模式，成熟态深潜成器、全力以赴。',
    insight:[
      '三阶标尺：先定位心智年龄，再看男阴阶梯——算计与卖惨是低阶生存策略。',
      '未觉醒态：扎堆比惨（只跟比自己惨的人玩）、权衡心机、遇困难就找理由劝退自己。',
      '半觉醒态：看见自己的拉扯与花大饼——开始为「不全力以赴」感到羞。',
      '成熟态：深潜成器——把深海变成作品与专业；全力以赴是他补上的最后一课。'
    ],
    evidence:[
      {ts:'00:08', videoId:'B150', bv:'BV1zqTtzjEgp', text:'男阴扎在一堆的话，他们聊的话题就是互相比惨。阴性能量扎堆都喜欢互相比惨——其实阴性只跟比自己惨的人玩儿。', link:'https://www.bilibili.com/video/BV1zqTtzjEgp?t=8'},
      {ts:'00:00', videoId:'B712', bv:'BV1Jo8d6qEwQ', text:'我分的是这样，把心智的成熟度分为幼阴、少阴和老阴，幼阳、少阳、老阳……如果说我用心理学的话就是巨婴。', link:'https://www.bilibili.com/video/BV1Jo8d6qEwQ?t=0'}
    ],
    quote:'男阴扎堆互相比惨——阴性只跟比自己惨的人玩（未觉醒态的社交样式）。',
    videoTitle:'男阴喜欢卖惨，男阳喜欢装逼（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1zqTtzjEgp?t=8',
    compliance:'web+mini',
    shareText:'男阴阶梯：比惨算计 → 看见模式 → 深潜成器——最后一课是全力以赴。',
    mirror:'从算计卖惨到深潜成器——他在哪一阶？',
    editorNotes:'总纲 y3-b4f 男阴成熟度阶梯（阶3，K5）；全力以赴归 y5-t4；V3.3 §3.6.0、§3.9.4；证据 B150@00:08/B712@00:00（切片复用）。'
  },
  {
    qaId:'q-y3-b4g-01', kpId:'y3-b4g', stage:3, category:'四型人格', scene:['love','work'], forTypes:['yin-male'],
    question:'画圈战术：让你自己耗死——男阴的精准消耗',
    answerBrief:'戳你一个痛点，让你自己在圈里反复转——用极少能量让你不断投注。',
    insight:[
      '战术结构：不持续输出攻击——精准戳你一下痛点，然后看你自己在圈里反复转、自己耗自己。',
      '为什么阴吃这套：痛点即不配得感的入口——被戳中的人用自我怀疑喂养那个圈，越转越紧。',
      '为什么阳也吃这套：阳的不认输让他不能离场——「我偏要转出去」的执念，正好完成了对手的布局。',
      '破解：识别「我在转圈」的那一刻就是出口——不接招、直接离场；你的离场，就是圈的坍塌。'
    ],
    evidence:[
      {ts:'01:38', videoId:'B42', bv:'BV1j3E4zvEJp', text:'男阴不是会耗你，男阴是直接给你戳一下子后，让你自己耗自己——他知道戳你哪个点能够让你自己好痛。', link:'https://www.bilibili.com/video/BV1j3E4zvEJp?t=98'},
      {ts:'01:50', videoId:'B42', bv:'BV1j3E4zvEJp', text:'给你画个圈，然后你在这个圈里面不停的转转转转转，你自己把自己消耗死啊。', link:'https://www.bilibili.com/video/BV1j3E4zvEJp?t=110'}
    ],
    quote:'男阴戳你一下让你自己耗自己——他知道戳你哪个点最痛；画个圈，你自己把自己消耗死。',
    videoTitle:'阳性的攻击方式',
    jumpUrl:'https://www.bilibili.com/video/BV1j3E4zvEJp?t=98',
    compliance:'web+mini',
    shareText:'画圈战术：戳一个痛点，让你自己转、自己耗——识别「我在转圈」的那一秒，圈就塌了。',
    mirror:'画圈的手法（拖/绕/耗）你见过或用过吗？为什么阳吃这一套？',
    editorNotes:'总纲 y3-b4g 画圈战术（阶3，K4/K5）；金刚道菩萨道归 y1-22；V3.3 §2.7.6（B42 正源，主语 ASR 疑误已按上下文校正）；证据 B42@01:38/01:50（与 qa_core y1-13 同源异窗）。'
  },
  {
    qaId:'q-y3-b4h-01', kpId:'y3-b4h', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yin-male'],
    question:'卑微与高姿态切换：他在保卫什么',
    answerBrief:'卑微是钓饵（勾出你的愧疚），高姿态是防线（守住最后尊严）——切换点暴露真实需求。',
    insight:[
      '两种姿态：卑微模式（卖惨、装可怜、自我贬低）与高姿态模式（冷淡、端着、「是你要不是我」）——同一个人轮流出场。',
      '卑微的功能：勾出你的圣母心与愧疚感——「我都这样了你还不让我」；付出与让步由此榨出。',
      '高姿态的功能：守住最后的尊严线——被揭穿、被轻视时立刻切换，用冷与傲把伤口盖住。',
      '识别点：切换的瞬间就是需求暴露的瞬间——他要的从来不是姿态，是「被在乎」的证据。'
    ],
    evidence:[
      {ts:'00:26', videoId:'B185', bv:'BV1evMtzrEXA', text:'男阴就会这样——他们那个理由借口到什么程度……他的新的怂人理由极有可能是：他这么主动热情，他不会是图我什么吧？', link:'https://www.bilibili.com/video/BV1evMtzrEXA?t=26'}
    ],
    quote:'男阴的理由和借口是有体系的——卑微与高姿态之间，藏着「被在乎」的渴望。',
    videoTitle:'男阴的心思',
    jumpUrl:'https://www.bilibili.com/video/BV1evMtzrEXA?t=26',
    compliance:'web+mini',
    shareText:'卑微是钓饵、高姿态是防线——男阴的切换点，暴露他真正想保卫的东西。',
    mirror:'卑微和高姿态的切换发生在什么时刻？他在保卫什么？',
    editorNotes:'总纲 y3-b4h 卑微与高姿态切换（阶3，K5）；源 146/185 异窗口（146 未取到贴题原文，单证卡+知识库整理）；尊严悖论归 y3-b4b；V3.3 §3.6.4；证据 B185@00:26（新提取核验）。'
  },
  {
    qaId:'q-y3-b4i-01', kpId:'y3-b4i', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yin-male'],
    question:'男阴的情绪模式：压进去的与咽下去的——最后从哪儿漏出来',
    answerBrief:'情绪全内消化（内攻击），积压到极限从关系里漏——拉扯、心机、身体化。',
    insight:[
      '封存路径：回避型——自己情绪自己消化、直接内攻击；「没事」是男阴的出厂话术。',
      '积压的去向：咽下去的情绪不会消失——变成拉扯（推了又拉）、心机（迂回表达）、身体（易疲劳）。',
      '内攻击机制：但凡能内耗的绝不耗别人——把 50% 的能量拿来跟另外 50% 打架（左右手互搏）。',
      '解压阀：把「消化」升级为「表达」——写出来、说出来、动出来；内攻击改外表达，深海才能通气。'
    ],
    evidence:[
      {ts:'16:49', videoId:'B23', bv:'BV1qkVdzuEJa', text:'男阴他们是回避型，他就是自己情绪自己消化，就内攻击。', link:'https://www.bilibili.com/video/BV1qkVdzuEJa?t=1009'},
      {ts:'00:58', videoId:'B44', bv:'BV1cSJAzLEKb', text:'阴性能量本身不是没有能量，而是它把自己的能量都用来自己和自己左右手互搏了——他拿自己 50% 的能量和自己另外 50% 的能量对抗冲突、耗损，能量当然就没有了。', link:'https://www.bilibili.com/video/BV1cSJAzLEKb?t=58'}
    ],
    quote:'男阴是回避型——自己情绪自己消化，直接内攻击；左右手互搏，能量自耗。',
    videoTitle:'双生重要经验包，双生阴阳能量之间的交换（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1qkVdzuEJa?t=1009',
    compliance:'web+mini',
    shareText:'男阴的情绪：全压进去、咽下去、内攻击——内耗改表达，深海才通气。',
    mirror:'男阴压进去的情绪最后从哪儿漏出来？',
    editorNotes:'总纲 y3-b4i 男阴的情绪模式（阶3，K5）；最压抑群体归 kp-b4；V3.3 §3.6.4 卡点段、§2.3.3（2）；证据 B23@16:49/B44@01:09（切片复用）。'
  },
  {
    qaId:'q-y3-b4j-01', kpId:'y3-b4j', stage:3, category:'四型人格', scene:['self','love'], forTypes:['yin-male'],
    question:'识别信号：怎么认出男阴',
    answerBrief:'细节控、权衡、先观察、心机——四条命中越多越像男阴；与女阴的区分在明暗。',
    insight:[
      '行为清单：①细节控（抠细节、给互补方案）；②权衡——凡事过秤、动作前先算；③先观察后进场——服了才认；④心机——迂回表达、铺垫布局。',
      '氛围营造：营造「我多不容易还为你付出」的叙事——用亏欠感换在乎。',
      '与女阴区分：女阴的戏在明处（情绪、加戏、哭闹），男阴的戏在暗处（观察、权衡、冷处理）；女阴求情绪确认，男阴求暗中掌控。',
      '与男阳区分：男阳靠实力共鸣（服强），男阴靠独立观察（会一会你，考察完才认）。'
    ],
    evidence:[
      {ts:'00:27', videoId:'B692', bv:'BV1HoMy6HE5x', text:'他会炫技，他会在你面前炫技——炫技和开屏是不一样的哦。', link:'https://www.bilibili.com/video/BV1HoMy6HE5x?t=27'},
      {ts:'00:00', videoId:'B255', bv:'BV1aTM3zdEix', text:'男阴会有一种营造，他会营造出一种氛围：他给你花这个钱有多么的不容易、多么的艰难，他才这么窘迫穷困潦倒的情况下，还愿意掏空。', link:'https://www.bilibili.com/video/BV1aTM3zdEix?t=0'}
    ],
    quote:'男阴会在你面前炫技（炫技和开屏不一样）；营造「多不容易还为你花钱」的氛围。',
    videoTitle:'男阴在女阳面前证明自己的方式',
    jumpUrl:'https://www.bilibili.com/video/BV1HoMy6HE5x?t=27',
    compliance:'web+mini',
    shareText:'认男阴四条：细节控、权衡、先观察、心机——和女阴的区分在戏演明处还是暗处。',
    mirror:'认男阴：细节控/权衡/先观察/心机——命中几条？和女阴怎么分？',
    editorNotes:'总纲 y3-b4j 识别信号：怎么认出男阴（阶3，K5）；男阴靠观察判断归 y8-07；V3.3 §3.6.7、§3.11、§13.3；证据 B692@00:27/B255@00:00（逐句核验+切片复用）。'
  },

  // ==================== 阶5 平衡与修行（10） ====================
  {
    qaId:'q-kp-a1-balance-01', kpId:'kp-a1-balance', stage:5, category:'阴阳能量', scene:['self','love','work'], forTypes:[],
    question:'阴阳平衡：偏废则两害——光自强自我毁灭，光厚德困在原地',
    answerBrief:'只有乾德（自强）会刚极易折，只有坤德（厚德）会困在原地——两德齐修才成平衡。',
    insight:[
      '偏废之害（阳侧）：光自强不息、修到膨胀没有别人——刚极易折，过刚必断；阳极处必生阴来平衡。',
      '偏废之害（阴侧）：光厚德载物、无边界地包容——困在原地、被关系吞没；阴极处必生阳来破局。',
      '平衡本义：不是五五开的配比，而是两德都在场——乾德给边界与方向，坤德给承载与连接。',
      '自查：你此刻的坑在哪一边——是「赢不了就崩」的刚，还是「忍到内伤」的柔？坑在哪，修行就在哪。'
    ],
    evidence:[
      {ts:'01:02', videoId:'B160', bv:'BV1hzNEzTEra', text:'他最后要走到哪呢？他还得发展出来一些阴的东西来平衡这个阳——最终他走向这个平衡，比如说像那个火车终点站都是叫阴阳平衡站。', link:'https://www.bilibili.com/video/BV1hzNEzTEra?t=62'},
      {ts:'05:04', videoId:'B680', bv:'BV195g56xEG4', text:'他修厚德载物，他修德啊，修坤德；而阴性能量的话，他就要去修这个自强啊，修这个乾德。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=304'}
    ],
    quote:'阳修坤德、阴修乾德——光自强会毁灭，光厚德会困在原地。',
    videoTitle:'双火阴阳平衡的终点站',
    jumpUrl:'https://www.bilibili.com/video/BV1hzNEzTEra?t=62',
    compliance:'web+mini',
    shareText:'偏废则两害：光自强自我毁灭、光厚德困在原地——你的坑在哪边，修行就在哪边。',
    mirror:'光自强会自我毁灭、光厚德会困在原地——你现在偏向哪边的坑？',
    editorNotes:'总纲 kp-a1-balance 阴阳平衡：偏废则两害（阶5，✅KS0；总纲源 346/329 与「偏废」主题贴题不足，改用已核验的 B160/B680 平衡正源）；V3.3 §1.6 宇宙平衡律、§2.3.4；证据 B160@01:02/B680@05:04（逐句核验）。'
  },
  {
    qaId:'q-y5-06-01', kpId:'y5-06', stage:5, category:'阴阳能量', scene:['self'], forTypes:[],
    question:'阴极生阳，阳极生阴：人格层面的转化与触发条件',
    answerBrief:'男阳崩塌后偷偷哭是生发阴，阴被逼到底反弹攻击性是生发阳——极点是转化的门。',
    insight:[
      '转化的显形：男阳变阴会偷偷哭（生发阴性能量）；阴被逼到极限爆发攻击性（生发阳性能量）——转化不在嘴上，在身体和行动上。',
      '触发条件：转化不由意志直接下令，由「极点」触发——三维崩塌（阳）、苦头吃够（阴）。',
      '成长的标志：阴直面课题不逃了，就是开始生阳；阳允许脆弱出现了，就是开始生阴——哭不是退步，是通道打开。',
      '警惕误读：把偷偷哭当成「崩溃」、把爆发攻击性当成「变坏」——那都是单极运行到头后，生命自带的纠偏。'
    ],
    evidence:[
      {ts:'01:33', videoId:'B59', bv:'BV1mNJ8zFEN3', text:'男阳变阴也会偷偷哭吗？会啊，它叫生发阴性能量。', link:'https://www.bilibili.com/video/BV1mNJ8zFEN3?t=93'},
      {ts:'00:56', videoId:'B667', bv:'BV1d28i6rEVF', text:'当一个阴开始不再自我逃避、不再自我欺骗的时候，他就进入到快速成长通道了——因为你开始生发阳性能量了。不逃、直面，这是阳性能量。', link:'https://www.bilibili.com/video/BV1d28i6rEVF?t=56'}
    ],
    quote:'男阳偷偷哭是生发阴；阴不再逃、直面课题是生阳——极点是转化的门。',
    videoTitle:'如何收割男阳自恋',
    jumpUrl:'https://www.bilibili.com/video/BV1mNJ8zFEN3?t=93',
    compliance:'web+mini',
    shareText:'阴极生阳、阳极生阴：偷偷哭是通道打开，直面是生阳开始——转化由极点触发，不由意志下令。',
    mirror:'你见过「阳极生阴」的真实例子吗（硬汉偷偷哭那种）？触发条件是什么？',
    editorNotes:'总纲 y5-06 阴极生阳，阳极生阴（阶5，K8）；转化律归 y1-24（本卡讲人格层转化）；V3.3 §1.7.1（生发路径）、§2.3.3；证据 B59@01:33/B667@00:56（切片复用）。'
  },
  {
    qaId:'q-y5-07-01', kpId:'y5-07', stage:5, category:'阴阳能量', scene:['self','love'], forTypes:[],
    question:'动态平衡：不是静态 50/50——失衡到再平衡的周期',
    answerBrief:'平衡是过程不是配比：失衡→识别→接纳→清理→转化→再平衡，周期循环螺旋上升。',
    insight:[
      '平衡的本义：不是修成 50% 阳 + 50% 阴，而是两种能量都发育成熟、可以灵活调用——关键是切换的灵活度。',
      '失衡不是退步：旧模式卷土重来（又说了「没事」）、比例急剧偏移、身体抗议——都是周期的一部分，不是修行的失败。',
      '周期路径：失衡 → 识别（我又在 XX 了）→ 接纳（看见了，不自责）→ 清理（背后是什么信念）→ 转化 → 再平衡——每走一轮，下一轮来得更浅、去得更快。',
      '修行的真相：不是永远不再失衡，而是失衡幅度越来越小、回归速度越来越快。'
    ],
    evidence:[
      {ts:'02:27', videoId:'B663', bv:'BV1M4hG6wEfy', text:'阴要走向阴阳平衡，最好的最快速的方式是生发自己内在的阳性能量，去和自己的阴性能量平衡。', link:'https://www.bilibili.com/video/BV1M4hG6wEfy?t=147'},
      {ts:'00:37', videoId:'B100', bv:'BV1UWjdzwEUJ', text:'双方不同的比例，最终都是要达到一个无极的平衡。', link:'https://www.bilibili.com/video/BV1UWjdzwEUJ?t=37'}
    ],
    quote:'生发内在的对侧能量去平衡——不同比例，最终都要走向无极的平衡。',
    videoTitle:'从情绪到信念',
    jumpUrl:'https://www.bilibili.com/video/BV1M4hG6wEfy?t=147',
    compliance:'web+mini',
    shareText:'动态平衡不是 50/50：失衡→识别→接纳→清理→再平衡——每走一轮，失衡更浅、回归更快。',
    mirror:'你的平衡是静态配比还是动态过程？你现在处于失衡还是再平衡？',
    editorNotes:'总纲 y5-07 动态平衡（阶5，K8）；偏废机制归 kp-a1-balance；V3.3 §1.7.2 动态平衡（1.7.5 失衡→再平衡周期）；证据 B663@02:27/B100@00:37（逐句核验）。'
  },
  {
    qaId:'q-y5-02-01', kpId:'y5-02', stage:5, category:'阴阳能量', scene:['self','love'], forTypes:[],
    question:'阳修坤德，阴修乾德——互补修行的总纲',
    answerBrief:'阳补厚德（承载与柔软），阴补自强（边界与行动）——各修对侧，同赴平衡。',
    insight:[
      '修行总纲：阳的课题是修坤德——厚德载物、承载与柔软；阴的课题是修乾德——自强不息、边界与行动。',
      '为什么是对方：单极到不了圆满——阳的光杆司令缺连接，阴的无边连接缺主心骨；对侧能量就是解药。',
      '难度对等：阴修独立人格的难度 = 阳削自恋的难度——没有谁的功课更容易，只有谁的坑更深。',
      '验收标准：阳修好了是「强而不压」，阴修好了是「柔而不塌」——两句话，各自的终点画像。'
    ],
    evidence:[
      {ts:'04:57', videoId:'B680', bv:'BV195g56xEG4', text:'已经膨胀到了没有其他人了啊——所以这种阳性能量他要修行的课题是什么？他修厚德载物，他修德啊，修坤德；而阴性能量的话，他就要去修这个自强啊，修这个乾德。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=297'},
      {ts:'00:10', videoId:'B669', bv:'BV1gj8w6NEHY', text:'你把自己从阳修到阴的话，你觉得最难的地方是在哪？精神层面上阉割掉自己的男性身份——这是最难的哦。', link:'https://www.bilibili.com/video/BV1gj8w6NEHY?t=10'}
    ],
    quote:'阳修坤德（厚德载物），阴修乾德（自强不息）——各修对侧，同赴平衡。',
    videoTitle:'男阳的终极课题【新增·v4-621】',
    jumpUrl:'https://www.bilibili.com/video/BV195g56xEG4?t=297',
    compliance:'web+mini',
    shareText:'互补修行总纲：阳修坤德、阴修乾德——阳修好了强而不压，阴修好了柔而不塌。',
    mirror:'你在修对侧能量吗？修的是坤德还是乾德？',
    editorNotes:'总纲 y5-02 阳修坤德，阴修乾德（阶5，✅P3）；源 680@05:04；细目归 y5-11/y5-12；V3.3 §2.3.4 阴阳平衡·整合的动力学；证据 B680@04:57/B669@00:10（逐句核验）。'
  },
  {
    qaId:'q-y5-11-01', kpId:'y5-11', stage:5, category:'成长课题', scene:['love','self'], forTypes:[],
    question:'阳修坤德细目：示弱、表达、承接——阳侧三件套',
    answerBrief:'示弱（允许脆弱）、表达（解封喉轮）、承接（接住他人情绪）——阳的修行操作化。',
    insight:[
      '示弱：在最信任的人面前展露「我不行」——撒娇与露脆弱不是堕落，是通过信任认证后的能量生发。',
      '表达：解封喉轮——把「没事」升级成「我难受」；从直接爆炸到阴阳怪气再到如实表达，是三级跳。',
      '承接：接得住别人的情绪倾倒——阴倾倒的不是攻击，是「请接住我」；接住即生阴。',
      '次序建议：先在安全关系里练示弱，再练日常表达，最后练承接——倒过来练容易二次受伤。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B79', bv:'BV1cejJzSEV6', text:'阳只会在他识别到他向你展现他的脆弱的时候，是会被你接纳、被你支持、被你滋养的情况下，他才会向你展示他的脆弱。', link:'https://www.bilibili.com/video/BV1cejJzSEV6?t=0'},
      {ts:'00:37', videoId:'B38', bv:'BV1GnE4zbE6b', text:'阴性能量生发了呀——你们每一次剧烈的触发和吵架，在能量层面实际上是已经在进行了能量的互换、互相置换。', link:'https://www.bilibili.com/video/BV1GnE4zbE6b?t=37'}
    ],
    quote:'阳只在确认「展露脆弱会被接纳」后才会示弱——承接与示弱，都是生阴的通道。',
    videoTitle:'阳性只会在信任的人面前展示自己的脆弱',
    jumpUrl:'https://www.bilibili.com/video/BV1cejJzSEV6?t=0',
    compliance:'web+mini',
    shareText:'阳侧三件套：示弱、表达、承接——先在安全关系里练，倒序容易二次受伤。',
    mirror:'示弱/表达/承接——阳侧三件套，你最缺哪件？',
    editorNotes:'总纲 y5-11 阳修坤德细目（阶5，K8）；引 y5-02 不重述定义；V3.3 §1.7.1（阳生阴路径）、§2.1.8（撒娇）；证据 B79@00:00/B38@00:37（切片复用+逐句核验）。'
  },
  {
    qaId:'q-y5-03-01', kpId:'y5-03', stage:5, category:'成长课题', scene:['self','love'], forTypes:[],
    question:'自我接纳：阴的第一关——这关过了，后面就快了',
    answerBrief:'自我接纳是阴最难的关口，也是最快的通道——接纳能力可习得。',
    insight:[
      '为什么是第一关：阴的核心卡点是不配得——不接纳自己，「生发阳」的一切练习都会被「我不配」反向攻击。',
      '过了就快：自我接纳一过，边界、拒绝、攻击性、行动力全都顺了——因为练习不再内战。',
      '可习得性：接纳是一种能力——只要是能力就可以练习；它不是天赋，是训练。',
      '练习入口：从「承认」开始——「我现在就是不配得发作了」；承认即接纳的第一步，反驳自己只会更深。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B668', bv:'BV1g58w6iEiv', text:'对于阴来讲，只要把自我接纳这一关过了就会很快了。对于阴来讲，比较难的就是自我接纳。', link:'https://www.bilibili.com/video/BV1g58w6iEiv?t=0'},
      {ts:'00:58', videoId:'B668', bv:'BV1g58w6iEiv', text:'只要是能力就是可以习得的，就可以练习的——对于阴来讲只要把自我接纳这一关过了，就会很快了。', link:'https://www.bilibili.com/video/BV1g58w6iEiv?t=58'}
    ],
    quote:'对阴来讲，自我接纳这一关过了就会很快——接纳是能力，能力就可以练习。',
    videoTitle:'女阴的课题难点',
    jumpUrl:'https://www.bilibili.com/video/BV1g58w6iEiv?t=0',
    compliance:'web+mini',
    shareText:'自我接纳是阴的第一关：过了就全顺——它不是天赋，是可以练习的能力。',
    mirror:'自我接纳为什么是阴的第一关？你过关了吗？',
    editorNotes:'总纲 y5-03 自我接纳：阴的第一关（阶5，✅P3）；源 668；V3.3 §9.1 爱自己、§3.6.2；证据 B668@00:00/00:58（切片复用）。'
  },
  {
    qaId:'q-y5-04-01', kpId:'y5-04', stage:5, category:'成长课题', scene:['self','work'], forTypes:[],
    question:'卸面具，不是内化面具——买车还要养车的能量账',
    answerBrief:'面具创建耗能、维持也耗能（买车+养车）；要卸不要内化——内化=面具长进肉里。',
    insight:[
      '能量账：创造一个面具要耗能（买车），维持它还要持续耗能（养车）——假自体是每月固定支出的能量黑洞。',
      '卸 ≠ 内化：卸面具是回收能量；内化是面具与肉长在一起（把人设活成以为的自己）——后者更难剥离。',
      '误判警报：以为外壳已经很阳了，里面还藏着不独立的部分——面具卸到内层时最像「已经好了」。',
      '正确做法：一点点卸、一层层认——每卸一层，能量回流一截；卸下来的不是缺点，是你借出去的自己。'
    ],
    evidence:[
      {ts:'01:26', videoId:'B605', bv:'BV1mNJ8zFEMv', text:'他那个壳是怎么产生的？他就是他不接纳自己的性别，要么就是他不接纳自己的脆弱，他就诞生出了一个假阳的壳。', link:'https://www.bilibili.com/video/BV1mNJ8zFEMv?t=86'},
      {ts:'00:43', videoId:'B679', bv:'BV1pdgs6MEad', text:'有的时候以为自己在外壳上已经很阳了，但实际上里面还有一些隐藏的不独立的地方——这就是要修内在。', link:'https://www.bilibili.com/video/BV1pdgs6MEad?t=43'}
    ],
    quote:'以为外壳已经很阳了，里面还藏着不独立的部分——面具卸到内层时，最像「已经好了」。',
    videoTitle:'了解阴性能量',
    jumpUrl:'https://www.bilibili.com/video/BV1pdgs6MEad?t=43',
    compliance:'web+mini',
    shareText:'面具买车+养车都在耗能——要卸不要内化；卸到内层时最像好了，那正是最后一层。',
    mirror:'你的面具「买车+养车」每月烧多少能量？卸下来一天试试会怎样？',
    editorNotes:'总纲 y5-04 卸面具，不是内化面具（阶5，✅P3）；源 679；假自体理论归 y8-01；V3.3 §5.2（假自体）、§3.11（女阴 面具能量学）；证据 B605@01:26/B679@00:43（切片复用+新提取核验）。'
  },
  {
    qaId:'q-y5-09-01', kpId:'y5-09', stage:5, category:'成长课题', scene:['self','work','love'], forTypes:[],
    question:'平衡态画像：修好了是什么样——四型的终点像',
    answerBrief:'阳修好了强而不压、装逼于无形；阴修好了柔而不塌、独立后反而会连接。',
    insight:[
      '男阳终点像：削掉膨胀、沉稳承重——不装了，存在本身让人安心；装逼修到大师级，就是很平衡。',
      '女阳终点像：沉下来承载——从战士成灯塔，不需要观众却引发追随。',
      '女阴终点像：独立人格立起来、以柔克刚——不再依附的温暖才是真温暖，连接反而更真实。',
      '男阴终点像：深潜成器、全力以赴、温柔而坚定——敏感翻成优势，深海产出作品。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B669', bv:'BV1gj8w6NEHY', text:'男阳修好了大概是一个什么样的状态呢？阴阳平衡。', link:'https://www.bilibili.com/video/BV1gj8w6NEHY?t=0'},
      {ts:'01:44', videoId:'B87', bv:'BV1BdjtziEHj', text:'其实阳的装逼如果到大师级了，他就很平衡了——只有很平衡，才能够装逼到大师级。', link:'https://www.bilibili.com/video/BV1BdjtziEHj?t=104'}
    ],
    quote:'阳的装逼修到大师级，他就很平衡了——只有很平衡，才能装逼到大师级。',
    videoTitle:'男阳的终极课题【新增·v4-621】',
    jumpUrl:'https://www.bilibili.com/video/BV1gj8w6NEHY?t=0',
    compliance:'web+mini',
    shareText:'四型终点像：强而不压、发光不灼、柔而不塌、深而不藏——修好了，都是平衡的样子。',
    mirror:'给四型各画一张「修好了」的终点像——你现在离哪张最近？',
    editorNotes:'总纲 y5-09 平衡态画像（阶5，K8）；阶梯全程归各型 f 槽位卡；V3.3 §3.9（成熟态）、§3.11；证据 B669@00:00/B87@01:44（新提取逐句核验）。'
  },
  {
    qaId:'q-y5-10-01', kpId:'y5-10', stage:5, category:'成长课题', scene:['self','love'], forTypes:[],
    question:'生发对侧能量：双向修行菜单——今天先练哪一项',
    answerBrief:'阴练阳刚三件套，阳练阴柔三件套——对侧能量是肌肉不是觉悟。',
    insight:[
      '总原则：生发对侧不是「变成对方」，是获得在需要时调用对侧的能力——单点练起，不必全面开战。',
      '阴的菜单：①立边界（学会拒绝，怼回去也算）；②释放攻击性（被打压必须回击）；③直面（不逃、不转移注意力）。',
      '阳的菜单：①柔软（允许自己不行一次）；②表达（把「没事」换成真实感受）；③承接（听完别人的情绪再给方案）。',
      '启动建议：今天挑一项练 10 分钟——对侧能量是肌肉，不是觉悟；一次一项，比立志全改有效一百倍。'
    ],
    evidence:[
      {ts:'01:21', videoId:'B667', bv:'BV1d28i6rEVF', text:'阴阳平衡最好的、最快速的方式是生发自己内在的阳性能量，去和自己的阴性能量平衡。', link:'https://www.bilibili.com/video/BV1d28i6rEVF?t=81'},
      {ts:'00:34', videoId:'B271', bv:'BV1AAf6YgEP1', text:'拒绝——其实恰恰是建立在充分尊重自己的基础之上的。拒绝恰恰是充分的尊重自己。', link:'https://www.bilibili.com/video/BV1AAf6YgEP1?t=34'}
    ],
    quote:'生发内在的对侧能量，是最快的平衡方式；拒绝恰恰是充分的尊重自己。',
    videoTitle:'阴性能量的三个阶段',
    jumpUrl:'https://www.bilibili.com/video/BV1d28i6rEVF?t=81',
    compliance:'web+mini',
    shareText:'双向修行菜单：阴练边界/反击/直面，阳练柔软/表达/承接——一次一项，各练 10 分钟。',
    mirror:'对侧能量菜单上，哪一项你今天就能练 10 分钟？',
    editorNotes:'总纲 y5-10 生发对侧能量：双向修行菜单（阶5，K8）；源 667@01:21/§2.6.x；V3.3 §1.7.1（阴生阳/阳生阴路径表）；证据 B667@01:21/B271@00:34（新提取逐句核验）。'
  },
  {
    qaId:'q-y5-05-01', kpId:'y5-05', stage:5, category:'成长课题', scene:['self'], forTypes:[],
    question:'情执与无我：「有我」才有情执——通向高阶的桥卡',
    answerBrief:'有缺失就有情执，有「我」才有情执——修到完整，情执自然松动（仅网页）。',
    insight:[
      '情执的根：只要有缺失就会有情执——缺失没有了（修得越来越完整），情执自然就没有了。',
      '有我才有情执：真情真爱里还有情执（还有一个「我」）；无条件的爱里连「我」都没有——「你都无我了，哪里还有我的情执」。',
      '无条件的爱的门槛：它不是深情的高级版，是另一个量级——先过情执关，才谈无条件。',
      '桥卡定位：阴阳尽头是平衡，平衡尽头指向无我——这张卡是通向高阶分册（九楼）的桥。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B681', bv:'BV1V5g56xEgr', text:'那真情真爱跟无条件的爱之间的差别，是不是差着一个情执——一个有我，一个没有我。', link:'https://www.bilibili.com/video/BV1V5g56xEgr?t=0'},
      {ts:'00:45', videoId:'B681', bv:'BV1V5g56xEgr', text:'为什么会有情执？因为只要我们有缺失就会有情执……你修的越来越完整的时候，你缺失没有了的话，那你自然就没有这个执了。', link:'https://www.bilibili.com/video/BV1V5g56xEgr?t=45'}
    ],
    quote:'只要我们有缺失就会有情执；修到完整，缺失没有了，执自然就没了。',
    videoTitle:'真情真爱与无条件的爱，八楼与九楼',
    jumpUrl:'https://www.bilibili.com/video/BV1V5g56xEgr?t=0',
    compliance:'web',
    shareText:'「有我」才有情执——修到完整，缺失消失，执自然松开（本卡为高阶桥卡，仅网页）。',
    mirror:'「有我」才有情执——你愿意往「无我」那边挪一步试试吗？',
    editorNotes:'总纲 y5-05 情执与无我（阶5，✅P3，仅网页——compliance 标 web）；源 675/681/663；V3.3 §9.1.2 情与欲辨析（N1/B714）、§5.2.6（缺失与情执）；证据 B681@00:00/00:45（新提取逐句核验）。'
  }
];
