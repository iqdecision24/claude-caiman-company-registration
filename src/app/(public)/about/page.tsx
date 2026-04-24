import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'About',
  description:
    'A boutique Cayman Islands corporate services provider dedicated to high-quality offshore structuring.',
};

const principles = [
  {
    title: 'Confidentiality first',
    body: 'Every file is held under strict data-protection protocols. Named partners are personally responsible for client confidentiality.',
  },
  {
    title: 'Substance over paper',
    body: 'We only recommend structures that make economic sense and stand up to scrutiny — no opaque shells, no short-cuts.',
  },
  {
    title: 'Partners, not sales reps',
    body: 'You work directly with senior lawyers and compliance officers. No junior handovers, no call centres.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Editorial header with h1 */}
      <section className="relative pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <Container wide className="relative">
          <div className="mb-10 flex items-center justify-between gap-6 border-b border-border/70 pb-5">
            <div className="flex items-baseline gap-3">
              <span className="chapter-num text-lg">I.</span>
              <span className="text-[11px] uppercase tracking-[0.32em] text-foreground-muted">
                About
              </span>
            </div>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.32em] text-foreground-subtle">
              Est. MMXIV · George Town
            </span>
          </div>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="lg:col-span-8 font-display text-display-xl text-ink text-balance">
              Boutique Cayman firm,{' '}
              <span className="font-serif italic text-gold">global reach</span>.
            </h1>
            <p className="lg:col-span-4 text-foreground-muted leading-relaxed">
              Founded in 2014 in George Town, we focus exclusively on the Cayman Islands
              jurisdiction — and we have built our practice around a single idea: get
              structuring right, once.
            </p>
          </div>
        </Container>
      </section>

      {/* Portrait + story */}
      <section className="py-16 sm:py-24">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] shadow-editorial">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85"
                  alt="Grand Cayman office"
                  fill
                  className="object-cover grayscale-[25%]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              </figure>
              <div className="mt-6 flex items-end justify-between text-[11px] uppercase tracking-[0.28em] text-foreground-muted">
                <span>George Town · Grand Cayman</span>
                <span className="font-serif italic text-gold text-[13px] tracking-normal">
                  Anno 2014
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pt-10">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="chapter-num text-base">II.</span>
                <span className="eyebrow-alt">Our story</span>
              </div>
              <h2 className="font-display text-display-md text-ink text-balance">
                A practice built on <span className="font-serif italic text-gold">rigour</span>,
                without the bureaucracy.
              </h2>
              <blockquote className="mt-10 border-l-2 border-gold pl-6 max-w-xl">
                <p className="pullquote text-ink">
                  “We felt international clients deserved the same rigour as big-four firms —
                  without the bureaucracy, junior handovers and opaque fees. So we built one.”
                </p>
                <footer className="mt-4 text-[11px] uppercase tracking-[0.28em] text-foreground-subtle">
                  Founding partners, 2014
                </footer>
              </blockquote>
              <p className="mt-10 text-foreground-muted leading-relaxed max-w-xl">
                Today we support founders, family offices and fund managers with turnkey
                formation, nominee services, banking and ongoing compliance — on a fixed-fee
                basis. Named partners remain personally responsible for every engagement.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-16 sm:py-24 bg-background-warm/60 border-y border-border">
        <Container wide>
          <div className="flex items-baseline gap-3 mb-10">
            <span className="chapter-num text-base">III.</span>
            <span className="eyebrow-alt">Principles</span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((p, i) => (
              <div key={p.title} className="card-editorial h-full">
                <span className="chapter-num text-sm">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl text-ink leading-tight">{p.title}</h3>
                <p className="mt-4 text-foreground-muted leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
