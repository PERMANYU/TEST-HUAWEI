import Loading from './src/main.js';

/* istanbul ignore next */
Loading.install = function(Vue) {
	// Vue.component(Loading.name, Loading);
	Vue.prototype.$loading = Loading;
};

export default Loading;
