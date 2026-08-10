const eras = [
  { id: 'pre-qin', name: '先秦无标点' },
  { id: 'tang-song', name: '唐宋句读' },
  { id: 'ming-qing', name: '明清圈点' },
  { id: 'modern', name: '民国新式标点' },
  { id: 'tongdian-500-999', name: '通典 500–999' }
];

const poets = [
  {
    id: 'li-bai',
    name: '李白',
    description: '盛唐浪漫诗人，节奏奔放，以长句与起伏感形成强烈诗意。',
    sample: '君不见黄河之水天上来，奔流到海不复回。',
    habit: '标点极少，多以句号收束，偶尔用逗号于换气处，整体节奏开阔疏朗，如行云流水。'
  },
  {
    id: 'du-fu',
    name: '杜甫',
    description: '盛唐现实诗人，格律严谨，炼字精准，诗风沉郁顿挫。',
    sample: '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。',
    habit: '标点密集而工整，多用逗号分切意群，句号果断收束，停顿处往往暗含沉痛与克制。'
  },
  {
    id: 'su-shi',
    name: '苏轼',
    description: '北宋文豪，笔法婉转自由，句读起伏有致。',
    sample: '横看成岭侧成峰，远近高低各不同。不识庐山真面目，只缘身在此山中。',
    habit: '常在哲思转折处加逗号停顿，标点均衡有层次，既有行文的舒展也有思辨的顿挫。'
  },
  {
    id: 'nan-she',
    name: '南社文人',
    description: '清末民初革命文人群体，重视文气与情感表达。',
    sample: '风过疏帘，月临清砚——文字自有旧时温度，墨痕犹带昨夜霜。',
    habit: '标点强调文气与情绪推进，常用逗号构成轻微停顿，偶尔用破折号制造情感转折。'
  },
  {
    id: 'lu-xun',
    name: '鲁迅',
    description: '现代文学巨匠，文风冷峻犀利，短句如匕首投枪。',
    sample: '在我的后园，可以看见墙外有两株树，一株是枣树，还有一株也是枣树。',
    habit: '短句为主，句号密集果断；逗号用于冷峻的列举；极少用感叹号，偶尔用分号制造停顿中的张力。'
  },
  {
    id: 'zhang-ailing',
    name: '张爱玲',
    description: '海派文学代表，笔触细腻绵长，擅长描摹微妙心绪。',
    sample: '三十年前的上海，一个有月亮的晚上……我们也许没赶上看见三十年前的月亮。',
    habit: '逗号频繁，句子绵长而婉转；善用省略号暗示未尽之意；句号轻柔收束，不制造断裂感。'
  },
  {
    id: 'hemingway',
    name: '海明威',
    description: '美国简洁派大师，冰山理论践行者，语句如电报般精炼。',
    sample: '老人消瘦而憔悴，脖颈上刻着深深的皱纹。他独自在小船上捕鱼，已经八十四天没打到一条鱼了。',
    habit: '句号占绝对主导，几乎不用分号；逗号仅用于必要之处；叙事如电报般断奏，极少抒情性停顿。'
  },
  {
    id: 'proust',
    name: '普鲁斯特',
    description: '法国意识流巨匠，以绵延不绝的长句捕捉记忆与时间的纹理。',
    sample: '在很长一段时间里，我都是早早地就躺下了——有时，蜡烛才灭，我的眼皮随即合上，都来不及对自己说："我要睡了。"',
    habit: '以超长复合句为主；大量逗号与分号嵌套从句；破折号用于插入回忆片段，整体如河流般蜿蜒不绝。'
  },
  {
    id: 'kafka',
    name: '卡夫卡',
    description: '奥地利现代主义作家，文字充满存在性的不安与官僚的荒诞。',
    sample: '一天早晨，格里高尔·萨姆沙从不安的睡梦中醒来，发现自己躺在床上变成了一只巨大的甲虫……',
    habit: '逗号克制，句号冷硬；分号用于制造逻辑断裂感；省略号暗示未尽的恐慌；整体如迷宫般令人窒息。'
  },
  {
    id: 'murakami',
    name: '村上春树',
    description: '日本当代作家，文字简洁而疏离，带着爵士乐般的节奏感。',
    sample: '三十七岁的我坐在波音747的客舱里。庞大的机体穿过厚重的雨云，俯身向汉堡机场降落。',
    habit: '句号频繁，营造冷调距离感；逗号稀疏，每句如独立音符；极少惊叹号，一切情绪都沉在句号之下。'
  },
  {
    id: 'borges',
    name: '博尔赫斯',
    description: '阿根廷文学巨匠，文字如迷宫般精密，充满哲学思辨与时间的悖论。',
    sample: '天堂应该是图书馆的模样。我总是在心里设想，天堂的某个走廊里，无穷无尽的六边形回廊通向四面八方。',
    habit: '分号使用精妙，连接看似无关的哲学意象；句号如格言般干净；逗号仅在逻辑分层处出现。'
  },
  {
    id: 'shakespeare',
    name: '莎士比亚',
    description: '英国文艺复兴戏剧大师，语言充满修辞力量与戏剧张力。',
    sample: '生存还是毁灭，这是一个值得考虑的问题；默然忍受命运的暴虐的毒箭，或是挺身反抗人世的无涯的苦难，这两种行为，哪一种更高贵？',
    habit: '大量使用分号构建修辞对仗；问号与感叹号交替制造戏剧冲突；逗号服务于抑扬顿挫的演说节奏。'
  }
];

