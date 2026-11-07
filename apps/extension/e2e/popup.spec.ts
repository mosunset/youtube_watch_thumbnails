import type { BrowserContext, Page } from "@playwright/test";
import { expect, test, VIDEO_ID } from "./fixtures";

/**
 * ポップアップは「アクティブなタブ」の URL を見る。
 * 対象のページを前面に出したまま、裏のタブで popup.html を開いて再現する。
 */
async function openPopupFor(
    context: BrowserContext,
    openExtensionPage: (pathname: string, page?: Page) => Promise<Page>,
    url: string,
): Promise<Page> {
    const target = await context.newPage();
    await target.goto(url);
    const popup = await context.newPage();
    await target.bringToFront();
    return openExtensionPage("/popup.html", popup);
}

test.describe("ポップアップ", () => {
    test("視聴ページでは一番大きいサムネイルを表示する", async ({ context, openExtensionPage }) => {
        const popup = await openPopupFor(
            context,
            openExtensionPage,
            `https://www.youtube.com/watch?v=${VIDEO_ID}`,
        );

        await expect(popup.getByRole("img", { name: "Thumbnail", exact: true })).toHaveAttribute(
            "src",
            `https://i.ytimg.com/vi_webp/${VIDEO_ID}/maxresdefault.webp`,
        );
        await expect(popup.getByText("Click the image to view every size of this thumbnail")).toBeVisible();
    });

    test("Shorts でも表示し、クリックで ThumbnailView を開く", async ({ context, openExtensionPage, extensionId }) => {
        const popup = await openPopupFor(context, openExtensionPage, `https://www.youtube.com/shorts/${VIDEO_ID}`);
        const image = popup.getByRole("img", { name: "Thumbnail", exact: true });
        await expect(image).toBeVisible();

        const [viewer] = await Promise.all([context.waitForEvent("page"), image.click()]);
        await viewer.waitForLoadState();
        expect(viewer.url()).toBe(`chrome-extension://${extensionId}/ThumbnailView.html?v=${VIDEO_ID}`);
    });

    test("YouTube の動画以外のページでは案内を出す", async ({ context, openExtensionPage }) => {
        const popup = await openPopupFor(context, openExtensionPage, "https://www.youtube.com/feed/subscriptions");
        await expect(popup.getByRole("heading", { name: "This page is not supported" })).toBeVisible();
    });

    test("YouTube 以外のサイトでは案内を出す", async ({ context, openExtensionPage }) => {
        const popup = await openPopupFor(context, openExtensionPage, "about:blank");
        await expect(popup.getByRole("heading", { name: "This is not a YouTube page" })).toBeVisible();
    });
});
