import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ThemeShowcase } from './components/ThemeShowcase'
import { Features } from './components/Features'
import { Install } from './components/Install'
import { Obsidian } from './components/Obsidian'
import { Footer } from './components/Footer'

// 预览组件带着 marked 和 highlight.js，占了大半个包，滚到跟前再拉
const Playground = lazy(() =>
  import('./components/Playground').then((m) => ({ default: m.Playground })),
)

// id 挂外层：组件没挂载时锚点也得在，否则导航跳不动
function Deferred({ id, children }: { id: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true)
          io.disconnect()
        }
      },
      { rootMargin: '700px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div id={id} ref={ref} style={{ minHeight: ready ? undefined : '40rem' }}>
      {ready ? children : null}
    </div>
  )
}

export default function App() {
  return (
    <>
      <div className="aurora" aria-hidden>
        <span className="aurora__blob aurora__blob--ember" />
        <span className="aurora__blob aurora__blob--azure" />
        <span className="aurora__blob aurora__blob--clay" />
      </div>
      <div className="grid-veil" aria-hidden />
      <div className="grain" aria-hidden />

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <ThemeShowcase />
          <Deferred id="preview">
            <Suspense fallback={<div style={{ minHeight: '40rem' }} />}>
              <Playground />
            </Suspense>
          </Deferred>
          <Features />
          <Install />
          <Obsidian />
        </main>
        <Footer />
      </div>
    </>
  )
}
