import { useEffect, useRef, useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'

type Carousel3DProps<T> = {
  items: ReadonlyArray<T>
  /** Renders the interior card for one face. the tools to read `active` if needed. */
  render: (item: T, index: number) => ReactNode
  accent?: string
  radius?: number
  cardWidth?: string
  /** Auto-advance every `autoMs` ms; pauses while hovering. */
  autoMs: number
  dotColor?: (item: T, index: number) => string
  counterLabel?: (index: number) => string
  height?: string
  minHeight?: number
  showArrows?: boolean
}

export default function Carousel3D<T>({
  items,
  render,
  accent = '#FFFE1E',
  radius = 470,
  cardWidth = 'min(54vw, 480px)',
  autoMs,
  dotColor,
  counterLabel,
  height = 'min(60vh, 560px)',
  minHeight = 440,
  showArrows = true,
}: Carousel3DProps<T>) {
  const count = items.length
  const step = 360 / count
  const [current, setCurrent] = useState(0)
  const dragStart = useRef<number | null>(null)

  useEffect(() => {
    if (!autoMs) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % count), autoMs)
    return () => clearInterval(id)
  }, [autoMs, count])

  const go = (dir: number) => setCurrent((c) => (c + dir + count) % count)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return
    const dx = e.clientX - dragStart.current
    dragStart.current = null
    if (Math.abs(dx) > 40) go(dx > 0 ? 1 : -1)
  }
  const cancelDrag = () => {
    dragStart.current = null
  }

  const dot = (i: number) => (dotColor ? dotColor(items[i], i) : accent)

  const arrowCss = (side: 'left' | 'right'): CSSProperties => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [side]: '1rem',
    zIndex: 40,
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: `1px solid ${accent}33`,
    background: 'rgba(10,10,10,0.55)',
    color: accent,
    fontSize: '1.7rem',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.2s',
  })

  return (
    <div>
      {counterLabel ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.2rem',
          }}
        >
          <span
            style={{
              writingMode: 'horizontal-tb',
              letterSpacing: '0.25em',
              fontSize: '0.62rem',
              color: `${accent}99`,
              fontFamily: 'monospace',
              textTransform: 'uppercase',
            }}
          >
            {counterLabel(current)}
          </span>
        </div>
      ) : null}

      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={cancelDrag}
        style={{
          position: 'relative',
          perspective: '1600px',
          height,
          minHeight: `${minHeight}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'pan-y',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: `rotateY(${-(current * step)}deg)`,
            transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {items.map((item, i) => {
            const active = current === i
            const carried = (i - current + count) % count
            const depth = Math.min(Math.abs(carried), count - Math.abs(carried))
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: cardWidth,
                  transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                  pointerEvents: active ? 'auto' : 'none',
                  zIndex: active ? 20 : 10,
                }}
              >
                <div
                  onClick={() => !active && setCurrent(i)}
                  style={{
                    opacity: active ? 1 : Math.max(0.35, 1 - depth * 0.18),
                    filter: `blur(${active ? 0 : depth * 1.2}px)`,
                    transform: `rotateY(${-(carried * step)}deg) translateZ(${active ? 20 : 0}px)`,
                    transformStyle: 'preserve-3d',
                    transition: 'opacity 0.8s ease, filter 0.8s ease, transform 1s ease',
                    cursor: active ? 'default' : 'pointer',
                  }}
                >
                  {render(item, i)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showArrows && count > 1 ? (
        <>
          <button aria-label="Previous" onClick={() => go(-1)} style={arrowCss('left')}>
            ‹
          </button>
          <button aria-label="Next" onClick={() => go(1)} style={arrowCss('right')}>
            ›
          </button>
        </>
      ) : null}

      {count > 1 ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.55rem', marginTop: '1.4rem' }}>
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              style={{
                width: current === i ? '22px' : '8px',
                height: '8px',
                borderRadius: '999px',
                border: 'none',
                padding: 0,
                background: current === i ? dot(i) : `rgba(184,184,184,0.25)`,
                boxShadow: current === i ? `0 0 8px ${dot(i)}` : 'none',
                cursor: 'pointer',
                transition: 'width 0.3s, background 0.3s, box-shadow 0.3s',
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}