let state = {
  allDocuments: [],
  documents: [],
  selectedDoc: null,
  lastQuery: '',
  woodblockImage: null
};

function populateEras() {
  const eraSelect = document.getElementById('eraSelect');
  if (!eraSelect) return;
  eraSelect.innerHTML = eras.map((era) => `<option value="${era.id}">${era.name}</option>`).join('');
}

function populatePoets() {
  const poetSelect = document.getElementById('poetSelect');
  if (!poetSelect) return;
  poetSelect.innerHTML = poets.map((poet) => `<option value="${poet.id}">${poet.name}</option>`).join('');
  poetSelect.value = poets[0].id;
}

function getField(obj, keys, fallback = '') {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null && obj?.[key] !== '') return obj[key];
  }
  return fallback;
}

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function normalizeDocument(rawDoc) {
  const doc = rawDoc || {};
  const title = stripHtml(getField(doc, ['title1', 'Title1', 'title', 'Title', 'TI'], ''));
  const author = stripHtml(getField(doc, ['author1', 'Author1', 'author', 'Author', 'AU'], ''));
  const journal = stripHtml(getField(doc, ['literatureTitle', 'LiteratureTitle', 'magazine', 'Magazine', 'journal', 'Journal', 'JTI'], ''));
  const abstract = stripHtml(getField(doc, ['abstract', 'Abstract', 'AB', 'abstract_f', 'Abstract_F'], ''));
  const subjects = Array.isArray(doc?.subjects || doc?.Subjects)
    ? (doc.subjects || doc.Subjects)
    : getField(doc, ['subjects', 'Subjects', 'subject', 'Subject'], '');
  const keywords = Array.isArray(subjects)
    ? subjects.map((item) => stripHtml(item)).join('、')
    : stripHtml(subjects);

  return {
    raw: doc,
    title,
    author,
    journal,
    abstract,
    keywords,
    year: stripHtml(getField(doc, ['year', 'Year'], '')),
    page: stripHtml(getField(doc, ['page', 'Page'], '')),
    volumn: stripHtml(getField(doc, ['volumn', 'Volumn'], '')),
    issue: stripHtml(getField(doc, ['issue', 'Issue'], '')),
    clc: stripHtml(getField(doc, ['clc', 'CLC'], '')),
    authors: Array.isArray(doc?.AU)
      ? doc.AU.map((item) => stripHtml(item)).join('、')
      : author
  };
}

