'use client';
import React, { useState } from 'react';
import Split from '@uiw/react-split';
import { IoSettingsSharp } from 'react-icons/io5';
import CodeEditor from '@/Components/CodeEditor';
import SettingsCompiler from '@/Components/SettingsCompiler';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = ({ params }: { params: { id: string } }) => {
  const content = `
<div class="mx-auto bg-white shadow-lg rounded-xl p-8 text-gray-800 font-sans leading-relaxed">
  <h1 class="text-3xl font-bold text-blue-700 mb-4">D. AND, OR and Square Sum</h1>
  <section class="mb-6">
    <h2 class="text-xl font-semibold mb-2">💡 Problem Statement</h2>
    <p class="mb-2">You are given an array <span class="font-mono bg-gray-100 px-1 rounded">a</span> consisting of 
      <span class="font-mono bg-gray-100 px-1 rounded">n</span> non-negative integers: 
      <span class="font-mono bg-gray-100 px-1 rounded">a₁, a₂, ..., aₙ</span>.
    </p>
    <p class="mb-2">
      You can perform the following operation <strong>exactly 
      <span class="font-mono bg-gray-100 px-1 rounded">n</span></strong> times:
    </p>
    <ul class="list-disc pl-6 mb-2">
      <li>Choose two elements <span class="font-mono bg-gray-100 px-1 rounded">x</span> and <span class="font-mono bg-gray-100 px-1 rounded">y</span>, remove them, and insert <span class="font-mono bg-gray-100 px-1 rounded">x + y</span> back into the array.</li>
    </ul>
    <p>After <span class="font-mono bg-gray-100 px-1 rounded">n</span> operations, only <strong>one</strong> number remains. You must find the <strong>maximum possible value</strong> of the square of this number: 
      <span class="font-mono bg-gray-100 px-1 rounded">(sum)²</span>.
    </p>
  </section>

  <section class="mb-6">
    <h2 class="text-xl font-semibold mb-2">🔍 Input</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li>The first line contains an integer 
        <span class="font-mono bg-gray-100 px-1 rounded">n</span> 
        (<span class="font-mono">1 ≤ n ≤ 10⁶</span>) — the number of elements in the array.
      </li>
      <li>The second line contains 
        <span class="font-mono bg-gray-100 px-1 rounded">n</span> non-negative integers 
        <span class="font-mono bg-gray-100 px-1 rounded">a₁, a₂, ..., aₙ</span> 
        (<span class="font-mono">0 ≤ aᵢ &lt; 2³⁰</span>).
      </li>
    </ul>
  </section>

  <section class="mb-6">
    <h2 class="text-xl font-semibold mb-2">📤 Output</h2>
    <p>Print a single integer — the <strong>maximum possible square</strong> of the final number in the array.</p>
  </section>

  <section class="mb-6">
    <h2 class="text-xl font-semibold mb-2">📥 Sample Input</h2>
    <pre class="bg-gray-100 rounded p-4 text-sm font-mono">3
1 2 3</pre>
  </section>

  <section class="mb-6">
    <h2 class="text-xl font-semibold mb-2">📤 Sample Output</h2>
    <pre class="bg-gray-100 rounded p-4 text-sm font-mono">36</pre>
  </section>

  <section class="mb-6">
    <h2 class="text-xl font-semibold mb-2">🧠 Explanation</h2>
    <p class="mb-2">Binary representations:</p>
    <p class="font-mono bg-gray-100 px-2 py-1 inline-block rounded mb-2">
      1 = 01<br>
      2 = 10<br>
      3 = 11
    </p>
    <p class="mb-2">Bitwise counts:</p>
    <ul class="list-disc pl-6 mb-2">
      <li>Bit 0 (2⁰): appears in 1 and 3 → 2 times</li>
      <li>Bit 1 (2¹): appears in 2 and 3 → 2 times</li>
    </ul>
    <p class="mb-2">We can distribute the bits among the numbers to get:</p>
    <pre class="bg-gray-100 rounded p-3 text-sm font-mono">
Number 1: 1 (bit 0)
Number 2: 2 (bit 1)
Number 3: 3 (bit 0 + bit 1)
    </pre>
    <p>Total sum = 1 + 2 + 3 = 6 → 6² = <strong>36</strong>.</p>
  </section>

  <section class="mb-4">
    <h2 class="text-xl font-semibold mb-2">✅ Constraints</h2>
    <ul class="list-disc pl-6">
      <li><span class="font-mono">1 ≤ n ≤ 10⁶</span></li>
      <li><span class="font-mono">0 ≤ aᵢ &lt; 2³⁰</span></li>
    </ul>
  </section>

  <footer class="text-sm text-gray-500 pt-6 border-t mt-8">
    © Problem from 
    <a href="https://codeforces.com/contest/1368/problem/D" class="text-blue-600 hover:underline" target="_blank">
      Codeforces Round #650 (Div. 3)
    </a>
  </footer>
</div>
`;

  const [code, setcode] = useState("")
  const [theme, settheme] = useState("vs")
  const [tabsize, settabsize] = useState(4)
  const [textsize, settextsize] = useState(18)
  const [lang, setlang] = useState("cpp")
  const [setting, setsetting] = useState(false)
  const [clicked, setclicked] = useState(false)
  const [output, setoutput] = useState("")
  const [input, setinput] = useState("")
  const [stats, setstats] = useState("");
  const [eoutput, seteoutput] = useState("")
  // const res = await fetch(`https://api.example.com/problems/${id}`, {
  //   cache: 'no-store'
  // });
  // const data = await res.json();

  return (
    <>
      <SettingsCompiler open={setting} close={() => setsetting(false)} theme={theme} settheme={settheme}
        tabsize={tabsize} settabsize={settabsize} textsize={textsize} settextsize={settextsize}
      />
      <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
        <Split mode="horizontal" className='w-full h-full'>
          <div className="p-5 text-lg prose min-w-1/4 w-1/2 overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <div className="w-1/2 min-w-1/4 bg-grey-150 flex flex-col h-full">
            <div className='h-16 px-3 flex items-center justify-between'>
              <div className="flex items-center px-2">
                <select
                  disabled={clicked}
                  id="language"
                  name="language"
                  className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lang}
                  onChange={(e) => {
                    setlang(e.target.value)
                  }}
                >
                  <option value="text" disabled>Select Language</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>

                <button
                  disabled={clicked}
                  className={`mx-5 px-7 py-1.5 border-2 ${clicked ? `text-blue-400 border-blue-400` : `text-blue-600 border-blue-600 transition`} rounded transition`}
                  onClick={async () => {
                    if(lang != 'text' && !clicked) {
                      setclicked(true);
                      setoutput("")
                      try {
                        const res = await axios.post(`/api/compile/${lang.toString()}`, {
                          code: code,
                          input: input
                        });
                        if(res.data.error) {
                          setoutput(res.data.error);
                          toast.error("Compilation Error!")
                          setstats("Time Taken : N/A, Memory Used : N/A")
                        } else {
                          setoutput(res.data.output);
                          if(eoutput === res.data.output) {
                            toast.success("Output Matched!")
                          } else {
                            toast.warning("Outputs didn't Matched!")
                          }
                          setstats(`Time Taken : ${(res.data.runtime / 1000).toFixed(3)}s, Memory Used : N/A`)
                        }
                      } catch (err: any) {
                        
                      } finally {
                        setTimeout(() => {
                          setclicked(false);
                        }, 500);
                      }
                    } else {
                      setclicked(true);
                      toast.error("Select Language")
                      setTimeout(() => {
                        setclicked(false);
                      }, 500);
                    }
                  }}
                >
                  Run
                </button>
                <button
                  disabled={clicked}
                  className={`px-7 py-2 text-white ${clicked ? `bg-blue-400 transition` : `bg-blue-600 transition`} rounded transition`}
                  onClick={async () => {
                    if(lang != 'text' && !clicked) {
                      setclicked(true);
                      setoutput("")
                      try {
                        const res = await axios.post(`/api/compile/${lang.toString()}`, {
                          code: code,
                          input: input
                        });
                        if(res.data.error) {
                          setoutput(res.data.error);
                          toast.error("Compilation Error!")
                          setstats("Time Taken : N/A, Memory Used : N/A")
                        } else {
                          setoutput(res.data.output);
                          if(eoutput === res.data.output) {
                            toast.success("Output Matched!")
                          } else {
                            toast.warning("Outputs didn't Matched!")
                          }
                          setstats(`Time Taken : ${(res.data.runtime / 1000).toFixed(3)}s, Memory Used : N/A`)
                        }
                      } catch (err: any) {
                        
                      } finally {
                        setTimeout(() => {
                          setclicked(false);
                        }, 500);
                      }
                    } else {
                      setclicked(true);
                      toast.error("Select Language")
                      setTimeout(() => {
                        setclicked(false);
                      }, 500);
                    }
                  }}
                >
                  Submit
                </button>
              </div>
              <button
                onClick={() => setsetting(true)}
                className="text-black hover:text-gray-300"
              >
                <IoSettingsSharp className="text-2xl" />
              </button>
            </div>
            <CodeEditor 
              value = {code}
              onChange={setcode}
              theme = {theme}
              tabsize={tabsize}
              textsize={textsize}
              lang={lang}
            />
          </div>
        </Split>
      </div>
    </>
  );
};

export default Page;
