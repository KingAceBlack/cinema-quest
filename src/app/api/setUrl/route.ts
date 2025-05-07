import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

const client = new MongoClient(uri, {
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
});

// Reuse the database connection
let isConnected = false;

export async function POST(request: Request) {
  try {
    let url;

    // Check the content type
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      // Parse JSON body
      const body = await request.json();
      url = body.url;
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      // Parse form-encoded body
      const formData = await request.text();
      const params = new URLSearchParams(formData);
      url = params.get('url');
    }

    // Validate the URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // Connect to MongoDB
    if (!isConnected) {
      await client.connect();
      isConnected = true;
    }

    const db = client.db(); // Optionally specify a database name if needed
    const collection = db.collection('kb1'); // Ensure this matches your collection name

    const result = await collection.findOneAndUpdate(
      { key: 'setUrl' }, // Filter to ensure only one record
      { $set: { url } }, // Update the URL field
      { upsert: true, returnDocument: 'after' } // Create if not exists, return the updated document
    );

    return NextResponse.redirect(`https://kbtestframe.replit.app/`, 303);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
