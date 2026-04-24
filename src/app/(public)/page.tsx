import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { About } from '@/components/sections/About';
import { LatestPosts } from '@/components/sections/LatestPosts';
import { CTA } from '@/components/sections/CTA';

// LatestPosts reads from Neon at request time.
// force-dynamic avoids prerendering when env vars are absent at build time
// and ensures fresh data for each visit.
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Services />
      <Stats />
      <About />
      <LatestPosts />
      <CTA />
    </>
  );
}
