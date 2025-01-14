
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    await client.connect();
    const db = client.db();

    const result = await db.collection('kb1').insertOne({ url });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
