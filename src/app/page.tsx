import { Metadata } from "next";
import App from "./app";

// const appUrl = process.env.NEXT_PUBLIC_URL;
// const appUrl = 'https://9cf4c62f-7bc5-42d6-a3d0-01aeaea50754-00-2obuwftnnc76u.kirk.replit.dev';
const appUrl = 'https://kbtestframe.replit.app';

const frame = {
  version: "next",
  imageUrl: `${appUrl}/crossedSwords.png`,
  button: {
    title: "Launch Frame",
    action: {
      type: "launch_frame",
      name: "kb test",
      url: appUrl,
      splashImageUrl: `${appUrl}/crossedSwordsLogo.png`,
      splashBackgroundColor: "#EAE3C8",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "kb test",
    openGraph: {
      title: "kb test",
      description: "kb test",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}
