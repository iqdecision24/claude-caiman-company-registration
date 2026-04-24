import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cayman-formation.example.com'),
  title: {
    default: 'Cayman Islands Company Formation | Premium Offshore Advisory',
    template: '%s — Cayman Formation',
  },
  description:
    'A boutique corporate services firm in George Town, Grand Cayman. Exempted companies, LLCs, SPCs and fund vehicles — incorporated turnkey with 0% corporate tax and full confidentiality.',
  keywords: [
    'Cayman Islands company',
    'offshore formation',
    'exempted company',
    'Cayman LLC',
    'zero tax jurisdiction',
    'SPC',
    'fund formation',
  ],
  openGraph: {
    title: 'Cayman Islands Company Formation',
    description:
      'Turnkey formation of Cayman companies: 0% tax, full confidentiality, premium banking partners.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
