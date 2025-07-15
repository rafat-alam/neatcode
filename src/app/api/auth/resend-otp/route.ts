import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/helpers/mailer';

interface DecodedToken {
  email: string;
  username: string;
  password: string;
  otp: string;
  otpExpiry: number;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const secret = process.env.NEXTAUTH_SECRET!;
  let decoded: DecodedToken;

  try {
    decoded = jwt.verify(token, secret) as DecodedToken;
  } catch (err) {
    return NextResponse.json({ message: `Invalid or expired token ${err}` }, { status: 400 });
  }

  try {
    if (decoded.otpExpiry < Date.now()) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      await sendEmail(
        decoded.email,
        otp,
        `<p>Your OTP is <strong>${otp}</strong></p><p>Expires in 10 minutes</p>`
      );
  
      const secret = process.env.NEXTAUTH_SECRET!;
      const payload = {
        email: decoded.email,
        username: decoded.username,
        password: decoded.password,
        otp,
        otpExpiry: Date.now() + 600000
      };
  
      const encryptedToken = jwt.sign(payload, secret, { expiresIn: '60m' });
  
      return NextResponse.json({ message: 'OTP Sent', token: encryptedToken }, { status: 201 });
    } else {
      return NextResponse.json({ message: `Otp send recently, try after ${formatTime(decoded.otpExpiry - Date.now())} mins` }, { status: 400 });
    }

  } catch(e) {
    return NextResponse.json({ message: `OTP Resend failed ${e}` }, { status: 500 });
  }
}
