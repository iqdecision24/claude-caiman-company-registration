import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
    <section className="py-24 sm:py-32 bg-background-muted/40">
      <Container wide>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeading
            eyebrow="Insights"
            title={<>Latest from our desk</>}
            description="Playbooks on Cayman structures, banking and compliance — written by our partners."
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark"
          >
            All articles <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="group card-premium p-0 overflow-hidden flex flex-col"
            >
              {p.imageUrl ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] w-full bg-background-muted" />
              )}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-[0.18em] text-foreground-subtle">
                  {formatDate(p.createdAt)}
                </p>
                <h3 className="mt-3 font-display text-xl text-foreground group-hover:text-brand transition-colors">
                  {p.title}
                </h3>
                {p.excerpt && (
                  <p className="mt-3 text-foreground-muted line-clamp-3">{p.excerpt}</p>
                )}
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  Read article <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
