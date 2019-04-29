import DragGroup from './src/main';

/* istanbul ignore next */
DragGroup.install = function(Vue) {
	Vue.component(DragGroup.name, DragGroup);
};

export default DragGroup;
