module.exports = {
	'/cmb/cmbdatainterfaceconvert':{
		target:'http://10.145.131.187:8169',
		changeOrigin: true,
		pathRewrite:{
			'': '/'
		}
	},
    '/cpc':{
        target:'http://10.145.131.201:8181',
        changeOrigin: true,
        pathRewrite:{
            '^/cpc': '/'
        }
    }
}