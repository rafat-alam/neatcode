'use client'
import ClientCompiler from '@/Components/ClientCompiler';
import { SessionProvider } from 'next-auth/react';

export default function CompilerPage() {
  return (
    <SessionProvider>
      <ClientCompiler />
    </SessionProvider>
  );
}