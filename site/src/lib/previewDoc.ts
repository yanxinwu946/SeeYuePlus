import type { ThemeId } from '../data/themes'

// 主题的 html/body/#write 规则是全局的，塞进宣传页会互相打架，隔离在 iframe 里

const SHIM = `
html, body { margin: 0; }
content { display: block; }
body { min-height: 100vh; }

/* 行号：主题只负责着色，CodeMirror 那套绝对定位布局得自己摆 */
#write pre.md-fences .CodeMirror-scroll {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}
#write pre.md-fences .CodeMirror-sizer { flex: 1 1 auto; min-width: 0; }
#write pre.md-fences .CodeMirror-gutters {
  position: static;
  flex: 0 0 auto;
  text-align: right;
  padding-top: .6em;
  user-select: none;
}
#write pre.md-fences .CodeMirror-linenumber { line-height: 1.6; }

/* 滚动条宽度在 iframe 里按内容走，别让它撑出横向滚动 */
#write pre.md-fences { overflow-x: auto; }
`

export interface PreviewOptions {
  palette: ThemeId
  print: boolean
  html: string
}

export function buildPreviewDoc({ palette, print, html }: PreviewOptions): string {
  const base = import.meta.env.BASE_URL
  const theme = `${base}theme/see-yue-${palette}${print ? '-print' : ''}.css`

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.7.0/style.css">
<link rel="stylesheet" href="${theme}">
<style>${SHIM}</style>
</head>
<body${print ? ' class="typora-export"' : ''}>
<content><div id="write">${html}</div></content>
</body>
</html>`
}
