import { useEffect, useRef, useState } from 'react'
import OpeningScene from './OpeningScene'
import { TEXT_LINES, DIALOGUE, SCENE_SECONDS, TRANSITION_START, COMPLETE_MS, TRANSITION_DURATION } from '../../data/introTimeline'

type TextStyle = 'glow' | 'hero' | 'muted'

const STYLE_MAP: Record<
  TextStyle,
  { color: string; weight: number; size: string; glow: string }
> = {
  glow: {
    color: '#FFFFFF',
    weight: 500,
    size: 'clamp(1rem, 2.4vw, 1.6rem)',
    glow: '0 0 8px rgba(255,255,255,0.25)',
  },
  hero: {
    color: '#FFFFFF',
    weight: 600,
    size: 'clamp(2rem, 8vw, 5.5rem)',
    glow: '0 0 18px rgba(255,255,255,0.6), 0 0 60px rgba(180,220,255,0.45)',
  },
  muted: {
    color: '#000000',
    weight: 700,
    size: 'clamp(0.95rem, 2vw, 1.3rem)',
    glow: 'none',
  },
}

export default function LoadingSequence({
  onComplete,
  onTransition,
}: {
  onComplete: () => void
  onTransition?: () => void
}) {
  const [elapsed, setElapsed] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [doneFlag, setDoneFlag] = useState(false)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete
  const transitionRef = useRef(onTransition)
  transitionRef.current = onTransition
  const finishedRef = useRef(false)

  // ── Lifecycle timers (wall-clock, guaranteed) ────────────────────────
  useEffect(() => {
    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      setDoneFlag(true)
      completeRef.current()
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const t = setTimeout(() => finish(), 500)
      return () => clearTimeout(t)
    }

    // 1) Start the cross-fade
    const transitionTimer = setTimeout(() => {
      setTransitioning(true)
      transitionRef.current?.()
    }, TRANSITION_START)

    // 2) Unmount only AFTER the CSS fade completes (+ small buffer)
    const fadeCompleteAt = TRANSITION_START + TRANSITION_DURATION + 100
    const completeTimer = setTimeout(finish, Math.max(COMPLETE_MS, fadeCompleteAt))

    return () => {
      clearTimeout(transitionTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  // ── Lightweight clock for text/dialogue/scene (30 fps, not 60) ──────
  useEffect(() => {
    const t0 = Date.now()
    const id = setInterval(() => setElapsed(Date.now() - t0), 33) // ~30 fps
    return () => clearInterval(id)
  }, [])

  const progress = Math.min(1, elapsed / (SCENE_SECONDS * 1000))
  const excitement = elapsed > SCENE_SECONDS * 1000 * 0.55
    ? (elapsed / (SCENE_SECONDS * 1000) - 0.55) / 0.45
    : 0
  const hidden = doneFlag || transitioning

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#000',
        opacity: hidden ? 0 : 1,
        transform: transitioning ? 'scale(1.06)' : 'scale(1)',
        transition: `opacity ${TRANSITION_DURATION}ms ease, transform 1.2s cubic-bezier(0.22,1,0.36,1)`,
        pointerEvents: transitioning ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
      {/* 3D scene */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <OpeningScene progress={progress} excitement={excitement} />
      </div>

      {/* Stage label */}
      <p
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Space Grotesk', Inter, sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          color: 'rgba(180,220,255,0.5)',
          textTransform: 'uppercase',
        }}
      >
        Film by Muthu Rajesh
      </p>

      {/* Text intro + dialogue — exact timed lines */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          {TEXT_LINES.map((line) => (
            <TextLine key={`t-${line.id}`} line={line} elapsed={elapsed} />
          ))}
        </div>
      </div>

      {/* Dialogue block (stacked, staggered) */}
      <DialogueBlock elapsed={elapsed} />
    </div>
  )
}

function TextLine({ line, elapsed }: { line: (typeof TEXT_LINES)[0]; elapsed: number }) {
  const active = elapsed >= line.from && elapsed < line.to
  const fadeIn = elapsed > line.from && elapsed < line.from + 200
  const fadeOut = elapsed > line.to - 200 && elapsed < line.to
  const inside = active || fadeIn || fadeOut

  if (!inside) return null

  // Crossfade opacity: ramps up in first 200ms, out over last 200ms
  let opacity = 1
  if (fadeOut) opacity = (line.to - elapsed) / 200
  if (fadeIn) opacity = (elapsed - line.from) / 200

  const s = STYLE_MAP[line.style as TextStyle]

  return (
    <p
      className={line.style === 'hero' ? 'display-font' : undefined}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        fontFamily: "'Space Grotesk', Inter, sans-serif",
        fontSize: s.size,
        fontWeight: s.weight,
        color: s.color,
        letterSpacing: line.style === 'hero' ? '0.02em' : '0.04em',
        margin: 0,
        padding: '0 2rem',
        textShadow: s.glow === 'none' ? 'none' : s.glow,
        opacity,
        transform: fadeIn ? 'translateY(10px)' : 'translateY(0)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        pointerEvents: 'none',
      }}
    >
      {line.text}
    </p>
  )
}

function DialogueBlock({ elapsed }: { elapsed: number }) {
  const shown = DIALOGUE.filter((d) => elapsed >= d.at)
  if (shown.length === 0) return null
  const lastAt = DIALOGUE[DIALOGUE.length - 1].at
  const fading = elapsed >= lastAt + 650

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.7rem',
        textAlign: 'center',
        width: '90vw',
        maxWidth: '720px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }}
    >
      {shown.map((d, i) => {
        const s = STYLE_MAP[d.style as TextStyle]
        return (
          <p
            key={i}
            style={{
              fontFamily: "'Space Grotesk', Inter, sans-serif",
              fontSize: 'clamp(0.8rem, 1.6vw, 1.05rem)',
              fontWeight: s.weight,
              color: s.color,
              margin: 0,
              letterSpacing: '0.03em',
              textShadow: s.glow === 'none' ? 'none' : s.glow,
            }}
          >
            {d.text}
          </p>
        )
      })}
    </div>
  )
}