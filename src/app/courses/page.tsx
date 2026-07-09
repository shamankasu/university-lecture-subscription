"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Button from "../../components/Button";
import SiteHeader from "../../components/SiteHeader";
import styles from "./courses.module.css";

type Course = {
  id: number;
  title: string;
  university: string;
  teacher: string;
  category: string;
  level: "初級" | "中級" | "上級";
  rating: number;
  students: number;
  duration: string;
  description: string;
  icon: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "はじめての人工知能",
    university: "東京○○大学",
    teacher: "山田 太郎 教授",
    category: "情報・AI",
    level: "初級",
    rating: 4.8,
    students: 1240,
    duration: "全12回",
    description:
      "AIの基本的な考え方、機械学習、ニューラルネットワークの基礎を学ぶ講義です。",
    icon: "AI",
  },
  {
    id: 2,
    title: "現代社会を読み解く経済学",
    university: "○○経済大学",
    teacher: "佐藤 花子 教授",
    category: "経済・経営",
    level: "初級",
    rating: 4.6,
    students: 980,
    duration: "全10回",
    description:
      "市場、企業、家計、金融など、現代社会を理解するための経済学の基礎を学びます。",
    icon: "EC",
  },
  {
    id: 3,
    title: "人間の心を学ぶ心理学入門",
    university: "○○総合大学",
    teacher: "鈴木 一郎 教授",
    category: "心理・教育",
    level: "初級",
    rating: 4.9,
    students: 1520,
    duration: "全8回",
    description:
      "記憶、感情、学習、対人関係など、人間の心理を基礎から理解する講義です。",
    icon: "PS",
  },
  {
    id: 4,
    title: "情報工学のためのデータベース基礎",
    university: "東京理工大学",
    teacher: "高橋 健 教授",
    category: "情報・AI",
    level: "中級",
    rating: 4.7,
    students: 860,
    duration: "全14回",
    description:
      "リレーショナルデータベース、SQL、正規化、トランザクション処理を学びます。",
    icon: "DB",
  },
  {
    id: 5,
    title: "機械工学概論",
    university: "○○工業大学",
    teacher: "田中 誠 教授",
    category: "理学・工学",
    level: "初級",
    rating: 4.5,
    students: 740,
    duration: "全11回",
    description:
      "力学、材料、熱、流体など、機械工学の基本分野を横断的に学ぶ講義です。",
    icon: "ME",
  },
  {
    id: 6,
    title: "法律学入門",
    university: "○○法科大学",
    teacher: "伊藤 亮 教授",
    category: "法律・政治",
    level: "初級",
    rating: 4.4,
    students: 690,
    duration: "全9回",
    description:
      "憲法、民法、刑法など、法律を学ぶための基本的な考え方を身につけます。",
    icon: "LW",
  },
  {
    id: 7,
    title: "英語で学ぶ異文化コミュニケーション",
    university: "国際○○大学",
    teacher: "中村 エリ 教授",
    category: "語学・文化",
    level: "中級",
    rating: 4.6,
    students: 810,
    duration: "全10回",
    description:
      "英語表現と異文化理解を組み合わせ、国際的なコミュニケーション力を高めます。",
    icon: "EN",
  },
  {
    id: 8,
    title: "経営戦略とマーケティング",
    university: "○○経営大学",
    teacher: "森 直人 教授",
    category: "経済・経営",
    level: "中級",
    rating: 4.7,
    students: 1110,
    duration: "全12回",
    description:
      "企業の競争戦略、ブランド設計、マーケティング施策を事例とともに学びます。",
    icon: "MK",
  },
];

const categories = [
  "すべて",
  "情報・AI",
  "経済・経営",
  "心理・教育",
  "理学・工学",
  "法律・政治",
  "語学・文化",
];

const levels = ["すべて", "初級", "中級", "上級"];

