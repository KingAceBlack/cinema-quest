import { Metadata } from "next";
import App from "~/app/app";

// const appUrl = process.env.NEXT_PUBLIC_URL;
// const appUrl = 'https://9cf4c62f-7bc5-42d6-a3d0-01aeaea50754-00-2obuwftnnc76u.kirk.replit.dev';
const appUrl = 'https://SouthCastleGives.replit.app';

const frame = {
  version: "next",
  // imageUrl: `${appUrl}/frames/hello/opengraph-image`,
  imageUrl: `${appUrl}/southCastleGives.png`,
  button: {
    title: "Launch Frame",
    action: {
      type: "launch_frame",
      name: "South Castle Gives",
      url: `${appUrl}/frames/hello/`,
      splashImageUrl: `${appUrl}/splash.jpg`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export const metadata: Metadata = {
  title: "South Castle Gives",
  description: "South Castle New Year's Charity Drive",
  openGraph: {
    title: "South Castle Gives",
    description: "South Castle New Year's Charity Drive",
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function HelloFrame() {
  return <App title={"South Castle Gives"} />;
}
