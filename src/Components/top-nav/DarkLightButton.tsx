'use client';

import { useEffect, useState } from 'react';

export default function DarkLightButton() {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {}
  }, []);

  const toggleTheme = () => {
    setLoading(true);
    try {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);

      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      document.dispatchEvent(new Event('themechange'));
    } catch {}
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={loading}
      className={`px-7 py-1.5 border-2 rounded transition ${
        loading
          ? 'text-blue-400 border-blue-400 cursor-not-allowed'
          : 'text-blue-600 border-blue-600 hover:bg-blue-100'
      }`}
    >
      {loading ? 'Wait...' : 'Change Theme'}
    </button>
  );
}
