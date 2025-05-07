import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

// Create a single MongoDB client instance
let client;
let clientPromise;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Removing serverApi because it's not necessary for SRV connections
    });
    clientPromise = client.connect();
  }
  await clientPromise;
  return client.db('FTDMiniApp'); // Replace with your actual database name
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

    const document = {
      fid,
      username,
      timestamp: Date.now(),
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