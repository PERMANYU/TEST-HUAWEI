<template>
    <transition name="fade">
		<div class="product">
			<Scroll class="app__table__inner" :isShowRight="true">
			<div class="title">
				<span class="t-name">详情</span>
				<span class="close" @click="pageClose()"></span>
			</div>
			<!-- 填写基本信息  -->
			<div class="access-info" ref="addAttrName">
				<Scroll class="basic-info" ref="listScroll" :isShowRight="true">
					<div class="c_title">
						<span class="c-t-name">基本信息</span>
					</div>
					<Row>
						<Form labelWidth="120px" labelAlign="right">
							<Col :span="8">
								<FormItem labelText="业务名称:">
									<span>{{fairValueForm.fairValueName}}</span>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1" >
								<FormItem labelText="所属目录:">
									<span>{{fairValueForm.catalogItemName}}</span>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="类型:">
									<span>{{fairValueForm.bizType == '1' ? '功能类' : fairValueForm.bizType == '2' ? '通信类' : ''}}</span>
								</FormItem>
							</Col>
							<Col :span="8">
								<FormItem labelText="公允价值(元):">
									<span>{{fairValueForm.fairValue}}</span>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="公允价值单位:">
									<span>{{fairValueForm.unit == '10' ? '元/分钟' : fairValueForm.unit == '11' ? '元/月' : fairValueForm.unit == '12' ? '元/MB' : fairValueForm.unit == '13' ? '元/分钟' : fairValueForm.unit == '14' ? '元/条' : fairValueForm.unit == '15' ? '元/月/账号' : ''}}</span>
								</FormItem>
							</Col>
							
						</Form>
						
					</Row>				
				</Scroll>
			</div>
			
			<!--  配置公允值价值规则 -->
			<div class="access-config"  ref="addAttrValue">
				<!-- 功能类 -->
				<div class="basic-info" v-if="this.componentData.bizType == '1'" ref="listScroll" :isShowRight="true">
					<!-- 产品配置 -->
					<div class="main">
						<div class="c_title">
							<span class="c-t-name">产品</span>
						</div>

						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="afListScroll">
							<Row class="app__table-thead">
								<Col :span="4">产品名称</Col>
								<Col :span="4">产品编码</Col>
								<Col :span="4">所属根产品名称</Col>
								<Col :span="4">所属根产品编码</Col>
								<Col :span="4">管理级别</Col>
								<Col :span="4">产品功能类型</Col>
							</Row>

							<Row :class="['app__table-item']" v-for="(item,index) in functionProConfigList" :key="index">
								<Col :span="4">{{item.prodName}}</Col>
								<Col :span="4">{{item.prodNbr}}</Col>
								<Col :span="4">{{item.rootProdName}}</Col>
								<Col :span="4">{{item.rootProdNbr}}</Col>
								<Col :span="4">{{item.funType}}</Col>
								<Col :span="4">{{item.manageGrade}}</Col>
							</Row>
							<Row v-if="!functionProConfigList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</Scroll>

						<div class="p-footer" v-if="this.componentData.bizType == '1'">
							<Pagination :pageIndex="funProConfigPageInfo.pageIndex" :pageSize="funProConfigPageInfo.pageSize" :rowCount="funProConfigPageInfo.rowCount" :isCenter="true" @change="funProConfigPageChange"></Pagination>
						</div>
					</div>
					<!-- 收入费用项配置 -->
					<div class="main main-funfee">
						<div class="c_title">
							<span class="c-t-name">收入费用项配置</span>
						</div>

						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="afListScroll">
							<Row class="app__table-thead">
								<Col :span="8">收入费用名称</Col>
								<Col :span="4">收入费用编码</Col>
								<Col :span="6">产品</Col>
								<Col :span="6">付费方式</Col>
							</Row>

							<Row :class="['app__table-item']" v-for="(item,index) in functionFeeConfigList" :key="index">
								<Col :span="8">{{item.chrgItemName}}</Col>
								<Col :span="4">{{item.chrgItemCode}}</Col>
								<Col :span="6">
									<span>{{item.prodName}}</span>
								</Col>
								<Col :span="6">
									<span v-for="(titItem, titIndex) in getPayType(item.payType)" :key="titIndex">
									{{titItem == '1200' ? '后付费' : titItem == '1201' ? '准实时预付费' : titItem == '1202' ? '准预付费实时信控' : titItem == '2100' ? '预付费' : titItem == '3100' ? '按电信规则确定' : ''}};</span>
								</Col>
							</Row>
							<Row v-if="!functionFeeConfigList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</Scroll>

						<div class="p-footer" v-if="this.componentData.bizType == '1'">
							<Pagination :pageIndex="funFeeConfigPageInfo.pageIndex" :pageSize="funFeeConfigPageInfo.pageSize" :rowCount="funFeeConfigPageInfo.rowCount" :isCenter="true" @change="funFeeConfigPageChange"></Pagination>
						</div>
					</div>
				</div>

				
				<!-- 通信类 -->
				<div class="basic-info" v-if="this.componentData.bizType == '2'" ref="listScroll" :isShowRight="true">
					<!-- 资费模板配置 -->
					<div class="main">
						<div class="c_title">
							<span class="c-t-name">资费模板配置(通信类)</span>
						</div>
						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="afListScroll">
							<Row class="app__table-thead">
								<Col :span="12">资费模板</Col>
								<Col :span="12">参数选项</Col>
							</Row>

							<Row :class="['app__table-item']" v-for="(item,index) in tariffProConfigList" :key="index">
								<Col :span="12">{{item.templateName}}</Col>
								<Col :span="12">
									<span v-for="(titItem, titIndex) in item.fairobjparamextls" :key="titIndex">{{titItem.templateParamName}} : {{titItem.attrValueName ? titItem.attrValueName : titItem.paramValue}}  ; </span>
								</Col>
							</Row>
							<Row v-if="!tariffProConfigList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</Scroll>

						<!-- <div class="p-footer" v-if="this.componentData.bizType == '2'">
							<Pagination :pageIndex="tariffProConfigPageInfo.pageIndex" :pageSize="tariffProConfigPageInfo.pageSize" :rowCount="tariffProConfigPageInfo.rowCount" :isCenter="true" @change="tariffProConfigPageChange"></Pagination>
						</div> -->
					</div>
					<!-- 收入费用项配置 -->
					<div class="main main-funfee">
						<div class="c_title">
							<span class="c-t-name">收入费用项配置</span>
						</div>

						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="afListScroll">
							<Row class="app__table-thead">
								<Col :span="12">收入费用名称</Col>
								<Col :span="12">收入费用编码</Col>
							</Row>

							<Row :class="['app__table-item']" v-for="(item,index) in tariffFeeConfigList" :key="index">
								<Col :span="12" class="m-i-name">{{item.chrgItemName}}</Col>
								<Col :span="12">{{item.chrgItemCode}}</Col>
								
							</Row>
							<Row v-if="!tariffFeeConfigList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</Scroll>

						<div class="p-footer" v-if="this.componentData.bizType == '2'">
							<Pagination :pageIndex="tariffFeeConfigPageInfo.pageIndex" :pageSize="tariffFeeConfigPageInfo.pageSize" :rowCount="tariffFeeConfigPageInfo.rowCount" :isCenter="true" @change="tariffFeeConfigPageChange"></Pagination>
						</div>
					</div>
						
				</div>
			</div>

			<div class="footer">
					<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
			</div>
			</Scroll>
        </div>
		
    </transition>
