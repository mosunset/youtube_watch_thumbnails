---
title: アーキテクチャ
description: 拡張機能のアーキテクチャ概要。
---

## 設計思想

この拡張機能は、軽量で邪魔にならないように設計されています。YouTube ページに最小限のコードを注入して、サムネイルを取得・表示します。

## ディレクトリ構造

- `src/entrypoints/`: 拡張機能のエントリーポイント (background script, content scripts, popup)。
- `src/components/`: 再利用可能な React コンポーネント。
- `src/utils/`: ユーティリティ関数。
- `src/assets/`: アイコンなどの静的アセット。

## データフロー

1. **Content Script**: URL またはページコンテンツから動画 ID を検出します。
2. **Background Script**: メッセージやイベントをリッスンします（該当する場合）。
3. **Popup/Overlay**: 取得した ID を使用してサムネイルを表示します。
