"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  registerAction,
  type RegisterState,
} from "@/app/actions/auth";
import Button from "@/components/Button";
import common from "@/styles/common.module.css";
import styles from "./register.module.css";

const initialState: RegisterState = {};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <>
      <form className={common.form} action={formAction}>
        <label className={common.formGroup} htmlFor="register-name">
          <span className={common.label}>氏名</span>

          <input
            id="register-name"
            type="text"
            name="name"
            placeholder="山田 太郎"
            className={`${common.input} ${state.fieldErrors?.name ? common.inputError : ""}`}
            defaultValue={state.values?.name}
            autoComplete="name"
            minLength={2}
            maxLength={50}
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={
              state.fieldErrors?.name ? "register-name-error" : undefined
            }
            required
          />

          {state.fieldErrors?.name && (
            <span id="register-name-error" className={common.fieldError}>
              {state.fieldErrors.name}
            </span>
          )}
        </label>

        <label className={common.formGroup} htmlFor="register-email">
          <span className={common.label}>メールアドレス</span>

          <input
            id="register-email"
            type="email"
            name="email"
            placeholder="example@mail.com"
            className={`${common.input} ${state.fieldErrors?.email ? common.inputError : ""}`}
            defaultValue={state.values?.email}
            autoComplete="email"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={
              state.fieldErrors?.email ? "register-email-error" : undefined
            }
            required
          />

          {state.fieldErrors?.email && (
            <span id="register-email-error" className={common.fieldError}>
              {state.fieldErrors.email}
            </span>
          )}
        </label>

        <label className={common.formGroup} htmlFor="register-user-type">
          <span className={common.label}>利用者種別</span>

          <select
            id="register-user-type"
            name="userType"
            className={`${common.input} ${state.fieldErrors?.userType ? common.inputError : ""}`}
            defaultValue={state.values?.userType ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.userType)}
            aria-describedby={
              state.fieldErrors?.userType
                ? "register-user-type-error"
                : undefined
            }
            required
          >
            <option value="" disabled>
              選択してください
            </option>
            <option value="high_school">高校生</option>
            <option value="university">大学生</option>
            <option value="worker">社会人</option>
            <option value="other">その他</option>
          </select>

          {state.fieldErrors?.userType && (
            <span id="register-user-type-error" className={common.fieldError}>
              {state.fieldErrors.userType}
            </span>
          )}
        </label>

        <label className={common.formGroup} htmlFor="register-password">
          <span className={common.label}>パスワード</span>

          <input
            id="register-password"
            type="password"
            name="password"
            placeholder="8文字以上・英字と数字を含む"
            className={`${common.input} ${state.fieldErrors?.password ? common.inputError : ""}`}
            autoComplete="new-password"
            minLength={8}
            aria-invalid={Boolean(state.fieldErrors?.password)}
            aria-describedby="register-password-help"
            required
          />

          <span
            id="register-password-help"
            className={
              state.fieldErrors?.password ? common.fieldError : common.fieldHint
            }
          >
            {state.fieldErrors?.password ??
              "8文字以上で、英字と数字をそれぞれ1文字以上含めてください。"}
          </span>
        </label>

        <label
          className={common.formGroup}
          htmlFor="register-password-confirm"
        >
          <span className={common.label}>パスワード確認</span>

          <input
            id="register-password-confirm"
            type="password"
            name="passwordConfirm"
            placeholder="もう一度パスワードを入力"
            className={`${common.input} ${state.fieldErrors?.passwordConfirm ? common.inputError : ""}`}
            autoComplete="new-password"
            minLength={8}
            aria-invalid={Boolean(state.fieldErrors?.passwordConfirm)}
            aria-describedby={
              state.fieldErrors?.passwordConfirm
                ? "register-password-confirm-error"
                : undefined
            }
            required
          />

          {state.fieldErrors?.passwordConfirm && (
            <span
              id="register-password-confirm-error"
              className={common.fieldError}
            >
              {state.fieldErrors.passwordConfirm}
            </span>
          )}
        </label>

        <div>
          <label className={styles.checkLabel}>
            <input
              type="checkbox"
              name="terms"
              defaultChecked={state.values?.acceptedTerms}
              aria-invalid={Boolean(state.fieldErrors?.terms)}
              aria-describedby={
                state.fieldErrors?.terms ? "register-terms-error" : undefined
              }
              required
            />

            <span>
              <Link href="/terms" className={common.textLink}>
                利用規約
              </Link>
              と
              <Link href="/privacy" className={common.textLink}>
                プライバシーポリシー
              </Link>
              に同意します
            </span>
          </label>

          {state.fieldErrors?.terms && (
            <span id="register-terms-error" className={common.fieldError}>
              {state.fieldErrors.terms}
            </span>
          )}
        </div>

        {state.message && (
          <p className={common.formError} role="alert" aria-live="polite">
            {state.message}
          </p>
        )}

        <Button type="submit" fullWidth size="lg" disabled={pending}>
          {pending ? "登録中…" : "無料で登録する"}
        </Button>
      </form>

      <div className={common.divider}>
        <span>または</span>
      </div>

      <Button variant="secondary" fullWidth disabled>
        Google登録（準備中）
      </Button>

      <p className={styles.loginText}>
        すでにアカウントをお持ちの方は{" "}
        <Link href="/login">ログイン</Link>
      </p>
    </>
  );
}
