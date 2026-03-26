'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function CustomerDashboardContent() {
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('ny_customer');
    if (saved) {
      const c = JSON.parse(saved);
      setCustomer(c);
      fetchData(c.email);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchData(customerEmail) {
    setLoading(true);
    const { data: jobsData } = await supabase
      .from('jobs')
      .select('*')
      .eq('customer_email', customerEmail)
      .order('created_at', { ascending: false });

    const { data: paymentsData } = await supabase
      .from('payments')
      .select('*')
      .eq('customer_id', customerEmail)
      .order('created_at', { ascending: false });

    setJobs(jobsData || []);
    setPayments(paymentsData || []);
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    // Check users table first
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('type', 'customer')
      .single();

    if (userData) {
      localStorage.setItem('ny_customer', JSON.stringify(userData));
      setCustomer(userData);
      fetchData(userData.email);
      return;
    }

    // Also check if they posted jobs as guest
    const { data: jobData } = await supabase
      .from('jobs')
      .select('customer_name, customer_email')
      .eq('customer_email', email.toLowerCase())
      .limit(1)
      .single();

    if (jobData) {
      const guestCustomer = {
        full_name: jobData.customer_name,
        email: jobData.customer_email,
        type: 'customer'
      };
      localStorage.setItem('ny_customer', JSON.stringify(guestCustomer));
      setCustomer(guestCustomer);
      fetchData(guestCustomer.email);
    } else {
      alert('No account found with that email. / No se encontró cuenta con ese correo.');
    }
  }

  function handleLogout() {
    localStorage.removeItem('ny_customer');
    setCustomer(null);
    setJobs([]);
    setPayments([]);
  }

  const totalSpent = payments.filter(p => p.status === 'succeeded').reduce((sum, p) => sum + (p.amount_total || 0), 0);
  const activeJobs = jobs.filter(j => j.status === 'open' || j.status === 'accepted' || j.status === 'in_progress').length;
  const completedJobs = jobs.filter(j => j.status === 'paid' || j.status === 'completed').length;

  function getStatusColor(status) {
    const colors = {
      open: { bg: '#dbeafe', text: '#2563eb' },
      accepted: { bg: '#fef3c7', text: '#92400e' },
      in_progress: { bg: '#fef3c7', text: '#92400e' },
      completed: { bg: '#dcfce7', text: '#16a34a' },
      paid: { bg: '#dcfce7', text: '#16a34a' },
    };
    return colors[status] || { bg: '#f3f4f6', text: '#6b7280' };
  }

  // Login screen
  if (!customer) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', maxWidth: '420px', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a2e' }}>NecesitoYa</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#4b5563', marginTop: '8px' }}>Customer Dashboard</div>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>Panel del Cliente</div>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                Email Address / Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '12px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
              Access Dashboard / Acceder
            </button>
          </form>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="/post-job" style={{ color: '#2563eb', fontSize: '13px' }}>Post a Job</a>
            <span style={{ color: '#d1d5db' }}>·</span>
            <a href="/signup-customer" style={{ color: '#2563eb', fontSize: '13px' }}>Sign up</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: '800' }}>NecesitoYa</div>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Customer Dashboard / Panel del Cliente</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>👋 {customer.full_name}</span>
          <button
            onClick={() => router.push('/post-job')}
            style={{ backgroundColor: '#2563eb', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
            + Post Job
          </button>
          <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: '1px solid #4b5563', color: '#94a3b8', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Total Spent / Gastado</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a2e' }}>${(totalSpent / 100).toFixed(2)}</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Active Jobs / Activos</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#2563eb' }}>{activeJobs}</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Completed / Completados</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#16a34a' }}>{completedJobs}</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Total Jobs / Total</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a2e' }}>{jobs.length}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: 'white', borderRadius: '10px', padding: '4px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', width: 'fit-content' }}>
          {['jobs', 'payments'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500', backgroundColor: activeTab === tab ? '#2563eb' : 'transparent', color: activeTab === tab ? 'white' : '#6b7280' }}>
              {tab === 'jobs' ? '📋 My Jobs' : '💰 Payments'}
            </button>
          ))}
        </div>

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading...</div>
            ) : jobs.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
                <div style={{ fontWeight: '600', marginBottom: '8px' }}>No jobs posted yet / Sin trabajos publicados</div>
                <button onClick={() => router.push('/post-job')} style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
                  Post Your First Job / Publicar Trabajo
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {jobs.map(job => {
                  const statusStyle = getStatusColor(job.status);
                  return (
                    <div key={job.id} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '16px', color: '#1a1a2e' }}>{job.title}</div>
                          <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{job.category} · {job.city}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ backgroundColor: statusStyle.bg, color: statusStyle.text, padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                            {job.status}
                          </span>
                          <span style={{ fontWeight: '700', color: '#1a1a2e' }}>${job.budget}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: '14px', color: '#4b5563', marginBottom: '8px' }}>{job.description}</div>
                      {job.provider_email && (
  <div style={{ fontSize: '13px', color: '#6b7280', backgroundColor: '#f0f9ff', padding: '8px 12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span>Provider: {job.provider_email}</span>
    {job.status === 'accepted' && (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '12px' }}>
        {(!job.budget || job.budget === '0' || job.budget === '$0') && (
          <input
            type="number"
            placeholder="Enter amount $"
            id={`amount-${job.id}`}
            style={{ width: '120px', padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }}
          />
        )}
        <button
          onClick={() => {
            const inputAmount = document.getElementById(`amount-${job.id}`)?.value
            const amount = inputAmount || (job.budget ? job.budget.replace(/[^0-9.]/g, '') : '0')
            if (!amount || amount === '0') {
              alert('Please enter the agreed amount / Por favor ingresa el monto acordado')
              return
            }
            const providerName = job.provider_email.split('@')[0]
            window.location.href = `/checkout?jobId=${job.id}&amount=${amount}&providerId=${job.provider_id || job.provider_email}&providerName=${encodeURIComponent(providerName)}`
          }}
          style={{ backgroundColor: '#16a34a', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          💳 Pay Now
        </button>
      </div>
    )}
    {job.status === 'paid' && (
      <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '13px' }}>✅ Paid</span>
    )}
  </div>
)}
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            {payments.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>💳</div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>No payments yet / Sin pagos aún</div>
                <div style={{ fontSize: '14px' }}>Your payment history will appear here</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {payments.map(payment => (
                  <div key={payment.id} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1a1a2e' }}>Service Payment</div>
                      <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{new Date(payment.created_at).toLocaleDateString()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', fontSize: '18px', color: '#1a1a2e' }}>${(payment.amount_total / 100).toFixed(2)}</div>
                      <div style={{ fontSize: '12px', color: '#16a34a' }}>No platform fee ✓</div>
                      <span style={{ backgroundColor: payment.status === 'succeeded' ? '#dcfce7' : '#fef3c7', color: payment.status === 'succeeded' ? '#16a34a' : '#92400e', padding: '2px 8px', borderRadius: '20px', fontSize: '11px' }}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CustomerDashboard() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <CustomerDashboardContent />
    </Suspense>
  );
}