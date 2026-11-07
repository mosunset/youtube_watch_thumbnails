import { defineExtensionMessaging } from "@webext-core/messaging";

interface ProtocolMap {
    /** 指定した動画の ThumbnailView を新しいタブで開く */
    openThumbnailView(data: { videoId: string }): void;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
