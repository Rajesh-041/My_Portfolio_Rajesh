import { useInView } from '../hooks/useInView'
import { useRef, useState, useEffect, useCallback } from 'react'

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'C', 'C++'],
    icon: '⚙',
    accent: '#3E8EF7',
  },
  {
    category: 'Frontend',
    skills: ['HTML5', 'CSS3', 'React.js', 'Vite'],
    icon: '✦',
    accent: '#E339B5',
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'Firebase'],
    icon: '⬡',
    accent: '#30C1E2',
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'MongoDB', 'Firebase Firestore'],
    icon: '◈',
    accent: '#F2A93B',
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'VS Code', 'Jira', 'Canva', 'Vercel'],
    icon: '◉',
    accent: '#FFFE1E',
  },
]

const marqueeItems = [
  'React', 'Node.js', 'Python', 'Firebase', 'MongoDB', 'TypeScript',
  'Tailwind', 'Express', 'MySQL', 'Git', 'Vercel', 'Java', 'face-api.js',
  'Axios', 'Vite', 'Firestore', 'Razorpay', 'Cloudinary', 'C', 'C++',
  'JavaScript', 'Jira', 'Canva', 'Firebase Firestore',
]

export default function Toolkit() {
  const [headerRef, headerInView] = useInView()
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const count = skillGroups.length
  const radius = 380

  const goTo = (index: number) => {
    setActiveIndex((index + count) % count)
  }

  const handleWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault()
      if (e.deltaX > 0) goTo(activeIndex + 1)
      else if (e.deltaX < 0) goTo(activeIndex - 1)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = e.changedTouches[0].clientX - touchStart
    if (Math.abs(diff) > 50) {
      goTo(activeIndex + (diff > 0 ? -1 : 1))
    }
    setTouchStart(null)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goTo(activeIndex - 1)
    if (e.key === 'ArrowRight') goTo(activeIndex + 1)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  return (
    <section
      id="toolkit"
      style={{ background: '#111417B3', position: 'relative', overflow: 'hidden' }}
    >
      {/* Blue glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(62,142,247,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Marquee ticker */}
      <div
        style={{
          borderTop: '1px solid rgba(62,142,247,0.2)',
          borderBottom: '1px solid rgba(62,142,247,0.2)',
          overflow: 'hidden',
          padding: '0.75rem 0',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: i % 7 === 0 ? '#F2A93B' : '#3E8EF7',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                }}
              >
                {item}
                <span style={{ marginLeft: '3rem', color: 'rgba(62,142,247,0.3)' }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`reveal ${headerInView ? 'in-view' : ''}`}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vw, 7rem) 2rem 2rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <p className="chapter-label" style={{ color: '#3E8EF7', fontSize: '1.2rem', marginBottom: '1rem' }}>
          "Chapter Three"
        </p>
        <h2
          className="display-font"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', color: '#C4C9CE', lineHeight: 1.05 }}
        >
          THE TOOLKIT
        </h2>
      </div>

      {/* 3D Carousel */}
      <div
        ref={carouselRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1400px',
          padding: '2rem 0',
        }}
      >
        {/* Carousel arrows */}
        <button
          onClick={() => goTo(activeIndex - 1)}
          style={{
            position: 'absolute',
            left: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: '1px solid rgba(62,142,247,0.3)',
            background: 'rgba(16,20,28,0.9)',
            backdropFilter: 'blur(8px)',
            color: '#3E8EF7',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
            opacity: 0.8,
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          aria-label="Previous skill"
        >
          ‹
        </button>

        <button
          onClick={() => goTo(activeIndex + 1)}
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: '1px solid rgba(62,142,247,0.3)',
            background: 'rgba(16,20,28,0.9)',
            backdropFilter: 'blur(8px)',
            color: '#3E8EF7',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
            opacity: 0.8,
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          aria-label="Next skill"
        >
          ›
        </button>

        {/* 3D Carousel cards */}
        <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
          {skillGroups.map((group, i) => {
            const offset = ((i - activeIndex + count) % count)
            const wrapped = offset > Math.floor(count / 2) ? offset - count : offset
            const absOffset = Math.abs(wrapped)
            const isActive = wrapped === 0

            // 3D positioning
            const angle = (wrapped / count) * Math.PI * 2
            const translateX = Math.sin(angle) * radius
            const translateZ = Math.cos(angle) * radius - radius
            const rotateY = -wrapped * (360 / count)
            const scale = isActive ? 1 : 0.85 - absOffset * 0.03
            const opacity = isActive ? 1 : Math.max(0.3, 1 - absOffset * 0.25)
            const blur = isActive ? 0 : absOffset * 1.5
            const zIndex = isActive ? 50 : 20 - absOffset

            return (
              <div
                key={group.category}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `
                    translate(-50%, -50%)
                    translateX(${translateX}px)
                    translateZ(${translateZ}px)
                    rotateY(${rotateY}deg)
                    scale(${scale})
                  `,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, filter 0.5s ease',
                  opacity,
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  zIndex,
                  pointerEvents: absOffset <= 1 ? 'auto' : 'none',
                }}
              >
                <CarouselCard
                  group={group}
                  index={i}
                  isActive={isActive}
                  onClick={() => goTo(i)}
                />
              </div>
            )
          })}
        </div>

        {/* Dots indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.7rem',
            zIndex: 20,
          }}
        >
          {skillGroups.map((group, i) => (
            <button
              key={group.category}
              onClick={() => goTo(i)}
              style={{
                width: i === activeIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '999px',
                border: 'none',
                background: i === activeIndex ? group.accent : `${group.accent}33`,
                boxShadow: i === activeIndex ? `0 0 16px ${group.accent}88` : 'none',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              aria-label={`Go to ${group.category}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div
          style={{
            position: 'absolute',
            bottom: '5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: '#7A8290',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: '#3E8EF7' }}>{String(activeIndex + 1).padStart(2, '0')}</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>{String(skillGroups.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Core subjects footer */}
      <div
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(62,142,247,0.15)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#3E8EF7AA', marginBottom: '1rem', textTransform: 'uppercase', fontFamily: 'monospace' }}>
          Core Subjects
        </p>
        <p style={{ fontSize: '0.95rem', color: '#C4C9CE' }}>
          Data Structures & Algorithms · Machine Learning · Object-Oriented Programming
        </p>
      </div>
    </section>
  )
}

