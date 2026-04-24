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

  return (
    <section
      id="insights"
      className="relative py-20 sm:py-24 bg-background-soft border-y border-border/70"
    >
      <Container wide>
        {/* Compact editorial masthead */}
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="chapter-num text-base">VIII.</span>
              <span className="eyebrow-alt">Insights</span>
            </div>
            <h2 className="font-display text-[34px] sm:text-[44px] leading-[1.05] text-ink text-balance">
              Dispatches from our desk.
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm text-ink hover:text-brand-dark transition-colors"
          >
            <span className="border-b border-gold/60 pb-0.5">All articles</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Three equal cards */}
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 border-t border-border pt-10">
          {posts.map((p, i) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="group flex flex-col"
            >
              {/* Image */}
              {p.imageUrl ? (
                <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px]">
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] grayscale-[8%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </figure>
              ) : (
                <div className="aspect-[4/3] w-full bg-background-muted rounded-[2px]" />
              )}

              {/* Meta row */}
              <div className="mt-5 flex items-center justify-between">
                <p className="text-[10.5px] uppercase tracking-[0.24em] text-foreground-muted">
                  {formatDate(p.createdAt)}
                </p>
                <span className="font-serif italic text-gold text-sm">
                  n° 0{i + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-3 font-display text-[22px] sm:text-[26px] leading-[1.2] text-ink text-balance transition-colors duration-500 group-hover:text-brand-dark">
                {p.title}
              </h3>

              {/* Excerpt */}
              {p.excerpt && (
                <p className="mt-3 text-sm text-foreground-muted leading-relaxed line-clamp-3">
                  {p.excerpt}
                </p>
              )}

              {/* Read link */}
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink pt-4 border-t border-border/80">
                <span className="border-b border-transparent group-hover:border-gold transition-colors duration-500 pb-0.5">
                  Read the article
                </span>
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
