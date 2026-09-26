import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { COPY, LOCALES, matchLocale, type Copy, type Locale } from './copy'

const STORAGE_KEY = 'seeyue-locale'

interface I18nValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Copy
}

const I18nContext = createContext<I18nValue | null>(null)

function initialLocale(): Locale {
  // ?lang=en 优先，方便分享指定语言的链接
  const fromUrl = new URLSearchParams(location.search).get('lang')
  if (fromUrl && (LOCALES as readonly string[]).includes(fromUrl)) return fromUrl as Locale

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && (LOCALES as readonly string[]).includes(saved)) return saved as Locale
  } catch {
    // 隐私模式下 localStorage 会抛，忽略即可
  }
  return matchLocale(navigator.language || '')
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      // 存不下就算了，本次会话仍然生效
    }
  }

  const t = COPY[locale]

  useEffect(() => {
    document.documentElement.lang = t.htmlLang
    document.title = t.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description)
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', t.title)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', t.description)
  }, [t])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const v = useContext(I18nContext)
  if (!v) throw new Error('useI18n 必须在 I18nProvider 内使用')
  return v
}

export { LOCALES, LOCALE_LABEL, LOCALE_CODE } from './copy'
export type { Locale, Copy } from './copy'
