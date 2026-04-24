'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Click to copy the `value` to clipboard with a brief visual confirmation.
 */
export function CopyPill({
  value,
  children,
  className,
}: {
  value: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'group inline-flex items-center gap-2 transition-colors',
        copied ? 'text-gold-light' : 'hover:text-white',
        className,
      )}
      aria-label={`Copy ${value}`}
    >
      <span>{children ?? value}</span>
      <span
        aria-hidden
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 group-hover:border-gold-light/60 group-hover:text-gold-light"
      >
        {copied ? <Check size={11} /> : <Copy size={11} />}
      </span>
    </button>
  );
}
