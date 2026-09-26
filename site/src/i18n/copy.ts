import type { ThemeId } from '../data/themes'

export const LOCALES = ['zh', 'en', 'ja'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_LABEL: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
}

/** 浮窗按钮上的短标记 */
export const LOCALE_CODE: Record<Locale, string> = {
  zh: '中',
  en: 'EN',
  ja: '日',
}

/** 浏览器语言 → 站点语言。认不出来的落回中文。 */
export function matchLocale(tag: string): Locale {
  const l = tag.toLowerCase()
  if (l.startsWith('ja')) return 'ja'
  if (l.startsWith('zh')) return 'zh'
  if (l.startsWith('en')) return 'en'
  return 'zh'
}

interface ThemeCopy {
  name: string
  short: string
  tagline: string
  description: string
}

export interface Copy {
  htmlLang: string
  title: string
  description: string
  nav: { showcase: string; preview: string; features: string; install: string; switchLabel: string }
  hero: {
    eyebrow: string
    tagline: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    stats: { k: string; v: string }[]
  }
  palettes: { eyebrow: string; title: string; desc: string; scale: string }
  themes: Record<ThemeId, ThemeCopy>
  /** Hero 里那个 Typora 窗口演示的文档内容 */
  mock: {
    file: string
    search: string
    outlineLabel: string
    sidebar: string[]
    outline: string[]
    title: string
    lead: string
    h2: string
    body: { text: string; style?: 'strong' | 'code' | 'link' }[]
    quote: string
    h3a: string
    h3b: string
    cols: [string, string, string]
    rows: [string, string, string][]
  }
  preview: {
    eyebrow: string
    title: string
    desc: string
    printToggle: string
    export: string
    source: string
    reset: string
    hintScreen: string
    hintPrint: string
    cta: string
    sample: string
  }
  features: {
    eyebrow: string
    title: string
    desc: string
    items: { title: string; body: string }[]
    marquee: string[]
  }
  install: {
    eyebrow: string
    title: string
    desc: string
    steps: { title: string; body: string }[]
    files: string
    or: string
    zip: string
    custom: string
    customBody: string
    feedbackTitle: string
    feedbackBody: string
    github: string
  }
  obsidian: {
    eyebrow: string
    title: string
    desc: string
    wip: string
    wipNote: string
    cta: string
  }
  footer: { desc: string; license: string }
}

