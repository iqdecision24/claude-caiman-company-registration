'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-500',
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border/60'
          : 'bg-transparent',
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between">
        <Link href="/" className="group" aria-label="Cayman Formation home">
          <Logo size={34} animated />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((item) => {
            const active = item.href === '/'
              ? pathname === '/'
              : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active ? 'true' : undefined}
                className="nav-link"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button href="/contact" size="sm">
            Book a consultation
            <ArrowUpRight size={14} />
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div aria-hidden className="h-px w-full bg-transparent overflow-hidden">
        <div
          className="h-full origin-left bg-gold-line transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-xl">
          <div className="container-wide py-6 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-display text-foreground hover:bg-background-muted"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-4" size="md">
              Book a consultation
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
