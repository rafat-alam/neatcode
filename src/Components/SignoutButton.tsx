'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function SignoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    signOut({ callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`px-7 py-1.5 border-2 rounded transition ${
        loading
          ? 'text-blue-400 border-blue-400 cursor-not-allowed'
          : 'text-blue-600 border-blue-600 hover:bg-blue-100'
      }`}
    >
      {loading ? 'Signing out...' : 'Signout'}
    </button>
  );
}
