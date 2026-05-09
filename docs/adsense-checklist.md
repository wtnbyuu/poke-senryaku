# Google AdSense 収益化チェックリスト（poke-senryaku）

対象サイト: https://poke-senryaku.vercel.app  
作成日: 2026-05-06

---

## 1. 前提条件チェックリスト

AdSense審査を申請する前に、以下の条件を満たしていること。

### コンテンツ量・質

- [ ] オリジナルコンテンツが十分にある（目安: 10ページ以上、各ページ500文字以上）
- [ ] 他サイトのコピーや転載ではない独自のコンテンツである
- [ ] ポケモン著作権（任天堂・ゲームフリーク）に抵触するコンテンツ（ROM画像、公式イラストの無断転載等）がない
- [ ] サイトが公開されており、Googleのクローラーがアクセスできる状態である
- [ ] 18歳以上であること（または保護者の同意があること）

### 必須ページ

- [ ] **プライバシーポリシーページ**が作成されている（セクション3参照）
- [ ] **お問い合わせページ**が存在する（審査通過率を上げるために強く推奨）
- [ ] サイトの運営者情報が記載されている（About/運営者情報ページ推奨）

### 独自ドメインが必要な理由

`vercel.app` のようなサブドメインはAdSense審査の対象外となる場合がある。  
Googleは独自ドメインを持つサイトを審査対象としており、`vercel.app` では**申請が受理されないか、審査が著しく不利になる**。

- [ ] 独自ドメイン（例: `poke-senryaku.com`）を取得済みである（セクション2参照）
- [ ] Vercelに独自ドメインを設定済みである

---

## 2. 独自ドメイン取得手順

### レジストラ比較

| 項目 | お名前.com | Cloudflare Registrar |
|------|-----------|----------------------|
| 初年度価格（.com） | 約160円〜（キャンペーン時） | 約$10.44/年（定価のみ） |
| 更新価格（.com） | 約1,408円/年 | 約$10.44/年（最安値クラス） |
| 管理画面 | 日本語、やや複雑 | 英語、シンプル |
| DNS管理 | お名前DNS or 外部変更可 | Cloudflare DNS（高性能） |
| おすすめ | 初年度を安く済ませたい場合 | 長期利用・コスト重視の場合 |

**推奨: Cloudflare Registrar**（更新価格が安く、DNS管理も優秀）

---

### poke-senryaku.com の取得手順（Cloudflare Registrar）

- [ ] **Cloudflareアカウント作成**
  1. https://dash.cloudflare.com/sign-up にアクセス
  2. メールアドレス・パスワードを入力して登録
  3. メール認証を完了する

- [ ] **ドメイン検索・購入**
  1. ダッシュボード左メニュー「Domain Registration」→「Register Domains」
  2. 検索ボックスに `poke-senryaku.com` を入力して検索
  3. `.com` が空いていれば「Purchase」をクリック
  4. 支払い情報（クレジットカード）を入力して購入完了
  5. 「Auto-renew」を有効にしておく

- [ ] **ドメイン取得確認**
  - 「Domain Registration」→「Manage Domains」で `poke-senryaku.com` が表示されれば取得完了

---

### お名前.com での取得手順（代替）

- [ ] https://www.onamae.com にアクセス
- [ ] 検索ボックスに `poke-senryaku` を入力して「検索」
- [ ] `.com` を選択してカートに追加
- [ ] 会員登録 or ログインして購入
- [ ] 「Whois情報公開代行」を有効にする（個人情報保護のため）

---

### VercelへのカスタムドメインDNS設定手順

#### Vercel側の設定

- [ ] https://vercel.com/dashboard にログイン
- [ ] `poke-senryaku` プロジェクトを選択
- [ ] 「Settings」→「Domains」を開く
- [ ] 「Add Domain」に `poke-senryaku.com` を入力して「Add」
- [ ] `www.poke-senryaku.com` も同様に追加（推奨）
- [ ] Vercelが表示する設定値を確認する（以下の例を参照）

Vercelが表示する設定値（例）:
```
Type: A
Name: @（または空欄）
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### DNS側の設定（Cloudflare Registrarの場合）

- [ ] Cloudflareダッシュボード左メニュー「DNS」→「Records」を開く
- [ ] 「Add record」をクリックして以下を追加:

**Aレコード（ルートドメイン用）**
```
Type: A
Name: @
IPv4 address: 76.76.21.21
Proxy status: DNS only（グレーの雲マーク）※ オレンジにしない
TTL: Auto
```

**CNAMEレコード（wwwサブドメイン用）**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only（グレーの雲マーク）
TTL: Auto
```

> 注意: CloudflareのProxyを有効（オレンジ）にするとVercelのSSL証明書発行が失敗することがある。**必ずDNS only（グレー）**に設定すること。

- [ ] Vercelダッシュボードに戻り、ドメインのステータスが「Valid Configuration」になることを確認（DNS反映まで最大48時間かかる場合があるが、通常は数分〜1時間）