function normalizeDocuments(payload) {
  const entity = Array.isArray(payload?.entity) ? payload.entity : [];
  const docs = [];
  entity.forEach((item) => {
    if (Array.isArray(item?.documents)) {
      docs.push(...item.documents.map((doc) => normalizeDocument(doc)));
    } else if (item && typeof item === 'object') {
      const looksLikeDocument = ['title1', 'Title1', 'title', 'Title', 'author1', 'Author1', 'magazine', 'LiteratureTitle', 'abstract', 'Abstract'].some((key) => item[key] !== undefined);
      if (looksLikeDocument) {
        docs.push(normalizeDocument(item));
      }
    }
  });
  return docs;
}

function buildSearchText(doc) {
  const title = doc?.title || '无题';
  const author = doc?.author || '作者不详';
  const journal = doc?.journal || '刊名未知';
  const abstract = doc?.abstract || '';
  const keywords = doc?.keywords || '关键词暂缺';
  return `题名：${title}\n作者：${author}\n刊名：${journal}\n摘要：${abstract}\n关键词：${keywords}`;
}

function transformText(text, eraId) {
  const base = text.trim() || '请先从接口结果中选择一篇文献。';
  const plain = base.replace(/\s+/g, '');
  switch (eraId) {
    case 'pre-qin':
      return `先秦无标点\n${plain}\n\n说明：更强调上下文与语气，保留古典阅读的松散感。`;
    case 'tang-song':
      return `唐宋句读\n${plain.replace(/([，。！？；：])/g, '$1\n')}\n\n说明：以更清晰的句读节奏重现唐宋文气。`;
    case 'ming-qing':
      return `明清圈点\n${plain}。\n\n说明：增加圈点与重读感，适合复刻古籍阅读体验。`;
    case 'modern':
      return `民国新式标点\n${plain.replace(/([，。！？；：])/g, '$1 ')}\n\n说明：更接近晚清民国报刊式的清晰标点规范。`;
    case 'tongdian-500-999':
      return `通典 500–999\n${plain.replace(/([，。！？；：])/g, '$1\n')}\n\n说明：以通典式的广泛史观与断制感，为 500–999 年代文本生成更有层次的标点版本。`;
    default:
      return base;
  }
}

function applyTextStyle(text, mode) {
  const base = text.trim() || '请先输入一段文字。';
  const clean = base.replace(/\s+/g, ' ');
  if (mode === 'ancient') {
    return clean
      .replace(/([，；：、。！？])/g, '$1\n')
      .replace(/\n{3,}/g, '\n\n');
  }
  return clean
    .replace(/([，；：、。！？])/g, '$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function getYearRange() {
  const start = Number(document.getElementById('startYearInput').value);
  const end = Number(document.getElementById('endYearInput').value);
  return {
    start: Number.isFinite(start) ? start : 0,
    end: Number.isFinite(end) ? end : 99999
  };
}

function applyYearFilter() {
  const { start, end } = getYearRange();
  state.documents = state.allDocuments.filter((doc) => {
    const year = Number(doc?.year || '');
    return Number.isFinite(year) && year >= start && year <= end;
  });
  if (!state.documents.length) {
    state.selectedDoc = null;
  } else if (!state.selectedDoc || !state.documents.includes(state.selectedDoc)) {
    state.selectedDoc = state.documents[0];
  }
}

function renderSummary(payload) {
  const summary = document.getElementById('resultSummary');
  if (!payload) {
    summary.innerHTML = '尚未检索。';
    return;
  }
  const entity = Array.isArray(payload.entity) ? payload.entity : [];
  const total = entity.reduce((sum, item) => sum + (Number(item?.totalCount) || 0), 0);
  const first = entity[0];
  const { start, end } = getYearRange();
  summary.innerHTML = `
    <strong>检索结果：</strong>${state.documents.length}/${total} 条<br/>
    <strong>年代窗口：</strong>${start}–${end}（已纳入通典 500–999 时代线）<br/>
    <strong>数据类型：</strong>${first?.name || '正文'}<br/>
    <strong>状态：</strong>${payload?.msg || payload?.message || '完成'}
  `;
}

function renderResults() {
  const list = document.getElementById('resultsList');
  if (!state.documents.length) {
    list.innerHTML = '<div class="result-card">尚未检索到文献，请输入检索词后点击"执行检索"。</div>';
    return;
  }

  list.innerHTML = state.documents
    .map((doc, index) => {
      const title = doc?.title || '无题';
      const author = doc?.author || '作者不详';
      const journal = doc?.journal || '刊名未知';
      const year = doc?.year || '未知';
      const page = doc?.page || '未知';
      const abstract = (doc?.abstract || '').slice(0, 80);
      const active = state.selectedDoc === doc ? 'active' : '';
      return `
        <div class="result-card ${active}" data-index="${index}">
          <strong>${title}</strong>
          <div class="meta-row">
            <span class="tag">${author}</span>
            <span class="tag">${journal}</span>
            <span class="tag">${year}</span>
            <span class="tag">${page}</span>
          </div>
          <p>${abstract ? abstract + '…' : ''}</p>
        </div>
      `;
    })
    .join('');

  list.querySelectorAll('.result-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = Number(card.dataset.index);
      state.selectedDoc = state.documents[idx];
      renderResults();
      renderDetail();
      renderGeneratedText();
    });
  });
}

