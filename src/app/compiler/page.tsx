import React from 'react'

const page = () => {
  return (
    <>
      <div className='h-[calc(100vh-4rem)] flex'>
        <div className='p-5 w-1/2 flex'>
          
          <textarea className='w-full h-full appearance-none border-2 outline-none shadow-none bg-transparent resize-none'/>
        </div>
        <div className='flex-1 p-5 flex flex-col'>
          <span className='text-xl font-medium'>Input</span>
          <textarea className='w-full mb-5 h-1/4 appearance-none border-2 outline-none shadow-none bg-transparent resize-none'/>
          <span className='text-xl font-medium'>Expected Output</span>
          <textarea className='w-full mb-5 h-1/4 appearance-none border-2 outline-none shadow-none bg-transparent resize-none'/>
          <span className='text-xl font-medium'>Recieved Output</span>
          <textarea className='w-full mb-5 h-1/4 appearance-none border-2 outline-none shadow-none bg-transparent resize-none' disabled/>
          <div className='flex-1 min-h-0 flex items-center justify-around'>
            <div className="flex items-center gap-4">
              <select
                id="language"
                name="language"
                className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
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