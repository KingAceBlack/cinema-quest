
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

const client = new MongoClient(uri);
let isConnected = false;

export async function POST(request: Request) {
  try {
    const { fid, username } = await request.json();

    if (!fid || !username) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isConnected) {
      await client.connect();
      isConnected = true;
    }

    const db = client.db();
    const collection = db.collection('user_logs');

    const result = await collection.insertOne({
      fid,
      username,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
