import { i18n } from "#i18n";
import { ImageMeta } from "../types";

type PreviewImageProps = {
    selected: ImageMeta | null;
    onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

export default function PreviewImage({ selected, onImageLoad }: PreviewImageProps) {
    return (
        <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
            {selected ? (
                <div className="relative shadow-2xl overflow-hidden bg-white ring-1 ring-black/5">
                    <img
                        src={selected.src}
                        alt={selected.alt}
                        className="max-w-full max-h-[calc(100vh-12rem)] object-contain block"
                        onLoad={onImageLoad}
                    />
                </div>
            ) : (
                <div className="text-center text-gray-400">
                    <p className="text-lg">{i18n.t("selectThumbnailPrompt")}</p>
                </div>
            )}
        </div>
    );
}
