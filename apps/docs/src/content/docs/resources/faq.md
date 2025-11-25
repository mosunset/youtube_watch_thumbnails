---
title: Frequently Asked Questions (FAQ)
---

## General Questions

### Q: Is this extension free?

Yes, it's completely free. It's published as an open-source project.

### Q: Which browsers are supported?

The following browsers are supported:
- Google Chrome
- Microsoft Edge
- Brave
- Firefox (planned)
- Other Chromium-based browsers

### Q: Where is data stored?

Video IDs and settings are stored in your browser's local storage (`chrome.storage.local`). Nothing is sent to external servers.

### Q: Can I use it offline?

No, an internet connection is required as thumbnail information is fetched in real-time from YouTube's API. However, your settings are stored locally and will be preserved offline.

## Features

### Q: What thumbnail sizes can I download?

The following resolutions are available (varies by video):
- maxresdefault (1280x720 or 1920x1080)
- sddefault (640x480)
- hqdefault (480x360)
- mqdefault (320x180)
- default (120x90)

### Q: Can I get WebP format thumbnails?

Yes, if YouTube provides them, you can get thumbnails in both JPG and WebP formats.

### Q: Does it support YouTube Shorts?

Yes, it does. You can get thumbnails for Shorts using the same method as regular videos.

### Q: Can I use it on playlists or search results pages?

No, this extension only works on individual video playback pages.

## Privacy & Security

### Q: Are YouTube login credentials stored?

No, login credentials are never stored. The extension uses YouTube's public API to fetch thumbnail information.

### Q: Is data shared with third parties?

No, it's never shared. Thumbnails are fetched directly from YouTube and displayed in your browser.

### Q: Is usage data collected?

No, there's no analytics or tracking implemented.

## Troubleshooting

### Q: Some thumbnails aren't showing?

maxresdefault (maximum quality) is not available for all videos. If YouTube hasn't generated high-resolution thumbnails, only lower resolution thumbnails will be displayed.

### Q: The extension isn't working

1. Verify you're on a YouTube video playback page
2. Try restarting your browser
3. Try disabling and re-enabling the extension
4. If still not resolved, report it on [GitHub Issues](https://github.com/mosunset/youtube_watch_thumbnails/issues)

## Development & Contributing

### Q: Is it open source?

Yes, it's published under the MIT License. Visit the [GitHub repository](https://github.com/mosunset/youtube_watch_thumbnails).

### Q: Where can I request features or report bugs?

We accept them on [GitHub Issues](https://github.com/mosunset/youtube_watch_thumbnails/issues).

### Q: Can I contribute to development?

Absolutely! Pull requests are welcome. Visit the [GitHub repository](https://github.com/mosunset/youtube_watch_thumbnails).

### Q: What's the tech stack?

- WXT (Framework)
- React
- TypeScript
- Tailwind CSS

:::tip[Have more questions?]
If you can't find answers here, feel free to ask on [GitHub Discussions](https://github.com/mosunset/youtube_watch_thumbnails/discussions).
:::
