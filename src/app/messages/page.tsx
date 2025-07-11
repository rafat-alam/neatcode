'use client'
import CodeEditor from '@/Components/CodeEditor'
import React, { useState } from 'react'

const page = () => {
  const [code, setcode] = useState("");
  return (
    <>
      <div>Message Page</div>
      <div>
        <CodeEditor value={code} onChange={setcode} />
      </div>
    </>
  )
}

export default page