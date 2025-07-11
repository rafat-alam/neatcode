'use client'
import CodeEditor from '@/Components/CodeEditor'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { IoSettingsSharp } from "react-icons/io5";
import SettingsCompiler from '@/Components/SettingsCompiler'
import TextEditor from '@/Components/TextEditor'

const page = () => {
  const [code, setcode] = useState("")
  const [input, setinput] = useState("")
  const [eoutput, seteoutput] = useState("")
  const [lang, setlang] = useState("")
  const [output, setoutput] = useState("")
  const [stats, setstats] = useState("")
  const [setting, setsetting] = useState(false)

  return (
    <>
      <SettingsCompiler open={setting} close={() => setsetting(false)} />
      <div className='h-[calc(100vh-4rem)] flex'>
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
          />
        </div>
        <div className='flex-1 p-5 flex flex-col'>
          <div className='h-16 min-h-0 flex items-center justify-around'>
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
                    setoutput("")
                    try {
                      const res = await axios.post('/api/compile', {
                        code: code,
                        input: input,
                        lang: lang
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
          <span className='text-xl font-medium'>Input</span>
          <div className='h-1/4 mb-5'>
            <TextEditor value={input} onChange={setinput} editable={true} />
          </div>
          <span className='text-xl font-medium'>Expected Output</span>
          <div className='h-1/4 mb-5'>
            <TextEditor value={eoutput} onChange={seteoutput} editable={true} />
          </div>
          <span className={`text-xl font-medium ${output ? '' : 'hidden'}`}>Recieved Output</span>
          <div className={`h-1/4 mb-5 ${output ? '' : 'hidden'}`}>
            <TextEditor value={output} onChange={setoutput} editable={false}/>
          </div>
          <div className={`${output ? '' : 'hidden'}`}>
            {stats}
          </div>
        </div>
      </div>
    </>
  )
}

export default page