import { useRef, useEffect, useState } from 'react'

type NavItem = {
  label: string
  href: string
  color: string
}

type MorphingBlobNavProps = {
  items: NavItem[]
  active: string
  onSelect: (href: string) => void
  visible: boolean
}

export default function MorphingBlobNav({ items, active, onSelect, visible }: MorphingBlobNavProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0, color: '#FFFE1E' })

  // Animate blob to active item
  useEffect(() => {
    const activeIndex = items.findIndex((item) => item.href === active)
    const el = itemRefs.current[activeIndex]
    const nav = navRef.current
    if (!el || !nav) return

    const navRect = nav.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    setBlobStyle({
      left: elRect.left - navRect.left - 8,
      width: elRect.width + 16,
      color: items[activeIndex]?.color || '#FFFE1E',
    })
  }, [active, items])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-16px)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '0.15rem',
        padding: '0.5rem 1.25rem',
        background: 'rgba(10,10,10,0.85)',
        border: '1px solid rgba(255,254,30,0.12)',
        backdropFilter: 'blur(12px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        pointerEvents: visible ? 'all' : 'none',
        overflowX: 'auto',
        maxWidth: '96vw',
        borderRadius: '999px',
      }}
    >
      {/* Morphing blob background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: `${blobStyle.left}px`,
          width: `${blobStyle.width}px`,
          height: '30px',
          transform: 'translateY(-50%)',
          background: `${blobStyle.color}18`,
          border: `1px solid ${blobStyle.color}30`,
          borderRadius: '12px',
          transition: 'left 0.4s cubic-bezier(0.22,1,0.36,1), width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, border-color 0.4s ease',
          pointerEvents: 'none',
          filter: `blur(0.5px)`,
          boxShadow: `0 0 20px ${blobStyle.color}15, inset 0 0 12px ${blobStyle.color}08`,
        }}
      />

      {items.map((item, i) => (
        <a
          key={item.href}
          ref={(el) => { itemRefs.current[i] = el }}
          href={item.href}
          onClick={(e) => {
            e.preventDefault()
            onSelect(item.href)
            document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
          }}
          style={{
            position: 'relative',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            color: active === item.href ? item.color : '#EAEAEA',
            textDecoration: 'none',
            padding: '0.35rem 0.65rem',
            textTransform: 'uppercase',
            transition: 'color 0.25s ease',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            opacity: active === item.href ? 1 : 0.85,
            fontWeight: active === item.href ? 600 : 400,
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = item.color
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = active === item.href ? item.color : '#EAEAEA'
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}