export default {
    userNameKey:'CMB_USER_NAME',
    userPwKey:'CMB_USER_PW',
    userRememberKey:"CMB_USER_REMEMBER",
    userStorage: 'CMB_USER_STORAGE',
    userOrgs: 'CMB_USER_ORGS',
    orgDataKey:'CMB_ORG_DATA',
    roleDataKey:'CMB_ROLE_DATA',
    tokenKey: 'crmaccesstoken',
    getInfo : function (){
        let userName = localStorage.getItem(this.userNameKey);
        let userStorage = JSON.parse(localStorage.getItem(this.userStorage));

        if(userStorage == null) {return false}

        return {
            name:userName,
            userStorage: userStorage
        }
    },
    getUserStorage: function(){
        return this.getInfo().userStorage;
    },
    getStaffId: function(){
        return this.getUserStorage().staffId;
    },
    getStaffCode: function(){
        return this.getUserStorage().staffCode;
    },
    getStaffName: function(){
        return this.getUserStorage().staffName;
    },
    getSysUserId: function(){
        return this.getUserStorage().sysUserId;
    },
    // 获取主要组织
    getUserOrgs: function(){
        return JSON.parse(localStorage.getItem(this.userOrgs));
    },
    // 获取用户当前角色（没有选择角色时默认选择主要组织的第一个角色）
    getSysRoles: function(){
        return JSON.parse(localStorage.getItem(this.roleDataKey));
    },
    // 没有选中角色时默认获取主要组织下第一个角色的id
    getSysRoleId: function(){
        return this.getSysRoles().sysRoleId;
    },
    // 没有选中角色时默认获取主要组织下第一个角色的code
    getSysRoleCode: function(){
        return this.getSysRoles().sysRoleCode;
    },
    // 获取当前组织
    getOrgData: function(){
        return JSON.parse(localStorage.getItem(this.orgDataKey));
    },
    // 获取当前组织id
    getOrgId: function(){
        if(this.getOrgData() != undefined){
            return this.getOrgData().orgId;
        }else{
            return this.getUserOrgs().orgId;
        }
    },
    getXSubChannel: function(){
        return this.getUserStorage().xSubChannel;
    },
    getOAToken: function(){
        return localStorage.getItem(this.tokenKey);
    },
    isValidLogin: function(){
        let userInfo = this.getInfo();

        if(userInfo.userStorage) return true;
        return false;
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
        if(userRemember != '1'){
            localStorage.removeItem(this.userPwKey);
        }

        localStorage.removeItem(this.userRememberKey);
        localStorage.removeItem(this.userStorage);
        localStorage.removeItem(this.userOrgs);
        localStorage.removeItem(this.orgDataKey);
        localStorage.removeItem(this.roleDataKey);

        this.redirect();
    },
    clearAuthority: function(){ //清除用户和权限信息
        localStorage.removeItem(this.userStorage);
        localStorage.removeItem(this.userOrgs);
        localStorage.removeItem(this.orgDataKey);
        localStorage.removeItem(this.roleDataKey);
    },
    getFuncComps: function(){
        let userStorage = this.getUserStorage();
        if(userStorage == undefined) return [];

        let obj = userStorage.details.find(item => item.systemInfoId == "141") || {};

        return obj.funcComps || [];
    },
    getAuthority: function(Vue,router,to,next,autoRedirect = false){ //调用接口获取权限
        //sid oa跳转登录 || 已登录用户
        let sysUserCode = to.query.sid || localStorage.getItem(this.userNameKey);

        if(!sysUserCode){
            //无法获取用户
            Vue.prototype.$message.error({message: "无法获取用户！"});
            this.clearAuthority();
            if(autoRedirect) next({ path: `/home` });
            return;
        }

        Vue.prototype.$axios.get(Vue.prototype.$api.GetPermission.format({sysUserCode})).then( res => {
            if (res.data) {
                let data = res.data.systemUser,
                    userString = JSON.stringify(data),
                    userinfoArr = data.userOrgs, // 组织信息
                    orgsObj = userinfoArr.find(item => item.currentUserFlag == 1);

                localStorage.setItem(this.userOrgs,JSON.stringify(orgsObj));

                // 存储当前默认的组织和角色
                localStorage.setItem(this.roleDataKey,JSON.stringify(orgsObj.sysRoles[0]));

                //保存用户信息
                localStorage.setItem(this.userNameKey, sysUserCode);

                localStorage.setItem(this.userStorage, userString);

                next();
            }else{
                Vue.prototype.$message.error({message: "当前用户没有权限！"});

                setTimeout( () => {
                    this.clearAuthority();
                    if(autoRedirect) next({ path: `/home` });
                },2000)
            }
        }).catch(err => {
            Vue.prototype.$message.error({ message: err.response.data.message });

            setTimeout( () => {
                this.clearAuthority();
                if(autoRedirect) next({ path: `/home` });
            },2000)
        });
    }

}