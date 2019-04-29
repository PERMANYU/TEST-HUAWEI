<template>
    <div class="nav" :class="menuType?'active':''">
        <div class="header" :class="menuListType?'active':''" @mouseover="changeMenu">
            <span class="tit-icon"></span>
            <p class="menu-tit">工作台</p>
            <i class="iconfont iconjiantou"></i>
            <div class="fix" v-show="menuListType">
                <div class="a-close"><i @click="btnBack()" class="iconfont iconguanbi"></i></div>
                <div class="search">
                    <i class="iconfont iconsousuocu"></i>
                    <input name="menuName" placeholder="请输入功能/菜单名称" />
                </div>
                <h3 class="his-tit">最近访问</h3>
                <dl class="his-list">
                    <dd :span="4" v-for="(hisItem,index) in historyList" :key="index">
                        <span>{{hisItem.name}}<i class="iconfont iconguanbi"></i></span>
                    </dd>
                </dl>
                <div class="scroll-menu">
                <Scroll :isShowRight="true" isWheelStop>
                    <!--新版本-->
                    <div class="menubox">
                        <div class="menubox-item" v-for="(menuItem,menuIndex) in menuList" :key="menuIndex" ref="menuItem">
                            <!-- 系统 -->
                            <Row>
                                <Col class="systembox">
                                    <span class="i-s-title"><i class="iconfont" :class="changSysIcon(menuItem.systemInfoName)"></i>{{menuItem.systemInfoName}}</span>
                                </Col>
                            </Row>

                            <Row v-for="(childMenuItem,childMenuIndex) in menuItem.funcMenus" :key="childMenuIndex">

                                <!-- 一级菜单 -->
                                <Col :class="['menu-item', 'first-menu', getIsClick(childMenuItem)]" :title="childMenuItem.menuName">
                                    <span class="menuview app__ellipsis" @click="menuClick(menuItem,childMenuItem)">{{childMenuItem.menuName}}</span>
                                    <i @click="AddMenuCollection(childMenuItem,menuItem.systemInfoName)" 
                                        class="iconfont iconkongwujiaoxing" 
                                        v-show="!getIsCollection(childMenuItem)"></i>
                                    <i @click="DeleteMenuCollection(childMenuItem)" 
                                        class="iconfont iconwujiaoxing" 
                                        v-show="getIsCollection(childMenuItem)"></i>
                                </Col>

                                <!-- 二级菜单 -->
                                <Col class="menu-item click-menu second-menu" 
                                    v-for="(sChildMenuItem,sChildMenuIndex) in childMenuItem.childFuncMenus" 
                                    :key="childMenuIndex + '' + sChildMenuIndex" 
                                    :title="sChildMenuItem.menuName">
                                    <span @click="menuClick(menuItem,childMenuItem,sChildMenuItem)" class="menuview app__ellipsis">{{sChildMenuItem.menuName}}</span>
                                    <i @click="AddMenuCollection(sChildMenuItem,menuItem.systemInfoName)" 
                                        class="iconfont iconkongwujiaoxing" 
                                        v-show="!getIsCollection(sChildMenuItem)"></i>
                                    <i @click="DeleteMenuCollection(sChildMenuItem)" 
                                        class="iconfont iconwujiaoxing" 
                                        v-show="getIsCollection(sChildMenuItem)"></i>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Scroll>
                </div>
            </div>
        </div>
        <ul class="left-nav">
            <li v-for="(item,index) in collectionList" :key="index" @mouseover="openMenu" @mouseout="closeMenu">
                <span @click="navMenuClick(item)" :class="['iconfont', changSysIcon(item.engineName)]"></span>
                <p @click="navMenuClick(item)">{{item.menuName}}</p>
                <i v-show="menuType" class="iconfont iconguanbi" @click.stop="DeleteMenuCollection(item)"></i>
            </li>
        </ul>
    </div>
</template>

<script>
import Menu from '@/assets/js/menu';
import {serverConfig} from '@/assets/js/server';

