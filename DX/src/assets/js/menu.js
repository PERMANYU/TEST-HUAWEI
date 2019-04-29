import userInfo from '@/assets/js/userinfo.js'
let userJson = JSON.parse(localStorage.getItem(userInfo.userStorage));

export default{
    menuTopList: function(){

        let isRequirement = false;

        for( let kiCkFuncMenu of userJson.kiCkFuncMenus){
            if(isRequirement) break;
            if(kiCkFuncMenu.childKickFuncMenus && kiCkFuncMenu.childKickFuncMenus.length > 0){
                for( let childKickFuncMenu of kiCkFuncMenu.childKickFuncMenus){
                    if(isRequirement) break;
                    if(childKickFuncMenu.menuCode == 'M-CPC-100001'){
                        isRequirement = true;
                    }
                }
            }
        }

        if(!isRequirement){
           return [{
                menuId: '0-0',
                menuName: '首页',
                componentName: '/'
            }]
        }else{
            return [{
                menuId: '0-0',
                menuName: '首页',
                componentName: '/'
            },{
                menuId: '0-1',
                menuName: '需求单管理',
                componentName: 'requirement'
            }]
        }
    },
    menuOtherList: function(){
        let menuList = [];
        for( let kiCkFuncMenu of userJson.kiCkFuncMenus){
            if(kiCkFuncMenu.childKickFuncMenus && kiCkFuncMenu.childKickFuncMenus.length > 0){

                let cMenuList = [];

                for( let childKickFuncMenu of kiCkFuncMenu.childKickFuncMenus){
                    
                    cMenuList.push({
                        menuId: childKickFuncMenu.menuId,
                        menuName: childKickFuncMenu.menuName,
                        menuIcon: childKickFuncMenu.menuCode,
                        componentName: childKickFuncMenu.urlAddr,
                        menuLevel: childKickFuncMenu.menuLevel
                    })
                }

                menuList.push({
                    menuId: kiCkFuncMenu.menuId,
                    menuName: kiCkFuncMenu.menuName,
                    menuLevel: kiCkFuncMenu.menuLevel,
                    children: cMenuList
                })
            }
        }
        return menuList;
    },
    findItemByComponentName:function(name){
        [,,name] = name.split('/');
        let menuTopListArr = this.menuTopList();
        let menuOtherListArr = this.menuOtherList();
        let top = menuTopListArr.find(item => item.componentName == name);
        let other = null;
        if(top) return top;
        menuOtherListArr.find(item => {
            other = item.children.find(cItem => cItem.componentName == name);
            return other ? true : false;
        });

        return other;
    }
}
