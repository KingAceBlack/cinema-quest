
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

const client = new MongoClient(uri);
let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db('FTDMiniApp');
}

export async function POST(request) {
  try {
    console.log('Received POST request to /api/logUser');
    const { fid, username } = await request.json();
    console.log('Request data:', { fid, username });

    if (!fid || !username) {
      console.log('Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const collection = db.collection('user_logs_test');

    const timestamp = Date.now(); // Unix timestamp
    
    // Check for recent logs from same user (within last 1 second)
    const recentLog = await collection.findOne({
      fid,
      timestamp: { $gt: timestamp - 1000 }
    });

    if (recentLog) {
      console.log('Duplicate log prevented for user:', username);
      return NextResponse.json({ success: true, id: recentLog._id });
    }

    const document = {
      fid,
      username,
      timestamp
    };
    console.log('Attempting to insert document:', document);

    const result = await collection.insertOne(document);
    console.log('Insert result:', result);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
  }
}
