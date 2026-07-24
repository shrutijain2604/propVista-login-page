import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { DEMO_EMAIL } from "@/lib/demo-user";
import { createUser, getUser } from "@/lib/user-store";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }
  if (email.toLowerCase() === DEMO_EMAIL || getUser(email)) {
    return NextResponse.json({ error: "That email is already registered." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  createUser(email, passwordHash);

  return NextResponse.json({ ok: true }, { status: 201 });
}
