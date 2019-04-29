import Vue from 'vue';
import ProgressVue from './main.vue';

let LoadingConstructor,instance;

const Progress = function(options) {
	LoadingConstructor = Vue.extend(ProgressVue);
	instance = new LoadingConstructor({
		data: options
	});
	instance.vm = instance.$mount();
	document.body.appendChild(instance.vm.$el);

	return instance.vm;
}

Progress.show = options => {
	if(!instance || !LoadingConstructor){
		return Progress({isShow : true});
	}else{
		if(instance.vm.isStart){
			instance.vm.$destroy(true);
			return Progress({isShow : true});
		}else{
			return Progress({isShow : true});
		}
	}
}

Progress.hide = options => {
	if(!instance || !LoadingConstructor) return;
	instance.vm.$destroy(true);
}

Progress.isShow = options => {
	if(!instance || !LoadingConstructor){
		return false;
	}else{
		return instance.vm.isStart;
	}
}


export default Progress;