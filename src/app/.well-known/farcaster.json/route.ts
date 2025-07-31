export async function GET() {
  // const appUrl = process.env.NEXT_PUBLIC_URL;
  // const appUrl = 'https://9cf4c62f-7bc5-42d6-a3d0-01aeaea50754-00-2obuwftnnc76u.kirk.replit.dev';
  const appUrl = 'https://based-dungeons.vercel.app';



  const config = {
    "accountAssociation": {
    "header": "eyJmaWQiOjIwMzU5LCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4N2IxYTc1ZGYyMDMxOTU5NTU2YzA3MjI3YTI3NDAwZjQ5NjZlNDQyMTBjZWQ1MDAzMzdmOGU0YzZhM2Y0NzM0NCJ9",
    "payload": "eyJkb21haW4iOiJiYXNlZC1kdW5nZW9ucy52ZXJjZWwuYXBwIn0",
    "signature": "S6m54usU3ihFLopJVHLEGKOslUn+851JvpobD7x7bVlPNhIO17iSfOeActc9h7ZFgJ3NoP3ZCAiQOsdcUhyrVRs="
      
  },
   
  };

  return Response.json(config);
}

// {
//   "accountAssociation": {
//     "header": "eyJmaWQiOjIxMzEwMywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEVhQTJGOGIwOTEzNTI3ZDYyNzE5MTVkNzQ1MDdlMDdFNmUzMjRmNDAifQ",
//     "payload": "eyJkb21haW4iOiJzb3V0aGNhc3RsZWdpdmVzLnJlcGxpdC5hcHAifQ",
//     "signature": "MHhiNWZlNzI1ZDdmYTljNmIzNDg2NjA4ZWY4NTUzN2NjM2Q4NmM5ZDg3YWYxZDJiMmEzOGY0YzVlY2UyNzBiNTY0NmRlNGIwMmFmMjYyZTc3YTAyMTdjZDA5MThjMjU1ZjE0Y2M2ZGU2YTUwYmNiZDU4MTczYjMxZTg4OTlhMDg1NzFj"
//   },
//   "frame": {
//     "version": "1",
//     "name": "South Castle Gives",
//     "iconUrl": "https://SouthCastleGives.replit.app/icon.jpg",
//     "homeUrl": "https://SouthCastleGives.replit.app",
//     "imageUrl": "https://SouthCastleGives.replit.app/scgWithSubtext.png",
//     "buttonTitle": "Launch Frame",
//     "splashImageUrl": "https://SouthCastleGives.replit.app/splash.jpg",
//     "splashBackgroundColor": "#233D2B",
//     "webhookUrl": "https://SouthCastleGives.replit.app/api/webhook",
//   },
// }
