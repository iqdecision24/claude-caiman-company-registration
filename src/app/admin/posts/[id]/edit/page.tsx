import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PostEditor } from '@/components/admin/PostEditor';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="p-8 lg:p-12">
      <h1 className="font-display text-3xl">Edit post</h1>
      <div className="mt-8">
        <PostEditor
          post={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            imageUrl: post.imageUrl,
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
