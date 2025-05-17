import { Metadata } from "next";
import App from "./app";

// const appUrl = process.env.NEXT_PUBLIC_URL;
// const appUrl = 'https://9cf4c62f-7bc5-42d6-a3d0-01aeaea50754-00-2obuwftnnc76u.kirk.replit.dev';
const appUrl = 'https://based-dungeons.vercel.app/';

const frame = {
  version: "next",
  imageUrl: `${appUrl}/crossedSwords.png`,
  button: {
    title: "Begin",
    action: {
      type: "launch_frame",
      name: "Fell The Dragon",
      url: appUrl,
      splashImageUrl: `${appUrl}/crossedSwordsLogo.png`,
      splashBackgroundColor: "#EAE3C8",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://based-dungeons.vercel.app/'),
    title: "Fell The Dragon",
    openGraph: {
      title: "Fell The Dragon",
      description: "Fell The Dragon",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}
