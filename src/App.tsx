import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import LoadingSequence from './components/loader/LoadingSequence'
import { hasSeenIntro, markIntroSeen } from './hooks/useIntroSession'
import Hero from './sections/Hero'

// Lazy-load heavy sections after the initial paint
const CinematicBackground = lazy(() => import('./components/CinematicBackground'))
const Backstory = lazy(() => import('./sections/Backstory'))
const Projects = lazy(() => import('./sections/Projects'))
const Toolkit = lazy(() => import('./sections/Toolkit'))
const GuestAppearances = lazy(() => import('./sections/GuestAppearances'))
const Recognition = lazy(() => import('./sections/Recognition'))
const BehindScenes = lazy(() => import('./sections/BehindScenes'))
const Contact = lazy(() => import('./sections/Contact'))

const NAV_ITEMS = [
  { label: 'Credits', href: '#hero', color: '#FFFE1E' },
  { label: 'Backstory', href: '#backstory', color: '#F2A93B' },
  { label: 'Scenes', href: '#projects', color: '#E339B5' },
  { label: 'Toolkit', href: '#toolkit', color: '#3E8EF7' },
  { label: 'Guest Cast', href: '#guest', color: '#30C1E2' },
  { label: 'Honors', href: '#recognition', color: '#FFFE1E' },
  { label: 'Off-Camera', href: '#behind', color: '#F2A93B' },
  { label: 'Roll Credits', href: '#contact', color: '#30C1E2' },
]

export default function App() {
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const [ring, setRing] = useState({ x: -100, y: -100 })
  const [cursorLarge, setCursorLarge] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const [letterbox, setLetterbox] = useState(true)
  const [active, setActive] = useState('')
  const [introComplete, setIntroComplete] = useState(() => hasSeenIntro())
  const ringRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  // Custom cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY })
      ringRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Lerp ring
  useEffect(() => {
    let current = { x: -100, y: -100 }
    const animate = () => {
      current.x += (ringRef.current.x - current.x) * 0.12
      current.y += (ringRef.current.y - current.y) * 0.12
      setRing({ x: current.x, y: current.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Nav visibility on scroll
  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > window.innerHeight * 0.6)
    const on = () => setNavVisible(true)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', on, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', on)
    }
  }, [])

  // Close letterbox bars after intro
  useEffect(() => {
    const t = setTimeout(() => setLetterbox(false), introComplete ? 0 : 3200)
    return () => clearTimeout(t)
  }, [introComplete])

  // Lock scroll while the intro sequence is running
  useEffect(() => {
    document.body.style.overflow = introComplete ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [introComplete])

  // Scrollspy — highlight the nav item for the section currently in view
  useEffect(() => {
    const compute = () => {
      let id = ''
      NAV_ITEMS.forEach((item) => {
        const el = document.querySelector(item.href)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const mid = window.innerHeight * 0.4
        if (rect.top <= mid && rect.bottom >= mid) id = item.href
      })
      setActive(id)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    return () => window.removeEventListener('scroll', compute)
  }, [])

  // Single page-wide smooth scroller (Lenis). One instance drives the whole
  // window; the ScrollStack reads this same scroll instead of hijacking it.
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  // Track hover over interactive elements
  useEffect(() => {
    const on = () => setCursorLarge(true)
    const off = () => setCursorLarge(false)
    const targets = document.querySelectorAll('a, button, [data-cursor="large"]')
    const attach = () => {
      targets.forEach((el) => {
        el.addEventListener('mouseenter', on)
        el.addEventListener('mouseleave', off)
      })
    }
    const detach = () => {
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', on)
        el.removeEventListener('mouseleave', off)
      })
    }
    attach()
    return detach
  })

  return (
    <>
      {/* Cinematic cold-open loading sequence (once per session) */}
      {!introComplete && (
        <LoadingSequence
          onComplete={() => {
            markIntroSeen()
            setIntroComplete(true)
          }}
        />
      )}

      {/* Cinematic 3D WebGL backdrop */}
      <Suspense fallback={null}>
        <CinematicBackground />
      </Suspense>

      {/* Film grain */}
      <svg className="grain-svg" aria-hidden="true">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>

      {/* Vignette */}
      <div className="vignette" aria-hidden="true" />

      {/* Letterbox cinematic intro bars */}
      {letterbox && <div className="letterbox letterbox-top" aria-hidden="true" />}
      {letterbox && <div className="letterbox letterbox-bottom" aria-hidden="true" />}

      {/* Custom cursor */}
      <div
        className={`custom-cursor ${cursorLarge ? 'large' : ''}`}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      />
      <div
        className="cursor-ring"
        style={{ left: ring.x, top: ring.y }}
        aria-hidden="true"
      />

      {/* Floating nav */}
      <nav
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '50%',
          transform: navVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-16px)',
          zIndex: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '0.15rem',
          padding: '0.5rem 1.25rem',
          background: 'rgba(10,10,10,0.85)',
          border: '1px solid rgba(255,254,30,0.12)',
          backdropFilter: 'blur(12px)',
          opacity: navVisible ? 1 : 0,
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          pointerEvents: navVisible ? 'all' : 'none',
          overflowX: 'auto',
          maxWidth: '96vw',
        }}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              color: active === item.href ? item.color : '#EAEAEA',
              textDecoration: 'none',
              padding: '0.35rem 0.65rem',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              opacity: active === item.href ? 1 : 0.85,
              fontWeight: active === item.href ? 600 : 400,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = item.color)}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = active === item.href ? item.color : '#EAEAEA'
            }}
            onClick={() => setActive(item.href)}
            data-active={active === item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Sections */}
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Backstory />
          <Projects />
          <Toolkit />
          <GuestAppearances />
          <Recognition />
          <BehindScenes />
          <Contact />
        </Suspense>
      </main>
    </>
  )
}