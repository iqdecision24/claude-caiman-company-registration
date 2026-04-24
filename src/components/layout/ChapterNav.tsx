'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type Chapter = { id: string; num: string; label: string };

/**
 * Sticky side-of-viewport chapter index.
 * - Tracks the active section via IntersectionObserver
 * - Numerals always visible; labels fade in for the active chapter
 *   and for all chapters while the nav itself is hovered
 * - Click a row to smooth-scroll to the target section
 */
export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [activeId, setActiveId] = useState<string | null>(chapters[0]?.id ?? null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    );

    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [chapters]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <nav
      aria-label="Chapters"
      className={cn(
        'group/nav fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:block',
        'transition-opacity duration-700 delay-500',
        mounted ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className="flex items-stretch gap-4">
        {/* Vertical spine */}
        <div aria-hidden className="w-px bg-border self-stretch" />
        <ul className="flex flex-col gap-1">
          {chapters.map((c) => {
            const active = c.id === activeId;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(c.id)}
                  className="flex items-center gap-3 py-1.5 pr-2 text-left"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'block h-px transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)]',
                      active ? 'w-8 bg-gold' : 'w-3 bg-foreground-subtle/50',
                    )}
                  />
                  <span
                    className={cn(
                      'chapter-num text-xs w-7 text-center transition-colors duration-500',
                      active ? 'text-gold' : 'text-foreground-subtle',
                    )}
                  >
                    {c.num}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] uppercase tracking-[0.22em] whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)]',
                      active
                        ? 'opacity-100 translate-x-0 text-ink'
                        : 'opacity-0 -translate-x-1 text-foreground-muted group-hover/nav:opacity-100 group-hover/nav:translate-x-0',
                    )}
                  >
                    {c.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
