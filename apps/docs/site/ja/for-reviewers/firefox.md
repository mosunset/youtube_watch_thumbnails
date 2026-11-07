# Firefox レビュアー向け情報

## 権限 (Permissions)

- `tabs`: ポップアップで表示中のタブの URL を読み取り、YouTube の動画 ID を取り出すために使用します。要求する権限はこれだけです。

コンテンツスクリプトは `content_scripts` の matches で `*.youtube.com` のページにだけ読み込まれるため、`scripting` や `activeTab` 権限は不要です。

## データプライバシー

- この拡張機能は、ユーザーデータを外部サーバーに収集または送信**しません**。
- すべての処理はブラウザ内でローカルに行われます。
- **データは一切保存しません。** `storage`、Cookie、その他の保存手段は使用していません。動画 ID は Thumbnail View タブの URL クエリ（`ThumbnailView.html?v=動画ID`）で受け渡します。
- サムネイル画像は `i.ytimg.com` / `img.youtube.com` から直接読み込みます。

## セキュリティ

- コンテンツセキュリティポリシー (CSP) は厳格に適用されています。
- リモートコード実行はありません。
