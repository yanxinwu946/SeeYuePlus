import type { ThemeId } from '../data/themes'
import { useI18n } from '../i18n'

const DEPTHS = [0, 0, 0, 0, 0, 1]

// 用真实主题令牌渲染的 Typora 窗口，不是截图 —— 切换配色时是真的在换 CSS 变量
export function TyporaMock({ theme }: { theme: ThemeId }) {
  const { t } = useI18n()
  const m = t.mock

  return (
    <div className="mock" data-theme={theme}>
      <div className="mock__window overflow-hidden rounded-2xl">
        <div className="mock__titlebar flex items-center gap-3 px-4 py-2.5">
          <div className="flex items-center gap-[7px]">
            <span className="mock__dot" style={{ background: '#ff5f57' }} />
            <span className="mock__dot" style={{ background: '#febc2e' }} />
            <span className="mock__dot" style={{ background: '#28c840' }} />
          </div>
          <p
            className="mx-auto truncate pr-10 text-[0.78rem] tracking-wide"
            style={{ color: 'var(--mock-muted)' }}
          >
            {m.file}
          </p>
        </div>

        <div className="flex h-[clamp(360px,54vh,540px)]">
          <aside className="mock__sidebar hidden w-[186px] shrink-0 flex-col p-3 md:flex">
            <div
              className="mb-3 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[0.72rem]"
              style={{
                background: 'color-mix(in srgb, var(--mock-text) 5%, transparent)',
                color: 'var(--mock-muted)',
                border: '1px solid var(--mock-border)',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              {m.search}
            </div>

            <div className="flex flex-col gap-0.5">
              {m.sidebar.map((name, i) => (
                <div
                  key={name}
                  className={`mock__file flex items-center gap-1.5 px-2 py-[5px] text-[0.76rem] ${
                    i === 0 ? 'mock__file--active' : ''
                  }`}
                  style={{ paddingLeft: `${8 + DEPTHS[i] * 14}px` }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="shrink-0 opacity-70"
                  >
                    {i === 4 ? (
                      <path d="M3 7a2 2 0 0 1 2-2h3.5l2 2.5H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
                    ) : (
                      <>
                        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
                        <path d="M14 3v5h5" />
                      </>
                    )}
                  </svg>
                  <span className="truncate">{name}</span>
                </div>
              ))}
            </div>

            <div
              className="mt-4 mb-2 px-2 text-[0.62rem] tracking-[0.2em] uppercase"
              style={{ color: 'var(--mock-muted)', opacity: 0.6 }}
            >
              {m.outlineLabel}
            </div>
            <div className="flex flex-col gap-0.5 overflow-hidden">
              {m.outline.map((label, i) => (
                <div
                  key={label}
                  className="truncate px-2 py-[3px] text-[0.72rem]"
                  style={{
                    paddingLeft: `${8 + (i === 0 ? 0 : i === 4 ? 1 : 2) * 12}px`,
                    color: i === 0 ? 'var(--mock-text)' : 'var(--mock-muted)',
                    opacity: i === 0 ? 1 : 0.85,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </aside>

          <div className="flex-1 overflow-hidden p-3 sm:p-4">
            <article className="mock__write h-full overflow-hidden px-6 py-6 sm:px-10 sm:py-8">
              <div className="mock__fade mx-auto max-w-[62ch]">
                <h1
                  className="mock__h mock__h--1 mb-6 text-[1.6rem]"
                  style={{ color: 'var(--mock-h1)' }}
                >
                  {m.title}
                </h1>

                <p className="mb-4 text-[0.9rem] leading-[1.85]">{m.lead}</p>

                <h2
                  className="mock__h mock__h--2 mb-3 text-[1.28rem]"
                  style={{ color: 'var(--mock-h2)' }}
                >
                  {m.h2}
                </h2>

                <p className="mb-4 text-[0.9rem] leading-[1.85]">
                  {m.body.map((seg, i) => {
                    if (seg.style === 'strong') return <strong key={i}>{seg.text}</strong>
                    if (seg.style === 'code')
                      return (
                        <span key={i} className="mock__inline-code">
                          {seg.text}
                        </span>
                      )
                    if (seg.style === 'link')
                      return (
                        <a key={i} className="mock__link" href="#features">
                          {seg.text}
                        </a>
                      )
                    return <span key={i}>{seg.text}</span>
                  })}
                </p>

                <blockquote className="mock__quote mb-5 text-[0.86rem] leading-[1.8]">
                  <p className="m-0">{m.quote}</p>
                </blockquote>

                <h3
                  className="mock__h mock__h--3 mb-3 text-[1.1rem]"
                  style={{ color: 'var(--mock-h3)' }}
                >
                  {m.h3a}
                </h3>

                <div className="mock__code mb-5 text-[0.78rem]">
                  <span className="mock__code-lang">javascript</span>
                  <pre className="m-0 overflow-x-auto">
                    <code>{`const theme = await SeeYue.load('see-yue-dark.css')
theme.apply({ glass: true, wenkai: true })

theme.headings.map(h => h.color)`}</code>
                  </pre>
                </div>

                <h3
                  className="mock__h mock__h--3 mb-3 text-[1.1rem]"
                  style={{ color: 'var(--mock-h3)' }}
                >
                  {m.h3b}
                </h3>

                <table className="mock__table mb-1">
                  <thead>
                    <tr>
                      {m.cols.map((c) => (
                        <th key={c}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {m.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell) => (
                          <td key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
