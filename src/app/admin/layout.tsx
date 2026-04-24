import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/lib/auth';
import { LayoutDashboard, FileText, LogOut, ExternalLink } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/admin');

  return (
    <div className="min-h-screen bg-background-soft flex">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-white">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white font-display">
              C
            </span>
            <span className="font-display text-lg">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/admin" icon={<LayoutDashboard size={16} />} label="Dashboard" />
          <NavItem href="/admin/posts" icon={<FileText size={16} />} label="Posts" />
          <NavItem href="/" icon={<ExternalLink size={16} />} label="View site" />
        </nav>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
          className="p-4 border-t border-border"
        >
          <div className="mb-3 text-xs text-foreground-subtle">
            Signed in as <span className="text-foreground">{session.user.email}</span>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-brand"
          >
            <LogOut size={14} /> Sign out
          </button>
        </form>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground-muted hover:bg-background-muted hover:text-brand transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}
