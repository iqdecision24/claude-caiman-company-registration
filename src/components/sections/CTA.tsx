'use client';

import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function CTA() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-16 sm:py-24">
      <Container wide>
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl bg-foreground text-white p-10 sm:p-16 shadow-premium"
        >
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-light/20 blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-white/60">Next step</p>
            <h3 className="mt-4 font-display text-display-md sm:text-display-lg text-white">
              Ready to incorporate in the Cayman Islands?
            </h3>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">
              Book a confidential consultation with a senior partner. We will map the right
              structure, timeline and banking plan for your situation \u2014 free of charge.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button href="/contact" size="lg" className="bg-white text-foreground hover:bg-white/90">
                Book a consultation
                <ArrowRight size={18} />
              </Button>
              <Button href="/services" variant="ghost" size="lg" className="text-white hover:text-white/80">
                View services
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
