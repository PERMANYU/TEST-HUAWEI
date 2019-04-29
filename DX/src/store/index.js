import Vue from 'vue';
import Vuex from 'vuex';
import 'babel-polyfill';

import userModule from './src/user';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules:{
		user: userModule
	}
})

export default store;