export default function CoursesPage() {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [selectedLevel, setSelectedLevel] = useState("すべて");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const category = params.get("category");

    if (q) {
      setKeyword(q);
    }

    if (category && categories.includes(category)) {
      setSelectedCategory(category);
    }
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const keywordMatch =
        keyword.trim() === "" ||
        course.title.toLowerCase().includes(keyword.toLowerCase()) ||
        course.university.toLowerCase().includes(keyword.toLowerCase()) ||
        course.teacher.toLowerCase().includes(keyword.toLowerCase()) ||
        course.category.toLowerCase().includes(keyword.toLowerCase());

      const categoryMatch =
        selectedCategory === "すべて" || course.category === selectedCategory;

      const levelMatch =
        selectedLevel === "すべて" || course.level === selectedLevel;

      return keywordMatch && categoryMatch && levelMatch;
    });
  }, [keyword, selectedCategory, selectedLevel]);

  const resetFilters = () => {
    setKeyword("");
    setSelectedCategory("すべて");
    setSelectedLevel("すべて");
  };

  return (
    <div className={styles.page}>
      <SiteHeader />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <p className={styles.eyebrow}>COURSES</p>

              <h1 className={styles.title}>
                講義を探す
              </h1>

              <p className={styles.description}>
                大学名、分野、講義名、教員名から、あなたに合った講義を検索できます。
              </p>
            </div>

            <div className={styles.summaryCard}>
              <p className={styles.summaryLabel}>公開講義数</p>
              <p className={styles.summaryNumber}>{courses.length}</p>
              <p className={styles.summaryText}>
                複数大学の公式講義を掲載中
              </p>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <aside className={styles.filterPanel}>
            <div className={styles.filterHeader}>
              <h2 className={styles.filterTitle}>検索条件</h2>

              <button
                type="button"
                className={styles.resetButton}
                onClick={resetFilters}
              >
                リセット
              </button>
            </div>

            <label className={styles.formGroup}>
              <span className={styles.label}>キーワード</span>

              <input
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="講義名、大学名、分野"
                className={styles.input}
              />
            </label>

            <div className={styles.formGroup}>
              <span className={styles.label}>カテゴリ</span>

              <div className={styles.categoryList}>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`${styles.categoryButton} ${
                      selectedCategory === category
                        ? styles.categoryButtonActive
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <label className={styles.formGroup}>
              <span className={styles.label}>難易度</span>

              <select
                value={selectedLevel}
                onChange={(event) => setSelectedLevel(event.target.value)}
                className={styles.select}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
          </aside>

          <section className={styles.courseArea}>
            <div className={styles.courseAreaHeader}>
              <div>
                <p className={styles.resultLabel}>検索結果</p>

                <h2 className={styles.resultTitle}>
                  {filteredCourses.length}件の講義
                </h2>
              </div>

              <select className={styles.sortSelect} defaultValue="popular">
                <option value="popular">人気順</option>
                <option value="rating">評価順</option>
                <option value="new">新着順</option>
              </select>
            </div>

            {filteredCourses.length > 0 ? (
              <div className={styles.courseGrid}>
                {filteredCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className={styles.courseCard}
                  >
                    <div className={styles.thumbnail}>
                      <span>{course.icon}</span>
                    </div>

                    <div className={styles.courseBody}>
                      <div className={styles.courseMeta}>
                        <span className={styles.category}>
                          {course.category}
                        </span>

                        <span className={styles.level}>
                          {course.level}
                        </span>
                      </div>

                      <h3 className={styles.courseTitle}>
                        {course.title}
                      </h3>

                      <p className={styles.courseDescription}>
                        {course.description}
                      </p>

                      <div className={styles.teacherInfo}>
                        <p>{course.university}</p>
                        <p>{course.teacher}</p>
                      </div>

                      <div className={styles.cardFooter}>
                        <div className={styles.stats}>
                          <span>★ {course.rating}</span>
                          <span>{course.students.toLocaleString()}人</span>
                          <span>{course.duration}</span>
                        </div>

                        <span className={styles.detailLink}>
                          詳細を見る
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyIcon}>🔍</p>

                <h3>条件に合う講義が見つかりませんでした</h3>

                <p>
                  キーワードやカテゴリを変更して、もう一度検索してください。
                </p>

                <Button type="button" variant="secondary" onClick={resetFilters}>
                  条件をリセット
                </Button>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}