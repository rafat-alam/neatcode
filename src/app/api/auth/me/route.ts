import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  await connect();
  const token = await getToken({ req, secret });

  if (!token || !token.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await User.findById(token.id).select('-password');
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user });
}
