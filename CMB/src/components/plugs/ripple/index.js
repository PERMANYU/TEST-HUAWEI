import Ripple from './src/main';

/* istanbul ignore next */
Ripple.install = function(Vue) {
	Vue.component(Ripple.name, Ripple);
};

export default Ripple;
