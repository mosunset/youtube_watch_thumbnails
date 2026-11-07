# Architecture

## Design Philosophy

The extension is designed to be lightweight and unobtrusive. It injects a minimal amount of code into the YouTube page to retrieve and display thumbnails, and it **stores no data**. The only permission is `tabs`.

## Directory Structure

```text
apps/extension/src/
├── entrypoints/
│   ├── background.ts             # Opens Thumbnail View tabs on request
│   ├── content/
│   │   ├── index.ts              # Inserts the thumbnail next to the channel icon
│   │   └── style.css             # Styles for the inserted thumbnail and tooltip
│   ├── popup/
│   │   ├── App.tsx               # Chooses what to show for the active tab
│   │   └── components/
│   │       ├── ThumbnailPreview.tsx   # Thumbnail on /watch and /shorts pages
│   │       └── UnsupportedPage.tsx    # Message for other pages
│   └── ThumbnailView/
│       ├── App.tsx               # Reads ?v= and shows every thumbnail
│       └── components/           # Sidebar, PreviewHeader, PreviewImage, NoVideoScreen
├── utils/
│   ├── youtube.ts                # extractVideoId, getPageType, buildYouTubeUrl
│   ├── thumbnails.ts             # THUMBNAIL_SOURCES, THUMBNAIL_NAMES, buildThumbnail, findBestThumbnail
│   ├── thumbnailView.ts          # Asks the background to open Thumbnail View
│   ├── messaging.ts              # Typed messaging (@webext-core/messaging)
│   └── __tests__/                # Vitest unit tests
├── components/                   # Footer.tsx, OpenInNewIcon.tsx
└── locales/                      # en.yml, ja.yml, ko.yml
```

## Data Flow

1. **Popup / Content Script**: Extract the video ID from the tab URL (`extractVideoId`). The popup shows the best thumbnail found by `findBestThumbnail`, which probes all candidates in parallel, picks the highest-priority real image, and rejects 120 × 90 placeholders.
2. When the user clicks the thumbnail, they send the message `openThumbnailView({ videoId })` to the **Background Script**.
3. The background script opens `ThumbnailView.html?v=VIDEO_ID` in a new tab.
4. **Thumbnail View** reads the video ID from the URL query. Nothing is stored and there is no polling, so each tab can show a different video and the page survives a reload.
