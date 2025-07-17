'use client';

import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import rawData from './data.json';

type ChatSummary = {
  roomid: string;
  username: string;
  lastmsg: string;
  lastmsgtime: string;
  msgcount: number;
};

type MsgList = {
  [username: string]: ChatSummary[];
};

const msglist: MsgList = rawData.msglist;

type Props = {
  setselected: (name: string) => void;
  setroomid: (name: string) => void
  me: string;
};


export default function MessagePanel({ setselected, setroomid, me }: Props) {
  const [search, setSearch] = useState('');

  const filteredAndSorted = msglist[me]
    .filter((item) =>
      item.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.msgcount > 0 && b.msgcount === 0) return -1;
      if (a.msgcount === 0 && b.msgcount > 0) return 1;

      const aTime = new Date(a.lastmsgtime).getTime();
      const bTime = new Date(b.lastmsgtime).getTime();
      return bTime - aTime;
    });

  return (
    <aside className="w-full h-full bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">Messages</h2>
        <button className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md">
          <Plus size={16} />
          New Group
        </button>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAndSorted.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">No users found</div>
        ) : (
          filteredAndSorted.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b transition-all"
              onClick={() => {
                setselected(item.username);
                setroomid(item.roomid);
              }}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
                {item.username.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800">{item.username}</h4>
                  {item.msgcount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.msgcount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{item.lastmsg}</p>
                <p className="text-xs text-gray-400">
                  {item.lastmsgtime}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
