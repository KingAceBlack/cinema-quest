export async function GET() {
  // const appUrl = process.env.NEXT_PUBLIC_URL;
  // const appUrl = 'https://9cf4c62f-7bc5-42d6-a3d0-01aeaea50754-00-2obuwftnnc76u.kirk.replit.dev';
  const appUrl = 'https://SouthCastleGives.replit.app';

  // "accountAssociation": {
    //   "header": "eyJmaWQiOjIxMzEwMywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEVhQTJGOGIwOTEzNTI3ZDYyNzE5MTVkNzQ1MDdlMDdFNmUzMjRmNDAifQ",
    //   "payload": "eyJkb21haW4iOiI5Y2Y0YzYyZi03YmM1LTQyZDYtYTNkMC0wMWFlYWVhNTA3NTQtMDAtMm9idXdmdG5uYzc2dS5raXJrLnJlcGxpdC5kZXYifQ",
    //   "signature": "MHhhY2JjZjFlOWVhM2E0NDM2Nzc1M2Y3YTM5NDRkYzQ4ZTM2MDIyODdiMTg5N2VlOGQ2NjAwNWZhZjViYjMwNzBlNmVhMDVhNjljNzBlNDQ2ODFkNzg1YzdiMmE1MmQ3MjZjOTA1YjliMDU0MTRiNGM5OTE2NjAyNDhlZDk4YzJiNzFj"
  // },
  
  const config = {
    "accountAssociation": {
      "header": "eyJmaWQiOjIxMzEwMywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEVhQTJGOGIwOTEzNTI3ZDYyNzE5MTVkNzQ1MDdlMDdFNmUzMjRmNDAifQ",
      "payload": "eyJkb21haW4iOiJzb3V0aGNhc3RsZWdpdmVzLnJlcGxpdC5hcHAifQ",
      "signature": "MHhiNWZlNzI1ZDdmYTljNmIzNDg2NjA4ZWY4NTUzN2NjM2Q4NmM5ZDg3YWYxZDJiMmEzOGY0YzVlY2UyNzBiNTY0NmRlNGIwMmFmMjYyZTc3YTAyMTdjZDA5MThjMjU1ZjE0Y2M2ZGU2YTUwYmNiZDU4MTczYjMxZTg4OTlhMDg1NzFj"
    },
    frame: {
      version: "1",
      name: "South Castle Gives",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/frames/hello/opengraph-image`,
      buttonTitle: "Launch Frame",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
