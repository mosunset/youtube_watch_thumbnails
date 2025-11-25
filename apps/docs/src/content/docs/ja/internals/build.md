---
title: ビルド
description: 拡張機能のビルドと開発方法。
---

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
本番用に拡張機能をビルドします。出力は `.output/` に作成されます。

### Zip 作成

```bash
pnpm zip
```
ストア提出用の zip ファイルを作成します。
