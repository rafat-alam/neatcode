import React from 'react'
import { IoClose } from 'react-icons/io5';

const SettingsCompiler = ({open, close}: { open: boolean; close: Function }) => {
  return (
    <>
      <div className={`absolute z-[5000] ${!open ? 'hidden' : ''} h-screen w-screen bg-transparent flex items-center justify-center`}>
        <div className='h-100 w-175 bg-white border-2 shadow-2xl'>
          <IoClose onClick={() => {close()}} />
        </div>
      </div>
    </>
  )
}

export default SettingsCompiler