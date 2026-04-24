'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `target` once the element scrolls into view.
 * Returns a ref to attach to the wrapping element and the current value.
 */
export function useCounter(target: number, durationMs = 1800) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(1, elapsed / durationMs);
              // easeOutExpo
              const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
              setValue(target * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);

  return { ref, value };
}
