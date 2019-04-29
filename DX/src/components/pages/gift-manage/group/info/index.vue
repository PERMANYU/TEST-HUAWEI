<template>
	<div class="info">
		<Scroll :isShowRight="true">
			<div class="basic-part">
				<div class="basic-info" ref="basicScroll">
					<div class="configuration-tip app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span class="configuration-word">基本信息</span>
					</div>
					<div class="main-box">
						<div class="require-info">
							<Row>
								<Form labelWidth="100px" labelAlign="left">
									<Col :span="8">
										<FormItem labelText="礼包名称:" small>
											<span class="over-col" :title="basicInfo.offerPackageName">{{basicInfo.offerPackageName}}</span>
										</FormItem>
									</Col>
									<Col :span="7" :offset="1">
										<FormItem labelText="礼包编码:" small>
											<span class="over-col">{{basicInfo.offerPackageNbr}}</span>
										</FormItem>
									</Col>
									<Col :span="7">
										<FormItem labelText="管理级别:" small>
											<span>{{getManageGrade(basicInfo.manageGrade)}}</span>
										</FormItem>
									</Col>
									<Col :span="8">
										<FormItem labelText="生效时间:" small>
											<span>{{basicInfo.effDate | date}}</span>
										</FormItem>
									</Col>
									<Col :span="7" :offset="1">
										<FormItem labelText="失效时间:" small>
											<span>{{basicInfo.expDate | date}}</span>
										</FormItem>
									</Col>
									<Col :span="24">
										<FormItem labelText="礼包描述：" small>
											<pre v-html="basicInfo.offerPkgDesc"></pre>
										</FormItem>
									</Col>	
								</Form>
							</Row>
						</div>
					</div>
				</div>
			</div>
		
			<div class="part">
				<div class="configuration">
					<div class="configuration-tip app__title">
						<i class="iconfont icon-jibenxinxi"></i>
						<span class="configuration-word">配置礼包</span>
					</div>
				</div>
				<div class="members-content">
					<Scroll class="app__table__inner" fixedTopClassName="app__table-thead">
						<Row class="app__table-thead">
							<Col :span="1">序号</Col>
							<Col :span="4">销售品/商品组名称</Col>
							<Col :span="4">内部编码</Col>
							<Col :span="4">销售品类型</Col>
							<Col :span="4">商品组选项</Col>
							<Col :span="3">构成类型</Col>
							<Col :span="4">订购数量限制</Col>
						</Row>

						<Row class="tab-tbody" :class="['app__table-item']" v-if="offerList.length>0" v-for="(item,index) in offerList" :key="index">
							<Col :span="1">{{index+1}}</Col>
							<Col :span="4" class="col-show">
								<i :class="{show2:goodsId===index}" @click="showChildClick(index)" v-show="item.packageObjRels.length>0"></i>
								 {{item.name ? item.name : item.nameGrp}}
							</Col>
							<Col :span="4">{{item.number ? item.number: item.numberGrp}}</Col>
							<Col :span="4">{{getObjType(item.objType)}}</Col>
							<Col :span="4" v-if="item.packageObjRels.length == 0"></Col>
							<Col :span="4" v-else>{{item.packageObjRels.length}} 选 {{item.offerGrpOption}}</Col>
							<Col :span="3">{{item.relType == '100000' ? '默认' : item.relType == '200000' ? '可选' : item.relType == '300000' ? '必选' : ''}}</Col>
							<Col :span="4">{{item.offerOrderNum}}</Col>


							 <!--子表格-->
							<Col :span="24" class="child-list" v-show="goodsId===index">
								<Row v-if="item.packageObjRels.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(val,index) in item.packageObjRels" :key="index">
									<Col :span="1"></Col>
									<Col :span="4" class="col-show">
										<div class="borderline"></div>{{item.nameGrp ? val.name : val.offerSysName }}
									</Col>
								<Col :span="4">{{val.number ? val.number : val.numberGrp}}</Col>
								<Col :span="4">{{getObjType(val.objType)}}</Col>
								<Col :span="4"></Col>
								<Col :span="3">{{val.relType == '100000' ? '默认' : val.relType == '200000' ? '可选' : val.relType == '300000' ? '必选' : ''}}</Col>
								<Col :span="4">{{val.offerOrderNum}}</Col>
									
								</Row>
							</Col> 
						</Row>
						<Row v-if="!offerList.length" class="app__data-none">
							<Col :span="24"><span>当前无数据!</span></Col>
						</Row>
					</Scroll>
				</div>

			</div>
		</Scroll>

		<div class="footer">
			<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
		</div>

		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				basicInfo: {
					offerPackageName: '',
					offerPackageNbr: '',
					manageGrade: '',
					effDate: '',
					expDate: '',
					offerPkgDesc: '',
				},
				offerList: [],
				goodsId:'',
				offers: {
					searchAddedVal: ''
				},
				offerPageInfo: {
					pageIndex: 1,
					pageSize: 5, 
					pageCount: 1,
					rowCount: 5 
				},
				pageInfo: {
					pageIndex: 1,
					pageSize: 5, 
					pageCount: 1,
					rowCount: 5 
				},
				activatedData: null,
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				
			}
		},
		mounted() {
			this.initData()
		},
		methods: {
			initData() {
				//获取详情
				this.$axios.get(this.$api.QueryOfferPackageDetail, {
					params: {
						offerPackageId: this.componentData.offerPackageId
					}
				}).then(res => {
					if (res.data.success) {
						this.basicInfo = res.data.ordOfferPackage;
						this.offerList = res.data.ordOfferPackage.packageObjRels || []
					}
				})
			},

			getManageGrade(type) {
				switch(type) {
					case '10':
						return '集团框架级';
					case '11':
						return '集团实例级';
					case '12':
						return '省公司实例级';
					case '13':
                        return '本地网级';
                    case '14':
						return '省公司框架级';
					case '15':
						return '转售实例级';
					default:
						return "未知";
				}

			},
			getObjType(type) { // 销售品类型
				switch(type) {
					case '10':
						return '基础销售品';
					case '11':
						return '套餐销售品';
					case '12':
						return '可选包';
					case '13':
                        return '促销';
                    case '14':
						return '政企协议';
					case '15':
						return '礼包';
					case '20':
						return '加装包';
					case '30':
						return '关联包';
					case '1000':
						return '互斥组';
					case '1100':
						return '续约组';
					case '1200':
						return '依赖组';
					case '1300':
						return '普通组';
					case '100000':
						return '默认';
					case '200000':
						return '可选';
					case '300000':
						return '必选';
					default:
						return "未知";
				}

			},
			
			showChildClick(index) {
                if(this.goodsId === index) {
                    this.goodsId = '';
                } else {
                    this.goodsId = index;
                }
            },
			globalback() {
				this.$emit('componentView', 'list')
			}
		}
	}
