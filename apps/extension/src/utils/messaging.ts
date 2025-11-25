import { defineExtensionMessaging } from "@webext-core/messaging";

interface ProtocolMap {
    openThumbnailView(data: undefined): void;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
