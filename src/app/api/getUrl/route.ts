import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
let client;
let isConnected = false;

// Only set up Mongo if URI exists
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

export async function GET() {
  try {
    // If no DB configured, just return a default response
    if (!uri) {
      console.warn("⚠ MONGODB_URI is not set — returning null URL.");
      return NextResponse.json({ url: null }, { status: 200 });
    }

    if (!isConnected) {
      await client.connect();
      isConnected = true;
    }

    const db = client.db();
    const collection = db.collection('kb1');
    const record = await collection.findOne({ key: 'setUrl' });

    return NextResponse.json(
      { url: record ? record.url : null },
      { status: 200 }
    );

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 500 });
  }
}
