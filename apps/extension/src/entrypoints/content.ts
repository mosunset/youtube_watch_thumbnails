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

            // 外側ラッパー（位置基準 & レイアウト維持）
            const wrapper = document.createElement("span");
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block";
            wrapper.style.marginRight = "12px";
            wrapper.style.overflow = "visible"; // 拡大時も周囲に影響させない

            // 内側ラッパー（画像とオーバーレイをまとめ、拡大対象にする）
            const imgWrap = document.createElement("span");
            imgWrap.style.position = "relative";
            imgWrap.style.display = "inline-block";

            img = document.createElement("img");
            img.id = IMAGE_ID;
            img.alt = "";
            img.title = "全サイズのサムネイルを見る";
            img.style.height = "64px";
            img.style.display = "inline";
            img.style.cursor = "pointer";
            // 拡大は画像ではなく内側ラッパーに適用し、オーバーレイも一緒に拡大
            imgWrap.style.transformOrigin = "left center";
            imgWrap.style.transition =
                "transform 200ms ease, box-shadow 200ms ease";
            imgWrap.style.willChange = "transform";

            // グラデーションは不要になったため削除

            // ツールチップ
            const tooltip = document.createElement("div");
            // テキスト + アイコン（Radix相当のオープン新規アイコンをSVGで再現）
            const ttText = document.createElement("span");
            ttText.textContent = "全サイズのサムネイルを見る";
            const ttIcon = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );
            ttIcon.setAttribute("viewBox", "0 0 24 24");
            ttIcon.setAttribute("width", "14");
            ttIcon.setAttribute("height", "14");
            ttIcon.style.marginLeft = "6px";
            ttIcon.style.verticalAlign = "-2px";
            ttIcon.style.display = "inline-block";
            ttIcon.style.stroke = "currentColor";
            ttIcon.style.fill = "none";
            ttIcon.style.strokeWidth = "2";
            const p1 = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
            p1.setAttribute("d", "M14 3h7v7M21 3l-9 9");
            const r1 = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            );
            r1.setAttribute("x", "3");
            r1.setAttribute("y", "7");
            r1.setAttribute("width", "14");
            r1.setAttribute("height", "14");
            r1.setAttribute("rx", "2");
            ttIcon.appendChild(p1);
            ttIcon.appendChild(r1);
            tooltip.style.position = "absolute";
            // 画像の左端基準で、画像の上に配置
            tooltip.style.left = "0";
            tooltip.style.bottom = "calc(100% + 6px)";
            tooltip.style.transform = "none";
            tooltip.style.color = "#fff";
            tooltip.style.fontSize = "13px";
            tooltip.style.fontWeight = "600";
            tooltip.style.padding = "4px 8px";
            tooltip.style.borderRadius = "6px";
            tooltip.style.border = "1px solid #fff";
            tooltip.style.background = "rgba(0,0,0,0.85)";
            tooltip.style.boxShadow = "0 2px 8px rgba(0,0,0,0.35)";
            tooltip.style.opacity = "0";
            tooltip.style.transition = "opacity 200ms";
            tooltip.style.pointerEvents = "none";
            tooltip.style.whiteSpace = "nowrap";
            tooltip.style.zIndex = "2147483647";
            tooltip.appendChild(ttText);
            tooltip.appendChild(ttIcon);

            wrapper.addEventListener("mouseenter", () => {
                tooltip.style.opacity = "1";
                imgWrap.style.position = "relative";
                imgWrap.style.zIndex = "9999";
                imgWrap.style.transform = "scale(1.75)";
                imgWrap.style.boxShadow = "0 12px 32px rgba(0,0,0,0.35)";
            });
            wrapper.addEventListener("mouseleave", () => {
                tooltip.style.opacity = "0";
                imgWrap.style.transform = "scale(1)";
                imgWrap.style.boxShadow = "";
                imgWrap.style.zIndex = "";
            });

            imgWrap.appendChild(img);
            wrapper.appendChild(imgWrap);
            wrapper.appendChild(tooltip);
            container.prepend(wrapper);
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
