// 只放设计令牌；文案在 src/i18n/copy.ts，按语言分开
// 色值取自 SeeYue/CSS/configs/{pure,dark,salt}-config.css，保证与主题一致

export type ThemeId = 'pure' | 'dark' | 'salt'

export interface ThemeMeta {
  id: ThemeId
  /** 装进 Typora 的就是它 */
  file: string
  /** 英文副题，排版装饰 */
  latin: string
  /** 界面底色，卡片背景用 */
  surface: string
  ink: string
  /** 标题色阶，h1 → h6 */
  heading: [string, string, string, string, string, string]
  accent: string
  /** 卡片自身要不要走浅色底 */
  light: boolean
}

export const THEMES: ThemeMeta[] = [
  {
    id: 'pure',
    file: 'see-yue-pure.css',
    latin: 'Pure',
    surface: '#f0f4f8',
    ink: '#1a1a1a',
    heading: ['#9A3412', '#B45309', '#4D7C0F', '#0F766E', '#BE123C', '#57534E'],
    accent: '#428bca',
    light: true,
  },
  {
    id: 'dark',
    file: 'see-yue-dark.css',
    latin: 'Dark',
    surface: '#1a1d24',
    ink: '#eceff4',
    heading: ['#FB923C', '#60A5FA', '#34D399', '#A78BFA', '#22D3EE', '#94A3B8'],
    accent: '#7c9dca',
    light: false,
  },
  {
    id: 'salt',
    file: 'see-yue-salt.css',
    latin: 'Salt',
    surface: '#e4eddf',
    ink: '#14180f',
    heading: ['#9A3412', '#B45309', '#4D7C0F', '#0F766E', '#BE123C', '#57534E'],
    accent: '#81b29a',
    light: true,
  },
]

export const REPO_URL = 'https://github.com/yanxinwu946/SeeYuePlus'
export const SITE_URL = 'https://yanxinwu946.github.io/SeeYuePlus/'
export const OBSIDIAN_REPO_URL = 'https://github.com/yanxinwu946/SeeYuePlus-Obsidian'
export const OBSIDIAN_REPO_LABEL = 'yanxinwu946/SeeYuePlus-Obsidian'
