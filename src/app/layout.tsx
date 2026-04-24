import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
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
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cayman-formation.example.com'),
  title: {
    default: 'Cayman Islands Company Registration | Premium Offshore Formation',
    template: '%s | Cayman Formation',
  },
  description:
    'Registration of exempted companies, LLCs and SPCs in the Cayman Islands. 0% corporate tax, confidentiality, prestige and full turnkey support.',
  keywords: [
    'Cayman Islands company',
    'offshore formation',
    'exempted company',
    'Cayman LLC',
    'zero tax jurisdiction',
  ],
  openGraph: {
    title: 'Cayman Islands Company Registration',
    description:
      'Turnkey formation of Cayman companies: 0% tax, full confidentiality, premium banking partners.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
