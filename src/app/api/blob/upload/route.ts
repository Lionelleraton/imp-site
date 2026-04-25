import { handleUpload } from "@vercel/blob/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  getAdminSessionCookieName,
  verifyAdminSessionToken,
} from "@/lib/security-tokens";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(getAdminSessionCookieName())?.value;
  const session = verifyAdminSessionToken(sessionToken);

  if (!session) {
    return NextResponse.json({ error: "Accès non autorisé." }, { status: 401 });
  }

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
