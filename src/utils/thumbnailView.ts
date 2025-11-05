/**
 * ThumbnailView関連のユーティリティ
 * DRY原則に基づき、ThumbnailViewを開くロジックを共通化
 */

import { extractVideoId } from "./youtubeUrl";
import { STORAGE_KEY } from "@/constants";

/**
 * URLから動画IDを抽出してstorageに保存し、ThumbnailViewページを開く
 * @param url - YouTubeのURL
 */
export async function openThumbnailView(url: string): Promise<void> {
    if (!url) return;

    // URLから動画IDを抽出
    const videoId = extractVideoId(url);

    if (!videoId) {
        console.error("Failed to extract video ID from URL:", url);
        return;
    }

    try {
        // storageに動画IDを保存（contentからでも利用可能）
        await browser.storage.local.set({ [STORAGE_KEY]: videoId });

        // MV3ではcontent scriptからtabs.createが制限される環境があるため、
        // 背景へメッセージを送ってタブ生成を依頼する
        await browser.runtime.sendMessage({ type: "OPEN_THUMBNAIL_VIEW" });
    } catch (error) {
        console.error("Failed to open ThumbnailView:", error);
    }
}
