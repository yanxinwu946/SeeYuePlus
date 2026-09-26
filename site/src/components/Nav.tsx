import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { REPO_URL } from '../data/themes'
import { LOCALES, LOCALE_CODE, LOCALE_LABEL, useI18n, type Locale } from '../i18n'
import { IconCheck, IconGitHub, IconGlobe } from './Icons'

// 弹层挂到 body 上，否则会被导航栏的层叠上下文和圆角胶囊框住
function LangMenu() {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, right: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLUListElement>(null)

  const place = useCallback(() => {
    const r = btnRef.current?.getBoundingClientRect()
    if (r) setPos({ top: r.bottom + 8, right: window.innerWidth - r.right })
  }, [])

  useEffect(() => {
    if (!open) return
    place()

    const onDown = (e: MouseEvent) => {
      const el = e.target as Node
      if (btnRef.current?.contains(el) || panelRef.current?.contains(el)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)

    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open, place])

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.switchLabel}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.84rem] text-mist-500 transition-colors duration-300 hover:bg-white/5 hover:text-mist-100"
      >
        <IconGlobe width={15} height={15} />
        {LOCALE_CODE[locale]}
      </button>

      {open &&
        createPortal(
          <ul
            ref={panelRef}
            role="listbox"
            aria-label={t.nav.switchLabel}
            className="glass fixed z-[100] m-0 w-40 list-none rounded-2xl p-1.5"
            style={{ top: pos.top, right: pos.right }}
          >
            {LOCALES.map((l) => {
              const on = l === locale
              return (
                <li key={l}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={on}
                    lang={l}
                    onClick={() => {
                      setLocale(l as Locale)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[0.86rem] transition-colors duration-200 ${
                      on ? 'bg-ember-500/14 text-ember-300' : 'text-mist-300 hover:bg-white/6'
                    }`}
                  >
                    {LOCALE_LABEL[l]}
                    {on && <IconCheck width={14} height={14} />}
                  </button>
                </li>
              )
            })}
          </ul>,
          document.body,
        )}
    </>
  )
}

export function Nav() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#showcase', label: t.nav.showcase },
    { href: '#preview', label: t.nav.preview },
    { href: '#features', label: t.nav.features },
    { href: '#install', label: t.nav.install },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? 'glass w-[min(92%,62rem)]' : 'w-[min(92%,68rem)] border border-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 no-underline">
          <span
            className="grid size-8 place-items-center rounded-[10px] text-[0.95rem] font-semibold text-white"
            style={{
              background: 'linear-gradient(140deg, var(--color-ember-500), var(--color-clay-400))',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.3), 0 6px 16px -6px rgba(233,105,0,.9)',
              fontFamily: 'var(--font-display)',
            }}
          >
            月
          </span>
          <span className="display text-[0.98rem] text-mist-100">
            见月<span className="ml-1 text-[0.72rem] tracking-[0.2em] text-mist-500">PLUS</span>
          </span>
        </a>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[0.86rem] text-mist-500 no-underline transition-colors duration-300 hover:bg-white/5 hover:text-mist-100"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <LangMenu />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost !px-3.5 !py-1.5 !text-[0.84rem]"
          >
            <IconGitHub width={16} height={16} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