---

## 3. プライバシーポリシーページの作成

### 必須記載事項

- [ ] サイト名・運営者名・連絡先
- [ ] 収集する個人情報の種類（アクセスログ、Cookieなど）
- [ ] Google AdSenseによる広告配信とCookieの使用について
- [ ] Googleアナリティクスによるアクセス解析について（使用する場合）
- [ ] 第三者へのデータ提供に関する方針
- [ ] お問い合わせ方法
- [ ] プライバシーポリシーの改定について

### サンプル文面（そのまま使える）

以下を自分のサイト情報に合わせて修正して使用すること。

```markdown
# プライバシーポリシー

## 運営者情報

サイト名: ポケ戦略 Wiki  
URL: https://poke-senryaku.com  
運営者: [あなたの名前またはハンドルネーム]  
お問い合わせ: [メールアドレスまたはお問い合わせフォームURL]

---

## 個人情報の収集について

本サイトでは、お問い合わせの際にメールアドレス等の個人情報を取得することがあります。
取得した個人情報は、お問い合わせへの返信のみに使用し、第三者への提供は行いません。

---

## アクセス解析ツールについて

本サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
このGoogleアナリティクスはCookieを使用してデータを収集しており、個人を特定する情報は含まれません。
この機能はCookieを無効にすることで収集を拒否できます。詳細は[Googleのプライバシーポリシー](https://policies.google.com/privacy)をご確認ください。

---

## 広告の配信について

本サイトでは、第三者配信の広告サービス「Google AdSense」を使用しています。
Google AdSenseは、ユーザーの興味に合わせた広告を表示するためにCookieを使用します。
Cookieを使用することで、Googleおよびそのパートナーは本サイトや他サイトへのアクセス情報に基づいて広告を配信します。

Cookieを無効にする方法や、Googleが広告に使用する情報については、
[Googleの広告オプトアウトページ](https://adssettings.google.com/authenticated)をご確認ください。

---

## 免責事項

本サイトに掲載されている情報の正確性・完全性・有用性について、いかなる保証も行いません。
本サイトの利用によって生じた損害について、運営者は責任を負いかねます。

---

## プライバシーポリシーの改定

本プライバシーポリシーは、必要に応じて予告なく変更することがあります。
変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じるものとします。

最終更新日: 2026-05-06
```

### Next.jsへの追加方法

- [ ] `src/app/privacy/page.tsx` を新規作成する

```tsx
export default function PrivacyPage() {
  return (
    <article className="prose max-w-none">
      <h1>プライバシーポリシー</h1>
      {/* 上記サンプル文面をJSXに変換して貼り付ける */}
    </article>
  )
}
```

- [ ] フッターまたはサイドバーにプライバシーポリシーへのリンクを追加する

```tsx
<a href="/privacy">プライバシーポリシー</a>
```

- [ ] `src/app/contact/page.tsx` も同様に作成し、お問い合わせフォーム（または連絡先メールアドレス）を記載する

---

## 4. Google AdSense申請手順

- [ ] **AdSenseアカウント作成**
  - https://www.google.com/adsense/start/ にアクセス
  - Googleアカウントでログイン（サイトの主要管理に使っているアカウントを推奨）

- [ ] **申請フォームの入力**

| 項目 | 入力内容 |
|------|---------|
| ウェブサイトのURL | `https://poke-senryaku.com`（独自ドメイン） |
| AdSenseのメール受信 | 任意 |
| 国または地域 | 日本 |
| お支払い情報 | 後で入力可能（審査中は不要） |

- [ ] **審査コード（AdSenseスニペット）の取得**
  - 申請後、AdSenseダッシュボードに以下のようなコードが表示される:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

- [ ] **審査コードをlayout.tsxに追記する**

`src/app/layout.tsx` の `<head>` セクション（または `<body>` 内）に追加:

```tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { getAllWikiMeta } from '@/lib/wiki'

export const metadata: Metadata = {
  title: 'ポケ戦略 Wiki',
  description: 'ポケモン対戦ガチ勢に追いつくための完全ガイド',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pages = getAllWikiMeta()

  return (
    <html lang="ja">
      <head>
        {/* AdSense審査コード - ca-pub-XXX は自分のIDに置き換える */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {/* 既存のコード */}
      </body>
    </html>
  )
}
```

> `next/script` の `strategy="afterInteractive"` を使うことで、ページの初期ロードをブロックしない。

- [ ] コードを追記してVercelにデプロイする（`git push` するだけで自動デプロイされる）
- [ ] AdSenseダッシュボードに戻り「審査をリクエスト」または「完了」ボタンをクリック

**審査期間の目安: 1日〜4週間**（コンテンツが充実していれば数日で完了することが多い）

---

## 5. 審査通過後の設定

### Vercelの環境変数に AdSense Client ID を追加

