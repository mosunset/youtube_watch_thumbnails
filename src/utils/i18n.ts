/**
 * i18n ユーティリティ関数
 * ブラウザ拡張機能の国際化対応
 */

/**
 * 文字列翻訳関数
 * chrome.i18n.getMessage() のラッパー
 * @param messageName - メッセージ名（messages.json のキー）
 * @param substitutions - 置換文字列（オプション）
 * @returns 翻訳された文字列
 */
export function t(messageName: string, ...substitutions: string[]): string {
    if (typeof browser !== "undefined" && browser.i18n) {
        return browser.i18n.getMessage(messageName, substitutions);
    }
    // フォールバック: browser APIが利用できない場合
    if (typeof chrome !== "undefined" && chrome.i18n) {
        return chrome.i18n.getMessage(messageName, substitutions);
    }
    // フォールバック: どちらも利用できない場合
    return messageName;
}

/**
 * 現在のUI言語を取得する関数
 * @returns 言語コード（例: "ja", "en", "en-US"）
 */
export function lan(): string {
    if (typeof browser !== "undefined" && browser.i18n) {
        return browser.i18n.getUILanguage();
    }
    // フォールバック: browser APIが利用できない場合
    if (typeof chrome !== "undefined" && chrome.i18n) {
        return chrome.i18n.getUILanguage();
    }
    // フォールバック: ブラウザの言語設定を取得
    if (typeof navigator !== "undefined") {
        return navigator.language || navigator.languages?.[0] || "en";
    }
    // 最終フォールバック
    return "en";
}
