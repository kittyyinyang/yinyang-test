# 阴阳人格 · UI 视觉优化方案 v1

> 性质：纯设计研究文档。只读现状（index.html 共 2899 行，3 个内嵌 `<style>` 块：L7 主样式表 / L524 核心知识卡样式 / L544 功能样式块），产出诊断与可实施建议。**不修改任何代码文件。**
> 目标调性：温暖、疗愈、有东方哲思感；不玄学。核心抓手：把「晨昏光谱」双色体系（阳=晨橙 / 阴=暮蓝）用语义化、有纪律的方式贯彻到全部板块，尤其是近期新增的成长课题、型格纵深、能量剖面。

---

## 一、视觉现状诊断（问题清单）

以下每条都带证据（元素 / 类名 / 当前值 / 行号）。按影响面排序。

### A. 配色与双色语义

| # | 问题 | 证据 |
|---|------|------|
| A1 | **体系外绿色孤例**：首页第 4 张卡「修」图标用了不属于任何 token 的绿色，破坏「阳=橙 / 阴=蓝」的双色语义 | `index.html:764` `<span class="plate-ico" style="color:#7A9C6E;border:1.5px solid rgba(122,156,110,.45);">修</span>` |
| A2 | **同一「暖棕文字」语义有 3 个近似值**，深浅不一、难以维护 | `#8A5A1F`（`.hs-quote` L345 / `.hp-mirror` L352 / `.ps-dim-y` L331）、`#9A5A16`（`.ps-lbl-y` L324）、`#8A6A3A`（`.cat-badge` L172 / `.conf-high` L286） |
| A3 | **阳橙有两个值**：token `--yang:#E8913A` 与按钮渐变 `#F09A42` 并存 | `:root` L15 vs `.btn-cta` L154 `background:linear-gradient(135deg,#F09A42,var(--yang-deep))` |
| A4 | **「阳阴并置」造成语义污染**：一个元素里同时出现橙+蓝渐变，让人误以为存在第三种「混合」概念 | `.hp-dot` L348 `background:linear-gradient(135deg,#E8913A,#4E6E9E)`；`.hp-card` L347 / `.grow-box` L363 背景同为橙→蓝渐变 |
| A5 | **tabbar「成长」无激活色**：六个 tab 中五个有专属激活色，`t-heal` 缺位，激活时 fallback 为墨黑，视觉序列断裂 | L74-78 定义了 `.t-heal` 之外 5 个；`index.html:880` 实际有 `t-heal` |
| A6 | **极性方块与印章体系方向相反**：`.qa-pol-mark` 是「白底+彩色字」，印章家族是「色底白字」，同为「阳/阴」载体却两套视觉语言 | `.qa-pol-mark` L505 `background:rgba(255,255,255,.86);color:#232230` |
| A7 | 新板块大量**硬编码色绕过 token**：成长课题与剖面相关样式几乎不引用 CSS 变量 | `.h-formula` L346 `color:#31486C`；`.h-chip.on` L360 橙渐变；`.ps-fill-y` L327 `#E8913A,#F2B46B` |

### B. 字体与字阶

| # | 问题 | 证据 |
|---|------|------|
| B1 | **字阶过密**：正文 15px 起，实际出现 10 / 10.5 / 11 / 11.5 / 12 / 12.5 / 13 / 13.5 / 14 / 14.5 / 15 / 15.5 / 16 / 16.5 / 17 / 17.5 / 18 / 19 共 18 档，几乎每 0.5px 一级，层级靠「差值」而不是「档位」 | L70/L168/L186/L250/L270/L318 等 |
| B2 | **微型字过多、逼近可读性底线**：8.5px / 10px 出现于正文语境 | `.mm-hub-sub` L426 `font-size:8.5px`；`.mi-date` L439 `font-size:10px`（竖排书脊）；`.adv-badge` L116 10px；`.tabbar a` L70 10.5px；`.scene-chip` L168 10.5px |
| B3 | **关键层级塌缩**：判定卡名字与页面主标题同级；卡片问题与测试题干几乎同级 | `.verdict-name` L270 `28px` ≈ `.page-head h2` L86 `30px`；`.qcard-q` L186 `18px` ≈ `.q-text` L250 `17.5px` |
| B4 | **内联字号泛滥**：JS 模板里散落 `style="font-size:12.5px;color:var(--fog);..."`，绕过样式表字阶与 token 管理 | 结果页 L2749 / L2831 / L2843 等 12 处以上 |
| B5 | **数字与占位符用衬线**：序号、大数字、placeholder 用 serif，可读性与「数字用 tabular 无衬线」的惯例冲突 | `.qcard-q::before` L187、`.qa-pol-count` L516、`.search-box input::placeholder` L400 |
| B6 | 衬线/无衬线混用整体策略合理（标题 serif、正文 sans），但**边界未写明规范**，新板块（heal）出现 `b` 用默认 sans 正文混排，标题感弱 | `.h-step b` L340 `font-size:14.5px` 无 serif 无字重差异 |

