import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import styles from "./page.module.css";

type University = {
  id: string;
  name: string;
  location: string;
  description: string;
  courseCount: number;
  category: string;
};

const universities: University[] = [
  {
    id: "tokyo-university-of-science",
    name: "東京理科大学",
    location: "東京都",
    description:
      "理学・工学・情報分野を中心に、幅広い専門講義を提供しています。",
    courseCount: 24,
    category: "理工系",
  },
  {
    id: "waseda-university",
    name: "早稲田大学",
    location: "東京都",
    description:
      "人文科学から情報科学まで、多様な分野の講義を提供しています。",
    courseCount: 32,
    category: "総合大学",
  },
  {
    id: "keio-university",
    name: "慶應義塾大学",
    location: "東京都",
    description:
      "経済・経営・情報・医療など、幅広い分野を学べます。",
    courseCount: 28,
    category: "総合大学",
  },
  {
    id: "meiji-university",
    name: "明治大学",
    location: "東京都",
    description:
      "社会科学、情報、理工学などの講義を分かりやすく提供しています。",
    courseCount: 18,
    category: "総合大学",
  },
  {
    id: "chiba-university",
    name: "千葉大学",
    location: "千葉県",
    description:
      "教育、工学、医学などの専門的な講義を提供しています。",
    courseCount: 16,
    category: "国立大学",
  },
  {
    id: "yokohama-national-university",
    name: "横浜国立大学",
    location: "神奈川県",
    description:
      "理工学、経済、経営など、実践的な講義を学べます。",
    courseCount: 14,
    category: "国立大学",
  },
];

export default function UniversitiesPage() {
  return (
    <>
      <SiteHeader />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>UNIVERSITIES</p>

            <h1 className={styles.title}>大学から講義を探す</h1>

            <p className={styles.description}>
              興味のある大学を選んで、公開されている講義を探してみましょう。
            </p>

            <div className={styles.searchArea}>
              <input
                className={styles.searchInput}
                type="search"
                placeholder="大学名を入力"
                aria-label="大学名を検索"
              />

              <button className={styles.searchButton} type="button">
                検索
              </button>
            </div>
          </div>
        </section>

        <section className={styles.universitySection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>大学一覧</h2>
              <p className={styles.sectionDescription}>
                全{universities.length}校から探せます
              </p>
            </div>

            <select
              className={styles.select}
              defaultValue="all"
              aria-label="大学の分類を選択"
            >
              <option value="all">すべての大学</option>
              <option value="national">国立大学</option>
              <option value="private">私立大学</option>
              <option value="science">理工系大学</option>
            </select>
          </div>

          <div className={styles.universityGrid}>
            {universities.map((university) => (
              <article className={styles.card} key={university.id}>
                <div className={styles.logo}>
                  {university.name.slice(0, 1)}
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.badgeRow}>
                    <span className={styles.category}>
                      {university.category}
                    </span>

                    <span className={styles.location}>
                      {university.location}
                    </span>
                  </div>

                  <h3 className={styles.universityName}>
                    {university.name}
                  </h3>

                  <p className={styles.universityDescription}>
                    {university.description}
                  </p>

                  <div className={styles.cardFooter}>
                    <span className={styles.courseCount}>
                      {university.courseCount}講義
                    </span>

                    <Link
                      className={styles.detailLink}
                      href={`/universities/${university.id}`}
                    >
                      講義を見る
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}