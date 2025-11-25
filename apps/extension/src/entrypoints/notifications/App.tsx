import React, { useMemo } from "react";

type EventType = "install" | "update" | "";

function useQueryParams() {
    return useMemo(() => {
        const url = new URL(window.location.href);
        const eventParam = (url.searchParams.get("event") || "") as EventType;
        const from = url.searchParams.get("from") || "";
        return { event: eventParam, from };
    }, []);
}

function App() {
    const { event, from } = useQueryParams();

    return (
        <div className="max-w-3xl mx-auto my-10 p-6 font-sans leading-7">
            <h1 className="text-2xl mb-4">
                YouTube Watch Thumbnails からのお知らせ
            </h1>
            <p className="mb-6 text-gray-600">
                {event === "install" &&
                    "インストールありがとうございます！主な機能と使い方をご案内します。"}
                {event === "update" &&
                    `アップデートが完了しました${
                        from ? `（前のバージョン: v${from}）` : ""
                    }。変更点をご案内します。`}
                {event === "" && "お知らせページです。"}
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4 mb-6">
                {event === "install" && (
                    <>
                        <ul className="list-disc ml-5">
                            <li>
                                ポップアップから現在視聴中の動画のサムネイルを一覧表示
                            </li>
                            <li>
                                サムネイルをクリックすると「Thumbnail
                                View」タブで全サイズを確認
                            </li>
                            <li>
                                視聴ページでもサムネイルへのクイックアクセスを順次対応予定
                            </li>
                        </ul>
                        <p className="mt-3">
                            使い方: YouTube
                            で動画を開き、拡張機能アイコンをクリックしてください。
                        </p>
                    </>
                )}

                {event === "update" && (
                    <ul className="list-disc ml-5">
                        <li>安定性の改善と内部処理の最適化</li>
                        <li>
                            通知タブの追加（インストール/アップデート時に表示）
                        </li>
                    </ul>
                )}

                {event === "" && (
                    <ul className="list-disc ml-5">
                        <li>最新情報や変更点をここでご案内します。</li>
                    </ul>
                )}
            </div>

            <p className="mt-6 text-gray-600">
                {event === "install" ? (
                    <>
                        詳細は{" "}
                        <a
                            href="https://mosunset.com/blog/youtube-watch-thumbnails/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline hover:no-underline"
                        >
                            紹介ページ
                        </a>{" "}
                        をご覧ください。
                    </>
                ) : (
                    "ご利用ありがとうございます。引き続き改善を続けていきます。"
                )}
            </p>
        </div>
    );
}

export default App;
