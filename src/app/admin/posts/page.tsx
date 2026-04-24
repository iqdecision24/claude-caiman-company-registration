import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus } from 'lucide-react';
import { PostsTable } from '@/components/admin/PostsTable';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  try {
    posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  } catch {
    posts = [];
  }

  return (
    <div className="p-8 lg:p-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl">Posts</h1>
          <p className="mt-1 text-foreground-muted">Manage blog articles.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm text-white hover:bg-brand-dark shadow-soft"
        >
          <Plus size={16} /> New post
        </Link>
      </div>

      <div className="mt-10">
        <PostsTable posts={posts} />
      </div>
    </div>
  );
}
