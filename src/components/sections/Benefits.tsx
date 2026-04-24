'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const benefits = [
  {
    n: '01',
    title: 'Zero corporate tax',
    text: 'No income, capital-gains, withholding or corporation tax on Cayman-exempt entities. Fiscal neutrality by statute, not by loophole.',
  },
  {
    n: '02',
    title: 'Discreet ownership',
    text: 'No public register of beneficial owners. Shareholder details held under strict data-protection and statutory confidentiality.',
  },
  {
    n: '03',
    title: 'No audit filings',
    text: 'Exempted companies are not required to file annual accounts with the Registrar. Reporting remains private to the directors.',
  },
  {
    n: '04',
    title: 'Global prestige',
    text: 'A jurisdiction trusted by 75%+ of offshore hedge funds and Fortune-500 holding structures — an instant signal of seriousness.',
  },
  {
    n: '05',
    title: 'Tier-one banking',
    text: 'Working relationships with Cayman and international banks, EMIs and prime brokers who are accustomed to Cayman structures.',
  },
  {
    n: '06',
    title: 'Enduring rule of law',
    text: 'English common law, the Privy Council as final court of appeal and three centuries of political and economic stability.',
  },
];

export function Benefits() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="benefits" className="relative py-28 sm:py-40">
      <Container wide>
        <div data-reveal className="max-w-3xl">
          <SectionHeading
            chapter="II."
            eyebrow="Why Cayman"
            title={<>The gold standard for <span className="font-serif italic text-gold">offshore structuring</span>.</>}
            description="Six structural advantages that have made the Cayman Islands the jurisdiction of choice for international capital for forty years."
          />
        </div>

        <div className="mt-20 border-t border-border">
          {benefits.map((b, i) => (
            <div
              key={b.n}
              data-reveal
              className="group grid grid-cols-12 items-start gap-6 border-b border-border py-8 sm:py-10 transition-colors duration-500 hover:bg-background-warm/40"
            >
              <div className="col-span-2 sm:col-span-1 pt-1">
                <span className="chapter-num text-base sm:text-lg">{b.n}</span>
              </div>
              <h3 className="col-span-10 sm:col-span-4 font-display text-2xl sm:text-[30px] leading-tight text-ink transition-colors duration-500 group-hover:text-brand-dark">
                {b.title}
              </h3>
              <p className="col-span-12 sm:col-span-6 sm:col-start-6 text-foreground-muted leading-relaxed max-w-xl">
                {b.text}
              </p>
              <div className="col-span-12 sm:col-span-1 sm:col-start-12 flex sm:justify-end pt-2 sm:pt-1">
                <span className="block h-px w-10 bg-gold origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
              {/* Hide extra divider on last child handled by :last-child below via CSS if needed */}
              {i === benefits.length - 1 ? null : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
