'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Split from '@uiw/react-split';
import { IoSettingsSharp } from 'react-icons/io5';
import CodeEditor from '@/Components/editor/CodeEditor';
import SettingsCompiler from '@/Components/compiler/SettingsCompiler';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Props {
  _id: number,
}

const QuestionPage: React.FC<Props> = ({ _id}) => {
  const [code, setcode] = useState("")
  const [theme, settheme] = useState("vs")
  const [tabsize, settabsize] = useState(4)
  const [textsize, settextsize] = useState(20)
  const [lang, setlang] = useState("cpp")
  const [setting, setsetting] = useState(false)
  const [clicked, setclicked] = useState(false)
  const [output, setoutput] = useState("")
  const [input, setinput] = useState("")
  const [stats, setstats] = useState("");
  const [eoutput, seteoutput] = useState("")
  const [content, setcontent] = useState("")
  const [timeLimit, setTimeLimit] = useState(1000);
  const [memoryLimit, setMemoryLimit] = useState(256);

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

  const fetch_problem = useCallback(async () => {
    const res = await axios.get(`/api/problems/${_id}`);
    setcontent(res.data.problem.content)
    setTimeLimit(res.data.problem.timelimit)
    setMemoryLimit(res.data.problem.memorylimit)
  }, [_id]);

  useEffect(() => {
    fetch_problem();
  }, [fetch_problem]);

  console.log(output);
  console.log(stats);

  const onrun = async () => {
    setinput("");
    seteoutput("");
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
        } else {
          setoutput(res.data.output);
          if(eoutput === res.data.output) {
            toast.success("Output Matched!")
          } else {
            toast.warning("Outputs didn't Matched!")
          }
          setstats(`Time Taken : ${(res.data.runtime / 1000).toFixed(3)}s, Memory Used : N/A`)
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
  }

  const onsubmit = async () => {
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
        } else {
          setoutput(res.data.output);
          if(eoutput === res.data.output) {
            toast.success("Output Matched!")
          } else {
            toast.warning("Outputs didn't Matched!")
          }
          setstats(`Time Taken : ${(res.data.runtime / 1000).toFixed(3)}s, Memory Used : N/A`)
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
  }

  return (
    <>
      <SettingsCompiler open={setting} close={() => setsetting(false)}
        tabsize={tabsize} settabsize={settabsize} textsize={textsize} settextsize={settextsize}
      />
      <div className="h-[calc(100vh-4rem)] flex bg-[#f1f1f1] dark:bg-[#0c0c0c]">
        <Split mode="horizontal" className='w-full h-full'>
          <div className="text-lg prose min-w-1/4 w-1/2 overflow-auto flex flex-col dark:text-white">
            <div className='w-full h-16 justify-center bg-white dark:bg-[#0c0c0c]'>
              <div className='inline-block px-5'>
                <button className='h-16'>Statement</button>
              </div>
              <div className='inline-block px-5'>
                <button className='h-16'>Submissions</button>
              </div>
              <div className='inline-block px-5'>
                <button className='h-16'>Solution</button>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} className='m-5  border-2 dark:border-white flex-1' />
            <div className='w-full h-16 text-center bg-white dark:bg-[#0c0c0c]'>
              Time Limit: {timeLimit}ms, Memory Limit: {memoryLimit}MB
            </div>
          </div>
          <div className="p-5 w-1/2 min-w-1/2 bg-grey-150 flex flex-col h-full">
            <div className='pb-5 pr-5 flex flex-col h-full bg-[#ffffff] dark:bg-[#1e1e1e] text-black dark:text-[#d4d4d4] rounded-xl overflow-hidden'>
              <div className='h-16 flex justify-between items-center'>
                <div className='mx-5'>
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
                    className={`mx-5 px-7 py-1.5 border-2 ${clicked ? `text-blue-400 border-blue-400` : `text-blue-600 border-blue-600 transition`} rounded transition`}
                    onClick={onrun}
                  >
                    Run
                  </button>
                  <button
                    disabled={clicked}
                    className={`px-7 py-2 text-white ${clicked ? `bg-blue-400 transition` : `bg-blue-600 transition`} rounded transition`}
                    onClick={onsubmit}
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setsetting(true)}
                    className="text-black dark:text-white hover:text-gray-300"
                  >
                    <IoSettingsSharp className="text-2xl" />
                  </button>
                </div>
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
        </Split>
      </div>
    </>
  )
}

export default QuestionPage