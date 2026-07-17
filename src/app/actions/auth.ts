"use server";

import { redirect } from "next/navigation";

import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  deleteSession,
  getCurrentUser,
} from "@/lib/session";

type LoginField = "email" | "password";
type RegisterField =
  | "name"
  | "email"
  | "userType"
  | "password"
  | "passwordConfirm"
  | "terms";

export type LoginState = {
  fieldErrors?: Partial<Record<LoginField, string>>;
  message?: string;
  values?: {
    email: string;
    remember: boolean;
  };
};

export type RegisterState = {
  fieldErrors?: Partial<Record<RegisterField, string>>;
  message?: string;
  values?: {
    name: string;
    email: string;
    userType: string;
    acceptedTerms: boolean;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_TYPES = new Set(["high_school", "university", "worker", "other"]);
const FALLBACK_PASSWORD_HASH =
  "scrypt:00000000000000000000000000000000:373f8e9a7e5369a3f3a924ff35878d76d6b3a7b2b07c08bfa2dfc6668c6509ea582588264f33c6a923cce6a7ff40ceb56e4884712a16c1df06535d301e24b7d1";

function getText(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function getSafeReturnTo(formData: FormData) {
  const returnTo = getText(formData, "returnTo");

  try {
    const url = new URL(returnTo || "/", "http://localhost");

    if (url.origin !== "http://localhost") {
      return "/";
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = getText(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";
  const returnTo = getSafeReturnTo(formData);
  const values = { email, remember };
  const fieldErrors: LoginState["fieldErrors"] = {};

  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "有効なメールアドレスを入力してください。";
  }

  if (!password) {
    fieldErrors.password = "パスワードを入力してください。";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, values };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    const passwordMatches = await verifyPassword(
      password,
      user?.passwordHash ?? FALLBACK_PASSWORD_HASH,
    );

    if (!user?.passwordHash || !passwordMatches) {
      return {
        message: "メールアドレスまたはパスワードが正しくありません。",
        values,
      };
    }

    await createSession(user.id, remember);
  } catch (error) {
    console.error("Login failed", error);
    return {
      message: "ログイン処理に失敗しました。時間をおいて再度お試しください。",
      values,
    };
  }

  redirect(returnTo);
}

export async function registerAction(
  _previousState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const name = getText(formData, "name");
  const email = getText(formData, "email").toLowerCase();
  const userType = getText(formData, "userType");
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
  const acceptedTerms = formData.get("terms") === "on";
  const values = { name, email, userType, acceptedTerms };
  const fieldErrors: RegisterState["fieldErrors"] = {};

  if (name.length < 2 || name.length > 50) {
    fieldErrors.name = "氏名は2〜50文字で入力してください。";
  }

  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "有効なメールアドレスを入力してください。";
  }

  if (!USER_TYPES.has(userType)) {
    fieldErrors.userType = "利用者種別を選択してください。";
  }

  if (
    password.length < 8 ||
    !/[A-Za-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    fieldErrors.password =
      "パスワードは8文字以上で、英字と数字を含めてください。";
  }

  if (password !== passwordConfirm) {
    fieldErrors.passwordConfirm = "確認用パスワードが一致しません。";
  }

  if (!acceptedTerms) {
    fieldErrors.terms = "利用規約とプライバシーポリシーへの同意が必要です。";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, values };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return {
        fieldErrors: {
          email: "このメールアドレスはすでに登録されています。",
        },
        values,
      };
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        userType,
        passwordHash,
      },
    });

    await createSession(user.id, true);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return {
        fieldErrors: {
          email: "このメールアドレスはすでに登録されています。",
        },
        values,
      };
    }

    console.error("Registration failed", error);
    return {
      message: "登録処理に失敗しました。時間をおいて再度お試しください。",
      values,
    };
  }

  redirect("/");
}

export async function getSessionUserAction() {
  return getCurrentUser();
}

export async function logoutAction() {
  await deleteSession();
  redirect("/");
}
