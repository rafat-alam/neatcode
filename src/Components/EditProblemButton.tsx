'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditProblemButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    setLoading(true);
    router.push('/problems/update_p');
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <button
      onClick={handleEdit}
      disabled={loading}
      className={`px-7 py-1.5 border-2 rounded transition ${
        loading
          ? 'text-blue-400 border-blue-400 cursor-not-allowed'
          : 'text-blue-600 border-blue-600 hover:bg-blue-100'
      }`}
    >
      {loading ? 'Wait...' : 'Edit Problem'}
    </button>
  );
}
