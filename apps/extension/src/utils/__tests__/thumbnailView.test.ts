import { describe, expect, it } from "vitest";
import { readVideoIdFromLocation, thumbnailViewPath } from "@/utils/thumbnailView";

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
