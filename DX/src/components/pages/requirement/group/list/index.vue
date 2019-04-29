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
					<Search placeholder="请输入需求单名称" @search="search"></Search>
				</Col>
				<Col :span="10">
					<div :class="['h-operation',searchData.length > 0 ? 'active' : '']">
						<SearchBox v-model="searchData"></SearchBox>
					</div>
				</Col>
				<Col class="col-btn" :span="6">
					<div class="app__btn app__btn-add" @click="derive()">导出</div>
					<div class="app__btn app__btn-pull" @click="changeRequire()">变更需求单</div>
					<div class="app__btn app__btn-newRequire" @click="newRequire()">发起需求单</div>
				</Col>
			</Row>
		</div>
		<div class="require-data">
			<keep-alive>
				<component :is="currentView" @changeSearchData="changeSearchData" @checkbox='checkbox' v-if="currentView = 'havedone'" ref="haveDone"></component>
			</keep-alive>
		</div>

		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="选择需求单类型" ref="reqtype" @confirm="reqTypeSubmit" :initBtn="true">
			<Row>
				<Col :span="8">
					<div :class="['req-item',itemIndex == '1'?'active':'']" @click="prodsClick()">
						<div class="prods-icon"></div>
						<p>产品</p>
						<div class="req-selected"></div>
					</div>
				</Col>
				<Col :span="8">
					<div :class="['req-item',itemIndex == '2'?'active':'']" @click="goodsClick()">
						<div class="goods-icon"></div>
						<p>销售品</p>
						<div class="req-selected"></div>
					</div>
				</Col>
				<Col :span="8">
					<div :class="['req-item',itemIndex == '3'?'active':'']" @click="repayClick()">
						<div class="goods-icon"></div>
						<p>清退</p>
						<div class="req-selected"></div>
					</div>
				</Col>
			</Row>
			<template slot="btnBox">
				<span class="back" @click="btnCancel()">取消</span>
				<span class="next" @click="btnSave()" >下一步</span>
			</template>
		</Dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentView: 'havedone',
				tabs: [
				    {
                        label: '全部数据',
                        value: '',
                        flag:1
                    }, {
                        label: '我参与的',
                        value: '1002',
                        flag:2
                    }, {
                        label: '我发起的',
                        value: '1200',
                        flag:3
                    }
				],
                //已选下拉信息
                tabInfo: {
                    label: '我发起的',
                    value: '1200',
                    flag:3
                },

				activeIndex: 0,
				dialogTitle: '',
				dialogSize: {
					min: 320,
					max: 370
				},
				dataLabel: "全部数据",
				tabView: 'select1',
				iscur: 1,
				downFlag: false,
				itemIndex:1,
				searchData:[],
                requirementData:{},
                checkboxData:[]
			}
		},

        watch: {
            //监听searchData
            searchData: function(val,oldval){
                this.$refs.haveDone.titleSearch(this.searchData);
            }
        },
        mounted(){
        	this.requirementRole()
        },

		methods: {
			//需求单角色接口
            requirementRole(){
            	this.$axios.get(this.$api.GetRequirementRole, {
                    params: {
                        sid:this.$user.getSid()
                    }
                }).then(res => {
                	console.log(res.data)
                })
            },
            //修改searchData
            changeSearchData(val){
                this.searchData = this.searchData.filter( item => item.label != val.label);
                this.searchData.push(val);
            },


            dropChange(val){
                this.tabInfo = val;
                this.$refs.haveDone.tabChange(val);
            },

			startrequire() {

			},
			toggleDown() {
				this.downFlag = !this.downFlag
			},
			downClick(val) {
				this.dataLabel = val + "数据"
			},
			pull() {

			},
			newRequire() {
				this.$refs.reqtype.show();
			},
			changeRequire() {
				this.$refs.reqtype.show();
				this.requirementData = {
					actType: 'MOD'
				};
			},
			search(val) {
				this.$refs.haveDone.search(val);
			},
			prodsClick(){
				this.itemIndex = 1
			},
			goodsClick(){
				this.itemIndex = 2
			},
			repayClick() {
				this.itemIndex = 3
			},
			reqTypeSubmit(){

			},
			btnSave(){
				if (this.itemIndex == 1) {
					//产品需求单
					this.$emit('componentView', 'prodAdd',{})
				} else if(this.itemIndex == 2){
					//销售品需求单
					this.$emit('componentView', 'add',this.requirementData)
				}else{
					this.$emit('componentView', 'repayAdd',{})
				}
			},

			btnCancel(){
				this.$refs.reqtype.hide();
            },
            derive() {
                if(this.checkboxData.length == 0) {
                    this.$message.warning({message: '请选择一条数据！'})
                } else if(this.checkboxData.length >= 2){
                    this.$message.warning({message: '只能选择一条数据！'})
                } else{
                    window.open(this.$api.ExportTemplateForReq + `?requirementId=${this.checkboxData[0]}`);
                }
                this.checkboxData = [];
            },
            checkbox(val) {
                this.checkboxData = val;
            }
		},
		components: {
			havedone: () =>
				import('./group/havedone')
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
					background: url(images/all.png) no-repeat center;
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
					left: 100px;
					background: url(images/down.png) no-repeat center;
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

                .col-btn{
                    text-align: right;
                    .app__btn-add {
                        margin-right: 10px;
                    }
                }
			}
		}
		.require-data {
			height: 100%;
			.require-data-header {
				height: 50px;
				line-height: 50px;
				.all-data {
					float: left;
				}
				.cpc__btn-tab-box {
					float: right;
				}
			}
		}
	}

	.req-item {
		position: relative;
		width: 90px;
		height: 90px;
		margin: 30px auto;
		border: solid 1px #f5f5f5;
		cursor: pointer;
		color: #333;
		.prods-icon{
			width: 26px;
			height: 26px;
			margin: 22px auto 0;
			background: url(images/cp.png) no-repeat center;
			background-size: 26px 26px;
		}
		.goods-icon{
			width: 26px;
			height: 26px;
			margin: 22px auto 0;
			background: url(images/sp1.png) no-repeat center;
			background-size: 26px 26px;
		}
		p{
			text-align: center;
			font-family: MicrosoftYaHei;
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 40px;
			letter-spacing: 0px;
			color: #333333;
		}
		.req-selected{
			position: absolute;
			right: 6px;
			bottom: 6px;
			width: 16px;
			height: 16px;
			background: url(images/weixuanzhong_03.png) no-repeat center;
			background-size: 16px 16px;
		}
		&.active{
			color: $mainColor;
			border: solid 1px $mainColor;
			.prods-icon{
				background: url(images/cpb.png) no-repeat center;
				background-size: 26px 26px;
			}
			.goods-icon{
				background: url(images/sp.png) no-repeat center;
				background-size: 26px 26px;
			}
			p{
				color: $mainColor;
			}
			.req-selected{
				background: url(images/xuanzhong_03.png) no-repeat center;
				background-size: 16px 16px;
			}
		}
		&:hover{
			color: $mainColor;
			border: solid 1px $mainColor;
			.prods-icon{
				background: url(images/cpb.png) no-repeat center;
				background-size: 26px 26px;
			}
			.goods-icon{
				background: url(images/sp.png) no-repeat center;
				background-size: 26px 26px;
			}
			p{
				color: $mainColor;
			}
		}
	}
	.h-operation{
		width: 100%;
		padding: 0 10px;
		transition: .3s all ease;
		background-color: #fff;
	}
</style>
