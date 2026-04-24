'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') ?? '/admin';
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await signIn('credentials', {
      email: String(fd.get('email') ?? ''),
      password: String(fd.get('password') ?? ''),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError('Invalid email or password');
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  const cls =
    'w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all';

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-subtle">Email</span>
        <input name="email" type="email" required className={cls} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-subtle">Password</span>
        <input name="password" type="password" required className={cls} />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading} size="lg">
        {loading ? 'Signing in…' : 'Sign in'}
        <LogIn size={16} />
      </Button>
    </form>
  );
}
