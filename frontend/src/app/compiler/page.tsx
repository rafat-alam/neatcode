'use client'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [code, setcode] = useState("")
  const [input, setinput] = useState("")
  const [eoutput, seteoutput] = useState("")
  const [lang, setlang] = useState("")

  return (
    <>
      <div className='h-[calc(100vh-4rem)] flex'>
        <div className='p-5 w-1/2 flex'>
          
          <textarea
            className='font-mono w-full h-full appearance-none border-2 outline-none shadow-none bg-transparent  resize-none'
            value={code}
            onChange={
              (e) => {
                if(lang.length) {
                  setcode(e.target.value)
                } else {
                  toast.error("Select Language")
                }
              }
          }/>
        </div>
        <div className='flex-1 p-5 flex flex-col'>
          <span className='text-xl font-medium'>Input</span>
          <textarea
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
          <textarea className='font-mono w-full mb-5 h-1/4 appearance-none border-2 outline-none shadow-none bg-transparent resize-none' disabled/>
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
                <option value="js">JavaScript</option>
                <option value="py">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>

              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
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