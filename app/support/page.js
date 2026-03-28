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
        <p style={{ color: "#aaa", marginBottom: "48px", fontSize: "16px" }}>
          We're here to help. Reach out anytime and we'll get back to you fast.
        </p>

        {/* Contact Card */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,107,53,0.4)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>📧 Email Support</h2>
          <p style={{ color: "#ccc", marginBottom: "16px" }}>
            For any questions, account issues, or feedback — email us directly:
          </p>
          <a href="mailto:32and8@gmail.com" style={{
            display: "inline-block",
            backgroundColor: "#FF6B35",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "8px",
            fontWeight: "700",
            textDecoration: "none",
            fontSize: "16px",
          }}>
            32and8@gmail.com
          </a>
          <p style={{ color: "#888", marginTop: "16px", fontSize: "14px" }}>
            We typically respond within 24 hours.
          </p>
        </div>

        {/* FAQ */}
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "24px" }}>❓ Frequently Asked Questions</h2>

          {[
            {
              q: "How do I create an account?",
              a: "Download the NecesitoYa app and tap 'Sign Up'. You can register as a Customer looking for services, or as a Service Provider offering your skills."
            },
            {
              q: "How does payment work?",
              a: "Payments are processed securely through Stripe. Customers pay online and funds are released to the provider once the job is confirmed complete."
            },
            {
              q: "How do I post a job?",
              a: "Tap 'Post a Job', select a category, describe what you need, and submit. Nearby providers will respond with offers."
            },
            {
              q: "I'm a provider — how do I get paid?",
              a: "Connect your bank account through the Provider Dashboard. When a job is marked complete, funds are transferred to your account automatically."
            },
            {
              q: "Is the app available in Spanish?",
              a: "Yes! NecesitoYa is fully bilingual in English and Spanish. All categories and key features are available in both languages."
            },
            {
              q: "How do I delete my account?",
              a: "Email us at 32and8@gmail.com with your account email and we will delete your account and all associated data within 7 business days."
            },
          ].map((item, i) => (
            <div key={i} style={{
              borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.07)" : "none",
              paddingBottom: i < 5 ? "20px" : "0",
              marginBottom: i < 5 ? "20px" : "0",
            }}>
              <p style={{ fontWeight: "700", marginBottom: "6px", color: "#F4A261" }}>{item.q}</p>
              <p style={{ color: "#bbb", fontSize: "15px", lineHeight: "1.6" }}>{item.a}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p style={{ color: "#666", fontSize: "14px", textAlign: "center" }}>
          NecesitoYa · America's Bilingual Local Services App · 32and8@gmail.com
        </p>
      </div>
    </div>
  );
}