function ShortsContent({ url }: { url: string }) {
    return (
        <div className="min-w-80 p-4">
            <h1 className="text-center text-xl font-semibold">
                YouTube Shorts
            </h1>
            <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                    URL:
                </p>
                <p className="text-xs break-all text-foreground bg-muted p-2 rounded">
                    {url || "読み込み中..."}
                </p>
            </div>
        </div>
    );
}

export default ShortsContent;
