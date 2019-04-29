import Vue from 'vue';
import userinfo from '@/assets/js/userinfo';

export function tokenRouter (sids,next) {
    Vue.prototype.$axios(`${Vue.prototype.$api.GetUserStorageCache}?date=${new Date().getTime()}`,{
        headers: {
            'sid': sids,
        }
    }).then(res => {
        if(res.data.success) {
            let userObj = res.data.systemUser,
            userString = JSON.stringify(userObj);
            localStorage.setItem(userinfo.userStorage, userString);

            //保存用户信息
            localStorage.setItem(userinfo.userNameKey, userObj.sysUserCode);
            localStorage.setItem(userinfo.userIdKey, userObj.staffId);
            localStorage.setItem(userinfo.userRememberKey, 1);
            next();
        }
    }).catch(error => {
        Vue.prototype.$message.error( { message : error.response.data.msg } );
    })
}