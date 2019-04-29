import Vue from 'vue';
import message from './message';
import VeeValidate,{ Validator } from 'vee-validate';

Vue.use(VeeValidate);

Validator.localize('ch', message);

//验证规则
Validator.extend('mobile',{ //手机号码验证
	getMessage: field => field + '必须是正确的手机号码！',
	validate: value => {
		return value.length == 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/.test(value);
	}
})

export default VeeValidate;
