import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export const metadata = {
  title: "NecesitoYa — Hire Local Handyman, Cleaning, Lawn Care & More | Florida",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/favicon-180x180.png', sizes: '180x180' },
  },
  description: "Find trusted local handymen, cleaners, lawn care, mechanics and more in Orlando, Tampa, Miami, Lakeland and across Florida. Post a job free — providers respond fast. Bilingual English & Spanish. I Need It Now · Lo Necesito Ya.",
  keywords: "handyman near me, lawn care near me, cleaning service near me, mechanic near me, local services Florida, bilingual services, handyman Orlando, handyman Tampa, handyman Miami, handyman Lakeland, lawn care Orlando, cleaning service Tampa, NecesitoYa, local help near me, hire local, servicios locales, handyman español, servicios bilingues Florida, necesito ayuda, servicios cerca de mi, trabajos locales",
  metadataBase: new URL('https://necesitoya.app'),
  alternates: {
    canonical: 'https://necesitoya.app',
  },
  openGraph: {
    title: "NecesitoYa — Hire Local Handyman, Cleaning, Lawn Care & More",
    description: "Find trusted local handymen, cleaners, lawn care, mechanics and more in Orlando, Tampa, Miami and across Florida. Post a job free — providers respond fast. Bilingual English & Spanish.",
    url: "https://necesitoya.app",
    siteName: "NecesitoYa",
    images: [
      {
        url: "https://necesitoya.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "NecesitoYa — Hire Local Service Providers in Florida",
      },
    ],
    type: "website",
    locale: "en_US",
    alternateLocale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NecesitoYa — Hire Local Handyman, Cleaning, Lawn Care & More",
    description: "Find trusted local handymen, cleaners, lawn care, mechanics and more in Florida. Post a job free. Bilingual English & Spanish.",
    images: ["https://necesitoya.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{__html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1610571833393290');
          fbq('track', 'PageView');
        `}} />
        <noscript><img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1610571833393290&ev=PageView&noscript=1" /></noscript>
      </head>
      <body style={{margin: 0, padding: 0}}>
        {children}
        <Analytics />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-LBBGNFP1BE" strategy="afterInteractive"/>
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LBBGNFP1BE');
        `}</Script>
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">{`
          [
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NecesitoYa",
              "url": "https://necesitoya.app",
              "description": "America's Bilingual Local Services App — connect with trusted local handymen, cleaners, lawn care, mechanics and more in Florida.",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Web, iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "areaServed": {
                "@type": "State",
                "name": "Florida"
              },
              "availableLanguage": ["English", "Spanish"]
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "NecesitoYa",
              "url": "https://necesitoya.app",
              "description": "Bilingual local services marketplace connecting customers with handymen, cleaners, lawn care, mechanics and more across Florida.",
              "telephone": "",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Haines City",
                "addressRegion": "FL",
                "addressCountry": "US"
              },
              "areaServed": [
                "Orlando, FL", "Tampa, FL", "Miami, FL", "Lakeland, FL",
                "Kissimmee, FL", "St. Petersburg, FL", "Haines City, FL",
                "Sanford, FL", "Daytona Beach, FL", "Fort Lauderdale, FL"
              ],
              "sameAs": [
                "https://play.google.com/store/apps/details?id=com.necesitoya.app"
              ],
              "priceRange": "Free to post",
              "availableLanguage": ["English", "Spanish"]
            }
          ]
        `}</Script>
      </body>
    </html>
  );
}