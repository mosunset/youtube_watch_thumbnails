/**
 * ThumbnailView ページ（全サイズ一覧）を開く処理
 *
 * 動画 ID は ThumbnailView.html?v=VIDEO_ID のクエリで渡す。
 * タブごとに別の動画を表示でき、リロードしても内容が変わらない。
 */

import { sendMessage } from "@/utils/messaging";
import { extractVideoId } from "@/utils/youtube";

const VIDEO_ID_PARAM = "v";

/** ThumbnailView ページのパス（browser.runtime.getURL に渡す形） */
export function thumbnailViewPath(videoId: string): `/ThumbnailView.html?${string}` {
    return `/ThumbnailView.html?${VIDEO_ID_PARAM}=${encodeURIComponent(videoId)}`;
}

/** ThumbnailView ページの URL から動画 ID を読む */
export function readVideoIdFromLocation(search: string): string | null {
    return new URLSearchParams(search).get(VIDEO_ID_PARAM);
}

/**
 * YouTube の URL から動画 ID を取り出し、ThumbnailView を新しいタブで開く
 *
 * MV3 の content script からは tabs.create を呼べないため、background に依頼する。
 */
export async function openThumbnailView(youtubeUrl: string): Promise<void> {
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
        console.error("Failed to extract video ID from URL:", youtubeUrl);
        return;
    }
    try {
        await sendMessage("openThumbnailView", { videoId });
    } catch (error) {
        console.error("Failed to open ThumbnailView:", error);
    }
}
