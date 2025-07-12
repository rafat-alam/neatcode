import React, { useRef } from 'react'
import { IoClose } from 'react-icons/io5';

const SettingsCompiler = ({open, close, theme, settheme, tabsize, settabsize, textsize, settextsize}: { open: boolean; close: Function; theme: string; settheme: Function; tabsize: number; settabsize: Function; textsize:number; settextsize: Function; }) => {

  const innerRef = useRef<HTMLDivElement>(null);

  function handleOuterClick(e: React.MouseEvent) {
    if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
      close();
    }
  }


  return (
    <>
      <div className={`absolute z-[5000] ${!open ? 'hidden' : ''} h-screen w-screen bg-transparent flex items-center justify-center`} onClick={handleOuterClick}>
        <div className='h-100 w-175 bg-white rounded-2xl shadow-2xl flex' ref={innerRef}>
          <div className='h-full w-full rounded-2xl bg-gray-100'>
            <div className='w-full flex text-2xl items-center px-3 py-2 rounded-t-2xl border-b-2 justify-between'>
              Editor Setings
              <button className='text-black text-4xl hover:text-gray-300'>
                <IoClose onClick={() => {close()}} />
              </button>
            </div>
            <div className='p-5 flex items-center justify-between text-2xl w-full'>
              Theme
              <select
                id="theme"
                name="theme"
                className="border text-sm border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={theme}
                onChange={(e) => {
                  settheme(e.target.value)
                }}
              >
                <option value="vs">VS Light</option>
                <option value="vs-dark">VS Dark</option>
                <option value="hc-black">High Contrast Dark</option>
              </select>
            </div>
            <div className='p-5 flex items-center justify-between text-2xl w-full'>
              Tab Size
              <select
                id="tabsize"
                name="tabsize"
                className="border text-sm border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={tabsize}
                onChange={(e) => {
                  settabsize(e.target.value)
                }}
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
              </select>
            </div>
            <div className='p-5 flex items-center justify-between text-2xl w-full'>
              Font Size
              <select
                id="fontsize"
                name="fontsize"
                className="border text-sm border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={textsize}
                onChange={(e) => {
                  settextsize(e.target.value)
                }}
              >
                <option value={14}>14</option>
                <option value={16}>16</option>
                <option value={18}>18</option>
                <option value={20}>20</option>
                <option value={22}>22</option>
                <option value={24}>24</option>
                <option value={26}>26</option>
                <option value={28}>28</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsCompiler