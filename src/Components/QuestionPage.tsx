'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Split from '@uiw/react-split';
import { IoSettingsSharp } from 'react-icons/io5';
import CodeEditor from '@/Components/CodeEditor';
import SettingsCompiler from '@/Components/SettingsCompiler';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Props {
  _id: number,
}

const QuestionPage: React.FC<Props> = ({ _id}) => {
  const [code, setcode] = useState("")
  const [theme, settheme] = useState("vs")
  const [tabsize, settabsize] = useState(4)
  const [textsize, settextsize] = useState(18)
  const [lang, setlang] = useState("cpp")
  const [setting, setsetting] = useState(false)
  const [clicked, setclicked] = useState(false)
  const [output, setoutput] = useState("")
  const [input, setinput] = useState("")
  const [stats, setstats] = useState("");
  const [eoutput, seteoutput] = useState("")
  const [content, setcontent] = useState("")

  const fetch_problem = useCallback(async () => {
    const res = await axios.get(`/api/problems/${_id}`);
    setcontent(res.data.problem.content)
  }, [_id]);

  useEffect(() => {
    fetch_problem();
  }, [fetch_problem]);

  console.log(output);
  console.log(stats);

  return (
    <>
      <SettingsCompiler open={setting} close={() => setsetting(false)} theme={theme} settheme={settheme}
        tabsize={tabsize} settabsize={settabsize} textsize={textsize} settextsize={settextsize}
      />
      <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
        <Split mode="horizontal" className='w-full h-full'>
          <div className="p-5 text-lg prose min-w-1/4 w-1/2 overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <div className="w-1/2 min-w-1/4 bg-grey-150 flex flex-col h-full">
            <div className='h-16 px-3 flex items-center justify-between'>
              <div className="flex items-center px-2">
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
                  onClick={async () => {
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
                  }}
                >
                  Run
                </button>
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
                  }}
                >
                  Submit
                </button>
              </div>
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
        </Split>
      </div>
    </>
  )
}

export default QuestionPage