/**
 * YouTube URLから動画IDを抽出するユーティリティ
 */

/**
 * YouTube URLから動画IDを抽出
 * @param url - YouTubeのURL
 * @returns 動画ID（見つからない場合はnull）
 */
export function extractVideoId(url: string): string | null {
    if (!url) return null;

    // YouTube Watch形式: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) {
        return watchMatch[1];
    }

    // YouTube Shorts形式: https://www.youtube.com/shorts/VIDEO_ID
    const shortsMatch = url.match(/\/shorts\/([^/?]+)/);
    if (shortsMatch) {
        return shortsMatch[1];
    }

    // YouTube短縮URL形式: https://youtu.be/VIDEO_ID
    const youtuBeMatch = url.match(/youtu\.be\/([^/?]+)/);
    if (youtuBeMatch) {
        return youtuBeMatch[1];
    }

    return null;
}

/**
 * 指定した動画IDからYouTube動画へのURLを生成します。
 *
 * @param {string} videoId - YouTubeの動画ID。
 * @param {"watch" | "default" | "shorts" | "compact"} [type] - 生成するURLのタイプを指定します。
 *   - "watch" または "default": 通常のYouTubeウォッチページのURL（https://www.youtube.com/watch?v=...）
 *   - "shorts": ShortsページのURL（https://www.youtube.com/shorts/...）
 *   - "compact": 短縮URL形式（https://youtu.be/...）
 *   - 指定がない場合、"watch"と同様のURLを返します。
 * @returns {string} 生成されたYouTube動画のURL。
 */
export function buildYouTubeUrl(
    videoId: string,
    type?: "watch" | "default" | "shorts" | "compact"
): string {
    if (type === "watch" || type === "default") {
        return `https://www.youtube.com/watch?v=${videoId}`;
    } else if (type === "shorts") {
        return `https://www.youtube.com/shorts/${videoId}`;
    } else if (type === "compact") {
        return `https://youtu.be/${videoId}`;
    }
    return `https://www.youtube.com/watch?v=${videoId}`;
}
