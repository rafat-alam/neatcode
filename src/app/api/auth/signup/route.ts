import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/helpers/mailer';

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const { email, username, password } = await req.json();

    const existingUserByEmail = await User.findOne({ email });
    
    if (existingUserByEmail) {
      return NextResponse.json({ message: 'Email already used' }, { status: 409 });
    }

    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByUsername) {
      return NextResponse.json({ message: 'Username already used' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendEmail(
      email,
      otp,
      `<p>Your OTP is <strong>${otp}</strong></p><p>Expires in 10 minutes</p>`
    );

    const secret = process.env.NEXTAUTH_SECRET!;
    const payload = {
      email,
      username,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 600000
    };

    const encryptedToken = jwt.sign(payload, secret, { expiresIn: '10m' });

    return NextResponse.json({ message: 'OTP Sent', token: encryptedToken }, { status: 201 });
  } catch (e : any) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
};
