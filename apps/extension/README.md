# extension — YouTube Watch Thumbnails ブラウザ拡張機能

YouTube 動画のサムネイル画像を視聴ページ上で表示・確認できるブラウザ拡張機能です。Chrome と Firefox に対応しています。

## 技術スタック

| カテゴリ | 技術 |
| :--- | :--- |
| 拡張機能フレームワーク | [WXT](https://wxt.dev/) v0.20 |
| UI | React 19 + React DOM 19 |
| スタイリング | Tailwind CSS 4 + PostCSS |
| 言語 | TypeScript 5.9 |
| ユーティリティ | clsx, tailwind-merge |
| メッセージング | @webext-core/messaging |
| 国際化 | @wxt-dev/i18n（en / ja / ko） |
| アイコン生成 | @wxt-dev/auto-icons |
| テスト | Vitest（`wxt/testing`） |
| Lint | ESLint（typescript-eslint, react-hooks） |

## 主な機能

- **サムネイル自動表示** — YouTube 視聴ページ（`/watch`）と Shorts（`/shorts`）でサムネイル画像を自動挿入
- **高解像度優先取得** — maxresdefault → hq720 → sddefault → hqdefault → mqdefault → default の候補を並列に読み込み、一番画質の高いものを表示（120x90 のプレースホルダーは除外）
- **ホバーで拡大** — サムネイルにマウスを乗せると 1.75 倍に拡大表示
- **ワンクリックビューワー** — サムネイルクリックで専用タブ（`ThumbnailView.html?v=動画ID`）を開き、全サイズの画像を一覧表示。タブごとに別の動画を表示できる
- **多言語対応** — ポップアップ・ビューワー・ページ上のツールチップを英語・日本語・韓国語で表示
- **データを保存しない** — 設定や履歴を一切保存しない（`storage` 権限なし）

## ディレクトリ構成

```text
apps/extension/
├── src/
│   ├── entrypoints/              # WXT エントリーポイント
│   │   ├── background.ts         # ThumbnailView タブを開く
│   │   ├── content/              # YouTube の視聴ページにサムネイルを差し込む
│   │   │   ├── index.ts
│   │   │   └── style.css
│   │   ├── popup/                # ツールバーアイコンのポップアップ
│   │   │   ├── App.tsx
│   │   │   └── components/       # ThumbnailPreview, UnsupportedPage
│   │   └── ThumbnailView/        # 全サイズのサムネイル一覧ページ
│   │       ├── App.tsx
│   │       └── components/       # Sidebar, PreviewHeader, PreviewImage, NoVideoScreen
│   ├── utils/
│   │   ├── youtube.ts            # URL → 動画 ID・ページ種別、動画 URL の生成
│   │   ├── thumbnails.ts         # サムネイル URL の定義と最良画像の探索
│   │   ├── thumbnailView.ts      # ThumbnailView を開く処理（?v= の読み書き）
│   │   ├── messaging.ts          # content / popup → background のメッセージ定義
│   │   └── __tests__/            # Vitest のユニットテスト
│   ├── components/               # 共通 React コンポーネント（Footer, OpenInNewIcon）
│   ├── lib/utils.ts              # cn()（Tailwind クラスの結合）
│   ├── styles/                   # グローバルスタイル（Tailwind）
│   ├── assets/                   # アイコン
│   ├── locales/                  # 翻訳（en.yml, ja.yml, ko.yml）
│   └── app.config.ts             # リポジトリ URL などの設定
├── wxt.config.ts                 # WXT 設定（モジュール、マニフェスト、アイコン生成）
├── vitest.config.ts              # テスト設定
├── eslint.config.mjs             # ESLint 設定
├── tsconfig.json                 # .wxt/tsconfig.json を継承（@/*, #i18n などのエイリアス）
├── postcss.config.mjs
└── package.json
```

## エントリーポイント解説

| エントリーポイント | 役割 |
| :--- | :--- |
| `content/` | YouTube の DOM を監視し、チャンネル名の左にサムネイルを差し込む。動画が切り替わったら画像を更新する |
| `background.ts` | `openThumbnailView` メッセージを受けて `ThumbnailView.html?v=動画ID` を新しいタブで開く（content script からは tabs.create を呼べないため） |
| `popup/` | アクティブなタブが動画ページならサムネイルを表示し、それ以外なら案内を表示する |
| `ThumbnailView/` | URL の `?v=` から動画 ID を読み、全ファイル名 × 全配信元のサムネイルを一覧・プレビューする |

## 開発コマンド

```bash
# 開発サーバー起動（デフォルトブラウザ）
pnpm dev

# Chrome 向け開発
pnpm devc

# Firefox 向け開発
pnpm devf

# Chrome + Firefox 両方ビルド
pnpm build

# Chrome のみビルド
pnpm buildc

# Firefox のみビルド
pnpm buildf

# ストア提出用 ZIP 作成（Chrome + Firefox）
pnpm zip

# TypeScript 型チェック
pnpm compile

# Lint
pnpm lint

# ユニットテスト
pnpm test
```

## ビルド成果物

- Chrome: `.output/chrome-mv3/`
- Firefox: `.output/firefox-mv2/`

## マニフェスト権限

- `tabs` — ポップアップでアクティブなタブの URL を読むため

## ストアリンク

- [Chrome Web Store](https://chromewebstore.google.com/detail/youtube-watch-thumbnails/aobeafpjgdgakpagffmlkfeognaiigci)
- [Firefox Add-ons](https://addons.mozilla.org/ja/firefox/addon/youtube-watch-thumbnails/)
