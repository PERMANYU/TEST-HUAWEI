<template>
	<div class="accept">
		<div class="app__top">
			<span class="app__top-left">受理规则</span>
		</div>
		<div class="i-content">
			<div class="i-title">
				<div class="accept__title">业务流程规则</div>
			</div>
			<div class="accept__content">
			<Row v-if="!offerServiceRels.length" class="app__data-none">
				<Col :span="24"><span>当前无数据!</span></Col>
			</Row>
			<div class="search-box">
				<div class="search-items" ref="searchItems">
					<div :class="['search-item']"
						v-for="(item,index) in offerServiceRels"
						:key="index">
						<span>{{item.serviceOfferName}}</span>
						<span class="item-close" @click="closeSearch(index)"></span>
					</div>
					<div class="app__btn app__btn-add" @click="addServer()">选择业务流程规则</div>
				</div>
			</div>
			</div>
			<div class="i-title">
				<div class="accept__title">订购规则</div>

				<div class="h-a-add">
					<span @click="more">更多信息>></span>
				</div>
			</div>
			<div class="accept__content">
			<Form labelWidth="100px" labelAlign="left">
				<Row>
					<Col :span="7">
					<FormItem labelText="生效方式：" :errorMessage="errors.first('oldEffType')" :requiredIcon="true" >
						<Select :data="oldEffType" v-model="offerOrderRule.effType" name="oldEffType" v-validate="'required'" data-vv-as="生效方式"></Select>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="失效方式："  :errorMessage="errors.first('expType')"  :requiredIcon="true">
						<Select :data="expType" v-model="offerOrderRule.expType"  name="expType" v-validate="'required'" data-vv-as="失效方式"></Select>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1"  v-show="offerOrderRule.expType == '1600'">
						<FormItem labelText="资费失效时间：" :errorMessage="errors.first('expDate')"  :requiredIcon="offerOrderRule.expType == '1600' ? true : false">
							<DatePicker v-model="offerOrderRule.expDate" name="expDate" v-validate="offerOrderRule.expType == '1600' ? 'required' : ''" data-vv-as="资费失效时间"   placeholder="请输入资费失效时间"></DatePicker>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
					<FormItem labelText="资费有效期：" :errorMessage="errors.first('periodTime')"  :requiredIcon="offerOrderRule.expType == '1100' || offerOrderRule.periodUnit ? true : false">
						<Input v-model="offerOrderRule.periodTime" name="periodTime" v-validate="offerOrderRule.expType == '1100'  || offerOrderRule.periodUnit ? 'required|numeric' : 'numeric'" data-vv-as="资费有效期" placeholder="请输入资费有效期"></Input>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
						<FormItem labelText="有效期单位：" :errorMessage="errors.first('periodUnit')"  :requiredIcon="offerOrderRule.expType == '1100'  || offerOrderRule.periodTime ? true : false">
							<Select :data="periodUnit" v-model="offerOrderRule.periodUnit" name="periodUnit" v-validate="offerOrderRule.expType == '1100'  || offerOrderRule.periodTime ? 'required' : ''" data-vv-as="有效期单位"></Select>
						</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
						<FormItem labelText="产品存在方式：" :requiredIcon="true" :errorMessage="errors.first('prodExistType')">
							<Select :data="prodExistType" name="prodExistType"  data-vv-as="产品存在方式"   v-validate="'required'" v-model="offerOrderRule.prodExistType"></Select>
						</FormItem>
					</Col>
					
				</Row>
				<Row>
                    <Col :span="7">
					<FormItem labelText="客户协议期：" :errorMessage="errors.first('periodConstrTime')"  :requiredIcon="offerOrderRule.periodConstrUnit ? true : false">
						<Input v-model="offerOrderRule.periodConstrTime" name="periodConstrTime" v-validate="offerOrderRule.periodConstrUnit ? 'required|numeric' : 'numeric'" data-vv-as="客户协议期" placeholder="请输入客户协议期"></Input>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="协议期单位：" :errorMessage="errors.first('periodConstrUnit')"  :requiredIcon="offerOrderRule.periodConstrTime ? true : false">
						<Select :data="periodConstrUnit" v-model="offerOrderRule.periodConstrUnit" name="periodConstrUnit" v-validate="offerOrderRule.periodConstrTime ? 'required' : ''" data-vv-as="协议期单位" ></Select>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1" v-show="offerOrderRule.effType == '1600'">
						<FormItem labelText="指定生效时间：">
							<DatePicker v-model="offerOrderRule.effDate" placeholder="请输入指定生效时间"></DatePicker>
						</FormItem>
					</Col>
					
				</Row>
			</Form>
			</div>
		</div>

		<div class="i-content" v-show="isShow">
			<div class="i-title">
				<div class="accept__title">续订</div>
			</div>
			<div class="accept__content">
			<Form labelWidth="100px" labelAlign="left">
				<Row>
					<Col :span="7">
						<FormItem labelText="有效期：" :errorMessage="errors.first('offerRemewalRuleperiodTime')"  :requiredIcon="false">
							<Input v-model="offerRemewalRule.periodTime" name="offerRemewalRuleperiodTime" v-validate="'numeric'" data-vv-as="有效期" placeholder="请输入有效期"></Input>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1">
						<FormItem labelText="有效期单位：" :errorMessage="errors.first('offerRemewalRuleperiodUnit')"  :requiredIcon="false">
							<Select :data="periodUnit" v-model="offerRemewalRule.periodUnit"  name="offerRemewalRuleperiodUnit" v-validate="" data-vv-as="有效期单位"></Select>
						</FormItem>
					</Col>
				</Row>
			</Form>
			</div>
		</div>

		<div class="i-content" v-show="isShow">
			<div class="i-title">
				<div class="accept__title">变更</div>
			</div>
			<div class="accept__content">
			<Form labelWidth="100px" labelAlign="left">
				<Row>
					<Col :span="7">
						<FormItem labelText="生效方式：">
							<Select :data="effType" v-model="offerChangeRule.effType"></Select>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1">
						<FormItem labelText="指定生效时间："  :errorMessage="errors.first('effDate')"  :requiredIcon="offerChangeRule.effType == '1600' ">
							<DatePicker v-model="offerChangeRule.effDate" name="effDate" v-validate="offerChangeRule.effType == '1600' ? 'required' : ''" data-vv-as="生效时间"  placeholder="请输入指定生效时间"></DatePicker>
						</FormItem>
					</Col>
				</Row>
			</Form>
			</div>
		</div>

		<div class="i-content" v-show="isShow">
			<div class="i-title">
				<div class="accept__title">退订</div>
			</div>
			<div class="accept__content">
			<Form labelWidth="100px" labelAlign="left">
				<Row>
					<Col :span="7">
					<FormItem labelText="生效方式：">
						<Select :data="effType" v-model="offerUnsubscribeRule.effType"></Select>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="指定生效时间：" :errorMessage="errors.first('offerUnsubscribeRuleeffDate')"  :requiredIcon="offerUnsubscribeRule.effType == '1600' ? true : false">
						<DatePicker v-model="offerUnsubscribeRule.effDate"  name="offerUnsubscribeRuleeffDate" v-validate="offerUnsubscribeRule.effType == '1600' ? 'required' : ''" data-vv-as="指定生效时间" placeholder="请输入指定生效时间"></DatePicker>
					</FormItem>
					</Col>
				</Row>
			</Form>
		</div>
		</div>

		<div class="i-content" v-show="isShow">
			<div class="i-title">
				<div class="accept__title">到期处理</div>
			</div>
			<div class="accept__content">
			<Form labelWidth="100px" labelAlign="left">
				<Row>
					<Col :span="7">
					<FormItem labelText="到期处理方式：" :errorMessage="errors.first('offerExpCfgdealType')"  :requiredIcon="false">
						<Select :data="dealType" v-model="offerExpCfg.dealType" name="offerExpCfgdealType" v-validate="" data-vv-as="到期处理方式"></Select>
					</FormItem>
					</Col>
				</Row>
			</Form>
		</div>
		</div>


		<Dialog :dialogSize="dialogSize" class="h-dialog" :dialogTitle="dialogTitle" ref="addServer" @confirm="addServerSubmit">
			<Scroll class="scroll" :isShowRight="true" ref="scroll">
				<div class="a-v-table app__table">
					<!--<Row class="app__table-thead">
						<Col :span="12">业务流程编码</Col>
						<Col :span="24">业务流程名称</Col>
					</Row>-->
					<Tree v-for="(item,index) in serverOfferData" @change="changesel" @plugClick="plugClick" v-model="selTemplateType" :selLevel="3" :folder="item" :key="index" :children-str="'childrenNode'" :init-level="1" :level-str="'level'" :keys="treeShowKeyItems" :defaultObj="defaultObj"></Tree>
					<Row v-if="serverOfferData.length == 0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
					<span class="y-span" v-show="serverData.length>0">已选</span>
					<div class="a-v-table app__table">
						<Row class="app__table-thead">
							<Col :span="8">业务流程编码</Col>
							<Col :span="8">业务流程名称</Col>
							<Col :span="8">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in selTemplateType" :key="index">
							<Col :span="8">{{item.standardCd}}</Col>
							<Col :span="8">{{item.serviceOfferName}}</Col>
							<Col :span="8">
							<span class="span iconfont icon-shanchu" title="删除" @click="deleteServer(item,index)"></span>
							</Col>
						</Row>
					</div>
				</div>
			</Scroll>
		</Dialog>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				dialogSize: {
					size: 80,
					min: 600,
					max: 800
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				dialogTitle: '',
				oldEffType: [{
					value: '1000',
					label: '当月生效'
				}, {
					value: '1100',
					label: '次月生效'
				}, {
					value: '1200',
					label: '用户选择时间生效'
				}, {
					value: '1300',
					label: '立即生效'
				}, {
					value: '1600',
					label: '业务指定时间生效'
				}, {
					value: '1700',
					label: '次日生效'
				}, {
					value: '1800',
					label: '当天生效'
				}, {
					value: '1900',
					label: '次周期生效（物联网专用）'
				}],
				expType: [{
					value: '1000',
					label: '当月失效'
				}, {
					value: '1100',
					label: '次月失效'
				}, {
					value: '1200',
					label: '用户选择时间失效'
				}, {
					value: '1300',
					label: '立即失效'
				}, {
					value: '1600',
					label: '业务指定时间失效'
				}, {
					value: '1700',
					label: '次日失效'
				}, {
					value: '1800',
					label: '当天失效'
				}],
				periodConstrUnit: [{
					value: '1000',
					label: '年'
				}, {
					value: '1100',
					label: '月'
				}, {
					value: '1200',
					label: '日'
				}],
				periodUnit: [{
					value: '1000',
					label: '年'
				}, {
					value: '1100',
					label: '月'
				}, {
					value: '1200',
					label: '日'
				}],
				prodExistType: [
				{
					value: '1000',
					label: '新装'
				},
				{
					value: '1100',
					label: '在用'
				}, {
					value: '1200',
					label: '新装&在用（全部用户）'
				}],
				effType: [{
					value: '1000',
					label: '当月生效'
				}, {
					value: '1100',
					label: '次月生效'
				},{
					value: '1200',
					label: '用户选择时间生效'
				},{
					value: '1300',
					label: '立即生效'
				}, {
					value: '1600',
					label: '业务指定时间生效'
				}, {
					value: '1700',
					label: '次日生效'
				}, {
					value: '1800',
					label: '当天生效'
				}, {
					value: '1900',
					label: '次周期生效（物联网专用）'
				}],
				dealType: [{
					value: '10',
					label: '自动续订'
				}, {
					value: '20',
					label: '再次协议续订'
				}, {
					value: '30',
					label: '自动退订'
				}, {
					value: '40',
					label: '自动注销'
				}],
				treeShowKeyItems: [{ key: 'serviceOfferName' }],
				defaultObj: {
					key: "serviceOfferId",
					values: []
				},
				selTemplateType: [],
				offerId: '',
				offerOrderRule: {
					offerEffExpConfigId: "",
					offerId: "",
					serviceOfferId: "",
					prodExistType: "1200",
					effType: "1100",
					expType: "",
					effDate: "",
					expDate: "2050-12-31",
					periodTime: "",
					periodUnit: "",
					periodConstrTime: '',
					periodConstrUnit: ''
				},
				offerRemewalRule: {
					offerEffExpConfigId: "",
					offerId: "",
					serviceOfferId: "",
					periodTime: "",
					periodUnit: "",
				},
				offerChangeRule: {
					offerEffExpConfigId: "",
					offerId: "",
					serviceOfferId: "",
					effType: "",
					effDate: "",
				},
				offerUnsubscribeRule: {
					offerEffExpConfigId: "",
					offerId: "",
					serviceOfferId: "",
					effType: "",
					effDate: "",
				},
				offerExpCfg: {
					offerExpCfgId: "2",
					offerId: "",
					dealType: "10",
					serviceOfferId: ''
				},
				// offerServiceRels: [{
				// 	applyRegionId: 831000,
				// 	offerServRelId: "2",
				// 	offerId: "",
				// 	serviceOfferId: "",
				// 	standardCd: '',
				// 	serviceOfferName: '',
				// 	createDate: '',
				// 	createStaff: '7',
				// 	statusCd: '1000',
				// 	updateDate: '',
				// 	updateStaff: ''
				// }],
				offerServiceRels:[],
				serverData: [],
				offerServiceRelsTemp: [],
				serverOfferData: [],
				isShow:false,
				tipIndex: 0
			}
		},
		mounted() {
			this.offerId = this.componentData.offerId;
			this.getRuleData();
			this.offerOrderRule.expType = "1600"
		},
		methods: {
			plugClick() {
				this.$refs.addServer.initHeight();
				this.$refs.scroll.initScroll();
			},
			changesel(val){
				this.defaultObj.values = val
			},
			getRuleData() {
				if(this.offerId) {
					this.$axios.get(this.$api.replace(this.$api.OfferRule, ['{offerId}'], [this.offerId]), {
						params: {
							statusCd: '1000'
						}
					})
					.then(res => {
						if(res.data.success === true) {
							this.offerServiceRels = res.data.offerServiceRelDTOS ? res.data.offerServiceRelDTOS : [];
							this.offerOrderRule.prodExistType = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.prodExistType :  "1200"
							this.offerOrderRule.effType = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.effType : "1100"
							this.offerOrderRule.expType = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.expType  : "1600"
							this.offerOrderRule.expDate = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.expDate : "2050-12-31"
							this.offerOrderRule.offerEffExpConfigId = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.offerEffExpConfigId : ""
							this.offerOrderRule.serviceOfferId = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.serviceOfferId : ""
							this.offerOrderRule.periodConstrTime = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.periodConstrTime  :  ""
							this.offerOrderRule.effDate = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.effDate :  ""
							this.offerOrderRule.periodConstrUnit = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.periodConstrUnit :  ""
							this.offerOrderRule.periodTime = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.periodTime :  ""
							this.offerOrderRule.periodUnit = res.data.offerOrderRuleDTO ? res.data.offerOrderRuleDTO.periodUnit :  ""
							this.offerRemewalRule = res.data.offerRemewalRuleDTO || {};
							this.offerChangeRule = res.data.offerChangeRuleDTO || {};
							this.offerUnsubscribeRule = res.data.offerUnsubscribeRuleDTO || {};
							this.offerExpCfg = res.data.offerExpCfgDTO || {};
							this.offerExpCfg.dealType = res.data.offerExpCfgDTO.dealType || '10';
						} else {
							this.$message.error({ message: '失败！' });
						}
					}).catch(error => {
					})
				}
			},
			getServerData() {
				this.showLoading = true;
				this.$axios.get(this.$api.replace(this.$api.OfferServiceRel, ['{offerId}'], [this.offerId]), {
					params: {
						statusCd: '1000'
					}
				}).then(res => {
					if(res.data.success == true) {
						this.serverData = res.data.offerServiceRels
//						this.selTemplateType = this.serverData;
//						this.treeInputSelObj.allArray = [];
//						this.selTemplateType = [...this.serverData.filter(item => {
//							this.treeInputSelObj.allArray.push({ id: item.serviceOfferId });
//						})];
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {
					this.$message.error({ message: '失败！' });
				})
			},
            //选择业务流程树(销售品配置-业务规则-选择业务流程)
			getServerList() {
				this.showLoading = true;
				this.$axios.get(this.$api.ServiceOffer, {
					params: {
                        standardCd: '3000000000'
					}
				}).then(res => {
					if(res.data.success) {
						this.serverOfferData = res.data.serviceOffers;
						//						this.selTemplateType = this.serverOfferData.filter(item => {
						//							return this.serverData.find(item1 => item.serviceOfferId == item1.serviceOfferId);
						//						})
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {
	                this.$message.error({ message: '失败！' });
				})
			},
			addServer() {
				this.defaultObj.values = [];
				for(let ele of this.offerServiceRels){
					this.defaultObj.values.push(ele.serviceOfferId)
				}
				this.selTemplateType = this.offerServiceRels;
				this.$refs.addServer.show();
				this.dialogTitle = '添加业务流程';
				this.getServerData();
				this.getServerList();
			},
			addServerSubmit() {
				this.offerServiceRels = this.selTemplateType;
				this.$refs.addServer.hide();
			},
			closeSearch(index){
				console.log(index);
				this.tipType = 'DEL';
				this.tipInfo.iconType = 3;
				this.tipIndex = index;
				this.tipInfo.msg = `确定删除吗?`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			deleteServer(item,index){
				for(let i=0;i<this.defaultObj.values.length;i++){
					if(this.defaultObj.values[i] == item.serviceOfferId){
						this.defaultObj.values.splice(i,1);
					}
				}
				this.selTemplateType.splice(index, 1)
			},
			pageChange() {

			},
			deleteServiceRels(index) {
				this.offerServiceRels.splice(index, 1);
			},
			save(callback) {
				if(this.offerServiceRels.length === 0) {
					this.tipType = 'DEL';
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `请选择业务流程规则!`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				} else {
					for(var i = 0; i < this.offerServiceRels.length; i++) {
					this.offerServiceRelsTemp[i] = {
						applyRegionId: 831000,
						offerServRelId: this.offerServiceRels[i].offerServRelId,
						offerId: this.offerId,
						serviceOfferId: this.offerServiceRels[i].serviceOfferId,
						standardCd: this.offerServiceRels[i].standardCd,
						standardName: this.offerServiceRels[i].standardName,
						createDate: '',
						createStaff: '7',
						statusCd: '1000',
						updateDate: '',
						updateStaff: '7'
					}
				}
				this.$validator.validateAll().then((result) => {
					if(result) {
						this.$axios.post(this.$api.replace(this.$api.OfferRule, ['{offerId}'], [this.offerId]), {
							"offerChangeRuleDTO": {
								"applyRegionId": 831000,
								"createDate": "",
								"createStaff": 7,
								"effDate": this.offerChangeRule.effDate ? new Date(this.offerChangeRule.effDate) : '',
								"effType": this.offerChangeRule.effType,
								"offerEffExpConfigId": this.offerChangeRule.offerEffExpConfigId,
								"offerId": this.offerId,
								"serviceOfferId": this.offerChangeRule.serviceOfferId,
								"statusCd": "1000",
								"updateDate": "",
								"updateStaff": 7
							},
							"offerExpCfgDTO": {
								"applyRegionId": 831000,
								"createDate": "",
								"createStaff": 7,
								"dealType": this.offerExpCfg.dealType,
								"offerExpCfgId": this.offerExpCfg.offerExpCfgId,
								"offerId": this.offerId,
								"serviceOfferId": this.offerExpCfg.serviceOfferId,
								"statusCd": "1000",
								"updateDate": "",
								"updateStaff": 7
							},
							"offerOrderRuleDTO": {
								"applyRegionId": 831000,
								"createDate": "",
								"createStaff": 7,
								"effDate": this.offerOrderRule.effDate ? new Date(this.offerOrderRule.effDate) : '',
								"expDate": this.offerOrderRule.expDate ? new Date(this.offerOrderRule.expDate) : '',
								"expType": this.offerOrderRule.expType,
								"effType": this.offerOrderRule.effType,
								"periodConstrTime": this.offerOrderRule.periodConstrTime,
								"periodConstrUnit": this.offerOrderRule.periodConstrUnit,
								"offerEffExpConfigId": this.offerOrderRule.offerEffExpConfigId,
								"offerId": this.offerId,
								"periodTime": this.offerOrderRule.periodTime,
								"periodUnit": this.offerOrderRule.periodUnit,
								"prodExistType": this.offerOrderRule.prodExistType,
								"serviceOfferId": this.offerOrderRule.serviceOfferId,
								"statusCd": "1000",
								"updateDate": "",
								"updateStaff": 7
							},
							"offerRemewalRuleDTO": {
								"applyRegionId": 831000,
								"createDate": "",
								"createStaff": 7,
								"offerEffExpConfigId": this.offerRemewalRule.offerEffExpConfigId,
								"offerId": this.offerId,
								"periodTime": this.offerRemewalRule.periodTime,
								"periodUnit": this.offerRemewalRule.periodUnit,
								"serviceOfferId": this.offerRemewalRule.serviceOfferId,
								"statusCd": "1000",
								"updateDate": "",
								"updateStaff": 7
							},
							"offerServiceRelDTOS": this.offerServiceRelsTemp,
							"offerUnsubscribeRuleDTO": {
								"applyRegionId": 831000,
								"createDate": "",
								"createStaff": 7,
								"effDate": this.offerUnsubscribeRule.effDate ? new Date(this.offerUnsubscribeRule.effDate) : '',
								"effType": this.offerUnsubscribeRule.effType,
								"offerEffExpConfigId": this.offerUnsubscribeRule.offerEffExpConfigId,
								"offerId": this.offerId,
								"serviceOfferId": this.offerUnsubscribeRule.serviceOfferId,
								"statusCd": "1000",
								"updateDate": "",
								"updateStaff": 7
							}
						}).then(res => {
							if(res.data.success == true) {
								this.getRuleData();
								this.$message.success({ message: '受理规则保存成功！' });
								callback(true);
							} else {
								this.$message.error({ message: '受理规则保存失败！' });
								callback(false);
							}
						}).catch(error => {
			                this.$message.error({ message: '受理规则保存失败！' });
			                callback(false);
						})
					}else{
						this.$message.error({ message: '受理规则表单验证失败！' });
						callback(false);
					}
				})
				}
			},
			more() {
				if(this.isShow) {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
			},
			tipBack() {

			},
			tipConfirm() {
				this.offerServiceRels.splice(this.tipIndex, 1)
				this.$refs.tip.hide();
			}
		}
	}
</script>

<style scoped lang="scss">
	.accept {
		width: 100%;

		.h-a-add {
			position: absolute;
			top: 0px;
			right: 10px;
			height: 30px;
            pointer-events: auto;
			span {
					color: #49c1f8;
					cursor: pointer;
				}
		}
		.h-a-more {
			position: absolute;
			top: 15px;
    		right: 0;
		}
		.h-operation{
			width: 80%;
			margin-top: 10px;
			padding-right: 20%;
			background-color: #fff;
		}
		.i-content {
			margin: 0 auto;
			/*margin-bottom: 10px;*/
			.i-title {
				height: 40px;
				line-height: 40px;
				padding: 0;
				display: flex;
				justify-content: space-between;
				background-color: #f5f6fa;
				border: solid 1px #eeeeee;
				.accept__title{
					text-indent: 20px;
					font-family: MicrosoftYaHei;
					font-size: 14px;
					font-weight: normal;
					font-stretch: normal;
					line-height: 40px;
					letter-spacing: 0px;
					color: #254063;
				}
				.t-name {
					display: inline-block;
					margin-top: 17px;
					height: 16px;
					line-height: 16px;
					padding: 0 10px;
					border-left: 4px solid #3fd0ff;
					color: #3fd0ff;
					font-weight: bold;
				}
				.t-namer {
					display: inline-block;
					margin-top: 17px;
					height: 16px;
					line-height: 16px;
					padding: 0 10px;
					/*border-left: 4px solid #3fd0ff;*/
					/*color: #3fd0ff;*/
					font-weight: bold;
					background: url(images/hei.jpg) no-repeat left center;
				}
				.propertyButton {
					margin-top: 10px;
				}
			}
			.accept__content{
					background-color: #ffffff;
					border: solid 1px #eeeeee;
					padding: 30px 30px 20px 30px;
					margin-bottom: 30px;
				}
			.search-box{
				width: 90%;
				line-height: 40px;
				&.search-long{
					padding: 0 30px 0 80px;
				}

				.search-name{
					position: absolute;
					width: 75px;
					top: 0;
					left: 0;
					text-align: right;
					white-space: nowrap;
				}

				.search-items{
					width: 90%;
					height: 100%;
				}

				.search-item{
					display: inline-block;
					height: 34px;
					line-height: 34px;
					padding: 0 20px;
					margin-right: 50px;
					border: 1px solid #f5f5f5;
					border-top-left-radius: 4px;
					border-bottom-left-radius: 4px;

					.item-close{
						position: absolute;
						display: block;
						width: 40px;
						height: 34px;
						top: -1px;
						right: -40px;
						background-image: url(./images/close.png);
						background-repeat: no-repeat;
						background-position: center;
						cursor: pointer;

						&:hover{
							background-image: url(./images/close_hover.png);
						}
					}
				}
			}
		}
		.app__table {
			.span {
				color: $mainColor;
				padding: 0 5px;
				cursor: pointer;
			}
		}

		.main {
			padding: 20px;
			.search {
				width: 300px;
				margin: 20px 15px;
			}
			.y-span {
				display: block;
				margin: 10px 0;
				color: #b6de8f;
			}
		}
	}
</style>
