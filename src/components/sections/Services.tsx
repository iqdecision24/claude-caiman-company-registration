'use client';

import Link from 'next/link';
import { Building2, UserCircle2, Wallet, ShieldCheck, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card, CardIcon } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
  {
    icon: Building2,
    title: 'Company registration',
    text: 'Exempted Company, Cayman LLC, Segregated Portfolio Company — drafted, filed and registered end-to-end.',
    href: '/services#registration',
    price: 'from $3,500',
  },
  {
    icon: UserCircle2,
    title: 'Nominee service',
    text: 'Professional nominee directors and shareholders, with full corporate governance and indemnity cover.',
    href: '/services#nominee',
    price: 'from $1,800 / year',
  },
  {
    icon: Wallet,
    title: 'Bank account opening',
    text: 'Introduction to Tier-1 Cayman & international banks, EMIs and prime brokers — we prepare the full KYC pack.',
    href: '/services#banking',
    price: 'from $2,400',
  },
  {
    icon: ShieldCheck,
    title: 'Ongoing compliance',
    text: 'Registered office, economic substance filings, beneficial-owner registers, annual renewals.',
    href: '/services#compliance',
    price: 'from $1,500 / year',
  },
];

export function Services() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="services" className="py-24 sm:py-32 bg-background-muted/50">
      <Container wide>
        <div data-reveal>
          <SectionHeading
            eyebrow="What we do"
            title={<>Turnkey corporate services, crafted for Cayman</>}
            description="A single point of contact for the full life-cycle of your Cayman structure — from incorporation to ongoing compliance."
          />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map(({ icon: Icon, title, text, href, price }) => (
            <div key={title} data-reveal>
              <Card className="h-full group">
                <div className="flex items-start justify-between gap-6">
                  <CardIcon>
                    <Icon size={22} />
                  </CardIcon>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                    {price}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-display">{title}</h3>
                <p className="mt-3 text-foreground-muted leading-relaxed">{text}</p>
                <Link
                  href={href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:translate-x-0.5 transition-transform"
                >
                  Learn more
                  <ChevronRight size={16} />
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
