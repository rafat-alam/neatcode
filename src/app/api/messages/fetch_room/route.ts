import { NextRequest, NextResponse } from 'next/server';
import { getRoomModel } from '@/models/roomModel';
import { connect_room } from '@/dbConfig/dbConfig';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authoptions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('roomId');

  const session = await getServerSession(authOptions);
  
  if(!session) {
    return NextResponse.json({ error: 'Session Expired' }, { status: 400 });
  }

  if (!roomId) {
    return NextResponse.json({ error: 'Missing roomId' }, { status: 400 });
  }
  
  const connection = connect_room();

  if(!connection) {
    return NextResponse.json({ error: 'DB connection failed' }, { status: 404 });
  }

  try {
    const Room = getRoomModel(connection);

    const room = await Room.findById(roomId).lean();

    if (!room) {
      return NextResponse.json({ }, { status: 200 });
    }

    return NextResponse.json({ room }, { status: 200 });
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}