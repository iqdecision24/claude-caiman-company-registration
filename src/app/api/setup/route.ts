import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

// Idempotent bootstrap endpoint.
// - Creates (or refreshes) the admin user from ADMIN_EMAIL / ADMIN_PASSWORD.
// - Seeds 3 demo posts only if the blog is empty.
// - Safe to call multiple times. Requires the request to match AUTH_SECRET via
//   the ?secret= query param OR the Authorization: Bearer <secret> header.

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getSecretFromRequest(req: Request): string | null {
  const url = new URL(req.url);
  const q = url.searchParams.get('secret');
  if (q) return q;
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

async function runSetup(req: Request) {
  const expected = process.env.AUTH_SECRET ?? process.env.SETUP_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'Server missing AUTH_SECRET / SETUP_SECRET env var' },
      { status: 500 },
    );
  }
  const provided = getSecretFromRequest(req);
  if (provided !== expected) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const email = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD ?? 'changeme';
  if (password === 'changeme') {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Refusing to seed with the default password. Set ADMIN_PASSWORD in Vercel env and redeploy.',
      },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      name: 'Administrator',
      passwordHash,
      role: 'ADMIN',
    },
  });

  // Seed demo posts only if the blog is empty.
  const existingPosts = await prisma.post.count();
  let seededPosts = 0;

  if (existingPosts === 0) {
    const samplePosts = [
      {
        slug: 'why-cayman-islands',
        title: 'Why the Cayman Islands are the gold standard for offshore companies',
        excerpt:
          'A deep dive into the structural, fiscal and reputational advantages that have made Cayman the jurisdiction of choice for global capital.',
        content:
          '<p>The Cayman Islands combine <strong>0% corporate tax</strong>, political stability and a sophisticated regulatory framework aligned with OECD and FATF standards. For international holding structures, investment funds and fintech ventures, the jurisdiction offers unmatched credibility.</p><p>In this article we walk through the most common vehicles — Exempted Company, LLC, SPC — and when each is the right fit.</p>',
        imageUrl:
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
        published: true,
      },
      {
        slug: 'exempted-company-vs-llc',
        title: 'Exempted Company vs. Cayman LLC: which vehicle suits your business?',
        excerpt:
          'Both structures grant flexibility and tax neutrality, but differ in governance, reporting and investor expectations.',
        content:
          '<p>The <em>Exempted Company</em> remains the classic choice for funds and holding structures, while the <em>Cayman LLC</em> echoes the familiar Delaware LLC model for US-centric deals.</p><p>We compare formation timelines, costs, and real-world use cases.</p>',
        imageUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
        published: true,
      },
      {
        slug: 'opening-a-cayman-bank-account',
        title: 'Opening a bank account for a Cayman company in 2026',
        excerpt:
          'A practical playbook — what banks expect, KYC checklist, timelines and alternatives (EMIs, prime brokers).',
        content:
          '<p>Banking is the single biggest bottleneck for offshore entities. This guide lists every document you will need, how to present the source of funds, and which institutions currently onboard Cayman structures.</p>',
        imageUrl:
          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
        published: true,
      },
    ];

    for (const post of samplePosts) {
      await prisma.post.create({ data: { ...post, authorId: admin.id } });
    }
    seededPosts = samplePosts.length;
  }

  return NextResponse.json({
    ok: true,
    admin: { email: admin.email, id: admin.id },
    posts: { existing: existingPosts, seeded: seededPosts },
    message:
      'Setup complete. You can now sign in at /login with ADMIN_EMAIL / ADMIN_PASSWORD.',
  });
}

export async function GET(req: Request) {
  try {
    return await runSetup(req);
  } catch (err) {
    console.error('setup failed', err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message ?? 'Setup failed' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  return GET(req);
}