</script>

<style scoped lang="scss">
	.info {
		width: 100%;
		height: 100%;
		padding-bottom: 50px;
	}
	.basic-part{
		margin-bottom: 50px;
		margin-top: 20px;
		.basic-info {
			padding: 0 20px;
			.main-box {
				padding-right: 20px;
				.require-info {
					width: 100%;
					padding: 20px;
					background: #fdfdfd;
					border: 1px solid #eeeeee;
				}
			}
		}
	}
	
	
	.configuration-tip{
		height: 15px;
		line-height: 15px;
		margin-right: 15px;
		margin-bottom: 20px;
	}
	.part{
		padding: 0 20px;
		.configuration{
			display: -webkit-flex;
			display: flex;
			-webkit-align-items: center;
			align-items: center;
			.configuration-add{
				width: 63px;
				height: 28px;
				line-height: 28px;
				display: -webkit-flex;
				display: flex;
				-webkit-align-items: center;
				align-items: center;
				border: 1px solid #5c9cf3;
				cursor: pointer;
				.add-name{
					color: #5C9CF3;
				}
			}
		}
		.members{
			width: 100%;
			margin-top: 20px;
			margin-bottom: 50px;
			.members-search {
				width: 30%;
				height: 36px;
				line-height: 36px;
				.iconfont {
					position: absolute;
					left: 0;
					top: 12px;
					width: 40px;
					height: 16px;
					line-height: normal;
					color: $mainColor;
					font-size: 16px;
					text-align: center;
					border-right: 1px solid #eee;
					z-index: 1;
				}
				/deep/ input {
					height: 36px;
					padding: 0 60px 0 55px;
					border-radius: 0;
				}
			}
			.members-content{
				.app__table__inner{
					margin-top: 20px;
					.app__table-item{
						.form-item{
							padding-left: 0!important;
							min-height: 30;
							margin-top: 4px;
							.select{
								.select-dropdown{
									top: 0!important;
								}
							}
						}
					}
				}

				
			}
			.members-footer {
				height: 50px;
				margin-top: 20px;
			}
		}
	}
		
	.rel-style{
		.app__table__inner{
			.app__table-item > .col{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		} 
	}
	.footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 50px;
		line-height: 49px;
		padding: 0 20px;
		border-top: 1px solid #f5f5f5;
		text-align: right;
		background-color: #fff;
		z-index: 99;
	}
	.over-col{
		display: block;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}


	.tab-tbody {
		.col {
			button {
				border: none;
				outline: none;
				font-size: 12px;
				color: $mainColor;
				background-color: transparent;
				cursor: pointer;
			}
		}
		//子集列表
		.child-list {
			background-color: white;
			padding-left: 0;
			.v-t-title {
				border: none;
			}
			.borderline {
				width: 10px;
				height: 40px;
				border-bottom: 1px dashed #CCCCCC;
				border-left: 1px dashed #CCCCCC;
				float: left;
				margin-top: -20px;
				margin-left: 5px;
			}
			.no-wrap {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		/*展开*/
		.col-show {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			i {
				display: inline-block;
				width: 10px;
				height: 10px;
				background: url("./images/bgsq.png") no-repeat;
				background-size: cover;
				cursor: pointer;
			}
			i.show2 {
				background: url("./images/bgsq.png") no-repeat;
				background-size: cover;
			}
		}
		/*收起*/
		.col-hide {
			font-size: 14px;
			color: $mainColor;
			i {
				display: inline-block;
				width: 14px;
				height: 14px;
				background: url("./images/hide-icon.png") no-repeat;
				background-size: cover;
				cursor: pointer;
			}
		}
	}
</style>