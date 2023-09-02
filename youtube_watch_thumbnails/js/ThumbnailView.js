
var id = "";
chrome.storage.local.get(["videoid"]).then((result) => {
    id = result.videoid;

    var youtube = document.querySelector('#videoid');
    var url = `https://youtu.be/${id}`
    youtube.href = url;
    youtube.textContent = url;
    var url_webp = `https://i.ytimg.com/vi_webp/${id}/`
    var url_jpg = `https://i.ytimg.com/vi/${id}/`
    var img_name = ["3", "2", "1", "mq3", "mq2",
        "mq1", "hq3", "hq2", "hq1", "sd3",
        "sd2", "sd1", "default", "mqdefault", "0",
        "hqdefault", "sddefault", "hq720", "maxresdefault"];

    var full_url_webp = "";
    var full_url_jpg = "";
    var list = document.querySelector("#img_list");
    list.innerHTML += `<li></li>`
    for (var i = img_name.length - 1; i >= 0; i--) {
        full_url_jpg = `${url_jpg}${img_name[i]}.jpg`;
        full_url_webp = `${url_webp}${img_name[i]}.webp`;


        list.innerHTML += `<li class="imgs"><img src=${full_url_webp}><p>${img_name[i]}.webp</p></li>`
        list.innerHTML += `<li class="imgs"><img src=${full_url_jpg}><p>${img_name[i]}.jpg</p></li>`
    }


    var imgs = document.querySelectorAll(".imgs");
    imgs.forEach(function (img) {
        img.addEventListener("click", function () {

            var imgname = this.textContent;
            var extension = imgname.match(/\.([^.]+)$/);
            var imgurlwebp = `https://i.ytimg.com/vi_webp/`;
            var imgurljpg = `https://i.ytimg.com/vi/`;
            if (extension[1] == "jpg") {
                imgurl = `${imgurljpg}${id}/${imgname}`;
            } else if (extension[1] == "webp") {
                imgurl = `${imgurlwebp}${id}/${imgname}`;
            }
            var img = new Image();
            img.src = imgurl;
            document.querySelector('#img_name').textContent = imgname;
            document.querySelector('#x').textContent = img.width;
            document.querySelector('#y').textContent = img.height;
            document.querySelector('#img').src = imgurl;
        });
    });
});

// スクロールのドラッグ有効化
jQuery.prototype.mousedragscrollable = function () {
    let target;
    $(this).each(function (i, e) {
        $(e).mousedown(function (event) {
            event.preventDefault();
            target = $(e);
            $(e).data({
                down: true,
                move: false,
                x: event.clientX,
                y: event.clientY,
                scrollleft: $(e).scrollLeft(),
                scrolltop: $(e).scrollTop(),
            });
            return false;
        });
        $(e).click(function (event) {
            if ($(e).data("move")) {
                return false;
            }
        });
    });
    $(document)
        .mousemove(function (event) {
            if ($(target).data("down")) {
                event.preventDefault();
                let move_x = $(target).data("x") - event.clientX;
                let move_y = $(target).data("y") - event.clientY;
                if (move_x !== 0 || move_y !== 0) {
                    $(target).data("move", true);
                } else {
                    return;
                }
                $(target).scrollLeft($(target).data("scrollleft") + move_x);
                $(target).scrollTop($(target).data("scrolltop") + move_y);
                return false;
            }
        })
        .mouseup(function (event) {
            $(target).data("down", false);
            return false;
        });
};
$("#img_list").mousedragscrollable();
