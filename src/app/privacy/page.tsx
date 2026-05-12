import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ポケ戦略 Wiki',
  description: '当サイトのプライバシーポリシーです。',
}

export default function PrivacyPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 style={{ color: 'var(--color-primary)' }}>プライバシーポリシー</h1>

      <h2>アクセス解析ツールについて</h2>
      <p>
        当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。
        Google Analyticsはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、
        個人を特定するものではありません。
      </p>
      <p>
        この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。
        Google Analyticsの利用規約については<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer">こちら</a>をご覧ください。
      </p>

      <h2>広告について</h2>
      <p>
        当サイトでは、第三者配信の広告サービス「Google AdSense」を使用しています。
        広告配信事業者はユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
        Cookieの使用を望まない場合は、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google広告設定</a>で無効にすることができます。
      </p>

      <h2>Amazonアソシエイトについて</h2>
      <p>
        当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを
        目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
      </p>

      <h2>免責事項</h2>
      <p>
        当サイトに掲載されている情報の正確性には万全を期していますが、利用者が当サイトの情報を用いて行う
        一切の行為について、いかなる責任も負いません。
      </p>

      <h2>著作権について</h2>
      <p>
        当サイトで掲載しているコンテンツの著作権は当サイト管理者に帰属します。
        ポケモンに関する著作権は株式会社ポケモン、任天堂株式会社、株式会社ゲームフリークに帰属します。
        当サイトはファンサイトであり、各企業との関連はありません。
      </p>

      <p className="text-sm text-gray-500">最終更新日: 2026-05-10</p>
    </article>
  )
}