function renderDetail() {
  const detail = document.getElementById('documentDetail');
  if (!detail) return;
  if (!state.selectedDoc) {
    detail.innerHTML = '';
    return;
  }

  const doc = state.selectedDoc;
  const display = normalizeDocument(doc?.raw || doc);
  const subjects = display.keywords || '暂无';
  const authors = display.authors || display.author || '作者不详';
  const page = display.page || '未知';
  const clc = display.clc || '暂无';
  const vol = display.volumn || '未知';
  const issue = display.issue || '未知';
  const title = display.title || '无题';
  const journal = display.journal || '未知';
  const year = display.year || '未知';
  const abstract = display.abstract || '';

  detail.innerHTML = `
    <strong>${title}</strong><br/>
    <div class="meta-row">
      <span class="tag">作者：${authors}</span>
      <span class="tag">刊名：${journal}</span>
      <span class="tag">年份：${year}</span>
    </div>
    <div class="meta-row">
      <span class="tag">卷期：${vol}/${issue}</span>
      <span class="tag">页码：${page}</span>
      <span class="tag">中图分类号：${clc}</span>
    </div>
    ${abstract ? `<p><strong>摘要</strong><br/>${abstract}</p>` : ''}
    ${subjects && subjects !== '暂无' ? `<p><strong>关键词</strong><br/>${subjects}</p>` : ''}
  `;
}

function renderGeneratedText() {
  const output = document.getElementById('textOutput');
  if (!output) return;
  const eraSelect = document.getElementById('eraSelect');
  const eraId = eraSelect?.value || 'modern';
  const text = state.selectedDoc ? buildSearchText(state.selectedDoc) : '';
  if (!output) return;
  if (!text) {
    output.innerHTML = '<div class="status-pill">选择一篇文献后，标点预览将显示在这里。</div>';
    return;
  }
  output.innerHTML = `
    <div class="status-pill">${eraId === 'modern' ? '民国标点版本' : '古式句读版本'}</div><br/>
    ${transformText(text, eraId)}
  `;
}

async function refreshLlmConfig() {
  const status = document.getElementById('llmStatus');
  if (!status) return;
  status.innerHTML = '正在检查大模型接入状态…';
  try {
    const response = await fetch('/api/llm-config');
    const payload = await response.json();
    if (payload.configured) {
      status.innerHTML = `在线模型已就绪：${payload.provider} · ${payload.model || payload.deployment || '已配置'}`;
    } else {
      status.innerHTML = '当前未配置在线模型，将回退到本地样式生成。';
    }
  } catch (error) {
    status.innerHTML = '无法读取大模型配置状态。';
  }
}

