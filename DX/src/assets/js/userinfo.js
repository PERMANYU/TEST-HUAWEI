export default {
    userNameKey:'CPC_USER_NAME',
    userPwKey:'CPC_USER_PW',
    userIdKey:'CPC_USER_ID',
    userRememberKey:'CPC_USER_REMEMBER',
    userStorage: 'CPC_USER_STORAGE',
    accessToken:'crmaccesstoken',
    getInfo : function (){
        let userName = localStorage.getItem(this.userNameKey);
        let userPw = localStorage.getItem(this.userPwKey);
        let userRemember = localStorage.getItem(this.userRememberKey);
        let userStorage = JSON.parse(localStorage.getItem(this.userStorage));

        let userId = '';
        if(userRemember == '1'){
            userId = localStorage.getItem(this.userIdKey);
        }else{
            userId = sessionStorage.getItem(this.userIdKey);    
        }

        if(userStorage == null) {return false}

        let indexList = userStorage.privileges.filter(item => item.privCode == 'P-CPC-100004');
        let indexCode = '';
        indexList.length != 0 ? indexCode = 'P-CPC-100004' : indexCode = 'P-CPC-100003';
        return {
            name: userName,
            id: userId,
            userStorage: userStorage,
            privCode: indexCode,
            depart:userStorage.userOrgs ? userStorage.userOrgs[0].orgName : '' ,                                                                                                                                                                                                                                               
            departId:userStorage.userOrgs ? userStorage.userOrgs[0].orgId : ''
        }
    },
    getStaffId(){
        return this.getInfo().id;
    },
    getStaffName(){
        return this.getInfo().name;
    },
    getToken() {
        return localStorage.getItem(this.accessToken);;
    },
    getSid(){
        return this.getInfo().userStorage.sid;
    },
    isValidLogin: function(){
        let userInfo = this.getInfo();
        if(userInfo.id) return true;
    },
    redirect:function(){
        window.location.reload();
    },
    validLogin:function(){
        if(this.isValidLogin()){

        }else{
            this.redirect();
        }
    },
    exitLogin:function(){
        let userRemember = localStorage.getItem(this.userRememberKey);
        if(userRemember == '1'){
            localStorage.removeItem(this.userIdKey);
        }else{
            sessionStorage.removeItem(this.userIdKey);
        }

        localStorage.removeItem(this.userRememberKey);
        localStorage.removeItem(this.userIdKey);
        localStorage.removeItem(this.userPwKey);
        localStorage.removeItem(this.userStorage);
        localStorage.removeItem(this.userNameKey);

        this.redirect();
    }

}