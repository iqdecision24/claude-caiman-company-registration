'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
      source: 'contact-page',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Network error');
      setStatus('ok');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('err');
      setError((err as Error).message);
    }
  }

  if (status === 'ok') {
    return (
      <div className="flex flex-col items-center text-center py-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-5 font-display text-2xl">Thank you</h3>
        <p className="mt-3 max-w-md text-foreground-muted">
          Your request has been received. A senior partner will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field name="name" label="Full name" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Phone (optional)" type="tel" />
      <Field name="message" label="How can we help?" multiline required />

      {status === 'err' && (
        <p className="text-sm text-red-600">{error ?? 'Something went wrong. Try again.'}</p>
      )}

      <div className="mt-2 flex items-center gap-3">
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send request'}
          <Send size={16} />
        </Button>
        <p className="text-xs text-foreground-subtle">We respond within one business day.</p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  multiline,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
}) {
  const cls =
    'w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all';
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-subtle">
        {label}
        {required && ' *'}
      </span>
      {multiline ? (
        <textarea name={name} required={required} rows={5} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}
