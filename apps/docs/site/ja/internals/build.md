# ビルド

## 前提条件

- Node.js (最新の LTS 推奨)
- pnpm

## WXT フレームワーク

このプロジェクトは、拡張機能開発に [WXT](https://wxt.dev/) を使用しています。

## コマンド

### 開発 (Development)

```bash
pnpm dev
```
HMR (ホットモジュールリプレースメント) を有効にして開発サーバーを起動します。

### ビルド (Build)

```bash
pnpm build
```
Chrome 版と Firefox 版の拡張機能をビルドします。出力は `apps/extension/.output/` に作成されます。

### Zip 作成

```bash
pnpm zip
```
ストア提出用の zip ファイルを作成します。

### テスト (Test)

```bash
pnpm test
```
[Vitest](https://vitest.dev/) で単体テスト（`apps/extension/src/utils/__tests__/`）を実行します。

### Lint と型チェック

```bash
pnpm lint
pnpm --filter extension compile
```
`pnpm lint` は拡張機能の ESLint と、このドキュメントサイトのリンク検証を実行します。`compile` は `tsc --noEmit` を実行します。

## 拡張機能のスクリプト

`apps/extension/package.json` のスクリプト（`pnpm --filter extension <スクリプト名>` で実行）：

| スクリプト | 内容 |
| :--- | :--- |
| `dev` / `devc` / `devf` | 開発サーバー（既定のブラウザ / Chrome / Firefox） |
| `build` | Chrome 版と Firefox 版の本番ビルド |
| `buildc` / `buildf` | Chrome 版 / Firefox 版のみ本番ビルド |
| `zip` / `zipc` / `zipf` | ストア提出用 zip を作成（両方 / Chrome / Firefox） |
| `compile` | 型チェック（`tsc --noEmit`） |
| `lint` | ESLint |
| `test` | 単体テスト（Vitest） |
