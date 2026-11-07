import { useEffect, useState } from "react";
import { browser } from "#imports";
import { i18n } from "#i18n";
import { extractVideoId, getPageType } from "@/utils/youtube";
import ThumbnailPreview from "./components/ThumbnailPreview";
import UnsupportedPage from "./components/UnsupportedPage";

/** アクティブなタブの URL を取得する。取得前は null */
function useActiveTabUrl(): string | null {
    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {
        browser.tabs
            .query({ active: true, currentWindow: true })
            .then((tabs) => setUrl(tabs[0]?.url ?? ""))
            .catch((error) => {
                console.error("Failed to get tab URL:", error);
                setUrl("");
            });
    }, []);
    return url;
}

export default function App() {
    const url = useActiveTabUrl();

    if (url === null) {
        return (
            <div className="min-w-80 p-4">
                <p className="text-center text-sm text-muted-foreground">{i18n.t("loading")}</p>
            </div>
        );
    }

    const videoId = extractVideoId(url);
    if (videoId) {
        return <ThumbnailPreview url={url} videoId={videoId} />;
    }

    const onYouTube = getPageType(url) !== "other";
    return (
        <UnsupportedPage
            title={i18n.t(onYouTube ? "notVideoPageTitle" : "notYouTubeTitle")}
            body={i18n.t(onYouTube ? "notVideoPageBody" : "notYouTubeBody")}
            hint={i18n.t("openOnVideoPageHint")}
        />
    );
}
