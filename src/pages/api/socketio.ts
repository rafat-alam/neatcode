import { Server as IOServer } from 'socket.io';
import type { NextApiRequest } from 'next';
import type { NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {

    const io = new IOServer(res.socket.server as HTTPServer, {
      path: '/api/socketio',
    });

    res.socket.server.io = io;

    io.on('connection', (socket) => {

      socket.on('join', (roomId) => {
        socket.join(roomId);
      });

      socket.on('message', ({ roomId, message }) => {
        socket.to(roomId).emit('message', { roomId, message });
      });
    });
  }

  res.end();
}
