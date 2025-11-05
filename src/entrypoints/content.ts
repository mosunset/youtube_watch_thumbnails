import { extractVideoId } from "@/utils/youtubeUrl";
import { openThumbnailView } from "@/utils/thumbnailView";
declare const defineContentScript: any;

export default defineContentScript({
    matches: [
        "*://www.youtube.com/*",
        "*://m.youtube.com/*",
        "*://youtube.com/*",
        "*://*.youtube.com/*",
    ],
    main() {
        const IMAGE_ID = "youtube_watch_thumbnail";
        const CONTAINER_SELECTOR =
            "div#owner.item.style-scope.ytd-watch-metadata";

        function getCurrentVideoId(): string | null {
            return extractVideoId(window.location.href);
        }

        function ensureThumbnailElement(): HTMLImageElement | null {
            let img = document.getElementById(
                IMAGE_ID
            ) as HTMLImageElement | null;
            if (img) return img;

            const container = document.querySelector(CONTAINER_SELECTOR);
            if (!container) return null;

            img = document.createElement("img");
            img.id = IMAGE_ID;
            img.alt = "";
            img.title = "";
            img.style.height = "64px";
            img.style.marginRight = "12px";
            img.style.display = "inline";
            img.style.cursor = "pointer";

            container.prepend(img);
            attachClickHandler(img);
            return img;
        }

        function attachClickHandler(img: HTMLImageElement) {
            if ((img as any)._ywtClickBound) return;
            img.addEventListener("click", async (e) => {
                e.preventDefault();
                await openThumbnailView(window.location.href);
            });
            (img as any)._ywtClickBound = true;
        }

        function setThumbnailSrcByVideoId(
            img: HTMLImageElement,
            videoId: string
        ) {
            // 高解像度 → 低解像度の優先度で候補を定義
            const candidates = [
                `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
                `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
                `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
                `https://i.ytimg.com/vi/${videoId}/default.jpg`,
            ];

            // 既に同じ videoId をセット済みなら、ベースの再設定は行わない
            const prevVideoId = (img.dataset as any).videoId as
                | string
                | undefined;
            let currentPriority = Number(
                (img.dataset as any).priority ?? candidates.length - 1
            );
            if (Number.isNaN(currentPriority))
                currentPriority = candidates.length - 1;
            if (prevVideoId !== videoId) {
                // まずは最下位（default）を即時表示してチラつきを避ける
                currentPriority = candidates.length - 1;
                img.src = candidates[currentPriority];
            }
            (img.dataset as any).videoId = videoId;
            (img.dataset as any).priority = String(currentPriority);

            // 低解像のプレースホルダー（120x90等）での上書きを防ぐためのしきい値
            const MIN_MEANINGFUL_WIDTH = 300;
            const MIN_MEANINGFUL_HEIGHT = 200;

            candidates.forEach((url, index) => {
                const testImg = new Image();
                // CORS の影響を避けたい場合は必要に応じて設定
                // testImg.crossOrigin = "anonymous";
                testImg.onload = () => {
                    const w = testImg.naturalWidth || 0;
                    const h = testImg.naturalHeight || 0;
                    const looksMeaningful =
                        w >= MIN_MEANINGFUL_WIDTH && h >= MIN_MEANINGFUL_HEIGHT;

                    // 既により上位の候補が適用済みなら何もしない
                    if (index >= currentPriority) return;

                    // 十分な解像度のものだけを採用
                    if (looksMeaningful) {
                        img.src = url;
                        currentPriority = index;
                        (img.dataset as any).priority = String(currentPriority);
                    }
                };
                testImg.onerror = () => {};
                testImg.src = url;
            });
        }

        function update() {
            const videoId = getCurrentVideoId();
            if (!videoId) return;
            const img = ensureThumbnailElement();
            if (!img) return;
            setThumbnailSrcByVideoId(img, videoId);
        }

        const observer = new MutationObserver(() => {
            // 画像がなければ作成し、あればURL変化に合わせてのみ更新
            const img = document.getElementById(
                IMAGE_ID
            ) as HTMLImageElement | null;
            const videoId = getCurrentVideoId();
            if (!img) {
                const created = ensureThumbnailElement();
                if (created) update();
                return;
            }
            // 同一 videoId が既に反映済みなら何もしない（不要な再読込を防ぐ）
            if (videoId && (img.dataset as any).videoId === videoId) {
                return;
            }
            update();
        });

        observer.observe(document, { childList: true, subtree: true });

        // 初期ロード時も実行
        update();
    },
});
