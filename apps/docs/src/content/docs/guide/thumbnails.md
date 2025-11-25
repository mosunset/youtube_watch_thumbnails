---
title: Thumbnails
description: Understanding thumbnail types and display logic.
---

## Thumbnail Types

The extension attempts to retrieve the highest quality thumbnail available for each video. Here are the types of thumbnails you might see:

- **maxresdefault**: Maximum Resolution (1280x720 or 1920x1080). This is the highest quality available.
- **sddefault**: Standard Definition (640x480).
- **hqdefault**: High Quality (480x360).
- **mqdefault**: Medium Quality (320x180).
- **default**: Default (120x90).

## Display Locations

Thumbnails are displayed in various locations on YouTube:

- **Home Page**: Next to video titles.
- **Search Results**: Next to video descriptions.
- **Related Videos**: In the sidebar next to related videos.
- **Watch Page**: Next to the channel icon or title.

## Retrieval Logic

The extension uses a fallback mechanism to ensure a thumbnail is always displayed:

1. It first attempts to load `maxresdefault`.
2. If `maxresdefault` returns a 404 error (not found), it falls back to `sddefault`.
3. If `sddefault` fails, it tries `hqdefault`, and so on.

## YouTube Limitations

Please note that not all videos have a `maxresdefault` thumbnail. This depends on the quality of the uploaded video and whether the uploader provided a custom thumbnail.
