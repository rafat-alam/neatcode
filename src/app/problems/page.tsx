import React from 'react'
import res from '../../data.json' assert { type: 'json' };
import Link from 'next/link';

const page = () => {
  const data = res.questions
  console.log(data[0].id);
  return (
    <>
      <div className='h-[calc(100vh-4rem)] flex-1 flex'>
        <div className='w-75'>

        </div>
        <div className='flex-1 flex flex-col'>
          <div className='h-32'>
          
          </div>
          <div className='flex-1 overflow-y-auto'>
            <input /> 0/{data.length}
              <br />
              {data.map((e, i) => {
                return (
                  <Link
                    key={i}
                    href={`/problems/${e.id}`}
                    className={`p-1 rounded flex justify-between ${
                      i % 2 ? 'bg-blue-300' : 'bg-blue-600'
                    } text-white`}
                  >
                  <span>{e.id}</span>
                  <span>{e.title}</span>
                  <span className='text-2xl'>{e.difficulty}</span>
                  </Link>
                )
              })}
          </div>
        </div>
        <div className='w-100'>

        </div>
      </div>
    </>
  )
}

export default page