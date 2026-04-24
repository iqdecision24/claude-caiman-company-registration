import { cn } from '@/lib/utils';

export function Card({
  className,
  children,
  interactive = true,
}: {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-white/70 p-6 shadow-soft backdrop-blur-sm',
        interactive &&
          'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-premium hover:border-brand/25',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand',
        className,
      )}
    >
      {children}
    </div>
  );
}
