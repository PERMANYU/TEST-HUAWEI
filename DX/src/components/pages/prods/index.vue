<template>
	<div class="main-wrap">
        <div class="require-state">
            <Row class="search-row">
                <Col :span="3" class="require-statelabel">
                    <i class="icon-all"></i>
                    <i :class="['icon-down',downFlag?'active':'']" @click="toggleDown()"></i>
                    <DropSel :obj="tabs" :text="tabInfo.label" @change="dropChange"></DropSel>
                </Col>

                <Col :span="5">
                    <Search placeholder="请输入销售品内部名称或内部编码" @search="search" ref="searchInput"></Search>
                </Col>
            </Row>
        </div>

        <div class="require-data">
            <keep-alive>
		        <component :is="currentView" @componentView="changeView" :componentData="currentData" ref="component"></component>
		    </keep-alive>
        </div>


	</div>
</template>

<script>
	export default {
		data() {
			return {
                staffId: 123,
				currentView: 'list',
				currentData:{},
                checkArr: [],
				downFlag: false,
				pageFlag: false,
				tabs: [
                    {
                        label: '全部记录',
                        value: '2000'
                    },{
                        label: '我的产品',
                        value: ''
                    }
				],
                tabInfo:{
                    label: '我的产品',
                    value: ''
                },
			}
		},
        mounted() {
        	
        },
        activated(){
        	if(this.$route.params.offerName){
        		this.$refs.searchInput.setValue(this.$route.params.offerName);
        		this.search(this.$route.params.offerName);
			}
        },
		methods: {
			changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
            },
			dropChange(val){
                this.tabInfo = val;
                this.$refs.haveDone.tabChange(val);
			},
			toggleDown() {
				this.downFlag = !this.downFlag
			},
            //跳转配置页面
            goCommodity(obj){
            	this.currentView = 'product';
//              let componentData={
//                  offerId:obj.offerId,
//                  offerName:obj.offerName,
//                  offerSysName:obj.offerSysName,
//                  requirementId:obj.requirementId,
//                  parentPage:'goods',
//                  requestType:'11',
//              };
//              if(obj.flowStatus == '10' || obj.flowStatus == null){
//                  this.$emit('componentView','commodity',componentData);
//              }else if(obj.flowStatus =='11'||obj.flowStatus=='12'||obj.flowStatus =='13'||obj.flowStatus=='14'||obj.flowStatus=='15'){
//                  this.$emit('componentView','goodsview',componentData);
//              }
            },

            //跳转需求单新增页面
            goaddNeed(){
                this.$emit('componentView','add',{type:'11'});
            },


            //点击搜索
			search(val) {
				this.pageFlag = true
				this.$refs.component.search(val);
			},
			checkList(val) {
				this.checkArr = val;
			},
			componentMounted(vm){
				if(this.currentView == 'havedone' && !this.$route.params.offerName){
					this.search('');
				}
			}
		},
		components: {
			list: () => import('./group/list'),
            product: () => import('./group/product'),
		}
	}
</script>

<style scoped lang="scss">
	.main-wrap {
		height: 100%;
		padding: 0 20px 50px;
		.require-state {
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			color: #333;
			position: relative;
			z-index: 3;
			.require-statelabel {
				float: left;
				height: 30px;
				line-height: 30px;
				padding: 5px 0 0 20px;
				.icon-all {
					position: absolute;
					display: block;
					width: 18px;
					height: 18px;
					margin-top: 6px;
					margin-right: 8px;
					background: url(./images/all.png) no-repeat center;
					background-size: 18px 18px;
				}
				.drop-sel {
                    min-width: 100px;
					padding: 0 20px 0 20px;
				}
				.alllabel {
					display: inline-block;
					float: left;
					margin-right: 6px;
					cursor: pointer;
				}
				.icon-down {
					position: absolute;
					display: block;
					width: 12px;
					height: 12px;
					margin-top: 10px;
					left: 110px;
					background: url(./images/down.png) no-repeat center;
					background-size: 10px 6px;
				}
				.down-menu {
					position: absolute;
					top: 40px;
					left: 0;
					z-index: 2;
					width: 100%;
					background-color: #fff;
					display: none;
					border: 1px solid #F3F3F3;
					border-radius: 5px;
					.tab {
						display: block;
						float: left;
						width: 100%;
						height: 30px;
						margin-top: 10px;
						text-decoration: none;
						line-height: 30px;
						color: #323232;
						text-align: center;
						&:hover {
							background-color: #dff1fc;
						}
					}
					&.active {
						display: block;
					}
				}
			}
			.search-row {
				padding-top: 5px;

                .btn-box{
                    text-align: right;
                    padding-right: 10px;
                }
			}
		}
		.require-data {
			height: 100%;
		}
	}
</style>
