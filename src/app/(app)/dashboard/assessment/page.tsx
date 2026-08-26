'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const GOALS = ['Weight loss', 'Weight gain', 'Glycemic control', 'Hypertension control', 'Lipid lowering', 'Renal protection', 'Digestive health', 'Sports performance']

export default function AssessmentPage() {
  const supabase = createClient()
  const [f, setF] = useState<Record<string, any>>({ goals: [] })
  const [consent, setConsent] = useState(false)
  const [msg, setMsg] = useState(''); const [ok, setOk] = useState(false); const [loading, setLoading] = useState(false)

  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }))
  const toggleGoal = (g: string) => setF(p => ({ ...p, goals: p.goals.includes(g) ? p.goals.filter((x: string) => x !== g) : [...p.goals, g] }))

  async function submit() {
    if (!consent) { setOk(false); return setMsg('Please tick the consent box to continue.') }
    if (!f.name || !f.age) { setOk(false); return setMsg('Name and age are required.') }
    setLoading(true); setMsg('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); setOk(false); return setMsg('Please sign in again.') }
    const { error } = await supabase.from('assessments').insert({ user_id: user.id, answers: { ...f, consent: true }, status: 'submitted' })
    setLoading(false)
    if (error) { setOk(false); return setMsg(error.message) }
    setOk(true); setMsg('Assessment submitted. A clinician will review it and follow up.')
    setF({ goals: [] }); setConsent(false)
  }

  return (
    <div>
      <h1 className="ly-h1">Nutrition Assessment</h1>
      <p className="ly-sub">This helps our clinicians create a personalised meal plan for you.</p>
      <div className="ly-card">
        <div className="ly-field"><label className="ly-label">Full name *</label><input className="ly-input" value={f.name || ''} onChange={e => set('name', e.target.value)} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="ly-field"><label className="ly-label">Age *</label><input className="ly-input" type="number" value={f.age || ''} onChange={e => set('age', e.target.value)} /></div>
          <div className="ly-field"><label className="ly-label">Sex</label>
            <select className="ly-select" value={f.sex || ''} onChange={e => set('sex', e.target.value)}>
              <option value="">Select…</option><option>Male</option><option>Female</option><option>Prefer not to say</option>
            </select>
          </div>
          <div className="ly-field"><label className="ly-label">Height (cm)</label><input className="ly-input" type="number" value={f.height_cm || ''} onChange={e => set('height_cm', e.target.value)} /></div>
          <div className="ly-field"><label className="ly-label">Weight (kg)</label><input className="ly-input" type="number" value={f.weight_kg || ''} onChange={e => set('weight_kg', e.target.value)} /></div>
          <div className="ly-field"><label className="ly-label">Phone</label><input className="ly-input" value={f.phone || ''} onChange={e => set('phone', e.target.value)} /></div>
        </div>
        <div className="ly-field"><label className="ly-label">Primary diagnosis / conditions</label><textarea className="ly-textarea" rows={2} value={f.primary_diagnosis || ''} onChange={e => set('primary_diagnosis', e.target.value)} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="ly-field"><label className="ly-label">HbA1c (%)</label><input className="ly-input" value={f.hba1c || ''} onChange={e => set('hba1c', e.target.value)} /></div>
          <div className="ly-field"><label className="ly-label">Fasting glucose (mmol/L)</label><input className="ly-input" value={f.fasting_glucose || ''} onChange={e => set('fasting_glucose', e.target.value)} /></div>
        </div>
        <div className="ly-field">
          <label className="ly-label">Nutrition goals</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {GOALS.map(g => (
              <button type="button" key={g} onClick={() => toggleGoal(g)}
                className={f.goals.includes(g) ? 'ly-btn' : 'ly-btn ly-btn-outline'}
                style={{ padding: '7px 13px', fontSize: 13 }}>{g}</button>
            ))}
          </div>
        </div>
        <div className="ly-field"><label className="ly-label">Food allergies / intolerances</label><input className="ly-input" value={f.allergies || ''} onChange={e => set('allergies', e.target.value)} /></div>
        <div className="ly-field"><label className="ly-label">Typical breakfast</label><input className="ly-input" value={f.breakfast || ''} onChange={e => set('breakfast', e.target.value)} /></div>
        <div className="ly-field"><label className="ly-label">Typical lunch</label><input className="ly-input" value={f.lunch || ''} onChange={e => set('lunch', e.target.value)} /></div>
        <div className="ly-field"><label className="ly-label">Typical dinner</label><input className="ly-input" value={f.dinner || ''} onChange={e => set('dinner', e.target.value)} /></div>
        <div className="ly-field"><label className="ly-label">Activity level</label>
          <select className="ly-select" value={f.activity_level || ''} onChange={e => set('activity_level', e.target.value)}>
            <option value="">Select…</option><option>Sedentary</option><option>Light</option><option>Moderate</option><option>Heavy</option>
          </select>
        </div>
        <div className="ly-field"><label className="ly-label">Additional notes</label><textarea className="ly-textarea" rows={3} value={f.notes || ''} onChange={e => set('notes', e.target.value)} /></div>
        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--ly-muted)', margin: '6px 0 16px' }}>
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: 3 }} />
          <span>I consent to Lishe Yetu storing this health information to provide nutrition care. I can request its deletion at any time.</span>
        </label>
        <button className="ly-btn" onClick={submit} disabled={loading}>{loading ? 'Submitting…' : 'Submit assessment'}</button>
        {msg && <p className={ok ? 'ly-ok' : 'ly-error'} style={{ marginTop: 14 }}>{msg}</p>}
      </div>
    </div>
  )
}