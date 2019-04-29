import Shrink from './src/main';

/* istanbul ignore next */
Shrink.install = function(Vue) {
	Vue.component(Shrink.name, Shrink);
};

export default Shrink;
