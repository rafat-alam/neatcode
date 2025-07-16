'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AddProblemPage() {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(800);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/problems/add_p', {
        name: name.trim(),
        difficulty,
        content: content.trim(),
      });
      toast.success("Problem added successfully")
      router.push('/problems');
    } catch {
      toast.error('Failed to add problem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-800">Add New Problem</h1>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Problem Name</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., Two Sum"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Difficulty</label>
          <input
            type="number"
            value={difficulty}
            min={800}
            max={3500}
            required
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="Describe the problem here..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Problem'}
        </button>
      </form>
    </div>
  );
}
