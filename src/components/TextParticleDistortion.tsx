import { useEffect, useRef, useState, useCallback } from 'react'

type TextParticleDistortionProps = {
  text: string
  fontSize?: number
  fontFamily?: string
  color?: string
  /** Radius in px around cursor that scatters particles */
  scatterRadius?: number
  /** How strongly particles are pushed away */
  scatterForce?: number
  /** How fast particles drift back to origin */
  returnSpeed?: number
  /** Sampling density — lower = more particles */
  samplingGap?: number
}

type Particle = {
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseAlpha: number
  alpha: number
}

export default function TextParticleDistortion({
  text,
  fontSize = 120,
  fontFamily = 'Anton, sans-serif',
  color = '#FFFE1E',
  scatterRadius = 120,
  scatterForce = 8,
  returnSpeed = 0.04,
  samplingGap = 3,
}: TextParticleDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  // Measure the container and render text to sample particle positions
  const measureAndSample = useCallback(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const rect = container.getBoundingClientRect()
    const w = Math.ceil(rect.width)
    const h = Math.ceil(rect.height)
    if (w === 0 || h === 0) return

    setDims({ w, h })

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    // Draw text offscreen to sample pixels
    const offscreen = document.createElement('canvas')
    offscreen.width = w * dpr
    offscreen.height = h * dpr
    const octx = offscreen.getContext('2d')!
    octx.scale(dpr, dpr)

    octx.fillStyle = '#fff'
    octx.font = `bold ${fontSize}px ${fontFamily}`
    octx.textAlign = 'center'
    octx.textBaseline = 'middle'
    octx.fillText(text, w / 2, h / 2)

    // Sample pixel positions from the rendered text
    const imageData = octx.getImageData(0, 0, offscreen.width, offscreen.height)
    const pixels = imageData.data

    const particles: Particle[] = []

    for (let y = 0; y < offscreen.height; y += samplingGap) {
      for (let x = 0; x < offscreen.width; x += samplingGap) {
        const i = (y * offscreen.width + x) * 4
        // Only sample where text is visible (alpha > threshold)
        if (pixels[i + 3] > 128) {
          const px = x / dpr
          const py = y / dpr
          particles.push({
            ox: px,
            oy: py,
            x: px,
            y: py,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.4 + 0.8,
            baseAlpha: Math.random() * 0.5 + 0.5,
            alpha: 0,
          })
        }
      }
    }

    // Store particles on canvas dataset for the animation loop
    ;(canvas as any).__particles = particles
    ;(canvas as any).__animating = true

    // Start animation
    let mouse = { x: -999, y: -999 }
    let raf = 0

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -999
      mouse.y = -999
    }

    window.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    let fadeIn = 0

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      fadeIn = Math.min(1, fadeIn + 0.012)

      for (const p of particles) {
        // Distance from cursor
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)

        // Scatter force
        if (dist < scatterRadius && dist > 0) {
          const force = (1 - dist / scatterRadius) * scatterForce
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Spring back toward origin
        p.vx += (p.ox - p.x) * returnSpeed
        p.vy += (p.oy - p.y) * returnSpeed

        // Damping
        p.vx *= 0.86
        p.vy *= 0.86

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Alpha: fade in, boost on movement
        const speed = Math.hypot(p.vx, p.vy)
        p.alpha = fadeIn * (p.baseAlpha + speed * 0.04)

        // Draw
        ctx.globalAlpha = Math.min(1, p.alpha)
        ctx.fillStyle = color
        ctx.shadowBlur = 4 + speed * 2
        ctx.shadowColor = color

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size + speed * 0.06, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    ;(canvas as any).__cleanup = () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [text, fontSize, fontFamily, scatterRadius, scatterForce, returnSpeed, samplingGap])

  // Re-measure on mount and resize
  useEffect(() => {
    const timer = setTimeout(measureAndSample, 100)
    const onResize = () => measureAndSample()
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
      const canvas = canvasRef.current
      if (canvas && (canvas as any).__cleanup) (canvas as any).__cleanup()
    }
  }, [measureAndSample])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `${fontSize * 1.3}px`,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'auto',
          cursor: 'default',
        }}
      />
    </div>
  )
}
