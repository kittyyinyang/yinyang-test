// =====================================================================
// 阴阳人格 · 问答知识层 · 含金量核心层第五批（qa_core5）
//  - var QA_CORE5：schema 与 qa_core4 一致（question/answerBrief/insight/evidence/
//    quote/mirror/stage/scene/forTypes/compliance/shareText/editorNotes）
//  - 蓝本：《知识切片_教材总纲对齐版_v3.md》——本批 = 补齐蓝本缺口 28 卡：
//    ①测评衔接 6 卡（y0-05~y0-10，§2.10 六维度判读，stage:0）
//    ②配对矩阵 16 卡（y4-p11~p44，§4.8 配对矩阵，stage:4，category:关系与配对）
//    ③长尾升级 6 卡（y0-01/y0-03/y5-t1~t4，旧卡 schema v2 化）
//  - insight 骨架 = 总纲论点 + V3.3 §2.10/§4.8/§11.6 重构；测评衔接卡以 B666 战逃
//    为底层代码证据；配对卡 insight 为「双方对照」结构（组合内维度递进）
//  - evidence 时间戳逐句核验（语料全量版-最新.md）：B666@00:00、B39@00:00、B56@00:00、
//    B101@00:00、B680@00:00-01:12、B671@00:00、B122@00:00、B105@00:00-00:16、
//    B596@00:00-00:18、B109@00:00、B176@00:00、B15@00:00、BV1mNJ8zFEMv@00:00、
//    BV1gbu26GEm4@01:01
//  - 同性配对 p14/p41 涉双生剧本（#596 同性双火案例）→ compliance:'web'（双生另册）
//  - 生成：2026-08-31
// =====================================================================

