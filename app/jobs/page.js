'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const SUPABASE_URL = 'https://tjtagdqdhgkmgmuozhlc.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGFnZHFkaGdrbWdtdW96aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQzMTIsImV4cCI6MjA4OTg4MDMxMn0.8DdoprOG4hWdwoYznHAX_BIT92kwnV77GhOK3Greh5Y'

// ============================================================
// SPONSORED ADS CONFIG — edit this to manage ads
// Set enabled: false to hide an ad without deleting it
// ============================================================
const SPONSORED_ADS = [
  {
    id: 'ad1',
    enabled: false, // SET TO true WHEN YOU HAVE A PAYING SPONSOR
    logo: '🔨',
    logoColor: '#F96302',
    businessName: 'Home Depot — Winter Haven',
    tagline: 'Get 10% off supplies for your project — use code NECESITOYA',
    url: 'https://www.homedepot.com',
    cta: 'Shop now',
    categories: ['Handyman', 'Lawn & Garden', 'Painting', 'All'],
  },
  {
    id: 'ad2',
    enabled: false, // SET TO true WHEN YOU HAVE A PAYING SPONSOR
    logo: '🪵',
    logoColor: '#8B4513',
    businessName: 'ABC Lumber — Winter Haven\'s trusted hardware store',
    tagline: 'Quality materials for every home project · Open 7 days',
    url: '#',
    cta: 'Visit',
    categories: ['Handyman', 'Painting', 'All'],
  },
]

function SponsoredBanner({ ad }) {
  if (!ad || !ad.enabled) return null
  return (
    <div style={{background:'#f8f6f2', borderRadius:'16px', padding:'12px 16px', marginBottom:'16px', border:'1px solid #F0EDE8'}}>
      <div style={{fontSize:'10px', color:'#bbb', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.5px'}}>Sponsored</div>
      <div style={{display:'flex', alignItems:'center', gap:'12px', background:'white', borderRadius:'12px', border:'1px solid #F0EDE8', padding:'12px 16px'}}>
        <div style={{width:'40px', height:'40px', borderRadius:'10px', background:ad.logoColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0}}>
          {ad.logo}
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:'14px', fontWeight:'bold', color:'#1a1a2e'}}>{ad.businessName}</div>
          <div style={{fontSize:'12px', color:'#888', marginTop:'2px'}}>{ad.tagline}</div>
        </div>
        <a href={ad.url} target="_blank" rel="noopener noreferrer"
          style={{fontSize:'12px', fontWeight:'bold', color:'#FF6B35', whiteSpace:'nowrap', textDecoration:'none', padding:'6px 12px', border:'1px solid #FF6B35', borderRadius:'8px'}}>
          {ad.cta}
        </a>
      </div>
    </div>
  )
}

function getAdForCategory(category) {
  const active = SPONSORED_ADS.filter(ad => ad.enabled && (ad.categories.includes(category) || ad.categories.includes('All')))
  return active.length > 0 ? active[0] : null
}

