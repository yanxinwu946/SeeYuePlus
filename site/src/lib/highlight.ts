import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import json from 'highlight.js/lib/languages/json'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import markdown from 'highlight.js/lib/languages/markdown'
import yaml from 'highlight.js/lib/languages/yaml'
import sql from 'highlight.js/lib/languages/sql'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
import java from 'highlight.js/lib/languages/java'

// 主题的代码配色按 CodeMirror 的 token 类名写，这里把 hljs 的类名翻译过去
const CLASS_MAP: Record<string, string> = {
  'hljs-keyword': 'cm-keyword',
  'hljs-built_in': 'cm-builtin',
  'hljs-type': 'cm-variable-3',
  'hljs-literal': 'cm-atom',
  'hljs-number': 'cm-number',
  'hljs-regexp': 'cm-string-2',
  'hljs-string': 'cm-string',
  'hljs-subst': 'cm-variable',
  'hljs-symbol': 'cm-atom',
  'hljs-class': 'cm-def',
  'hljs-function': 'cm-def',
  'hljs-title': 'cm-def',
  'hljs-params': 'cm-variable-3',
  'hljs-comment': 'cm-comment',
  'hljs-doctag': 'cm-meta',
  'hljs-meta': 'cm-meta',
  'hljs-section': 'cm-def',
  'hljs-tag': 'cm-tag',
  'hljs-name': 'cm-tag',
  'hljs-attr': 'cm-attribute',
  'hljs-attribute': 'cm-attribute',
  'hljs-variable': 'cm-variable',
  'hljs-bullet': 'cm-variable-2',
  'hljs-code': 'cm-string',
  'hljs-emphasis': 'cm-variable-2',
  'hljs-strong': 'cm-variable-2',
  'hljs-formula': 'cm-meta',
  'hljs-link': 'cm-link',
  'hljs-quote': 'cm-comment',
  'hljs-selector-tag': 'cm-tag',
  'hljs-selector-id': 'cm-qualifier',
  'hljs-selector-class': 'cm-qualifier',
  'hljs-selector-attr': 'cm-attribute',
  'hljs-selector-pseudo': 'cm-qualifier',
  'hljs-template-tag': 'cm-meta',
  'hljs-template-variable': 'cm-variable',
  'hljs-addition': 'cm-positive',
  'hljs-deletion': 'cm-negative',
  'hljs-property': 'cm-property',
  'hljs-punctuation': 'cm-bracket',
  'hljs-operator': 'cm-operator',
}

const LANGUAGES: Record<string, unknown> = {
  javascript, typescript, json, css, xml, python, bash, markdown, yaml, sql, go, rust, java,
}

const ALIASES: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  console: 'bash',
  html: 'xml',
  vue: 'xml',
  svg: 'xml',
  yml: 'yaml',
  golang: 'go',
  rs: 'rust',
  md: 'markdown',
}

for (const [name, lang] of Object.entries(LANGUAGES)) {
  hljs.registerLanguage(name, lang as never)
}

export function normalizeLang(raw?: string): string {
  const l = (raw ?? '').trim().toLowerCase()
  return ALIASES[l] ?? l
}

function remapClasses(html: string): string {
  return html.replace(/class="([^"]*)"/g, (_m, names: string) => {
    const mapped = names
      .split(/\s+/)
      .map((n) => CLASS_MAP[n] ?? (n.startsWith('hljs-') ? '' : n))
      .filter(Boolean)
    return mapped.length ? `class="${mapped.join(' ')}"` : ''
  })
}

// 按行拆开高亮结果：span 会跨行，得在换行处先闭合再重开
function splitLines(html: string): string[] {
  const lines: string[] = []
  const open: string[] = []
  let cur = ''
  let i = 0

  while (i < html.length) {
    if (html[i] === '<') {
      const end = html.indexOf('>', i)
      if (end === -1) {
        cur += html.slice(i)
        break
      }
      const tag = html.slice(i, end + 1)
      if (tag.startsWith('</')) open.pop()
      else if (!tag.endsWith('/>')) open.push(tag)
      cur += tag
      i = end + 1
      continue
    }

    let j = i
    while (j < html.length && html[j] !== '<') j++
    const parts = html.slice(i, j).split('\n')
    for (let k = 0; k < parts.length; k++) {
      if (k > 0) {
        cur += '</span>'.repeat(open.length)
        lines.push(cur)
        cur = open.join('')
      }
      cur += parts[k]
    }
    i = j
  }
  lines.push(cur)
  return lines
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function highlight(code: string, rawLang?: string): { lang: string; lines: string[] } {
  const lang = normalizeLang(rawLang)
  let html: string

  if (lang && LANGUAGES[lang]) {
    try {
      html = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
    } catch {
      html = escapeHtml(code)
    }
  } else {
    html = escapeHtml(code)
  }

  return { lang, lines: splitLines(remapClasses(html)) }
}
