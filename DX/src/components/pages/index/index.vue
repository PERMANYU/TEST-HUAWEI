<template>
    <div class="main" > <!-- @contextmenu.prevent="" -->
        <Header @menuClick="headerMenuClick"></Header>
        <div class="m-tab">
            <div class="t-back" @click="globalback">
                <i class="iconfont icon-fanhui1811"></i>
                <span>返回</span>
            </div>
        	<div class="t-left" ref="menuTab">
        		<div v-for="(item,index) in componentObjLeftList" 
	        		@click="leftMenuTabClick(item)" 
                    @contextmenu.prevent="contextmenu($event,item)" 
	        		:class="['t-item',currentComponentLeftName == item.componentName ? 'active' : '']"
                    :style="{width: adjustLeftItemWidth()}" 
                    :title="item.menuName">
	        		<span class="i-close" @click.stop="leftMenuTabClose(item)"></span>
	        		<span class="i-name">{{item.menuName}}</span>
	        	</div>
                <div class="new-tab iconfont icon-jiahao" @click="newTabClick"></div>
                <div class="t-surplus" :style="surplusStyle"></div>
                <div class="app__clear"></div>
        	</div>
        </div>
        <div v-show="contextmenuShow" class="m-contextmenu" ref="contextmenu">
            <div class="c-item" @click="contextmenuCloseClick()">
                <span>关闭标签页</span>
            </div>
            <div class="c-item" @click="contextmenuCloseOtherClick()">
                <span>关闭其他标签页</span>
            </div>
            <div class="c-item" @click="contextmenuCloseRightClick()">
                <span>关闭右侧标签页</span>
            </div>
        </div>
        <div class="m-content">
            <keep-alive :include="componentIncludeList">
                <router-view ref="routerView"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
	import Header from '@/components/common/page-header';
    import Menu from '@/assets/js/menu';

    export default {
        data() {
            return {
                componentIncludeList: [],
                currentComponentLeft:'',
                currentComponentLeftName:'',
                componentObjLeftList: [],
                contextmenuShow:false,
                contextmenuItem:null,
                surplusStyle:{},
                routeActiveDate:'',
                isRefreshPath: false,
                isClickRoute: false
            }
        },
        watch:{
            $route(to,from){
                if(from.path == "/main/blank"){
                    this.isRefreshPath = true;
                }else{
                    this.isRefreshPath = false;
                }
                if(to.path == "/main/blank") return;
                if(from.path == "/main/new-tab"){
                    this.newTabClose();
                }
                this.isClickRoute = false;
                this.routeTab(to.path);
            },
            componentObjLeftList(val,old){
                this.adjustSurplusWidth();
            }
        },
        mounted(){
            this.routeTab(this.$route.path);
            this.adjustSurplusWidth();
            document.addEventListener('click', this.globalClick);
            window.addEventListener('resize', this.adjustSurplusWidth);
        },
        methods:{
            headerMenuClick(item){
                this.isClickRoute = true;
            },
            routeTab(path){
                if(path == "/main/new-tab"){
                    this.newTabChange();
                    return;
                }
                let menuItem = Menu.findItemByComponentName(path);

                if(!menuItem) return;
                let componentObj = {
                    menuId: menuItem.menuId,
                    component: () => import(`@/components/pages/${menuItem.componentName}`),
                    componentName: menuItem.componentName,
                    menuName: menuItem.menuName
                }
                this.menuClick(componentObj);
            },
        	menuClick(componentObj){//菜单点击
        		this.currentComponentLeft = componentObj.component;
        		this.currentComponentLeftName = componentObj.componentName;

                if(this.componentIncludeList.includes(componentObj.componentName)){
                    if(this.isRefreshPath){
                        this.componentIncludeList = this.componentIncludeList.filter( item => item != componentObj.componentName);
                        setTimeout( () =>{
                            this.componentIncludeList.push(componentObj.componentName);
                        },10)
                    }
                }else{
                    this.componentIncludeList.push(componentObj.componentName);
                }

                let eComponent = this.componentObjLeftList.find( item => item.menuId == componentObj.menuId);
        		if(eComponent){
                    return;
                }

                // this.$progress.show();

                setTimeout( () =>{
                    this.$progress.hide();
                },200)

        		this.componentObjLeftList.push(componentObj);
        	},
        	leftMenuTabClick(val){ //左侧菜单点击切换
                this.isClickRoute = true;
                this.$router.push({ path: val.componentName })
        	},
            contextmenu(e,val){ //右键菜单
                let contextmenuEl = this.$refs.contextmenu;
                contextmenuEl.style.top = `${e.clientY}px`;
                contextmenuEl.style.left = `${e.clientX}px`;

                this.contextmenuShow = true;
                this.contextmenuItem = val;
            },
        	leftMenuTabClose(val){ //左侧按钮关闭
                if(!this.componentObjLeftList.find(item => item.componentName == val.componentName)) return;

        		this.componentObjLeftList = this.componentObjLeftList.filter( item => item.componentName != val.componentName);

        		this.componentIncludeList = this.componentIncludeList.filter( item => item != val.componentName);

        		if(this.currentComponentLeftName == val.componentName){
        			if(this.componentObjLeftList.length > 0){
                        this.$router.push({ path: this.componentObjLeftList[0].componentName });
        			}else{
        				this.$router.push({ path: '/'})
        			}
        		}
        	},
            contextmenuCloseClick(){ //右键菜单关闭标签
                this.leftMenuTabClose(this.contextmenuItem);
            },
            contextmenuCloseOtherClick(){ //右键菜单关闭其他标签页
                let tmpLeftList = [...this.componentObjLeftList];

                if(tmpLeftList.find(item => item.componentName == this.contextmenuItem.componentName)){
                    tmpLeftList.filter( item => {
                        if(item.componentName != this.contextmenuItem.componentName){
                            this.leftMenuTabClose(item);
                        }
                        return true;
                    })
                }
            },
            contextmenuCloseRightClick(){ //右键菜单关闭右侧标签页
                let closeStart = false,
                    tmpLeftList = [...this.componentObjLeftList];

                tmpLeftList.filter( item => {
                    if(closeStart){
                        this.leftMenuTabClose(item);
                    }
                    if(item.componentName == this.contextmenuItem.componentName){
                        closeStart = true;
                    }
                    return true;
                })
            },
            adjustLeftItemWidth(){
                if(this.componentObjLeftList.length == 0) return;
                let menuTabRect = this.$refs.menuTab.getBoundingClientRect();
                let leftTabWidth = menuTabRect.width - 35;
                let surplusWidth = 0;

                return `${1/this.componentObjLeftList.length * (leftTabWidth) - 5}px`;
            },
            adjustSurplusWidth(e){//计算右侧空白条宽度
                if(!this.$refs.menuTab) return;
                let menuTabRect = this.$refs.menuTab.getBoundingClientRect();
                let surplusWidth = 0;

                if(Math.floor((menuTabRect.width) / 130) > this.componentObjLeftList.length){
                    surplusWidth = menuTabRect.width - (this.componentObjLeftList.length * 130 + this.componentObjLeftList.length * 5) - 35;
                }else{
                    surplusWidth = 0;
                }

                this.surplusStyle = {
                    width: `${surplusWidth}px`,
                    zIndex: `1`
                }
            },
            newTabClick(){//新标签页
                this.$router.push({ path: '/main/new-tab'})
            },
            newTabChange(){
                let componentObj = {
                    menuId: 'new-tab',
                    component: () => import(`@/components/pages/new-tab`),
                    componentName: 'new-tab',
                    menuName: '新标签页'
                }
                this.menuClick(componentObj);
            },
            newTabClose(){
                if(!this.isClickRoute){
                    this.componentIncludeList = this.componentIncludeList.filter( item => item != 'new-tab');
                    this.componentObjLeftList = this.componentObjLeftList.filter( item => item.menuId != 'new-tab');
                }
            },
            globalback(){
                let component = this.$refs.routerView;
                try{
                    if(typeof(eval(component.globalback)) == "function"){
                        component.globalback();
                    }else{
                        this.$router.push({ path: `/` });
                    }
                }catch(e){
                    this.$router.push({ path: `/` });
                }
            },
            globalClick(e){//全局点击事件
                this.contextmenuShow = false;
            }
        },
        components:{
        	Header
        }
    }
