'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function JobsBoard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [assigning, setAssigning] = useState(null)
  const [provider, setProvider] = useState(null)
  const [showProviderModal, setShowProviderModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [providerEmail, setProviderEmail] = useState('')

  const categories = [
    'All', 'Hauling & Pickup', 'Handyman', 'Lawn & Garden', 'Cleaning',
    'Tutoring', 'Transport', 'Buy & Sell', 'Home Cooking', 'Catering',
    'Baker & Pastries', 'Pet Care', 'Beauty & Hair', 'Babysitting',
    'Tech Help', 'Painting', 'Photography', 'Mechanic', 'Roadside & Towing'
  ]

  useEffect(() => {
    fetchJobs()
    const saved = localStorage.getItem('ny_provider')
    if (saved) setProvider(JSON.parse(saved))
  }, [])

  const fetchJobs = async () => {
    try {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
      setJobs(data || [])
    } catch(e) {
      console.log(e)
    }
    setLoading(false)
  }

  const handleICanHelp = (job) => {
    if (job.status === 'paid' || job.status === 'completed') {
      alert('This job has already been taken. / Este trabajo ya fue tomado.')
      return
    }
    setSelectedJob(job)
    if (provider) {
      assignProvider(job, provider)
    } else {
      setShowProviderModal(true)
    }
  }

  const assignProvider = async (job, providerData) => {
    setAssigning(job.id)
    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          provider_id: providerData.id || null,
          provider_email: providerData.email,
          status: 'pending',
          accepted_at: new Date().toISOString(),
        })
        .eq('id', job.id)

      if (error) throw error

      // Send email to customer
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'provider_accepted',
          job,
          providerName: providerData.full_name || providerData.email,
          providerEmail: providerData.email,
          customerEmail: job.customer_email,
          customerName: job.customer_name,
        }),
      })

      setJobs(prev => prev.map(j =>
        j.id === job.id
          ? { ...j, status: 'accepted', provider_email: providerData.email }
          : j
      ))

      localStorage.setItem('ny_provider', JSON.stringify(providerData))
      setProvider(providerData)
      setShowProviderModal(false)
      window.location.href = `/messages?job=${job.id}`
    } catch (e) {
      console.error(e)
      alert('Error accepting job. Please try again. / Error al aceptar trabajo.')
    }
    setAssigning(null)
  }

  const handleProviderLogin = async (e) => {
    e.preventDefault()
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', providerEmail.toLowerCase())
      .eq('type', 'provider')
      .single()

    if (data) {
      assignProvider(selectedJob, data)
    } else {
      const guestProvider = { email: providerEmail.toLowerCase(), full_name: providerEmail.split('@')[0] }
      assignProvider(selectedJob, guestProvider)
    }
  }

  const filteredJobs = jobs
  .filter(j => j.status !== 'paid' && j.status !== 'completed')
  .filter(j => filter === 'All' || j.category === filter)

  const timeAgo = (date) => {
    const mins = Math.floor((new Date() - new Date(date + 'Z')) / 60000)
    if (mins < 1) return 'Just now / Ahora mismo'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <main style={{minHeight:'100vh', background:'#f8f6f2', fontFamily:'Arial'}}>

      {/* Provider Modal */}
      {showProviderModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '100%' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' }}>Accept This Job</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
              Enter your email to accept: <strong>{selectedJob?.title}</strong>
            </p>
            <form onSubmit={handleProviderLogin}>
              <input
                type="email"
                value={providerEmail}
                onChange={(e) => setProviderEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '12px' }}
              />
              <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg,#FF6B35,#F4A261)', color: 'white', padding: '12px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: 'pointer', marginBottom: '8px' }}>
                Accept Job / Aceptar Trabajo ✓
              </button>
              <button type="button" onClick={() => setShowProviderModal(false)} style={{ width: '100%', backgroundColor: 'white', color: '#6b7280', padding: '10px', borderRadius: '8px', fontSize: '14px', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
                Cancel / Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1a1a2e,#0f3460)', padding:'40px 32px 30px'}}>
        <a href="/" style={{color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:'14px'}}>← Home</a>
        <h1 style={{color:'white', fontSize:'32px', fontWeight:'bold', margin:'16px 0 4px'}}>Available Jobs</h1>
        <p style={{color:'#FF6B35', fontWeight:'bold', marginBottom:'4px'}}>Trabajos Disponibles</p>
        <p style={{color:'rgba(255,255,255,0.5)', fontSize:'14px', marginBottom:'24px'}}>{filteredJobs.length} jobs near you / trabajos cerca de ti</p>
        <a href="/post-job" style={{display:'inline-block', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 28px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold', fontSize:'14px'}}>
          + Post a Job / Publicar Trabajo
        </a>
      </div>

      {/* Filter */}
      <div style={{padding:'16px 32px', overflowX:'auto', whiteSpace:'nowrap', background:'white', borderBottom:'1px solid #F0EDE8'}}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{display:'inline-block', marginRight:'8px', padding:'8px 16px', borderRadius:'20px', border:`2px solid ${filter === cat ? '#FF6B35' : '#F0EDE8'}`, background: filter === cat ? '#FF6B35' : 'white', color: filter === cat ? 'white' : '#555', cursor:'pointer', fontSize:'13px', fontWeight: filter === cat ? 'bold' : 'normal', whiteSpace:'nowrap'}}>
            {cat}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div style={{padding:'24px 32px', maxWidth:'800px', margin:'0 auto'}}>
        {loading ? (
          <div style={{textAlign:'center', padding:'60px', color:'#888'}}>
            <div style={{fontSize:'40px', marginBottom:'16px'}}>⏳</div>
            <p>Loading jobs... / Cargando trabajos...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div style={{textAlign:'center', padding:'60px', color:'#888'}}>
            <div style={{fontSize:'40px', marginBottom:'16px'}}>📋</div>
            <p style={{marginBottom:'4px'}}>No jobs posted yet in this category.</p>
            <p style={{fontSize:'14px', marginBottom:'24px'}}>No hay trabajos en esta categoría todavía.</p>
            <a href="/post-job" style={{background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 28px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold'}}>Post the first job →</a>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
            {filteredJobs.map(job => (
              <div key={job.id} style={{background:'white', borderRadius:'20px', padding:'24px', boxShadow:'0 2px 16px rgba(0,0,0,0.06)', opacity: job.status !== 'open' ? 0.75 : 1}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px'}}>
                  <div>
                    <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                      <span style={{background:'#FFF3EE', color:'#FF6B35', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>{job.category}</span>
                      {job.status !== 'open' && (
                        <span style={{background:'#dcfce7', color:'#16a34a', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>✓ Taken</span>
                      )}
                    </div>
                    <h3 style={{color:'#1a1a2e', margin:'8px 0 4px', fontSize:'18px'}}>{job.title}</h3>
                    <p style={{color:'#888', fontSize:'13px'}}>📍 {job.city} · 🕐 {timeAgo(job.created_at)}</p>
                  </div>
                  {job.budget && (
                    <div style={{textAlign:'right', flexShrink:0, marginLeft:'16px'}}>
                      <div style={{fontSize:'18px', fontWeight:'bold', color:'#2D6A4F'}}>{job.budget}</div>
                      <div style={{fontSize:'11px', color:'#888'}}>budget</div>
                    </div>
                  )}
                </div>
                <p style={{color:'#555', fontSize:'14px', lineHeight:'1.6', marginBottom:'16px'}}>{job.description}</p>

                {/* Job Photo */}
                {job.image_url && (
                  <div style={{marginBottom:'16px'}}>
                    <img src={job.image_url} alt="Job photo" style={{width:'100%', borderRadius:'12px', maxHeight:'200px', objectFit:'cover'}}/>
                  </div>
                )}

                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{fontSize:'13px', color:'#888'}}>Posted by {job.customer_name}</span>
                  {job.status === 'open' ? (
                    <button
                      onClick={() => handleICanHelp(job)}
                      disabled={assigning === job.id}
                      style={{background: assigning === job.id ? '#ccc' : 'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'10px 20px', borderRadius:'12px', border:'none', fontWeight:'bold', fontSize:'14px', cursor: assigning === job.id ? 'not-allowed' : 'pointer'}}>
                      {assigning === job.id ? 'Accepting...' : 'I Can Help / Puedo Ayudar →'}
                    </button>
                  ) : (
                    <span style={{fontSize:'13px', color:'#16a34a', fontWeight:'600'}}>✓ Provider assigned</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}