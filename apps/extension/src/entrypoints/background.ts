import { browser, defineBackground } from "#imports";
import { onMessage } from "@/utils/messaging";
import { thumbnailViewPath } from "@/utils/thumbnailView";

export default defineBackground(() => {
    onMessage("openThumbnailView", async ({ data }) => {
        const url = browser.runtime.getURL(thumbnailViewPath(data.videoId));
        try {
            await browser.tabs.create({ url });
        } catch (error) {
            console.error("Failed to open ThumbnailView tab:", error);
        }
    });
});
