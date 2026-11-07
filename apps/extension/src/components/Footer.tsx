import icon from "@/assets/icon.png";
import { getAppConfig } from "#imports";
import { cn } from "@/lib/utils";

interface FooterProps {
    compact?: boolean;
}

/** 公開した年。今年と違えば「2025–今年」と表示する */
const FIRST_YEAR = 2025;

function copyrightYears(): string {
    const year = new Date().getFullYear();
    return year > FIRST_YEAR ? `${FIRST_YEAR}–${year}` : String(FIRST_YEAR);
}

function Footer({ compact = false }: FooterProps) {
    const config = getAppConfig();
    return (
        <footer
            className={cn(
                "mt-6 text-xs text-muted-foreground border-t border-gray-200 pt-2 pb-2",
                compact && "mt-0"
            )}
        >
            <div className="flex items-center justify-center gap-2">
                <img
                    src={icon}
                    alt=""
                    className="h-4 w-4 rounded-sm"
                />
                <span className="font-medium text-foreground">
                    YouTube Watch Thumbnails
                </span>
            </div>
            <div className="mt-1 text-center">
                <span>© {copyrightYears()} mosunset.</span>
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
