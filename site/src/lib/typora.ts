import { marked } from 'marked'
import { highlight } from './highlight'

/**
 * 主题大量选择器按 Typora 的 DOM 写，标准 Markdown 输出吃不到：
 * 标题色块要 #write 直接子元素、代码块要 CodeMirror 类名、表格要 figure 包裹……
 * 所以让 marked 先出标准 HTML，再补一遍结构。
 */

const ADMONITION_HEADINGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6'])

function codeBlock(pre: Element): string {
  const code = pre.querySelector('code')
  const raw = (code ?? pre).textContent ?? ''
  const fromClass = /language-([\w+#-]+)/.exec(code?.className ?? '')?.[1]
  const fromAttr = pre.getAttribute('data-lang') ?? undefined
  const { lang, lines } = highlight(raw.replace(/\n$/, ''), fromClass ?? fromAttr)

  const gutter = lines
    .map((_, i) => `<div class="CodeMirror-linenumber CodeMirror-gutter-elt">${i + 1}</div>`)
    .join('')

  const body = lines
    .map(
      (l) =>
        `<div><pre class="CodeMirror-line"><span role="presentation">${l || '&nbsp;'}</span></pre></div>`,
    )
    .join('')

  return (
    `<pre class="md-fences md-end-block ty-contain-cm" mdtype="fences" lang="${lang}">` +
    `<div class="CodeMirror cm-s-inner CodeMirror-wrap">` +
    `<div class="CodeMirror-scroll">` +
    `<div class="CodeMirror-gutters"><div class="CodeMirror-linenumbers">${gutter}</div></div>` +
    `<div class="CodeMirror-sizer">` +
    `<div class="CodeMirror-lines"><div class="CodeMirror-code">${body}</div></div>` +
    `</div>` +
    `</div></div></pre>`
  )
}

function decorate(root: ParentNode): void {
  root.querySelectorAll('pre').forEach((pre) => {
    if (pre.closest('.md-fences')) return
    const holder = pre.ownerDocument.createElement('div')
    holder.innerHTML = codeBlock(pre)
    pre.replaceWith(holder.firstElementChild!)
  })

  // 表格外阴影、斑马纹、sticky 表头都挂在 figure 上
  root.querySelectorAll('table').forEach((table) => {
    if (table.parentElement?.tagName === 'FIGURE') return
    const fig = table.ownerDocument.createElement('figure')
    fig.className = 'md-table-fig'
    table.replaceWith(fig)
    fig.appendChild(table)
  })

  // 图注编号取 attr(alt)，且 .md-image 必须是 <p> 的直接子元素
  root.querySelectorAll('p > img').forEach((img) => {
    const span = img.ownerDocument.createElement('span')
    span.className = 'md-image'
    span.setAttribute('alt', img.getAttribute('alt') ?? '')
    img.replaceWith(span)
    span.appendChild(img)
  })

  root.querySelectorAll('li').forEach((li) => {
    const box = li.querySelector('input[type="checkbox"]')
    if (!box) return
    li.classList.add('task-list-item', 'md-task-list-item')
    if (li.querySelector('p')) li.querySelector('p')!.classList.add('first')
  })

  // 链接下划线的 hover 动画需要 Typora 的 md-link 包裹层
  root.querySelectorAll('a[href]').forEach((a) => {
    if (a.parentElement?.classList.contains('md-link')) return
    const span = a.ownerDocument.createElement('span')
    span.className = 'md-link'
    span.setAttribute('md-inline', 'link')
    a.replaceWith(span)
    span.appendChild(a)
  })

  // 引用块首元素是标题即 Admonitions；标题文字包一层 span 才拿到标题色
  root.querySelectorAll('blockquote').forEach((bq) => {
    const first = bq.firstElementChild
    if (!first || !ADMONITION_HEADINGS.has(first.tagName)) return
    if (first.querySelector('span')) return
    const span = bq.ownerDocument.createElement('span')
    span.innerHTML = first.innerHTML
    first.innerHTML = ''
    first.appendChild(span)
  })
}

export function renderMarkdown(md: string): string {
  const raw = marked.parse(md, { async: false, gfm: true, breaks: false }) as string
  const doc = new DOMParser().parseFromString(`<body><div id="__r">${raw}</div></body>`, 'text/html')
  const root = doc.getElementById('__r')!
  decorate(root)
  return root.innerHTML
}