</script>
<style scoped lang="scss">
	.main{
        width: 100%;
        height: 100%;
		padding: 100px 0 0;

		.m-tab{
			position: absolute;
			width: 100%;
			height: 40px;
			line-height: 30px;
			top: 60px;
			left: 0;
            padding-top: 5px;
            padding-left: 60px;
			background-color: #f6f7f9;

            .t-back{
                position: absolute;
                left: 0;
                top: 5px;
                height: 30px;
                line-height: 30px;
                width: 55px;
                color: $mainColor;
                text-align: center;
                background-color: #fff;
                border-radius: 4px;
                cursor: pointer;
                z-index: 0;

                &:hover{
                    color: #fff;
                    background-color: $mainColor;
                }
            }

			.t-left{
				width: 100%;
			}

            .new-tab{
                width: 30px;
                height: 30px;
                text-align: center;
                color: $mainColor;
                background-color: #fff;
                float: left;
                border-radius: 4px;
                cursor: pointer;
            }

            .t-surplus{
                height: 30px;
                margin-left: 5px;
                background-color: #fff;
                float: left;
                border-radius: 4px;
            }

			.t-item{
				max-width: 130px;
                height: 30px;
                padding: 0 20px 0 20px;
                margin-right: 5px;
                float: left;
                cursor: default;
                background-color: #fff;
                border-radius: 4px;

                &.active{
                    color: #fff;
                    background-color: $mainColor;

                    .i-close{
                        background: url(./images/tab_close_w.png) no-repeat 100%;

                        &:hover{
                            background: url(./images/tab_close_w.png) no-repeat 100%;
                        }
                    }
                }

                &:hover{
                    .i-close{
                        display: block;
                    }
                }

                .i-name{
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

				.i-close{
					display: block;
					position: absolute;
					width: 16px;
					height: 16px;
					right: 10px;
					top: 7px;
                    background: url(./images/tab_close_grey.png) no-repeat 100%;

                    &:hover{
                        background: url(./images/tab_close.png) no-repeat 100%;
                    }
				}
			}
		}

        .m-contextmenu{
            position: absolute;
            z-index: 101;
            background-color: #fff;
            padding: 5px 0;
            border-radius: 4px;
            box-shadow: 0 1px 6px rgba(0,0,0,.2);

            .c-item{
                height: 30px;
                line-height: 30px;
                cursor: default;
                padding: 0 10px;

                &:hover{
                    background-color: #f0f0f0;
                }
            }
        }

		.m-content{
			width: 100%;
            height: 100%;

            &.separate{
                float: left;
                width: 50%;
            }
		}
	}
</style>
