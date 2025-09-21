'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth'; // Usamos o nosso novo hook

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, state } = useAuth(); // A função register virá do nosso contexto

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      // Adicionar feedback de erro aqui se desejar
      return;
    }
    register({ name, email, password });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>Entre na Academia Arcanum hoje mesmo.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome de Mago</Label>
              <Input
                id="name"
                placeholder="Seu nome de utilizador"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha Secreta</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {state.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={state.isLoading}>
            {state.isLoading ? 'A Registar...' : 'Registar'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
