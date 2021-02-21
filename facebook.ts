/// <reference types="facebook-js-sdk" />

function Param(str: string) {
    const sp = str.split("&");
    const map: { [name: string]: string } = {};
    for (const s of sp) {
        const kv = s.split("=", 2);
        if (kv.length == 2)
            map[kv[0]] = kv[1];
    }
    return map;
}
function PGet(id: string, after: number | undefined) {
    FB.api(
        '/' + id + '/photos',
        'get',
        { "fields": "images", "after": after },
        (response: any) => {
            if (response && !response.error) {
                for (const photo of response.data) {
                    var max = {
                        width: 1,
                        height: 1,
                        source: "",
                    };
                    for (const image of photo.images) {
                        if (max.width * max.height < image.width * image.height) {
                            max = {
                                width: image.width,
                                height: image.height,
                                source: image.source,
                            };
                        }
                    }
                    var img = document.createElement("img");
                    img.src = max.source;
                    img.style.width = "120px";
                    document.getElementById("photos").appendChild(img);
                }
                if (response.paging.cursors.after) {
                    PGet(id, response.paging.cursors.after)
                }
            }
        });
};

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
    if (d.getElementById(id)) return;
    var js = d.createElement('script');
    js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js";
    d.body.insertBefore(js, d.body.firstChild);
}(document, 'facebook-jssdk'));