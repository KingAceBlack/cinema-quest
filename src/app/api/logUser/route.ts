
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
    console.log('Received POST request to /api/logUser');
    const { fid, username } = await request.json();
    console.log('Request data:', { fid, username });

    if (!fid || !username) {
      console.log('Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isConnected) {
      console.log('Connecting to MongoDB...');
      await client.connect();
      isConnected = true;
      console.log('Connected to MongoDB successfully');
    }

    const db = client.db();
    const collection = db.collection('user_logs');
    
    const document = {
      fid,
      username,
      timestamp: new Date(),
    };
    console.log('Attempting to insert document:', document);

    const result = await collection.insertOne(document);
    console.log('Insert result:', result);

    // Verify the insert by reading it back
    const verification = await collection.findOne({ _id: result.insertedId });
    console.log('Verification read:', verification);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
