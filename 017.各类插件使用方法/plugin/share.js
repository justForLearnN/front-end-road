;
(function() {

    window.Share = {
        type: 'pc',
        data: {
            title: document.title,
            img: '',
            desc: document.title,
            url: location.href,
            success: function() {},
            fail: function() {},
            complete: function() {}
        },
        init: function() {
            var self = this,
                ua = navigator.userAgent,
                menus = "menu:share:appmessage menu:share:timeline menu:share:qq menu:share:weiboApp".split(" "),
                ready = function() {
                    self.type = 'weixin';
                    var xhr = new XMLHttpRequest;
                    xhr.open('GET', 'http://u.boy.im/wxjs/?type=tiger&url=' + encodeURIComponent(location.href.replace(/#.*$/, '')), true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var ret = JSON.parse(xhr.responseText),
                                params = {
                                    verifyJsApiList: menus
                                };
                            params.appId = ret.appId;
                            params.verifyAppId = ret.appId;
                            params.verifySignType = "sha1";
                            params.verifyTimestamp = ret.timestamp + "";
                            params.verifyNonceStr = ret.nonceStr;
                            params.verifySignature = ret.signature;

                            WeixinJSBridge.invoke("preVerifyJSAPI", params, function(resp) {
                                //alert(JSON.stringify(resp));
                            });
                        }
                    }
                    xhr.send();

                    menus.forEach(function(prop) {
                        WeixinJSBridge.on(prop, function(e) {
                            var data = self.data,
                                sdata = {
                                    "img_url": data.img,
                                    "desc": data.desc,
                                    "title": data.title,
                                    "link": data.url
                                },
                                name;

                            switch (prop.split(":")[2]) {
                                case 'appmessage':
                                    name = 'sendAppMessage';
                                    break;
                                case 'timeline':
                                    sdata.title = data.desc;
                                    sdata.desc = data.title;
                                    name = 'shareTimeline';
                                    break;
                                case 'qq':
                                    name = 'shareQQ';
                                    break;
                                case 'weiboApp':
                                    name = 'shareWeiboApp';
                                    break;
                            }

                            WeixinJSBridge.invoke(name, sdata, function(resp) { //alert(JSON.stringify(resp))
                                if (/\:(confirm|ok)$/i.test(resp.err_msg)) {
                                    data.success && data.success(resp);
                                } else {
                                    data.fail && data.fail(resp);
                                }
                                data.complete && data.complete(resp);
                            });
                        });
                    });
                }

            typeof WeixinJSBridge != 'undefined' ? ready() : ('addEventListener' in document) && document.addEventListener('WeixinJSBridgeReady', ready, false);

            if (typeof android != 'undefined' || typeof cm_web_app != 'undefined') {
                this.type = 'cm';
                this.cmObj = window.android || window.cm_web_app;
            }

            return this;
        },
        update: function(_data) {
            var data = this.data,
                key;
            for (key in _data) {
                data[key] = _data[key];
            }

            switch (this.type) {
                case 'cm':
                    try {
                        this.cmObj.updatesharedata(data.title, data.img, data.desc, data.url);
                    } catch (e) {}
                    break;
                    //case 'weixin':break;
            }
        },
        share: function(data) {
            var dt = this.data;
            typeof data != 'undefined' && this.update(data);
            switch (this.type) {
                case 'cm':
                    try {
                        if (typeof this.cmObj.share == 'function') {
                            this.cmObj.share(1, dt.url, dt.title, dt.desc, dt.img);
                        } else {
                            this.cmObj.sharescore();
                        }
                    } catch (e) {}
                    break;
            }
        }
    };

})();
