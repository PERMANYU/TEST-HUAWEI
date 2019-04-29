import Progress from './src/main.js';

/* istanbul ignore next */
Progress.install = function(Vue) {
	Vue.prototype.$Progress = Progress;
};

export default Progress;
