import { defineConfig } from "@playwright/test";

/**
 * ビルド済みの拡張機能（.output/chrome-mv3）を Chromium に読み込んで動かす E2E テスト
 * 実行: pnpm test:e2e（ビルドしてから実行する）
 */
export default defineConfig({
    testDir: "./e2e",
    timeout: 30_000,
    expect: { timeout: 10_000 },
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
    use: {
        trace: "retain-on-failure",
    },
});
