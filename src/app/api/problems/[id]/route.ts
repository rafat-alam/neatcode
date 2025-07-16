import { NextRequest, NextResponse } from 'next/server';
import { getProblemsModel } from '@/models/problemsModel';
import { connect_problems } from '@/dbConfig/dbConfig';

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

    const problem = await Problems.findById(_id);

    if (!problem) {
      return NextResponse.json({ message: 'Problem not found' }, { status: 404 });
    }

    return NextResponse.json({ problem }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
};
