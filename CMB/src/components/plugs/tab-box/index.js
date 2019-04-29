import TabBox from './src/main';

/* istanbul ignore next */
TabBox.install = function(Vue) {
	Vue.component(TabBox.name, TabBox);
};

export default TabBox;
