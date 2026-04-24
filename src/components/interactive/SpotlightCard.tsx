'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Cursor-following radial highlight rendered behind the card content.
 * Paired with a subtle gold hairline that appears on hover.
 */
export function SpotlightCard({
  children,
  className,
  radius = 320,
  glowColor = 'rgba(178, 140, 71, 0.18)',
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--sx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--sy', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn('group relative overflow-hidden', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--sx, 50%) var(--sy, 50%), ${glowColor}, transparent 55%)`,
        }}
      />
      {children}
    </div>
  );
}
