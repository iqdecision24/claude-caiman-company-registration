'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AccordionItem = {
  q: string;
  a: React.ReactNode;
};

/**
 * Editorial accordion: chapter-numbered rows, smooth grid-template-rows height
 * transition (CSS-only, no JS measuring).
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-border">
      {items.map((it, i) => {
        const isOpen = i === open;
        return (
          <div
            key={i}
            className={cn(
              'border-b border-border transition-colors duration-500',
              isOpen ? 'bg-background-warm/40' : 'hover:bg-background-warm/25',
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="group grid w-full grid-cols-12 items-center gap-4 py-6 sm:py-8 text-left"
              aria-expanded={isOpen}
            >
              <span className="col-span-2 sm:col-span-1 chapter-num text-base">
                0{i + 1}
              </span>
              <h3
                className={cn(
                  'col-span-9 sm:col-span-10 font-display text-xl sm:text-2xl leading-snug transition-colors duration-500',
                  isOpen ? 'text-ink' : 'text-ink/85 group-hover:text-ink',
                )}
              >
                {it.q}
              </h3>
              <span className="col-span-1 flex justify-end">
                <span
                  className={cn(
                    'inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-500',
                    isOpen
                      ? 'border-gold text-gold bg-white'
                      : 'border-border text-foreground-muted group-hover:border-gold/50',
                  )}
                >
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </span>
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-8 sm:pb-10 pl-[16.6667%] pr-8 text-foreground-muted leading-relaxed max-w-3xl">
                  {it.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
