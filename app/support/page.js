export default function SupportPage() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0f0f1a",
      color: "#ffffff",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#1a1a2e",
        borderBottom: "1px solid rgba(255,107,53,0.3)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>⚡</span>
          <span style={{ fontSize: "20px", fontWeight: "700", color: "#FF6B35" }}>NecesitoYa</span>
        </a>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Title */}
        <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px", color: "#FF6B35" }}>
          Support Center
        </h1>
        <p style={{ color: "#FF6B35", fontWeight: "600", marginBottom: "8px", fontSize: "16px" }}>
          Centro de Soporte
        </p>
        <p style={{ color: "#aaa", marginBottom: "48px", fontSize: "16px" }}>
          We're here to help. Reach out anytime and we'll get back to you as soon as we can. / Estamos aquí para ayudar.
        </p>

        {/* Contact Card */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,107,53,0.4)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>📧 Email Support / Correo de Soporte</h2>
          <p style={{ color: "#ccc", marginBottom: "16px" }}>
            For any questions, account issues, or feedback — email us directly:
          </p>
          <a href="mailto:hello@necesitoya.app" style={{
            display: "inline-block",
            backgroundColor: "#FF6B35",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "8px",
            fontWeight: "700",
            textDecoration: "none",
            fontSize: "16px",
          }}>
            hello@necesitoya.app
          </a>
          <p style={{ color: "#888", marginTop: "16px", fontSize: "14px" }}>
            We aim to respond to most inquiries within one business day. Complex issues or disputes may take longer.
          </p>
          <p style={{ color: "#888", marginTop: "4px", fontSize: "13px" }}>
            Buscamos responder a la mayoría de las consultas dentro de un día hábil. Los problemas complejos pueden tomar más tiempo.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "32px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}>
          <a href="/guarantee" style={{ color: "#FF6B35", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>🔒 NecesitoYa Guarantee →</a>
          <a href="/safety" style={{ color: "#FF6B35", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>🛡️ Safety Guidelines →</a>
          <a href="/terms" style={{ color: "#FF6B35", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>📄 Terms of Service →</a>
          <a href="/privacy" style={{ color: "#FF6B35", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>🔐 Privacy Policy →</a>
        </div>

        {/* FAQ */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "24px" }}>❓ Frequently Asked Questions / Preguntas Frecuentes</h2>

          {[
            {
              q: "How do I create an account?",
              a: "Download the NecesitoYa app or visit necesitoya.app and tap 'Sign Up'. You can register as a Customer looking for services, or as a Service Provider offering your skills."
            },
            {
              q: "How does payment work?",
              a: "Payments are processed securely through Stripe. Customers pay through the app when a provider is selected. NecesitoYa takes an 8% platform fee; providers keep 92% of each transaction. Customers pay no platform fees."
            },
            {
              q: "How do I post a job?",
              a: "Tap 'Post a Job', select a category, describe what you need, and submit. Nearby providers will respond."
            },
            {
              q: "I'm a provider — how do I get paid?",
              a: "Connect your bank account through the Provider Dashboard (we use Stripe Connect for payouts). When a job is paid by the customer, your share is transferred to your bank automatically."
            },
            {
              q: "What if my provider doesn't show up or the job isn't completed?",
              a: "You may be eligible for a refund under the NecesitoYa Guarantee. Email hello@necesitoya.app within 48 hours of the scheduled job with details and any supporting evidence. See our Guarantee page for full details."
            },
            {
              q: "How do I report a user for inappropriate behavior?",
              a: "Email hello@necesitoya.app with the subject 'REPORT' and include the user's name or email and a description of what happened. We review all reports and may suspend or ban users who violate our Safety Guidelines."
            },
            {
              q: "Is the app available in Spanish?",
              a: "Yes. NecesitoYa is fully bilingual in English and Spanish. All categories, messages, and key features work in both languages, and chat messages can be translated between English and Spanish with a tap."
            },
            {
              q: "How do I delete my account?",
              a: "You can delete your account directly from your dashboard in the mobile app by tapping 'Delete Account' in your profile. Or email us at hello@necesitoya.app and we'll process the deletion within 30 days."
            },
            {
              q: "Does NecesitoYa perform background checks on providers?",
              a: "No. NecesitoYa is a marketplace platform and does not conduct background checks, verify licenses, or screen providers. Customers are responsible for evaluating providers before hiring. Please review our Safety Guidelines."
            },
            {
              q: "Which cities does NecesitoYa serve?",
              a: "NecesitoYa is active across the United States, with the strongest presence currently in Polk County, Florida. Anyone in the U.S. can post jobs or sign up as a provider."
            },
          ].map((item, i, arr) => (
            <div key={i} style={{
              borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              paddingBottom: i < arr.length - 1 ? "20px" : "0",
              marginBottom: i < arr.length - 1 ? "20px" : "0",
            }}>
              <p style={{ fontWeight: "700", marginBottom: "6px", color: "#F4A261" }}>{item.q}</p>
              <p style={{ color: "#bbb", fontSize: "15px", lineHeight: "1.6" }}>{item.a}</p>
            </div>
          ))}
        </div>

        {/* Spanish FAQ */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "24px" }}>❓ Preguntas Frecuentes</h2>

          {[
            {
              q: "¿Cómo creo una cuenta?",
              a: "Descarga la aplicación NecesitoYa o visita necesitoya.app y toca 'Registrarse'. Puedes registrarte como Cliente o como Proveedor de Servicios."
            },
            {
              q: "¿Cómo funcionan los pagos?",
              a: "Los pagos se procesan de forma segura a través de Stripe. Los clientes pagan a través de la aplicación al seleccionar un proveedor. NecesitoYa cobra una tarifa de plataforma del 8%; los proveedores conservan el 92% de cada transacción."
            },
            {
              q: "Soy proveedor — ¿cómo recibo el pago?",
              a: "Conecta tu cuenta bancaria a través del Panel del Proveedor (usamos Stripe Connect). Cuando un cliente paga un trabajo, tu parte se transfiere automáticamente a tu cuenta."
            },
            {
              q: "¿Qué pasa si mi proveedor no se presenta o no completa el trabajo?",
              a: "Puede ser elegible para un reembolso bajo la Garantía NecesitoYa. Envíe un correo a hello@necesitoya.app dentro de las 48 horas del trabajo programado con los detalles."
            },
            {
              q: "¿Cómo reporto a un usuario por comportamiento inapropiado?",
              a: "Envíe un correo a hello@necesitoya.app con el asunto 'REPORTE' incluyendo el nombre o correo del usuario y una descripción de lo ocurrido."
            },
            {
              q: "¿NecesitoYa realiza verificaciones de antecedentes de los proveedores?",
              a: "No. NecesitoYa es una plataforma de mercado y no realiza verificaciones de antecedentes ni verifica licencias. Los clientes son responsables de evaluar a los proveedores. Consulta nuestras Pautas de Seguridad."
            },
            {
              q: "¿Cómo elimino mi cuenta?",
              a: "Puede eliminar su cuenta directamente desde su panel en la aplicación móvil tocando 'Eliminar Cuenta' en su perfil. O envíenos un correo a hello@necesitoya.app y procesaremos la eliminación dentro de 30 días."
            },
          ].map((item, i, arr) => (
            <div key={i} style={{
              borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              paddingBottom: i < arr.length - 1 ? "20px" : "0",
              marginBottom: i < arr.length - 1 ? "20px" : "0",
            }}>
              <p style={{ fontWeight: "700", marginBottom: "6px", color: "#F4A261" }}>{item.q}</p>
              <p style={{ color: "#bbb", fontSize: "15px", lineHeight: "1.6" }}>{item.a}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p style={{ color: "#666", fontSize: "14px", textAlign: "center" }}>
          NecesitoYa · America's Bilingual Local Services App · hello@necesitoya.app
        </p>
      </div>
    </div>
  );
}