# Loading.md — Cinematic Entry Sequence (v2, Retimed)

> **Project:** Cinematic Credits Portfolio
>
> **Portfolio Owner:** Muthu Rajesh
>
> **Sequence Name:** "Opening Scene"
>
> **Duration:** ~6.5–7 seconds total, once per browser session *(tightened from the original 6–8s+ pacing)*
>
> **Objective:** The loading screen is not a spinner — it's the cold open of a film. By the time the Hero section appears, the visitor should feel like they've just watched a title sequence, not waited for a page to load.

---

# What Changed in This Revision

- **Overall duration compressed** — scenes and text now run on a tighter, precisely-timed schedule instead of open-ended "pause" beats.
- **Every text line now has an exact display duration**, calculated from word count so pacing feels natural: long enough to read comfortably, short enough that it never drags.
- **"Muthu Rajesh T"** and **"Every pixel has a purpose."** are now rendered in a **dark, muted tone with no glow** — set apart from the bright glowing lines around them, so they read as quiet, grounded statements rather than another spotlighted moment.
- Minor typo fixes: "curiosity" (not "curiousity"), "THE DIGITAL CRAFTSMAN" (not "CRAFTMAN").

---

# Reference Tone

Interstellar-inspired atmosphere — deep space, singularity, light bending around mass — reinterpreted with **original, non-copyrighted assets**: procedural particles, generic bloom/god-ray shaders, and an abstract glowing sphere (not a planet render, not a film-specific model). The feeling to chase is *"Netflix intro × Apple product launch × Interstellar's stillness,"* not a recreation of any specific frame from the film.

---

# Scene Breakdown (Compressed)

## Scene 1 — The Void (0s – 0.8s)
- Pure black space, camera at rest, then a very slow forward dolly
- Sparse field of tiny floating particles
- Soft blue nebula gradient fades in behind the particle field

## Scene 2 — The Singularity (0.8s – 1.6s)
- Glowing sphere forms at center screen, slow rotation, animated specular reflections
- Orbiting elements: faint code-fragment glyphs, binary particle drift, thin light streaks, 1–2 slim orbiting rings
- Restrained, not overloaded — expensive because of what it doesn't show

## Scene 3 — The Reveal (1.6s – 2.2s)
- Sphere morphs into the logo mark, soft white-blue glow, no hard edges
- Camera slowly zooms in, background particles accelerate slightly
- Brief freeze beat (~0.2s) before text begins — a breath, not a stall

---

# Text Intro — Precise Timing Table

No more vague "pause" beats. Each line's on-screen time is sized to its word count (roughly 180–220ms/word + a minimum floor), so short lines move briskly and longer lines get a touch more room — readable at a natural pace, never sluggish, never rushed. Lines crossfade into each other over ~200ms (overlapping, not additive).

| # | Line | Words | Display Time | Style | Window (from text-start) |
|---|---|---|---|---|---|
| 1 | "A Story Beyond Code." | 4 | 0.7s | White, subtle glow | 0.0s – 0.7s |
| 2 | "Where curiosity meets me..." | 4 | 0.7s | White, subtle glow | 0.7s – 1.4s |
| 3 | "I don't just build websites..." | 5 | 0.9s | White, subtle glow | 1.4s – 2.3s |
| 4 | "I direct digital experiences." | 4 | 0.7s | White, subtle glow | 2.3s – 3.0s |
| 5 | "They call me..." | 3 | 0.6s | White, subtle glow | 3.0s – 3.6s |
| 6 | **THE DIGITAL CRAFTSMAN** | 3 | 1.0s | Large reveal, full-width, brightest glow of the sequence | 3.6s – 4.6s |
| 7 | *"Muthu Rajesh T"* | 3 | 0.8s | **Dark, muted, no glow** — quiet close after the big moment | 4.6s – 5.4s |

**Text intro total: ~5.4 seconds** (down from the previous open-ended pacing)

---

# Mass Final Dialogue — Precise Timing

Appears as a stacked block, lines revealing in quick succession (150ms stagger between lines), then holding together briefly before the transition. The first line matches the muted treatment of the name above it.

