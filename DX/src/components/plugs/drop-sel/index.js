import DropSel from './src/main';

/* istanbul ignore next */
DropSel.install = function(Vue) {
	Vue.component(DropSel.name, DropSel);
};

export default DropSel;
