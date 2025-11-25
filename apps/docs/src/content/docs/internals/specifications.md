---
title: Specifications
---

## Common Features

- [x] Implement footer displaying copyright information, etc.
- [ ] i18n support

<details>
  <summary>Supported Languages</summary>

- [ ] ar Arabic
  - RTL
  - Medium (23)
- [ ] bg Bulgarian
  - Add
  - Minimal (1)
- [ ] bn Bengali
  - Large
- [ ] cs Czech
  - Add
  - Medium (11)
- [ ] da Danish
  - Add
  - Small (4)
- [ ] de German
  - Large (57)
- [ ] el Greek
  - Medium (7)
- [ ] en English
  - Max
- [ ] en_AU English (Australia)
  - Max
- [ ] en_GB English (UK)
  - Max (223)
- [ ] en_US English (US)
  - Max (1478)
- [ ] es Spanish
  - Large (138)
- [ ] es_419 Spanish (Latin America, Caribbean)
  - Large
- [ ] fa Persian
  - Add
  - RTL
  - Minimal (1)
- [ ] fil Filipino
  - Medium
- [ ] fi Finnish
  - Add
  - Minimal (1)
- [ ] fr French
  - Large (99)
- [ ] he Hebrew
  - Add
  - RTL
  - Medium (15)
- [ ] hi Hindi
  - Large
- [ ] hr Croatian
  - Add
  - Minimal (1)
- [ ] hu Hungarian
  - Add
  - Medium (18)
- [ ] id Indonesian
  - Medium (8)
- [ ] it Italian
  - Medium (22)
- [ ] ja Japanese
  - Max (7862)
- [ ] ko Korean
  - Large (78)
- [ ] ms Malay
  - Medium
- [ ] nl Dutch
  - Medium (9)
- [ ] no Norwegian
  - Add
  - Small (2)
- [ ] pl Polish
  - Large (58)
- [ ] pt_BR Portuguese (Brazil)
  - Large (123)
- [ ] pt_PT Portuguese (Portugal)
  - Medium (9)
- [ ] ru Russian
  - Large (168)
- [ ] sk Slovak
  - Add
  - Minimal (1)
- [ ] sv Swedish
  - Add
  - Small (4)
- [ ] th Thai
  - Medium (9)
- [ ] tr Turkish
  - Medium (30)
- [ ] uk Ukrainian
  - Add
  - Medium (12)
- [ ] vi Vietnamese
  - Large (61)
- [ ] zh_CN Chinese (China)
  - Large (40)
- [ ] zh_TW Chinese (Taiwan)
  - Large (56)

</details>

## Popup

The popup screen displayed when clicking the extension icon in the browser toolbar.

- [x] Display thumbnail of the video playing in the current tab
  - Video Watch Page (`/watch`): Display thumbnail image
  - Shorts Page (`/shorts`): Display Shorts thumbnail
  - Other YouTube Pages: Display appropriate message
  - Non-YouTube Pages: Display message indicating page is not supported
- [x] Clicking the thumbnail opens the Thumbnail View page in a new tab
- [ ] Display link to settings

## Content Script

Main script executed on YouTube video pages. Dynamically inserts thumbnail images into the video page.

- [ ] Display thumbnail of the playing video to the left of the uploader icon
  - Automatically detect video ID and fetch appropriate thumbnail
  - Image size: Height 64px (maintain aspect ratio)
  - DOM insertion position: Inside `div#owner.item.style-scope.ytd-watch-metadata`
  - Target pages: `www.youtube.com`, `m.youtube.com`, `youtube.com` and subdomains
  - Video ID extraction: Auto-extract from URL patterns (`/watch?v=`, `/shorts/`, etc.)
  - [x] watch
  - [ ] shorts
- [ ] Zoom in on thumbnail hover
  - Display at 200% of original size next to the icon
  - Zoomed image is positioned relative to original, maintaining layout
  - Smooth transition effect
  - [x] watch
  - [ ] shorts
- [ ] Display high-resolution zoomed image in modal dialog, etc.
  - Inspired by Hover Zoom+
  - [ ] watch
  - [ ] shorts
- [ ] Clicking the thumbnail opens the Thumbnail View page
  - [x] watch
  - [ ] shorts

## Thumbnail View

Independent tab page dedicated to the extension. Lists all thumbnail image sizes for the viewed video.

- [x] Display list of thumbnails for the viewed video
  - Display all available thumbnail image sizes
  - Support both WebP and JPG formats
  - Display image size (Width x Height)
  - Organize images in a grid layout
  - Support mobile view
- [x] Clicking an image from the list displays detailed image information

## Options

Extension settings screen. Allows users to customize behavior.

- [ ] Select hover display method in Content Script
  - Display at 200% of original size next to the icon
    - Configurable zoom level
  - Display high-resolution zoomed image in modal dialog, etc.
<!-- - [ ] Enable/Disable thumbnail display -->
<!-- - [ ] Configure thumbnail image size -->
<!-- - [ ] Adjust display position -->

## Notification Tab

Notification tab displayed upon extension installation, update, or removal.

- [x] Display notification on installation
  - Introduce main features and usage guide
- [x] Notify of new features and changes on update
  - Clearly explain changes and improvements
- [x] Display notification on removal
  - Display message such as "Thank you for using", etc.

## 📸 YouTube Thumbnail Image URL

YouTube thumbnail images can be retrieved using the following URL patterns.

### 🌐 Domain

The primary domain is `i.ytimg.com`.

```text
https://i.ytimg.com/vi_webp/<video_id>/<image_file_name>.webp
https://i.ytimg.com/vi/<video_id>/<image_file_name>.jpg
https://img.youtube.com/vi_webp/<video_id>/<image_file_name>.webp
https://img.youtube.com/vi/<video_id>/<image_file_name>.jpg
```

### 📁 Image Filenames

#### Regular Thumbnails

- `maxresdefault.webp` - Maximum Resolution (usually largest available)
- `hq720.webp` - High Quality 720p
- `sddefault.webp` - Standard Definition
- `hqdefault.webp` - High Quality Default
- `mqdefault.webp` - Medium Quality Default
- `default.webp` - Default Size
- `0.webp` - Alternative Format

#### Video Frames (3 splits)

- `sd1.webp`, `sd2.webp`, `sd3.webp` - Standard Definition (Start, Middle, End frames)
- `hq1.webp`, `hq2.webp`, `hq3.webp` - High Quality (Start, Middle, End frames)
- `mq1.webp`, `mq2.webp`, `mq3.webp` - Medium Quality (Start, Middle, End frames)
- `1.webp`, `2.webp`, `3.webp` - Default Size (Start, Middle, End frames)

### 📏 Image Sizes

| Filename | Size (Width x Height) | Description |
|-----------|-------------------|------|
| `default` | 120 × 90 | Minimum Size |
| `mqdefault` | 320 × 180 | Medium Quality |
| `hqdefault` | 480 × 360 | High Quality |
| `sddefault` | 640 × 480 | Standard Definition |
| `maxresdefault` | 1280 × 720 | Maximum Resolution (HD) |
| `0` | 480 × 360 | Alternative High Quality |
| `1`, `2`, `3` | 120 × 90 | Start, Middle, End frames |

> **Note**: If a thumbnail does not exist for a specific size, the default size (120 × 90) is returned.
