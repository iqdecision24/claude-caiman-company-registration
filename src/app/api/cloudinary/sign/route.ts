import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { cloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

// Returns a short-lived signature the browser uses to POST an image directly
// to Cloudinary. Only authenticated admins can obtain a signature.
//
// Client usage:
//   const { cloudName, apiKey, timestamp, folder, signature } =
//     await (await fetch('/api/cloudinary/sign', { method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ folder: 'cayman-formation/posts' }) })).json();
//
//   const fd = new FormData();
//   fd.append('file', file);
//   fd.append('api_key', apiKey);
//   fd.append('timestamp', String(timestamp));
//   fd.append('folder', folder);
//   fd.append('signature', signature);
//   const up = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//     method: 'POST', body: fd,
//   });
//   const { secure_url } = await up.json();

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  folder: z.string().min(1).max(120).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        error:
          'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in env.',
      },
      { status: 500 },
    );
  }

  const json = await req.json().catch(() => ({}));
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const folder = parsed.data.folder ?? 'cayman-formation/posts';
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return NextResponse.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    timestamp,
    folder,
    signature,
  });
}
