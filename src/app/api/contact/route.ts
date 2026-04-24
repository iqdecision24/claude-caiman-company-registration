import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().min(5),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  const parsed = contactSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const request = await prisma.contactRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        message: parsed.data.message,
        source: parsed.data.source || null,
      },
    });
    return NextResponse.json({ ok: true, id: request.id });
  } catch (err) {
    console.error('contact create failed', err);
    return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
  }
}