- [ ] https://vercel.com/dashboard → プロジェクト → 「Settings」→「Environment Variables」を開く
- [ ] 以下の環境変数を追加する:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-XXXXXXXXXXXXXXXX` | Production, Preview, Development |

- [ ] 追加後、Vercelで再デプロイする（Settings変更後は自動では再デプロイされないため手動で実施）:
  ```bash
  # ローカルで変更なしの場合は空コミットで再デプロイできる
  git commit --allow-empty -m "redeploy: AdSense env var反映"
  git push
  ```

### 広告ユニットの作成

- [ ] AdSenseダッシュボード → 「広告」→「広告ユニット」→「新しい広告ユニット」
- [ ] サイドバー用広告ユニットを作成:
  - 種類: ディスプレイ広告
  - 名前: `sidebar`
  - サイズ: レスポンシブ
  - 「作成して取得」をクリック → **スロットID（数字10桁程度）** が表示される

- [ ] 記事内用広告ユニットを作成:
  - 種類: 記事内広告（またはディスプレイ広告）
  - 名前: `article`
  - サイズ: レスポンシブ
  - 「作成して取得」をクリック → **スロットID** が表示される

### 広告スロットIDをVercel環境変数に追加

- [ ] Vercel → Settings → Environment Variables に以下を追加:

| Key | Value | 説明 |
|-----|-------|------|
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | `1234567890`（実際のスロットID） | サイドバー広告 |
| `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE` | `0987654321`（実際のスロットID） | 記事内広告 |

- [ ] 再デプロイして広告が表示されることを確認する

### 広告コンポーネントの組み込み（参考）

`src/components/AdBanner.tsx`:

```tsx
'use client'
import { useEffect } from 'react'

type Props = {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal'
}

export function AdBanner({ slot, format = 'auto' }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is loaded by the AdSense script
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [])

  if (!client || !slot) return null

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
```

使用例（Sidebar.tsx 内）:
```tsx
import { AdBanner } from './AdBanner'

// サイドバーの下部に追加
<AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? ''} />
```

---

## 6. 審査が通りやすくするためのコツ

### コンテンツの充実

- [ ] 各ページが500文字以上の独自コンテンツを持っている
- [ ] 「ポケモン対戦」に関連する専門的・具体的な情報が書かれている（型紹介、立ち回り解説など）
- [ ] 画像・図表など視覚的要素が含まれている（スクリーンショットは著作権に注意）
- [ ] 最新シーズン・環境に基づいた情報になっている

### ページ数の目安

- 最低: 10ページ以上（現在11ページなのでクリア）
- 推奨: 20〜30ページ以上（申請前にコンテンツを増やすと通過率が上がる）
- 申請後も更新を続けていると審査官の印象が良くなる

### 審査前に避けるべきこと

- [ ] アフィリエイトリンクを多量に設置していない
- [ ] ポップアップや自動再生動画がない
- [ ] 他のAdNetworkの広告コードが既に入っていない
- [ ] アクセス水増しツールや不正なトラフィックを使用していない
- [ ] コンテンツが「ポケモン」という著名IPの二次利用であることを意識し、公式画像・音楽の無断使用がない
- [ ] サイトの表示速度が極端に遅くない（Next.js静的エクスポートなので問題ないはず）

---

## 7. タイムライン（目安）

```
Day 1: 独自ドメイン取得 + DNS設定
├── [ ] Cloudflare Registrar or お名前.com でドメイン購入
├── [ ] Vercelにカスタムドメインを追加
└── [ ] DNSレコード設定（反映まで数分〜48時間）

Day 2: コンテンツ整備 + AdSense申請
├── [ ] プライバシーポリシーページ作成・デプロイ
├── [ ] お問い合わせページ作成・デプロイ
├── [ ] AdSenseアカウント作成
├── [ ] 審査コードをlayout.tsxに追加・デプロイ
└── [ ] AdSenseで審査リクエスト送信

Day 3〜30: 審査待ち
├── [ ] 審査中もコンテンツを追加・更新し続ける
├── [ ] AdSenseダッシュボードで「サイトの準備完了」通知を待つ
└── [ ] 差し戻しの場合は指摘事項を修正して再申請

審査通過後（通知メールが届いたら）
├── [ ] Vercel環境変数に NEXT_PUBLIC_ADSENSE_CLIENT を追加
├── [ ] AdSenseで広告ユニット（sidebar・article）を作成
├── [ ] NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR・SLOT_ARTICLE を環境変数に追加
├── [ ] 再デプロイして広告の表示を確認
└── [ ] AdSenseダッシュボードで収益レポートを確認
```

---

## 参考URL

- Google AdSense申請: https://www.google.com/adsense/start/
- AdSenseポリシー: https://support.google.com/adsense/answer/48182
- Vercelカスタムドメイン設定: https://vercel.com/docs/projects/domains/add-a-domain
- Cloudflare Registrar: https://www.cloudflare.com/products/registrar/
- お名前.com: https://www.onamae.com
- Google広告設定オプトアウト: https://adssettings.google.com/authenticated
