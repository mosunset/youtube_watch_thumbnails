/**
 * ページタイプの判定ロジック
 * DRY原則に基づき、URL判定ロジックを共通化
 */

export type PageType = "shorts" | "watch" | "youtube" | "default";

/**
 * URLからページタイプを判定する
 * @param url - 判定対象のURL
 * @returns ページタイプ
 */
export function getPageTypeFromUrl(url: string): PageType {
    if (url.match(/youtube\.com\/shorts\//)) {
        return "shorts";
    } else if (url.match(/youtube\.com\/watch/)) {
        return "watch";
    } else if (url.match(/youtube\.com/)) {
        return "youtube";
    } else {
        return "default";
    }
}
