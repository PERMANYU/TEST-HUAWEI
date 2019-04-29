//使用 XMLHttpRequest 的请求可以拦截，拦截后记录信息。
//使用 fetch 的请求可以拦截，拦截后记录信息。
(function (window) {
    var 
        document = window.document,
        cookie = document.cookie;
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        arr = cookie.match(reg);
        if (arr)
            return unescape(arr[2]);
        else
            return null;
    }
    window._wyxhr = {
        config: {
            url: "",
        },
        startWatch: function () { //开始XMLHttpRequest监视
            if (!window.XMLHttpRequest) {
                console.log("浏览器不支持 XMLHttpRequest 对象");
                return;
            }

            this.xhr = this.xhr || XMLHttpRequest;

            //创建新的方法替换XMLHttpRequest
            XMLHttpRequest = function () {
                var newxhr = new window._wyxhr.xhr;
                Object.defineProperty(this, "xhr", {
                    value: newxhr
                });
            };

            var prototype = this.xhr.prototype;
            for (var attr in prototype) {
                var type = "";
                try {
                    type = typeof prototype[attr];
                } catch (e) {}

                if (type === "function") {
                    XMLHttpRequest.prototype[attr] = this.rewriteWatchFunction(attr);
                } else {
                    Object.defineProperty(XMLHttpRequest.prototype, attr, {
                        get: this.getPrototype(attr),
                        set: this.setPrototype(attr),
                        enumerable: true
                    });
                }
            }
        },
        startFetchWatch: function () { //开始fetch监视
            if (!window.fetch) {
                console.log("浏览器不支持 fetch");
                return;
            }

            this.fetch = this.fetch || window.fetch;

            fetch = function () {
                var _this = this;
                var args = [].slice.call(arguments);
                var options = args[1] || {};

                _this.startTime = new Date().getTime();
                _this.curApi = args[0];
                _this.reqData = JSON.stringify(options.body) || "";

                return window._wyxhr.fetch.apply(this, arguments).then(function (response) {   
                    var rObj = {
                        id: null, //主键id
                        userId: window._wyxhr.getUserId(), //用户标识
                        sysName: document.title, //系统名称
                        reqStartTime: _this.startTime, //请求开始时间
                        reqEndTime: new Date().getTime(), //请求结束时间
                        url: _this.curApi, //请求服务地址
                        pageUrl: document.location.href, //页面地址
                        requestInfo: _this.reqData, //入参
                        responseInfo: "fetch出参", //出参
                        elapsedTime: new Date().getTime() - _this.startTime, //总时间
                        serverIpPort: _this.curApi.split("/")[2], //服务ip
                        clientIpPort: "", //用户本地ip
                        clientAgentInfo: window.navigator.userAgent, //浏览器信息
                        browser: window._wyxhr.getBrowser(), //浏览器类型
                        status: this.status, //状态
                        createTime: new Date().getTime(), //创建时间
                        traceId: response.headers.get("Pinpoint-Traceid"), //跟踪链路
                        virtualorderid: getCookie("virtualorderid"), //virtualorderid
                    };
                    window._wyxhr.recordSend(rObj);


                    return new Promise(function (resolve, reject) {
                        resolve(response);
                    });

                }).catch(function (response) {
                    return new Promise(function (resolve, reject) {
                        reject(response);
                    });
                });
            };
        },
        //开启监控
        watch: function () {
            this.setUserId();
            this.startWatch();
            this.startFetchWatch();
        },
        endWatch: function () { //停止监视 不适用
        },
        getPrototype: function (attr) { //重设XMLHttpRequest get属性
            return function () {
                return this.xhr[attr];
            };
        },
        setPrototype: function (attr) { //重设XMLHttpRequest set属性
            return function (v) {
                if (attr == "onreadystatechange") {    
                    var _this = this; //this 为XMLHttpRequest    
                    this.xhr[attr] = function () {  
                        if (this.readyState == 4) {                      
                            var time = new Date().getTime() - _this.startTime;
                            var rObj = {
                                id: null, //主键id
                                userId: window._wyxhr.getUserId(), //用户标识
                                sysName: document.title, //系统名称
                                reqStartTime: _this.startTime, //请求开始时间
                                reqEndTime: new Date().getTime(), //请求结束时间
                                url: _this.curApi, //请求服务地址
                                pageUrl: document.location.href, //页面地址
                                requestInfo: _this.reqData, //入参
                                responseInfo: this.response, //出参
                                elapsedTime: time, //总时间
                                serverIpPort: _this.curApi.split("/")[2], //服务ip
                                clientIpPort: "", //用户本地ip
                                clientAgentInfo: window.navigator.userAgent, //浏览器信息
                                browser: window._wyxhr.getBrowser(), //浏览器类型
                                status: this.status, //状态
                                createTime: new Date().getTime(), //创建时间
                                traceId: this.getResponseHeader("Pinpoint-Traceid"), //跟踪链路
                                virtualorderid: getCookie("virtualorderid"), //virtualorderid                               
                            };                        
                            window._wyxhr.recordSend(rObj);
                        }
                        v.apply(_this.xhr, arguments);
                    };
                } else {
                    this.xhr[attr] = v;
                }
            };
        },
        rewriteWatchFunction: function (fun) { //重设XMLHttpRequest function属性

            return function () {
                var args = [].slice.call(arguments);

                if (fun == "open") {
                    this.curApi = args[1];                 
                }

                if (fun == "send") {                 
                    this.startTime = new Date().getTime();
                    this.reqData = args[0];
                }

                return this.xhr[fun].apply(this.xhr, args);
            };
        },
        recordSend: function (rObj) { //调用后端服务 记录本次服务情况

            var xmlhttp = new window._wyxhr.xhr();
            var url = this.config.url;
            xmlhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    //调用成功
                }

            };
            xmlhttp.open("post", url, true);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            var headers = this.config.headers || {};
            for (var key in headers) {
                xmlhttp.setRequestHeader(key, headers[key]);
            }
            xmlhttp.send(JSON.stringify(rObj));
        },
        setUserId: function () { //设置一个用户标识
            if (!window.localStorage) {
                return;
            }
            if (window._wyxhr.getUserId()) {
                return;
            }
            // 获取随机数
            var random = Math.ceil(Math.random() * 10000).toString();

            //不足五位数，0补齐
            if (random.length !== 5) {
                for (var rl = random.length; rl < 5; rl++) {
                    random = "0" + random;
                }
            }

            // 时间戳 + 随机五位数
            random = new Date().getTime() + random;

            //
            window.localStorage.setItem("XLUI", random);
        },
        getUserId: function () { //获取设置的用户标识
            if (!window.localStorage) {
                return;
            }
            return window.localStorage.getItem("XLUI");
        },
        getBrowser: function () { //获取浏览器类型
            var userAgent = window.navigator.userAgent; //取得浏览器的userAgent字符串           
            var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
            var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
            var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
            var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
            var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

            if (isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if (fIEVersion == 7) {
                    return "IE7";
                } else if (fIEVersion == 8) {
                    return "IE8";
                } else if (fIEVersion == 9) {
                    return "IE9";
                } else if (fIEVersion == 10) {
                    return "IE10";
                } else if (fIEVersion == 11) {
                    return "IE11";
                } else {
                    return "IE";
                }
            }
            if (isOpera) {
                return "Opera";
            }
            if (isEdge) {
                return "Edge";
            }
            if (isFF) {
                return "FF";
            }
            if (isSafari) {
                return "Safari";
            }
            if (isChrome) {

                //是否360
                var mimeTypes = window.navigator.mimeTypes;
                for (var i = 0; i < mimeTypes.length; i++) {
                    if (mimeTypes[i]["type"] == "application/vnd.chromium.remoting-viewer") {
                        return "360";
                    }
                }

                return "Chrome";
            }
        },
        //设置监控数据持久化接口xhr请求参数config对象，暂时只支持url、 hearders
        //config = { url: "xxx", hearders:{//请求头} }
        setXhrConfig(config) { //设置请求参数配置信息
            this.config = config || {};
        }
    };

    // window._wyxhr.setUserId();
    // window._wyxhr.startWatch();
    // window._wyxhr.startFetchWatch();
})(window);