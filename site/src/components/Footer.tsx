import { OBSIDIAN_REPO_LABEL, OBSIDIAN_REPO_URL, REPO_URL, SITE_URL } from '../data/themes'
import { useI18n } from '../i18n'
import { IconGitHub } from './Icons'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="relative mt-8 border-t border-white/8 px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div
          className="display text-[2.6rem] leading-none text-transparent select-none"
          style={{
            background: 'linear-gradient(150deg, var(--color-ember-400), var(--color-azure-400))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            opacity: 0.85,
          }}
          aria-hidden
        >
          月
        </div>

        <p className="display m-0 text-[1.05rem] text-mist-300">见月 · SeeYue Plus</p>

        <p className="m-0 max-w-lg text-[0.85rem] leading-[1.85] text-mist-600">{t.footer.desc}</p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.82rem]">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-mist-500 no-underline transition-colors duration-300 hover:text-ember-300"
          >
            <IconGitHub width={15} height={15} />
            yanxinwu946/SeeYuePlus
          </a>
          <a
            href={OBSIDIAN_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-mist-500 no-underline transition-colors duration-300 hover:text-ember-300"
          >
            <IconGitHub width={15} height={15} />
            {OBSIDIAN_REPO_LABEL}
          </a>
          <a
            href={SITE_URL}
            className="text-mist-600 no-underline transition-colors duration-300 hover:text-ember-300"
          >
            {SITE_URL.replace('https://', '')}
          </a>
        </div>

        <p className="m-0 text-[0.74rem] tracking-[0.14em] text-mist-600/70">{t.footer.license}</p>
      </div>
    </footer>
  )
}
