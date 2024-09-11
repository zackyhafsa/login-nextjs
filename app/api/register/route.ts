import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password } = body;

    // cek apakah email sudah tersedia atau belum
    const existingEmailUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmailUser) {
      return NextResponse.json(
        {
          message: "email already exists",
        },
        { status: 409 }
      );
    }

    // hasing password
    const hashingPassword = await bcrypt.hash(password, 10);

    // menambahkan data user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashingPassword,
      },
    });

    return NextResponse.json({ newUser, message: "Data berhasil ditambahkan" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Data user gagal ditambahkan",
      },
      { status: 400 }
    );
  }
}
