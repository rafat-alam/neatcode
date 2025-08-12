'use client'
import CodeEditor from '@/Components/editor/CodeEditor'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IoSettingsSharp } from "react-icons/io5";
import SettingsCompiler from '@/Components/compiler/SettingsCompiler'
import TextEditor from '@/Components/editor/TextEditor'
import Split from '@uiw/react-split';

const ClientCompiler = () => {
  const [code, setcode] = useState("")
  const [input, setinput] = useState("")
  const [eoutput, seteoutput] = useState("")
  const [lang, setlang] = useState("text")
  const [output, setoutput] = useState("")
  const [stats, setstats] = useState("")
  const [setting, setsetting] = useState(false)
  const [clicked, setclicked] = useState(false)
  const [theme, settheme] = useState("vs")
  const [tabsize, settabsize] = useState(4)
  const [textsize, settextsize] = useState(20)

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      settheme(isDark ? 'vs-dark' : 'vs');
    };
    updateTheme();
    document.addEventListener('themechange', updateTheme);
    return () => {
      document.removeEventListener('themechange', updateTheme);
    };
  }, []);

  return (
    <>
      <SettingsCompiler open={setting} close={() => setsetting(false)}
        tabsize={tabsize} settabsize={settabsize} textsize={textsize} settextsize={settextsize}
      />
      <div className={'h-[calc(100vh-4rem)] flex bg-[#f1f1f1] dark:bg-[#0c0c0c]'}>
        <Split mode="horizontal" className='w-full h-full'>
          <div className='p-5 w-1/2 h-full min-w-1/2'>
            <div className='pb-5 pr-5 flex flex-col h-full bg-[#ffffff] dark:bg-[#1e1e1e] text-black dark:text-[#d4d4d4] rounded-xl overflow-hidden'>
              <div className='h-16 flex justify-end items-center'>
                <button
                  onClick={() => setsetting(true)}
                  className="text-black dark:text-white hover:text-gray-300"
                >
                  <IoSettingsSharp className="text-2xl" />
                </button>
              </div>
              <div className='flex-1 overflow-hidden'>
                <CodeEditor 
                  value = {code}
                  onChange={setcode}
                  theme = {theme}
                  tabsize={tabsize}
                  textsize={textsize}
                  lang={lang}
                />
              </div>
            </div>
          </div>
          <div className='flex-1 p-5 flex flex-col min-w-1/4'>
            <div className='h-16 min-h-0 flex items-center justify-around'>
              <div className="flex items-center gap-4">
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
                  className={`px-7 py-1 text-lg font-semibold text-black ${clicked ? `bg-[#00cc99AA] transition` : `bg-[#00cc99]`} rounded transition`}
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
                        } else if(res.data.output) {
                          setoutput(res.data.output);
                          if(eoutput === res.data.output) {
                            toast.success("Output Matched!")
                          } else {
                            toast.warning("Outputs didn't Matched!")
                          }
                          setstats(`Time Taken : ${(res.data.runtime / 1000).toFixed(3)}s, Memory Used : N/A`)
                        } else {
                          toast.error("Not Logedin.");
                          setstats("Time Taken : N/A, Memory Used : N/A")
                        }
                      } catch (err) {
                        console.log(err);
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
              </div>
            </div>
            <div className='h-7/8 flex flex-col justify-around'>
              <div className='h-1/3 my-2 pb-5 pr-5 pt-5 flex flex-col bg-white text-black dark:bg-[#1e1e1e] dark:text-[#d4d4d4] rounded-xl overflow-hidden'>
                <span className='h-12 flex pl-5 items-center text-xl text-black dark:text-white font-medium'>Input</span>
                <div className='flex-1'>
                  <TextEditor value={input} onChange={setinput} editable={true} theme={theme} tabsize={tabsize}
                  textsize={textsize} />
                </div>
              </div>
              <div className='h-1/3 my-2 pb-5 pr-5 pt-5 flex flex-col bg-white text-black dark:bg-[#1e1e1e] dark:text-[#d4d4d4] rounded-xl overflow-hidden'>
                <span className='h-12 flex pl-5 items-center text-xl text-black dark:text-white font-medium'>Expected Output</span>
                <div className='flex-1'>
                  <TextEditor value={eoutput} onChange={seteoutput} editable={true} theme={theme} tabsize={tabsize}
                  textsize={textsize} />
                </div>
              </div>
              <div className='h-1/3 my-2 pb-5 pr-5 pt-5 flex flex-col bg-white text-black dark:bg-[#1e1e1e] dark:text-[#d4d4d4] rounded-xl overflow-hidden'>
                <span className='h-12 flex pl-5 items-center text-xl text-black dark:text-white font-medium'>Received Output</span>
                <div className='flex-1'>
                  <TextEditor value={output} onChange={setoutput} editable={false} theme={theme} tabsize={tabsize}
                  textsize={textsize} />
                </div>
              </div>
            </div>
            <div className='text-black dark:text-white'>
              {stats}
            </div>
          </div>
        </Split>
      </div>
    </>
  )
}

export default ClientCompiler