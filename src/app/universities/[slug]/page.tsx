import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Button from "@/components/Button";
import SiteHeader from "@/components/SiteHeader";
import { courses, type Course } from "@/data/courses";
import {
  getUniversityBySlug,
  universities,
  type University,
} from "@/data/universities";
import styles from "./university-detail.module.css";

type UniversityPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return universities.map((university) => ({
    slug: university.slug,
  }));
}

export async function generateMetadata({
  params,
}: UniversityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const university = getUniversityBySlug(slug);

  if (!university) {
    return {
      title: "大学が見つかりません | UniLecture",
    };
  }

  return {
    title: `${university.name}の講義 | UniLecture`,
    description: university.description,
  };
}

export default async function UniversityPage({
  params,
}: UniversityPageProps) {
  const { slug } = await params;
  const university = getUniversityBySlug(slug);

  if (!university) {
    notFound();
  }

  const universityCourses = getUniversityCourses(university);
  const totalStudents = universityCourses.reduce(
    (total, course) => total + course.students,
    0,
  );
  const averageRating =
    universityCourses.length > 0
      ? (
          universityCourses.reduce(
            (total, course) => total + course.rating,
            0,
          ) / universityCourses.length
        ).toFixed(1)
      : "—";
  const courseSearchUrl = `/courses?q=${encodeURIComponent(university.name)}`;

  return (
    <div className={styles.page}>
      <SiteHeader />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="パンくずリスト">
              <Link href="/">トップ</Link>
              <span>/</span>
              <Link href="/universities">大学から探す</Link>
              <span>/</span>
              <span>{university.name}</span>
            </nav>

            <div className={styles.heroGrid}>
              <div className={styles.universityLogo} aria-hidden="true">
                {university.initials}
              </div>

              <div className={styles.heroContent}>
                <div className={styles.badgeRow}>
                  <span className={styles.category}>{university.category}</span>
                  <span className={styles.location}>{university.location}</span>
                </div>
                <h1>{university.name}</h1>
                <p>{university.longDescription}</p>

                <div className={styles.heroActions}>
                  <Button href="#courses" size="lg">
                    公開講義を見る
                  </Button>
                  <Button href="/universities" variant="secondary" size="lg">
                    大学一覧へ戻る
                  </Button>
                </div>
              </div>
            </div>

            <div className={styles.statsGrid}>
              <div>
                <strong>{universityCourses.length}</strong>
                <span>公開講義</span>
              </div>
              <div>
                <strong>{averageRating}</strong>
                <span>平均評価</span>
              </div>
              <div>
                <strong>{totalStudents.toLocaleString()}</strong>
                <span>延べ受講者</span>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.content}>
          <div className={styles.mainColumn}>
            <section className={styles.sectionCard}>
              <p className={styles.eyebrow}>ABOUT</p>
              <h2>{university.name}で学べること</h2>
              <p className={styles.lead}>{university.description}</p>
              <p className={styles.bodyText}>{university.longDescription}</p>
            </section>

            <section className={styles.sectionCard}>
              <p className={styles.eyebrow}>LEARNING STYLE</p>
              <h2>学びの特徴</h2>

              <div className={styles.featureGrid}>
                {university.learningFeatures.map((feature, index) => (
                  <article className={styles.featureCard} key={feature.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="courses" className={styles.courseSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.eyebrow}>COURSES</p>
                  <h2>公開講義</h2>
                </div>
                <Link href={courseSearchUrl}>講義一覧で絞り込む →</Link>
              </div>

              <div className={styles.courseGrid}>
                {universityCourses.map((course) => (
                  <Link
                    href={`/courses/${course.id}`}
                    className={styles.courseCard}
                    key={course.id}
                  >
                    <div className={styles.thumbnail}>
                      <span>{course.icon}</span>
                    </div>
                    <div className={styles.courseBody}>
                      <div className={styles.courseMeta}>
                        <span>{course.category}</span>
                        <span>{course.level}</span>
                      </div>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div className={styles.teacherInfo}>
                        <span>{course.teacher}</span>
                        <span>
                          ★ {course.rating}・{course.students.toLocaleString()}人
                        </span>
                      </div>
                      <span className={styles.courseLink}>講義詳細を見る →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sideColumn}>
            <section className={styles.sideCard}>
              <p className={styles.eyebrow}>FOCUS AREAS</p>
              <h2>注目分野</h2>
              <div className={styles.focusList}>
                {university.focusAreas.map((area) => (
                  <Link
                    href={`/courses?q=${encodeURIComponent(area)}`}
                    key={area}
                  >
                    {area}
                  </Link>
                ))}
              </div>
            </section>

            <section className={styles.sideCard}>
              <p className={styles.eyebrow}>INFORMATION</p>
              <h2>大学情報</h2>
              <dl className={styles.infoList}>
                <div>
                  <dt>所在地</dt>
                  <dd>{university.location}</dd>
                </div>
                <div>
                  <dt>大学区分</dt>
                  <dd>{university.kind === "national" ? "国立" : "私立"}</dd>
                </div>
                <div>
                  <dt>掲載カテゴリ</dt>
                  <dd>{university.category}</dd>
                </div>
              </dl>
            </section>

            <section className={styles.ctaCard}>
              <span>START LEARNING</span>
              <h2>気になる講義から学んでみよう</h2>
              <p>講義を開始すると、進捗がマイページに保存されます。</p>
              <Button href={courseSearchUrl} fullWidth>
                この大学の講義を探す
              </Button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

function getUniversityCourses(university: University): Course[] {
  return university.courseIds.flatMap((courseId) => {
    const course = courses.find((item) => item.id === courseId);

    return course ? [course] : [];
  });
}
