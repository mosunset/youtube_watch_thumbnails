# アーキテクチャ

## 設計思想

この拡張機能は、軽量で邪魔にならないように設計されています。YouTube ページに最小限のコードを注入してサムネイルを取得・表示し、**データは一切保存しません**。要求する権限は `tabs` だけです。

## ディレクトリ構造

```text
apps/extension/src/
├── entrypoints/
│   ├── background.ts             # 依頼を受けて Thumbnail View タブを開く
│   ├── content/
│   │   ├── index.ts              # チャンネルアイコンの横にサムネイルを挿入
│   │   └── style.css             # 挿入するサムネイルとツールチップのスタイル
│   ├── popup/
│   │   ├── App.tsx               # 表示中のタブに応じて内容を切り替え
│   │   └── components/
│   │       ├── ThumbnailPreview.tsx   # /watch・/shorts ページでのサムネイル表示
│   │       └── UnsupportedPage.tsx    # それ以外のページでの案内
│   └── ThumbnailView/
│       ├── App.tsx               # ?v= を読み取り、全サムネイルを表示
│       └── components/           # Sidebar, PreviewHeader, PreviewImage, NoVideoScreen
├── utils/
│   ├── youtube.ts                # extractVideoId, getPageType, buildYouTubeUrl
│   ├── thumbnails.ts             # THUMBNAIL_SOURCES, THUMBNAIL_NAMES, buildThumbnail, findBestThumbnail
│   ├── thumbnailView.ts          # background に Thumbnail View を開くよう依頼
│   ├── messaging.ts              # 型付きメッセージング（@webext-core/messaging）
│   └── __tests__/                # Vitest の単体テスト
├── components/                   # Footer.tsx, OpenInNewIcon.tsx
└── locales/                      # en.yml, ja.yml, ko.yml
```

## データフロー

1. **Popup / Content Script**: タブの URL から動画 ID を取り出します（`extractVideoId`）。ポップアップには `findBestThumbnail` で見つけた最適なサムネイルを表示します。すべての候補を並列で確認し、実在する画像のうち優先度が最も高いものを選び、120 × 90 のプレースホルダーは除外します。
2. サムネイルがクリックされると、**Background Script** にメッセージ `openThumbnailView({ videoId })` を送ります。
3. Background Script が新しいタブで `ThumbnailView.html?v=動画ID` を開きます。
4. **Thumbnail View** は URL クエリから動画 ID を読み取ります。保存もポーリングもしないため、タブごとに別の動画を表示でき、再読み込みしても表示が保たれます。
