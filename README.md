# ![YouTube Watch Thumbnails Icon](https://lh3.googleusercontent.com/RVxopoFuGYjYwxoriAgY_Q9bWL5nROrewN8SEX6k5atA1SycwTOQXkUL9wJQO2g-L75jq6RZcqgaomEEqJL_5lUvEg) YouTube Watch Thumbnails

YouTube 動画のサムネイル画像を簡単に表示・確認できるブラウザ拡張機能です。

## 📥 ダウンロード

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-YouTube%20Watch%20Thumbnails-4285F4?logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/youtube-watch-thumbnails/aobeafpjgdgakpagffmlkfeognaiigci)

[![Firefox Add-ons](https://img.shields.io/badge/Firefox%20Add--ons-YouTube%20Watch%20Thumbnails-FF7139?logo=firefoxbrowser&logoColor=white)](https://addons.mozilla.org/ja/firefox/addon/youtube-watch-thumbnails/)

## 📸 スクリーンショット

![display example](https://lh3.googleusercontent.com/qVY38J0B-Bw7y02pLA3AZGKVQtheRAedhIixXhsVDSft0AwpyZE-yljWcqseXROqGKaZhkUubzgfOBRJFDQYdvBu=s1280-w1280-h800)

## 🔗 リンク

- [Chrome Web Store](https://chromewebstore.google.com/detail/youtube-watch-thumbnails/aobeafpjgdgakpagffmlkfeognaiigci)
- [ブログ記事](https://mosunset.com/blog/youtube-watch-thumbnails/)

## 仕様

### 共通機能

- [x] 著作権情報等を表示するフッターを実装する
- [ ] i18n 対応

<details>
  <summary>対応言語</summary>

- [ ] ar アラビア語
  - RTL
  - 中 (23)
- [ ] bg ブルガリア語
  - 追加
  - 最小 (1)
- [ ] bn ベンガル語
  - 大
- [ ] cs チェコ語
  - 追加
  - 中 (11)
- [ ] da デンマーク語
  - 追加
  - 小 (4)
- [ ] de ドイツ語
  - 大 (57)
- [ ] el ギリシャ語
  - 中 (7)
- [ ] en 英語
  - 最大
- [ ] en_AU 英語（オーストラリア）
  - 最大
- [ ] en_GB 英語（英国）
  - 最大 (223)
- [ ] en_US 英語（アメリカ）
  - 最大 (1478)
- [ ] es スペイン語
  - 大 (138)
- [ ] es_419 スペイン語（ラテンアメリカ、カリブ海）
  - 大
- [ ] fa ペルシア語
  - 追加
  - RTL
  - 最小 (1)
- [ ] fil フィリピン語
  - 中
- [ ] fi フィンランド語
  - 追加
  - 最小 (1)
- [ ] fr フランス語
  - 大 (99)
- [ ] he ヘブライ語
  - 追加
  - RTL
  - 中 (15)
- [ ] hi ヒンディー語
  - 大
- [ ] hr クロアチア語
  - 追加
  - 最小 (1)
- [ ] hu ハンガリー語
  - 追加
  - 中 (18)
- [ ] id インドネシア語
  - 中 (8)
- [ ] it イタリア語
  - 中 (22)
- [ ] ja 日本語
  - 最大 (7862)
- [ ] ko 韓国語
  - 大 (78)
- [ ] ms マレー語
  - 中
- [ ] nl オランダ語
  - 中 (9)
- [ ] no ノルウェー語
  - 追加
  - 小 (2)
- [ ] pl ポーランド語
  - 大 (58)
- [ ] pt_BR ポルトガル語（ブラジル）
  - 大 (123)
- [ ] pt_PT ポルトガル語 (ポルトガル)
  - 中 (9)
- [ ] ru ロシア語
  - 大 (168)
- [ ] sk スロバキア語
  - 追加
  - 最小 (1)
- [ ] sv スウェーデン語
  - 追加
  - 小 (4)
- [ ] th タイ語
  - 中 (9)
- [ ] tr トルコ語
  - 中 (30)
- [ ] uk ウクライナ語
  - 追加
  - 中 (12)
- [ ] vi ベトナム語
  - 大 (61)
- [ ] zh_CN 中国語（中国）
  - 大 (40)
- [ ] zh_TW 中国語（台湾）
  - 大 (56)

</details>

### Popup

ブラウザのタブバーにある拡張機能アイコンをクリックすると表示されるポップアップ画面です。

- [x] 現在のタブで再生中の動画のサムネイル画像を表示する
  - 動画視聴ページ（`/watch`）: サムネイル画像を表示
  - Shorts ページ（`/shorts`）: Shorts用のサムネイルを表示
  - その他のYouTubeページ: 適切なメッセージを表示
  - YouTube以外のページ: 対象外ページの案内を表示
- [x] サムネイル画像をクリックすると、Thumbnail View ページが新しいタブで開く
- [ ] 設定へのリンクを表示する

### Content Script

YouTube の動画ページ上で実行されるメインスクリプトです。動画ページにサムネイル画像を動的に挿入します。

- [ ] 再生中の動画のサムネイル画像を投稿者アイコンの左側に表示する
  - 動画IDを自動検出して適切なサムネイル画像を取得
  - 画像サイズ: 高さ 64px（アスペクト比を維持）
  - DOM挿入位置: `div#owner.item.style-scope.ytd-watch-metadata` 内
  - 対象ページ: `www.youtube.com`, `m.youtube.com`, `youtube.com` およびそのサブドメイン
  - 動画IDの抽出: URLパターンから自動抽出（`/watch?v=`, `/shorts/` など）
  - [x] watch
  - [ ] shorts
- [ ] サムネイル画像にマウスホバーすると拡大表示する
  - アイコン横で元のサイズの200%に拡大表示する
  - 拡大された画像は元の位置基準で表示され、レイアウトを崩さない
  - スムーズなトランジション効果
  - [x] watch
  - [ ] shorts
- [ ] モーダルダイアログ等で高解像度の拡大画像を表示する
  - Hover Zoom+ インスパイア
  - [ ] watch
  - [ ] shorts
- [ ] サムネイル画像をクリックすると、Thumbnail View ページが開く
  - [x] watch
  - [ ] shorts

### Thumbnail View

拡張機能専用の独立したタブページです。閲覧した動画のすべてのサムネイル画像サイズを一覧表示します。

- [x] 閲覧した動画のサムネイル画像の一覧を表示する
  - 利用可能なすべてのサムネイル画像サイズを表示
  - WebP形式とJPG形式の両方をサポート
  - 画像サイズ（幅 × 高さ）を表示
  - グリッドレイアウトで画像を整理
  - モバイル表示にも対応
- [ ] 一覧から画像をクリックすると、詳細な画像情報を表示する
- [ ] 高解像度画像を新しいタブで確認可能

### Options

拡張機能の設定画面です。ユーザーの好みに合わせて動作をカスタマイズできます。

- [ ] Content Script でのホバー時の表示方法を選択できる
  - アイコン横で元のサイズの200%に拡大表示する
  - モーダルダイアログ等で高解像度の拡大画像を表示する
<!-- - [ ] サムネイル表示の有効/無効を設定できる -->
<!-- - [ ] サムネイル画像のサイズを設定できる -->
<!-- - [ ] 表示位置を調整できる -->

### 通知タブ

拡張機能のインストール・アップデート・削除時に表示される通知タブです。

- [x] 拡張機能のインストール時に通知を表示
  - 主な機能や使い方のガイドを案内
- [x] アップデート時に新機能や変更点を通知
  - 変更内容や改善点をわかりやすく説明
- [x] 拡張機能の削除時に通知を表示
  - ご利用ありがとうございました、などのメッセージを表示

## 📸 YouTube Thumbnail Image URL

YouTube のサムネイル画像は、以下のURLパターンで取得できます。

### 🌐 ドメイン

主要なドメインは `i.ytimg.com` です。

```text
https://i.ytimg.com/vi_webp/<video_id>/<image_file_name>.webp
https://i.ytimg.com/vi/<video_id>/<image_file_name>.jpg
https://img.youtube.com/vi_webp/<video_id>/<image_file_name>.webp
https://img.youtube.com/vi/<video_id>/<image_file_name>.jpg
```

### 📁 画像ファイル名

#### 通常のサムネイル

- `maxresdefault.webp` - 最大解像度（通常利用可能な最大サイズ）
- `hq720.webp` - 高品質 720p
- `sddefault.webp` - 標準解像度
- `hqdefault.webp` - 高品質デフォルト
- `mqdefault.webp` - 中品質デフォルト
- `default.webp` - デフォルトサイズ
- `0.webp` - 代替形式

#### 動画の複数フレーム（3分割）

- `sd1.webp`, `sd2.webp`, `sd3.webp` - 標準解像度（開始・中間・終了フレーム）
- `hq1.webp`, `hq2.webp`, `hq3.webp` - 高品質（開始・中間・終了フレーム）
- `mq1.webp`, `mq2.webp`, `mq3.webp` - 中品質（開始・中間・終了フレーム）
- `1.webp`, `2.webp`, `3.webp` - デフォルトサイズ（開始・中間・終了フレーム）

### 📏 画像サイズ

| ファイル名 | サイズ（幅 × 高さ） | 説明 |
|-----------|-------------------|------|
| `default` | 120 × 90 | 最小サイズ |
| `mqdefault` | 320 × 180 | 中品質 |
| `hqdefault` | 480 × 360 | 高品質 |
| `sddefault` | 640 × 480 | 標準解像度 |
| `maxresdefault` | 1280 × 720 | 最大解像度（HD） |
| `0` | 480 × 360 | 代替形式の高品質 |
| `1`, `2`, `3` | 120 × 90 | 開始・中間・終了フレーム |

> **注意**: 各サイズでサムネイルが存在しない場合、デフォルトサイズ（120 × 90）が返されます。
