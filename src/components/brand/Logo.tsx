'use client';

import { cn } from '@/lib/utils';

/**
 * Editorial compass-horizon emblem.
 *
 * Composition
 *   • Outer ring — the lens
 *   • Sun — rising circle (gold)
 *   • Horizon line — water
 *   • Ripple — reflection below the horizon
 *   • North tick — small gold dot at 12 o'clock
 *
 * On mount the ring draws clockwise from the top, the horizon slides in,
 * the sun rises and the ripple/north tick fade in. On hover the sun lifts.
 */
export function Logo({
  size = 40,
  animated = true,
  wordmark = true,
  tone = 'ink',
  className,
}: {
  size?: number;
  animated?: boolean;
  wordmark?: boolean;
  tone?: 'ink' | 'light';
  className?: string;
}) {
  const isLight = tone === 'light';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3',
        animated && 'logo-anim',
        className,
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Cayman Formation emblem"
        className={cn(
          'shrink-0 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:rotate-[8deg]',
          isLight ? 'text-white' : 'text-ink',
        )}
      >
        {/* Outer ring — rotated so the stroke begins at 12 o'clock */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(-90 20 20)"
          className="logo-ring"
        />
        {/* Horizon line */}
        <line
          x1="7"
          y1="22"
          x2="33"
          y2="22"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="logo-water"
        />
        {/* Sun */}
        <circle
          cx="20"
          cy="15"
          r="3"
          stroke="#B28C47"
          strokeWidth="1"
          className="logo-sun"
        />
        {/* Ripple / reflection */}
        <line
          x1="13"
          y1="27"
          x2="27"
          y2="27"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.55"
          className="logo-ripple"
        />
        {/* North tick */}
        <circle cx="20" cy="2" r="1.1" fill="#B28C47" className="logo-north" />
      </svg>
      {wordmark && (
        <span className="inline-flex items-baseline gap-2 leading-none">
          <span
            className={cn(
              'font-display text-[26px] tracking-tighter',
              isLight ? 'text-white' : 'text-ink',
            )}
          >
            Cayman
            <span className="italic text-gold">.</span>
          </span>
          <span
            className={cn(
              'hidden sm:inline text-[10px] uppercase tracking-[0.32em]',
              isLight ? 'text-white/55' : 'text-foreground-subtle',
            )}
          >
            Est. MMXIV
          </span>
        </span>
      )}
    </span>
  );
}
