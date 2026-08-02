import Carousel3D from '../components/Carousel3D'

const projects = [
  {
    scene: '01',
    title: 'MERGIFY',
    subtitle: 'Unified Campus Management Platform',
    logline:
      'One platform for every part of campus life — attendance, safety, announcements, and AI-guided studying, all in sync.',
    overview:
      'A role-based campus management platform integrating attendance tracking, announcements, safety reporting, and AI-powered study planning.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Firebase', 'Firestore'],
    palette: { bg: '#120C1E', accent: '#E339B5', secondary: '#4BD8E0', text: '#CBC3D9' },
    tag: 'Analog Dream',
    repo: 'mergify',
  },
  {
    scene: '02',
    title: 'HOMECHEF CONNECT',
    subtitle: 'Community Food Exchange Platform',
    logline: 'Home kitchens, meet your neighborhood — a full-stack marketplace for home-cooked meals.',
    overview:
      'A full-stack food-sharing platform connecting home chefs with customers through location-based discovery, secure authentication, and order tracking.',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'Cloudinary'],
    palette: { bg: '#0A0A0A', accent: '#FFFE1E', secondary: '#30C1E2', text: '#B8B8B8' },
    tag: 'Neon Noir',
    repo: 'homechef-connect',
  },
  {
    scene: '03',
    title: 'SAFEGUARD AI',
    subtitle: 'AI-Powered Fall Detection Dashboard',
    logline: 'A quiet system watching for the moment someone needs help — and reacting before it is too late.',
    overview:
      'A real-time, AI-assisted monitoring dashboard processing webcam feeds and generating emergency alerts from predictive validation.',
    stack: ['React', 'TypeScript', 'Vite', 'Axios'],
    palette: { bg: '#0D0D12', accent: '#C81E3A', secondary: '#C9A24B', text: '#CFCFD6' },
    tag: 'Midnight Thriller',
    repo: 'safeguard-ai',
  },
  {
    scene: '04',
    title: 'ATTENDO',
    subtitle: 'Facial Recognition Attendance System',
    logline: 'No cards, no signatures — just a face, recognized in real time.',
    overview:
      'A contactless attendance system using facial recognition for automated identification, recording, reporting, and analytics.',
    stack: ['React', 'face-api.js', 'Firebase Firestore'],
    palette: { bg: '#111417', accent: '#3E8EF7', secondary: '#F2A93B', text: '#C4C9CE' },
    tag: 'Sci-Fi Archive',
    repo: 'attendo',
  },
]

export default function Projects() {
  return (
    <section id="projects" style={{ background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
      {/* Section header */}
      <div
        style={{
          padding: '2.5rem clamp(1.5rem, 5vw, 4rem) 1rem',
          position: 'relative',
          zIndex: 30,
          textAlign: 'center',
        }}
      >
        <p className="chapter-label" style={{ color: '#FFFE1E', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          "Chapter Two"
        </p>
        <h2 className="display-font" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', color: '#F0F0F0', lineHeight: 1.02 }}>
          FEATURED SCENES
        </h2>
      </div>

      {/* 3D auto carousel */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Carousel3D
          items={projects}
          accent="#FFFE1E"
          radius={470}
          cardWidth="min(74vw, 560px)"
          height="min(70vh, 660px)"
          minHeight={520}
          dotColor={(p) => p.palette.accent}
          counterLabel={(c) => `${projects[c].scene} · ${c + 1}/${projects.length}`}
          render={(p) => <SceneCard project={p} />}
        />
      </div>
    </section>
  )
}

function SceneCard({ project: p }: { project: (typeof projects)[0] }) {
  return (
    <div
      style={{
        background: `linear-gradient(160deg, ${p.palette.bg}b8, rgba(0,0,0,0.72))`,
        backdropFilter: 'blur(2px)',
        borderRadius: '18px',
        padding: 'clamp(0.9rem, 2.4vw, 1.5rem) clamp(1rem, 3vw, 1.8rem)',
        border: `1px solid ${p.palette.accent}33`,
        boxShadow: `0 0 0 1px ${p.palette.accent}22, 0 24px 60px -24px rgba(0,0,0,0.8), 0 0 50px ${p.palette.accent}18`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.7rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span className="display-font" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: p.palette.accent, lineHeight: 1, opacity: 0.5 }}>
            {p.scene}
          </span>
          <span style={{ padding: '0.15rem 0.6rem', border: `1px solid ${p.palette.accent}44`, fontSize: '0.52rem', letterSpacing: '0.2em', color: p.palette.accent, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
            {p.tag.toUpperCase()}
          </span>
        </div>
        <a
          href={`https://github.com/Rajesh-041/${p.repo}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.8rem',
            border: `1px solid ${p.palette.accent}55`,
            borderRadius: '999px',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: p.palette.accent,
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            textDecoration: 'none',
            background: `${p.palette.accent}0d`,
            whiteSpace: 'nowrap',
            transition: 'background 0.25s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${p.palette.accent}1f` }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `${p.palette.accent}0d` }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.599.111.82-.26.82-.577 0-.286-.011-1.04-.017-2.04-3.338.726-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.996.108-.776.419-1.306.763-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.24-3.22-.125-.305-.537-1.528.116-3.183 0 0 1.011-.323 3.31 1.23.96-.267 1.99-.4 3.01-.405 1.02.005 2.05.138 3.01.405 2.3-1.553 3.31-1.23 3.31-1.23.652 1.654.24 2.876.116 3.182.77.84 1.237 1.91 1.237 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.806 1.1.806 2.2 0 1.587-.015 2.866-.015 3.255 0 .322.213.698.826.58C20.565 21.795 24 17.3 24 12 24 5.37 18.627 0 12 0z" />
          </svg>
          Repo
        </a>
      </div>

      <h3 className="display-font" style={{ fontSize: 'clamp(1.3rem, 3.4vw, 2.2rem)', color: '#F5F5F5', lineHeight: 1, marginBottom: '0.35rem' }}>
        {p.title}
      </h3>

      <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', color: p.palette.secondary, textTransform: 'uppercase', marginBottom: '0.7rem' }}>
        {p.subtitle}
      </p>

      <p className="chapter-label" style={{ fontSize: 'clamp(0.82rem, 1.6vw, 0.95rem)', color: p.palette.text, lineHeight: 1.45, marginBottom: '0.7rem', fontStyle: 'italic' }}>
        {p.logline}
      </p>

      <p style={{ fontSize: '0.78rem', color: `${p.palette.text}b3`, lineHeight: 1.6, marginBottom: '0.8rem' }}>
        {p.overview}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {p.stack.map((tech) => (
          <span
            key={tech}
            style={{
              padding: '0.15rem 0.6rem',
              background: `${p.palette.accent}11`,
              border: `1px solid ${p.palette.accent}33`,
              fontSize: '0.62rem',
              color: p.palette.accent,
              fontFamily: 'monospace',
              letterSpacing: '0.04em',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}