import LeftDialog from './src/main';

/* istanbul ignore next */
LeftDialog.install = function(Vue) {
	Vue.component(LeftDialog.name, LeftDialog);
};

export default LeftDialog;
