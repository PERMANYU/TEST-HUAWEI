import Vue from 'vue';
import VeeValidate,{ Validator } from 'vee-validate';
import message from './message';

Vue.use(VeeValidate)
Validator.localize('ch', message);

//验证规则
Validator.extend('mobile',{ //手机号码验证
    getMessage: '请输入正确的手机号码！',
    validate: value => {
        return value.length == 11 && /^1[3456789]\d{9}$/.test(value);
    }
})

Validator.extend('custName',{ // 客户名称
    getMessage: '请输入正确的客户名称！',
    validate: value => {
        return /^[\u4E00-\u9FA5A-Za-z()（）]+$/.test(value);
    }
})

Validator.extend('email',{ //邮箱地址验证
    getMessage: '请输入正确的邮箱地址！',
    validate: value => {
        return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value);
    }
})

Validator.extend('cardId',{ //身份证号码验证
    getMessage: '请输入正确的身份证号码！',
    validate: value => {
        return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
    }
})

Validator.extend('isQQ',{ //QQ号码验证
    getMessage: '请输入正确的QQ号码！',
    validate: value => {
        return /^[1-9][0-9]{4,}$/.test(value);
    }
})

Validator.extend('isWX',{ //微信号码验证
    getMessage: '请输入正确的微信号码！',
    validate: value => {
        return /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(value);
    }
})

Validator.extend('isPhone',{ //电话号码验证
    getMessage: '请输入正确的电话号码！',
    validate: value => {
        return /^(\+86)?1[3456789]\d{9}$/.test(value);
    }
})

Validator.extend('isfax',{ //传真号码验证
    getMessage: '请输入正确的传真号码！',
    validate: value => {
        return /^(\d{3,4}-)?\d{7,8}$/.test(value);
    }
})

Validator.extend('isHomeNum',{ //家庭电话号码
    getMessage: '请输入正确的家庭电话号码！',
    validate: value => {
        let reg = /^(\d{3,4}-)\d{7,8}$/;
        let reg1 = /^(1[3456789]\d{9})$/;
        let reg2 = /^(\+86)?1[3456789]\d{9}$/;
        return reg.test(value) || reg1.test(value) || reg2.test(value);
    }
})

Validator.extend('isTax',{ //传真号码验证
    getMessage: '请输入正确的税务号！',
    validate: value => {
        let reg = /^[A-Z0-9]{15}$/;
        let reg1 = /^[A-Z0-9]{18}$/;
        return reg.test(value) || reg1.test(value)
    }
})

Validator.extend('isCard',{ //通用证件号码验证
    getMessage: '请输入正确的号码！',
    validate: value => {
        let reg = /^[\u4e00-\u9fa5]+$/;
        return !reg.test(value);
    }
})

Validator.extend('isBankNum',{ //托收银行账号
    getMessage: '请输入正确托收银行账号！',
    validate: value => {
        let reg = /^[\d+/-]+$/;
        return reg.test(value);
    }
})

Validator.extend('after_date',{ //时间是否小于Value验证
    getMessage: (field,args) => {
        if(args[1]){
            return `${field}必须小于或等于${args[0]}！`;
        }else{
            return `${field}必须小于${args[0]}！`;
        }
        
    },
    validate: (value,args) => {
        if(args.length === 0) return;

        let startTime = new Date(value).getTime(),
            endTime=new Date(args[0]).getTime();

        if(args[1]){
            return startTime <= endTime;
        }else{
            return startTime < endTime;
        }
        
    }
})

Validator.extend('before_date',{ //时间是否大于Value验证
    getMessage: (field,args) => {
        if(args[1]){
            return `${field}必须大于或等于${args[0]}！`;
        }else{
            return `${field}必须大于${args[0]}！`;
        }
        
    },
    validate: (value,args) => {
        if(args.length === 0) return;

        let startTime = new Date(value).getTime(),
            endTime=new Date(args[0]).getTime();

        if(args[1]){
            return startTime >= endTime;
        }else{
            return startTime > endTime;
        }
        
    }
})
export default VeeValidate;
