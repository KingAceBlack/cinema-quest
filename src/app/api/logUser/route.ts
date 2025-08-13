import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
let client;
let isConnected = false;

// Only initialize if MongoDB URI is present
if (uri) {
  client = new MongoClient(uri, {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true
    }
  });
}

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

    // If no MongoDB configured, skip DB logic but still respond success
    if (!uri) {
      console.warn('⚠ MONGODB_URI not set — skipping log to database.');
      return NextResponse.json({ success: true, id: null, skippedDB: true });
    }

    const db = await connectToDatabase();
    const collection = db.collection('user_logs_test');

    const timestamp = Date.now();

    // Check for recent logs from same user (within last 1 second)
    const recentLog = await collection.findOne({
      fid,
      timestamp: { $gt: timestamp - 1000 }
    });

    if (recentLog) {
      console.log('Duplicate log prevented for user:', username);
      return NextResponse.json({ success: true, id: recentLog._id });
    }

    const document = { fid, username, timestamp };
    console.log('Attempting to insert document:', document);

    const result = await collection.insertOne(document);
    console.log('Insert result:', result);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
  }
}
