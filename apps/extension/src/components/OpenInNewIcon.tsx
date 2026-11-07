import type { SVGProps } from "react";

/** 「新しいタブで開く」アイコン（content script の SVG と同じ形） */
export default function OpenInNewIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
            {...props}
        >
            <path d="M14 3h7v7M21 3l-9 9" />
            <rect x={3} y={7} width={14} height={14} rx={2} />
        </svg>
    );
}
