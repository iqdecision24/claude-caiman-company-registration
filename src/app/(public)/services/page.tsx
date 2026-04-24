import type { Metadata } from 'next';
import { Building2, UserCircle2, Wallet, ShieldCheck, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Company registration, nominee service, bank account opening and ongoing compliance for Cayman Islands entities.',
};

const tiers = [
  {
    name: 'Essential',
    price: '$3,500',
    subtitle: 'Clean incorporation for simple holding structures',
    highlights: [
      'Exempted Company or Cayman LLC',
      'Registered office (12 months)',
      'Drafting of M&AA',
      'Certificate of incorporation',
      'Beneficial ownership filing',
    ],
  },
  {
    name: 'Professional',
    price: '$6,800',
    subtitle: 'For operating companies and fund vehicles',
    highlights: [
      'Everything in Essential',
      'Nominee director (12 months)',
      'Corporate secretary',
      'Bank account introduction (1 bank)',
      'Economic substance review',
    ],
    featured: true,
  },
  {
    name: 'Bespoke',
    price: 'from $12,000',
    subtitle: 'Segregated Portfolio Companies & fund structures',
    highlights: [
      'Complex SPC / fund vehicles',
      'Full nominee suite',
      'Multi-bank introductions',
      'Dedicated compliance officer',
      'Annual audit coordination',
    ],
  },
];

const detail = [
  {
    id: 'registration',
    icon: Building2,
    title: 'Company registration',
    body:
      'We draft the Memorandum and Articles of Association tailored to your use-case, file with the Cayman Registrar of Companies, and deliver the Certificate of Incorporation together with share certificates and the minute book \u2014 typically within 5\u201310 business days.',
  },
  {
    id: 'nominee',
    icon: UserCircle2,
    title: 'Nominee service',
    body:
      'Professional nominee directors and shareholders maintain full confidentiality while you retain beneficial ownership. Each nominee is a licensed individual covered by professional indemnity insurance and bound by a strict declaration of trust.',
  },
  {
    id: 'banking',
    icon: Wallet,
    title: 'Bank account opening',
    body:
      'We prepare a full KYC and source-of-funds pack and introduce your company to Tier-1 Cayman and international banks, EMIs and prime brokers. You meet the relationship manager \u2014 we handle the paperwork.',
  },
  {
    id: 'compliance',
    icon: ShieldCheck,
    title: 'Ongoing compliance',
    body:
      'Registered office, annual return, beneficial ownership updates, economic substance filings where applicable, and renewal with the Registrar \u2014 all handled on a fixed annual fee.',
  },
];

export default function ServicesPage() {
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
                Services
              </span>
            </div>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.32em] text-foreground-subtle">
              Pricing · Scope · Deliverables
            </span>
          </div>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="lg:col-span-8 font-display text-display-xl text-ink text-balance">
              Everything your Cayman structure{' '}
              <span className="font-serif italic text-gold">needs</span>.
            </h1>
            <p className="lg:col-span-4 text-foreground-muted leading-relaxed">
              A complete suite of corporate services delivered in-house by a licensed Cayman
              Islands provider \u2014 from incorporation and banking through to ongoing compliance.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing tiers */}
      <section className="py-16 sm:py-20 bg-background-warm/60 border-y border-border">
        <Container wide>
          <div className="flex items-baseline gap-3 mb-10">
            <span className="chapter-num text-base">II.</span>
            <span className="eyebrow-alt">Pricing</span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {tiers.map((t, i) => (
              <div
                key={t.name}
                className={
                  'card-editorial relative h-full flex flex-col ' +
                  (t.featured ? 'ring-1 ring-gold/40 border-gold/40 shadow-premium' : '')
                }
              >
                <div className="flex items-center justify-between">
                  <span className="chapter-num text-sm">0{i + 1}</span>
                  {t.featured && (
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-gold-deep">
                      Most popular
                    </span>
                  )}
                </div>
                <h3 className="mt-6 font-display text-3xl text-ink leading-tight">{t.name}</h3>
                <p className="mt-2 text-sm text-foreground-muted">{t.subtitle}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl text-ink">{t.price}</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm text-foreground-muted flex-1">
                  {t.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <Check size={15} className="mt-0.5 text-gold shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-border">
                  <Button
                    href="/contact"
                    variant={t.featured ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    Request this plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Detail index */}
      <section className="py-20 sm:py-28">
        <Container wide>
          <div className="flex items-baseline gap-3 mb-12">
            <span className="chapter-num text-base">III.</span>
            <span className="eyebrow-alt">In detail</span>
          </div>
          <div className="border-t border-border">
            {detail.map(({ icon: Icon, ...s }, i) => (
              <div
                id={s.id}
                key={s.id}
                className="group grid grid-cols-12 items-start gap-6 border-b border-border py-10 sm:py-12 transition-colors duration-500 hover:bg-background-warm/30"
              >
                <div className="col-span-2 sm:col-span-1 pt-1">
                  <span className="chapter-num text-base">0{i + 1}</span>
                </div>
                <div className="col-span-10 sm:col-span-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-ink transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                    <Icon size={18} />
                  </div>
                  <h2 className="mt-5 font-display text-2xl sm:text-[30px] leading-tight text-ink">
                    {s.title}
                  </h2>
                </div>
                <p className="col-span-12 sm:col-span-7 text-foreground-muted leading-relaxed max-w-2xl">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
