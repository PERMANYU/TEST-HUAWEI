import OnOff from './src/main';

/* istanbul ignore next */
OnOff.install = function(Vue) {
	Vue.component(OnOff.name, OnOff);
};

export default OnOff;
