import type { Metadata } from "next";

// import { getSession } from "~/auth"
import "~/app/globals.css";
import { Providers } from "~/app/providers";

export const metadata: Metadata = {
  title: "Movie Quest",
  description: "Movie Quest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getSession()
  
  return (
    <html lang="en">
      <body>
        <Providers >{children}</Providers>
      </body>
    </html>
  );
}
