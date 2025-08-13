import { Metadata } from "next";
import App from "./app";

// const appUrl = process.env.NEXT_PUBLIC_URL;
// const appUrl = 'https://9cf4c62f-7bc5-42d6-a3d0-01aeaea50754-00-2obuwftnnc76u.kirk.replit.dev';
const appUrl = 'https://cinema-quest-eosin.vercel.app/';

const frame = {
  version: "next",
  imageUrl: `${appUrl}/crossedSwords.png`,
  button: {
    title: "Begin",
    action: {
      type: "launch_frame",
      name: "Movie Quest",
      url: appUrl,
      splashImageUrl: `${appUrl}/crossedSwordsLogo.png`,
      splashBackgroundColor: "#EAE3C8",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://cinema-quest-eosin.vercel.app/'),
    title: "Fell The Dragon",
    openGraph: {
      title: "Movie Quest",
      description: "Movie Quest",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}
