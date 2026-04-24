import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'About',
  description:
    'A boutique Cayman Islands corporate services provider dedicated to high-quality offshore structuring.',
};

const values = [
  {
    title: 'Confidentiality first',
    body: 'Every file is held under strict data protection protocols. Named partners are personally responsible for client confidentiality.',
  },
  {
    title: 'Substance over paper',
    body: 'We only recommend structures that make economic sense and stand up to scrutiny \u2014 no opaque shells, no short-cuts.',
  },
  {
    title: 'Partners, not sales reps',
    body: 'You work directly with senior lawyers and compliance officers. No junior handovers, no call centres.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-20 pb-10">
        <Container wide>
          <SectionHeading
            eyebrow="About"
            title={<>Boutique Cayman firm, global reach</>}
            description="Founded in 2014 in George Town, we focus exclusively on the Cayman Islands jurisdiction \u2014 and we have built our practice around a single idea: get structuring right, once."
          />
        </Container>
      </section>

      <section className="py-16">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
                alt="Cayman Islands office"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="font-display text-display-md">Our story</h3>
              <p className="mt-5 text-foreground-muted leading-relaxed">
                We were founded by a team of Cayman-qualified lawyers and compliance officers who
                had spent years inside big-four firms. We felt that international clients deserved
                the same rigour \u2014 without the bureaucracy, junior handovers and opaque fees \u2014 and we
                built a boutique practice around that promise.
              </p>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                Today we support founders, family offices, fund managers and international
                businesses with turnkey formation, nominee services, banking and ongoing
                compliance \u2014 on a fixed-fee basis.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container wide>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-premium"
              >
                <span className="gold-hairline" />
                <h4 className="mt-5 font-display text-xl">{v.title}</h4>
                <p className="mt-3 text-foreground-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
