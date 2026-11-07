import { describe, expect, it } from "vitest";
import { buildYouTubeUrl, extractVideoId, getPageType } from "@/utils/youtube";

const ID = "dQw4w9WgXcQ";

describe("extractVideoId", () => {
    it.each([
        [`https://www.youtube.com/watch?v=${ID}`],
        [`https://www.youtube.com/watch?list=PL123&v=${ID}&t=42s`],
        [`https://m.youtube.com/watch?v=${ID}`],
        [`https://youtube.com/watch?v=${ID}`],
        [`https://www.youtube.com/shorts/${ID}`],
        [`https://www.youtube.com/shorts/${ID}?feature=share`],
        [`https://youtu.be/${ID}`],
        [`https://youtu.be/${ID}?si=abc`],
    ])("%s から ID を取り出す", (url) => {
        expect(extractVideoId(url)).toBe(ID);
    });

    it.each([
        [""],
        ["not a url"],
        ["https://www.youtube.com/"],
        ["https://www.youtube.com/@channel"],
        ["https://www.youtube.com/watch"],
        ["https://www.youtube.com/watch?v=short"],
        [`https://example.com/watch?v=${ID}`],
        [`https://notyoutube.com/watch?v=${ID}`],
    ])("%s は null", (url) => {
        expect(extractVideoId(url)).toBeNull();
    });
});

describe("getPageType", () => {
    it.each([
        [`https://www.youtube.com/watch?v=${ID}`, "watch"],
        [`https://www.youtube.com/shorts/${ID}`, "shorts"],
        ["https://www.youtube.com/feed/subscriptions", "youtube"],
        ["https://www.youtube.com/", "youtube"],
        ["https://example.com/", "other"],
        ["chrome://extensions/", "other"],
        ["", "other"],
    ] as const)("%s → %s", (url, expected) => {
        expect(getPageType(url)).toBe(expected);
    });
});

describe("buildYouTubeUrl", () => {
    it("種類ごとに URL を作る", () => {
        expect(buildYouTubeUrl(ID)).toBe(`https://www.youtube.com/watch?v=${ID}`);
        expect(buildYouTubeUrl(ID, "shorts")).toBe(`https://www.youtube.com/shorts/${ID}`);
        expect(buildYouTubeUrl(ID, "compact")).toBe(`https://youtu.be/${ID}`);
    });
});
