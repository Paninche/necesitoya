'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get('jobId');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '48px 40px', maxWidth: '480px', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        
        {/* Success Icon */}
        <div style={{ width: '72px', height: '72px', backgroundColor: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '36px' }}>
          ✓
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a2e', marginBottom: '8px' }}>
          Payment Successful!
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '4px' }}>
          ¡Pago Exitoso!
        </p>

        {/* Message */}
        <div style={{ backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '16px', margin: '24px 0', fontSize: '14px', color: '#4b5563', lineHeight: '1.6' }}>
          Your payment has been processed successfully. The provider has been notified and will be in touch shortly.
          <br /><br />
          Su pago fue procesado exitosamente. El proveedor ha sido notificado y se pondrá en contacto pronto.
        </div>

        {/* Job ID */}
        {jobId && (
          <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '24px' }}>
            Job ID: {jobId}
          </p>
        )}

        {/* Buttons */}
        <button
          onClick={() => router.push('/jobs')}
          style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: 'pointer', marginBottom: '12px' }}
        >
          View All Jobs / Ver Trabajos
        </button>

        <button
          onClick={() => router.push('/')}
          style={{ width: '100%', backgroundColor: 'white', color: '#6b7280', padding: '14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', border: '1px solid #e5e7eb', cursor: 'pointer' }}
        >
          Back to Home / Inicio
        </button>

        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '24px' }}>
          🔒 Secured by Stripe · NecesitoYa
        </p>
      </div>
    </div>
  );
}