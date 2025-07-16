import { NextRequest, NextResponse } from 'next/server';
import { connect_problems } from '@/dbConfig/dbConfig';
import { getProblemsModel } from '@/models/problemsModel';

export const POST = async (req: NextRequest) => {
  try {
    const connection =  connect_problems();
    if(!connection) {
      return NextResponse.json({ error: 'DB connection failed' }, { status: 404 });
    }
    const Problems = getProblemsModel(connection);
    
    const { name, difficulty, content } = await req.json();

    if(!name || !difficulty || !content) {
      return NextResponse.json({ message: 'Fields missing' }, { status: 500 });
    }
    
    const num = await Problems.countDocuments() + 1;

    const existingProblemByName = await Problems.findOne({ name });
    if (existingProblemByName) {
      return NextResponse.json({ message: 'Problem name already used' }, { status: 409 });
    }
    
    await Problems.create({
      _id: num,
      name: name,
      difficulty: difficulty,
      content: content,
    })

    return NextResponse.json({ message: 'Question added successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
};
