import { afterEach, describe, expect, it, vi } from "vitest";
import { sendMessage } from "@/utils/messaging";
import {
    openThumbnailView,
    readVideoIdFromLocation,
    thumbnailViewPath,
} from "@/utils/thumbnailView";

vi.mock("@/utils/messaging", () => ({ sendMessage: vi.fn() }));

describe("thumbnailViewPath / readVideoIdFromLocation", () => {
    it("書いた ID をそのまま読み戻せる", () => {
        const path = thumbnailViewPath("dQw4w9WgXcQ");
        expect(path).toBe("/ThumbnailView.html?v=dQw4w9WgXcQ");
        expect(readVideoIdFromLocation(path.slice(path.indexOf("?")))).toBe("dQw4w9WgXcQ");
    });

    it("v が無ければ null", () => {
        expect(readVideoIdFromLocation("")).toBeNull();
        expect(readVideoIdFromLocation("?x=1")).toBeNull();
    });
});

describe("openThumbnailView", () => {
    afterEach(() => {
        vi.mocked(sendMessage).mockReset();
        vi.restoreAllMocks();
    });

    it("動画の URL なら、その ID で background に開くよう頼む", async () => {
        await openThumbnailView("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        expect(sendMessage).toHaveBeenCalledWith("openThumbnailView", { videoId: "dQw4w9WgXcQ" });
    });

    it("動画の URL でなければ何も頼まない", async () => {
        const error = vi.spyOn(console, "error").mockImplementation(() => {});
        await openThumbnailView("https://www.youtube.com/");
        expect(sendMessage).not.toHaveBeenCalled();
        expect(error).toHaveBeenCalled();
    });

    it("background への依頼が失敗しても例外を投げない", async () => {
        const error = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.mocked(sendMessage).mockRejectedValue(new Error("no receiver"));
        await expect(
            openThumbnailView("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
        ).resolves.toBeUndefined();
        expect(error).toHaveBeenCalled();
    });
});