### C. 圆角 / 阴影 / 边框

| # | 问题 | 证据 |
|---|------|------|
| C1 | **圆角多值无分层**：除 `--r:19px` 外还有 16 / 14 / 12 / 10 / 8 / 6 / 4 / 3 / 999 多个裸值 | `.pair-card` L380 `16px`；`.r-banner` L564 / `.radar-panel` L571 `14px`；`.q-opt` L251 `14px`；`.share-note` L214 `12px`；`.plate .pv` L144 `10px` |
| C2 | **「淡描边」三种写法并存**：卡片边框有的用 `rgba(35,34,48,.055)`、有的用 `var(--line)`、有的用裸色 | `rgba(35,34,48,.055)`（`.plate` L133 / `.qcard` L182 等）；`var(--line)`（`.mm-group` L429 / `.search-box` L399）；`#E6DECD`（`.ev-item` L194） |
| C3 | **阴影 token 未全员回落**：`--shadow-flat/--shadow-lift` 已很好，但按钮/选中 chip/印章各自自定义阴影 | `.btn-cta` L154、`.chip.on` L164、`.seal-yang` L108、`.gcard:hover` L225 |
| C4 | `.hp-dot` 用 **50% 正圆**，而印章/角标家族全部是「小圆角方章」，几何语言不一致 | `.hp-dot` L348 `border-radius:50%` vs `.seal` L104-113 `border-radius:3-5px` |

### D. 组件一致性

| # | 问题 | 证据 |
|---|------|------|
| D1 | **chips 家族 4 套未收敛**：`.chip`（墨黑实底 on）、`.h-chip`（月蓝底、橙底 on）、`.ps-chip`（月蓝底、hover lift）、`.mm-chip`（白底 hover 变色）——同一「筛选/跳转 chip」职能，4 套状态逻辑 | L163-166 / L359-360 / L334-335 / L432-433 |
| D2 | **同名类跨样式块重复定义并相互覆盖**：`.ev-item`、`.ev-head` 在主样式表与功能样式块各定义一次，后者覆盖前者的 padding/border/display | 主表 `.ev-item` L194（卷轴条 padding 12px 34px）、`.ev-head` L197（flex）；功能块 `.ev-item` L533（flex、padding 8px 2px、`border-bottom:1px dashed`）、`.ev-head` L532（块级） |
| D3 | **hover 行为不统一**：卡片家族有 lift 动效，但 `.pair-card` 只变边框、`.h-zone` 无 hover；**按压态缺失**：除 `.btn` 有 `:active{transform:scale(.97)}` 外，chips / qcard / deep-item / ps-chip / gcard 全部无 `:active`，移动端点击反馈弱 | L151-153 vs L163-166 / L182 / L367 / L334 / L222 |
| D4 | **主按钮与选中 chip 视觉身份混淆**：`.btn` 与 `.chip.on` 用同款墨黑渐变 `linear-gradient(180deg,#312F40,var(--ink))`，用户难以区分「主操作」与「筛选项已选中」 | L151 vs L164 |
| D5 | 顶部品牌 seal（`.brand-seal`）与 `.seal-yang` 视觉几乎相同（同为朱砂方印）但参数各自维护 | L57-61 vs L106-108 |

### E. 信息层级与留白

| # | 问题 | 证据 |
|---|------|------|
| E1 | **问一问首部组件堆叠**：page-head → share-note → reco-box → read-progress → 3 个极性大 tab（移动端竖排约 210px+）→ 2 排 chips → 列表，核心内容被推得很低 | L782-819 |
| E2 | **结果页 7 个 `.r-zone` 同质长滚动**：仅靠 11.5px 的 `.r-tag` 序号区分，无分区视觉锚点，④ 深潜内含 2 个 details + grow-box，长页面易迷失 | L2728-2851 |
| E3 | 我的页**「行为数据回收」面板对普通用户是开发向内容**：小字表格（10-13px）密集排布，与其余卡片留白节奏冲突 | `.ev-panel` L443-453、renderMe L2260-2285 |
| E4 | **首页 hero 移动端首屏密度高**：竖排小字 + 264px 晨昏轮 + 印章 + h1 + 副文案 + CTA，CTA 落在首屏之下 | L121-129 / L653-727 |

