'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const conditions = ['New / Nuevo', 'Like New / Como Nuevo', 'Good / Bueno', 'Fair / Regular', 'For Parts / Para Piezas']

export default function BuySell() {
  const [view, setView] = useState('browse')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    title: '',
    description: '',
    budget: '',
    city: '',
    condition: '',
    category: 'Buy & Sell',
  })
  const [submitted, setSubmitted] = useState(false)
  const [posting, setPosting] = useState(false)
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [listingType, setListingType] = useState('selling')
  const [showInterestModal, setShowInterestModal] = useState(false)
  const [selectedListing, setSelectedListing] = useState(null)
  const [interestedEmail, setInterestedEmail] = useState('')

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    const { data } = await supabase
      .from('jobs')
      .select('*')
      .eq('category', 'Buy & Sell')
      .order('created_at', { ascending: false })
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

      const { error } = await supabase.from('jobs').insert({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        title: `${listingType === 'selling' ? 'FOR SALE:' : 'WANTED:'} ${form.title}`,
        description: descriptionText,
        budget: form.budget,
        city: form.city,
        category: 'Buy & Sell',
        image_url: imageUrls[0] || null,
        status: 'open',
      })

      if (error) throw error
      setSubmitted(true)
      fetchListings()
    } catch(e) {
      console.log(e)
      alert('Something went wrong. Please try again.')
    }
    setPosting(false)
  }

  const handleInterest = (listing) => {
    setSelectedListing(listing)
    setShowInterestModal(true)
  }

  const sendInterest = async () => {
    if (!interestedEmail) return
    await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'provider_accepted',
        job: selectedListing,
        providerName: interestedEmail.split('@')[0],
        providerEmail: interestedEmail,
        customerEmail: selectedListing.customer_email,
        customerName: selectedListing.customer_name,
      }),
    })
    setShowInterestModal(false)
    setInterestedEmail('')
    alert('Your interest has been sent! / ¡Tu interés fue enviado!')
  }

  if (submitted) {
    return (
      <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
        <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center', maxWidth:'400px'}}>
          <div style={{fontSize:'64px', marginBottom:'16px'}}>{listingType === 'selling' ? '🏷️' : '🔍'}</div>
          <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>Listing Posted!</h2>
          <p style={{color:'#FF6B35', fontWeight:'600', marginBottom:'8px'}}>¡Anuncio Publicado!</p>
          <p style={{color:'#888', fontSize:'14px', marginBottom:'24px'}}>Your listing is now live on NecesitoYa</p>
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

      {/* Interest Modal */}
      {showInterestModal && (
        <div style={{position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px'}}>
          <div style={{backgroundColor:'white', borderRadius:'16px', padding:'32px', maxWidth:'400px', width:'100%'}}>
            <h3 style={{fontSize:'20px', fontWeight:'700', color:'#1a1a2e', marginBottom:'8px'}}>{'{"I\'m Interested!"}'}</h3>
            <p style={{color:'#6b7280', fontSize:'14px', marginBottom:'16px'}}>
              Interested in: <strong>{selectedListing?.title}</strong>
            </p>
            <p style={{color:'#6b7280', fontSize:'13px', marginBottom:'16px'}}>
              Posted by {selectedListing?.customer_name} · {selectedListing?.city}
            </p>
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
        </div>
      )}

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1a1a2e,#0f3460)', padding:'40px 32px 30px'}}>
        <a href="/" style={{color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:'14px'}}>← Home</a>
        <h1 style={{color:'white', fontSize:'32px', fontWeight:'bold', margin:'16px 0 4px'}}>Buy & Sell</h1>
        <p style={{color:'#FF6B35', fontWeight:'bold', marginBottom:'4px'}}>Compra y Vende</p>
        <p style={{color:'rgba(255,255,255,0.5)', fontSize:'14px', marginBottom:'24px'}}>{filteredListings.length} listings available / anuncios disponibles</p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search listings... / Buscar anuncios..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{width:'100%', padding:'14px 20px', borderRadius:'12px', border:'none', fontSize:'15px', boxSizing:'border-box', outline:'none', backgroundColor:'rgba(255,255,255,0.1)', color:'white'}}
        />
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
              {filteredListings.map(listing => (
                <div key={listing.id} style={{background:'white', borderRadius:'20px', overflow:'hidden', boxShadow:'0 2px 16px rgba(0,0,0,0.06)'}}>
                  {listing.image_url ? (
                    <img src={listing.image_url} alt={listing.title} style={{width:'100%', height:'180px', objectFit:'cover'}}/>
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
                        <button onClick={() => handleInterest(listing)} style={{background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'8px 16px', borderRadius:'12px', border:'none', fontWeight:'bold', fontSize:'13px', cursor:'pointer'}}>
                          {"I'm Interested →"}
                        </button>
                      ) : (
                        <span style={{fontSize:'12px', color:'#16a34a', fontWeight:'600'}}>✓ Sold</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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