export const metadata = {
  title: 'About NecesitoYa — America\'s Bilingual Local Services App',
  description: 'NecesitoYa is America\'s Bilingual Local Services App connecting English and Spanish speakers with local service providers. Founded by David Cruzado in Haines City, Florida.',
  keywords: 'NecesitoYa, bilingual app, local services, Spanish English app, necesitoya.app, David Cruzado, Florida local services, bilingual marketplace',
}

export default function AboutPage() {
  return (
    <main style={{background:'#f8f6f2', minHeight:'100vh', padding:'48px 24px'}}>
      <div style={{maxWidth:'800px', margin:'0 auto'}}>

        {/* Hero */}
        <div style={{textAlign:'center', marginBottom:'48px'}}>
          <div style={{fontSize:'48px', marginBottom:'16px'}}>⚡</div>
          <h1 style={{fontSize:'36px', fontWeight:'bold', color:'#1a1a2e', marginBottom:'12px'}}>
            About NecesitoYa
          </h1>
          <p style={{fontSize:'18px', color:'#FF6B35', fontWeight:'600'}}>
            America's Bilingual Local Services App
          </p>
          <p style={{fontSize:'16px', color:'#666', marginTop:'8px'}}>
            La App Bilingüe de Servicios Locales de América
          </p>
        </div>

        {/* What is NecesitoYa */}
        <div style={{background:'white', borderRadius:'20px', padding:'32px', marginBottom:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontSize:'24px', fontWeight:'bold', color:'#1a1a2e', marginBottom:'16px'}}>
            What is NecesitoYa?
          </h2>
          <p style={{fontSize:'16px', color:'#444', lineHeight:'1.7', marginBottom:'16px'}}>
            NecesitoYa (necesitoya.app) is America's first bilingual local services marketplace — a two-sided platform that connects customers who need local services with trusted providers in their area, operating seamlessly in both English and Spanish.
          </p>
          <p style={{fontSize:'16px', color:'#444', lineHeight:'1.7'}}>
            The name NecesitoYa comes from the Spanish phrase "Lo Necesito Ya" — meaning "I Need It Now." Whether you need a handyman, cleaner, lawn care professional, mechanic, tutor, or any other local service, NecesitoYa connects you with local providers fast — in your language.
          </p>
        </div>

        {/* Mission */}
        <div style={{background:'#1a1a2e', borderRadius:'20px', padding:'32px', marginBottom:'24px'}}>
          <h2 style={{fontSize:'24px', fontWeight:'bold', color:'white', marginBottom:'16px'}}>
            Our Mission
          </h2>
          <p style={{fontSize:'16px', color:'rgba(255,255,255,0.8)', lineHeight:'1.7', marginBottom:'16px'}}>
            Millions of Hispanic Americans struggle to find reliable local service providers because of the language barrier. At the same time, thousands of Spanish-speaking providers lose business every day for the same reason.
          </p>
          <p style={{fontSize:'16px', color:'#FF6B35', lineHeight:'1.7', fontWeight:'600'}}>
            NecesitoYa exists to eliminate that barrier — connecting communities, creating opportunities, and making local services accessible to everyone regardless of language.
          </p>
        </div>

        {/* How it works */}
        <div style={{background:'white', borderRadius:'20px', padding:'32px', marginBottom:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontSize:'24px', fontWeight:'bold', color:'#1a1a2e', marginBottom:'24px'}}>
            How NecesitoYa Works
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
            <div style={{background:'#f8f6f2', borderRadius:'16px', padding:'24px'}}>
              <div style={{fontSize:'32px', marginBottom:'12px'}}>🏠</div>
              <h3 style={{fontSize:'18px', fontWeight:'bold', color:'#1a1a2e', marginBottom:'8px'}}>For Customers</h3>
              <p style={{fontSize:'14px', color:'#666', lineHeight:'1.6'}}>Post what you need for free. Receive responses from local providers. Pay securely through the app. Always free to post — no fees ever.</p>
            </div>
            <div style={{background:'#f8f6f2', borderRadius:'16px', padding:'24px'}}>
              <div style={{fontSize:'32px', marginBottom:'12px'}}>🔧</div>
              <h3 style={{fontSize:'18px', fontWeight:'bold', color:'#1a1a2e', marginBottom:'8px'}}>For Providers</h3>
              <p style={{fontSize:'14px', color:'#666', lineHeight:'1.6'}}>Sign up free. Browse available jobs. Get hired and get paid directly to your bank. Keep 92% of every transaction — NecesitoYa takes only 8%.</p>
            </div>
          </div>
        </div>

        {/* Founder Story */}
        <div style={{background:'white', borderRadius:'20px', padding:'32px', marginBottom:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontSize:'24px', fontWeight:'bold', color:'#1a1a2e', marginBottom:'16px'}}>
            The Founder Story
          </h2>
          <p style={{fontSize:'16px', color:'#444', lineHeight:'1.7', marginBottom:'16px'}}>
            NecesitoYa was founded by David Cruzado, a solo entrepreneur based in Haines City, Florida. After selling his trucking company, David identified a critical gap in the market — millions of bilingual Americans were underserved by existing local services platforms that operate only in English.
          </p>
          <p style={{fontSize:'16px', color:'#444', lineHeight:'1.7', marginBottom:'16px'}}>
            With no technical background and no co-founders, David built NecesitoYa entirely from scratch using AI — designing, developing, and launching a fully functional bilingual marketplace app on both iOS and Android in under a year.
          </p>
          <p style={{fontSize:'16px', color:'#FF6B35', lineHeight:'1.7', fontWeight:'600'}}>
            "I built NecesitoYa because I saw my own community struggling to find help and struggling to offer it — all because of a language barrier that technology can easily solve." — David Cruzado, Founder
          </p>
        </div>

        {/* Available on */}
        <div style={{background:'linear-gradient(135deg,#FF6B35,#F4A261)', borderRadius:'20px', padding:'32px', marginBottom:'24px', textAlign:'center'}}>
          <h2 style={{fontSize:'24px', fontWeight:'bold', color:'white', marginBottom:'8px'}}>
            Available on iOS & Android
          </h2>
          <p style={{fontSize:'16px', color:'rgba(255,255,255,0.9)', marginBottom:'24px'}}>
            Download NecesitoYa free on the App Store and Google Play
          </p>
          <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap'}}>
            <a href="https://apps.apple.com/app/necesitoya/id6761226228" target="_blank" rel="noopener noreferrer"
              style={{background:'white', color:'#1a1a2e', padding:'12px 24px', borderRadius:'12px', textDecoration:'none', fontWeight:'bold', fontSize:'14px'}}>
              🍎 App Store
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.necesitoya.app" target="_blank" rel="noopener noreferrer"
              style={{background:'white', color:'#1a1a2e', padding:'12px 24px', borderRadius:'12px', textDecoration:'none', fontWeight:'bold', fontSize:'14px'}}>
              ▶️ Google Play
            </a>
          </div>
        </div>

        {/* Contact */}
        <div style={{background:'white', borderRadius:'20px', padding:'32px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', textAlign:'center'}}>
          <h2 style={{fontSize:'24px', fontWeight:'bold', color:'#1a1a2e', marginBottom:'16px'}}>
            Contact NecesitoYa
          </h2>
          <p style={{fontSize:'16px', color:'#666', marginBottom:'8px'}}>📧 hello@necesitoya.app</p>
          <p style={{fontSize:'16px', color:'#666', marginBottom:'8px'}}>🌐 necesitoya.app</p>
          <p style={{fontSize:'16px', color:'#666'}}>📍 Haines City, Florida, USA</p>
        </div>

      </div>
    </main>
  )
}