import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { About } from '@/components/sections/About';
import { LatestPosts } from '@/components/sections/LatestPosts';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Services />
      <Stats />
      <About />
      {/* LatestPosts is a server component reading from Neon */}
      {/* @ts-expect-error Async Server Component */}
      <LatestPosts />
      <CTA />
    </>
  );
}
