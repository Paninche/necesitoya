export default function Home() {
  return (
    <main style={{fontFamily: "Arial, sans-serif", margin: 0, padding: 0}}>

      {/* NAV */}
      <nav style={{background: "#1a1a2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{color: "#FF6B35", fontSize: "24px", fontWeight: "bold"}}>⚡ NecesitoYa</div>
        <div style={{display: "flex", gap: "16px"}}>
          <button style={{background: "none", border: "1px solid #FF6B35", color: "#FF6B35", padding: "8px 20px", borderRadius: "20px", cursor: "pointer"}}>En / Es</button>
          <a href="/signup-customer" style={{background: "#FF6B35", border: "none", color: "white", padding: "8px 20px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold", textDecoration: "none"}}>Sign Up / Regístrate</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", padding: "80px 32px", textAlign: "center"}}>
        <div style={{fontSize: "14px", color: "#FF6B35", letterSpacing: "4px", marginBottom: "16px"}}>FLORIDA'S BILINGUAL SERVICES APP · LA APP BILINGÜE DE SERVICIOS DE FLORIDA</div>
        <h1 style={{fontSize: "52px", fontWeight: "bold", color: "white", margin: "0 0 8px 0", lineHeight: 1.1}}>NecesitoYa</h1>
        <p style={{fontSize: "20px", color: "rgba(255,255,255,0.6)", marginBottom: "8px"}}>I Need It Now &nbsp;·&nbsp; Lo Necesito Ya</p>
        <p style={{fontSize: "16px", color: "rgba(255,255,255,0.4)", marginBottom: "16px"}}>Connect with local service providers in Florida — in English or Spanish</p>
        <p style={{fontSize: "14px", color: "rgba(255,255,255,0.3)", marginBottom: "40px"}}>Conéctate con proveedores de servicios locales en Florida — en inglés o español</p>
        <div style={{display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap"}}>
          <a href="/signup-customer" style={{background: "linear-gradient(135deg, #FF6B35, #F4A261)", border: "none", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", textDecoration: "none"}}>
            I Need Help / Necesito Ayuda →
          </a>
          <a href="/signup-provider" style={{background: "transparent", border: "2px solid rgba(255,255,255,0.3)", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", cursor: "pointer", textDecoration: "none"}}>
            I Offer Services / Ofrezco Servicios →
          </a>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{padding: "60px 32px", background: "#f8f6f2"}}>
        <h2 style={{textAlign: "center", fontSize: "28px", color: "#1a1a2e", marginBottom: "4px"}}>What do you need?</h2>
        <p style={{textAlign: "center", color: "#FF6B35", marginBottom: "4px", fontWeight: "bold"}}>¿Qué necesitas?</p>
        <p style={{textAlign: "center", color: "#888", marginBottom: "40px"}}>Browse by category / Buscar por categoría</p>
        <div style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", maxWidth: "700px", margin: "0 auto"}}>
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
            <a href="/signup-customer" key={cat.label} style={{background: "white", borderRadius: "16px", padding: "16px 8px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", textDecoration: "none"}}>
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

      {/* EARLY ACCESS */}
      <section style={{background: "linear-gradient(135deg, #1a1a2e, #0f3460)", padding: "60px 32px", textAlign: "center"}}>
        <h2 style={{color: "white", fontSize: "32px", marginBottom: "4px"}}>Be the first to know</h2>
        <p style={{color: "#FF6B35", fontWeight: "bold", marginBottom: "8px"}}>Sé el primero en saber</p>
        <p style={{color: "rgba(255,255,255,0.6)", marginBottom: "32px"}}>Join the waitlist · Únete a la lista de espera</p>
        <div style={{display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap"}}>
          <input type="email" placeholder="Your email / Tu correo" style={{padding: "14px 24px", borderRadius: "30px", border: "none", fontSize: "16px", width: "280px"}}/>
          <a href="/waitlist" style={{background: "linear-gradient(135deg, #FF6B35, #F4A261)", border: "none", color: "white", padding: "14px 32px", borderRadius: "30px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", textDecoration: "none"}}>
            Join Waitlist / Únete →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background: "#1a1a2e", padding: "24px 32px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "14px"}}>
        © 2026 NecesitoYa.app · Florida's Bilingual Local Services Marketplace · Built with ⚡ in Haines City, FL
      </footer>

    </main>
  );
}