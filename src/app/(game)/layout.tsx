'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Este layout protege todas as páginas dentro do grupo (game)
export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se o estado de autenticação terminou de carregar e não há token,
    // redireciona para a página de login.
    if (!state.isLoading && !state.token) {
      router.replace('/login');
    }
  }, [state.isLoading, state.token, router]);

  // Enquanto carrega, pode mostrar um ecrã de loading
  if (state.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>A carregar academia...</p>
      </div>
    );
  }

  // Se estiver autenticado, mostra o conteúdo da página do jogo
  if (state.token) {
    return <>{children}</>;
  }

  // Retorna null enquanto redireciona para evitar piscar de conteúdo
  return null;
}
