import { useInView } from '../hooks/useInView'
import { useRef, useState } from 'react'

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
        <p style={{ fontSize: '0.85rem', color: '#7A8290', marginTop: '1rem', letterSpacing: '0.1em' }}>
          Scroll down to explore each skill category
        </p>
      </div>

      {/* Full-viewport skill panels */}
      {skillGroups.map((group, i) => (
        <FullViewportPanel key={group.category} group={group} index={i} />
      ))}

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

function FullViewportPanel({
  group,
  index,
}: {
  group: (typeof skillGroups)[0]
  index: number
}) {
  const [ref, inView] = useInView({ threshold: 0.3 })
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
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 5vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow per category */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${group.accent}0A 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Slide-in animation wrapper */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)',
          transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          transitionDelay: '0.1s',
        }}
      >
        {/* Category number */}
        <div
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontFamily: 'monospace',
            fontWeight: 800,
            color: `${group.accent}12`,
            lineHeight: 1,
            marginBottom: '-1rem',
            letterSpacing: '-0.04em',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Card */}
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
            background: 'rgba(16,20,28,0.94)',
            backdropFilter: 'blur(12px)',
            boxShadow: hover
              ? `0 40px 80px -24px ${group.accent}44, 0 0 0 1px ${group.accent}22, inset 0 1px 0 ${group.accent}15`
              : `0 20px 50px -30px rgba(0,0,0,0.7)`,
            transform: hover
              ? `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)`
              : 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)',
            transition: 'transform 0.2s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            padding: 'clamp(2rem, 4vw, 3rem)',
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

          {/* Category header */}
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
              {group.skills.map((skill, si) => (
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
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease ${0.3 + si * 0.08}s, transform 0.5s ease ${0.3 + si * 0.08}s`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
