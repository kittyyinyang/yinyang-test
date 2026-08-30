// data_pair.js — 配对报告数据（10 键：6 异型对 + 4 同型对）
// 异型对：旧站 RESULT_DATA.pairGuide 反查改写；同型对：语料 B666/B678。
// 键按 CANON 顺序规范化，查找时正反方向都应尝试（见页面 findPair）。
var PAIR_DATA = 
{
 "yang-male|yin-female": {
  "a": "yang-male",
  "b": "yin-female",
  "headline": "经典阴阳配 · 互相成全",
  "tag": "最佳拍档",
  "text": "最经典的阴阳平衡。她擅长连接和付出，你擅长担当和保护。但需警惕：她的「付出」容易被你当成理所当然——看见彼此的给予，是这门功课的全部。",
  "quote": "阳者学柔，阴者学刚——配对是彼此的修行道场。",
  "jumpUrl": ""
 },
 "yang-male|yang-female": {
  "a": "yang-male",
  "b": "yang-female",
  "headline": "强强相遇 · 并肩或较劲",
  "tag": "强强相遇",
  "text": "两个阳性内核容易成为战友，也可能变成权力博弈。课题是：不要竞争谁更强大，学会互相钦佩——你拼你的局，他守他的城，不抢方向盘。",
  "quote": "两个阳互相不来电——可做战友，不可能亲密；但做事业上的头狼同盟，没人比你们更合适。",
  "jumpUrl": "https://www.bilibili.com/video/BV1A7gK6HEmc"
 },
 "yang-male|yin-male": {
  "a": "yang-male",
  "b": "yin-male",
  "headline": "镜像对照 · 一个向外一个向内",
  "tag": "镜像对照",
  "text": "你们都习惯沉默，但他向内、你向外。事业上你冲锋他兜底；亲密关系中，你们需要一个人先开口——先开口的那个人，不是输，是先长大。",
  "quote": "阳的沉默是扛，阴的沉默是藏——读懂对方的沉默，关系才开始。",
  "jumpUrl": ""
 },
 "yang-female|yin-male": {
  "a": "yang-female",
  "b": "yin-male",
  "headline": "经典阴阳配 · 互补拉扯",
  "tag": "最佳拍档",
  "text": "你最互补的配对。你负责破局和行动，他负责深度感受和连接。他能接住你的强度，你能把他从过度思考中拉出来。她是你的铠甲，你是她的港湾。",
  "quote": "阳者学柔，阴者学刚——配对是彼此的修行道场。",
  "jumpUrl": ""
 },
 "yang-female|yin-female": {
  "a": "yang-female",
  "b": "yin-female",
  "headline": "镜像对照 · 你是她羡慕的样子",
  "tag": "镜像对照",
  "text": "她是你「不愿意成为」的自己——柔软、依赖、会撒娇；反过来，你是她羡慕的样子。你们可以互相学习，但别互相改造、互相评判。",
  "quote": "阴者不必装阳，阳者不必装柔——做自己，才接得住对方。",
  "jumpUrl": ""
 },
 "yin-female|yin-male": {
  "a": "yin-female",
  "b": "yin-male",
  "headline": "镜像对照 · 谁先稳定下来",
  "tag": "镜像对照",
  "text": "你们都敏感、都怕被抛弃、都容易想太多。你们能深度理解彼此，但也可能一起沉入情绪漩涡。课题是：谁来当那个先稳定下来的人？",
  "quote": "两个阴的结合是共生——彼此缺爱，互补童年安全感的缺失；先自爱，才养得起这段关系。",
  "jumpUrl": "https://www.bilibili.com/video/BV1UjMX6DE33"
 },
 "yang-male|yang-male": {
  "a": "yang-male",
  "b": "yang-male",
  "headline": "同型对 · 战友不来电",
  "tag": "同型对",
  "text": "两个男阳互相欣赏、互相点头，却很难来电——你们是彼此最好的战友，不是彼此的亲密关系。别用「感情淡了」解释，这是两个阳的天然互斥。",
  "quote": "两个阳互相不来电——可做战友，不可能亲密。",
  "jumpUrl": "https://www.bilibili.com/video/BV1A7gK6HEmc"
 },
 "yang-female|yang-female": {
  "a": "yang-female",
  "b": "yang-female",
  "headline": "同型对 · 灯塔不相靠",
  "tag": "同型对",
  "text": "两个女阳像两座各自的灯塔——互相照亮，互不靠近。你们能一起打天下，但亲密需要一个人先学会示弱，而这恰恰是你们共同的功课。",
  "quote": "两个阳互相不来电——可做战友，不可能亲密。",
  "jumpUrl": "https://www.bilibili.com/video/BV1A7gK6HEmc"
 },
 "yin-female|yin-female": {
  "a": "yin-female",
  "b": "yin-female",
  "headline": "同型对 · 共生式联结",
  "tag": "同型对",
  "text": "两个女阴能很快热起来——彼此懂、彼此暖。但这段关系的底是共生：靠彼此缺爱维系，情绪一来容易一起下沉。先各自立住，再互相依靠。",
  "quote": "两个阴的结合是共生——彼此缺爱，互补童年安全感的缺失。",
  "jumpUrl": "https://www.bilibili.com/video/BV1UjMX6DE33"
 },
 "yin-male|yin-male": {
  "a": "yin-male",
  "b": "yin-male",
  "headline": "同型对 · 深水里的两个人",
  "tag": "同型对",
  "text": "两个男阴能聊到最深处——敏感对敏感。但谁都不敢先交付时，关系会在「想靠近又退缩」里空转。总得有一个人先全力游上岸，再回来接另一个人。",
  "quote": "两个阴的结合是共生——彼此缺爱，互补童年安全感的缺失。",
  "jumpUrl": "https://www.bilibili.com/video/BV1UjMX6DE33"
 }
}
;
