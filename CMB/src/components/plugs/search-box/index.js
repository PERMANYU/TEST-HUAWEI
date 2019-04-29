import SearchBox from './src/main';

/* istanbul ignore next */
SearchBox.install = function(Vue) {
	Vue.component(SearchBox.name, SearchBox);
};

export default SearchBox;
