import Vue from 'vue';

export default {
	namespaced: true,
	state:{
		userInfo:{}
	},
	mutations:{
		setUserInfo(state,val){
			state.userInfo = val;
		},
		setCurOrg(state,val){
			state.userInfo.userOrgs.forEach(item => {
				if(item.orgId == val.orgId) {
					item.currentUserFlag = 1
				}else{
					item.currentUserFlag = 0
				}
			})
		}
	},
	actions:{
		getCmbAuthentication(context){

		}
	},
	getters:{
		userInfo: state => { //用户信息
			return state.userInfo;
		},
		userOrgs: state => { //全部组织
			return state.userInfo.userOrgs || [];
		},
		sysUserId: state => { //sysUserId
			return state.userInfo.sysUserId;
		},
		curOrg: (state, getters) => { //当前组织
			return getters.userOrgs.find(item => item.currentUserFlag == 1) || {};
		},
		curOrgId: (state, getters) => { //当前组织ID
			return getters.curOrg ? getters.curOrg.orgId : '';
		},
		curRole: (state, getters) => { //当前角色
			return getters.curOrg.sysRoles ? getters.curOrg.sysRoles[0] : {};
		},
		curRoleId: (state, getters) => { //当前角色ID
			return getters.curRole ? getters.curRole.sysRoleId : '';
		},
	}
}