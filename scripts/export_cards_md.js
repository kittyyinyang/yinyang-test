// export_cards_md.js — 全量知识卡片导出为单个 md
// 用法: node scripts/export_cards_md.js [输出路径]
//
// 结构：体系化目录（分类 → kpId 系列 → 卡片），佐证按「该条所属视频」显示标题（VIDEO_TITLES），
//       同 kpId 多张卡标注 ⚠ 疑似重复，便于查重。
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const OUT = process.argv[2] || path.join('D:', 'Workbuddy', '2026-08-31-02-43-09', 'artifacts', '知识卡片全集_汇总.md');

const FILES = ['qa_core.js','qa_core2.js','qa_core3.js','qa_core4.js','qa_core5.js','qa_core6.js','qa_core7.js','qa_core8.js','qa_core9.js','qa_core10.js','qa_core11.js','qa_core12.js','qa_clips_new.js','data_qa.js'];
const VARS = ['QA_CORE','QA_CORE2','QA_CORE3','QA_CORE4','QA_CORE5','QA_CORE6','QA_CORE7','QA_CORE8','QA_CORE9','QA_CORE10','QA_CORE11','QA_CORE12','QA_CLIPS_NEW','QA_DATA'];

// 视频标题（bv -> 标题）
let TITLES = {};
{ const p = path.join(DATA, 'video_titles.js');
  if (fs.existsSync(p)) { const s = {}; vm.createContext(s); try { vm.runInContext(fs.readFileSync(p, 'utf-8'), s); TITLES = s.VIDEO_TITLES || {}; } catch (e) { } } }
console.log(`视频标题映射 ${Object.keys(TITLES).length} 条`);

// 按运行时顺序装载（与网站 QA 池一致）
const seen = new Set(); const cards = [];
const qaFiles = new Map();   // qaId -> [所在文件]，用于跨文件重复检测
for (let i = 0; i < FILES.length; i++) {
  const p = path.join(DATA, FILES[i]); if (!fs.existsSync(p)) continue;
  const sb = {}; vm.createContext(sb);
  try { vm.runInContext(fs.readFileSync(p, 'utf-8').replace(/var\s+(QA_[A-Z0-9_]+|QA_DATA)\s*=/g, 'globalThis.$1 ='), sb, { filename: FILES[i] }); } catch (e) { continue; }
  const arr = sb[VARS[i]]; if (!Array.isArray(arr)) continue;
  for (const c of arr) {
    if (!c || !c.qaId) continue;
    if (!qaFiles.has(c.qaId)) qaFiles.set(c.qaId, []);
    qaFiles.get(c.qaId).push(FILES[i]);
    if (!seen.has(c.qaId)) { seen.add(c.qaId); cards.push(c); }
  }
}
// 跨文件重复卡片（同名 qaId 出现在多个数据文件里）
const dupCards = [...qaFiles.entries()].filter(([k, v]) => v.length > 1)
  .sort((a, b) => b[1].length - a[1].length);

