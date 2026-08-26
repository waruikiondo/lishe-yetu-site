'use client'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Msg = { role: 'user' | 'assistant'; content: string }

export default function ChatPage() {
  const supabase = createClient()
  const [userId, setUserId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)
      const { data } = await supabase.from('messages').select('role,content').eq('user_id', user.id).order('created_at', { ascending: true })
      if (data && data.length) setMessages(data as Msg[])
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading || !userId) return
    setInput('')
    const next = [...messages, { role: 'user' as const, content: text }]
    setMessages(next); setLoading(true)
    await supabase.from('messages').insert({ user_id: userId, role: 'user', content: text })
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next }) })
      const data = await res.json()
      const reply: string = data.reply ?? 'Sorry, something went wrong.'
      setMessages(m => [...m, { role: 'assistant', content: reply }])
      await supabase.from('messages').insert({ user_id: userId, role: 'assistant', content: reply })
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Network error — please try again.' }])
    } finally { setLoading(false) }
  }

  return (
    <div>
      <h1 className="ly-h1">Nutrition Chat</h1>
      <p className="ly-sub">General nutrition guidance. Not a substitute for medical advice.</p>
      <div className="ly-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ height: '52vh', overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.length === 0 && (
            <p style={{ color: 'var(--ly-muted)', margin: 'auto', textAlign: 'center', maxWidth: 320 }}>
              Ask me anything about healthy eating, local foods, or food safety.
            </p>
          )}
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%',
              background: m.role === 'user' ? 'var(--ly-green)' : '#eef1e6',
              color: m.role === 'user' ? '#fff' : 'var(--ly-ink)',
              padding: '10px 14px', borderRadius: 14, whiteSpace: 'pre-wrap', lineHeight: 1.5, fontSize: 15,
            }}>{m.content}</div>
          ))}
          {loading && <div style={{ alignSelf: 'flex-start', color: 'var(--ly-muted)', fontSize: 14 }}>Thinking…</div>}
          <div ref={endRef} />
        </div>
        <div style={{ display: 'flex', gap: 10, padding: 14, borderTop: '1px solid var(--ly-line)', background: '#fafaf5' }}>
          <input className="ly-input" value={input} placeholder="Type your question…"
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); send() } }} />
          <button className="ly-btn" onClick={send} disabled={loading || !input.trim()}>Send</button>
        </div>
      </div>
    </div>
  )
}