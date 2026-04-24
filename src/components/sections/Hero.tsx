'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero="eyebrow"]', { opacity: 0, y: 12, duration: 0.5 })
        .from('[data-hero="title"] > span', {
          opacity: 0,
          y: 36,
          duration: 0.9,
          stagger: 0.08,
        }, '-=0.2')
        .from('[data-hero="subtitle"]', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
        .from('[data-hero="cta"]', { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 }, '-=0.4')
        .from('[data-hero="badge"]', { opacity: 0, y: 10, duration: 0.5, stagger: 0.1 }, '-=0.3');
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-36"
    >
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-grid-subtle [background-size:40px_40px] opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none" />

      <Container wide className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <div
            data-hero="eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-1.5 text-xs font-medium tracking-[0.18em] uppercase text-foreground-muted shadow-soft"
          >
            <Sparkles size={14} className="text-gold" />
            Premium offshore formation \u2014 Cayman Islands
          </div>

          <h1
            data-hero="title"
            className="mt-8 text-display-lg sm:text-display-xl font-display"
          >
            <span className="block">Register your company</span>
            <span className="block">in the{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  Cayman Islands
                </span>
                <span className="absolute left-0 right-0 -bottom-1 h-[10px] bg-gold/25 rounded-full" />
              </span>
            </span>
            <span className="block text-foreground-muted text-[0.5em] sm:text-[0.45em] font-sans font-normal mt-6 max-w-2xl mx-auto">
              0% corporate tax \u00b7 Full confidentiality \u00b7 Global prestige
            </span>
          </h1>

          <p
            data-hero="subtitle"
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground-muted"
          >
            Exempted companies, LLCs and SPCs incorporated turnkey by a licensed Cayman corporate
            services provider. Nominee directors, bank accounts, compliance \u2014 all handled.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div data-hero="cta">
              <Button href="/contact" size="lg">
                Start your formation
                <ArrowRight size={18} />
              </Button>
            </div>
            <div data-hero="cta">
              <Button href="/services" variant="secondary" size="lg">
                Explore services
              </Button>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-xs text-foreground-subtle">
            {[
              'Licensed by CIMA',
              'ISO 27001 data handling',
              'Tier-1 banking partners',
              'OECD/FATF compliant',
            ].map((label) => (
              <span
                key={label}
                data-hero="badge"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/70 px-3 py-1.5"
              >
                <ShieldCheck size={12} className="text-brand" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
