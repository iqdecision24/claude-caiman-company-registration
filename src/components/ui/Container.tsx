import { cn } from '@/lib/utils';

export function Container({
  className,
  wide,
  children,
}: {
  className?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(wide ? 'container-wide' : 'container-narrow', className)}>
      {children}
    </div>
  );
}
