"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import Button from "../../components/Button";
import SiteHeader from "../../components/SiteHeader";
import { categories, courses, levels } from "../../data/courses";
import styles from "./courses.module.css";

type CoursesClientProps = {
  initialKeyword: string;
  initialCategory: string;
};

export default function CoursesClient({
  initialKeyword,
  initialCategory,
}: CoursesClientProps) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "すべて",
  );
  const [selectedLevel, setSelectedLevel] = useState("すべて");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const normalizedKeyword = keyword.trim().toLowerCase();

      const keywordMatch =
        normalizedKeyword === "" ||
        course.title.toLowerCase().includes(normalizedKeyword) ||
        course.university.toLowerCase().includes(normalizedKeyword) ||
        course.teacher.toLowerCase().includes(normalizedKeyword) ||
        course.category.toLowerCase().includes(normalizedKeyword);

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

              <h1 className={styles.title}>講義を探す</h1>

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

                        <span className={styles.level}>{course.level}</span>
                      </div>

                      <h3 className={styles.courseTitle}>{course.title}</h3>

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

                        <span className={styles.detailLink}>詳細を見る</span>
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
