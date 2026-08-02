# Design.md — Motion & Color Language

> **Project:** Cinematic Credits Portfolio
>
> **Portfolio Owner:** Muthu Rajesh
>
> **Theme:** AI × Cinema × Engineering
>
> **Companion to:** Phase 1 (Personal Branding) & Phase 2 (Experience Architecture)
>
> **Objective**
>
> Give every section of the portfolio a named, deliberate visual technique and a defined color language — so nothing in development is improvised. This document is the "cinematography notes" that sit underneath the story flow already planned in Phase 2.

---

# Design Philosophy

A film has a director of photography and a colorist. This portfolio needs the same discipline.

Every scene (section) should already know:

- What **color** it lives in
- What **motion** introduces it
- What **motion** it uses while the visitor is inside it
- What **motion** closes it before the next scene begins

Nothing is decoration. If an effect doesn't serve the story being told in that section, it doesn't belong there.

---

# Color Language

Rather than one fixed palette everywhere, the portfolio uses **one dominant base grammar** (Neon Noir) plus **four alternate palettes** that can be used to color-grade individual "scenes" (projects), the way a film shifts its color grading between chapters while staying visually unified by grain, contrast, and framing.

## 1. Neon Noir — *Primary / Global Brand*

| Role | Hex |
|---|---|
| Background | `#0A0A0A` |
| Primary Glow | `#FFFE1E` |
| Secondary Accent | `#30C1E2` |
| Body Text | `#B8B8B8` |
| Panel | `#151515` |

Mood: confident, marquee, spotlight. **Use for:** Hero, Nav, Contact, global chrome.

## 2. Midnight Thriller — *Alt Palette*

| Role | Hex |
|---|---|
| Background | `#0D0D12` |
| Accent | `#C81E3A` (crimson) |
| Secondary | `#C9A24B` (aged gold) |
| Text | `#CFCFD6` |

Mood: tension, high-stakes engineering problems. **Use for:** "Backstory" or a project about security/AI (e.g. SafeGuard AI).

## 3. Sci-Fi Archive — *Alt Palette*

| Role | Hex |
|---|---|
| Background | `#111417` (charcoal) |
| Accent | `#3E8EF7` (electric blue) |
| Secondary | `#F2A93B` (amber) |
| Text | `#C4C9CE` |

Mood: Blade Runner archive terminal, technical, systems-thinking. **Use for:** Toolkit / GitHub / architecture-heavy project breakdowns.

## 4. Warm Film Reel — *Alt Palette*

| Role | Hex |
|---|---|
| Background | `#1A1512` (warm black) |
| Accent | `#D97B3F` (burnt orange) |
| Secondary | `#EFE1C6` (cream) |
| Text | `#C9BFAE` |

Mood: nostalgic, analog, personal — old film stock. **Use for:** Journey / Timeline (your growth story feels human here, not neon).

## 5. Analog Dream — *Alt Palette*

| Role | Hex |
|---|---|
| Background | `#120C1E` (deep purple-black) |
| Accent | `#E339B5` (magenta) |
| Secondary | `#4BD8E0` (soft cyan) |
| Text | `#CBC3D9` |

Mood: synthwave, dreamlike, creative-side of engineering. **Use for:** a more experimental/creative project (e.g. HomeChef Connect, MERGIFY) as a change of "scene lighting."

**Rule of restraint (unchanged from Phase 1):** within any single palette, one accent leads and the second is used sparingly — never two accents at full glow in the same viewport.

---

# Cinematic Motion Effects Library

A reference catalogue of named techniques. Each section in Phase 2's Animation Planning gets its moves picked from this list — nothing vague like "Fade" or "Glow" without a specific implementation name attached.

## A. Text & Typography Motion
- **SplitText character/word stagger reveal** — letters rise in individually, staggered ~20–40ms apart
- **Clip-path wipe reveal** — text masked behind a moving edge, revealed like a curtain opening
- **Blur-to-focus reveal** — text starts blurred + low opacity, sharpens into place
- **Kinetic typography line sequencing** — lines of text animate in/out like a monologue, one at a time
- **Glitch-in reveal** — brief RGB-split/jitter before text settles (used sparingly, high-impact moments only)
- **Typewriter reveal** — character-by-character reveal with a blinking cursor, for short taglines only
- **Marquee scroll banner** — looping horizontal text strip (good for a skills ticker)

## B. Scroll-Driven Motion
- **ScrollTrigger pinning** (GSAP) — section locks in place while internal content animates
- **Scroll-scrubbed animation** — animation timeline directly tied to scroll position (not time)
- **Horizontal scroll hijack** — vertical scroll converted to horizontal movement through project cards
- **Parallax depth layering** — background/midground/foreground move at different scroll speeds
- **Scroll-triggered video scrubbing** — a video's playhead is scrubbed by scroll position, not autoplay
- **Sticky scroll storytelling** — text pinned on one side while visuals change on the other as user scrolls

