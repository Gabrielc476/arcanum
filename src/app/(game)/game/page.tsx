'use client';

import { useAuth } from '@/hooks/useAuth';

export default function GamePage() {
  const { state, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Bem-vindo à Academia Arcanum</h1>
      {state.player && <p className="mt-2">Mago: {state.player.name}</p>}
      <button
        onClick={logout}
        className="mt-6 rounded bg-red-500 px-4 py-2 text-white"
      >
        Sair
      </button>
    </div>
  );
}
