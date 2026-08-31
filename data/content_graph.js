// 阴阳人格 · 营销内容图谱 v1（机读版）
// 与 docs/营销内容图谱_v1.md 一一对应；W-D4 内容日历生成脚本以本文件为唯一数据源
// 字段：id=选题号 ｜ title=选题 ｜ sourceQa=源资产(qa_core卡/四型slogan/pair键) ｜ hook=钩子文案
//       formats=形式 ｜ cta=承接（测=测评链接 / 卡=知识卡 / 合盘=配对邀请）｜ funnel=获客/转化/留存
//       compliance=✅通用 | ⚠️限平台 | 🚫社媒禁用
var CONTENT_GRAPH = {
  version: 'v1',
  date: '2026-08-30',
  brand: { name: '阴阳人格手记', intro: '20 道人生选择题，测你是哪种能量内核', source: '理论整理自 B站「都是一些小问题」' },
  pillars: [
    {
      id: 'P1', name: '四型人设卡', role: '身份认同传播', mainPlatform: '小红书', subPlatform: ['抖音','视频号'], share: 25, funnel: '获客',
      topics: [
        { id: 'p1x01', title: '男阳人设', sourceQa: 'slogan:yang-male', hook: '扛住了全世界，却扛不住一句「你也可以脆弱」', formats: ['图文卡'], cta: { type: 'test', from: 'p1x01' }, compliance: '✅' },
        { id: 'p1x02', title: '女阳人设', sourceQa: 'slogan:yang-female', hook: '不是我喜欢一个人扛——是每次想被接住，都扑了空', formats: ['图文卡'], cta: { type: 'test', from: 'p1x02' }, compliance: '✅' },
        { id: 'p1x03', title: '女阴人设', sourceQa: 'slogan:yin-female', hook: '我给了这么多，不过是在等一句：你已经足够了', formats: ['图文卡'], cta: { type: 'test', from: 'p1x03' }, compliance: '✅' },
        { id: 'p1x04', title: '男阴人设', sourceQa: 'slogan:yin-male', hook: '你看到的冷漠，是我用尽全力不陷进去的样子', formats: ['图文卡'], cta: { type: 'test', from: 'p1x04' }, compliance: '✅' },
        { id: 'p1x05', title: '四个字看穿一个人', sourceQa: 'types:seals', hook: '四个字看穿你对象：承、破、连、潜——对号入座', formats: ['短视频口播','图文'], cta: { type: 'test', from: 'p1x05' }, compliance: '✅' },
        { id: 'p1x06', title: '四型速查图', sourceQa: 'q-y0-02-01', hook: '一张图分清四种人：一致型两种、错位型两种', formats: ['长图'], cta: { type: 'test', from: 'p1x06' }, compliance: '✅' },
        { id: 'p1x07', title: '你的人格几岁了', sourceQa: 'q-y3-age-01', hook: '成年人的三种心智：幼、少、老——你的内核今年几岁？', formats: ['互动问答'], cta: { type: 'card', kp: 'q-y3-age-01' }, compliance: '✅' },
        { id: 'p1x08', title: 'MBTI 测不准的人看这里', sourceQa: 'q-y0-04-01', hook: 'MBTI 反复横跳的人，可能不是你善变，是壳在答题', formats: ['图文'], cta: { type: 'card', kp: 'q-y0-04-01' }, compliance: '✅' }
      ]
    },
    {
      id: 'P2', name: '差异维度科普', role: '理论词汇表/专业感', mainPlatform: '小红书', subPlatform: ['视频号'], share: 20, funnel: '获客',
      topics: [
        { id: 'p2x01', title: '面对冲突：阴逃阳战', sourceQa: 'q-kp-a2-01', hook: '吵架时先低头的人不一定情商高——可能只是阴性能量的第一本能', formats: ['图文对照卡'], cta: { type: 'card', kp: 'q-kp-a2-01' }, compliance: '✅' },
        { id: 'p2x02', title: '同一恐惧的两个方向', sourceQa: 'q-y1-06-01', hook: '男怕「我不行」，女怕「我不配」——其实是同一个恐惧', formats: ['图文'], cta: { type: 'card', kp: 'q-y1-06-01' }, compliance: '✅' },
        { id: 'p2x03', title: '为什么有人怎么都不累', sourceQa: 'q-y1-08-01', hook: '不是他体质好，是他从不内耗：能量都向外使', formats: ['图文'], cta: { type: 'card', kp: 'q-y1-08-01' }, compliance: '✅' },
        { id: 'p2x04', title: '充电方式暴露内核', sourceQa: 'q-y1-11-01', hook: '周末你靠什么回血？独处补电的阳，被人看见补电的阴', formats: ['互动投票+图文'], cta: { type: 'test', from: 'p2x04' }, compliance: '✅' },
        { id: 'p2x05', title: '说「没事」的两层含义', sourceQa: 'q-y1-07-01', hook: '有的没事是真没事，有的没事是快来问我——喉轮封印', formats: ['图文'], cta: { type: 'card', kp: 'q-y1-07-01' }, compliance: '✅' },
        { id: 'p2x06', title: '直球与试探', sourceQa: 'q-y1-17-01', hook: '他为什么有话不直说？试探=不暴露需求地要确认', formats: ['图文'], cta: { type: 'card', kp: 'q-y1-17-01' }, compliance: '✅' },
        { id: 'p2x07', title: '信任的两种形状', sourceQa: 'q-y1-12-01', hook: '阳的信任是砖墙：建一年，塌一秒，重建要一百件小事', formats: ['图文'], cta: { type: 'card', kp: 'q-y1-12-01' }, compliance: '✅' },
        { id: 'p2x08', title: '边界的两种形态', sourceQa: 'q-y1-18-01', hook: '铜墙铁壁 vs 千疮百孔：你的边界漏电吗？', formats: ['图文'], cta: { type: 'card', kp: 'q-y1-18-01' }, compliance: '✅' },
        { id: 'p2x09', title: '控制的两副面孔', sourceQa: 'q-y1-16-01', hook: '一种控制抢定义权，一种控制抓情绪——识别公式', formats: ['图文'], cta: { type: 'card', kp: 'q-y1-16-01' }, compliance: '⚠️措辞柔和，用识别框架，不用性别指控句式' },
        { id: 'p2x10', title: '成长节奏：直线 vs 螺旋', sourceQa: 'q-y1-15-01', hook: '为什么你总是进两步退一步——阴的成长本来是螺旋', formats: ['图文'], cta: { type: 'card', kp: 'q-y1-15-01' }, compliance: '✅' }
      ]
    },
    {
      id: 'P3', name: '关系与配对', role: '痛点场景+配对（转化主力）', mainPlatform: '小红书', subPlatform: ['视频号','抖音'], share: 25, funnel: '转化',
      topics: [
        { id: 'p3x01', title: '两个阳不来电', sourceQa: 'q-y3-09-01', hook: '强强联手看着爽，为什么处不成？两个阳只做战友不谈亲密', formats: ['图文'], cta: { type: 'test', from: 'p3x01' }, compliance: '✅' },
        { id: 'p3x02', title: '两个阴是共生', sourceQa: 'q-y3-09-01', hook: '两个温柔的人在一起=岁月静好？不，是共生互耗', formats: ['图文'], cta: { type: 'test', from: 'p3x02' }, compliance: '✅' },
        { id: 'p3x03', title: '经典互补：太阳月亮组合', sourceQa: 'pair:yang-male|yin-female', hook: '他扛事她暖家，是童话还是陷阱？互补的另一面', formats: ['图文'], cta: { type: 'pair' }, compliance: '✅' },
        { id: 'p3x04', title: '最强互补90%', sourceQa: 'pair:yang-female|yin-male', hook: '全网嗑的「姐狗恋」为什么真香：女阳×男阴互补分最高', formats: ['图文','短视频'], cta: { type: 'pair' }, compliance: '✅' },
        { id: 'p3x05', title: '追逃死循环', sourceQa: 'q-kp-a2-01', hook: '你越追他越逃：不是不爱，是两种本能对撞', formats: ['短视频情景剧'], cta: { type: 'test', from: 'p3x05' }, compliance: '✅' },
        { id: 'p3x06', title: '为什么你总在关系里猜', sourceQa: 'q-y1-17-01', hook: '他不回消息的 3 小时里，你演完了一整部电影', formats: ['图文共鸣'], cta: { type: 'test', from: 'p3x06' }, compliance: '✅' },
        { id: 'p3x07', title: '情感诈骗为什么专盯你', sourceQa: 'q-y3-b3d-01', hook: '事业有成的她为什么也会被骗：阳壳的裂缝', formats: ['图文'], cta: { type: 'card', kp: 'q-y3-b3d-01' }, compliance: '✅' },
        { id: 'p3x08', title: '和男阳谈恋爱须知', sourceQa: 'traits:yang-male', hook: '和男阳恋爱：他不会哄你，但他会记住每一件大事', formats: ['图文清单'], cta: { type: 'test', from: 'p3x08' }, compliance: '✅' }
      ]
    },
    {
      id: 'P4', name: '测评互动UGC', role: '挑战/晒图/合盘（裂变主力）', mainPlatform: '抖音', subPlatform: ['小红书'], share: 15, funnel: '转化',
      topics: [
        { id: 'p4x01', title: '测完晒图挑战', sourceQa: 'share:image', hook: '测出来是「承」，谁懂啊 #阴阳人格', formats: ['UGC挑战标签'], cta: { type: 'test', from: 'p4x01' }, compliance: '✅' },
        { id: 'p4x02', title: '情侣合盘挑战', sourceQa: 'pair:report', hook: '和对象互测，看双印合不合——评论区晒组合', formats: ['挑战'], cta: { type: 'pair' }, compliance: '✅' },
        { id: 'p4x03', title: '猜他是什么型', sourceQa: 'types:quickref', hook: '猜猜你老板/你爸/你前任是哪种——评论区对答案', formats: ['互动帖'], cta: { type: 'test', from: 'p4x03' }, compliance: '✅' },
        { id: 'p4x04', title: '四型吵架现场', sourceQa: 'q-kp-a2-01', hook: '同一件事四种反应：男阳沉默、女阳开怼、女阴哭、男阴消失——你是哪种', formats: ['情景短视频'], cta: { type: 'test', from: 'p4x04' }, compliance: '✅' }
      ]
    },
    {
      id: 'P5', name: '影视IP联动', role: '蹭搜索流量（角色初判待用户校准）', mainPlatform: '抖音', subPlatform: ['小红书'], share: 10, funnel: '获客',
      topics: [
        { id: 'p5x01', title: '哪吒×敖丙', sourceQa: 'cast:nezha', hook: '哪吒为什么是男阳，敖丙为什么是男阴——一阳一阴才成CP', formats: ['混剪+解说'], cta: { type: 'test', from: 'p5x01' }, compliance: '⚠️文字解说+自绘角色卡，不用剧集截图' },
        { id: 'p5x02', title: '甄嬛传四型', sourceQa: 'cast:zhenhuan', hook: '甄嬛传里的阴阳四型：谁扛、谁破、谁连、谁潜', formats: ['图文','解说'], cta: { type: 'test', from: 'p5x02' }, compliance: '⚠️同上' },
        { id: 'p5x03', title: '知否四型', sourceQa: 'cast:zhiming', hook: '明兰的「扮猪吃老虎」，是女阳的藏锋策略', formats: ['图文'], cta: { type: 'test', from: 'p5x03' }, compliance: '⚠️同上' },
        { id: 'p5x04', title: '繁花四型', sourceQa: 'cast:fanhua', hook: '繁花里的两种女能量：女阴与女阳', formats: ['图文'], cta: { type: 'test', from: 'p5x04' }, compliance: '⚠️同上' }
      ]
    },
    {
      id: 'P6', name: '成长与觉察', role: '深度养粉', mainPlatform: '视频号', subPlatform: ['公众号'], share: 5, funnel: '留存',
      topics: [
        { id: 'p6x01', title: '始发站与平衡站', sourceQa: 'q-y5-08-01', hook: '不是把你修成五五开：阴阳平衡是方向，不是标准答案', formats: ['短视频','图文'], cta: { type: 'card', kp: 'q-y5-08-01' }, compliance: '✅' },
        { id: 'p6x02', title: '阴的课题', sourceQa: 'q-y5-12-01', hook: '学会说「不」，是阴性能量拿回自己的第一步', formats: ['短视频','图文'], cta: { type: 'card', kp: 'q-y5-12-01' }, compliance: '✅' },
        { id: 'p6x03', title: '被接住的练习', sourceQa: 'growth:yang', hook: '让男阳学会「被接住」，比让他扛一百件事都难', formats: ['短视频'], cta: { type: 'test', from: 'p6x03' }, compliance: '✅' },
        { id: 'p6x04', title: '情与欲', sourceQa: 'q-B714-01', hook: '欲是身体的需求，情是自我的补充', formats: ['公众号长文'], cta: { type: 'card', kp: 'q-B714-01' }, compliance: '🚫社媒禁用，仅公众号/知乎' }
      ]
    }
  ],
  formulas: [
    '对照式：同一件事，两种人：A____，B____',
    '反直觉式：____的人，不是____，而是____',
    '悬念式：四个字/一张图/20道题，看穿____',
    '共鸣式：为什么你总是____——原来是因为____',
    '身份式：测出「承/破/连/潜」的进｜____型人格的自我修养',
    'MBTI蹭量式：MBTI 之后，试试这个中国自己的____｜MBTI 测不准的人，____'
  ],
  rules: {
    weeklyMix: { P1: 2, P2: 2, P3: 2, P4: 1, P5: 0.5, P6: 0.5 },
    platformPerWeek: { 小红书: '3-4', 视频号: '2-3', 抖音: '2-3' },
    noSamePillarTwoDays: true,
    contentStructure: '钩子(question改写) + 要点(insight前3条) + 金句(quote) + CTA(表内指定)',
    forbidden: ['双生/九楼/紫圈内容不进任何社媒', '情与欲(q-B714)仅公众号长文', '性别指控句式', '剧集截图/长片段'],
    sourceLine: '理论整理自 B站「都是一些小问题」，完整体系见站内',
    diversion: { 小红书: '评论区/简介引导搜「阴阳人格手记」，不放链接', 视频号: '挂公众号/小程序组件', 抖音: '主页+粉丝群暗语，不出现微信字样' },
    fromCode: { 小红书: 'x', 抖音: 'd', 视频号: 's', 公众号: 'g' },
    dataLoop: '每周记录互动数 → 淘汰低互动选题式，高互动式进加倍池'
  }
};
// END
