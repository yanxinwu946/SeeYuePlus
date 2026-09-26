import { OBSIDIAN_REPO_LABEL, OBSIDIAN_REPO_URL } from '../data/themes'
import { useI18n } from '../i18n'
import { Reveal } from './Reveal'
import { IconArrow } from './Icons'

/**
 * Obsidian 版的入口。
 * 它是个还在长的分支，不该和主推的 Typora 主题抢注意力，
 * 所以做成一条贴着页脚的横幅，而不是又一个满屏章节。
 */
export function Obsidian() {
  const { t } = useI18n()

  return (
    <section id="obsidian" className="relative px-5 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="glass hairline flex flex-col gap-7 rounded-2xl p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">{t.obsidian.eyebrow}</p>

              <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <h2 className="display stroke-fix m-0 text-[1.35rem] text-mist-100">
                  {t.obsidian.title}
                </h2>
                <span className="rounded-full border border-ember-500/40 bg-ember-500/10 px-2.5 py-1 text-[0.66rem] tracking-[0.16em] text-ember-300 uppercase">
                  {t.obsidian.wip}
                </span>
              </div>

              <p className="m-0 mb-2.5 text-[0.9rem] leading-[1.9] text-mist-500">
                {t.obsidian.desc}
              </p>
              <p className="m-0 text-[0.82rem] leading-[1.85] text-mist-600">
                {t.obsidian.wipNote}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <a
                href={OBSIDIAN_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost"
              >
                {t.obsidian.cta}
                <IconArrow width={16} height={16} />
              </a>
              <span
                className="text-[0.76rem] text-mist-600"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {OBSIDIAN_REPO_LABEL}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