const zh: Copy = {
  htmlLang: 'zh-CN',
  title: 'SeeYue Plus · 见月 · 一款为长文写作而生的 Typora 主题',
  description:
    'SeeYue Plus（见月 Plus）是一款为长文写作而生的 Typora 主题：液态玻璃质感、六级标题色块、霞鹜文楷正文、Mac 风格代码块与打印级 PDF 排版。明亮 / 暗黑 / 护眼三套配色，官网可在线预览。',
  nav: {
    showcase: '三套配色',
    preview: '在线预览',
    features: '特性',
    install: '安装',
    switchLabel: '切换语言',
  },
  hero: {
    eyebrow: 'Typora Theme · 为长文写作而生',
    tagline: '给长文写作的一套排版秩序',
    sub: '液态玻璃写作区、六级标题色块、霞鹜文楷正文，以及能直接付印的 PDF 导出。',
    ctaPrimary: '装进 Typora',
    ctaSecondary: '看三套配色',
    stats: [
      { k: '3', v: '套配色' },
      { k: '6', v: '级标题色阶' },
      { k: '20+', v: '处可调' },
      { k: '0', v: '依赖' },
    ],
  },
  palettes: {
    eyebrow: 'Palettes',
    title: '三套配色，一种秩序',
    desc: '同一套排版规则，换三种底色。配色各自独立成文件，改一个变量就能长出你自己的第四套。',
    scale: 'Heading Scale',
  },
  themes: {
    pure: {
      name: '见月 · 明亮',
      short: '明亮',
      tagline: '白纸一样的干净',
      description: '冷调白底，一层薄玻璃浮在上面。白天写、认真校色、准备付印，都用它。',
    },
    dark: {
      name: '见月 · 暗黑',
      short: '暗黑',
      tagline: '深夜写作的正确打开方式',
      description: '深蓝灰打底，正文柔和不刺眼，标题换成霓虹色阶。凌晨三点，屏幕不扎人。',
    },
    salt: {
      name: '见月 · 护眼',
      short: '护眼',
      tagline: '把纸的绿意还给屏幕',
      description: '豆绿纸底压低蓝光，是为长夜与长文准备的一档缓冲。读久了，眼睛会谢谢你。',
    },
  },
  mock: {
    file: '见月 · 序.md',
    search: '搜索文件',
    outlineLabel: 'Outline',
    sidebar: ['见月 · 序', '一、标题体系', '二、代码与表格', '三、导出 PDF', '草稿', '未命名.md'],
    outline: ['见月 · SeeYue Plus', '一、为什么是「见月」', '1.1 代码块', '1.2 表格', '二、装进你的 Typora'],
    title: '见月 · SeeYue Plus',
    lead: '一款为长文写作而生的 Typora 主题。液态玻璃、五级标题色块、霞鹜文楷正文，把 Markdown 的每一层结构都交代清楚。',
    h2: '一、为什么是「见月」',
    body: [
      { text: '写作最怕的不是没灵感，而是' },
      { text: '结构看不见', style: 'strong' },
      { text: '。标题之间没有层级差、引用块和正文糊在一起、代码块和段落分不开——' },
      { text: '读', style: 'code' },
      { text: '的人累，' },
      { text: '写', style: 'code' },
      { text: '的人也累。详见 ' },
      { text: '设计说明', style: 'link' },
      { text: '。' },
    ],
    quote: '见月把每一级标题都染上自己的颜色，让文章的骨架在余光里就能看清。',
    h3a: '1.1 代码块',
    h3b: '1.2 表格',
    cols: ['配色', '底色', '适用'],
    rows: [
      ['明亮 Pure', '#f0f4f8', '白天 · 校色'],
      ['暗黑 Dark', '#1a1d24', '深夜 · 长文'],
      ['护眼 Salt', '#e4eddf', '久读 · 缓冲'],
    ],
  },
  preview: {
    eyebrow: 'Live Preview',
    title: '现在就试试',
    desc: '下面跑的是主题本尊的样式表。左边随便改，右边立刻变。',
    printToggle: '打印排版',
    export: '导出 PDF',
    source: 'Markdown',
    reset: '重置',
    hintScreen:
      '预览用的是仓库里那份 CSS，不是照着做的仿制品。点「导出 PDF」会调起系统打印，选「另存为 PDF」拿到的就是 Typora 里导出的效果。',
    hintPrint:
      '「打印排版」把主题的打印样式表搬到了屏幕上，页边距与整页底色按 A4 还原。真正的分页要交给浏览器 —— 点「导出 PDF」在打印对话框里选「另存为 PDF」。',
    cta: '满意了，去装',
    sample: `# 春江花月夜

春江潮水连海平，海上明月共潮生。滟滟随波千万里，**何处春江无月明**。

## 一、为什么是「见月」

写作最怕的不是没灵感，而是结构看不见。标题之间没有层级差、引用块和正文糊在一起——
\`读\`的人累，\`写\`的人也累。

> 见月把每一级标题都染上自己的颜色，让文章的骨架在余光里就能看清。

### 1.1 代码块

\`\`\`javascript
const theme = await SeeYue.load('see-yue-dark.css')
theme.apply({ glass: true, wenkai: true })

// 每一级标题都有自己的颜色
theme.headings.map(h => h.color)
\`\`\`

### 1.2 表格

| 配色 | 底色 | 适用 |
| --- | --- | --- |
| 明亮 Pure | \`#f0f4f8\` | 白天 · 校色 |
| 暗黑 Dark | \`#1a1d24\` | 深夜 · 长文 |
| 护眼 Salt | \`#e4eddf\` | 久读 · 缓冲 |

### 1.3 引用块的四种说法

> ### 注意
> 首行写成标题，引用块就变成了提示块。

> #### 参考
> 不同级别的标题，配不同的图标与颜色。

## 二、清单

- [x] 液态玻璃写作区
- [x] 六级标题色阶
- [ ] 写你自己的下一篇文章

1. 克隆仓库
2. 复制到 Typora 主题文件夹
3. \`Ctrl / ⌘ + R\` 重载
`,
  },
  features: {
    eyebrow: 'Craft',
    title: '它不改变你写什么',
    desc: '只改变你看见它的方式。从标题到滚动条，每一处都为了同一件事：让读和写都更省力。',
    items: [
      {
        title: '液态玻璃',
        body: '写作区浮在背景之上，像一块真的玻璃。侧边栏、菜单、底栏都透着后面的光。',
      },
      {
        title: '六级标题色阶',
        body: '从 H1 到 H6，每一级都有自己的颜色。文章的骨架，在余光里就能看清。',
      },
      { title: '霞鹜文楷', body: '中文写作最舒服的字体之一，主题自带。装完打开就是它，不用再折腾。' },
      {
        title: '代码块像一扇窗',
        body: '红黄绿三点、圆角、语言角标。明暗各一套配色，行号与代码各安其位。',
      },
      { title: '导出即成品', body: '屏幕上的玻璃在打印时自动让位。页边距、目录、分页都替你排好了。' },
      { title: '引用块会说话', body: '首行写成标题，它就变成提示块。注意、提示、参考，一眼分得清。' },
      { title: '长文档不迷路', body: '文件树、大纲、搜索，逐页重画过。写十万字也找得到回头路。' },
      {
        title: '想改就改',
        body: '底色、字体、行距、圆角，都在一份带中文注释的配置里。改一个变量，换一版心情。',
      },
    ],
    marquee: [
      '正文',
      '标题',
      '目录',
      '链接',
      '列表',
      '表格',
      '引用块',
      '代码块',
      '图片',
      '脚注',
      '侧边栏',
      '大纲',
      '右键菜单',
      '底栏',
      '搜索面板',
      '滚动条',
      '导出 PDF',
    ],
  },
  install: {
    eyebrow: 'Install',
    title: '三步装好',
    desc: '克隆，跑 make sync，重载。',
    steps: [
      { title: '克隆仓库', body: '需要 Git 与 make，Git for Windows 自带。' },
      { title: '跑 make sync', body: '同步进 Typora 主题目录。' },
      { title: '重载', body: 'Ctrl + R，在主题菜单里选。' },
    ],
    files: 'Get the files',
    or: '没有 make？解压后手动把三份 CSS 和 SeeYue 文件夹放进主题目录：',
    zip: '下载 ZIP',
    custom: '想改一版自己的',
    customBody: '改 SeeYue/CSS/configs/ 下的 config，变量都有注释。make watch 可边改边同步。',
    feedbackTitle: '用着不顺手，或者想加点什么',
    feedbackBody: '主题在 GitHub 上开源，遇到问题、有想改的地方，都欢迎提 Issue。',
    github: '去 GitHub',
  },
  obsidian: {
    eyebrow: 'Obsidian',
    title: '见月 · Obsidian 版',
    desc: '同一套排版秩序，搬进了 Obsidian。明亮与暗黑跟着 Obsidian 自己的明暗切换走，护眼另挂一个片段。',
    wip: '开发中',
    wipNote: '刚起步，样式还在动，可能不稳定。日常主力笔记建议先用 Typora 版，或者把它当成一次随时能关掉的试验。',
    cta: '去仓库看看',
  },
  footer: { desc: '为长文写作而生的 Typora 主题。', license: 'MIT LICENSED · MADE FOR TYPORA' },
}

