import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  chapter,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  chapter?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {(eyebrow || chapter) && (
        <div
          className={cn(
            'flex items-center gap-4',
            align === 'center' && 'justify-center',
          )}
        >
          {chapter && (
            <span className="chapter-num text-base">{chapter}</span>
          )}
          {eyebrow && <span className="eyebrow-alt">{eyebrow}</span>}
        </div>
      )}
      <h2 className="mt-4 text-display-md sm:text-display-lg text-balance">{title}</h2>
      {description && (
        <p className="mt-6 text-lg leading-relaxed text-foreground-muted text-pretty max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
