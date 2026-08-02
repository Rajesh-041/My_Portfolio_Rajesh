import { useEffect, useRef } from 'react'

type ParticleDistortionProps = {
  width?: number
  height?: number
  particleCount?: number
  color?: string
  /** Radius in px around cursor that scatters particles */
  scatterRadius?: number
  /** How strongly particles are pushed away */
  scatterForce?: number
  /** How fast particles drift back to origin */
  returnSpeed?: number
}

export default function ParticleDistortion({
  width = 900,
  height = 120,
  particleCount = 320,
  color = '#FFFE1E',
  scatterRadius = 120,
  scatterForce = 6,
  returnSpeed = 0.035,
}: ParticleDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Particle state
    type Particle = {
      ox: number // origin x
      oy: number // origin y
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
      hue: number // slight color variation
    }

    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      const ox = Math.random() * width
      const oy = Math.random() * height
      particles.push({
        ox,
        oy,
        x: ox,
        y: oy,
        vx: 0,
        vy: 0,
        size: Math.random() * 2.2 + 0.4,
        alpha: Math.random() * 0.6 + 0.15,
        hue: Math.random() * 20 - 10, // slight gold variation
      })
    }

    let mouse = { x: -999, y: -999 }
    let raf = 0

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const onLeave = () => {
      mouse.x = -999
      mouse.y = -999
    }

    window.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        // Distance from cursor
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)

        // Scatter force — inversely proportional to distance
        if (dist < scatterRadius && dist > 0) {
          const force = (1 - dist / scatterRadius) * scatterForce
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Spring back toward origin
        p.vx += (p.ox - p.x) * returnSpeed
        p.vy += (p.oy - p.y) * returnSpeed

        // Damping
        p.vx *= 0.88
        p.vy *= 0.88

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Draw particle
        const speed = Math.hypot(p.vx, p.vy)
        const boostedAlpha = Math.min(1, p.alpha + speed * 0.06)
        const boostedSize = p.size + speed * 0.08

        // Parse base color and apply alpha
        ctx.globalAlpha = boostedAlpha
        ctx.fillStyle = color
        ctx.shadowBlur = 8 + speed * 1.5
        ctx.shadowColor = color

        ctx.beginPath()
        ctx.arc(p.x, p.y, boostedSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // Reset shadow
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [width, height, particleCount, color, scatterRadius, scatterForce, returnSpeed])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
