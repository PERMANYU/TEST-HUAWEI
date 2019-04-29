//地址配置

const apiPath = {
	'dev': 'http://10.145.209.146:8065/cmb/cmbdatainterfaceconvert',
	'release': `${window.location.origin}/cmb/cmbdatainterfaceconvert`
}[BUILD_SERVICE_CONFIG || 'dev'];

const serverConfig = {
	apiPath, //api服务地址配置
	apiGeneralInterface: `${apiPath}/generalInterface`, //透传地址配置
	cpcMainServer: {
		'dev': 'cpc',
		'release': 'cpc1'
	}[BUILD_SERVICE_CONFIG || 'dev'], //cpc主数据地址配置

	fileServer: 'custbizrelmng', //直连下载模板地址

	resServer: `${window.location.origin}/RSCC/res/resbizauth/mktrescenter/bizservice/auth/sso?url={urlAddr}`, //营销资源跳转地址配置
	basServer: `${window.location.origin}/KFCS/dist/#/main/{urlAddr}`, //基础引擎跳转地址配置
	cpcServer: `${window.location.origin}/CPC/#/main/{urlAddr}`, //CPC管理工作台跳转地址配置
}

export {serverConfig}