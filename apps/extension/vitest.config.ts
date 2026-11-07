import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing/vitest-plugin";

export default defineConfig({
    // WXT の自動インポート・パスエイリアス（@/）・fake-browser をテストでも使えるようにする
    plugins: [WxtVitest()],
});
