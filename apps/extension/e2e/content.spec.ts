import { expect, OTHER_VIDEO_ID, test, VIDEO_ID } from "./fixtures";

test.describe("視聴ページへのサムネイル差し込み（content script）", () => {
    test("チャンネル名の左に一番大きいサムネイルを表示する", async ({ page }) => {
        await page.goto(`https://www.youtube.com/watch?v=${VIDEO_ID}`);

        const thumbnail = page.locator("#youtube_watch_thumbnail img");
        await expect(thumbnail).toHaveAttribute(
            "src",
            `https://i.ytimg.com/vi_webp/${VIDEO_ID}/maxresdefault.webp`,
        );
        // #owner の先頭に入る
        await expect(page.locator("#owner > :first-child")).toHaveId("youtube_watch_thumbnail");
        // ツールチップは翻訳された文言
        await expect(page.locator(".ywt-thumb__tooltip")).toHaveText("View all thumbnail sizes");
    });

    test("SPA で別の動画に移ったら画像を差し替える", async ({ page }) => {
        await page.goto(`https://www.youtube.com/watch?v=${VIDEO_ID}`);
        const thumbnail = page.locator("#youtube_watch_thumbnail img");
        await expect(thumbnail).toHaveAttribute("src", /maxresdefault\.webp$/);

        // YouTube と同じく、ページ遷移なしで URL と DOM だけが変わる
        await page.evaluate((id) => {
            history.pushState({}, "", `/watch?v=${id}`);
            document.body.append(document.createElement("div"));
        }, OTHER_VIDEO_ID);

        await expect(thumbnail).toHaveAttribute(
            "src",
            `https://i.ytimg.com/vi_webp/${OTHER_VIDEO_ID}/maxresdefault.webp`,
        );
        await expect(page.locator("#youtube_watch_thumbnail")).toHaveCount(1);
    });

    test("サムネイルをクリックすると ThumbnailView が新しいタブで開く", async ({ context, page, extensionId }) => {
        await page.goto(`https://www.youtube.com/watch?v=${VIDEO_ID}`);
        const thumbnail = page.locator("#youtube_watch_thumbnail img");
        await expect(thumbnail).toHaveAttribute("src", /maxresdefault\.webp$/);

        const [viewer] = await Promise.all([context.waitForEvent("page"), thumbnail.click()]);
        await viewer.waitForLoadState();

        expect(viewer.url()).toBe(`chrome-extension://${extensionId}/ThumbnailView.html?v=${VIDEO_ID}`);
        await expect(viewer.getByRole("link", { name: `https://youtu.be/${VIDEO_ID}` })).toBeVisible();
    });

    test("視聴ページ以外では何もしない", async ({ page }) => {
        await page.goto("https://www.youtube.com/feed/subscriptions");
        await expect(page.locator("#owner")).toBeVisible();
        await expect(page.locator("#youtube_watch_thumbnail")).toHaveCount(0);
    });
});
