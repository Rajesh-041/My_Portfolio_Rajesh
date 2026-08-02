import { useState, useRef } from 'react'

type HolographicStackProps<T> = {
  items: ReadonlyArray<T>
  render: (item: T, index: number, isActive: boolean) => React.ReactNode
  accent?: string
  secondaryColor?: string
}

export default function HolographicStack<T>({
  items,
  render,
  accent = '#3E8EF7',
  secondaryColor = '#F2A93B',
}: HolographicStackProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setTilt({ x: y * -5, y: x * 5 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const count = items.length

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        perspective: '1200px',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {items.map((item, i) => {
        const isActive = i === activeIndex
        const offset = ((i - activeIndex + count) % count)
        const wrapped = offset > Math.floor(count / 2) ? offset - count : offset
        const absOffset = Math.abs(wrapped)

        // Only show up to 4 cards in the stack
        if (absOffset > 3) return null

        const stackX = wrapped * 24
        const stackY = isActive ? 0 : absOffset * 8
        const stackZ = isActive ? 60 : -absOffset * 30
        const scale = isActive ? 1 : 0.92 - absOffset * 0.04
        const rotateX = isActive ? tilt.x : tilt.x * 0.3
        const rotateY = isActive ? tilt.y : tilt.y * 0.3
        const opacity = isActive ? 1 : Math.max(0.15, 1 - absOffset * 0.3)
        const blur = isActive ? 0 : absOffset * 1.5

        // Holographic gradient angle follows tilt
        const holoAngle = 135 + tilt.y * 8
        const holoShift = tilt.x * 3

        return (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              position: 'absolute',
              width: 'min(70vw, 500px)',
              transformStyle: 'preserve-3d',
              transform: `
                translateX(${stackX}px)
                translateY(${stackY}px)
                translateZ(${stackZ}px)
                scale(${scale})
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
              `,
              transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease, filter 0.4s ease',
              opacity,
              filter: `blur(${blur}px)`,
              zIndex: isActive ? 20 : 10 - absOffset,
              cursor: isActive ? 'default' : 'pointer',
              pointerEvents: absOffset <= 1 ? 'auto' : 'none',
            }}
          >
            {/* Holographic card */}
            <div
              style={{
                position: 'relative',
                borderRadius: '18px',
                overflow: 'hidden',
                border: `1px solid ${isActive ? accent + '55' : accent + '18'}`,
                background: 'rgba(16,20,28,0.92)',
                backdropFilter: 'blur(8px)',
                boxShadow: isActive
                  ? `0 30px 70px -20px ${accent}40, 0 0 0 1px ${accent}22, inset 0 1px 0 ${accent}15`
                  : `0 12px 30px -16px rgba(0,0,0,0.6)`,
              }}
            >
              {/* Holographic sheen overlay */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(
                      ${holoAngle}deg,
                      transparent 0%,
                      ${accent}08 ${20 + holoShift}%,
                      ${secondaryColor}12 ${40 + holoShift}%,
                      ${accent}08 ${60 + holoShift}%,
                      transparent 100%
                    )`,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />
              )}

              {/* Iridescent edge glow */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    inset: -1,
                    borderRadius: '18px',
                    background: `conic-gradient(
                      from ${holoAngle}deg,
                      ${accent}33,
                      ${secondaryColor}22,
                      #E339B522,
                      #30C1E222,
                      ${accent}33
                    )`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '1px',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />
              )}

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 3 }}>
                {render(item, i, isActive)}
              </div>
            </div>
          </div>
        )
      })}

      {/* Stack counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '-2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? '20px' : '6px',
              height: '6px',
              borderRadius: '999px',
              border: 'none',
              padding: 0,
              background: i === activeIndex ? accent : `${accent}33`,
              boxShadow: i === activeIndex ? `0 0 10px ${accent}88` : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}