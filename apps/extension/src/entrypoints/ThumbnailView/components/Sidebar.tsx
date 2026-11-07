import { i18n } from "#i18n";
import Footer from "@/components/Footer";
import {
    buildThumbnail,
    sourceLabel,
    THUMBNAIL_NAMES,
    THUMBNAIL_SOURCES,
    type Thumbnail,
} from "@/utils/thumbnails";
import { cn } from "@/lib/utils";

type SidebarProps = {
    videoId: string;
    selected: Thumbnail;
    onSelect: (thumbnail: Thumbnail) => void;
};

/** 全ファイル名 × 全配信元のサムネイル一覧 */
export default function Sidebar({ videoId, selected, onSelect }: SidebarProps) {
    return (
        <aside className="flex w-80 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-4">
                <h2 className="mb-1 text-sm font-semibold text-gray-800">{i18n.t("thumbnails")}</h2>
                <p className="mt-1 text-xs text-gray-500">{i18n.t("selectToPreview")}</p>
                <dl className="mt-2 space-y-1 text-xs text-gray-500">
                    <Legend label={i18n.t("formatLeft")} value="WebP" />
                    <Legend label={i18n.t("formatRight")} value="JPG" />
                    <div className="mt-1 border-t border-gray-100 pt-1">
                        <Legend label={i18n.t("formatTop")} value="i.ytimg.com" />
                    </div>
                    <Legend label={i18n.t("formatBottom")} value="img.youtube.com" />
                </dl>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {THUMBNAIL_NAMES.map((name) => (
                    <section key={name} className="mb-4">
                        <h3 className="mb-1 rounded bg-gray-50 px-2 py-1 text-xs font-medium tracking-wide text-gray-500">
                            {name}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {THUMBNAIL_SOURCES.map((source) => {
                                const thumbnail = buildThumbnail(videoId, name, source);
                                const isSelected = selected.src === thumbnail.src;
                                return (
                                    <button
                                        key={sourceLabel(source)}
                                        type="button"
                                        onClick={() => onSelect(thumbnail)}
                                        className={cn(
                                            "group relative overflow-hidden rounded border-2 transition-all",
                                            isSelected
                                                ? "border-blue-500 ring-2 ring-blue-200"
                                                : "border-transparent hover:border-gray-300",
                                        )}
                                    >
                                        <div className="aspect-video bg-gray-100">
                                            <img
                                                src={thumbnail.src}
                                                alt={`${thumbnail.sourceLabel}/${videoId}/${thumbnail.fileName}`}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-1 py-0.5 text-[8px] text-white">
                                            {thumbnail.sourceLabel}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
            <div className="border-t border-gray-200 bg-gray-50 p-4">
                <Footer />
            </div>
        </aside>
    );
}

function Legend({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="inline font-semibold">{label}:</dt> <dd className="inline">{value}</dd>
        </div>
    );
}