</template> 

<script>
    export default {
        props:{
			componentData:{},
        },
        data() {
            return {
				currentView:'',
			
				fairValueForm: {},
				// 所属目录
				fairCategoryArray: [{
					label: 'test', 
					value: '0'
				},{
					label: 'primary',
					value: '1'
				}],
				// 类型
				fairTypeArray: [{
					label: '功能类', 
					value: '1'
				},{
					label: '通信类',
					value: '2'
				}],
				// 公允价值单位
				fairValueArray: [{
					label: '元/分钟',
					value: '10'
				},{
					label: '元/月',
					value: '11'
				},{
					label: '元/MB',
					value: '12'
				},{
					label: '元/分钟',
					value: '13'
				},{
					label: '元/条',
					value: '14'
				},{
					label: '元/月/账号',
					value: '15'
				}],
				
				// 功能类产品配置
				functionProConfigList: [],
				fairChrgRelId: '', // 公允对象id
				funProConfigPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				// 功能类收入费用
				functionFeeConfigList: [],
				funFeeConfigPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},

				
				
				// 收入费用-产品
				funFeeConfigPro: [{
					label: '分摊里面的产品列表',
					value: '0'
				}], 
				// 收入费用-付费方式
				funFeeWay: [{
					label: '预付费',
					value: '0'
				},{
					label: '后付费',
					value: '1'
				},{
					label: '准实时预付费',
					value: '2'
				},{
					label: '准预付费实时信控',
					value: '3'
				}],
				
				// 通信类
				tariffProConfigList: [],
				tariffProConfigPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				tariffFeeConfigList: [],
				tariffFeeConfigPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
            }
		},
		created() {
		},
		watch: {
			
		},
		mounted() {
			this.getDetail(); 
			if (this.componentData.bizType == '1') {
				this.getProductList(); // 产品配置
				this.getFairChrgRelList(); // 收入费用配置(功能类)
			} else {
				this.getTariffList(); // 资费模板
				this.getTariffFeeList(); // 收入费用项(通信类)
			}
		},
        methods:{
			changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
			},
			// 获取详情
			getDetail() {
				this.$axios.get(this.$api.replace(this.$api.QueryFairTask, ['{fairValueId}'], [this.componentData.fairValueId]), {
					params: {
						fairValueId: this.componentData.fairValueId
					}
				}).then(res => {
					if (res.data.success) {
						this.fairValueForm = res.data.fairvalue
					}
					
				})
			},
			// 功能类-获取产品配置列表
			getProductList() {
				this.$axios.get(this.$api.replace(this.$api.QueryProductList, ['{fairValueId}'], [this.componentData.fairValueId]), {
					params: {
						fairValueId: this.componentData.fairValueId,
						limit: this.funProConfigPageInfo.pageSize,
						page: this.funProConfigPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success == true) {
						this.functionProConfigList = res.data.fairobjproductlist.content || [];
						this.funProConfigPageInfo.rowCount = res.data.fairobjproductlist.total;
					}
				})
			},


			// 功能类-收入费用项列表
			getFairChrgRelList() {
				this.$axios.get(this.$api.replace(this.$api.QueryFairChrgRelList, ['{fairValueId}'], [this.componentData.fairValueId]), {
					params: {
						fairValueId: this.componentData.fairValueId,
						limit: this.funFeeConfigPageInfo.pageSize,
						page: this.funFeeConfigPageInfo.pageIndex
					}
					
				}).then(res => {
					if (res.data.success == true) {
						this.functionFeeConfigList = res.data.fairChrgRelList.content || [];
						this.funFeeConfigPageInfo.rowCount = res.data.fairChrgRelList.total;
					}
				})
			},



			// 通信类资费模板配置列表
			getTariffList() {
				this.$axios.get(this.$api.QueryTariffList, {
					params: {
						fairValueId: this.componentData.fairValueId,
						objType: '2000',
					}
				}).then(res => {
					this.tariffProConfigList = res.data.dfairtariffobjextdtols || [];
				})
			},
			// 通信类收入费用项配置
			getTariffFeeList() {
				this.$axios.get(this.$api.replace(this.$api.QueryFairChrgRelList, ['{fairValueId}'], [this.componentData.fairValueId]), {
					params: {
						fairValueId: this.componentData.fairValueId,
						limit: this.tariffFeeConfigPageInfo.pageSize,
						page: this.tariffFeeConfigPageInfo.pageIndex
					}
					
				}).then(res => {
					if (res.data.success === true) {
						this.tariffFeeConfigList = res.data.fairChrgRelList.content;
						this.tariffFeeConfigPageInfo.rowCount = res.data.fairChrgRelList.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--收入费用项配置列表-通信类!"})
				})
			},

			getPayType(val) {
				return val.split('|');
			},


			// 功能类
			// 产品列表的page
			funProConfigPageChange(page) {
				this.funProConfigPageInfo.pageIndex = page;
				this.getProductList();
			},
			// 收入费用列表的page
			funFeeConfigPageChange(page) {
				this.funFeeConfigPageInfo.pageIndex = page;
				this.getFairChrgRelList();
			},


			// 通信类
			// 收入费用列表的page
			tariffFeeConfigPageChange(page) {
				this.tariffFeeConfigPageInfo.pageIndex = page;
				this.getTariffFeeList();
			},
			
			// 返回
			globalback() {
				this.$emit('componentView', 'list')
			},

            pageClose(){
                this.$emit('componentView','list',this.componentData)
			},
        },
        components:{
           
        }
    }
