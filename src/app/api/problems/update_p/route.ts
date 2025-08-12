import { NextRequest, NextResponse } from 'next/server';
import { connect_problems } from '@/dbConfig/dbConfig';
import { getProblemsModel } from '@/models/problemsModel';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authoptions';

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session) {
      return NextResponse.json({ error: 'Plese login to Edit' }, { status: 501 });
    }

    if(!session.user.isEditor) {
      return NextResponse.json({ error: 'Permission denied.' }, { status: 500 });
    }
    
    const { num, name, difficulty, content, testcases, timelimit, memorylimit } = await req.json();

    if(!num || !name || !difficulty || !content || !testcases || !timelimit || !memorylimit) {
      return NextResponse.json({ message: 'Fields missing' }, { status: 502 });
    }

    if(timelimit <= 0 || timelimit > 5000) {
      return NextResponse.json({ message: 'Timelimit is not in range' }, { status: 503 });
    }

    if(memorylimit <= 0 || memorylimit > 1024) {
      return NextResponse.json({ message: 'Memorylimit is not in range' }, { status: 504 });
    }

    const connection =  connect_problems();

    if(!connection) {
      return NextResponse.json({ error: 'DB connection failed' }, { status: 404 });
    }

    const Problems = getProblemsModel(connection);

    const existingProblemByName = await Problems.findOne({ name: name.split() });

    if (existingProblemByName && existingProblemByName._id != num) {
      return NextResponse.json({ message: 'Problem name already used.' }, { status: 400 });
    }

    const updated = await Problems.findOneAndUpdate(
      { _id: num },
      { $set: { name, difficulty, content, testcases, timelimit, memorylimit } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: 'Problem not found' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Problem updated successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
};
