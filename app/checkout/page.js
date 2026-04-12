'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ jobId, amount, providerName }) {
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
      setError('Payment failed. Please try again. / El pago falló. Inténtalo de nuevo.');
      setLoading(false);
    }
  }

  const amountNum = parseFloat(amount);
  const commission = (amountNum * 0.08).toFixed(2);
  const providerPayout = (amountNum * 0.92).toFixed(2);

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', fontFamily:'Arial', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'40px', width:'100%', maxWidth:'480px'}}>

        {/* Header */}
        <div style={{textAlign:'center', marginBottom:'28px'}}>
          <div style={{fontSize:'32px', marginBottom:'8px'}}>⚡</div>
          <h1 style={{color:'#1a1a2e', fontSize:'24px', fontWeight:'bold', margin:'0 0 4px'}}>NecesitoYa</h1>
          <p style={{color:'#888', fontSize:'13px', margin:0}}>Secure Payment / Pago Seguro</p>
        </div>

        {/* Job Summary */}
        <div style={{background:'#f8f6f2', borderRadius:'16px', padding:'20px', marginBottom:'24px'}}>
          <p style={{fontWeight:'bold', color:'#1a1a2e', fontSize:'14px', marginBottom:'12px'}}>Order Summary / Resumen</p>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px', color:'#555', marginBottom:'8px'}}>
            <span>Provider / Proveedor</span>
            <span style={{fontWeight:'600', color:'#1a1a2e'}}>{providerName}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px', color:'#555', marginBottom:'8px'}}>
            <span>Service Amount / Servicio</span>
            <span>${amountNum.toFixed(2)}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px', color:'#16a34a', marginBottom:'8px'}}>
            <span>Platform Fee / Plataforma</span>
            <span style={{fontWeight:'600'}}>FREE ✓</span>
          </div>
          <div style={{borderTop:'1px solid #e5e7eb', paddingTop:'12px', marginTop:'4px', display:'flex', justifyContent:'space-between', fontWeight:'bold', fontSize:'16px', color:'#1a1a2e'}}>
            <span>Total</span>
            <span>${amountNum.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Methods Label */}
        <div style={{marginBottom:'16px'}}>
          <p style={{fontSize:'13px', fontWeight:'bold', color:'#1a1a2e', marginBottom:'4px'}}>Pay with / Pagar con</p>
          <div style={{display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'12px', alignItems:'center'}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" style={{height:'20px', opacity:0.7}}/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" style={{height:'20px', opacity:0.7}}/>
            <img src="https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/visa.svg" alt="Visa" style={{height:'22px', opacity:0.7}}/>
            <img src="https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/mastercard.svg" alt="Mastercard" style={{height:'22px', opacity:0.7}}/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" style={{height:'20px', opacity:0.7}}/>
          </div>
        </div>

        {/* Stripe Payment Element */}
        <form onSubmit={handlePayment}>
          <PaymentElement options={{
            layout: 'tabs',
            paymentMethodOrder: ['apple_pay', 'google_pay', 'card', 'paypal']
          }}/>
          {error && (
            <div style={{background:'#fef2f2', border:'1px solid #fca5a5', borderRadius:'10px', padding:'12px', marginTop:'12px'}}>
              <p style={{color:'#dc2626', fontSize:'13px', margin:0}}>{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !stripe}
            style={{width:'100%', background: loading ? '#ccc' : 'linear-gradient(135deg,#FF6B35,#F4A261)', border:'none', color:'white', padding:'16px', borderRadius:'16px', fontWeight:'bold', fontSize:'16px', cursor: loading ? 'not-allowed' : 'pointer', marginTop:'20px'}}
          >
            {loading ? 'Processing... / Procesando...' : `Pay $${amountNum.toFixed(2)} →`}
          </button>
        </form>

        {/* Footer */}
        <div style={{textAlign:'center', marginTop:'20px'}}>
          <p style={{fontSize:'12px', color:'#aaa', margin:'0 0 4px'}}>🔒 Secured by Stripe · End-to-end encrypted</p>
          <p style={{fontSize:'11px', color:'#ccc', margin:0}}>Provider receives ${providerPayout} · NecesitoYa fee: ${commission}</p>
        </div>

      </div>
    </main>
  );
}

function CheckoutWrapper() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  const amount = searchParams.get('amount');
  const providerId = searchParams.get('providerId');
  const providerName = searchParams.get('providerName') || 'Your Provider';
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
        else setError(data.error || 'Failed to initialize payment. Please try again.');
      })
      .catch(() => setError('Failed to load payment. Please check your connection.'));
  }, [jobId, amount, providerId]);

  if (error) return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial', padding:'24px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'48px', maxWidth:'400px', width:'100%', textAlign:'center'}}>
        <div style={{fontSize:'48px', marginBottom:'16px'}}>⚠️</div>
        <h2 style={{color:'#1a1a2e', marginBottom:'8px'}}>Payment Error</h2>
        <p style={{color:'#888', fontSize:'14px', marginBottom:'24px'}}>{error}</p>
        <a href="/customer-dashboard" style={{display:'block', background:'linear-gradient(135deg,#FF6B35,#F4A261)', color:'white', padding:'14px', borderRadius:'16px', textDecoration:'none', fontWeight:'bold', fontSize:'15px'}}>
          ← Back to Dashboard
        </a>
      </div>
    </main>
  );

  if (!clientSecret) return (
    <main style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'48px', marginBottom:'16px'}}>⚡</div>
        <p style={{color:'white', fontSize:'16px'}}>Loading payment... / Cargando pago...</p>
      </div>
    </main>
  );

  return (
    <Elements stripe={stripePromise} options={{
      clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#FF6B35',
          colorBackground: '#ffffff',
          colorText: '#1a1a2e',
          borderRadius: '12px',
          fontFamily: 'Arial, sans-serif',
        }
      }
    }}>
      <CheckoutForm jobId={jobId} amount={amount} providerName={providerName} />
    </Elements>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh', background:'linear-gradient(135deg,#1a1a2e,#0f3460)', display:'flex', alignItems:'center', justifyContent:'center'}}><p style={{color:'white'}}>Loading...</p></div>}>
      <CheckoutWrapper />
    </Suspense>
  );
}