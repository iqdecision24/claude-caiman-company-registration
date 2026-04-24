import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/ui/Container';
import { formatDate } from '@/lib/utils';

export async function LatestPosts() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];

  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  } catch {
    posts = [];
  }

  if (!posts.length) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="relative py-28 sm:py-40 bg-background-soft">
      <Container wide>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="chapter-num text-base">VIII.</span>
              <span className="eyebrow-alt">Insights</span>
            </div>
            <h2 className="font-display text-display-lg text-ink text-balance">
              Dispatches from our desk.
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-brand-dark transition-colors"
          >
            All articles <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <Link href={`/blog/${featured.slug}`} className="group lg:col-span-7 block">
            <figure className="relative aspect-[16/11] w-full overflow-hidden rounded-[3px]">
              {featured.imageUrl ? (
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] grayscale-[10%] group-hover:grayscale-0"
                />
              ) : (
                <div className="h-full w-full bg-background-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            </figure>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.28em] text-foreground-muted">
                {formatDate(featured.createdAt)} · Feature
              </p>
              <span className="font-serif italic text-gold">n° 01</span>
            </div>
            <h3 className="mt-4 font-display text-3xl sm:text-[40px] leading-[1.1] text-ink text-balance transition-colors duration-500 group-hover:text-brand-dark">
              {featured.title}
            </h3>
            {featured.excerpt && (
              <p className="mt-4 text-foreground-muted max-w-xl leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>
            )}
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              Read the article
              <ArrowUpRight
                size={14}
                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>

          <div className="lg:col-span-5 grid gap-8">
            {rest.map((p, i) => (
              <Link
                href={`/blog/${p.slug}`}
                key={p.id}
                className="group grid grid-cols-[112px_1fr] gap-5 items-start pb-8 border-b border-border last:border-none last:pb-0"
              >
                {p.imageUrl ? (
                  <div className="relative aspect-square w-28 overflow-hidden rounded-[3px]">
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-28 bg-background-muted rounded-[3px]" />
                )}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-foreground-muted">
                    {formatDate(p.createdAt)} · n° 0{i + 2}
                  </p>
                  <h4 className="mt-2 font-display text-xl leading-tight text-ink transition-colors duration-500 group-hover:text-brand-dark">
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
