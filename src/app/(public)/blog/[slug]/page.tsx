import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/ui/Container';
import { formatDate } from '@/lib/utils';

export const revalidate = 60;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: 'Article not found' };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: { images: post.imageUrl ? [post.imageUrl] : undefined },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();

  return (
    <article className="py-20">
      <Container>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-brand"
        >
          <ChevronLeft size={16} /> Back to insights
        </Link>

        <header className="mt-8">
          <p className="eyebrow">{formatDate(post.createdAt)}</p>
          <h1 className="mt-3 font-display text-display-md sm:text-display-lg">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-5 text-lg text-foreground-muted leading-relaxed">{post.excerpt}</p>
          )}
        </header>

        {post.imageUrl && (
          <div className="relative aspect-[16/9] mt-10 overflow-hidden rounded-3xl border border-border shadow-soft">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
              priority
            />
          </div>
        )}

        <div
          className="prose-article mt-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Container>
    </article>
  );
}
