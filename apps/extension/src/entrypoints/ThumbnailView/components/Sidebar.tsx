import { i18n } from "#i18n";
import Footer from "@/components/Footer";
import { IMAGE_BASES, IMAGE_FILENAMES } from "../constants";
import { buildImageUrl } from "../utils";
import { ImageMeta } from "../types";

type SidebarProps = {
    videoId: string;
    selected: ImageMeta | null;
    onSelect: (image: ImageMeta) => void;
};

export default function Sidebar({ videoId, selected, onSelect }: SidebarProps) {
    return (
        <aside className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-800 mb-1">
                    {i18n.t("thumbnails")}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                    {i18n.t("selectToPreview")}
                </p>
                <div className="text-xs text-gray-500 mt-2 space-y-1">
                    <div>
                        <span className="font-semibold">{i18n.t("formatLeft")}:</span> WebP
                    </div>
                    <div>
                        <span className="font-semibold">{i18n.t("formatRight")}:</span> JPG
                    </div>
                    <div className="mt-1 pt-1 border-t border-gray-100">
                        <span className="font-semibold">{i18n.t("formatTop")}:</span> i.ytimg.com
                    </div>
                    <div>
                        <span className="font-semibold">{i18n.t("formatBottom")}:</span> img.youtube.com
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                    {IMAGE_FILENAMES.map((filename) => (
                        <div key={filename} className="mb-4">
                            <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 rounded mb-1">
                                {filename}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {IMAGE_BASES.map((base) => {
                                    const src = buildImageUrl(
                                        base.host,
                                        base.folder,
                                        videoId,
                                        filename,
                                        base.ext
                                    );
                                    const alt = `${base.host}/${base.folder}/${videoId}/${filename}.${base.ext}`;
                                    const name = `${filename}.${base.ext}`;
                                    const isSelected = selected?.src === src;
                                    return (
                                        <button
                                            key={base.label}
                                            type="button"
                                            onClick={() =>
                                                onSelect({
                                                    src,
                                                    alt,
                                                    width: 0,
                                                    height: 0,
                                                    name,
                                                })
                                            }
                                            className={`relative group rounded overflow-hidden border-2 transition-all ${isSelected
                                                ? "border-blue-500 ring-2 ring-blue-200"
                                                : "border-transparent hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="aspect-video bg-gray-100">
                                                <img
                                                    src={src}
                                                    alt={alt}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[8px] py-0.5 px-1 truncate">
                                                {base.label}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <Footer />
            </div>
        </aside>
    );
}
