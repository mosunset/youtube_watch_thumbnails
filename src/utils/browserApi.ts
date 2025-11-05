/**
 * Browser APIの型定義
 * DRY原則に基づき、型定義を共通化
 */

export type BrowserAPI = {
    tabs: {
        create: (createProperties: { url: string }) => Promise<void>;
    };
    runtime: {
        getURL: (path: string) => string;
        id: string;
        sendMessage: (message: any) => Promise<any>;
        onMessage: {
            addListener: (callback: (message: any) => void) => void;
        };
    };
    storage: {
        local: {
            get: (
                keys?: string | string[] | { [key: string]: any } | null
            ) => Promise<{ [key: string]: any }>;
            set: (items: { [key: string]: any }) => Promise<void>;
        };
    };
};

declare global {
    const browser: BrowserAPI;
}
