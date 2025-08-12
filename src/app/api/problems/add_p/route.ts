import { NextRequest, NextResponse } from 'next/server';
import { connect_problems } from '@/dbConfig/dbConfig';
import { getProblemsModel } from '@/models/problemsModel';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authoptions';

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session) {
      return NextResponse.json({ error: 'Please login to Add' }, { status: 500 });
    }

    if(!session.user.isEditor) {
      return NextResponse.json({ error: 'Permission denied.' }, { status: 500 });
    }
    
    const { name, difficulty, content, testcases, timelimit, memorylimit } = await req.json();

    if(!name || !difficulty || !content || !testcases || !timelimit || !memorylimit) {
      return NextResponse.json({ message: 'Fields missing' }, { status: 500 });
    }

    if(timelimit <= 0 || timelimit > 5000) {
      return NextResponse.json({ message: 'Timelimit is not in range' }, { status: 500 });
    }

    if(memorylimit <= 0 || memorylimit > 1024) {
      return NextResponse.json({ message: 'Memorylimit is not in range' }, { status: 500 });
    }

    const connection =  connect_problems();
    if(!connection) {
      return NextResponse.json({ error: 'DB connection failed' }, { status: 404 });
    }
    const Problems = getProblemsModel(connection);

    const existingProblemByName = await Problems.findOne({ name: name.split() });
    if (existingProblemByName) {
      return NextResponse.json({ message: 'Problem name already used' }, { status: 409 });
    }

    const num = await Problems.countDocuments() + 1;
    
    await Problems.create({
      _id: num,
      name: name,
      difficulty: difficulty,
      content: content,
      testcases: testcases,
      timelimit: timelimit,
      memorylimit: memorylimit
    })

    return NextResponse.json({ message: 'Question added successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
};
