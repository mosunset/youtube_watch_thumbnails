---
title: For Firefox Reviewers
description: Information required for Firefox Add-on review.
---

## Permissions

- `storage`: Used to save user preferences (e.g., thumbnail quality settings).
- `activeTab`: Used to access the current tab's URL to extract the video ID.
- `scripting`: Used to inject content scripts.

## Data Privacy

- The extension **does not** collect or transmit any user data to external servers.
- All processing happens locally within the browser.
- Settings are stored in local storage.

## Security

- Content Security Policy (CSP) is strictly enforced.
- No remote code execution.
