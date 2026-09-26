import { useLayoutEffect, useRef, useState } from 'react'
import { THEMES, type ThemeId } from '../data/themes'
import { useI18n } from '../i18n'
import { TyporaMock } from './TyporaMock'
import { IconArrow, IconDownload, IconLeaf, IconMoon, IconSun } from './Icons'

const ICONS: Record<ThemeId, typeof IconSun> = {
  pure: IconSun,
  dark: IconMoon,
  salt: IconLeaf,
}

// 滑块用 transform 跟着当前项走，宽度实测
function ThemePill({ value, onChange }: { value: ThemeId; onChange: (v: ThemeId) => void }) {
  const { t } = useI18n()
  const wrap = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState({ left: 4, width: 0 })

  useLayoutEffect(() => {
    const el = wrap.current?.querySelector<HTMLButtonElement>(`[data-theme-id="${value}"]`)
    if (!el || !wrap.current) return
    setThumb({ left: el.offsetLeft, width: el.offsetWidth })
  }, [value, t])

  return (
    <div className="theme-pill" ref={wrap} role="tablist" aria-label={t.palettes.eyebrow}>
      <span
        className="theme-pill__thumb"
        style={{ transform: `translateX(${thumb.left - 4}px)`, width: thumb.width }}
        aria-hidden
      />
      {THEMES.map((th) => {
        const Icon = ICONS[th.id]
        return (
          <button
            key={th.id}
            type="button"
            role="tab"
            data-theme-id={th.id}
            data-active={value === th.id}
            aria-selected={value === th.id}
            className="theme-pill__btn"
            onClick={() => onChange(th.id)}
          >
            <Icon />
            {t.themes[th.id].short}
          </button>
        )
      })}
    </div>
  )
}

export function Hero() {
  const { t } = useI18n()
  const [theme, setTheme] = useState<ThemeId>('dark')

  return (
    <section id="top" className="relative px-5 pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-6">{t.hero.eyebrow}</p>

          <h1 className="display stroke-fix mb-5 text-[clamp(3.2rem,11vw,6.5rem)] leading-[1.05] text-mist-100">
            <span className="text-gradient">见月</span>
          </h1>

          <p
            className="mb-4 text-[clamp(1rem,2.4vw,1.28rem)] tracking-[0.18em] text-mist-300"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            SEEYUE&nbsp;PLUS
          </p>

          <p className="mx-auto max-w-2xl text-[0.98rem] leading-[1.9] text-mist-500 sm:text-[1.05rem]">
            {t.hero.tagline}
            <br className="hidden sm:block" />
            {t.hero.sub}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#install" className="btn btn--primary">
              <IconDownload width={17} height={17} />
              {t.hero.ctaPrimary}
            </a>
            <a href="#showcase" className="btn btn--ghost">
              {t.hero.ctaSecondary}
              <IconArrow width={16} height={16} />
            </a>
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <div className="mb-5 flex justify-center">
            <ThemePill value={theme} onChange={setTheme} />
          </div>

          <div className="float-soft relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-8 -bottom-10 top-10 -z-10 rounded-[3rem] opacity-60 blur-3xl"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 40%, rgba(233,105,0,.35), transparent 62%), radial-gradient(ellipse at 72% 60%, rgba(66,139,202,.32), transparent 62%)',
              }}
            />
            <TyporaMock theme={theme} />
          </div>
        </div>

        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {t.hero.stats.map((s) => (
            <div key={s.v} className="text-center">
              <dt className="display text-[1.7rem] text-mist-100">{s.k}</dt>
              <dd className="mt-1 text-[0.8rem] tracking-[0.12em] text-mist-600">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
