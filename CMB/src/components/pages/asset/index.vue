<template>
	<div class="list">

        <div class="left">
            <Row v-for="(item,index) in leftMenuList" :key="index">
                <Col @click.native="menuClick(item)" :class="[menuComponentName == item.componentName ? 'active' : '']">
                    <span :class="['iconfont', item.icon]"></span>
                    <span>{{item.name}}</span>
                </Col>
            </Row>
        </div>

        <Scroll class="right" :isShowRight="true" ref="scroll">
            <component :is="isComponentName" :componentData="currentData"></component>
        </Scroll>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
                leftMenuList:[{ //左侧菜单按钮
                    name:'产品资产列表',
                    componentName: 'prodAsset',
                    isName: 'prodAsset',
                    icon: 'iconchanpinzichanliebiao',
                    tabPaneValue:'prodInfo', 
                    tabPaneList:[{ 
                        label:'产品资产详情',
                        value:'prodInfo'
                    },{
                        label:'产品属性',
                        value:'prodAttr'
                    },{
                        label:'业务历史',
                        value:'businessHistory'
                    },{
                        label:'账户信息',
                        value:'accountInfo'
                    },{
                        label:'客户信息',
                        value:'customerInfo'
                    },{
                        label:'产品关系',
                        value:'prodRel'
                    },{
                        label:'产品资产明细',
                        value:'prodChild'
                    }],
                },{
                    name:'销售品资产列表',
                    componentName: 'offerAsset',
                    isName: 'offerAsset',
                    icon: 'iconxiaoshoupinzichanliebiao',
                    tabPaneValue:'offerInfo',
                    tabPaneList:[{ 
                        label:'销售品资产详情',
                        value:'offerInfo'
                    },{
                        label:'销售品属性',
                        value:'offerAttr'
                    },{
                        label:'业务历史',
                        value:'businessHistory'
                    },{
                        label:'产品关系',
                        value:'prodRel'
                    }]
                },{
                    name:'销售品产品关系',
                    componentName: 'offerProdRel',
                    isName: 'offerAsset',
                    icon: 'iconguanxi',
                    tabPaneValue: 'prodRel',
                    tabPaneList:[{
                        label:'产品关系',
                        value:'prodRel'
                    }]
                }],
				menuComponentName: 'prodAsset',
                isComponentName: 'prodAsset',
                currentData:{}
			}
		},
        watch:{
            $route(to,from){
                if(to.name !== 'asset') return;
                this.changeMenu(to.params.menu_type);
            }
        },
        created(){
            this.changeMenu(this.$route.params.menu_type);
        },
		mounted(){

		},
        methods:{
            changeMenu(menu_type){
                let menuItem = this.leftMenuList.find(item => item.componentName == menu_type);

                if(!menuItem){
                    this.$router.push({ path: `/home` });
                    return;
                }

                this.isComponentName = '';
                this.currentData = {
                    tabPaneValue: menuItem.tabPaneValue,
                    tabPaneList: menuItem.tabPaneList || [],
                    titleName: menuItem.name
                }

                this.$nextTick( () => {
                    this.menuComponentName = menuItem.componentName;
                    this.isComponentName = menuItem.isName;

                    this.$nextTick( () => {
                        this.$refs.scroll.init();
                    })
                })
            },
            menuClick(item){
                this.$router.push({ path: `/asset/${item.componentName}` });
            }
        },
        components:{
            prodAsset: () => import('./group/prod-asset'),
            offerAsset: () => import('./group/offer-asset'),
            offerProdRel: () => import('./group/offer-prod-rel')
        }
	}
</script>

<style scoped lang="scss">
    .list{
        width: 100%;
        height: 100%;
        background-color: #f7fbfc;

        .left{
            float: left;
            width: 180px;
            height: 100%;
            padding-top: 20px;
            background-color: #fff;
            font-size: 14px;
            color: #647283;

            .col{
                padding: 12px 0 12px 25px;
                cursor: pointer;

                &:hover{
                    color: #5a8af2;
                }

                &.active{
                    color: #5a8af2;
                }
            }

            .iconfont{
                margin-right: 10px;
            }
        }

        .right{
            float: left;
            margin-left: 10px;
            width: calc(100% - 190px);
            height: 100%;
        }

        
    }
</style>