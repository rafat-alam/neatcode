'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ManageProblemPage() {
  const [id, setId] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(800);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [timeLimit, setTimeLimit] = useState(1000);
  const [memoryLimit, setMemoryLimit] = useState(256);

  const fetchProblem = async () => {
    if (id === '') return alert("Enter a problem ID");

    setLoading(true);
    try {
      const res = await axios.get(`/api/problems/${id}`);
      const prob = res.data.problem;
      setName(prob.name);
      setDifficulty(prob.difficulty);
      setContent(prob.content);
      setTestCases(prob.testcases);
      setTimeLimit(prob.timelimit);
      setMemoryLimit(prob.memorylimit);
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
      console.log(memoryLimit)
      await axios.post('/api/problems/update_p', {
        num: Number(id),
        name: name.trim(),
        difficulty,
        content: content.trim(),
        testcases: testCases,
        timelimit: timeLimit,
        memorylimit: memoryLimit,
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
      <div className="max-h-[calc(100vh-16rem)] w-full max-w-5xl bg-white shadow-md rounded-xl p-6 space-y-6 overflow-auto">
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
