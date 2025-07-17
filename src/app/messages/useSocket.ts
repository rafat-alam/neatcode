import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (roomId: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io({
      path: '/api/socketio',
    });

    socketRef.current = socket;

    socket.emit('join', roomId);

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  return socketRef;
};

export default useSocket;