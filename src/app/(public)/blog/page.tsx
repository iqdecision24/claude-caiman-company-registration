import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/ui/Container';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Analysis, playbooks and updates on Cayman Islands corporate structures, banking and compliance.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    posts = [];
  }

  return (
    <>
      {/* Editorial header with h1 */}
      <section className="relative pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <Container wide className="relative">
          <div className="mb-10 flex items-center justify-between gap-6 border-b border-border/70 pb-5">
            <div className="flex items-baseline gap-3">
              <span className="chapter-num text-lg">I.</span>
              <span className="text-[11px] uppercase tracking-[0.32em] text-foreground-muted">
                Insights
              </span>
            </div>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.32em] text-foreground-subtle">
              Playbooks · Comparisons · Updates
            </span>
          </div>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="lg:col-span-8 font-display text-display-xl text-ink text-balance">
              Knowledge base for{' '}
              <span className="font-serif italic text-gold">offshore</span> founders.
            </h1>
            <p className="lg:col-span-4 text-foreground-muted leading-relaxed">
              Guides, comparisons and updates on Cayman Islands structures, banking and
              compliance — written by our partners.
            </p>
          </div>
        </Container>
      </section>

      {/* Articles grid */}
      <section className="py-16 sm:py-24 bg-background-soft border-y border-border">
        <Container wide>
          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif italic text-gold text-lg">Forthcoming</p>
              <p className="mt-3 text-foreground-muted">
                Articles are in preparation. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 border-t border-border pt-10">
              {posts.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col"
                >
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

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-[10.5px] uppercase tracking-[0.24em] text-foreground-muted">
                      {formatDate(p.createdAt)}
                    </p>
                    <span className="font-serif italic text-gold text-sm">
                      n° {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-[22px] sm:text-[26px] leading-[1.2] text-ink text-balance transition-colors duration-500 group-hover:text-brand-dark">
                    {p.title}
                  </h2>

                  {p.excerpt && (
                    <p className="mt-3 text-sm text-foreground-muted leading-relaxed line-clamp-3">
                      {p.excerpt}
                    </p>
                  )}

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
          )}
        </Container>
      </section>
    </>
  );
}
