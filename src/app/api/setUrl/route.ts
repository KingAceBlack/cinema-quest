import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
let client;
let isConnected = false;

// Only initialize MongoDB if URI exists
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

export async function POST(request) {
  try {
    let url;

    // Check the content type
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const body = await request.json();
      url = body.url;
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      const formData = await request.text();
      const params = new URLSearchParams(formData);
      url = params.get('url');
    }

    // Validate URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // If no MongoDB configured, just log & skip DB write
    if (!uri) {
      console.warn("⚠ MONGODB_URI not set — skipping database write.");
      return NextResponse.redirect(`https://movie-quest-sigma.vercel.app/`, 303);
    }

    // Connect to MongoDB
    if (!isConnected) {
      await client.connect();
      isConnected = true;
    }

    const db = client.db();
    const collection = db.collection('kb1');

    await collection.findOneAndUpdate(
      { key: 'setUrl' },
      { $set: { url } },
      { upsert: true, returnDocument: 'after' }
    );

    return NextResponse.redirect(`https://movie-quest-sigma.vercel.app/`, 303);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
