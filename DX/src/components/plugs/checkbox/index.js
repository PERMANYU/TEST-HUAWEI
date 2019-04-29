import Checkbox from './src/main';
import CheckboxGroup from './src/group';

/* istanbul ignore next */
Checkbox.install = function(Vue) {
	Vue.component(Checkbox.name, Checkbox);
	Vue.component(CheckboxGroup.name, CheckboxGroup);
};

export default Checkbox;
