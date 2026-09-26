import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const IconGitHub = (p: IconProps) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
)

export const IconDownload = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
)

export const IconArrow = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14m0 0-6-6m6 6-6 6" />
  </svg>
)

export const IconGlobe = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
  </svg>
)

export const IconCopy = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H6a2 2 0 0 0-2 2v7.5A2.5 2.5 0 0 0 6.5 15" />
  </svg>
)

export const IconCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
)

/* ——— 功能图标 ——— */

export const IconGlass = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
    <path d="M2.5 9.5h19M6.5 4.5v15" opacity=".55" />
    <path d="M11 13.5c1.6-1.8 3.4-1.8 5 0" opacity=".8" />
  </svg>
)

export const IconHeading = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 5v14M12 5v14M4 12h8" />
    <path d="M16.5 19v-6.2c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6V19" opacity=".7" />
  </svg>
)

export const IconFont = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4.5 19 10 5l5.5 14M6.6 14.4h6.8" />
    <path d="M17.5 19v-4.6c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3V19" opacity=".7" />
  </svg>
)

export const IconCode = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m8.5 8-4 4 4 4m7-8 4 4-4 4" />
  </svg>
)

export const IconQuote = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 6.5h6v5a4 4 0 0 1-4 4H5" />
    <path d="M14 6.5h6v5a4 4 0 0 1-4 4h-1" opacity=".7" />
  </svg>
)

export const IconPdf = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5" opacity=".6" />
    <path d="M8.5 17.5v-4h1.2a1.2 1.2 0 0 1 0 2.4H8.5m5-.4h1.3a1.4 1.4 0 0 0 1.4-1.4v-.6a1.4 1.4 0 0 0-1.4-1.4H13v4h.5" opacity=".8" />
  </svg>
)

export const IconPalette = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-.9.8-1.7 1.7-1.7h1.6A4.9 4.9 0 0 0 21 10.4C21 6.3 17 3 12 3Z" />
    <circle cx="8" cy="10" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="10" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

export const IconSidebar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M9.5 4v16" />
    <path d="M5.6 8.2h2M5.6 11.4h2M5.6 14.6h2" opacity=".6" />
  </svg>
)

export const IconLayers = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" opacity=".55" />
  </svg>
)

export const IconSun = (p: IconProps) => (
  <svg {...base} {...p} width={14} height={14}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </svg>
)

export const IconMoon = (p: IconProps) => (
  <svg {...base} {...p} width={14} height={14}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </svg>
)

export const IconLeaf = (p: IconProps) => (
  <svg {...base} {...p} width={14} height={14}>
    <path d="M4 20c0-8 5-14 16-15 0 11-5.5 15.5-16 15Z" />
    <path d="M9 15c1.5-3 4-5.5 7-7" opacity=".6" />
  </svg>
)
