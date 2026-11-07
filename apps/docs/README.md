# docs — YouTube Watch Thumbnails ドキュメントサイト

YouTube Watch Thumbnails 拡張機能の公式ドキュメントサイトです。[docsify](https://docsify.js.org/) で構築し、GitHub Pages でホストしています。

**公開URL**: https://mosunset.github.io/youtube_watch_thumbnails/

## 技術スタック

| カテゴリ | 技術 |
| :--- | :--- |
| ドキュメント生成 | [docsify](https://docsify.js.org/) v4.13（ビルド不要・ブラウザで Markdown を描画） |
| プラグイン | search（全文検索）, zoom-image（画像ズーム）, docsify-copy-code, docsify-pagination, docsify-plugin-flexible-alerts |
| リンク検証 | `scripts/check-links.mjs`（Node.js のみ・依存パッケージなし） |

docsify 本体とプラグインは `site/index.html` から jsDelivr CDN（バージョン固定）で読み込みます。npm の依存パッケージはありません。

## 主な機能

- **多言語対応** — 英語（`site/`）と日本語（`site/ja/`）の 2 言語。ナビバーから切り替え
- **全文検索** — 表示中の言語ごとに検索
- **画像ズーム** — ドキュメント内の画像をクリックして拡大表示
- **リンク検証** — `pnpm build` / `pnpm lint` で内部リンク・画像の参照切れを検出
- **GitHub 編集リンク** — 各ページ下部から対応するソースファイルを開ける

## ディレクトリ構成

```text
apps/docs/
├── site/                       # 公開ディレクトリ（GitHub Pages にそのままデプロイ）
│   ├── index.html              # docsify 本体の設定
│   ├── README.md               # ホーム（英語）
│   ├── _sidebar.md             # サイドバー（英語）
│   ├── _navbar.md              # ナビバー（ストアバッジ・言語切替）
│   ├── _404.md                 # 404 ページ
│   ├── _media/                 # 画像（アイコン・スクリーンショット）
│   ├── getting-started/        # はじめる
│   ├── guide/                  # ユーザーガイド
│   ├── settings/               # 設定
│   ├── troubleshooting/        # トラブルシューティング
│   ├── internals/              # 内部仕様
│   ├── resources/              # プロジェクト情報
│   ├── for-reviewers/          # レビュアー向け
│   └── ja/                     # 日本語版（同じ構成 + _sidebar.md / _navbar.md）
├── scripts/
│   └── check-links.mjs         # 内部リンク検証
└── package.json
```

## 開発コマンド

```bash
# 開発サーバー起動（http://localhost:3000、ライブリロードあり）
pnpm dev

# 内部リンク・画像の参照切れチェック（build / lint は同じ処理）
pnpm build
pnpm lint
```

docsify は静的ファイルをそのまま配信するだけなので、`site/` を任意の静的サーバーで配信しても確認できます。

## デプロイ

`main` ブランチへの push で `.github/workflows/deploy-docs.yml` が動き、リンク検証のあと `apps/docs/site/` をそのまま GitHub Pages に公開します。

## ドキュメントの追加方法

1. `site/` 配下の対応ディレクトリに `.md` ファイルを作成（ディレクトリのトップページは `README.md`）
2. 日本語版は `site/ja/` 配下に同じパス構造でファイルを作成
3. `site/_sidebar.md` と `site/ja/_sidebar.md` にリンクを追加
4. 内部リンクはサイトルートからのルートで書く（例: `/guide/features`、ディレクトリは `/guide/`）
5. 画像は `site/_media/` に置き、Markdown ファイルからの相対パスで参照（例: `../_media/foo.png`）
6. 注意書きは `> [!TIP]` / `> [!NOTE]` / `> [!WARNING]` 形式で書く（`|label:見出し` で見出しを変更可能）
7. `pnpm lint` でリンク切れがないことを確認
