"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  loginAction,
  type LoginState,
} from "@/app/actions/auth";
import Button from "@/components/Button";
import common from "@/styles/common.module.css";
import styles from "./login.module.css";

const initialState: LoginState = {};

type LoginFormProps = {
  returnTo?: string;
};

export default function LoginForm({ returnTo = "/" }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <>
      <form className={common.form} action={formAction}>
        <input type="hidden" name="returnTo" value={returnTo} />

        <label className={common.formGroup} htmlFor="login-email">
          <span className={common.label}>メールアドレス</span>

          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="example@mail.com"
            className={`${common.input} ${state.fieldErrors?.email ? common.inputError : ""}`}
            defaultValue={state.values?.email}
            autoComplete="email"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={
              state.fieldErrors?.email ? "login-email-error" : undefined
            }
            required
          />

          {state.fieldErrors?.email && (
            <span id="login-email-error" className={common.fieldError}>
              {state.fieldErrors.email}
            </span>
          )}
        </label>

        <label className={common.formGroup} htmlFor="login-password">
          <span className={common.label}>パスワード</span>

          <input
            id="login-password"
            type="password"
            name="password"
            placeholder="パスワードを入力"
            className={`${common.input} ${state.fieldErrors?.password ? common.inputError : ""}`}
            autoComplete="current-password"
            aria-invalid={Boolean(state.fieldErrors?.password)}
            aria-describedby={
              state.fieldErrors?.password ? "login-password-error" : undefined
            }
            required
          />

          {state.fieldErrors?.password && (
            <span id="login-password-error" className={common.fieldError}>
              {state.fieldErrors.password}
            </span>
          )}
        </label>

        <div className={styles.formOptions}>
          <label className={styles.checkLabel}>
            <input
              type="checkbox"
              name="remember"
              defaultChecked={state.values?.remember}
            />
            <span>ログイン状態を保持する</span>
          </label>

          <span className={styles.comingSoon}>
            パスワード再設定は準備中です
          </span>
        </div>

        {state.message && (
          <p className={common.formError} role="alert" aria-live="polite">
            {state.message}
          </p>
        )}

        <Button type="submit" fullWidth size="lg" disabled={pending}>
          {pending ? "ログイン中…" : "ログイン"}
        </Button>
      </form>

      <div className={common.divider}>
        <span>または</span>
      </div>

      <Button variant="secondary" fullWidth disabled>
        Googleログイン（準備中）
      </Button>

      <p className={styles.registerText}>
        アカウントをお持ちでない方は{" "}
        <Link href="/register">新規登録</Link>
      </p>
    </>
  );
}
