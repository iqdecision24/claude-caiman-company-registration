import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-32 ink-section">
      <div className="container-wide relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-baseline gap-2">
              <span className="font-display text-[30px] tracking-tighter text-white leading-none">
                Cayman<span className="italic text-gold-light">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.32em] text-white/50">
                Est. MMXIV
              </span>
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
            <h4 className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
              Navigate
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/blog">Insights</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
              Services
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>Exempted Companies</li>
              <li>Cayman LLC</li>
              <li>Segregated Portfolio</li>
              <li>Fund formation</li>
              <li>Banking introductions</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
              Contact
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li className="flex gap-3">
                <Mail size={15} className="mt-0.5 text-gold-light shrink-0" />
                <a href="mailto:hello@cayman-formation.com" className="hover:text-white">
                  hello@cayman-formation.com
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="mt-0.5 text-gold-light shrink-0" />
                +1 345 000 0000
              </li>
              <li className="flex gap-3">
                <MapPin size={15} className="mt-0.5 text-gold-light shrink-0" />
                Cricket Square, George Town,<br />Grand Cayman KY1-1000
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
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
      >
        {children}
        <ArrowUpRight
          size={12}
          className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Link>
    </li>
  );
}
