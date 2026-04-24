import type { Metadata } from 'next';
import { Building2, UserCircle2, Wallet, ShieldCheck, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card, CardIcon } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
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

const sections = [
  {
    id: 'registration',
    icon: Building2,
    title: 'Company registration',
    body:
      'We draft the Memorandum and Articles of Association tailored to your use-case, file with the Cayman Registrar of Companies, and deliver the Certificate of Incorporation together with share certificates and the minute book — typically within 5–10 business days.',
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
      'We prepare a full KYC and source-of-funds pack and introduce your company to Tier-1 Cayman and international banks, EMIs and prime brokers. You meet the relationship manager — we handle the paperwork.',
  },
  {
    id: 'compliance',
    icon: ShieldCheck,
    title: 'Ongoing compliance',
    body:
      'Registered office, annual return, beneficial ownership updates, economic substance filings where applicable, and renewal with the Registrar — all handled on a fixed annual fee.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-20 pb-10">
        <Container wide>
          <SectionHeading
            eyebrow="Services"
            title={<>Everything your Cayman structure needs</>}
            description="A complete suite of corporate services delivered in-house by a licensed Cayman Islands provider."
            align="center"
          />
        </Container>
      </section>

      <section className="py-14">
        <Container wide>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <Card
                key={t.name}
                className={`h-full flex flex-col ${t.featured ? 'border-brand/40 shadow-premium ring-1 ring-brand/20' : ''}`}
              >
                {t.featured && (
                  <span className="self-start rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand uppercase tracking-[0.18em]">
                    Most popular
                  </span>
                )}
                <h3 className="mt-4 font-display text-2xl">{t.name}</h3>
                <p className="text-foreground-muted mt-1">{t.subtitle}</p>
                <div className="mt-6 font-display text-4xl">{t.price}</div>
                <ul className="mt-6 space-y-2.5 text-sm text-foreground-muted flex-1">
                  {t.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <Check size={16} className="mt-0.5 text-brand shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    href="/contact"
                    variant={t.featured ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    Request this plan
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container wide>
          <div className="grid gap-10">
            {sections.map(({ id, icon: Icon, title, body }) => (
              <div
                id={id}
                key={id}
                className="grid gap-6 md:grid-cols-[auto_1fr] items-start rounded-2xl border border-border bg-white/60 p-8 shadow-soft"
              >
                <CardIcon className="h-14 w-14">
                  <Icon size={24} />
                </CardIcon>
                <div>
                  <h3 className="font-display text-2xl">{title}</h3>
                  <p className="mt-3 text-foreground-muted leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
