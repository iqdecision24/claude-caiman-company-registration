import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'ink' | 'gold';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-white shadow-premium hover:shadow-editorial hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-brand before:scale-x-0 before:origin-left before:transition-transform before:duration-500 hover:before:scale-x-100 [&>*]:relative',
  secondary:
    'bg-white text-foreground border border-border hover:border-gold/60 hover:text-ink hover:shadow-soft',
  ghost: 'text-foreground hover:text-brand',
  ink: 'bg-white text-ink hover:bg-white/90',
  gold: 'bg-gold text-white hover:bg-gold/90 shadow-soft',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-5 py-2',
  md: 'text-sm px-7 py-3.5',
  lg: 'text-base px-9 py-4',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {children}
      </Link>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
