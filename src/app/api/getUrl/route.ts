import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

const client = new MongoClient(uri);
let isConnected = false;

export async function GET() {
  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
    }

    const db = client.db();
    const collection = db.collection('kb1');

    // Fetch the stored URL
    const record = await collection.findOne({ key: 'setUrl' });

    if (!record) {
      return NextResponse.json({ url: null }, { status: 200 });
    }

    return NextResponse.json({ url: record.url }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 500 });
  }
}
