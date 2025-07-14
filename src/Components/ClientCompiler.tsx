'use client'
import CodeEditor from '@/Components/CodeEditor'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { IoSettingsSharp } from "react-icons/io5";
import SettingsCompiler from '@/Components/SettingsCompiler'
import TextEditor from '@/Components/TextEditor'

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
  const [textsize, settextsize] = useState(14)

  return (
    <>
      <SettingsCompiler open={setting} close={() => setsetting(false)} theme={theme} settheme={settheme}
        tabsize={tabsize} settabsize={settabsize} textsize={textsize} settextsize={settextsize}
      />
      <div className='h-[calc(100vh-4rem)] flex bg-gray-50'>
        <div className='p-5 w-1/2 flex flex-col h-full'>
          <div className='h-12 flex justify-end items-center'>
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
        <div className='flex-1 p-5 flex flex-col'>
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
          <span className='text-xl font-medium'>Input</span>
          <div className='h-1/4 mb-5'>
            <TextEditor value={input} onChange={setinput} editable={true} theme={theme} tabsize={tabsize}
            textsize={textsize} />
          </div>
          <span className='text-xl font-medium'>Expected Output</span>
          <div className='h-1/4 mb-5'>
            <TextEditor value={eoutput} onChange={seteoutput} editable={true} theme={theme} tabsize={tabsize}
            textsize={textsize} />
          </div>
          <span className={`text-xl font-medium`}>Recieved Output</span>
          <div className={`h-1/4 mb-5`}>
            <TextEditor value={output} onChange={setoutput} editable={false} theme={theme} tabsize={tabsize}
            textsize={textsize} />
          </div>
          <div className={``}>
            {stats}
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientCompiler