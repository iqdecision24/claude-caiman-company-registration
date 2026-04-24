import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-white/60 backdrop-blur-sm">
      <div className="container-wide py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white font-display text-lg">
              C
            </span>
            <span className="font-display text-xl">Cayman Formation</span>
          </div>
          <p className="mt-5 max-w-md text-foreground-muted leading-relaxed">
            Turnkey registration of exempted companies, LLCs and SPCs in the Cayman Islands.
            Nominee services, bank account opening and ongoing corporate support.
          </p>
          <span className="gold-hairline mt-6" />
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-foreground-subtle">
            Navigate
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/services" className="text-foreground-muted hover:text-brand">Services</Link></li>
            <li><Link href="/about" className="text-foreground-muted hover:text-brand">About</Link></li>
            <li><Link href="/blog" className="text-foreground-muted hover:text-brand">Insights</Link></li>
            <li><Link href="/contact" className="text-foreground-muted hover:text-brand">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-foreground-subtle">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
            <li className="flex gap-2"><Mail size={16} className="text-brand" /> hello@cayman-formation.com</li>
            <li className="flex gap-2"><Phone size={16} className="text-brand" /> +1 345 000 0000</li>
            <li className="flex gap-2"><MapPin size={16} className="text-brand mt-0.5" /> George Town, Grand Cayman, KY1-1000</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-foreground-subtle">
          <p>© {new Date().getFullYear()} Cayman Formation. All rights reserved.</p>
          <p>Licensed Cayman Islands corporate services provider.</p>
        </div>
      </div>
    </footer>
  );
}
