# Manual Testing

The automated tests (Playwright E2E) run only in Chromium, against a fake YouTube page.
This page covers **what the automated tests cannot check**, by hand:

- Behaviour on the real YouTube (layout changes, dark theme, theater mode, and so on)
- Firefox
- English, Japanese and Korean UI text
- Permissions shown on install and update

## Getting a test build

You do not need a build environment. CI builds test zips for every pull request and every push to main.

1. On GitHub, open the **Actions** tab and the **CI** run for the pull request (or commit)
2. Under **Artifacts** at the bottom of the page, download `extension-<commit>` and unzip it
3. Use the `*-chrome.zip` / `*-firefox.zip` inside

### Load into Chrome

1. Unzip `*-chrome.zip`
2. Open `chrome://extensions/` and turn on **Developer mode** (top right)
3. Click **Load unpacked** and choose the unzipped folder

### Load into Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on** and choose `*-firefox.zip` (no need to unzip)

> [!NOTE]
> Temporary add-ons in Firefox are removed when Firefox restarts.

## Recording results

- Tick the items you checked in the "Manual testing" checklist of the pull request description, and note your environment (OS and browser version).
- If you find a problem, open an Issue with the item ID (e.g. `C-3`), the steps, the expected result, the actual result and a screenshot.
- While testing, also watch the browser's developer tools **console for errors from the extension**.

## Environments

At minimum, run every item in both:

| Environment | Notes |
| :--- | :--- |
| Chrome (latest) | |
| Firefox (latest) | Not covered by automated tests, so especially important |

If you have time, also try Edge, Brave and Firefox ESR.

## Checklist

### A. Install and permissions

| ID | Steps | Expected result |
| :--- | :--- | :--- |
| A-1 | Load the extension fresh | Loads without errors. The icon appears in the toolbar |
| A-2 | Look at the permissions on the extension's details page | Only "tabs (read browsing history)" and access to YouTube sites. No "storage" |
| A-3 | With the store version (v4.0.1) installed, update to the test build (Chrome: overwrite the same folder → reload) | No new permission prompt. Everything still works after the update |

### B. Thumbnail on the watch page (real YouTube)

| ID | Steps | Expected result |
| :--- | :--- | :--- |
| B-1 | Open a normal video's watch page (`youtube.com/watch?v=...`) | A thumbnail appears to the left of the channel icon. The layout is not broken |
| B-2 | Hover over the thumbnail | It scales up 1.75× and "View all thumbnail sizes" appears above it. Nothing around it moves |
| B-3 | Click the thumbnail | Thumbnail View opens in a new tab for that video |
| B-4 | Click a related video to move to another video (no page reload) | The thumbnail changes to the new video. Two thumbnails never appear side by side |
| B-5 | Go back and forward between videos with the browser buttons | The thumbnail always matches the video |
| B-6 | Open an old video (e.g. before 2010, with no high-resolution thumbnail) | The video's image appears, not the grey placeholder (low quality is fine) |
| B-7 | Switch YouTube to the dark theme and repeat B-1 / B-2 | Looks fine |
| B-8 | Toggle theater mode and fullscreen | The thumbnail and the video player are not broken |
| B-9 | Open a live stream or premiere watch page | A thumbnail appears. No errors |
| B-10 | Open the home page, search results and a channel page | No thumbnail is inserted. No errors |
| B-11 | Use a watch page for about 10 minutes (scroll, open comments, move between related videos) | No slowdown |

### C. Popup

| ID | Steps | Expected result |
| :--- | :--- | :--- |
| C-1 | Click the toolbar icon on a watch page | The largest thumbnail of that video appears |
| C-2 | Click the image from C-1 | Thumbnail View opens in a new tab |
| C-3 | Open it on Shorts (`youtube.com/shorts/...`) | That Short's thumbnail appears. Clicking opens Thumbnail View |
| C-4 | Open it on the YouTube home page | The "This page is not supported" message appears |
| C-5 | Open it on another site, a new tab, `chrome://extensions` / `about:addons` | The "This is not a YouTube page" message appears |
| C-6 | Switch videos, then open it again | It shows the new video's thumbnail |

### D. Thumbnail View

| ID | Steps | Expected result |
| :--- | :--- | :--- |
| D-1 | Open it from B-3 or C-2 | maxresdefault.webp is selected first; image size, YouTube link and file URL are shown |
| D-2 | Pick another image in the list on the left | The preview and the information at the top change |
| D-3 | Right-click the preview and "Save image as" | The image can be saved |
| D-4 | Click the YouTube link and the file URL | Each opens in a new tab |
| D-5 | Open a second Thumbnail View for another video, then reload both tabs | Each tab keeps its own video |
| D-6 | Look at images that do not exist (e.g. maxresdefault of an old video) | Even if they show as blank or broken in the list, the rest of the page works |
| D-7 | Make the window narrow and wide | The list and the preview stay usable |

### E. UI language

Change the browser's display language and restart the browser before checking.

| ID | Steps | Expected result |
| :--- | :--- | :--- |
| E-1 | In English, look at B-2, C-1, C-4, C-5 and D-1 | Everything is in English. No text is cut off or overflowing |
| E-2 | Same items in Japanese | Everything is in Japanese |
| E-3 | Same items in Korean | Everything is in Korean |
| E-4 | Any other language (e.g. French) | Shown in English |

### F. Firefox only

| ID | Steps | Expected result |
| :--- | :--- | :--- |
| F-1 | Do B-1 to B-5 in Firefox | Same as Chrome, especially **B-3 (click opens Thumbnail View)** |
| F-2 | Do C-1 to C-3 in Firefox | Same as Chrome |
| F-3 | Open **Inspect** for the extension in `about:debugging`, then do B-3 and C-2 | No errors in the console |