const modeLabels = {
  'pre-qin': '先秦无标点',
  'tang-song': '唐宋句读',
  'ming-qing': '明清圈点',
  'modern': '民国新式标点',
  'tongdian': '通典断句'
};

async function renderTextStyle() {
  const input = document.getElementById('userTextInput').value.trim();
  const mode = document.getElementById('textModeSelect').value;
  const output = document.getElementById('textOutput');
  const label = modeLabels[mode] || mode;

  if (!input) {
    output.innerHTML = `
      <div class="status-pill">${label} · 待输入</div><br/>
      请在输入框中粘贴或输入文字，然后点击"生成标点版本"查看 AI 标点效果。
    `;
    return;
  }
  output.innerHTML = `<div class="status-pill">正在生成${label}版本…</div>`;
  try {
    const response = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input, mode, style: '古今标点文脉馆' })
    });
    const payload = await response.json();
    const provider = payload.provider && payload.provider !== 'fallback' ? ` · ${payload.provider}` : '';
    output.innerHTML = `
      <div class="status-pill">${label}版本${provider}</div><br/>
      ${payload.output || '生成失败。'}
    `;
  } catch (error) {
    output.innerHTML = `
      <div class="status-pill">本地样式生成已启用</div><br/>
      ${applyTextStyle(input, mode)}
    `;
  }
}

async function renderPoetResult() {
  const poetSelect = document.getElementById('poetSelect');
  const poet = poets.find((item) => item.id === poetSelect.value);
  const summary = document.getElementById('poetSummary');
  const userText = document.getElementById('poetTextInput').value.trim() || poet.sample;
  if (!poet || !summary) return;

  summary.innerHTML = `
    <strong>${poet.name}：</strong>${poet.description}<br/>
    <strong>标点习惯：</strong>${poet.habit}
    <div class="status-pill" style="margin-top:10px;">正在调用在线模型生成风格诗文…</div>
  `;

  try {
    const response = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: userText,
        mode: 'modern',
        style: `古今标点文脉馆 · ${poet.name}风格`,
        poet: poet.id,
        habit: poet.habit
      })
    });
    const payload = await response.json();

    summary.innerHTML = `
      <strong>${poet.name}：</strong>${poet.description}<br/>
      <strong>标点习惯：</strong>${poet.habit}
      <div class="result-box" style="margin-top:10px;">${payload.output || poet.sample}</div>
    `;
  } catch (error) {
    summary.innerHTML = `
      <strong>${poet.name}：</strong>${poet.description}<br/>
      <strong>标点习惯：</strong>${poet.habit}
      <div class="result-box" style="margin-top:10px;">${userText}</div>
      <div class="status-pill" style="margin-top:6px;">在线模型调用失败，已回退展示示例诗文。</div>
    `;
  }
}

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file, 'utf-8');
  });
}

async function handleTextUpload() {
  const fileInput = document.getElementById('textFileInput');
  const text = fileInput.files?.[0] ? await readTextFile(fileInput.files[0]) : document.getElementById('userTextInput').value;
  document.getElementById('userTextInput').value = text;
  renderTextStyle();
}

