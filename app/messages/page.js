'use client'
import { useState, useEffect } from 'react'

const SUPABASE_URL = 'https://tjtagdqdhgkmgmuozhlc.supabase.co'
const APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGFnZHFkaGdrbWdtdW96aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQzMTIsImV4cCI6MjA4OTg4MDMxMn0.8DdoprOG4hWdwoYznHAX_BIT92kwnV77GhOK3Greh5Y'

export default function Messages() {
  const [jobId, setJobId] = useState(null)
  const [job, setJob] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [identified, setIdentified] = useState(false)
  const [isCustomer, setIsCustomer] = useState(false)
  const [isProvider, setIsProvider] = useState(false)
  const [jobStatus, setJobStatus] = useState('open')
  const [accepting, setAccepting] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('job')
    const providerEmailParam = params.get('provider')

    if (id) {
      setJobId(id)
      fetchJob(id)
    }

    const savedProvider = localStorage.getItem('ny_provider')
    const savedCustomer = localStorage.getItem('ny_customer')

    if (savedProvider) {
      const p = JSON.parse(savedProvider)
      setSenderName(p.full_name || p.email)
      setSenderEmail(p.email)
      setIdentified(true)
      setIsProvider(true)
    } else if (savedCustomer) {
      const c = JSON.parse(savedCustomer)
      setSenderName(c.full_name || c.customer_name || c.email)
      setSenderEmail(c.email)
      setIdentified(true)
      setIsCustomer(true)
      if (providerEmailParam) setRecipientEmail(decodeURIComponent(providerEmailParam))
    }
  }, [])

  const fetchJob = async (id) => {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/jobs?id=eq.${id}`, {
      headers: { 'apikey': APIKEY, 'Authorization': `Bearer ${APIKEY}` }
    })
    const data = await res.json()
    if (data[0]) {
      setJob(data[0])
      setJobStatus(data[0].status)
    }
    setLoading(false)
  }

  const fetchMessages = async (id, sender, recipient) => {
    const s = sender || senderEmail
    const r = recipient || recipientEmail
    if (!s || !r) return
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/messages?job_id=eq.${id}&or=(and(sender_email.eq.${encodeURIComponent(s)},recipient_email.eq.${encodeURIComponent(r)}),and(sender_email.eq.${encodeURIComponent(r)},recipient_email.eq.${encodeURIComponent(s)}))&order=created_at.asc`,
      { headers: { 'apikey': APIKEY, 'Authorization': `Bearer ${APIKEY}` } }
    )
    const data = await res.json()
    setMessages(data || [])
  }

  useEffect(() => {
    if (jobId && senderEmail && (recipientEmail || !isCustomer)) {
      const recipient = isCustomer ? recipientEmail : job?.customer_email
      if (recipient) {
        fetchMessages(jobId, senderEmail, recipient)
        const interval = setInterval(() => fetchMessages(jobId, senderEmail, recipient), 5000)
        return () => clearInterval(interval)
      }
    }
  }, [jobId, senderEmail, recipientEmail, job, isCustomer])

  const handleAcceptProvider = async () => {
    const providerMsg = [...messages].reverse().find(m => m.sender_email !== senderEmail)
    if (!providerMsg) return
    const actualProviderEmail = providerMsg.sender_email
    const actualProviderName = providerMsg.sender_name

    if (!confirm(`Accept ${actualProviderName} for this job?`)) return

    setAccepting(true)
    const res = await fetch(`${SUPABASE_URL}/rest/v1/jobs?id=eq.${jobId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': APIKEY,
        'Authorization': `Bearer ${APIKEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        status: 'accepted',
        provider_email: actualProviderEmail,
        provider_name: actualProviderName
      })
    })
    if (res.ok) {
      setJobStatus('accepted')
      alert('✅ Provider accepted! The job has been assigned.')
    } else {
      alert('Error accepting provider. Please try again.')
    }
    setAccepting(false)
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return
    setSending(true)

    const recipient = isCustomer ? recipientEmail : job?.customer_email

    const res = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': APIKEY,
        'Authorization': `Bearer ${APIKEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        job_id: jobId,
        sender_name: senderName,
        sender_email: senderEmail,
        recipient_email: recipient,
        message: newMessage
      })
    })

    if (res.ok) {
      // Send email notification to recipient
      fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'new_message',
          customerEmail: recipient,
          customerName: recipient?.split('@')[0],
          providerName: senderName,
          job: {
            id: jobId,
            title: job?.title || '',
            category: job?.category || '',
            city: job?.city || '',
            message: newMessage.trim()
          }
        })
      }).catch(() => {})

      setNewMessage('')
      fetchMessages(jobId, senderEmail, recipient)
    }
    setSending(false)
  }

  const timeAgo = (date) => {
    const mins = Math.floor((new Date() - new Date(date + 'Z')) / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  if (loading) {
    return (
      <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
        <div style={{color:'white', fontSize:'18px'}}>Loading... / Cargando...</div>
      </div>
    )
  }

  if (!job) {
    return (
      <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
        <div style={{background:'white', borderRadius:'24px', padding:'48px', textAlign:'center'}}>
          <div style={{fontSize:'40px', marginBottom:'16px'}}>❌</div>
          <p style={{color:'#888'}}>Job not found. / Trabajo no encontrado.</p>
          <a href="/jobs" style={{color:'#FF6B35'}}>Back to Jobs →</a>
        </div>
      </div>
    )
  }

  if (!identified || (!isProvider && !isCustomer)) {
    return (
      <div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial', padding:'32px'}}>
        <div style={{background:'white', borderRadius:'24px', padding:'48px', width:'100%', maxWidth:'440px', textAlign:'center'}}>
          <div style={{fontSize:'40px', margin:'0 0 16px'}}>🔒</div>
          <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>Sign In Required</h2>
          <p style={{color:'#888', marginBottom:'8px'}}>Inicia sesión para continuar</p>
          <div style={{background:'#FFF3EE', borderRadius:'12px', padding:'16px', marginBottom:'24px', textAlign:'left'}}>
            <div style={{fontSize:'13px', fontWeight:'bold', color:'#FF6B35', marginBottom:'4px'}}>{job.category}</div>
            <div style={{fontSize:'15px', fontWeight:'bold', color:'#1a1a2e'}}>{job.title}</div>
            <div style={{fontSize:'13px', color:'#888'}}>📍 {job.city} · Posted by {job.customer_name}</div>
          </div>
          <p style={{color:'#555', fontSize:'14px', marginBottom:'24px'}}>You need to be signed in as a provider to send messages.</p>
          <a href="/login" style={{display:'block', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', textDecoration:'none', marginBottom:'12px'}}>
            Sign In / Iniciar Sesión →
          </a>
          <a href="/signup-provider" style={{display:'block', background:'#1a1a2e', color:'white', padding:'16px', borderRadius:'16px', fontSize:'16px', fontWeight:'bold', textDecoration:'none', marginBottom:'12px'}}>
            Join as Provider / Unirse como Proveedor →
          </a>
          <a href="/jobs" style={{display:'block', color:'#888', padding:'12px', fontSize:'14px', textDecoration:'none'}}>
            ← Back to Jobs
          </a>
        </div>
      </div>
    )
  }

  return (
    <main style={{minHeight:'100vh', background:'#f8f6f2', fontFamily:'Arial', display:'flex', flexDirection:'column'}}>

      <div style={{background:'linear-gradient(135deg,#1a1a2e,#0f3460)', padding:'24px 32px'}}>
        <a href="/jobs" style={{color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:'14px'}}>← Back to Jobs</a>
        <h2 style={{color:'white', margin:'8px 0 4px', fontSize:'20px'}}>{job.title}</h2>
        <p style={{color:'#FF6B35', fontSize:'13px', margin:0}}>{job.category} · 📍 {job.city}</p>
      </div>

      {isCustomer && (jobStatus === 'open' || jobStatus === 'pending') && messages.some(m => m.sender_email !== senderEmail) && (
        <div onClick={!accepting ? handleAcceptProvider : undefined}
          style={{background:'#16a34a', padding:'14px 32px', textAlign:'center', cursor:'pointer'}}>
          <div style={{color:'white', fontWeight:'bold', fontSize:'15px'}}>
            {accepting ? 'Accepting...' : '✅ Accept this Provider for the Job'}
          </div>
          <div style={{color:'rgba(255,255,255,0.8)', fontSize:'12px', marginTop:'2px'}}>
            Click to assign them and proceed to payment
          </div>
        </div>
      )}

      {jobStatus === 'accepted' && (
        <div style={{background:'#dcfce7', padding:'12px 32px', textAlign:'center'}}>
          <div style={{color:'#16a34a', fontWeight:'600', fontSize:'14px'}}>✅ Provider Accepted — Job Assigned</div>
        </div>
      )}

      <div style={{flex:1, padding:'24px 32px', maxWidth:'700px', margin:'0 auto', width:'100%', boxSizing:'border-box'}}>
        {messages.length === 0 ? (
          <div style={{textAlign:'center', padding:'40px', color:'#888'}}>
            <div style={{fontSize:'40px', marginBottom:'16px'}}>💬</div>
            <p>No messages yet. Start the conversation!</p>
            <p style={{fontSize:'14px'}}>Sin mensajes todavía. ¡Inicia la conversación!</p>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {messages.map(msg => (
              <div key={msg.id} style={{display:'flex', justifyContent: msg.sender_email === senderEmail ? 'flex-end' : 'flex-start'}}>
                <div style={{maxWidth:'70%', background: msg.sender_email === senderEmail ? 'linear-gradient(135deg,#FF6B35,#F4A261)' : 'white', borderRadius:'16px', padding:'12px 16px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                  <div style={{fontSize:'11px', fontWeight:'bold', color: msg.sender_email === senderEmail ? 'rgba(255,255,255,0.8)' : '#FF6B35', marginBottom:'4px'}}>{msg.sender_name}</div>
                  <div style={{fontSize:'15px', color: msg.sender_email === senderEmail ? 'white' : '#1a1a2e', lineHeight:'1.5'}}>{msg.message}</div>
                  <div style={{fontSize:'11px', color: msg.sender_email === senderEmail ? 'rgba(255,255,255,0.6)' : '#aaa', marginTop:'4px', textAlign:'right'}}>{timeAgo(msg.created_at)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{background:'white', padding:'16px 32px', borderTop:'1px solid #F0EDE8', display:'flex', gap:'12px', alignItems:'center'}}>
        <input type="text" placeholder="Type a message... / Escribe un mensaje..."
          value={newMessage} onChange={e => setNewMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          style={{flex:1, padding:'12px 16px', borderRadius:'24px', border:'2px solid #F0EDE8', fontSize:'16px', outline:'none'}}
        />
        <button onClick={sendMessage} disabled={sending}
          style={{background:'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'12px 24px', borderRadius:'24px', fontWeight:'bold', cursor:'pointer', fontSize:'15px'}}>
          {sending ? '...' : 'Send →'}
        </button>
      </div>
    </main>
  )
}