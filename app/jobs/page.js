'use client'
import { useState, useEffect } from 'react'

export default function JobsBoard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  const categories = [
    'All', 'Hauling & Pickup', 'Handyman', 'Lawn & Garden', 'Cleaning',
    'Tutoring', 'Transport', 'Home Cooking', 'Catering', 'Baker & Pastries',
    'Pet Care', 'Beauty & Hair', 'Babysitting', 'Tech Help',
    'Painting', 'Photography', 'Mechanic', 'Roadside & Towing'
  ]

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await fetch('https://tjtagdqdhgkmgmuozhlc.supabase.co/rest/v1/jobs?order=created_at.desc', {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGFnZHFkaGdrbWdtdW96aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQzMTIsImV4cCI6MjA4OTg4MDMxMn0.8DdoprOG4hWdwoYznHAX_BIT92kwnV77GhOK3Greh5Y',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGFnZHFkaGdrbWdtdW96aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQzMTIsImV4cCI6MjA4OTg4MDMxMn0.8DdoprOG4hWdwoYznHAX_BIT92kwnV77GhOK3Greh5Y',
        }
      })
      const data = await res.json()
      setJobs(data)
    } catch(e) {
      console.log(e)
    }
    setLoading(false)
  }

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(j => j.category === filter)

  const timeAgo = (date) => {
    const mins = Math.floor((new Date() - new Date(date)) / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <main style={{minHeight:'100vh', background:'#f8f6f2', fontFamily:'Arial'}}>

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
              <div key={job.id} style={{background:'white', borderRadius:'20px', padding:'24px', boxShadow:'0 2px 16px rgba(0,0,0,0.06)'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px'}}>
                  <div>
                    <span style={{background:'#FFF3EE', color:'#FF6B35', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>{job.category}</span>
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
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{fontSize:'13px', color:'#888'}}>Posted by {job.customer_name}</span>
                  <a href={`mailto:${job.customer_email}?subject=NecesitoYa - Interested in your job: ${job.title}&body=Hi ${job.customer_name},%0D%0A%0D%0AI found your job on NecesitoYa and I am interested in helping you.%0D%0A%0D%0AJob: ${job.title}%0D%0A%0D%0APlease let me know if you are still looking for help!`} style={{background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'10px 20px', borderRadius:'12px', textDecoration:'none', fontWeight:'bold', fontSize:'14px'}}>
                    I Can Help / Puedo Ayudar →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}