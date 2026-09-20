'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const CONDITIONS = ['High blood pressure', 'High cholesterol', 'Heart disease', 'Stroke', 'Kidney disease', 'Fatty liver', 'Sleep apnea / heavy snoring', 'Joint pain or arthritis', 'Gout', 'GERD / heartburn', 'PCOS', 'Thyroid disease', 'Gallstones', 'Depression or anxiety']
const SAFETY_FLAGS = ['Pancreatitis', 'Medullary thyroid cancer (personal or family)', 'MEN2 syndrome', 'Gallbladder removal', 'Diabetic eye disease', 'None / Not sure']
const MEDS = ['Metformin', 'Insulin', 'Sulphonylureas', 'SGLT2 inhibitors', 'DPP-4 inhibitors', 'GLP-1 injections (e.g. semaglutide, liraglutide)', 'None', 'Other']
const TRIED = ['Self-directed dieting', 'Commercial program', 'Dietitian-guided plan', 'Intermittent fasting', 'Low-carb or keto', 'Weight-loss medications', 'Herbal / slimming products', 'Gym or exercise program', 'Weight-loss surgery', 'None']
const GOALS = ['Better blood sugar control', 'Diabetes remission', 'Weight loss', 'Reduce medications', 'More energy', 'Less joint pain', 'Improve fertility', 'Improve confidence', 'Prevent complications']
const INTERESTS = ['Medications (including GLP-1 injections)', 'Nutrition & lifestyle program', 'Weight-loss (bariatric) surgery', 'Not sure — I would like guidance']

