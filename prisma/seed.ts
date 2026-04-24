import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD ?? 'changeme';
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

  console.log(`\u2713 Admin ready: ${admin.email}`);

  const samplePosts = [
    {
      slug: 'why-cayman-islands',
      title: 'Why the Cayman Islands are the gold standard for offshore companies',
      excerpt:
        'A deep dive into the structural, fiscal and reputational advantages that have made Cayman the jurisdiction of choice for global capital.',
      content:
        '<p>The Cayman Islands combine <strong>0% corporate tax</strong>, political stability and a sophisticated regulatory framework aligned with OECD and FATF standards. For international holding structures, investment funds and fintech ventures, the jurisdiction offers unmatched credibility.</p><p>In this article we walk through the most common vehicles \u2014 Exempted Company, LLC, SPC \u2014 and when each is the right fit.</p>',
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
        'A practical playbook \u2014 what banks expect, KYC checklist, timelines and alternatives (EMIs, prime brokers).',
      content:
        '<p>Banking is the single biggest bottleneck for offshore entities. This guide lists every document you will need, how to present the source of funds, and which institutions currently onboard Cayman structures.</p>',
      imageUrl:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
      published: true,
    },
  ];

  for (const post of samplePosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: { ...post, authorId: admin.id },
    });
  }

  console.log(`\u2713 Seeded ${samplePosts.length} posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
