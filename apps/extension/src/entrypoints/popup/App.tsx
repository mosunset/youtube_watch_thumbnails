import { useState, useEffect } from "react";
import ShortsContent from "./_components/ShortsContent";
import WatchContent from "./_components/WatchContent";
import YoutubeContent from "./_components/YoutubeContent";
import DefaultContent from "./_components/DefaultContent";
import { getPageTypeFromUrl, type PageType } from "@/utils/pageType";

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
