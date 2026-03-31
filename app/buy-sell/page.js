'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const SUPABASE_URL = 'https://tjtagdqdhgkmgmuozhlc.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGFnZHFkaGdrbWdtdW96aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQzMTIsImV4cCI6MjA4OTg4MDMxMn0.8DdoprOG4hWdwoYznHAX_BIT92kwnV77GhOK3Greh5Y'

const conditions = ['New / Nuevo', 'Like New / Como Nuevo', 'Good / Bueno', 'Fair / Regular', 'For Parts / Para Piezas']

export default function BuySell() {
  const [view, setView] = useState('browse')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedListing, setSelectedListing] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)
  const [form, setForm] = useState({
    customer_name: '', customer_email: '', customer_phone: '',
    title: '', description: '', budget: '', city: '', condition: '', category: 'Buy & Sell',
  })
  const [submitted, setSubmitted] = useState(false)
  const [posting, setPosting] = useState(false)
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [listingType, setListingType] = useState('selling')
  const [showInterestModal, setShowInterestModal] = useState(false)
  const [interestedEmail, setInterestedEmail] = useState('')
  const [interestSent, setInterestSent] = useState(false)

  useEffect(() => { fetchListings() }, [])

  const fetchListings = async () => {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/jobs?category=eq.Buy %26 Sell&order=created_at.desc&select=*`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    })
    const data = await res.json()
    setListings(data || [])
    setLoading(false)
  }

  const timeAgo = (date) => {
    const mins = Math.floor((new Date() - new Date(date + 'Z')) / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  const getPhotos = (listing) => {
    const photos = []
    if (listing.image_url) photos.push(listing.image_url)
    if (listing.image_url2) photos.push(listing.image_url2)
    if (listing.image_url3) photos.push(listing.image_url3)
    if (listing.image_url4) photos.push(listing.image_url4)
    return photos
  }

  const filteredListings = listings.filter(l => {
    if (!search) return true
    const s = search.toLowerCase()
    return (
      (l.title && l.title.toLowerCase().includes(s)) ||
      (l.description && l.description.toLowerCase().includes(s)) ||
      (l.city && l.city.toLowerCase().includes(s))
    )
  })

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4)
    setImageFiles(files)
    setImagePreviews(files.map(f => URL.createObjectURL(f)))
  }

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!form.customer_name || !form.customer_email || !form.title || !form.description || !form.city || !form.budget) {
      alert('Please fill in all required fields / Por favor complete todos los campos')
      return
    }
    setPosting(true)
    try {
      const imageUrls = []
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('job-images').upload(fileName, file)
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from('job-images').getPublicUrl(fileName)
          imageUrls.push(urlData.publicUrl)
        }
      }

      const descriptionText = form.condition
        ? `Condition: ${form.condition}\n\n${form.description}`
        : form.description

      const jobTitle = `${listingType === 'selling' ? 'FOR SALE:' : 'WANTED:'} ${form.title}`

      const res = await fetch(`${SUPABASE_URL}/rest/v1/jobs`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          customer_name: form.customer_name,
          customer_email: form.customer_email,
          customer_phone: form.customer_phone,
          title: jobTitle,
          description: descriptionText,
          budget: form.budget,
          city: form.city,
          category: 'Buy & Sell',
          image_url: imageUrls[0] || null,
          image_url2: imageUrls[1] || null,
          image_url3: imageUrls[2] || null,
          image_url4: imageUrls[3] || null,
          status: 'open',
        })
      })

      if (!res.ok) throw new Error('Failed to post listing')
      const [job] = await res.json()

      // Send seller confirmation email
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'listing_posted',
          job: { title: jobTitle, city: form.city, budget: form.budget },
          customerEmail: form.customer_email,
          customerName: form.customer_name,
        }),
      })

      setSubmitted(true)
      fetchListings()
    } catch(e) {
      console.log(e)
      alert('Something went wrong. Please try again.')
    }
    setPosting(false)
  }

  const openDetail = (listing) => {
    setSelectedListing(listing)
    setActivePhoto(0)
    setShowDetail(true)
    setInterestSent(false)
    setShowInterestModal(false)
    setInterestedEmail('')
  }

  const sendInterest = async () => {
    if (!interestedEmail) return
    // Notify seller that someone is interested
    await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'buyer_interested',
        job: selectedListing,
        providerEmail: interestedEmail,
        customerEmail: selectedListing.customer_email,
        customerName: selectedListing.customer_name,
      }),
    })
    setShowInterestModal(false)
    setInterestedEmail('')
    setInterestSent(true)
  }

  if (submitted) {
    return (
      <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
        <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center', maxWidth:'400px'}}>
          <div style={{fontSize:'64px', marginBottom:'16px'}}>{listingType === 'selling' ? '🏷️' : '🔍'}</div>
          <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>Listing Posted!</h2>
          <p style={{color:'#FF6B35', fontWeight:'600', marginBottom:'8px'}}>¡Anuncio Publicado!</p>
          <p style={{color:'#888', fontSize:'14px', marginBottom:'4px'}}>Your listing is now live on NecesitoYa.</p>
          <p style={{color:'#888', fontSize:'14px', marginBottom:'24px'}}>A confirmation email has been sent to you.</p>
          <button onClick={() => { setSubmitted(false); setView('browse'); setForm({customer_name:'',customer_email:'',customer_phone:'',title:'',description:'',budget:'',city:'',condition:'',category:'Buy & Sell'}); setImageFiles([]); setImagePreviews([]) }}
            style={{display:'inline-block', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 32px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold', border:'none', cursor:'pointer', marginRight:'12px'}}>
            See All Listings →
          </button>
          <a href="/" style={{display:'inline-block', color:'#888', padding:'12px 24px', textDecoration:'none'}}>Home</a>
        </div>
      </div>
    )
  }

  return (
    <main style={{minHeight:'100vh', background:'#f8f6f2', fontFamily:'Arial'}}>

      {/* Detail Modal */}
      {showDetail && selectedListing && (
        <div style={{position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.8)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px', overflowY:'auto'}}>
          <div style={{backgroundColor:'white', borderRadius:'20px', maxWidth:'560px', width:'100%', overflow:'hidden', maxHeight:'90vh', overflowY:'auto'}}>
            {(() => {
              const photos = getPhotos(selectedListing)
              return photos.length > 0 ? (
                <div>
                  <div style={{position:'relative'}}>
                    <img src={photos[activePhoto]} alt={selectedListing.title} style={{width:'100%', height:'280px', objectFit:'cover'}}/>
                    <button onClick={() => setShowDetail(false)} style={{position:'absolute', top:'12px', right:'12px', background:'rgba(0,0,0,0.6)', color:'white', border:'none', borderRadius:'50%', width:'36px', height:'36px', cursor:'pointer', fontSize:'20px', display:'flex', alignItems:'center', justifyContent:'center'}}>×</button>
                    {photos.length > 1 && (
                      <div style={{position:'absolute', bottom:'12px', left:'50%', transform:'translateX(-50%)', display:'flex', gap:'6px'}}>
                        {photos.map((_, i) => (
                          <button key={i} onClick={() => setActivePhoto(i)} style={{width:'8px', height:'8px', borderRadius:'50%', border:'none', cursor:'pointer', backgroundColor: i === activePhoto ? 'white' : 'rgba(255,255,255,0.5)'}}/>
                        ))}
                      </div>
                    )}
                  </div>
                  {photos.length > 1 && (
                    <div style={{display:'flex', gap:'8px', padding:'12px', overflowX:'auto'}}>
                      {photos.map((photo, i) => (
                        <img key={i} src={photo} alt={`Photo ${i+1}`} onClick={() => setActivePhoto(i)}
                          style={{width:'72px', height:'72px', objectFit:'cover', borderRadius:'8px', cursor:'pointer', border: i === activePhoto ? '3px solid #FF6B35' : '3px solid transparent', flexShrink:0}}/>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{position:'relative'}}>
                  <div style={{width:'100%', height:'200px', background:'#f8f6f2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'64px'}}>🛒</div>
                  <button onClick={() => setShowDetail(false)} style={{position:'absolute', top:'12px', right:'12px', background:'rgba(0,0,0,0.6)', color:'white', border:'none', borderRadius:'50%', width:'36px', height:'36px', cursor:'pointer', fontSize:'20px'}}>×</button>
                </div>
              )
            })()}

            <div style={{padding:'24px'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px'}}>
                <h2 style={{color:'#1a1a2e', fontSize:'20px', fontWeight:'700', margin:0, flex:1, marginRight:'12px'}}>{selectedListing.title}</h2>
                {selectedListing.budget && (
                  <div style={{fontSize:'24px', fontWeight:'bold', color:'#2D6A4F', flexShrink:0}}>{selectedListing.budget}</div>
                )}
              </div>
              <div style={{display:'flex', gap:'12px', marginBottom:'16px', flexWrap:'wrap'}}>
                <span style={{fontSize:'13px', color:'#888'}}>📍 {selectedListing.city}</span>
                <span style={{fontSize:'13px', color:'#888'}}>🕐 {timeAgo(selectedListing.created_at)}</span>
                <span style={{fontSize:'13px', color:'#888'}}>👤 {selectedListing.customer_name}</span>
              </div>
              <div style={{backgroundColor:'#f8f6f2', borderRadius:'12px', padding:'16px', marginBottom:'20px'}}>
                <p style={{color:'#333', fontSize:'14px', lineHeight:'1.7', margin:0, whiteSpace:'pre-wrap'}}>{selectedListing.description}</p>
              </div>

              {interestSent ? (
                <div style={{backgroundColor:'#dcfce7', borderRadius:'12px', padding:'16px', textAlign:'center'}}>
                  <div style={{fontSize:'32px', marginBottom:'8px'}}>✅</div>
                  <p style={{color:'#16a34a', fontWeight:'600', margin:0}}>Interest sent! The seller will contact you.</p>
                  <p style={{color:'#16a34a', fontSize:'13px', margin:'4px 0 0'}}>¡Interés enviado! El vendedor te contactará.</p>
                </div>
              ) : showInterestModal ? (
                <div style={{backgroundColor:'#f8f6f2', borderRadius:'12px', padding:'20px'}}>
                  <h3 style={{color:'#1a1a2e', fontSize:'16px', fontWeight:'700', marginBottom:'8px'}}>I'm Interested!</h3>
                  <p style={{color:'#6b7280', fontSize:'13px', marginBottom:'16px'}}>Enter your email and the seller will contact you directly. / Ingresa tu correo y el vendedor te contactará.</p>
                  <input
                    type="email"
                    value={interestedEmail}
                    onChange={(e) => setInterestedEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{width:'100%', padding:'10px 14px', border:'1px solid #d1d5db', borderRadius:'8px', fontSize:'14px', boxSizing:'border-box', marginBottom:'12px'}}
                  />
                  <button onClick={sendInterest} style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px', borderRadius:'8px', fontSize:'16px', fontWeight:'600', border:'none', cursor:'pointer', marginBottom:'8px'}}>
                    Send Interest / Enviar Interés
                  </button>
                  <button onClick={() => setShowInterestModal(false)} style={{width:'100%', backgroundColor:'white', color:'#6b7280', padding:'10px', borderRadius:'8px', fontSize:'14px', border:'1px solid #e5e7eb', cursor:'pointer'}}>
                    Cancel / Cancelar
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowInterestModal(true)} style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'16px', borderRadius:'12px', fontSize:'16px', fontWeight:'bold', border:'none', cursor:'pointer'}}>
                  I'm Interested → / Me Interesa →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1a1a2e,#0f3460)', padding:'40px 32px 30px'}}>
        <a href="/" style={{color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:'14px'}}>← Home</a>
        <h1 style={{color:'white', fontSize:'32px', fontWeight:'bold', margin:'16px 0 4px'}}>Buy & Sell</h1>
        <p style={{color:'#FF6B35', fontWeight:'bold', marginBottom:'4px'}}>Compra y Vende</p>
        <p style={{color:'rgba(255,255,255,0.5)', fontSize:'14px', marginBottom:'24px'}}>{filteredListings.length} listings available / anuncios disponibles</p>
        <input type="text" placeholder="Search listings... / Buscar anuncios..." value={search} onChange={e => setSearch(e.target.value)}
          style={{width:'100%', padding:'14px 20px', borderRadius:'12px', border:'none', fontSize:'15px', boxSizing:'border-box', outline:'none', backgroundColor:'rgba(255,255,255,0.1)', color:'white'}}/>
      </div>

      {/* Tab Switcher */}
      <div style={{background:'white', borderBottom:'1px solid #F0EDE8', display:'flex'}}>
        <button onClick={() => setView('browse')} style={{flex:1, padding:'16px', border:'none', cursor:'pointer', fontSize:'15px', fontWeight: view === 'browse' ? 'bold' : 'normal', color: view === 'browse' ? '#FF6B35' : '#888', background:'white', borderBottom: view === 'browse' ? '3px solid #FF6B35' : 'none'}}>
          🛍️ Browse / Ver Todo
        </button>
        <button onClick={() => setView('post')} style={{flex:1, padding:'16px', border:'none', cursor:'pointer', fontSize:'15px', fontWeight: view === 'post' ? 'bold' : 'normal', color: view === 'post' ? '#FF6B35' : '#888', background:'white', borderBottom: view === 'post' ? '3px solid #FF6B35' : 'none'}}>
          + Post / Publicar
        </button>
      </div>

      {/* Browse View */}
      {view === 'browse' && (
        <div style={{padding:'24px 32px', maxWidth:'900px', margin:'0 auto'}}>
          {loading ? (
            <div style={{textAlign:'center', padding:'60px', color:'#888'}}>
              <div style={{fontSize:'40px', marginBottom:'16px'}}>⏳</div>
              <p>Loading listings... / Cargando anuncios...</p>
            </div>
          ) : filteredListings.length === 0 ? (
            <div style={{textAlign:'center', padding:'60px', color:'#888'}}>
              <div style={{fontSize:'40px', marginBottom:'16px'}}>🛒</div>
              <p style={{marginBottom:'4px'}}>No listings yet.</p>
              <p style={{fontSize:'14px', marginBottom:'24px'}}>¡Sé el primero en publicar!</p>
              <button onClick={() => setView('post')} style={{background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 28px', borderRadius:'20px', border:'none', fontWeight:'bold', cursor:'pointer'}}>
                Post the first listing →
              </button>
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'20px'}}>
              {filteredListings.map(listing => {
                const photos = getPhotos(listing)
                return (
                  <div key={listing.id} onClick={() => openDetail(listing)}
                    style={{background:'white', borderRadius:'20px', overflow:'hidden', boxShadow:'0 2px 16px rgba(0,0,0,0.06)', cursor:'pointer', transition:'transform 0.2s'}}
                    onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
                  >
                    {photos.length > 0 ? (
                      <div style={{position:'relative'}}>
                        <img src={photos[0]} alt={listing.title} style={{width:'100%', height:'180px', objectFit:'cover'}}/>
                        {photos.length > 1 && (
                          <div style={{position:'absolute', top:'8px', right:'8px', backgroundColor:'rgba(0,0,0,0.6)', color:'white', fontSize:'11px', fontWeight:'bold', padding:'3px 8px', borderRadius:'20px'}}>
                            📷 {photos.length}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{width:'100%', height:'180px', background:'#f8f6f2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'48px'}}>🛒</div>
                    )}
                    <div style={{padding:'16px'}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px'}}>
                        <h3 style={{color:'#1a1a2e', fontSize:'15px', fontWeight:'700', margin:0, flex:1, marginRight:'8px'}}>{listing.title}</h3>
                        {listing.budget && (
                          <div style={{fontSize:'18px', fontWeight:'bold', color:'#2D6A4F', flexShrink:0}}>{listing.budget}</div>
                        )}
                      </div>
                      <p style={{color:'#888', fontSize:'12px', marginBottom:'8px'}}>📍 {listing.city} · 🕐 {timeAgo(listing.created_at)}</p>
                      <p style={{color:'#555', fontSize:'13px', lineHeight:'1.5', marginBottom:'12px'}}>{listing.description?.substring(0, 80)}...</p>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <span style={{fontSize:'12px', color:'#888'}}>By {listing.customer_name}</span>
                        {listing.status === 'open' ? (
                          <span style={{background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'6px 14px', borderRadius:'12px', fontWeight:'bold', fontSize:'12px'}}>
                            View Details →
                          </span>
                        ) : (
                          <span style={{fontSize:'12px', color:'#16a34a', fontWeight:'600'}}>✓ Sold</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Post View */}
      {view === 'post' && (
        <div style={{padding:'32px', display:'flex', justifyContent:'center'}}>
          <div style={{background:'white', borderRadius:'24px', padding:'40px', width:'100%', maxWidth:'560px'}}>
            <div style={{marginBottom:'24px'}}>
              <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'8px', fontSize:'14px'}}>I want to... / Quiero...</label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                <button onClick={() => setListingType('selling')} style={{padding:'16px', borderRadius:'12px', border:`2px solid ${listingType === 'selling' ? '#FF6B35' : '#F0EDE8'}`, background: listingType === 'selling' ? '#FFF3EE' : 'white', cursor:'pointer'}}>
                  <div style={{fontSize:'24px', marginBottom:'4px'}}>🏷️</div>
                  <div style={{fontWeight:'bold', color: listingType === 'selling' ? '#FF6B35' : '#1a1a2e', fontSize:'14px'}}>Sell Something</div>
                  <div style={{color:'#888', fontSize:'12px'}}>Vender algo</div>
                </button>
                <button onClick={() => setListingType('buying')} style={{padding:'16px', borderRadius:'12px', border:`2px solid ${listingType === 'buying' ? '#FF6B35' : '#F0EDE8'}`, background: listingType === 'buying' ? '#FFF3EE' : 'white', cursor:'pointer'}}>
                  <div style={{fontSize:'24px', marginBottom:'4px'}}>🔍</div>
                  <div style={{fontWeight:'bold', color: listingType === 'buying' ? '#FF6B35' : '#1a1a2e', fontSize:'14px'}}>Find Something</div>
                  <div style={{color:'#888', fontSize:'12px'}}>Buscar algo</div>
                </button>
              </div>
            </div>

            {[
              {label:'Your Name / Tu Nombre *', field:'customer_name', placeholder:'David Cruzado', type:'text'},
              {label:'Email *', field:'customer_email', placeholder:'you@email.com', type:'email'},
              {label:'Phone / Teléfono (optional)', field:'customer_phone', placeholder:'(863) 555-0100', type:'tel'},
            ].map(({label, field, placeholder, type}) => (
              <div key={field} style={{marginBottom:'20px'}}>
                <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>{label}</label>
                <input type={type} placeholder={placeholder} value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box'}}/>
              </div>
            ))}

            <div style={{marginBottom:'20px'}}>
              <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>
                {listingType === 'selling' ? 'Item Name *' : 'What are you looking for? *'}
              </label>
              <input type="text" placeholder={listingType === 'selling' ? 'e.g. iPhone 13, Sofa' : 'e.g. Used Toyota'} value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box'}}/>
            </div>

            <div style={{marginBottom:'20px'}}>
              <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Description / Descripción *</label>
              <textarea placeholder="Describe the item..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', resize:'none', height:'100px', fontFamily:'Arial'}}/>
            </div>

            {listingType === 'selling' && (
              <div style={{marginBottom:'20px'}}>
                <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'8px', fontSize:'14px'}}>Condition / Condición</label>
                <div style={{display:'flex', flexWrap:'wrap', gap:'8px'}}>
                  {conditions.map(c => (
                    <button key={c} onClick={() => setForm({...form, condition: c})} style={{padding:'8px 14px', borderRadius:'20px', border:`2px solid ${form.condition === c ? '#FF6B35' : '#F0EDE8'}`, background: form.condition === c ? '#FFF3EE' : 'white', cursor:'pointer', fontSize:'12px', color: form.condition === c ? '#FF6B35' : '#333', fontWeight: form.condition === c ? 'bold' : 'normal'}}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{marginBottom:'20px'}}>
              <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>
                {listingType === 'selling' ? 'Asking Price / Precio *' : 'Budget / Presupuesto *'}
              </label>
              <input type="text" placeholder="e.g. $150" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box'}}/>
            </div>

            <div style={{marginBottom:'20px'}}>
              <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>City / Ciudad *</label>
              <input type="text" placeholder="Haines City, FL" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box'}}/>
            </div>

            <div style={{marginBottom:'32px'}}>
              <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>
                📷 Photos {listingType === 'selling' ? '(up to 4 — recommended!)' : '(optional)'}
              </label>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{width:'100%', padding:'12px', borderRadius:'12px', border:'2px dashed #F0EDE8', fontSize:'14px', boxSizing:'border-box', cursor:'pointer'}}/>
              {imagePreviews.length > 0 && (
                <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'8px', marginTop:'12px'}}>
                  {imagePreviews.map((preview, index) => (
                    <div key={index} style={{position:'relative'}}>
                      <img src={preview} alt={`Preview ${index + 1}`} style={{width:'100%', borderRadius:'10px', height:'120px', objectFit:'cover'}}/>
                      <button onClick={() => removeImage(index)} style={{position:'absolute', top:'4px', right:'4px', background:'rgba(0,0,0,0.5)', color:'white', border:'none', borderRadius:'50%', width:'24px', height:'24px', cursor:'pointer', fontSize:'14px'}}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={handleSubmit} disabled={posting} style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>
              {posting ? 'Posting...' : listingType === 'selling' ? 'Post Listing / Publicar →' : 'Post Request / Publicar →'}
            </button>
            <p style={{textAlign:'center', color:'#888', fontSize:'12px', marginTop:'16px'}}>Free to post · Gratis publicar</p>
          </div>
        </div>
      )}
    </main>
  )
}