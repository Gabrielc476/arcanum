import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LoginForm />
      <p className="mt-4 text-sm">
        Não tem uma conta?{' '}
        <Link href="/register" className="font-semibold text-blue-500 hover:underline">
          Registe-se
        </Link>
      </p>
    </div>
  );
}
