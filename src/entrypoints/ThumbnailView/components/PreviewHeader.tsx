import { i18n } from "#i18n";
import { ImageMeta } from "../types";

type PreviewHeaderProps = {
    selected: ImageMeta | null;
    youtubeUrl: string;
    onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function PreviewHeader({ selected, youtubeUrl, onLinkClick }: PreviewHeaderProps) {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center space-x-4 overflow-x-auto">
                {selected && (
                    <>
                        <div className="flex-shrink-0">
                            <span className="text-xs font-medium text-gray-500 uppercase">
                                {i18n.t("dimensions")}
                            </span>
                            <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                {selected.width} x {selected.height} px
                            </p>
                        </div>
                        <div className="h-8 w-px bg-gray-200 mx-2" />
                    </>
                )}
                <div className="flex-shrink-0">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                        {i18n.t("youtubeLink")}
                    </span>
                    <a
                        href={youtubeUrl}
                        onClick={onLinkClick}
                        className="block text-sm font-medium text-blue-600 hover:underline whitespace-nowrap"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {youtubeUrl}
                    </a>
                </div>
                {selected && (
                    <>
                        <div className="h-8 w-px bg-gray-200 mx-2" />
                        <div className="flex-shrink-0">
                            <span className="text-xs font-medium text-gray-500 uppercase">
                                {i18n.t("fileUrl")}
                            </span>
                            <a
                                href={selected.src}
                                target="_blank"
                                rel="noreferrer"
                                className="block text-sm font-medium text-blue-600 hover:underline whitespace-nowrap"
                            >
                                {selected.src}
                            </a>
                        </div>
                        <div className="h-8 w-px bg-gray-200 mx-2" />
                        <div className="flex-shrink-0">
                            <span className="text-xs font-medium text-gray-500 uppercase">
                                {i18n.t("download")}
                            </span>
                            <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                {i18n.t("rightClickInstruction")}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}
