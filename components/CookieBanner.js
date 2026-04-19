'use client'
import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('ny_cookie_consent')
    if (!consent) {
      setShow(true)
    } else if (consent === 'accepted') {
      loadTrackers()
    }
  }, [])

  const loadTrackers = () => {
    // Signal to Meta Pixel and GA that consent is granted
    if (typeof window !== 'undefined') {
      if (window.fbq) window.fbq('consent', 'grant')
      if (window.gtag) window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
    }
  }

  const handleAccept = () => {
    localStorage.setItem('ny_cookie_consent', 'accepted')
    setShow(false)
    loadTrackers()
  }

  const handleReject = () => {
    localStorage.setItem('ny_cookie_consent', 'rejected')
    setShow(false)
    if (typeof window !== 'undefined') {
      if (window.fbq) window.fbq('consent', 'revoke')
      if (window.gtag) window.gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
      })
    }
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#1a1a2e',
      color: 'white',
      padding: '20px 24px',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
      zIndex: 9999,
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>
        <div style={{ flex: '1 1 400px', fontSize: '13px', lineHeight: '1.6' }}>
          🍪 We use cookies to improve your experience, analyze site usage, and assist with marketing. By clicking "Accept All", you agree to our use of cookies.{' '}
          <a href="/privacy" style={{ color: '#FF6B35', fontWeight: '600' }}>Learn more</a>
          <br/>
          <span style={{ color: '#cbd5e1', fontSize: '12px' }}>
            Usamos cookies para mejorar su experiencia. Al hacer clic en "Aceptar Todo", acepta nuestro uso de cookies.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={handleReject}
            style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Reject / Rechazar
          </button>
          <button
            onClick={handleAccept}
            style={{
              background: 'linear-gradient(135deg,#FF6B35,#F4A261)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Accept All / Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}