'use client';

import { Container } from '@/components/ui/Container';
import { useCounter } from '@/hooks/useCounter';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  format?: (n: number) => string;
};

const stats: Stat[] = [
  { value: 0, suffix: '%', label: 'Corporate tax', sub: 'on exempted entities' },
  { value: 100000, suffix: '+', label: 'Companies', sub: 'on the Cayman register', format: (n) => (Math.round(n / 1000) * 1000).toLocaleString('en-US') },
  { value: 14, suffix: ' days', label: 'Average filing', sub: 'end-to-end' },
  { value: 75, suffix: '%', label: 'Global offshore funds', sub: 'domiciled in Cayman' },
];

function Counter({ stat }: { stat: Stat }) {
  const { ref, value } = useCounter(stat.value);
  const display = stat.format
    ? stat.format(value)
    : Number.isInteger(stat.value)
      ? Math.round(value).toLocaleString('en-US')
      : value.toFixed(1);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      <div className="counter font-display text-6xl sm:text-7xl text-white leading-none">
        {stat.prefix}{display}<span className="text-gold">{stat.suffix}</span>
      </div>
      <div className="mt-5 h-px w-10 bg-gold" />
      <div className="mt-5 font-serif italic text-white/80 text-xl">{stat.label}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/50">{stat.sub}</div>
    </div>
  );
}

export function Stats() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="figures" className="relative">
      <div className="ink-section">
        <Container wide className="relative py-24 sm:py-32">
          <div data-reveal className="flex items-baseline gap-4 mb-16">
            <span className="chapter-num text-base text-gold-light">V.</span>
            <span className="text-[11px] uppercase tracking-[0.28em] text-white/50">The figures</span>
          </div>
          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} data-reveal>
                <Counter stat={s} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
