'use client'
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

const HomePage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="h-[calc(100vh-4rem)] bg-white text-gray-900 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 overflow-auto transition-colors duration-300">
      <Head>
        <title>NeatCode - Competitive Programming Platform</title>
      </Head>
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive"></Script>

      {/* Hero Section */}
      <section className="pt-36 pb-28 px-6 relative overflow-hidden">
        <div className="absolute -top-64 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Challenge
              </span>
              <br />
              Your Coding Skills
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xl max-w-lg">
              Solve algorithmic problems, compete in contests, and climb the ranks on NeatCode - the competitive programming platform for passionate coders.
            </p>
            <div className="flex space-x-4 pt-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-md transition-colors font-medium">
                Join Contest
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:text-blue-400 rounded-md transition-colors font-medium">
                Practice Problems
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl p-6 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex text-xs text-gray-500 mb-4">
                <div className="mr-4">main.cpp</div>
                <div className="mr-4">solution.py</div>
                <div className="mr-4">input.txt</div>
              </div>
              <pre className="bg-gray-200 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto text-sm font-mono">
{`#include <bits/stdc++.h>
using namespace std;

void solve() {
  int n; cin >> n;
  vector<int> a(n);
  for (int &x : a) cin >> x;

  int ans = 0;
  for (int i = 0; i < n; i++) {
    for (int j = i+1; j < n; j++) {
      ans = max(ans, a[i] & a[j]);
    }
  }
  cout << ans << endl;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int t; cin >> t;
  while (t--) solve();

  return 0;
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Contest */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-800/50 dark:to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Featured Contest</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Don&apos;t miss the upcoming coding challenge</p>

          <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-8 backdrop-blur-sm hover:border-blue-500 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-2">NeatCode Monthly #5</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A 3-hour competitive programming contest with 8 problems of varying difficulty.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-blue-500">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Sat, May 20 • 3:00 PM</span>
                  </div>
                  <div className="flex items-center text-green-500">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Registration Open</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-2">Duration</div>
                <div className="text-xl font-bold">3 Hours</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-2">Participants</div>
                <div className="text-xl font-bold">3,200+</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-md transition-colors font-medium">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Problem Categories</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Practice problems from various topics to improve your competitive programming skills.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Data Structures", problems: "540+", bg: "bg-gradient-to-br from-blue-500 to-blue-700" },
              { name: "Algorithms", problems: "780+", bg: "bg-gradient-to-br from-purple-500 to-purple-700" },
              { name: "Dynamic Programming", problems: "320+", bg: "bg-gradient-to-br from-pink-500 to-pink-700" },
              { name: "Graph Theory", problems: "450+", bg: "bg-gradient-to-br from-teal-500 to-teal-700" },
              { name: "Math", problems: "610+", bg: "bg-gradient-to-br from-yellow-500 to-yellow-600" },
              { name: "Greedy", problems: "290+", bg: "bg-gradient-to-br from-red-500 to-red-600" },
              { name: "Binary Search", problems: "230+", bg: "bg-gradient-to-br from-green-500 to-green-600" },
              { name: "Bit Manipulation", problems: "180+", bg: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
            ].map((category, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden h-40">
                <div className={`absolute inset-0 ${category.bg} group-hover:opacity-90 transition-opacity`}></div>
                <div className="relative p-6 h-full flex flex-col justify-between text-white">
                  <h3 className="text-xl font-bold z-10">{category.name}</h3>
                  <div className="flex justify-between items-end">
                    <span className="text-sm opacity-90">{category.problems} problems</span>
                    <button className="px-3 py-1 bg-black/20 hover:bg-black/30 rounded-md backdrop-blur-sm text-sm transition-colors">
                      Practice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Coders Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Top Coders</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Top performers in recent contests and their achievements.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                  <th className="pb-4 font-medium pl-4">Rank</th>
                  <th className="pb-4 font-medium">Coder</th>
                  <th className="pb-4 font-medium text-right pr-4">Rating</th>
                  <th className="pb-4 font-medium text-right pr-4">Solved</th>
                  <th className="pb-4 font-medium text-right pr-4">Contests</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, name: "tourist", rating: 3724, solved: 1850, contests: 320, color: "text-yellow-400" },
                  { rank: 2, name: "Um_nik", rating: 3612, solved: 1742, contests: 298, color: "text-red-400" },
                  { rank: 3, name: "Benq", rating: 3588, solved: 1680, contests: 285, color: "text-blue-400" },
                  { rank: 4, name: "jiangly", rating: 3567, solved: 1623, contests: 276, color: "text-green-400" },
                  { rank: 5, name: "Petr", rating: 3542, solved: 1589, contests: 269, color: "text-purple-400" },
                ].map((coder, index) => (
                  <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 pl-4 text-lg font-bold">{coder.rank}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                          <span className="text-xs uppercase">{coder.name.charAt(0)}</span>
                        </div>
                        <span className={coder.color}>{coder.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right pr-4 font-bold">{coder.rating}</td>
                    <td className="py-4 text-right pr-4">{coder.solved}</td>
                    <td className="py-4 text-right pr-4">{coder.contests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Continue with CTA, Footer, etc. — Apply dark: as shown above */}
    </div>
  );
};

export default HomePage;
