import { useState, useEffect } from "react";
import { buildYouTubeUrl } from "@/utils/youtubeUrl";
import { STORAGE_KEY } from "@/constants";
import "@/utils/browserApi";
import Footer from "@/components/Footer";

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
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">
                        YouTube URL
                    </h1>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                URL:
                            </label>
                            <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                動画ID:
                            </label>
                            <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                                <p className="text-sm text-gray-800 font-mono">
                                    {videoId}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
