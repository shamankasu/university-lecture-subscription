import Link from "next/link";

import Button from "../../components/Button";
import common from "../../styles/common.module.css";
import LoginForm from "./LoginForm";
import styles from "./login.module.css";

type LoginPageProps = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const query = await searchParams;
  const returnTo = Array.isArray(query.returnTo)
    ? query.returnTo[0]
    : query.returnTo;

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
            アカウントをお持ちでない方
          </span>

          <Button href="/register" variant="secondary" size="sm">
            新規登録
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.leftArea}>
          <div className={styles.badge}>
            🎓 大学の学びを、もっと自由に
          </div>

          <h1 className={styles.title}>
            公式講義にログインして、
            <span>学習を続けよう。</span>
          </h1>

          <p className={styles.description}>
            複数大学の講義動画、資料、小テストをひとつの場所で管理。
            あなたの学習進捗に合わせて、続きからすぐに学べます。
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>▶</div>

              <div>
                <p className={styles.featureTitle}>続きから視聴</p>
                <p className={styles.featureText}>
                  前回見ていた講義をすぐに再開できます。
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>📚</div>

              <div>
                <p className={styles.featureTitle}>資料もまとめて管理</p>
                <p className={styles.featureText}>
                  講義スライドや補足PDFを同じ画面で確認できます。
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>📈</div>

              <div>
                <p className={styles.featureTitle}>学習進捗を確認</p>
                <p className={styles.featureText}>
                  視聴状況や学習中の講義をマイページで確認できます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cardArea}>
          <div className={`${common.card} ${styles.loginCard}`}>
            <div className={styles.cardHeader}>
              <p className={styles.cardEyebrow}>LOGIN</p>

              <h2 className={styles.cardTitle}>ログイン</h2>

              <p className={styles.cardDescription}>
                アカウントにログインして講義を視聴しましょう。
              </p>
            </div>

            <LoginForm returnTo={returnTo} />
          </div>
        </section>
      </main>
    </div>
  );
}
