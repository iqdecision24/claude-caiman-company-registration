'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Bold, Italic, List, ListOrdered, Heading2, Heading3,
  Quote, Undo2, Redo2, Link as LinkIcon, Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { makeSlug } from '@/lib/utils';

type Initial = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  published: boolean;
};

export function PostEditor({ post }: { post?: Initial }) {
  const router = useRouter();
  const editing = !!post;

  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(editing);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl ?? '');
  const [published, setPublished] = useState(post?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-brand underline' } }),
      Image,
    ],
    content: post?.content ?? '<p></p>',
    editorProps: {
      attributes: {
        class:
          'prose-article min-h-[320px] rounded-2xl border border-border bg-white px-5 py-4 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10',
      },
    },
  });

  async function save() {
    if (!editor) return;
    setSaving(true);
    setError(null);

    const payload = {
      title,
      slug: slug.trim() || makeSlug(title),
      excerpt: excerpt || null,
      content: editor.getHTML(),
      imageUrl: imageUrl || null,
      published,
    };

    const res = await fetch(editing ? `/api/posts/${post!.id}` : '/api/posts', {
      method: editing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Failed to save');
      return;
    }

    router.push('/admin/posts');
    router.refresh();
  }

  const inputCls =
    'w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all';

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <label className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-subtle">
          Title
        </label>
        <input
          className={inputCls}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(makeSlug(e.target.value));
          }}
          placeholder="Post title"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-subtle">
          Slug
        </label>
        <input
          className={inputCls}
          value={slug}
          onChange={(e) => {
            setSlug(makeSlug(e.target.value));
            setSlugTouched(true);
          }}
          placeholder="my-first-post"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-subtle">
          Excerpt
        </label>
        <textarea
          className={inputCls}
          rows={2}
          value={excerpt ?? ''}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short summary for the blog index (1–2 sentences)"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-subtle">
          Cover image URL
        </label>
        <input
          className={inputCls}
          value={imageUrl ?? ''}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://…"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-subtle">
          Content
        </label>

        {editor && (
          <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-white p-2 shadow-soft">
            <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} label="Bold"><Bold size={14} /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} label="Italic"><Italic size={14} /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} label="H2"><Heading2 size={14} /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} label="H3"><Heading3 size={14} /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} label="Bullet list"><List size={14} /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} label="Numbered list"><ListOrdered size={14} /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} label="Quote"><Quote size={14} /></ToolbarBtn>
            <ToolbarBtn
              onClick={() => {
                const url = prompt('URL?');
                if (!url) return;
                editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
              }}
              active={editor.isActive('link')}
              label="Link"
            >
              <LinkIcon size={14} />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => {
                const url = prompt('Image URL?');
                if (!url) return;
                editor.chain().focus().setImage({ src: url }).run();
              }}
              label="Image"
            >
              <ImageIcon size={14} />
            </ToolbarBtn>
            <div className="mx-1 w-px self-stretch bg-border" />
            <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} label="Undo"><Undo2 size={14} /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} label="Redo"><Redo2 size={14} /></ToolbarBtn>
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      <label className="inline-flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
        />
        Publish
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={saving || !title}>
          {saving ? 'Saving…' : editing ? 'Update post' : 'Create post'}
        </Button>
        <Button variant="secondary" onClick={() => router.push('/admin/posts')}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function ToolbarBtn({
  onClick,
  children,
  active,
  label,
}: {
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-background-muted hover:text-brand ${active ? 'bg-brand/10 text-brand' : ''}`}
    >
      {children}
    </button>
  );
}
