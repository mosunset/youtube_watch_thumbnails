import { defineAppConfig } from '#imports';

// Define types for your config
declare module 'wxt/utils/define-app-config' {
    export interface WxtAppConfig {
        repoUrl: string;
        homepageUrl: string;
        storageKey: string;
    }
}

export default defineAppConfig({
    repoUrl: 'https://github.com/mosunset/youtube_watch_thumbnails',
    homepageUrl: 'https://mosunset.com',
    storageKey: 'youtube_video_id',
});
