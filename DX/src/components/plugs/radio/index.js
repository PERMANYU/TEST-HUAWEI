import Radio from './src/main';
import RadioGroup from './src/group';

/* istanbul ignore next */
Radio.install = function(Vue) {
	Vue.component(Radio.name, Radio);
	Vue.component(RadioGroup.name, RadioGroup);
};

export default Radio;
