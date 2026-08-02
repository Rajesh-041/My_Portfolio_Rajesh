import { useInView } from '../hooks/useInView'
import { useRef, useState } from 'react'
import Carousel3D from '../components/Carousel3D'

const hobbies = [
  { title: 'Reading', blurb: 'Where most ideas start before they become code.' },
  { title: 'Watching Movies', blurb: "The actual origin of this entire portfolio's theme." },
  { title: 'Sudoku', blurb: 'Pattern-recognition, just for fun.' },
  { title: 'Searching Unique Websites', blurb: 'A running collection of strange, brilliant corners of the internet.' },
]

export default function BehindScenes() {
  const [sectionRef, inView] = useInView()

  return (
    <section
      id="behind"
      style={{ background: '#11141799', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ghost glow */}
      <div
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-5%',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242,169,59,0.07) 0%, transparent 70%)',
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
          <p className="chapter-label" style={{ color: '#F2A93B', fontSize: '1.2rem', marginBottom: '1rem' }}>
            "Chapter Six"
          </p>
          <h2
            className="display-font"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', color: '#E9E7E2', lineHeight: 1.05, marginBottom: '1rem' }}
          >
            BEHIND THE SCENES
          </h2>
          <p className="chapter-label" style={{ color: '#C4C9CE88', fontSize: '1rem' }}>
            "(Hobbies &amp; Interests — the life off-camera.)"
          </p>
        </div>

        <div className="perspective-3d">
          <Carousel3D
            items={hobbies}
            accent="#F2A93B"
            autoStartMs={15000}
            autoRotateMs={5000}
            radius={470}
            cardWidth="min(74vw, 480px)"
            height="min(62vh, 560px)"
            minHeight={440}
            dotColor={(_, i) => ['#F2A93B', '#3E8EF7', '#E339B5', '#30C1E2'][i % 4]}
            counterLabel={(c) => `Tape ${String(c + 1).padStart(2, '0')} / ${String(hobbies.length).padStart(2, '0')}`}
            render={(h, i) => <HobbyCard hobby={h} index={i} />}
          />
        </div>
      </div>
    </section>
  )
}

function HobbyCard({
  hobby,
  index,
}: {
  hobby: (typeof hobbies)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8
    setTilt({ x, y })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }) }}
      style={{ perspective: '900px', width: '100%' }}
    >
      <div
        className="card-edge will-3d"
        style={{
          ['--edge-glow' as string]: hover ? 'rgba(242,169,59,0.75)' : 'rgba(242,169,59,0.55)',
          border: `1px solid ${hover ? 'rgba(242,169,59,0.4)' : 'rgba(242,169,59,0.16)'}`,
          background: 'rgba(24,20,14,0.9)',
          backdropFilter: 'blur(6px)',
          borderRadius: '14px',
          padding: '1.8rem 1.9rem 1.5rem',
          minHeight: '200px',
          transformStyle: 'preserve-3d',
          transform: hover ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.04)` : 'none',
          transition: 'transform 0.15s ease, border 0.3s',
          boxShadow: hover ? '0 30px 60px -26px rgba(242,169,59,0.4)' : '0 18px 40px -28px rgba(0,0,0,0.7)',
        }}
      >
        <span
          className="display-font"
          style={{
            fontSize: '1.1rem',
            color: 'rgba(242,169,59,0.5)',
            transform: 'translateZ(30px)',
            display: 'block',
            marginBottom: '1.4rem',
            letterSpacing: '0.08em',
          }}
        >
          TAPE {String(index + 1).padStart(2, '0')}
        </span>
        <h3
          className="display-font"
          style={{ fontSize: 'clamp(1.2rem, 2.6vw, 1.6rem)', color: '#E9E7E2', marginBottom: '0.7rem', transform: 'translateZ(44px)' }}
        >
          {hobby.title}
        </h3>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: '#C4C9CE', transform: 'translateZ(24px)' }}>
          {hobby.blurb}
        </p>
      </div>
    </div>
  )
}