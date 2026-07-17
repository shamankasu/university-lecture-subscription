import Link from "next/link";

import Button from "../../components/Button";
import common from "../../styles/common.module.css";
import RegisterForm from "./RegisterForm";
import styles from "./register.module.css";

export default function RegisterPage() {
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

            <RegisterForm />
          </div>
        </section>
      </main>
    </div>
  );
}
