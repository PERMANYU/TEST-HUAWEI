import store from '../../store';
import userinfo from './userinfo.js'

export default{
	getMenuList: function(){
		let menuList = [];
		let userRight = userinfo.getUserStorage(),
			systemInfo = userRight.details,			// 权限对象
			menuArr = [];
			systemInfo.forEach(item => {
	        	item.funcMenus.forEach(itemChild => {
	        		menuArr.push(itemChild);

	        		itemChild.childFuncMenus.forEach(itemList => {
	        			menuArr.push(itemList)
	        		})
	        	})
	        })
	    let menuObj = {
	    	menuList: systemInfo,
	    	menuArr: menuArr
	    }
		return menuObj

	},

	findItemById:function(id){
		let other = null;
		this.getMenuList()[0].funcMenus.find(item => {
			other = item.children.find(cItem => cItem.menuId == id);
			return other ? true : false;
		});
		return other;
	},
	findItemByComponentName:function(name){
		if (name.substr(0,1)=='/') 
			name = name.substr(1);

        let other = null;
        other = this.getMenuList().menuArr.find(item => item.urlAddr == name);

		return other;
	},
	
}
