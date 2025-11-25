---
title: Architecture
description: Overview of the extension's architecture.
---

## Design Philosophy

The extension is designed to be lightweight and unobtrusive. It injects a minimal amount of code into the YouTube page to retrieve and display thumbnails.

## Directory Structure

- `src/entrypoints/`: Entry points for the extension (background script, content scripts, popup).
- `src/components/`: Reusable React components.
- `src/utils/`: Utility functions.
- `src/assets/`: Static assets like icons.

## Data Flow

1. **Content Script**: Detects the video ID from the URL or page content.
2. **Background Script**: Listen for messages or events (if applicable).
3. **Popup/Overlay**: Displays the thumbnail using the retrieved ID.
