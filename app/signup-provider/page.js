'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ProviderSignup() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', city: '', services: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState([])

  const serviceOptions = [
    { id: 'hauling', label: '🚛 Hauling & Pickup' },
    { id: 'handyman', label: '🔨 Handyman' },
    { id: 'lawn', label: '🌿 Lawn & Garden' },
    { id: 'cleaning', label: '🧹 Cleaning' },
    { id: 'moving', label: '📦 Moving Boxes' },
    { id: 'tutoring', label: '🎓 Tutoring' },
    { id: 'transport', label: '🚗 Transport' },
    { id: 'buysell', label: '🛒 Buy & Sell' },
  ]

  const toggleService = (id) => {
    const updated = selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]
    setSelected(updated)
    setForm({...form, services: updated.join(',')})
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { error } = await supabase.from('users').insert([{ ...form, type: 'provider' }])
    if (error) alert('Error: ' + error.message)
    else setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
        <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center', maxWidth:'400px'}}>
          <div style={{fontSize:'64px', marginBottom:'16px'}}>💼</div>
          <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>Welcome aboard!</h2>
          <p style={{color:'#888'}}>You are now a NecesitoYa provider. We will contact you when jobs are available in your area.</p>
          <a href="/" style={{display:'inline-block', marginTop:'24px', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 32px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold'}}>Back to Home</a>
        </div>
      </div>
    )
  }

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', fontFamily:'Arial', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', width:'100%', maxWidth:'480px'}}>
        <a href="/" style={{color:'#888', textDecoration:'none', fontSize:'14px'}}>Back</a>
        <div style={{fontSize:'40px', margin:'16px 0 8px'}}>💼</div>
        <h1 style={{color:'#1a1a2e', marginBottom:'4px'}}>I Offer Services</h1>
        <p style={{color:'#888', marginBottom:'32px'}}>Ofrezco Servicios — Join as a provider, earn money</p>

        {[
          {label:'Full Name / Nombre Completo', key:'full_name', placeholder:'Your name'},
          {label:'Email', key:'email', placeholder:'you@email.com', type:'email'},
          {label:'Phone / Telefono', key:'phone', placeholder:'(863) 555-0100', type:'tel'},
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

        <div style={{marginBottom:'24px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'12px', fontSize:'14px'}}>What services do you offer?</label>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px'}}>
            {serviceOptions.map(s => (
              <button key={s.id} onClick={() => toggleService(s.id)} style={{padding:'10px 12px', borderRadius:'10px', border:`2px solid ${selected.includes(s.id) ? '#FF6B35' : '#F0EDE8'}`, background: selected.includes(s.id) ? '#FFF3EE' : 'white', cursor:'pointer', fontSize:'13px', textAlign:'left'}}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{width:'100%', background:'linear-gradient(135deg,#2D6A4F,#52B788)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>
          {loading ? 'Creating account...' : 'Join as Provider — Start Earning'}
        </button>
        <p style={{textAlign:'center', color:'#888', fontSize:'12px', marginTop:'16px'}}>By signing up you agree to our terms of service</p>
      </div>
    </main>
  )
}