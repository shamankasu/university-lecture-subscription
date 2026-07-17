import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "利用規約 | UniLecture",
  description: "UniLectureの利用条件についてご案内します。",
};

const sections = [
  ["application", "第1条 適用"],
  ["registration", "第2条 利用登録"],
  ["account", "第3条 アカウント管理"],
  ["prohibited", "第4条 禁止事項"],
  ["content", "第5条 コンテンツ"],
  ["fees", "第6条 料金・契約"],
  ["suspension", "第7条 利用停止・退会"],
  ["disclaimer", "第8条 免責事項"],
  ["changes", "第9条 規約の変更"],
] as const;

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>TERMS OF SERVICE</p>
            <h1 className={styles.title}>利用規約</h1>
            <p className={styles.description}>
              UniLectureをご利用いただく際の基本的なルールと条件を定めています。
            </p>
          </div>
        </header>

        <div className={styles.content}>
          <nav className={styles.toc} aria-label="利用規約の目次">
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
              本規約は開発段階の内容です。正式公開前に、運営主体・連絡先・返金条件などを確定し、専門家による確認を行います。
            </div>

            <section id="application" className={styles.section}>
              <h2>第1条 適用</h2>
              <p>
                本規約は、UniLecture（以下「本サービス」）の利用に関する条件を定めるものです。利用者は、本規約に同意したうえで本サービスを利用します。
              </p>
            </section>

            <section id="registration" className={styles.section}>
              <h2>第2条 利用登録</h2>
              <ol>
                <li>
                  利用希望者は、正確かつ最新の情報を登録するものとします。
                </li>
                <li>
                  虚偽の情報、第三者の情報、または不正な目的による登録は認められません。
                </li>
                <li>
                  運営者は、登録内容に問題があると判断した場合、登録を承認しないことがあります。
                </li>
              </ol>
            </section>

            <section id="account" className={styles.section}>
              <h2>第3条 アカウント管理</h2>
              <p>
                利用者は、メールアドレスおよびパスワードを自己の責任で安全に管理し、第三者に利用させないものとします。不正利用が疑われる場合は、速やかに運営者へ連絡してください。
              </p>
            </section>

            <section id="prohibited" className={styles.section}>
              <h2>第4条 禁止事項</h2>
              <p>利用者は、次の行為を行ってはなりません。</p>
              <ul>
                <li>法令または公序良俗に違反する行為</li>
                <li>講義動画、資料その他のコンテンツを無断で複製・配布する行為</li>
                <li>他の利用者、大学、講師または第三者の権利を侵害する行為</li>
                <li>本サービスへ不正にアクセスし、運営を妨害する行為</li>
                <li>アカウントの譲渡、貸与、売買または共有</li>
                <li>その他、運営者が不適切と判断する行為</li>
              </ul>
            </section>

            <section id="content" className={styles.section}>
              <h2>第5条 コンテンツ</h2>
              <p>
                本サービスで提供される講義動画、資料、画像、文章等の権利は、各大学、講師、運営者または正当な権利者に帰属します。利用者は、個人の学習目的の範囲でのみ利用できます。
              </p>
            </section>

            <section id="fees" className={styles.section}>
              <h2>第6条 料金・契約</h2>
              <ol>
                <li>
                  有料プランの料金、期間および利用可能な機能は、料金ページに表示します。
                </li>
                <li>
                  課金、更新、解約および返金に関する詳細は、正式提供開始時に別途定めます。
                </li>
              </ol>
            </section>

            <section id="suspension" className={styles.section}>
              <h2>第7条 利用停止・退会</h2>
              <p>
                利用者が本規約に違反した場合、運営者は事前の通知なく利用を制限または停止できるものとします。退会方法および退会後のデータ取扱いは、正式提供開始時に案内します。
              </p>
            </section>

            <section id="disclaimer" className={styles.section}>
              <h2>第8条 免責事項</h2>
              <p>
                運営者は、本サービスの内容や継続的な提供について、法律上許容される範囲を超える保証を行いません。保守、障害、災害その他の事情により、提供を一時停止することがあります。
              </p>
            </section>

            <section id="changes" className={styles.section}>
              <h2>第9条 規約の変更</h2>
              <p>
                運営者は、必要に応じて本規約を変更できます。重要な変更がある場合は、本サービス上の表示その他適切な方法で利用者へ通知します。
              </p>
            </section>

            <p className={styles.updatedAt}>最終更新日：2026年7月17日</p>

            <div className={styles.relatedLinks}>
              <Link href="/privacy">プライバシーポリシーを見る</Link>
              <Link href="/">トップページへ戻る</Link>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
