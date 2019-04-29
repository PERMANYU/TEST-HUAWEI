import DragItem from './src/main';

/* istanbul ignore next */
DragItem.install = function(Vue) {
	Vue.component(DragItem.name, DragItem);
};

export default DragItem;
