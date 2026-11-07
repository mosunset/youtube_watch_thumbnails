# よくある質問（FAQ）

## 一般的な質問

### Q: この拡張機能は無料ですか？

はい、完全に無料です。オープンソースプロジェクトとして公開されています。

### Q: どのブラウザに対応していますか？

以下のブラウザに対応しています：
- Google Chrome
- Microsoft Edge
- Brave
- Firefox（予定）
- その他 Chromium ベースのブラウザ

### Q: データはどこに保存されますか？

どこにも保存されません。本拡張機能はデータを一切保存しません（`chrome.storage` も設定も履歴もありません）。動画 ID は Thumbnail View タブの URL（`ThumbnailView.html?v=動画ID`）で受け渡すだけです。外部サーバーにも一切送信されません。

### Q: オフラインでも使えますか？

いいえ、サムネイル画像は YouTube の画像サーバーからリアルタイムで読み込むため、インターネット接続が必要です。

## 機能について

### Q: どのサイズのサムネイルをダウンロードできますか？

以下の解像度のサムネイルが取得可能です（動画により異なります）：
- maxresdefault (1280x720 または 1920x1080)
- sddefault (640x480)
- hqdefault (480x360)
- mqdefault (320x180)
- default (120x90)

### Q: WebP 形式のサムネイルは取得できますか？

はい、YouTube が提供している場合は、JPG と WebP の両方の形式で取得可能です。

### Q: YouTube Shorts にも対応していますか？

はい、対応しています。通常の動画と同じ方法でサムネイルを取得できます。

### Q: プレイリストや検索結果ページでも使えますか？

いいえ、この拡張機能は個別の動画再生ページでのみ動作します。

## プライバシーとセキュリティ

### Q: YouTube のログイン情報は保存されますか？

いいえ、ログイン情報は一切保存しません。拡張機能は YouTube の公開 API を利用してサムネイル情報を取得します。

### Q: 第三者にデータは共有されますか？

いいえ、一切共有されません。サムネイルは YouTube から直接取得し、ユーザーのブラウザで表示されます。

### Q: 使用状況の統計は収集されますか？

いいえ、アナリティクスやトラッキングは一切実装していません。

## トラブルシューティング

### Q: 一部のサムネイルが表示されないのですが？

maxresdefault（最大画質）は、すべての動画で利用可能とは限りません。YouTube が高解像度のサムネイルを生成していない場合、低解像度のサムネイルのみが表示されます。

### Q: 拡張機能が動作しません

1. YouTube の動画再生ページにいるか確認してください
2. ブラウザを再起動してみてください
3. 拡張機能を無効化→有効化してみてください
4. それでも解決しない場合は、[GitHub Issues](https://github.com/mosunset/youtube_watch_thumbnails/issues) で報告してください

## 開発・貢献

### Q: オープンソースですか？

はい、MIT ライセンスで公開されています。[GitHub リポジトリ](https://github.com/mosunset/youtube_watch_thumbnails)をご覧ください。

### Q: 機能のリクエストやバグ報告はどこでできますか？

[GitHub Issues](https://github.com/mosunset/youtube_watch_thumbnails/issues) で受け付けています。

### Q: 開発に参加したいのですが？

大歓迎です！プルリクエストをお待ちしています。[GitHub リポジトリ](https://github.com/mosunset/youtube_watch_thumbnails)をご覧ください。

### Q: 使用している技術スタックは？

- WXT (Framework)
- React
- TypeScript
- Tailwind CSS

> [!TIP|label:さらに質問がありますか？]
> このページで解決しない場合は、[GitHub Discussions](https://github.com/mosunset/youtube_watch_thumbnails/discussions) でお気軽にお聞きください。
