import { NextResponse } from 'next/server';
import { connect_msglist } from '@/dbConfig/dbConfig';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authoptions';
import { getMSGListModel } from '@/models/msgListModel';


export async function GET() {
  const session = await getServerSession(authOptions);
  
  if(!session) {
    return NextResponse.json({ error: 'Session Expired' }, { status: 400 });
  }

  const connection = connect_msglist();
  
  if(!connection) {
    return NextResponse.json({ error: 'DB connection failed' }, { status: 404 });
  }

  try {
    const MSGList = getMSGListModel(connection);

    const msgList = await MSGList.findById(session.user.username).lean();

    if (!msgList) {
      return NextResponse.json({  }, { status: 200 });
    }

    return NextResponse.json({ msgList }, { status: 200 });
  } catch (err) {
    console.error('Error fetching msg list:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}