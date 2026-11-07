import path from "node:path";
import { chromium, test as base, type BrowserContext, type Page } from "@playwright/test";

/** `pnpm build:e2e`（wxt build -b chrome）の出力先 */
const EXTENSION_PATH = path.resolve(import.meta.dirname, "../.output/chrome-mv3");

export const VIDEO_ID = "dQw4w9WgXcQ";
export const OTHER_VIDEO_ID = "jNQXAC9IVRw";

/**
 * 偽のサムネイル画像。ファイル名ごとの実寸を返す（ここに無いものは 404）
 * 120x90 の default は YouTube のプレースホルダーと同じ大きさ
 */
const IMAGE_SIZES: Record<string, [number, number]> = {
    maxresdefault: [1280, 720],
    hqdefault: [480, 360],
    mqdefault: [320, 180],
    default: [120, 90],
};

/** 視聴ページの代わりに返す HTML。content script が探す要素だけを持つ */
const WATCH_PAGE_HTML = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Fake YouTube</title></head>
<body>
  <div id="owner" class="item style-scope ytd-watch-metadata"><span>Channel name</span></div>
</body>
</html>`;

function svgImage(width: number, height: number): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#c00"/></svg>`;
}

/** YouTube へのリクエストをすべて偽物に差し替え、テストを外部ネットワークから切り離す */
async function mockYouTube(context: BrowserContext) {
    await context.route(/^https:\/\/(i\.ytimg\.com|img\.youtube\.com)\//, (route) => {
        // 例: https://i.ytimg.com/vi_webp/VIDEO_ID/maxresdefault.webp
        const name = new URL(route.request().url()).pathname.split("/").pop()?.split(".")[0] ?? "";
        const size = IMAGE_SIZES[name];
        if (!size) return route.fulfill({ status: 404, body: "" });
        return route.fulfill({ contentType: "image/svg+xml", body: svgImage(...size) });
    });
    await context.route(/^https:\/\/(www\.)?youtube\.com\//, (route) =>
        route.fulfill({ contentType: "text/html", body: WATCH_PAGE_HTML }),
    );
}

type Fixtures = {
    context: BrowserContext;
    extensionId: string;
    /** 拡張機能内のページを開く（例: "/ThumbnailView.html?v=..."） */
    openExtensionPage: (pathname: string, page?: Page) => Promise<Page>;
};

export const test = base.extend<Fixtures>({
    // eslint-disable-next-line no-empty-pattern
    context: async ({}, use) => {
        const context = await chromium.launchPersistentContext("", {
            // 拡張機能はヘッドレスでも "chromium" チャンネル（新ヘッドレス）なら読み込める
            channel: "chromium",
            locale: "en-US",
            args: [
                `--disable-extensions-except=${EXTENSION_PATH}`,
                `--load-extension=${EXTENSION_PATH}`,
                "--lang=en-US",
            ],
        });
        await mockYouTube(context);
        await use(context);
        await context.close();
    },
    extensionId: async ({ context }, use) => {
        const worker = context.serviceWorkers()[0] ?? (await context.waitForEvent("serviceworker"));
        await use(new URL(worker.url()).host);
    },
    openExtensionPage: async ({ context, extensionId }, use) => {
        await use(async (pathname, page) => {
            const target = page ?? (await context.newPage());
            await target.goto(`chrome-extension://${extensionId}${pathname}`);
            return target;
        });
    },
});

export { expect } from "@playwright/test";
