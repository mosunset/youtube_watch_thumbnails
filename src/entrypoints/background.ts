declare const defineBackground: any;
export default defineBackground(() => {
    browser.runtime.onMessage.addListener(async (message: any) => {
        if (!message || typeof message !== "object") return;
        if (message.type === "OPEN_THUMBNAIL_VIEW") {
            const url = browser.runtime.getURL("ThumbnailView.html");
            try {
                await browser.tabs.create({ url });
            } catch (e) {
                console.error("Failed to open ThumbnailView tab:", e);
            }
        }
    });

    // // 拡張機能のインストール / アップデート時の通知タブ表示
    // browser.runtime.onInstalled.addListener(async (details) => {
    //     try {
    //         if (details.reason === "install") {
    //             const url = browser.runtime.getURL(
    //                 "notifications.html?event=install"
    //             );
    //             await browser.tabs.create({ url });
    //         } else if (details.reason === "update") {
    //             const prev = details.previousVersion ?? "";
    //             const url = browser.runtime.getURL(
    //                 `notifications.html?event=update&from=${encodeURIComponent(
    //                     prev
    //                 )}`
    //             );
    //             await browser.tabs.create({ url });
    //         }
    //     } catch (e) {
    //         console.error("Failed to open notifications tab:", e);
    //     }
    // });

    // // アンインストール時のサンクスページ（外部URLのみ可）
    // try {
    //     // プロジェクト紹介ページに遷移（READMEのリンクを利用）
    //     browser.runtime.setUninstallURL(
    //         "https://mosunset.com/blog/youtube-watch-thumbnails/?ref=ywt_uninstall"
    //     );
    // } catch (e) {
    //     console.warn("Failed to set uninstall URL:", e);
    // }
});
