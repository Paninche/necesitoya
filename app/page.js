export default function Home() {
  return (
    <main style={{fontFamily: "Arial, sans-serif", margin: 0, padding: 0}}>

      {/* NAV */}
      <nav style={{background: "#1a1a2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px"}}>
        <div style={{color: "#FF6B35", fontSize: "24px", fontWeight: "bold"}}>⚡ NecesitoYa</div>
        <div style={{display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center"}}>
          <a href="/jobs" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>Jobs</a>
          <a href="/find-a-pro" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>Find a Pro</a>
          <a href="/post-job" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>Post Job</a>
          <a href="/customer-dashboard" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>My Jobs</a>
          <a href="/provider-dashboard" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>Provider</a>
          <a href="/signup-provider" style={{background: "transparent", border: "1px solid #FF6B35", color: "#FF6B35", padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", textDecoration: "none"}}>Offer Services</a>
          <a href="/signup-customer" style={{background: "#FF6B35", border: "none", color: "white", padding: "8px 20px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold", textDecoration: "none", fontSize: "13px"}}>Sign Up / Regístrate</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", padding: "80px 32px", textAlign: "center"}}>
        <div style={{fontSize: "14px", color: "#FF6B35", letterSpacing: "4px", marginBottom: "16px"}}>AMERICA'S BILINGUAL LOCAL SERVICES APP · LA APP BILINGÜE DE SERVICIOS LOCALES DE AMÉRICA</div>
        <h1 style={{fontSize: "52px", fontWeight: "bold", color: "white", margin: "0 0 8px 0", lineHeight: 1.1}}>NecesitoYa</h1>
        <p style={{fontSize: "20px", color: "rgba(255,255,255,0.6)", marginBottom: "8px"}}>I Need It Now &nbsp;·&nbsp; Lo Necesito Ya</p>
        <p style={{fontSize: "16px", color: "rgba(255,255,255,0.4)", marginBottom: "16px"}}>Connect with local service providers near you — in English or Spanish</p>
        <p style={{fontSize: "14px", color: "rgba(255,255,255,0.3)", marginBottom: "40px"}}>Conéctate con proveedores de servicios locales — en inglés o español</p>
        <div style={{display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap"}}>
          <a href="/post-job" style={{background: "linear-gradient(135deg, #FF6B35, #F4A261)", border: "none", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", textDecoration: "none"}}>
            I Need Help / Necesito Ayuda →
          </a>
          <a href="/find-a-pro" style={{background: "transparent", border: "2px solid rgba(255,255,255,0.3)", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", cursor: "pointer", textDecoration: "none"}}>
            Find a Pro / Encuentra un Pro →
          </a>
          <a href="/signup-provider" style={{background: "transparent", border: "2px solid #FF6B35", color: "#FF6B35", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", cursor: "pointer", textDecoration: "none"}}>
            I Offer Services / Ofrezco Servicios →
          </a>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{padding: "60px 32px", background: "#f8f6f2"}}>
        <h2 style={{textAlign: "center", fontSize: "28px", color: "#1a1a2e", marginBottom: "4px"}}>What do you need?</h2>
        <p style={{textAlign: "center", color: "#FF6B35", marginBottom: "4px", fontWeight: "bold"}}>¿Qué necesitas?</p>
        <p style={{textAlign: "center", color: "#888", marginBottom: "40px"}}>Browse by category / Buscar por categoría</p>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "12px", maxWidth: "700px", margin: "0 auto"}}>
          {[
            {icon: "🚛", label: "Hauling & Pickup", es: "Mudanza & Recogida"},
            {icon: "🔨", label: "Handyman", es: "Reparaciones"},
            {icon: "🌿", label: "Lawn & Garden", es: "Jardinería"},
            {icon: "🧹", label: "Cleaning", es: "Limpieza"},
            {icon: "🎓", label: "Tutoring", es: "Tutoría"},
            {icon: "🚗", label: "Transport", es: "Transporte"},
            {icon: "🛒", label: "Buy & Sell", es: "Compra & Venta"},
            {icon: "🍳", label: "Home Cooking", es: "Comida Casera"},
            {icon: "🍽️", label: "Catering", es: "Catering & Eventos"},
            {icon: "🎂", label: "Baker & Pastries", es: "Panadería & Pasteles"},
            {icon: "🐾", label: "Pet Care", es: "Cuidado de Mascotas"},
            {icon: "💇", label: "Beauty & Hair", es: "Belleza & Cabello"},
            {icon: "👶", label: "Babysitting", es: "Cuidado de Niños"},
            {icon: "🖥️", label: "Tech Help", es: "Ayuda con Tecnología"},
            {icon: "🖌️", label: "Painting", es: "Pintura"},
            {icon: "📸", label: "Photography", es: "Fotografía"},
            {icon: "🔧", label: "Mechanic", es: "Mecánico"},
            {icon: "🚨", label: "Roadside & Towing", es: "Grúa & Asistencia Vial"},
          ].map((cat) => (
            <a href={cat.label === 'Buy & Sell' ? '/buy-sell' : '/post-job'} key={cat.label} style={{background: "white", borderRadius: "16px", padding: "16px 8px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", textDecoration: "none"}}>
              <div style={{fontSize: "28px", marginBottom: "6px"}}>{cat.icon}</div>
              <div style={{fontWeight: "bold", color: "#1a1a2e", fontSize: "11px", lineHeight: "1.3"}}>{cat.label}</div>
              <div style={{color: "#FF6B35", fontSize: "10px", marginTop: "2px", lineHeight: "1.3"}}>{cat.es}</div>
            </a>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding: "60px 32px", background: "white"}}>
        <h2 style={{textAlign: "center", fontSize: "28px", color: "#1a1a2e", marginBottom: "4px"}}>How it works</h2>
        <p style={{textAlign: "center", color: "#FF6B35", fontWeight: "bold", marginBottom: "40px"}}>Cómo funciona</p>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", maxWidth: "800px", margin: "0 auto"}}>
          {[
            {step: "1", icon: "📋", title: "Post your need", titleEs: "Publica tu necesidad", sub: "Describe what you need, set your budget", subEs: "Describe lo que necesitas, fija tu presupuesto"},
            {step: "2", icon: "🔔", title: "Get offers", titleEs: "Recibe ofertas", sub: "Nearby providers respond fast", subEs: "Proveedores cercanos responden rápido"},
            {step: "3", icon: "✅", title: "Pick & pay", titleEs: "Elige y paga", sub: "Choose the best offer, pay securely in-app", subEs: "Elige la mejor oferta, paga seguro en la app"},
          ].map((s) => (
            <div key={s.step} style={{textAlign: "center"}}>
              <div style={{width: "56px", height: "56px", background: "linear-gradient(135deg, #FF6B35, #F4A261)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "white", fontWeight: "bold", fontSize: "20px"}}>{s.step}</div>
              <div style={{fontSize: "28px", marginBottom: "8px"}}>{s.icon}</div>
              <div style={{fontWeight: "bold", color: "#1a1a2e", marginBottom: "2px"}}>{s.title}</div>
              <div style={{color: "#FF6B35", fontSize: "13px", marginBottom: "4px"}}>{s.titleEs}</div>
              <div style={{color: "#888", fontSize: "13px"}}>{s.sub}</div>
              <div style={{color: "#aaa", fontSize: "12px", marginTop: "2px"}}>{s.subEs}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOR PROVIDERS */}
      <section style={{padding: "60px 32px", background: "#f8f6f2"}}>
        <div style={{maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center"}}>
          <div>
            <div style={{fontSize: "13px", color: "#FF6B35", fontWeight: "bold", letterSpacing: "2px", marginBottom: "12px"}}>FOR PROVIDERS · PARA PROVEEDORES</div>
            <h2 style={{fontSize: "28px", color: "#1a1a2e", marginBottom: "8px"}}>Turn your skills into income</h2>
            <p style={{color: "#FF6B35", fontWeight: "bold", marginBottom: "16px"}}>Convierte tus habilidades en ingresos</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Free to join — no upfront costs</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Get paid directly to your bank account</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Work on your own schedule</p>
            <p style={{color: "#888", marginBottom: "24px", fontSize: "14px"}}>✅ Bilingual platform — English & Spanish</p>
            <a href="/signup-provider" style={{display: "inline-block", background: "linear-gradient(135deg, #FF6B35, #F4A261)", color: "white", padding: "14px 32px", borderRadius: "24px", textDecoration: "none", fontWeight: "bold", fontSize: "15px"}}>
              Start Earning / Empieza a Ganar →
            </a>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px"}}>
            {[
              {icon: "💰", label: "Keep 92%", sub: "of every job"},
              {icon: "📱", label: "Mobile ready", sub: "work anywhere"},
              {icon: "⭐", label: "Build reviews", sub: "grow your business"},
              {icon: "🔒", label: "Secure payouts", sub: "via Stripe"},
            ].map(item => (
              <div key={item.label} style={{background: "white", borderRadius: "12px", padding: "20px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)"}}>
                <div style={{fontSize: "28px", marginBottom: "8px"}}>{item.icon}</div>
                <div style={{fontWeight: "bold", color: "#1a1a2e", fontSize: "14px"}}>{item.label}</div>
                <div style={{color: "#888", fontSize: "12px", marginTop: "4px"}}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EARLY ACCESS */}
      <section style={{background: "linear-gradient(135deg, #1a1a2e, #0f3460)", padding: "60px 32px", textAlign: "center"}}>
        <h2 style={{color: "white", fontSize: "32px", marginBottom: "4px"}}>Ready to get started?</h2>
        <p style={{color: "#FF6B35", fontWeight: "bold", marginBottom: "8px"}}>¿Listo para comenzar?</p>
        <p style={{color: "rgba(255,255,255,0.6)", marginBottom: "32px"}}>Join thousands of people connecting locally · Únete a miles de personas conectándose localmente</p>
        <div style={{display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap"}}>
          <a href="/post-job" style={{background: "linear-gradient(135deg, #FF6B35, #F4A261)", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", fontWeight: "bold", textDecoration: "none"}}>
            Post a Job / Publicar Trabajo →
          </a>
          <a href="/find-a-pro" style={{background: "transparent", border: "2px solid white", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", textDecoration: "none"}}>
            Find a Pro / Encuentra un Pro →
          </a>
          <a href="/signup-provider" style={{background: "transparent", border: "2px solid #FF6B35", color: "#FF6B35", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", textDecoration: "none"}}>
            Become a Provider / Ser Proveedor →
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
              <a href="/post-job" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Post a Job</a>
              <a href="/find-a-pro" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Find a Pro</a>
              <a href="/buy-sell" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Buy & Sell</a>
              <a href="/jobs" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Browse Jobs</a>
              <a href="/customer-dashboard" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>My Dashboard</a>
            </div>
          </div>
          <div>
            <div style={{color: "white", fontWeight: "bold", marginBottom: "12px"}}>For Providers</div>
            <div style={{lineHeight: "2.2"}}>
              <a href="/signup-provider" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Sign Up</a>
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
  );
}