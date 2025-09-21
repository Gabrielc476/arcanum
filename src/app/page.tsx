'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.isLoading) {
      if (state.token) {
        router.replace('/game'); // Se estiver logado, vai para o jogo
      } else {
        router.replace('/login'); // Se não, vai para o login
      }
    }
  }, [state.isLoading, state.token, router]);

  // Mostra uma mensagem de loading enquanto verifica o estado
  return (
    <div className="flex h-screen items-center justify-center">
      <p>A carregar...</p>
    </div>
  );
}
