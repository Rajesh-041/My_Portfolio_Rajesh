import { useState, useCallback } from 'react'
import type { ReactNode, CSSProperties } from 'react'

type Carousel3DProps<T> = {
  items: ReadonlyArray<T>
  render: (item: T, index: number) => ReactNode
  accent?: string
  radius?: number
  cardWidth?: string
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
  dotColor,
  counterLabel,
  height = 'min(60vh, 560px)',
  minHeight = 440,
  showArrows = true,
}: Carousel3DProps<T>) {
  const count = items.length
  const step = 360 / count
  const [current, setCurrent] = useState(0)

  const go = useCallback((dir: number) => {
    setCurrent((c) => (c + dir + count) % count)
  }, [count])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    if (!target.hasPointerCapture(e.pointerId)) return
    target.releasePointerCapture(e.pointerId)
    const dragStart = target.dataset.dragStart
    if (dragStart !== undefined) {
      const dx = e.clientX - Number(dragStart)
      if (Math.abs(dx) > 40) go(dx > 0 ? 1 : -1)
      delete target.dataset.dragStart
    }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      e.currentTarget.dataset.dragStart ??= String(e.clientX)
    }
  }
  const cancelDrag = () => {}

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
        onPointerMove={onPointerMove}
        onPointerLeave={cancelDrag}
        onPointerCancel={cancelDrag}
        onTouchStart={(e) => onPointerDown(e as unknown as React.PointerEvent<HTMLDivElement>)}
        onTouchEnd={(e) => onPointerUp(e as unknown as React.PointerEvent<HTMLDivElement>)}
        onTouchMove={(e) => onPointerMove(e as unknown as React.PointerEvent<HTMLDivElement>)}
        onTouchCancel={cancelDrag}
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