export default {
    data() {
        return {
            collectionList: [],
            menuList: Menu.getMenuList().menuList,
            menuType: false,   // 是否展开菜单
            menuListType: false, //展示子菜单
            historyList: [
                {
                    id: 1,
                    name: '客户树管理'
                },{
                    id: 1,
                    name: '客户数据管理'
                },{
                    id: 1,
                    name: '帐户管理'
                }
            ]
        }
    },
    created(){
        this.GetMenuCollection();
    },
    mounted() {
        document.addEventListener('click', this.globalClick);
    },
    destroyed(){
        document.removeEventListener('click', this.globalClick);
    },
    methods: {
        // 展示系统icon
        changSysIcon(engineName) {
            return {
                '综合查询': 'iconzonghechaxun',
                '营销资源管理工作台': 'iconyingxiaoziyuangongzuotai',
                '页面功能集成': 'iconjicheng',
                '基础引擎': 'iconjichuyinqing',
                '客账户管理': 'iconkezhanghu',
                'CPC配置工作台': 'iconCPCpeizhigongzuotai'
            }[engineName] || 'iconqitawenjian';
        },
        // 收藏菜单查询
        GetMenuCollection() {
            this.$axios.post(this.$api.GetMenuCollection,{
                "body": {
                    "engineName": "",
                    "featuresName": "",
                    "menuName": "",
                    "menuPerson": this.$user.getInfo().name,
                    "menuUrl": ""
                },
                "page": 0,
                "size": 200,
                "sort": "id",
                "sortType": "desc"
            }).then(res => {
                if (res.data) {
                    this.collectionList = res.data.body.result;
                } else {
                    this.$message.error({"message": "收藏菜单查询失败"})
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        // 收藏菜单新增
        AddMenuCollection(item,systemInfoName) {
            this.$axios.put(this.$api.AddMenuCollection,[
            {
                engineName: systemInfoName,
                featuresName: "功能",
                menuName: item.menuName,
                menuPerson: this.$user.getInfo().name,
                menuId: item.menuId,
                menuUrl: item.urlAddr
            }]).then(res => {
                if (res.data) {
                    this.GetMenuCollection();
                } else {
                    this.$message.error({"message": "收藏菜单新增失败"})
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        // 收藏菜单删除
        DeleteMenuCollection(delItem) {
            let apiUrl = this.$api.DeleteMenuCollection.format({menuId:delItem.menuId,menuPerson:this.$user.getInfo().name});

            this.$axios.delete(apiUrl).then(res => {
                if (res.data.code == '000000') {
                    this.GetMenuCollection();
                } else {
                    this.$message.error({"message": "收藏菜单删除失败"})
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        changeMenu() {
            this.menuType = true;
            this.menuListType = true;

            this.$nextTick( () => {
                this.getMenuboxItemPosition();
            })
        },
        openMenu() {
            this.menuType = true;
        },
        closeMenu() {
            if(this.menuListType == false){
                this.menuType = false;
            }
        },
        globalClick(e) {
            if(!this.$el.contains(e.target) && this.menuType){
                this.menuType = false;
                this.menuListType = false;
            }
        },
        btnBack(e){
            this.menuType = false;
            this.menuListType = false;
        },
        navMenuClick(item) {
            this.menuType = false;
            this.menuListType = false;
            this.$router.push({ path: `/${item.menuUrl}` });
        },
        // 新版
        menuClick(sysItem = {},fMenuItem = {},sMenuItem) {
            let item = sMenuItem || fMenuItem;

            if(item.urlAddr === '#' || item.urlAddr === '1' || item.urlAddr === '') return;
            
            //页面功能集成
            if(sysItem.systemInfoId == '141' && sysItem.systemInfoName == '页面功能集成'){
                window.open(item.urlAddr, '_blank');
                return;
            }

            //拼接一级+二级url
            if(sMenuItem && fMenuItem.urlAddr !== '#' && fMenuItem.urlAddr !== '1' && fMenuItem.urlAddr !== ''){
                item.urlAddr = `${fMenuItem.urlAddr}/${sMenuItem.urlAddr}`;
            }

            let otherServer = {
                '117': 'resServer', //营销资源
                '138': 'cpcServer', //cpc
                '111': 'basServer' //基础引擎
            }[sysItem.systemInfoId];

            if(otherServer){
                window.open(serverConfig[otherServer].format({urlAddr: item.urlAddr}), '_blank');
                return;
            }


            // this.$emit('menuClick', () => ({
            //  //需要加载的组件
            //  component: import(`@/components/pages/${item.component}`),
            //  //异步组件加载时使用的组件
            //  loading: LoadingComponent,
            //  //加载失败时使用的组件
            //  error: ErrorComponent,
            //  //展示加载时组件的延时时间
            //  delay: 200,
            //  //超时时间，显示失败组件
            //  timeout: 3000
            // }))

            // let componentObj = {
            //  menuId: item.menuId,
            //  component: () => import(`@/components/pages/${item.urlAddr}`),
            //  urlAddr: item.urlAddr,
            //  menuName: item.menuName
            // }

            // this.$emit('menuClick',componentObj);
            // this.$router.push({ path: item.urlAddr })

            this.$emit('menuClick',item);

            // if(this.$route.path == `/${item.urlAddr}`){
            //     this.$router.push({ path: `/blank` });
            //     return;
            // }


            if(item.menuId == '0-0'){
                this.$router.push({ path: `/home` });
            }else{
                this.$router.push({ path: `/${item.urlAddr}` });
            }

            this.menuType = false;
            this.menuListType = false;
            
        },
        getIsCollection(item){ //获取是否收藏 
            return this.collectionList.find(cItem => cItem.menuId == item.menuId);
        },
        getIsClick(item){ //获取是否可以点击菜单
            return item.urlAddr == '#' || item.urlAddr == '1' || item.urlAddr == ''  ? '' : 'click-menu';
        },
        getMenuboxItemPosition(){ //瀑布流方式计算菜单显示位置
            if(!this.$refs.menuItem) return;

            let waterfall = [0,0,0,0];
            
            //循环所有的菜单
            this.$refs.menuItem.forEach( item => {
                let top = -1,
                    index = 0,
                    itemRect = item.getBoundingClientRect();

                //计算位置
                waterfall.forEach( (wTop,wIndex) => {
                    if(top == -1 || wTop < top){
                        top = wTop;
                        index = wIndex;
                    }
                })

                item.style.top = `${top}px`;
                item.style.left = `${25 * index}%`;

                waterfall[index] = itemRect.height + top;
            })

        }
    }
};
</script>

<style lang="scss" scoped>
.nav {
    position: fixed;
    width: 50px;
    height: 100%;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
    background-color: $mainColor;
    transition: 0.3s all ease;
    z-index: 99;

    .header {
        width: 100%;
        height: 50px;
        padding: 5px 0;
        color: #fff;
        border-top: 1px solid #2f5096;
        border-bottom: 1px solid #18294d;
        background: linear-gradient(#21396b 0%, #1b2d55 100%);
        .menu-tit{
            font-weight: bold;
            cursor: pointer;
        }
        .tit-icon {
            display: inline-block;
            vertical-align: middle;
            width: 50px;
            height: 40px;
            background: url(./images/icon1.png) no-repeat center center;
        }
        p {
            display: inline-block;
            box-sizing: border-box;
            vertical-align: middle;
            width: 160px;
            height: 100%;
            line-height: 38px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
            padding-right: 8px;
        }
        .iconjiantou {
            color: #ffffff;
            font-size: 16px;
            font-weight: bold;
        }
        .fix {
            position: fixed;
            height: 100%;
            width: 70%;
            background: #fff;
            top: 50px; 
            left: 250px;
            box-shadow: 2px 0px 15px #999999;
            color: #555;
            z-index: 102;

            .a-close {
                height: 30px;
                .iconguanbi {
                    position: absolute;
                    top: 6px;
                    right: 14px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
            .search {
                padding: 0 30px;
                .iconsousuocu {
                    position: absolute;
                    top: 5px;
                    left: 30px;
                    font-size: 18px;
                }
                input {
                    padding: 0 25px;
                    width: 100%;
                    height: 30px;
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    border-bottom: 1px solid #aaaeb8;
                    outline: none;
                }
            }
            .his-tit {
                padding: 20px 0 10px 30px;
                font-size: 14px;
            }
            .his-list {
                padding: 10px 30px 8px 30px;
                dd {
                    display: inline-block;
                    height: 30px;
                    margin-right: 10px;
                    span {
                        position: relative;
                        padding: 8px 40px 8px 10px;
                        width: auto;
                        border: 1px solid #e8ecf7;
                        border-radius: 4px;
                        color: #aaaeb8;
                        font-size: 12px;
                        background-color: #f8faff;
                        cursor: pointer;
                        .iconguanbi {
                            position: absolute;
                            top: 8px;
                            right: 8px;
                        }
                    }
                }
            }
            .scroll-menu{
                height: calc(100% - 210px);
                padding-left: 22px;
                
                .menubox {
                    padding: 0 30px;

                    .menubox-item{
                        position: absolute;
                        width: 25%;
                        padding: 0 10px;
                    }

                    .i-s-title {
                        font-weight: bold;

                        i {
                            margin-right: 3px;
                        }
                    }

                    .second-menu{
                        padding-left: 10px;

                        span{
                            color: #8c91a1;
                        }
                    }
                    .systembox {
                        padding: 8px 0;
                        font-size: 14px;

                        span {
                            color: $mainColor;
                        }
                    }
                    .menu-item {
                        padding-right: 30px;
                        background-repeat: no-repeat;
                        background-position: 10px;

                        .iconkongwujiaoxing {
                            display: none;
                            font-size: 12px;
                        }
                        .menuview {
                            display: block;
                            padding: 8px 15px;
                        }

                        &.first-menu {
                            padding-left: 10px;
                            border-bottom: 1px solid #ECEFF8;
                            margin-top: 10px;

                            &:hover{
                                &.click-menu{
                                    span:before{
                                        background-color: #5A8AF2;
                                    }
                                }
                                
                            }

                            .menuview {
                                padding: 8px 15px 8px 18px;
                            }

                            span {
                                font-size: 14px;
                                color: $mainColor;

                                &:before {
                                    content: "";
                                    position: absolute;
                                    top: 16px;
                                    left: 5px;
                                    width: 4px;
                                    height: 4px;
                                    background-color: $mainColor;
                                }
                            }

                        }

                        &.click-menu{
                            cursor: pointer;

                            &:hover{
                                background-color: #f8faff;
                                span{
                                    color: #5A8AF2;
                                }

                                .iconkongwujiaoxing {
                                    display: block;
                                }
                            }
                        }

                        i {
                            position: absolute;
                            top: calc(50% - 6px);
                            right: 10px;
                            color: #588af2;
                            font-size: 13px;
                        }
                    }
                }
            }
            
        }
    }
    .left-nav {
        width: 100%;
        li {
            position: relative;
            transition: 0.5s all ease;
            width: 100%;
            height: 50px;
            cursor: pointer;
            color: #fff;
            i {
                position: absolute;
                top: 18px;
                right: 18px;
                display: none;
            }
            &:hover {
                i {
                    display: block;
                }
            }

            span {
                display: inline-block;
                width: 50px;
                height: 50px;
                left: 18px;
                top: 2px;
                font-size: 14px;
            }
        }
        p {
            display: inline-block;
            box-sizing: border-box;
            vertical-align: middle;
            width: 160px;
            height: 100%;
            line-height: 50px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 12px;
            padding-right: 8px;
        }
    }
    &.active {
        background-color: $mainColor;
        width: 250px;
        .header.active {
            animation:fadenum .5s 1;
            @-webkit-keyframes fadenum{ /*设置内容由显示变为隐藏*/
                0%{opacity: 0;}
                100%{opacity: 1;}
            }
            
        }
    }

    ul {
        li:hover {
            background: #224285;
        }
    }
}
</style>
