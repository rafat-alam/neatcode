'use client';
import React, { useState } from 'react';
import Split from '@uiw/react-split';
import { IoSettingsSharp } from 'react-icons/io5';
import CodeEditor from '@/Components/CodeEditor';
import SettingsCompiler from '@/Components/SettingsCompiler';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

const Page = ({ params }: { params: { id: string } }) => {
  let { id } = params;
  const content = `
# Problem: D. AND, OR and Square Sum

**Problem Link:** [Codeforces 1368D](https://codeforces.com/problemset/problem/1368/D)

---

## 💡 Problem Statement

You are given an array \`a\` consisting of \`n\` non-negative integers:  
\`a₁, a₂, ..., aₙ\`.

You can perform the following operation **exactly \`n\` times**:

- Choose **two** elements of the array \`a\`, say \`x\` and \`y\`, **remove** them from the array, and **insert** the number \`x + y\` into the array.

After \`n\` such operations, only **one** number remains in the array. You need to find the **maximum possible value** of the square of the remaining number, i.e., \`(sum)^2\`, where \`sum\` is the final number left.

---

## 🔍 Input

- The first line contains a single integer \`n\` (\`1 \leq n \leq 10^6\`) — the number of elements in the array.  
- The second line contains \`n\` space-separated non-negative integers \`a_1, a_2, ..., a_n\` (\`0 \leq a_i < 2^{30}\`).

---

## 📤 Output

- Output **one integer** — the maximum possible value of the **square** of the final number in the array.

---

## 📘 Note

In this problem, the bitwise **OR** and **AND** properties of the numbers are key. To **maximize the square** of the final sum, you need to **reconstruct** the numbers such that the number of bits set at each position is distributed in a way to **minimize destructive interference** in summation.

Instead of performing \`n\` operations explicitly, you can calculate how many times each bit is set in the entire array, then rebuild the array so each number gets bits as equally as possible.

---

## 📥 Sample Input

\`\`\`
3  
1 2 3  
\`\`\`

---

## 📤 Sample Output

\`\`\`
36  
\`\`\`

---

## 🧠 Explanation

Initial array:  
\`a = [1, 2, 3]\` → Binary: \`01, 10, 11\`

Bitwise counts:

- Bit 0 (\`2^0\`): appears in 1, 3 → **2 times**  
- Bit 1 (\`2^1\`): appears in 2, 3 → **2 times**

We can distribute these bits over 3 numbers to make their binary representation more uniform:

- Distribute bit 0 to 2 of the numbers  
- Distribute bit 1 to 2 of the numbers

Constructed array:  
\`\`\`
Number 1: 1 (bit 0)  
Number 2: 2 (bit 1)  
Number 3: 3 (bit 0 + bit 1)  
\`\`\`

Now sum the final array: \`1 + 2 + 3 = 6\` → \`(6)^2 = 36\`.

---

## ✅ Constraints

- \`1 \leq n \leq 10^6\`  
- \`0 \leq a_i < 2^{30}\`

---

## 🔧 Implementation Tips

- Count how many times each bit is set among all numbers.  
- For each number in the new array (final numbers), simulate filling bits from the highest available pool.  
- Use an array of length \`n\` to simulate the reconstruction, ensuring fair distribution of bits.  
- Compute the sum of all reconstructed numbers and square it.

---

## 🏁 Goal

Maximize the final squared value:  
\`(x_1 + x_2 + ... + x_n)^2\`

---

> 🔗 Originally from [Codeforces Round #650 (Div. 3) - Problem D](https://codeforces.com/problemset/problem/1368/D)

`;

  const [code, setcode] = useState("")
  const [theme, settheme] = useState("vs")
  const [tabsize, settabsize] = useState(4)
  const [textsize, settextsize] = useState(18)
  const [lang, setlang] = useState("cpp")
  const [setting, setsetting] = useState(false)
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
            <ReactMarkdown
              children={content}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeHighlight]}
            />
          </div>
          <div className="w-1/2 min-w-1/4 bg-grey-150 flex flex-col h-full">
            <div className='h-12 px-3 flex justify-end items-center'>
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
