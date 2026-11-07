import type { ReactNode } from "react";
import { i18n } from "#i18n";
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
        <header className="z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
            <div className="flex items-center space-x-4 overflow-x-auto">
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
                <Field label={i18n.t("fileUrl")}>
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

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex-shrink-0">
            <span className="text-xs font-medium uppercase text-gray-500">{label}</span>
            {children}
        </div>
    );
}

function Divider() {
    return <div className="mx-2 h-8 w-px bg-gray-200" />;
}

function ExternalLink({ href }: { href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="block whitespace-nowrap text-sm font-medium text-blue-600 hover:underline"
        >
            {href}
        </a>
    );
}
