'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const SUPABASE_URL = 'https://tjtagdqdhgkmgmuozhlc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGFnZHFkaGdrbWdtdW96aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQzMTIsImV4cCI6MjA4OTg4MDMxMn0.8DdoprOG4hWdwoYznHAX_BIT92kwnV77GhOK3Greh5Y';

function ProviderDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [provider, setProvider] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs');
  const stripeStatus = searchParams.get('stripe');

  useEffect(() => {
    const saved = localStorage.getItem('ny_provider');
    if (saved) {
      const p = JSON.parse(saved);
      setProvider(p);
      fetchData(p.id, p.email);
      return;
    }
    const sbEmail = localStorage.getItem('sb_email');
    if (sbEmail) {
      fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(sbEmail)}&type=eq.provider&select=*`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      })
      .then(r => r.json())
      .then(users => {
        if (users && users.length > 0) {
          localStorage.setItem('ny_provider', JSON.stringify(users[0]));
          setProvider(users[0]);
          fetchData(users[0].id, users[0].email);
        } else {
          window.location.href = '/login';
        }
      })
      .catch(() => { window.location.href = '/login'; });
    } else {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    if (stripeStatus === 'success' && provider) {
      supabase
        .from('users')
        .update({ stripe_onboarding_complete: true })
        .eq('id', provider.id)
        .then(() => {
          const updated = { ...provider, stripe_onboarding_complete: true };
          localStorage.setItem('ny_provider', JSON.stringify(updated));
          setProvider(updated);
        });
    }
  }, [stripeStatus, provider?.id]);

  async function fetchData(providerId, providerEmail) {
    setLoading(true);
    const { data: jobsData } = await supabase
      .from('jobs')
      .select('*')
      .eq('provider_email', providerEmail)
      .order('created_at', { ascending: false });
    const { data: paymentsData } = await supabase
      .from('payments')
      .select('*')
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });
    setJobs(jobsData || []);
    setPayments(paymentsData || []);
    setLoading(false);
  }

  async function connectStripe() {
    const res = await fetch('/api/stripe/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: provider.id, email: provider.email }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert('Error connecting to Stripe. Please try again.');
  }

  function handleLogout() {
    localStorage.removeItem('ny_provider');
    localStorage.removeItem('sb_token');
    localStorage.removeItem('sb_user_id');
    localStorage.removeItem('sb_email');
    setProvider(null);
    setJobs([]);
    setPayments([]);
    window.location.href = '/login';
  }

  const totalEarned = payments.filter(p => p.status === 'succeeded').reduce((sum, p) => sum + (p.amount_provider || 0), 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + (p.amount_provider || 0), 0);
  const activeJobs = jobs.filter(j => j.status === 'accepted' || j.status === 'in_progress').length;

  if (!provider) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: '800' }}>NecesitoYa</div>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Provider Dashboard / Panel del Proveedor</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>👋 {provider.full_name}</span>
          <a href="/" style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none', border: '1px solid #4b5563', padding: '6px 12px', borderRadius: '6px' }}>🏠 Home</a>
          <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: '1px solid #4b5563', color: '#94a3b8', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      {stripeStatus === 'success' && (
        <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '12px 24px', fontSize: '14px', fontWeight: '500' }}>
          ✅ Bank account connected successfully! / ¡Cuenta bancaria conectada exitosamente!
        </div>
      )}

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Total Earned / Ganado</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#16a34a' }}>${(totalEarned / 100).toFixed(2)}</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Pending / Pendiente</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#f59e0b' }}>${(pendingAmount / 100).toFixed(2)}</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Active Jobs / Trabajos</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#2563eb' }}>{activeJobs}</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Total Jobs / Total</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a2e' }}>{jobs.length}</div>
          </div>
        </div>

        {!provider.stripe_onboarding_complete && (
          <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600', color: '#92400e', marginBottom: '2px' }}>⚠️ Connect your bank account to receive payments</div>
              <div style={{ fontSize: '13px', color: '#92400e' }}>Conecta tu cuenta bancaria para recibir pagos</div>
            </div>
            <button onClick={connectStripe} style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Connect Bank / Conectar Banco
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '4px', backgroundColor: 'white', borderRadius: '10px', padding: '4px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', width: 'fit-content' }}>
          {['jobs', 'payments', 'profile'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500', backgroundColor: activeTab === tab ? '#2563eb' : 'transparent', color: activeTab === tab ? 'white' : '#6b7280' }}>
              {tab === 'jobs' ? '📋 Jobs' : tab === 'payments' ? '💰 Payments' : '👤 Profile'}
            </button>
          ))}
        </div>

        {activeTab === 'jobs' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>No jobs yet / Sin trabajos aún</div>
                <div style={{ fontSize: '14px' }}>Jobs you accept will appear here</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {jobs.map(job => (
                  <div key={job.id} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '16px', color: '#1a1a2e' }}>{job.title}</div>
                        <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{job.category} · {job.city}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ backgroundColor: job.status === 'paid' ? '#dcfce7' : job.status === 'accepted' ? '#dbeafe' : '#f3f4f6', color: job.status === 'paid' ? '#16a34a' : job.status === 'accepted' ? '#2563eb' : '#6b7280', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                          {job.status}
                        </span>
                        <span style={{ fontWeight: '700', color: '#16a34a' }}>{job.budget?.startsWith('$') ? job.budget : `$${job.budget}`}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#4b5563', marginBottom: '8px' }}>{job.description}</div>
                    <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                      Customer: {job.customer_name} · {job.customer_email} · {job.status === 'paid' || job.status === 'completed' ? job.customer_phone : '🔵 Phone hidden until payment'}
                    </div>
                    {(job.status === 'accepted' || job.status === 'paid' || job.status === 'pending') && (
                      <button onClick={() => window.location.href = `/messages?job=${job.id}`} style={{ marginTop: '10px', backgroundColor: '#1a1a2e', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', marginRight: '8px' }}>
                        💬 View Chat / Ver Chat
                      </button>
                    )}
                    {(job.status === 'pending' || job.status === 'accepted') && (
                      <button
                        onClick={async () => {
                          if (confirm('Release this job? / ¿Liberar este trabajo?')) {
                            await supabase.from('jobs').update({ status: 'open', provider_id: null, provider_email: null }).eq('id', job.id);
                            window.location.reload();
                          }
                        }}
                        style={{ marginTop: '10px', backgroundColor: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        ❌ Release Job / Liberar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            {payments.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>💰</div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>No payments yet / Sin pagos aún</div>
                <div style={{ fontSize: '14px' }}>Completed job payments will appear here</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {payments.map(payment => (
                  <div key={payment.id} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1a1a2e' }}>Job Payment</div>
                      <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{new Date(payment.created_at).toLocaleDateString()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', fontSize: '18px', color: '#16a34a' }}>${(payment.amount_provider / 100).toFixed(2)}</div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>NecesitoYa fee: ${(payment.amount_commission / 100).toFixed(2)}</div>
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

        {activeTab === 'profile' && (
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a2e', marginBottom: '20px' }}>Your Profile / Tu Perfil</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Full Name / Nombre', value: provider.full_name },
                { label: 'Email', value: provider.email },
                { label: 'Phone / Telefono', value: provider.phone || 'Not set' },
                { label: 'City / Ciudad', value: provider.city || 'Not set' },
                { label: 'Services / Servicios', value: provider.services || 'Not set' },
                { label: 'Language / Idioma', value: provider.language || 'en' },
              ].map(item => (
                <div key={item.label} style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '15px', fontWeight: '500', color: '#1a1a2e' }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Bank Account / Cuenta Bancaria</div>
              <div style={{ fontSize: '15px', fontWeight: '500', color: provider.stripe_onboarding_complete ? '#16a34a' : '#f59e0b' }}>
                {provider.stripe_onboarding_complete ? '✅ Connected / Conectada' : '⚠️ Not connected / No conectada'}
              </div>
            </div>
            <button
              onClick={async () => {
                if (confirm('Are you sure? This will permanently delete your account and all data. This cannot be undone.\n\n¿Estás seguro? Esto eliminará tu cuenta permanentemente.')) {
                  const sbEmail = localStorage.getItem('sb_email');
                  await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(sbEmail)}`, {
                    method: 'DELETE',
                    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
                  });
                  localStorage.removeItem('ny_provider');
                  localStorage.removeItem('sb_email');
                  localStorage.removeItem('sb_token');
                  localStorage.removeItem('sb_user_id');
                  window.location.href = '/';
                }
              }}
              style={{ marginTop: '20px', width: '100%', backgroundColor: '#fef2f2', border: '1px solid #ef4444', color: '#ef4444', padding: '14px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              🗑️ Delete Account / Eliminar Cuenta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProviderDashboard() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <ProviderDashboardContent />
    </Suspense>
  );
}