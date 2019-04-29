import Updoad from './src/main';

/* istanbul ignore next */
Updoad.install = function(Vue) {
	Vue.component(Updoad.name, Updoad);
};

export default Updoad;
