export default function SafetyPage() {
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

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🛡️</div>
          <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px", color: "#FF6B35" }}>
            Safety & Community Guidelines
          </h1>
          <p style={{ color: "#FF6B35", fontWeight: "600", marginBottom: "12px", fontSize: "16px" }}>
            Seguridad y Pautas de la Comunidad
          </p>
          <p style={{ color: "#aaa", fontSize: "15px", maxWidth: "540px", margin: "0 auto", lineHeight: "1.6" }}>
            NecesitoYa connects people across our community. These guidelines help keep the platform safe, respectful, and useful for everyone. / Estas pautas mantienen la plataforma segura y respetuosa para todos.
          </p>
        </div>

        {/* Expected Behavior */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(34,197,94,0.3)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px", color: "#22c55e" }}>✅ What We Expect / Lo Que Esperamos</h2>
          {[
            "Be respectful — communicate courteously in all messages and interactions",
            "Be honest — describe jobs and services accurately, use real photos, and don't misrepresent your identity",
            "Show up — arrive on time or communicate promptly if plans change",
            "Pay and get paid through NecesitoYa — keep transactions on the platform so the Guarantee applies",
            "Follow the law — comply with all applicable federal, state, and local laws",
            "Report problems — tell us when something goes wrong so we can take action",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
              <span style={{ color: "#22c55e", fontWeight: "bold", marginTop: "1px" }}>•</span>
              <p style={{ margin: 0, color: "#ddd", fontSize: "14px", lineHeight: "1.6" }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Prohibited Behavior */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px", color: "#ef4444" }}>❌ What's Not Allowed / Lo Que No Se Permite</h2>
          {[
            "Harassment, threats, hate speech, or discrimination of any kind",
            "Fraud, scams, or false job postings",
            "Illegal services, weapons, controlled substances, or adult content",
            "Requesting or arranging off-platform payments to avoid fees",
            "Impersonating another person or company",
            "Spam, unsolicited advertising, or bulk messaging",
            "Sharing another user's personal information without their consent",
            "Violating copyrights, trademarks, or other intellectual property rights",
            "Any conduct that puts another user's physical or financial safety at risk",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
              <span style={{ color: "#ef4444", fontWeight: "bold", marginTop: "1px" }}>•</span>
              <p style={{ margin: 0, color: "#ddd", fontSize: "14px", lineHeight: "1.6" }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Safety Tips */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>💡 Safety Tips / Consejos de Seguridad</h2>
          <p style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6", marginBottom: "14px" }}>
            NecesitoYa is a marketplace platform and does not conduct background checks, verify identities, or screen users. <strong style={{ color: "#FF6B35" }}>Your safety is your responsibility.</strong> Here are tips for using NecesitoYa safely:
          </p>
          {[
            "Verify details before meeting — confirm the job, location, and contact info through in-app chat",
            "Meet in public or well-lit areas when possible, especially for first interactions",
            "Tell someone you trust where you're going and who you're meeting",
            "Trust your instincts — if something feels off, don't proceed",
            "Never share sensitive information like Social Security numbers, bank logins, or copies of ID unless truly necessary",
            "Take photos before and after work for quality and dispute purposes",
            "Keep all communication and payment on the NecesitoYa platform — this protects you under the Guarantee",
            "For childcare services: Customers should conduct their own background checks, verify references, and meet providers in person before entrusting them with children",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
              <span style={{ color: "#FF6B35", fontWeight: "bold", marginTop: "1px" }}>•</span>
              <p style={{ margin: 0, color: "#ddd", fontSize: "14px", lineHeight: "1.6" }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Reporting */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>🚩 Reporting a Problem / Reportar un Problema</h2>
          <p style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>
            If a user violates these guidelines or makes you feel unsafe, let us know. Email <a href="mailto:hello@necesitoya.app" style={{ color: "#FF6B35", fontWeight: "600" }}>hello@necesitoya.app</a> with the subject line <strong style={{ color: "#FF6B35" }}>REPORT</strong> and include:
          </p>
          <ul style={{ color: "#ddd", fontSize: "14px", lineHeight: "1.8", paddingLeft: "20px", marginBottom: "16px" }}>
            <li>The user's name or email</li>
            <li>The job or conversation in question</li>
            <li>What happened (please be specific)</li>
            <li>Any screenshots or photos that help document the issue</li>
          </ul>
          <p style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6", marginBottom: "0" }}>
            <strong style={{ color: "#FF6B35" }}>If you are in immediate danger, call 911 first.</strong> Then report the incident to us when you are safe.
          </p>
          <p style={{ color: "#888", fontSize: "13px", marginTop: "8px", fontStyle: "italic" }}>
            Si está en peligro inmediato, llame al 911 primero. Luego reporte el incidente cuando esté seguro.
          </p>
        </div>

        {/* Enforcement */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>⚖️ Enforcement / Cumplimiento</h2>
          <p style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6", marginBottom: "14px" }}>
            When these guidelines are violated, NecesitoYa may take one or more of the following actions, depending on the severity:
          </p>
          {[
            { level: "Warning", desc: "For minor or first-time violations — we'll reach out and explain what needs to change." },
            { level: "Temporary Suspension", desc: "For repeated or more serious violations — temporary loss of access to the platform." },
            { level: "Permanent Ban", desc: "For severe violations including fraud, threats, violence, or illegal activity — permanent removal from the platform." },
            { level: "Law Enforcement Referral", desc: "For illegal activity, we may cooperate with law enforcement as appropriate." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <p style={{ fontWeight: "700", color: "#F4A261", marginBottom: "4px", fontSize: "15px" }}>{item.level}</p>
              <p style={{ color: "#bbb", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
          <p style={{ color: "#888", fontSize: "13px", marginTop: "14px", lineHeight: "1.6" }}>
            NecesitoYa reserves the right to take any action it deems appropriate at its sole discretion, including without prior notice. Decisions are made on a case-by-case basis.
          </p>
        </div>

        {/* Related */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}>
          <a href="/terms" style={{ color: "#FF6B35", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>📄 Terms of Service →</a>
          <a href="/privacy" style={{ color: "#FF6B35", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>🔐 Privacy Policy →</a>
          <a href="/guarantee" style={{ color: "#FF6B35", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>🔒 NecesitoYa Guarantee →</a>
          <a href="/support" style={{ color: "#FF6B35", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>💬 Support Center →</a>
        </div>

        {/* Footer note */}
        <p style={{ color: "#666", fontSize: "14px", textAlign: "center", marginTop: "32px" }}>
          NecesitoYa · America's Bilingual Local Services App · hello@necesitoya.app
        </p>
      </div>
    </div>
  );
}