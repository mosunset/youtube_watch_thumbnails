import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
    modules: ["@wxt-dev/module-react"],
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
    },
});
