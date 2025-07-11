'use client'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [code, setcode] = useState("")
  const [input, setinput] = useState("")
  const [eoutput, seteoutput] = useState("")
  const [lang, setlang] = useState("")
  const [output, setoutput] = useState("")
  const [stats, setstats] = useState("")
  const [linecount, setlinecount] = useState(1);

  const leftRef = useRef<HTMLTextAreaElement>(null);
  const rightRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    const syncScroll = (from: HTMLTextAreaElement, to: HTMLTextAreaElement) => {
      return () => {
        to.scrollTop = from.scrollTop;
      };
    };

    if (left && right) {
      left.addEventListener('scroll', syncScroll(left, right));
      right.addEventListener('scroll', syncScroll(right, left));
    }

    return () => {
      if (left && right) {
        left.removeEventListener('scroll', syncScroll(left, right));
        right.removeEventListener('scroll', syncScroll(right, left));
      }
    };
  }, []);

  return (
    <>
      <div className='h-[calc(100vh-4rem)] flex'>
        <div className='p-5 w-1/2 flex'>
          <textarea 
            ref={leftRef}
            spellCheck={false}
            className='font-mono w-1/12 h-full appearance-none border-2 border-r-0 outline-none shadow-none bg-gray-100 resize-none text-right overflow-hidden'
            value={Array.from({ length: linecount }, (_, i) => `${i + 1}`).join('. \n') + ". "}
            disabled
          />
          <textarea
            ref={rightRef}
            spellCheck={false}
            className='font-mono w-full h-full appearance-none border-2 border-l-0 outline-none shadow-none bg-transparent  resize-none'
            value={code}
            onChange={
              (e) => {
                if(lang.length) {
                  setcode(e.target.value)
                  setlinecount(e.target.value === "" ? 1 : e.target.value.split('\n').length)
                } else {
                  toast.error("Select Language")
                }
              }
          }/>
        </div>
        <div className='flex-1 p-5 flex flex-col'>
          <span className='text-xl font-medium'>Input</span>
          <textarea
            spellCheck={false}
            className='font-mono fappearance-none w-full mb-5 h-1/4 border-2 outline-none shadow-none bg-transparent resize-none'
            value={input}
            onChange={
              (e) => {
                if(lang.length) {
                  setinput(e.target.value)
                } else {
                  toast.error("Select Language")
                }
              }
            }/>
          <span className='text-xl font-medium'>Expected Output</span>
          <textarea
            spellCheck={false}
            className='font-mono w-full mb-5 h-1/4 appearance-none border-2 outline-none shadow-none bg-transparent resize-none'
            value={eoutput}
            onChange={
              (e) => {
                if(lang.length) {
                  seteoutput(e.target.value)
                } else {
                  toast.error("Select Language")
                }
              }
          }/>
          <span className='text-xl font-medium'>Recieved Output</span>
          <textarea
            spellCheck={false}
            className='font-mono w-full mb-5 h-1/4 appearance-none border-2 outline-none shadow-none bg-transparent resize-none'
            value={output}
            disabled/>
          <div>
            {stats}
          </div>
          <div className='flex-1 min-h-0 flex items-center justify-around'>
            <div className="flex items-center gap-4">
              <select
                id="language"
                name="language"
                className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
                onChange={(e) => {
                  setlang(e.target.value)
                }}
              >
                <option value="" disabled>Select Language</option>
                <option value="js" disabled>JavaScript</option>
                <option value="py" disabled>Python</option>
                <option value="cpp">C++</option>
                <option value="java" disabled>Java</option>
              </select>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={async () => {
                  if(lang.length) {
                    try {
                      const res = await axios.post('/api/compile', {
                        code: code,
                        input: input,
                        lang: lang
                      });
                      if(res.data.error) {
                        setoutput(res.data.error);
                        setstats("Time Taken : N/A, Memory Used : N/A")
                      } else {
                        setoutput(res.data.output);
                        setstats(`Time Taken : ${(res.data.runtime / 1000).toFixed(3)}s, Memory Used : N/A`)
                      }
                    } catch (err: any) {
                      
                    }
                  } else {
                    toast.error("Select Language")
                  }
                }}
              >
                Run
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page