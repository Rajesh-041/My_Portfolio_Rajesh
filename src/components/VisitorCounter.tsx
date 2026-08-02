import { useEffect, useState } from 'react'
import { doc, increment, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function VisitorCounter({ show }: { show?: boolean }) {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const ref = doc(db, 'visitors', 'count')

    // Only count the visitor once per browser session
    if (!localStorage.getItem('mrt_visited')) {
      setDoc(ref, { total: increment(1) }, { merge: true }).catch(() => {})
      localStorage.setItem('mrt_visited', '1')
    }

    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) setCount(snap.data().total || 0)
      },
      () => {}
    )
    return () => unsub()
  }, [])

  return (
    <div
      className="visitor-chip"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.45rem 1.1rem',
        borderRadius: '999px',
        border: '1px solid rgba(48,193,226,0.35)',
        background: 'rgba(48,193,226,0.06)',
        backdropFilter: 'blur(6px)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.8s ease 1.3s, transform 0.8s ease 1.3s',
      }}
    >
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#30C1E2',
          boxShadow: '0 0 10px #30C1E2, 0 0 22px #30C1E2',
          animation: 'glowPulse 2.4s ease-in-out infinite',
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          fontFamily: 'monospace',
          color: '#8FE3F5',
          textTransform: 'uppercase',
          textShadow: '0 0 12px rgba(48,193,226,0.6)',
        }}
      >
        {count.toLocaleString('en-US')} people on set
      </span>
    </div>
  )
}