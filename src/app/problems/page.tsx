'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';

interface dataInterface {
  _id: number;
  name: string;
  difficulty: number;
}

const ProblemList = () => {
  const [data, setData] = useState<dataInterface[]>([]);

  useEffect(() => {
    fetch_list();
  }, []);

  const fetch_list = async () => {
    const res = await axios.get("/api/problems/fetch_list");
    setData(res.data.problems);
  };

  return (
    <>
      <div className='h-[calc(100vh-4rem)] flex-1 flex'>
        <div className='w-75 border-r-2 mr-4'>

        </div>
        <div className='flex-1 flex flex-col'>
          <div className='h-32'>
          
          </div>
          <div className='flex-1 overflow-y-auto'>
            <div className='mx-4 my-1 text-2xl flex justify-between items-center'>
              <input className='border-2 rounded-lg focus:outline-none focus:ring-0' /> 
              1/{data.length}
            </div>
            <br />
            {data.map((e, i) => {
              return (
                <Link
                  key={i}
                  href={`/problems/${e._id}`}
                  className={`py-3 px-5 rounded-xl text-xl flex justify-between ${
                    i % 2 ? 'bg-white' : 'bg-gray-100'
                  }`}
                >
                <span>{e._id+ ". " +e.name}</span>
                <span>{e.difficulty}</span>
                <span>Solved</span>
                </Link>
              )
            })}
          </div>
        </div>
        <div className='w-100 border-l-2 ml-4'>

        </div>
      </div>
    </>
  )
}

export default ProblemList
