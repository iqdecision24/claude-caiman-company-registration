'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Applies a staggered fade-up reveal to elements with [data-reveal]
 * inside the returned ref, triggered by ScrollTrigger.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const items = ref.current.querySelectorAll<HTMLElement>('[data-reveal]');
      if (!items.length) return;

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return ref;
}
