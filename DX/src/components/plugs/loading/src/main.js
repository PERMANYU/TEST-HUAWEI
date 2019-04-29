import Vue from 'vue';
import LoadingVue from './main.vue';

let LoadingConstructor,instance,count = 0;

const Loading = function(options) {
	LoadingConstructor = Vue.extend(LoadingVue);
	instance = new LoadingConstructor({
		data: options
	});
	instance.vm = instance.$mount();
	document.body.appendChild(instance.vm.$el);

	return instance.vm;
}

Loading.show = options => {
	count ++;
	if(!instance || !LoadingConstructor){
		return Loading({isShow : true});
	}else{
		if(instance.vm.isRemove){
			return Loading({isShow : true});
		}else{
			return ;
		}
	}
}

Loading.hide = options => {
	if(count <= 1){
		if(!instance || !LoadingConstructor) return;
		instance.vm.$destroy(true);
		count--;
	}else{
		count--;
	}
}


export default Loading;