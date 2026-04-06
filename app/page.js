export default function Home() {
  return (
    <main style={{fontFamily: "Arial, sans-serif", margin: 0, padding: 0}}>

      {/* NAV */}
      <nav style={{background: "#1a1a2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px"}}>
        <div style={{color: "#FF6B35", fontSize: "24px", fontWeight: "bold"}}>⚡ NecesitoYa</div>
        <div style={{display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center"}}>
          <a href="/my-dashboard" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>My Account</a>
          <a href="/find-a-pro" style={{color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none"}}>Find a Pro</a>
          <a href="/login" style={{background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "white", padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", textDecoration: "none"}}>Sign In</a>
          <a href="/signup-customer" style={{background: "#FF6B35", border: "none", color: "white", padding: "8px 20px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold", textDecoration: "none", fontSize: "13px"}}>I Need Help →</a>
          <a href="/signup-provider" style={{background: "transparent", border: "1px solid #FF6B35", color: "#FF6B35", padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", textDecoration: "none"}}>Offer Services</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", padding: "80px 32px", textAlign: "center"}}>
        <div style={{fontSize: "14px", color: "#FF6B35", letterSpacing: "4px", marginBottom: "16px"}}>AMERICA'S BILINGUAL LOCAL SERVICES APP · LA APP BILINGÜE DE SERVICIOS LOCALES DE AMÉRICA</div>
        <h1 style={{fontSize: "52px", fontWeight: "bold", color: "white", margin: "0 0 8px 0", lineHeight: 1.1}}>NecesitoYa</h1>
        <p style={{fontSize: "20px", color: "rgba(255,255,255,0.6)", marginBottom: "8px"}}>I Need It Now &nbsp;·&nbsp; Lo Necesito Ya</p>
        <p style={{fontSize: "16px", color: "rgba(255,255,255,0.4)", marginBottom: "40px"}}>Find trusted local help near you — in English or Spanish · Encuentra ayuda local de confianza</p>

        {/* TWO EQUAL CARDS */}
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", maxWidth: "700px", margin: "0 auto"}}>
          <div style={{background: "rgba(255,255,255,0.05)", border: "2px solid #FF6B35", borderRadius: "20px", padding: "32px 24px", textAlign: "center"}}>
            <div style={{fontSize: "48px", marginBottom: "12px"}}>🙋</div>
            <div style={{color: "white", fontSize: "20px", fontWeight: "bold", marginBottom: "4px"}}>I Need Help</div>
            <div style={{color: "#FF6B35", fontSize: "14px", fontWeight: "bold", marginBottom: "12px"}}>Necesito Ayuda</div>
            <div style={{color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "20px"}}>Post what you need and local pros respond fast. Free.</div>
            <a href="/post-job?type=customer" style={{display: "block", background: "linear-gradient(135deg, #FF6B35, #F4A261)", color: "white", padding: "14px 24px", borderRadius: "20px", fontSize: "15px", fontWeight: "bold", textDecoration: "none"}}>
              Get Help Now →
            </a>
          </div>
          <div style={{background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,255,255,0.2)", borderRadius: "20px", padding: "32px 24px", textAlign: "center"}}>
            <div style={{fontSize: "48px", marginBottom: "12px"}}>🔧</div>
            <div style={{color: "white", fontSize: "20px", fontWeight: "bold", marginBottom: "4px"}}>I Offer Services</div>
            <div style={{color: "#FF6B35", fontSize: "14px", fontWeight: "bold", marginBottom: "12px"}}>Ofrezco Servicios</div>
            <div style={{color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "20px"}}>Join free, find jobs near you, get paid directly.</div>
            <a href="/signup-provider" style={{display: "block", background: "transparent", border: "2px solid white", color: "white", padding: "12px 24px", borderRadius: "20px", fontSize: "15px", fontWeight: "bold", textDecoration: "none"}}>
              Start Earning →
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORIES — customer focused */}
      <section style={{padding: "60px 32px", background: "#f8f6f2"}}>
        <h2 style={{textAlign: "center", fontSize: "28px", color: "#1a1a2e", marginBottom: "4px"}}>What do you need help with?</h2>
        <p style={{textAlign: "center", color: "#FF6B35", marginBottom: "4px", fontWeight: "bold"}}>¿Con qué necesitas ayuda?</p>
        <p style={{textAlign: "center", color: "#888", marginBottom: "40px"}}>Tap a category to get help fast · Toca una categoría para conseguir ayuda rápido</p>
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
            <a href={cat.label === 'Buy & Sell' ? '/buy-sell' : '/post-job?type=customer'} key={cat.label} style={{background: "white", borderRadius: "16px", padding: "16px 8px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", textDecoration: "none"}}>
              <div style={{fontSize: "28px", marginBottom: "6px"}}>{cat.icon}</div>
              <div style={{fontWeight: "bold", color: "#1a1a2e", fontSize: "11px", lineHeight: "1.3"}}>{cat.label}</div>
              <div style={{color: "#FF6B35", fontSize: "10px", marginTop: "2px", lineHeight: "1.3"}}>{cat.es}</div>
            </a>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — customer focused */}
      <section style={{padding: "60px 32px", background: "white"}}>
        <h2 style={{textAlign: "center", fontSize: "28px", color: "#1a1a2e", marginBottom: "4px"}}>How it works</h2>
        <p style={{textAlign: "center", color: "#FF6B35", fontWeight: "bold", marginBottom: "40px"}}>Cómo funciona</p>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", maxWidth: "800px", margin: "0 auto"}}>
          {[
            {step: "1", icon: "📋", title: "Tell us what you need", titleEs: "Dinos qué necesitas", sub: "Describe the help you need — takes 2 minutes", subEs: "Describe lo que necesitas — toma 2 minutos"},
            {step: "2", icon: "🔔", title: "Local pros respond", titleEs: "Pros locales responden", sub: "Nearby providers reach out fast — for free", subEs: "Proveedores cercanos responden rápido"},
            {step: "3", icon: "✅", title: "Pick & pay securely", titleEs: "Elige y paga seguro", sub: "Choose who you like, pay safely in-app", subEs: "Elige al que prefieras, paga seguro en la app"},
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

      {/* FOR CUSTOMERS AND PROVIDERS — side by side equal */}
      <section style={{padding: "60px 32px", background: "#f8f6f2"}}>
        <div style={{maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px"}}>

          {/* CUSTOMER SIDE */}
          <div style={{background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)"}}>
            <div style={{fontSize: "13px", color: "#FF6B35", fontWeight: "bold", letterSpacing: "2px", marginBottom: "12px"}}>FOR CUSTOMERS · PARA CLIENTES</div>
            <h2 style={{fontSize: "24px", color: "#1a1a2e", marginBottom: "8px"}}>Get help with anything</h2>
            <p style={{color: "#FF6B35", fontWeight: "bold", marginBottom: "16px"}}>Consigue ayuda con lo que necesites</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Free to post — no subscription needed</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Local pros respond fast</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Pay securely through the app</p>
            <p style={{color: "#888", marginBottom: "24px", fontSize: "14px"}}>✅ English & Spanish support</p>
            <a href="/post-job?type=customer" style={{display: "inline-block", background: "linear-gradient(135deg, #FF6B35, #F4A261)", color: "white", padding: "14px 32px", borderRadius: "24px", textDecoration: "none", fontWeight: "bold", fontSize: "15px"}}>
              Get Help Now / Obtener Ayuda →
            </a>
          </div>

          {/* PROVIDER SIDE */}
          <div style={{background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)"}}>
            <div style={{fontSize: "13px", color: "#FF6B35", fontWeight: "bold", letterSpacing: "2px", marginBottom: "12px"}}>FOR PROVIDERS · PARA PROVEEDORES</div>
            <h2 style={{fontSize: "24px", color: "#1a1a2e", marginBottom: "8px"}}>Turn your skills into income</h2>
            <p style={{color: "#FF6B35", fontWeight: "bold", marginBottom: "16px"}}>Convierte tus habilidades en ingresos</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Free to join — no upfront costs</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Get paid directly to your bank</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Work on your own schedule</p>
            <p style={{color: "#888", marginBottom: "24px", fontSize: "14px"}}>✅ Bilingual — English & Spanish</p>
            <a href="/signup-provider" style={{display: "inline-block", background: "#1a1a2e", color: "white", padding: "14px 32px", borderRadius: "24px", textDecoration: "none", fontWeight: "bold", fontSize: "15px"}}>
              Start Earning / Empieza a Ganar →
            </a>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section style={{background: "linear-gradient(135deg, #1a1a2e, #0f3460)", padding: "60px 32px", textAlign: "center"}}>
        <h2 style={{color: "white", fontSize: "32px", marginBottom: "4px"}}>Ready to get started?</h2>
        <p style={{color: "#FF6B35", fontWeight: "bold", marginBottom: "8px"}}>¿Listo para comenzar?</p>
        <p style={{color: "rgba(255,255,255,0.6)", marginBottom: "32px"}}>Join thousands of people connecting locally · Únete a miles de personas conectándose localmente</p>
        <div style={{display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap"}}>
          <a href="/post-job?type=customer" style={{background: "linear-gradient(135deg, #FF6B35, #F4A261)", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", fontWeight: "bold", textDecoration: "none"}}>
            I Need Help / Necesito Ayuda →
          </a>
          <a href="/signup-provider" style={{background: "transparent", border: "2px solid #FF6B35", color: "#FF6B35", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", textDecoration: "none"}}>
            I Offer Services / Ofrezco Servicios →
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
              <a href="/post-job?type=customer" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Get Help Now</a>
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
              <a href="/jobs" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Available Jobs</a>
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