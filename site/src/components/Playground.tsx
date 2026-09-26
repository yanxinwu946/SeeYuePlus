import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { THEMES, type ThemeId } from '../data/themes'
import { useI18n } from '../i18n'
import { buildPreviewDoc } from '../lib/previewDoc'
import { renderMarkdown } from '../lib/typora'
import { Reveal } from './Reveal'
import { IconArrow, IconDownload, IconLeaf, IconMoon, IconSun } from './Icons'

const PALETTE_ICON: Record<ThemeId, typeof IconSun> = {
  pure: IconSun,
  dark: IconMoon,
  salt: IconLeaf,
}

export function Playground() {
  const { t } = useI18n()
  const frameRef = useRef<HTMLIFrameElement>(null)

  const [palette, setPalette] = useState<ThemeId>('pure')
  const [print, setPrint] = useState(false)
  const [md, setMd] = useState(t.preview.sample)
  const lastSample = useRef(t.preview.sample)

  // 换语言时只有用户没动过才换示例文。prev 必须先取出来 ——
  // setMd 的更新函数延迟执行，等它跑时 lastSample.current 已被覆盖
  useEffect(() => {
    const prev = lastSample.current
    lastSample.current = t.preview.sample
    setMd((cur) => (cur === prev ? t.preview.sample : cur))
  }, [t.preview.sample])

  const html = useMemo(() => renderMarkdown(md), [md])

  // 配色/模式变了才重建文档（要重新加载主题 CSS）
  const srcDoc = useMemo(
    () => buildPreviewDoc({ palette, print, html: '' }),
    [palette, print],
  )

  // 正文变化只换 #write 的内容，不重载 iframe，否则每敲一个字都闪一次
  const sync = useCallback(() => {
    const write = frameRef.current?.contentDocument?.getElementById('write')
    if (write) write.innerHTML = html
  }, [html])

  useEffect(sync, [sync, srcDoc])

  return (
    <section className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center sm:mb-14">
          <p className="eyebrow mb-4">{t.preview.eyebrow}</p>
          <h2 className="display stroke-fix mb-4 text-[clamp(1.8rem,4.6vw,2.7rem)] text-mist-100">
            {t.preview.title}
          </h2>
          <p className="mx-auto max-w-2xl text-[0.95rem] leading-[1.9] text-mist-500">
            {t.preview.desc}
          </p>
        </Reveal>

        <Reveal>
          <div className="glass hairline overflow-hidden rounded-2xl">
            <div className="flex flex-wrap items-center gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-1">
                {THEMES.map((th) => {
                  const Icon = PALETTE_ICON[th.id]
                  const on = palette === th.id
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setPalette(th.id)}
                      aria-pressed={on}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.82rem] font-medium transition-all duration-300 ${
                        on
                          ? 'bg-ember-500/16 text-ember-300 ring-1 ring-ember-400/35'
                          : 'text-mist-500 hover:bg-white/5 hover:text-mist-100'
                      }`}
                    >
                      <Icon />
                      {t.themes[th.id].short}
                    </button>
                  )
                })}
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPrint((v) => !v)}
                  aria-pressed={print}
                  className={`rounded-full px-3 py-1.5 text-[0.82rem] transition-all duration-300 ${
                    print
                      ? 'bg-azure-500/18 text-azure-300 ring-1 ring-azure-400/35'
                      : 'text-mist-500 hover:bg-white/5 hover:text-mist-100'
                  }`}
                >
                  {t.preview.printToggle}
                </button>
                <button
                  type="button"
                  onClick={() => frameRef.current?.contentWindow?.print()}
                  className="btn btn--primary !px-4 !py-1.5 !text-[0.82rem]"
                >
                  <IconDownload width={15} height={15} />
                  {t.preview.export}
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
              <div className="flex flex-col border-b border-white/8 lg:border-r lg:border-b-0">
                <div className="flex items-center gap-2 px-4 py-2.5">
                  <span className="text-[0.68rem] tracking-[0.2em] text-mist-600 uppercase">
                    {t.preview.source}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMd(t.preview.sample)}
                    className="ml-auto text-[0.75rem] text-mist-600 transition-colors duration-300 hover:text-ember-300"
                  >
                    {t.preview.reset}
                  </button>
                </div>
                <textarea
                  value={md}
                  onChange={(e) => setMd(e.target.value)}
                  spellCheck={false}
                  aria-label={t.preview.source}
                  className="h-[22rem] w-full flex-1 resize-none bg-ink-950/50 px-4 py-3 text-[0.82rem] leading-[1.75] text-mist-300 outline-none lg:h-[36rem]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div
                className={`relative flex justify-center p-3 transition-colors duration-500 sm:p-5 ${
                  print ? 'bg-ink-900/60' : ''
                }`}
              >
                <iframe
                  ref={frameRef}
                  srcDoc={srcDoc}
                  onLoad={sync}
                  title={t.preview.title}
                  className={`h-[30rem] w-full rounded-xl border border-white/8 lg:h-[36rem] ${
                    print ? 'max-w-[210mm] shadow-[0_20px_60px_-20px_rgba(0,0,0,.8)]' : ''
                  }`}
                />
              </div>
            </div>

            <p className="border-t border-white/8 px-4 py-3 text-[0.78rem] leading-[1.7] text-mist-600 sm:px-5">
              {print ? t.preview.hintPrint : t.preview.hintScreen}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-6 text-center">
          <a href="#install" className="btn btn--ghost">
            {t.preview.cta}
            <IconArrow width={16} height={16} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
