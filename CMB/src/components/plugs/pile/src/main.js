import Vue from 'vue';
import PileUpVue from './main.vue';

const PileUp = function(options) {
	let MessageConstructor = Vue.extend(PileUpVue);
	let instance = new MessageConstructor({
		data: options
	});
	instance.vm = instance.$mount();
	document.body.appendChild(instance.vm.$el);
	instance.vm.visible = true;

	return instance.vm;
}

PileUp.add = (sEl,eEl) => {
	return PileUp({sEl,eEl});
}

export default PileUp;