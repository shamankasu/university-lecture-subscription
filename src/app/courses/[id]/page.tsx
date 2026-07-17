import Link from "next/link";

import {
  startLearningAction,
  toggleFavoriteAction,
} from "@/app/actions/learning";
import ActionButton from "@/components/ActionButton";
import Button from "@/components/Button";
import SiteHeader from "@/components/SiteHeader";
import {
  getCatalogCourse,
  getCourseProgressPercent,
} from "@/lib/course-catalog";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import styles from "./course-detail.module.css";

type CourseDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { id } = await params;
  const courseId = Number(id);
  const course = Number.isInteger(courseId)
    ? getCatalogCourse(courseId)
    : null;

  if (!course) {
    return <CourseNotFound />;
  }

  const user = await getCurrentUser();
  const [progress, favorite] = user
    ? await Promise.all([
        prisma.userProgress.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId,
            },
          },
          select: {
            watchedSeconds: true,
            completed: true,
          },
        }),
        prisma.favorite.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId,
            },
          },
          select: { id: true },
        }),
      ])
    : [null, null];
  const progressPercent = progress
    ? getCourseProgressPercent(
        course,
        progress.watchedSeconds,
        progress.completed,
      )
    : 0;

  return (
    <div className={styles.page}>
      <SiteHeader />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">トップ</Link>
              <span>/</span>
              <Link href="/courses">講義一覧</Link>
              <span>/</span>
              <span>{course.title}</span>
            </div>

            <div className={styles.heroGrid}>
              <div>
                <div className={styles.badgeRow}>
                  <span className={styles.category}>{course.category}</span>
                  <span className={styles.level}>{course.level}</span>
                </div>

                <h1 className={styles.title}>{course.title}</h1>
                <p className={styles.description}>{course.longDescription}</p>

                <div className={styles.teacherBox}>
                  <div className={styles.teacherAvatar}>
                    {course.teacher.slice(0, 1)}
                  </div>

                  <div>
                    <p className={styles.university}>{course.university}</p>
                    <p className={styles.teacher}>{course.teacher}</p>
                  </div>
                </div>

                {progress && (
                  <div className={styles.learningPanel}>
                    <div className={styles.progressHeader}>
                      <strong>
                        {progress.completed ? "この講義は修了済みです" : "学習進捗"}
                      </strong>
                      <span>{progressPercent}%</span>
                    </div>
                    <div
                      className={styles.progressTrack}
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={progressPercent}
                      aria-label="講義の学習進捗"
                    >
                      <span style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>
                )}

                <div id="learning-actions" className={styles.actionRow}>
                  {user ? (
                    <>
                      <form action={startLearningAction}>
                        <input type="hidden" name="courseId" value={course.id} />
                        <ActionButton size="lg" pendingLabel="準備中…">
                          {progress
                            ? progress.completed
                              ? "講義を振り返る"
                              : "続きから学習する"
                            : "学習を開始する"}
                        </ActionButton>
                      </form>

                      <form action={toggleFavoriteAction}>
                        <input type="hidden" name="courseId" value={course.id} />
                        <ActionButton
                          size="lg"
                          variant="secondary"
                          pendingLabel="更新中…"
                          className={favorite ? styles.favoriteActive : undefined}
                        >
                          {favorite ? "★ お気に入り済み" : "☆ お気に入りに追加"}
                        </ActionButton>
                      </form>
                    </>
                  ) : (
                    <>
                      <Button
                        href={`/login?returnTo=${encodeURIComponent(`/courses/${course.id}`)}`}
                        size="lg"
                      >
                        ログインして学習する
                      </Button>
                      <p className={styles.loginHint}>
                        学習進捗とお気に入りはアカウントに保存されます。
                      </p>
                    </>
                  )}

                  <Button href="/courses" variant="secondary" size="lg">
                    講義一覧へ戻る
                  </Button>
                </div>
              </div>

              <aside className={styles.summaryCard}>
                <div className={styles.thumbnail}>
                  <span>{course.icon}</span>
                </div>

                <div className={styles.summaryStats}>
                  <div>
                    <p className={styles.summaryValue}>★ {course.rating}</p>
                    <p className={styles.summaryLabel}>評価</p>
                  </div>
                  <div>
                    <p className={styles.summaryValue}>
                      {course.students.toLocaleString()}
                    </p>
                    <p className={styles.summaryLabel}>受講者</p>
                  </div>
                  <div>
                    <p className={styles.summaryValue}>{course.duration}</p>
                    <p className={styles.summaryLabel}>講義数</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.mainColumn}>
            <section className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionEyebrow}>ABOUT</p>
                <h2 className={styles.sectionTitle}>講義概要</h2>
              </div>
              <p className={styles.bodyText}>{course.longDescription}</p>
            </section>

            <section className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionEyebrow}>OUTCOMES</p>
                <h2 className={styles.sectionTitle}>この講義で学べること</h2>
              </div>

              <div className={styles.outcomeGrid}>
                {course.outcomes.map((outcome) => (
                  <div key={outcome} className={styles.outcomeItem}>
                    <span>✓</span>
                    <p>{outcome}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionEyebrow}>LESSONS</p>
                <h2 className={styles.sectionTitle}>講義内容</h2>
              </div>

              <div className={styles.lessonList}>
                {course.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={
                      progress
                        ? `/watch/${course.id}?lesson=${lesson.id}`
                        : "#learning-actions"
                    }
                    className={styles.lessonItem}
                  >
                    <div className={styles.lessonNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className={styles.lessonContent}>
                      <p className={styles.lessonTitle}>{lesson.title}</p>
                      <p className={styles.lessonMeta}>
                        {lesson.duration}
                        {lesson.isFree ? " / 無料公開" : " / 有料プラン対象"}
                      </p>
                    </div>
                    <span className={styles.playIcon}>▶</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionEyebrow}>REVIEWS</p>
                <h2 className={styles.sectionTitle}>受講者レビュー</h2>
              </div>

              <div className={styles.reviewList}>
                {course.reviews.map((review) => (
                  <div key={review.id} className={styles.reviewItem}>
                    <div className={styles.reviewTop}>
                      <p className={styles.reviewUser}>{review.userName}</p>
                      <p className={styles.reviewRating}>
                        {"★".repeat(review.rating)}
                      </p>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sideColumn}>
            <section className={styles.sideCard}>
              <h3 className={styles.sideTitle}>講義資料</h3>
              <div className={styles.materialList}>
                {course.materials.map((material) => (
                  <div key={material.id} className={styles.materialItem}>
                    <div className={styles.materialIcon}>📄</div>
                    <div>
                      <p className={styles.materialTitle}>{material.title}</p>
                      <p className={styles.materialType}>{material.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.sideCard}>
              <h3 className={styles.sideTitle}>講義情報</h3>
              <dl className={styles.infoList}>
                <div>
                  <dt>大学</dt>
                  <dd>{course.university}</dd>
                </div>
                <div>
                  <dt>担当教員</dt>
                  <dd>{course.teacher}</dd>
                </div>
                <div>
                  <dt>カテゴリ</dt>
                  <dd>{course.category}</dd>
                </div>
                <div>
                  <dt>難易度</dt>
                  <dd>{course.level}</dd>
                </div>
                <div>
                  <dt>講義数</dt>
                  <dd>{course.duration}</dd>
                </div>
              </dl>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

function CourseNotFound() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.notFound}>
        <p className={styles.notFoundIcon}>🔍</p>
        <h1>講義が見つかりませんでした</h1>
        <p>
          指定された講義は存在しないか、公開が終了している可能性があります。
        </p>
        <Button href="/courses" variant="secondary">
          講義一覧へ戻る
        </Button>
      </main>
    </div>
  );
}