const en: Copy = {
  htmlLang: 'en',
  title: 'SeeYue Plus — a Typora theme built for long-form writing',
  description:
    'SeeYue Plus is a Typora theme built for long-form writing: liquid glass, a six-level heading scale, LXGW WenKai body text, Mac-style code blocks and print-ready PDF export. Three palettes — Pure, Dark and Salt — with a live preview on the site.',
  nav: {
    showcase: 'Palettes',
    preview: 'Preview',
    features: 'Features',
    install: 'Install',
    switchLabel: 'Change language',
  },
  hero: {
    eyebrow: 'Typora Theme · Built for long-form writing',
    tagline: 'A typographic order for long-form writing',
    sub: 'A liquid-glass writing area, a six-level heading scale, LXGW WenKai body text, and PDF export you can send straight to print.',
    ctaPrimary: 'Install in Typora',
    ctaSecondary: 'See the palettes',
    stats: [
      { k: '3', v: 'Palettes' },
      { k: '6', v: 'Heading levels' },
      { k: '20+', v: 'Things to tune' },
      { k: '0', v: 'Dependencies' },
    ],
  },
  palettes: {
    eyebrow: 'Palettes',
    title: 'Three palettes, one order',
    desc: 'The same typographic rules on three grounds. Each palette is its own file — change one variable and grow a fourth.',
    scale: 'Heading Scale',
  },
  themes: {
    pure: {
      name: 'SeeYue · Pure',
      short: 'Pure',
      tagline: 'Clean as blank paper',
      description:
        'A cool white ground with a thin sheet of glass floating on it. For daylight, careful colour work, and anything headed for print.',
    },
    dark: {
      name: 'SeeYue · Dark',
      short: 'Dark',
      tagline: 'How to write at three in the morning',
      description:
        'Deep blue-grey, soft body text, a neon heading scale. At 3 a.m. the screen stops being harsh.',
    },
    salt: {
      name: 'SeeYue · Salt',
      short: 'Salt',
      tagline: 'Give the screen back its paper green',
      description:
        'A bean-green ground that holds the blue light down. A cushion between you and a long night.',
    },
  },
  mock: {
    file: 'seeyue-plus.md',
    search: 'Search files',
    outlineLabel: 'Outline',
    sidebar: ['SeeYue Plus', '1 · Headings', '2 · Code & tables', '3 · PDF export', 'Drafts', 'Untitled.md'],
    outline: ['SeeYue Plus', '1 · Why SeeYue', '1.1 Code blocks', '1.2 Tables', '2 · Install it'],
    title: 'SeeYue Plus',
    lead: 'A Typora theme built for long-form writing. Liquid glass, a six-level heading scale, LXGW WenKai — every layer of the Markdown spelled out.',
    h2: '1 · Why SeeYue',
    body: [
      { text: 'The problem is rarely a lack of ideas — it is that you cannot ' },
      { text: 'see', style: 'strong' },
      {
        text: ' the structure. Headings blur together, quotes dissolve into prose, code and paragraphs collide — ',
      },
      { text: 'reading', style: 'code' },
      { text: ' is tiring, and so is ' },
      { text: 'writing', style: 'code' },
      { text: '. See the ' },
      { text: 'design notes', style: 'link' },
      { text: '.' },
    ],
    quote:
      'SeeYue gives every heading level its own colour, so the skeleton stays visible in your peripheral vision.',
    h3a: '1.1 Code blocks',
    h3b: '1.2 Tables',
    cols: ['Palette', 'Ground', 'For'],
    rows: [
      ['Pure', '#f0f4f8', 'Daylight · colour'],
      ['Dark', '#1a1d24', 'Nights · long reads'],
      ['Salt', '#e4eddf', 'Long sessions'],
    ],
  },
  preview: {
    eyebrow: 'Live Preview',
    title: 'Try it right now',
    desc: 'The stylesheet running below is the theme itself, not an imitation. Edit on the left, watch the right.',
    printToggle: 'Print layout',
    export: 'Export PDF',
    source: 'Markdown',
    reset: 'Reset',
    hintScreen:
      'The preview loads the stylesheet straight from the repo. Hit Export PDF to open the system print dialog — choose Save as PDF and you get exactly what Typora would export.',
    hintPrint:
      'Print layout moves the theme’s print stylesheet onto the screen, restoring A4 margins and page background. Real pagination is the browser’s job — hit Export PDF and choose Save as PDF.',
    cta: 'Happy with it? Go install',
    sample: `# A Quiet Place to Write

The screen should disappear behind the words. **That is the whole job.**

## Why SeeYue

Most of the time the problem is not a lack of ideas — it is that you cannot *see* the structure.
Headings blur together, quotes dissolve into body text, \`code\` and prose collide.

> SeeYue gives every heading level its own colour, so the skeleton of the piece
> stays visible in your peripheral vision.

### Code blocks

\`\`\`javascript
const theme = await SeeYue.load('see-yue-dark.css')
theme.apply({ glass: true, wenkai: true })

// every heading level carries its own colour
theme.headings.map(h => h.color)
\`\`\`

### Palettes

| Palette | Ground | For |
| --- | --- | --- |
| Pure | \`#f0f4f8\` | Daylight · colour work |
| Dark | \`#1a1d24\` | Late nights · long reads |
| Salt | \`#e4eddf\` | Long sessions · a softer screen |

### Quotes that speak

> ### Warning
> Write a heading on the first line and the quote becomes a callout.

> #### Reference
> Different heading levels get different icons and colours.

## Checklist

- [x] Liquid-glass writing area
- [x] Six-level heading scale
- [ ] Write your next piece

1. Clone the repo
2. Copy it into Typora's theme folder
3. Press \`Ctrl / ⌘ + R\`
`,
  },
  features: {
    eyebrow: 'Craft',
    title: 'It doesn’t change what you write',
    desc: 'Only how you see it. From headings to scrollbars, every part serves one thing: making reading and writing take less effort.',
    items: [
      {
        title: 'Liquid glass',
        body: 'The writing area floats above the background like a real pane of glass. The sidebar, menus and footer all let the light through.',
      },
      {
        title: 'Six-level heading scale',
        body: 'From H1 to H6, every level carries its own colour. The skeleton of the piece stays visible in your peripheral vision.',
      },
      {
        title: 'LXGW WenKai',
        body: 'One of the most comfortable typefaces for Chinese writing, bundled with the theme. Open it and it is already there.',
      },
      {
        title: 'Code blocks like windows',
        body: 'Traffic-light dots, rounded corners, a language badge. Separate palettes for light and dark, line numbers where they belong.',
      },
      {
        title: 'Export-ready',
        body: 'The glass steps aside when you print. Margins, contents and page breaks are already arranged.',
      },
      {
        title: 'Quotes that speak',
        body: 'Write a heading on the first line and it becomes a callout. Warnings, tips and references, each instantly recognisable.',
      },
      {
        title: 'Never lost in a long document',
        body: 'File tree, outline and search, all redrawn. At a hundred thousand words you can still find your way back.',
      },
      {
        title: 'Make it yours',
        body: 'Ground colour, typeface, leading, corner radius — all in one commented config. Change a variable, change the mood.',
      },
    ],
    marquee: [
      'Body',
      'Headings',
      'Contents',
      'Links',
      'Lists',
      'Tables',
      'Quotes',
      'Code blocks',
      'Images',
      'Footnotes',
      'Sidebar',
      'Outline',
      'Context menu',
      'Footer',
      'Search panel',
      'Scrollbars',
      'PDF export',
    ],
  },
  install: {
    eyebrow: 'Install',
    title: 'Three steps',
    desc: 'Clone, run make sync, reload.',
    steps: [
      { title: 'Clone', body: 'Needs Git and make — Git for Windows has both.' },
      { title: 'Run make sync', body: 'Syncs into your Typora theme folder.' },
      { title: 'Reload', body: 'Ctrl / ⌘ + R, then pick from the Themes menu.' },
    ],
    files: 'Get the files',
    or: 'No make? Unzip and drop the three CSS files plus the SeeYue folder into the theme folder:',
    zip: 'Download ZIP',
    custom: 'Make your own version',
    customBody: 'Edit the configs under SeeYue/CSS/configs/ — every variable is commented. make watch syncs as you edit.',
    feedbackTitle: 'Something off, or something missing?',
    feedbackBody: 'The theme is open source on GitHub. Issues and ideas are both welcome.',
    github: 'Open GitHub',
  },
  obsidian: {
    eyebrow: 'Obsidian',
    title: 'SeeYue for Obsidian',
    desc: 'The same typographic order, carried over to Obsidian. Light and Dark follow Obsidian’s own appearance switch; Salt rides along as a separate snippet.',
    wip: 'Work in progress',
    wipNote: 'Early days — the styling is still moving and may be unstable. For everyday notes, the Typora version is the safer bet, or treat this as a trial you can switch off anytime.',
    cta: 'Visit the repo',
  },
  footer: { desc: 'A Typora theme built for long-form writing.', license: 'MIT LICENSED · MADE FOR TYPORA' },
}

