'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Label } from '@/Components/ui/label';
import { Input } from "@/Components/ui/input"

interface dataInterface {
  _id: number;
  name: string;
  difficulty: number;
}

const ProblemList = () => {
  const [data, setData] = useState<dataInterface[]>([]);
  
  const difficultyLevels = [
    { value: "0-1000", label: "Beginner Level" },
    { value: "1000-1200", label: "1* Beginner Level" },
    { value: "1200-1400", label: "1* Advanced Level" },
    { value: "1400-1500", label: "2* Beginner Level" },
    { value: "1500-1600", label: "2* Advanced Level" },
    { value: "1600-1700", label: "3* Beginner Level" },
    { value: "1700-1800", label: "3* Advanced Level" },
    { value: "1800-2000", label: "4* Level" },
    { value: "2000-2200", label: "5* Level" },
    { value: "2200-2500", label: "6* Level" },
    { value: "2500-5001", label: "7* Level" },
    { value: "0-5001", label: "All levels" },
  ];

  const [selected, setSelected] = useState<string>(difficultyLevels[11].value);


  useEffect(() => {
    fetch_list();
  }, []);

  const fetch_list = async () => {
    const res = await axios.get("/api/problems/fetch_list");
    setData(res.data.problems);
  };

  return (
    <>
      <div className='h-[calc(4rem)] dark:bg-[#0c0c0c] border-b-2 dark:border-white'>
        <div className='dark:text-white'>All Practice problem</div>
        <div className='dark:text-white'>My Bookmarks</div>
      </div>
      <div className='h-[calc(100vh-8rem)] flex-1 flex dark:bg-[#0c0c0c]'>
        <div className="w-full max-w-sm flex flex-col border-r-2 mr-4 dark:border-white">
          <div className='p-5'>
            <Input placeholder='Search Problems'/>
          </div>
          <div className="border-y-2 flex flex-col dark:border-white dark:text-white">
            <span className='text-center text-2xl py-5'>
              Problem Difficulty Rating
            </span>
            <span className='text-center pb-5'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Select Difficulty</Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Select Difficulty Range</DialogTitle>
                  </DialogHeader>
                  <RadioGroup
                    value={selected}
                    onValueChange={setSelected}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
                  >
                    {difficultyLevels.map((level) => (
                      <div key={level.value} className="flex items-start space-x-2">
                        <RadioGroupItem value={level.value} id={level.value} />
                        <div className="space-y-0.5">
                          <Label htmlFor={level.value} className="text-base font-medium">
                            {level.value}
                          </Label>
                          <p className="text-sm text-muted-foreground">{level.label}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </DialogContent>
              </Dialog>
            </span>
          </div>
        </div>
        <div className='flex-1 flex flex-col'>
          <div className='h-32'>
          </div>
          <div className='flex-1 overflow-y-auto'>
            <div className='mx-4 my-1 text-2xl flex justify-between items-center dark:text-white'>
              1/{data.length}
            </div>
            <br />
            {data.map((e, i) => {
              return (
                <Link
                  key={i}
                  href={`/problems/${e._id}`}
                  className={`py-3 px-5 rounded-xl text-xl flex justify-between dark:text-white ${
                    i % 2 ? 'bg-white dark:bg-gray-500' : 'bg-gray-100 dark:bg-gray-800'
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
      </div>
    </>
  )
}

export default ProblemList
