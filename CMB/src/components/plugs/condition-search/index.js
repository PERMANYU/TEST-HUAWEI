import ConditionSearch from './src/main';

/* istanbul ignore next */
ConditionSearch.install = function(Vue) {
	Vue.component(ConditionSearch.name, ConditionSearch);
};

export default ConditionSearch;
