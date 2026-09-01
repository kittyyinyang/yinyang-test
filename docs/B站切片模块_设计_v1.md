# 阴阳人格 · B站切片模块 设计文档 v1

> 性质：**设计文档（详规）**。定位前端卡片渲染逻辑，确认 evidence/videoTitle/jumpUrl 展示现状，设计「站内 B站切片播放模块」方案。**未改任何代码**，经确认后实施。
> 关联：`index.html`（纯静态单文件 SPA）｜数据：`data/qa_core*.js`（evidence 每条带 `link` 直达 B站秒位）
> 目标：把「跳出跳转看原话」升级为「站内直接看原话切片」，降低跳出率，提升「搜一搜/问一问」的信任闭环。

---

## 一、现状分析（已实测代码）

### 1.1 渲染链路

| 位置 | 函数/字段 | 现状行为 |
|---|---|---|
| `index.html:2080` | `qaCardHtml(c,q)` | 卡片主渲染函数，evidence 折叠区 |
| `index.html:2100-2106` | `evidenceHtml` | 每条 = `ev-item`（引文 + `ev-go` ▶ 圆钮） |
| `index.html:2104` | `ev-go` 按钮 | `<a href="{link}" target="_blank">▶</a>`，**新标签页跳 B站** |
| `index.html:2085,2118` | `videoTitle` | 卡片底部 foot 显示《视频标题》纯文本 |
| — | `jumpUrl` | 数据层字段（qa_core*.js 每条卡都有），**前端零引用** |
| `index.html:2061` | `qaEvidenceHtml` | 旧格式（`answer[]`）渲染：ts-badge + bv-badge + btn-bili，同样跳转 |

### 1.2 数据字段（evidence 单条示例，qa_core10.js:28-30）

```js
evidence:[
  { ts:'05:18', videoId:'B240', bv:'BV1wb2XBTEDz',
    text:'强扭的瓜不甜呀不合适啊什么的……',
    link:'https://www.bilibili.com/video/BV1wb2XBTEDz?t=318' }
]
```

关键点：`link` 已含 **bv + t（秒）**，切片播放所需信息**全部在位，零数据迁移**。

### 1.3 现状问题

1. **跳出即流失**：点 ▶ 开新标签页跳 B站，用户注意力被 B站信息流带走，回访率低。
2. **无切片体验**：看不到「原话在哪一秒」，信任感打折。
3. **移动端更割裂**：新标签打开 B站可能直接拉起 APP，体验断裂。
4. `jumpUrl` 冗余字段长期无人消费（与 `link` 重复，可清理或复用）。

---

## 二、设计目标与原则

| # | 原则 | 说明 |
|---|---|---|
| 1 | **切片站内播** | 展开卡 → 点播放 → 站内 iframe 直接播对应秒位原话 |
| 2 | **懒加载** | 默认零 iframe；点击才创建，收起即销毁，不拖垮首屏/多卡并发声音 |
| 3 | **保留出口** | 「B站打开 ↗」小链接始终保留，作为跳转兜底与引流出口 |
| 4 | **零数据改动** | 纯前端解析 `link` 的 bv+t，不改 schema、不加数据文件 |
| 5 | **离线降级** | iframe 加载失败时提示并可一键跳转，不白屏 |
| 6 | **移动端分流** | 桌面站内播；移动端默认跳转（B站 APP 体验更佳），可手动切站内 |

---

## 三、方案对比与选型

| 方案 | 做法 | 优点 | 缺点 | 结论 |
|---|---|---|---|---|
| A | 仅站内 iframe 播放 | 闭环最强 | 移动端体验差、无出口 | 不取 |
| **B** | **站内 iframe + 保留「B站打开」出口，桌面/移动分流** | 兼顾闭环与引流，降级安全 | 代码量略增 | ✅ **推荐** |
| C | 维持现状只优化跳转文案 | 零风险 | 不解决问题 | 不取 |

### 技术可行性（B站嵌入播放器）

- 官方嵌入：`https://player.bilibili.com/player.html?bvid={BV}&page=1&high_quality=1&danmaku=0&autoplay=0&t={秒}`
- `t` 参数支持秒位定位（与 evidence.link 的 `?t=` 同机制，已验证链接可用）
- 纯 iframe，无跨域通信需求（不做播放控制，只做定位播放）
- 少数 UP 主可关闭「允许嵌入」→ 显示降级提示 + 跳转链接

---

## 四、详细设计

### 4.1 交互流程

```
卡片展开（.open）
 └─ 语料佐证区：每条 ev-item 显示
      「引文」 + [▶ 站内看切片] + [B站打开 ↗]
      ├─ 桌面端点 ▶ → 懒创建 iframe（16:9）→ 自动定位 t 播放
      │              → ▶ 变 ▣ 收起，再点销毁 iframe
      └─ 移动端点 ▶ → 直接 window.open(link)（现状行为）
```

### 4.2 代码改动点（index.html，全部新增/微改，不碰数据）

#### ① `qaCardHtml` 中 evidence 渲染（L2100-2106 替换）

```js
var evidenceHtml=(c.evidence && c.evidence.length)
  ? '<div class="ev-head">▶ 语料佐证 · 原话 '+c.evidence.length+' 条 —— 点「站内看切片」直接播对应秒位</div>'
    + c.evidence.map(function(e,i){
        var playerId='evp-'+esc(c.qaId)+'-'+i;
        return '<div class="ev-item"><span class="ev-quote">「'+hl(e.text||'',q)+'」</span>'
          +'<a class="ev-go" href="javascript:void(0)" onclick="event.stopPropagation();toggleEvPlayer(\''+esc(c.qaId)+'\','+i+')" title="站内看切片" aria-label="站内看切片">▶</a>'
          +'<a class="ev-ext" href="'+esc(e.link||'#')+'" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="去B站看原话">B站 ↗</a>'
          +'<div class="ev-player" id="'+playerId+'"></div></div>';
      }).join('')
  : qaEvidenceHtml(c);
```

