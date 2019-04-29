import ColSel from './src/main';

/* istanbul ignore next */
ColSel.install = function(Vue) {
	Vue.component(ColSel.name, ColSel);
};

export default ColSel;
