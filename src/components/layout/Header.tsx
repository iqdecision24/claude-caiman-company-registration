'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-white/75 backdrop-blur-md border-b border-border shadow-soft'
          : 'bg-transparent',
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white font-display text-lg shadow-soft transition-transform duration-300 group-hover:scale-105">
            C
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg text-foreground">Cayman Formation</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-foreground-subtle">
              Premium offshore
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button href="/contact" size="sm">
            Get a consultation
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container-wide py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground-muted hover:bg-background-muted hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-2" size="md">
              Get a consultation
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
