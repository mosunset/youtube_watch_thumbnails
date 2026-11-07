# ストア掲載情報（Edge Add-ons / Opera add-ons 用）

各ストアの入力欄にそのまま貼れる文章です。Chrome Web Store・Firefox Add-ons の更新時にも使えます。
機能を変えたら、ここも合わせて直してください。

- 拡張機能の名前: **YouTube Watch Thumbnails**
- 提出する zip: GitHub Release の `extension-<version>-chrome.zip`（Edge・Opera とも Chrome 用をそのまま使う）

---

## 共通の項目

| 項目 | 内容 |
| :--- | :--- |
| カテゴリ | Photos（無ければ Productivity） |
| 料金 | 無料 |
| 公式サイト | https://mosunset.github.io/youtube_watch_thumbnails/ |
| サポート（問い合わせ先） | https://github.com/mosunset/youtube_watch_thumbnails/issues |
| ソースコード | https://github.com/mosunset/youtube_watch_thumbnails |
| プライバシーポリシー（英語） | https://mosunset.github.io/youtube_watch_thumbnails/#/resources/privacy |
| プライバシーポリシー（日本語） | https://mosunset.github.io/youtube_watch_thumbnails/#/ja/resources/privacy |
| 個人データの収集 | なし（収集・保存・送信しない） |

---

## 英語（English）

### 短い説明（Summary / Short description）

```text
View every size of the thumbnail of the YouTube video you're watching, right on the page. Works with Shorts. No data collected.
```

### 説明（Description）

```text
YouTube Watch Thumbnails shows the thumbnail of the video you are watching, and lets you view and save it in every available size.

FEATURES

• Thumbnail on the watch page
  The video's thumbnail appears next to the channel name. Hover over it to enlarge it, and click it to open the full viewer.

• One click from the toolbar
  Click the toolbar icon on a watch page or a Short to see the highest-quality thumbnail available for that video.

• Every size and format in one place
  The viewer lists every thumbnail YouTube provides, from maxresdefault (1280×720) down to the smallest preview frames, in both WebP and JPG, from both i.ytimg.com and img.youtube.com. Pick one to preview it at full size, check its real dimensions, and open or save the image.

• Always the best available image
  The extension checks which sizes actually exist and skips YouTube's grey "no thumbnail" placeholder, so you get the best real image even for older videos.

• Works with YouTube Shorts

• English, Japanese and Korean

PRIVACY

• No data is collected, stored or sent anywhere. There are no accounts, no tracking and no analytics.
• The only permission is "tabs", used to read the address of the current tab so the popup can find the video ID.
• Thumbnail images are loaded directly from YouTube's public image servers.

HOW TO USE

1. Open a YouTube video or Short.
2. Click the thumbnail next to the channel name, or the extension icon in the toolbar.
3. In the viewer, pick a size, then right-click the preview and choose "Save image as".

Free and open source: https://github.com/mosunset/youtube_watch_thumbnails
```

### 検索キーワード（Search terms）

Edge は最大 7 個まで。

```text
YouTube thumbnail
thumbnail downloader
video thumbnail
YouTube Shorts
maxresdefault
thumbnail viewer
save thumbnail
```

---

## 日本語（Japanese）

### 短い説明

```text
視聴中の YouTube 動画のサムネイルを、全サイズその場で表示・保存。Shorts にも対応。データは一切収集しません。
```

### 説明

```text
YouTube Watch Thumbnails は、視聴中の動画のサムネイルを表示し、すべてのサイズで確認・保存できる拡張機能です。

主な機能

• 視聴ページにサムネイルを表示
  チャンネル名の横に、その動画のサムネイルが表示されます。マウスを乗せると拡大し、クリックすると全サイズのビューワーが開きます。

• ツールバーからワンクリック
  視聴ページや Shorts で拡張機能のアイコンをクリックすると、その動画で一番画質の高いサムネイルを表示します。

• 全サイズ・全形式を一覧
  YouTube が用意しているサムネイルを、maxresdefault（1280×720）から小さなプレビュー画像まで、WebP と JPG の両方、i.ytimg.com と img.youtube.com の両方から一覧表示します。選んだ画像を原寸でプレビューし、実際のサイズを確認して、開いたり保存したりできます。

• いつも一番きれいな画像
  実際に存在するサイズを確かめ、YouTube の灰色の「サムネイルなし」画像は除外します。古い動画でも、その動画の一番きれいな画像が表示されます。

• YouTube Shorts に対応

• 英語・日本語・韓国語に対応

プライバシー

• データは一切収集・保存・送信しません。アカウント登録、追跡、アクセス解析もありません。
• 要求する権限は「タブ」だけです。ポップアップで、表示中のタブのアドレスから動画 ID を読み取るために使います。
• サムネイル画像は、YouTube の公開画像サーバーから直接読み込みます。

使い方

1. YouTube の動画または Shorts を開きます。
2. チャンネル名の横のサムネイル、またはツールバーの拡張機能アイコンをクリックします。
3. ビューワーでサイズを選び、プレビューを右クリックして「名前を付けて画像を保存」を選びます。

無料・オープンソース: https://github.com/mosunset/youtube_watch_thumbnails
```

### 検索キーワード

```text
YouTube サムネイル
サムネイル 保存
サムネイル ダウンロード
YouTube Shorts
動画 サムネイル
maxresdefault
サムネイル 表示
```

---

## 審査担当者へのメモ（Edge の「Notes for certification」など）

```text
No account or login is needed.

How to test:
1. Open any YouTube video, e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ
2. A thumbnail appears to the left of the channel name. Hover to enlarge, click to open the viewer tab.
3. Click the extension icon in the toolbar on the same page: the popup shows the thumbnail. Click it to open the viewer.
4. On a non-YouTube page, the popup shows a short message instead.

Permissions: "tabs" only, to read the active tab's URL in the popup. The content script runs only on youtube.com.
No data is collected, stored or transmitted. Images are loaded from i.ytimg.com / img.youtube.com.
Source code: https://github.com/mosunset/youtube_watch_thumbnails
```

---

## 画像

| 種類 | 用意するもの |
| :--- | :--- |
| アイコン | `store/assets/icon-300.png`（Edge のロゴ）、`icon-128.png`、`icon-64.png`（Opera） |
| プロモーション タイル | `store/assets/promo-440x280.png`（Edge・任意） |
| スクリーンショット（1280×800） | 英語: `screenshots/en-1-watch-page.png`, `en-2-popup.png`, `en-3-thumbnail-view.png` / 日本語: `screenshots/ja-*.png`。視聴ページのサムネイル・ポップアップ・Thumbnail View の 3 枚 |

サイズの指定はストアごとに違うので、入力画面の案内に合わせてください。640×400 の縮小版は `store/assets/screenshot-640x400-*.png` にあります。

初回登録の手順は [first-submission.md](first-submission.md) を参照してください。