### F. 移动端适配

| # | 问题 | 证据 |
|---|------|------|
| F1 | 我的页历史条目信息过挤：seal + 日期书脊 + 类型 + 「职场/情感/家庭 ×2 数字」，375px 下必然换行挤堆 | renderMe L2251-2255；`.me-item` L437-441 |
| F2 | 结果页分享区 4 个按钮在窄屏 2×2 换行，文案长、视觉乱 | L2832-2836 `.q-nav` 四个按钮 |
| F3 | `.ch-head` 吸顶未处理 `env(safe-area-inset-top)`，刘海屏沉浸模式会顶入状态栏 | L231 `top:0`，未加 safe-area |
| F4 | 极性 tab 在 ≤720px 变单列，三个大块竖排占屏高 | L520 `@media(max-width:720px){.qa-pol-tabs{grid-template-columns:1fr;}}` |
| F5 | body `background-attachment:fixed` 三层渐变在 iOS Safari 有已知滚动性能/渲染问题，且 `.container` 透明透出背景，滚动时重绘开销大 | L30-37 |
| F6 | tabbar 六项 label 10.5px 偏小；激活态 icon 只有描边无底色，识别度依赖图标色 | L70-73 |

### G. 空态 / 加载态 / 错误态

| # | 问题 | 证据 |
|---|------|------|
| G1 | **加载态用「空态」样式表达**：测试题卷加载时 `testBox` 塞入 `.empty-tip` 灰字「题卷加载中…」，无 spinner/骨架 | L2508 |
| G2 | **31MB 语料按需注入期间无 loading 反馈**：点搜索后如果触发 `loadCorpusSents`，界面无任何进行中提示 | L2138-2153 / L2157-2160 |
| G3 | 空态只有 `.empty-tip`（居中灰字），无图标、无统一 CTA；数据缺失时用平铺文字「题卷生产中」 | L215 / L2511 |

### H. 无障碍（a11y）

| # | 问题 | 证据 |
|---|------|------|
| H1 | **大量 div/span 挂 onclick 模拟按钮**：`.qcard` / `.gcard` / `.deep-item` / `.ps-chip` / `.h-chip` / `.reco-item` / `.pair-card` 等均不可聚焦，键盘与读屏不可达；`-webkit-tap-highlight-color:transparent` 又去掉了原生点击反馈 | L24；`qaCardHtml` L1940、renderHeal L2338 |
| H2 | 部分小字标签对比度临界：`.ps-lbl-y` 字色 `#9A5A16` 落在 `rgba(232,145,58,.16)` 底上对比约 3.2:1；`.conf-high` 字色 `#8A6A3A` 对比约 4:1 | L324 / L286 |
| H3 | 行内可点目标偏小：`.deep-item` 行高仅 padding 9px、`.hs-go` 12px，低于 44px 点击目标建议 | L367 / L343 |

---

## 二、设计原则（5 条）

1. **双色语义贯穿，一次一色**：阳=晨橙、阴=暮蓝、中性=墨/纸/琥珀。任何单个元素只承担一种极性；「合盘 / 调和 / 总纲」用中性琥珀或墨表达，**不在一个元素里塞橙+蓝渐变**（A4 是反面案例）。
2. **层级靠字阶，不靠花活**：收敛字阶到 8 档以内；强调用「字重 + 行高 + 留白」而非叠加渐变、阴影、衬线。禁止 0.5px 碎字号。
3. **Token 先行，杜绝硬编码**：颜色 / 圆角 / 阴影 / 间距 / 字阶全部走 CSS 变量；JS 模板中的内联 `font-size` / `color` 一律抽成语义类（如 `.r-note`）。
4. **组件收敛，一套一种**：同一职能只保留一个组件 + modifier。chips 收敛为 `.chip` 一系；卡片边框、hover、`:active` 行为全局统一。
5. **移动优先，反馈即时**：默认按压态（`:active` scale/底色）、可点目标 ≥44px、加载 / 空 / 错三态都有明确反馈；装饰（印章 / 笔触 / 噪点）每屏 1-2 处，克制使用。

---

## 三、设计令牌（Design Tokens）

### 3.1 色板（在现有基础上微调，保持品牌连续性）

现有：`:root`（L13-23）。建议扩展如下——**只新增、不改旧值**（低风险）：

