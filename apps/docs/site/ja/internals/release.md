# リリース

手動テストが終わったら、**1 つのコマンド**でリリースできます。

```bash
pnpm release 4.1.0
```

## 流れ

```text
ローカル: pnpm release 4.1.0
  1. 確認   main ブランチ・未コミットの変更なし・origin/main と一致・タグが未使用
  2. テスト lint / 型チェック / ユニットテスト / E2E テスト
  3. 更新   apps/extension/package.json の version
            変更履歴（en / ja）の「Unreleased / 未リリース」→「v4.1.0 (日付)」
  4. 記録   コミット「release: v4.1.0」とタグ v4.1.0
  5. 確認   「push しますか？ [y/N]」→ y で main とタグを push
                │
                ▼
GitHub Actions（.github/workflows/release.yml）
  6. タグと version が一致するか確認
  7. テストをもう一度（lint / 型チェック / ユニットテスト / E2E）
  8. Chrome / Firefox / ソースの zip を作成
  9. GitHub Release を作成（変更履歴のその版の節をリリースノートにする）
 10. Chrome Web Store と Firefox Add-ons に提出（審査待ちになる）
```

ストアの審査が通ると、ユーザーに配信されます。審査の状況は各ストアの管理画面で確認してください。

## 使い方

```bash
# main を最新にしてから
git switch main
git pull

# 何が起きるかだけ確認する（ファイルは変更しない）
pnpm release 4.1.0 --dry-run

# 本番
pnpm release 4.1.0
```

- `--yes` を付けると、push 前の確認を省きます。
- push 前の確認で `n` を答えた場合は、表示されるコマンドでコミットとタグを取り消せます。
- バージョンは今より大きい `x.y.z` を指定します。権限や動作が大きく変わるときはメジャー、機能追加はマイナー、修正だけならパッチを上げます。

## 初回だけ必要な設定

ストアの認証情報を GitHub の **Settings → Secrets and variables → Actions** に登録します。
**登録していないストアへの提出は飛ばされます**（GitHub Release までは作られます）。その場合は Release の zip を各ストアの管理画面から手動でアップロードしてください。

### Chrome Web Store

Chrome Web Store API v2（サービスアカウント方式）を使います。v1（リフレッシュトークン方式）は 2026 年 10 月 15 日に使えなくなっています。

1. ローカルで次を実行し、案内に従って Chrome Web Store を選び、API のバージョンに **v2** を選ぶ

   ```bash
   pnpm --filter extension exec wxt submit init
   ```

   Google Cloud でのサービスアカウントの作成と、Chrome Web Store のデベロッパー ダッシュボードへの登録の手順が表示されます。
2. 終わると `apps/extension/.env.submit` に値が書かれる（このファイルは Git に入らない）
3. 次の 3 つを Secrets に登録する

   | Secret | 中身 |
   | :--- | :--- |
   | `CHROME_PUBLISHER_ID` | パブリッシャー ID |
   | `CHROME_SERVICE_ACCOUNT_CLIENT_EMAIL` | サービスアカウントのメールアドレス |
   | `CHROME_SERVICE_ACCOUNT_PRIVATE_KEY` | サービスアカウントの秘密鍵。JSON の `private_key` の値を、前後の `"` を除いてそのまま貼る（`\n` を含む 1 行のままでよい） |

拡張機能の ID（`aobeafpjgdgakpagffmlkfeognaiigci`）は公開情報なので、ワークフローに直接書いてあります。

### Firefox Add-ons

1. [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/) にログインし、**Tools → Manage API Keys** で API キーを発行する
2. 次の 2 つを Secrets に登録する

   | Secret | 中身 |
   | :--- | :--- |
   | `FIREFOX_JWT_ISSUER` | JWT issuer |
   | `FIREFOX_JWT_SECRET` | JWT secret |

ソースコードの zip（`*-sources.zip`）も一緒に提出されます。

### 認証情報を試す

`.env.submit` を作ったあとなら、実際には提出せずに認証だけ確かめられます（Git Bash などで実行）。

```bash
cd apps/extension
pnpm zip
pnpm exec wxt submit --dry-run \
  --chrome-zip .output/*-chrome.zip \
  --firefox-zip .output/*-firefox.zip \
  --firefox-sources-zip .output/*-sources.zip
```

### 提出前に承認を挟む（任意）

ワークフローは GitHub の Environment `release` を使います。**Settings → Environments → release → Required reviewers** に自分を追加すると、タグを push したあと、提出の前に GitHub 上で承認するまで止まります。

## うまくいかないとき

| 症状 | 対処 |
| :--- | :--- |
| `main ブランチで実行してください` | PR をマージしてから `git switch main && git pull` |
| `origin/main と一致していません` | `git pull`（または未 push のコミットを push） |
| ローカルのテストで失敗 | 失敗を直してから、もう一度実行（まだ何も変更されていない） |
| Actions の「タグと version が一致しない」 | タグを手で作った場合に起きる。`pnpm release` を使う |
| ストア提出だけ失敗 | GitHub Release はできている。Secrets を確認し、Release の zip を手動でアップロードするか、Actions で **Re-run failed jobs** |
