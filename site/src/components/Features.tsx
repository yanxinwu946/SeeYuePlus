import type { ReactNode } from 'react'
import { useI18n } from '../i18n'
import { Reveal } from './Reveal'
import {
  IconCode,
  IconFont,
  IconGlass,
  IconHeading,
  IconLayers,
  IconPalette,
  IconPdf,
  IconQuote,
  IconSidebar,
} from './Icons'

const HEADING_COLORS = ['#9A3412', '#B45309', '#4D7C0F', '#0F766E', '#BE123C', '#57534E']

// 每张卡的栅格跨度与实物插图，顺序要和 copy.ts 里的 items 对上
const SPANS = [
  'lg:col-span-4',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
]

const ICONS: ReactNode[] = [
  <IconGlass key="glass" />,
  <IconHeading key="heading" />,
  <IconFont key="font" />,
  <IconCode key="code" />,
  <IconPdf key="pdf" />,
  <IconQuote key="quote" />,
  <IconSidebar key="sidebar" />,
  <IconPalette key="palette" />,
]

const VISUALS: (ReactNode | null)[] = [
  <div key="panes" className="relative mt-6 h-24">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="absolute inset-x-0 h-16 rounded-xl border border-white/10 backdrop-blur-md"
        style={{
          top: `${i * 22}px`,
          left: `${i * 26}px`,
          background: `linear-gradient(150deg, rgba(255,255,255,${0.09 - i * 0.025}), rgba(255,255,255,0.02))`,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14), 0 10px 30px -12px rgba(0,0,0,.7)',
        }}
      />
    ))}
  </div>,
  <div key="scale" className="mt-auto flex gap-1 pt-6">
    {HEADING_COLORS.map((c, i) => (
      <span
        key={c}
        className="h-8 flex-1 rounded-md"
        style={{ background: c, boxShadow: `0 6px 16px -8px ${c}` }}
        title={`H${i + 1}`}
      />
    ))}
  </div>,
  null,
  <div key="code" className="mt-6 rounded-xl border border-white/8 bg-ink-700/70 p-3.5">
    <div className="mb-2.5 flex gap-[6px]">
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
    </div>
    <p
      className="m-0 text-[0.74rem] leading-[1.7] text-moss-400"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span className="text-azure-400">const</span> yue ={' '}
      <span className="text-ember-300">'见月'</span>
    </p>
  </div>,
  null,
  null,
  null,
  null,
]

export function Features() {
  const { t } = useI18n()

  return (
    <section id="features" className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 sm:mb-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-4">{t.features.eyebrow}</p>
              <h2 className="display stroke-fix text-[clamp(1.8rem,4.6vw,2.7rem)] text-mist-100">
                {t.features.title}
              </h2>
            </div>
            <p className="max-w-md text-[0.92rem] leading-[1.9] text-mist-500">
              {t.features.desc}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {t.features.items.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90} className={`sm:col-span-1 ${SPANS[i]}`}>
              <article className="glass glass--hover hairline flex h-full flex-col rounded-2xl p-5 sm:p-6">
                <div className="feature-icon mb-4">{ICONS[i]}</div>
                <h3 className="display mb-2 text-[1.05rem] text-mist-100">{f.title}</h3>
                <p className="flex-1 text-[0.88rem] leading-[1.85] text-mist-500">{f.body}</p>
                {VISUALS[i]}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="marquee overflow-hidden py-2">
            <div className="marquee__track">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                  {t.features.marquee.map((m) => (
                    <span
                      key={m + dup}
                      className="display mx-4 flex items-center gap-3 text-[0.95rem] whitespace-nowrap text-mist-600"
                    >
                      <IconLayers width={13} height={13} className="text-ember-500/60" />
                      {m}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
