'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Join() {
  const [mode, setMode] = useState(null) // 'customer' | 'provider'
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', city: '', services: '', language: 'en'
  })

  const services = [
    "Hauling & Pickup", "Handyman", "Lawn & Garden", "Cleaning",
    "Tutoring", "Transport", "Home Cooking", "Catering",
    "Baker & Pastries", "Pet Care", "Beauty & Hair", "Babysitting",
    "Tech Help", "Painting", "Photography", "Mechanic", "Roadside & Towing"
  ]

  const [selectedServices, setSelectedServices] = useState([])

  const toggleService = (s) => {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const handleSubmit = async () => {
    if (!form.full_name || !form.email || !form.city) {
      alert('Please fill in all required fields / Por favor complete todos los campos')
      return
    }
    setLoading(true)
    try {
      await supabase.from('users').insert({
        ...form,
        type: mode,
        services: selectedServices.join(', '),
      })
      setDone(true)
    } catch(e) {
      console.log(e)
    }
    setLoading(false)
  }

  // Success screen
  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Arial' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '48px 40px', maxWidth: '480px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a2e', marginBottom: '8px' }}>
            {mode === 'provider' ? "You're in! Let's get you paid." : "You're in! Find help now."}
          </h2>
          <p style={{ color: '#FF6B35', fontWeight: '600', marginBottom: '16px' }}>
            {mode === 'provider' ? '¡Estás dentro! Empieza a ganar.' : '¡Estás dentro! Encuentra ayuda ahora.'}
          </p>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px', lineHeight: '1.6' }}>
            {mode === 'provider'
              ? 'Welcome to NecesitoYa! Go to your dashboard to connect your bank account and start accepting jobs.'
              : 'Welcome to NecesitoYa! Browse available jobs or post what you need right now.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mode === 'provider' ? (
              <>
                <a href="/jobs" style={{ display: 'block', background: 'linear-gradient(135deg, #FF6B35, #F4A261)', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '16px' }}>
                  Browse Jobs / Ver Trabajos →
                </a>
                <a href="/provider-dashboard" style={{ display: 'block', background: 'white', border: '2px solid #e5e7eb', color: '#1a1a2e', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>
                  My Dashboard / Mi Panel →
                </a>
              </>
            ) : (
              <>
                <a href="/post-job" style={{ display: 'block', background: 'linear-gradient(135deg, #FF6B35, #F4A261)', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '16px' }}>
                  Post a Job / Publicar Trabajo →
                </a>
                <a href="/jobs" style={{ display: 'block', background: 'white', border: '2px solid #e5e7eb', color: '#1a1a2e', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>
                  Browse Jobs / Ver Trabajos →
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Mode selection screen
  if (!mode) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Arial' }}>
        <div style={{ maxWidth: '560px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>⚡ NecesitoYa</div>
            <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>Join America's Bilingual Local Services App</div>
            <div style={{ fontSize: '15px', color: '#FF6B35' }}>Únete a la App Bilingüe de Servicios Locales</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Customer Card */}
            <button onClick={() => setMode('customer')} style={{ background: 'white', borderRadius: '20px', padding: '32px 24px', border: 'none', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🙋</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a2e', marginBottom: '4px' }}>I Need Help</div>
              <div style={{ fontSize: '15px', color: '#FF6B35', fontWeight: '600', marginBottom: '12px' }}>Necesito Ayuda</div>
              <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
                Post jobs and connect with trusted local providers near you
              </div>
              <div style={{ background: 'linear-gradient(135deg, #FF6B35, #F4A261)', color: 'white', padding: '10px 24px', borderRadius: '20px', fontSize: '14px', fontWeight: '700' }}>
                Sign Up Free →
              </div>
            </button>

            {/* Provider Card */}
            <button onClick={() => setMode('provider')} style={{ background: 'white', borderRadius: '20px', padding: '32px 24px', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔧</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a2e', marginBottom: '4px' }}>I Offer Services</div>
              <div style={{ fontSize: '15px', color: '#FF6B35', fontWeight: '600', marginBottom: '12px' }}>Ofrezco Servicios</div>
              <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
                Get paid for your skills — keep 92% of every job, paid to your bank
              </div>
              <div style={{ background: 'linear-gradient(135deg, #FF6B35, #F4A261)', color: 'white', padding: '10px 24px', borderRadius: '20px', fontSize: '14px', fontWeight: '700' }}>
                Start Earning →
              </div>
            </button>
          </div>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '24px' }}>
            Already have an account? <a href="/customer-dashboard" style={{ color: '#FF6B35' }}>Customer</a> · <a href="/provider-dashboard" style={{ color: '#FF6B35' }}>Provider</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '40px', maxWidth: '520px', width: '100%' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>{mode === 'provider' ? '🔧' : '🙋'}</div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a2e', marginBottom: '4px' }}>
            {mode === 'provider' ? 'Become a Provider' : 'Find Local Help'}
          </h2>
          <p style={{ color: '#FF6B35', fontWeight: '600', fontSize: '14px', marginBottom: '0' }}>
            {mode === 'provider' ? 'Conviértete en Proveedor' : 'Encuentra Ayuda Local'}
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Full Name / Nombre Completo *
            </label>
            <input
              type="text"
              value={form.full_name}
              onChange={e => setForm({...form, full_name: e.target.value})}
              placeholder="David Cruzado"
              style={{ width: '100%', padding: '12px 14px', border: '2px solid #F0EDE8', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Email *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              placeholder="you@email.com"
              style={{ width: '100%', padding: '12px 14px', border: '2px solid #F0EDE8', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Phone / Teléfono
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})}
              placeholder="(863) 555-0100"
              style={{ width: '100%', padding: '12px 14px', border: '2px solid #F0EDE8', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              City / Ciudad *
            </label>
            <input
              type="text"
              value={form.city}
              onChange={e => setForm({...form, city: e.target.value})}
              placeholder="Haines City, FL"
              style={{ width: '100%', padding: '12px 14px', border: '2px solid #F0EDE8', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Preferred Language / Idioma Preferido
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['en', 'es', 'both'].map(lang => (
                <button key={lang} onClick={() => setForm({...form, language: lang})}
                  style={{ flex: 1, padding: '10px', border: `2px solid ${form.language === lang ? '#FF6B35' : '#F0EDE8'}`, borderRadius: '10px', background: form.language === lang ? '#FFF3EE' : 'white', color: form.language === lang ? '#FF6B35' : '#6b7280', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                  {lang === 'en' ? '🇺🇸 English' : lang === 'es' ? '🇲🇽 Español' : '🌎 Both'}
                </button>
              ))}
            </div>
          </div>

          {/* Services for providers */}
          {mode === 'provider' && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                What services do you offer? / ¿Qué servicios ofreces?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {services.map(s => (
                  <button key={s} onClick={() => toggleService(s)}
                    style={{ padding: '8px 10px', border: `2px solid ${selectedServices.includes(s) ? '#FF6B35' : '#F0EDE8'}`, borderRadius: '8px', background: selectedServices.includes(s) ? '#FFF3EE' : 'white', color: selectedServices.includes(s) ? '#FF6B35' : '#374151', fontSize: '12px', cursor: 'pointer', textAlign: 'left', fontWeight: selectedServices.includes(s) ? '600' : 'normal' }}>
                    {selectedServices.includes(s) ? '✓ ' : ''}{s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', background: loading ? '#ccc' : 'linear-gradient(135deg, #FF6B35, #F4A261)', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px' }}>
            {loading ? 'Joining...' : mode === 'provider' ? 'Start Earning / Empezar a Ganar →' : 'Find Help Now / Encontrar Ayuda →'}
          </button>

          <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '13px', cursor: 'pointer', textAlign: 'center' }}>
            ← Go back / Regresar
          </button>
        </div>
      </div>
    </div>
  )
}