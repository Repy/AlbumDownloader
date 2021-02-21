/// <reference types="facebook-js-sdk" />
function Param(str) {
    var sp = str.split("&");
    var map = {};
    for (var _i = 0, sp_1 = sp; _i < sp_1.length; _i++) {
        var s = sp_1[_i];
        var kv = s.split("=", 2);
        if (kv.length == 2)
            map[kv[0]] = kv[1];
    }
    return map;
}
function PGet(id, after) {
    FB.api('/' + id + '/photos', 'get', { "fields": "images", "after": after }, function (response) {
        if (response && !response.error) {
            for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
                var photo = _a[_i];
                var max = {
                    width: 1,
                    height: 1,
                    source: ""
                };
                for (var _b = 0, _c = photo.images; _b < _c.length; _b++) {
                    var image = _c[_b];
                    if (max.width * max.height < image.width * image.height) {
                        max = {
                            width: image.width,
                            height: image.height,
                            source: image.source
                        };
                    }
                }
                var img = document.createElement("img");
                img.src = max.source;
                img.style.width = "120px";
                document.getElementById("photos").appendChild(img);
            }
            if (response.paging.cursors.after) {
                PGet(id, response.paging.cursors.after);
            }
        }
    });
}
;
window["fbAsyncInit"] = function () {
    var param = Param(document.location.search.substring(1));
    FB.init({
        appId: '392502744280434',
        xfbml: false,
        version: 'v2.9'
    });
    FB.getLoginStatus(function (response) {
        PGet(param.id, undefined);
    });
};
(function (d, id) {
    if (d.getElementById(id))
        return;
    var js = d.createElement('script');
    js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js";
    d.body.insertBefore(js, d.body.firstChild);
}(document, 'facebook-jssdk'));
