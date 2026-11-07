# Edge / Opera への初回登録

Edge Add-ons と Opera add-ons は、**最初の 1 回だけ**各ストアの画面から手で登録します。
2 回目以降は `pnpm release` が自動で提出します（[リリース手順](../../docs/site/ja/internals/release.md)）。

入力する文章は [listing.md](listing.md)、画像は [assets/](assets/) と [../../../screenshots/](../../../screenshots/) にあります。
ストアの画面の項目名は変わることがあります。見つからない項目があれば、近い名前の欄に入れてください。

## 0. 準備: 提出する zip を作る

ストアに出す zip は、GitHub Release に置いたものと同じにします。

1. PR を main にマージする
2. `git switch main && git pull`
3. `pnpm release 4.1.0`（ストアの Secrets が無いので、GitHub Release の作成までで止まる）
4. GitHub の Releases から `extension-4.1.0-chrome.zip` をダウンロードする（Edge・Opera とも、この Chrome 用の zip を使う）

あわせて、Chrome Web Store と Firefox Add-ons も、同じ Release の zip（`-chrome.zip` / `-firefox.zip` と `-sources.zip`）を手でアップロードして更新しておくと、全ストアのバージョンが揃います。

---

## 1. Microsoft Edge Add-ons

### アカウント

1. [Partner Center](https://partner.microsoft.com/dashboard/microsoftedge/overview) を開き、Microsoft アカウントでサインインする
2. 初めてなら **Microsoft Edge プログラムに登録**する（無料。個人で登録できる）

### 登録

**Create new extension**（新しい拡張機能を作成）を押して、次の順に入力します。

#### Packages（パッケージ）
- `extension-4.1.0-chrome.zip` をアップロードする

#### Availability（公開範囲）
| 項目 | 入力 |
| :--- | :--- |
| Visibility | Public |
| Markets | すべての地域 |

#### Properties（プロパティ）
| 項目 | 入力 |
| :--- | :--- |
| Category | Photos（無ければ Productivity） |
| Privacy policy requirements（個人情報を扱うか） | **No**（収集・送信しない） |
| Privacy policy URL | `https://mosunset.github.io/youtube_watch_thumbnails/#/resources/privacy` |
| Website URL | `https://mosunset.github.io/youtube_watch_thumbnails/` |
| Support contact details | `https://github.com/mosunset/youtube_watch_thumbnails/issues` |
| Mature content | No |

#### Store listings（ストア掲載情報）
言語ごとに入力します。まず **English**、余裕があれば **日本語** を追加します。

| 項目 | English | 日本語 |
| :--- | :--- | :--- |
| Description | listing.md の「英語 → 説明」 | listing.md の「日本語 → 説明」 |
| Short description（あれば） | listing.md の「英語 → 短い説明」 | listing.md の「日本語 → 短い説明」 |
| Extension Store logo（300×300） | `assets/icon-300.png` | 同じ |
| Small promotional tile（440×280、任意） | `assets/promo-440x280.png` | 同じ |
| Screenshots（1280×800） | `screenshots/en-1-watch-page.png`, `en-2-popup.png`, `en-3-thumbnail-view.png` | `screenshots/ja-*.png` の 3 枚 |
| Search terms | listing.md の「英語 → 検索キーワード」 | listing.md の「日本語 → 検索キーワード」 |

スクリーンショットのサイズが合わないと言われたら、`assets/screenshot-640x400-*.png`（640×400）を使ってください。

#### Submit（提出）
- **Notes for certification** に、listing.md の「審査担当者へのメモ」を貼る
- **Publish** を押す。審査は通常数日かかる

### 登録後（自動提出の設定）

審査に通ったら、2 回目以降を自動にします。

1. 拡張機能のページで、名前の下の **Product ID** を控える
2. 左メニューの **Publish API** → **Create API credentials** で **Client ID** と **API key** を控える（API key はこの時しか表示されない）
3. GitHub の Secrets に `EDGE_PRODUCT_ID` / `EDGE_CLIENT_ID` / `EDGE_API_KEY` を登録する

---

## 2. Opera add-ons

### アカウント

1. [Opera のデベロッパーページ](https://addons.opera.com/developer/) を開き、Opera アカウントでサインインする（無ければ作る。無料）
2. 初めてなら、開発者情報（表示名など）を登録する

### 登録

**Upload new extension**（新しい拡張機能をアップロード）を押して、`extension-4.1.0-chrome.zip` をアップロードします。名前とバージョンは zip から読み込まれます。

#### 掲載情報
| 項目 | 入力 |
| :--- | :--- |
| Category | Photos（無ければ Productivity） |
| Summary | listing.md の「英語 → 短い説明」 |
| Description | listing.md の「英語 → 説明」 |
| Icon（64×64） | `assets/icon-64.png` |
| Screenshots | `screenshots/en-*.png` の 3 枚（サイズが合わなければ `assets/screenshot-640x400-en-*.png`） |
| Homepage | `https://mosunset.github.io/youtube_watch_thumbnails/` |
| Support page | `https://github.com/mosunset/youtube_watch_thumbnails/issues` |
| Privacy policy | `https://mosunset.github.io/youtube_watch_thumbnails/#/resources/privacy` |
| License | 選んだライセンス（下の注意を参照） |

日本語の掲載情報を追加できる場合は、listing.md の日本語の文章を使います。

> [!WARNING]
> **リポジトリにはまだライセンス（LICENSE ファイル）がありません。** ライセンスが無いと、ソースを公開していても他の人は使えない扱いになります。MIT など、どのライセンスにするかを決めて LICENSE ファイルを追加し、ここにも同じものを選んでください。

#### ソースコード
Opera は、ビルド済み（圧縮された）コードの拡張機能に**ソースコードの提出**を求めることがあります。聞かれたら、次を伝えてください。

```text
Source code: https://github.com/mosunset/youtube_watch_thumbnails (tag v4.1.0)
Build: Node.js 22 and pnpm 10
  pnpm install --frozen-lockfile
  pnpm --filter extension buildc
Output: apps/extension/.output/chrome-mv3
```

`extension-4.1.0-sources.zip` を添付できる欄があれば、それも添付します。

#### 提出
- 審査担当者へのメモ欄があれば、listing.md の「審査担当者へのメモ」を貼る
- **Submit for moderation**（審査に提出）を押す。審査は数日〜数週間かかることがある

### 登録後（自動提出の設定）

1. 拡張機能のページの URL `https://addons.opera.com/developer/package/<数字>` の数字（**Package ID**）を控える
2. 同じページで F12 → Application → Cookies → `https://addons.opera.com` → `sessionid` の値を控える
3. GitHub の Secrets に `OPERA_PACKAGE_ID` / `OPERA_SESSION_ID` を登録する

> `sessionid` はログインの有効期限が切れると使えなくなります。自動提出が失敗したら、取り直して Secret を更新してください。

---

## チェックリスト

- [ ] PR をマージし、`pnpm release 4.1.0` で GitHub Release を作った
- [ ] Chrome Web Store・Firefox Add-ons を 4.1.0 に更新した（手動）
- [ ] Edge: 開発者登録 → 登録 → 審査に提出
- [ ] Opera: 開発者登録 → 登録 → 審査に提出
- [ ] Edge 審査通過 → Secrets 3 つを登録
- [ ] Opera 審査通過 → Secrets 2 つを登録
- [ ] Chrome・Firefox の Secrets を登録（`wxt submit init`）
- [ ] README とドキュメントサイトに Edge / Opera のストアリンクを追加
