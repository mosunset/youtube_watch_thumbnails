export type ImageSize = { width: number; height: number };

type PreviewImageProps = {
    src: string;
    alt: string;
    onSize: (size: ImageSize) => void;
};

export default function PreviewImage({ src, alt, onSize }: PreviewImageProps) {
    return (
        <div className="flex flex-1 items-center justify-center overflow-auto p-8">
            <div className="relative overflow-hidden bg-white shadow-2xl ring-1 ring-black/5">
                <img
                    src={src}
                    alt={alt}
                    className="block max-h-[calc(100vh-12rem)] max-w-full object-contain"
                    onLoad={(e) =>
                        onSize({
                            width: e.currentTarget.naturalWidth,
                            height: e.currentTarget.naturalHeight,
                        })
                    }
                />
            </div>
        </div>
    );
}
