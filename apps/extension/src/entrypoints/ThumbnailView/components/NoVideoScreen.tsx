import { i18n } from "#i18n";

export default function NoVideoScreen() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">
                        YouTube URL
                    </h1>
                    <div className="bg-gray-50 rounded-md p-4">
                        <p className="text-gray-600">
                            {i18n.t("videoIdNotFound")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
