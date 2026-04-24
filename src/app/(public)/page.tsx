import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { About } from '@/components/sections/About';
import { LatestPosts } from '@/components/sections/LatestPosts';
import { CTA } from '@/components/sections/CTA';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { FAQ } from '@/components/sections/FAQ';
import { Marquee } from '@/components/interactive/Marquee';

export const dynamic = 'force-dynamic';

const marqueeItems = [
  '0% corporate tax',
  'Licensed by CIMA',
  'Private beneficial ownership',
  'OECD / FATF aligned',
  'Tier-1 banking partners',
  'Exempted Company',
  'Cayman LLC',
  'Segregated Portfolio',
  'Fund formation',
  'Est. MMXIV',
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Marquee items={marqueeItems} speedSeconds={48} />
      <Services />
      <HowWeWork />
      <Stats />
      <About />
      <FAQ />
      <LatestPosts />
      <CTA />
    </>
  );
}
