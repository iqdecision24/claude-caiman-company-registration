'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useSplitReveal } from '@/hooks/useSplitReveal';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const splitRef = useSplitReveal<HTMLDivElement>();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero="top"]', { opacity: 0, y: 10, duration: 0.6 })
        .from('[data-hero="lead"]', { opacity: 0, y: 18, duration: 0.8 }, '-=0.2')
        .from('[data-hero="cta"]', { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 }, '-=0.3')
        .from('[data-hero="meta"]', { opacity: 0, y: 8, duration: 0.5 }, '-=0.3')
        .from('[data-hero="photo"]', { opacity: 0, scale: 1.05, duration: 1.4, ease: 'power2.out' }, '-=1.4')
        .from('[data-hero="caption"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.5');
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[560px] bg-grid-subtle [background-size:48px_48px] opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none" />

      <Container wide className="relative pt-12 lg:pt-16 pb-24 lg:pb-32">
        {/* Top masthead bar */}
        <div
          data-hero="top"
          className="mb-12 flex items-center justify-between gap-6 border-b border-border/70 pb-5"
        >
          <div className="flex items-baseline gap-3">
            <span className="chapter-num text-lg">I.</span>
            <span className="text-[11px] uppercase tracking-[0.32em] text-foreground-muted">
              Cayman Islands · British Overseas Territory
            </span>
          </div>
          <span className="hidden sm:block text-[11px] uppercase tracking-[0.32em] text-foreground-subtle">
            Volume IV · Anno MMXXVI
          </span>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10 items-end">
          {/* Left column: editorial lead */}
          <div ref={splitRef} className="lg:col-span-7">
            <h1
              data-split
              data-hero="headline"
              className="font-display text-editorial-hero text-ink text-balance"
            >
              The jurisdiction
              <br />
              <span className="font-serif italic text-gold">of choice.</span>
            </h1>

            <div
              data-hero="lead"
              className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:gap-14 md:items-start"
            >
              <p className="dropcap max-w-xl text-lg text-foreground-muted leading-relaxed">
                A boutique Cayman corporate services firm. We incorporate, bank and maintain
                exempted companies, LLCs, SPCs and fund vehicles for global founders, family
                offices and managers — under zero corporate tax and full confidentiality.
              </p>
              <div className="hidden md:block pt-3 border-t border-border">
                <p className="text-[11px] uppercase tracking-[0.28em] text-foreground-subtle">
                  Since 2014
                </p>
                <p className="mt-2 font-display text-4xl text-ink">800<span className="text-gold">+</span></p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  structures filed
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div data-hero="cta">
                <Button href="/contact" size="lg">
                  Book a consultation
                  <ArrowRight size={18} />
                </Button>
              </div>
              <div data-hero="cta">
                <Button href="/services" variant="ghost" size="lg">
                  Explore services
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>

            <div
              data-hero="meta"
              className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.22em] text-foreground-subtle"
            >
              <span>Licensed by CIMA</span>
              <span className="h-1 w-1 rounded-full bg-gold" />
              <span>OECD / FATF aligned</span>
              <span className="h-1 w-1 rounded-full bg-gold" />
              <span>Tier-1 banking partners</span>
              <span className="h-1 w-1 rounded-full bg-gold" />
              <span>ISO 27001 data handling</span>
            </div>
          </div>

          {/* Right column: editorial photograph */}
          <div className="lg:col-span-5">
            <figure
              data-hero="photo"
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] shadow-editorial"
            >
              <Image
                src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1400&q=85"
                alt="Grand Cayman — coastal aerial"
                fill
                priority
                className="object-cover grayscale-[35%]"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              <figcaption
                data-hero="caption"
                className="absolute inset-x-6 bottom-5 flex items-end justify-between text-white text-[10px] uppercase tracking-[0.28em]"
              >
                <span>Seven Mile Beach</span>
                <span className="font-serif italic tracking-normal text-[13px]">n° 01</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
