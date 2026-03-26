export default function Privacy() {
  return (
    <main style={{fontFamily:'Arial', maxWidth:'800px', margin:'0 auto', padding:'40px 32px'}}>
      <a href="/" style={{color:'#FF6B35', textDecoration:'none'}}>← Back to NecesitoYa</a>
      <h1 style={{color:'#1a1a2e', marginTop:'24px'}}>Privacy Policy</h1>
      <p style={{color:'#888', marginBottom:'32px'}}>Last updated: March 25, 2026</p>

      <h2 style={{color:'#1a1a2e'}}>1. Information We Collect</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>We collect information you provide: name, email, phone number, city, and service preferences. We also collect job postings and messages sent through the platform.</p>

      <h2 style={{color:'#1a1a2e'}}>2. How We Use Your Information</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>We use your information to connect customers with service providers, process payments, send notifications about job activity, and improve the platform.</p>

      <h2 style={{color:'#1a1a2e'}}>3. Payment Information</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>Payments are processed securely by Stripe. We do not store credit card information. Provider payouts are handled directly by Stripe Connect.</p>

      <h2 style={{color:'#1a1a2e'}}>4. Information Sharing</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>We do not sell your personal information. We share information between customers and providers only as necessary to complete service transactions.</p>

      <h2 style={{color:'#1a1a2e'}}>5. Data Security</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>We use Supabase for secure data storage with row-level security policies. All data is encrypted in transit using HTTPS.</p>

      <h2 style={{color:'#1a1a2e'}}>6. Your Rights & Data Deletion</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>You can request deletion of your account and all associated data at any time by emailing us at <a href="mailto:privacy@necesitoya.app" style={{color:'#FF6B35'}}>privacy@necesitoya.app</a>. We will process all deletion requests within 30 days.</p>

      <h2 style={{color:'#1a1a2e'}}>7. Contact Us</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>For privacy questions contact us at: <a href="mailto:privacy@necesitoya.app" style={{color:'#FF6B35'}}>privacy@necesitoya.app</a></p>

      <h2 style={{color:'#1a1a2e'}}>Política de Privacidad</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>NecesitoYa recopila información que usted proporciona: nombre, correo electrónico, teléfono, ciudad y preferencias de servicios. No vendemos su información personal. Los pagos son procesados de forma segura por Stripe. Puede solicitar la eliminación de su cuenta enviando un correo a <a href="mailto:privacy@necesitoya.app" style={{color:'#FF6B35'}}>privacy@necesitoya.app</a>.</p>

      <div style={{marginTop:'48px', padding:'24px', background:'#f8f6f2', borderRadius:'12px'}}>
        <p style={{color:'#888', fontSize:'13px', margin:0}}>© 2026 NecesitoYa.app · Haines City, FL · <a href="/" style={{color:'#FF6B35'}}>necesitoya.app</a></p>
      </div>
    </main>
  )
}