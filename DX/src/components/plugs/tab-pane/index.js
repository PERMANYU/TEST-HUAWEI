import TabPane from './src/main';

/* istanbul ignore next */
TabPane.install = function(Vue) {
	Vue.component(TabPane.name, TabPane);
};

export default TabPane;
