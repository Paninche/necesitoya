'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const conditions = ['New / Nuevo', 'Like New / Como Nuevo', 'Good / Bueno', 'Fair / Regular', 'For Parts / Para Piezas']

export default function BuySell() {
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
  const [loading, setLoading] = useState(false)
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [listingType, setListingType] = useState('selling')

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
    setLoading(true)
    try {
      // Upload all images
      const imageUrls = []
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('job-images')
          .upload(fileName, file)
        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('job-images')
            .getPublicUrl(fileName)
          imageUrls.push(urlData.publicUrl)
        }
      }

      const { condition, ...formWithoutCondition } = form
      const { error } = await supabase.from('jobs').insert({
        ...formWithoutCondition,
        title: `${listingType === 'selling' ? '🏷️ FOR SALE:' : '🔍 WANTED:'} ${form.title}`,
        description: `Condition: ${form.condition}\n\n${form.description}`,
        image_url: imageUrls[0] || null,
        status: 'open',
      })

      if (error) throw error
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
        <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center', maxWidth:'400px'}}>
          <div style={{fontSize:'64px', marginBottom:'16px'}}>{listingType === 'selling' ? '🏷️' : '🔍'}</div>
          <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>Listing Posted!</h2>
          <p style={{color:'#FF6B35', fontWeight:'600', marginBottom:'8px'}}>¡Anuncio Publicado!</p>
          <p style={{color:'#888', fontSize:'14px', marginBottom:'24px'}}>Your listing is now live on NecesitoYa</p>
          <a href="/jobs" style={{display:'inline-block', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'12px 32px', borderRadius:'20px', textDecoration:'none', fontWeight:'bold', marginRight:'12px'}}>See All Listings →</a>
          <a href="/" style={{display:'inline-block', color:'#888', padding:'12px 24px', textDecoration:'none'}}>Home</a>
        </div>
      </div>
    )
  }

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', fontFamily:'Arial', padding:'32px', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', width:'100%', maxWidth:'560px'}}>
        <a href="/" style={{color:'#888', textDecoration:'none', fontSize:'14px'}}>← Back / Regresar</a>
        <div style={{fontSize:'40px', margin:'16px 0 8px'}}>🛒</div>
        <h1 style={{color:'#1a1a2e', marginBottom:'4px'}}>Buy & Sell</h1>
        <p style={{color:'#888', marginBottom:'32px'}}>Compra y Vende — Post items for sale or find what you need</p>

        {/* Listing Type */}
        <div style={{marginBottom:'24px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'8px', fontSize:'14px'}}>I want to... / Quiero...</label>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
            <button
              onClick={() => setListingType('selling')}
              style={{padding:'16px', borderRadius:'12px', border:`2px solid ${listingType === 'selling' ? '#FF6B35' : '#F0EDE8'}`, background: listingType === 'selling' ? '#FFF3EE' : 'white', cursor:'pointer', textAlign:'center'}}>
              <div style={{fontSize:'24px', marginBottom:'4px'}}>🏷️</div>
              <div style={{fontWeight:'bold', color: listingType === 'selling' ? '#FF6B35' : '#1a1a2e', fontSize:'14px'}}>Sell Something</div>
              <div style={{color:'#888', fontSize:'12px'}}>Vender algo</div>
            </button>
            <button
              onClick={() => setListingType('buying')}
              style={{padding:'16px', borderRadius:'12px', border:`2px solid ${listingType === 'buying' ? '#FF6B35' : '#F0EDE8'}`, background: listingType === 'buying' ? '#FFF3EE' : 'white', cursor:'pointer', textAlign:'center'}}>
              <div style={{fontSize:'24px', marginBottom:'4px'}}>🔍</div>
              <div style={{fontWeight:'bold', color: listingType === 'buying' ? '#FF6B35' : '#1a1a2e', fontSize:'14px'}}>Find Something</div>
              <div style={{color:'#888', fontSize:'12px'}}>Buscar algo</div>
            </button>
          </div>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Your Name / Tu Nombre *</label>
          <input type="text" placeholder="David Cruzado" value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Email *</label>
          <input type="email" placeholder="you@email.com" value={form.customer_email} onChange={e => setForm({...form, customer_email: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Phone / Teléfono (optional)</label>
          <input type="tel" placeholder="(863) 555-0100" value={form.customer_phone} onChange={e => setForm({...form, customer_phone: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>
            {listingType === 'selling' ? 'Item Name / Nombre del Artículo *' : 'What are you looking for? / ¿Qué buscas? *'}
          </label>
          <input type="text" placeholder={listingType === 'selling' ? 'e.g. iPhone 13, Sofa, Bicycle' : 'e.g. Used Toyota, Washing Machine'} value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box'}}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>Description / Descripción *</label>
          <textarea
            placeholder={listingType === 'selling' ? 'Describe the item, any defects, dimensions, etc.' : 'Describe what you are looking for, your budget, preferences...'}
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            style={{width:'100%', padding:'12px 16px', borderRadius:'12px', border:'2px solid #F0EDE8', fontSize:'16px', boxSizing:'border-box', resize:'none', height:'100px', fontFamily:'Arial'}}
          />
        </div>

        {listingType === 'selling' && (
          <div style={{marginBottom:'20px'}}>
            <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'8px', fontSize:'14px'}}>Condition / Condición</label>
            <div style={{display:'flex', flexWrap:'wrap', gap:'8px'}}>
              {conditions.map(c => (
                <button key={c} onClick={() => setForm({...form, condition: c})}
                  style={{padding:'8px 14px', borderRadius:'20px', border:`2px solid ${form.condition === c ? '#FF6B35' : '#F0EDE8'}`, background: form.condition === c ? '#FFF3EE' : 'white', cursor:'pointer', fontSize:'12px', color: form.condition === c ? '#FF6B35' : '#333', fontWeight: form.condition === c ? 'bold' : 'normal'}}>
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

        {/* Photo Upload - up to 4 photos */}
        <div style={{marginBottom:'32px'}}>
          <label style={{display:'block', fontWeight:'bold', color:'#1a1a2e', marginBottom:'6px', fontSize:'14px'}}>
            📷 Photos / Fotos {listingType === 'selling' ? '(up to 4 — highly recommended!)' : '(optional)'}
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{width:'100%', padding:'12px', borderRadius:'12px', border:'2px dashed #F0EDE8', fontSize:'14px', boxSizing:'border-box', cursor:'pointer'}}
          />
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

        <button onClick={handleSubmit} disabled={loading} style={{width:'100%', background:'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>
          {loading ? 'Posting... / Publicando...' : listingType === 'selling' ? 'Post Listing / Publicar Anuncio →' : 'Post Request / Publicar Búsqueda →'}
        </button>
        <p style={{textAlign:'center', color:'#888', fontSize:'12px', marginTop:'16px'}}>Free to post · Gratis publicar</p>
      </div>
    </main>
  )
}