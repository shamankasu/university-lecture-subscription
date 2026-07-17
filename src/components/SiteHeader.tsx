"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  getSessionUserAction,
  logoutAction,
} from "@/app/actions/auth";
import Button from "./Button";
import styles from "./SiteHeader.module.css";

type LoginUser = {
  name: string;
  email: string;
};

export default function SiteHeader() {
  const [user, setUser] = useState<LoginUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    void getSessionUserAction()
      .then((sessionUser) => {
        if (isActive) {
          setUser(sessionUser);
        }
      })
      .catch(() => {
        if (isActive) {
          setUser(null);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>U</div>

          <div>
            <p className={styles.logoTitle}>UniLecture</p>
            <p className={styles.logoSubtitle}>大学講義サブスク</p>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link href="/courses" className={styles.navLink}>
            講義を探す
          </Link>

          <Link href="/universities" className={styles.navLink}>
            大学から探す
          </Link>

          <Link href="/pricing" className={styles.navLink}>
            料金プラン
          </Link>
        </nav>

        <div className={styles.headerActions}>
          {isLoading ? (
            <div
              className={styles.accountSkeleton}
              aria-label="アカウント情報を確認中"
            />
          ) : user ? (
            <div className={styles.accountArea}>
              <Link href="/mypage" className={styles.accountButton}>
                <div className={styles.avatar}>
                  {user.name.slice(0, 1)}
                </div>

                <div className={styles.accountText}>
                  <span className={styles.accountName}>{user.name}</span>
                  <span className={styles.accountEmail}>{user.email}</span>
                </div>
              </Link>

              <form action={logoutAction}>
                <LogoutButton />
              </form>
            </div>
          ) : (
            <>
              <Button href="/login" variant="ghost" size="sm">
                ログイン
              </Button>

              <Button href="/register" size="sm">
                無料で始める
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={styles.logoutButton}
      disabled={pending}
    >
      {pending ? "処理中…" : "ログアウト"}
    </button>
  );
}
