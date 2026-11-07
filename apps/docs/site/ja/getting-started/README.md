# YouTube Watch Thumbnails へようこそ

YouTube 動画のサムネイル画像を簡単に表示・確認できるブラウザ拡張機能です。

**視聴ページ**：チャンネル名の横にサムネイルを表示し、マウスを乗せると拡大します。

![視聴ページのサムネイル](../../_media/ja-1-watch-page.png)

**ポップアップ**：ツールバーのアイコンから、視聴中の動画の一番きれいなサムネイルを表示します。

![ポップアップ](../../_media/ja-2-popup.png)

**Thumbnail View**：すべてのサイズ・形式のサムネイルを一覧表示し、プレビュー・保存できます。

![Thumbnail View](../../_media/ja-3-thumbnail-view.png)

## 何ができるか

- **サムネイル表示**: YouTube 視聴ページで、動画のサムネイル画像を自動的に表示します。
- **高画質対応**: WebP および JPG 形式の最高画質サムネイルを取得します。
- **ワンクリック確認**: サムネイルをクリックすると、専用ビューワーで全サイズの画像を確認できます。
- **Shorts 対応**: YouTube Shorts にも対応しています。

## 次のステップ

- [インストール](/ja/getting-started/install): ブラウザへのインストール方法
- [基本的な使い方](/ja/getting-started/basic-usage): 基本的な操作方法

## 📂 ディレクトリ構成

```text
youtube_watch_thumbnails/
├── apps/
│   ├── extension/              # ブラウザ拡張機能（WXT + React）
│   │   ├── src/
│   │   │   ├── entrypoints/    # background, content, popup, ThumbnailView
│   │   │   ├── utils/          # youtube.ts, thumbnails.ts, messaging.ts, __tests__/
│   │   │   ├── components/     # 共通の React コンポーネント
│   │   │   └── locales/        # en / ja / ko の翻訳
│   │   ├── .output/            # ビルド成果物（gitignore 対象）
│   │   └── wxt.config.ts       # WXT 設定ファイル
│   └── docs/                   # このドキュメントサイト（docsify）
└── pnpm-workspace.yaml
```

詳しくは[アーキテクチャ](/ja/internals/architecture)をご覧ください。

## 🛠️ 開発用コマンド

リポジトリのルートで実行します（pnpm が各アプリのスクリプトを実行します）。

- `pnpm dev`: 開発サーバーを起動（拡張機能は HMR 有効 + ドキュメント）
- `pnpm build`: Chrome 版と Firefox 版の拡張機能をビルドし、ドキュメントのリンクを検証
- `pnpm lint`: ESLint（拡張機能）とドキュメントのリンク検証を実行
- `pnpm test`: 拡張機能の単体テスト（Vitest）を実行
- `pnpm test:e2e`: 拡張機能をビルドし、Chromium で E2E テスト（Playwright）を実行
- `pnpm release <version>`: テスト後にバージョンを上げてタグを push。GitHub Actions が GitHub Release の作成とストア提出を行う（[リリース](/ja/internals/release)）

`apps/extension` にはほかにもスクリプトがあります（例: `pnpm --filter extension zip`）。詳しくは[ビルド](/ja/internals/build)をご覧ください。

詳細な仕様については [仕様](/ja/internals/specifications) をご覧ください。
