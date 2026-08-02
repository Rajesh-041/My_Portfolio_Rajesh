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
  const stackRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const onScroll = useCallback(() => {
    const el = stackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const totalScroll = el.scrollHeight - window.innerHeight
    if (totalScroll <= 0) return
    const scrolled = -rect.top
    const progress = Math.max(0, Math.min(1, scrolled / totalScroll))
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const count = skillGroups.length
  const progressPerCard = 1 / count

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

      {/* 3D Scroll Stack */}
      <div
        ref={stackRef}
        style={{
          position: 'relative',
          height: `${count * 100}vh`,
        }}
      >
        {/* Sticky viewport */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px',
            overflow: 'hidden',
          }}
        >
          {skillGroups.map((group, i) => {
            const cardStart = i * progressPerCard
            const cardEnd = (i + 1) * progressPerCard
            const isCurrentCard = scrollProgress >= cardStart - 0.02 && scrollProgress < cardEnd + 0.02

            // How far this card has been "peeled off" (0 = on top, 1 = fully gone)
            const localProgress = Math.max(0, Math.min(1, (scrollProgress - cardStart) / progressPerCard))

            // Cards behind the current one: stacked with depth
            // Cards that have been peeled: fly off with 3D rotation
            const isPeeled = scrollProgress > cardEnd
            const isUpcoming = scrollProgress < cardStart - 0.02

            let translateZ = 0
            let translateX = 0
            let translateY = 0
            let rotateX = 0
            let rotateY = 0
            let scale = 1
            let opacity = 1
            let blur = 0

            if (isPeeled) {
              // Card has been scrolled past — fly off to the right/up with rotation
              const peelProgress = Math.min(1, (scrollProgress - cardEnd) / (progressPerCard * 0.5))
              translateZ = -50
              translateX = peelProgress * 120
              translateY = -peelProgress * 60
              rotateY = peelProgress * 25
              rotateX = peelProgress * -8
              scale = 1 - peelProgress * 0.15
              opacity = 1 - peelProgress * 0.85
              blur = peelProgress * 4
            } else if (isUpcoming) {
              // Card is waiting in the stack behind
              const stackIndex = i - Math.floor(scrollProgress / progressPerCard)
              translateZ = -stackIndex * 50
              translateY = stackIndex * 6
              scale = 1 - stackIndex * 0.04
              opacity = Math.max(0.2, 1 - stackIndex * 0.25)
            } else {
              // Current active card — front and center
              translateZ = 40
              scale = 1
              opacity = 1
            }

            return (
              <div
                key={group.category}
                style={{
                  position: 'absolute',
                  width: 'min(85vw, 600px)',
                  transformStyle: 'preserve-3d',
                  transform: `
                    translateX(${translateX}px)
                    translateY(${translateY}px)
                    translateZ(${translateZ}px)
                    scale(${scale})
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                  `,
                  transition: 'none',
                  opacity,
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  zIndex: isPeeled ? 5 - i : 20 + (count - i),
                  pointerEvents: isCurrentCard && !isPeeled ? 'auto' : 'none',
                }}
              >
                <ScrollCard group={group} index={i} isActive={isCurrentCard && !isPeeled} />
              </div>
            )
          })}

          {/* Scroll hint on first card */}
          {scrollProgress < 0.02 && (
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(2rem, 5vh, 4rem)',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                animation: 'float-slow 3s ease-in-out infinite',
                zIndex: 30,
              }}
            >
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#7A8290', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                Scroll to explore
              </span>
              <div
                style={{
                  width: '1px',
                  height: '28px',
                  background: 'linear-gradient(to bottom, #3E8EF7, transparent)',
                }}
              />
            </div>
          )}
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
          Data Structures &amp; Algorithms · Machine Learning · Object-Oriented Programming
        </p>
      </div>
    </section>
  )
}

function ScrollCard({
  group,
  index,
  isActive,
}: {
  group: (typeof skillGroups)[0]
  index: number
  isActive: boolean
}) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = innerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8
    setTilt({ x, y })
  }

  return (
    <div
      ref={innerRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        border: `1px solid ${hover ? group.accent + '55' : group.accent + '22'}`,
        background: 'rgba(16,20,28,0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: isActive
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
  )
}
