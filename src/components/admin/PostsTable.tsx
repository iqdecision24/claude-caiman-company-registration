'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';

type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: Date;
};

export function PostsTable({ posts }: { posts: Post[] }) {
  const router = useRouter();

  async function onDelete(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) router.refresh();
    else alert('Failed to delete');
  }

  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-border bg-white p-12 text-center text-foreground-muted shadow-soft">
        No posts yet. Create your first article.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
      <table className="min-w-full">
        <thead className="border-b border-border bg-background-soft text-left text-xs uppercase tracking-[0.14em] text-foreground-subtle">
          <tr>
            <th className="px-5 py-3">Title</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Created</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-b border-border last:border-none">
              <td className="px-5 py-4">
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-foreground-subtle">/{p.slug}</div>
              </td>
              <td className="px-5 py-4">
                {p.published ? (
                  <span className="inline-flex rounded-full bg-brand/10 text-brand px-2.5 py-1 text-xs font-medium">
                    Published
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-foreground-subtle/10 text-foreground-subtle px-2.5 py-1 text-xs font-medium">
                    Draft
                  </span>
                )}
              </td>
              <td className="px-5 py-4 text-sm text-foreground-muted">
                {formatDate(p.createdAt)}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  {p.published && (
                    <Link
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:border-brand/40 hover:text-brand"
                      title="View"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/posts/${p.id}/edit`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:border-brand/40 hover:text-brand"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:border-red-300 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
