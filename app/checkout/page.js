'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get('jobId');
  const amount = searchParams.get('amount');
  const providerId = searchParams.get('providerId');
  const providerName = searchParams.get('providerName');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  async function handlePayment(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          amount: parseFloat(amount),
          customerId: 'guest',
          providerId,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      router.push(`/payment-success?jobId=${jobId}`);
    } catch (err) {
      setError('Payment failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', maxWidth: '480px', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a2e', marginBottom: '4px' }}>NecesitoYa</div>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>Secure Payment / Pago Seguro</div>
        </div>
        <div style={{ backgroundColor: '#f0f9ff', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1a1a2e' }}>Order Summary / Resumen</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px', color: '#4b5563' }}>
            <span>Provider / Proveedor</span><span>{providerName || 'Provider'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px', color: '#4b5563' }}>
            <span>Service Fee / Tarifa</span><span>${parseFloat(amount || 0).toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px', color: '#4b5563' }}>
            <span>Platform Fee / Plataforma</span><span>FREE ✓</span>
          </div>
          <div style={{ borderTop: '1px solid #bae6fd', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#1a1a2e' }}>
            <span>Total</span><span>${parseFloat(amount || 0).toFixed(2)}</span>
          </div>
        </div>
        <form onSubmit={handlePayment}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Your Name / Tu Nombre</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" required style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Card Number / Número de Tarjeta</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" required maxLength={19} style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Expiry / Vence</label>
              <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" required maxLength={5} style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>CVC</label>
              <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" required maxLength={3} style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          </div>
          {error && (
            <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px' }}>{error}</div>
          )}
          <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: loading ? '#9ca3af' : '#2563eb', color: 'white', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Processing...' : `Pay $${parseFloat(amount || 0).toFixed(2)}`}
          </button>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginTop: '16px' }}>🔒 Secured by Stripe · No platform fees for customers</p>
        </form>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}