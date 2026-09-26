import { useState } from 'react'
import { REPO_URL } from '../data/themes'
import { useI18n } from '../i18n'
import { Reveal } from './Reveal'
import { IconCheck, IconCopy, IconGitHub } from './Icons'

function CopyLine({ text }: { text: string }) {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // 非安全上下文（比如 file://）退回 execCommand
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setDone(true)
    window.setTimeout(() => setDone(false), 1800)
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-ink-950/60 px-3.5 py-2.5">
      <span className="code-line flex-1">
        <span className="mr-2 text-ember-500 select-none">$</span>
        {text}
      </span>
      <button
        type="button"
        className="copy-btn"
        onClick={copy}
        aria-label={done ? '✓' : 'copy'}
        title={done ? '✓' : 'copy'}
      >
        {done ? <IconCheck width={15} height={15} /> : <IconCopy width={15} height={15} />}
      </button>
    </div>
  )
}

export function Install() {
  const { t } = useI18n()

  return (
    <section id="install" className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center sm:mb-16">
          <p className="eyebrow mb-4">{t.install.eyebrow}</p>
          <h2 className="display stroke-fix mb-4 text-[clamp(1.8rem,4.6vw,2.7rem)] text-mist-100">
            {t.install.title}
          </h2>
          <p className="mx-auto max-w-xl text-[0.95rem] leading-[1.9] text-mist-500">
            {t.install.desc}
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <ol className="m-0 flex list-none flex-col gap-3 p-0">
              {t.install.steps.map((s, i) => (
                <li key={s.title} className="glass hairline flex gap-4 rounded-2xl p-5">
                  <span className="step-index pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="display mb-1.5 text-[1rem] text-mist-100">{s.title}</h3>
                    <p className="m-0 text-[0.87rem] leading-[1.85] text-mist-500">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass hairline flex h-full flex-col rounded-2xl p-5 sm:p-6">
              <p className="eyebrow mb-4">{t.install.files}</p>

              <div className="flex flex-col gap-3">
                <CopyLine text="git clone https://github.com/yanxinwu946/SeeYuePlus.git" />
                <CopyLine text="cd SeeYuePlus" />
                <CopyLine text="make sync" />
              </div>

              <p className="mt-5 mb-3 text-[0.82rem] leading-[1.8] text-mist-600">
                {t.install.or}
              </p>

              <a
                href={`${REPO_URL}/archive/refs/heads/main.zip`}
                className="btn btn--ghost w-full"
                target="_blank"
                rel="noreferrer"
              >
                {t.install.zip}
              </a>

              <div className="mt-auto pt-6">
                <p className="mb-2.5 text-[0.68rem] tracking-[0.2em] text-mist-600 uppercase">
                  {t.install.custom}
                </p>
                <p className="m-0 text-[0.85rem] leading-[1.85] text-mist-500">
                  {t.install.customBody}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="glass mt-6 flex flex-col items-start gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="display mb-1 text-[0.98rem] text-mist-100">{t.install.feedbackTitle}</p>
              <p className="m-0 text-[0.85rem] text-mist-500">{t.install.feedbackBody}</p>
            </div>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary shrink-0"
            >
              <IconGitHub width={16} height={16} />
              {t.install.github}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
