'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function CustomerSignup() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', city: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const { error } = await supabase.from('users').insert([{ ...form, type: 'customer' }])
    if (!error) setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center', maxWidth:'400px'}}>
        <div style={{fontSize:'64px', marginBottom:'16px'}}>🎉</div>
        <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>You're in!</h2>
        <p style={{color:'#888'}}>Welcome to NecesitoYa. We'll notify you when we launch in your area.</p>
        <a href="/" style={{display:'inline-block', marginTop:'24px', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 32px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold'}}>Back to Home</a>
      </div>
    </div>
  )

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', fontFamily:'Arial', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', width:'100%', maxWidth:'480px'}}>
        <a href="/" style={{color:'#888', textDecoration:'none', fontSize:'14px'}}>← Back</a>
        <div style={{fontSize:'40px', margin:'16px 0 8px'}}>🙋</div>
        <h1 style={{color:'#1a1a2e', marginBottom:'4px'}}>I Need Help</h1>
        <p style={{color:'#888', marginBottom:'32px'}}>Necesito Ayuda — Create your free account</p>
        
        {[
          {label:'Full Name / Nombre Completo', key:'full_name', placeholder:'David Cruzado'},
          {label:'Email', key:'email', placeholder:'you@email.com', type:'email'},
          {label:'Phone / Teléfono', key:'phone', placeholder:'(863) 555-0100', type:'tel'},
          {label:'City / Ciudad', key:'city', placeholder:'Haines City, FL'},
        ].map(field => (
          <div key={field.key} style={{marginBottom:'20px'}}>
            <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>{field.label}</label>
            <input
              type={field.type || 'text'}
              placeholder={field.placeholder}
              value={form[field.key]}
              onChange={e => setForm({...form, [field.key]: e.target.value})}
              style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}
            />
          </div>
        ))}

        <button onClick={handleSubmit} disabled={loading} style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', cursor:'pointer', marginTop:'8px'}}>
          {loading ? 'Creating account...' : 'Create Account — Get Help Now →'}
        </button>
        <p style={{textAlign:'center', color:'#888', fontSize:'12px', marginTop:'16px'}}>By signing up you agree to our terms of service</p>
      </div>
    </main>
  )
}