export const IMAGE_BASES = [
    {
        host: "i.ytimg.com",
        hostLabel: "i.ytimg.com",
        folder: "vi_webp",
        ext: "webp",
        label: "i.ytimg.com/vi_webp",
    },
    {
        host: "i.ytimg.com",
        hostLabel: "i.ytimg.com",
        folder: "vi",
        ext: "jpg",
        label: "i.ytimg.com/vi",
    },
    {
        host: "img.youtube.com",
        hostLabel: "img.youtube.com",
        folder: "vi_webp",
        ext: "webp",
        label: "img.youtube.com/vi_webp",
    },
    {
        host: "img.youtube.com",
        hostLabel: "img.youtube.com",
        folder: "vi",
        ext: "jpg",
        label: "img.youtube.com/vi",
    },
] as const;

export const IMAGE_FILENAMES = [
    "maxresdefault",
    "hq720",
    "sddefault",
    "hqdefault",
    "0",
    "mqdefault",
    "default",
    "sd1",
    "sd2",
    "sd3",
    "hq1",
    "hq2",
    "hq3",
    "mq1",
    "mq2",
    "mq3",
    "1",
    "2",
    "3",
] as const;

export type ImageMeta = {
    src: string;
    alt: string;
    width: number;
    height: number;
    name: string;
};

export function buildImageUrl(
    host: string,
    folder: string,
    videoId: string,
    filename: string,
    ext: string
) {
    return `https://${host}/${folder}/${videoId}/${filename}.${ext}`;
}
