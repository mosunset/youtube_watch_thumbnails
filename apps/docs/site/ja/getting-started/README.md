# YouTube Watch Thumbnails へようこそ

YouTube 動画のサムネイル画像を簡単に表示・確認できるブラウザ拡張機能です。

![Extension Screenshot1](../../_media/v2.1.01.png)

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
├── turbo.json                  # Turborepo 設定
└── pnpm-workspace.yaml
```

詳しくは[アーキテクチャ](/ja/internals/architecture)をご覧ください。

## 🛠️ 開発用コマンド

リポジトリのルートで実行します（Turborepo が各アプリのスクリプトを実行します）。

- `pnpm dev`: 開発サーバーを起動（拡張機能は HMR 有効 + ドキュメント）
- `pnpm build`: Chrome 版と Firefox 版の拡張機能をビルドし、ドキュメントのリンクを検証
- `pnpm lint`: ESLint（拡張機能）とドキュメントのリンク検証を実行
- `pnpm test`: 拡張機能の単体テスト（Vitest）を実行

`apps/extension` にはほかにもスクリプトがあります（例: `pnpm --filter extension zip`）。詳しくは[ビルド](/ja/internals/build)をご覧ください。

詳細な仕様については [仕様](/ja/internals/specifications) をご覧ください。
