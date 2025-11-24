export function buildImageUrl(
    host: string,
    folder: string,
    videoId: string,
    filename: string,
    ext: string
) {
    return `https://${host}/${folder}/${videoId}/${filename}.${ext}`;
}
