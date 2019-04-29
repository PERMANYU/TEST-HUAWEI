//使用 window.performance获取前端各类时间
(function (window) {
    var
        performance = window.performance,
        document = window.document,
        location = window.location,
        navigator = window.navigator,
        cookie = document.cookie;

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        arr = cookie.match(reg);
        if (arr)
            return unescape(arr[2]);
        else
            return null;
    }

    window._wyPerformance = {
        cSysName: "",
        cFunName: "",
        cDesc: "",
        config: {
            url:""
        }, //xhr请求参数对象
        execute: function () { //执行
            if (!performance) {
                console.log("浏览器不支持 performance 接口");
                return;
            }

            this.getInfo();

        },
        getInfo() { //获取信息
            var time = performance.timing;
            if (time.loadEventEnd == 0) {
                console.log("getInfo loadEventEnd == 0");
                setTimeout(function () {
                    return window._wyPerformance.execute();
                }, 500);

                return null;
            }

            var rObj = {
                id: null, //主键
                sysName: this.cSysName || document.title, //系统名称
                funName: this.cFunName, //功能名称
                reqStartTime: time.navigationStart, //请求开始时间
                reqEndTime: time.responseEnd, //请求结束时间
                pageLoadedElapsedTime: time.loadEventEnd - time.navigationStart, //页面完全加载时长
                pageOnloadElapsedTiime: time.loadEventEnd - time.loadEventStart, //onload事件时长
                dnsParseElapsedTime: time.domainLookupEnd - time.domainLookupStart, //DNS查询时长
                tcpConnectElapsedTime: time.connectEnd - time.connectStart, //TCP链接时长
                reqElapsedTime: time.responseEnd - time.responseStart, //request请求时长
                domParseElapsedTime: time.domComplete - time.domInteractive, //解析dom树时长
                pageOnwhiteElapsedTime: time.responseStart - time.navigationStart, //白屏时长
                scriptLoadElapsedTime: time.domContentLoadedEventEnd - time.domContentLoadedEventStart, //脚本加载时长
                serverIpPort: location.host, //用户访问服务器IP/端口
                clientIpPort: "", //用户本地IP/端口
                clientAgentInfo: navigator.userAgent, //浏览器信息/手机型号
                url: location.href, //访问页面URL
                description: this.cDesc, //描述
                createTime: new Date().getTime(), //创建时间
                virtualorderid: getCookie("virtualorderid"), //
            };


            var xmlhttp = new XMLHttpRequest();
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
        setSysName(name) { //设置系统名称
            this.cSysName = name;
        },
        setFunName(name) { //设置功能名称
            this.cFunName = name;
        },
        setDesc(desc) { //设置描述
            this.cDesc = desc;
        },
        //设置xhr请求参数config对象，暂时只支持url、 hearders
        //config = { url: "xxx", hearders:{//请求头} }
        setXhrConfig(config) { //设置请求参数配置信息
            this.config = config || {};
        }
    };
})(window);