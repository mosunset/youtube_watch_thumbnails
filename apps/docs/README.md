# docs — YouTube Watch Thumbnails ドキュメントサイト

YouTube Watch Thumbnails 拡張機能の公式ドキュメントサイトです。GitHub Pages でホストされています。

**公開URL**: https://mosunset.github.io/youtube_watch_thumbnails/

## 技術スタック

| カテゴリ | 技術 |
| :--- | :--- |
| フレームワーク | [Astro](https://astro.build/) v5.6 |
| ドキュメントテーマ | [Starlight](https://starlight.astro.build/) v0.36 |
| 言語 | TypeScript 5.9 |
| 画像処理 | Sharp |
| プラグイン | starlight-image-zoom（画像ズーム）, starlight-links-validator（リンク検証）|
| SEO | @astrojs/sitemap |

## 主な機能

- **多言語対応** — 英語（デフォルト）と日本語の 2 言語
- **画像ズーム** — ドキュメント内の画像をクリックして拡大表示
- **リンク検証** — ビルド時に内部リンクの整合性を自動チェック
- **サイトマップ自動生成** — SEO 向けサイトマップを自動出力
- **GitHub 編集リンク** — 各ページから対応するソースファイルを直接編集可能
- **カスタムコンポーネント** — Footer, Header, MobileMenuFooter をオーバーライド

## ディレクトリ構成

```text
apps/docs/
├── src/
│   ├── content/
│   │   └── docs/               # Markdown ドキュメント
│   │       ├── getting-started/ # はじめる
│   │       ├── guide/           # ユーザーガイド
│   │       ├── settings/        # 設定
│   │       ├── troubleshooting/ # トラブルシューティング
│   │       ├── internals/       # 内部仕様
│   │       ├── resources/       # プロジェクト情報
│   │       ├── for-reviewers/   # レビュアー向け
│   │       └── ja/              # 日本語版ドキュメント
│   ├── assets/                  # 画像等の静的アセット
│   ├── components/
│   │   └── overrides/           # Starlight コンポーネントオーバーライド
│   │       ├── Footer.astro
│   │       ├── Header.astro
│   │       └── MobileMenuFooter.astro
│   └── content.config.ts
├── public/                      # favicon 等の静的ファイル
├── astro.config.mjs             # Astro + Starlight 設定
├── tsconfig.json
└── package.json
```

## サイドバー構成

| セクション | 内容 |
| :--- | :--- |
| Getting Started（はじめる） | インストール・初期設定ガイド |
| User Guide（ユーザーガイド） | 機能の使い方 |
| Settings（設定） | 各種設定項目の説明 |
| Troubleshooting（トラブルシューティング） | よくある問題と解決方法 |
| Internals（内部仕様） | 技術的な内部動作の解説 |
| Project Docs（プロジェクト情報） | プロジェクトに関する情報 |
| For Reviewers（レビュアー向け） | ストアレビュー担当者向け情報 |

## 開発コマンド

```bash
# 開発サーバー起動（localhost:4321）
pnpm dev

# 本番ビルド（dist/ に出力）
pnpm build

# ビルド結果をローカルでプレビュー
pnpm preview
```

## ビルド成果物

- 出力先: `dist/`
- デプロイ先: GitHub Pages (`https://mosunset.github.io/youtube_watch_thumbnails/`)

## ドキュメントの追加方法

1. `src/content/docs/` 配下の対応ディレクトリに `.md` または `.mdx` ファイルを作成
2. 日本語版は `src/content/docs/ja/` 配下に同じパス構造でファイルを作成
3. 画像は `src/assets/` に配置し、Markdown から相対パスで参照
4. サイドバーは `astro.config.mjs` の `autogenerate` によりディレクトリ単位で自動生成
