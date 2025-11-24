# Troubleshooting

## Thumbnails Not Displaying

### Causes and Solutions

#### Not on a YouTube Video Page
- The extension only works on YouTube video playback pages
- It will not work on the homepage or channel pages

#### Video Not Loaded
- Wait for the page to fully load
- Try refreshing the page

#### Insufficient Extension Permissions
1. Open `chrome://extensions/` (Chrome) or `about:addons` (Firefox)
2. Find YouTube Watch Thumbnails
3. Click **Details**
4. Verify all permissions are enabled

## Some Thumbnails Not Showing

### maxresdefault Not Available

- maxresdefault (maximum quality) is not available for all videos
- YouTube may not generate high-resolution thumbnails for some videos
- Use lower resolution thumbnails (hqdefault, etc.)

### WebP Format Not Available

- Some videos may not provide WebP format thumbnails
- Use JPG format instead

## Popup Not Opening

### Things to Check

- Verify you're playing a video on a YouTube video page
- Try restarting your browser
- Disable and then re-enable the extension

## Cannot Download

### Unable to Save Image

- Select **Save image as** from the right-click menu
- Or, click the image to open in a new tab and save from there
- Check if downloads are allowed in your browser settings

## Not Working with YouTube Shorts

### Solutions

- Wait for the Short to fully load on the Shorts page
- Try refreshing the page
- Try the same operation as regular videos (click toolbar icon)

## Still Not Resolved?

Try these methods:

1. **Restart Extension**: Disable and then re-enable the extension
2. **Restart Browser**: Completely close and reopen your browser
3. **Reinstall Extension**: Uninstall and reinstall the latest version
4. **Clear Browser Cache**: Delete cache from browser settings

::: tip Support
If the above doesn't resolve your issue, please report it on [GitHub Issues](https://github.com/mosunset/youtube_watch_thumbnails/issues). Include:
- Browser and version you're using
- URL of the video where the issue occurred
- Error message (if any)
:::
