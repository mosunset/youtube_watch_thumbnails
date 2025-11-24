import { i18n } from "#i18n";

export default function LoadingScreen() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">{i18n.t("loading")}</p>
                </div>
            </div>
        </div>
    );
}
