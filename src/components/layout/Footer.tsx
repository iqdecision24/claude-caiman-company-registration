import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { CopyPill } from '@/components/interactive/CopyPill';
import { Logo } from '@/components/brand/Logo';

export function Footer() {
  return (
    <footer className="mt-32 ink-section">
      <div className="container-wide relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="group" aria-label="Cayman Formation home">
              <Logo size={46} tone="light" animated />
            </Link>
            <p className="mt-8 max-w-md text-white/65 leading-relaxed">
              A Cayman-Islands boutique corporate services firm. Exempted companies, LLCs,
              SPCs and fund vehicles — incorporated, banked and maintained turnkey for global
              founders, family offices and fund managers.
            </p>
            <div className="mt-10 h-px w-24 bg-gold/60" />
            <p className="mt-6 font-serif italic text-white/60">
              Regulated by the Cayman Islands Monetary Authority.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">Navigate</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/blog">Insights</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">Services</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>Exempted Companies</li>
              <li>Cayman LLC</li>
              <li>Segregated Portfolio</li>
              <li>Fund formation</li>
              <li>Banking introductions</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li className="flex gap-3">
                <Mail size={15} className="mt-0.5 text-gold-light shrink-0" />
                <CopyPill value="hello@cayman-formation.com" />
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="mt-0.5 text-gold-light shrink-0" />
                <CopyPill value="+1 345 000 0000" />
              </li>
              <li className="flex gap-3">
                <MapPin size={15} className="mt-0.5 text-gold-light shrink-0" />
                <span>
                  Cricket Square, George Town,
                  <br />
                  Grand Cayman KY1-1000
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/45">
          <p>© {new Date().getFullYear()} Cayman Formation. All rights reserved.</p>
          <p className="font-serif italic">Confidential. Discreet. Enduring.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
        {children}
        <ArrowUpRight size={12} className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
      </Link>
    </li>
  );
}
