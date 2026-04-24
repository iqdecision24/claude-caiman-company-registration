'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    n: '01',
    title: 'Discovery',
    days: 'Day 1\u20132',
    text: 'A confidential call with a senior partner to understand your objectives, banking needs, residency and intended operations. No sales pitch — just structure.',
  },
  {
    n: '02',
    title: 'Documentation',
    days: 'Day 3\u20135',
    text: 'We draft the Memorandum and Articles of Association, onboarding questionnaires and KYC package. You approve. We file.',
  },
  {
    n: '03',
    title: 'Registration',
    days: 'Day 6\u201310',
    text: 'Filing with the Cayman Registrar of Companies. Certificate of Incorporation, share certificates and the minute book delivered digitally and in original.',
  },
  {
    n: '04',
    title: 'Banking',
    days: 'Day 10\u201330',
    text: 'Introduction to Tier-1 Cayman and international banks, EMIs or prime brokers — matched to your profile. We prepare the full source-of-funds dossier.',
  },
  {
    n: '05',
    title: 'Maintenance',
    days: 'Year after year',
    text: 'Registered office, annual returns, beneficial-ownership updates, economic-substance filings. One fixed annual fee, no surprises.',
  },
];

export function HowWeWork() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Vertical line scrub
      const line = root.querySelector<HTMLElement>('[data-line]');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: root.querySelector('[data-timeline]'),
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: true,
            },
          },
        );
      }

      // Each step fades in as its dot reaches the top marker
      root.querySelectorAll<HTMLElement>('[data-step]').forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 78%',
            once: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative py-28 sm:py-40">
      <Container wide>
        <SectionHeading
          chapter="IV."
          eyebrow="How we work"
          title={<>From first call to filed certificate, <span className="font-serif italic text-gold">in five steps</span>.</>}
          description="A clear, time-boxed process — with a senior partner on point from discovery to maintenance."
        />

        <div data-timeline className="relative mt-20 grid gap-0 sm:gap-2">
          {/* Vertical rail */}
          <div
            aria-hidden
            className="absolute left-[30px] sm:left-[46px] top-3 bottom-3 w-px bg-border"
          />
          <div
            aria-hidden
            data-line
            className="absolute left-[30px] sm:left-[46px] top-3 bottom-3 w-px origin-top bg-gold"
            style={{ transform: 'scaleY(0)' }}
          />

          {steps.map((s) => (
            <div
              key={s.n}
              data-step
              className="relative grid grid-cols-[60px_1fr] sm:grid-cols-[92px_1fr] items-start gap-6 py-8 sm:py-10"
            >
              {/* Dot */}
              <div className="relative flex items-center justify-center pt-1">
                <span className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-background-soft ring-1 ring-border">
                  <span className="h-[8px] w-[8px] rounded-full bg-gold" />
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-10 md:items-baseline">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="chapter-num text-sm">{s.n}</span>
                    <span className="text-[11px] uppercase tracking-[0.26em] text-foreground-subtle">
                      {s.days}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl sm:text-[30px] leading-tight text-ink">
                    {s.title}
                  </h3>
                </div>
                <p className="text-foreground-muted leading-relaxed max-w-xl">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
