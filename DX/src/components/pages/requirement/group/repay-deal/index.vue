<template>
	<div class="info">
		<Scroll class="basic-info" :isShowRight="true" ref="basicScroll">
			<div class="main-box">
				<div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>需求单信息</span>
					</div>
					<div class="h-a-add">
						<div v-if="toggleFlag" class="app__btn app__btn-show" @click="show()">更多</div>
						<div v-else class="app__btn app__btn-slide" @click="slide()">收起</div>
					</div>
				</div>
				<div :class="['require-info',toggleFlag?'active':'']">
					<Row>
						<Form labelWidth="120px" labelAlign="left">
							<Col :span="6">
							<FormItem labelText="需求单编码：" small>
								<span>{{requireForm.requirementCode}}</span>
							</FormItem>
							</Col>

							<Col :span="5" :offset="1">
							<FormItem labelText="需求单名称：" small>
								<span class="over-col" :title="requireForm.requirementName">{{requireForm.requirementName}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="业务联系人：" small>
								<span>{{requireForm.contName}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="业务联系人电话：" small>
								<span>{{requireForm.contTele}}</span>
							</FormItem>
							</Col>
							<Col :span="6">
							<FormItem labelText="需求单类型：" small>
								<span>{{requireForm.requestType == '10' ? '产品' : '销售品'}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="预期完工时间：" small>
								<span>{{requireForm.expectFinishDate | date}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="发起部门：" small>
								<span>{{requireForm.deptCode}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="需求单功能类型：" small>
								<span>{{requireForm.actType == "ADD"?"新增":requireForm.actType == "MOD"?"变更":"下架"}}</span>
							</FormItem>
							</Col>
							<Col :span="6">
							<FormItem labelText="发起时间：" small>
								<span>{{requireForm.createDate | date}}</span>
							</FormItem>
							</Col>
                            <Col :span="5" :offset="1" v-show="requireForm.requestType == '11' && requireForm.actType == 'ADD'">
								<FormItem labelText="是否跳过业务测试：">
									<span>{{requireForm.isSkipBusiTest == '1' ? '是' : requireForm.isSkipBusiTest == '0' ? '否' : ''}}</span>
								</FormItem>
							</Col>
							<Col :span="24">
							<FormItem labelText="需求单描述：" small>
								<pre v-html="requireForm.requirementDesc"></pre>
							</FormItem>
							</Col>
						</Form>
					</Row>
				</div>
				<div class="a-v-title1">
					<Row>
						<Col :span="20">
							<div class="app__title ">
								<i class="iconfont icon-jibenxinxi"></i>
								<span>清退销售品列表</span>
							</div>
						</Col>
						<Col :span="4" class="col-span">
							<span class="app__btn app__btn-clear" @click="operationSubmit()">办结</span>
							<div class="app__btn app__btn-clear" @click="operationBack()">回退</div>
						</Col>
					</Row>
				</div>
				<div class="btn-box">
					<Row>
						<Col :span="12">
							<div class="app__btn app__btn-confirm" @click="repay()">清退</div>
							<div class="app__btn app__btn-confirm" @click="postpone()">延期</div>
						</Col>
						<Col :span="5">
							<FormItem>
								<Input v-model="searchData.offerSysName" placeholder="请输入销售品内部名称"></Input>
							</FormItem>
						</Col>
						<Col :span="4">
							<FormItem>
								<span class="form-span" @click="search()">查询</span>
							</FormItem>
						</Col>
						<Col :span="3">
							<div class="app__btn app__btn-newRequire" @click="exportExcel()">导出EXCEL表</div>
						</Col>
					</Row>
				</div>
				<div class="goods-wrap">
					<Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
						<Row class="m-title app__table-thead">
							<Col :span="1"></Col>
							<Col :span="2">销售品内部名称</Col>
							<Col :span="2">内部编码</Col>
							<Col :span="2">总用户数</Col>
							<Col :span="1">发展量</Col>
							<Col :span="1">订购量</Col>
							<Col :span="2">标签</Col>
							<Col :span="2">上市时间</Col>
							<Col :span="2">退市时间</Col>
							<Col :span="1">策划人</Col>
							<Col :span="2">管理部门/人</Col>
							<Col :span="2">类型</Col>
							<Col :span="2">状态</Col>
							<Col :span="2">处理状态</Col>
						</Row>

						<Row v-if="repayOffers.length>0" :class="['m-item app__table-item']" v-for="(offerItem,offerIndex) in repayOffers" :key="offerIndex">
							<Col :span="1">
								<Checkbox name="Checkbox" v-model="checkArr" :label="offerItem"></Checkbox>
							</Col>
							<Col :span="2" class="no-wrap" :title="offerItem.offerSysName">{{offerItem.offerSysName}}</Col>
							<Col :span="2">{{offerItem.innerNbr}}</Col>
							<Col :span="2">{{offerItem.monthPrdCnt}}</Col>
							<Col :span="1">{{offerItem.developCnt}}</Col>
							<Col :span="1">{{offerItem.orderCnt}}</Col>
							<Col :span="2">{{offerItem.labelName}}</Col>
							<Col :span="2">{{offerItem.exfDate | date}}</Col>
							<Col :span="2">{{offerItem.expDate | date}}</Col>
							<Col :span="1">{{offerItem.nameCe}}</Col>
							<Col :span="2">{{offerItem.deptUser}}</Col>
							<Col :span="2">{{offerItem.repayType == '11' ? '低效' : '到期'}}</Col>
							<Col :span="2">{{offerItem.statusCd=="1000"?"有效":offerItem.statusCd=="1200"?"未生效":offerItem.statusCd=="1300"?"已归档":offerItem.statusCd=="1400"?"停止销售":offerItem.statusCd=="1500"?"停止服务":"销售品下线"}}</Col>
							<Col :span="2"><span class="span">{{offerItem.dealType=="1006"?"已清退":offerItem.dealType=="1007"?"已延期":"处理中"}}</span></Col>
						</Row>
						<Row v-if="!repayOffers.length" class="app__data-none">
							<Col :span="24"><span>当前无数据!</span></Col>
						</Row>
					</Scroll>
				</div>
			</div>
		</Scroll>
		<div class="footer">
			<span class="app__btn app__btn-clear" @click="globalback">返回</span>
		</div>
		<Dialog class="add-commodity" :dialogSize="dialogSize" :dialogTitle="dialogTitle" ref="postpone" :showBtn="true" @confirm="postponeSubmit">
			<Scroll :isShowRight="true">
				<Form labelWidth="120px">
				<Row>
					<Col :span="24">
				<FormItem labelText="上市时间：">
					<DatePicker v-model="expDate"></DatePicker>
				</FormItem>
				</Col>
				</Row>
				</Form>
			</Scroll>
		</Dialog>
	</div>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				requireForm: {},
				toggleFlag: true,
				repayOffers: [],
				checkArr: [],
				repayOffersTemp: [],
				dialogSize: {
					size: 30,
					min: 300,
					max: 400
				},
				dialogTitle: '到期时间设置',
				expDate: '',
				searchData: {
					offerSysName: ''
				}
			}
		},
		mounted() {
			this.initData();
			this.getRepayOfferData();
//			this.getSystemRoleData();
		},
		methods: {
			show() {
				this.toggleFlag = !this.toggleFlag
				this.$nextTick(() => {
					this.$refs.basicScroll.init();
				})
			},
			slide() {
				this.toggleFlag = !this.toggleFlag
				this.$nextTick(() => {
					this.$refs.basicScroll.init();
				})
			},
			initData() {
				//获取详情
				this.$axios.get(this.$api.replace(this.$api.QureyRequirementTask, ['{requirementId}'], [this.componentData.requirementId]), {
					params: {
						showMember: 1
					}
				}).then(res => {
					if(res.data.success === true) {
						this.requireForm = res.data.requirementDetail;
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			getRepayOfferData(offerSysName) {
				this.$axios.get(this.$api.RepayOffer, {
					params: {
						requirementId: this.componentData.requirementId,
						offerSysName: offerSysName,
						innerNbr: ''
					}
				}).then(res => {
					if(res.data.success === true) {
						this.repayOffers = [...res.data.repayOffers];
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			globalback() {
				this.$emit('componentView', 'list')
		    },
		    repay() {
		    	this.repayOffersTemp = [];
		    	if(this.checkArr.length <=0){
		    		this.$message.warning({message: '请选择销售品！'});
		    		return;
		    	}
		    	for(let ele of this.checkArr){
		    		if(ele.dealType == '1007'){
		    			this.$message.warning({message: '已延期的不可清退！'});
						return;
		    		}
		    	}
		    	for(let ele of this.checkArr){
		    		let temp = {
		    			offerId: ele.offerId,
		    			requestMemberId: ele.requestMemberId,
						repayType: ele.repayType,
						statusCd: '1400',
						dealType: '1006',
						updateStaff: this.$user.getInfo().id
		    		}
		    		this.repayOffersTemp.push(temp);
		    	}
		    	this.$axios.put(this.$api.RepayOffer, {
					repayOffers: this.repayOffersTemp
				}).then(res => {
					if(res.data.success === true) {
						this.checkArr = [];
						this.$message.success({message: '清退成功！'});
						this.getRepayOfferData();
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
		   },
		   postpone() {
		   		this.expDate = '';
		   		if(this.checkArr.length <=0){
		    		this.$message.warning({message: '请选择销售品！'});
		    		return;
		    	}
		    	for(let ele of this.checkArr){
		    		if(ele.dealType == '1006'){
		    			this.$message.warning({message: '已清退的不可延期！'});
						return;
		    		}
		    	}
		   		this.$refs.postpone.show();
		   },
		   postponeSubmit() {
		   		this.repayOffersTemp = [];
		    	for(let ele of this.checkArr){
		    		let temp = {
		    			offerId: ele.offerId,
		    			requestMemberId: ele.requestMemberId,
						repayType: ele.repayType,
						dealType: '1007',
						updateStaff: this.$user.getInfo().id,
						expDate: this.expDate ? new Date(this.expDate) : ''
		    		}
		    		this.repayOffersTemp.push(temp);
		    	}
		    	this.$axios.put(this.$api.RepayOffer, {
					repayOffers: this.repayOffersTemp
				}).then(res => {
					if(res.data.success === true) {
						this.checkArr = [];
						this.$message.success({message: '延期成功！'});
						this.getRepayOfferData();
						this.$refs.postpone.hide();
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
		   },
		   operationSubmit() {
			   	this.$axios.put(this.$api.replace(this.$api.repayRequirement, ['{requirementId}'], [this.componentData.requirementId]), {
	        		requirementId: this.componentData.requirementId,
	        		updateStaff: this.$user.getInfo().id,
	        		statusCd: '1004',
	        		reqFlowStatus: '17',
	        		requirementDesc: this.requireForm.requirementDesc
				}).then(res => {
					if(res.data.success === true) {
						this.$message.success({message: '办结成功！'});
						this.$emit('componentView', 'list')
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
		   },
		   operationBack() {
		   		this.$axios.put(this.$api.replace(this.$api.repayRequirement, ['{requirementId}'], [this.componentData.requirementId]), {
	        		requirementId: this.componentData.requirementId,
	        		updateStaff: this.$user.getInfo().id,
	        		statusCd: '1005',
	        		reqFlowStatus: '16',
	        		requirementDesc: this.requireForm.requirementDesc
				}).then(res => {
					if(res.data.success === true) {
						this.$message.success({message: '回退成功！'});
						this.$emit('componentView', 'list')
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
		   },
		   exportExcel() {
		   		window.open(this.$api.ExcelDownload + '?requirementId=' + this.componentData.requirementId);
		   },
		   search() {
		   		this.getRepayOfferData(this.searchData.offerSysName);
		   }
		} 
	}
</script>

<style scoped lang="scss">
	.info {
		width: 100%;
		height: 100%;
		padding-bottom: 50px;
		.add-commodity {
			.scroll {
				padding: 20px !important;
			}
		}
	}
	.basic-info {
		height: 100%;
		padding: 0 20px;
		.main-box {
			padding-right: 20px;
		}
		.a-v-title1 {
			height: 50px;
			line-height: 50px;
			text-align: right;
			padding-right: 20px;
			.v-t-item {
				display: block;
				width: 80px;
				margin-left: 20px;
				text-align: center;
				color: $mainColor;
				float: left;
			}
			.app__title {
				float: left;
			}
			.h-a-add {
				display: inline-block;
				height: 30px;
				line-height: normal;
			}
		}
		.require-info {
			width: 100%;
			padding: 20px;
			background: #fdfdfd;
			border: 1px solid #eeeeee;
			&.active {
				height: 110px;
				overflow-y: hidden;
			}
			.m-title {
				.col.m-t-name {
					border-right: 1px solid $mainColor;
				}
			}
			.m-item {
				.m-i-name {
					color: $mainColor;
					border-right: 1px solid $mainColor;
					cursor: pointer;
				}
			}
			.col {
				&:hover {
					.col-search {
						display: block;
					}
				}
			}
		}
		.goods-content {
			width: 100%;
			padding: 0 0 30px;
			.goods-box {
				padding: 10px;
				border: 1px solid #eee;
				background: #fdfdfd;
				.menu-btn {
					padding-bottom: 10px;
				}
			}
			.goods-content-left {
				border-right: 1px solid #eee;
			}
		}
	}
	.btn-box {
		margin-bottom: 20px;
		.app__btn {
			margin-left: 10px;
		}
		.app__btn-newRequire{
			float: right;
		}
	}
	.no-wrap {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.col-span{
		padding: 10px 0;
	}
	.form-span{
		background: $mainColor;
		color: #ffffff;
	    padding: 5px 20px;
	    border-radius: 4px;
	    cursor: pointer;
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
	}
	.add-commodity {
			.scroll {
				padding: 20px !important;
			}
		}
	.span {
		color: $mainColor;
		padding: 0 5px;
	}
</style>