'use client'
import { useEffect } from 'react'

export default function MyDashboard() {
  useEffect(() => {
    const provider = localStorage.getItem('ny_provider')
    const customer = localStorage.getItem('ny_customer')
    if (provider) {
      window.location.href = '/provider-dashboard'
    } else if (customer) {
      window.location.href = '/customer-dashboard'
    } else {
      window.location.href = '/login'
    }
  }, [])

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{color:'#888'}}>Loading...</div>
    </div>
  )
}