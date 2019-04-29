import Pile from './src/main.js';

/* istanbul ignore next */
Pile.install = function(Vue) {
	Vue.prototype.$pile = Pile;
};

export default Pile;
