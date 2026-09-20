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
        <div className="ly-nav-inner">
          <Link href="/dashboard" className="ly-brand">Lishe Yetu</Link>
          <div className="ly-nav-links">
            <Link href="/dashboard">Home</Link>
            <Link href="/dashboard/chat">Chat</Link>
            <Link href="/dashboard/assessment">Assessment</Link>
            <Link href="/dashboard/appointments">Appointments</Link>
          </div>
          <form action={signOut}>
            <button className="ly-signout" type="submit">Sign out</button>
          </form>
        </div>
      </nav>
      <main className="ly-container">{children}</main>
    </div>
  )
}