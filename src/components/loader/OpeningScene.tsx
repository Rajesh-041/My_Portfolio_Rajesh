import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

type Props = {
  /** 0..1 progress of the whole sequence. */
  progress: number
  /** Drives ambient particle speed (anticipation in the reveal). */
  excitement: number
  reducedMotion?: boolean
}

export default function OpeningScene({ progress, excitement, reducedMotion = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(progress)
  const excitementRef = useRef(excitement)
  progressRef.current = progress
  excitementRef.current = excitement

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(0, 0, 14)

    // Lighting
    scene.add(new THREE.AmbientLight(0x335, 0.4))
    const point = new THREE.PointLight(0xaaccff, 2.2, 60)
    scene.add(point)

    // ---- Particle drift (Scenes 1 & 3) ----
    const PARTICLE_COUNT = reducedMotion ? 500 : 1600
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pmat = new THREE.PointsMaterial({ color: 0x9fc4ff, size: 0.04, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })
    const particles = new THREE.Points(geometry, pmat)
    scene.add(particles)

    // ---- Singularity ----
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25, 32),
      new THREE.MeshStandardMaterial({ color: 0xbfd8ff, emissive: 0x6fbbff, emissiveIntensity: 0.9, roughness: 0.2, metalness: 0.55 })
    )
    scene.add(core)
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 8),
      new THREE.MeshBasicMaterial({ color: 0x9fdcff, wireframe: true, transparent: true, opacity: 0.18 })
    )
    scene.add(shell)
    const glow = new THREE.Mesh(
      new THREE.RingGeometry(1.9, 2.3, 64),
      new THREE.MeshBasicMaterial({ color: 0xa5d8ff, transparent: true, opacity: 0.35, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    scene.add(glow)
    const ringGeom = new THREE.RingGeometry(3.1, 3.16, 96)
    const ring1 = new THREE.Mesh(ringGeom, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
    ring1.rotation.x = -0.4
    const ring2 = new THREE.Mesh(ringGeom, new THREE.MeshBasicMaterial({ color: 0x88baff, transparent: true, opacity: 0.25, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
    ring2.rotation.x = -Math.PI / 2.3
    ring2.rotation.z = 0.4
    scene.add(ring1, ring2)

    // ---- Postprocessing (bloom) ----
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0.4, 0.85))
    composer.addPass(new OutputPass())

    const clock = new THREE.Clock()
    let raf = 0

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', resize)

    const loop = () => {
      const t = clock.getElapsedTime()
      const prog = progressRef.current
      const excite = excitementRef.current
      const dp = particles.geometry.attributes.position as THREE.BufferAttribute

      // Camera: slow forward dolly, gentle drift
      camera.position.z = 14 - prog * 3.5
      camera.position.x = Math.sin(t * 0.1) * 0.6
      camera.position.y = Math.cos(t * 0.12) * 0.4
      camera.lookAt(0, 0, 0)

      // Singularity grows through Scene 2 (progress ~0.22..0.5)
      const coreScale = reducedMotion ? 1 : Math.min(1, Math.max(0.001, (prog - 0.22) * 3))
      core.scale.setScalar(coreScale)
      shell.scale.setScalar(coreScale * 1.5)
      glow.scale.setScalar(coreScale)
      ring1.scale.setScalar(coreScale)
      ring2.scale.setScalar(coreScale)

      core.rotation.y += 0.004
      core.rotation.x += 0.0015
      shell.rotation.y -= 0.001
      shell.rotation.z += 0.0008
      glow.rotation.z += 0.004
      glow.rotation.y += 0.001
      ring1.rotation.y += 0.006
      ring2.rotation.y -= 0.005

      point.position.set(Math.sin(t) * 2, Math.cos(t) * 2, 2.5)
      point.intensity = 2.2 * (0.85 + Math.sin(t * 2.2) * 0.25)

      const speed = 0.01 + excite * 0.05
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const j = i * 3
        positions[j + 1] -= speed
        positions[j] += Math.sin(t + i) * 0.002
        if (positions[j + 1] < -30) {
          positions[j + 1] = 30
          positions[j] = (Math.random() - 0.5) * 60
          positions[j + 2] = (Math.random() - 0.5) * 60
        }
      }
      dp.needsUpdate = true

      composer.render()
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      geometry.dispose()
      pmat.dispose()
      core.geometry.dispose()
      ;(core.material as THREE.Material).dispose()
      shell.geometry.dispose()
      ;(shell.material as THREE.Material).dispose()
      glow.geometry.dispose()
      ;(glow.material as THREE.Material).dispose()
      ringGeom.dispose()
      ;(ring1.material as THREE.Material).dispose()
      ;(ring2.material as THREE.Material).dispose()
      composer.dispose()
      renderer.dispose()
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} aria-hidden="true" />
}