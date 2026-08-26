'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Appt = { id: string; requested_for: string | null; reason: string | null; status: string; created_at: string }

export default function AppointmentsPage() {
  const supabase = createClient()
  const [when, setWhen] = useState(''); const [reason, setReason] = useState('')
  const [list, setList] = useState<Appt[]>([])
  const [msg, setMsg] = useState(''); const [ok, setOk] = useState(false); const [loading, setLoading] = useState(false)

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('appointments').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if (data) setList(data as Appt[])
  }
  useEffect(() => { load() /* eslint-disable-next-line */ }, [])

  async function submit() {
    if (!reason.trim()) { setOk(false); return setMsg('Please tell us the reason for your visit.') }
    setLoading(true); setMsg('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return setMsg('Please sign in again.') }
    const { error } = await supabase.from('appointments').insert({ user_id: user.id, reason, requested_for: when ? new Date(when).toISOString() : null, status: 'requested' })
    setLoading(false)
    if (error) { setOk(false); return setMsg(error.message) }
    setOk(true); setMsg('Request sent. We will confirm your appointment soon.')
    setReason(''); setWhen(''); load()
  }

  return (
    <div>
      <h1 className="ly-h1">Book a Consultation</h1>
      <p className="ly-sub">Request time with a Lishe Yetu nutrition clinician.</p>
      <div className="ly-card" style={{ marginBottom: 20 }}>
        <div className="ly-field"><label className="ly-label">Preferred date & time</label><input className="ly-input" type="datetime-local" value={when} onChange={e => setWhen(e.target.value)} /></div>
        <div className="ly-field"><label className="ly-label">Reason for visit *</label><textarea className="ly-textarea" rows={3} value={reason} onChange={e => setReason(e.target.value)} /></div>
        <button className="ly-btn" onClick={submit} disabled={loading}>{loading ? 'Sending…' : 'Request appointment'}</button>
        {msg && <p className={ok ? 'ly-ok' : 'ly-error'} style={{ marginTop: 14 }}>{msg}</p>}
      </div>
      {list.length > 0 && (
        <div className="ly-card">
          <h3 style={{ margin: '0 0 12px', color: 'var(--ly-green)' }}>Your requests</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {list.map(a => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid var(--ly-line)', paddingBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{a.reason}</div>
                  <div style={{ fontSize: 13, color: 'var(--ly-muted)' }}>{a.requested_for ? new Date(a.requested_for).toLocaleString() : 'No preferred time'}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ly-gold-dark)', textTransform: 'capitalize' }}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}