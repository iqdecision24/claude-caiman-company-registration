'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const bullets = [
  'Licensed Cayman Islands corporate services provider',
  'In-house legal, compliance and banking desk',
  'Transparent fixed-fee pricing with no hidden costs',
  'Over 800 structures incorporated for global clients',
];

export function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="about" className="py-24 sm:py-32">
      <Container wide>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div data-reveal className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border shadow-premium">
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80"
                alt="Cayman Islands coastline"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -right-6 -bottom-6 hidden sm:block w-40 h-40 rounded-2xl bg-white/90 border border-border shadow-soft backdrop-blur-sm p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-foreground-subtle">Since</div>
              <div className="mt-2 font-display text-5xl">2014</div>
              <div className="mt-1 text-xs text-foreground-muted">serving global clients</div>
            </div>
          </div>

          <div data-reveal>
            <SectionHeading
              eyebrow="About us"
              title={<>A boutique firm for serious offshore structures</>}
              description="We are a Cayman-based corporate services boutique dedicated exclusively to incorporating and maintaining high-quality offshore structures for international entrepreneurs, family offices and fund managers."
            />
            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 size={20} className="mt-1 text-brand shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/about">Read our story</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