const ja: Copy = {
  htmlLang: 'ja',
  title: 'SeeYue Plus — 長文を書くための Typora テーマ',
  description:
    'SeeYue Plus は長文執筆のための Typora テーマです。リキッドグラスの本文エリア、6段階の見出しカラー、霞鹜文楷の本文、Mac 風のコードブロック、印刷可能な PDF 書き出し。Pure / Dark / Salt の3配色をサイト上でプレビューできます。',
  nav: {
    showcase: '3つの配色',
    preview: 'プレビュー',
    features: '特徴',
    install: 'インストール',
    switchLabel: '言語を切り替える',
  },
  hero: {
    eyebrow: 'Typora テーマ · 長文を書くために',
    tagline: '長文執筆のための組版の秩序',
    sub: 'リキッドグラスの本文エリア、6段階の見出しカラー、霞鹜文楷の本文、そしてそのまま印刷できる PDF 書き出し。',
    ctaPrimary: 'Typora に入れる',
    ctaSecondary: '3つの配色を見る',
    stats: [
      { k: '3', v: '配色' },
      { k: '6', v: '見出しレベル' },
      { k: '20+', v: '調整できる箇所' },
      { k: '0', v: '依存関係' },
    ],
  },
  palettes: {
    eyebrow: 'Palettes',
    title: '3つの配色、ひとつの秩序',
    desc: '同じ組版ルールに、3つの下地。配色はそれぞれ独立したファイルなので、変数をひとつ変えれば4つ目が生えます。',
    scale: 'Heading Scale',
  },
  themes: {
    pure: {
      name: '見月 · ライト',
      short: 'ライト',
      tagline: '白紙のように静か',
      description: '冷たい白の下地に、薄いガラスを一枚。日中の執筆、色の確認、印刷に。',
    },
    dark: {
      name: '見月 · ダーク',
      short: 'ダーク',
      tagline: '深夜の執筆はこれで',
      description: '深い青灰の下地に、柔らかい本文とネオンの見出し。午前三時、画面が刺さらない。',
    },
    salt: {
      name: '見月 · アイケア',
      short: 'アイケア',
      tagline: '紙の緑を画面に返す',
      description: '豆緑の下地がブルーライトを抑えます。長い夜と長い文章のあいだの緩衝材。',
    },
  },
  mock: {
    file: '見月 · 序.md',
    search: 'ファイルを検索',
    outlineLabel: 'Outline',
    sidebar: ['見月 · 序', '1 · 見出し', '2 · コードと表', '3 · PDF 書き出し', '下書き', '無題.md'],
    outline: ['見月 · SeeYue Plus', '1 · なぜ見月か', '1.1 コードブロック', '1.2 表', '2 · 導入'],
    title: '見月 · SeeYue Plus',
    lead: '長文執筆のための Typora テーマ。リキッドグラス、6段階の見出しカラー、霞鹜文楷の本文。Markdown の階層をひとつずつ描き分けます。',
    h2: '1 · なぜ見月か',
    body: [
      { text: '書けないのは発想がないからではなく、' },
      { text: '構造が見えない', style: 'strong' },
      { text: 'からだ。見出しの階層はつぶれ、引用は本文に溶け、コードと段落がぶつかる——' },
      { text: '読', style: 'code' },
      { text: 'む側も疲れるし、' },
      { text: '書', style: 'code' },
      { text: 'く側も疲れる。詳しくは' },
      { text: '設計メモ', style: 'link' },
      { text: '。' },
    ],
    quote: '見月は見出しの階層ごとに色を与える。文章の骨格は、視界の端にとどまり続ける。',
    h3a: '1.1 コードブロック',
    h3b: '1.2 表',
    cols: ['配色', '下地', '用途'],
    rows: [
      ['ライト Pure', '#f0f4f8', '日中 · 色の確認'],
      ['ダーク Dark', '#1a1d24', '深夜 · 長文'],
      ['アイケア Salt', '#e4eddf', '長時間 · 緩衝'],
    ],
  },
  preview: {
    eyebrow: 'Live Preview',
    title: 'その場で試す',
    desc: '下で動いているのはテーマ本人のスタイルシートです。左を書き換えれば、右がすぐ変わります。',
    printToggle: '印刷レイアウト',
    export: 'PDF 書き出し',
    source: 'Markdown',
    reset: 'リセット',
    hintScreen:
      'プレビューはリポジトリの CSS をそのまま読んでいます。模倣品ではありません。「PDF 書き出し」でシステムの印刷ダイアログが開くので、「PDF に保存」を選べば Typora からの書き出しと同じものが得られます。',
    hintPrint:
      '「印刷レイアウト」はテーマの印刷用スタイルシートを画面に持ってきたもので、余白とページ下地を A4 で再現します。実際の改ページはブラウザの仕事です —— 「PDF 書き出し」から「PDF に保存」を選んでください。',
    cta: '決まったら、インストール',
    sample: `# 静かな場所で書く

画面は言葉の後ろに消えていくべきだ。**それがこのテーマの仕事のすべて。**

## なぜ見月か

書けないのは発想がないからではなく、**構造が見えない**からだ。
見出しの階層がつぶれ、引用は本文に溶け、\`コード\`と文章がぶつかる。

> 見月は見出しの階層ごとに色を与える。文章の骨格は、
> 視界の端にとどまり続ける。

### コードブロック

\`\`\`javascript
const theme = await SeeYue.load('see-yue-dark.css')
theme.apply({ glass: true, wenkai: true })

// 見出しは階層ごとに色を持つ
theme.headings.map(h => h.color)
\`\`\`

### 配色

| 配色 | 下地 | 用途 |
| --- | --- | --- |
| ライト Pure | \`#f0f4f8\` | 日中 · 色の確認 |
| ダーク Dark | \`#1a1d24\` | 深夜 · 長文 |
| アイケア Salt | \`#e4eddf\` | 長時間 · 緩衝 |

### 引用の使い分け

> ### 注意
> 最初の行に見出しを書くと、引用はコールアウトになる。

> #### 参考
> 見出しのレベルごとに、違うアイコンと色が付く。

## チェックリスト

- [x] リキッドグラスの本文エリア
- [x] 6段階の見出しカラー
- [ ] 次の一本を書く

1. リポジトリを clone
2. Typora のテーマフォルダにコピー
3. \`Ctrl / ⌘ + R\` で再読み込み
`,
  },
  features: {
    eyebrow: 'Craft',
    title: '書く中身は変えない',
    desc: '変えるのは、見え方だけ。見出しからスクロールバーまで、すべてはひとつのために —— 読み書きの負荷を下げること。',
    items: [
      {
        title: 'リキッドグラス',
        body: '本文エリアが背景の上に浮かぶ。本物のガラスのように。サイドバーもメニューも、奥の光を通す。',
      },
      {
        title: '6段階の見出しカラー',
        body: 'H1 から H6 まで、それぞれに色がある。文章の骨格は、視界の端で見えている。',
      },
      {
        title: '霞鹜文楷',
        body: '中国語の執筆で最も心地よい書体のひとつ。テーマに同梱。開けばもうそこにある。',
      },
      {
        title: '窓のようなコードブロック',
        body: '三つの丸、角丸、言語バッジ。明暗それぞれの配色で、行番号とコードがそれぞれの位置に。',
      },
      {
        title: '書き出してそのまま',
        body: '印刷のとき、画面のガラスは静かに退く。余白も目次も改ページも、もう整えてある。',
      },
      {
        title: '引用がものを言う',
        body: '最初の行に見出しを書けば、それはコールアウトになる。注意・ヒント・参考が一目で分かる。',
      },
      {
        title: '長い文書で迷わない',
        body: 'ファイルツリー、アウトライン、検索。すべて描き直した。十万字でも戻り道は見つかる。',
      },
      {
        title: '好きに変えられる',
        body: '下地の色、書体、行間、角丸。すべてコメント付きの設定ファイルに。変数をひとつ変えれば、雰囲気が変わる。',
      },
    ],
    marquee: [
      '本文',
      '見出し',
      '目次',
      'リンク',
      'リスト',
      '表',
      '引用',
      'コードブロック',
      '画像',
      '脚注',
      'サイドバー',
      'アウトライン',
      'コンテキストメニュー',
      'フッター',
      '検索パネル',
      'スクロールバー',
      'PDF 書き出し',
    ],
  },
  install: {
    eyebrow: 'Install',
    title: '3ステップ',
    desc: 'clone して、make sync して、再読み込み。',
    steps: [
      { title: 'clone', body: 'Git と make が必要（Git for Windows に同梱）。' },
      { title: 'make sync', body: 'Typora のテーマフォルダへ同期。' },
      { title: '再読み込み', body: 'Ctrl / ⌘ + R して、テーマメニューから選ぶ。' },
    ],
    files: 'Get the files',
    or: 'make が無い場合は解凍して、3つの CSS と SeeYue フォルダをテーマフォルダへ：',
    zip: 'ZIP をダウンロード',
    custom: '自分用に作り変える',
    customBody: 'SeeYue/CSS/configs/ の config を編集。変数にはコメント付き。make watch で保存ごとに同期。',
    feedbackTitle: 'しっくりこない、あるいは何か足りない',
    feedbackBody: 'テーマは GitHub で公開しています。不具合も要望も、Issue でどうぞ。',
    github: 'GitHub へ',
  },
  obsidian: {
    eyebrow: 'Obsidian',
    title: '見月 · Obsidian 版',
    desc: '同じ組版の秩序を Obsidian へ。明暗の配色は Obsidian の外観切り替えに追随し、護眼は別途スニペットでどうぞ。',
    wip: '開発中',
    wipNote: 'まだ始まったばかりで、スタイルは動いており不安定な可能性があります。日常使いには Typora 版を推奨します。',
    cta: 'リポジトリへ',
  },
  footer: { desc: '長文を書くための Typora テーマ。', license: 'MIT LICENSED · MADE FOR TYPORA' },
}

export const COPY: Record<Locale, Copy> = { zh, en, ja }
