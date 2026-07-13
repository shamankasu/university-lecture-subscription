import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import styles from "./page.module.css";

const plans = [
  {
    name: "無料体験",
    price: "0円",
    period: "7日間",
    description: "まずは気軽に講義を体験したい方におすすめ",
    features: [
      "一部の講義を視聴",
      "お気に入り登録",
      "学習進捗の保存",
      "7日間無料",
    ],
    buttonText: "無料で試す",
    href: "/register",
    recommended: false,
    badge: "",
  },
  {
    name: "月額プラン",
    price: "980円",
    period: "/ 月",
    description: "さまざまな講義を自分のペースで学びたい方におすすめ",
    features: [
      "すべての講義を視聴",
      "講義資料の閲覧",
      "お気に入り登録",
      "学習進捗の保存",
      "いつでも解約可能",
    ],
    buttonText: "月額プランを始める",
    href: "/login",
    recommended: true,
    badge: "人気",
  },
  {
    name: "年額プラン",
    price: "9,800円",
    period: "/ 年",
    description: "長期的に学習を続けたい方におすすめ",
    features: [
      "すべての講義を視聴",
      "講義資料の閲覧",
      "お気に入り登録",
      "学習進捗の保存",
      "年間1,960円お得",
    ],
    buttonText: "年額プランを始める",
    href: "/login",
    recommended: false,
    badge: "最もお得",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />

      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>PRICING</p>

          <h1 className={styles.title}>料金プラン</h1>

          <p className={styles.description}>
            あなたの学び方に合ったプランを選択してください。
          </p>
        </section>

        <section className={styles.planSection}>
          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`${styles.planCard} ${
                  plan.recommended ? styles.recommendedCard : ""
                }`}
              >
                {plan.badge && (
                  <span
                    className={
                      plan.recommended
                        ? styles.recommendedBadge
                        : styles.badge
                    }
                  >
                    {plan.badge}
                  </span>
                )}

                <h2 className={styles.planName}>{plan.name}</h2>

                <p className={styles.planDescription}>
                  {plan.description}
                </p>

                <div className={styles.priceArea}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>

                {plan.name === "年額プラン" && (
                  <p className={styles.monthlyPrice}>
                    月額換算 約817円
                  </p>
                )}

                <ul className={styles.featureList}>
                  {plan.features.map((feature) => (
                    <li key={feature} className={styles.featureItem}>
                      <span className={styles.check}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`${styles.planButton} ${
                    plan.recommended ? styles.primaryButton : ""
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.compareSection}>
          <div className={styles.sectionHeading}>
            <h2>プラン比較</h2>
            <p>各プランで利用できる機能を比較できます。</p>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>機能</th>
                  <th>無料体験</th>
                  <th>月額プラン</th>
                  <th>年額プラン</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>講義視聴</td>
                  <td>一部のみ</td>
                  <td>すべて</td>
                  <td>すべて</td>
                </tr>

                <tr>
                  <td>講義資料</td>
                  <td>一部のみ</td>
                  <td>利用可能</td>
                  <td>利用可能</td>
                </tr>

                <tr>
                  <td>お気に入り</td>
                  <td>利用可能</td>
                  <td>利用可能</td>
                  <td>利用可能</td>
                </tr>

                <tr>
                  <td>学習進捗の保存</td>
                  <td>利用可能</td>
                  <td>利用可能</td>
                  <td>利用可能</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.sectionHeading}>
            <h2>よくある質問</h2>
            <p>料金プランについてのよくある質問です。</p>
          </div>

          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary>途中で解約できますか？</summary>
              <p>
                月額プランはいつでも解約できます。解約後も契約期間の終了までは講義を視聴できます。
              </p>
            </details>

            <details className={styles.faqItem}>
              <summary>プランを途中で変更できますか？</summary>
              <p>
                マイページから月額プランと年額プランを変更できるようにする予定です。
              </p>
            </details>

            <details className={styles.faqItem}>
              <summary>支払い方法は何がありますか？</summary>
              <p>
                現在はクレジットカードによる支払いを予定しています。
              </p>
            </details>
          </div>
        </section>
      </main>
    </>
  );
}