#### ② 新增 `toggleEvPlayer(qaId, idx)`（置于 `qaEvidenceHtml` 之后）

```js
function parseBili(link){
  var m=/video\/(BV[\w]+)/.exec(link||''), t=/[?&]t=(\d+)/.exec(link||'');
  return { bv:(m?m[1]:''), sec:(t?parseInt(t[1],10):-1) };
}
function toggleEvPlayer(qaId, idx){
  var box=document.getElementById('evp-'+qaId+'-'+idx); if(!box) return;
  if(box.getAttribute('data-on')==='1'){ box.innerHTML=''; box.removeAttribute('data-on'); return; }
  var c=qaById(qaId); if(!c||!c.evidence||!c.evidence[idx]) return;
  var e=c.evidence[idx], p=parseBili(e.link||'');
  if(!p.bv){ window.open(e.link||'#','_blank'); return; }
  if(isMobileDevice()){ window.open(e.link,'_blank'); return; }  // 移动端默认跳转
  box.innerHTML='<div class="evp-wrap"><iframe class="evp-frame" src="https://player.bilibili.com/player.html?bvid='
    +p.bv+'&page=1&high_quality=1&danmaku=0&autoplay=1'
    +(p.sec>=0?('&t='+p.sec):'')
    +'" scrolling="no" frameborder="no" allowfullscreen="true" loading="lazy"></iframe>'
    +'<div class="evp-fallback">加载失败？<a href="'+esc(e.link)+'" target="_blank" rel="noopener">去B站看原话 ↗</a></div></div>';
  box.setAttribute('data-on','1');
}
function isMobileDevice(){ try{ return window.matchMedia && window.matchMedia('(max-width:768px)').matches; }catch(e){ return false; } }
```

#### ③ 新增 CSS（追加到 `.ev-go` 样式块 L608 之后）

```css
.ev-item .ev-ext{flex:none;font-size:11px;color:var(--fog);text-decoration:none;border-bottom:1px dashed rgba(120,120,140,.5);line-height:1.6;margin-top:6px;}
.ev-item .ev-ext:hover{color:var(--yin);border-bottom-color:var(--yin);}
.ev-player{flex:0 0 100%;margin:2px 0 4px;}
.evp-wrap{position:relative;width:100%;aspect-ratio:16/9;border-radius:10px;overflow:hidden;border:1px solid rgba(212,165,116,.35);background:#1c1c24;}
.evp-frame{position:absolute;inset:0;width:100%;height:100%;}
.evp-fallback{position:absolute;left:0;right:0;bottom:0;padding:6px 10px;font-size:11px;color:#cfd2dd;background:rgba(28,28,36,.92);text-align:center;}
.evp-fallback a{color:#8ab4e8;text-decoration:underline;}
```

> 用 `aspect-ratio` 自适应宽度（桌面全宽/移动半宽都保持 16:9）；`autoplay=1` 由用户主动点击触发，合规无异议。

### 4.3 移动端策略

- `isMobileDevice()`（≤768px）命中 → ▶ 直接 `window.open(link)` 跳 B站 APP/网页（现状行为），**不建 iframe**。
- 原因：B站 iframe 在移动端小屏播放体验差、易误触弹 APP；跳转 B站 原生体验更好，且视频号/APP 端留存策略本就是「内容在 B站，产品在站内」。
- 桌面端 → 站内播（推荐主路径）。

### 4.4 数据层说明（零改动）

| 字段 | 用途 | 处理 |
|---|---|---|
| `evidence[].link` | 切片定位（bv+t）| ✅ 直接解析复用 |
| `evidence[].ts` | 展示用 mm:ss | 不动 |
| `videoTitle` | 卡脚展示 | 不动 |
| `jumpUrl` | 与 link 重复、零引用 | **本次不清理**（避免数据改动面），后续批次可选删除 |

---

## 五、风险与回归面

| 风险 | 等级 | 应对 |
|---|---|---|
| 部分视频禁止嵌入 | 低 | `evp-fallback` 提示 + 「去B站看原话」兜底 |
| iframe 加载慢 | 低 | `loading="lazy"` + 首次点击才建（懒加载）|
| 多卡并发声音 | 低 | 收起即 `innerHTML=''` 销毁；切换卡片自动收起（toggleQa 已有）|
| 截图/分享图 | 无 | 分享图走 canvas，不涉及 iframe |
| 回归面 | — | 问一问/搜一搜/结果页深潜四视图的展开态，逐项点播验证 |

---

## 六、验收清单

- [ ] 桌面端展开卡 → 点 ▶ → 站内 iframe 自动定位到 evidence 对应秒位播放
- [ ] 再点 ▶（或收起卡）→ iframe 销毁、声音停止
- [ ] 「B站打开 ↗」独立可用，不触发卡片折叠/iframe
- [ ] 移动端（≤768px）点 ▶ → 直接跳转 B站，不建 iframe
- [ ] 链接缺 bv 的异常条 → 降级为直接跳转
- [ ] 全量 evidence 链接扫描（脚本跑一遍所有 qa_core*）：bv 可解析率 100%，t 与 ts 秒数一致
- [ ] 与分享图/埋点（qa_open）行为无冲突

---

## 七、待用户拍板

1. **方案 B（站内播+出口+移动分流）是否确认实施？**
2. 播放按钮位置：替换现 ▶ 圆钮语义（推荐） vs 另加独立按钮（冗余，不推荐）
3. 是否顺带清理数据层 `jumpUrl` 冗余字段（本次建议不动，后续单独批次）
