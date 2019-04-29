<template>
	<div class="release">
		<div class="app__top">
			<span class="app__top-left">销售品基本信息</span>
		</div>
		<div class="basic-content">
			<Row>
				<Form labelWidth="100px" labelAlign="left">
					<Col :span="6" class="col-show">
					<FormItem labelText="销售品名称：" small>
						<span>{{offerOrd.offerName}}</span>
					</FormItem>
					</Col>
					<Col :span="5" :offset="1">
					<FormItem labelText="商品类型：" small>
						<span>{{offerOrd.commodityType=="10"?"商品":offerOrd.commodityType=="30"?"组合商品":offerOrd.commodityType=="40"?"可选包":offerOrd.commodityType=="50"?"促销":offerOrd.commodityType=="60"?"关联包":"加装包"}}</span>
					</FormItem>
					</Col>
					<Col :span="6">
					<FormItem labelText="上市时间：" small>
						<span>{{offerOrd.effDate |　datetime}}</span>
					</FormItem>
					</Col>
					<Col :span="6">
					<FormItem labelText="退市时间：" small>
						<span>{{offerOrd.expDate |　datetime}}</span>
					</FormItem>
					</Col>
				</Form>
			</Row>
		</div>

		<div class="app__top">
			<span class="app__top-left">环节配置完成情况</span>
		</div>
		<div class="app__table__inner">
			<Row class="app__table-thead flow">
				<Col :span="10">销售品配置信息</Col>
				<Col :span="6">目标客户信息</Col>
				<Col :span="2">销售渠道信息</Col>
				<Col :span="2">促销资源信息</Col>
				<Col :span="2">配置客户信息</Col>
				<Col :span="2"></Col>
			</Row>
			<Row class="app__table-thead flow">
				<Col :span="4">销售品基本信息</Col>
				<Col :span="2">资费/促销</Col>
				<Col :span="2">受理规则</Col>
				<Col :span="2">毛利预估</Col>
				<Col :span="2">目标客户</Col>
				<Col :span="2">客户约束</Col>
				<Col :span="2">资产约束</Col>
				<Col :span="2">销售渠道</Col>
				<Col :span="2">促销资源</Col>
				<Col :span="2">客户服务</Col>
				<Col :span="2">详情</Col>
			</Row>
			<Row class="app__table-item flow">
				<Col :span="4">
				<span v-if="offerObj.offerBasic == '1'" class="span iconfont icon-yipeizhi"></span>
				<span v-else class="span iconfont icon-weipeizhi1128"></span>
				</Col>
				<Col :span="2">
				<span v-if="offerObj.offerTariff == '1'" class="span iconfont icon-yipeizhi"></span>
				<span v-else class="span iconfont icon-weipeizhi1128"></span>
				</Col>
				<Col :span="2">
				<span v-if="offerObj.acctRule == '1'" class="span iconfont icon-yipeizhi"></span>
				<span v-else class="span iconfont icon-weipeizhi1128"></span>
				</Col>
				<Col :span="2">
				<span v-if="offerObj.grossForecast == '1'" class="span iconfont icon-yipeizhi"></span>
				<span v-else class="span iconfont icon-weipeizhi1128"></span>
				</Col>
				<Col :span="2">
				<span v-if="offerObj.targetCust == '1'" class="span iconfont icon-yipeizhi"></span>
				<span v-else class="span iconfont icon-weipeizhi1128"></span>
				</Col>
				<Col :span="2">
				<span v-if="offerObj.custRstr == '1'" class="span iconfont icon-yipeizhi"></span>
				<span v-else class="span iconfont icon-weipeizhi1128"></span>
				</Col>
				<Col :span="2">
				<span v-if="offerObj.assetRstr == '1'" class="span iconfont icon-yipeizhi"></span>
				<span v-else class="span iconfont icon-weipeizhi1128"></span>
				</Col>
				<Col :span="2">
				<span v-if="offerObj.offerChannel == '1'" class="span iconfont icon-yipeizhi"></span>
				<span v-else class="span iconfont icon-weipeizhi1128"></span>
				</Col>
				<Col :span="2">
				<span v-if="offerObj.offerRes == '1'" class="span iconfont icon-yipeizhi"></span>
				<span v-else class="span iconfont icon-weipeizhi1128"></span>
				</Col>
				<Col :span="2">
				<span v-if="offerObj.offerEvtSceRel == '1'" class="span iconfont icon-yipeizhi"></span>
				<span v-else class="span iconfont icon-weipeizhi1128"></span>
				</Col>
				<Col :span="2"><span @click="itemSee">查看</span></Col>
			</Row>
		</div>
		<div class="app__top">
			<span class="app__top-left">系统测试</span>
		</div>
		<div class="app__table__inner">
			<Row class="app__table-thead">
				<Col :span="5">测试系统</Col>
				<Col :span="5">测试场景</Col>
				<Col :span="5">测试用例名称</Col>
				<Col :span="5">测试结果</Col>
				<Col :span="4">更多信息</Col>
			</Row>
			<Row class="app__table-item" v-if="sceneList.length>0" v-for="(item,index) in sceneList" :key="index">
				<Col :span="5">{{item.systemNbr=="CRM"?"CRM":item.systemNbr=="ABP"?"计费":"网厅"}}</Col>
				<Col :span="5">{{item.serviceOfferId == "1000027"?"新装":item.serviceOfferId == "1000031"?"变更":item.serviceOfferId == "1000048"?"退订":"续订"}}</Col>
				<Col :span="5">{{item.tempOfferSysTestCases.testCaseName?item.tempOfferSysTestCases.testCaseName:'---'}}</Col>
				<Col :span="5">{{item.tempOfferSysTestCases.testResult==='1'?'通过':item.tempOfferSysTestCases.testResult==='2'?'不通过':'---'}}</Col>
				<Col :span="4">
				<span class="iconfont icon-xiazai1128" v-if="item.tempOfferSysTestCases.docLink !='未上传附件'" @click="downLoad(item)">下载</span>
				<span v-else>--</span>
				</Col>
			</Row>
			<Row v-if="!sceneList.length" class="app__data-none">
				<Col :span="24"><span>当前无数据!</span></Col>
			</Row>
		</div>
		<div class="app__top">
			<span class="app__top-left">业务测试</span>
		</div>
		<div class="app__table__inner">
			<Row class="app__table-thead">
				<Col :span="8">场景测试名称</Col>
				<Col :span="8">场景测试说明</Col>
				<Col :span="4">测试结果</Col>
				<Col :span="4">更多信息</Col>
			</Row>
			<Row class="app__table-item" v-if="offerBasicArray.length>0" v-for="(item,index) in offerBasicArray" :key="index">
				<Col :span="8">{{item.testSceneName}}</Col>
				<Col :span="8">{{item.testSceneDesc}}</Col>
				<Col :span="4">{{item.testResult == 1 ? '通过' : '不通过'}}</Col>
				<Col :span="4">
				<span class="iconfont icon-xiazai1128" v-if="item.docLink !='未上传附件'" @click="downLoadYe(item)">下载</span>
				<span v-else>--</span>
				</Col>
			</Row>
			<Row v-if="!offerBasicArray.length" class="app__data-none">
				<Col :span="24"><span>当前无数据!</span></Col>
			</Row>
		</div>
		<div class="app__top">
			<span class="app__top-left">发布上市</span>
		</div>
		<Scroll class="scroll" :isShowRight="true">
			<ul>
				<li>
					<div class="l-picture">
						<i class="iconfont icon-bangongpingtai"></i>
					</div>
					<div class="l-checkbox">
						<Checkbox @click.native="checkboxClick(100000004)" name="checkbox1" label="100000004" v-model="checkboxData">CRM</Checkbox>
					</div>
				</li>

				<li>
					<div class="l-picture">
						<i class="iconfont icon-feiyong"></i>
					</div>
					<div class="l-checkbox">
						<Checkbox @click.native="checkboxClick(100000005)" name="checkbox1" label="100000005" v-model="checkboxData">计费</Checkbox>
					</div>
				</li>
			</ul>
		</Scroll>
		<Dialog class="dialog-submit" :dialogSize="BdialogSize" dialogTitle="办结" ref="flowSubmit" @confirm="handleSub">
			<Scroll class="dialog-examine" :isShowRight="true">
				<div v-if="isSinge == '1'">
					<div class="flow">下一环节：
						<Select :data="handleData" dataValueStr="taskDefKey" dataLabelStr="taskDefName" v-model="selected"></Select>
					</div>
					<div v-show="selected">处理人：
						<Select v-show="item.taskDefKey == selected" v-for="(item,index) in handleData" :key="index" :data="item.candidateUsers" dataValueStr="userId" dataLabelStr="userName" v-model="item.defaultUser.userId"></Select>
					</div>
				</div>
				<div v-else v-for="(item,index) in handleData" :key="index">
					<span class="span"><span class="number">{{index+1}}</span>下一环节 : {{item.taskDefName}}</span>
					<Select v-if="item.candidateUsers" :data="item.candidateUsers" dataValueStr="userId" dataLabelStr="userName" v-model="item.defaultUser.userId"></Select>
				</div>
				<p>
					描述：
				</p>
				<div>
					<textarea class="app__textarea" v-model="handleOption"></textarea>
				</div>
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
				offerOrd: {},
				offerObj: {},
				sceneData: [],
				sceneList: [],
				offerBasicArray: [],
				systemData: [],
				checkboxData: [],
				handleData: [],
				taskIdTemp: '',
				nextTaskList: [],
				BdialogSize: {
					size: 30,
					min: 400,
					max: 400
				},
				handleOption: '',
				isSinge: '',
				selected: ''
			}
		},
		mounted() {
			this.configDetail()
			this.getSystemData()
			this.getBussTest()
			this.getReleaseSystemData()
			this.getFlowSet()
		},
		methods: {
			configDetail() {
				let offerIdArr = []
				offerIdArr.push(this.componentData.offerId)
				this.$axios.get(this.$api.replace(this.$api.ConfigDetail, ['{offerId}'], offerIdArr), {
					params: {
						offerId: this.componentData.offerId
					}
				}).then(res => {
					if(res.data.success) {
						if(res.data.offerConfigDetailDTO) {
							this.offerOrd = res.data.offerConfigDetailDTO.offerOrd
							this.offerObj = res.data.offerConfigDetailDTO
						}
					} else {
						this.$message.error({ message: '环节配置查询失败！' });
					}
				})
			},
			//获取系统测试信息
			getSystemData() {
				let offerIdArr = []
				offerIdArr.push(this.componentData.offerId)
				this.$axios.get(this.$api.replace(this.$api.OfferSysTestScene, ['{offerId}'], offerIdArr), {
					params: {
						systemInfoId: 0 //systemInfoId传0查全部
					}
				}).then((res) => {
					if(res.data.success) {
						if(res.data.offerSysTestScenes) {
							this.sceneData = res.data.offerSysTestScenes;
							this.sceneList = []
							
							res.data.offerSysTestScenes.map(item => {
								for(let val of item.offerSysTestCases){
									let tempItem = JSON.parse(JSON.stringify(item));
									tempItem.tempOfferSysTestCases = val;
									this.sceneList.push(tempItem)
								}
							})
						}

					} else {
						this.$message.error({ message: '操作失败！' });
					}
				}).catch(error => {

				})
			},
			//获取业务测试信息
			getBussTest() {
				let offerIdArr = []
				offerIdArr.push(this.componentData.offerId)
				this.$axios.get(this.$api.replace(this.$api.OfferBussTest, ["{offerId}"], offerIdArr), {

				}).then(res => {
					if(res.data.success) {
						this.offerBasicArray = res.data.offerBussTestDTOList || [];
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			itemSee() {
				window.open(`${this.$api.WindowOpenServer}/goodsviewlist/${this.componentData.offerId}/${this.componentData.requirementId}`);

			},
			//下载附件
			downLoad(item) {
				window.open(this.$api.Shtelpaasstorage + item.tempOfferSysTestCases.docLink)
			},
			downLoadYe(item){
				window.open(this.$api.Shtelpaasstorage + item.docLink)
			},
			//点击复选框
			checkboxClick(rstrObjId) {
				let activeData = [...this.systemData.filter(obj => obj.rstrObjId == rstrObjId)];
				if(activeData.length === 0) {
					this.systemData.push({
						offerRestrictId: null, //销售品限制标识
						offerId: this.componentData.offerId, //销售品标识
						rstrObjType: '5000', //保存上线系统时传5000
						rstrObjId: rstrObjId, //系统id
						statusCd: "1000", //状态
						createStaff: this.$user.getInfo().id, //创建人id
						updateStaff: this.$user.getInfo().id //修改人id
					})
				} else {
					this.systemData = this.systemData.filter(obj => obj.rstrObjId != rstrObjId);
					if(activeData[0].offerRestrictId) {
						if(activeData[0].statusCd == '1000') {
							activeData[0].statusCd = '1100';
						} else {
							activeData[0].statusCd = '1000';
						}
						this.systemData.push(activeData[0]);
					}
				}
			},

			//查询已选上市系统
			getReleaseSystemData() {
				this.$axios.get(this.$api.replace(this.$api.OfferReleaseSysRel, ['{offerId}'], [this.componentData.offerId]), {
					params: {

					}
				}).then((res) => {
					if(res.data.success) {
						this.systemData = res.data.offerChannelRels;
						for(let i = 0; i < this.systemData.length; i++) {
							this.checkboxData.push(this.systemData[i].rstrObjId)
						}
					} else {
						this.$message.error({ message: '查询失败！' });
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},

			//修改上市系统
			save(callback) {
				this.$axios.post(this.$api.replace(this.$api.OfferRestrict, ['{offerId}'], [this.componentData.offerId]), {
					offerChannelRels: this.systemData
				}).then((res) => {
					if(res.data.success) {
						this.$message.success({ message: '保存成功！' });
						callback(true)
						this.getSystemData();
					} else {
						this.$message.error({ message: '操作失败！' });
						callback(false)
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
					callback(false)
				})
				// this.$refs.flowSubmit.show();
				// this.getFlowSet();
			},
			// 办结下一节点查询列表
			getFlowSet() {
				if(this.componentData.actType != 'MOD'){
					this.$axios.post(this.$api.TakeFlowSchedule, {
						"completeOrReturn": "1",
						"requirementId": this.componentData.requirementId,
						"tasks": [{
							"businessTypeCode": "offer",
							"objId": this.componentData.offerId,
							"objType": "1000",
							"taskId": this.componentData.taskId
						}],
						"userId": this.$user.getInfo().id
	
					}).then(res => {
						if(res.data.success === true) {
							this.isSinge = res.data.isSinge;
							this.handleData = res.data.flowNextTaskDTOS;
							this.taskIdTemp = res.data.taskId;
						} else {
							this.$message.error({ message: res.data.msg })
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg })
					})
				}
			},
			handleSub() {
				this.nextTaskList = [];
				if(this.handleData.length > 0) {
					if(this.isSinge == '1') {
						for(let ele of this.handleData) {
							if(this.selected == ele.taskDefKey) {
								this.completeOrReturn = ele.completeOrReturn;
								let temp = {
									assignee: ele.defaultUser.userId,
									elementId: ele.taskDefKey
								}
								this.nextTaskList.push(temp);
							}
						}
						this.$axios.post(this.$api.HandleSub, {
						"assignee": this.$user.getInfo().id,
						"completeOrReturn": this.completeOrReturn,
						"tasks": [{
							"businessTypeCode": "offer",
							"comments": this.handleOption,
							"nextTaskList": this.nextTaskList,
							"objId": this.componentData.offerId,
							"objType": "1000",
							"requirementId": this.componentData.requirementId,
							"taskId": this.taskIdTemp
						}]

					}).then(res => {
						if(res.data.success === true) {
							this.flowScheduleData = res.data.offerList;
							this.$refs.flowSubmit.hide();
							this.$message.success({ message: '成功！' });
							this.$router.push({ name: 'Requirement'})
						} else {
							this.$message.error({ message: res.data.msg })
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg })
					})
					}else{
						for(let ele of this.handleData){
							let temp = {
								assignee: ele.defaultUser.userId,
								elementId: ele.taskDefKey
							}
							this.nextTaskList.push(temp)
						}
						this.$axios.post(this.$api.HandleSub, {
						"assignee": this.$user.getInfo().id,
						"completeOrReturn": '1',
						"tasks": [{
							"businessTypeCode": "offer",
							"comments": this.handleOption,
							"nextTaskList": this.nextTaskList,
							"objId": this.componentData.offerId,
							"objType": "1000",
							"requirementId": this.componentData.requirementId,
							"taskId": this.taskIdTemp
						}]

					}).then(res => {
						if(res.data.success === true) {
							this.flowScheduleData = res.data.offerList;
							this.$refs.flowSubmit.hide();
							this.$message.success({ message: '成功！' });
							this.$router.push({ name: 'Requirement'})
						} else {
							this.$message.error({ message: res.data.msg })
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg })
					})
					}
				} else {
					// this.$message.error({message: "请选择下一环节"})
					this.$axios.post(this.$api.HandleSub, {
						"taskId": this.taskIdTemp,
						"assignee": this.$user.getInfo().id,
						// "assignee": '2',
						"completeOrReturn": "1",
						"offerId": this.componentData.offerId,
						"requirementId": this.componentData.requirementId,
						//                      "offerId": "544128",
						"comments": this.handleOption,
						"nextTaskList": []
					}).then(res => {
						if(res.data.success === true) {
							this.flowScheduleData = res.data.offerList;
							this.$refs.flowSubmit.hide();
							this.$message.success({ message: '流程结束！' });
							this.$emit('flowBack');
						} else {
							this.$message.error({ message: res.data.msg })
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg })
					})
				}
			}

		}
	}
</script>

<style scoped lang="scss">
	.release {
		.basic-content {
			padding: 20px;
			margin-bottom: 10px;
			box-sizing: border-box;
			border: 1px solid #F5F5F5;
		}
	}
	
	.col-show {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.app__table__inner {
		margin-bottom: 10px;
	}
	
	.app__table-thead,
	.app__table-item {
		&.flow {
			.col {
				border-right: 1px solid #eee;
			}
		}
	}
	
	.span {
		padding: 0 5px;
		color: $mainColor;
	}
	
	.icon-yipeizhi {
		color: #52c994;
	}
	
	.icon-weipeizhi1128 {
		color: #ffac36;
	}
	
	.icon-chakan1128 {
		cursor: pointer;
		font-size: 12px;
		margin-right: 5px;
		color: #5c9cf3;
	}
	
	.icon-xiazai1128 {
		cursor: pointer;
		font-size: 12px;
		margin-right: 5px;
		color: #ff9600;
	}
	
	.scroll {
		padding: 20px !important;
		ul {
			li {
				width: 100px;
				height: 120px;
				border: 1px solid gainsboro;
				float: left;
				margin-right: 20px;
				box-sizing: content-box;
				
				.l-checkbox {
					width: 100%;
					height: 40px;
					background: gainsboro;
					line-height: 40px;
					text-align: center;
				}
				.l-picture {
					width: 100%;
					height: 80px;
					line-height: 80px;
					text-align: center;

					.iconfont{
						font-size: 40px;
						color: $mainColor;
					}
				}
			}
		}
	}
</style>