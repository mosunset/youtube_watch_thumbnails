import { STORAGE_KEY } from "@/constants";



/**
 * storage.local からデータを取得する
 * @param keys - 取得したいキー（単一の文字列、文字列の配列、またはデフォルト値を持つオブジェクト）。nullの場合は全データを取得。
 * @returns 取得したデータを含むオブジェクト
 */
export async function getStorage(
  keys?: string | string[] | { [key: string]: any } | null
): Promise<{ [key: string]: any }> {
  return await browser.storage.local.get(keys);
}

/**
 * storage.local にデータを保存する
 * @param items - 保存したいキーと値のペアを持つオブジェクト
 */
export async function setStorage(items: { [key: string]: any }): Promise<void> {
  await browser.storage.local.set(items);
}

/**
 * storage から動画IDを取得する
 * @returns 動画ID、または存在しない場合は undefined
 */
export async function getVideoId(): Promise<string | undefined> {
  const data = await getStorage(STORAGE_KEY);
  return data[STORAGE_KEY];
}

/**
 * storage に動画IDを保存する
 * @param videoId - 保存する動画ID
 */
export async function setVideoId(videoId: string): Promise<void> {
  await setStorage({ [STORAGE_KEY]: videoId });
}
