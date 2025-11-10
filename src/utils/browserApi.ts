/**
 * Browser APIの型定義
 * DRY原則に基づき、型定義を共通化
 */

export type BrowserAPI = {
    tabs: {
        create: (createProperties: { url: string }) => Promise<void>;
        query: (queryInfo: {
            active?: boolean;
            currentWindow?: boolean;
            windowId?: number;
            url?: string | string[];
        }) => Promise<Array<{ url?: string }>>;
    };
    runtime: {
        getURL: (path: string) => string;
        id: string;
        sendMessage: (message: any) => Promise<any>;
        onMessage: {
            addListener: (callback: (message: any) => void) => void;
        };
        onInstalled: {
            addListener: (
                callback: (details: {
                    reason:
                        | "install"
                        | "update"
                        | "chrome_update"
                        | "shared_module_update";
                    previousVersion?: string;
                }) => void
            ) => void;
        };
        setUninstallURL: (url: string) => Promise<void>;
    };
    storage: {
        local: {
            get: (
                keys?: string | string[] | { [key: string]: any } | null
            ) => Promise<{ [key: string]: any }>;
            set: (items: { [key: string]: any }) => Promise<void>;
        };
    };
    i18n: {
        getMessage: (
            messageName: string,
            substitutions?: string | string[]
        ) => string;
        getUILanguage: () => string;
    };
};

declare global {
    const browser: BrowserAPI;
}
