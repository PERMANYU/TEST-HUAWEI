import Vue from 'vue';
import axios from 'axios';

// 配置超时时间
// axios.defaults.timeout = 100000

//请求拦截
axios.interceptors.request.use(function (config) {
	
	config.headers['access_token'] = Vue.prototype.$user.getOAToken();
	//成功
	Vue.prototype.$loading.show();
	return config;
},function (error){
	//失败
	return Promise.reject(error);
});
//响应拦截
axios.interceptors.response.use(function (response) {
	//成功
	Vue.prototype.$loading.hide();
	return response;
}, function (error) {
	//失败
	Vue.prototype.$loading.hide();
	return Promise.reject(error);
});

export default axios;