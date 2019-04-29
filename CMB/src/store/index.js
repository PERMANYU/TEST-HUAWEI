import Vue from 'vue';
import Vuex from 'vuex';
import 'babel-polyfill';

Vue.use(Vuex);

import userModule from './group/user';

const store = new Vuex.Store({
	modules:{
		user:userModule
	}
})

export default store;