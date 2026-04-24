import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a confidential consultation with a Cayman Islands corporate services partner.',
};

export default function ContactPage() {
  return (
    <section className="pt-20 pb-24">
      <Container wide>
        <SectionHeading
          eyebrow="Contact"
          title={<>Book a confidential consultation</>}
          description="Tell us a little about your situation. A senior partner will respond within one business day."
          align="center"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-5">
            <div className="card-premium">
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-brand mt-0.5" />
                <div>
                  <p className="text-sm text-foreground-subtle">Email</p>
                  <a href="mailto:hello@cayman-formation.com" className="font-medium">hello@cayman-formation.com</a>
                </div>
              </div>
            </div>
            <div className="card-premium">
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-brand mt-0.5" />
                <div>
                  <p className="text-sm text-foreground-subtle">Phone</p>
                  <p className="font-medium">+1 345 000 0000</p>
                </div>
              </div>
            </div>
            <div className="card-premium">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-brand mt-0.5" />
                <div>
                  <p className="text-sm text-foreground-subtle">Office</p>
                  <p className="font-medium">Cricket Square, George Town,<br/> Grand Cayman KY1-1000</p>
                </div>
              </div>
            </div>
            <div className="card-premium">
              <div className="flex items-start gap-4">
                <Clock size={20} className="text-brand mt-0.5" />
                <div>
                  <p className="text-sm text-foreground-subtle">Hours</p>
                  <p className="font-medium">Mon–Fri · 09:00–18:00 (EST)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-premium">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
