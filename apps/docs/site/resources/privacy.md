# Privacy Policy

Last Updated: November 7, 2026

## About Data Collection

YouTube Watch Thumbnails (the "Extension") is designed with user privacy as the top priority.

### Data We Collect and Store

**This extension does not store any data.**

It does not use `chrome.storage` / `browser.storage`, cookies, or any other browser storage. There are no settings and no history. The video ID being viewed is passed only in the Thumbnail View tab's URL (`ThumbnailView.html?v=VIDEO_ID`) and is gone when the tab is closed.

- **No external server transmission**: Never sent to external servers
- **No persistence**: Nothing is written to your device
- **Third-party access**: Impossible

### Data We Don't Collect

This extension does NOT collect or store:

- Login credentials or passwords
- Browsing history (on YouTube or elsewhere)
- Personally identifiable information (name, email address, etc.)
- Usage statistics or analytics

## How Information Is Used

The extension reads the URL of the current YouTube tab only to extract the video ID, and uses it in memory to build thumbnail image URLs.

Thumbnail images are loaded directly from YouTube's public image servers (`i.ytimg.com` / `img.youtube.com`) and displayed in your browser.

## Data Sharing

**This extension does not share any data with third parties.** Because nothing is stored, there is nothing to share.

## Data Deletion

There is no stored data to delete. Closing the Thumbnail View tab or uninstalling the extension leaves nothing behind.

## About Permissions

Permissions requested by the Extension and their purposes:

| Permission | Reason |
|------------|--------|
| `tabs` | To read the URL of the active tab in the popup and extract the YouTube video ID |

## Security

The Extension implements the following security measures:

- All communication uses HTTPS (encrypted communication) only
- External communication is limited to YouTube's public API only
- Published as open source to ensure code transparency

## Children's Privacy

The Extension is not directed at children under 13. It does not collect personal data from anyone, regardless of age.

## Change Notifications

If we change this Privacy Policy, we will notify users via extension updates.

## Contact

For privacy-related questions, please contact us at:

- GitHub Issues: [https://github.com/mosunset/youtube_watch_thumbnails/issues](https://github.com/mosunset/youtube_watch_thumbnails/issues)

---

> [!TIP|label:Transparency]
> The Extension is published as open source on [GitHub](https://github.com/mosunset/youtube_watch_thumbnails). You can freely review the code.
