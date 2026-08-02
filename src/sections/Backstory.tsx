import { useEffect, useRef, useState } from 'react'

const milestones = [
  {
    period: '2011 – 2023',
    place: 'Kanchi Sri Sankara School, Tiruchendur',
    role: 'Higher Secondary',
    detail: '97.5% · School Topper',
  },
  {
    period: '2024 – 2028',
    place: 'Madras Institute of Technology (MIT), Anna University',
    role: 'B.E. Computer Science & Engineering',
    detail: 'CGPA 8.18',
  },
  {
    period: 'Along the way',
    place: 'Hackathons · AI Builds · Full-Stack Apps',
    role: 'Builder',
    detail: 'National-level · Solution challenges',
  },
  {
    period: 'Now',
    place: 'AI · Full Stack · Machine Learning · Modern Web',
    role: 'In Progress',
    detail: 'Building toward real-world impact',
  },
]

export default function Backstory() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  // Scroll-linked timeline draw — the line draws itself as you scroll the section.
  useEffect(() => {
    const compute = () => {
      const el = rootRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      setProgress(Math.max(0, Math.min(1, (vh - rect.top) / total)))
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  return (
    <section
      id="backstory"
      style={{ background: '#1A1512CC', position: 'relative', overflow: 'hidden' }}
    >
      {/* Sprocket holes — film reel left edge */}
      <div className="sprocket sprocket-left" />
      <div className="sprocket sprocket-right" />

      {/* Warm glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,123,63,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Analog film grain — extra on this chapter */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          opacity: 0.15,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={rootRef}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(4rem, 10vw, 8rem) 2rem', position: 'relative' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '4.5rem', position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <p className="chapter-label" style={{ color: '#D97B3F', fontSize: '1.2rem', marginBottom: '1rem' }}>
            "Chapter One"
          </p>
          <h2
            className="display-font"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', color: '#EFE1C6', lineHeight: 1.05 }}
          >
            THE BACKSTORY
          </h2>
        </div>

        {/* Timeline — scroll-drawn line + staggered cards */}
        <div style={{ position: 'relative' }}>
          {/* Progress-drawn rail */}
          <div
            style={{ position: 'absolute', top: 0, bottom: 0, left: '40px', width: '2px', transform: 'translateX(-1px)' }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${Math.max(2, progress * 100)}%`,
                background: 'linear-gradient(to bottom, rgba(217,123,63,0.15), #D97B3F)',
                boxShadow: '0 0 12px rgba(217,123,63,0.5)',
                transformOrigin: 'top',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `calc(${Math.max(0, progress * 98)}% - 5px)`,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#FFE7C2',
                boxShadow: '0 0 0 4px rgba(217,123,63,0.25), 0 0 14px #D97B3F',
                transition: 'top 0.15s linear',
              }}
            />
          </div>

          {milestones.map((m, i) => (
            <MilestoneCard key={i} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MilestoneCard({ milestone, index }: { milestone: (typeof milestones)[0]; index: number }) {
  const isLast = index === milestones.length - 1
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Trigger this card's reveal the moment it scrolls into view
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2.4
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2.4
    setTilt({ x, y })
  }

  return (
    <div style={{ position: 'relative', paddingLeft: '72px', paddingBottom: isLast ? 0 : '4.5rem' }}>
      {/* Node on the rail */}
      <div
        style={{
          position: 'absolute',
          left: '36px',
          top: '0.45rem',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: inView ? (isLast ? '#D97B3F' : '#EFE1C6') : 'transparent',
          border: '2px solid #D97B3F',
          boxShadow: inView ? (isLast ? '0 0 16px #D97B3F, 0 0 32px #D97B3F44' : 'none') : 'none',
          transition: 'background 0.6s ease, box-shadow 0.6s ease',
          zIndex: 3,
        }}
      />

      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateX(0)' : 'translateX(48px)',
          transformStyle: 'preserve-3d',
          transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${inView ? index * 0.12 : 0}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${inView ? index * 0.12 : 0}s`,
        }}
      >
        <div
          style={{
            transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: 'transform 0.2s ease',
            padding: '0.9rem 1.1rem',
            borderLeft: `3px solid ${inView ? '#D97B3F' : 'rgba(217,123,63,0.2)'}`,
            borderBottom: '1px solid rgba(217,123,63,0.12)',
            background: 'linear-gradient(90deg, rgba(217,123,63,0.06), transparent 70%)',
          }}
        >
          <p className="chapter-label" style={{ color: '#D97B3F', fontSize: '0.9rem', marginBottom: '0.4rem', transform: 'translateZ(18px)' }}>
            {milestone.period}
          </p>
          <h3
            className="display-font"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: '#EFE1C6', lineHeight: 1.2, marginBottom: '0.3rem', transform: 'translateZ(28px)' }}
          >
            {milestone.role}
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#C9BFAE', marginBottom: '0.2rem', transform: 'translateZ(14px)' }}>
            {milestone.place}
          </p>
          <p style={{ fontSize: '0.8rem', color: '#D97B3F', letterSpacing: '0.08em', marginBottom: '0.4rem', fontFamily: 'monospace', transform: 'translateZ(10px)' }}>
            {milestone.detail}
          </p>
        </div>
      </div>
    </div>
  )
}