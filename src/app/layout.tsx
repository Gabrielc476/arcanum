import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Arcanum Academia',
  description: 'O Legado do Mago',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        {/* O AuthProvider envolve toda a aplicação */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
