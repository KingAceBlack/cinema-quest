import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Movie Quest";
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{
    name: string;
  }>;
}

export default async function Image({ params }: Props) {
  const { name } = await params;

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center relative bg-white">
        <h1 tw="text-6xl">Movie Quest</h1>
      </div>
    ),
    {
      ...size,
    }
  );
}
