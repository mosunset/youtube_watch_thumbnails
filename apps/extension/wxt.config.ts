import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
    modules: ["@wxt-dev/module-react", '@wxt-dev/auto-icons', '@wxt-dev/i18n/module'],
    srcDir: "src",
    manifest: ({ browser }) => ({
        name: "__MSG_extName__",
        description: "__MSG_extDescription__",
        // tabs: ポップアップでアクティブなタブの URL を読むため
        permissions: ["tabs"],
        default_locale: "en",
        // Firefox 専用の設定（Chrome には入れない）
        ...(browser === "firefox" && {
            browser_specific_settings: {
                gecko: {
                    id: "@youtube-watch-thumbnails",
                    // 対応する Firefox の最小バージョン。下の data_collection_permissions を読めるのは 140 から
                    strict_min_version: "140.0",
                    // 収集・送信するユーザーデータの申告。この拡張機能は何も収集しないので "none"
                    data_collection_permissions: {
                        required: ["none"],
                    },
                },
                // Firefox for Android は data_collection_permissions を 142 から読める
                gecko_android: {
                    strict_min_version: "142.0",
                },
            },
        }),
    }),
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
    },
    zip: {
        // Firefox 審査用のソース zip に、ストア掲載用の画像や E2E テストを入れない
        excludeSources: ["store/**", "e2e/**", "playwright.config.ts"],
    },
    i18n: {
        // localesDir: 'locales', // 翻訳ファイルを格納するディレクトリ（デフォルト: <srcDir>/locales）
    },
});