```css
:root{
  /* —— 现有保留 —— */
  --paper:#FAF7F2; --card:#FFFFFF; --ink:#232230; --ink-2:#4A4754; --fog:#6F6C7B;
  --yang:#E8913A; --yang-deep:#C9742A; --amber:#D4A574;
  --yin:#4E6E9E; --yin-deep:#3A5480; --moon:#EAF0F7;
  --cinnabar:#B5483A; --line:#E9E2D6; --soft:#F4EFE7;
  --r:19px;
  --serif:"Noto Serif SC","Songti SC","STSong","SimSun",serif;
  --shadow-flat:0 1px 2px rgba(35,34,48,.05),0 10px 28px -14px rgba(35,34,48,.13);
  --shadow-lift:0 2px 5px rgba(35,34,48,.06),0 18px 42px -16px rgba(35,34,48,.22);
  --noise:url("data:image/svg+xml,%3Csvg ...");

  /* —— 新增：语义色阶（收敛 A2/A3/A7 的三个近似棕） —— */
  --yang-ink:#8A5A1F;        /* 阳侧文字强调，统一替换 #8A5A1F / #9A5A16 / #8A6A3A */
  --yang-soft:rgba(232,145,58,.10);   /* 阳侧浅底 */
  --yin-ink:#31486C;         /* 阴侧文字强调，替换硬编码 #31486C */
  --yin-soft:rgba(78,110,158,.10);    /* 阴侧浅底 */
  --amber-ink:#8A6A3A;       /* 中性琥珀文字（cat-badge 沿用，并入统一棕） */
  --amber-soft:rgba(212,165,116,.12); /* 中性浅底 */

  /* —— 新增：边框与描边 —— */
  --card-line:rgba(35,34,48,.055);    /* 卡片淡描边，统一 C2 三种写法 */
  --line-strong:rgba(35,34,48,.12);   /* 次级描边（输入框、图表） */

  /* —— 新增：圆角分层 —— */
  --r-sm:10px; --r-md:14px; --r-lg:24px; --r-full:999px;

  /* —— 新增：间距（8pt 网格）—— */
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:20px; --sp-6:24px; --sp-8:32px;

  /* —— 新增：字阶（对应第 3.2 节）—— */
  --fs-11:11px; --fs-12:12px; --fs-13:13px; --fs-15:15px; --fs-17:17px;
  --fs-18:18px; --fs-20:20px; --fs-24:24px; --fs-28:28px; --fs-32:32px;
}
```

关键微调建议：
- `--yang-ink:#8A5A1F` 作为**唯一的阳侧深色文字**（替代 A2 三个近似值）。
- 删除体系外绿色 `#7A9C6E` 的用法（A1）。
- `.btn-cta` 渐变首色改为 `var(--yang)`（收敛 A3）。

### 3.2 字阶表（收敛 B1/B3/B4/B5）

| 档位 | 尺寸 | 用途 | 当前对应（替换目标） |
|---|---|---|---|
| Display | 32px | 仅桌面 hero h1 | `.hero h1` 桌面 42→32（若保持 42 则定义为 `--fs-42`，二选一） |
| H1 | 28px | 页面主标题 / 判定卡型名 | `.page-head h2` 30→28；`.verdict-name` 28 保留 |
| H2 | 24px | 章节转场标题 | `.ch-intro h3` 28→24（配合加字重/留白补偿） |
| H3 | 20px | 卡片块标题 | `.plate h3` 19→20 |
| Q | 18px | 问题 / 卡片核心问题 | `.qcard-q` 18、`.q-text` 17.5→18 |
| Body | 15px | 正文 | `body` 15、`.quote` 15 |
| Body-2 | 13px | 辅助正文 | 13 / 13.5 / 14 / 14.5 → 13 或 15 就近对齐 |
| Cap | 12px | 说明、meta、按钮小字 | 11.5 / 12 / 12.5 → 12 |
| Tag | 11px | 标签、徽标、印章角标 | 10.5 / 11 / 11.5 → 11 |
| Micro | — | **禁用 8.5 / 10px 正文**（仅印章内可保留 10px） | `.mm-hub-sub` 8.5→11 或删除 |

数字规范：数字一律 `font-variant-numeric:tabular-nums` + 无衬线（`.num` 已存在，推广到 `.qa-pol-count`、`.qcard-q::before` 等）。

### 3.3 圆角 / 阴影 / 边框 / 间距

