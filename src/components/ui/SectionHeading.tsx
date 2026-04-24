import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string;
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
      {eyebrow && (
        <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span className="gold-hairline" />
          <p className="eyebrow">{eyebrow}</p>
        </div>
      )}
      <h2 className="mt-4 text-display-md sm:text-display-lg">{title}</h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{description}</p>
      )}
    </div>
  );
}
