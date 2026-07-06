import Link from "next/link";
import Button from "../components/Button";
import styles from "./page.module.css";

const categories = [
  {
    name: "情報・AI",
    icon: "💻",
    count: 24,
  },
  {
    name: "経済・経営",
    icon: "📈",
    count: 18,
  },
  {
    name: "心理・教育",
    icon: "🧠",
    count: 15,
  },
  {
    name: "理学・工学",
    icon: "⚙️",
    count: 21,
  },
  {
    name: "法律・政治",
    icon: "⚖️",
    count: 12,
  },
  {
    name: "語学・文化",
    icon: "🌏",
    count: 16,
  },
];

const courses = [
  {
    id: 1,
    title: "はじめての人工知能",
    university: "東京○○大学",
    teacher: "山田 太郎 教授",
    rating: 4.8,
    level: "初級",
    icon: "AI",
  },
  {
    id: 2,
    title: "現代社会を読み解く経済学",
    university: "○○経済大学",
    teacher: "佐藤 花子 教授",
    rating: 4.6,
    level: "初級",
    icon: "EC",
  },
  {
    id: 3,
    title: "人間の心を学ぶ心理学入門",
    university: "○○総合大学",
    teacher: "鈴木 一郎 教授",
    rating: 4.9,
    level: "初級",
    icon: "PS",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}>
              U
            </div>

            <div>
              <p className={styles.logoTitle}>
                UniLecture
              </p>

              <p className={styles.logoSubtitle}>
                大学講義サブスク
              </p>
            </div>
          </Link>

          <nav className={styles.nav}>
            <Link
              href="/courses"
              className={styles.navLink}
            >
              講義を探す
            </Link>

            <Link
              href="/universities"
              className={styles.navLink}
            >
              大学から探す
            </Link>

            <Link
              href="/plans"
              className={styles.navLink}
            >
              料金プラン
            </Link>
          </nav>

          <div className={styles.headerActions}>
            <Button
              href="/login"
              variant="ghost"
              size="sm"
            >
              ログイン
            </Button>

            <Button
              href="/register"
              size="sm"
            >
              無料で始める
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroGlowLeft} />
          <div className={styles.heroGlowRight} />

          <div className={styles.heroInner}>
            <div>
              <div className={styles.badge}>
                🎓 複数大学の公式講義をひとつの場所で
              </div>

              <h1 className={styles.heroTitle}>
                大学の学びを、
                <span className={styles.heroTitleAccent}>
                  もっと自由に。
                </span>
              </h1>

              <p className={styles.heroDescription}>
                興味のある大学、専門分野、教授の講義を自由に選択。
                大学の枠を越えて、あなたの「学びたい」を実現する
                オンライン講義プラットフォームです。
              </p>

              <form
                action="/courses"
                className={styles.searchForm}
              >
                <div className={styles.searchInputArea}>
                  <span>🔍</span>

                  <input
                    type="text"
                    name="q"
                    placeholder="講義名、大学名、分野から検索"
                    className={styles.searchInput}
                  />
                </div>

                <Button type="submit">
                  検索する
                </Button>
              </form>

              <div className={styles.stats}>
                <div>
                  <p className={styles.statNumber}>
                    20+
                  </p>
                  <p className={styles.statLabel}>
                    加盟大学
                  </p>
                </div>

                <div>
                  <p className={styles.statNumber}>
                    120+
                  </p>
                  <p className={styles.statLabel}>
                    公開講義
                  </p>
                </div>

                <div>
                  <p className={styles.statNumber}>
                    5,000+
                  </p>
                  <p className={styles.statLabel}>
                    受講者
                  </p>
                </div>
              </div>
            </div>

            {/* Learning Panel */}
            <div className={styles.learningPanel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.panelLabel}>
                    学習を続ける
                  </p>

                  <h2 className={styles.panelTitle}>
                    あなたの講義
                  </h2>
                </div>

                <div className={styles.avatar}>
                  M
                </div>
              </div>

              <div className={styles.currentCourse}>
                <div className={styles.currentCourseTop}>
                  <div className={styles.courseIcon}>
                    AI
                  </div>

                  <div>
                    <p className={styles.courseUniversity}>
                      東京○○大学
                    </p>

                    <h3 className={styles.courseName}>
                      はじめての人工知能
                    </h3>

                    <p className={styles.courseEpisode}>
                      第6回 ニューラルネットワーク
                    </p>
                  </div>
                </div>

                <div className={styles.progressArea}>
                  <div className={styles.progressHeader}>
                    <span>進捗状況</span>
                    <span>65%</span>
                  </div>

                  <div className={styles.progressBar}>
                    <div className={styles.progressValue} />
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.continueButton}
                >
                  ▶ 続きから視聴
                </button>
              </div>

              <div className={styles.miniCards}>
                <div className={styles.miniCard}>
                  <p className={styles.miniIcon}>
                    📚
                  </p>

                  <p className={styles.miniNumber}>
                    4
                  </p>

                  <p className={styles.miniLabel}>
                    学習中の講義
                  </p>
                </div>

                <div
                  className={`${styles.miniCard} ${styles.miniCardPurple}`}
                >
                  <p className={styles.miniIcon}>
                    ⏱️
                  </p>

                  <p className={styles.miniNumber}>
                    12.5h
                  </p>

                  <p className={styles.miniLabel}>
                    総学習時間
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>
              CATEGORY
            </p>

            <h2 className={styles.sectionTitle}>
              興味のある分野から探す
            </h2>
          </div>

          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/courses?category=${encodeURIComponent(
                  category.name
                )}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryIcon}>
                  {category.icon}
                </div>

                <p className={styles.categoryName}>
                  {category.name}
                </p>

                <p className={styles.categoryCount}>
                  {category.count}講義
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Courses */}
        <section className={styles.featuredSection}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>
                FEATURED COURSES
              </p>

              <h2 className={styles.sectionTitle}>
                注目の講義
              </h2>
            </div>

            <div className={styles.courseGrid}>
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className={styles.courseCard}
                >
                  <div className={styles.courseThumbnail}>
                    {course.icon}
                  </div>

                  <div className={styles.courseCardBody}>
                    <p className={styles.courseCardUniversity}>
                      {course.university}
                    </p>

                    <h3 className={styles.courseCardTitle}>
                      {course.title}
                    </h3>

                    <p className={styles.courseCardTeacher}>
                      {course.teacher}
                    </p>

                    <div className={styles.courseCardFooter}>
                      <span className={styles.rating}>
                        ★ {course.rating}
                      </span>

                      <span className={styles.level}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}