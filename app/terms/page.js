'use client'

export default function TermsOfService() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <nav style={{ background: '#1a1a2e', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ color: '#FF6B35', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' }}>⚡ NecesitoYa</a>
        <a href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', textDecoration: 'none' }}>← Back to Home</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a2e', marginBottom: '8px' }}>Terms of Service</h1>
        <p style={{ color: '#FF6B35', fontWeight: '600', marginBottom: '8px' }}>Términos de Servicio</p>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '40px' }}>Last updated: March 27, 2026</p>

        {/* Intro */}
        <div style={{ backgroundColor: '#fff8f5', border: '1px solid #FF6B35', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <p style={{ color: '#1a1a2e', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
            Welcome to NecesitoYa. By accessing or using our platform — including our website at necesitoya.app and our mobile applications — you agree to be bound by these Terms of Service. Please read them carefully before using NecesitoYa.
          </p>
        </div>

        {section("1. About NecesitoYa", [
          `NecesitoYa ("we," "us," or "our") is an online marketplace platform operated by 32&8 LLC that connects independent service providers ("Providers") with customers seeking local services ("Customers"). NecesitoYa is headquartered in Haines City, Florida.`,
          `NecesitoYa is a technology platform only. We do not provide services directly, employ Providers, or act as an employer, staffing agency, or contractor. All services are performed by independent third-party Providers who are solely responsible for the quality, safety, and legality of the services they offer.`
        ])}

        {section("2. Marketplace Platform — Not an Employer", [
          `IMPORTANT: NecesitoYa is a marketplace platform that facilitates connections between Customers and Providers. We are NOT a service provider, employer, or contractor.`,
          `Providers using NecesitoYa are independent contractors, not employees, agents, or representatives of NecesitoYa or 32&8 LLC. NecesitoYa does not supervise, direct, control, or monitor Providers' work.`,
          `NecesitoYa does not verify, endorse, or guarantee any Provider's identity, qualifications, licenses, certifications, insurance, or background. Customers are solely responsible for evaluating Providers before engaging their services.`,
          `By using NecesitoYa, you acknowledge and agree that any interaction, transaction, or dispute between Customers and Providers is solely between those parties and does not involve NecesitoYa.`
        ])}

        {section("3. Eligibility", [
          `You must be at least 18 years old to use NecesitoYa.`,
          `By using our platform, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these Terms.`,
          `NecesitoYa is available to users in the United States. Use of the platform outside the United States is at your own risk.`
        ])}

        {section("4. User Accounts & Registration", [
          `You may use certain features of NecesitoYa without creating an account. To post jobs, accept jobs, or process payments, you must provide a valid email address.`,
          `You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.`,
          `You agree to provide accurate, current, and complete information when using NecesitoYa. NecesitoYa reserves the right to suspend or terminate accounts that contain false or misleading information.`
        ])}

        {section("5. Safety & User Responsibility", [
          `YOUR SAFETY IS YOUR RESPONSIBILITY. NecesitoYa strongly encourages all users to take precautions when meeting strangers, including meeting in public places when possible, informing a trusted person of your plans, and trusting your instincts.`,
          `NecesitoYa does not conduct criminal background checks, verify identities, or screen Providers or Customers. You use NecesitoYa at your own risk.`,
          `NecesitoYa is not responsible for the conduct of any user on or off the platform. You agree to release NecesitoYa, 32&8 LLC, and their officers, directors, employees, and agents from any claims, damages, or losses arising from interactions with other users.`,
          `If you experience an emergency, contact local law enforcement (911) immediately. NecesitoYa does not provide emergency services.`
        ])}

        {section("6. Prohibited Conduct", [
          `You agree NOT to use NecesitoYa to:`,
          `• Post false, misleading, or fraudulent job listings or service offerings`,
          `• Harass, threaten, or harm other users`,
          `• Engage in illegal activities or solicit others to do so`,
          `• Discriminate against users based on race, color, religion, sex, national origin, disability, or any protected characteristic`,
          `• Circumvent the NecesitoYa payment system to avoid platform fees`,
          `• Post adult content, illegal services, weapons, or controlled substances`,
          `• Use the platform to spam or send unsolicited communications`,
          `• Impersonate any person or entity`,
          `Violation of these rules may result in immediate account termination and legal action where applicable.`
        ])}

        {section("7. Payments & Fees", [
          `NecesitoYa uses Stripe, a third-party payment processor, to handle all payments. By using NecesitoYa's payment features, you also agree to Stripe's Terms of Service.`,
          `Customers pay Providers directly through the NecesitoYa platform. NecesitoYa charges Providers a service fee of 8% on each completed transaction. Customers pay no platform fees.`,
          `All payments are final unless a dispute is resolved in the Customer's favor through NecesitoYa's dispute process. NecesitoYa reserves the right to refund payments at its sole discretion.`,
          `NecesitoYa is not responsible for any payment disputes between Customers and Providers. We will make reasonable efforts to assist in dispute resolution but make no guarantees of outcomes.`
        ])}

        {section("8. Limitation of Liability", [
          `TO THE MAXIMUM EXTENT PERMITTED BY LAW, NECESITOYA AND 32&8 LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.`,
          `NecesitoYa's total liability to you for any claims arising from your use of the platform shall not exceed the amount of fees paid by you to NecesitoYa in the six (6) months preceding the claim.`,
          `NecesitoYa is not liable for any damages arising from: (a) interactions between Customers and Providers; (b) property damage or personal injury caused by Providers or Customers; (c) the quality or safety of services performed; (d) unauthorized access to your account; or (e) any third-party conduct.`
        ])}

        {section("9. Disclaimer of Warranties", [
          `NECESITOYA IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.`,
          `NecesitoYa does not warrant that: (a) the platform will be uninterrupted or error-free; (b) any Provider is qualified, licensed, or insured; (c) services will meet your expectations; or (d) any information on the platform is accurate or complete.`
        ])}

        {section("10. Dispute Resolution", [
          `Any dispute between a Customer and a Provider must first be addressed directly between those parties. NecesitoYa may, at its sole discretion, assist in dispute resolution but is not obligated to do so.`,
          `Any legal disputes between you and NecesitoYa shall be resolved through binding arbitration in Polk County, Florida, under the rules of the American Arbitration Association. You waive your right to a jury trial.`,
          `These Terms shall be governed by the laws of the State of Florida.`
        ])}

        {section("11. Intellectual Property", [
          `All content on NecesitoYa, including logos, text, graphics, and software, is owned by 32&8 LLC and protected by applicable intellectual property laws.`,
          `You may not copy, reproduce, distribute, or create derivative works from NecesitoYa content without our express written permission.`
        ])}

        {section("12. Privacy", [
          `Your use of NecesitoYa is also governed by our Privacy Policy, available at necesitoya.app/privacy. By using NecesitoYa, you consent to the collection and use of your information as described in the Privacy Policy.`
        ])}

        {section("13. Changes to Terms", [
          `NecesitoYa reserves the right to modify these Terms at any time. We will notify users of material changes by updating the "Last updated" date at the top of this page.`,
          `Your continued use of NecesitoYa after changes are posted constitutes your acceptance of the modified Terms.`
        ])}

        {section("14. Termination", [
          `NecesitoYa reserves the right to suspend or terminate your access to the platform at any time, with or without notice, for any reason including violation of these Terms.`,
          `You may stop using NecesitoYa at any time. These Terms will survive termination to the extent necessary to enforce rights and obligations.`
        ])}

        {section("15. Contact Us", [
          `If you have questions about these Terms of Service, please contact us:`,
          `NecesitoYa / 32&8 LLC`,
          `Email: hello@necesitoya.app`,
          `Website: necesitoya.app`,
          `Haines City, Florida, United States`
        ])}

        <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '48px', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '13px' }}>© 2026 NecesitoYa · 32&8 LLC · Haines City, FL</p>
          <p style={{ marginTop: '8px' }}>
            <a href="/privacy" style={{ color: '#FF6B35', fontSize: '13px', marginRight: '16px', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/" style={{ color: '#FF6B35', fontSize: '13px', textDecoration: 'none' }}>Home</a>
          </p>
        </div>
      </div>
    </main>
  )
}

function section(title, paragraphs) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #FF6B35' }}>
        {title}
      </h2>
      {paragraphs.map((para, i) => (
        <p key={i} style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
          {para}
        </p>
      ))}
    </div>
  )
}