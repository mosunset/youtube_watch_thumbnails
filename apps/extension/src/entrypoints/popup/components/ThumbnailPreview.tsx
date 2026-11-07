import { useEffect, useState } from "react";
import { i18n } from "#i18n";
import Footer from "@/components/Footer";
import OpenInNewIcon from "@/components/OpenInNewIcon";
import { findBestThumbnail } from "@/utils/thumbnails";
import { openThumbnailView } from "@/utils/thumbnailView";

type ThumbnailPreviewProps = {
    url: string;
    videoId: string;
};

type LoadState =
    | { videoId: string; status: "found"; src: string }
    | { videoId: string; status: "missing" };

/** 視聴中の動画で一番きれいなサムネイルを表示し、クリックで ThumbnailView を開く */
export default function ThumbnailPreview({ url, videoId }: ThumbnailPreviewProps) {
    const [result, setResult] = useState<LoadState | null>(null);

    useEffect(() => {
        let cancelled = false;
        findBestThumbnail(videoId)
            .then((src) => {
                if (cancelled) return;
                setResult(src ? { videoId, status: "found", src } : { videoId, status: "missing" });
            })
            .catch((error) => {
                console.error("Failed to load thumbnail:", error);
                if (!cancelled) setResult({ videoId, status: "missing" });
            });
        return () => {
            cancelled = true;
        };
    }, [videoId]);

    // videoId が変わった直後は前の結果を使わない
    const current = result?.videoId === videoId ? result : null;

    return (
        <div className="min-w-150">
            {!current && <Message>{i18n.t("loadingImage")}</Message>}
            {current?.status === "missing" && <Message>{i18n.t("thumbnailNotFound")}</Message>}
            {current?.status === "found" && (
                <button
                    type="button"
                    className="group block w-full cursor-pointer text-left"
                    onClick={() => void openThumbnailView(url)}
                >
                    <div className="relative">
                        <img src={current.src} alt="Thumbnail" className="h-auto w-full" />
                        {/* ホバー時に下半分を暗くして案内を出す */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <div className="flex items-center gap-2 whitespace-nowrap px-3 py-2 text-lg font-medium text-white">
                                {i18n.t("viewAllSizes")}
                                <OpenInNewIcon className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 bg-muted p-3 text-sm text-muted-foreground">
                        <span>{i18n.t("clickToViewAllSizes")}</span>
                        <OpenInNewIcon className="h-4 w-4" />
                    </div>
                </button>
            )}
            <Footer compact />
        </div>
    );
}

function Message({ children }: { children: string }) {
    return (
        <div className="flex items-center justify-center rounded bg-muted p-8">
            <p className="text-sm text-muted-foreground">{children}</p>
        </div>
    );
}
