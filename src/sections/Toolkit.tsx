import { useInView } from '../hooks/useInView'
import { useRef, useState } from 'react'
import Carousel3D from '../components/Carousel3D'

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'C', 'C++'],
  },
  {
    category: 'Frontend',
    skills: ['HTML5', 'CSS3', 'React.js', 'Vite'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'Firebase'],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'MongoDB', 'Firebase Firestore'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'VS Code', 'Jira', 'Canva', 'Vercel'],
  },
]

const marqueeItems = [
  'React', 'Node.js', 'Python', 'Firebase', 'MongoDB', 'TypeScript',
  'Tailwind', 'Express', 'MySQL', 'Git', 'Vercel', 'Java', 'face-api.js',
  'Axios', 'Vite', 'Firestore', 'Razorpay', 'Cloudinary', 'C', 'C++',
  'JavaScript', 'Jira', 'Canva', 'Firebase Firestore',
]

const floatClasses = ['float-slow', 'float-med', 'float-fast']

export default function Toolkit() {
  const [sectionRef, inView] = useInView()

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
        }}
      />
      {/* Amber glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242,169,59,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Marquee ticker */}
      <div
        style={{
          borderTop: '1px solid rgba(62,142,247,0.2)',
          borderBottom: '1px solid rgba(62,142,247,0.2)',
          overflow: 'hidden',
          padding: '0.75rem 0',
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

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vw, 7rem) 2rem',
        }}
      >
        {/* Header */}
        <div className={`reveal ${inView ? 'in-view' : ''}`} style={{ marginBottom: '4rem', textAlign: 'center' }}>
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

        {/* Skill floating cards — 3D carousel */}
        <div className="perspective-3d">
          <Carousel3D
            items={skillGroups}
            accent="#3E8EF7"
            autoMs={5000}
            radius={440}
            cardWidth="min(66vw, 520px)"
            height="min(58vh, 540px)"
            minHeight={440}
            dotColor={(_, i) => ['#3E8EF7', '#F2A93B', '#E339B5', '#30C1E2', '#FFFE1E'][i % 5]}
            counterLabel={(c) => `${skillGroups[c].category} · ${c + 1}/${skillGroups.length}`}
            render={(group, gi) => <SkillCard group={group} groupIndex={gi} />}
          />
        </div>

        {/* Core subjects — supporting line, not a card */}
        <div
          className={`reveal reveal-delay-4 ${inView ? 'in-view' : ''}`}
          style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(62,142,247,0.15)' }}
        >
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#3E8EF7AA', marginBottom: '1rem', textTransform: 'uppercase', fontFamily: 'monospace' }}>
            Supporting line · Core Subjects
          </p>
          <p style={{ fontSize: '0.95rem', color: '#C4C9CE' }}>
            Data Structures &amp; Algorithms · Machine Learning · Object-Oriented Programming
          </p>
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  group,
  groupIndex,
}: {
  group: (typeof skillGroups)[0]
  groupIndex: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6
    setTilt({ x, y })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }) }}
      style={{ perspective: '1000px', width: '100%' }}
    >
      <div
        className={`card-edge will-3d ${float(groupIndex)}`}
        style={{
          ['--edge-glow' as string]: `rgba(62,142,247,0.55)`,
          border: `1px solid ${hover ? 'rgba(62,142,247,0.45)' : 'rgba(62,142,247,0.16)'}`,
          background: 'rgba(20,26,36,0.96)',
          backdropFilter: 'blur(6px)',
          borderRadius: '14px',
          padding: '1.9rem 1.9rem 1.5rem',
          minHeight: '180px',
          boxShadow: hover ? `0 30px 50px -24px rgba(62,142,247,0.4)` : '0 18px 40px -28px rgba(0,0,0,0.7)',
          transform: hover
            ? `translateZ(0) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.05)`
            : 'none',
          transformStyle: 'preserve-3d',
        }}
      >
        <p
          className="display-font"
          style={{
            fontSize: '0.85rem',
            letterSpacing: '0.22em',
            color: '#F2A93B',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            fontWeight: 600,
            marginBottom: '1.5rem',
            transform: 'translateZ(30px)',
          }}
        >
          {group.category}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
          {group.skills.map((skill, si) => (
            <span
              key={skill}
              className={`float-fast ${si % 3 === 1 ? 'float-delay-1' : si % 3 === 2 ? 'float-delay-2' : ''}`}
              style={{
                padding: '0.4rem 0.95rem',
                background: 'rgba(62,142,247,0.10)',
                border: '1px solid rgba(62,142,247,0.28)',
                fontSize: '0.82rem',
                color: '#DFE6EE',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                animationDelay: `${groupIndex * 0.2 + si * 0.12}s, ${groupIndex * 0.2 + si * 0.12}s`,
                transform: 'translateZ(18px)',
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

function float(i: number): string {
  return ['float-slow', 'float-med', 'float-fast'][i % 3]
}