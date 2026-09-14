# 四型 IP + 24 枚表情包 · Prompt 包 v1

> 日期：2026-09-02 ｜ 配套：`AI资产矩阵与小程序规划_v1.md` 附录 B
> 用法：**我出 prompt，你在网页粘贴 → 挑图 → 下载 → 交给我裁切**。内置生图 credits 消耗 = 0。
> 总量：4 型主 IP + 4 动物伙伴 + 24 枚表情 = **32 张**

---

## 零 · 三步走流程（照做就行）

| 步 | 做什么 | 工具 | 产出 |
|---|---|---|---|
| **Step 1** | 出 4 型定妆照（每型 1 张，不含动物） | 通义万相 / 秒画 | 4 张"标准脸" |
| **Step 2** | 以定妆照为**参考图**，图生图刷剩余 28 张 | 同上（图生图模式） | 28 张（IP 一致） |
| **Step 3** | 需要配字的表情，单独用 Ideogram 出 | Ideogram | 配字版 |

⚠️ **Step 2 是 IP 一致性的关键**。纯文生图刷 24 枚，脸一定变。必须先有定妆照当锚。

---

## 一 · 通用风格锚（每张 prompt 前面都贴这段）

### 中文版（通义万相 / 秒画 / 即梦 / 豆包用）

```
2D 扁平插画，中国水墨与现代扁平设计融合，柔和赛璐璐上色，圆润造型，表情生动，
线条干净利落，品牌吉祥物风格，适合做贴纸和头像，主体居中占画面 70%，
简洁纯色背景，画面中无文字，高清，无水印
```

### English 版（Ideogram / Leonardo / Gemini 用）

```
2D flat illustration, Chinese ink wash meets modern flat design, soft cel-shading,
rounded shapes, expressive face, clean crisp lines, brand mascot style,
sticker-friendly, avatar-friendly, character centered filling 70% of frame,
clean solid background, no text in image, high quality, no watermark
```

---

## 二 · 4 型主 IP（Step 1 定妆照）

> 生成参数：1:1（1024×1024），每型出 4 张挑 1 张最好的当锚。

### ① 男阳 · 承重者（Mountain Bearer）

**中文 prompt：**
```
【风格锚】
一个沉默坚毅的年轻男子，肩膀比头还宽，背上有一座小小的山，山上有微光，
穿暖金色 #C8762E 与朱砂色相间的现代中式长衫，表情平静坚定，
嘴角微微抿起，眼神温和但有力量，站姿沉稳如柱，
脚下有淡淡的晨光，整体气质是"扛起一切但从不说"
```

**English prompt：**
```
【style anchor】
A stoic broad-shouldered young man, shoulders wider than his head,
carrying a small glowing mountain on his back, wearing a modern Chinese
robe in warm gold #C8762E with vermilion accents, calm determined expression,
lips slightly pressed, gentle but powerful eyes, standing steady like a pillar,
soft dawn light at his feet, aura of "carries everything but never speaks of it"
```

### ② 女阳 · 破局者（The Breaker）

**中文：**
```
【风格锚】
一个凌厉优雅的年轻女子，手持长剑劈开晨雾，红色 #D2453C 长袍，
衣摆是锐利的三角形，被风吹起，暗金色配饰，动态站姿，
眼神锐利专注，嘴角带一丝不服输的笑，身后是破晓红光，
整体气质是"不是喜欢一个人扛，是每次想被接住都扑了空"
```

**English：**
```
【style anchor】
A fierce elegant young woman holding a long sword that splits the dawn mist,
red #D2453C robe with sharp triangular hem flying in the wind, dark gold accessories,
dynamic pose, sharp focused eyes, a defiant half-smile,
dawn red light behind her, aura of "not that she likes carrying it alone,
but every time she reached to be caught, she fell through"
```

### ③ 女阴 · 连接者（The Connector）

**中文：**
```
【风格锚】
一个温柔的年轻女子，手提一盏发光的灯，灯光里映出别人的剪影，
月白青色 #4A9A94 的长裙，轮廓柔和圆润，暖灰色点缀，
悲悯的微笑，灯中飘出细细的光线连向远方的身影，身后是月色薄雾，
整体气质是"用心连接每一个人，却常常忘了自己"
```

