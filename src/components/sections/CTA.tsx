'use client';

import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MagneticButton } from '@/components/interactive/MagneticButton';

export function CTA() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative pt-16 pb-28 sm:pt-24 sm:pb-40">
      <Container wide>
        <div
          data-reveal
          className="relative ink-section overflow-hidden rounded-[3px] px-8 py-20 sm:px-16 sm:py-28"
        >
          <div className="relative max-w-4xl">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="chapter-num text-base text-gold-light">IX.</span>
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                Next step
              </span>
            </div>
            <h3 className="font-display text-display-lg sm:text-display-xl text-white text-balance leading-[1.03]">
              Ready to incorporate <br className="hidden sm:block" />
              <span className="font-serif italic text-gold-light">in the Cayman Islands?</span>
            </h3>
            <div className="mt-10 h-px w-24 bg-gold-light/70" />
            <p className="mt-10 max-w-xl text-white/75 text-lg leading-relaxed">
              Book a confidential consultation with a senior partner. We will map the right
              structure, timeline and banking plan for your situation — at no charge.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-start gap-4">
              <MagneticButton strength={0.3}>
                <Button href="/contact" variant="ink" size="lg">
                  Book a consultation
                  <ArrowRight size={18} />
                </Button>
              </MagneticButton>
              <Button
                href="/services"
                variant="ghost"
                size="lg"
                className="text-white/80 hover:text-white"
              >
                View services
              </Button>
            </div>
          </div>

          <span
            aria-hidden
            className="pointer-events-none absolute -right-8 -bottom-24 font-serif italic text-[400px] leading-none text-white/[0.04] select-none"
          >
            .
          </span>
        </div>
      </Container>
    </section>
  );
}
