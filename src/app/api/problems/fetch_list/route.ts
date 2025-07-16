import { NextResponse } from 'next/server';
import { getProblemsModel } from '@/models/problemsModel';
import { connect_problems } from '@/dbConfig/dbConfig';

export const GET = async () => {
  try {
    const connection =  connect_problems();
    if(!connection) {
      return NextResponse.json({ error: 'DB connection failed' }, { status: 404 });
    }
    const Problems = getProblemsModel(connection);

    const problems = await Problems.find({}, '_id name difficulty').sort({ _id: 1 });

    return NextResponse.json({ problems }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Failed to fetch problems' }, { status: 500 });
  }
};