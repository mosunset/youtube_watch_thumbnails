# 更新履歴

このページでは、YouTube Watch Thumbnails の変更履歴を記載しています。

詳細な変更ログは、[GitHub の CHANGELOG.md](https://github.com/mosunset/youtube_watch_thumbnails/blob/main/CHANGELOG.md) をご覧ください。

## 未リリース (Unreleased)

### 🔒 プライバシー

- `storage` 権限を削除しました。要求する権限は `tabs` だけになり、データは一切保存しません（設定も動画 ID の履歴も保存しません）

### ✨ 改善

- Thumbnail View が URL で動画 ID を受け取るようになりました（`ThumbnailView.html?v=動画ID`）。複数の動画を別々のタブで開いたり、再読み込みしたりできます
- ポップアップと、ページ上のツールチップを多言語化しました（英語・日本語・韓国語）
- ポップアップがすべての候補を並列で確認するため、最適なサムネイルをより速く表示します

### 🛠️ 開発

- ドキュメントサイトを Astro Starlight から docsify に移行しました
- ESLint と Vitest による単体テストを追加しました
- ビルドした拡張機能を Chromium に読み込む Playwright の E2E テストを追加しました
- WXT を v0.21（Vite 8）、@webext-core/messaging を v4 に更新しました
- 使われていなかったオプションページと通知ページを削除しました

## v4.0.0 (2025-11-25)

### ✨ 新機能

- ツールバーアイコンからワンクリックでサムネイル表示
- YouTube 視聴ページへのサムネイル直接表示
- Thumbnail View で全解像度・全フォーマットを一覧表示
- 最大画質 (maxresdefault) から低画質まで対応
- JPG / WebP 両フォーマットに対応
- YouTube Shorts のサムネイル取得に対応

### 🎨 UI/UX

- シンプルで直感的なポップアップデザイン
- 高速なサムネイル表示
- ワンクリックでダウンロード可能

### 🔒 プライバシー

- データを一切保存しない設計
- リアルタイム処理のみ
- オープンソースでコードを公開

### 🌐 対応ブラウザ

- Google Chrome
- Microsoft Edge
- Brave
- その他 Chromium ベースのブラウザ
- Firefox（予定）

---

## ロードマップ

今後の予定機能：

- [ ] Firefox への正式対応
- [ ] サムネイルの一括ダウンロード機能
- [ ] カスタムサムネイルサイズの指定
- [ ] サムネイルのプレビュー機能強化

---

> [!TIP|label:フィードバック]
> 機能リクエストやバグ報告は、[GitHub Issues](https://github.com/mosunset/youtube_watch_thumbnails/issues) でお気軽にお寄せください。
