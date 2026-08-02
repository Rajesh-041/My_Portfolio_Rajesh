import { useInView } from '../hooks/useInView'
import { useRef, useState } from 'react'

const links = [
  {
    label: 'Email',
    value: 'muthurajesht041@gmail.com',
    href: 'mailto:muthurajesht041@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'muthu-rajesh-t',
    href: 'https://www.linkedin.com/in/muthu-rajesh-t-8413853b0',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'Rajesh-041',
    href: 'https://github.com/Rajesh-041',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
]

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18
    setOffset({ x, y })
  }

  return (
    <a
      ref={ref}
      href="mailto:muthurajesht041@gmail.com"
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 70px rgba(255,254,30,0.45)')}
      onMouseLeave={(e) => {
        setOffset({ x: 0, y: 0 })
        e.currentTarget.style.boxShadow = '0 0 40px rgba(255,254,30,0.25)'
      }}
      className="will-3d"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1.1rem 3rem',
        background: '#FFFE1E',
        color: '#0A0A0A',
        fontSize: '0.85rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontFamily: 'Anton, sans-serif',
        fontWeight: 400,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s',
        boxShadow: '0 0 40px rgba(255,254,30,0.25)',
        cursor: 'none',
      }}
    >
      {children}
    </a>
  )
}

export default function Contact() {
  const [sectionRef, inView] = useInView()

  return (
    <section
      id="contact"
      style={{ background: '#0A0A0ACC', position: 'relative', overflow: 'hidden' }}
    >
      {/* Final spot from above */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '120px',
          background: 'linear-gradient(to bottom, rgba(255,254,30,0.45), transparent)',
        }}
      />

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'clamp(5rem, 12vw, 10rem) 2rem clamp(3rem, 8vw, 6rem)',
          textAlign: 'center',
        }}
      >
        {/* Script label */}
        <p className={`chapter-label reveal ${inView ? 'in-view' : ''}`} style={{ color: '#FFFE1E', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          "The Final Scene"
        </p>

        {/* Headline */}
        <h2
          className={`display-font reveal reveal-delay-1 ${inView ? 'in-view' : ''}`}
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 6rem)',
            color: '#F5F5F5',
            lineHeight: 1.08,
            marginBottom: '1.8rem',
          }}
        >
          THIS IS WHERE THE STORY PAUSES — NOT ENDS.
        </h2>

        {/* Copy */}
        <p
          className={`reveal reveal-delay-2 ${inView ? 'in-view' : ''}`}
          style={{ fontSize: 'clamp(1rem, 2.4vw, 1.2rem)', color: '#B8B8B8', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '640px', marginInline: 'auto' }}
        >
          Every project on this reel started as a conversation. If you've got a problem worth
          building for, an idea worth prototyping, or just want to talk engineering — the
          credits are rolling, but I'm still on set.
        </p>

        {/* Now Directing */}
        <div
          className={`reveal reveal-delay-3 ${inView ? 'in-view' : ''}`}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', color: '#30C1E2', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '0.6rem' }}>
            Now Directing
          </p>
          <p className="chapter-label" style={{ fontSize: '1rem', color: '#C9C9CF', lineHeight: 1.7, maxWidth: '560px', marginInline: 'auto' }}>
            Currently deep in AI-powered systems and full-stack builds. Open to internships,
            collaborations, and interesting problems.
          </p>
        </div>

        {/* CTA */}
        <div
          className={`reveal reveal-delay-4 ${inView ? 'in-view' : ''}`}
          style={{ marginBottom: '5rem' }}
        >
          <MagneticButton>Get in Touch</MagneticButton>
        </div>

        {/* Contact reel */}
        <div
          className={`reveal reveal-delay-5 ${inView ? 'in-view' : ''}`}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '2.5rem',
            marginBottom: '5rem',
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: '#B8B8B8',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s',
                cursor: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFE1E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B8B8')}
            >
              {link.icon}
              <span>{link.value}</span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,254,30,0.1)', marginBottom: '2rem' }} />

        {/* Closing line */}
        <p
          className={`chapter-label reveal ${inView ? 'in-view' : ''}`}
          style={{ fontSize: '1.1rem', color: '#FFFE1E88', marginBottom: '2rem', fontStyle: 'italic' }}
        >
          "Directed, written, and built by Muthu Rajesh."
        </p>

        {/* Footer */}
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <p style={{ fontSize: '0.7rem', color: '#B8B8B844', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
            © MUTHU RAJESH — CINEMATIC CREDITS PORTFOLIO
          </p>
          <p style={{ fontSize: '0.7rem', color: '#B8B8B844', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
            LANGUAGES · ENGLISH / TAMIL
          </p>
        </div>
      </div>
    </section>
  )
}