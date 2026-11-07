import { defineAppConfig } from "#imports";

declare module "wxt/utils/define-app-config" {
    export interface WxtAppConfig {
        repoUrl: string;
        homepageUrl: string;
    }
}

export default defineAppConfig({
    repoUrl: "https://github.com/mosunset/youtube_watch_thumbnails",
    homepageUrl: "https://mosunset.com",
});
