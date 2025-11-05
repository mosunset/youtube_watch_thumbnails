import { useState, useEffect } from "react";
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

function ImageItem({ src, alt }: { src: string; alt: string }) {
    const [error, setError] = useState(false);
    if (error) return null;
    return (
        <div className="rounded border border-gray-200 overflow-hidden bg-white">
            <img
                src={src}
                alt={alt}
                className="w-full h-auto block"
                loading="lazy"
                onError={() => setError(true)}
            />
            <div className="px-2 py-1 text-[11px] text-gray-600 break-all border-t border-gray-100">
                {alt}
            </div>
        </div>
    );
}

function App() {
    const [videoId, setVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // storageから動画IDを読み込む
        browser.storage.local
            .get(STORAGE_KEY)
            .then((result) => {
                const id = result[STORAGE_KEY];
                setVideoId(id || null);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to get video ID from storage:", error);
                setLoading(false);
            });
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
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h1 className="text-2xl font-bold mb-4 text-gray-800">
                            YouTube URL
                        </h1>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    URL:
                                </label>
                                <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                                    <a
                                        href={youtubeUrl}
                                        onClick={handleLinkClick}
                                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all cursor-pointer transition-colors"
                                    >
                                        {youtubeUrl}
                                    </a>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    動画ID:
                                </label>
                                <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                                    <p className="text-sm text-gray-800 font-mono">
                                        {videoId}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {IMAGE_BASES.map((base) => (
                        <div
                            key={base.label}
                            className="bg-white rounded-lg shadow-md p-6 mb-6"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                {base.label}
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {IMAGE_FILENAMES.map((name) => {
                                    const src = buildImageUrl(
                                        base.host,
                                        base.folder,
                                        videoId,
                                        name,
                                        base.ext
                                    );
                                    const alt = `${base.host}/${base.folder}/${videoId}/${name}.${base.ext}`;
                                    return (
                                        <ImageItem
                                            key={alt}
                                            src={src}
                                            alt={alt}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
