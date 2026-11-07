import { useState } from "react";
import { buildThumbnail, type Thumbnail } from "@/utils/thumbnails";
import { readVideoIdFromLocation } from "@/utils/thumbnailView";
import { buildYouTubeUrl } from "@/utils/youtube";
import NoVideoScreen from "./components/NoVideoScreen";
import PreviewHeader from "./components/PreviewHeader";
import PreviewImage, { type ImageSize } from "./components/PreviewImage";
import Sidebar from "./components/Sidebar";

export default function App() {
    // 動画 ID はページ URL（?v=）から読む。ページの寿命の間は変わらない
    const [videoId] = useState(() => readVideoIdFromLocation(window.location.search));

    if (!videoId) {
        return <NoVideoScreen />;
    }
    return <ThumbnailViewer videoId={videoId} />;
}

function ThumbnailViewer({ videoId }: { videoId: string }) {
    // 最初は一番大きい WebP を選択しておく
    const [selected, setSelected] = useState<Thumbnail>(() => buildThumbnail(videoId, "maxresdefault"));
    // 実寸は画像の読み込み後にわかる。どの画像の寸法かを src で持つ
    const [size, setSize] = useState<(ImageSize & { src: string }) | null>(null);

    const selectedSize = size?.src === selected.src ? size : null;

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar videoId={videoId} selected={selected} onSelect={setSelected} />
            <main className="flex min-w-0 flex-1 flex-col bg-gray-100/50">
                <PreviewHeader
                    selected={selected}
                    size={selectedSize}
                    youtubeUrl={buildYouTubeUrl(videoId, "compact")}
                />
                <PreviewImage
                    src={selected.src}
                    alt={`${selected.sourceLabel}/${videoId}/${selected.fileName}`}
                    onSize={(s) => setSize({ ...s, src: selected.src })}
                />
            </main>
        </div>
    );
}