## C. Transitions Between Scenes
- **Iris wipe** — circular reveal/hide, like an old film scene change
- **Letterbox bars** — black horizontal bars slide in/out to frame a "cinematic mode" moment
- **Curtain/panel wipe** — solid color panels slide across to transition sections
- **Cross-dissolve** — soft opacity cross-fade between two scenes
- **SVG shape morph** (MorphSVG) — one shape fluidly morphs into another across a transition
- **Page curl / peel transition** — used sparingly, for a distinctly "chapter turn" moment

## D. Cursor & Micro-Interactions
- **Magnetic button** — button visually pulls toward the cursor as it approaches
- **Custom cursor with mix-blend-mode** — cursor inverts colors of whatever it's over
- **Spotlight/flashlight cursor** — dark overlay with a radial cutout following the cursor, revealing content underneath
- **Cursor trail/blob (metaball) effect** — soft trailing blob follows cursor movement
- **Tilt/3D hover (perspective tilt)** — cards tilt in 3D based on cursor position (react-parallax-tilt style)
- **Liquid/elastic button morph** — button shape stretches elastically on press/hover

## E. 3D & WebGL (Three.js)
- **Particle field background** — floating ambient particles reacting subtly to scroll/cursor
- **Shader noise background** — animated GLSL noise/gradient as an ambient backdrop
- **Displacement-map image distortion** — hover ripples/distorts an image via a displacement shader
- **3D object rotation on scroll** — e.g. a 3D laptop/device mockup rotates as user scrolls through a project
- **Scroll-driven camera path** — a Three.js camera moves through a 3D scene as the page scrolls
- **Depth-of-field blur transitions** — foreground/background blur shift to simulate camera focus pulls

## F. Film-Grade Atmosphere Effects
- **Film grain overlay** (animated, subtle, looping noise texture)
- **Vignette** — soft edge darkening to focus the eye centrally
- **Chromatic aberration on scroll/hover** — subtle RGB channel split for a "lens" feel
- **Light leak overlay** — soft color streaks crossing the screen at key transitions (use once, at hero entrance)
- **Lens flare accent** — small flare following key light-source elements
- **Scanline overlay** — very subtle horizontal lines for a "screen" texture (used only in a retro-themed scene, e.g. Analog Dream palette)
- **Projector flicker intro** — brief flicker/frame-jitter before the hero settles, simulating a projector starting up

## G. Data & Counter Motion
- **Animated counter / count-up** — GitHub stats, CGPA, years of experience counting up on scroll into view
- **Contribution heatmap reveal** — GitHub heatmap cells fill in sequence, left to right
- **Progress line draw-in** (SVG stroke-dashoffset animation) — skill bars/timelines draw themselves

---

# Updated Animation Planning (Named Techniques Per Scene)

Replacing the generic list in Phase 2 with specific techniques from the library above:

## Hero — *Neon Noir*
- Projector flicker intro → SplitText stagger reveal on name → glow pulse settle
- Particle field background (ambient, slow)
- Mouse parallax on background particles
- Scroll cue: subtle bounce + fade loop

## Backstory — *Midnight Thriller*
- Clip-path wipe reveal on section entry
- Blur-to-focus reveal for personal narrative text
- Light leak overlay, once, at section transition in

## Journey — *Warm Film Reel*
- Sticky scroll storytelling (timeline pinned, content changes beside it)
- SVG stroke-dashoffset draw-in for the timeline path
- Film grain overlay (constant, subtle) — this section should feel the most "human" and analog

## Featured Scenes / Projects — *Alt palette per project*
- Horizontal scroll hijack through project cards
- Tilt/3D hover on project cards
- Scroll-triggered video scrubbing for project preview clips
- Iris wipe when entering full project case-study view
- Displacement-map distortion on project hero images (hover)

## Toolkit — *Sci-Fi Archive*
- Particle field / shader noise background
- Staggered fade-up for skill groups
- Progress line draw-in for proficiency indicators

## GitHub — *Sci-Fi Archive*
- Contribution heatmap reveal (sequenced fill)
- Animated counters for stats
- Repository cards: magnetic hover + tilt

## Recognition — *Neon Noir*
- Cross-dissolve entry
- Count-up animation for CGPA/achievement numbers

## Contact — *Neon Noir*
- Magnetic buttons
- Custom cursor with mix-blend-mode over the contact block
- Spotlight cursor effect revealing contact details as user moves mouse

---

# Build Spec: Hero Stage & Chapter-Transition System

