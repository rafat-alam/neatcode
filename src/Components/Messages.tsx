'use client'

import React, { useState } from 'react'
import Split from '@uiw/react-split';
import MessagePanel from '@/Components/MessagePanel';
import MessageMain from '@/Components/MessageMain';

type Props = {
  username: string,
};

const Messages = ({ username }: Props) => {
  const [selected, setselected] = useState('');
  const [roomid, setroomid] = useState('');

  return (
    <>
      <Split mode="horizontal" className='w-full h-full'>
        <div className="min-w-1/6 w-1/4 h-full overflow-auto">
          <MessagePanel setselected={setselected} setroomid={setroomid} me={username} />
        </div>
        <div className="min-w-3/4 w-3/4 h-full overflow-auto">
          <MessageMain name={selected} roomid={roomid} me={username} />
        </div>
      </Split>
    </>
  )
}

export default Messages