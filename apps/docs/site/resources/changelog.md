# Changelog

This page contains the change history for YouTube Watch Thumbnails.

For detailed changelog, see [CHANGELOG.md on GitHub](https://github.com/mosunset/youtube_watch_thumbnails/blob/main/CHANGELOG.md).

## Unreleased

### 🔒 Privacy

- Removed the `storage` permission. The only permission is now `tabs`, and the extension stores no data at all (no settings, no video ID history)

### ✨ Improvements

- Thumbnail View receives the video ID in its URL (`ThumbnailView.html?v=VIDEO_ID`), so you can open several videos in separate tabs and reload them
- The popup and the on-page tooltip are now localized (English / Japanese / Korean)
- The popup picks the best thumbnail faster by checking all candidates in parallel

### 🛠️ Development

- Documentation site moved from Astro Starlight to docsify
- Added ESLint and Vitest unit tests
- Added Playwright E2E tests that load the built extension into Chromium
- Updated WXT to v0.21 (Vite 8) and @webext-core/messaging to v4
- Removed the unused options and notifications pages

## v4.0.0 (2025-11-25)

### ✨ New Features

- One-click thumbnail display from toolbar icon
- Direct thumbnail display on YouTube video pages
- Thumbnail View showing all resolutions and formats
- Support from maximum quality (maxresdefault) to low quality
- Support for both JPG and WebP formats
- YouTube Shorts thumbnail support

### 🎨 UI/UX

- Simple and intuitive popup design
- Fast thumbnail loading
- One-click download capability

### 🔒 Privacy

- No data storage design
- Real-time processing only
- Open source code publication

### 🌐 Supported Browsers

- Google Chrome
- Microsoft Edge
- Brave
- Other Chromium-based browsers
- Firefox (planned)

---

## Roadmap

Planned features:

- [ ] Official Firefox support
- [ ] Batch thumbnail download
- [ ] Custom thumbnail size specification
- [ ] Enhanced thumbnail preview features

---

> [!TIP|label:Feedback]
> Feel free to submit feature requests and bug reports on [GitHub Issues](https://github.com/mosunset/youtube_watch_thumbnails/issues).
