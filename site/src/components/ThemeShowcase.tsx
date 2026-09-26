import { THEMES, type ThemeMeta } from '../data/themes'
import { useI18n } from '../i18n'
import { Reveal } from './Reveal'

const LEVELS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']

// 用主题自己的底色与标题色阶渲染的小样
function MiniPreview({ m, title }: { m: ThemeMeta; title: string }) {
  const glass = m.light ? 'rgba(255,255,255,.5)' : 'rgba(46,52,64,.6)'
  const border = m.light ? 'rgba(94,129,172,.2)' : 'rgba(255,255,255,.09)'

  return (
    <div
      className="relative overflow-hidden rounded-xl px-4 py-4"
      style={{ background: m.surface, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-8 size-32 rounded-full opacity-40 blur-2xl"
        style={{ background: m.accent }}
      />

      <div
        className="relative rounded-lg px-3.5 py-3 backdrop-blur-md"
        style={{
          background: glass,
          border: `1px solid ${border}`,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.22)',
        }}
      >
        <p
          className="display mb-2.5 truncate text-[0.95rem] font-bold"
          style={{ color: m.heading[0], WebkitTextStroke: '0.018em currentColor' }}
        >
          {title}
        </p>

        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-2 flex items-center gap-2">
            <span className="h-3 w-[3px] shrink-0 rounded-sm" style={{ background: m.heading[i] }} />
            <span
              className="h-[5px] rounded-full"
              style={{ background: m.ink, opacity: 0.34 - i * 0.06, width: `${68 - i * 14}%` }}
            />
          </div>
        ))}

        <div className="mt-3 flex flex-col gap-1.5">
          <span className="h-[4px] rounded-full" style={{ background: m.ink, opacity: 0.16 }} />
          <span
            className="h-[4px] rounded-full"
            style={{ background: m.ink, opacity: 0.16, width: '82%' }}
          />
        </div>

        <div
          className="mt-3 rounded-md px-2 py-1.5"
          style={{
            background: m.light ? 'rgba(0,0,0,.045)' : 'rgba(0,0,0,.28)',
            border: `1px solid ${border}`,
          }}
        >
          <span
            className="block h-[4px] w-1/2 rounded-full"
            style={{ background: m.accent, opacity: 0.7 }}
          />
        </div>
      </div>
    </div>
  )
}

export function ThemeShowcase() {
  const { t } = useI18n()

  return (
    <section id="showcase" className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center sm:mb-16">
          <p className="eyebrow mb-4">{t.palettes.eyebrow}</p>
          <h2 className="display stroke-fix mb-4 text-[clamp(1.8rem,4.6vw,2.7rem)] text-mist-100">
            {t.palettes.title}
          </h2>
          <p className="mx-auto max-w-xl text-[0.95rem] leading-[1.9] text-mist-500">
            {t.palettes.desc}
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {THEMES.map((m, i) => {
            const c = t.themes[m.id]
            return (
              <Reveal key={m.id} delay={i * 110}>
                <article className="glass glass--hover hairline flex h-full flex-col rounded-2xl p-5">
                  <MiniPreview m={m} title={c.short} />

                  <div className="mt-5 flex items-center gap-2">
                    <h3 className="display text-[1.08rem] text-mist-100">{c.name}</h3>
                    <span
                      className="rounded-full px-2 py-[2px] text-[0.66rem] tracking-[0.16em] uppercase"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: m.accent,
                        background: `color-mix(in srgb, ${m.accent} 14%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${m.accent} 30%, transparent)`,
                      }}
                    >
                      {m.latin}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[0.84rem] text-mist-600">{c.tagline}</p>

                  <p className="mt-3 flex-1 text-[0.88rem] leading-[1.85] text-mist-500">
                    {c.description}
                  </p>

                  <div className="mt-5 border-t border-white/8 pt-4">
                    <p className="mb-2.5 text-[0.68rem] tracking-[0.2em] text-mist-600 uppercase">
                      {t.palettes.scale}
                    </p>
                    <div className="flex gap-1.5">
                      {m.heading.map((color, idx) => (
                        <div key={color + idx} className="flex flex-1 flex-col items-center gap-1.5">
                          <span
                            className="h-6 w-full rounded-md"
                            style={{ background: color, boxShadow: `0 4px 12px -4px ${color}` }}
                            title={`${LEVELS[idx]} ${color}`}
                          />
                          <span
                            className="text-[0.6rem] text-mist-600"
                            style={{ fontFamily: 'var(--font-mono)' }}
                          >
                            {LEVELS[idx]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p
                    className="mt-4 text-[0.72rem] text-mist-600"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {m.file}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
