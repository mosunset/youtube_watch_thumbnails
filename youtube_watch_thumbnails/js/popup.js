function getWatchV(url) {
    var regex = new RegExp("[?&]" + "v" + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function get_thumbnail(url) {
    var full_url = `https://i.ytimg.com/vi/${url}/`
    const def = new Image(), mq = new Image(), hq = new Image(), sd = new Image(), max = new Image();
    let default_img_size = [[120, 90], [320, 180], [480, 360], [640, 480], [1280, 720]]
    var img_select = 0;
    var yw = document.getElementById("popup");
    def.src = `${full_url}default.jpg`
    def.onload = () => {
        if (def.width == default_img_size[0][0] && def.height == default_img_size[0][1]) {
            if (img_select < 0) {
                img_select = 0;
                yw.src = def.src;
                hidden_error_message()
            }
        }
    }
    mq.src = `${full_url}mqdefault.jpg`
    mq.onload = () => {
        if (mq.width == default_img_size[1][0] && mq.height == default_img_size[1][1]) {
            if (img_select < 1) {
                img_select = 1;
                yw.src = mq.src;
                hidden_error_message()
            }
        }
    }
    hq.src = `${full_url}hqdefault.jpg`
    hq.onload = () => {
        if (hq.width == default_img_size[2][0] && hq.height == default_img_size[2][1]) {
            if (img_select < 2) {
                img_select = 2;
                yw.src = hq.src;
                hidden_error_message()
            }
        }
    }
    sd.src = `${full_url}sddefault.jpg`
    sd.onload = () => {
        if (sd.width == default_img_size[3][0] && sd.height == default_img_size[3][1]) {
            if (img_select < 3) {
                img_select = 3;
                yw.src = sd.src;
                hidden_error_message()
            }
        }
    }
    max.src = `${full_url}maxresdefault.jpg`
    max.onload = () => {
        if (max.width == default_img_size[4][0] && max.height == default_img_size[4][1]) {
            if (img_select < 4) {
                img_select = 4;
                yw.src = max.src;
                hidden_error_message()
            }
        }
    }
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
        window.open(e.target.src)
    }
}, false);

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const { url } = tabs[0];
    get_thumbnail(getWatchV(url));
});

document.getElementById("err_msg").innerText = chrome.i18n.getMessage("ErrMsg");
document.getElementById("popup").title = chrome.i18n.getMessage("ImgTitle");