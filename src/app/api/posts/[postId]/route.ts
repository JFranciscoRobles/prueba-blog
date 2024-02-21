
import { db } from "@/lib/server/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    if (!params.postId) {
      return new NextResponse("Post id is required", { status: 400 });
    }

    const post = await db.post.findUnique({
      where: {
        id: params.postId,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const body = await req.json();
    const post = await db.post.update({
      where: {
        id: params.postId,
      },
      data: body,
    });

    return NextResponse.json({
      post,
    });
  } catch (error) {
    console.log("[POST_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
