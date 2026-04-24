'use client';

import { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  onUploaded: (url: string) => void;
  folder?: string;
  label?: React.ReactNode;
  loadingLabel?: React.ReactNode;
  className?: string;
  iconOnly?: boolean;
  maxSizeMb?: number;
};

type SignResponse = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
};

/**
 * Signed direct upload to Cloudinary.
 * - Asks /api/cloudinary/sign (admin-only) for a short-lived signature
 * - Uploads the file straight from the browser to Cloudinary
 * - Calls onUploaded(secure_url) once the CDN URL is available
 */
export function ImageUpload({
  onUploaded,
  folder = 'cayman-formation/posts',
  label,
  loadingLabel,
  className,
  iconOnly,
  maxSizeMb = 8,
}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File too large (max ${maxSizeMb} MB)`);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Only images are allowed');
      return;
    }

    setLoading(true);
    try {
      const signRes = await fetch('/api/cloudinary/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder }),
      });
      if (!signRes.ok) {
        const payload = await signRes.json().catch(() => ({}));
        throw new Error(payload.error ?? `Sign failed (${signRes.status})`);
      }
      const sig = (await signRes.json()) as SignResponse;

      const fd = new FormData();
      fd.append('file', file);
      fd.append('api_key', sig.apiKey);
      fd.append('timestamp', String(sig.timestamp));
      fd.append('folder', sig.folder);
      fd.append('signature', sig.signature);

      const up = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
        { method: 'POST', body: fd },
      );
      if (!up.ok) {
        const payload = await up.json().catch(() => ({}));
        throw new Error(payload.error?.message ?? `Upload failed (${up.status})`);
      }
      const data = (await up.json()) as { secure_url: string };
      onUploaded(data.secure_url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => input.current?.click()}
        disabled={loading}
        title={typeof label === 'string' ? label : 'Upload image'}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm text-foreground-muted transition-colors hover:border-brand/40 hover:text-brand disabled:opacity-50 disabled:cursor-not-allowed',
          iconOnly ? 'h-8 w-8' : 'px-3 py-2',
          className,
        )}
      >
        {loading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Upload size={14} />
        )}
        {!iconOnly && (
          <span>{loading ? (loadingLabel ?? 'Uploading\u2026') : (label ?? 'Upload')}</span>
        )}
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          e.target.value = '';
        }}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </>
  );
}