> This section is the implementation-ready spec for the two systems that anchor the entire site: the Hero's cinematic stage, and the global "Line" that carries the visitor from chapter to chapter like a train moving station to station — with no train, only the line moving through 3D space.

## 1. Hero Section — Cinematic Stage

- Full-viewport dark stage background built in Three.js (or a WebGL shader canvas): subtle volumetric light rays / spotlight cone falling on center stage, ambient floating dust-particle field reacting gently to mouse movement (parallax), animated low-opacity film-grain noise overlay, soft vignette darkening the edges.
- On load: a **projector-flicker intro** (brief frame jitter/flash) before the stage "lights up."
- As the user scrolls past the hero, the stage doesn't just disappear — the spotlight cone widens and the particle field pulls back like a camera dollying out, revealing the portfolio intro details (name, tagline, short bio line) via a **staggered SplitText character/word reveal** synced to scroll position (GSAP ScrollTrigger scrub, not time-based).
- Scroll cue at the bottom: subtle pulsing glow, not a generic bounce arrow.

## 2. Global Chapter-Transition System — "The Line"

- Render a single continuous curved line/path in 3D space (Three.js `TubeGeometry` or a glowing `CatmullRomCurve3` line) running through the entire page's depth — this is the "track."
- The camera (or a scroll-linked 3D scene) moves along this path as the user scrolls, exactly like ScrollTrigger scrubbing a camera position/rotation along a spline — no vehicle, just the viewer's perspective gliding along the line.
- Each chapter/section (Backstory, Featured Scenes, Toolkit, Guest Appearances, Recognition, Behind the Scenes, Roll Credits) is a **"station"** — a point along the curve where the camera slows, pauses/settles, and the 2D content for that chapter fades/reveals into view, layered over or beside the 3D line.
- Between stations, the line should visibly glow brighter along the segment currently being traveled (an animated gradient/dash-offset traveling along the tube), reinforcing motion even though there's no literal object moving.
- Transition into each station: soft camera-ease (no linear scroll, always eased/damped motion — use **Lenis** for inertial scrolling), combined with a light depth-of-field blur pulse as the camera arrives, then sharpens into focus.
- Add a thin, minimal progress indicator (a dot moving along a mini version of the line) fixed in a corner, showing which "station" the visitor is at.

## 3. Advanced Effects to Use Where Appropriate

- SplitText stagger reveals for headlines
- Scroll-scrubbed camera movement (not scroll-jacking full sections abruptly — smooth continuous motion)
- Parallax depth layering for background elements at each station
- Chromatic aberration / light-leak flash only at major transitions (hero → backstory, and the final station → contact) — used sparingly for impact
- Magnetic buttons and tilt-hover cards within stations (e.g. Toolkit cards, Featured Scenes cards)
- Film grain + vignette persistent globally, low opacity

## 4. Tech Stack (This System)

- **React + Three.js (React Three Fiber)** for the 3D line/camera system
- **GSAP + ScrollTrigger** for scroll-scrubbed animation and SplitText reveals
- **Lenis** for smooth/inertial scrolling
- Keep the 3D scene performant: instance/reuse geometry, cap particle count, and provide a **reduced-motion fallback** (static line, standard section fades) for mobile/low-power devices or `prefers-reduced-motion`.

## Deliverable

A scrollable single-page React app where scrolling feels like riding along a glowing line through a dark cinematic space, arriving at each portfolio chapter as a lit "station," with the hero stage as the opening scene.

---

# Technical Stack for Implementation

| Need | Tool |
|---|---|
| Scroll-driven animation, pinning, scrubbing | **GSAP + ScrollTrigger** |
| Character/word text splitting | **GSAP SplitText** |
| Shape morphing | **GSAP MorphSVG** |
| Smooth/inertial scrolling | **Lenis** (or Locomotive Scroll) |
| 3D scenes, particles, shaders | **Three.js** (+ React Three Fiber if using React) |
| Custom shaders (noise, displacement) | **GLSL** via Three.js `ShaderMaterial` |
| Tilt/3D hover cards | **vanilla-tilt.js** or custom transform logic |
| State-based layout transitions | **GSAP Flip plugin** |

---

# Checklist (Design.md Specific)

- Primary palette (Neon Noir) confirmed
- Alt palettes assigned to correct scenes
- Every Phase 2 section has named motion techniques (not generic terms)
- No section uses more than 3–4 named effects (avoid overload)
- Film-grade atmosphere effects (grain, vignette) applied globally, sparingly
- Technical stack mapped to each effect category

---

# Exit Criteria

Ready for Phase 3 (Figma design system) only if:

- Every section in Phase 2's sitemap has a specific color palette assigned
- Every section has specific, named motion techniques (traceable to a library entry above)
- No effect exists without a section-story reason to exist
- The technical stack for every named effect is known before design begins in Figma
