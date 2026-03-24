'use client'
import { useState } from 'react'

export default function CustomerSignup() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', city: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.full_name || !form.email) {
      alert('Please fill in your name and email')
      return
    }
    setLoading(true)
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { error } = await supabase.from('users').insert([{ ...form, type: 'customer' }])
      if (error) console.log('DB error:', error.message)
    } catch(e) {
      console.log('Error:', e)
    }
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
        <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center', maxWidth:'400px'}}>
          <div style={{fontSize:'64px', marginBottom:'16px'}}>🎉</div>
          <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>You are in!</h2>
          <p style={{color:'#888'}}>Welcome to NecesitoYa. We will notify you when we launch in your area.</p>
          <a href="/" style={{display:'inline-block', marginTop:'24px', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 32px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold'}}>Back to Home</a>
        </div>
      </div>
    )
  }

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', fontFamily:'Arial', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', width:'100%', maxWidth:'480px'}}>
        <a href="/" style={{color:'#888', textDecoration:'none', fontSize:'14px'}}>Back</a>
        <div style={{fontSize:'40px', margin:'16px 0 8px'}}>🙋</div>
        <h1 style={{color:'#1a1a2e', marginBottom:'4px'}}>I Need Help</h1>
        <p style={{color:'#888', marginBottom:'32px'}}>Necesito Ayuda — Create your free account</p>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Full Name / Nombre Completo</label>
          <input type="text" placeholder="David Cruzado" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Email</label>
          <input type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Phone / Telefono</label>
          <input type="tel" placeholder="(863) 555-0100" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'24px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>City / Ciudad</label>
          <input type="text" placeholder="Haines City, FL" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>
          {loading ? 'Creating account...' : 'Create Account — Get Help Now'}
        </button>
        <p style={{textAlign:'center', color:'#888', fontSize:'12px', marginTop:'16px'}}>By signing up you agree to our terms of service</p>
      </div>
    </main>
  )
}