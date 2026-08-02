import { useInView } from '../hooks/useInView'
import { useRef, useState } from 'react'

const honors = [
  'School Topper in Higher Secondary Education — 97.5%',
  'Developed multiple AI-assisted and full-stack software applications',
  'Recognized for consistent, real-world-focused engineering across hackathons and independent builds',
]

export default function Recognition() {
  const [sectionRef, inView] = useInView()

  return (
    <section
      id="recognition"
      style={{ background: '#0A0A0AB3', position: 'relative', overflow: 'hidden' }}
    >
      {/* Golden seal glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,254,30,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vw, 7rem) 2rem',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div className={`reveal ${inView ? 'in-view' : ''}`} style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <p className="chapter-label" style={{ color: '#FFFE1E', fontSize: '1.2rem', marginBottom: '1rem' }}>
            "Chapter Five"
          </p>
          <h2
            className="display-font"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', color: '#F0F0F0', lineHeight: 1.05 }}
          >
            RECOGNITION
          </h2>
        </div>

        <div className="perspective-3d">
          {honors.map((h, i) => (
            <HonorRow key={i} text={h} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HonorRow({
  text,
  index,
  inView,
}: {
  text: string
  index: number
  inView: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 3
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -3
    setTilt({ x, y })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }) }}
      className={`reveal reveal-delay-${index + 1} ${inView ? 'in-view' : ''}`}
      style={{ marginBottom: '2rem', perspective: '1000px' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1.5rem',
          padding: '1.5rem 1.9rem',
          border: `1px solid ${hover ? 'rgba(255,254,30,0.5)' : 'rgba(255,254,30,0.14)'}`,
          background: hover ? 'rgba(255,254,30,0.04)' : 'rgba(255,255,255,0.012)',
          borderRadius: '12px',
          transform: hover ? `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.06)` : 'none',
          transformStyle: 'preserve-3d',
          transition: 'border 0.3s, background 0.3s, transform 0.15s ease',
          boxShadow: hover ? '0 28px 50px -30px rgba(255,254,30,0.4)' : '0 10px 30px -24px rgba(0,0,0,0.6)',
        }}
      >
        {/* Sealed star */}
        <svg width="30" height="30" viewBox="0 0 24 24" fill={hover ? '#FFFE1E' : 'rgba(255,254,30,0.5)'} style={{ flexShrink: 0, marginTop: '0.1rem', transform: 'translateZ(26px)', transition: 'fill 0.3s' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: '#CFCFCF', lineHeight: 1.6, transform: 'translateZ(36px)' }}>
          {text}
        </p>
      </div>
    </div>
  )
}