function initWoodblockCanvas() {
  const canvas = document.getElementById('woodblockCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // 仿古纸底色
  ctx.fillStyle = '#f4e8d1';
  ctx.fillRect(0, 0, W, H);

  // 纸张纹理——竖线帘纹
  ctx.strokeStyle = 'rgba(156, 123, 83, 0.15)';
  ctx.lineWidth = 0.5;
  for (let x = 20; x < W; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, 10);
    ctx.lineTo(x, H - 10);
    ctx.stroke();
  }

  // 外框——双层书页边框
  ctx.strokeStyle = '#8b6b42';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, W - 60, H - 60);
  ctx.strokeStyle = '#b8945c';
  ctx.lineWidth = 1;
  ctx.strokeRect(38, 38, W - 76, H - 76);

  // 内版心——雕版文字区域
  ctx.fillStyle = '#fdf5e6';
  ctx.fillRect(60, 80, W - 120, H - 220);
  ctx.strokeStyle = '#a07840';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(60, 80, W - 120, H - 220);

  // 版心标题
  ctx.fillStyle = '#4a3020';
  ctx.font = 'bold 32px KaiTi, STKaiti, SimSun, serif';
  ctx.fillText('雕版样张', 100, 130);

  // 装饰线
  ctx.strokeStyle = '#c9a770';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 150);
  ctx.lineTo(W - 80, 150);
  ctx.stroke();

  // 正文模拟
  ctx.font = '18px KaiTi, STKaiti, SimSun, serif';
  ctx.fillStyle = '#3d2817';
  const lines = [
    '夫标点者，文之呼吸也。',
    '先秦无句读，汉唐始有圈点，',
    '至于明清，评点之学大兴。',
    '民国以降，新式标点通行，',
    '文章节奏，自此一目了然。',
    '今以此雕版复刻古法，',
    '使观者如见旧时书页，',
    '触摸文字之间的呼吸与停顿。'
  ];
  lines.forEach((line, i) => {
    ctx.fillText(line, 100, 190 + i * 32);
  });

  // 红色圈点——精准落在正文关键字上
  ctx.strokeStyle = '#b33a2f';
  ctx.lineWidth = 2.2;
  // 坐标：(字符中心X, 基线Y-9, 半径)
  const marks = [
    // 第1行"标点"  y=190
    [145, 181, 9], [163, 181, 9],
    // 第2行"圈点"  y=222
    [289, 213, 9], [307, 213, 9],
    // 第3行"评点"  y=254
    [217, 245, 8],
    // 第4行"标点"  y=286
    [235, 277, 9], [253, 277, 9],
    // 第5行"节奏"  y=318
    [145, 309, 8], [163, 309, 8],
    // 第6行"雕版"  y=350
    [145, 341, 8], [163, 341, 8],
    // 第7行"书页"  y=382
    [235, 373, 8],
    // 第8行"停顿"  y=414
    [289, 405, 9], [307, 405, 9]
  ];
  marks.forEach(m => {
    // 外圈（句读圈）
    ctx.strokeStyle = '#b33a2f';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(m[0], m[1], m[2], 0, Math.PI * 2);
    ctx.stroke();
    // 旁点（语气点）——圈右侧的小圆点
    ctx.fillStyle = '#b33a2f';
    ctx.beginPath();
    ctx.arc(m[0] + m[2] + 5, m[1], 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // 眉批区域
  ctx.fillStyle = '#8b4a30';
  ctx.font = '16px KaiTi, STKaiti, serif';
  ctx.fillText('【眉批】文气贯通，句读得当', 80, 58);
  ctx.fillText('——古今标点文脉馆藏', 540, 58);
}

function drawWoodblockWithImage() {
  const canvas = document.getElementById('woodblockCanvas');
  const ctx = canvas.getContext('2d');
  const hasImage = state.woodblockImage && state.woodblockImage.complete && state.woodblockImage.naturalWidth > 0;
  const W = canvas.width;
  const H = canvas.height;

  if (hasImage) {
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(state.woodblockImage, 0, 0, W, H);
    ctx.save();
    ctx.fillStyle = 'rgba(248, 239, 229, 0.30)';
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // 在图像上随机散布红色圈点标记，模拟古籍批注
    const seed = 42;
    const pseudoRandom = (n) => { const x = Math.sin(n * 9301 + seed) * 49297; return x - Math.floor(x); };
    ctx.strokeStyle = '#b33a2f';
    ctx.lineWidth = 2;
    for (let i = 0; i < 18; i++) {
      const cx = 60 + pseudoRandom(i * 3) * (W - 120);
      const cy = 80 + pseudoRandom(i * 3 + 1) * (H - 200);
      const r = 6 + pseudoRandom(i * 3 + 2) * 10;
      // 外圈
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      // 旁点——每个圈右侧配一小实心点
      ctx.fillStyle = '#b33a2f';
      ctx.beginPath();
      ctx.arc(cx + r + 4, cy - 1, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    // 右下方红色收藏印章
    ctx.save();
    ctx.strokeStyle = '#b33a2f';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(W - 110, H - 80, 90, 60);
    ctx.font = 'bold 18px KaiTi, STKaiti, serif';
    ctx.fillStyle = '#b33a2f';
    ctx.fillText('文脉', W - 95, H - 50);
    ctx.fillText('馆藏', W - 95, H - 28);
    ctx.restore();
  } else {
    initWoodblockCanvas();
    // 示范版也替换标注文字为更自然的印章样式
    ctx.strokeStyle = '#b33a2f';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(W - 110, H - 80, 90, 60);
    ctx.font = 'bold 18px KaiTi, STKaiti, serif';
    ctx.fillStyle = '#b33a2f';
    ctx.fillText('文脉', W - 95, H - 50);
    ctx.fillText('馆藏', W - 95, H - 28);
  }
}

function handleWoodblockUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  document.getElementById('woodblockHint').innerHTML = '正在处理上传图片…';
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      state.woodblockImage = img;
      drawWoodblockWithImage();
      document.getElementById('woodblockHint').innerHTML = '已叠加朱笔圈点与馆藏印章。古人读书以朱笔圈点字旁为「句读」，小圈示停顿、旁点表重音——此即雕版复刻所模拟之古法。';
    };
    img.onerror = () => {
      document.getElementById('woodblockHint').innerHTML = '图片解析失败，请尝试其他格式（jpg/png/webp）。';
    };
    img.src = reader.result;
  };
  reader.onerror = () => {
    document.getElementById('woodblockHint').innerHTML = '文件读取失败，请重试。';
  };
  reader.readAsDataURL(file);
}

function loadRemoteWoodblockImage() {
  const url = document.getElementById('woodblockUrlInput').value.trim();
  if (!url) {
    document.getElementById('woodblockHint').innerHTML = '请先输入可访问的图片地址。';
    return;
  }
  document.getElementById('woodblockHint').innerHTML = '正在通过博物馆代理加载远程图片…';
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    state.woodblockImage = img;
    drawWoodblockWithImage();
    document.getElementById('woodblockHint').innerHTML = '已通过本地代理加载远程馆藏图片并叠加圈点与眉批效果。';
  };
  img.onerror = () => {
    document.getElementById('woodblockHint').innerHTML = '图片地址不可用，请换成可直接访问的 URL（支持 jpg/png/webp）。也可尝试直接上传本地图片。';
  };
  img.src = `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

function handleWoodblockAction() {
  const urlInput = document.getElementById('woodblockUrlInput');
  const url = urlInput?.value.trim() || '';
  if (url) {
    loadRemoteWoodblockImage();
  } else {
    drawWoodblockWithImage();
    document.getElementById('woodblockHint').innerHTML = '已生成示范雕版。朱笔小圈仿古人「句读」之法——圈为停顿、点为重读，自唐宋以降即为读书人标注文气之工具。右下为馆藏印章。';
  }
}

async function searchDocuments() {
  const searchInput = document.getElementById('searchInput').value.trim();
  const mode = document.getElementById('searchModeSelect').value;
  const hint = document.getElementById('apiHint');

  if (!searchInput) {
    hint.innerHTML = '请先输入检索词。';
    return;
  }

  const query = searchInput.includes(':') ? searchInput : (mode === 'ALL' ? searchInput : `${mode}:${searchInput}`);
  hint.innerHTML = `正在调用接口：${query}`;
  const url = `/api/search?searchContent=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const payload = await response.json();
    const docs = normalizeDocuments(payload);
    state.allDocuments = docs;
    applyYearFilter();
    state.documents = state.documents.slice(0, 5);
    state.lastQuery = query;
    renderSummary(payload);
    renderResults();
    renderDetail();
    renderGeneratedText();
  } catch (error) {
    hint.innerHTML = `接口调用失败：${error.message}`;
  }
}

