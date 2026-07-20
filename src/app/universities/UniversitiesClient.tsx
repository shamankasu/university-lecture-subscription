"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";

import SiteHeader from "@/components/SiteHeader";
import { universities } from "@/data/universities";
import styles from "./page.module.css";

type UniversityFilter = "all" | "national" | "private" | "science";

export default function UniversitiesClient() {
  const [draftKeyword, setDraftKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState<UniversityFilter>("all");

  const filteredUniversities = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return universities.filter((university) => {
      const keywordMatches =
        normalizedKeyword === "" ||
        [
          university.name,
          university.location,
          university.category,
          university.description,
          ...university.focusAreas,
        ].some((value) => value.toLowerCase().includes(normalizedKeyword));
      const filterMatches =
        filter === "all" ||
        (filter === "science"
          ? university.category === "理工系大学"
          : university.kind === filter);

      return keywordMatches && filterMatches;
    });
  }, [filter, keyword]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(draftKeyword);
  };

  const resetSearch = () => {
    setDraftKeyword("");
    setKeyword("");
    setFilter("all");
  };

  return (
    <>
      <SiteHeader />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>UNIVERSITIES</p>
            <h1 className={styles.title}>大学から講義を探す</h1>
            <p className={styles.description}>
              興味のある大学を選んで、大学の特徴と公開講義を見てみましょう。
            </p>

            <form className={styles.searchArea} onSubmit={handleSearch}>
              <input
                className={styles.searchInput}
                type="search"
                value={draftKeyword}
                onChange={(event) => setDraftKeyword(event.target.value)}
                placeholder="大学名・地域・分野を入力"
                aria-label="大学名・地域・分野を検索"
              />
              <button className={styles.searchButton} type="submit">
                検索
              </button>
            </form>
          </div>
        </section>

        <section className={styles.universitySection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>大学一覧</h2>
              <p className={styles.sectionDescription}>
                {filteredUniversities.length}校が見つかりました
              </p>
            </div>

            <select
              className={styles.select}
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value as UniversityFilter)
              }
              aria-label="大学の分類を選択"
            >
              <option value="all">すべての大学</option>
              <option value="national">国立大学</option>
              <option value="private">私立大学</option>
              <option value="science">理工系大学</option>
            </select>
          </div>

          {filteredUniversities.length > 0 ? (
            <div className={styles.universityGrid}>
              {filteredUniversities.map((university) => (
                <article className={styles.card} key={university.slug}>
                  <div className={styles.logo}>{university.initials}</div>

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
                        公開講義 {university.courseIds.length}件
                      </span>
                      <Link
                        className={styles.detailLink}
                        href={`/universities/${university.slug}`}
                      >
                        大学ページを見る
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔍</span>
              <h3>条件に合う大学が見つかりませんでした</h3>
              <p>検索語や大学の分類を変更して、もう一度お試しください。</p>
              <button
                type="button"
                className={styles.resetButton}
                onClick={resetSearch}
              >
                検索条件をリセット
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
