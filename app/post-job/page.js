'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function PostJob() {
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    category: '',
    title: '',
    description: '',
    budget: '',
    city: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const categories = [
    "Hauling & Pickup", "Handyman", "Lawn & Garden", "Cleaning",
    "Tutoring", "Transport", "Buy & Sell", "Home Cooking",
    "Catering", "Baker & Pastries", "Pet Care", "Beauty & Hair",
    "Babysitting", "Tech Help", "Painting", "Photography",
    "Mechanic", "Roadside & Towing"
  ]

  const handleSubmit = async () => {
    if (!form.customer_name || !form.customer_email || !form.category || !form.title || !form.description || !form.city) {
      alert('Please fill in all required fields / Por favor complete todos los campos')
      return
    }
    setLoading(true)
    try {
      // Post job to Supabase
      const { data: job, error } = await supabase
        .from('jobs')
        .insert(form)
        .select()
        .single()

      if (error) throw error

      // Find providers in the same category and notify them
      const { data: providers } = await supabase
        .from('users')
        .select('email, full_name, services')
        .eq('type', 'provider')

      // Filter providers whose services match the category
      const matchingProviders = (providers || []).filter(p =>
        p.services && p.services.toLowerCase().includes(form.category.toLowerCase())
      )

      // Send email to each matching provider
      for (const provider of matchingProviders) {
        await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'job_posted',
            job,
            providerName: provider.full_name,
            providerEmail: provider.email,
          }),
        })
      }

      setSubmitted(true)
    } catch(e) {
      console.log(e)
      alert('Something went wrong. Please try again. / Algo salió mal.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
        <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center', maxWidth:'400px'}}>
          <div style={{fontSize:'64px', marginBottom:'16px'}}>🎉</div>
          <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>Job Posted!</h2>
          <p style={{color:'#888', marginBottom:'4px'}}>Your job is now live and providers near you will respond soon.</p>
          <p style={{color:'#888', fontSize:'14px', marginBottom:'24px'}}>Tu trabajo está publicado y los proveedores cercanos responderán pronto.</p>
          <a href="/jobs" style={{display:'inline-block', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 32px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold', marginRight:'12px'}}>See All Jobs →</a>
          <a href="/" style={{display:'inline-block', color:'#888', padding:'12px 24px', textDecoration:'none'}}>Home</a>
        </div>
      </div>
    )
  }

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', fontFamily:'Arial', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', width:'100%', maxWidth:'560px'}}>
        <a href="/" style={{color:'#888', textDecoration:'none', fontSize:'14px'}}>← Back / Regresar</a>
        <div style={{fontSize:'40px', margin:'16px 0 8px'}}>📋</div>
        <h1 style={{color:'#1a1a2e', marginBottom:'4px'}}>Post a Job</h1>
        <p style={{color:'#888', marginBottom:'32px'}}>Publicar un Trabajo — Describe what you need</p>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Your Name / Tu Nombre *</label>
          <input type="text" placeholder="David Cruzado" value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Email *</label>
          <input type="email" placeholder="you@email.com" value={form.customer_email} onChange={e => setForm({...form, customer_email: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Phone / Teléfono (optional)</label>
          <input type="tel" placeholder="(863) 555-0100" value={form.customer_phone} onChange={e => setForm({...form, customer_phone: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'8px', fontSize:'14px'}}>Category / Categoría *</label>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setForm({...form, category: cat})} style={{padding:'10px 12px', borderRadius:'10px', border:`2px solid ${form.category === cat ? '#FF6B35' : '#F0EDE8'}`, background: form.category === cat ? '#FFF3EE' : 'white', cursor:'pointer', fontSize:'12px', textAlign:'left', color: form.category === cat ? '#FF6B35' : '#333', fontWeight: form.category === cat ? 'bold' : 'normal'}}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Job Title / Título del Trabajo *</label>
          <input type="text" placeholder="e.g. Need lawn mowed / Necesito cortar el césped" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Description / Descripción *</label>
          <textarea placeholder="Describe the job in detail / Describe el trabajo en detalle" value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none', resize:'none', height:'100px', fontFamily:'Arial'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Budget / Presupuesto (optional)</label>
          <input type="text" placeholder="e.g. $50 - $100" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <div style={{marginBottom:'32px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>City / Ciudad *</label>
          <input type="text" placeholder="Haines City, FL" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', outline:'none'}}/>
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>
          {loading ? 'Posting... / Publicando...' : 'Post Job — Find Help Now / Publicar Trabajo →'}
        </button>
        <p style={{textAlign:'center', color:'#888', fontSize:'12px', marginTop:'16px'}}>Free to post · Gratis publicar</p>
      </div>
    </main>
  )
}