const esc = s => String(s == null ? '' : s).replace(/([*_`\[\]])/g, '\\$1');
const secOf = link => { const m = /[?&]t=(\d+)/.exec(link || ''); return m ? +m[1] : null; };
const fmt = s => (s == null || isNaN(s)) ? '--:--' : Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
const bvOf = link => { const m = /video\/(BV[\w]+)/.exec(link || ''); return m ? m[1] : ''; };
const biliUrl = (bv, sec) => `https://www.bilibili.com/video/${bv}/${sec != null ? '?t=' + sec : ''}`;
const titleOf = bv => TITLES[bv] || '';

// ── kpId 系列归组（用于体系化目录）──
const SERIES_NAME = {
  y0: '总纲 · 基础认知', y1: '阴阳能量', y2: '阴阳互动模式', y3: '四型人格',
  y4: '关系与配对', y5: '成长课题'
};
function seriesOf(kp) {
  if (!kp) return { key: 'zz-none', name: '未编号 / 其他' };
  if (/^kp-[a-z]+\d+-/.test(kp)) { const k = kp.split('-').slice(0, 2).join('-'); return { key: k, name: k + ' 系列' }; }
  const m = /^([a-z]+\d*)/.exec(kp);
  const k = m ? m[1] : kp;
  return { key: k, name: SERIES_NAME[k] || (k + ' 系列') };
}

// ── 分类 ──
const GROUP_ORDER = ['阴阳能量', '四型人格', '关系与配对', '成长课题', '其他'];
const SCENE_TXT = { love: '💗 情感', work: '💼 职场', family: '🏠 家庭', school: '📚 校园', self: '🌙 独处', none: '通用' };
function groupOf(c) {
  const g = c.category || '其他';
  return GROUP_ORDER.indexOf(g) >= 0 ? g : '其他';
}

// 组织：分类 → 系列 → 卡片
const tree = new Map();
for (const c of cards) {
  const g = groupOf(c);
  const s = seriesOf(c.kpId);
  if (!tree.has(g)) tree.set(g, new Map());
  const gm = tree.get(g);
  if (!gm.has(s.key)) gm.set(s.key, { name: s.name, cards: [] });
  gm.get(s.key).cards.push(c);
}
const orderedGroups = GROUP_ORDER.filter(g => tree.has(g));

let totalEv = 0, noBv = 0, noTitle = 0;
const kpCount = new Map();
for (const c of cards) {
  totalEv += (c.evidence || c.answer || []).length;
  kpCount.set(c.kpId || '(无)', (kpCount.get(c.kpId || '(无)') || 0) + 1);
  for (const e of (c.evidence || c.answer || [])) {
    const bv = bvOf(e.link);
    if (!bv) { noBv++; continue; }
    if (!titleOf(bv)) noTitle++;
  }
}

const L = [];
L.push('# 阴阳人格 · 知识卡片全集（体系化审阅版）');
L.push('');
L.push(`> 生成时间：${new Date().toLocaleString('zh-CN')}　｜　卡片 **${cards.length}** 张　｜　语料佐证 **${totalEv}** 条　｜　覆盖视频 **${new Set(cards.flatMap(c => (c.evidence || c.answer || []).map(e => bvOf(e.link)).filter(Boolean))).size}** 个`);
L.push('> 佐证链接均为 B站标准格式 `video/<BV>/?t=秒`，点击即从该秒开始播放。');
L.push('');

// ══ 目录 ══
L.push('## 📑 目录');
L.push('');
L.push('> 按「分类 → 知识点系列（kpId）→ 卡片」三级组织。同一系列下的卡片内容相近，**⚠ 标记表示该 kpId 下有 2 张以上卡片，请重点核对是否重复**。');
L.push('');
const dupKps = [...kpCount.entries()].filter(([k, n]) => n > 1 && k !== '(无)').sort((a, b) => b[1] - a[1]);
if (dupKps.length) {
  L.push(`### ⚠ 疑似重复（同 kpId 多张卡：**${dupKps.length}** 个编号）`);
  L.push('');
  L.push('| kpId | 卡片数 | 卡片标题 |');
  L.push('|---|---|---|');
  for (const [k, n] of dupKps.slice(0, 40)) {
    const titles = cards.filter(c => (c.kpId || '(无)') === k).map(c => esc((c.question || '').slice(0, 26))).join('　/　');
    L.push(`| \`${k}\` | ${n} | ${titles} |`);
  }
  if (dupKps.length > 40) L.push(`| … | | 其余 ${dupKps.length - 40} 个编号见正文 |`);
  L.push('');
}

// ── 跨文件重复卡片（同名 qaId 出现在多个数据文件）──
if (dupCards.length) {
  L.push(`### 🔁 跨文件重复卡片（**${dupCards.length}** 张同名卡）`);
  L.push('');
  L.push('> 同一个 `qaId` 在多个数据文件中各存了一份，站点只取第一份（按加载顺序）。**这些是真正的重复内容，建议合并或删除冗余副本。**');
  L.push('');
  L.push('| qaId | 出现次数 | 所在文件 | 卡片标题 |');
  L.push('|---|---|---|---|');
  for (const [qa, files] of dupCards) {
    const c = cards.find(x => x.qaId === qa) || {};
    L.push(`| \`${qa}\` | ${files.length} | ${files.map(f => '\`' + f + '\`').join('　')} | ${esc((c.question || '').slice(0, 30))} |`);
  }
  L.push('');
}

let gIdx = 0, cIdx = 0;
const anchors = [];
for (const g of orderedGroups) {
  const gm = tree.get(g);
  const gCards = [...gm.values()].reduce((a, s) => a + s.cards.length, 0);
  const gEv = [...gm.values()].reduce((a, s) => a + s.cards.reduce((x, c) => x + (c.evidence || c.answer || []).length, 0), 0);
  gIdx++;
  L.push(`### ${gIdx}. ${g}　<sub>${gCards} 张 / ${gEv} 条佐证</sub>`);
  L.push('');
  const seriesList = [...gm.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [skey, s] of seriesList) {
    L.push(`**${s.name}**　\`${skey}\`　— ${s.cards.length} 张`);
    L.push('');
    for (const c of s.cards.slice().sort((a, b) => (a.kpId || '').localeCompare(b.kpId || ''))) {
      cIdx++;
      const n = kpCount.get(c.kpId || '(无)') || 1;
      const mark = (n > 1 && c.kpId) ? ' ⚠' : '';
      L.push('- ' + cIdx + '. [' + esc(c.question || '(无标题)') + '](#card-' + cIdx + ')　<sub>`' + (c.qaId || '') + '`' + mark + '</sub>');
    }
    L.push('');
  }
}
L.push('---');
L.push('');

// ══ 正文 ══
gIdx = 0; cIdx = 0;
for (const g of orderedGroups) {
  const gm = tree.get(g); gIdx++;
  L.push(`# ${gIdx}. ${g}`);
  L.push('');
  const seriesList = [...gm.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [skey, s] of seriesList) {
    L.push(`## ${s.name}　\`${skey}\``);
    L.push('');
    for (const c of s.cards.slice().sort((a, b) => (a.kpId || '').localeCompare(b.kpId || ''))) {
      cIdx++;
      const evs = c.evidence || c.answer || [];
      const n = kpCount.get(c.kpId || '(无)') || 1;
      const mark = (n > 1 && c.kpId) ? '　⚠️ **同 kpId 有 ' + n + ' 张卡，请核对是否重复**' : '';
      L.push(`### ${cIdx}. ${c.question || '(无标题)'} <a id="card-${cIdx}"></a>`);
      L.push('');
      const meta = [`\`${c.qaId}\``];
      if (c.kpId) meta.push(`kpId \`${c.kpId}\``);
      if (c.stage != null) meta.push(`阶 ${c.stage}`);
      if (c.polarity && c.polarity !== 'both') meta.push(c.polarity === 'yang' ? '☀️ 阳' : '🌙 阴');
      if ((c.scene || []).length) meta.push((c.scene || []).map(x => SCENE_TXT[x] || x).join(' '));
      if ((c.forTypes || []).length) meta.push(`适用型：${(c.forTypes || []).join(' / ')}`);
      if (c.seq) meta.push(`第 ${c.seq} 讲`);
      L.push(`<sub>${meta.join(' ｜ ')}</sub>${mark}`);
      L.push('');

      if (c.answerBrief) { L.push(`**结论**：${esc(c.answerBrief)}`); L.push(''); }
      if (Array.isArray(c.insight) && c.insight.length) {
        L.push('**要点**'); L.push('');
        for (const it of c.insight) L.push(`- ${esc(it)}`);
        L.push('');
      }
      if (c.quote) { L.push(`> **金句**：${esc(c.quote)}`); L.push(''); }
      if (c.mirror) { L.push(`🪞 **镜子问题**：${esc(c.mirror)}`); L.push(''); }

      if (evs.length) {
        L.push(`**语料佐证**（${evs.length} 条）`);
        L.push('');
        evs.forEach((e, i) => {
          const bv = bvOf(e.link), sec = secOf(e.link);
          const t = titleOf(bv);
          L.push(`${i + 1}. ${esc(e.text || '')}`);
          const bits = [];
          if (bv) bits.push(`▶ [**B站 ${fmt(sec)}**](${biliUrl(bv, sec)})`);
          if (e.videoId) bits.push(`编号 \`${e.videoId}\``);
          if (t) bits.push(`《${esc(t)}》`);
          if (bv) bits.push(`[\`${bv}\`](${biliUrl(bv)})`);
          L.push(`   ${bits.join(' ｜ ')}`);
        });
        L.push('');
      }
      L.push('---');
      L.push('');
    }
  }
}

// ══ 附录：按视频聚合 ══
L.push('# 附录 · 佐证总表（按视频聚合）');
L.push('');
const byVid = new Map();
for (const c of cards) for (const e of (c.evidence || c.answer || [])) {
  const bv = bvOf(e.link); if (!bv) continue;
  if (!byVid.has(bv)) byVid.set(bv, []);
  byVid.get(bv).push({ qa: c.qaId, kp: c.kpId || '', sec: secOf(e.link), txt: (e.text || '').slice(0, 34), vid: e.videoId || '' });
}
const vidList = [...byVid.entries()].sort((a, b) => b[1].length - a[1].length);
L.push(`覆盖视频 **${vidList.length}** 个，佐证 **${vidList.reduce((a, v) => a + v[1].length, 0)}** 条。`);
L.push('');
L.push('| 视频 | 编号 | 切片数 | 标题 |');
L.push('|---|---|---|---|');
for (const [bv, items] of vidList) {
  L.push(`| \`${bv}\` | ${items[0].vid || '—'} | ${items.length} | ${esc(titleOf(bv) || '（无标题）')} |`);
}
L.push('');
for (const [bv, items] of vidList) {
  L.push(`## ${esc(titleOf(bv) || bv)}`);
  L.push('');
  L.push(`<sub>\`${bv}\`　编号 \`${items[0].vid || '—'}\`　${items.length} 条切片</sub>`);
  L.push('');
  items.sort((a, b) => (a.sec || 0) - (b.sec || 0));
  for (const it of items) {
    L.push(`- \`${fmt(it.sec)}\` [${bv}/?t=${it.sec}](${biliUrl(bv, it.sec)}) — ${esc(it.txt)}…　<sub>${it.qa}${it.kp ? ' · ' + it.kp : ''}</sub>`);
  }
  L.push('');
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, L.join('\n'), 'utf-8');
console.log(`卡片 ${cards.length} | 佐证 ${totalEv} | 无 BV ${noBv} | 无标题 ${noTitle}`);
console.log(`疑似重复 kpId ${dupKps.length} 个 | 跨文件重复卡 ${dupCards.length} 张 | 覆盖视频 ${vidList.length} 个`);
console.log(`输出：${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB)`);
