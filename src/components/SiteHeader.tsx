"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "./Button";
import styles from "./SiteHeader.module.css";

type LoginUser = {
  name: string;
  email: string;
};

export default function SiteHeader() {
  const [user, setUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("unilecture_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("unilecture_user");
    setUser(null);
    window.location.href = "/";
  };

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

          <Link href="/plans" className={styles.navLink}>
            料金プラン
          </Link>
        </nav>

        <div className={styles.headerActions}>
          {user ? (
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

              <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                ログアウト
              </button>
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