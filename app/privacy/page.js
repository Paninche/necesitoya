export default function Privacy() {
  return (
    <main style={{fontFamily:'Arial', maxWidth:'800px', margin:'0 auto', padding:'40px 32px'}}>
      <a href="/" style={{color:'#FF6B35', textDecoration:'none'}}>← Back to NecesitoYa</a>
      <h1 style={{color:'#1a1a2e', marginTop:'24px'}}>Privacy Policy</h1>
      <p style={{color:'#888', marginBottom:'32px'}}>Last updated: April 18, 2026</p>

      <p style={{color:'#555', lineHeight:'1.8'}}>NecesitoYa ("we," "our," or "us") is operated by 32&8 LLC, based in Haines City, Florida, USA. This Privacy Policy explains how we collect, use, share, and protect your information when you use our website (necesitoya.app) and mobile applications ("the App").</p>

      <h2 style={{color:'#1a1a2e'}}>1. Information We Collect</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}><strong>Information you provide:</strong> name, email address, phone number, city, profile information, job postings, messages exchanged through the platform, and payment details submitted during checkout.</p>
      <p style={{color:'#555', lineHeight:'1.8'}}><strong>Information collected automatically:</strong> approximate location (city-level, derived from your input or device), device identifiers (such as advertising ID or device ID used for fraud prevention and security), crash logs, app performance data, and push notification tokens.</p>

      <h2 style={{color:'#1a1a2e'}}>2. How We Use Your Information</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>We use your information to: connect customers with service providers, process payments, send notifications about job activity, prevent fraud, secure the platform, improve our services, and communicate with you about your account.</p>

      <h2 style={{color:'#1a1a2e'}}>3. Third-Party Services</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>We use trusted third-party services to operate the platform. These providers may collect and process data on our behalf:</p>
      <ul style={{color:'#555', lineHeight:'1.8'}}>
        <li><strong>Stripe</strong> — processes all payments and payouts. Stripe collects payment information and device identifiers for fraud prevention, security, and regulatory compliance. We do not store credit card numbers. Learn more at <a href="https://stripe.com/privacy" style={{color:'#FF6B35'}} target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>.</li>
        <li><strong>Supabase</strong> — stores user accounts, jobs, messages, and other application data securely with row-level security and encryption in transit.</li>
        <li><strong>Google Cloud Translation API</strong> — translates chat messages between English and Spanish at your request. Message content is processed by Google Cloud to generate translations.</li>
        <li><strong>Google Analytics</strong> — collects anonymized usage data on our website (necesitoya.app) to help us understand how visitors use the site.</li>
        <li><strong>Expo (Push Notifications)</strong> — delivers push notifications to your device. Expo stores a push token associated with your device to enable delivery.</li>
        <li><strong>Resend</strong> — sends transactional emails (account verification, password resets, notifications) from hello@necesitoya.app.</li>
        <li><strong>Vercel</strong> — hosts our website and processes web traffic.</li>
      </ul>

      <h2 style={{color:'#1a1a2e'}}>4. Information Sharing</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>We do not sell your personal information. We share information between customers and providers only as necessary to complete service transactions (for example, sharing a customer's name, job details, and messages with the provider they hire). We share information with the third-party services listed above solely to operate the platform.</p>

      <h2 style={{color:'#1a1a2e'}}>5. Data Security</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>All data is encrypted in transit using HTTPS. We use Supabase with row-level security policies for database access. Payment information is handled exclusively by Stripe, which is PCI DSS Level 1 certified.</p>

      <h2 style={{color:'#1a1a2e'}}>6. Children's Privacy</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>NecesitoYa is not intended for users under 18 years of age. We do not knowingly collect information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.</p>

      <h2 style={{color:'#1a1a2e'}}>7. Your Rights & Data Deletion</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>You can request deletion of your account and all associated data at any time by:</p>
      <ul style={{color:'#555', lineHeight:'1.8'}}>
        <li>Tapping "Delete Account" from your profile in the mobile app, or</li>
        <li>Emailing us at <a href="mailto:hello@necesitoya.app" style={{color:'#FF6B35'}}>hello@necesitoya.app</a></li>
      </ul>
      <p style={{color:'#555', lineHeight:'1.8'}}>We will process all deletion requests within 30 days. Some information may be retained longer where required by law (for example, payment records retained for tax and regulatory compliance).</p>

      <h2 style={{color:'#1a1a2e'}}>8. Changes to This Policy</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page and, where appropriate, notify you through the App or by email.</p>

      <h2 style={{color:'#1a1a2e'}}>9. Contact Us</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>For privacy questions, requests, or concerns, contact us at: <a href="mailto:hello@necesitoya.app" style={{color:'#FF6B35'}}>hello@necesitoya.app</a></p>

      <hr style={{margin:'48px 0', border:'none', borderTop:'1px solid #ddd'}}/>

      <h1 style={{color:'#1a1a2e'}}>Política de Privacidad</h1>
      <p style={{color:'#888', marginBottom:'32px'}}>Última actualización: 18 de abril de 2026</p>

      <p style={{color:'#555', lineHeight:'1.8'}}>NecesitoYa ("nosotros") es operado por 32&8 LLC, con sede en Haines City, Florida, EE. UU. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información cuando utiliza nuestro sitio web (necesitoya.app) y nuestras aplicaciones móviles ("la Aplicación").</p>

      <h2 style={{color:'#1a1a2e'}}>1. Información que Recopilamos</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}><strong>Información que usted proporciona:</strong> nombre, correo electrónico, teléfono, ciudad, información de perfil, publicaciones de trabajos, mensajes intercambiados en la plataforma y detalles de pago.</p>
      <p style={{color:'#555', lineHeight:'1.8'}}><strong>Información recopilada automáticamente:</strong> ubicación aproximada (a nivel de ciudad), identificadores de dispositivo (como ID de publicidad o ID de dispositivo, usados para prevención de fraude y seguridad), registros de fallos, datos de rendimiento de la aplicación y tokens de notificaciones push.</p>

      <h2 style={{color:'#1a1a2e'}}>2. Cómo Usamos su Información</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>Usamos su información para: conectar clientes con proveedores de servicios, procesar pagos, enviar notificaciones sobre actividad de trabajos, prevenir fraude, asegurar la plataforma, mejorar nuestros servicios y comunicarnos con usted sobre su cuenta.</p>

      <h2 style={{color:'#1a1a2e'}}>3. Servicios de Terceros</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>Utilizamos servicios de terceros de confianza para operar la plataforma. Estos proveedores pueden recopilar y procesar datos en nuestro nombre:</p>
      <ul style={{color:'#555', lineHeight:'1.8'}}>
        <li><strong>Stripe</strong> — procesa todos los pagos y transferencias. Stripe recopila información de pago e identificadores de dispositivo para prevención de fraude, seguridad y cumplimiento regulatorio. No almacenamos números de tarjeta de crédito.</li>
        <li><strong>Supabase</strong> — almacena cuentas de usuario, trabajos, mensajes y datos de la aplicación de forma segura.</li>
        <li><strong>Google Cloud Translation API</strong> — traduce mensajes de chat entre inglés y español cuando usted lo solicita.</li>
        <li><strong>Google Analytics</strong> — recopila datos anónimos de uso en nuestro sitio web.</li>
        <li><strong>Expo (Notificaciones Push)</strong> — entrega notificaciones push a su dispositivo.</li>
        <li><strong>Resend</strong> — envía correos electrónicos transaccionales desde hello@necesitoya.app.</li>
        <li><strong>Vercel</strong> — aloja nuestro sitio web.</li>
      </ul>

      <h2 style={{color:'#1a1a2e'}}>4. Compartir Información</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>No vendemos su información personal. Compartimos información entre clientes y proveedores solo cuando es necesario para completar transacciones de servicios.</p>

      <h2 style={{color:'#1a1a2e'}}>5. Seguridad de Datos</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>Todos los datos se cifran en tránsito mediante HTTPS. Usamos Supabase con políticas de seguridad a nivel de fila para el acceso a la base de datos. La información de pago es manejada exclusivamente por Stripe.</p>

      <h2 style={{color:'#1a1a2e'}}>6. Privacidad de Menores</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>NecesitoYa no está destinado a usuarios menores de 18 años. No recopilamos información de niños conscientemente.</p>

      <h2 style={{color:'#1a1a2e'}}>7. Sus Derechos y Eliminación de Datos</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>Puede solicitar la eliminación de su cuenta y todos los datos asociados en cualquier momento tocando "Eliminar Cuenta" desde su perfil en la aplicación móvil, o enviando un correo a <a href="mailto:hello@necesitoya.app" style={{color:'#FF6B35'}}>hello@necesitoya.app</a>. Procesaremos todas las solicitudes de eliminación dentro de 30 días.</p>

      <h2 style={{color:'#1a1a2e'}}>8. Cambios a esta Política</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>Podemos actualizar esta Política de Privacidad ocasionalmente. Actualizaremos la fecha de "Última actualización" en la parte superior de esta página.</p>

      <h2 style={{color:'#1a1a2e'}}>9. Contáctenos</h2>
      <p style={{color:'#555', lineHeight:'1.8'}}>Para preguntas sobre privacidad, contáctenos en: <a href="mailto:hello@necesitoya.app" style={{color:'#FF6B35'}}>hello@necesitoya.app</a></p>

      <div style={{marginTop:'48px', padding:'24px', background:'#f8f6f2', borderRadius:'12px'}}>
        <p style={{color:'#888', fontSize:'13px', margin:0}}>© 2026 NecesitoYa.app · 32&8 LLC · Haines City, FL · <a href="/" style={{color:'#FF6B35'}}>necesitoya.app</a></p>
      </div>
    </main>
  )
}