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
});
