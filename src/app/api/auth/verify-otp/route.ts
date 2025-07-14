import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function POST(req: NextRequest) {
  try {
    const { token, otp } = await req.json();

    const secret = process.env.NEXTAUTH_SECRET!;
    const decoded = jwt.verify(token, secret) as any;

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

    return NextResponse.json({ message: 'User verified and created successfully' });
  } catch(e: any) {
    return NextResponse.json({ message: 'Verification failed' }, { status: 500 });
  }
}
