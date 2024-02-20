import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function POST(req: Request) {
  try {
    const authId = req.headers.get("authorization");
    const validUser = db.user.findFirst({
      where: {
        id: authId || "",
      },
    });

    if (!validUser) {
      return NextResponse.json(null);
    }

    const body = await req.json();

    const post = await db.post.create({
      data: body,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
