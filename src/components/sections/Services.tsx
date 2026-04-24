'use client';

import Link from 'next/link';
import { Building2, UserCircle2, Wallet, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
  {
    n: 'I',
    icon: Building2,
    title: 'Company formation',
    text: 'Exempted Company, Cayman LLC, Segregated Portfolio Company and fund vehicles — drafted, filed and registered end-to-end.',
    href: '/services#registration',
    price: 'from $3,500',
  },
  {
    n: 'II',
    icon: UserCircle2,
    title: 'Nominee service',
    text: 'Professional nominee directors and shareholders covered by indemnity. Beneficial ownership remains yours — and private.',
    href: '/services#nominee',
    price: 'from $1,800 / yr',
  },
  {
    n: 'III',
    icon: Wallet,
    title: 'Banking introductions',
    text: 'We prepare the full KYC and source-of-funds pack and introduce your structure to Tier-1 banks, EMIs and prime brokers.',
    href: '/services#banking',
    price: 'from $2,400',
  },
  {
    n: 'IV',
    icon: ShieldCheck,
    title: 'Ongoing compliance',
    text: 'Registered office, annual returns, beneficial-ownership updates, economic-substance filings. One fixed annual fee.',
    href: '/services#compliance',
    price: 'from $1,500 / yr',
  },
];

export function Services() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-28 sm:py-40 bg-background-warm/60"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-60" />
      <Container wide>
        <div
          data-reveal
          className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <SectionHeading
            chapter="III."
            eyebrow="What we do"
            title={<>Turnkey corporate services, <span className="font-serif italic text-gold">crafted for Cayman</span>.</>}
            description="A single point of contact for the full life-cycle of your structure — from incorporation and banking through to ongoing compliance."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-brand-dark transition-colors"
          >
            View all services <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map(({ icon: Icon, ...s }) => (
            <div key={s.title} data-reveal>
              <Link
                href={s.href}
                className="group relative block h-full card-editorial overflow-hidden"
              >
                {/* Decorative corner numeral */}
                <span className="absolute right-6 top-6 font-serif italic text-[64px] leading-none text-gold/20 group-hover:text-gold/35 transition-colors duration-500 select-none">
                  {s.n}
                </span>

                <div className="relative flex h-full flex-col">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-ink transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-8 font-display text-3xl text-ink leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-foreground-muted leading-relaxed max-w-md">
                    {s.text}
                  </p>
                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-border">
                    <span className="font-serif italic text-gold text-lg">
                      {s.price}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:translate-x-1 transition-transform duration-500">
                      Learn more
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
