import { NextRequest, NextResponse } from 'next/server';
import { getUserModel } from '@/models/userModel';
import jwt from 'jsonwebtoken';
import { connect_auth } from '@/dbConfig/dbConfig';

interface DecodedToken {
  email: string;
  username: string;
  password: string;
  otp: string;
  otpExpiry: number;
}

export async function POST(req: NextRequest) {
  try {
    const connection =  connect_auth();
    if(!connection) {
      return NextResponse.json({ error: 'DB connection failed' }, { status: 404 });
    }
    const User = getUserModel(connection);

    const { token, otp } = await req.json();

    const secret = process.env.NEXTAUTH_SECRET!;
    let decoded: DecodedToken;

    try {
      decoded = jwt.verify(token, secret) as DecodedToken;
    } catch {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    if (decoded.otp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    if (decoded.otpExpiry < Date.now()) {
      return NextResponse.json({ message: 'OTP expired' }, { status: 400 });
    }

    const existingUserByEmail = await User.findOne({ email: decoded.email });
    if (existingUserByEmail) {
      return NextResponse.json({ message: 'Email already used' }, { status: 409 });
    }

    const existingUserByUsername = await User.findOne({ username: decoded.username });
    if (existingUserByUsername) {
      return NextResponse.json({ message: 'Username already used' }, { status: 409 });
    }

    await User.create({
      email: decoded.email,
      username: decoded.username,
      password: decoded.password
    });

    return NextResponse.json({ message: 'User verified and created successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Verification failed' }, { status: 500 });
  }
}