export default function AssessmentPage() {
  const supabase = createClient()
  const [f, setF] = useState<Record<string, any>>({ conditions: [], safety: [], meds: [], tried: [], goals: [], interests: [] })
  const [consent, setConsent] = useState(false)
  const [msg, setMsg] = useState(''); const [ok, setOk] = useState(false); const [loading, setLoading] = useState(false)

  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }))
  const toggle = (k: string, v: string) => setF(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x: string) => x !== v) : [...p[k], v] }))

  const chip = (k: string, v: string) => (
    <button type="button" key={v} onClick={() => toggle(k, v)}
      className={f[k].includes(v) ? 'ly-btn' : 'ly-btn ly-btn-outline'}
      style={{ padding: '7px 13px', fontSize: 13 }}>{v}</button>
  )

  async function submit() {
    if (!consent) { setOk(false); return setMsg('Please tick the consent box to continue.') }
    if (!f.name || !f.age) { setOk(false); return setMsg('Name and age are required.') }
    setLoading(true); setMsg('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); setOk(false); return setMsg('Please sign in again.') }
    const { error } = await supabase.from('assessments').insert({ user_id: user.id, answers: { ...f, consent: true }, status: 'submitted' })
    setLoading(false)
    if (error) { setOk(false); return setMsg(error.message) }
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'intake', data: { ...f } }),
    }).catch(() => {})
    setOk(true); setMsg('Thank you. Your intake has been submitted and our team will call you within 1 working day to book your first assessment.')
    setF({ conditions: [], safety: [], meds: [], tried: [], goals: [], interests: [] }); setConsent(false)
  }

  return (
    <div>
      <h1 className="ly-h1">First-Time Visit Intake</h1>
      <p className="ly-sub">This helps our team prepare for your first visit. It takes about 10 minutes and is seen only by your care team.</p>
      <div className="ly-card">

        {/* Demographics */}
        <h3 style={{ color: 'var(--ly-green)', margin: '0 0 14px' }}>About you</h3>
        <div className="ly-field"><label className="ly-label">Full name *</label><input className="ly-input" value={f.name || ''} onChange={e => set('name', e.target.value)} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="ly-field"><label className="ly-label">Age *</label><input className="ly-input" type="number" value={f.age || ''} onChange={e => set('age', e.target.value)} /></div>
          <div className="ly-field"><label className="ly-label">Sex</label>
            <select className="ly-select" value={f.sex || ''} onChange={e => set('sex', e.target.value)}>
              <option value="">Select…</option><option>Male</option><option>Female</option><option>Prefer not to say</option>
            </select>
          </div>
          <div className="ly-field"><label className="ly-label">Phone</label><input className="ly-input" value={f.phone || ''} onChange={e => set('phone', e.target.value)} /></div>
          <div className="ly-field"><label className="ly-label">County / Town</label><input className="ly-input" value={f.county || ''} onChange={e => set('county', e.target.value)} /></div>
        </div>
        <div className="ly-field"><label className="ly-label">Payment method</label>
          <select className="ly-select" value={f.payment || ''} onChange={e => set('payment', e.target.value)}>
            <option value="">Select…</option><option>SHA</option><option>Private insurance</option><option>Cash / M-Pesa</option><option>Corporate</option>
          </select>
        </div>

        {/* Medical history */}
        <h3 style={{ color: 'var(--ly-green)', margin: '24px 0 14px' }}>Medical history</h3>
        <div className="ly-field"><label className="ly-label">Have you been diagnosed with diabetes?</label>
          <select className="ly-select" value={f.diabetes || ''} onChange={e => set('diabetes', e.target.value)}>
            <option value="">Select…</option><option>Type 2 diabetes</option><option>Prediabetes</option><option>Type 1 diabetes</option><option>No</option><option>Not sure</option>
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="ly-field"><label className="ly-label">How long have you had it?</label>
            <select className="ly-select" value={f.diabetes_duration || ''} onChange={e => set('diabetes_duration', e.target.value)}>
              <option value="">Select…</option><option>Less than 1 year</option><option>1–5 years</option><option>6–10 years</option><option>Over 10 years</option>
            </select>
          </div>
          <div className="ly-field"><label className="ly-label">Most recent HbA1c (%), if known</label><input className="ly-input" value={f.hba1c || ''} onChange={e => set('hba1c', e.target.value)} /></div>
        </div>
        <div className="ly-field">
          <label className="ly-label">Which diabetes or weight medicines do you take now?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{MEDS.map(v => chip('meds', v))}</div>
        </div>
        <div className="ly-field">
          <label className="ly-label">Do you have any of these conditions?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{CONDITIONS.map(v => chip('conditions', v))}</div>
        </div>
        <div className="ly-field">
          <label className="ly-label">Have you ever had any of these? (important for medication safety)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{SAFETY_FLAGS.map(v => chip('safety', v))}</div>
        </div>
        <div className="ly-field"><label className="ly-label">Allergies (medicines, foods) *</label><input className="ly-input" value={f.allergies || ''} onChange={e => set('allergies', e.target.value)} /></div>
        <div className="ly-field"><label className="ly-label">(If applicable) Are you pregnant, breastfeeding, or planning pregnancy in the next 12 months?</label>
          <select className="ly-select" value={f.pregnancy || ''} onChange={e => set('pregnancy', e.target.value)}>
            <option value="">Select / not applicable…</option><option>Yes</option><option>No</option><option>Not sure</option>
          </select>
        </div>

        {/* Weight & lifestyle */}
        <h3 style={{ color: 'var(--ly-green)', margin: '24px 0 14px' }}>Weight &amp; lifestyle</h3>
        <p style={{ fontSize: 13, color: 'var(--ly-muted)', margin: '0 0 14px' }}>There are no right or wrong answers here. Your honest answers help us support you better.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="ly-field"><label className="ly-label">Current weight (kg), if known</label><input className="ly-input" type="number" value={f.weight_kg || ''} onChange={e => set('weight_kg', e.target.value)} /></div>
          <div className="ly-field"><label className="ly-label">Height (cm), if known</label><input className="ly-input" type="number" value={f.height_cm || ''} onChange={e => set('height_cm', e.target.value)} /></div>
        </div>
        <div className="ly-field">
          <label className="ly-label">Which approaches have you tried before?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{TRIED.map(v => chip('tried', v))}</div>
        </div>
        <div className="ly-field"><label className="ly-label">Typical physical activity</label>
          <select className="ly-select" value={f.activity || ''} onChange={e => set('activity', e.target.value)}>
            <option value="">Select…</option><option>Mostly sitting</option><option>Light (walking some days)</option><option>Moderate (2–3x/week)</option><option>Active (4+ times/week)</option>
          </select>
        </div>
        <div className="ly-field"><label className="ly-label">Average sleep per night</label>
          <select className="ly-select" value={f.sleep || ''} onChange={e => set('sleep', e.target.value)}>
            <option value="">Select…</option><option>Under 5 hrs</option><option>5–6 hrs</option><option>7–8 hrs</option><option>Over 8 hrs</option>
          </select>
        </div>

        {/* Goals */}
        <h3 style={{ color: 'var(--ly-green)', margin: '24px 0 14px' }}>Your goals</h3>
        <div className="ly-field">
          <label className="ly-label">What are your main goals?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{GOALS.map(v => chip('goals', v))}</div>
        </div>
        <div className="ly-field">
          <label className="ly-label">Which treatment options would you like to learn about?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{INTERESTS.map(v => chip('interests', v))}</div>
        </div>
        <div className="ly-field"><label className="ly-label">Anything else you would like us to know?</label><textarea className="ly-textarea" rows={3} value={f.notes || ''} onChange={e => set('notes', e.target.value)} /></div>

        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--ly-muted)', margin: '6px 0 16px' }}>
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: 3 }} />
          <span>I consent to Lishe Yetu collecting and using my health information to plan my care, in line with the Data Protection Act, 2019. I can request its deletion at any time.</span>
        </label>
        <button className="ly-btn" onClick={submit} disabled={loading}>{loading ? 'Submitting…' : 'Submit intake'}</button>
        {msg && <p className={ok ? 'ly-ok' : 'ly-error'} style={{ marginTop: 14 }}>{msg}</p>}

        <p style={{ fontSize: 12, color: 'var(--ly-muted)', marginTop: 16 }}>This form is not monitored in real time. For urgent medical concerns, call your nearest emergency department.</p>
      </div>
    </div>
  )
}
