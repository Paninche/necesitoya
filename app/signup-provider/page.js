'use client'
import { useState } from 'react'

export default function ProviderSignup() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', city: '', state: '', services: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState([])

  const serviceOptions = [
    { id: 'Hauling & Pickup', label: '🚛 Hauling & Pickup' },
    { id: 'Handyman', label: '🔨 Handyman' },
    { id: 'Lawn & Garden', label: '🌿 Lawn & Garden' },
    { id: 'Cleaning', label: '🧹 Cleaning' },
    { id: 'Tutoring', label: '🎓 Tutoring' },
    { id: 'Transport', label: '🚗 Transport' },
    { id: 'Buy & Sell', label: '🛒 Buy & Sell' },
    { id: 'Home Cooking', label: '🍳 Home Cooking' },
    { id: 'Catering', label: '🍽️ Catering' },
    { id: 'Baker & Pastries', label: '🎂 Baker & Pastries' },
    { id: 'Pet Care', label: '🐾 Pet Care' },
    { id: 'Beauty & Hair', label: '💇 Beauty & Hair' },
    { id: 'Babysitting', label: '👶 Babysitting' },
    { id: 'Tech Help', label: '🖥️ Tech Help' },
    { id: 'Painting', label: '🖌️ Painting' },
    { id: 'Photography', label: '📸 Photography' },
    { id: 'Mechanic', label: '🔧 Mechanic' },
    { id: 'Roadside & Towing', label: '🚨 Roadside & Towing' },
  ]

  const toggleService = (id) => {
    const updated = selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]
    setSelected(updated)
    setForm({...form, services: updated.join(',')})
  }

  const handleSubmit = async () => {
    if (!form.full_name || !form.email) {
      alert('Please fill in your name and email')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('https://tjtagdqdhgkmgmuozhlc.supabase.co/rest/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGFnZHFkaGdrbWdtdW96aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQzMTIsImV4cCI6MjA4OTg4MDMxMn0.8DdoprOG4hWdwoYznHAX_BIT92kwnV77GhOK3Greh5Y',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGFnZHFkaGdrbWdtdW96aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQzMTIsImV4cCI6MjA4OTg4MDMxMn0.8DdoprOG4hWdwoYznHAX_BIT92kwnV77GhOK3Greh5Y',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ ...form, type: 'provider' })
      })
      if (!res.ok) {
        const err = await res.text()
        if (err.includes('23505')) {
          alert('This email is already registered! / Este correo ya está registrado.')
        } else {
          alert('Something went wrong. Please try again.')
        }
        setLoading(false)
        return
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
        <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center', maxWidth:'440px'}}>
          <div style={{fontSize:'64px', marginBottom:'16px'}}>🎉</div>
          <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>Welcome to NecesitoYa!</h2>
          <p style={{color:'#FF6B35', fontWeight:'bold', marginBottom:'16px'}}>¡Bienvenido a NecesitoYa!</p>
          <p style={{color:'#888', fontSize:'14px', marginBottom:'8px'}}>You are now a provider. Start browsing available jobs and respond to ones you can help with!</p>
          <p style={{color:'#888', fontSize:'13px', marginBottom:'32px'}}>Ya eres proveedor. ¡Empieza a ver los trabajos disponibles y responde a los que puedas ayudar!</p>
          <a href="/jobs" style={{display:'inline-block', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'14px 32px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold', fontSize:'16px', marginBottom:'12px'}}>
            Browse Available Jobs / Ver Trabajos →
          </a>
          <br/>
          <a href="/" style={{display:'inline-block', color:'#888', padding:'12px 24px', textDecoration:'none', fontSize:'14px'}}>← Home</a>
        </div>
      </div>
    )
  }

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', fontFamily:'Arial', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', width:'100%', maxWidth:'480px'}}>
        <a href="/" style={{color:'#888', textDecoration:'none', fontSize:'14px'}}>← Back / Regresar</a>
        <div style={{fontSize:'40px', margin:'16px 0 8px'}}>💼</div>
        <h1 style={{color:'#1a1a2e', marginBottom:'4px'}}>I Offer Services</h1>
        <p style={{color:'#888', marginBottom:'32px'}}>Ofrezco Servicios — Join as a provider, earn money</p>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Full Name / Nombre Completo *</label>
          <input type="text" placeholder="Your name" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Email *</label>
          <input type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Phone / Teléfono</label>
          <input type="tel" placeholder="(863) 555-0100" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px'}}>
          <div>
            <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>City / Ciudad</label>
            <input type="text" placeholder="Haines City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
          </div>
          <div>
            <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>State / Estado</label>
            <input type="text" placeholder="FL" value={form.state} onChange={e => setForm({...form, state: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
          </div>
        </div>

        <div style={{marginBottom:'24px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'12px', fontSize:'14px'}}>What services do you offer? / ¿Qué servicios ofreces?</label>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px'}}>
            {serviceOptions.map(s => (
              <button key={s.id} onClick={() => toggleService(s.id)} style={{padding:'10px 12px', borderRadius:'10px', border:`2px solid ${selected.includes(s.id) ? '#FF6B35' : '#F0EDE8'}`, background: selected.includes(s.id) ? '#FFF3EE' : 'white', cursor:'pointer', fontSize:'13px', textAlign:'left', color: selected.includes(s.id) ? '#FF6B35' : '#333', fontWeight: selected.includes(s.id) ? 'bold' : 'normal'}}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>
          {loading ? 'Creating account...' : 'Join as Provider — Start Earning →'}
        </button>
        <p style={{textAlign:'center', color:'#888', fontSize:'12px', marginTop:'16px'}}>By signing up you agree to our <a href="/terms" style={{color:'#FF6B35'}}>terms of service</a></p>
      </div>
    </main>
  )
}