import { useState, useEffect, useMemo } from "react";
import { buildYouTubeUrl } from "@/utils/youtubeUrl";
import { STORAGE_KEY } from "@/constants";
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

function ImageItem({
    src,
    alt,
    name,
    onSelect,
}: {
    src: string;
    alt: string;
    name: string;
    onSelect: (meta: ImageMeta) => void;
}) {
    const [error, setError] = useState(false);
    const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
    if (error) return null;
    return (
        <button
            type="button"
            onClick={() =>
                dims &&
                onSelect({ src, alt, width: dims.w, height: dims.h, name })
            }
            className="inline-flex flex-col items-center justify-between mx-2 my-2 rounded hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <img
                src={src}
                alt={alt}
                className="w-[140px] aspect-video object-cover block cursor-pointer select-none"
                loading="lazy"
                onLoad={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    setDims({
                        w: img.naturalWidth || 0,
                        h: img.naturalHeight || 0,
                    });
                }}
                onError={() => setError(true)}
            />
            <p className="mt-1 text-xs text-gray-700 select-none tracking-tight">
                {name}
            </p>
        </button>
    );
}

function App() {
    const [videoId, setVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selected, setSelected] = useState<ImageMeta | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function readOnce() {
            try {
                const result = await browser.storage.local.get(STORAGE_KEY);
                if (cancelled) return;
                const id = result[STORAGE_KEY];
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

    const entries = useMemo(() => {
        if (!videoId) return [] as { src: string; alt: string; name: string }[];
        const list: { src: string; alt: string; name: string }[] = [];
        IMAGE_BASES.forEach((base) => {
            IMAGE_FILENAMES.forEach((name) => {
                const src = buildImageUrl(
                    base.host,
                    base.folder,
                    videoId,
                    name,
                    base.ext
                );
                const alt = `${base.host}/${base.folder}/${videoId}/${name}.${base.ext}`;
                list.push({ src, alt, name: `${name}.${base.ext}` });
            });
        });
        return list;
    }, [videoId]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (videoId) {
            const youtubeUrl = buildYouTubeUrl(videoId);
            browser.tabs.create({ url: youtubeUrl }).catch((error) => {
                console.error("Failed to create tab:", error);
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600">読み込み中...</p>
                    </div>
                </div>
                <Footer />
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
                <Footer />
            </div>
        );
    }

    const youtubeUrl = buildYouTubeUrl(videoId, "compact");

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* 上部ナビ（横スクロールのサムネイル一覧） */}
                    <nav className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <div className="text-sm text-gray-800 font-semibold mb-2">
                            Thumbnails
                        </div>
                        <div className="overflow-x-auto whitespace-nowrap">
                            <div className="inline-flex items-stretch">
                                {entries.map((e) => (
                                    <ImageItem
                                        key={e.alt}
                                        src={e.src}
                                        alt={e.alt}
                                        name={e.name}
                                        onSelect={(meta) => setSelected(meta)}
                                    />
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* ヘッダ情報（旧UI踏襲） */}
                    <header className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <p className="text-center mb-4">
                            <span className="font-semibold">
                                YouTube LINK :{" "}
                            </span>
                            <a
                                href={youtubeUrl}
                                onClick={handleLinkClick}
                                className="text-blue-600 hover:underline break-all"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {youtubeUrl}
                            </a>
                        </p>
                        <div className="flex flex-wrap items-center justify-around gap-4">
                            <p className="text-gray-800">
                                <span className="font-semibold">
                                    Img Name :{" "}
                                </span>
                                <span>{selected ? selected.name : "-"}</span>
                            </p>
                            <p className="text-gray-800">
                                <span className="font-semibold">
                                    Img Size :{" "}
                                </span>
                                <span>
                                    {selected
                                        ? `${selected.width}px : ${selected.height}px`
                                        : "0px : 0px"}
                                </span>
                            </p>
                        </div>
                    </header>

                    {/* メイン（拡大画像） */}
                    <main className="text-center bg-white rounded-lg shadow-md p-4">
                        {selected ? (
                            <img
                                src={selected.src}
                                alt={selected.alt}
                                className="min-h-[20vh] max-h-[90vh] max-w-[100vw] inline-block"
                            />
                        ) : (
                            <p className="text-2xl text-gray-500 py-16 select-none">
                                Click on the thumbnails above
                            </p>
                        )}
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
