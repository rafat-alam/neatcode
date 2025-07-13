import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

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

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
};
