'use client'
import { useState } from 'react'

const SUPABASE_URL = 'https://tjtagdqdhgkmgmuozhlc.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGFnZHFkaGdrbWdtdW96aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQzMTIsImV4cCI6MjA4OTg4MDMxMn0.8DdoprOG4hWdwoYznHAX_BIT92kwnV77GhOK3Greh5Y'

export default function CustomerSignup() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', phone: '', city: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = async () => {
    if (!form.full_name || !form.email || !form.password) {
      alert('Please fill in your name, email and password / Por favor completa tu nombre, correo y contraseña')
      return
    }
    if (form.password.length < 6) {
      alert('Password must be at least 6 characters / La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service to continue. / Por favor acepta los Terminos de Servicio para continuar.')
      return
    }
    setLoading(true)
    try {
      const authRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
        },
        body: JSON.stringify({ email: form.email, password: form.password })
      })
      const authData = await authRes.json()
      if (!authRes.ok) {
        if (authData.msg && authData.msg.includes('already registered')) {
          alert('This email is already registered! / Este correo ya está registrado.')
        } else {
          alert('Something went wrong. Please try again.')
        }
        setLoading(false)
        return
      }
      const token = authData.access_token || SUPABASE_KEY
      await fetch(`${SUPABASE_URL}/rest/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${token}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          city: form.city,
          type: 'customer'
        })
      })
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'CompleteRegistration', { content_name: 'Customer Signup' })
      }
      setSubmitted(true)
    } catch(e) {
      console.log(e)
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
        <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center', maxWidth:'400px'}}>
          <div style={{fontSize:'64px', marginBottom:'16px'}}>🎉</div>
          <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>You're in!</h2>
          <p style={{color:'#888', marginBottom:'24px'}}>Welcome to NecesitoYa. Your account is ready!</p>
          <a href="/login" style={{display:'inline-block', marginTop:'8px', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 32px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold'}}>Sign In →</a>
        </div>
      </div>
    )
  }

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', fontFamily:'Arial', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', width:'100%', maxWidth:'480px'}}>
        <a href="/" style={{color:'#888', textDecoration:'none', fontSize:'14px'}}>← Back / Regresar</a>
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
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Password / Contraseña</label>
          <input type="password" placeholder="At least 6 characters / Mínimo 6 caracteres" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Phone / Telefono</label>
          <input type="tel" placeholder="(863) 555-0100" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>
        <div style={{marginBottom:'24px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>City / Ciudad</label>
          <input type="text" placeholder="Haines City, FL" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>
        <div style={{display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'20px', cursor:'pointer'}} onClick={() => setAgreedToTerms(!agreedToTerms)}>
          <div style={{width:'22px', height:'22px', borderRadius:'6px', border:'2px solid #FF6B35', backgroundColor: agreedToTerms ? '#FF6B35' : 'white', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'2px'}}>
            {agreedToTerms && <span style={{color:'white', fontSize:'13px', fontWeight:'bold'}}>✓</span>}
          </div>
          <p style={{color:'#555', fontSize:'12px', lineHeight:'1.5', margin:0}}>
            I agree to the <a href="/terms" style={{color:'#FF6B35', fontWeight:'600'}}>Terms of Service</a> and <a href="/privacy" style={{color:'#FF6B35', fontWeight:'600'}}>Privacy Policy</a>, and confirm there is no tolerance for objectionable content or abusive behavior. / Acepto los <a href="/terms" style={{color:'#FF6B35', fontWeight:'600'}}>Términos de Servicio</a> y la <a href="/privacy" style={{color:'#FF6B35', fontWeight:'600'}}>Política de Privacidad</a>, y confirmo que no se tolera contenido inapropiado.
          </p>
        </div>
        <button onClick={handleSubmit} disabled={loading} style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>
          {loading ? 'Creating account...' : 'Create Account — Get Help Now'}
        </button>
        <p style={{textAlign:'center', color:'#888', fontSize:'12px', marginTop:'16px'}}>
          Already have an account? <a href="/login" style={{color:'#FF6B35', fontWeight:'bold'}}>Sign In →</a>
        </p>
      </div>
    </main>
  )
}