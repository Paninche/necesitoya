export default function Home() {
  return (
    <main style={{fontFamily: "Arial, sans-serif", margin: 0, padding: 0}}>

      {/* NAV */}
      <nav style={{background: "#1a1a2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px"}}>
        <div style={{color: "#FF6B35", fontSize: "24px", fontWeight: "bold"}}>⚡ NecesitoYa</div>
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
        <p style={{fontSize: "16px", color: "rgba(255,255,255,0.4)", marginBottom: "16px"}}>Find local help near you — in English or Spanish</p>
        <p style={{fontSize: "14px", color: "rgba(255,255,255,0.3)", marginBottom: "40px"}}>Encuentra ayuda local cerca de ti — en inglés o español</p>
        <div style={{display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap"}}>
          <a href="/post-job?type=customer" style={{background: "linear-gradient(135deg, #FF6B35, #F4A261)", border: "none", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap"}}>
            Post & Get Help / Publica y Obtén Ayuda →
          </a>
          <a href="/find-a-pro" style={{background: "transparent", border: "2px solid rgba(255,255,255,0.5)", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", fontWeight: "600", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap"}}>
            Find a Pro / Encuentra un Pro →
          </a>
          <a href="/signup-provider" style={{background: "transparent", border: "2px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", padding: "16px 40px", borderRadius: "30px", fontSize: "15px", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap"}}>
            I Offer Services / Ofrezco Servicios →
          </a>
          <a href="/jobs" style={{background: "transparent", border: "2px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", padding: "16px 40px", borderRadius: "30px", fontSize: "15px", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap"}}>
            Find Jobs / Ver Trabajos →
          </a>
        </div>
        <div style={{marginTop: "32px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "8px"}}>
          <div style={{display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,107,53,0.4)", borderRadius: "30px", padding: "10px 20px"}}>
            <span style={{fontSize: "18px"}}>🔒</span>
            <a href="/guarantee" style={{color: "white", fontSize: "13px", fontWeight: "bold", textDecoration: "none"}}>NecesitoYa Guarantee — Your payment is protected →</a>
          </div>
          <div style={{display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,107,53,0.4)", borderRadius: "30px", padding: "10px 20px"}}>
            <span style={{fontSize: "18px"}}>🔒</span>
            <a href="/guarantee" style={{color: "white", fontSize: "13px", fontWeight: "bold", textDecoration: "none"}}>Garantía NecesitoYa — Tu pago está protegido →</a>
          </div>
        </div>
        <div style={{marginTop: "16px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap"}}>
          <a href="https://apps.apple.com/app/id6761226228" target="_blank" rel="noopener noreferrer" style={{display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "white", padding: "10px 20px", borderRadius: "12px", textDecoration: "none", whiteSpace: "nowrap"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            <span style={{fontSize: "14px", fontWeight: "600"}}>App Store</span>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.necesitoya.app" target="_blank" rel="noopener noreferrer" style={{display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "white", padding: "10px 20px", borderRadius: "12px", textDecoration: "none", whiteSpace: "nowrap"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3.18 23.76c.3.17.64.24.99.2L15.34 12 11.84 8.5 3.18 23.76z" fill="#EA4335"/><path d="M20.47 10.37l-2.75-1.6-3.38 3.23 3.38 3.22 2.78-1.61c.79-.46.79-1.77-.03-2.24z" fill="#FBBC04"/><path d="M3.18.24C2.88.07 2.54 0 2.19.04L14.06 12 3.18 23.76C2.88 23.59 2.67 23.29 2.67 22.88V1.12C2.67.71 2.88.41 3.18.24z" fill="#4285F4"/><path d="M15.34 12L3.18.24c.3-.17.64-.24.99-.2L17.72 7.77 15.34 12z" fill="#34A853"/></svg>
            <span style={{fontSize: "14px", fontWeight: "600"}}>Google Play</span>
          </a>
        </div>
      </section>

      {/* AS SEEN ON */}
      <section style={{background: "white", padding: "24px 32px", textAlign: "center", borderTop: "1px solid #f0ede8"}}>
        <p style={{color: "#aaa", fontSize: "11px", letterSpacing: "3px", marginBottom: "16px", textTransform: "uppercase"}}>As Seen On</p>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "40px", flexWrap: "wrap"}}>
          <a href="https://usanews.com/newsroom/how-david-cruzado-used-ai-to-build-necesitoya-america-s-first-bilingual-local-services-app" target="_blank" rel="noopener noreferrer">
            <img src="/usa-news-badge.png" alt="As Seen On USA News" style={{height: "100px", display: "block"}}/>
          </a>
          <a href="https://ceotimes.com/necesitoya-builds-bilingual-service-marketplace/" target="_blank" rel="noopener noreferrer">
            <img src="/ceotimes-badge.jpg" alt="As Seen On CEOTimes" style={{height: "100px", display: "block"}}/>
          </a>
        </div>
      </section>

      {/* CATEGORIES */}
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

      {/* HOW IT WORKS */}
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

      {/* FOR CUSTOMERS */}
      <section style={{padding: "60px 32px", background: "#f8f6f2"}}>
        <div style={{maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center"}}>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px"}}>
            {[
              {icon: "🆓", label: "Free to post", sub: "no fees for customers"},
              {icon: "⚡", label: "Fast responses", sub: "local pros reply fast"},
              {icon: "💬", label: "Chat in-app", sub: "English & Spanish"},
              {icon: "🔒", label: "Pay securely", sub: "via Stripe"},
            ].map(item => (
              <div key={item.label} style={{background: "white", borderRadius: "12px", padding: "20px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)"}}>
                <div style={{fontSize: "28px", marginBottom: "8px"}}>{item.icon}</div>
                <div style={{fontWeight: "bold", color: "#1a1a2e", fontSize: "14px"}}>{item.label}</div>
                <div style={{color: "#888", fontSize: "12px", marginTop: "4px"}}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{fontSize: "13px", color: "#FF6B35", fontWeight: "bold", letterSpacing: "2px", marginBottom: "12px"}}>FOR CUSTOMERS · PARA CLIENTES</div>
            <h2 style={{fontSize: "28px", color: "#1a1a2e", marginBottom: "8px"}}>Get help with anything, fast</h2>
            <p style={{color: "#FF6B35", fontWeight: "bold", marginBottom: "16px"}}>Consigue ayuda con lo que necesites, rápido</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ 100% free to post — no subscription</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Local pros respond directly to you</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Chat and pay securely in-app</p>
            <p style={{color: "#888", marginBottom: "8px", fontSize: "14px"}}>✅ Bilingual — English & Spanish</p>
            <p style={{color: "#888", marginBottom: "24px", fontSize: "14px"}}>🔒 <a href="/guarantee" style={{color: "#FF6B35", fontWeight: "bold", textDecoration: "none"}}>NecesitoYa Guarantee</a> — payment protected if something goes wrong</p>
            <a href="/post-job?type=customer" style={{display: "inline-block", background: "linear-gradient(135deg, #FF6B35, #F4A261)", color: "white", padding: "14px 32px", borderRadius: "24px", textDecoration: "none", fontWeight: "bold", fontSize: "15px"}}>
              Post & Get Help / Publica y Obtén Ayuda →
            </a>
          </div>
        </div>
      </section>

      {/* FOR PROVIDERS */}
      <section style={{padding: "60px 32px", background: "white"}}>
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
              {icon: "💰", label: "No monthly fees", sub: "no subscriptions"},
              {icon: "📱", label: "Mobile ready", sub: "work anywhere"},
              {icon: "⭐", label: "Build reviews", sub: "grow your business"},
              {icon: "🔒", label: "Secure payouts", sub: "via Stripe"},
            ].map(item => (
              <div key={item.label} style={{background: "#f8f6f2", borderRadius: "12px", padding: "20px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)"}}>
                <div style={{fontSize: "28px", marginBottom: "8px"}}>{item.icon}</div>
                <div style={{fontWeight: "bold", color: "#1a1a2e", fontSize: "14px"}}>{item.label}</div>
                <div style={{color: "#888", fontSize: "12px", marginTop: "4px"}}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background: "linear-gradient(135deg, #1a1a2e, #0f3460)", padding: "60px 32px", textAlign: "center"}}>
        <h2 style={{color: "white", fontSize: "32px", marginBottom: "4px"}}>Ready to get started?</h2>
        <p style={{color: "#FF6B35", fontWeight: "bold", marginBottom: "8px"}}>¿Listo para comenzar?</p>
        <p style={{color: "rgba(255,255,255,0.6)", marginBottom: "32px"}}>Join NecesitoYa and connect locally · Únete a NecesitoYa y conéctate localmente</p>
        <div style={{display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap"}}>
          <a href="/post-job?type=customer" style={{background: "linear-gradient(135deg, #FF6B35, #F4A261)", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", fontWeight: "bold", textDecoration: "none"}}>
            Post & Get Help / Publica y Obtén Ayuda →
          </a>
          <a href="/find-a-pro" style={{background: "transparent", border: "2px solid white", color: "white", padding: "16px 40px", borderRadius: "30px", fontSize: "16px", textDecoration: "none"}}>
            Find a Pro / Encuentra un Pro →
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
              <a href="/post-job?type=customer" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Post & Get Help</a>
              <a href="/find-a-pro" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Find a Pro</a>
              <a href="/buy-sell" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Buy & Sell</a>
              <a href="/customer-dashboard" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>My Dashboard</a>
              <a href="/guarantee" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Our Guarantee</a>
              <a href="/safety" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>Safety Guidelines</a>
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
              <a href="/about" style={{display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none"}}>About</a>
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