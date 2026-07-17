import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "unilecture_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000;
const REMEMBERED_SESSION_DURATION = 30 * SESSION_DURATION;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: number, remember = false) {
  const token = randomBytes(32).toString("base64url");
  const duration = remember
    ? REMEMBERED_SESSION_DURATION
    : SESSION_DURATION;
  const expiresAt = new Date(Date.now() + duration);

  await prisma.$transaction([
    prisma.session.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    }),
    prisma.session.create({
      data: {
        id: hashToken(token),
        userId,
        expiresAt,
      },
    }),
  ]);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    priority: "high",
    ...(remember ? { expires: expiresAt } : {}),
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session.deleteMany({
      where: { id: hashToken(token) },
    });
  }

  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { id: hashToken(token) },
    select: {
      expiresAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          userType: true,
        },
      },
    },
  });

  if (!session || session.expiresAt <= new Date()) {
    return null;
  }

  return session.user;
}
