# My Portfolio — Cinematic Credits

> A cinematic portfolio that showcases my journey as a software engineer, AI enthusiast, and full-stack developer through immersive design, interactive experiences, and meaningful projects.

Built like the opening scene of a film, not a résumé — a scroll-driven experience where every chapter reveals another part of the story, glowing lines carry the visitor from station to station, and a cinematic loading sequence sets the tone before the site even begins.

---

## ✨ Concept

This isn't a traditional "Home / About / Projects / Contact" portfolio. It's structured as a narrative:

```
Opening Credits → Backstory → Featured Scenes → Toolkit
→ Guest Appearances → Recognition → Behind the Scenes → Roll Credits
```

Projects are presented as numbered **Scenes**, hackathons as **Guest Appearances**, hobbies as **Behind the Scenes**, and the contact section closes as **Roll Credits** — each carrying its own motion language, color grade, and pacing, tied together by a single continuous 3D "line" the visitor travels along as they scroll.

The full design language — color palettes, motion effects, section-by-section animation planning, and the cinematic loading sequence — is documented in this repo:

- [`design.md`](./design.md) — color language, motion effects library, hero stage & chapter-transition system
- [`loading.md`](./loading.md) — the cinematic entry sequence spec (scenes, timing, transitions)
- [`content.md`](./content.md) — finalized portfolio copy, mapped to the narrative structure

---

## 🛠️ Tech Stack

| Category | Tech |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| Language | TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| 3D / Motion | [Three.js](https://threejs.org/) |
| Smooth Scrolling | [Lenis](https://github.com/darkroomengineering/lenis) |
| Backend / Data | [Firebase](https://firebase.google.com/) |
| Package Manager | pnpm |

---

## 🚀 Getting Started

**Prerequisites:** Node.js and [pnpm](https://pnpm.io/) installed.

```bash
# Clone the repository
git clone https://github.com/Rajesh-041/My_Portfolio_Rajesh.git
cd My_Portfolio_Rajesh

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The app runs at `http://localhost:5173` by default (or the host/port shown in your terminal — `dev` is configured with `--host 0.0.0.0` for network access).

### Other scripts

```bash
pnpm build      # Production build
pnpm preview    # Preview the production build locally
pnpm format     # Format code with oxfmt
```

---

## 📁 Project Structure

```
My_Portfolio_Rajesh/
├── src/                  # Application source
├── .opencode/skills/     # Custom OpenCode skills for this project
├── .figma/make/          # Figma Make project config
├── design.md             # Motion & color design system
├── loading.md            # Cinematic loading sequence spec
├── content.md             # Portfolio content, narrative-mapped
├── AGENTS.md             # Agent/AI assistant instructions for this repo
├── CLAUDE.md              # Claude-specific project instructions
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📌 Status

Actively in development — design system and content are finalized; the cinematic loading sequence, 3D chapter-transition system, and section components are being built out.

---

## 📬 Contact

**Muthu Rajesh T**
- Email: muthurajesht041@gmail.com
- LinkedIn: [linkedin.com/in/muthu-rajesh-t-8413853b0](https://www.linkedin.com/in/muthu-rajesh-t-8413853b0)
- GitHub: [@Rajesh-041](https://github.com/Rajesh-041)
