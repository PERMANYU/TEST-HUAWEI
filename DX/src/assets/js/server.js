export default{
	'default': {apiServer: 'http://cpc.te.sh.ctc.com:8082/cpc',
    flowImgServer: {
        definitions:'http://10.145.208.183:25513/process-definitions/showPic/tecpcmt',
        instance:'http://10.145.208.183:5603/capacity/custom/getProcessInstanceImage',
        design:'http://10.145.208.183:5600/editor/cpcdefine/{type}/{bpmsTenantId}/{bpmsAuthCode}'
    },
    windowOpenServer: '/#'},
}