```css
/* 圆角（替换 C1 所有裸值） */
卡容器          → var(--r-lg) 或 var(--r)   /* 19-24px */
次级容器/输入/选项 → var(--r-md)              /* 14px */
行内块/小图块    → var(--r-sm)               /* 10px */
徽标/chips      → var(--r-full)              /* 999px */
印章           → 3-5px（保持小圆角方章，勿用正圆）

/* 阴影（替换 C3 自定义项） */
按钮默认        → var(--shadow-flat)
按钮悬停        → var(--shadow-lift)
选中态         → 不靠阴影表达，靠「实底 + 文字反白」表达（与 .chip.on 一致）
印章           → 建议新增 --shadow-seal:inset 0 0 0 1px rgba(255,240,230,.34),inset 0 0 10px rgba(88,14,7,.5),0 2px 6px rgba(181,72,58,.28);

/* 边框（替换 C2 三种写法） */
卡片描边        → var(--card-line)
输入框/图表描边  → var(--line-strong)
分隔虚线        → rgba(233,226,214,.8)（保留，统一到 --line 变体）

/* 间距 */
统一 8pt 网格（--sp-*）；卡片内边距取 --sp-5（20px）；块间距取 --sp-4~--sp-6。
```

### 3.4 图标与印章规范

- **印章（seal）是品牌锚点，需收敛**：尺寸族 `sm 27px / md 38px / lg 64px / xl 72px`；旋转角规范为 ±2° 两档（`.seal-yang` -2°、`.seal-yin` +2°），**禁止任意 -2.5° / -3° 的散值**（L116 adv-badge -3°、L238 ch-seal -2.5° 收敛为 -2°）。
- **印章只承载「阳 / 阴 / 章序」三类语义**，一律色底白字（A6 的 `.qa-pol-mark` 反转为该规范）；内容为单字时用 0.5 字高，双字竖排时用 0.33 字高（对齐 `_cxSeal` 画布逻辑 L1327-1334）。
- **图标**：全部使用文字/emoji 单字（测/问/搜/修/我），建议替换 `☀☾` 为「阳/阴」单字或保留但统一字形语气；场景 emoji（💗💼🏠）保持一致使用，不混入图形图标。

---

## 四、组件规范升级（属性级建议）

### 4.1 卡片（`.plate / .qcard / .h-zone / .pair-card / .s-corpus / .me-item`）

统一为「卡片协议」：

```css
/* 统一：描边 + 双档阴影 + 统一 hover/active */
.card-base{
  background:var(--card);
  border:1px solid var(--card-line);
  border-radius:var(--r);
  box-shadow:var(--shadow-flat), inset 0 1px 0 rgba(255,255,255,.85);
  transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.card-base:hover{ transform:translateY(-2px); box-shadow:var(--shadow-lift), inset 0 1px 0 rgba(255,255,255,.85); }
.card-base:active{ transform:translateY(0) scale(.99); }
```

- `.pair-card`：`border-radius:16px→var(--r)`；补 `:active`。
- `.h-zone`：补 hover/active（与卡片协议一致）。
- 卡内描边 `rgba(35,34,48,.055)` 全部替换为 `var(--card-line)`。

### 4.2 按钮（`.btn / .btn-cta / .btn-ghost`）

```css
/* 收敛 A3 */
.btn-cta{ background:linear-gradient(135deg,var(--yang),var(--yang-deep)); }
/* 按压态统一（已有 .btn:active，补充 ghost/sm 继承） */
.btn:active{ transform:scale(.97); }
/* ghost 描边统一 */
.btn-ghost{ border:1.5px solid var(--line); }
```

- **主操作与选中 chip 解耦**（D4）：按钮保留墨黑实底为「主操作」专属；`.chip.on` 改为「品牌色实底」区分（见 4.3）。

### 4.3 Chips 收敛（D1）—— 一套 `.chip` + modifier

```css
/* 基础 */
.chip{ border:1px solid var(--line); background:var(--card); color:var(--fog);
  border-radius:var(--r-full); padding:5px 15px; font-size:var(--fs-12); cursor:pointer;
  transition:all .2s; }
.chip:hover{ color:var(--ink); border-color:var(--amber); }
.chip:active{ transform:scale(.96); }

/* 选中：品牌色实底（区别于按钮的墨黑） */
.chip.on{ background:linear-gradient(135deg,var(--yang),var(--yang-deep));
  color:#fff; border-color:transparent; font-weight:600;
  box-shadow:0 4px 12px -5px rgba(201,116,42,.55); }

/* modifier：阴侧 / 中性侧 / 微缩（结果页维度卡） */
.chip--yin.on{ background:linear-gradient(135deg,var(--yin),var(--yin-deep)); box-shadow:0 4px 12px -5px rgba(58,84,128,.55); }
.chip--sm{ padding:3px 10px; font-size:var(--fs-11); }
```

映射：`.h-chip`→`.chip`（on 色用阳橙或阴蓝按语境选）；`.ps-chip`→`.chip chip--sm`（on 态按维度极性选色）；`.mm-chip`→`.chip`（hover 用 `var(--gc)` 逻辑保留，改为 CSS 变量驱动）。

