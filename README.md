# YouTube Watch Thumbnails

**YouTube Watch Thumbnails** は、YouTube の動画再生ページに動画のサムネイル画像を表示し、ユーザーが各種解像度のサムネイルを確認・選択できる Chrome 拡張機能です。
この拡張機能は、動画ページ（`youtube.com/watch`）において、チャンネルアイコン横などにサムネイルを表示し、詳細なサムネイル一覧を提供します。

[YouTube Watch Thumbnails | Chrome Web Store](https://chromewebstore.google.com/detail/youtube-watch-thumbnails/aobeafpjgdgakpagffmlkfeognaiigci)

## 特徴

-   **動画ページでのサムネイル表示**
    YouTube の動画再生ページに、動画のサムネイル画像を自動的に挿入します。

-   **複数解像度のサムネイル対応**
    標準の `default`、`mqdefault`、`hqdefault`、`sddefault`、`maxresdefault` に加え、その他のバリエーション（例：`3`, `2`, `1`, `mq3`, `hq3` など）を一覧表示します。

-   **直感的なサムネイルビュー**
    ポップアップや専用ビュー画面（ThumbnailView）により、各種サムネイル画像のプレビューやサイズ情報を確認できます。

-   **ドラッグスクロール機能**
    jQuery を用いたカスタムドラッグスクロール機能により、サムネイルリスト内を快適に移動できます。

-   **多言語対応 (i18n)**
    英語、日本語、スペイン語、フランス語、インドネシア語、韓国語、中国語（簡体字・繁体字）など、複数の言語に対応しています。

## デモ・スクリーンショット

### リリース版用サムネイル例

-   ![V2.1.11](https://raw.githubusercontent.com/mosunset/youtube_watch_thumbnails/6039d6cfa8d2238b9c5efac4138b100ac32d96ed/release/ThumbnailsPNG/V2.1.11.png)
-   ![v2.1.01](https://raw.githubusercontent.com/mosunset/youtube_watch_thumbnails/6039d6cfa8d2238b9c5efac4138b100ac32d96ed/release/ThumbnailsPNG/v2.1.01.png)
-   ![v2.1.21](https://raw.githubusercontent.com/mosunset/youtube_watch_thumbnails/6039d6cfa8d2238b9c5efac4138b100ac32d96ed/release/ThumbnailsPNG/v2.1.21.png)
-   ![v2.1.31](https://raw.githubusercontent.com/mosunset/youtube_watch_thumbnails/6039d6cfa8d2238b9c5efac4138b100ac32d96ed/release/ThumbnailsPNG/v2.1.31.png)

## インストール方法

### Chrome に拡張機能として読み込む

1. **リポジトリのクローンまたはダウンロード**
   `release/youtube_watch_thumbnails.zip` をダウンロードしてください。

2. **Chrome 拡張機能管理画面を開く**
   アドレスバーに `chrome://extensions/` と入力し、拡張機能管理ページを表示します。

3. **デベロッパーモードを有効化**
   右上の「デベロッパーモード」をオンにします。

4. **パッケージ化されていない拡張機能を読み込む**
   「パッケージ化されていない拡張機能を読み込む」ボタンをクリックし、`youtube_watch_thumbnails.zip` ファイルを選択してください。

5. **完了**
   拡張機能がインストールされ、Chrome のツールバーにアイコンが表示されます。

## 使い方

1. **YouTube 動画ページにアクセス**
   YouTube の `https://www.youtube.com/watch?...` ページにアクセスすると、コンテンツスクリプトが自動的に動作を開始します。

2. **サムネイルの自動表示**
   動画ページ上に、動画のサムネイル画像が表示されます。コンテンツスクリプト（`ycontent_script.js`）が動画 ID を抽出し、各種サムネイル（`default.jpg`、`mqdefault.jpg`、`hqdefault.jpg`、`sddefault.jpg`、`maxresdefault.jpg` など）を読み込み、最適な画像を選択します。

3. **詳細サムネイルビューの呼び出し**
   サムネイル画像やポップアップをクリックすると、`ThumbnailView.html` が新しいタブで開き、利用可能なすべてのサムネイル画像（jpg および webp 形式）の一覧が表示されます。

4. **サムネイルの選択と拡大表示**
   表示されたサムネイルリストから希望の画像をクリックすると、メイン画面にその画像が反映され、画像サイズ（幅 × 高さ）も表示されます。さらに、画像をクリックすることで、新しいタブで大きなサイズの画像を確認することができます。

## 内部動作の概要

-   **YouTube Watch ページでの動作**

    -   コンテンツスクリプト（`ycontent_script.js`）が、YouTube の URL から動画 ID を抽出し、各サムネイル画像（`default.jpg`、`mqdefault.jpg`、`hqdefault.jpg`、`sddefault.jpg`、`maxresdefault.jpg` など）を順次読み込みます。
    -   画像のサイズを検証して最適なものを自動選択し、ページ内に挿入します。
    -   画像クリック時には、現在の動画 ID および選択中の最大解像度画像の URL を Chrome ストレージに保存します。

-   **サムネイルビュー**

    -   `ThumbnailView.html` と `ThumbnailView.js` により、各種サムネイル画像（jpg と webp の両形式）を一覧表示します。
    -   ユーザーが画像をクリックすると、画像サイズ（幅・高さ）の取得と、メイン画像の更新が行われます。

-   **ポップアップ機能**
    -   拡張機能のアイコンをクリックすると表示される `popup.html` 内で、現在選択中のサムネイルが表示されます。
    -   画像クリックにより、バックグラウンドスクリプト（`background.js`）がメッセージを受信し、`ThumbnailView.html` が新しいタブで開かれます。

## 国際化 (i18n)

-   各言語の表示文言は、`_locales` フォルダ内の `messages.json` に定義されています。
-   拡張機能の名称、説明、エラーメッセージ、画像のタイトルなどは、ユーザーのブラウザの言語設定に合わせて自動的に切り替わります。
