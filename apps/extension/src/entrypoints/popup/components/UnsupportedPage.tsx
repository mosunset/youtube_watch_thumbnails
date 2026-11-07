import icon from "@/assets/icon.png";
import Footer from "@/components/Footer";

type UnsupportedPageProps = {
    title: string;
    body: string;
    hint: string;
};

/** サムネイルを出せないページで表示する案内 */
export default function UnsupportedPage({ title, body, hint }: UnsupportedPageProps) {
    return (
        <div className="min-w-90 p-4 pb-0">
            <div className="flex flex-col items-center">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-red-50 ring-1 ring-red-100">
                    <img src={icon} alt="YouTube Watch Thumbnails" className="h-8 w-8" />
                </div>
                <h1 className="text-center text-xl font-extrabold tracking-tight text-gray-900">
                    {title}
                </h1>
                <p className="mt-3 text-center text-sm text-muted-foreground">{body}</p>
                <div className="mt-4 w-full rounded-md bg-gray-50 px-4 py-2 text-center text-xs text-gray-700 ring-1 ring-gray-200">
                    {hint}
                </div>
            </div>
            <Footer />
        </div>
    );
}
