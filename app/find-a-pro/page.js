'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function FindAPro() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [stateFilter, setStateFilter] = useState('All')
  const [search, setSearch] = useState('')

  const categories = [
    'All', 'Hauling & Pickup', 'Handyman', 'Lawn & Garden', 'Cleaning',
    'Tutoring', 'Transport', 'Buy & Sell', 'Home Cooking', 'Catering',
    'Baker & Pastries', 'Pet Care', 'Beauty & Hair', 'Babysitting',
    'Tech Help', 'Painting', 'Photography', 'Mechanic', 'Roadside & Towing'
  ]

  useEffect(() => {
    fetchProviders()
  }, [])

  const fetchProviders = async () => {
    const { data } = await supabase
      .from('users')
      .select('id, full_name, city, state, services, rating, jobs_completed, featured, bio, photo_url')
      .eq('type', 'provider')
      .order('featured', { ascending: false })
      .order('jobs_completed', { ascending: false })
    setProviders(data || [])
    setLoading(false)
  }

  const availableStates = ['All', ...new Set(providers.map(p => p.state).filter(Boolean))]

  const filteredProviders = providers
    .filter(p => stateFilter === 'All' || p.state === stateFilter)
    .filter(p => filter === 'All' || (p.services && p.services.toLowerCase().includes(filter.toLowerCase())))
    .filter(p => {
      if (!search) return true
      const s = search.toLowerCase()
      return (
        (p.full_name && p.full_name.toLowerCase().includes(s)) ||
        (p.services && p.services.toLowerCase().includes(s)) ||
        (p.city && p.city.toLowerCase().includes(s))
      )
    })

  const renderStars = (rating) => {
    const stars = Math.round(rating || 0)
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }

  const getMailto = (email) => {
    return 'mailto:' + (email || '') + '?subject=NecesitoYa'
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f8f6f2', fontFamily: 'Arial' }}>

      <div style={{ background: 'linear-gradient(135deg,#1a1a2e,#0f3460)', padding: '40px 32px 30px' }}>
        <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px' }}>Home</a>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', margin: '16px 0 4px' }}>Find a Pro</h1>
        <p style={{ color: '#FF6B35', fontWeight: 'bold', marginBottom: '4px' }}>Encuentra un Profesional</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '24px' }}>
          {filteredProviders.length} providers available / proveedores disponibles
        </p>
        <input
          type="text"
          placeholder="Search by name, service, or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: 'none', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }}
        />
      </div>

      <div style={{ padding: '16px 32px', overflowX: 'auto', whiteSpace: 'nowrap', background: 'white', borderBottom: '1px solid #F0EDE8' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ display: 'inline-block', marginRight: '8px', padding: '8px 16px', borderRadius: '20px', border: `2px solid ${filter === cat ? '#FF6B35' : '#F0EDE8'}`, background: filter === cat ? '#FF6B35' : 'white', color: filter === cat ? 'white' : '#555', cursor: 'pointer', fontSize: '13px', fontWeight: filter === cat ? 'bold' : 'normal', whiteSpace: 'nowrap' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 32px', background: 'white', borderBottom: '1px solid #F0EDE8', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#888', fontWeight: '600' }}>State:</span>
        <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', color: '#333', cursor: 'pointer', background: 'white' }}>
          {availableStates.map(s => (
            <option key={s} value={s}>{s === 'All' ? 'All States' : s}</option>
          ))}
        </select>
        {stateFilter !== 'All' && (
          <button onClick={() => setStateFilter('All')} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #FF6B35', fontSize: '13px', color: '#FF6B35', cursor: 'pointer', background: 'white', fontWeight: '600' }}>Clear</button>
        )}
      </div>

      <div style={{ padding: '24px 32px', maxWidth: '1000px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
            <p>Loading providers...</p>
          </div>
        ) : filteredProviders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
            <p>No providers found. / No se encontraron proveedores.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredProviders.map(pro => (
              <div key={pro.id} style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: pro.featured ? '2px solid #FF6B35' : '2px solid transparent', position: 'relative' }}>

                {pro.featured && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'linear-gradient(135deg,#FF6B35,#F4A261)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>Featured</div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B35,#F4A261)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white', fontWeight: 'bold', flexShrink: 0, overflow: 'hidden' }}>
                    {pro.photo_url ? (
                      <img src={pro.photo_url} alt={pro.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      (pro.full_name || 'P')[0].toUpperCase()
                    )}
                  </div>
                  <div>
                    <h3 style={{ color: '#1a1a2e', margin: '0 0 2px', fontSize: '17px', fontWeight: '700' }}>{pro.full_name || 'Provider'}</h3>
                    <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>{pro.city}{pro.state ? ', ' + pro.state : ''}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <div>
                    <span style={{ color: '#FF6B35', fontSize: '16px' }}>{renderStars(pro.rating)}</span>
                    <span style={{ color: '#888', fontSize: '12px', marginLeft: '6px' }}>{pro.rating ? pro.rating.toFixed(1) : 'New'}</span>
                  </div>
                  <div style={{ color: '#888', fontSize: '13px' }}>{pro.jobs_completed || 0} jobs done</div>
                </div>

                {pro.bio && (
                  <p style={{ color: '#555', fontSize: '13px', lineHeight: '1.5', marginBottom: '12px' }}>{pro.bio}</p>
                )}

                {pro.services && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {pro.services.split(',').slice(0, 4).map((s, i) => (
                      <span key={i} style={{ background: '#FFF3EE', color: '#FF6B35', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>{s.trim()}</span>
                    ))}
                  </div>
                )}

                <a href={getMailto(pro.email)} style={{ display: 'block', background: 'linear-gradient(135deg,#FF6B35,#F4A261)', color: 'white', padding: '10px 20px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', textAlign: 'center' }}>Contact / Contactar</a>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}