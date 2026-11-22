import { afterEach, describe, expect, it, vi } from "vitest";
import {
    bestThumbnailCandidates,
    buildThumbnail,
    findBestThumbnail,
    isRealThumbnail,
    probeImage,
    THUMBNAIL_NAMES,
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

    it("幅か高さのどちらかが 0 なら除外する", () => {
        expect(isRealThumbnail(0, 720)).toBe(false);
        expect(isRealThumbnail(1280, 0)).toBe(false);
    });

    it("幅か高さのどちらかがプレースホルダーより大きければ本物", () => {
        expect(isRealThumbnail(121, 90)).toBe(true);
        expect(isRealThumbnail(120, 91)).toBe(true);
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

describe("THUMBNAIL_SOURCES / THUMBNAIL_NAMES", () => {
    it("2 つのホストそれぞれの WebP と JPG から取る", () => {
        expect(THUMBNAIL_SOURCES.map((s) => buildThumbnail(ID, "0", s).src)).toEqual([
            `https://i.ytimg.com/vi_webp/${ID}/0.webp`,
            `https://i.ytimg.com/vi/${ID}/0.jpg`,
            `https://img.youtube.com/vi_webp/${ID}/0.webp`,
            `https://img.youtube.com/vi/${ID}/0.jpg`,
        ]);
    });

    it("ThumbnailView には高解像度から動画内フレームまで 19 枚を並べる", () => {
        expect(THUMBNAIL_NAMES).toEqual([
            "maxresdefault",
            "hq720",
            "sddefault",
            "hqdefault",
            "0",
            "mqdefault",
            "default",
            "sd1",
            "sd2",
            "sd3",
            "hq1",
            "hq2",
            "hq3",
            "mq1",
            "mq2",
            "mq3",
            "1",
            "2",
            "3",
        ]);
    });
});

describe("probeImage", () => {
    /** 読み込みの結果をテストから決められる Image の代わり */
    class FakeImage {
        static last: FakeImage | null = null;
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        naturalWidth = 0;
        naturalHeight = 0;
        src = "";
        constructor() {
            FakeImage.last = this;
        }
        load(width: number, height: number) {
            this.naturalWidth = width;
            this.naturalHeight = height;
            this.onload?.();
        }
    }

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
        FakeImage.last = null;
    });

    function startProbe(timeoutMs?: number) {
        vi.useFakeTimers();
        vi.stubGlobal("Image", FakeImage);
        const result = probeImage("https://example.com/a.jpg", timeoutMs);
        const img = FakeImage.last;
        if (!img) throw new Error("Image was not created");
        return { result, img };
    }

    it("本物のサムネイルが読み込めたら true", async () => {
        const { result, img } = startProbe();
        expect(img.src).toBe("https://example.com/a.jpg");
        img.load(1280, 720);
        await expect(result).resolves.toBe(true);
    });

    it("プレースホルダーが返ってきたら false", async () => {
        const { result, img } = startProbe();
        img.load(120, 90);
        await expect(result).resolves.toBe(false);
    });

    it("読み込みに失敗したら false", async () => {
        const { result, img } = startProbe();
        img.onerror?.();
        await expect(result).resolves.toBe(false);
    });

    it("時間内に読み込めなければ false", async () => {
        const { result } = startProbe(1000);
        await vi.advanceTimersByTimeAsync(1000);
        await expect(result).resolves.toBe(false);
    });

    it("読み込めたあとにタイマーを残さない", async () => {
        const { result, img } = startProbe();
        img.load(1280, 720);
        await result;
        expect(vi.getTimerCount()).toBe(0);
    });
});
