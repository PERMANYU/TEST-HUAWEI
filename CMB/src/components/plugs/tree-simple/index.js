import TreeSimple from './src/main';

/* istanbul ignore next */
TreeSimple.install = function(Vue) {
	Vue.component(TreeSimple.name, TreeSimple);
};

export default TreeSimple;
