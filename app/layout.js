import "./globals.css";

export const metadata = {
  title: "NecesitoYa — America's Bilingual Local Services App",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/favicon-180x180.png', sizes: '180x180' },
  },
  description: "Connect with trusted local service providers near you — in English and Spanish. Post a job or offer your services free. I Need It Now · Lo Necesito Ya",
  keywords: "local services, bilingual, español, handyman, cleaning, lawn care, Florida, NecesitoYa",
  openGraph: {
    title: "NecesitoYa — America's Bilingual Local Services App",
    description: "Connect with trusted local service providers near you — in English and Spanish.",
    url: "https://necesitoya.app",
    siteName: "NecesitoYa",
    images: [
      {
        url: "https://necesitoya.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "NecesitoYa — Bilingual Local Services App",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NecesitoYa — America's Bilingual Local Services App",
    description: "Connect with trusted local service providers near you — in English and Spanish.",
    images: ["https://necesitoya.app/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin: 0, padding: 0}}>{children}</body>
    </html>
  );
}