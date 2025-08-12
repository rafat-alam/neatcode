import { NextRequest, NextResponse } from 'next/server';
import { getProblemsModel } from '@/models/problemsModel';
import { connect_problems } from '@/dbConfig/dbConfig';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authoptions';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const connection =  connect_problems();
    if(!connection) {
      return NextResponse.json({ error: 'DB connection failed' }, { status: 404 });
    }
    const Problems = getProblemsModel(connection);

    const { id } = await params;
    const _id = parseInt(id, 10);
    
    if (isNaN(_id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const fproblem = await Problems.findById(_id);

    if (!fproblem) {
      return NextResponse.json({ message: 'Problem not found' }, { status: 404 });
    }

    console.log(fproblem)

    let problem = {
      _id: fproblem._id,
      name: fproblem.name,
      difficulty: fproblem.difficulty,
      content: fproblem.content,
      timelimit: fproblem.timelimit,
      memorylimit: fproblem.memorylimit,
    }
    
    const session = await getServerSession(authOptions);

    if(!session) {
      return NextResponse.json({ problem }, { status: 200 });
    }

    if(!session.user.isEditor) {
      return NextResponse.json({ problem }, { status: 200 });
    }

    problem = fproblem;

    return NextResponse.json({ problem }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
};