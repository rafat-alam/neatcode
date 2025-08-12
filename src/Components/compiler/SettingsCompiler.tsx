import React, { useRef } from 'react'
import { IoClose } from 'react-icons/io5';

interface SettingsCompilerProps {
  open: boolean;
  close: () => void;
  tabsize: number;
  settabsize: React.Dispatch<React.SetStateAction<number>>;
  textsize: number;
  settextsize: React.Dispatch<React.SetStateAction<number>>;
}

const SettingsCompiler: React.FC<SettingsCompilerProps> = ({ open, close, tabsize, settabsize, textsize, settextsize }) => {

  const innerRef = useRef<HTMLDivElement>(null);

  function handleOuterClick(e: React.MouseEvent) {
    if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
      close();
    }
  }


  return (
    <>
      <div className={`absolute z-[5000] ${!open ? 'hidden' : ''} h-screen w-screen bg-transparent flex items-center justify-center`} onClick={handleOuterClick}>
        <div className='h-100 w-175 bg-black rounded-2xl shadow-2xl flex' ref={innerRef}>
          <div className='h-full w-full text-white rounded-2xl bg-black'>
            <div className='w-full flex text-2xl items-center px-3 py-2 rounded-t-2xl border-b-2 justify-between'>
              Editor Setings
              <button className='text-white text-4xl hover:text-gray-300'>
                <IoClose onClick={() => {close()}} />
              </button>
            </div>
            <div className='p-5 flex items-center justify-between text-2xl w-full'>
              Tab Size
              <select
                id="tabsize"
                name="tabsize"
                className="border text-sm border-white rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={tabsize}
                onChange={(e) => {
                  settabsize(Number(e.target.value))
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
                className="border text-sm border-white rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={textsize}
                onChange={(e) => {
                  settextsize(Number(e.target.value))
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