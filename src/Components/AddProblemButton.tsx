'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddProblemButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    setLoading(true);
    router.push('/problems/add_p');
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className={`px-7 py-1.5 border-2 rounded transition ${
        loading
          ? 'text-blue-400 border-blue-400 cursor-not-allowed'
          : 'text-blue-600 border-blue-600 hover:bg-blue-100'
      }`}
    >
      {loading ? 'Wait...' : 'Add Problem'}
    </button>
  );
}