export default function JobsBoard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [provider, setProvider] = useState(null)
  const [stateFilter, setStateFilter] = useState('All')
  const [cityFilter, setCityFilter] = useState('All')
  const [blockedEmails, setBlockedEmails] = useState([])

  const categories = [
    'All', 'Hauling & Pickup', 'Handyman', 'Lawn & Garden', 'Cleaning',
    'Tutoring', 'Transport', 'Home Cooking', 'Catering',
    'Baker & Pastries', 'Pet Care', 'Beauty & Hair', 'Babysitting',
    'Tech Help', 'Painting', 'Photography', 'Mechanic', 'Roadside & Towing'
  ]

  useEffect(() => {
    fetchJobs()
    const saved = localStorage.getItem('ny_provider')
    if (saved) setProvider(JSON.parse(saved))
    const blocked = JSON.parse(localStorage.getItem('ny_blocked') || '[]')
    setBlockedEmails(blocked)
  }, [])

  const fetchJobs = async () => {
    try {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .neq('category', 'Buy & Sell')
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
    if (!provider) {
      localStorage.setItem('redirect_job_web', job.id)
      window.location.href = '/login'
      return
    }
    window.location.href = `/messages?job=${job.id}`
  }

  const handleReport = async (job, reason) => {
    await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'job_reported',
        customerEmail: 'hello@necesitoya.app',
        customerName: 'Admin',
        providerName: 'User Report',
        job: { id: job.id, title: job.title, category: job.category, city: job.city, message: `Job reported as ${reason}. Job ID: ${job.id} - Title: ${job.title} - Posted by: ${job.customer_email}` }
      })
    })
    alert('Thank you for your report. We will review this content within 24 hours.\nGracias por tu reporte. Revisaremos este contenido en 24 horas.')
  }

  const handleBlock = async (job) => {
    const confirmed = window.confirm(
      `Block this user and hide their posts?\n¿Bloquear este usuario y ocultar sus publicaciones?\n\nPosted by: ${job.customer_name}`
    )
    if (!confirmed) return
    const updated = [...blockedEmails, job.customer_email]
    setBlockedEmails(updated)
    localStorage.setItem('ny_blocked', JSON.stringify(updated))
    await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'job_reported',
        customerEmail: 'hello@necesitoya.app',
        customerName: 'Admin',
        providerName: 'User Block',
        job: { id: job.id, title: job.title, category: job.category, city: job.city, message: `USER BLOCKED. Job ID: ${job.id} - Title: ${job.title} - Blocked user email: ${job.customer_email} - Posted by: ${job.customer_name}` }
      })
    })
    alert('User blocked. Their posts have been removed from your feed.\nUsuario bloqueado. Sus publicaciones han sido eliminadas de tu feed.')
  }

  const availableStates = ['All', ...new Set(jobs.map(j => j.state).filter(Boolean))]
  const availableCities = ['All', ...new Set(
    jobs
      .filter(j => stateFilter === 'All' || j.state === stateFilter)
      .map(j => j.city)
      .filter(Boolean)
  )]

  const filteredJobs = jobs
    .filter(j => j.status !== 'paid' && j.status !== 'completed')
    .filter(j => filter === 'All' || j.category === filter)
    .filter(j => stateFilter === 'All' || j.state === stateFilter)
    .filter(j => cityFilter === 'All' || j.city === cityFilter)
    .filter(j => !blockedEmails.includes(j.customer_email))

  const timeAgo = (date) => {
    const mins = Math.floor((new Date() - new Date(date + 'Z')) / 60000)
    if (mins < 1) return 'Just now / Ahora mismo'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  const topAd = getAdForCategory(filter)

  return (
    <main style={{minHeight:'100vh', background:'#f8f6f2', fontFamily:'Arial'}}>

      <div style={{background:'linear-gradient(135deg,#1a1a2e,#0f3460)', padding:'40px 32px 30px'}}>
        <a href="/" style={{color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:'14px'}}>← Home</a>
        <h1 style={{color:'white', fontSize:'32px', fontWeight:'bold', margin:'16px 0 4px'}}>Available Jobs</h1>
        <p style={{color:'#FF6B35', fontWeight:'bold', marginBottom:'4px'}}>Trabajos Disponibles</p>
        <p style={{color:'rgba(255,255,255,0.5)', fontSize:'14px', marginBottom:'24px'}}>{filteredJobs.length} jobs near you / trabajos cerca de ti</p>
        {!provider && (
          <a href="/post-job" style={{display:'inline-block', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 28px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold', fontSize:'14px'}}>
            + Post a Job / Publicar Trabajo
          </a>
        )}
      </div>

      <div style={{padding:'16px 32px', overflowX:'auto', whiteSpace:'nowrap', background:'white', borderBottom:'1px solid #F0EDE8'}}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{display:'inline-block', marginRight:'8px', padding:'8px 16px', borderRadius:'20px', border:`2px solid ${filter === cat ? '#FF6B35' : '#F0EDE8'}`, background: filter === cat ? '#FF6B35' : 'white', color: filter === cat ? 'white' : '#555', cursor:'pointer', fontSize:'13px', fontWeight: filter === cat ? 'bold' : 'normal', whiteSpace:'nowrap'}}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{padding:'12px 32px', background:'white', borderBottom:'1px solid #F0EDE8', display:'flex', gap:'12px', alignItems:'center', flexWrap:'wrap'}}>
        <span style={{fontSize:'13px', color:'#888', fontWeight:'600'}}>📍 Filter by location:</span>
        <select value={stateFilter} onChange={(e) => { setStateFilter(e.target.value); setCityFilter('All') }}
          style={{padding:'6px 12px', borderRadius:'8px', border:'1px solid #e5e7eb', fontSize:'13px', color:'#333', cursor:'pointer', background:'white'}}>
          {availableStates.map(s => <option key={s} value={s}>{s === 'All' ? 'All States' : s}</option>)}
        </select>
        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}
          style={{padding:'6px 12px', borderRadius:'8px', border:'1px solid #e5e7eb', fontSize:'13px', color:'#333', cursor:'pointer', background:'white'}}>
          {availableCities.map(c => <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>)}
        </select>
        {(stateFilter !== 'All' || cityFilter !== 'All') && (
          <button onClick={() => { setStateFilter('All'); setCityFilter('All') }}
            style={{padding:'6px 12px', borderRadius:'8px', border:'1px solid #FF6B35', fontSize:'13px', color:'#FF6B35', cursor:'pointer', background:'white', fontWeight:'600'}}>
            Clear ✕
          </button>
        )}
      </div>

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
            {!provider && (
              <a href="/post-job" style={{background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 28px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold'}}>Post the first job →</a>
            )}
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>

            {/* Top sponsored banner */}
            <SponsoredBanner ad={topAd} />

            {filteredJobs.map((job, index) => (
              <div key={job.id}>
                <div style={{background:'white', borderRadius:'20px', padding:'24px', boxShadow:'0 2px 16px rgba(0,0,0,0.06)', opacity: job.status !== 'open' ? 0.75 : 1}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px'}}>
                    <div>
                      <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                        <span style={{background:'#FFF3EE', color:'#FF6B35', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>{job.category}</span>
                        {job.status !== 'open' && (
                          <span style={{background:'#dcfce7', color:'#16a34a', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>✓ Taken</span>
                        )}
                      </div>
                      <h3 style={{color:'#1a1a2e', margin:'8px 0 4px', fontSize:'18px'}}>{job.title}</h3>
                      <p style={{color:'#888', fontSize:'13px'}}>📍 {job.city}{job.state ? `, ${job.state}` : ''} · 🕐 {timeAgo(job.created_at)}</p>
                    </div>
                    {job.budget && (
                      <div style={{textAlign:'right', flexShrink:0, marginLeft:'16px'}}>
                        <div style={{fontSize:'18px', fontWeight:'bold', color:'#2D6A4F'}}>{job.budget}</div>
                        <div style={{fontSize:'11px', color:'#888'}}>budget</div>
                      </div>
                    )}
                  </div>
                  <p style={{color:'#555', fontSize:'14px', lineHeight:'1.6', marginBottom:'16px'}}>{job.description}</p>
                  {job.image_url && (
                    <div style={{marginBottom:'16px'}}>
                      <img src={job.image_url} alt="Job photo" style={{width:'100%', borderRadius:'12px', maxHeight:'200px', objectFit:'cover'}}/>
                    </div>
                  )}
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                      <span style={{fontSize:'13px', color:'#888'}}>Posted by {job.customer_name}</span>
                      <select onChange={(e) => { if (e.target.value === 'block') { handleBlock(job); e.target.value = '' } else if (e.target.value) { handleReport(job, e.target.value); e.target.value = '' } }}
                        style={{fontSize:'12px', color:'#9ca3af', border:'none', background:'transparent', cursor:'pointer', outline:'none'}}>
                        <option value="">🚩 Report / Block</option>
                        <option value="inappropriate">Report: Inappropriate / Inapropiado</option>
                        <option value="spam">Report: Spam</option>
                        <option value="block">🚫 Block User / Bloquear Usuario</option>
                      </select>
                    </div>
                    <div>
                      {job.status === 'open' ? (
                        <button onClick={() => handleICanHelp(job)}
                          style={{background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'10px 20px', borderRadius:'12px', border:'none', fontWeight:'bold', fontSize:'14px', cursor:'pointer'}}>
                          I Can Help / Puedo Ayudar →
                        </button>
                      ) : (
                        <span style={{fontSize:'13px', color:'#16a34a', fontWeight:'600'}}>✓ Provider assigned</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mid-feed sponsored banner every 3 jobs */}
                {(index + 1) % 3 === 0 && topAd && <SponsoredBanner ad={topAd} />}

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}