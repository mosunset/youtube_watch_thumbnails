import { storage } from "@wxt-dev/storage";

/**
 * 現在視聴中のYouTube動画ID
 *
 * ストレージキー: `local:youtube_video_id`
 *
 * @example
 * ```ts
 * // 値を取得
 * const videoId = await videoIdStorage.getValue();
 *
 * // 値を設定
 * await videoIdStorage.setValue("dQw4w9WgXcQ");
 *
 * // 値を削除
 * await videoIdStorage.removeValue();
 *
 * // 変更を監視
 * const unwatch = videoIdStorage.watch((newId, oldId) => {
 *   console.log(`Video changed: ${oldId} -> ${newId}`);
 * });
 * ```
 */
export const videoIdStorage = storage.defineItem<string | null>(
  "local:youtube_video_id",
  {
    fallback: null, // デフォルト値: null
  }
);

/**
 * サムネイルホバー時の動作設定
 *
 * ストレージキー: `local:thumbnail_hover_behavior`
 *
 * - `magnify`: サムネイルを拡大表示（デフォルト）
 * - `modal`: モーダルで表示
 *
 * @example
 * ```ts
 * // 現在の設定を取得
 * const behavior = await thumbnailHoverBehavior.getValue();
 *
 * // 設定を変更
 * await thumbnailHoverBehavior.setValue('modal');
 * ```
 */
export const thumbnailHoverBehavior = storage.defineItem<'magnify' | 'modal'>(
  "local:thumbnail_hover_behavior",
  {
    fallback: 'magnify',
  }
);

/**
 * デバッグモード設定
 *
 * ストレージキー: `local:debug_mode`
 *
 * デバッグ情報の表示を制御します。
 *
 * @example
 * ```ts
 * // デバッグモードを有効化
 * await debugMode.setValue(true);
 *
 * // 現在の状態を確認
 * const isDebug = await debugMode.getValue();
 * ```
 */
export const debugMode = storage.defineItem<boolean>(
  "local:debug_mode",
  {
    fallback: false,
  }
);
