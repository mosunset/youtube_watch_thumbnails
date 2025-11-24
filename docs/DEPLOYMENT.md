# VitePress Documentation Deployment Guide

このガイドでは、VitePress ドキュメントを GitHub Pages にデプロイする方法を説明します。

## 📋 前提条件

- Git と GitHub アカウント
- Node.js と pnpm がインストール済み
- リポジトリが GitHub にプッシュ済み

## 🚀 デプロイ手順

### 1. GitHub Pages の設定

1. GitHub リポジトリページにアクセス
2. **Settings** → **Pages** に移動
3. **Source** で **GitHub Actions** を選択

### 2. 自動デプロイの確認

GitHub Actions ワークフローが既に設定されているため、`main` ブランチにプッシュすると自動的にデプロイされます。

```bash
git add .
git commit -m "docs: add VitePress documentation"
git push origin main
```

### 3. デプロイの確認

1. GitHub リポジトリの **Actions** タブを開く
2. ワークフローの実行状況を確認
3. 成功したら、以下の URL でアクセス可能：
   - `https://mosunset.github.io/youtube_watch_thumbnails/`

## 🔧 ローカルでの確認

### 開発サーバーの起動

```bash
cd docs
pnpm install
pnpm run docs:dev
```

ブラウザで `http://localhost:5173/youtube_watch_thumbnails/` を開く

### ビルドのテスト

```bash
pnpm run docs:build
pnpm run docs:preview
```

## 📁 ディレクトリ構成

```
docs/
├── .vitepress/
│   └── config.mts          # VitePress 設定（i18n含む）
├── en/                     # 英語コンテンツ
│   ├── index.md           # 英語トップページ
│   ├── guide/
│   │   ├── index.md       # 使い方
│   │   ├── install.md     # インストール
│   │   └── troubleshooting.md
│   ├── faq.md
│   ├── privacy.md
│   └── changelog.md
├── ja/                     # 日本語コンテンツ
│   ├── index.md           # 日本語トップページ
│   ├── guide/
│   │   ├── index.md       # 使い方
│   │   ├── install.md     # インストール
│   │   └── troubleshooting.md
│   ├── faq.md
│   ├── privacy.md
│   └── changelog.md
└── package.json
```

## 🌐 URL 構造

- 日本語 (root): `https://mosunset.github.io/youtube_watch_thumbnails/ja/`
- 英語: `https://mosunset.github.io/youtube_watch_thumbnails/en/`

## ✏️ コンテンツの編集

### 新しいページを追加

1. 適切なディレクトリ（`ja/` または `en/`）に `.md` ファイルを作成
2. `.vitepress/config.mts` のナビゲーションやサイドバーに追加
3. コミット＆プッシュで自動デプロイ

### 既存ページの更新

1. 対応する `.md` ファイルを編集
2. `pnpm run docs:dev` でローカル確認
3. コミット＆プッシュで自動デプロイ

## 🔍 トラブルシューティング

### デプロイが失敗する

- GitHub Actions のログを確認
- ビルドエラーがないか確認（`pnpm run docs:build` でローカルテスト）

### ページが表示されない

- GitHub Pages の設定を確認（Source が GitHub Actions になっているか）
- base URL が正しいか確認（`config.mts` の `base` 設定）

### i18n が動作しない

- `config.mts` の `locales` 設定を確認
- ファイルパスが正しいか確認（`/ja/` と `/en/`）

## 📚 参考リンク

- [VitePress 公式ドキュメント](https://vitepress.dev/)
- [VitePress i18n ガイド](https://vitepress.dev/guide/i18n)
- [GitHub Pages ドキュメント](https://docs.github.com/ja/pages)