### 4.4 进度条（`.progress-bar / .k-bar / .ps-track / .pillar-bar / .rp-bar`）

统一为「双色轴 + 明确最小可视高度」：

```css
/* 主干进度（测试页） */
.progress-bar{ height:6px; background:rgba(233,226,214,.85); }  /* 4→6px，弱视可见 */
.progress-fill{ background:linear-gradient(90deg,var(--yang),var(--amber)); transition:width .4s; }

/* 剖面双轴（能量剖面 / 型格柱） */
.ps-track{ height:10px; background:rgba(35,34,48,.06); }
.ps-fill-y{ background:linear-gradient(90deg,var(--yang),#F2B46B); }   /* 渐变可保留但首尾色回 token */
.ps-fill-n{ background:linear-gradient(90deg,var(--yin),#7C99C4); }
.ps-lbl-y{ color:var(--yang-ink); background:var(--yang-soft); border:1px solid rgba(232,145,58,.35); }
.ps-lbl-n{ color:var(--yin-ink);  background:var(--yin-soft);  border:1px solid rgba(78,110,158,.32); }
```

### 4.5 Tag / 徽标

- `.r-tag`：保留「小字 + 分隔渐变线」的仪式感（已是全站最好的层级锚点之一），但字色 `--fog`→`var(--yang-ink)` 或保持 fog 均可，建议统一用 `--ink-2` 以提升可读性。
- `.core-badge`（朱砂实底）与 `.seq-badge`（浅灰描边）语义清晰，保留；字色统一 tabular。
- `.pair-tag`：四态（best/mirror/challenge/same）已是语义化的范例，把 `#8A6A3A`/`var(--yin-deep)`/`var(--cinnabar)` 收进 token 即可。

### 4.6 知识卡详情（`.qcard` 展开区）

- 修复 **D2 同名类覆盖**：合并两处 `.ev-item` / `.ev-head` 定义。建议以功能样式块的 `.ev-item`（flex、跳转按钮）为最终形态，主样式表只保留其 `border-radius` 与底色装饰，删去冲突的 `padding/border` 覆盖：
  ```css
  .ev-item{ display:flex; gap:10px; align-items:flex-start; padding:10px 12px;
    background:linear-gradient(90deg,var(--yang-soft),rgba(250,247,242,.4));
    border:1px solid var(--card-line); border-radius:var(--r-sm); margin-bottom:10px; }
  ```
- `.deep-wrap` 的 `▸/▾` 三角（L374-375）与东方质感不搭，建议换为印章小方点：
  ```css
  details.deep-wrap summary::before{ content:''; display:inline-block; width:8px; height:8px;
    margin-right:8px; border-radius:2px; transform:rotate(45deg);
    background:linear-gradient(135deg,var(--yang),var(--amber)); }
  details.deep-wrap[open] summary::before{ background:linear-gradient(135deg,var(--yin),var(--moon)); }
  ```

### 4.7 空态 / 加载态 / 错误态（G1-G3）

```css
/* 加载态：轻量 spinner，替代 empty-tip 复用 */
.spinner{ width:26px; height:26px; margin:0 auto 12px; border-radius:50%;
  border:3px solid var(--line); border-top-color:var(--yang); animation:spin .8s linear infinite; }
@keyframes spin{ to{ transform:rotate(360deg); } }

/* 空态：图标 + 文案 + 可选 CTA */
.empty-state{ text-align:center; padding:var(--sp-8) var(--sp-4); color:var(--fog); }
.empty-state .es-ico{ font-size:30px; opacity:.5; margin-bottom:8px; }
```

落地点：L2508 加载 → `<div class="empty-state"><span class="spinner"></span><div>题卷加载中…</div></div>`；搜索 31MB 语料注入期间同样挂 spinner（L2157-2160）。

---

## 五、关键页面布局优化

### 5.1 首页（page-home）

1. **移动端 hero 压缩首屏**：晨昏轮 264px 在 hero 最顶，建议移动端降至 180-200px（`@media(max-width:720px){.wheel{width:200px;height:200px}}`），让 h1 与 CTA 提前进入首屏。
2. **hero-vertical 横排小字改短文案**：移动端「万物负阴而抱阳」12.5px 横排占一行，建议桌面保留竖排、移动端改为 11px 居中短句（如「负阴抱阳 · 认识自己」）。
3. **「修」卡图标去绿**（A1）：`style="color:#7A9C6E;..."` → `style="color:var(--yin);border:1.5px solid rgba(78,110,158,.4);"`，与「搜」卡同构。
4. **last-strip / daily-card 对齐**：两者已是同构卡片，统一使用 `--card-line` 描边与 `var(--r)` 圆角（`last-strip` 的 `rgba(35,34,48,.055)`→`var(--card-line)`）。

