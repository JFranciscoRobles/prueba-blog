import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const verifyEmail = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (verifyEmail) {
      return new NextResponse("Ya existe un usuario con ese correo.", {
        status: 500,
      });
    }
    body.password = await bcrypt.hash(body.password, 10);

    const user = await db.user.create({
      data: body,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
