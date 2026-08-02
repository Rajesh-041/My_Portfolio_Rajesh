import { useEffect, useRef, useState } from 'react'
import VisitorCounter from '../components/VisitorCounter'
import TextParticleDistortion from '../components/TextParticleDistortion'

const NAME = 'MUTHU RAJESH T'

export default function Hero() {
  const [flickerDone, setFlickerDone] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const frame = useRef(0)

  useEffect(() => {
    // Entrance runs immediately on mount, hidden behind the loader until it fades
    const t1 = setTimeout(() => setFlickerDone(true), 300)
    const t2 = setTimeout(() => setShowContent(true), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Cinematic 3D mouse-parallax across the hero scene
  useEffect(() => {
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = () => {
      current.x += (target.x - current.x) * 0.05
      current.y += (target.y - current.y) * 0.05
      setParallax({ x: current.x, y: current.y })
      frame.current = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    frame.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <section
      id="hero"
      className={flickerDone ? '' : 'flicker-in'}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Particles parallax={parallax} />

      {/* Light leak on entry */}
      <div className="light-leak" />

      {/* Center content — layered on a 3D parallax stage */}
      <div className="perspective-3d preserve-3d" style={{ position: 'relative', zIndex: 10, width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            position: 'relative',
            textAlign: 'center',
            padding: '0 1.5rem',
            transform: `translate3d(${parallax.x * -8}px, ${parallax.y * -5}px, 0) rotateX(${parallax.y * 2}deg)`,
            transition: 'transform 0.15s linear',
          }}
        >
          {/* "Now Showing" script label */}
          <p
            className="chapter-label"
            style={{
              color: '#FFFE1E',
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              letterSpacing: '0.08em',
              marginBottom: '1.1rem',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}
          >
            "Now showing"
          </p>

          {/* Name — particle distortion */}
          <TextParticleDistortion
            text={NAME}
            fontSize={120}
            fontFamily="Anton, sans-serif"
            color="#FFFE1E"
            scatterRadius={130}
            scatterForce={8}
            returnSpeed={0.04}
            samplingGap={3}
          />

          {/* Divider line */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #FFFE1E55, transparent)',
              marginBottom: '1.5rem',
              opacity: showContent ? 1 : 0,
              transition: 'opacity 1s ease 0.8s',
            }}
          />

          {/* Subtitle */}
          <p
            className="display-font"
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
              color: '#30C1E2',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1.1rem',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s',
            }}
          >
            Building intelligent systems through thoughtful engineering.
          </p>

          {/* Role line */}
          <p
            style={{
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
              color: '#B8B8B8',
              letterSpacing: '0.08em',
              marginBottom: '1.4rem',
              opacity: showContent ? 1 : 0,
              transition: 'opacity 0.8s ease 1.1s',
            }}
          >
            AI Engineer&nbsp;&nbsp;·&nbsp;&nbsp;Full Stack Developer&nbsp;&nbsp;·&nbsp;&nbsp;still learning, still building
          </p>

          {/* Visitor counter — small, neat, neon glow */}
          <VisitorCounter show={showContent} />

          {/* Resume button — same chip style as VisitorCounter */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="visitor-chip"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.1rem',
              marginTop: '0.9rem',
              borderRadius: '999px',
              border: '1px solid rgba(255,254,30,0.35)',
              background: 'rgba(255,254,30,0.06)',
              backdropFilter: 'blur(6px)',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.8s ease 1.5s, transform 0.8s ease 1.5s, background 0.25s, border-color 0.25s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,254,30,0.16)'
              e.currentTarget.style.borderColor = 'rgba(255,254,30,0.55)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,254,30,0.06)'
              e.currentTarget.style.borderColor = 'rgba(255,254,30,0.35)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFE1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                fontFamily: 'monospace',
                color: '#FFFE1E',
                textTransform: 'uppercase',
                textShadow: '0 0 12px rgba(255,254,30,0.6)',
              }}
            >
              View Resume
            </span>
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="scroll-bounce"
        style={{
          position: 'relative',
          zIndex: 10,
          opacity: showContent ? 0.5 : 0,
          transition: 'opacity 0.8s ease 1.5s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          paddingBottom: '3rem',
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#FFFE1E' }}>
          Scroll to begin
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path d="M8 0v20M1 13l7 8 7-8" stroke="#FFFE1E" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Bottom gradient fade to next section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #0D0D12EE)',
          zIndex: 5,
        }}
      />
    </section>
  )
}

function Particles({ parallax }: { parallax: { x: number; y: number } }) {
  return (
    <div className="perspective-3d" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {Array.from({ length: 60 }).map((_, i) => {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const size = Math.random() * 2 + 0.5
        const duration = Math.random() * 8 + 4
        const delay = Math.random() * 8
        const depth = Math.random() * 2 + 0.5
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: i % 5 === 0 ? '#FFFE1E' : i % 7 === 0 ? '#30C1E2' : '#ffffff',
              opacity: Math.random() * 0.4 + 0.05,
              animation: `scrollBounce ${duration}s ease-in-out ${delay}s infinite`,
              willChange: 'transform',
              transform: `translate3d(${(parallax.x * 26) / depth}px, ${(parallax.y * 26) / depth}px, ${depth * 60}px)`,
            }}
          />
        )
      })}
    </div>
  )
}