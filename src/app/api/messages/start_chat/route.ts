import { connect_auth, connect_msglist } from '@/dbConfig/dbConfig';
import { v4 as uuidv4 } from 'uuid';
import { getMSGListModel } from '@/models/msgListModel';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authoptions';
import { getUserModel } from '@/models/userModel';

export async function POST(req: NextRequest) {
  try {
    const { user2 } = await req.json();

    const session = await getServerSession(authOptions);

    if(!session) {
      return NextResponse.json({ error: 'Session Expired' }, { status: 401 });
    }

    const user1 = session.user.username;

    if (!user2) {
      return NextResponse.json({ error: 'Missing usernames' }, { status: 402 });
    }

    const conn = connect_auth();
    if(!conn) {
      return NextResponse.json({ error: 'DB connection failed' }, { status: 403 });
    }
    const User = getUserModel(conn);

    const existingUser = await User.findOne({ username: user2 });

    if(!existingUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const roomid = uuidv4();
    const msgConn = connect_msglist();
    if(!msgConn) {
      return NextResponse.json({ error: 'DB connection failed' }, { status: 405 });
    }
    const MsgList = getMSGListModel(msgConn!);

    const now = new Date();

    const entry1 = {
      roomid,
      username: user2,
      lastmsg: '',
      lastmsgtime: now,
      msgcount: 0,
    };

    const entry2 = {
      roomid,
      username: user1,
      lastmsg: '',
      lastmsgtime: now,
      msgcount: 0,
    };

    await MsgList.findByIdAndUpdate(
      user1,
      { $push: { user: entry1 } },
      { upsert: true, new: true }
    );

    await MsgList.findByIdAndUpdate(
      user2,
      { $push: { user: entry2 } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, roomid });
  } catch (error) {
    console.error('Error starting chat:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
