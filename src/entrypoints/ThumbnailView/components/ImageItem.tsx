import { useState } from "react";
import type { ImageMeta } from "@/entrypoints/ThumbnailView/lib/images";

function ImageItem({
    src,
    alt,
    name,
    onSelect,
}: {
    src: string;
    alt: string;
    name: string;
    onSelect: (meta: ImageMeta) => void;
}) {
    const [error, setError] = useState(false);
    const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
    if (error) return null;
    return (
        <button
            type="button"
            onClick={() =>
                dims &&
                onSelect({ src, alt, width: dims.w, height: dims.h, name })
            }
            className="inline-flex flex-col items-center justify-between mx-2 my-2 rounded hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <img
                src={src}
                alt={alt}
                className="w-[140px] aspect-video object-cover block cursor-pointer select-none"
                loading="lazy"
                onLoad={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    setDims({
                        w: img.naturalWidth || 0,
                        h: img.naturalHeight || 0,
                    });
                }}
                onError={() => setError(true)}
            />
            <p className="mt-1 text-xs text-gray-700 select-none tracking-tight">
                {name}
            </p>
        </button>
    );
}

export default ImageItem;
