import ywt from "@/assets/icon.png";
import { useAppConfig } from "#imports";
import { cn } from "@/lib/utils";

interface FooterProps {
    compact?: boolean;
}

function Footer({ compact = false }: FooterProps) {
    const config = useAppConfig();
    return (
        <footer
            className={cn(
                "mt-6 text-xs text-muted-foreground border-t border-gray-200 pt-2 pb-2",
                compact && "mt-0"
            )}
        >
            <div className="flex items-center justify-center gap-2">
                <img
                    src={ywt}
                    alt="YoutubeWatchThumbnails"
                    className="h-4 w-4 rounded-sm"
                />
                <span className="font-medium text-foreground">
                    Youtube Watch Thumbnails
                </span>
            </div>
            <div className="mt-1 text-center">
                <span>© 2025 mosunset.</span>
                <span className="mx-2">·</span>
                <a
                    href={config.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-2 hover:underline"
                >
                    GitHub
                </a>
                <span className="mx-2">·</span>
                <a
                    href={config.homepageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-2 hover:underline"
                >
                    HomePage
                </a>
            </div>
        </footer>
    );
}

export default Footer;
