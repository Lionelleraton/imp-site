import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();

  const response = await handleUpload({
    body,
    request,
    token: process.env.BLOB_READ_WRITE_TOKEN,
    onBeforeGenerateToken: async () => {
      return {
        access: "public",
        addRandomSuffix: false,
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/jpg",
        ],
      };
    },
    onUploadCompleted: async () => {
      return;
    },
  });

  return NextResponse.json(response);
}
