'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ManageProblemPage() {
  const [id, setId] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(800);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProblem = async () => {
    if (id === '') return alert("Enter a problem ID");

    setLoading(true);
    try {
      const res = await axios.get(`/api/problems/${id}`);
      console.log(res)
      const prob = res.data.problem;

      if (!prob) {
        alert("Problem not found. You can create it.");
        setName('');
        setDifficulty(800);
        setContent('');
      } else {
        setName(prob.name);
        setDifficulty(prob.difficulty);
        setContent(prob.content);
      }
    } catch (err) {
      console.error(err);
      alert("Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const saveProblem = async () => {
    if (id === '') return alert("ID required");
    if (!name.trim() || !content.trim()) return alert("Name and content required");

    setLoading(true);
    try {
      await axios.post('/api/problems/update_p', {
        num: Number(id),
        name: name.trim(),
        difficulty,
        content: content.trim()
      });

      alert("Saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Update Problem</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Problem ID</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={id}
              onChange={(e) => setId(Number(e.target.value))}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Enter ID to update"
            />
            <button
              type="button"
              onClick={fetchProblem}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Load
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Problem Title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <input
            type="number"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full border px-4 py-2 rounded-lg"
            min={800}
            max={3500}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 border px-4 py-2 rounded-lg resize-none"
            placeholder="Problem statement..."
          />
        </div>

        <button
          onClick={saveProblem}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Problem'}
        </button>
      </div>
    </div>
  );
}