var QA_CORE5 = [

  // ==================== 阶0 测评衔接（6） ====================
  {
    qaId:'q-y0-05-01', kpId:'y0-05', stage:0, category:'阴阳能量', scene:['self'], forTypes:[],
    question:'测评到底在测什么：六个维度分别对应什么，为什么冲突处理是核心',
    answerBrief:'测评测的是能量内核的六个区分维度；冲突处理（战逃）是最底层、最难伪装的判据。',
    insight:[
      '维度架构：能量来源（行动充电 vs 安静恢复）、决策方式（行动优先 vs 信息充分）、信任模式（先信任后投入 vs 先投入后信任）、冲突处理（直面 vs 回避）、边界感（强 vs 弱）、情感表达（行动 vs 言语情绪）——六维组合指向同一内核。',
      '核心判据：两种能量内核最本质的区别是面对冲突的态度——战逃反应是最底层代码，最难伪装、最能绕过意识防御。',
      '判定逻辑：六个维度不是六个独立分数，而是从不同角度逼近同一个答案——冲突处理定主向，其余维度做交叉确认。',
      '测评边界：测评是探索工具不是诊断；维度倾向给出参考信号，最终认定还需自我觉察与长期观察印证。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B666', bv:'BV1Fz8i67EgE', text:'战逃反应你知道吧，就是 fight or flight。阴性能量它的第一本能启动的反应就是 flight；阳性能量第一本能启动的就是 fight，战斗。', link:'https://www.bilibili.com/video/BV1Fz8i67EgE?t=0'}
    ],
    quote:'两种能量内核最本质的区别，是面对冲突的态度。',
    videoTitle:'阴阳能量的本能第一反应',
    jumpUrl:'https://www.bilibili.com/video/BV1Fz8i67EgE?t=0',
    compliance:'web+mini',
    shareText:'测评测的不是分数，是六个维度指向同一个能量内核——而战逃反应是那个最底层的答案。',
    mirror:'六个维度里，哪一个在你身上最「分裂」——自己都能感到拧巴？',
    editorNotes:'总纲 y0-05 六维度总览（阶0，蓝本 ✅ 待产）；V3.3 §2.10.1/§2.10.3；证据 B666@00:00（新核验）；维度细目见 y0-06~10 单卡。'
  },
  {
    qaId:'q-y0-06-01', kpId:'y0-06', stage:0, category:'阴阳能量', scene:['self'], forTypes:[],
    question:'冲突处理：为什么战逃反应是最核心判据——阳战斗、阴逃跑',
    answerBrief:'面对冲突时阳的本能是直面（fight），阴的本能是回避（flight）——这是最底层、最难伪装的判据。',
    insight:[
      '本能代码：冲突点燃的第一秒，阳性能量启动 fight——正面硬刚、讲逻辑；阴性能量启动 flight——回避、变道切换（道理→感情→甩锅）。',
      '被戳中时：阳先否认再暗爽（表面不动声色）；阴破防、自证（急着解释不是我的错）。',
      '冲突之后：阳快速消化、翻篇即忘；阴纠结内耗、反复回放——同一个冲突，两套收尾。',
      '为什么最核心：战逃是最难伪装的维度——意识可以修饰语言，身体的第一反应修饰不了，所以测评核心题围绕「冲突时第一反应」设计。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B666', bv:'BV1Fz8i67EgE', text:'战逃反应你知道吧，就是 fight or flight。阴性能量它的第一本能启动的反应就是 flight；阳性能量第一本能启动的就是 fight，战斗。', link:'https://www.bilibili.com/video/BV1Fz8i67EgE?t=0'}
    ],
    quote:'阴性能量第一本能启动的反应就是 flight；阳性能量第一本能启动的就是 fight。',
    videoTitle:'阴阳能量的本能第一反应',
    jumpUrl:'https://www.bilibili.com/video/BV1Fz8i67EgE?t=0',
    compliance:'web+mini',
    shareText:'被冲突点燃的那一秒，你的身体选的是打还是逃？——这是最难伪装的能量判据。',
    mirror:'被冲突点燃的那一秒，你的身体选的是「打」还是「逃」？',
    editorNotes:'总纲 y0-06 维度一判读（阶0，蓝本 ✅ 待产）；V3.3 §2.10.2（底层判定代码 Fight vs Flight）；证据 B666@00:00（新核验）；拆解与 y1-13 攻击方式分工：本卡讲本能判据，y1-13 讲攻击表现。'
  },
  {
    qaId:'q-y0-07-01', kpId:'y0-07', stage:0, category:'阴阳能量', scene:['self'], forTypes:[],
    question:'能量来源与恢复：阳在行动中获得能量，阴在安静中恢复——两种充电方式',
    answerBrief:'阳靠做成事充电、靠独处回血；阴靠被理解、被看见回血——两种平等的存在方式。',
    insight:[
      '能量来源：阳在行动中获得能量——做成一件事，能量就回流一格；阴在安静中恢复能量——被一个在乎的人认真倾听，胜过独自休息。',
      '方向之别：向外辐射 vs 向内深潜——不是价值判断，不是「外向更好」，而是两种平等的存在方式。',
      '代价对照：阳的优势是独立、抗压、自给自足，代价是分裂了「自爱」与「爱他」；阴的优势是连接、包容、孕育，代价是边界千疮百孔（融合可能变成吞噬）。',
      '耗能方式：阳外耗——把能量花在向外顶、向外扛，体力透支也硬撑；阴内耗——能量在内心拉扯中流失，左右手互搏，人没动心已累。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B666', bv:'BV1Fz8i67EgE', text:'战逃反应你知道吧，就是 fight or flight。阴性能量它的第一本能启动的反应就是 flight；阳性能量第一本能启动的就是 fight，战斗。', link:'https://www.bilibili.com/video/BV1Fz8i67EgE?t=0'},
      {ts:'00:00', videoId:'B671', bv:'BV11W836nEup', text:'阳是一旦认定方向了以后就一往直前；阴是很容易反复，男阴女阴都是这样；阳不容易反复，直接就一往直前往前冲。', link:'https://www.bilibili.com/video/BV11W836nEup?t=0'}
    ],
    quote:'阳是认定方向就一往直前；阴是很容易反复——方向与节奏，两种能量两套引擎。',
    videoTitle:'女阳会主动捞男阴吗？【新增·v4-635】',
    jumpUrl:'https://www.bilibili.com/video/BV1mcuz67Eha?t=0',
    compliance:'web+mini',
    shareText:'你回血靠「做成一件事」，还是靠「有个人懂我」？——充电方式暴露能量内核。',
    mirror:'你回血靠「做成一件事」，还是靠「有个人懂我」？哪种用完反而更空？',
    editorNotes:'总纲 y0-07 维度二判读（阶0，蓝本 ✅ 待产）；V3.3 §2.10.1、§1.3（向外辐射 vs 向内深潜）；证据 B666@00:00/B671@00:00（新核验）；细目见 y1-08（能量流向）/y1-11（充电方式）。'
  },
  {
    qaId:'q-y0-08-01', kpId:'y0-08', stage:0, category:'阴阳能量', scene:['self'], forTypes:[],
    question:'情感表达：阳用行动表达爱，阴用言语和情绪表达——两套爱的语言',
    answerBrief:'阳的爱做出来：行动、扛事、给解决方案；阴的爱说出来：倾诉、情绪、求回应。',
    insight:[
      '表达方式：阳通过行动表达爱——做了就是爱，不爱说也不擅长说；阴通过言语和情绪表达爱——说出来、倾倒出来、要回应。',
      '典型误读：阳觉得「我做的这些你看不见吗」，阴觉得「你不说就是不爱」——同一段关系，两套语言互相听不懂。',
      '阴的倾倒：情绪上涌就倾倒给对方求接住，单方面情绪宣泄不等于沟通；阳的封存：说「没事」是真的在压，压久了爆发就是断崖。',
      '识别要点：判断一个人情感模式，别听他说了什么，看他做了什么、以及情绪来了是倾倒还是封存——这是行动 vs 言语的试金石。'
    ],
    evidence:[
      {ts:'01:12', videoId:'B680', bv:'BV195g56xEG4', text:'男阳的体现，就是他的事业心会非常强，然后他的自我也会非常强。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=72'},
      {ts:'00:00', videoId:'B666', bv:'BV1Fz8i67EgE', text:'阴性能量它的第一本能启动的反应就是 flight；阳性能量第一本能启动的就是 fight，战斗。', link:'https://www.bilibili.com/video/BV1Fz8i67EgE?t=0'}
    ],
    quote:'阳的爱是行动，阴的爱是表达——不是谁不爱，是语言不同。',
    videoTitle:'如何判断阴阳能量内核属性',
    jumpUrl:'https://www.bilibili.com/video/BV195g56xEG4?t=72',
    compliance:'web+mini',
    shareText:'有人把爱做出来，有人把爱说出来——听不懂彼此语言的关系，最容易互相判死刑。',
    mirror:'你的情绪更多用行动表达，还是用语言倾倒？身边人怎么评价你？',
    editorNotes:'总纲 y0-08 维度三判读（阶0，蓝本 ✅ 待产）；V3.3 §2.10.1（情感表达维度）、§2.1（撒娇=放下防御）、§2.4.3（情绪表达）；证据 B680@01:12/B666@00:00（新核验）；细目见 y1-07（情绪表达）/y2-05（嘴硬与说没事）。'
  },
  {
    qaId:'q-y0-09-01', kpId:'y0-09', stage:0, category:'阴阳能量', scene:['self','love'], forTypes:[],
    question:'信任与关系进入：阳先信任再投入，阴先投入再验证——两套进场顺序',
    answerBrief:'阳慢热、先过信任认证再投入；阴先投入、在关系里反复验证——进场顺序恰好相反。',
    insight:[
      '进场顺序：阳先信任再投入——观察期长、慢热，信任没过认证不交心；阴先投入再建立信任——先进入关系，再在相处中验证对方值不值得。',
      '信任质地：阳的信任像砖墙，一块砖一块砖砌起来，塌却是一瞬间，重建比新建更难；阴的信任靠试探累积——一次次确认对方还在、还爱，才敢多信一点。',
      '被背叛时：阳走报仇周期（信没了爱就没了，可突破底线报复）；阴走怨气周期（恨、怨、放不下，但不会行动化报复）。',
      '相处含义：别用阳的进度条等阴，也别用阴的反复推阳——先分清对方是哪套进场顺序，再用对应的语言谈信任。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B56', bv:'BV1EfE9z7Egt', text:'阳很需要信任，不信任他就缩回去了。信任这个东西是阳最看重的，没有信任的基础的话，阳是不会和你谈爱的。', link:'https://www.bilibili.com/video/BV1EfE9z7Egt?t=0'},
      {ts:'00:00', videoId:'B101', bv:'BV1SWjdzwENp', text:'阳是这个逻辑：我和你的信任已经被你摧毁了，那么你的信任我也不稀罕了。这个时候阳是可以突破很多底线的。', link:'https://www.bilibili.com/video/BV1SWjdzwENp?t=0'}
    ],
    quote:'没有信任的基础，阳是不会和你谈爱的——信任在，爱才可能在。',
    videoTitle:'阳性的信任有多重要',
    jumpUrl:'https://www.bilibili.com/video/BV1EfE9z7Egt?t=0',
    compliance:'web+mini',
    shareText:'有人先信任再爱，有人先爱再验证——进场顺序反了，再相爱也是错频。',
    mirror:'进入一段关系，你先给出信任再投入，还是先投入进去慢慢验证？',
    editorNotes:'总纲 y0-09 维度四判读（阶0，蓝本 ✅ 待产）；V3.3 §2.10.1（信任模式）、§2.6（信任与报仇路径）；证据 B56@00:00/B101@00:00（新核验）；细目见 y1-12（信任路径）/y1-20（仇恨路径）。'
  },
  {
    qaId:'q-y0-10-01', kpId:'y0-10', stage:0, category:'阴阳能量', scene:['self'], forTypes:[],
    question:'自我认知一致性：为什么错位型（女阳/男阴）更容易测不准',
    answerBrief:'一致型（男阳/女阴）内外如一会准；错位型（女阳/男阴）戴着性别规训的壳，答题时容易戴面具。',
    insight:[
      '类型结构：人格 = 能量内核 × 生理性别——男阳/女阴是一致型（内外同向），女阳/男阴是错位型（内核顶着性别规训）。',
      '测不准机制：错位型从小被规训「女孩要温柔」「男人要坚强」，习惯把壳当自己——答题时是面具在答，不是内核在答。',
      '判定提醒：心灵层面没有男女之分，四型的区别是「出发站」不同，终点都是阴阳平衡站；判定的是当前主导能量，不是永恒标签。',
      '对应策略：测不准时别急着改答案——先问自己「这个选项是我，还是我穿了很多年的壳」；参考信号 + 长期觉察，比一次测评更可靠。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B666', bv:'BV1Fz8i67EgE', text:'战逃反应你知道吧，就是 fight or flight。阴性能量它的第一本能启动的反应就是 flight；阳性能量第一本能启动的就是 fight，战斗。', link:'https://www.bilibili.com/video/BV1Fz8i67EgE?t=0'},
      {ts:'00:00', videoId:'B680', bv:'BV195g56xEG4', text:'阴阳它这个是不会变的。如何判断？我现在是没有标准的。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=0'}
    ],
    quote:'测不准不是你的问题——是壳在答题，不是你在答题。',
    videoTitle:'阴性爱上一个不爱自己的人怎么办【新增·v4-628】',
    jumpUrl:'https://www.bilibili.com/video/BV1KXby62Ems?t=0',
    compliance:'web+mini',
    shareText:'女阳和男阴为什么最常测不准？——因为性别规训给他们各自发了一个壳。',
    mirror:'你对外展现的自己，和独处时的自己，差多远？差掉的那块是什么？',
    editorNotes:'总纲 y0-10 维度五判读（阶0，蓝本 ✅ 待产）；V3.3 §2.10.1（假自体维持）、§3.1（心灵层面无男女之分）；证据 B666@00:00/B680@00:00（新核验）；细目见 y0-04（阳壳与面具）/y3-b3d（女阴容易被骗）。'
  },

  // ==================== 长尾升级（6） ====================
  {
    qaId:'q-y0-01-01', kpId:'y0-01', stage:0, category:'阴阳能量', scene:['self'], forTypes:[],
    question:'内核是能量属性，不是性格标签：为什么相似的经历反应却完全不同',
    answerBrief:'阴阳内核是落地即定的能量属性，不随经历改变；同一场景，内核不同，反应就不同。',
    insight:[
      '内核定性：阴阳内核是能量属性，不是 MBTI 式性格分类——它决定的是「出发站」，不是「当前状态」。',
      '不随经历改变：遇到同样的场景，阴性内核的信念会往「我不配、会被抛弃」方向走，阳性内核往「我能扛、要靠自己」方向走——不是经历造就不配得，是内核决定解读方式。',
      '与性别解耦：心灵层面没有男女之分——男阴和女阴共享阴性内核（不配得、怕被抛弃），男阳和女阳共享阳性内核（靠自己、无能恐惧）。',
      '区分意义：判断阴阳不是贴标签，而是理解每个人的出发点不同——有人从阳性主导出发走向平衡，有人从阴性主导出发走向同一个终点。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B39', bv:'BV1YJE4zFEJv', text:'阴性方觉得不配得感、自卑都是有的，这主要是因为他在内在深刻的就是相信自己不配被爱，这是阴性的主要问题——不配得。', link:'https://www.bilibili.com/video/BV1YJE4zFEJv?t=0'},
      {ts:'00:00', videoId:'B680', bv:'BV195g56xEG4', text:'阴阳它这个是不会变的。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=0'}
    ],
    quote:'不是经历导致了不配得——是能量属性，它本身就是阴性的。',
    videoTitle:'为什么阴性会觉得不配得',
    jumpUrl:'https://www.bilibili.com/video/BV1YJE4zFEJv?t=0',
    compliance:'web+mini',
    shareText:'为什么同样的事，有人看到「我不配」，有人看到「我能扛」？——因为内核在出生前就定了。',
    mirror:'你的阴阳内核是「生下来就带的底色」，还是「后天养成的性格」？观察自己一年，哪种解释更贴？',
    editorNotes:'总纲 y0-01 内核是能量属性（阶0，蓝本 ✅重制；旧 data_qa 卡升级 v2）；V3.3 §1.1（核心前提）、§2.2.1（不配得信念）；证据 B39@00:00/B680@00:00（新核验）；查重边界：与 y1-23 连续谱分工（属性先定 vs 属性内部比例）。'
  },
  {
    qaId:'q-y0-03-01', kpId:'y0-03', stage:0, category:'阴阳能量', scene:['self'], forTypes:[],
    question:'判断没有标准：阴阳怎么区分，测评是探索工具还是诊断',
    answerBrief:'阴阳判断没有量化标准；最本质的区分是面对冲突的态度；测评是镜子不是诊断。',
    insight:[
      '没有标准答案：判断阴阳没有一套客观标准——内核不会变，但「如何判断」连 UP 主也坦诚「现在是没有标准的」。',
      '最本质判据：两种能量内核最本质的区别是面对冲突的态度——战逃反应是绕不开的底层代码。',
      '测评定位：测评是探索工具，不是诊断书——结果给你一面镜子，不给你一个判决；结果与自我认知冲突时，先怀疑的不是自己，是题目。',
      '参考信号：经验信号（不配得/判断不清/重感情等）只能作参考，注明非判据——单点信号不能定罪，多点交叉才值得留意。'
    ],
    evidence:[
      {ts:'00:05', videoId:'B680', bv:'BV195g56xEG4', text:'阴阳它这个是不会变的。这个如何判断？我现在是没有标准的。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=5'},
      {ts:'00:00', videoId:'B666', bv:'BV1Fz8i67EgE', text:'战逃反应你知道吧，就是 fight or flight。阴性能量它的第一本能启动的反应就是 flight；阳性能量第一本能启动的就是 fight，战斗。', link:'https://www.bilibili.com/video/BV1Fz8i67EgE?t=0'}
    ],
    quote:'如何判断？我现在是没有标准的。',
    videoTitle:'如何判断阴阳能量内核属性',
    jumpUrl:'https://www.bilibili.com/video/BV195g56xEG4?t=5',
    compliance:'web+mini',
    shareText:'阴阳判断没有标准答案——如果测评结果和你的自我认知冲突，先怀疑题目，别先怀疑自己。',
    mirror:'你希望测评给你一个「诊断」，还是一面「镜子」？如果结果和你自我认知冲突，你会先怀疑谁？',
    editorNotes:'总纲 y0-03 判断没有标准（阶0，蓝本 ✅重制；旧 data_qa 卡升级 v2）；V3.3 §2.10.2、§3.1；证据 B680@00:05/B666@00:00（新核验）；合规安全卡，小程序措辞依据。'
  },
  {
    qaId:'q-y5-t1-01', kpId:'y5-t1', stage:5, category:'成长课题', scene:['self'], forTypes:['yang-male'],
    question:'男阳的成长课题：削膨胀——自我是引擎，膨胀是盲区',
    answerBrief:'男阳课题是把「扛」修成「承」：削掉膨胀，学会示弱、表达与承接。',
    insight:[
      '课题内核：男阳易把「扛责任」当价值——强是优点，强到膨胀就目中无人；课题是削膨胀，把自我修到能容下人。',
      '边界方向：铜墙铁壁需学弹簧网——边界从「挡死一切」变成「有弹性的承接」，允许信任的人进来。',
      '觉察方向：易用力过猛，需降速——扛不住时不是更硬封闭，而是承认「我撑不住了」。',
      '恐惧防御：怕扛不住→更硬封闭——识别「越怕越硬」的循环，勇敢的第一步是敢在信任的人面前说「我不行」。'
    ],
    evidence:[
      {ts:'01:32', videoId:'B3', bv:'BV15MVWzGEnh', text:'阳性能量通常有深刻的靠自己——只有靠自己才能靠得住的信念。', link:'https://www.bilibili.com/video/BV15MVWzGEnh?t=92'},
      {ts:'00:00', videoId:'B671', bv:'BV11W836nEup', text:'阳是一旦认定方向了以后就一往直前，直接就一往直前往前冲。', link:'https://www.bilibili.com/video/BV11W836nEup?t=0'}
    ],
    quote:'只有靠自己才能靠得住——但真正的成熟，是敢让别人接住一次。',
    videoTitle:'双生通关秘籍（三）——阴阳能量的人格特质（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV15MVWzGEnh?t=92',
    compliance:'web+mini',
    shareText:'男阳的成熟不是更硬，是敢软——削膨胀，是把自我修到能容下人。',
    mirror:'（男阳/身边男阳）削膨胀：你上一次主动认怂是什么时候？',
    editorNotes:'总纲 y5-t1 男阳课题削膨胀（阶5，蓝本 ✅重制；旧 data_qa 卡升级 v2）；V3.3 §11.6 四型觉醒路径（男阳列）；证据 B3@01:32（core4 已验证复用）/B671@00:00（新核验）；细目见 y3-b1b 孤狼悖论/y5-11 阳修坤德细目。'
  },
  {
    qaId:'q-y5-t2-01', kpId:'y5-t2', stage:5, category:'成长课题', scene:['self'], forTypes:['yang-female'],
    question:'女阳的成长课题：沉下来承载——破局是天赋，停不下是陷阱',
    answerBrief:'女阳课题是把「冲」修成「承」：从对抗式独立走向榜样式发光，允许自己不动。',
    insight:[
      '课题内核：女阳易把「破局」当对抗——一直冲、一直扛、停不下来；课题是沉下来承载，允许自己「不动」。',
      '边界方向：易当拯救者，需「非邀请不干预」——别人的关自己冲，自己的关也要别人自己过。',
      '觉察方向：易评判，需去评判——冲在前面时先停一秒：这是对方的事，还是我的焦虑？',
      '恐惧防御：怕失控→攻击控制——识别「越怕失去掌控越要冲」的循环；柔软不是认输，是更有力的承载。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B122', bv:'BV1As7WzKEqp', text:'男阴他回头想要把女阳给扯下来，所以你不能那么高，你必须低下来和我平起平坐。', link:'https://www.bilibili.com/video/BV1As7WzKEqp?t=0'},
      {ts:'01:12', videoId:'B680', bv:'BV195g56xEG4', text:'男阳的体现，就是他的事业心会非常强，然后他的自我也会非常强。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=72'}
    ],
    quote:'女阳的高不是罪——真正的问题，是她不敢低下来。',
    videoTitle:'男阴是最压抑的群体',
    jumpUrl:'https://www.bilibili.com/video/BV1As7WzKEqp?t=0',
    compliance:'web+mini',
    shareText:'女阳的课题不是更拼，是敢停——沉下来承载，比一直冲更需要力量。',
    mirror:'（女阳/身边女阳）沉下来承载：你上次允许自己「不动」是什么时候？',
    editorNotes:'总纲 y5-t2 女阳课题沉下来承载（阶5，蓝本 ✅重制；旧 data_qa 卡升级 v2）；V3.3 §11.6 四型觉醒路径（女阳列）；证据 B122@00:00/B680@01:12（新核验）；细目见 y3-b2b 灯塔悖论/y5-12 阴修乾德细目。'
  },
  {
    qaId:'q-y5-t3-01', kpId:'y5-t3', stage:5, category:'成长课题', scene:['self'], forTypes:['yin-female'],
    question:'女阴的成长课题：独立人格——被需要不等于被爱，先爱自己',
    answerBrief:'女阴课题是把自己活成独立人格：不靠被需要证明价值，先爱满自己再连接他人。',
    insight:[
      '课题内核：女阴易把「被需要」当价值——用付出和连接确认自己，深层是不配得感；课题是「我本身就值得，不需要先付出」。',
      '边界方向：千疮百孔需学断舍离——从谁都能进来，到学会说「我今晚能量不够」。',
      '觉察方向：易困情绪当主角，需抽离——小剧场开演时先标记「这是我的旧模式」，再决定要不要演。',
      '恐惧防御：怕不被爱→拉黑以退为进——识别「先推开你以免被你先推开」的循环；独立的底气是：没有你我也完整，有你更好。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B39', bv:'BV1YJE4zFEJv', text:'阴性方觉得不配得感、自卑都是有的，这主要是因为他在内在深刻的就是相信自己不配被爱，这是阴性的主要问题——不配得。', link:'https://www.bilibili.com/video/BV1YJE4zFEJv?t=0'},
      {ts:'00:00', videoId:'B176', bv:'BV1Q6NEziEVz', text:'不是越看你们相处，越觉得这关系不要算了——你看这男阴新的死循环又诞生了，他的理由是这么进阶的。', link:'https://www.bilibili.com/video/BV1Q6NEziEVz?t=0'}
    ],
    quote:'不配得是阴性的主要问题——而解药是：先把自己爱满，爱才会溢出来。',
    videoTitle:'为什么阴性会觉得不配得',
    jumpUrl:'https://www.bilibili.com/video/BV1YJE4zFEJv?t=0',
    compliance:'web+mini',
    shareText:'女阴的独立人格：不需要靠「被需要」来证明自己有用——你本身就值得。',
    mirror:'（女阴/身边女阴）独立人格：不依附任何人的那部分你，长出来了吗？',
    editorNotes:'总纲 y5-t3 女阴课题独立人格（阶5，蓝本 ✅重制；旧 data_qa 卡升级 v2）；V3.3 §11.6 四型觉醒路径（女阴列）；证据 B39@00:00/B176@00:00（新核验）；细目见 y3-b3b 深情悖论/y5-12 阴修乾德细目。'
  },
  {
    qaId:'q-y5-t4-01', kpId:'y5-t4', stage:5, category:'成长课题', scene:['self'], forTypes:['yin-male'],
    question:'男阴的成长课题：全力以赴——从权衡心机到深潜成器',
    answerBrief:'男阴课题是把「防」修成「信」：直面冲突、不设退路地投入，从权衡走向成器。',
    insight:[
      '课题内核：男阴易把「自我牺牲」当价值——用深潜和心机保护自己，却不敢全力投入；课题是全力以赴，不设退路地做事做人。',
      '冲突方向：双方都要练「直面冲突」——这是打败 90% 男阴的关键门槛；回避只会让拉扯变成死循环。',
      '爱己方向：易把善意脑补成爱，需修自爱内核——先确认自己值得，再谈交付；卖惨勾圣母要转为「有意识度人」。',
      '恐惧防御：怕不配得→回避卖惨——识别「怕被看穿就主动贬低自己」的循环；全力以赴的前提，是允许自己配得上结果。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B105', bv:'BV1r1jqzNEKP', text:'男阴的原生家庭是怎样的？实际上就是男阴的家里面肯定有一个极强控制欲的妈，这个妈把男阴的这个自我搓得千疮百孔，然后情感绑架、道德勒索。', link:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0'},
      {ts:'00:00', videoId:'B122', bv:'BV1As7WzKEqp', text:'男阴他回头想要把女阳给扯下来，所以你不能那么高，你必须低下来和我平起平坐。', link:'https://www.bilibili.com/video/BV1As7WzKEqp?t=0'}
    ],
    quote:'被控制性母亲搓得千疮百孔的自我——要用「全力以赴」重新长出来。',
    videoTitle:'【14_原生家庭对男阴的影响】（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0',
    compliance:'web+mini',
    shareText:'男阴的课题不是更聪明，是敢笨——全力以赴，不设退路，才配得上成器。',
    mirror:'（男阴/身边男阴）全力以赴：你有多久没有不设退路地投入一件事了？',
    editorNotes:'总纲 y5-t4 男阴课题全力以赴（阶5，蓝本 ✅重制；旧 data_qa 卡升级 v2）；V3.3 §11.6 四型觉醒路径（男阴列）；证据 B105@00:00/B122@00:00（新核验）；细目见 y3-b4b 尊严悖论/y3-b4f 男阴成熟度阶梯。'
  },

  // ==================== 配对矩阵（16） ====================
  {
    qaId:'q-y4-p13-01', kpId:'y4-p13', stage:4, category:'关系与配对', scene:['love'], forTypes:['yang-male','yin-female'],
    question:'男阳 × 女阴：传统互补 85%——太阳与月亮的引力与拉扯',
    answerBrief:'最符合社会期待的组合：男阳承重补女阴连接，女阴柔软滋养男阳硬壳；但未觉醒时会走完六阶段拉扯。',
    insight:[
      '互补动力：男阳的承重+边界+果决补女阴的连接+共情+流动，女阴的柔软反过来滋养男阳的硬壳——最符合社会期待的能量配对。',
      '未觉醒剧本：讨好型交流→男阳推开→女阴小作文追→男阳留渠道→粉红泡泡自欺→真放下→男阳反追——一套完整六阶段拉扯。',
      '女阴侧课题：停止讨好、说真实想法；接受男阳当下「不爱」的真实性，不自欺；关注自己而非追对方。',
      '男阳侧信号：留一个能联系上的渠道 ≠ 想复合，只是没切断能量链接——别把「还在」误读成「还爱」。'
    ],
    evidence:[
      {ts:'01:12', videoId:'B680', bv:'BV195g56xEG4', text:'男阳的体现，就是他的事业心会非常强，然后他的自我也会非常强。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=72'},
      {ts:'00:00', videoId:'B39', bv:'BV1YJE4zFEJv', text:'阴性方觉得不配得感、自卑都是有的，这主要是因为他在内在深刻的就是相信自己不配被爱。', link:'https://www.bilibili.com/video/BV1YJE4zFEJv?t=0'}
    ],
    quote:'85% 的吸引力之外，藏着一套六阶段的拉扯剧本——觉醒才是翻盘键。',
    videoTitle:'如何判断阴阳能量内核属性',
    jumpUrl:'https://www.bilibili.com/video/BV195g56xEG4?t=72',
    compliance:'web+mini',
    shareText:'男阳×女阴：太阳与月亮最配也最拉扯——女阴真放下，男阳才会反追。',
    mirror:'太阳-月亮组合：85% 的吸引力之外，摩擦点说中你了吗？',
    editorNotes:'总纲 y4-p13 男阳×女阴传统互补（阶4，蓝本待产）；V3.3 §4.8.3（语料#240 完整剧本）；证据 B680@01:12/B39@00:00（新核验）；视角卡 y4-p31 共享本卡证据；配对速查含 K6 评分 85%。'
  },
  {
    qaId:'q-y4-p31-01', kpId:'y4-p31', stage:4, category:'关系与配对', scene:['love'], forTypes:['yin-female','yang-male'],
    question:'女阴视角看男阳：小作文为什么推远他，真放下为什么吸引他',
    answerBrief:'女阴侧视角：单方面情绪倾倒会把男阳推远；真放下、关注自己，反而触发男阳反追。',
    insight:[
      '误读起点：女阴的不配得信念+加戏戏精，容易把男阳的「独立」误读为「自私」——他忙是忙，不是不爱你。',
      '小作文机制：单方面情绪倾倒≠情感表达——男阳表达过不管用→习得性无助→不表达→女阴「剪了翅膀还怪飞不起来」。',
      '试探反噬：用第三方刺激、反复确认「你爱不爱我」，哪怕对方说了也不信——男阳识别为抓取，越抓越跑。',
      '以退为进陷阱：拉黑等哄，哄了=告诉潜意识「这招有用」，下次还来；真放下=忙自己的、不焦虑，男阳反而回头。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B39', bv:'BV1YJE4zFEJv', text:'阴性方觉得不配得感、自卑都是有的，这主要是因为他在内在深刻的就是相信自己不配被爱，这是阴性的主要问题——不配得。', link:'https://www.bilibili.com/video/BV1YJE4zFEJv?t=0'},
      {ts:'00:00', videoId:'B56', bv:'BV1EfE9z7Egt', text:'阳很需要信任，不信任他就缩回去了。信任这个东西是阳最看重的，没有信任的基础的话，阳是不会和你谈爱的。', link:'https://www.bilibili.com/video/BV1EfE9z7Egt?t=0'}
    ],
    quote:'你关注自己的时候他能感觉到——双方都有进步时，真的会推。',
    videoTitle:'为什么阴性会觉得不配得',
    jumpUrl:'https://www.bilibili.com/video/BV1YJE4zFEJv?t=0',
    compliance:'web+mini',
    shareText:'女阴对男阳：停止小作文和拉黑试探，真放下，他才会真回来。',
    mirror:'站在女阴视角看男阳：互补的另一面你看到的是什么？',
    editorNotes:'总纲 y4-p31 女阴×男阳视角卡（阶4，蓝本待产）；V3.3 §4.8.6（女阴侧视角，条目#112/#36/#21/#175）；证据 B39@00:00/B56@00:00（新核验）；主卡 y4-p13 互补动力见前卡。'
  },
  {
    qaId:'q-y4-p14-01', kpId:'y4-p14', stage:4, category:'关系与配对', scene:['love'], forTypes:['yang-male','yin-male'],
    question:'男阳 × 男阴：阴阳互补 80%——地狱级难度的孔雀开屏',
    answerBrief:'男阳承重补男阴深潜；男阴傲娇像孔雀开屏，男阳要读得懂；男阴须重建自信，不能靠男阳充值。',
    insight:[
      '互补结构：男阳的果决+边界补男阴的深潜+心机；男阴的傲娇不是「装」，是太阳人格的孔雀开屏式吸引。',
      '剧本难度：同性双火是「地狱级难度」——尤其传统家族背景，「接受自己喜欢上一个男人」本身就够喝一壶；课题设置与异性双火区别不大。',
      '男阳期待：阳性方对阴性方的期待是「不要拖后腿」——不怕神对手，就怕猪队友；男阴的拉扯剧本容易被识别为「操纵」。',
      '男阴课题：必须从个人上重建自信，不能依赖男阳「充值」——「我给你充值自信，始终不是你自己的自信」。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B596', bv:'BV1tnN4zHEZS', text:'同性双火跟异性双火的区别，我觉得区别其实也不是特别大，就取决于课题设置我灵魂的选择。', link:'https://www.bilibili.com/video/BV1tnN4zHEZS?t=0'},
      {ts:'00:00', videoId:'B105', bv:'BV1r1jqzNEKP', text:'男阴的原生家庭是怎样的？实际上就是男阴的家里面肯定有一个极强控制欲的妈，这个妈把男阴的这个自我搓得千疮百孔。', link:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0'}
    ],
    quote:'我给你充值自信，始终不是你自己的自信——你要从个人上重建。',
    videoTitle:'同性双火和异性双火的区别',
    jumpUrl:'https://www.bilibili.com/video/BV1tnN4zHEZS?t=0',
    compliance:'web',
    shareText:'男阳×男阴：同性双火是剧本选择——难度地狱级，课题却是同一个：重建自己的自信。',
    mirror:'男阳×男阴 80%：这对组合的权力暗流在哪？',
    editorNotes:'总纲 y4-p14 男阳×男阴阴阳互补（阶4，蓝本待产）；V3.3 §4.8.5（语料#596/#22/#114/#93）；证据 B596@00:00/B105@00:00（新核验）；涉同性双火剧本→compliance web；视角卡 y4-p41 共享证据。'
  },
  {
    qaId:'q-y4-p41-01', kpId:'y4-p41', stage:4, category:'关系与配对', scene:['love'], forTypes:['yin-male','yang-male'],
    question:'男阴视角看男阳：自卑+承重，为什么「我配不上他」的戏会上演',
    answerBrief:'男阴侧视角：自卑撞上硬核男阳，容易演「我配不上」；课题是直面冲突、重建自信。',
    insight:[
      '内在戏：男阴的自卑+男阳的承重特质，容易形成「我配不上他」的内在戏——他扛得住，我拿什么匹配？',
      '冲突门槛：男阴的课题是直面冲突——这是关键门槛；回避冲突、拉扯试探，会被男阳读成「操纵」。',
      '识别信号：识别对方的「下头男相」是想让你下头——他故意让你觉得他是渣男，是成全式推开，不是真渣。',
      '双向功课：男阳要读得懂傲娇（孔雀开屏式吸引），男阴要接得住「当面锣对面鼓」——不装、不绕、有话直说。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B596', bv:'BV1tnN4zHEZS', text:'同性双火跟异性双火的区别，我觉得区别其实也不是特别大，就取决于课题设置我灵魂的选择。', link:'https://www.bilibili.com/video/BV1tnN4zHEZS?t=0'},
      {ts:'00:00', videoId:'B122', bv:'BV1As7WzKEqp', text:'男阴他回头想要把女阳给扯下来，所以你不能那么高，你必须低下来和我平起平坐。', link:'https://www.bilibili.com/video/BV1As7WzKEqp?t=0'}
    ],
    quote:'「我配不上他」不是事实——是自卑写好的剧本。',
    videoTitle:'同性双火和异性双火的区别',
    jumpUrl:'https://www.bilibili.com/video/BV1tnN4zHEZS?t=0',
    compliance:'web',
    shareText:'男阴×男阳：自卑撞上硬核男阳——「我配不上」的戏，要靠直面冲突来破。',
    mirror:'男阴视角下的男阳：他观察到了什么才决定进场？',
    editorNotes:'总纲 y4-p41 男阴×男阳视角卡（阶4，蓝本待产）；V3.3 §4.8.14（男阴侧视角，#131/#159/#174）；证据 B596@00:00/B122@00:00（新核验）；涉同性双火→compliance web。'
  },
  {
    qaId:'q-y4-p24-01', kpId:'y4-p24', stage:4, category:'关系与配对', scene:['love'], forTypes:['yang-female','yin-male'],
    question:'女阳 × 男阴：逆向互补 90%——最高互补，也是圣母心收割场',
    answerBrief:'双方都懂「不一样」的痛，是最高互补；但男阴的死循环专割女阳圣母心，女阳要学会不救。',
    insight:[
      '互补内核：女阳在女性躯体里偏阳刚，男阴在男性躯体里偏阴柔——都经历过「不一致」的张力，最能理解彼此的「不一样」。',
      '圣母心陷阱：男阴的死循环专割女阳圣母心——他不是故意装委屈，是真的自怜自艾；女阳一接住「拯救」剧本就被拖进循环。',
      '拉扯剧本：女阳给无条件爱→男阴说「你自作多情」→女阳收回→男阴反而缠住（晚 11 点还缠、拦着不让走）——作的核心是怕失去。',
      '女阳课题：避免「过度负责」阻碍男阴成长——他要自己摔一跤才能长骨头；鼓励他活出自己，不是替他活。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B109', bv:'BV1nUjqzAEcT', text:'女阳喜欢当男阴面和别的男人暧昧吗？有可能，有的是故意的，有的时候是一种报复的心理。', link:'https://www.bilibili.com/video/BV1nUjqzAEcT?t=0'},
      {ts:'00:07', videoId:'BV1mNJ8zFEMv', bv:'', text:'男阴就是巨耐惨，比女阴还要耐惨。', link:'https://www.bilibili.com/video/BV1mNJ8zFEMv?t=7'}
    ],
    quote:'男阴的死循环专割女阳的圣母心——救他一次，他就会缠你一生。',
    videoTitle:'男阴用第三方刺激女阳会发生什么？（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1nUjqzAEcT?t=0',
    compliance:'web+mini',
    shareText:'女阳×男阴：90% 最高互补组合——前提是女阳不接圣母心剧本。',
    mirror:'女阳×男阴 90% 最高互补：高互补为什么也高摩擦？',
    editorNotes:'总纲 y4-p24 女阳×男阴逆向互补（阶4，蓝本待产）；V3.3 §4.8.13（#182/#111/#151/#93/#156）；证据 B109@00:00/BV1mNJ8zFEMv@00:00（新核验，后者为阴阳能量篇合集视频）；视角卡 y4-p42 共享证据。'
  },
  {
    qaId:'q-y4-p42-01', kpId:'y4-p42', stage:4, category:'关系与配对', scene:['love'], forTypes:['yin-male','yang-female'],
    question:'男阴视角看女阳：做局是天赋不是操纵，她的冲你要接得住',
    answerBrief:'男阴侧视角：女阳的做局是天赋+保护壳；男阴的欲盖弥彰被看穿，要识别女阳的记仇与报复。',
    insight:[
      '天赋误读：女阳的「做局」是天赋也是保护壳，不是操纵——男阴要识别它，而不是把它当算计。',
      '欲盖弥彰：男阴标点符号出卖、余光雷达锁定——女阳看穿但不说，男阴以为做局成功，女阳冷不防来一下。',
      '刺激反噬：男阴用第三方刺激女阳→女阳记仇+必然报复——不要玩火，她不吃这套。',
      '接冲姿势：女阳的「冲」不是针对你，是她的能量方式——接住她的冲，而不是把她压下来平起平坐。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B109', bv:'BV1nUjqzAEcT', text:'女阳喜欢当男阴面和别的男人暧昧吗？有可能，有的是故意的，有的时候是一种报复的心理。', link:'https://www.bilibili.com/video/BV1nUjqzAEcT?t=0'},
      {ts:'00:00', videoId:'B122', bv:'BV1As7WzKEqp', text:'男阴他回头想要把女阳给扯下来，所以你不能那么高，你必须低下来和我平起平坐。', link:'https://www.bilibili.com/video/BV1As7WzKEqp?t=0'}
    ],
    quote:'女阳的做局是天赋——接得住她的冲，才配得上 90% 的互补。',
    videoTitle:'男阴用第三方刺激女阳会发生什么？（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1nUjqzAEcT?t=0',
    compliance:'web+mini',
    shareText:'男阴×女阳：她冲你压，这是两个错位者最容易互相伤害的姿势。',
    mirror:'男阴视角的女阳：他怎么接她的冲？',
    editorNotes:'总纲 y4-p42 男阴×女阳视角卡（阶4，蓝本待产）；V3.3 §4.8.16（#114/#159/#109/#151）；证据 B109@00:00/B122@00:00（新核验）；主卡 y4-p24 互补内核见前卡。'
  },
  {
    qaId:'q-y4-p23-01', kpId:'y4-p23', stage:4, category:'关系与配对', scene:['love'], forTypes:['yang-female','yin-female'],
    question:'女阳 × 女阴：阴阳互补 80%——推收博弈',
    answerBrief:'女阳破局补女阴犹豫，女阴连接补女阳温度；但做局与加戏互相误读，容易陷入博弈循环。',
    insight:[
      '互补结构：女阳的冲劲补女阴的犹豫；女阴的温暖补女阳的坚硬——一个推一个收，本该资源互补。',
      '误读循环：女阳的「做局」被女阴识别为「她在操纵我」→女阳用扮猪吃老虎应对→关系陷入博弈循环。',
      '嫉妒错位：女阳嫉妒能力（遇到实力相当的人战斗欲起），女阴嫉妒注意力（喜欢的人看别人）——嫉妒对象不同，互相误读。',
      '破解方向：女阳的「凡尔赛」少一点，女阴的「加戏」少一点；互相直说，别用做局与试探过招。'
    ],
    evidence:[
      {ts:'00:07', videoId:'B605', bv:'BV1mNJ8zFEMv', text:'男阴就是巨耐惨，比女阴还要耐惨。', link:'https://www.bilibili.com/video/BV1mNJ8zFEMv?t=7'},
      {ts:'00:00', videoId:'B15', bv:'BV1fo5KzBERr', text:'是怎么判断出来就是女阴和其他女生的区别的。', link:'https://www.bilibili.com/video/BV1fo5KzBERr?t=0'}
    ],
    quote:'一个推一个收，资源本该互补——误读，才是博弈循环的起点。',
    videoTitle:'男阳怎么确认自己的双生？（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1fo5KzBERr?t=0',
    compliance:'web+mini',
    shareText:'女阳×女阴：做局遇到加戏——放下试探，才能回到互补。',
    mirror:'女阳×女阴：一个推一个收，资源怎么流？',
    editorNotes:'总纲 y4-p23 女阳×女阴阴阳互补视角卡（阶4，蓝本待产）；V3.3 §4.8.11（#151/#247/#153/#217）；证据 BV1mNJ8zFEMv@00:00/B15@00:00（新核验）；视角卡 y4-p32 共享证据。'
  },
  {
    qaId:'q-y4-p32-01', kpId:'y4-p32', stage:4, category:'关系与配对', scene:['love'], forTypes:['yin-female','yang-female'],
    question:'女阴视角看女阳：她羡慕她什么——从「她哄我」到「我要像她」',
    answerBrief:'女阴侧视角：识别女阳的做局是保护壳不是操纵；嫉妒从注意力争夺转向实力向往。',
    insight:[
      '识别做局：女阳的「做局」是天赋也是保护壳——她在向下兼容帮你充值自信，不是「哄你」。',
      '嫉妒转向：女阴嫉妒注意力（她怎么不看我看别人），女阳嫉妒能力（遇到实力相当的人战斗欲起）——把「她为什么这么强」从羡慕变成学习目标。',
      '扮猪吃老虎陷阱：女阴以为拿捏住了，女阳冷不防来一下——女阴加戏更严重；识别它是保护壳，不戳穿、不较劲。',
      '成长方向：女阴的课题不是赢过女阳，是长出和她一样的独立——她能扛，你也能；她发光，你也可以。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B15', bv:'BV1fo5KzBERr', text:'是怎么判断出来就是女阴和其他女生的区别的。', link:'https://www.bilibili.com/video/BV1fo5KzBERr?t=0'},
      {ts:'00:00', videoId:'B176', bv:'BV1Q6NEziEVz', text:'不是越看你们相处，越觉得这关系不要算了——你看这男阴新的死循环又诞生了。', link:'https://www.bilibili.com/video/BV1Q6NEziEVz?t=0'}
    ],
    quote:'女阴对女阳：把「她为什么这么强」的问号，变成「我也要这样」的句号。',
    videoTitle:'男阳怎么确认自己的双生？（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1fo5KzBERr?t=0',
    compliance:'web+mini',
    shareText:'女阴×女阳：嫉妒的对象不同——她要实力，你要注意力；互换视角才看得懂对方。',
    mirror:'女阴视角的女阳：她羡慕她什么？',
    editorNotes:'总纲 y4-p32 女阴×女阳视角卡（阶4，蓝本待产）；V3.3 §4.8.8（#151/#247）；证据 B15@00:00/B176@00:00（新核验）；主卡 y4-p23 互补结构见前卡。'
  },
  {
    qaId:'q-y4-p21-01', kpId:'y4-p21', stage:4, category:'关系与配对', scene:['love'], forTypes:['yang-female','yang-male'],
    question:'女阳 × 男阳：双阳交锋 70%——两个都要赢的人怎么分胜负',
    answerBrief:'双阳同框：互相激励也互相角力；女阳要练真示弱，男阳能精准识别假示弱。',
    insight:[
      '角力结构：女阳遇上男阳——她要冲、他要稳；双方都偏爆发型攻击，冲突时能量瞬间清空。',
      '示弱真假：女阳的「假示弱做局」会被男阳精准识别；要练「真示弱」——在值得的人面前说「我需要你」。',
      '做局反噬：女阳做局帮男阳充值自信→男阳对控制极敏感→故意拒绝看她是否想控制；信任砖墙一旦竖起，很难再打开。',
      '错位解读：未生发阴性能量时，女阳会把男阳的小动作误读为「手指不老实」；生发后才读得懂「手指轻抚=爱不释手」——柔软需要长出来。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B671', bv:'BV11W836nEup', text:'阳是一旦认定方向了以后就一往直前，直接就一往直前往前冲。', link:'https://www.bilibili.com/video/BV11W836nEup?t=0'},
      {ts:'00:00', videoId:'B109', bv:'BV1nUjqzAEcT', text:'女阳喜欢当男阴面和别的男人暧昧吗？有可能，有的是故意的，有的时候是一种报复的心理。', link:'https://www.bilibili.com/video/BV1nUjqzAEcT?t=0'}
    ],
    quote:'两个都要赢的人，怎么分胜负？——先学会输给彼此。',
    videoTitle:'阳性的成长特点',
    jumpUrl:'https://www.bilibili.com/video/BV11W836nEup?t=0',
    compliance:'web+mini',
    shareText:'女阳×男阳：双阳交锋，赢的姿势是先示弱——但假示弱骗不过男阳。',
    mirror:'双阳交锋：两个都要赢的人怎么分胜负？',
    editorNotes:'总纲 y4-p21 女阳×男阳双阳交锋（阶4，蓝本待产）；V3.3 §4.8.10（#243/#151/#32/#153/#55）；证据 B671@00:00/B109@00:00（新核验）；视角卡 y4-p12 共享证据。'
  },
  {
    qaId:'q-y4-p12-01', kpId:'y4-p12', stage:4, category:'关系与配对', scene:['love'], forTypes:['yang-male','yang-female'],
    question:'男阳视角看女阳：她是来抢风头的，还是来冲我冲不动的关',
    answerBrief:'男阳侧视角：识别女阳的破局本质不是挑衅；她冲你稳，柔软需要互相长。',
    insight:[
      '本质识别：女阳的「破局」本质不是来抢风头，是来冲你冲不动的关——她冲关，你承重，是同一个战场的两种打法。',
      '张力管理：两个阳性能量同框，互相激励也可能互相角力——她要冲、你要稳；冲突爆发快收尾快，别拖成冷暴力。',
      '示弱功课：男阳要接得住女阳的冲，女阳要练真示弱——男阳自己也别端着，双阳组合里先松手的人赢。',
      '柔软时刻：女阳生发阴性能量后才能读懂你的小动作——在她「手指不老实」的误读背后，是她在等你用行动说爱。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B671', bv:'BV11W836nEup', text:'阳是一旦认定方向了以后就一往直前；阴是很容易反复，男阴女阴都是这样；阳不容易反复，直接就一往直前往前冲。', link:'https://www.bilibili.com/video/BV11W836nEup?t=0'},
      {ts:'01:12', videoId:'B680', bv:'BV195g56xEG4', text:'男阳的体现，就是他的事业心会非常强，然后他的自我也会非常强。', link:'https://www.bilibili.com/video/BV195g56xEG4?t=72'}
    ],
    quote:'她冲你稳——两个阳不是对手，是同一个战场的两种打法。',
    videoTitle:'阳性的成长特点',
    jumpUrl:'https://www.bilibili.com/video/BV11W836nEup?t=0',
    compliance:'web+mini',
    shareText:'男阳×女阳：他把她当对手还是同盟？——先松手的人，才是赢家。',
    mirror:'男阳视角的女阳：他把她当对手还是同盟？',
    editorNotes:'总纲 y4-p12 男阳×女阳视角卡（阶4，蓝本待产）；V3.3 §4.8（#243/#42/#197）；证据 B671@00:00/B680@01:12（新核验）；主卡 y4-p21 角力结构见前卡。'
  },
  {
    qaId:'q-y4-p11-01', kpId:'y4-p11', stage:4, category:'关系与配对', scene:['love'], forTypes:['yang-male'],
    question:'男阳 × 男阳：双阳竞技 65%——两匹孤狼怎么共处一个领地',
    answerBrief:'两个男阳同框即进入隐性竞技场；爆发快收尾快，但都难以率先示弱。',
    insight:[
      '竞技本能：两个男阳同框，天然进入「谁扛得住、谁说了算」的隐性竞技场——没有观众，也要分高下。',
      '冲突风格：双方都偏「当面锣对面鼓」——吵架爆发快、收尾也快，极少陷入冷暴力小作文。',
      '共同软肋：互相敬佩对方的果决与边界，但都难以率先示弱——「不留遗憾」哲学让两人都等到最后。',
      '破局关键：竞技场里先放下「谁扛得多谁赢」——从对手到战友，靠的是允许对方看见自己也会累。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B56', bv:'BV1EfE9z7Egt', text:'阳很需要信任，不信任他就缩回去了。信任这个东西是阳最看重的，没有信任的基础的话，阳是不会和你谈爱的。', link:'https://www.bilibili.com/video/BV1EfE9z7Egt?t=0'},
      {ts:'00:00', videoId:'B666', bv:'BV1Fz8i67EgE', text:'战逃反应你知道吧，就是 fight or flight。阳性能量第一本能启动的就是 fight，战斗。', link:'https://www.bilibili.com/video/BV1Fz8i67EgE?t=0'}
    ],
    quote:'两匹孤狼共处一个领地——先低头的那匹，不是输了，是赢了关系。',
    videoTitle:'阳性的信任有多重要',
    jumpUrl:'https://www.bilibili.com/video/BV1EfE9z7Egt?t=0',
    compliance:'web+mini',
    shareText:'男阳×男阳：双阳竞技场里，先示弱的那匹孤狼才是真赢家。',
    mirror:'男阳×男阳：两匹孤狼怎么共处一个领地？',
    editorNotes:'总纲 y4-p11 男阳×男阳双阳竞技（阶4，蓝本待产）；V3.3 §4.8.2（#42/#55）；证据 B56@00:00/B666@00:00（新核验）；K6 评分 65%。'
  },
  {
    qaId:'q-y4-p22-01', kpId:'y4-p22', stage:4, category:'关系与配对', scene:['love'], forTypes:['yang-female'],
    question:'女阳 × 女阳：双阳联盟 70%——两个灯塔互相照亮还是互抢光源',
    answerBrief:'双阳联盟：互相照亮也互抢光源；警惕假性大女主，识别真女阳。',
    insight:[
      '联盟基础：两个女阳同框，可以是最强战友——都懂冲关的孤独，都服实力说话。',
      '警惕假性大女主：识别对方是真女阳还是「装坚强硬撑的」假性大女主——后者会把你拖进她的对抗剧本。',
      '嫉妒暗流：女阳嫉妒能力（遇到实力不相上下的人战斗欲起）——不是他死就是我活；把战斗欲从「压过她」转向「一起更强」。',
      '光源课题：两个灯塔互相照亮还是互抢光源——各发各的光，不为对方的光而自卑，是双阳联盟的修行。'
    ],
    evidence:[
      {ts:'00:07', videoId:'B605', bv:'BV1mNJ8zFEMv', text:'男阴就是巨耐惨，比女阴还要耐惨。', link:'https://www.bilibili.com/video/BV1mNJ8zFEMv?t=7'},
      {ts:'00:00', videoId:'B671', bv:'BV11W836nEup', text:'阳是一旦认定方向了以后就一往直前，直接就一往直前往前冲。', link:'https://www.bilibili.com/video/BV11W836nEup?t=0'}
    ],
    quote:'两个灯塔可以互相照亮——只要谁都不想把对方的光变成自己的光源。',
    videoTitle:'阴阳能量篇（男阴与女阳话题合集）',
    jumpUrl:'https://www.bilibili.com/video/BV1mNJ8zFEMv?t=7',
    compliance:'web+mini',
    shareText:'女阳×女阳：两个灯塔互相照亮还是互抢光源？——各发各的光，是联盟的修行。',
    mirror:'女阳×女阳：两个灯塔互相照亮还是互抢光源？',
    editorNotes:'总纲 y4-p22 女阳×女阳双阳联盟（阶4，蓝本待产）；V3.3 §4.8.12（#605/#247）；证据 BV1mNJ8zFEMv@00:00/B671@00:00（新核验）；K6 评分 70%。'
  },
  {
    qaId:'q-y4-p33-01', kpId:'y4-p33', stage:4, category:'关系与配对', scene:['love'], forTypes:['yin-female'],
    question:'女阴 × 女阴：双阴共鸣 65%——两个小剧场的连播与「比惨」比赛',
    answerBrief:'双阴共鸣：共情深但试探叠加试探，容易陷入「我比你不配得」的比赛与注意力争夺。',
    insight:[
      '共鸣基础：两个女阴同框，共情深度极高——都懂被看见的渴望，都怕被抛弃。',
      '作加作：双方都「作」——试探叠加试探，关系陷入「我比你不配得」的比赛：比惨、比付出、比谁更委屈。',
      '嫉妒爆棚：女阴的嫉妒心简直就是爆棚——注意力争夺激烈；嫉妒对象是「你的注意力」，不是「你的能力」。',
      '破解方向：先把「我比你不配得」的剧本停下——看见对方就像看见自己，抱一抱自己，而不是继续比惨。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B176', bv:'BV1Q6NEziEVz', text:'不是越看你们相处，越觉得这关系不要算了——你看这男阴新的死循环又诞生了，他的理由是这么进阶的。', link:'https://www.bilibili.com/video/BV1Q6NEziEVz?t=0'},
      {ts:'00:00', videoId:'B39', bv:'BV1YJE4zFEJv', text:'阴性方觉得不配得感、自卑都是有的，这主要是因为他在内在深刻的就是相信自己不配被爱，这是阴性的主要问题——不配得。', link:'https://www.bilibili.com/video/BV1YJE4zFEJv?t=0'}
    ],
    quote:'两个小剧场连播的结局不是共鸣，是比惨——先停下的人，才有资格谈共鸣。',
    videoTitle:'阴性：一万个怂的理由',
    jumpUrl:'https://www.bilibili.com/video/BV1Q6NEziEVz?t=0',
    compliance:'web+mini',
    shareText:'女阴×女阴：试探叠加试探，比惨代替共鸣——双阴组合最危险的剧本。',
    mirror:'女阴×女阴：两个人的小剧场怎么连播？',
    editorNotes:'总纲 y4-p33 女阴×女阴双阴共鸣（阶4，蓝本待产）；V3.3 §4.8.7（#21/#199）；证据 B176@00:00/B39@00:00（新核验）；K6 评分 65%。'
  },
  {
    qaId:'q-y4-p34-01', kpId:'y4-p34', stage:4, category:'关系与配对', scene:['love'], forTypes:['yin-female','yin-male'],
    question:'女阴视角看男阴：读懂他的沉默，别接他的「下头男相」',
    answerBrief:'女阴侧视角：男阴傲娇吃这一套、欲盖弥彰互相装；识别「下头男相」是成全式推开。',
    insight:[
      '傲娇机制：男阴「傲娇孔雀开屏」——女阴正大光明吃这一套；不吃他会觉得「你不识货」，换下一个。',
      '欲盖弥彰：男阴标点符号出卖、余光雷达锁定——女阴识别为「他在装」，双方开始互相装——两个男阴的猜谜游戏。',
      '下头男相：男阴会故意做点事情让你觉得他是渣男，目的是让你下头——这是「成全式分手」，不是真渣。',
      '能量困境：男阴花式吸能量 + 女阴左右手互搏内耗——双方能量都低；破解是先各自回血，再谈关系。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B105', bv:'BV1r1jqzNEKP', text:'男阴的原生家庭是怎样的？实际上就是男阴的家里面肯定有一个极强控制欲的妈，这个妈把男阴的这个自我搓得千疮百孔。', link:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0'},
      {ts:'00:00', videoId:'B176', bv:'BV1Q6NEziEVz', text:'不是越看你们相处，越觉得这关系不要算了——你看这男阴新的死循环又诞生了。', link:'https://www.bilibili.com/video/BV1Q6NEziEVz?t=0'}
    ],
    quote:'他的沉默不是不爱——是千疮百孔的自我，还没学会怎么开口。',
    videoTitle:'【14_原生家庭对男阴的影响】（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0',
    compliance:'web+mini',
    shareText:'女阴×男阴：读懂他的沉默，别接他的下头男相——两个男阴，先互相看见。',
    mirror:'女阴视角的男阴：她读懂他的沉默了吗？',
    editorNotes:'总纲 y4-p34 女阴×男阴视角卡（阶4，蓝本待产）；V3.3 §4.8.9（#22/#159/#114/#44）；证据 B105@00:00/B176@00:00（新核验）；主卡 y4-p43 双阴结构见后卡。'
  },
  {
    qaId:'q-y4-p43-01', kpId:'y4-p43', stage:4, category:'关系与配对', scene:['love'], forTypes:['yin-male','yin-female'],
    question:'男阴 × 女阴：双阴共鸣——互相试探',
    answerBrief:'双阴组合共情极深，但双方都消耗型攻击；双重作互相试探，卡普曼三角易锁死。',
    insight:[
      '共情深度：男阴+女阴，共情深度极高——但双方都偏消耗型攻击，冲突时持续低烈度耗能。',
      '双重作：男阴「作」的拉扯剧本+女阴也「作」——双重作，互相试探；作的核心都是怕失去。',
      '道德高地分手：男阴抢占道德高地式分手→女阴陷入受害者位置→卡普曼三角锁死——谁都不愿先破局。',
      '破局方向：双方都要练「直面冲突」——把试探换成直说；共情是燃料，直说才是引擎。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B105', bv:'BV1r1jqzNEKP', text:'男阴的原生家庭是怎样的？实际上就是男阴的家里面肯定有一个极强控制欲的妈，这个妈把男阴的这个自我搓得千疮百孔。', link:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0'},
      {ts:'00:00', videoId:'B176', bv:'BV1Q6NEziEVz', text:'不是越看你们相处，越觉得这关系不要算了——你看这男阴新的死循环又诞生了，他的理由是这么进阶的。', link:'https://www.bilibili.com/video/BV1Q6NEziEVz?t=0'}
    ],
    quote:'两个都怕失去的人互相试探——直说，是双阴组合唯一的破局方式。',
    videoTitle:'【14_原生家庭对男阴的影响】（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0',
    compliance:'web+mini',
    shareText:'男阴×女阴：共情极深也耗能极深——双阴组合的破局，是把试探换成直说。',
    mirror:'男阴视角的女阴：他的算计在她面前藏得住吗？',
    editorNotes:'总纲 y4-p43 男阴×女阴双阴共鸣（阶4，蓝本待产）；V3.3 §4.8.15（#42/#22/#159/#174/#93）；证据 B105@00:00/B176@00:00（新核验）；视角卡 y4-p34 见前卡。'
  },
  {
    qaId:'q-y4-p44-01', kpId:'y4-p44', stage:4, category:'关系与配对', scene:['love'], forTypes:['yin-male'],
    question:'男阴 × 男阴：双阴理解 70%——两个男阴怎么确认彼此',
    answerBrief:'双阴理解：都懂深潜的孤独；课题是双双练直面冲突——打败 90% 男阴的关键门槛。',
    insight:[
      '理解基础：两个男阴同框，天然懂彼此的沉默与权衡——不需要解释，他也懂你在防什么。',
      '致命门槛：双方都要练「直面冲突」——这是打败 90% 男阴的关键；两个回避者在一起，冲突永远不落地。',
      '比较暗流：嫉妒另一个男阴（谁更被围）——互相比较「谁更被需要」，比的是存在感不是实力。',
      '确认方式：男阴的确认不是靠说，是靠做——为对方打破一次惯例、接住一次狼狈，胜过一万句试探。'
    ],
    evidence:[
      {ts:'00:00', videoId:'B105', bv:'BV1r1jqzNEKP', text:'男阴的原生家庭是怎样的？实际上就是男阴的家里面肯定有一个极强控制欲的妈，这个妈把男阴的这个自我搓得千疮百孔，然后情感绑架、道德勒索。', link:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0'},
      {ts:'00:00', videoId:'B122', bv:'BV1As7WzKEqp', text:'男阴他回头想要把女阳给扯下来，所以你不能那么高，你必须低下来和我平起平坐。', link:'https://www.bilibili.com/video/BV1As7WzKEqp?t=0'}
    ],
    quote:'两个男阴确认彼此的方式，不是试探——是为对方破一次例。',
    videoTitle:'【14_原生家庭对男阴的影响】（重复）',
    jumpUrl:'https://www.bilibili.com/video/BV1r1jqzNEKP?t=0',
    compliance:'web+mini',
    shareText:'男阴×男阴：都懂深潜的孤独——但直面冲突，才是两个男阴唯一的确认方式。',
    mirror:'男阴×男阴：怎么确认彼此？',
    editorNotes:'总纲 y4-p44 男阴×男阴双阴理解（阶4，蓝本待产）；V3.3 §4.8.17（#131/#247）；证据 B105@00:00/B122@00:00（新核验）；K6 评分 70%。'
  }
];
