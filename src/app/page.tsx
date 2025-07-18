import React from 'react';
import Head from 'next/head';

const HomePage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 overflow-auto">
      <Head>
        <title>NeatCode - Competitive Programming Platform</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

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
            <p className="text-gray-400 text-xl max-w-lg">
              Solve algorithmic problems, compete in contests, and climb the ranks on NeatCode - the competitive programming platform for passionate coders.
            </p>
            <div className="flex space-x-4 pt-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-md transition-colors font-medium">
                Join Contest
              </button>
              <button className="px-6 py-3 border border-gray-600 hover:border-blue-400 hover:text-blue-400 rounded-md transition-colors font-medium">
                Practice Problems
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm overflow-hidden">
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
              <pre className="bg-gray-900 p-6 rounded-lg overflow-x-auto text-sm font-mono">
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
      <section className="py-16 px-6 bg-gradient-to-b from-gray-800/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Featured Contest</h2>
          <p className="text-gray-400 mb-8">Don't miss the upcoming coding challenge</p>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm hover:border-blue-500 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-2">NeatCode Monthly #5</h3>
                <p className="text-gray-400 mb-4">
                  A 3-hour competitive programming contest with 8 problems of varying difficulty.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-blue-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Sat, May 20 • 3:00 PM</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Registration Open</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Duration</div>
                <div className="text-xl font-bold">3 Hours</div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Participants</div>
                <div className="text-xl font-bold">3,200+</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700">
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
            <p className="text-gray-400 max-w-2xl mx-auto">
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
                <div className="relative p-6 h-full flex flex-col justify-between">
                  <h3 className="text-xl font-bold z-10">{category.name}</h3>
                  <div className="flex justify-between items-end">
                    <span className="text-sm opacity-80">{category.problems} problems</span>
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
      <section className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Top Coders</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Top performers in recent contests and their achievements.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-gray-700 text-gray-400">
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
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 pl-4 text-lg font-bold">{coder.rank}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
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

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Compete</span>?
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Join the NeatCode community and test your coding skills against the best programmers worldwide.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-colors font-bold text-lg shadow-lg hover:shadow-blue-500/30">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Wave Footer */}
      <div className="relative">
        <svg 
          className="w-full h-32 md:h-48 text-gray-900" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="currentColor"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.27,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="currentColor"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold">NC</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  NeatCode
                </span>
              </div>
              <p className="text-gray-400">
                The competitive programming platform for passionate coders to compete and grow.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contests</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Problems</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Leaderboard</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Problem Set</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} NeatCode. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