</script>
<style scoped lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}

	.fade-enter,
	.fade-leave-to {
		top: -100% !important;
	}

    .product{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 201;
        overflow: auto;
        background-color: #fff;
		

		.title{
			position: fixed;
			display: block;
			top: 0;
			left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			font-size: 16px;
			text-align: center;
			border-bottom: 1px solid #e4e4e4;
			font-weight: 700;
			z-index: 201;
			background-color: #fff;
			span {
				position : none;
			}
        }

       
        .close{
            position: absolute;
            display: block;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            background: url(./images/close_page.png) no-repeat center;

            &:hover{
                opacity: .8;
            }
        }
		.basic-info {
			margin-top: 40px;
			padding: 30px;
			padding-bottom: 0;
			height: 100%;
			//border: 1px solid #eeeeee;
			background: #fff;
			.c_title {
				width: 100%;
				height: 40px;
				line-height: 40px;
				font-weight: bold;
				font-size: 14px;
				
				.c-t-name {
					display: inline-block;
					height: 20px;
					line-height: 20px;
					padding-left: 8px;
					border-left-width: 8px;
					border-left-color: #5c9cf3;
					border-left-style: solid;
				}
				.btn-add{
					padding: 0 15px 0 30px;
					background-color: #fff;
					color: $mainColor;
					border: 1px solid $mainColor;
					background-image: url(./images/add.png);
					background-repeat: no-repeat;
					background-position: 10px;
					&:hover{
						background-color: $mainColor;
						color: #fff;
						background-image: url(./images/add_hover.png);
						background-repeat: no-repeat;
						background-position: 10px;
					}
				}
			}
			
			.form-item {
				.f-i-l {
					font-size: 16px;
				}
			}
			
			.span {
				padding: 5px 10px;
				border: 1px solid #75d3aa;
				color: #75d3aa;
				border-radius: 5px;
				margin-right: 20px;
				cursor: pointer;
				.file {
					position: absolute;
					top: 0;
					left: 0;
					width: 0;
					height: 0;
					opacity: 0;
					z-index: -1;
				}
			}
			.have-span {
				padding: 0 50px 0 10px;
				background: #eff7fe;
				margin-right: 10px;
				margin-bottom: 10px;
				color: $mainColor;
				display: inline-block;
				.delete {
					width: 8px;
					height: 8px;
					position: absolute;
					top: 12px;
					right: 20px;
					cursor: pointer;
				}
			}
		}
		.footer{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			padding: 0 20px;
			border-top: 1px solid #f5f5f5;
			text-align: right;
			background-color: #fff;
			z-index: 201;
		}	
    }
	.main-funfee {
		margin-bottom: 50px !important;
		/deep/ .src-content {
			min-height: 160px;
		}
		.m-i-name {
			color: $mainColor;
			cursor: pointer;
		}
	}
	.main {
		.search {
			width: 300px;
			margin-bottom: 20px;
		}

		.yx-scroll{
			min-height: 160px;
		}

		.y-span {
			display: block;
			margin: 10px 0;
			//color: #b6de8f;
			font-weight: bold;
			font-size: 14px;
		}
		.date-picker {
			overflow: inherit !important;
		}
	}
	
</style>
