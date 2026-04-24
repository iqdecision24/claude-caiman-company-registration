import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { makeSlug } from '@/lib/utils';

const postSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  excerpt: z.string().nullable().optional(),
  content: z.string().min(1),
  imageUrl: z.string().url().nullable().optional(),
  published: z.boolean().optional(),
});

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const parsed = postSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const slug = makeSlug(parsed.data.slug || parsed.data.title);
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });

  const post = await prisma.post.create({
    data: {
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt ?? null,
      content: parsed.data.content,
      imageUrl: parsed.data.imageUrl ?? null,
      published: parsed.data.published ?? false,
      authorId: session.user.id,
    },
  });
  return NextResponse.json(post, { status: 201 });
}
