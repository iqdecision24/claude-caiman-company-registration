'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const values = [
  { n: '01', label: 'Licensed', sub: 'Cayman Islands corporate services provider' },
  { n: '02', label: 'In-house', sub: 'Legal, compliance and banking desk' },
  { n: '03', label: 'Fixed-fee', sub: 'Transparent pricing, no hidden costs' },
  { n: '04', label: '800+', sub: 'Structures incorporated for global clients' },
];

export function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="about" className="relative py-28 sm:py-40">
      <Container wide>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          {/* Portrait */}
          <div data-reveal className="lg:col-span-5">
            <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] shadow-editorial">
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=85"
                alt="Grand Cayman waterfront"
                fill
                className="object-cover grayscale-[20%]"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </figure>
            <div className="mt-6 flex items-end justify-between text-[11px] uppercase tracking-[0.28em] text-foreground-muted">
              <span>George Town · Grand Cayman</span>
              <span className="font-serif italic text-gold text-[13px] tracking-normal">
                n° 02
              </span>
            </div>
          </div>

          {/* Text */}
          <div data-reveal className="lg:col-span-7 lg:pt-10">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="chapter-num text-base">V.</span>
              <span className="eyebrow-alt">About</span>
            </div>
            <h2 className="font-display text-display-lg text-ink text-balance">
              A boutique firm for <span className="font-serif italic text-gold">serious</span> offshore structures.
            </h2>

            <blockquote className="mt-10 border-l-2 border-gold pl-6 max-w-xl">
              <p className="pullquote text-ink">
                “We felt international clients deserved the same rigour as the big-four firms — without the bureaucracy, junior handovers and opaque fees. So we built one.”
              </p>
              <footer className="mt-4 text-[11px] uppercase tracking-[0.28em] text-foreground-subtle">
                Founding partners, 2014
              </footer>
            </blockquote>

            <p className="mt-10 text-foreground-muted leading-relaxed max-w-xl">
              Today we support founders, family offices and fund managers with turnkey formation,
              nominee services, banking and ongoing compliance. Named partners remain personally
              responsible for every engagement — no junior handovers, no call centres.
            </p>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 max-w-xl">
              {values.map((v) => (
                <li key={v.n} className="border-t border-border pt-5">
                  <div className="chapter-num text-sm">{v.n}</div>
                  <div className="mt-2 font-display text-xl text-ink">{v.label}</div>
                  <div className="mt-1 text-sm text-foreground-muted">{v.sub}</div>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <Button href="/about" variant="secondary">
                Read our story
                <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
