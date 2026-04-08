export default function DownloadPage() {
  return (
    <main style={{fontFamily: "Arial, sans-serif", margin: 0, padding: 0}}>

      {/* NAV */}
      <nav style={{background: "#1a1a2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px"}}>
        <a href="/" style={{color: "#FF6B35", fontSize: "24px", fontWeight: "bold", textDecoration: "none"}}>⚡ NecesitoYa</a>
        <div style={{display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center"}}>
          <a href="/post-job" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>Get Help</a>
          <a href="/find-a-pro" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>Find a Pro</a>
          <a href="/jobs" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>Find Jobs</a>
          <a href="/my-dashboard" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>My Account</a>
          <a href="/signup-provider" style={{background: "transparent", border: "1px solid #FF6B35", color: "#FF6B35", padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", textDecoration: "none"}}>Offer Services</a>
          <a href="/login" style={{background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "white", padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", textDecoration: "none"}}>Sign In</a>
          <a href="/signup-customer" style={{background: "#FF6B35", border: "none", color: "white", padding: "8px 20px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold", textDecoration: "none", fontSize: "13px"}}>Sign Up / Regístrate</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", padding: "80px 32px", textAlign: "center"}}>
        <div style={{fontSize: "14px", color: "#FF6B35", letterSpacing: "4px", marginBottom: "16px"}}>AMERICA'S BILINGUAL LOCAL SERVICES APP · LA APP BILINGÜE DE SERVICIOS LOCALES DE AMÉRICA</div>
        <h1 style={{fontSize: "52px", fontWeight: "bold", color: "white", margin: "0 0 8px 0", lineHeight: 1.1}}>NecesitoYa</h1>
        <p style={{fontSize: "20px", color: "rgba(255,255,255,0.6)", marginBottom: "8px"}}>I Need It Now &nbsp;·&nbsp; Lo Necesito Ya</p>
        <p style={{fontSize: "16px", color: "rgba(255,255,255,0.4)", marginBottom: "8px"}}>Find trusted local help near you — in English or Spanish</p>
        <p style={{fontSize: "14px", color: "rgba(255,255,255,0.3)", marginBottom: "48px"}}>Encuentra ayuda local de confianza — en inglés o español</p>

        <div style={{display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px"}}>
          <a href="https://apps.apple.com/app/id6761226228" target="_blank" rel="noopener noreferrer"
            style={{display: "flex", alignItems: "center", gap: "12px", background: "white", color: "#1a1a2e", padding: "14px 28px", borderRadius: "14px", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", minWidth: "190px"}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#1a1a2e">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div style={{textAlign: "left"}}>
              <div style={{fontSize: "11px", color: "#666", fontWeight: "normal"}}>Download on the</div>
              <div style={{fontSize: "18px", fontWeight: "bold"}}>App Store</div>
            </div>
          </a>

          <a href="https://play.google.com/store/apps/details?id=com.necesitoya.app" target="_blank" rel="noopener noreferrer"
            style={{display: "flex", alignItems: "center", gap: "12px", background: "white", color: "#1a1a2e", padding: "14px 28px", borderRadius: "14px", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", minWidth: "190px"}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M3.18 23.76c.3.17.64.24.99.2L15.34 12 11.84 8.5 3.18 23.76z" fill="#EA4335"/>
              <path d="M20.47 10.37l-2.75-1.6-3.38 3.23 3.38 3.22 2.78-1.61c.79-.46.79-1.77-.03-2.24z" fill="#FBBC04"/>
              <path d="M3.18.24C2.88.07 2.54 0 2.19.04L14.06 12 3.18 23.76C2.88 23.59 2.67 23.29 2.67 22.88V1.12C2.67.71 2.88.41 3.18.24z" fill="#4285F4"/>
              <path d="M15.34 12L3.18.24c.3-.17.64-.24.99-.2L17.72 7.77 15.34 12z" fill="#34A853"/>
            </svg>
            <div style={{textAlign: "left"}}>
              <div style={{fontSize: "11px", color: "#666", fontWeight: "normal"}}>Get it on</div>
              <div style={{fontSize: "18px", fontWeight: "bold"}}>Google Play</div>
            </div>
          </a>
        </div>

        <p style={{color: "rgba(255,255,255,0.35)", fontSize: "14px", margin: 0}}>
          Prefer the browser?{" "}
          <a href="/" style={{color: "#FF6B35", textDecoration: "underline"}}>Use the web app instead →</a>
        </p>
      </section>

      {/* WHY DOWNLOAD */}
      <section style={{padding: "60px 32px", background: "#f8f6f2"}}>
        <h2 style={{textAlign: "center", fontSize: "28px", color: "#1a1a2e", marginBottom: "4px"}}>Why download the app?</h2>
        <p style={{textAlign: "center", color: "#FF6B35", fontWeight: "bold", marginBottom: "40px"}}>¿Por qué descargar la app?</p>
        <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", maxWidth: "600px", margin: "0 auto"}}>
          {[
            {icon: "🔔", label: "Instant Notifications", sub: "Notificaciones al instante", desc: "Get alerted the moment a provider responds to your job"},
            {icon: "💬", label: "Chat On the Go", sub: "Chatea donde estés", desc: "Message providers in English or Spanish from anywhere"},
            {icon: "⚡", label: "Post Jobs Fast", sub: "Publica trabajos rápido", desc: "Post a job in under 2 minutes right from your phone"},
            {icon: "💰", label: "Track Your Earnings", sub: "Controla tus ganancias", desc: "Providers can manage jobs and payouts from the app"},
          ].map((f) => (
            <div key={f.label} style={{background: "white", borderRadius: "16px", padding: "28px 20px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize: "36px", marginBottom: "12px"}}>{f.icon}</div>
              <div style={{fontWeight: "bold", color: "#1a1a2e", fontSize: "15px", marginBottom: "4px"}}>{f.label}</div>
              <div style={{color: "#FF6B35", fontSize: "12px", marginBottom: "10px"}}>{f.sub}</div>
              <div style={{color: "#888", fontSize: "13px", lineHeight: "1.5"}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{padding: "60px 32px", background: "white"}}>
        <h2 style={{textAlign: "center", fontSize: "28px", color: "#1a1a2e", marginBottom: "4px"}}>18 Service Categories</h2>
        <p style={{textAlign: "center", color: "#FF6B35", fontWeight: "bold", marginBottom: "8px"}}>18 Categorías de Servicios</p>
        <p style={{textAlign: "center", color: "#888", marginBottom: "32px"}}>Whatever you need — we have a pro for it · Lo que necesites, tenemos un pro</p>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", maxWidth: "700px", margin: "0 auto"}}>
          {[
            {icon: "🚛", label: "Hauling & Pickup"},
            {icon: "🔨", label: "Handyman"},
            {icon: "🌿", label: "Lawn & Garden"},
            {icon: "🧹", label: "Cleaning"},
            {icon: "🎓", label: "Tutoring"},
            {icon: "🚗", label: "Transport"},
            {icon: "🛒", label: "Buy & Sell"},
            {icon: "🍳", label: "Home Cooking"},
            {icon: "🍽️", label: "Catering"},
            {icon: "🎂", label: "Baker & Pastries"},
            {icon: "🐾", label: "Pet Care"},
            {icon: "💇", label: "Beauty & Hair"},
            {icon: "👶", label: "Babysitting"},
            {icon: "🖥️", label: "Tech Help"},
            {icon: "🖌️", label: "Painting"},
            {icon: "📸", label: "Photography"},
            {icon: "🔧", label: "Mechanic"},
            {icon: "🚨", label: "Roadside & Towing"},
          ].map((cat) => (
            <span key={cat.label} style={{background: "#f8f6f2", color: "#1a1a2e", padding: "8px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "500"}}>
              {cat.icon} {cat.label}
            </span>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{background: "linear-gradient(135deg, #1a1a2e, #0f3460)", padding: "60px 32px", textAlign: "center"}}>
        <h2 style={{color: "white", fontSize: "32px", marginBottom: "4px"}}>Ready to get started?</h2>
        <p style={{color: "#FF6B35", fontWeight: "bold", marginBottom: "8px"}}>¿Listo para comenzar?</p>
        <p style={{color: "rgba(255,255,255,0.6)", marginBottom: "32px"}}>Download the app or use it right in your browser · Descarga la app o úsala en tu navegador</p>
        <div style={{display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap"}}>
          <a href="https://apps.apple.com/app/id6761226228" target="_blank" rel="noopener noreferrer"
            style={{background: "white", color: "#1a1a2e", padding: "16px 40px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold", fontSize: "15px"}}>
            🍎 App Store
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.necesitoya.app" target="_blank" rel="noopener noreferrer"
            style={{background: "white", color: "#1a1a2e", padding: "16px 40px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold", fontSize: "15px"}}>
            🤖 Google Play
          </a>
          <a href="/"
            style={{background: "linear-gradient(135deg, #FF6B35, #F4A261)", color: "white", padding: "16px 40px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold", fontSize: "15px"}}>
            🌐 Use Web App →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background: "#1a1a2e", padding: "32px", color: "rgba(255,255,255,0.4)", fontSize: "13px"}}>
        <div style={{maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "24px", marginBottom: "24px"}}>
          <div>
            <div style={{color: "#FF6B35", fontWeight: "bold", fontSize: "16px", marginBottom: "12px"}}>⚡ NecesitoYa</div>
            <div style={{lineHeight: "2"}}>America's Bilingual<br/>Local Services App</div>
          </div>
          <div>
            <div style={{color: "white", fontWeight: "bold", marginBottom: "12px"}}>For Customers</div>
            <div style={{lineHeight: "2.2"}}>
              <a href="/post-job?type=customer" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Post & Get Help</a>
              <a href="/find-a-pro" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Find a Pro</a>
              <a href="/buy-sell" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Buy & Sell</a>
              <a href="/customer-dashboard" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>My Dashboard</a>
            </div>
          </div>
          <div>
            <div style={{color: "white", fontWeight: "bold", marginBottom: "12px"}}>For Providers</div>
            <div style={{lineHeight: "2.2"}}>
              <a href="/signup-provider" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Sign Up Free</a>
              <a href="/provider-dashboard" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>My Dashboard</a>
              <a href="/jobs" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Find Jobs</a>
            </div>
          </div>
          <div>
            <div style={{color: "white", fontWeight: "bold", marginBottom: "12px"}}>Company</div>
            <div style={{lineHeight: "2.2"}}>
              <a href="/admin" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Admin</a>
              <a href="/privacy" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Privacy Policy</a>
              <a href="/terms" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Terms of Service</a>
              <a href="/support" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Support</a>
              <span style={{display: "block"}}>Haines City, FL</span>
            </div>
          </div>
        </div>
        <div style={{textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px"}}>
          © 2026 NecesitoYa.app · Built with ⚡ in Haines City, FL · America's Bilingual Local Services Marketplace
        </div>
      </footer>

    </main>
  )
}