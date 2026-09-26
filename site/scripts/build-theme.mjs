/**
 * 把主题的 @import 链拍平成单文件，供官网的在线预览用 iframe 加载。
 * 顺带剥掉 config 里给人看的中文注释（占了大半体积），并产出把
 * @media print 换成 @media all 的「打印版」，让打印排版能在屏幕上预览。
 *
 * 产物在 site/public/theme/，已 gitignore，由 predev/prebuild 生成。
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const siteRoot = resolve(here, '..')
const repoRoot = resolve(siteRoot, '..')
const outDir = resolve(siteRoot, 'public', 'theme')
const fontOutDir = resolve(outDir, 'fonts')

const THEMES = ['pure', 'dark', 'salt']

/* 霞鹜文楷两个 woff2 各 8MB，放进站点太重。
   改用 jsDelivr 上按 unicode-range 分片的 Screen 版本，只下用到的字形；
   用户本机装了霞鹜文楷时 local() 仍然优先命中。 */
const WENKAI_FAMILY = '"LXGW WenKai Screen R", "LXGW WenKai Screen", "霞鹜文楷"'

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '')

/**
 * 递归展开 @import。
 * 只在「非注释」状态下识别 @import —— 主题里大量开关是靠注释掉的 @import 实现的。
 */
function flatten(entry, seen = new Set()) {
  const abs = resolve(entry)
  if (seen.has(abs)) return ''
  seen.add(abs)

  const raw = readFileSync(abs, 'utf8')
  const dir = dirname(abs)
  let out = ''

  // 先把注释整段抠出来，避免注释里的 @import 被当成真的
  const withoutComments = stripComments(raw)
  const importRe = /@import\s+(?:url\()?["']([^"')]+)["']\)?\s*;/g
  let last = 0
  let m

  while ((m = importRe.exec(withoutComments)) !== null) {
    out += withoutComments.slice(last, m.index)
    last = m.index + m[0].length
    const target = m[1]
    if (target.startsWith('.') || target.startsWith('/')) {
      const child = resolve(dir, target)
      if (existsSync(child)) out += flatten(child, seen)
    }
  }
  out += withoutComments.slice(last)
  return out
}

function buildTheme(id) {
  const entry = resolve(repoRoot, `see-yue-${id}.css`)
  let css = flatten(entry)

  // 字体路径：拍平后从 public/theme/ 出发，图标字体改指同目录下的 fonts/
  css = css.replace(/url\(["']?\.\.\/Fonts\/icon_font\//g, 'url("./fonts/')

  // 丢掉霞鹜文楷的本地 @font-face（指向 8MB woff2），改用 CDN 分片版本
  css = css.replace(/@font-face\s*\{[^}]*?LXGWWenKai[^}]*?\}/g, '')

  // 把主题里写死的 "霞鹜文楷" 换成带 CDN 家族的字体栈
  css = css.replace(/"霞鹜文楷"/g, WENKAI_FAMILY)

  // 压掉多余空白
  css = css.replace(/\s*\n\s*/g, '\n').replace(/\n{2,}/g, '\n').trim()

  writeFileSync(resolve(outDir, `see-yue-${id}.css`), css, 'utf8')

  // 打印版：@media print → @media all，让打印排版能在屏幕上预览
  let printCss = css.replace(/@media\s+print\s*\{/g, '@media all {')
  // @page 在屏幕上不生效，把页边距与整页底色搬到 html 上，A4 预览框才有正确的留白
  printCss += `

/* ——— 以下为「打印预览」专用补丁，只存在于 see-yue-*-print.css ——— */
@media all {
  html {
    padding: var(--pdf-page-margin, 14mm 12mm);
    background: var(--pdf-page-bg-color, #fff) !important;
    background-image: none !important;
    box-sizing: border-box;
    min-height: 100%;
  }
  #write {
    margin: 0 auto !important;
  }
}
`
  writeFileSync(resolve(outDir, `see-yue-${id}-print.css`), printCss, 'utf8')

  return { id, size: css.length, printSize: printCss.length }
}

mkdirSync(fontOutDir, { recursive: true })

// 图标字体很小（合计不到 20KB），直接拷
const iconFonts = ['iconfont.woff2', 'remixicon.woff2']
for (const f of iconFonts) {
  const src = resolve(repoRoot, 'SeeYue', 'Fonts', 'icon_font', f)
  if (existsSync(src)) copyFileSync(src, resolve(fontOutDir, f))
}

const results = THEMES.map(buildTheme)
for (const r of results) {
  console.log(
    `  theme/${'see-yue-' + r.id}.css  ${(r.size / 1024).toFixed(1)} KB` +
      `   (+print ${(r.printSize / 1024).toFixed(1)} KB)`,
  )
}
