import Vue from 'vue';
import MessageVue from './main.vue';
import MessageBoxVue from './box.vue';

let typeArray = ['success', 'warning', 'info', 'error'],
	messageBoxEl;

const Message = function(options) {
	let MessageConstructor = Vue.extend(MessageVue);
	let instance = new MessageConstructor({
		data: options
	});

	if(!messageBoxEl){
		let MessageBoxConstructor = Vue.extend(MessageBoxVue);
		let messageBox = new MessageBoxConstructor({
			data: {}
		});

		messageBox.vm = messageBox.$mount();
		messageBoxEl = messageBox.vm.$el;
		document.body.appendChild(messageBoxEl);
	}

	

	instance.vm = instance.$mount();
	messageBoxEl.appendChild(instance.vm.$el);
	instance.vm.visible = true;

	return instance.vm;
}

typeArray.forEach(type => {
	Message[type] = options => {
		options.type = type;
		return Message(options);
	};
});

export default Message;