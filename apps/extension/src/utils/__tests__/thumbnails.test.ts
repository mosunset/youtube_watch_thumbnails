import { describe, expect, it } from "vitest";
import {
    bestThumbnailCandidates,
    buildThumbnail,
    findBestThumbnail,
    isRealThumbnail,
    THUMBNAIL_SOURCES,
} from "@/utils/thumbnails";

const ID = "dQw4w9WgXcQ";

describe("buildThumbnail", () => {
    it("既定は i.ytimg.com の WebP", () => {
        expect(buildThumbnail(ID, "maxresdefault")).toEqual({
            src: `https://i.ytimg.com/vi_webp/${ID}/maxresdefault.webp`,
            fileName: "maxresdefault.webp",
            sourceLabel: "i.ytimg.com/vi_webp",
        });
    });

    it("配信元を指定できる", () => {
        expect(buildThumbnail(ID, "0", THUMBNAIL_SOURCES[3]).src).toBe(
            `https://img.youtube.com/vi/${ID}/0.jpg`,
        );
    });
});

describe("isRealThumbnail", () => {
    it("YouTube のプレースホルダー（120x90）以下は除外する", () => {
        expect(isRealThumbnail(120, 90)).toBe(false);
        expect(isRealThumbnail(0, 0)).toBe(false);
        expect(isRealThumbnail(320, 180)).toBe(true);
        expect(isRealThumbnail(1280, 720)).toBe(true);
    });
});

describe("findBestThumbnail", () => {
    it("読み込めた候補のうち優先度が一番高いものを返す", async () => {
        const ok = new Set([
            `https://i.ytimg.com/vi/${ID}/maxresdefault.jpg`,
            `https://i.ytimg.com/vi_webp/${ID}/hqdefault.webp`,
        ]);
        const best = await findBestThumbnail(ID, async (url) => ok.has(url));
        expect(best).toBe(`https://i.ytimg.com/vi/${ID}/maxresdefault.jpg`);
    });

    it("全部失敗したら null", async () => {
        expect(await findBestThumbnail(ID, async () => false)).toBeNull();
    });

    it("候補は WebP → JPG の順で、maxresdefault から始まる", () => {
        const candidates = bestThumbnailCandidates(ID);
        expect(candidates[0]).toBe(`https://i.ytimg.com/vi_webp/${ID}/maxresdefault.webp`);
        expect(candidates[1]).toBe(`https://i.ytimg.com/vi/${ID}/maxresdefault.jpg`);
        expect(candidates.at(-1)).toBe(`https://i.ytimg.com/vi/${ID}/default.jpg`);
    });
});
