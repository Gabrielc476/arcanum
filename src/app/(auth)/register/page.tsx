import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <RegisterForm />
       <p className="mt-4 text-sm">
        Já tem uma conta?{' '}
        <Link href="/login" className="font-semibold text-blue-500 hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  );
}
