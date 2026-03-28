'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ADMIN_PASSWORD = 'necesitoya2026';

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('ny_admin') === 'true') {
      setAuthed(true);
      fetchAll();
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchAll() {
    setLoading(true);
    const [{ data: u }, { data: j }, { data: p }] = await Promise.all([
      supabase.from('users').select('*').order('created_at', { ascending: false }),
      supabase.from('jobs').select('*').order('created_at', { ascending: false }),
      supabase.from('payments').select('*').order('created_at', { ascending: false }),
    ]);
    setUsers(u || []);
    setJobs(j || []);
    setPayments(p || []);
    setLoading(false);
  }

  async function toggleFeatured(user) {
    setTogglingId(user.id);
    const newValue = !user.featured;
    const { error } = await supabase
      .from('users')
      .update({ featured: newValue })
      .eq('id', user.id);
    if (!error) {
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, featured: newValue } : u));
    } else {
      alert('Error updating featured status');
    }
    setTogglingId(null);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('ny_admin', 'true');
      setAuthed(true);
      fetchAll();
    } else {
      alert('Incorrect password / Contraseña incorrecta');
    }
  }

  function handleLogout() {
    localStorage.removeItem('ny_admin');
    setAuthed(false);
  }

  const totalRevenue = payments.filter(p => p.status === 'succeeded').reduce((sum, p) => sum + (p.amount_commission || 0), 0);
  const totalVolume = payments.filter(p => p.status === 'succeeded').reduce((sum, p) => sum + (p.amount_total || 0), 0);
  const providers = users.filter(u => u.type === 'provider');
  const customers = users.filter(u => u.type === 'customer');
  const openJobs = jobs.filter(j => j.status === 'open');
  const featuredProviders = providers.filter(p => p.featured);

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '40px', maxWidth: '400px', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>NecesitoYa</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#94a3b8', marginTop: '8px' }}>Admin Dashboard</div>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>Restricted Access / Acceso Restringido</div>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px' }}>
                Admin Password / Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', color: 'white', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '12px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
              Access Admin / Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1e293b', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: 'white' }}>NecesitoYa Admin</div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Platform Control Center</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={fetchAll} style={{ backgroundColor: '#334155', border: 'none', color: '#94a3b8', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
            🔄 Refresh
          </button>
          <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: '1px solid #475569', color: '#94a3b8', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'NecesitoYa Revenue', value: `$${(totalRevenue / 100).toFixed(2)}`, color: '#16a34a', icon: '💰' },
            { label: 'Total Volume', value: `$${(totalVolume / 100).toFixed(2)}`, color: '#2563eb', icon: '📊' },
            { label: 'Total Providers', value: providers.length, color: '#7c3aed', icon: '🔧' },
            { label: 'Featured Providers', value: featuredProviders.length, color: '#FF6B35', icon: '⭐' },
            { label: 'Total Customers', value: customers.length, color: '#0891b2', icon: '👥' },
            { label: 'Total Jobs', value: jobs.length, color: '#f59e0b', icon: '📋' },
            { label: 'Open Jobs', value: openJobs.length, color: '#ef4444', icon: '🔓' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#1e293b', borderRadius: '10px', padding: '4px', marginBottom: '20px', width: 'fit-content', border: '1px solid #334155', flexWrap: 'wrap' }}>
          {['overview', 'providers', 'users', 'jobs', 'payments'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500', backgroundColor: activeTab === tab ? '#2563eb' : 'transparent', color: activeTab === tab ? 'white' : '#64748b' }}>
              {tab === 'overview' ? '📊 Overview' : tab === 'providers' ? '⭐ Providers' : tab === 'users' ? '👥 Users' : tab === 'jobs' ? '📋 Jobs' : '💰 Payments'}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading data...</div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', border: '1px solid #334155' }}>
                  <div style={{ fontWeight: '600', color: 'white', marginBottom: '16px', fontSize: '15px' }}>🕐 Recent Jobs</div>
                  {jobs.slice(0, 5).map(job => (
                    <div key={job.id} style={{ padding: '10px 0', borderBottom: '1px solid #334155' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f0' }}>{job.title}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{job.customer_name} · {job.city}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>${job.budget}</span>
                          <span style={{ backgroundColor: job.status === 'open' ? '#1d4ed8' : '#166534', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '11px' }}>{job.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', border: '1px solid #334155' }}>
                  <div style={{ fontWeight: '600', color: 'white', marginBottom: '16px', fontSize: '15px' }}>👤 Recent Users</div>
                  {users.slice(0, 5).map(user => (
                    <div key={user.id} style={{ padding: '10px 0', borderBottom: '1px solid #334155' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f0' }}>{user.full_name}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{user.email}</div>
                        </div>
                        <span style={{ backgroundColor: user.type === 'provider' ? '#5b21b6' : '#0e7490', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '11px' }}>{user.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Providers Tab */}
            {activeTab === 'providers' && (
              <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', border: '1px solid #334155', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', color: 'white' }}>All Providers ({providers.length})</span>
                  <span style={{ fontSize: '13px', color: '#FF6B35' }}>⭐ {featuredProviders.length} featured</span>
                </div>
                {providers.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No providers yet</div>
                ) : providers.map(user => (
                  <div key={user.id} style={{ padding: '16px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: user.featured ? 'rgba(255,107,53,0.05)' : '#1e293b' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <div style={{ fontSize: '15px', fontWeight: '500', color: '#e2e8f0' }}>{user.full_name}</div>
                        {user.featured && <span style={{ backgroundColor: '#FF6B35', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>⭐ Featured</span>}
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>{user.email} · {user.city || 'no city'}{user.state ? ', ' + user.state : ''}</div>
                      {user.services && <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>Services: {user.services}</div>}
                      <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                        Jobs done: {user.jobs_completed || 0} · Rating: {user.rating ? user.rating.toFixed(1) : 'New'}
                        {user.stripe_onboarding_complete && <span style={{ color: '#16a34a', marginLeft: '8px' }}>✅ Stripe</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFeatured(user)}
                      disabled={togglingId === user.id}
                      style={{ backgroundColor: user.featured ? '#FF6B35' : '#334155', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', minWidth: '120px', opacity: togglingId === user.id ? 0.6 : 1 }}
                    >
                      {togglingId === user.id ? 'Saving...' : user.featured ? '⭐ Unfeature' : '☆ Feature'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', border: '1px solid #334155', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '600', color: 'white' }}>All Users ({users.length})</span>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{providers.length} providers · {customers.length} customers</span>
                </div>
                {users.map(user => (
                  <div key={user.id} style={{ padding: '16px 20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#e2e8f0' }}>{user.full_name}</div>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>{user.email} · {user.phone || 'no phone'} · {user.city || 'no city'}</div>
                      {user.services && <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>Services: {user.services}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {user.stripe_onboarding_complete && <span style={{ fontSize: '11px', color: '#16a34a' }}>✅ Stripe</span>}
                      <span style={{ backgroundColor: user.type === 'provider' ? '#5b21b6' : '#0e7490', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>{user.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', border: '1px solid #334155', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #334155' }}>
                  <span style={{ fontWeight: '600', color: 'white' }}>All Jobs ({jobs.length})</span>
                </div>
                {jobs.map(job => (
                  <div key={job.id} style={{ padding: '16px 20px', borderBottom: '1px solid #334155' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '500', color: '#e2e8f0' }}>{job.title}</div>
                        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{job.category} · {job.city} · {job.customer_name} · {job.customer_email}</div>
                        <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>{job.description}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '16px' }}>
                        <span style={{ fontWeight: '700', color: '#16a34a' }}>${job.budget}</span>
                        <span style={{ backgroundColor: job.status === 'open' ? '#1d4ed8' : job.status === 'paid' ? '#166534' : '#92400e', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>{job.status}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '11px', color: '#475569', marginTop: '6px' }}>
                      {new Date(job.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', border: '1px solid #334155', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '600', color: 'white' }}>All Payments ({payments.length})</span>
                  <span style={{ fontSize: '13px', color: '#16a34a' }}>Revenue: ${(totalRevenue / 100).toFixed(2)}</span>
                </div>
                {payments.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No payments yet</div>
                ) : payments.map(payment => (
                  <div key={payment.id} style={{ padding: '16px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f0' }}>Payment #{payment.id.slice(0, 8)}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{new Date(payment.created_at).toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}>${(payment.amount_total / 100).toFixed(2)}</div>
                      <div style={{ fontSize: '12px', color: '#16a34a' }}>Fee: ${(payment.amount_commission / 100).toFixed(2)}</div>
                      <span style={{ backgroundColor: payment.status === 'succeeded' ? '#166534' : '#92400e', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '11px' }}>{payment.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}