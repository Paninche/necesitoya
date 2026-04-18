export default function GuaranteePage() {
  return (
    <main style={{fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, background: '#f8f6f2', minHeight: '100vh'}}>

      {/* NAV */}
      <nav style={{background: '#1a1a2e', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <a href="/" style={{color: '#FF6B35', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none'}}>⚡ NecesitoYa</a>
        <a href="/" style={{color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none'}}>← Back to Home</a>
      </nav>

      {/* HERO */}
      <section style={{background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', padding: '60px 32px', textAlign: 'center'}}>
        <div style={{fontSize: '56px', marginBottom: '16px'}}>🔒</div>
        <h1 style={{color: 'white', fontSize: '36px', fontWeight: 'bold', margin: '0 0 8px'}}>NecesitoYa Guarantee</h1>
        <p style={{color: '#FF6B35', fontWeight: 'bold', fontSize: '18px', margin: '0 0 12px'}}>Garantía NecesitoYa</p>
        <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '600px', margin: '0 auto'}}>
          When you pay through NecesitoYa, your payment is protected. If something goes wrong, we'll make it right.
        </p>
        <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '14px', maxWidth: '600px', margin: '8px auto 0'}}>
          Cuando pagas a través de NecesitoYa, tu pago está protegido. Si algo sale mal, lo resolvemos.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section style={{maxWidth: '700px', margin: '0 auto', padding: '60px 32px'}}>

        {/* Covered */}
        <div style={{background: 'white', borderRadius: '20px', padding: '32px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{color: '#1a1a2e', fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
            ✅ What's Covered / Qué está cubierto
          </h2>
          {[
            'Provider no-show — provider never arrives for the scheduled job',
            'Job not completed as described — significant deviation from what was agreed',
            'Significant quality issues — with photo evidence submitted within 48 hours',
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px'}}>
              <span style={{color: '#16a34a', fontWeight: 'bold', fontSize: '16px', marginTop: '1px'}}>✓</span>
              <p style={{margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.6'}}>{item}</p>
            </div>
          ))}
        </div>

        {/* Not Covered */}
        <div style={{background: 'white', borderRadius: '20px', padding: '32px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{color: '#1a1a2e', fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
            ❌ What's Not Covered / Qué no está cubierto
          </h2>
          {[
            'Change of mind after the job is completed',
            'Disputes not reported within 48 hours of the job date',
            'Cash or off-platform payments — guarantee applies only to payments made through NecesitoYa',
            'Damages beyond the amount paid for the job',
            'False or unsubstantiated claims without evidence',
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px'}}>
              <span style={{color: '#dc2626', fontWeight: 'bold', fontSize: '16px', marginTop: '1px'}}>✗</span>
              <p style={{margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.6'}}>{item}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div style={{background: 'white', borderRadius: '20px', padding: '32px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{color: '#1a1a2e', fontSize: '20px', marginBottom: '20px'}}>
            📋 How to File a Claim / Cómo presentar un reclamo
          </h2>
          {[
            {step: '1', text: 'Email hello@necesitoya.app within 48 hours of the job date'},
            {step: '2', text: 'Include your job details, provider name, and photos if applicable'},
            {step: '3', text: 'We contact both parties and review the case fairly'},
            {step: '4', text: 'Resolution within 3 business days — refund, credit, or replacement provider'},
          ].map((item) => (
            <div key={item.step} style={{display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px'}}>
              <div style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, #FF6B35, #F4A261)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px', flexShrink: 0}}>{item.step}</div>
              <p style={{margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.6', paddingTop: '6px'}}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Important */}
        <div style={{background: '#fff8f5', border: '1px solid #fed7aa', borderRadius: '20px', padding: '32px', marginBottom: '40px'}}>
          <h2 style={{color: '#1a1a2e', fontSize: '20px', marginBottom: '20px'}}>⚠️ Important / Importante</h2>
          {[
            'Guarantee applies only to payments made through NecesitoYa',
            'Refunds are limited to the amount paid for the job — no consequential damages',
            'One claim per job',
            'NecesitoYa reserves the right to review all claims before issuing any refund',
            'Both parties will be contacted before any resolution is made',
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px'}}>
              <span style={{color: '#FF6B35', fontWeight: 'bold', marginTop: '1px'}}>•</span>
              <p style={{margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.6'}}>{item}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{textAlign: 'center'}}>
          <p style={{color: '#888', fontSize: '14px', marginBottom: '24px'}}>Ready to get help with confidence? / ¿Listo para obtener ayuda con confianza?</p>
          <a href="/post-job?type=customer" style={{display: 'inline-block', background: 'linear-gradient(135deg, #FF6B35, #F4A261)', color: 'white', padding: '16px 40px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px'}}>
            Post & Get Help / Publica y Obtén Ayuda →
          </a>
        </div>

      </section>

      {/* FOOTER */}
      <footer style={{background: '#1a1a2e', padding: '24px 32px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '13px'}}>
        © 2026 NecesitoYa.app · <a href="/privacy" style={{color: 'rgba(255,255,255,0.4)', textDecoration: 'none'}}>Privacy</a> · <a href="/terms" style={{color: 'rgba(255,255,255,0.4)', textDecoration: 'none'}}>Terms</a> · <a href="/support" style={{color: 'rgba(255,255,255,0.4)', textDecoration: 'none'}}>Support</a>
      </footer>

    </main>
  );
}