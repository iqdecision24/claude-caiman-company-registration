'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion, type AccordionItem } from '@/components/interactive/Accordion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqs: AccordionItem[] = [
  { q: 'How long does incorporation take end-to-end?', a: <p>For a straightforward exempted company, 5–10 business days from the moment we receive complete KYC documentation. Fund vehicles and Segregated Portfolio Companies typically take 2–4 weeks depending on regulator reviews.</p> },
  { q: 'Do I need to visit the Cayman Islands?', a: <p>No. The entire incorporation is handled remotely — identity verification is performed via video KYC and certified document couriers. In-person visits are reserved for clients who request them.</p> },
  { q: 'Is beneficial ownership publicly visible?', a: <p>No. The Cayman beneficial-ownership register is maintained privately by the corporate services provider and is accessible only to competent authorities on a request basis. Directors, shareholders and UBO details are not part of any public register.</p> },
  { q: 'What recurring fees should I expect?', a: <p>A government annual return fee, the registered-office and corporate-secretary retainer, and (if applicable) economic-substance filings. All quoted on a fixed-fee basis — a one-page schedule, no hourly surprises.</p> },
  { q: 'Can a non-resident be the sole shareholder and director?', a: <p>Yes. There is no residency requirement for shareholders or directors of a Cayman exempted company. Nominee services are available if confidentiality or local-presence support is desired.</p> },
  { q: 'How difficult is opening a bank account?', a: <p>This is typically the longest step. Timelines range from 2 to 6 weeks depending on the bank, the source-of-funds profile and the intended activities. We prepare the full dossier and introduce you to institutions that are actively onboarding Cayman structures.</p> },
];

export function FAQ() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} id="faq" className="relative py-28 sm:py-40">
      <Container wide>
        <div data-reveal>
          <SectionHeading
            chapter="VII."
            eyebrow="Common questions"
            title={<>Answers, not <span className="font-serif italic text-gold">small print</span>.</>}
            description="The questions we are asked most often — with direct answers. For anything else, book a consultation."
          />
        </div>
        <div data-reveal className="mt-16 max-w-5xl">
          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}
