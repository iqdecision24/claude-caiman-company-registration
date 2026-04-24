'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Splits the target element's text content into word-wrapped spans and
 * reveals them with a staggered "type-up" animation on scroll.
 *
 * Target elements must have [data-split].
 */
export function useSplitReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll<HTMLElement>('[data-split]');
      if (!targets.length) return;

      targets.forEach((target) => {
        // Walk direct text nodes and wrap each word.
        const walk = (node: Node) => {
          const children = Array.from(node.childNodes);
          children.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              const text = child.textContent ?? '';
              if (!text.trim()) return;
              const frag = document.createDocumentFragment();
              const parts = text.split(/(\s+)/);
              parts.forEach((part) => {
                if (part.trim() === '') {
                  frag.appendChild(document.createTextNode(part));
                } else {
                  const outer = document.createElement('span');
                  outer.setAttribute('data-split-word', '');
                  const inner = document.createElement('span');
                  inner.textContent = part;
                  outer.appendChild(inner);
                  frag.appendChild(outer);
                }
              });
              child.parentNode?.replaceChild(frag, child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
              walk(child);
            }
          });
        };
        walk(target);
      });

      const innerSpans = ref.current.querySelectorAll<HTMLElement>(
        '[data-split-word] > span',
      );
      gsap.to(innerSpans, {
        y: '0%',
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return ref;
}
