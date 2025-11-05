chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "ThumbnailView") {
        ThumbnailView();
    }
});


function ThumbnailView() {
    chrome.tabs.create({ url: "ThumbnailView.html" });
}
