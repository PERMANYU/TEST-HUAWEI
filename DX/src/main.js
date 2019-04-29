// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'babel-polyfill';
import '@/assets/scss/color.scss';
import '@/assets/scss/common.scss';

//String.prototype.format
import '@/assets/js/string-format';

//Vue全局插件
import bssUI from '@/components/plugs'; 
Vue.use(bssUI);

//表单验证
import './validator'

//兼容性添加
import compatible from './assets/js/compatible';
compatible.run();


//Vue全局过滤器
import filter from './filter';
Vue.use(filter);

//全局公用方法
import utils from './assets/js/utils';
Vue.prototype.$utils = utils;

//api地址
import api from './assets/js/api';
Vue.prototype.$api = api;

//登录user
import user from './assets/js/userinfo';
Vue.prototype.$user = user;

//Vuex
import store from './store';
router.store = store;

//axios
import axios from './axios';
Vue.prototype.$axios = axios;

//混入
Vue.mixin({
	created: function(){
		this.$emit('created',this)
	},
	mounted: function(){
		this.$emit('mounted',this)
	}
})

// Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
