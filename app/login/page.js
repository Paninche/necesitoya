'use client'
import { useState } from 'react'

const SUPABASE_URL = 'https://tjtagdqdhgkmgmuozhlc.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGFnZHFkaGdrbWdtdW96aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQzMTIsImV4cCI6MjA4OTg4MDMxMn0.8DdoprOG4hWdwoYznHAX_BIT92kwnV77GhOK3Greh5Y'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError('Please enter your email and password / Por favor ingresa tu correo y contraseña')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY },
        body: JSON.stringify({ email: form.email, password: form.password })
      })
      const data = await res.json()
      if (!res.ok) {
        setError('Invalid email or password / Correo o contraseña incorrectos')
        setLoading(false)
        return
      }

      const userEmail = data.user.email
      localStorage.setItem('sb_token', data.access_token)
      localStorage.setItem('sb_user_id', data.user.id)
      localStorage.setItem('sb_email', userEmail)

      const userRes = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(userEmail)}&select=*`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      })
      const users = await userRes.json()

      if (users && users.length > 0) {
        const user = users[0]

        // Check for redirect job — if provider was trying to view a job
        const redirectJob = localStorage.getItem('redirect_job_web')
        localStorage.removeItem('redirect_job_web')

        if (user.type === 'provider') {
          localStorage.setItem('ny_provider', JSON.stringify(user))
          if (redirectJob) {
            window.location.href = `/messages?job=${redirectJob}`
          } else {
            window.location.href = '/provider-dashboard'
          }
        } else {
          localStorage.setItem('ny_customer', JSON.stringify(user))
          window.location.href = '/customer-dashboard'
        }
      } else {
        setError('Account not found. Please sign up first. / Cuenta no encontrada. Por favor regístrate.')
      }
    } catch (e) {
      setError('Something went wrong. Please try again. / Algo salió mal. Inténtalo de nuevo.')
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', fontFamily:'Arial', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', width:'100%', maxWidth:'440px'}}>
        <a href="/" style={{color:'#888', textDecoration:'none', fontSize:'14px'}}>← Back / Regresar</a>
        <div style={{fontSize:'40px', margin:'16px 0 8px'}}>⚡</div>
        <h1 style={{color:'#1a1a2e', marginBottom:'4px'}}>Welcome Back</h1>
        <p style={{color:'#888', marginBottom:'32px'}}>Bienvenido de nuevo — sign in to your account</p>

        {error && (
          <div style={{background:'#FFF3F3', border:'2px solid #FFD0D0', borderRadius:'12px', padding:'12px 16px', marginBottom:'20px', color:'#CC0000', fontSize:'14px'}}>
            {error}
          </div>
        )}

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Email</label>
          <input type="email" placeholder="you@email.com" value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'28px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Password / Contraseña</label>
          <input type="password" placeholder="••••••••" value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <button onClick={handleLogin} disabled={loading}
          style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', cursor:'pointer', marginBottom:'16px'}}>
          {loading ? 'Signing in...' : 'Sign In / Iniciar Sesión →'}
        </button>

        <div style={{textAlign:'center', borderTop:'1px solid #F0EDE8', paddingTop:'20px', marginTop:'8px'}}>
          <p style={{color:'#888', fontSize:'14px', marginBottom:'12px'}}>Don't have an account? / ¿No tienes cuenta?</p>
          <div style={{display:'flex', gap:'12px', justifyContent:'center'}}>
            <a href="/signup-customer" style={{color:'#FF6B35', fontWeight:'bold', textDecoration:'none', fontSize:'14px'}}>I Need Help →</a>
            <span style={{color:'#ddd'}}>|</span>
            <a href="/signup-provider" style={{color:'#FF6B35', fontWeight:'bold', textDecoration:'none', fontSize:'14px'}}>I Offer Services →</a>
          </div>
        </div>
      </div>
    </main>
  )
}