**English：**
```
【style anchor】
A gentle young woman holding a glowing lantern that reflects silhouettes
of other people, flowing moon-white teal #4A9A94 dress, soft round silhouette,
warm grey accents, compassionate smile, thin threads of light drifting from
the lantern toward distant figures, moonlit mist behind her,
aura of "connects with everyone's heart, yet often forgets her own"
```

### ④ 男阴 · 深潜者（The Diver）

**中文：**
```
【风格锚】
一个沉静内省的年轻男子，独自坐在一面圆镜前，镜中映出整片深海，
靛蓝色 #3F5C8C 与月白色相间的衣袍，表情温柔而若有所思，
坐姿放松，镜中有发光的深海生物游过，身后是暮色深海，
整体气质是"潜得最深的人，看得最清，也说得最少"
```

**English：**
```
【style anchor】
A calm introspective young man sitting alone before a round mirror
that reflects an entire deep ocean, indigo #3F5C8C robe with
moon-white accents, gentle thoughtful expression, relaxed seated pose,
bioluminescent sea creatures drifting in the mirror, twilight deep-sea
background, aura of "the one who dives deepest sees clearest, yet says least"
```

---

## 三 · 4 动物伙伴（Step 2，副角色）

> 出图参数同上 1:1，背景用纯白方便后期抠图。

| 型 | 伙伴 | 中文 prompt（接风格锚） | English prompt（接 style anchor） |
|---|---|---|---|
| 男阳 | **山龟** | 一只圆润的小乌龟，龟壳上长着一座小小的山，暖金色 #C8762E 龟壳，米白色身体，眼神沉稳通透，纯白背景 | A small round turtle with a tiny mountain growing on its shell, warm gold #C8762E shell, cream body, calm knowing eyes, plain white background |
| 女阳 | **破晓鹰** | 一只神气的小鹰雏鸟，喙里衔着一把迷你小剑，赤朱色 #D2453C 羽毛，暗金色喙，眼神桀骜又好奇，纯白背景 | A small spirited eagle chick with a tiny sword in its beak, vermilion #D2453C feathers, dark gold beak, fierce curious eyes, plain white background |
| 女阴 | **月光鹿** | 一只温柔的小鹿，鹿角像小小的树枝，角上挂着一盏迷你小灯，月白青色 #4A9A94 身体，暖灰色鹿角，眼神善良明亮，纯白背景 | A small gentle fawn with antlers like tiny branches, a miniature lantern hanging from them, moon-white teal #4A9A94 body, warm grey antlers, kind luminous eyes, plain white background |
| 男阴 | **深海猫** | 一只优雅的小猫，毛发末端化开成靛蓝色的水，一条发光的鱼绕着尾巴游，靛蓝 #3F5C8C 身体，月白色斑纹，眼神梦幻又通透，纯白背景 | A small sleek cat whose fur dissolves into indigo water at the edges, a single glowing fish swimming around its tail, indigo #3F5C8C body, moon-white markings, dreamy wise eyes, plain white background |

---

## 四 · 24 枚表情清单

> **出图方式**：以对应型定妆照为参考图，图生图，参考强度 0.6–0.7（太高会僵，太低会变脸）。
> 需要配字的（标 🅐）额外用 Ideogram 出一版带文字的。

### A. 日常情绪（8 枚）

| # | 文案 | 型 | 画面描述（接风格锚） | 配字 |
|---|---|---|---|---|
| 1 | 我扛住了 | 男阳 | 抹一把汗，微笑，背上的小山微微发光 | 🅐 |
| 2 | 破防了 | 女阳 | 剑掉在地上，愣住，眼睛睁大 | 🅐 |
| 3 | 今日不想说话 | 男阴 | 缩成一团，深海猫趴在头顶 | 🅐 |
| 4 | 我懂你 | 女阴 | 把灯递向前方，灯里映出对方的影子 | 🅐 |
| 5 | 加油 | 男阳 | 山龟举着一颗小石子，用力往上顶 | 🅐 |
| 6 | 吃瓜 | 女阴 | 捧着瓜子，眼睛亮亮地看戏 | — |
| 7 | 哭唧唧 | 男阳 | 眼泪汪汪，但手还死死扛着山 | 🅐 |
| 8 | 爆笑 | 女阳 | 笑到弯腰，剑插在地上当拐杖 | 🅐 |

### B. 工作吐槽（4 枚）

