import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await prisma.user.create({
      data: {
        name: body.name || "Test Admin",
        email: body.email || `dev-${Date.now()}@example.com`,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("PRISMA ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}