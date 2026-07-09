"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import Button from "../../components/Button";
import common from "../../styles/common.module.css";
import styles from "./register.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    
      const formData = new FormData(event.currentTarget);
    
      const name = String(formData.get("name"));
      const email = String(formData.get("email"));
      const userType = String(formData.get("userType"));
    
      const newUser = {
        name,
        email,
        userType,
      };
  
      const storedUsers = localStorage.getItem("unilecture_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      const updatedUsers = [
        ...users.filter((user: { email: string }) => user.email !== email),
        newUser,
      ];
  
      localStorage.setItem("unilecture_users", JSON.stringify(updatedUsers));
      localStorage.setItem("unilecture_user", JSON.stringify(newUser));
  
      router.push("/");
    };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={common.logo}>
          <div className={common.logoMark}>U</div>

          <div>
            <p className={common.logoTitle}>UniLecture</p>
            <p className={common.logoSubtitle}>大学講義サブスク</p>
          </div>
        </Link>

        <div className={styles.headerAction}>
          <span className={styles.headerText}>
            すでにアカウントをお持ちの方
          </span>

          <Button href="/login" variant="secondary" size="sm">
            ログイン
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.leftArea}>
          <div className={styles.badge}>
            🚀 無料ではじめる
          </div>

          <h1 className={styles.title}>
            大学の公式講義を、
            <span>あなたの学びに。</span>
          </h1>

          <p className={styles.description}>
            興味のある大学や専門分野の講義を自由に選択。
            高校生の進路選択、大学生の他分野学習、社会人の学び直しを支援します。
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🎓</div>

              <div>
                <p className={styles.featureTitle}>大学公式講義を視聴</p>
                <p className={styles.featureText}>
                  加盟大学が公開を許可した講義を安心して学べます。
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🔍</div>

              <div>
                <p className={styles.featureTitle}>分野や大学から探せる</p>
                <p className={styles.featureText}>
                  情報、経済、心理、理工、法律など興味に合わせて検索できます。
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>📈</div>

              <div>
                <p className={styles.featureTitle}>学習状況を管理</p>
                <p className={styles.featureText}>
                  視聴中の講義や学習進捗をマイページで確認できます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cardArea}>
          <div className={`${common.card} ${styles.registerCard}`}>
            <div className={styles.cardHeader}>
              <p className={styles.cardEyebrow}>REGISTER</p>

              <h2 className={styles.cardTitle}>新規登録</h2>

              <p className={styles.cardDescription}>
                アカウントを作成して講義の視聴を始めましょう。
              </p>
            </div>

            <form className={common.form} onSubmit={handleSubmit}>
              <label className={common.formGroup}>
                <span className={common.label}>氏名</span>

                <input
                  type="text"
                  name="name"
                  placeholder="山田 太郎"
                  className={common.input}
                  required
                />
              </label>

              <label className={common.formGroup}>
                <span className={common.label}>メールアドレス</span>

                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  className={common.input}
                  required
                />
              </label>

              <label className={common.formGroup}>
                <span className={common.label}>利用者種別</span>

                <select
                  name="userType"
                  className={common.input}
                  defaultValue=""
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
              </label>

              <label className={common.formGroup}>
                <span className={common.label}>パスワード</span>

                <input
                  type="password"
                  name="password"
                  placeholder="8文字以上で入力"
                  className={common.input}
                  required
                />
              </label>

              <label className={common.formGroup}>
                <span className={common.label}>パスワード確認</span>

                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="もう一度パスワードを入力"
                  className={common.input}
                  required
                />
              </label>

              <label className={styles.checkLabel}>
                <input type="checkbox" required />

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

              <Button type="submit" fullWidth size="lg">
                無料で登録する
              </Button>
            </form>

            <div className={common.divider}>
              <span>または</span>
            </div>

            <Button variant="secondary" fullWidth>
              Googleで登録
            </Button>

            <p className={styles.loginText}>
              すでにアカウントをお持ちの方は{" "}
              <Link href="/login">ログイン</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}