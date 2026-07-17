import Link from "next/link";
import { redirect } from "next/navigation";

import { completeLessonAction } from "@/app/actions/learning";
import ActionButton from "@/components/ActionButton";
import Button from "@/components/Button";
import SiteHeader from "@/components/SiteHeader";
import {
  getCatalogCourse,
  getCourseProgressPercent,
  getWatchedSecondsThroughLesson,
} from "@/lib/course-catalog";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import styles from "./watch.module.css";

type WatchPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    lesson?: string | string[];
    completed?: string | string[];
  }>;
};

export default async function WatchPage({
  params,
  searchParams,
}: WatchPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [{ id }, query] = await Promise.all([params, searchParams]);
  const courseId = Number(id);
  const course = Number.isInteger(courseId)
    ? getCatalogCourse(courseId)
    : null;

  if (!course) {
    redirect("/courses");
  }

  const progress = await prisma.userProgress.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
    include: {
      video: {
        select: { orderNo: true },
      },
    },
  });

  if (!progress) {
    redirect(`/courses/${courseId}`);
  }

  const requestedLesson = Array.isArray(query.lesson)
    ? Number(query.lesson[0])
    : Number(query.lesson);
  const requestedIndex = course.lessons.findIndex(
    (lesson) => lesson.id === requestedLesson,
  );
  const resumeIndex = Math.max(0, (progress.video?.orderNo ?? 1) - 1);
  const activeIndex = requestedIndex >= 0 ? requestedIndex : resumeIndex;
  const activeLesson = course.lessons[activeIndex] ?? course.lessons[0];
  const progressPercent = getCourseProgressPercent(
    course,
    progress.watchedSeconds,
    progress.completed,
  );
  const activeLessonCompleted =
    progress.completed ||
    progress.watchedSeconds >=
      getWatchedSecondsThroughLesson(course, activeLesson.id);

  return (
    <div className={styles.page}>
      <SiteHeader />

      <main className={styles.main}>
        <div className={styles.topbar}>
          <div>
            <Link href={`/courses/${course.id}`} className={styles.backLink}>
              ← 講義詳細へ戻る
            </Link>
            <p className={styles.university}>{course.university}</p>
            <h1 className={styles.courseTitle}>{course.title}</h1>
          </div>

          <div className={styles.progressSummary}>
            <div className={styles.progressText}>
              <span>コース進捗</span>
              <strong>{progressPercent}%</strong>
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
        </div>

        {progress.completed && (
          <section className={styles.completionBanner}>
            <div>
              <span className={styles.completionIcon}>✓</span>
              <div>
                <strong>講義を修了しました</strong>
                <p>学習結果がマイページに反映されています。</p>
              </div>
            </div>
            <Button href="/mypage" size="sm">
              マイページで確認
            </Button>
          </section>
        )}

        <div className={styles.learningGrid}>
          <section className={styles.playerColumn}>
            <div className={styles.player}>
              <div className={styles.playerGlow} />
              <span className={styles.playerIcon}>{course.icon}</span>
              <div className={styles.playerCopy}>
                <span>
                  第{activeIndex + 1}回 / {course.lessons.length}回
                </span>
                <strong>{activeLesson.title}</strong>
                <p>
                  講義動画のデモ画面です。内容を確認したら、下のボタンで学習を記録できます。
                </p>
              </div>
              <div className={styles.fakeControls} aria-hidden="true">
                <span>▶</span>
                <div />
                <span>{activeLesson.duration}</span>
              </div>
            </div>

            <article className={styles.lessonDetails}>
              <div className={styles.lessonHeading}>
                <div>
                  <p className={styles.eyebrow}>CURRENT LESSON</p>
                  <h2>{activeLesson.title}</h2>
                </div>
                <span className={styles.duration}>{activeLesson.duration}</span>
              </div>

              <p className={styles.lessonDescription}>
                {course.longDescription}
              </p>

              <div className={styles.lessonActions}>
                {progress.completed && activeIndex === course.lessons.length - 1 ? (
                  <Button type="button" size="lg" disabled>
                    学習済み
                  </Button>
                ) : (
                  <form action={completeLessonAction}>
                    <input type="hidden" name="courseId" value={course.id} />
                    <input
                      type="hidden"
                      name="lessonId"
                      value={activeLesson.id}
                    />
                    <ActionButton size="lg" pendingLabel="保存中…">
                      {activeLessonCompleted
                        ? activeIndex === course.lessons.length - 1
                          ? "修了を確認する"
                          : "次の講義へ"
                        : activeIndex === course.lessons.length - 1
                          ? "学習を完了する"
                          : "この回を完了して次へ"}
                    </ActionButton>
                  </form>
                )}

                <Button href="/mypage" variant="secondary" size="lg">
                  マイページを見る
                </Button>
              </div>
            </article>
          </section>

          <aside className={styles.lessonSidebar}>
            <div className={styles.sidebarHeader}>
              <p className={styles.eyebrow}>CURRICULUM</p>
              <h2>講義一覧</h2>
            </div>

            <nav className={styles.lessonList} aria-label="講義一覧">
              {course.lessons.map((lesson, index) => {
                const isActive = lesson.id === activeLesson.id;
                const isCompleted =
                  progress.completed ||
                  progress.watchedSeconds >=
                    getWatchedSecondsThroughLesson(course, lesson.id);

                return (
                  <Link
                    key={lesson.id}
                    href={`/watch/${course.id}?lesson=${lesson.id}`}
                    className={`${styles.lessonLink} ${
                      isActive ? styles.lessonLinkActive : ""
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={`${styles.lessonNumber} ${
                        isCompleted ? styles.lessonNumberCompleted : ""
                      }`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </span>
                    <span className={styles.lessonCopy}>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.duration}</small>
                    </span>
                    <span className={styles.lessonPlay}>▶</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      </main>
    </div>
  );
}
