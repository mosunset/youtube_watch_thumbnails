import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
    modules: ["@wxt-dev/module-react", '@wxt-dev/auto-icons'],
    srcDir: "src",
    manifest: {
        permissions: ["tabs", "storage"],
        browser_specific_settings: {
            gecko: {
                id: "@youtube-watch-thumbnails",
                // strict_min_versionは、この拡張機能が対応するFirefoxの最小バージョンを指定する設定です。
                strict_min_version: "120.0",
                // data_collection_permissions: この拡張機能が収集または送信するユーザーデータの種類を指定します。
                // この拡張機能はユーザーデータを収集・送信しないため、空の配列を指定しています。
                data_collection_permissions: {
                    required: ["none"],
                    // required: [],
                    // optional: [],
                },
            } as any,
        },
        default_locale: "en",
        // locales: ["en", "ja", "ko"],
    },
    // アイコン自動生成設定
    // 1つの基本画像（icon.png）から複数サイズのアイコンを自動生成
    autoIcons: {
        // enabled: true,  // アイコン生成を有効化（デフォルト: true）

        // baseIconPath: 'assets/icon.png',  // 基本アイコンの場所（デフォルト: <srcDir>/assets/icon.png）

        developmentIndicator: 'overlay',  // 開発モード時の視覚的インジケータ
        //   - 'grayscale': アイコンをグレースケール化（デフォルト）
        //   - 'overlay': 下半分に黄色の「DEV」オーバーレイを表示
        //   - false: インジケータなし

        // sizes: [128, 48, 32, 16],  // 生成するアイコンのサイズ（デフォルト: [128, 48, 32, 16]）
        //   → icons/16.png, icons/32.png, icons/48.png, icons/128.png が自動生成される
    }
});
