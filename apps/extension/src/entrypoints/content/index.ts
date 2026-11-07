import { defineContentScript } from "#imports";
import { i18n } from "#i18n";
import { buildThumbnail, findBestThumbnail, THUMBNAIL_SOURCES } from "@/utils/thumbnails";
import { openThumbnailView } from "@/utils/thumbnailView";
import { extractVideoId } from "@/utils/youtube";
import "./style.css";

const ROOT_ID = "youtube_watch_thumbnail";
/** 視聴ページのチャンネル情報（アイコン・チャンネル名）の入れ物 */
const CONTAINER_SELECTOR = "div#owner.item.style-scope.ytd-watch-metadata";
const SVG_NS = "http://www.w3.org/2000/svg";

export default defineContentScript({
    matches: ["*://*.youtube.com/*", "*://youtube.com/*"],
    main() {
        function createOpenIcon(): SVGSVGElement {
            const svg = document.createElementNS(SVG_NS, "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("class", "ywt-thumb__icon");
            svg.setAttribute("aria-hidden", "true");
            const path = document.createElementNS(SVG_NS, "path");
            path.setAttribute("d", "M14 3h7v7M21 3l-9 9");
            const rect = document.createElementNS(SVG_NS, "rect");
            for (const [name, value] of Object.entries({ x: 3, y: 7, width: 14, height: 14, rx: 2 })) {
                rect.setAttribute(name, String(value));
            }
            svg.append(path, rect);
            return svg;
        }

        /** サムネイル要素を作ってページに差し込む。差し込み先がまだ無ければ null */
        function mountThumbnail(): HTMLImageElement | null {
            const container = document.querySelector(CONTAINER_SELECTOR);
            if (!container) return null;

            const label = i18n.t("viewAllSizes");

            const root = document.createElement("span");
            root.id = ROOT_ID;
            root.className = "ywt-thumb";

            const frame = document.createElement("span");
            frame.className = "ywt-thumb__frame";

            const img = document.createElement("img");
            img.className = "ywt-thumb__img";
            img.alt = "";
            img.title = label;
            img.addEventListener("click", (event) => {
                event.preventDefault();
                void openThumbnailView(window.location.href);
            });

            const tooltip = document.createElement("div");
            tooltip.className = "ywt-thumb__tooltip";
            tooltip.append(label, createOpenIcon());

            frame.append(img);
            root.append(frame, tooltip);
            container.prepend(root);
            return img;
        }

        function getThumbnailImage(): HTMLImageElement | null {
            return document.querySelector<HTMLImageElement>(`#${ROOT_ID} img`);
        }

        /** まず小さい画像を即表示し、見つかった最良の画像に差し替える */
        function showVideo(img: HTMLImageElement, videoId: string) {
            img.dataset.videoId = videoId;
            img.src = buildThumbnail(videoId, "default", THUMBNAIL_SOURCES[1]).src;
            void findBestThumbnail(videoId).then((best) => {
                // 読み込み中に別の動画へ移動していたら反映しない
                if (best && img.dataset.videoId === videoId) img.src = best;
            });
        }

        function update() {
            const videoId = extractVideoId(window.location.href);
            if (!videoId) return;
            const img = getThumbnailImage() ?? mountThumbnail();
            if (!img || img.dataset.videoId === videoId) return;
            showVideo(img, videoId);
        }

        // YouTube は SPA なので、DOM の変化をきっかけに差し込み・動画の切り替えを確認する
        new MutationObserver(update).observe(document, { childList: true, subtree: true });
        update();
    },
});