### 5.2 结果页（result-wrap）

1. **r-zone 分区锚点**（E2）：为 7 个 zone 的 `.r-tag` 增加统一图标字（①②③…已具备）+ 每个 zone 顶部 2px 主题色分隔线（`①判定/⑤分享` 朱砂，`③剖面` 用阴阳渐变，`④深潜` 用阴蓝），制造滚动节奏。
2. **④ 深潜默认折叠一半**：`details.deep-wrap` 默认收起（已实现），把 `grow-box` 提到 ③ 剖面末尾，避免深潜区过长。将散落的 inline 说明文字（`style="font-size:12.5px;color:var(--fog);..."` L2749/2831/2843 等）统一抽为 `.r-note{ font-size:var(--fs-12); color:var(--fog); margin-top:var(--sp-2); }`。
3. **分享按钮组移动端纵向化**：`.q-nav` 四按钮在 375px 下改纵向单列（`@media(max-width:480px){.result-wrap .q-nav{flex-direction:column}.result-wrap .q-nav .btn{width:100%}}`）。
4. **判定卡名字升阶**（B3）：`.verdict-name` 28→32px（作为 H1 级），与页面 h2 拉开差距。

### 5.3 问一问（page-qa）

1. **头部重组降噪**（E1）：极性 tab 在移动端由「3 列竖排」改为「3 张横滑卡」（`@media(max-width:720px){.qa-pol-tabs{display:flex;overflow-x:auto;gap:10px;scroll-snap-type:x mandatory}.qa-pol-tab{flex:0 0 72%;scroll-snap-align:start}}`），把列表提前。
2. **share-note 仅在有分享场景时展示**（当前常态为空，保留逻辑即可）；reco-box 加「为你推荐」小标题，与 read-progress 之间加大间距。
3. **`.qa-pol-mark` 反转为印章规范**（A6）：`background:rgba(255,255,255,.86)` 改为色底白字（yang 侧朱砂、yin 侧黛蓝），或至少统一 `border-radius:4px` 与印章一致。

### 5.4 成长课题（page-heal）

1. **方法线三卡加序号印章**：`.h-step` 前加 `seal seal-sm`（01/02/03）或沿用 `.qcard-q::before` 的计数印章，替代目前仅靠 `b` 文字。
2. **h-formula 语义修正**（A4）：把橙蓝同框的 `.h-formula`（阴蓝硬编码 `#31486C`）改为中性处理——`color:var(--ink-2);background:var(--soft);border:1px dashed var(--line);` 或保留阴蓝但只作单侧色。
3. **hp-dot 去双极**：`.hp-dot` 从 `linear-gradient(135deg,#E8913A,#4E6E9E)` 改为单一中性琥珀 `linear-gradient(135deg,var(--amber),var(--yang-deep))`（“今日练习”属中性日常动作），或直接复用 `.seal` 家族。
4. **h-chip 并入 .chip 体系**（D1）：按 4.3 映射，on 态取阳橙。

### 5.5 我的（page-me）

1. **历史条目移动端重组**（F1）：`.mi-sc`（三场景 ×2 数字）在窄屏折叠为仅显示「职场 阳60%·阴40%」，情感/家庭收纳进展开或省略；或改为两行布局：第一行 seal+类型+日期，第二行场景数字。
2. **行为数据面板降级**（E3）：默认折叠为一行摘要（`<details>` 包住 `.ev-panel`），文案从「行为数据回收」改为「数据小站（内测）」之类温和措辞，缩小对普通用户的噪音。
3. **me-item 与 last-strip 统一**：两者同构，统一用 `.card-base` 协议。

---

## 六、新板块视觉融入（与主视觉统一）

| 板块 | 现状 | 融入方案（具体） |
|---|---|---|
| **成长课题** | 硬编码色（#8A5A1F / #31486C）、hp-dot 双极渐变、h-chip 独立体系 | 全部硬编码色回落到 `--yang-ink/--yin-ink/--yang-soft/--yin-soft`；hp-dot/h-formula 改单侧色或中性；h-chip→.chip；h-step 加序号印章；h-zone 纳入卡片协议（hover/active） |
| **型格纵深（deep dive）** | `details.deep-wrap` 裸三角 ▸/▾、deep-item 无序号 | 三角改印章小方点（4.6）；`.deep-item .dq` 前加 `.qcard-q::before` 同款计数章（或至少左侧 3px 阴蓝竖线）；`grow-box` 背景橙蓝同框改单侧 `--yang-soft` |
| **能量剖面（profile）** | `☀/☾` emoji、ps 系列颜色硬编码 | `☀`→「阳」/`☾`→「阴」单字（配 `--yang-ink/--yin-ink` 色）；ps-lbl/ps-fill 回 token（4.4）；ps-chip→.chip--sm；维度卡 hover 补 `:active` |
| **合盘 / 配对** | `.syn-zone`/`.pair-card` 双印对望，语义已经很好 | 保留；`pair-card` 圆角 16→`var(--r)`；`.syn-seal` 尺寸 68px 对齐 xl 档 72px 或定义 68 为一档 |
| **tabbar** | t-heal 缺激活色 | 补 `.tabbar a.on .ticon.t-heal{color:var(--yang-deep);}`（或阴蓝，取决于「成长」品牌归属；建议 `--yang-deep` 与「修」区分） |

