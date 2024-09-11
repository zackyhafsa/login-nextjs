import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "User tidak ditemukan",
        },
        { status: 404 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          message: "Password salah",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        user,
        message: "email dan password benar",
      },
      {
        status: 200,
      }
    );
  } catch (error) {}
}
