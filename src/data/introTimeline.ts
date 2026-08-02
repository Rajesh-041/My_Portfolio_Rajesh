// Precise timing table from loading.md v2 (absolute ms from sequence start)
export const SCENE_SECONDS = 3.4 // scenes 1-3 (slowed)
export const TOTAL_MS = 11000

export const TEXT_LINES = [
  { id: 1, text: 'A Story Beyond Code.', from: 0, to: 1300, style: 'glow' },
  { id: 2, text: 'Where curiosity meets me...', from: 1300, to: 2400, style: 'glow' },
  { id: 3, text: "I don't just build websites...", from: 2400, to: 3900, style: 'glow' },
  { id: 4, text: 'I direct digital experiences.', from: 3900, to: 5000, style: 'glow' },
  { id: 5, text: 'They call me...', from: 5000, to: 5900, style: 'glow' },
  { id: 6, text: 'THE DIGITAL CRAFTSMAN', from: 5900, to: 7600, style: 'hero' },
  { id: 7, text: 'Muthu Rajesh T', from: 7600, to: 8600, style: 'muted' },
]

export const DIALOGUE = [
  { text: 'Every pixel has a purpose.', at: 8600, style: 'muted' },
  { text: 'Every animation tells a story.', at: 8800, style: 'glow' },
  { text: 'Every experience deserves a standing ovation.', at: 9000, style: 'glow' },
  { text: 'Welcome to my universe.', at: 9200, style: 'muted' },
]

export const TRANSITION_START = 9500 // cross-dissolve begins (no white flash)
export const TRANSITION_DURATION = 550 // ms — must match CSS opacity transition
export const HOLD_END = 9500
export const COMPLETE_MS = 10400 // onComplete fires after the loader has fully faded