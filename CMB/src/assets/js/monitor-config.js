//监控引擎配置文件

const API_PAGE = {
	'dev': 'http://10.145.208.177:9076/pagemetirc',
	'release': 'http://10.145.132.32:9173/pagemetirc'
}[BUILD_SERVICE_CONFIG || 'dev'];

const API_AJAX = {
	'dev': 'http://10.145.208.177:9076/ajaxmetirc',
	'release': 'http://10.145.132.32:9173/ajaxmetirc'
}[BUILD_SERVICE_CONFIG || 'dev'];


const SETTINGS = {
//监控引擎
	MONITOR: {
		//页面监控 后端接收监控数据 API接口地址
		API_PAGE: API_PAGE,
		//Ajax请求性能监控 后端接收监控数据 API接口地址
		API_AJAX: API_AJAX,
		enablePage: true, //页面性能监控开关
		enableAjax: true, //Ajax请求性能监控开关
		//附加字段信息
		sysName: "CRM管理工作台", //系统名称
		funcName: "CMB", //功能名
		desc: "CRM管理工作台", //描述
	}
};

const monitorCfg = SETTINGS.MONITOR; //监控配置信息

if(monitorCfg.enablePage){//开启页面性能监控
	let perf = window._wyPerformance;
	if(perf){
		perf.setXhrConfig( {
		url: SETTINGS.MONITOR.API_PAGE, //记录监控数据的接口地址；
		//headers: { token: ""}, //token;
		});
		perf.setSysName(monitorCfg.sysName); //设置系统名称
		perf.setFunName(monitorCfg.funcName); //设置功能名称
		perf.setDesc(monitorCfg.desc); //设置描述

		perf.execute(); //启动页面监控
	}
}

//AJAX性能监控
if(monitorCfg.enableAjax){//AJAX页面性能监控
	let myxhr = window._wyxhr;
	if(myxhr){
		myxhr.setXhrConfig( {
		url: SETTINGS.MONITOR.API_AJAX, //记录AJAX监控数据的接口地址；
		//headers: { token: ""}, //token;
		}); 
		myxhr.watch(); //开始监控
	}
}

