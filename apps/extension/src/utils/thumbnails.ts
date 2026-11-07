/**
 * YouTube サムネイル画像の URL 定義と取得ロジック
 */

/** 画像の配信元（ホスト × フォルダ × 拡張子） */
export const THUMBNAIL_SOURCES = [
    { host: "i.ytimg.com", folder: "vi_webp", ext: "webp" },
    { host: "i.ytimg.com", folder: "vi", ext: "jpg" },
    { host: "img.youtube.com", folder: "vi_webp", ext: "webp" },
    { host: "img.youtube.com", folder: "vi", ext: "jpg" },
] as const;

export type ThumbnailSource = (typeof THUMBNAIL_SOURCES)[number];

/** ThumbnailView に並べるファイル名（解像度の高い順 → 動画内フレーム） */
export const THUMBNAIL_NAMES = [
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
] as const;

export type ThumbnailName = (typeof THUMBNAIL_NAMES)[number];

/** 「一番きれいな 1 枚」を探すときの候補（解像度の高い順） */
const BEST_CANDIDATE_NAMES = [
    "maxresdefault",
    "hq720",
    "sddefault",
    "hqdefault",
    "mqdefault",
    "default",
] as const satisfies readonly ThumbnailName[];

/** 動画にサムネイルが無いとき YouTube が返す灰色の画像は 120x90 */
const PLACEHOLDER_MAX = { width: 120, height: 90 };

export type Thumbnail = {
    src: string;
    /** 例: maxresdefault.webp */
    fileName: string;
    /** 例: i.ytimg.com/vi_webp */
    sourceLabel: string;
};

export function sourceLabel(source: ThumbnailSource): string {
    return `${source.host}/${source.folder}`;
}

export function buildThumbnail(
    videoId: string,
    name: string,
    source: ThumbnailSource = THUMBNAIL_SOURCES[0],
): Thumbnail {
    return {
        src: `https://${source.host}/${source.folder}/${videoId}/${name}.${source.ext}`,
        fileName: `${name}.${source.ext}`,
        sourceLabel: sourceLabel(source),
    };
}

/** 最良の 1 枚を探すときに試す URL（優先度の高い順。WebP → JPG） */
export function bestThumbnailCandidates(videoId: string): string[] {
    const sources = THUMBNAIL_SOURCES.filter((s) => s.host === "i.ytimg.com");
    return BEST_CANDIDATE_NAMES.flatMap((name) =>
        sources.map((source) => buildThumbnail(videoId, name, source).src),
    );
}

/** 読み込めた画像が「本物のサムネイル」か（プレースホルダーでないか） */
export function isRealThumbnail(width: number, height: number): boolean {
    if (width <= 0 || height <= 0) return false;
    return !(width <= PLACEHOLDER_MAX.width && height <= PLACEHOLDER_MAX.height);
}

/** 画像を読み込んでみて、本物のサムネイルなら true */
export function probeImage(url: string, timeoutMs = 5000): Promise<boolean> {
    return new Promise((resolve) => {
        const img = new Image();
        const finish = (ok: boolean) => {
            clearTimeout(timer);
            img.onload = null;
            img.onerror = null;
            resolve(ok);
        };
        const timer = setTimeout(() => finish(false), timeoutMs);
        img.onload = () => finish(isRealThumbnail(img.naturalWidth, img.naturalHeight));
        img.onerror = () => finish(false);
        img.src = url;
    });
}

/**
 * 候補を並列に読み込み、優先度が一番高い有効な URL を返す
 */
export async function findBestThumbnail(
    videoId: string,
    probe: (url: string) => Promise<boolean> = probeImage,
): Promise<string | null> {
    const candidates = bestThumbnailCandidates(videoId);
    const results = await Promise.all(candidates.map((url) => probe(url)));
    const index = results.indexOf(true);
    return index === -1 ? null : candidates[index];
}
