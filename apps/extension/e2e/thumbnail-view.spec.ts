import { expect, test, VIDEO_ID } from "./fixtures";

test.describe("ThumbnailView（全サイズ一覧ページ）", () => {
    test("?v= の動画を表示し、最初は maxresdefault.webp を選択している", async ({ openExtensionPage }) => {
        const page = await openExtensionPage(`/ThumbnailView.html?v=${VIDEO_ID}`);

        await expect(page.getByRole("link", { name: `https://youtu.be/${VIDEO_ID}` })).toBeVisible();
        await expect(
            page.getByRole("link", { name: `https://i.ytimg.com/vi_webp/${VIDEO_ID}/maxresdefault.webp` }),
        ).toBeVisible();
        // 画像の読み込み後に実寸が出る
        await expect(page.getByText("1280 x 720 px")).toBeVisible();
        // 19 種類のファイル名 × 4 つの配信元
        await expect(page.locator("aside section")).toHaveCount(19);
        await expect(page.locator("aside section button")).toHaveCount(76);
    });

    test("一覧から選ぶとプレビューと情報が切り替わる", async ({ openExtensionPage }) => {
        const page = await openExtensionPage(`/ThumbnailView.html?v=${VIDEO_ID}`);
        await expect(page.getByText("1280 x 720 px")).toBeVisible();

        const hqJpg = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
        await page.locator(`aside button:has(img[src="${hqJpg}"])`).click();

        await expect(page.getByRole("link", { name: hqJpg })).toBeVisible();
        await expect(page.getByText("480 x 360 px")).toBeVisible();
        await expect(page.locator("main img")).toHaveAttribute("src", hqJpg);
    });

    test("タブごとに別の動画を表示できる", async ({ openExtensionPage }) => {
        const first = await openExtensionPage(`/ThumbnailView.html?v=${VIDEO_ID}`);
        const second = await openExtensionPage("/ThumbnailView.html?v=jNQXAC9IVRw");

        await expect(second.getByRole("link", { name: "https://youtu.be/jNQXAC9IVRw" })).toBeVisible();
        await first.reload();
        await expect(first.getByRole("link", { name: `https://youtu.be/${VIDEO_ID}` })).toBeVisible();
    });

    test("?v= が無ければ案内を出す", async ({ openExtensionPage }) => {
        const page = await openExtensionPage("/ThumbnailView.html");
        await expect(page.getByText("Video ID not found")).toBeVisible();
    });
});
