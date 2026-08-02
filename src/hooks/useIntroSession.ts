const KEY = 'cinematicIntroPlayed'

export function hasSeenIntro() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* ignore */
  }
}