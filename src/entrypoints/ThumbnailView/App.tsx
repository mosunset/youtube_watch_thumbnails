import { useState, useEffect } from "react";
import { buildYouTubeUrl } from "@/utils/youtubeUrl";
import { getVideoId } from "@/utils/storage";
import "@/utils/browserApi";
import Footer from "@/components/Footer";

// READMEのドメイン（ホスト+パス）定義
const IMAGE_BASES = [
    {
        host: "i.ytimg.com",
        folder: "vi_webp",
        ext: "webp",
        label: "i.ytimg.com/vi_webp",
    },
    { host: "i.ytimg.com", folder: "vi", ext: "jpg", label: "i.ytimg.com/vi" },
    {
        host: "img.youtube.com",
        folder: "vi_webp",
        ext: "webp",
        label: "img.youtube.com/vi_webp",
    },
    {
        host: "img.youtube.com",
        folder: "vi",
        ext: "jpg",
        label: "img.youtube.com/vi",
    },
] as const;

// READMEのファイル名（拡張子を除く）一覧
const IMAGE_FILENAMES = [
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

function buildImageUrl(
    host: string,
    folder: string,
    videoId: string,
    filename: string,
    ext: string
) {
    return `https://${host}/${folder}/${videoId}/${filename}.${ext}`;
}

type ImageMeta = {
    src: string;
    alt: string;
    width: number;
    height: number;
    name: string;
};



function App() {
    const [videoId, setVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selected, setSelected] = useState<ImageMeta | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function readOnce() {
            try {
                const id = await getVideoId();
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
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600">読み込み中...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!videoId) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-2xl font-bold mb-4 text-gray-800">
                            YouTube URL
                        </h1>
                        <div className="bg-gray-50 rounded-md p-4">
                            <p className="text-gray-600">
                                動画IDが見つかりませんでした
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const youtubeUrl = buildYouTubeUrl(videoId, "compact");

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* 左サイドバー: サムネイル一覧 */}
            <aside className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-800 mb-1">
                        Thumbnails
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                        Select to preview.
                    </p>
                    <div className="text-xs text-gray-500 mt-2 space-y-1">
                        <div>
                            <span className="font-semibold">Left:</span> WebP
                        </div>
                        <div>
                            <span className="font-semibold">Right:</span> JPG
                        </div>
                        <div className="mt-1 pt-1 border-t border-gray-100">
                            <span className="font-semibold">Top:</span> i.ytimg.com
                        </div>
                        <div>
                            <span className="font-semibold">Bottom:</span> img.youtube.com
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    <div className="space-y-1">
                        {IMAGE_FILENAMES.map((filename) => (
                            <div key={filename} className="mb-4">
                                <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 rounded mb-1">
                                    {filename}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {IMAGE_BASES.map((base) => {
                                        const src = buildImageUrl(
                                            base.host,
                                            base.folder,
                                            videoId,
                                            filename,
                                            base.ext
                                        );
                                        const alt = `${base.host}/${base.folder}/${videoId}/${filename}.${base.ext}`;
                                        const name = `${filename}.${base.ext}`;
                                        const isSelected =
                                            selected?.src === src;
                                        return (
                                            <button
                                                key={base.label}
                                                type="button"
                                                onClick={() =>
                                                    setSelected({
                                                        src,
                                                        alt,
                                                        width: 0,
                                                        height: 0,
                                                        name,
                                                    })
                                                }
                                                className={`relative group rounded overflow-hidden border-2 transition-all ${
                                                    isSelected
                                                        ? "border-blue-500 ring-2 ring-blue-200"
                                                        : "border-transparent hover:border-gray-300"
                                                }`}
                                            >
                                                <div className="aspect-video bg-gray-100">
                                                    <img
                                                        src={src}
                                                        alt={alt}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[8px] py-0.5 px-1 truncate">
                                                    {base.label}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <Footer />
                </div>
            </aside>

            {/* 右メインエリア: プレビュー */}
            <main className="flex-1 flex flex-col min-w-0 bg-gray-100/50">
                {/* ヘッダー */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
                    <div className="flex items-center space-x-4 overflow-x-auto">
                        {selected && (
                            <>
                                <div className="flex-shrink-0">
                                    <span className="text-xs font-medium text-gray-500 uppercase">
                                        Dimensions
                                    </span>
                                    <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                        {selected.width} x {selected.height} px
                                    </p>
                                </div>
                                <div className="h-8 w-px bg-gray-200 mx-2" />
                            </>
                        )}
                        <div className="flex-shrink-0">
                            <span className="text-xs font-medium text-gray-500 uppercase">
                                YouTube Link
                            </span>
                            <a
                                href={youtubeUrl}
                                onClick={handleLinkClick}
                                className="block text-sm font-medium text-blue-600 hover:underline whitespace-nowrap"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {youtubeUrl}
                            </a>
                        </div>
                        {selected && (
                            <>
                                <div className="h-8 w-px bg-gray-200 mx-2" />
                                <div className="flex-shrink-0">
                                    <span className="text-xs font-medium text-gray-500 uppercase">
                                        File URL
                                    </span>
                                    <a
                                        href={selected.src}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block text-sm font-medium text-blue-600 hover:underline whitespace-nowrap"
                                    >
                                        {selected.src}
                                    </a>
                                </div>
                                <div className="h-8 w-px bg-gray-200 mx-2" />
                                <div className="flex-shrink-0">
                                    <span className="text-xs font-medium text-gray-500 uppercase">
                                        Download
                                    </span>
                                    <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                        Right-click on preview image
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </header>

                {/* プレビュー表示 */}
                <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
                    {selected ? (
                        <div className="relative shadow-2xl overflow-hidden bg-white ring-1 ring-black/5">
                            <img
                                src={selected.src}
                                alt={selected.alt}
                                className="max-w-full max-h-[calc(100vh-12rem)] object-contain block"
                                onLoad={(e) => {
                                    const img =
                                        e.currentTarget as HTMLImageElement;
                                    setSelected((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  width:
                                                      img.naturalWidth || 0,
                                                  height:
                                                      img.naturalHeight || 0,
                                              }
                                            : null
                                    );
                                }}
                            />
                        </div>
                    ) : (
                        <div className="text-center text-gray-400">
                            <p className="text-lg">Select a thumbnail to preview</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
