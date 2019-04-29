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
							<!--<Col :span="24" v-if="documentList.length>0">
							<FormItem labelText="附件下载：" small>
								<span class="app__btn app__btn-confirm" @click="download()">附件下载</span>
							</FormItem>
							</Col>-->
						</Form>
					</Row>
				</div>
				<div class="a-v-title1" v-show="componentData.reqFlowStatus != '17'">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>选择市场清退对口人</span>
					</div>
				</div>
				<div class="app__table__inner goods-box" v-show="componentData.reqFlowStatus != '17'">
					<Row class="creategoods">
						<Form labelWidth="120px" labelAlign="left">
							<Col :span="6">
							<FormItem labelText="人员：" small>
								<Select :data="systemUsers" dataValueStr="staffId" dataLabelStr="staffName" v-model="defaultUser.staffId"></Select>
							</FormItem>
							</Col>
						</Form>
					</Row>
				</div>
				<div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>清退销售品列表</span>
					</div>
				</div>
				<div class="btn-box">
					<Row>
						<Col :span="20">
							<div v-show="componentData.reqFlowStatus != '17'" class="app__btn app__btn-add" @click="addInefficient()">低效销售品</div>
							<div v-show="componentData.reqFlowStatus != '17'" class="app__btn app__btn-add" @click="expire()">到期销售品</div>
						</Col>
						<Col :span="4">
							<div class="app__btn app__btn-newRequire" @click="exportExcel()">导出EXCEL表</div>
						</Col>
					</Row>
				</div>
				<div class="goods-wrap">
					<Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
						<Row class="m-title app__table-thead">
							<Col :span="1">序号</Col>
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
							<Col :span="2" v-if="componentData.reqFlowStatus != '17'">操作</Col>
							<Col :span="2" v-else>处理状态</Col>
						</Row>

						<Row v-if="repayOffers.length>0" :class="['m-item app__table-item']" v-for="(offerItem,offerIndex) in repayOffers" :key="offerIndex">
							<Col :span="1">{{offerIndex+1}}</Col>
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
							<Col :span="2">{{offerItem.statusCd=="1000"?"有效":offerItem.statusCd=="1200"?"未生效":"未知"}}</Col>
							<Col :span="2" v-if="componentData.reqFlowStatus != '17'">
							<span class="span" @click="deleteRepayOffers(offerItem)">删除</span>
							</Col>
							<Col :span="2" v-else>{{offerItem.dealType=="1006"?"已清退":offerItem.dealType=="1007"?"已延期":"处理中"}}</Col>
						</Row>
						<Row v-if="!repayOffers.length" class="app__data-none">
							<Col :span="24"><span>当前无数据!</span></Col>
						</Row>
					</Scroll>
				</div>
			</div>
		</Scroll>
		<div class="footer">
			<span v-show="componentData.reqFlowStatus != '17'" class="app__btn app__btn-confirm" @click="confirm">提交</span>
			<span class="app__btn app__btn-clear" @click="globalback">返回</span>
		</div>
		<Dialog class="add-commodity" :dialogSize="dialogSize" :dialogTitle="dialogTitle" ref="inefficient" :showBtn="true" @confirm="inefficientSubmit">
			<Scroll :isShowRight="true">
				<Form labelWidth="120px">
				<Row>
					<Col :span="12">
						<FormItem labelText="清退规则：">
							<Select :data="repayRulePage" v-model="repayRule" dataValueStr="repayRuleId" dataLabelStr="repayRuleName" @change="repayRuleChange"></Select>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="6">
						<FormItem labelText="发展量(月)：">
							<Input v-model="searchData.developCnt"></Input>
						</FormItem>
					</Col>
					<Col :span="6">
						<FormItem labelText="订购量阈值：">
							<Input v-model="searchData.orderCnt"></Input>
						</FormItem>
					</Col>
					<Col :span="6">
						<FormItem labelText="总用户阈值：">
							<Input v-model="searchData.monthPrdCnt"></Input>
						</FormItem>
					</Col>
					<Col :span="5">
						<FormItem>
							<span class="form-span" @click="repaySearch">查询</span>
						</FormItem>
					</Col>
				</Row>
				</Form>
				<div class="goods-wrap">
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="3">销售品内部名称</Col>
							<Col :span="3">内部编码</Col>
							<Col :span="3">总用户数</Col>
							<Col :span="3">订购量</Col>
							<Col :span="3">上市时间</Col>
							<Col :span="3">退市时间</Col>
							<Col :span="2">策划人</Col>
							<Col :span="2">管理部门</Col>
							<Col :span="2"></Col>
						</Row>
						<Row v-if="offerRepayPage.length>0" :class="['app__table-item']" v-for="(item,index) in offerRepayPage" :key="index">
							<Col :span="3" class="no-wrap" :title="item.offerSysName">{{item.offerSysName}}</Col>
							<Col :span="3">{{item.innerNbr}}</Col>
							<Col :span="3">{{item.monthPrdCnt}}</Col>
							<Col :span="3">{{item.orderCnt}}</Col>
							<Col :span="3">{{item.effDate | date}}</Col>
							<Col :span="3">{{item.expDate | date}}</Col>
							<Col :span="2">{{item.createStaff}}</Col>
							<Col :span="2">{{item.deptUser}}</Col>
							<Col :span="2">
								<span v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang repay-span" @click="offerClick(item)"></span>
								<span v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang repay-span" @click="deleteClick(item)"></span>
							</Col>
							</Col>
						</Row>
						<Row v-if="!offerRepayPage.length" class="app__data-none">
							<Col :span="24"><span>当前无数据!</span></Col>
						</Row>
					</div>
					<Pagination v-if="offerRepayPage.length>0" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange" isCenter>
					</Pagination>
					<div class="sel-box" v-if="offerRepayChecked.length>0">
						<i class="title-icon"></i>
						<span class="y-span">已选销售品</span>
					</div>
					<div class="group">
						<Row>
							<Col :span="4" v-for="(item,index) in delmkt(offerRepayChecked)" :key='index'><a :title="item.offerSysName">{{item.offerSysName}}</a><span @click="deleteOfferRepay(item)"></span></Col>
						</Row>
					</div>
				</div>
			</Scroll>
		</Dialog>
		
		<!--到期销售品-->
			<Dialog class="add-commodity" :dialogSize="dialogSize" :dialogTitle="dialogTitle" ref="expire" :showBtn="true" @confirm="expireSubmit">
			<Scroll :isShowRight="true">
				<Form labelWidth="120px">
				<Row>
					<Col :span="8">
						<FormItem labelText="上市时间：">
							<DatePicker v-model="searchData.effDate"></DatePicker>
						</FormItem>
					</Col>
					<Col :span="8">
						<FormItem labelText="退市时间：">
							<DatePicker v-model="searchData.expDate"></DatePicker>
						</FormItem>
					</Col>
					<Col :span="8">
						<FormItem labelText="标签：">
							<Input v-model="searchData.labelName"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="8">
						<FormItem labelText="管理部门：">
							<Select :data="deptUser" v-model="searchData.offerProviderId"></Select>
						</FormItem>
					</Col>
					<Col :span="8">
						<FormItem labelText="策划人：">
							<Input v-model="searchData.nameCe"></Input>
						</FormItem>
					</Col>
					<Col :span="8">
						<FormItem>
							<span class="form-span" @click="repaySearch">查询</span>
							<span class="form-span" @click="reset">重置</span>
						</FormItem>
					</Col>
				</Row>
				</Form>
				<div class="goods-wrap">
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="3">销售品内部名称</Col>
							<Col :span="3">内部编码</Col>
							<Col :span="3">总用户数</Col>
							<Col :span="3">订购量</Col>
							<Col :span="3">上市时间</Col>
							<Col :span="3">退市时间</Col>
							<Col :span="2">策划人</Col>
							<Col :span="2">管理部门</Col>
							<Col :span="2"></Col>
						</Row>
						<Row v-if="offerRepayPage.length>0" :class="['app__table-item']" v-for="(item,index) in offerRepayPage" :key="index">
							<Col :span="3" class="no-wrap" :title="item.offerSysName">{{item.offerSysName}}</Col>
							<Col :span="3">{{item.innerNbr}}</Col>
							<Col :span="3">{{item.monthPrdCnt}}</Col>
							<Col :span="3">{{item.orderCnt}}</Col>
							<Col :span="3">{{item.effDate | date}}</Col>
							<Col :span="3">{{item.expDate | date}}</Col>
							<Col :span="2">{{item.nameCe}}</Col>
							<Col :span="2">{{item.offerProviderId == '10' ? '市场部' : item.offerProviderId == '11' ? '政企客户部' : item.offerProviderId == '12' ? '公众客户部' : item.offerProviderId == '13' ? '创新事业部' : '无'}}</Col>
							<Col :span="2">
								<span v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang repay-span" @click="offerClick(item)"></span>
								<span v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang repay-span" @click="deleteClick(item)"></span>
							</Col>
							</Col>
						</Row>
						<Row v-if="!offerRepayPage.length" class="app__data-none">
							<Col :span="24"><span>当前无数据!</span></Col>
						</Row>
					</div>
					<Pagination v-if="offerRepayPage.length>0" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange" isCenter>
					</Pagination>
					<div class="sel-box" v-if="offerRepayChecked.length>0">
						<i class="title-icon"></i>
						<span class="y-span">已选销售品</span>
					</div>
					<div class="group">
						<Row>
							<Col :span="4" v-for="(item,index) in delmkt(offerRepayChecked)" :key='index'><a :title="item.offerSysName">{{item.offerSysName}}</a><span @click="deleteOfferRepay(item)"></span></Col>
						</Row>
					</div>
				</div>
			</Scroll>
		</Dialog>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
		<Tip ref="tipRepay" :tipObj="tipInfo" @confirm="tipRepayfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				toggleFlag: true,
				requireForm: {},
				repayOffers: [],
				repayOffersTemp: [],
				dialogSize: {
					size: 80,
					min: 900,
					max: 1100
				},
				dialogTitle: '',
				offerRepayPage: [],
				checkArr: [],
				pageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 1
				},
				repayRulePage: [],
				repayRule: '',
				searchData: {
					developCnt: '',
					orderCnt: '',
					monthPrdCnt: '',
					effDate: '',
	           		expDate: '',
	           		labelName: '',
	           		offerProviderId: '',
	           		nameCe: ''
				},
				offerRepayChecked: [],
				tipInfo: {
	                iconType: 1,
	                msg: "",
	                showBtn: {
	                    clear: true,
	                    save: true
	                }
	           },
	           tipSelData: {},
	           temp: 1,
	           offerRepayTemp: [],
	           systemUsers: [],
	           defaultUser: {
	           		staffId: ''
	           },
	           deptUser: [{
					label: '市场部',
					value: '10'
				}, {
					label: '政企客户部',
					value: '11'
				}, {
					label: '公众客户部',
					value: '12'
				}, {
					label: '创新事业部',
					value: '13'
				}]
			}
		},
		mounted() {
			this.initData();
			this.getRepayOfferData();
			this.getSystemRoleData();
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
//						this.documentList = res.data.requirementDetail.documentList
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			getRepayOfferData() {
				this.$axios.get(this.$api.RepayOffer, {
					params: {
						requirementId: this.componentData.requirementId,
						offerName: '',
						offerSysName: '',
						innerNbr: ''
					}
				}).then(res => {
					if(res.data.success === true) {
						this.repayOffers = [...res.data.repayOffers];
						this.repayOffersTemp = [...res.data.repayOffers];
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			getSystemRoleData() {
				this.$axios.get(this.$api.SystemRole, {
					params: {
						sysRoleId: '',
						sysRoleCode: 'R-CPC-100468'
					}
				}).then(res => {
					if(res.data.success === true) {
						this.systemUsers = res.data.systemUsers;
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			addInefficient() {
				this.offerRepayChecked = this.repayOffersTemp;
				this.temp = 1;
				this.getOfferRepayPage();
				this.gatTabData();
			},
			expire() {
				this.offerRepayChecked = this.repayOffersTemp;
				this.temp = 2;
				this.getOfferRepayPage();
			},
			gatTabData() {
				this.$axios.get(this.$api.RepayRule, {
					params: {
						repayRuleName: '',
						limit: 10,
						page: 1
					}
				}).then(res => {
					if(res.data.success) {
						this.repayRulePage = res.data.repayRulePage.content;

					} else {
						this.$message.error({ "message": "销售品清退列表查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ "message": "服务器异常！" })
				})
			},
			getOfferRepayPage(developCnt,orderCnt,monthPrdCnt,effDate,expDate,labelName,offerProviderId,nameCe) {
				this.$axios.get(this.$api.RepayOfferPage, {
					params: {
						requirementId: this.componentData.requirementId,
						developNum: developCnt,
						orderCnt: orderCnt,
						monthPrdCnt: monthPrdCnt,
						effDate: effDate ? new Date(effDate) : '',
						expDate: expDate ? new Date(expDate) : '',
						labelName: labelName,
						offerProviderId: offerProviderId,
						nameCe: nameCe,
						limit: this.pageInfo.pageSize,
						page: this.pageInfo.pageIndex,
						repayType: this.temp == 1 ? '11' : '22'
					}
				}).then(res => {
					if(res.data.success === true) {
						if(this.temp == 1){
							this.$refs.inefficient.show();
							this.dialogTitle = '添加低效销售品';
						}else{
							this.$refs.expire.show();
							this.dialogTitle = '添加到期销售品';
						}
						this.offerRepayPage = res.data.repayOfferPaasPage.content;
						this.pageInfo = {
							pageIndex: res.data.repayOfferPaasPage.page,
							pageSize: res.data.repayOfferPaasPage.limit,
							rowCount: res.data.repayOfferPaasPage.total,
							pageCount: Math.ceil(res.data.repayOfferPaasPage.total / res.data.repayOfferPaasPage.limit)
						};
						this.searchData.developCnt = '';
						this.searchData.orderCnt = '';
						this.searchData.monthPrdCnt = '';
						this.searchData.effDate = '';
						this.searchData.expDate = '';
						this.searchData.labelName = '';
						this.searchData.offerProviderId = '';
						this.searchData.nameCe = '';
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			pageChange(page){
				this.pageInfo.pageIndex = page;
				this.getOfferRepayPage();
			},
			offerClick(item){
				item.requestMemberId = '';
				this.offerRepayChecked.push(item);
			},
			deleteClick(item){
				for (var i = 0; i < this.offerRepayChecked.length; i++) {
	                if (this.offerRepayChecked[i].offerId == item.offerId) {
	                    this.offerRepayChecked.splice(i, 1);
	                }
	            }
			},
			selectMkt(val) {
	            return this.offerRepayChecked
	                .filter(item => item.statusCd != "1100")
	                .find(item => item.offerId == val.offerId);
	        },
	        delmkt(arr) {
	            return [...arr].filter(item => item.statusCd != "1100");
	        },
	        repayRuleChange(val){
	        	this.searchData.developCnt = val.developNum;
	        	this.searchData.orderCnt = val.orderMaxNum;
	        	this.searchData.monthPrdCnt = val.userMaxNum;
	        },
	        repaySearch(){
	        	this.getOfferRepayPage(this.searchData.developCnt,this.searchData.orderCnt,this.searchData.monthPrdCnt,this.searchData.effDate,this.searchData.expDate,this.searchData.labelName,this.searchData.offerProviderId,this.searchData.nameCe);
	        },
	        reset() {
	        	this.searchData.effDate = '';
				this.searchData.expDate = '';
				this.searchData.labelName = '';
				this.searchData.offerProviderId = '';
				this.searchData.nameCe = '';
	        },
	        deleteOfferRepay(item) {
	        	this.tipType = "DEL";
	            this.tipSelData = item;
	            this.tipInfo.iconType = 3;
	            this.tipInfo.msg = `是否确认删除？`;
	            this.tipInfo.showBtn.clear = true;
	            this.tipInfo.showBtn.save = true;
	            this.$refs.tip.show();
	        },
	        tipConfirm() {
	            this.tipSelData.statusCd = "1100";
	            this.tipSelData.dealType = "1100";
	            this.$refs.tip.hide();
	        },
	        inefficientSubmit() {
	        	this.offerRepayTemp = [];
	        	for(let ele of this.offerRepayChecked){
	        		let temp = {
	        			requestMemberId: ele.requestMemberId,
						memberId: ele.offerId,
						offerName: ele.offerName,
						offerSysName: ele.offerSysName,
						innerNbr: ele.innerNbr,
						requirementId: this.componentData.requirementId,
						monthPrdCnt: ele.monthPrdCnt,
						orderCnt: ele.orderCnt,
						effDate: ele.effDate ? new Date(ele.effDate) : '',
						expDate: ele.expDate ? new Date(ele.expDate) : '',
						nameCe: ele.nameCe,
						updateStaff: this.$user.getInfo().id,
						memberType: '10',
						repayType: '11',
						statusCd: ele.statusCd,
						dealType: ele.dealType
	        		}
	        		this.offerRepayTemp.push(temp);
	        	}
	        	this.$axios.post(this.$api.RepayOffer, {
	        		repayOffers: this.offerRepayTemp
				}).then(res => {
					if(res.data.success === true) {
						this.getRepayOfferData();
						this.$message.success({message: '保存成功！'});
						this.$refs.inefficient.hide();
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
	        },
	        expireSubmit() {
	        	this.offerRepayTemp = [];
	        	for(let ele of this.offerRepayChecked){
	        		let temp = {
	        			requestMemberId: ele.requestMemberId,
						memberId: ele.offerId,
						offerName: ele.offerName,
						offerSysName: ele.offerSysName,
						innerNbr: ele.innerNbr,
						requirementId: this.componentData.requirementId,
						monthPrdCnt: ele.monthPrdCnt,
						orderCnt: ele.orderCnt,
						effDate: ele.effDate ? new Date(ele.effDate) : '',
						expDate: ele.expDate ? new Date(ele.expDate) : '',
						nameCe: ele.nameCe,
						updateStaff: this.$user.getInfo().id,
						memberType: '10',
						repayType: '22',
						dealType: ele.dealType,
						statusCd: ele.statusCd,
	        		}
	        		this.offerRepayTemp.push(temp);
	        	}
	        	this.$axios.post(this.$api.RepayOffer, {
	        		repayOffers: this.offerRepayTemp
				}).then(res => {
					if(res.data.success === true) {
						this.getRepayOfferData();
						this.$message.success({message: '保存成功！'});
						this.$refs.expire.hide();
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
	       },
	       confirm() {
	       		this.$axios.put(this.$api.replace(this.$api.repayRequirement, ['{requirementId}'], [this.componentData.requirementId]), {
	        		requirementId: this.componentData.requirementId,
	        		updateStaff: this.$user.getInfo().id,
	        		statusCd: '',
	        		reqFlowStatus: '16',
	        		requirementDesc: this.requireForm.requirementDesc
				}).then(res => {
					if(res.data.success === true) {
						this.$message.success({message: '提交成功！'});
						this.$emit('componentView', 'list')
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
		   deleteRepayOffers(item){
		   		this.tipType = "DEL";
	            this.tipSelData = item;
	            this.tipInfo.iconType = 3;
	            this.tipInfo.msg = `是否确认删除？`;
	            this.tipInfo.showBtn.clear = true;
	            this.tipInfo.showBtn.save = true;
	            this.$refs.tipRepay.show();
		   },
		   tipRepayfirm() {
		   		this.$axios.put(this.$api.editRepayOffer, {
	        		repayOffers: [{
	        			dealType: '1100',
		        		requestMemberId: this.tipSelData.requestMemberId,
		        		updateStaff: this.$user.getInfo().id
	        		}]
				}).then(res => {
					if(res.data.success === true) {
						this.getRepayOfferData();
						this.$message.success({message: '删除成功！'});
						this.$refs.tipRepay.hide();
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
		   },
		   exportExcel() {
		   		window.open(this.$api.ExcelDownload + '?requirementId=' + this.componentData.requirementId);
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
			.creategoods {
				padding: 0;
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
	.span {
		color: $mainColor;
		padding: 0 5px;
		cursor: pointer;
	}
	.form-span{
		background: $mainColor;
		color: #ffffff;
	    padding: 5px 20px;
	    border-radius: 4px;
	    cursor: pointer;
	}
	.sel-box {
        width: 100%;
        line-height: 50px;
        padding: 0 20px 0 10px;
        border-left: solid 1px #f6f6f6;
        border-right: solid 1px #f6f6f6;
        i.title-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url("images/sjicon.png") no-repeat;
            background-size: cover;
            vertical-align: text-top;
        }
        .y-span {
            display: inline-block;
            margin-left: 4px;
            color: $mainColor;
            font-size: 14px;
            font-weight: bold;
        }
    }
    .group {
        border-left: solid 1px #f6f6f6;
        border-right: solid 1px #f6f6f6;
        border-bottom: solid 1px #f6f6f6;
        .col {
            background: #eff6fc;
            margin-right: 10px;
            margin-bottom: 10px;
            padding-left: 10px;
            color: $mainColor;
            span {
                display: block;
                width: 8px;
                height: 8px;
                background: url(images/bqsc.png) no-repeat;
                position: absolute;
                right: 10px;
                top: 17px;
                cursor: pointer;
            }
            a {
                display: inline-block;
                width: 80%;
                height: 28px;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .no-wrap {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.repay-span{
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
	.goods-box {
		padding: 10px;
		border: 1px solid #eee;
		background: #fdfdfd;
		.menu-btn {
			padding-bottom: 10px;
		}
		.creategoods {
				padding: 0;
			}
	}
</style>