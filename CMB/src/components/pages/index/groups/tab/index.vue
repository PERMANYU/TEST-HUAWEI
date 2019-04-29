<template>
	<div class="tab">
		<div class="m-tab">
	        <div class="t-back" @click="globalback">
	            <i class="iconfont iconback"></i>
	        </div>
	    	<div class="t-left" ref="menuTab">
	    		<div v-for="(item,index) in componentObjLeftList" 
	        		@click="leftMenuTabClick(item)" 
	                @contextmenu.prevent="contextmenu($event,item)" 
	        		:class="['t-item',currentComponentLeftName == item.urlAddr ? 'active' : '']"
	                :style="{width: adjustLeftItemWidth()}" 
	                :title="item.menuName">
	        		<span class="i-close iconfont iconguanbi" @click.stop="leftMenuTabClose(item)"></span>
	        		<span class="i-name">{{item.menuName}}</span>
	        	</div>
	            <!-- <div class="new-tab iconfont icon-jiahao" @click="newTabClick"></div> -->
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
	</div>
</template>

<script type="text/javascript">
	import Menu from '@/assets/js/menu';

	export default{
		data(){
			return{
				componentIncludeList: [],
				componentObjLeftList: [],
				surplusStyle:{},
				contextmenuShow:false,
				currentComponentLeft:'',
                currentComponentLeftName:''
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
            routeTab(path){
                if(path == "/main/new-tab"){
                    this.newTabChange();
                    return;
                }
                let menuItem = Menu.findItemByComponentName(path);

                if(!menuItem) return;
                let componentObj = {
                    menuId: menuItem.menuId,
                    component: () => import(`@/components/pages/${menuItem.urlAddr}`),
                    urlAddr: menuItem.urlAddr,
                    menuName: menuItem.menuName
                }
                this.menuClick(componentObj);
            },
            menuClick(componentObj){//菜单点击
        		this.currentComponentLeft = componentObj.component;
        		this.currentComponentLeftName = componentObj.urlAddr;

                if(this.componentIncludeList.includes(componentObj.urlAddr)){
                    if(this.isRefreshPath){
                        this.componentIncludeList = this.componentIncludeList.filter( item => item != componentObj.urlAddr);
                        setTimeout( () =>{
                            this.componentIncludeList.push(componentObj.urlAddr);
                        },10)
                    }
                }else{
                    this.componentIncludeList.push(componentObj.urlAddr);
                }

                let eComponent = this.componentObjLeftList.find( item => item.menuId == componentObj.menuId);
        		if(eComponent){
                    return;
                }

        		this.componentObjLeftList.push(componentObj);
        	},
			globalback(){
                this.$router.push({ path: `/home` });
            },
            leftMenuTabClick(val){ //左侧菜单点击切换
                this.isClickRoute = true;
                this.$router.push({ path: val.urlAddr })
        	},
        	contextmenu(e,val){ //右键菜单
                let contextmenuEl = this.$refs.contextmenu;
                contextmenuEl.style.top = `${e.clientY - 60}px`;
                contextmenuEl.style.left = `${e.clientX - 60}px`;

                this.contextmenuShow = true;
                this.contextmenuItem = val;
            },
            leftMenuTabClose(val){ //左侧按钮关闭
                if(!this.componentObjLeftList.find(item => item.urlAddr == val.urlAddr)) return;

        		this.componentObjLeftList = this.componentObjLeftList.filter( item => item.urlAddr != val.urlAddr);

        		this.componentIncludeList = this.componentIncludeList.filter( item => item != val.urlAddr);

        		if(this.currentComponentLeftName == val.urlAddr){
        			if(this.componentObjLeftList.length > 0){
                        this.$router.push({ path: this.componentObjLeftList[0].urlAddr });
        			}else{
        				this.$router.push({ path: '/home'})
        			}
        		}
        	},
        	newTabClick(){//新标签页
                this.$router.push({ path: '/main/new-tab'})
            },
            contextmenuCloseClick(){ //右键菜单关闭标签
                this.leftMenuTabClose(this.contextmenuItem);
            },
            contextmenuCloseOtherClick(){ //右键菜单关闭其他标签页
                let tmpLeftList = [...this.componentObjLeftList];

                if(tmpLeftList.find(item => item.urlAddr == this.contextmenuItem.urlAddr)){
                    tmpLeftList.filter( item => {
                        if(item.urlAddr != this.contextmenuItem.urlAddr){
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
                    if(item.urlAddr == this.contextmenuItem.urlAddr){
                        closeStart = true;
                    }
                    return true;
                })
            },
            adjustSurplusWidth(e){//计算右侧空白条宽度
                if(!this.$refs.menuTab) return;
                let menuTabRect = this.$refs.menuTab.getBoundingClientRect();
                let surplusWidth = 0;

                if(Math.floor((menuTabRect.width) / 130) > this.componentObjLeftList.length){
                    surplusWidth = menuTabRect.width - (this.componentObjLeftList.length * 130 + this.componentObjLeftList.length * 5) - 5;
                }else{
                    surplusWidth = 0;
                }

                this.surplusStyle = {
                    width: `${surplusWidth}px`,
                    zIndex: `1`
                }
            },
            adjustLeftItemWidth(){
                if(this.componentObjLeftList.length == 0) return;
                let menuTabRect = this.$refs.menuTab.getBoundingClientRect();
                let leftTabWidth = menuTabRect.width - 35;
                let surplusWidth = 0;

                return `${1/this.componentObjLeftList.length * (leftTabWidth) - 5}px`;
            },
        	globalClick(e){//全局点击事件
                this.contextmenuShow = false;
            }
		}
	}
</script>

<style scoped lang="scss">
	.tab{
		.m-tab{
			width: 100%;
			height: 30px;
			line-height: 30px;
			margin-top: 10px;
			padding-left: 45px;

            .t-back{
                position: absolute;
                left: 0;
                top: 0;
                height: 30px;
                line-height: 30px;
                width: 45px;
                color: #fff;
                text-align: center;
                background-color: #ffa966;
                border-radius: 2px;
                cursor: pointer;
                z-index: 0;

                &:hover{
                    /*color: #fff;*/
                    /*background-color: $mainColor;*/
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
                margin-left: 5px;
                float: left;
                cursor: default;
                background-color: #fff;
                border-radius: 2px;
                color: $mainColor;

                &.active{
                    color: #fff;
                    background-color: $mainColor;

                    .i-close{

                        &:hover{

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
					line-height: 16px;

                    &:hover{

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
	}
</style>