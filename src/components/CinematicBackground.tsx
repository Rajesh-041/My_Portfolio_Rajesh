import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'

const PALETTE = {
  gold: new THREE.Color('#FFFE1E'),
  cyan: new THREE.Color('#30C1E2'),
  magenta: new THREE.Color('#E339B5'),
  blue: new THREE.Color('#3E8EF7'),
}

function makeParticleSprite(): THREE.Texture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

const ChromaticAberrationShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    amount: { value: 0.002 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float amount;
    varying vec2 vUv;
    void main() {
      vec2 dir = vUv - 0.5;
      float dist = length(dir);
      float r = texture2D(tDiffuse, vUv - dir * amount * dist).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv + dir * amount * dist).b;
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `,
}

export default function CinematicBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#050508')

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    mount.appendChild(renderer.domElement)

    // ── Particle field ───────────────────────────────────────────────
    const sprite = makeParticleSprite()
    const PARTICLE_COUNT = 170
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const palette = Object.values(PALETTE)
    const sizes = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      const c = palette[i % palette.length]
      const dim = Math.random() * 0.5 + 0.25
      colors[i * 3] = c.r * dim
      colors[i * 3 + 1] = c.g * dim
      colors[i * 3 + 2] = c.b * dim
      sizes[i] = Math.random() * 0.5 + 0.12
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uSprite: { value: sprite } },
      vertexShader: `
        attribute float aSize;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          vec3 p = position;
          p.y += sin(uTime * 0.3 + position.x * 0.4) * 0.12;
          p.x += cos(uTime * 0.22 + position.y * 0.35) * 0.10;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aSize * 90.0 * (1.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uSprite;
        varying vec3 vColor;
        void main() {
          vec4 tex = texture2D(uSprite, gl_PointCoord);
          gl_FragColor = vec4(vColor, tex.a);
        }
      `,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── Soft drifting light blobs ─────────────────────────────────────
    const orbs = Object.values(PALETTE).map((color, i) => {
      const geo = new THREE.SphereGeometry(1, 24, 24)
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(geo, mat)
      const radius = 3 + i * 0.8
      const spreadX = (i % 2 === 0 ? 1 : -1) * (2 + i * 1.2)
      mesh.position.set(0, 0, 0)
      scene.add(mesh)
      return {
        mesh,
        radius,
        speed: 0.08 + i * 0.02,
        baseX: Math.random() * Math.PI * 2,
        baseY: Math.random() * Math.PI * 2,
        spreadX,
      }
    })

    // ── Orbiting light rings (event-horizon) ──────────────────────────
    const rings = Array.from({ length: 7 }).map((_, i) => {
      const inner = 0.9 + i * 0.24
      const outer = inner + (0.12 + Math.random() * 0.1)
      const geo = new THREE.RingGeometry(inner, outer, 72)
      const mat = new THREE.MeshBasicMaterial({
        color: [PALETTE.gold, PALETTE.cyan, PALETTE.magenta][i % 3],
        transparent: true,
        opacity: 0.05 + (i % 3) * 0.035,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = Math.PI / 2 + (i % 2 === 0 ? -0.22 : 0.24) + i * 0.06
      mesh.rotation.y = i * 0.35
      mesh.position.z = (i % 3) * 0.5 - 0.5
      scene.add(mesh)
      return { mesh, spin: 0.02 + (i % 3) * 0.016, tilt: 0.004 + (i % 2) * 0.003 }
    })

    // ── Post-processing ───────────────────────────────────────────────
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.55,
      0.6,
      0.6,
    )
    composer.addPass(bloomPass)

    const caPass = new ShaderPass(ChromaticAberrationShader)
    composer.addPass(caPass)

    const fxaaPass = new ShaderPass(FXAAShader)
    composer.addPass(fxaaPass)

    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
      fxaaPass.material.uniforms['resolution'].value.set(1 / (w * renderer.getPixelRatio()), 1 / (h * renderer.getPixelRatio()))
    }
    window.addEventListener('resize', onResize)

    // ── Mouse parallax (lerped) ───────────────────────────────────────
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointer)

    const clock = new THREE.Clock()
    let raf = 0

    // Camera cinematic dolly: the further you scroll, the camera pulls in and drifts.
    let scrollN = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const onScroll = () => {
      scrollN = Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const animate = () => {
      const t = clock.getElapsedTime()
      particleMat.uniforms.uTime.value = t

      rings.forEach((r) => {
        r.mesh.rotation.z += r.spin
        r.mesh.rotation.x += r.tilt
      })

      orbs.forEach((orb) => {
        orb.mesh.position.x = Math.cos(t * orb.speed + orb.baseX) * orb.spreadX
        orb.mesh.position.y = Math.sin(t * orb.speed * 0.8 + orb.baseY) * 1.6
        orb.mesh.position.z = Math.sin(t * orb.speed + orb.baseX) * 1.2
        orb.mesh.scale.setScalar(orb.radius)
      })

      current.x += (target.x - current.x) * 0.055
      current.y += (target.y - current.y) * 0.055

      // Softer dolly forward + subtler drift as you scroll
      const dolly = 6 - scrollN * 2.2
      camera.position.x = current.x * 2.2 + Math.sin(t * 0.5) * scrollN * 1.4
      camera.position.y = -current.y * 1.5 + Math.cos(t * 0.32) * scrollN * 0.7
      camera.position.z = dolly
      camera.lookAt(current.x * 0.32, -current.y * 0.26, 0)
      camera.rotateZ(scrollN * 0.04 + Math.sin(t * 0.2) * 0.006)

      composer.render()
      raf = requestAnimationFrame(animate)
    }

    if (reduced) {
      // Render a single static frame, no RAF loop.
      clock.getDelta()
      composer.render()
    } else {
      raf = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      composer.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      sprite.dispose()
      rings.forEach((r) => {
        r.mesh.geometry.dispose()
        ;(r.mesh.material as THREE.Material).dispose()
      })
      orbs.forEach((o) => {
        o.mesh.geometry.dispose()
        ;(o.mesh.material as THREE.Material).dispose()
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="cinematic-canvas" aria-hidden="true" />
}