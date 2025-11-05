function get_thumbnail(url) {
    var yw = document.getElementById("popup");
    chrome.storage.local.get(["max_img_url"]).then((result) => {
        yw.src = result.max_img_url
    });
    hidden_error_message();
}

function hidden_error_message() {
    document.getElementById("error").style.display = "none";
    document.getElementById("popup").style.display = "block";
}

function link() {
    var link = document.getElementById("popup").src
    window.open(link, "_blank")
}


document.addEventListener('click', function (e) {
    if (e.target.id == 'popup') {
        chrome.runtime.sendMessage({ action: "ThumbnailView", data: "" });
    }
}, false);

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const { url } = tabs[0];
    get_thumbnail();
});

document.getElementById("err_msg").innerText = chrome.i18n.getMessage("ErrMsg");
document.getElementById("popup").title = chrome.i18n.getMessage("ImgTitle");
