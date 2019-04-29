<template>
	<div class="main-table">
		<div class="main">
			<Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" ref="listScroll">
				<DragGroup class="m-title app__table-thead" inline :titleList="tableTitleData" @dragchange="dragchange">
					<DragItem :class="['m-item']" :width="item.width" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">
						<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)" />
						<span>{{item.name}}</span>
					</DragItem>

					<Col :class="['m-item']" :width="tableTitleOperationObj.width">
					<span>操作</span>
					</Col>
				</DragGroup>
				<Row :class="['m-item app__table-item']" inline v-for="(item,index) in repayRulePage" :key="'requirement' + index">
					<Col class="goods-name" :width="titleItem.width" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
					<span>{{adjustTabelItemText(item,titleItem.param)}}</span>
					</Col>

					<Col :width="tableTitleOperationObj.width">
					<span class="span" @click="editRepay(item)">修改</span>
					<span class="span" @click="deleteRepay(item)">删除</span>
					</Col>
				</Row>
				<Row v-if="!repayRulePage.length" class="app__data-none">
					<Col :span="24"><span>当前无数据!</span></Col>
				</Row>
			</Scroll>
		</div>
		<div class="footer">
			<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
			</Pagination>
		</div>
		<Dialog :dialogSize="dialogSize" :dialogTitle="dialogTitle" ref="addRepay" @confirm="addRepaySubmit">
			<Scroll class="app__table" :isShowRight="true">
				<Form labelWidth="100px">
					<div class="add-repay-dialog">
						<Row>
							<Col>
							<FormItem labelText="规则名称：" :requiredIcon="true" :errorMessage="errors.first('repayRuleName')">
								<Input v-validate="'required'" name="repayRuleName" v-model="addRepayObj.repayRuleName" data-vv-as="规则名称"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="21">
							<FormItem labelText="发展量：" :requiredIcon="true" :errorMessage="errors.first('developNum')">
								<Input v-validate="'required'" name="developNum" v-model="addRepayObj.developNum" number data-vv-as="发展量"></Input>
							</FormItem>
							</Col>
							<Col :span="2" :offset="1">
							<label>个月</label>
							</Col>
						</Row>
						<Row>
							<Col>
							<FormItem labelText="订购量阀值：" :requiredIcon="true" :errorMessage="errors.first('orderMaxNum')">
								<Input v-validate="'required'" name="orderMaxNum" v-model="addRepayObj.orderMaxNum" data-vv-as="订购量阀值"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col>
							<FormItem labelText="总用户阀值：">
								<Input name="userMaxNum" v-model="addRepayObj.userMaxNum"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col>
							<FormItem labelText="统计周期：" :requiredIcon="true" :errorMessage="errors.first('countCycle')">
								<Select v-validate="'required'" name="countCycle" :data="countCycle" v-model="addRepayObj.countCycle" data-vv-as="统计周期"></Select>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col>
							<FormItem>
								<Radio name="actType" label="0" v-model="addRepayObj.isFlag">默认为首选</Radio>
							</FormItem>
							</Col>
						</Row>
					</div>
				</Form>
			</Scroll>
		</Dialog>
		<Dialog :dialogSize="dialogSize" :dialogTitle="dialogTitle" ref="editRepay" @confirm="editRepaySubmit">
			<Scroll class="app__table" :isShowRight="true">
				<Form labelWidth="100px">
					<div class="add-repay-dialog">
						<Row>
							<Col>
							<FormItem labelText="规则名称：" :requiredIcon="true" :errorMessage="errors.first('repayRuleName')">
								<Input v-validate="'required'" name="repayRuleName" v-model="editRepayObj.repayRuleName" data-vv-as="规则名称"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="21">
							<FormItem labelText="发展量：" :requiredIcon="true" :errorMessage="errors.first('developNum')">
								<Input v-validate="'required'" name="developNum" v-model="editRepayObj.developNum" number data-vv-as="发展量"></Input>
							</FormItem>
							</Col>
							<Col :span="2" :offset="1">
							<label>个月</label>
							</Col>
						</Row>
						<Row>
							<Col>
							<FormItem labelText="订购量阀值：" :requiredIcon="true" :errorMessage="errors.first('orderMaxNum')">
								<Input v-validate="'required'" name="orderMaxNum" v-model="editRepayObj.orderMaxNum" data-vv-as="订购量阀值"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col>
							<FormItem labelText="总用户阀值：">
								<Input name="userMaxNum" v-model="editRepayObj.userMaxNum"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col>
							<FormItem labelText="统计周期：" :requiredIcon="true" :errorMessage="errors.first('countCycle')">
								<Select v-validate="'required'" name="countCycle" :data="countCycle" v-model="editRepayObj.countCycle" data-vv-as="统计周期"></Select>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col>
							<FormItem>
								<Radio name="actType" label="0" v-model="editRepayObj.isFlag">默认为首选</Radio>
							</FormItem>
							</Col>
						</Row>
					</div>
				</Form>
			</Scroll>
		</Dialog>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableTitleData: [{
					name: '清退规则名称',
					param: 'repayRuleName',
					wp: 0.15,
					width: 200
				}, {
					name: '发展量',
					param: 'developNum',
					wp: 0.15,
					width: 200
				}, {
					name: '订购量阈值',
					param: 'orderMaxNum',
					wp: 0.142,
					width: 200
				}, {
					name: '用户量阈值',
					param: 'userMaxNum',
					wp: 0.142,
					width: 200
				}, {
					name: '统计周期',
					param: 'countCycle',
					wp: 0.15,
					width: 200
				}, {
					name: '默认',
					param: 'isFlag',
					wp: 0.14,
					width: 200
				}],
				tableTitleOperationObj: {
					name: '操作',
					param: 'operation',
					wp: 0.125,
					width: 200,
					part: ""
				},
				repayRulePage: [],
				pageInfo: {
					pageIndex: 1,
					pageSize: 20,
					rowCount: 1
				},
				dialogSize: {
					size: 60,
					min: 400,
					max: 500
				},
				dialogTitle: '',
				addRepayObj: {
					repayRuleName: '',
					developNum: '',
					orderMaxNum: '',
					userMaxNum: '',
					countCycle: '',
					isFlag: '1'
				},
				countCycle: [{
					label: '每月执行一次',
					value: '10'
				}, {
					label: '每半年执行一次',
					value: '11'
				}, {
					label: '每季度执行一次',
					value: '12'
				}, {
					label: '不自动执行',
					value: '13'
				}],
				editRepayObj: {},
				tipInfo: {
					iconType: 3,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				tipSelData: {},
				searchObj: {
					repayRuleName: ''
				}
			}
		},
		mounted() {
			this.adjustTableWidth();
			this.gatTabData();
		},
		methods: {
			dragchange(val) {
				this.tableTitleData = val;
			},
			pullMove(w, item) {
				item.width = w;
			},
			pullEnd() {
				this.$refs.listScroll.initScroll();
			},
			adjustTableWidth() {
				this.tableTitleOperationObj.width = this.$el.getBoundingClientRect().width * this.tableTitleOperationObj.wp;
				this.tableTitleData.map(item => {
					item.width = this.$el.getBoundingClientRect().width * item.wp;
				})
			},
			pageChange(page) {
				this.pageInfo.pageIndex = page;
			},
			gatTabData(repayRuleName) {
				this.$axios.get(this.$api.RepayRule, {
					params: {
						repayRuleName: repayRuleName,
						limit: this.pageInfo.pageSize,
						page: this.pageInfo.pageIndex
					}
				}).then(res => {
					if(res.data.success) {
						this.pageInfo = {
							pageIndex: res.data.repayRulePage.page,
							pageSize: res.data.repayRulePage.limit,
							rowCount: res.data.repayRulePage.total,
							pageCount: Math.ceil(res.data.repayRulePage.total / res.data.repayRulePage.limit)
						};
						this.repayRulePage = res.data.repayRulePage.content;

						this.$nextTick(() => {
							this.$refs.listScroll.init();
						})

					} else {
						this.$message.error({ "message": "销售品清退列表查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ "message": "服务器异常！" })
				})
			},
			adjustTabelItemText(item, param) { //计算显示
				let val = item[param];
				switch(param) {
					case 'isFlag':
						return this.getIsFlag(val);
					case 'countCycle':
						return this.getCountCycle(val);
					default:
						return val;
				}
			},
			getIsFlag(type) {
				switch(type) {
					case '0':
						return '默认是首选';
					default:
						return "不是";
				}
			},
			getCountCycle(type) {
				switch(type) {
					case '10':
						return '每月执行一次';
					case '11':
						return '每半年执行一次';
					case '12':
						return '每季度执行一次';
					default:
						return "不自动执行";
				}
			},
			addRepay() {
				this.addRepayObj = {
					repayRuleName: '',
					developNum: '',
					orderMaxNum: '',
					userMaxNum: '',
					countCycle: '',
					isFlag: '1'
				};
				this.$refs.addRepay.show();
				this.dialogTitle = '添加清退规则';
			},
			addRepaySubmit() {
				this.$validator.validateAll().then((result) => {
					if(result) {
						this.$axios.post(this.$api.RepayRule, {
							repayRuleName: this.addRepayObj.repayRuleName,
							developNum: this.addRepayObj.developNum,
							orderMaxNum: this.addRepayObj.orderMaxNum,
							userMaxNum: this.addRepayObj.userMaxNum,
							countCycle: this.addRepayObj.countCycle,
							isFlag: this.addRepayObj.isFlag
						}).then(res => {
							if(res.data.success) {
								this.gatTabData();
								this.$message.success({ message: '新增成功！' });
								this.$refs.addRepay.hide();
							} else {
								this.$message.error({ message: res.data.msg });
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg });
						})
					}
				})
			},
			editRepay(item) {
				this.editRepayObj = item;
				this.$refs.editRepay.show();
				this.dialogTitle = '修改清退规则';
			},
			editRepaySubmit() {
				this.$axios.put(this.$api.replace(this.$api.EditRepayRule, ['{repayRuleId}'], [this.editRepayObj.repayRuleId]), {
					repayRuleId: this.editRepayObj.repayRuleId,
					repayRuleName: this.editRepayObj.repayRuleName,
					developNum: this.editRepayObj.developNum,
					orderMaxNum: this.editRepayObj.orderMaxNum,
					userMaxNum: this.editRepayObj.userMaxNum,
					countCycle: this.editRepayObj.countCycle,
					isFlag: this.editRepayObj.isFlag,
					statusCd: this.editRepayObj.statusCd,
					updateStaff: this.$user.getInfo().id
				}).then(res => {
					if(res.data.success) {
						this.gatTabData();
						this.$message.success({ message: '修改成功！' });
						this.$refs.editRepay.hide();
					} else {
						this.$message.error({ message: res.data.msg });
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			deleteRepay(item){
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() {
				this.$axios.delete(this.$api.replace(this.$api.DeleteRepayRule+'?updateStaff='+this.$user.getInfo().id, ['{repayRuleId}'], [this.tipSelData.repayRuleId]), {
					
				}).then(res => {
					if(res.data.success) {
						this.gatTabData();
						this.$message.success({ message: '删除成功！' });
						this.$refs.tip.hide();
					} else {
						this.$message.error({ message: res.data.msg });
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			search(val) {
				this.gatTabData(val);
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-table {
		height: 100%;
		padding-bottom: 50px;
		.main {
			width: 100%;
			height: 100%;
			.m-title {
				.col.m-t-name {
					border-right: 1px solid $mainColor;
				}
			}
			.m-item {
				.goods-name {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
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
		.footer {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			box-shadow: 0 -2px 0 #f1f5fa;
			.pagination {
				height: 50px;
			}
		}
	}
	
	.span {
		color: $mainColor;
		padding-right: 10px;
		cursor: pointer;
	}
	
	.l-d-header {
		display: inline-block;
		width: 100%;
		padding-bottom: 20px;
		border-bottom: 10px solid #f8f8f8;
		.d-h-title {
			width: 100%;
			height: 50px;
			line-height: 50px;
			.h-t-left {
				margin-left: 50px;
				padding-left: 30px;
				float: left;
				font-size: 16px;
				font-weight: bold;
				background: url(./images/sideslip_icon.png) no-repeat;
				background-position: 0;
			}
			.h-t-right {
				float: right;
				margin-right: 40px;
			}
		}
		.d-h-info {
			padding-left: 50px;
		}
	}
	
	.require-info {
		width: 100%;
		padding-left: 20px;
		padding-top: 20px;
	}
	
	.add-repay-dialog {
		padding: 20px;
	}
</style>