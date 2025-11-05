import { useState, useEffect } from "react";
import ShortsContent from "@/components/ShortsContent";
import WatchContent from "@/components/WatchContent";
import YoutubeContent from "@/components/YoutubeContent";
import DefaultContent from "@/components/DefaultContent";
import { getPageTypeFromUrl, type PageType } from "@/utils/pageType";

// browser APIの型定義
declare const browser: {
    tabs: {
        query: (queryInfo: {
            active?: boolean;
            currentWindow?: boolean;
        }) => Promise<Array<{ url?: string }>>;
    };
};

function App() {
    const [url, setUrl] = useState<string>("");
    const [pageType, setPageType] = useState<PageType>("default");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // 現在のタブのURLを取得して判定
        browser.tabs
            .query({ active: true, currentWindow: true })
            .then((tabs) => {
                const currentUrl = tabs[0]?.url || "";
                setUrl(currentUrl);
                setPageType(getPageTypeFromUrl(currentUrl));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to get tab URL:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-w-80 p-4">
                <p className="text-center text-sm text-muted-foreground">
                    読み込み中...
                </p>
            </div>
        );
    }

    // ページタイプに応じてコンポーネントを出し分け
    switch (pageType) {
        case "shorts":
            return <ShortsContent url={url} />;
        case "watch":
            return <WatchContent url={url} />;
        case "youtube":
            return <YoutubeContent />;
        default:
            return <DefaultContent />;
    }
}

export default App;
