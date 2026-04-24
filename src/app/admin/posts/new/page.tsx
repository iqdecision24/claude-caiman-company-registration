import { PostEditor } from '@/components/admin/PostEditor';

export default function NewPostPage() {
  return (
    <div className="p-8 lg:p-12">
      <h1 className="font-display text-3xl">New post</h1>
      <div className="mt-8">
        <PostEditor />
      </div>
    </div>
  );
}
