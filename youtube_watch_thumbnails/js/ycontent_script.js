const getWatchV = () => {
    var url = window.location.href;
    var regex = new RegExp("[?&]" + "v" + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function get_thumbnail(url) {
    var full_url_jpg = `https://i.ytimg.com/vi/${url}/`
    const def = new Image(), mq = new Image(), hq = new Image(), sd = new Image(), max = new Image();
    let default_img_size = [[120, 90], [320, 180], [480, 360], [640, 480], [1280, 720]]
    var img_select = 0;
    var yw = document.getElementById("youtube_watch_thumbnail");
    def.src = `${full_url_jpg}default.jpg`
    def.onload = () => {
        if (def.width == default_img_size[0][0] && def.height == default_img_size[0][1]) {
            if (img_select < 0) {
                img_select = 0;
                yw.src = def.src;
                setvalue();
            }
        }
    }
    mq.src = `${full_url_jpg}mqdefault.jpg`
    mq.onload = () => {
        if (mq.width == default_img_size[1][0] && mq.height == default_img_size[1][1]) {
            if (img_select < 1) {
                img_select = 1;
                yw.src = mq.src;
                setvalue();
            }
        }
    }
    hq.src = `${full_url_jpg}hqdefault.jpg`
    hq.onload = () => {
        if (hq.width == default_img_size[2][0] && hq.height == default_img_size[2][1]) {
            if (img_select < 2) {
                img_select = 2;
                yw.src = hq.src;
                setvalue();
            }
        }
    }
    sd.src = `${full_url_jpg}sddefault.jpg`
    sd.onload = () => {
        if (sd.width == default_img_size[3][0] && sd.height == default_img_size[3][1]) {
            if (img_select < 3) {
                img_select = 3;
                yw.src = sd.src;
                setvalue();
            }
        }
    }
    max.src = `${full_url_jpg}maxresdefault.jpg`
    max.onload = () => {
        if (max.width == default_img_size[4][0] && max.height == default_img_size[4][1]) {
            if (img_select < 4) {
                img_select = 4;
                yw.src = max.src;
                setvalue();
            }
        }
    }
    var imgtitle = chrome.i18n.getMessage("ImgTitle");
    yw.title = imgtitle;

}
var now_url = "";
function get_url() {
    var temp_url = getWatchV()
    if (now_url != temp_url) {
        now_url = temp_url;
        get_thumbnail(now_url)
        add_eventListener();
    }
}
const set_thumbnails = () => {
    $(`<img src="" id="youtube_watch_thumbnail" alt="" title="" style="height:64px;margin-right:12px;display: inline;cursor: pointer;">`).prependTo("div#owner.item.style-scope.ytd-watch-metadata");
}

var angas = 0;
const mo = new MutationObserver(() => {
    if (!$("img#youtube_watch_thumbnail")[0]) {
        set_thumbnails();

    } else {
        get_url();
    }
});
mo.observe(document, {
    childList: true,
    subtree: true,
});

function add_eventListener() {
    var ywt = document.querySelector('#youtube_watch_thumbnail')

    ywt.addEventListener('click', function () {
        //window.open(ywt.getAttribute('src'))
        setvalue();
        chrome.runtime.sendMessage({ action: "ThumbnailView", data: "" });
    }, false);
}

function setvalue() {
    chrome.storage.local.set({ videoid: getWatchV() });
    chrome.storage.local.set({ max_img_url: document.getElementById("youtube_watch_thumbnail").getAttribute('src') });
}
