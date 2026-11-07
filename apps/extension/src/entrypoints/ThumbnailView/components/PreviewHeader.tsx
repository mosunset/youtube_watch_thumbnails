import type { ReactNode } from "react";
import { i18n } from "#i18n";
import { cn } from "@/lib/utils";
import type { Thumbnail } from "@/utils/thumbnails";
import type { ImageSize } from "./PreviewImage";

type PreviewHeaderProps = {
    selected: Thumbnail;
    /** 読み込み前は null */
    size: ImageSize | null;
    youtubeUrl: string;
};

export default function PreviewHeader({ selected, size, youtubeUrl }: PreviewHeaderProps) {
    return (
        <header className="z-10 border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
            {/* 幅が足りないときはファイル URL だけを省略表示（…）にして、全項目を 1 行に収める */}
            <div className="flex min-w-0 items-center gap-4">
                <Field label={i18n.t("dimensions")}>
                    <p className="whitespace-nowrap text-sm font-medium text-gray-900">
                        {size ? `${size.width} x ${size.height} px` : "-"}
                    </p>
                </Field>
                <Divider />
                <Field label={i18n.t("youtubeLink")}>
                    <ExternalLink href={youtubeUrl} />
                </Field>
                <Divider />
                <Field label={i18n.t("fileUrl")} shrink>
                    <ExternalLink href={selected.src} />
                </Field>
                <Divider />
                <Field label={i18n.t("download")}>
                    <p className="whitespace-nowrap text-sm font-medium text-gray-700">
                        {i18n.t("rightClickInstruction")}
                    </p>
                </Field>
            </div>
        </header>
    );
}

function Field({ label, shrink = false, children }: { label: string; shrink?: boolean; children: ReactNode }) {
    return (
        <div className={shrink ? "min-w-0 flex-1" : "flex-shrink-0"}>
            <span className="text-xs font-medium text-gray-500">{label}</span>
            {children}
        </div>
    );
}

function Divider() {
    return <div className="h-8 w-px flex-shrink-0 bg-gray-200" />;
}

function ExternalLink({ href }: { href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            title={href}
            className={cn("block truncate text-sm font-medium text-blue-600 hover:underline")}
        >
            {href}
        </a>
    );
}
