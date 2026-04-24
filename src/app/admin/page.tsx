import Link from 'next/link';
import { FileText, FileCheck2, Clock } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [total, published, drafts] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
  ]).catch(() => [0, 0, 0]);

  const stats = [
    { label: 'Total posts', value: total, icon: FileText },
    { label: 'Published', value: published, icon: FileCheck2 },
    { label: 'Drafts', value: drafts, icon: Clock },
  ];

  return (
    <div className="p-8 lg:p-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl">Dashboard</h1>
          <p className="mt-1 text-foreground-muted">Content overview.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm text-white hover:bg-brand-dark shadow-soft"
        >
          New post
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground-subtle">{label}</span>
              <Icon size={18} className="text-brand" />
            </div>
            <div className="mt-4 font-display text-4xl">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
