import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a confidential consultation with a Cayman Islands corporate services partner.',
};

export default function ContactPage() {
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
                Contact
              </span>
            </div>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.32em] text-foreground-subtle">
              Mon–Fri · 09:00–18:00 EST
            </span>
          </div>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="lg:col-span-8 font-display text-display-xl text-ink text-balance">
              Book a{' '}
              <span className="font-serif italic text-gold">confidential</span> consultation.
            </h1>
            <p className="lg:col-span-4 text-foreground-muted leading-relaxed">
              Tell us a little about your situation. A senior partner will respond within one
              business day.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact info + form */}
      <section className="py-16 sm:py-24 bg-background-warm/60 border-y border-border">
        <Container wide>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
            <div className="space-y-4">
              <ContactCard
                icon={Mail}
                label="Email"
                value="hello@cayman-formation.com"
                href="mailto:hello@cayman-formation.com"
                index="01"
              />
              <ContactCard
                icon={Phone}
                label="Phone"
                value="+1 345 000 0000"
                href="tel:+13450000000"
                index="02"
              />
              <ContactCard
                icon={MapPin}
                label="Office"
                value={
                  <>
                    Cricket Square, George Town,
                    <br />
                    Grand Cayman KY1-1000
                  </>
                }
                index="03"
              />
              <ContactCard
                icon={Clock}
                label="Hours"
                value="Mon–Fri · 09:00–18:00 (EST)"
                index="04"
              />
            </div>

            <div className="card-editorial">
              <h2 className="sr-only">Contact form</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  index,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: React.ReactNode;
  href?: string;
  index: string;
}) {
  const body = (
    <div className="card-editorial flex items-start gap-5">
      <div className="flex items-center gap-4">
        <span className="chapter-num text-sm">{index}</span>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink">
          <Icon size={16} />
        </span>
      </div>
      <div className="flex-1">
        <p className="text-[10.5px] uppercase tracking-[0.24em] text-foreground-subtle">
          {label}
        </p>
        <p className="mt-1.5 font-display text-lg text-ink leading-tight">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block group">
      {body}
    </a>
  ) : (
    body
  );
}
