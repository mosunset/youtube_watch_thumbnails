/**
 * URL表示コンポーネント
 * DRY原則に基づき、URL表示のUIを共通化
 */

import { useState, useEffect } from "react";
import { openThumbnailView } from "@/utils/thumbnailView";
import { extractVideoId } from "@/utils/youtubeUrl";
import Footer from "../Footer";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

interface UrlDisplayProps {
    url: string;
}

// 画像ファイル名の優先順位（高い順）
const IMAGE_PRIORITIES = [
    "maxresdefault",
    "hq720",
    "sddefault",
    "hqdefault",
    "0",
    "mqdefault",
    "default",
] as const;

/**
 * 画像URLを生成
 */
function generateThumbnailUrl(videoId: string, filename: string): string[] {
    const domain = "i.ytimg.com";
    return [
        `https://${domain}/vi_webp/${videoId}/${filename}.webp`,
        `https://${domain}/vi/${videoId}/${filename}.jpg`,
    ];
}

/**
 * 画像が読み込めるかチェック
 */
function checkImageLoad(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        const img = new Image();
        let settled = false;

        // タイマーを先に用意
        const timeoutId = setTimeout(() => {
            if (settled) return;
            settled = true;
            img.onload = null;
            img.onerror = null;
            resolve(false);
        }, 5000);

        img.onload = () => {
            if (settled) return;
            settled = true;
            clearTimeout(timeoutId);
            // 幅・高さが0、またはYouTubeのプレースホルダー(≈120x90)は失敗扱い
            const isPlaceholder =
                img.naturalWidth <= 120 && img.naturalHeight <= 90;
            const valid =
                img.naturalWidth > 0 && img.naturalHeight > 0 && !isPlaceholder;
            img.onload = null;
            img.onerror = null;
            resolve(valid);
        };
        img.onerror = () => {
            if (settled) return;
            settled = true;
            clearTimeout(timeoutId);
            img.onload = null;
            img.onerror = null;
            resolve(false);
        };

        // 画像読み込み開始
        img.src = url;
    });
}

/**
 * 最適なサムネイル画像URLを取得
 */
async function getBestThumbnailUrl(videoId: string): Promise<string | null> {
    // 優先順位の高い画像から順に試す
    for (const filename of IMAGE_PRIORITIES) {
        const urls = generateThumbnailUrl(videoId, filename);
        // webpを先に試す
        for (const imageUrl of urls) {
            const canLoad = await checkImageLoad(imageUrl);
            if (canLoad) {
                return imageUrl;
            }
        }
    }
    return null;
}

function UrlDisplay({ url }: UrlDisplayProps) {
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [imageLoading, setImageLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!url) {
            setThumbnailUrl(null);
            return;
        }

        const videoId = extractVideoId(url);
        if (!videoId) {
            setThumbnailUrl(null);
            return;
        }

        let isCancelled = false;
        setImageLoading(true);
        setThumbnailUrl(null);
        getBestThumbnailUrl(videoId)
            .then((imageUrl) => {
                if (isCancelled) return;
                setThumbnailUrl(imageUrl);
                setImageLoading(false);
            })
            .catch((error) => {
                if (isCancelled) return;
                console.error("Failed to load thumbnail:", error);
                setThumbnailUrl(null);
                setImageLoading(false);
            });

        return () => {
            isCancelled = true;
        };
    }, [url]);

    const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await openThumbnailView(url);
    };

    const handleImageClick = async (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        await openThumbnailView(url);
    };

    return (
        <div className="min-w-150 p-0 pb-0">
            {/* サムネイル画像表示 */}
            {imageLoading && (
                <div className="flex items-center justify-center bg-muted rounded p-8">
                    <p className="text-sm text-muted-foreground">
                        画像を読み込み中...
                    </p>
                </div>
            )}

            {!imageLoading && thumbnailUrl && (
                <div
                    className="w-full group cursor-pointer"
                    onClick={handleImageClick}
                >
                    <div className="relative">
                        <img
                            src={thumbnailUrl}
                            alt="Thumbnail"
                            className="w-full h-auto rounded-none transition-opacity"
                        />
                        {/* 下半分から黒へのグラデーションオーバーレイ */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                        {/* ツールチップ */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                            <div className="flex items-center gap-2 text-white text-lg font-medium px-3 py-2 rounded shadow-lg whitespace-nowrap">
                                全サイズのサムネイルを見る
                                <OpenInNewWindowIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                    {/* 説明文 */}
                    <div className="p-3 bg-muted text-center transition-colors">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <span>
                                画像をクリックすると全サイズのサムネイルを見ることができます
                            </span>
                            <OpenInNewWindowIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            )}

            <Footer compact />
        </div>
    );
}

export default UrlDisplay;
