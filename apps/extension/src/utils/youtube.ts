/**
 * YouTube の URL を扱うユーティリティ
 */

export type PageType = "shorts" | "watch" | "youtube" | "other";

/** YouTube の動画 ID は 11 文字の [A-Za-z0-9_-] */
const VIDEO_ID_PATTERN = /^[\w-]{11}$/;

function parseUrl(url: string): URL | null {
    try {
        return new URL(url);
    } catch {
        return null;
    }
}

function isYouTubeHost(hostname: string): boolean {
    return hostname === "youtube.com" || hostname.endsWith(".youtube.com");
}

/**
 * URL からページの種類を判定する
 */
export function getPageType(url: string): PageType {
    const parsed = parseUrl(url);
    if (!parsed || !isYouTubeHost(parsed.hostname)) return "other";
    if (parsed.pathname.startsWith("/shorts/")) return "shorts";
    if (parsed.pathname === "/watch") return "watch";
    return "youtube";
}

/**
 * YouTube の URL から動画 ID を取り出す
 *
 * 対応形式:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 *
 * @returns 動画 ID。見つからない・形式が不正な場合は null
 */
export function extractVideoId(url: string): string | null {
    const parsed = parseUrl(url);
    if (!parsed) return null;

    let candidate: string | null = null;
    if (parsed.hostname === "youtu.be") {
        candidate = parsed.pathname.split("/")[1] ?? null;
    } else if (isYouTubeHost(parsed.hostname)) {
        if (parsed.pathname === "/watch") {
            candidate = parsed.searchParams.get("v");
        } else if (parsed.pathname.startsWith("/shorts/")) {
            candidate = parsed.pathname.split("/")[2] ?? null;
        }
    }

    return candidate && VIDEO_ID_PATTERN.test(candidate) ? candidate : null;
}

export type YouTubeUrlType = "watch" | "shorts" | "compact";

/**
 * 動画 ID から YouTube の URL を作る
 *
 * - `watch`（既定）: https://www.youtube.com/watch?v=...
 * - `shorts`: https://www.youtube.com/shorts/...
 * - `compact`: https://youtu.be/...
 */
export function buildYouTubeUrl(videoId: string, type: YouTubeUrlType = "watch"): string {
    switch (type) {
        case "shorts":
            return `https://www.youtube.com/shorts/${videoId}`;
        case "compact":
            return `https://youtu.be/${videoId}`;
        default:
            return `https://www.youtube.com/watch?v=${videoId}`;
    }
}
