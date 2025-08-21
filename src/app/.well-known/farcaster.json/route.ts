export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      "header": "eyJmaWQiOjIwMzU5LCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4YTVFNTBCMDg4Zjk0MEE2RjcwMTgzMUFCZjc2REVjNUNiQ2JCNDI5NCJ9",
        "payload": "eyJkb21haW4iOiJjaW5lbWEtcXVlc3QtZW9zaW4udmVyY2VsLmFwcCJ9",
        "signature": "Y5vPa13YuDKnWTLHfXGjE1KGl7TC1nHyNbJwQnfH5gBOmBl4YqF/c16m1drHCkMpuQYsXzMEp9H+rat8WKVTNxs="
    },
    frame: {
    version: "1",
    name: "Movie Quest",
    iconUrl: "https://https://cinema-quest-eosin.vercel.app/icon.png",
    homeUrl: "https://https://cinema-quest-eosin.vercel.app",
    imageUrl: "https://https://cinema-quest-eosin.vercel.app/image.png",
    buttonTitle: "Play Game",
    splashImageUrl: "https://https://cinema-quest-eosin.vercel.app/splash.png",
    splashBackgroundColor: "#6200EA",
    webhookUrl: "https://https://cinema-quest-eosin.vercel.app/api/webhook",
    subtitle: "Figure out the movie",
    description: "Test your knowledge of movies, guess the film on display",
    primaryCategory: "games",
    tags: [
      "movie",
      "gaming",
      "puzzle",
      "trending"
    ]
      
      
    },
  };

  return Response.json(config);
}
