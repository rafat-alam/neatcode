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
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [timeLimit, setTimeLimit] = useState(1000);
  const [memoryLimit, setMemoryLimit] = useState(256);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/problems/add_p', {
        name: name.trim(),
        difficulty,
        content: content.trim(),
        testcases: testCases,
        timelimit: timeLimit,
        memorylimit: memoryLimit
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
        className="max-h-[calc(100vh-16rem)] w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8 space-y-6 overflow-auto"
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

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Max Time Limit (ms)</label>
          <input
            type="number"
            value={timeLimit}
            min={100}
            max={10000}
            required
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., 1000"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Max Memory Limit (MB)</label>
          <input
            type="number"
            value={memoryLimit}
            min={32}
            max={4096}
            required
            onChange={(e) => setMemoryLimit(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., 256"
          />
        </div>

        <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Test Cases</label>

        {testCases.map((testCase, index) => (
          <div key={index} className="mb-4 space-y-2">
            <div>
              <label className="block mb-1 text-sm text-gray-600">Input {index + 1}</label>
              <textarea
                value={testCase.input}
                onChange={(e) => {
                  const updated = [...testCases];
                  updated[index].input = e.target.value;
                  setTestCases(updated);
                }}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                placeholder="Test case input"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">Expected Output {index + 1}</label>
              <textarea
                value={testCase.output}
                onChange={(e) => {
                  const updated = [...testCases];
                  updated[index].output = e.target.value;
                  setTestCases(updated);
                }}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                placeholder="Expected output"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                const updated = testCases.filter((_, i) => i !== index);
                setTestCases(updated);
              }}
              className="text-red-600 text-sm hover:underline"
              disabled={testCases.length === 1}
            >
              Remove Test Case
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setTestCases([...testCases, { input: '', output: '' }])}
          className="text-blue-600 text-sm hover:underline"
        >
          + Add Another Test Case
        </button>
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
