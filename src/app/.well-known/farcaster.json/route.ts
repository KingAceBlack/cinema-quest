export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://cinema-quest-eosin.vercel.app";

  const config = {
    accountAssociation: {
      header: "eyJmaWQiOjIwMzU5LCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4YTVFNTBCMDg4Zjk0MEE2RjcwMTgzMUFCZjc2REVjNUNiQ2JCNDI5NCJ9",
      payload: "eyJkb21haW4iOiJjaW5lbWEtcXVlc3QtZW9zaW4udmVyY2VsLmFwcCJ9",
      signature: "Y5vPa13YuDKnWTLHfXGjE1KGl7TC1nHyNbJwQnfH5gBOmBl4YqF/c16m1drHCkMpuQYsXzMEp9H+rat8WKVTNxs="
    },
    frame: {
      version: "1",
      name: "Movie Quest",
      iconUrl: `${baseUrl}/icon.png`,
      homeUrl: baseUrl,
      imageUrl: `${baseUrl}/image.png`,
      buttonTitle: "Play Game",
      splashImageUrl: `${baseUrl}/splash.png`,
      splashBackgroundColor: "#6200EA",
      webhookUrl: `${baseUrl}/api/webhook`,
      subtitle: "Figure out the movie",
      description: "Test your knowledge of movies, guess the film on display",
      primaryCategory: "games",
      tags: ["movie", "gaming", "puzzle", "trending"]
    }
  };

  return Response.json(config);
}
