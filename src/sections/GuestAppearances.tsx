import { useInView } from '../hooks/useInView'
import { useRef, useState } from 'react'

const appearances = [
  { title: 'Smart India Hackathon', year: '2025' },
  { title: 'Emerging Hackathon', year: '2026' },
  { title: 'GDG Solution Challengers', year: '2026' },
  { title: 'Chanakya Fellowship', year: '2026' },
]

const copy =
  'Every appearance on this list was a different set, a different problem, and a different team — each one sharpening the same instinct: build fast, build real.'

export default function GuestAppearances() {
  const [sectionRef, inView] = useInView()

  return (
    <section
      id="guest"
      style={{ background: '#0A0A0A99', position: 'relative', overflow: 'hidden' }}
    >
      {/* Collab / spotlight glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '520px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(48,193,226,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vw, 7rem) 2rem',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div className={`reveal ${inView ? 'in-view' : ''}`} style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <p className="chapter-label" style={{ color: '#30C1E2', fontSize: '1.2rem', marginBottom: '1rem' }}>
            "Chapter Four"
          </p>
          <h2
            className="display-font"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', color: '#F0F0F0', lineHeight: 1.05, marginBottom: '1rem' }}
          >
            GUEST APPEARANCES
          </h2>
          <p className="chapter-label" style={{ color: '#B8B8B8', fontSize: '1rem' }}>
            "(Participation — the people I've had the good fortune to build alongside.)"
          </p>
        </div>

        {/* Credit-roll rows */}
        <div className="perspective-3d">
        {appearances.map((a, i) => (
          <GuestRow key={i} appearance={a} index={i} inView={inView} />
        ))}
        </div>

        {/* Copy line */}
        <div className={`reveal reveal-delay-3 ${inView ? 'in-view' : ''}`} style={{ marginTop: '3.5rem', maxWidth: '620px' }}>
          <p className="chapter-label" style={{ fontSize: '1rem', lineHeight: 1.8, color: '#C9C9CF', fontStyle: 'italic' }}>
            "{copy}"
          </p>
        </div>
      </div>
    </section>
  )
}

function GuestRow({
  appearance,
  index,
  inView,
}: {
  appearance: (typeof appearances)[0]
  index: number
  inView: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2.6
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2.6
    setTilt({ x, y })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }) }}
      className={`reveal reveal-delay-${(index % 4) + 1} ${inView ? 'in-view' : ''}`}
      style={{ marginBottom: '1.1rem', perspective: '1000px' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          padding: '1.35rem 1.75rem',
          border: `1px solid ${hover ? 'rgba(48,193,226,0.5)' : 'rgba(48,193,226,0.16)'}`,
          background: hover ? 'rgba(48,193,226,0.05)' : 'rgba(255,255,255,0.012)',
          borderRadius: '12px',
          transform: hover ? `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.06)` : 'none',
          transformStyle: 'preserve-3d',
          transition: 'border 0.3s, background 0.3s, transform 0.15s ease',
          boxShadow: hover ? '0 26px 50px -30px rgba(48,193,226,0.45)' : '0 10px 30px -24px rgba(0,0,0,0.6)',
        }}
      >
        <span
          className="display-font"
          style={{ fontSize: '1.35rem', color: 'rgba(48,193,226,0.35)', transform: 'translateZ(24px)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="display-font" style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)', color: '#F0F0F0', transform: 'translateZ(40px)' }}>
          {appearance.title}
        </p>
        <span
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            color: '#30C1E2',
            fontFamily: 'monospace',
            border: '1px solid rgba(48,193,226,0.3)',
            padding: '0.25rem 0.8rem',
            transform: 'translateZ(20px)',
            whiteSpace: 'nowrap',
          }}
        >
          {appearance.year}
        </span>
      </div>
    </div>
  )
}