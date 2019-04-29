import Message from './src/main.js';

/* istanbul ignore next */
Message.install = function(Vue) {
	// Vue.component(Message.name, Message);
	Vue.prototype.$message = Message;
};

export default Message;
