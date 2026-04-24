import type { Metadata } from 'next';
import { LoginForm } from '@/components/LoginForm';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <section className="min-h-[70vh] flex items-center py-20">
      <Container>
        <div className="mx-auto max-w-md card-premium">
          <h1 className="font-display text-3xl">Administrator sign in</h1>
          <p className="mt-2 text-foreground-muted">
            Restricted area for authorised staff.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
