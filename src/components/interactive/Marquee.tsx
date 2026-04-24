import { cn } from '@/lib/utils';

/**
 * Infinite horizontal marquee. CSS-driven, pauses on hover.
 * Content is duplicated so the loop is seamless.
 */
export function Marquee({
  items,
  speedSeconds = 40,
  className,
}: {
  items: string[];
  speedSeconds?: number;
  className?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div
      className={cn(
        'relative overflow-hidden border-y border-border bg-background-warm/60',
        className,
      )}
    >
      <div
        className="flex w-max items-center gap-16 whitespace-nowrap py-5 [animation:marquee_var(--d)_linear_infinite] hover:[animation-play-state:paused]"
        style={{ ['--d' as never]: `${speedSeconds}s` }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-16 text-[13px] uppercase tracking-[0.22em] text-foreground-muted"
          >
            <span className="font-serif italic normal-case tracking-normal text-gold text-xl">
              •
            </span>
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
