import PullLine from './src/main';

/* istanbul ignore next */
PullLine.install = function(Vue) {
	Vue.component(PullLine.name, PullLine);
};

export default PullLine;