function CarouselCard({
  group,
  index,
  isActive,
  onClick,
}: {
  group: (typeof skillGroups)[0]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = innerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6
    setTilt({ x, y })
  }

  return (
    <div
      ref={innerRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }) }}
      onClick={onClick}
      style={{
        cursor: isActive ? 'default' : 'pointer',
        width: 'min(75vw, 540px)',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          border: `1px solid ${hover || isActive ? group.accent + '55' : group.accent + '22'}`,
          background: 'rgba(16,20,28,0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: isActive || hover
            ? `0 40px 80px -24px ${group.accent}44, 0 0 0 1px ${group.accent}22, inset 0 1px 0 ${group.accent}15`
            : `0 20px 50px -30px rgba(0,0,0,0.7)`,
          padding: 'clamp(2rem, 4vw, 3rem)',
          transform: hover
            ? `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)`
            : 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)',
          transition: 'transform 0.2s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Holographic sheen */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              ${135 + tilt.y * 10}deg,
              transparent 0%,
              ${group.accent}08 ${20 + tilt.x * 4}%,
              #F2A93B10 ${40 + tilt.x * 4}%,
              ${group.accent}08 ${60 + tilt.x * 4}%,
              transparent 100%
            )`,
            pointerEvents: 'none',
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Iridescent edge */}
        <div
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: '20px',
            background: `conic-gradient(
              from ${135 + tilt.y * 10}deg,
              ${group.accent}44,
              #F2A93B33,
              #E339B533,
              #30C1E233,
              ${group.accent}44
            )`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            padding: '1px',
            pointerEvents: 'none',
            opacity: hover ? 0.7 : 0.3,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Active ring */}
        {isActive && (
          <div
            style={{
              position: 'absolute',
              inset: -2,
              borderRadius: '22px',
              border: `2px solid ${group.accent}`,
              opacity: 0.5,
              animation: 'pulse-ring 2s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span
              style={{
                fontSize: '1.8rem',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                background: `${group.accent}15`,
                border: `1px solid ${group.accent}33`,
              }}
            >
              {group.icon}
            </span>
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: group.accent,
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  opacity: 0.7,
                }}
              >
                Category {String(index + 1).padStart(2, '0')} / {String(skillGroups.length).padStart(2, '0')}
              </p>
              <h3
                className="display-font"
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                  color: '#E8ECF0',
                  lineHeight: 1.1,
                  marginTop: '0.25rem',
                }}
              >
                {group.category}
              </h3>
            </div>
          </div>

          {/* Skill tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1rem' }}>
            {group.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  padding: '0.55rem 1.2rem',
                  background: `${group.accent}0D`,
                  border: `1px solid ${group.accent}30`,
                  fontSize: '0.85rem',
                  color: '#DFE6EE',
                  fontFamily: 'monospace',
                  letterSpacing: '0.04em',
                  borderRadius: '8px',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}