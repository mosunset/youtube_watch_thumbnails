import { useState, useEffect } from "react";
import { buildYouTubeUrl } from "@/utils/youtubeUrl";
import { videoIdStorage } from "@/utils/storage";
import { browser } from 'wxt/browser';
import { IMAGE_BASES } from "./constants";
import { buildImageUrl } from "./utils";
import { ImageMeta } from "./types";
import LoadingScreen from "./components/LoadingScreen";
import NoVideoScreen from "./components/NoVideoScreen";
import Sidebar from "./components/Sidebar";
import PreviewHeader from "./components/PreviewHeader";
import PreviewImage from "./components/PreviewImage";

function App() {
    const [videoId, setVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selected, setSelected] = useState<ImageMeta | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function readOnce() {
            try {
                const id = await videoIdStorage.getValue();
                if (cancelled) return;
                if (id) {
                    setVideoId(id);
                    setLoading(false);
                    return true;
                }
                return false;
            } catch (error) {
                console.error("Failed to get video ID from storage:", error);
                return false;
            }
        }

        // 最初の即時読み込み
        readOnce().then((ok) => {
            if (ok) return;
            // 短時間ポーリング（最大2秒）
            let attempts = 0;
            const timer = setInterval(async () => {
                attempts += 1;
                const okNow = await readOnce();
                if (okNow || attempts >= 10) {
                    clearInterval(timer);
                    if (!okNow && !cancelled) setLoading(false);
                }
            }, 200);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (videoId) {
            const youtubeUrl = buildYouTubeUrl(videoId);
            browser.tabs.create({ url: youtubeUrl }).catch((error) => {
                console.error("Failed to create tab:", error);
            });
        }
    };

    useEffect(() => {
        if (videoId && !selected) {
            // 初期選択: i.ytimg.com/vi_webp + maxresdefault
            const defaultBase = IMAGE_BASES.find(
                (b) => b.host === "i.ytimg.com" && b.folder === "vi_webp"
            );
            if (defaultBase) {
                const filename = "maxresdefault";
                const src = buildImageUrl(
                    defaultBase.host,
                    defaultBase.folder,
                    videoId,
                    filename,
                    defaultBase.ext
                );
                const alt = `${defaultBase.host}/${defaultBase.folder}/${videoId}/${filename}.${defaultBase.ext}`;
                const name = `${filename}.${defaultBase.ext}`;
                // 画像サイズはロード後に取得されるが、とりあえず選択状態にする
                setSelected({ src, alt, width: 0, height: 0, name });
            }
        }
    }, [videoId, selected]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (!videoId) {
        return <NoVideoScreen />;
    }

    const youtubeUrl = buildYouTubeUrl(videoId, "compact");

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* 左サイドバー: サムネイル一覧 */}
            <Sidebar
                videoId={videoId}
                selected={selected}
                onSelect={setSelected}
            />

            {/* 右メインエリア: プレビュー */}
            <main className="flex-1 flex flex-col min-w-0 bg-gray-100/50">
                {/* ヘッダー */}
                <PreviewHeader
                    selected={selected}
                    youtubeUrl={youtubeUrl}
                    onLinkClick={handleLinkClick}
                />

                {/* プレビュー表示 */}
                <PreviewImage
                    selected={selected}
                    onImageLoad={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        setSelected((prev) =>
                            prev
                                ? {
                                    ...prev,
                                    width: img.naturalWidth || 0,
                                    height: img.naturalHeight || 0,
                                }
                                : null
                        );
                    }}
                />
            </main>
        </div>
    );
}

export default App;
