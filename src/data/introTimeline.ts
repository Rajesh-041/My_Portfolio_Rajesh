// Slowed-down cinematic intro timing (absolute ms from sequence start)
export const SCENE_SECONDS = 6 // scenes 1-3 (slow dolly)
export const TOTAL_MS = 21500

export const TEXT_LINES = [
  { id: 1, text: 'A Story Beyond Code.', from: 0, to: 2800, style: 'glow' },
  { id: 2, text: 'Directed by CURIOUSITY', from: 2800, to: 5200, style: 'glow' },
  { id: 3, text: "I don't just build websites...", from: 5200, to: 7800, style: 'glow' },
  { id: 4, text: 'I direct digital experiences.', from: 7800, to: 10400, style: 'glow' },
  { id: 5, text: 'They call me...', from: 10400, to: 12000, style: 'glow' },
  { id: 6, text: 'THE DIGITAL CRAFTSMAN', from: 12000, to: 15500, style: 'hero' },
  { id: 7, text: 'Muthu Rajesh T', from: 15500, to: 17500, style: 'muted' },
]

export const DIALOGUE = [
  { text: 'Every pixel has a purpose.', at: 17500, style: 'muted' },
  { text: 'Every animation tells a story.', at: 18200, style: 'glow' },
  { text: 'Every experience deserves a standing ovation.', at: 18900, style: 'glow' },
  { text: 'Welcome to my universe.', at: 19600, style: 'muted' },
]

export const TRANSITION_START = 20500 // cross-dissolve begins
export const TRANSITION_DURATION = 800 // ms — must match CSS opacity transition
export const HOLD_END = 20500
export const COMPLETE_MS = 21500 // onComplete fires after the loader has fully faded