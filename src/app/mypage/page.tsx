import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import Button from "@/components/Button";
import SiteHeader from "@/components/SiteHeader";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import styles from "./mypage.module.css";

export const metadata: Metadata = {
  title: "マイページ | UniLecture",
  description: "学習状況やアカウント情報を確認できます。",
};

const userTypeLabels: Record<string, string> = {
  high_school: "高校生",
  university: "大学生",
  worker: "社会人",
  other: "その他",
};

export default async function MyPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [inProgressCount, completedCount, favoriteCount, recentProgress, plan] =
    await Promise.all([
      prisma.userProgress.count({
        where: { userId: user.id, completed: false },
      }),
      prisma.userProgress.count({
        where: { userId: user.id, completed: true },
      }),
      prisma.favorite.count({
        where: { userId: user.id },
      }),
      prisma.userProgress.findMany({
        where: { userId: user.id },
        orderBy: { lastWatchedAt: "desc" },
        take: 3,
        include: {
          course: {
            select: {
              id: true,
              title: true,
              university: {
                select: { name: true },
              },
            },
          },
        },
      }),
      prisma.subscription.findFirst({
        where: { userId: user.id },
        orderBy: { startDate: "desc" },
        select: {
          planName: true,
          status: true,
          startDate: true,
          endDate: true,
        },
      }),
    ]);

  return (
    <div className={styles.page}>
      <SiteHeader />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />

          <div className={styles.heroInner}>
            <div className={styles.profileSummary}>
              <div className={styles.avatar} aria-hidden="true">
                {user.name.slice(0, 1)}
              </div>

              <div>
                <p className={styles.eyebrow}>MY PAGE</p>
                <h1 className={styles.title}>{user.name}さんの学習ページ</h1>
                <p className={styles.email}>{user.email}</p>
              </div>
            </div>

            <div className={styles.planCard}>
              <span className={styles.planLabel}>現在のプラン</span>
              <strong className={styles.planName}>
                {plan?.planName ?? "無料プラン"}
              </strong>
              <span className={styles.planStatus}>
                {plan?.status === "active" ? "利用中" : "無料機能を利用中"}
              </span>
              <Link href="/pricing" className={styles.planLink}>
                プランを確認する →
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.statsGrid}>
            <article className={styles.statCard}>
              <span className={styles.statIcon}>▶</span>
              <p className={styles.statValue}>{inProgressCount}</p>
              <p className={styles.statLabel}>学習中の講義</p>
            </article>

            <article className={styles.statCard}>
              <span className={styles.statIcon}>✓</span>
              <p className={styles.statValue}>{completedCount}</p>
              <p className={styles.statLabel}>修了した講義</p>
            </article>

            <article className={styles.statCard}>
              <span className={styles.statIcon}>★</span>
              <p className={styles.statValue}>{favoriteCount}</p>
              <p className={styles.statLabel}>お気に入り</p>
            </article>
          </div>

          <div className={styles.dashboardGrid}>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelEyebrow}>LEARNING</p>
                  <h2 className={styles.panelTitle}>最近の学習</h2>
                </div>

                <Link href="/courses" className={styles.panelLink}>
                  講義を探す
                </Link>
              </div>

              {recentProgress.length > 0 ? (
                <div className={styles.progressList}>
                  {recentProgress.map((progress) => (
                    <Link
                      key={progress.id}
                      href={`/courses/${progress.course.id}`}
                      className={styles.progressItem}
                    >
                      <div className={styles.courseMark}>U</div>

                      <div className={styles.courseInfo}>
                        <span className={styles.universityName}>
                          {progress.course.university.name}
                        </span>
                        <strong>{progress.course.title}</strong>
                        <span className={styles.lastWatched}>
                          最終学習日: {formatDate(progress.lastWatchedAt)}
                        </span>
                      </div>

                      <span className={styles.progressStatus}>
                        {progress.completed ? "修了" : "続きから"}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📚</div>
                  <h3>まだ学習履歴がありません</h3>
                  <p>
                    興味のある講義を見つけて、最初の学習を始めましょう。
                  </p>
                  <Button href="/courses">講義を探す</Button>
                </div>
              )}
            </section>

            <aside className={`${styles.panel} ${styles.accountPanel}`}>
              <p className={styles.panelEyebrow}>ACCOUNT</p>
              <h2 className={styles.panelTitle}>アカウント情報</h2>

              <dl className={styles.accountList}>
                <div>
                  <dt>氏名</dt>
                  <dd>{user.name}</dd>
                </div>
                <div>
                  <dt>メールアドレス</dt>
                  <dd>{user.email}</dd>
                </div>
                <div>
                  <dt>利用者種別</dt>
                  <dd>{userTypeLabels[user.userType] ?? "その他"}</dd>
                </div>
              </dl>

              <p className={styles.accountNote}>
                アカウント情報の変更機能は今後追加予定です。
              </p>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
