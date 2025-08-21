export async function GET() {
  return new Response(
    JSON.stringify({
      accountAssociation: {
        "header": "eyJmaWQiOjIwMzU5LCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4YTVFNTBCMDg4Zjk0MEE2RjcwMTgzMUFCZjc2REVjNUNiQ2JCNDI5NCJ9",
        "payload": "eyJkb21haW4iOiJodHRwczovL2NpbmVtYS1xdWVzdC1lb3Npbi52ZXJjZWwuYXBwLyJ9",
        "signature": "ZFzIvTPSP6+qIqxrCRng+oo/z2t3VjQiH0d03KurLKoffEYUR3Mt73gKCVyifCANO1e0PhwmncCx1mBAeuTs6xw="
      }
    }),


    
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    }
  );
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
