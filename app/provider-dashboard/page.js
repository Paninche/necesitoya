'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
function ProviderDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [provider, setProvider] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs');
  const [email, setEmail] = useState('');
  const stripeStatus = searchParams.get('stripe');
  useEffect(() => {
    const saved = localStorage.getItem('ny_provider');
    if (saved) {
      const p = JSON.parse(saved);
      setProvider(p);
      fetchData(p.id, p.email);
    } else {
      setLoading(false);
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
  async function handleLogin(e) {
    e.preventDefault();
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('type', 'provider')
      .single();
    if (data) {
      localStorage.setItem('ny_provider', JSON.stringify(data));
      setProvider(data);
      fetchData(data.id, data.email);
    } else {
      alert('Provider not found. Please check your email. / Proveedor no encontrado.');
    }
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
    setProvider(null);
    setJobs([]);
    setPayments([]);
  }
  const totalEarned = payments.filter(p => p.status === 'succeeded').reduce((sum, p) => sum + (p.amount_provider || 0), 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + (p.amount_provider || 0), 0);
  const activeJobs = jobs.filter(j => j.status === 'accepted' || j.status === 'in_progress').length;
  if (!provider) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', maxWidth: '420px', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a2e' }}>NecesitoYa</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#4b5563', marginTop: '8px' }}>Provider Dashboard</div>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>Panel del Proveedor</div>
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
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginTop: '16px' }}>
            Not a provider yet? <a href="/signup-provider" style={{ color: '#2563eb' }}>Sign up here</a>
          </p>
        </div>
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
          <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: '1px solid #4b5563', color: '#94a3b8', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
      {stripeStatus === 'success' && (
        <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '12px 24px', fontSize: '14px', fontWeight: '500' }}>
          ✅ Bank account connected successfully! You can now receive payments. / ¡Cuenta bancaria conectada exitosamente!
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
                        <span style={{ fontWeight: '700', color: '#16a34a' }}>${job.budget}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#4b5563', marginBottom: '8px' }}>{job.description}</div>
                    <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                      Customer: {job.customer_name} · {job.customer_email} · {job.customer_phone}
                    </div>
                    {(job.status === 'accepted' || job.status === 'paid') && (
                      <button
                        onClick={() => window.location.href = `/messages?job=${job.id}`}
                        style={{ marginTop: '10px', backgroundColor: '#1a1a2e', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        💬 View Chat / Ver Chat
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
                { label: 'Phone / Teléfono', value: provider.phone || 'Not set' },
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