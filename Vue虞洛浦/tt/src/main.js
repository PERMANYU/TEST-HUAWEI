// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import axios from 'axios';
// import filters from './filters';
import './assets/css/base.css';//全局
import './assets/css/class.css';//全局
import './assets/css/common.css';//全局
import store from './store'
import loading from './loading';
import 'animate.css';
Vue.use(loading);
Vue.prototype.$http=axios;
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

