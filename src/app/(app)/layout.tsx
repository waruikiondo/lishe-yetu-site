import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="ly-shell">
      <nav className="ly-nav">
        <div className="ly-container" style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 14, paddingBottom: 14 }}>
          <Link href="/dashboard" style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>Lishe Yetu</Link>
          <div style={{ display: 'flex', gap: 16, flex: 1, fontSize: 15 }}>
            <Link href="/dashboard">Home</Link>
            <Link href="/dashboard/chat">Chat</Link>
            <Link href="/dashboard/assessment">Assessment</Link>
            <Link href="/dashboard/appointments">Appointments</Link>
          </div>
          <form action={signOut}>
            <button className="ly-btn ly-btn-outline" style={{ borderColor: '#fff', color: '#fff', padding: '7px 14px' }}>Sign out</button>
          </form>
        </div>
      </nav>
      <main className="ly-container">{children}</main>
    </div>
  )
}