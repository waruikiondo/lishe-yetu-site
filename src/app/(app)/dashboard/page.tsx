import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const tiles = [
  { href: '/dashboard/chat', title: 'Nutrition Chat', desc: 'Ask questions about healthy eating and get instant, practical answers.' },
  { href: '/dashboard/assessment', title: 'Nutrition Assessment', desc: 'Complete your assessment to get a personalised meal plan.' },
  { href: '/dashboard/appointments', title: 'Book a Consultation', desc: 'Request an appointment with a Lishe Yetu clinician.' },
]

export default async function DashboardHome() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return (
    <div>
      <h1 className="ly-h1">Karibu 👋</h1>
      <p className="ly-sub">Signed in as {user?.email}. What would you like to do today?</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
        {tiles.map(t => (
          <Link key={t.href} href={t.href} className="ly-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <h3 style={{ margin: '0 0 8px', color: 'var(--ly-green)', fontSize: 18 }}>{t.title}</h3>
            <p style={{ margin: 0, color: 'var(--ly-muted)', fontSize: 14 }}>{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}