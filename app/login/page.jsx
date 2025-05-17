'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <button
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign In with GitHub
      </button>
    </main>
  );
}
