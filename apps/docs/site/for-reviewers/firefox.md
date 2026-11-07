# For Firefox Reviewers

## Permissions

- `tabs`: Used by the popup to read the URL of the active tab and extract the YouTube video ID. This is the only permission requested.

The content script runs only on `*.youtube.com` pages (declared via `content_scripts` matches), so no `scripting` or `activeTab` permission is needed.

## Data Privacy

- The extension **does not** collect or transmit any user data to external servers.
- All processing happens locally within the browser.
- **No data is stored.** The extension does not use `storage`, cookies, or any other persistence. The video ID is passed to the Thumbnail View tab via its URL query (`ThumbnailView.html?v=VIDEO_ID`).
- Thumbnail images are loaded directly from `i.ytimg.com` / `img.youtube.com`.

## Security

- Content Security Policy (CSP) is strictly enforced.
- No remote code execution.