---

## 七、实施优先级

### P0 — 立即可改（低风险纯样式，不碰结构/逻辑）

| 项 | 动作 | 风险 |
|---|---|---|
| 1 | 补 `.tabbar a.on .ticon.t-heal` 激活色（A5） | 零风险，纯加规则 |
| 2 | 首页「修」plate-ico 去绿 → `var(--yin)`（A1） | 零风险，纯改值 |
| 3 | 收敛硬编码棕/蓝：`#8A5A1F→var(--yang-ink)`、`#9A5A16→var(--yang-ink)`、`#31486C→var(--yin-ink)`（A2/A7） | 低，仅替换颜色值 |
| 4 | 新增 token（3.1 色板/圆角/间距/字阶变量） | 零风险，只加不改 |
| 5 | `.btn-cta` 渐变 `#F09A42→var(--yang)`（A3） | 零风险 |
| 6 | 圆角裸值收敛：pair-card 16→`var(--r)`、r-banner/radar-panel 14→`var(--r-md)`（C1） | 低，纯数值 |
| 7 | 合并重复定义的 `.ev-item`/`.ev-head`（D2），按 4.6 给最终形态 | 低，需回归问一问/搜一搜卡片展开态 |
| 8 | 加载态加 spinner、搜索语料注入加 loading 反馈（G1/G2） | 低，加 CSS 类 + 改 2 处模板字符串 |
| 9 | chips/卡片补 `:active` 按压（D3） | 低，纯加规则 |
| 10 | `.deep-wrap` 三角改印章方点（4.6） | 低，纯样式 |
| 11 | 字阶就近对齐（B1）：10.5→11、13.5/14.5→13/15、17.5→18、16.5→17 | 低，逐条替换（需回归截图对比） |

### P1 — 随功能迭代

1. 结果页 r-zone 分区锚点 + `.r-note` 抽取内联样式（E2/B4）。
2. 问一问极性 tab 移动端横滑（5.3/F4）。
3. 我的页行为面板折叠 + 历史条目移动端重组（5.5/E3/F1）。
4. 结果页分享按钮移动端纵向化（F2）。
5. 无障碍基础：onclick 元素补 `role="button"` + `tabindex="0"` + Enter 键处理，或渐进替换为 `<button>`（H1）。
6. `.ch-head` 补 `env(safe-area-inset-top)`（F3）。
7. 对比度微调：`.ps-lbl-y` 底/字比、`.conf-high` 字色（H2）。
8. body `background-attachment:fixed` 在移动端降级为 `scroll` 或固化为单层渐变（F5）。
9. `.qa-pol-mark` 反转印章规范（A6）。

### P2 — 远期

1. **组件库化**：chips 单组件多 modifier（.chip--yin/.chip--sm/.chip--icon），卡片协议 `.card-base` 全站套用。
2. **深色模式**：`prefers-color-scheme: dark` 色板映射（token 化之后此成本极低）。
3. **印章规范族**：旋转角 ±2° 两档、尺寸族 27/38/64/72 全站校准（3.4）。
4. **动画性能**：晨昏轮 60s 自转、能量条 8s 循环对低功耗设备降级（`prefers-reduced-motion` 已有全局关闭，可加 `@media(max-width)` 关闭 fixed 背景重绘）。
5. **字体加载**：`Noto Serif SC` 当前依赖本地字体栈，若引入 webfont 需考虑 `font-display:swap` 与 CJK 体积。

---

## 附：一句话总结

问题最集中的地方是**「新板块绕过 token、硬编码 + 双极并置」**（成长课题/剖面/深潜）与**「字阶碎片化、组件未收敛」**；最高优先级建议是 P0 第 1-3 项（tabbar 补色、去绿、硬编码色收敛），三者合计改动量小、零结构风险，即可显著拉平新旧板块的视觉统一度。