| # | 文案 | 型 | 画面描述 | 配字 |
|---|---|---|---|---|
| 9 | 又来需求 | 男阳 | 背上的山又多了一座，表情麻木 | 🅐 |
| 10 | 开会中勿扰 | 男阴 | 戴上耳机，整个人缩进深海猫的影子里 | 🅐 |
| 11 | 这个我不背 | 女阳 | 剑横在身前，坚定摇头 | 🅐 |
| 12 | 我来处理 | 女阴 | 提灯接过来，温柔点头 | — |

### C. 关系 / 双生（4 枚）

| # | 文案 | 型 | 画面描述 | 配字 |
|---|---|---|---|---|
| 13 | 你不是真的懂我 | 男阴 | 镜中的倒影与自己姿势不同，侧过脸 | 🅐 |
| 14 | 我想你了 | 女阴 | 灯里映出那个人的剪影，微微低头 | 🅐 |
| 15 | 给我一个拥抱 | 男阳 | 罕见地张开双臂，山从背上滑下来 | 🅐 |
| 16 | 我们聊聊 | 女阳 | 把剑收回鞘，坐下来 | — |

### D. 自嘲 / 破局（4 枚）

| # | 文案 | 型 | 画面描述 | 配字 |
|---|---|---|---|---|
| 17 | 我从不说放弃 | 女阳 | 剑指前方，逆光剪影 | 🅐 |
| 18 | 算了随它去 | 男阳 | 把山放下，直接躺平在地上 | 🅐 |
| 19 | 深夜 emo | 男阴 | 和猫对坐，一起看镜中的海 | — |
| 20 | 重新开始 | 女阴 | 把熄灭的灯重新点亮，火苗刚起 | 🅐 |

### E. 阴阳能量（4 枚）

| # | 文案 | 型 | 画面描述 | 配字 |
|---|---|---|---|---|
| 21 | 阴在涨 | 女阴 | 月相从新月到满月，她站在月光里 | 🅐 |
| 22 | 阳已到 | 男阳 | 日出，他背上的山被晨光镀金 | 🅐 |
| 23 | 能量满格 | 四型 | 四个 IP 并肩站成一排，各自发光 | 🅐 |
| 24 | 我裂开了 | 通用 | IP 从中间一分为二，一半暖金一半靛蓝 | 🅐 |

---

## 五 · 图生图参数（Step 2 关键）

| 工具 | 参数 | 建议值 |
|---|---|---|
| 通义万相 | 参考图强度 | 0.6–0.7 |
| 秒画 | 相似度 | 0.65 |
| Leonardo | Image Guidance | 6–7（Character Reference 开启） |
| Ideogram | 无图生图，用文生图 + 风格 seed 锁定 | — |

**一致性三原则**：
1. 同一型的所有表情，**参考图永远是同一张定妆照**（不要拿上一张表情当参考，会漂移）
2. 风格锚前缀**一字不改**地贴在每段 prompt 前面
3. 出图后若脸变了，**重跑不要改 prompt**，改随机种子（seed）

---

## 六 · 出图后交给我做的（你不用管）

| 项 | 规格 |
|---|---|
| 表情主图 | 240×240 PNG，透明底，**≤500KB** ×24 |
| 表情封面 | 240×240 ×1 |
| 详情页横幅 | 750×400 ×1 |
| 聊天面板图标 | 50×50 ×1 |
| 赞赏引导图 | 750×560 ×1 |
| 赞赏致谢图 | 750×750 ×1 |
| 头像 | 600×600 PNG ×16（4 型 × 4 变体） |

---

## 七 · 合规红线（表情文案与画面）

- ❌ 不出现「测缘分 / 命中注定 / 天造地设 / 前世今生」
- ❌ 不出现「诊断 / 治疗 / 治愈 / 疗愈」（UI 层，正文引用原话可保留）
- ❌ 不出现紫圈玄学符号（星盘 / 塔罗 / 符咒）
- ❌ 不出现真人明星脸
- ✅ 能量口径：用「阴在涨 / 阳已到 / 能量满格」，不用「运势 / 命理」

---

**版本**：v1 ｜ 2026-09-02
**下一步**：你刷出 4 张定妆照 → 发我 → 我锁定风格 → 你刷剩余 28 张 → 我裁切产出提交物料。
