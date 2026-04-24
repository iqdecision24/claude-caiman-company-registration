'use client';

import { Container } from '@/components/ui/Container';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const stats = [
  { value: '0%', label: 'Corporate tax on exempted entities' },
  { value: '100 000+', label: 'Companies currently on the Cayman register' },
  { value: '2 weeks', label: 'Typical time to incorporate end-to-end' },
  { value: '75%+', label: 'Global offshore hedge funds domiciled in Cayman' },
];

export function Stats() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-16 sm:py-24">
      <Container wide>
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-border bg-white/70 p-8 sm:p-12 shadow-soft backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-hero-glow opacity-60 pointer-events-none" />
          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-5xl text-foreground bg-gradient-to-br from-foreground to-brand bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-foreground-muted max-w-[16rem]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
