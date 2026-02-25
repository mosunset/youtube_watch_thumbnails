# extension — YouTube Watch Thumbnails ブラウザ拡張機能

YouTube 動画のサムネイル画像を視聴ページ上で表示・確認できるブラウザ拡張機能です。Chrome と Firefox に対応しています。

## 技術スタック

| カテゴリ | 技術 |
| :--- | :--- |
| 拡張機能フレームワーク | [WXT](https://wxt.dev/) v0.20 |
| UI | React 19 + React DOM 19 |
| スタイリング | Tailwind CSS 4 + PostCSS |
| 言語 | TypeScript 5.9 |
| UIコンポーネント | Radix UI, Lucide React |
| ユーティリティ | class-variance-authority, clsx, tailwind-merge |
| メッセージング | @webext-core/messaging |
| 国際化 | @wxt-dev/i18n（en / ja / ko） |
| ストレージ | @wxt-dev/storage |
| アイコン生成 | @wxt-dev/auto-icons |

## 主な機能

- **サムネイル自動表示** — YouTube 視聴ページ（`/watch`）と Shorts（`/shorts`）でサムネイル画像を自動挿入
- **高解像度優先取得** — maxresdefault → sddefault → hqdefault の優先順で最適な画質を自動選択
- **ホバーで拡大** — サムネイルにマウスを乗せると 1.75 倍に拡大表示
- **ワンクリックビューワー** — サムネイルクリックで専用タブを開き、全サイズの画像を一覧表示
- **多言語対応** — 英語・日本語・韓国語

## ディレクトリ構成

```text
apps/extension/
├── src/
│   ├── entrypoints/          # WXT エントリーポイント
│   │   ├── content.ts        # コンテンツスクリプト（YouTube ページにサムネイルを注入）
│   │   ├── background.ts     # バックグラウンドスクリプト（タブ操作など）
│   │   ├── popup/            # 拡張機能ポップアップ UI
│   │   │   └── main.tsx
│   │   ├── ThumbnailView/    # 全サイズサムネイル表示ページ
│   │   │   └── main.tsx
│   │   ├── options/          # オプション設定ページ
│   │   │   └── main.tsx
│   │   └── notifications/    # 通知ページ
│   │       └── main.tsx
│   ├── components/           # 共通 React コンポーネント
│   ├── utils/                # ユーティリティ関数
│   ├── styles/               # グローバルスタイル
│   ├── assets/               # アイコン等の静的アセット
│   ├── locales/              # 多言語ファイル（en.yml, ja.yml, ko.yml）
│   └── app.config.ts         # アプリ設定
├── wxt.config.ts             # WXT 設定（モジュール、マニフェスト、アイコン生成）
├── tsconfig.json             # TypeScript 設定（パスエイリアス @/*）
├── postcss.config.mjs        # PostCSS 設定
└── package.json
```

## エントリーポイント解説

| エントリーポイント | 役割 |
| :--- | :--- |
| `content.ts` | YouTube ページの DOM を監視し、動画メタデータ横にサムネイル画像要素を挿入・更新する |
| `background.ts` | サムネイルビューワー用タブの作成・管理を行うバックグラウンドワーカー |
| `popup/` | 拡張機能アイコンクリック時に表示されるポップアップメニュー |
| `ThumbnailView/` | 全サイズのサムネイル画像を一覧表示する専用ページ |
| `options/` | 拡張機能のオプション設定画面 |
| `notifications/` | 通知表示ページ |

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
```

## ビルド成果物

- Chrome: `.output/chrome-mv3/`
- Firefox: `.output/firefox-mv2/`

## マニフェスト権限

- `tabs` — タブの作成・操作
- `storage` — 設定の永続化

## ストアリンク

- [Chrome Web Store](https://chromewebstore.google.com/detail/youtube-watch-thumbnails/aobeafpjgdgakpagffmlkfeognaiigci)
- [Firefox Add-ons](https://addons.mozilla.org/ja/firefox/addon/youtube-watch-thumbnails/)