function init() {
  populateEras();
  populatePoets();
  initWoodblockCanvas();
  const searchBtn = document.getElementById('searchBtn');
  const applyTextBtn = document.getElementById('applyTextBtn');
  const textFileInput = document.getElementById('textFileInput');
  const textModeSelect = document.getElementById('textModeSelect');
  const poetBtn = document.getElementById('poetBtn');
  const woodblockBtn = document.getElementById('woodblockBtn');
  const woodblockFileInput = document.getElementById('woodblockFileInput');
  const jumpToSearchBtn = document.getElementById('jumpToSearchBtn');
  const jumpToAiBtn = document.getElementById('jumpToAiBtn');
  const enterImmersiveBtn = document.getElementById('enterImmersiveBtn');
  const closeImmersiveBtn = document.getElementById('closeImmersiveBtn');
  const immersiveOverlay = document.getElementById('immersiveOverlay');
  const heroVisualRail = document.getElementById('heroVisualRail');
  const showcaseCards = document.querySelectorAll('.showcase-card');

  const setImmersiveOpen = (isOpen) => {
    if (!immersiveOverlay) return;
    if (isOpen) {
      immersiveOverlay.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      immersiveOverlay.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  };

  if (searchBtn) searchBtn.addEventListener('click', searchDocuments);
  if (applyTextBtn) applyTextBtn.addEventListener('click', handleTextUpload);
  if (textFileInput) textFileInput.addEventListener('change', handleTextUpload);
  if (textModeSelect) textModeSelect.addEventListener('change', renderTextStyle);
  if (poetBtn) poetBtn.addEventListener('click', renderPoetResult);
  if (woodblockBtn) woodblockBtn.addEventListener('click', handleWoodblockAction);
  if (woodblockFileInput) woodblockFileInput.addEventListener('change', handleWoodblockUpload);
  if (jumpToSearchBtn) {
    jumpToSearchBtn.addEventListener('click', () => {
      document.getElementById('searchSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  if (jumpToAiBtn) {
    jumpToAiBtn.addEventListener('click', () => {
      document.getElementById('aiSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  if (enterImmersiveBtn && immersiveOverlay) {
    enterImmersiveBtn.addEventListener('click', () => {
      setImmersiveOpen(true);
    });
  }
  if (closeImmersiveBtn && immersiveOverlay) {
    closeImmersiveBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      setImmersiveOpen(false);
    });
  }
  if (immersiveOverlay) {
    const immersivePanel = immersiveOverlay.querySelector('.immersive-panel');
    if (immersivePanel) {
      immersivePanel.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }
    immersiveOverlay.addEventListener('click', (event) => {
      if (event.target === immersiveOverlay) {
        setImmersiveOpen(false);
      }
    });
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && immersiveOverlay && !immersiveOverlay.hasAttribute('hidden')) {
      setImmersiveOpen(false);
    }
  });
  if (heroVisualRail) {
    heroVisualRail.querySelectorAll('.thumb-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        heroVisualRail.querySelectorAll('.thumb-btn').forEach((item) => item.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.querySelector('.hero-visual-panel');
        if (!panel) return;
        const theme = btn.dataset.theme;
        panel.animate([
          { transform: 'translateY(4px)', opacity: 0.85 },
          { transform: 'translateY(0)', opacity: 1 }
        ], { duration: 240, easing: 'ease-out' });
        panel.style.borderColor = theme === 'woodblock' ? '#b07a46' : theme === 'punctuation' ? '#7f5d3a' : '#8d5b3b';
      });
    });
  }
  showcaseCards.forEach((card) => {
    card.addEventListener('click', () => {
      const targetId = card.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  renderTextStyle();
  renderPoetResult();
}

init();
