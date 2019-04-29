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

        <div class="right">
            <component :is="isComponentName"></component>
        </div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
                leftMenuList:[{ //左侧菜单按钮
                    name:'退单认领',
                    componentName: 'claim',
                    icon: 'iconchanpinzichanliebiao'
                },{
                    name:'退单代办',
                    componentName: 'await',
                    icon: 'iconxiaoshoupinzichanliebiao'
                },{
                    name:'退单已办',
                    componentName: 'already',
                    icon: 'iconguanxi'
                }],
				menuComponentName: 'claim',
                isComponentName: 'claim'
			}
		},
		mounted(){

		},
        methods:{
            menuClick(item){
                this.isComponentName = '';

                this.$nextTick( () => {
                    this.menuComponentName = item.componentName;
                    this.isComponentName = item.componentName;
                })

                
            }
        },
        components:{
            Claim: () => import('./group/claim'),
            Await: () => import('./group/await'),
            Already: () => import('./group/already')
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