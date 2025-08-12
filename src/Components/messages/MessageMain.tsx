'use client';

import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import useSocket from '@/app/messages/useSocket';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';

type Message = {
  sender: string;
  text: string;
  time: string;
};

type Props = {
  name: string;
  roomid: string;
  me: string
};

export default function MessageMain({ name, roomid, me }: Props) {
  const socketRef = useSocket(roomid);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const socket = socketRef.current;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/fetch_room?roomId=${roomid}`);
        const roomMessages: Message[] = res.data.room?.messages || [];
        setMessages(roomMessages);
      } catch {
        toast.error('Failed to fetch messages');
      }
    };

    if (roomid) fetchMessages();
  }, [roomid]);

  useEffect(() => {
    if (!socket) return;

    const handleIncoming = ({ roomId: incomingRoomId, message }: { roomId: string, message: Message }) => {
      if (incomingRoomId !== roomid) return;
      console.log('Received:', message);
      setMessages((prev) => [...prev, message]);
    };

    socket.on('message', handleIncoming);

    return () => {
      socket.off('message', handleIncoming);
    };
  }, [roomid, socket]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      sender: me,
      text: input,
      time: new Date().toISOString(),
    };

    socketRef.current?.emit('message', {
      roomId: roomid,
      message: newMessage,
    });

    setInput('');
    setMessages((prev) => [...prev, newMessage]);
  };

  if (!name || !roomid) {
    return <></>;
  }

  return (
    <section className="flex flex-col flex-1 h-full w-full bg-gray-50">
      {/* Chat Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b bg-white shadow-sm">
        <Image
          src={`https://i.pravatar.cc/150?u=$rafat`}
          alt={name}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-green-600">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === me ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-2 rounded-lg text-sm shadow ${
                msg.sender === me
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-900 rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              <div className="text-[10px] text-right mt-1 opacity-70">
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="px-4 py-3 bg-white border-t flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </section>
  );
}
