'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)

  async function signIn() {
    setLoading(true); setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setOk(false); return setMessage(error.message) }
    router.push('/dashboard'); router.refresh()
  }
  async function signUp() {
    setLoading(true); setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) { setOk(false); return setMessage(error.message) }
    setOk(true); setMessage('Account created — you can sign in now.')
  }

  return (
    <div className="ly-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="ly-card" style={{ width: '100%', maxWidth: 400 }}>
        <h1 className="ly-h1">Patient Portal</h1>
        <p className="ly-sub">Sign in to Lishe Yetu, or create an account.</p>
        <div className="ly-field">
          <label className="ly-label">Email</label>
          <input className="ly-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="ly-field">
          <label className="ly-label">Password</label>
          <input className="ly-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button className="ly-btn ly-btn-green" onClick={signIn} disabled={loading} style={{ flex: 1 }}>Sign in</button>
          <button className="ly-btn ly-btn-outline" onClick={signUp} disabled={loading} style={{ flex: 1 }}>Create account</button>
        </div>
        {message && <p className={ok ? 'ly-ok' : 'ly-error'} style={{ marginTop: 14 }}>{message}</p>}
      </div>
    </div>
  )
}