| Line | Style | Timing |
|---|---|---|
| *"Every pixel has a purpose."* | **Dark, muted, no glow** | Reveals at 5.4s |
| "Every animation tells a story." | White, subtle glow | Reveals at 5.55s |
| "Every experience deserves a standing ovation." | White, subtle glow | Reveals at 5.7s |
| "Welcome to my universe." | White, slightly stronger glow (closing line) | Reveals at 5.85s |
| — full block hold — | | 5.85s – 6.5s |

---

# Final Transition — Into the Hero (6.5s – ~7.0s)

- Logo explodes into thousands of glowing particles (GPU instanced)
- Particles fly toward camera, accelerating
- Screen flashes to white briefly
- Cross-dissolve: loading canvas opacity drops to 0 while the Hero section (already mounted underneath) becomes visible
- No hard cut — Hero's own particle/spotlight system is already running underneath for a seamless handoff

**Total sequence: ~7.0 seconds end-to-end.**

---

# Color Treatment

| Token | Value | Used for |
|---|---|---|
| `--text-primary` | `#FFFFFF` with subtle glow (`text-shadow: 0 0 8px rgba(255,255,255,0.25)`) | All standard intro/dialogue lines |
| `--text-hero-glow` | `#FFFFFF` with stronger glow | "THE DIGITAL CRAFTSMAN" only |
| `--text-dark-muted` | `#4B5563` (slate), **no glow, no text-shadow** | "Muthu Rajesh T" and "Every pixel has a purpose." |

The two dark/muted lines are intentional low points in the brightness rhythm — they let the bright beats (the craftsman title, the closing "Welcome to my universe.") land harder by contrast.

---

# Animation & Rendering Requirements

| Concern | Approach |
|---|---|
| Camera & timeline choreography | GSAP timeline (`gsap.timeline()`), easing: `expo.inOut` throughout |
| Text line timing | GSAP timeline with explicit durations per the table above (not CSS animation-delay guessing) |
| UI text reveals, fades, scale-ins | Framer Motion |
| 3D scene (particles, sphere, logo morph) | React Three Fiber + Three.js |
| Postprocessing (bloom, god rays, DOF, lens flare) | `@react-three/postprocessing` (Bloom, DepthOfField, GodRays effect passes) |
| Particle system | Instanced `BufferGeometry` / `InstancedMesh`, capped count, GPU-driven |

---

# Session Behavior

Unchanged from prior spec — plays once per session via `sessionStorage`.

```javascript
const hasSeenIntro = sessionStorage.getItem('introPlayed');

if (!hasSeenIntro) {
  // play full ~7s sequence
  sessionStorage.setItem('introPlayed', 'true');
} else {
  // mount Hero directly, no loading sequence
}
```

---

# Performance Requirements

- Target **60 FPS** on desktop, degrade gracefully on mobile
- GPU-accelerated transforms only
- Particle counts capped and scaled down on lower-end/mobile devices
- Postprocessing reduced on mobile (keep Bloom, drop DOF/god rays on low-power devices)
- Respect `prefers-reduced-motion`: skip straight to a simplified fade-in of the logo + Hero
- Lazy-load the loader's Three.js/R3F bundle separately from the Hero's critical path

---

# Component Architecture (Suggested)

```
src/
  components/
    loader/
      LoadingSequence.jsx        # orchestrates scenes 1-3 + text + transition, GSAP timeline
      scenes/
        VoidScene.jsx
        SingularityScene.jsx
        LogoRevealScene.jsx
      TextIntro.jsx              # reads timing table as a data array, not hardcoded delays
      FinalDialogue.jsx
      ParticleExplosion.jsx
    hero/
      Hero.jsx
  hooks/
    useIntroSession.js
    useReducedMotion.js
  three/
    ParticleField.jsx
    GlowSphere.jsx
    LogoMesh.jsx
  data/
    introTimeline.js             # the timing table above, as structured data
```

---

# Checklist

- Scene 1–3 compressed to 2.2s total
- Text intro lines timed per table, total ~5.4s
- Mass dialogue staggered reveal + hold, ~1.1s
- "Muthu Rajesh T" and "Every pixel has a purpose." rendered dark/muted, no glow
- Final transition (~0.5–0.8s) seamlessly hands off to Hero
- Total sequence verified at ~7s, not open-ended
- sessionStorage skip logic tested
- Reduced-motion fallback in place
- 60 FPS verified on mid-tier device
