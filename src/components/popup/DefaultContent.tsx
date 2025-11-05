import ywt from "@/assets/ywt.png";
import Footer from "../Footer";

function DefaultContent() {
    return (
        <div className="min-w-90 p-4 pb-0">
            <div className="flex flex-col items-center">
                <div className="mb-5 inline-flex items-center justify-center h-14 w-14 rounded-full bg-red-50 text-red-500 ring-1 ring-red-100 overflow-hidden">
                    <img
                        src={ywt}
                        alt="YouTube Watch Thumbnails"
                        className="h-8 w-8"
                    />
                </div>
                <h1 className="text-center text-xl font-extrabold text-gray-900 tracking-tight">
                    YouTube以外のページです
                </h1>
                <p className="mt-3 text-center text-sm text-muted-foreground">
                    この拡張機能は
                    <span className="underline underline-offset-2">
                        YouTube の 視聴ページ や Shorts
                    </span>
                    で
                    <span className="underline underline-offset-2">
                        サムネイルを表示
                    </span>
                    します。
                    <br />
                    今はYouTube以外のページです。YouTubeの視聴ページで開き直してください。
                </p>
                <div className="mt-4 w-full rounded-md bg-gray-50 px-4 py-2 text-center text-xs text-gray-700 ring-1 ring-gray-200">
                    YouTubeの視聴ページで開くと、その動画のサムネイルが表示されます。
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultContent;
