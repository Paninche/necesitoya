'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ jobId, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePayment(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');
    try {
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?jobId=${jobId}`,
        },
      });
      if (confirmError) {
        setError(confirmError.message);
        setLoading(false);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', maxWidth: '480px', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: '4px' }}>NecesitoYa</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px', fontSize: '14px' }}>Secure Payment / Pago Seguro</p>

        <div style={{ background: '#f8f6f2', borderRadius: '10px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Order Summary / Resumen</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
            <span>Service Fee / Tarifa</span>
            <span>${parseFloat(amount).toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
            <span>Platform Fee / Plataforma</span>
            <span style={{ color: 'green' }}>FREE ✓</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderTop: '1px solid #ddd', paddingTop: '8px', marginTop: '8px' }}>
            <span>Total</span>
            <span>${parseFloat(amount).toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handlePayment}>
          <PaymentElement />
          {error && <p style={{ color: 'red', fontSize: '13px', marginTop: '12px' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading || !stripe}
            style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '20px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Processing...' : `Pay $${parseFloat(amount).toFixed(2)}`}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '16px' }}>
          🔒 Secured by Stripe · No platform fees for customers
        </p>
      </div>
    </div>
  );
}

function CheckoutWrapper() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  const amount = searchParams.get('amount');
  const providerId = searchParams.get('providerId');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!jobId || !amount || !providerId) return;
    fetch('/api/stripe/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobId,
        amount: parseFloat(amount),
        customerId: 'guest',
        providerId,
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setError(data.error || 'Failed to load payment');
      })
      .catch(() => setError('Failed to load payment'));
  }, [jobId, amount, providerId]);

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );

  if (!clientSecret) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Loading payment... / Cargando pago...</p>
    </div>
  );

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm jobId={jobId} amount={amount} />
    </Elements>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutWrapper />
    </Suspense>
  );
}