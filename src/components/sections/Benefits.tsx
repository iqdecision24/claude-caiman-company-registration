'use client';

import { BadgePercent, Lock, FileText, Globe2, Banknote, Scale } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card, CardIcon } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const benefits = [
  { icon: BadgePercent, title: '0% corporate tax', text: 'No income, capital gains, withholding or corporation tax on Cayman-exempt entities.' },
  { icon: Lock, title: 'Full confidentiality', text: 'No public register of beneficial owners; shareholder data held under strict data protection.' },
  { icon: FileText, title: 'No audit filings', text: 'Exempted companies are exempt from filing annual accounts with the Registrar.' },
  { icon: Globe2, title: 'Global prestige', text: 'One of the most recognised financial jurisdictions \u2014 trusted by Fortune 500s and top-tier funds.' },
  { icon: Banknote, title: 'Banking ecosystem', text: 'Access to Tier-1 private and corporate banks, EMIs and prime brokers familiar with Cayman structures.' },
  { icon: Scale, title: 'Stable common law', text: 'English common law, Privy Council as final court of appeal, politically and economically stable.' },
];

export function Benefits() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="benefits" className="py-24 sm:py-32">
      <Container wide>
        <div data-reveal>
          <SectionHeading
            eyebrow="Why Cayman"
            title={<>The gold standard for offshore structuring</>}
            description="Cayman Islands combine fiscal neutrality, political stability and a sophisticated regulatory framework \u2014 aligned with OECD and FATF \u2014 that give your structure instant credibility."
            align="center"
          />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} data-reveal>
              <Card className="h-full">
                <CardIcon>
                  <Icon size={22} />
                </CardIcon>
                <h3 className="mt-5 text-xl font-display text-foreground">{title}</h3>
                <p className="mt-3 text-foreground-muted leading-relaxed">{text}</p>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
