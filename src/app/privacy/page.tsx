import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "プライバシーポリシー | UniLecture",
  description: "UniLectureにおける利用者情報の取扱いをご案内します。",
};

const sections = [
  ["information", "1. 取得する情報"],
  ["purpose", "2. 利用目的"],
  ["cookies", "3. Cookieの利用"],
  ["sharing", "4. 第三者提供・委託"],
  ["security", "5. 安全管理"],
  ["retention", "6. 保存期間・削除"],
  ["requests", "7. 利用者からの請求"],
  ["minors", "8. 未成年者の利用"],
  ["changes", "9. ポリシーの変更"],
] as const;

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>PRIVACY POLICY</p>
            <h1 className={styles.title}>プライバシーポリシー</h1>
            <p className={styles.description}>
              UniLectureが取得する情報、その利用目的および安全管理についてご案内します。
            </p>
          </div>
        </header>

        <div className={styles.content}>
          <nav className={styles.toc} aria-label="プライバシーポリシーの目次">
            <p className={styles.tocTitle}>目次</p>
            <ol className={styles.tocList}>
              {sections.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <article className={styles.document}>
            <div className={styles.draftNotice} role="note">
              <strong>ドラフト版：</strong>
              本ポリシーは開発段階の内容です。正式公開前に、運営主体、問い合わせ窓口、利用する外部サービスを確定し、専門家による確認を行います。
            </div>

            <section id="information" className={styles.section}>
              <h2>1. 取得する情報</h2>
              <p>本サービスは、主に次の情報を取得します。</p>
              <ul>
                <li>氏名、メールアドレス、利用者種別</li>
                <li>講義の視聴履歴、学習進捗、お気に入り、レビュー</li>
                <li>契約プラン、決済状況および利用履歴</li>
                <li>Cookie、セッション識別子、アクセス日時等の技術情報</li>
              </ul>
              <p>
                パスワードは平文で保存せず、一方向のハッシュ処理を行ったうえで管理します。
              </p>
            </section>

            <section id="purpose" className={styles.section}>
              <h2>2. 利用目的</h2>
              <ul>
                <li>アカウントの作成、本人確認およびログイン状態の維持</li>
                <li>講義の提供、学習進捗の保存およびおすすめ機能の改善</li>
                <li>契約、請求、支払いおよび問い合わせへの対応</li>
                <li>不正利用の防止、障害調査および安全性の向上</li>
                <li>本サービスの品質改善および利用状況の分析</li>
              </ul>
            </section>

            <section id="cookies" className={styles.section}>
              <h2>3. Cookieの利用</h2>
              <p>
                本サービスは、ログイン状態を安全に維持するためCookieを利用します。認証CookieにはHttpOnly、SameSite等の属性を設定し、ブラウザ上のJavaScriptから読み取れないよう管理します。
              </p>
            </section>

            <section id="sharing" className={styles.section}>
              <h2>4. 第三者提供・委託</h2>
              <p>
                法令に基づく場合または利用者の同意がある場合を除き、個人情報を第三者へ提供しません。サービス運営上必要な業務を外部へ委託する場合は、委託先を適切に選定・監督します。
              </p>
            </section>

            <section id="security" className={styles.section}>
              <h2>5. 安全管理</h2>
              <p>
                不正アクセス、漏えい、滅失または改ざんを防ぐため、アクセス制御、暗号化、パスワードのハッシュ化、セッション管理その他の合理的な安全対策を講じます。
              </p>
            </section>

            <section id="retention" className={styles.section}>
              <h2>6. 保存期間・削除</h2>
              <p>
                利用目的に必要な期間または法令上求められる期間、情報を保存します。不要となった情報は、合理的な期間内に削除または匿名化します。具体的な退会・削除手続きは正式提供開始時に案内します。
              </p>
            </section>

            <section id="requests" className={styles.section}>
              <h2>7. 利用者からの請求</h2>
              <p>
                利用者は、適用法令に従い、自己の個人情報について開示、訂正、利用停止または削除を求めることができます。本人確認後、合理的な範囲で対応します。
              </p>
            </section>

            <section id="minors" className={styles.section}>
              <h2>8. 未成年者の利用</h2>
              <p>
                未成年者が本サービスを利用する場合、必要に応じて保護者等の法定代理人の同意を得たうえで利用してください。
              </p>
            </section>

            <section id="changes" className={styles.section}>
              <h2>9. ポリシーの変更</h2>
              <p>
                法令やサービス内容の変更に応じて本ポリシーを改定することがあります。重要な変更がある場合は、本サービス上の表示その他適切な方法でお知らせします。
              </p>
            </section>

            <p className={styles.updatedAt}>最終更新日：2026年7月17日</p>

            <div className={styles.relatedLinks}>
              <Link href="/terms">利用規約を見る</Link>
              <Link href="/">トップページへ戻る</Link>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
