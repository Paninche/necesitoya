'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [type, setType] = useState('customer')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email) return
    setLoading(true)
    const { error } = await supabase.from('waitlist').insert([{ email, type }])
    if (!error) setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center', maxWidth:'400px'}}>
        <div style={{fontSize:'64px', marginBottom:'16px'}}>⚡</div>
        <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>You're on the list!</h2>
        <p style={{color:'#888', marginBottom:'8px'}}>We'll notify you the moment NecesitoYa launches in your area.</p>
        <p style={{color:'#888', fontSize:'14px'}}>Te avisaremos cuando NecesitoYa llegue a tu área.</p>
        <a href="/" style={{display:'inline-block', marginTop:'24px', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 32px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold'}}>Back to Home</a>
      </div>
    </div>
  )

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', fontFamily:'Arial', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', width:'100%', maxWidth:'480px'}}>
        <a href="/" style={{color:'#888', textDecoration:'none', fontSize:'14px'}}>← Back</a>
        <div style={{fontSize:'40px', margin:'16px 0 8px'}}>⚡</div>
        <h1 style={{color:'#1a1a2e', marginBottom:'4px'}}>Join the Waitlist</h1>
        <p style={{color:'#888', marginBottom:'32px'}}>Únete a la lista de espera — Be first when we launch</p>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'12px', fontSize:'14px'}}>I am a... / Soy...</label>
          <div style={{display:'flex', gap:'12px'}}>
            {[{id:'customer', label:'🙋 Customer', sub:'I need help'}, {id:'provider', label:'💼 Provider', sub:'I offer services'}].map(t => (
              <button key={t.id} onClick={() => setType(t.id)} style={{flex:1, padding:'16px', borderRadius:'12px', border:`2px solid ${type === t.id ? '#FF6B35' : '#F0EDE8'}`, background: type === t.id ? '#FFF3EE' : 'white', cursor:'pointer', textAlign:'center'}}>
                <div style={{fontSize:'20px', marginBottom:'4px'}}>{t.label}</div>
                <div style={{fontSize:'12px', color:'#888'}}>{t.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{marginBottom:'24px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}
          />
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>
          {loading ? 'Joining...' : 'Join Waitlist — Notify Me →'}
        </button>
        <p style={{textAlign:'center', color:'#888', fontSize:'12px', marginTop:'16px'}}>No spam. Launch notification only. / Sin spam.</p>
      </div>
    </main>
  )
}