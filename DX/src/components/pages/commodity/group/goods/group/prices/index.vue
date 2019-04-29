<template>
	<div class="prices">
		<div>
			<div class="app__top">
				<span class="app__top-left">资费定价</span>
			</div>
			<div class="selectbtn app__btn app__btn-add" @click="selectClick">选择资费模板</div>
		</div>
		<div class="prices-module">
			<Row>
				<Col :span="4" class="left-col">计费模板</Col>
				<Col :span="20">
				<Row>
					<Col :span="24">
					<ul>
						<li v-for="(item,index) in moduleArray" :key="index">
							<i v-if="!selectMkt(item)" class="iconfont icon-tianjia1127" @click="addModule(item)">&nbsp;{{item.label}}</i>
							<i v-if="selectMkt(item)" class="iconfont icon-tianjia1127 span" @click="addModule(item)">&nbsp;{{item.label}}</i>
						</li>
					</ul>
					</Col>
				</Row>
				</Col>
			</Row>
		</div>
		<div class="app__table">
			<Row :class="['tariff-item']" v-for="(item,tariffSelIndex) in tariffSelList" :key="tariffSelIndex">
				<Col :span="4" class="local-tit">{{item.templateInstName}}</Col>
				<Col :span="18" :offset="4" class="border-col">
				<Row>
					<Col :span="getTemplateColSpan(itemList)" v-for="(itemList,index) in adjustTempArr(2,true,item.templateParamInsts)" :key="index">

					<FormItem ref="FormItem" :labelWidth="labelWidth" :labelText="itemList.templateParamName+'：'" :requiredIcon="itemList.isRequired == '1'" :errorMessage="errors.first(itemList.templateParamName + tariffSelIndex)" :data-item-index="tariffSelIndex">

						<Select v-if="itemList.templateTypeCode == '1000'" v-model="itemList.paramValue" :data="itemList.attrValues==null?[]:itemList.attrValues" dataValueStr="attrValue" dataLabelStr="attrValueName" v-validate="getValidate(itemList,item)" :name="itemList.templateParamName + tariffSelIndex" :data-vv-as="itemList.templateParamName" @change="changeItem(arguments[0],item)" :disabled="getDisabled(itemList,item)"></Select>

						<Input v-else :type="getTemplateInputType(itemList)" v-model="itemList.paramShowValue || itemList.paramValue" :name="itemList.templateParamName + tariffSelIndex" v-validate="getValidate(itemList,item)" :data-vv-as="itemList.templateParamName" @click.native="inputClick(item,itemList,$event)" :disabled="getDisabled(itemList,item)"></Input>
					</FormItem>
					<div class="tag">
						<div class="border-down-empty">
							<span></span>
						</div>
						{{itemList.parameterDesc}}
					</div>
					</Col>
				</Row>
				<Row v-show="item.isSee">

					<Col :span="getTemplateColSpan(itemList)" v-for="(itemList,index) in adjustTempArr(2,false,item.templateParamInsts)" :key="index">

					<FormItem ref="FormItem" :labelWidth="labelWidth" :labelText="itemList.templateParamName+'：'" :requiredIcon="itemList.isRequired == '1'" :errorMessage="errors.first(itemList.templateParamName + tariffSelIndex)" :data-item-index="tariffSelIndex">

						<Select v-if="itemList.templateTypeCode == '1000'" v-model="itemList.paramValue" :data="itemList.attrValues==null?[]:itemList.attrValues" dataValueStr="attrValue" dataLabelStr="attrValueName" v-validate="getValidate(itemList,item)" :name="itemList.templateParamName + tariffSelIndex" :data-vv-as="itemList.templateParamName" @change="changeItem(arguments[0],item)" :disabled="getDisabled(itemList,item)"></Select>

						<Input v-else :type="getTemplateInputType(itemList)" v-model="itemList.paramShowValue || itemList.paramValue" :name="itemList.templateParamName + tariffSelIndex" v-validate="getValidate(itemList,item)" :data-vv-as="itemList.templateParamName" @click.native="inputClick(item,itemList,$event)" :disabled="getDisabled(itemList,item)"></Input>
					</FormItem>
					<div class="tag">
						<div class="border-down-empty">
							<span></span>
						</div>
						{{itemList.parameterDesc}}
					</div>
					</Col>
				</Row>
				</Col>
				<Col :span="2" class="local-icon">
				<span class="span" @click="tariffDel(item.tariffTemplateInstId,tariffSelIndex,0)">删除</span>
				</Col>
				<div :class="item.classItem==null?'item-open':'item-close'" @click="openClick(item)"></div>
			</Row>
			<Row v-if="!tariffSelList.length" class="app__data-none">
				<Col>
				<span>当前无数据 请先选择资费模板</span>
				</Col>
			</Row>
		</div>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="资费定价模板选择" ref="offerTariff" @confirm="offerTariffConfirm">
			<div class="main">
				<div class="sel-box">
					<Search class="offer-sear" placeholder="请输入模板名" v-model.trim="templateVal" @search="searchClick"></Search>
				</div>
				<div class="top">
					<div class="t-left">
						<Scroll :isShowRight="true" ref="scroll">
							<TreeSimple v-for="(item,index) in offerTariffList" :folder="item" v-model="selTemplateType" :key="index" :childrenStr="'children'" :initLevel="1" :levelStr="'level'" :keys="treeShowKeyItems"></TreeSimple>
						</Scroll>
					</div>
					<div class="t-right">
						<div class="app__table__inner">
							<Row class="app__table-thead">
								<Col :span="4">资费编码</Col>
								<Col :span="14">资费名称</Col>
								<Col :span="4">资费描述</Col>
								<Col :span="2">操作</Col>
							</Row>
							<Row :class="['app__table-item']" v-for="(item,index) in offerTariffItem" :key="index">
								<Col :span="4">{{item.templateNbr}}</Col>
								<Col :span="14">{{item.templateName}}</Col>
								<Col :span="4">{{item.templateNbr}}</Col>
								<Col :span="2">
								<span v-if="!item.flag" class="iconfont icon-tianjia1127" @click='channelClick(item)'></span>
								<span v-if="item.flag" class="iconfont icon-tianjia1127 span" @click='channelClick(item)'></span>
								</Col>
							</Row>
							<Row :class="['m-item app__table-item']" v-if="offerTariffItem.length != 0" v-for="item in (5 - offerTariffItem.length)" :key="item.id"></Row>
							<Row v-if="!offerTariffItem.length" class="app__data-none">
								<Col>
								<span>当前无数据 请先选择资费模板</span>
								</Col>
							</Row>
						</div>
						<Pagination v-if="offerTariffItem.length>0" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :perPages="3" :rowCount="pageInfo.rowCount" @change="pageChange"></Pagination>
					</div>
				</div>
				<div v-if="offerChannel.length>0">
					<span class="y-span">已选资费模板列表</span>
					<div class="bottom">
						<div class="app__table__inner">
							<Row class="app__table-thead">
								<Col :span="6">资费编码</Col>
								<Col :span="6">资费名称</Col>
								<Col :span="6">资费描述</Col>
								<Col :span="6">操作</Col>
							</Row>
							<Row :class="['app__table-item']" v-for="(item,index) in offerChannel" :key="index">
								<Col :span="6">{{item.templateNbr}}</Col>
								<Col :span="6">{{item.templateName ? item.templateName : '无'}}</Col>
								<Col :span="6">{{item.templateDesc ? item.templateDesc : '无'}}</Col>
								<Col :span="6">
								<span class="iconfont icon-shanchu" @click="tariffDel(item.templateTypeId,index,1)"></span>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
		<Dialog :dialogSize="RgdialogSize" class="h-dialog" dialogTitle="添加" ref="addRg" @confirm="addRgConfirm">
			<div class="main">
				<div class="rg" v-for="(item,index) in rgTemp" :key="index">
					<FormItem>
						<Input v-model="item.rg"></Input>
					</FormItem>
					<span v-show="index == '0'" class="c_btn" @click="rgClick">+</span>
				</div>
			</div>
		</Dialog>
		<Dialog :dialogSize="LgdialogSize" class="h-dialog" dialogTitle="添加" ref="addRule" @confirm="addRuleConfirm">
			<div class="main">
				<div class="h-a-add">
					<div class="app__btn app__btn-add" @click="addRule()">添加</div>
				</div>
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="3">返还开始月份</Col>
						<Col :span="2">循环次数</Col>
						<Col :span="3">单步返还金额</Col>
						<Col :span="4">实例生效时间偏移月数</Col>
						<Col :span="4">实例失效时间偏移月数</Col>
						<Col :span="3">每月使用下限(元)</Col>
						<Col :span="3">每月使用上限(元)</Col>
						<Col :span="2">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in ruleList" :key="index">
						<Col :span="3">
						<Input :class="{validate:!item.month}" v-model="item.month" number></Input>
						</Col>
						<Col :span="2">
						<Input :class="{validate:!item.time}" v-model="item.time" number></Input>
						</Col>
						<Col :span="3">
						<Input :class="{validate:!item.money}" v-model="item.money" number></Input>
						</Col>
						<Col :span="4">
						<Input :class="{validate:!item.effDate}" v-model="item.effDate" number></Input>
						</Col>
						<Col :span="4">
						<Input :class="{validate:!item.expDate}" v-model="item.expDate" number></Input>
						</Col>
						<Col :span="3">
						<Input :class="{validate:!item.floor}" v-model="item.floor" number></Input>
						</Col>
						<Col :span="3">
						<Input :class="{validate:!item.upper}" v-model="item.upper" number></Input>
						</Col>
						<Col :span="2">
						<span class="rule-span" @click="deleteRule(index)">删除</span>
						</Col>
					</Row>
				</div>
			</div>
		</Dialog>
		<Dialog :dialogSize="SgdialogSize" class="h-dialog" dialogTitle="添加" ref="addSubsidy" @confirm="addSubsidyConfirm">
			<div class="main">
				<div class="h-a-add">
					<div class="app__btn app__btn-add" @click="addSubsidy()">添加</div>
				</div>
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="4">补贴参考费用阈值下限(元)</Col>
						<Col :span="4">补贴参考费用阈值上限(元)</Col>
						<Col :span="2">返还比例(%)</Col>
						<Col :span="2">返还上限(元)</Col>
						<Col :span="2">返还下限(元)</Col>
						<Col :span="2" class="no-wrap" title="实例生效时间偏移月数">实例生效时间偏移月数</Col>
						<Col :span="2" class="no-wrap" title="实例失效时间偏移月数">实例失效时间偏移月数</Col>
						<Col :span="2" class="no-wrap" title="每月使用下限(元)">每月使用下限(元)</Col>
						<Col :span="3">每月使用上限(元)</Col>
						<Col :span="1">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in subsidyList" :key="index">
						<Col :span="4">
						<Input :class="{validate:!item.returnFloor}" v-model="item.returnFloor" number></Input>
						</Col>
						<Col :span="4">
						<Input :class="{validate:!item.returnUpper}" v-model="item.returnUpper" number></Input>
						</Col>
						<Col :span="2">
						<Input :class="{validate:!item.subsidyPercentage}" v-model="item.subsidyPercentage" number></Input>
						</Col>
						<Col :span="2">
						<Input :class="{validate:!item.subsidyFloor}" v-model="item.subsidyFloor" number></Input>
						</Col>
						<Col :span="2">
						<Input :class="{validate:!item.subsidyUpper}" v-model="item.subsidyUpper" number></Input>
						</Col>
						<Col :span="2">
						<Input :class="{validate:!item.effDate}" v-model="item.effDate" number></Input>
						</Col>
						<Col :span="2">
						<Input :class="{validate:!item.expDate}" v-model="item.expDate" number></Input>
						</Col>
						<Col :span="2">
						<Input :class="{validate:!item.useFloor}" v-model="item.useFloor" number></Input>
						</Col>
						<Col :span="3">
						<Input :class="{validate:!item.useUpper}" v-model="item.useUpper" number></Input>
						</Col>
						<Col :span="1">
						<span class="rule-span" @click="deleteSubsidy(index)">删除</span>
						</Col>
					</Row>
				</div>
			</div>
		</Dialog>

		<!-- 单选弹框类型 -->
		<Dialog :dialogSize="tkdxRelevant.dialogSize" dialogTitle="添加" class="tkdx-dialog" ref="tkdxDialog" @confirm="tkdxDialogConfirm" @close="tkdxDialogClose">
			<div class="main">

				<Row>
					<Col :span="10">
					<Search placeholder="请输入内容名称" @search="tkdxSearchClick"></Search>
					</Col>
				</Row>

				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="10">编码</Col>
						<Col :span="10">名称</Col>
						<Col :span="4">操作</Col>
					</Row>

					<Row :class="['app__table-item']" v-for="(item,index) in tkdxRelevant.tkdxList" :key="index">
						<Col :span="10">{{item.objCode}}</Col>
						<Col :span="10">{{item.objName}}</Col>
						<Col :span="4">
						<Radio name="tkdx" :label="item" v-model="tkdxRelevant.tkdxSelItem"></Radio>
						</Col>
					</Row>

					<Pagination :pageIndex="tkdxRelevant.tkdxPageInfo.pageIndex" :pageSize="tkdxRelevant.tkdxPageInfo.pageSize" :rowCount="tkdxRelevant.tkdxPageInfo.rowCount" @change="tkdxPageChange" :perPages=5 :isCenter="true" />
				</div>

				<div class="app__table" v-show="tkdxRelevant.tkdxSelItem.objId">
					<Row>
						<Col>
						<span>已选择</span>
						</Col>
					</Row>
					<Row class="app__table-thead">
						<Col :span="10">编码</Col>
						<Col :span="10">名称</Col>
						<Col :span="4">操作</Col>
					</Row>

					<Row :class="['app__table-item']">
						<Col :span="10">{{tkdxRelevant.tkdxSelItem.objCode}}</Col>
						<Col :span="10">{{tkdxRelevant.tkdxSelItem.objName}}</Col>
						<Col :span="4">
						<span class="iconfont icon-shanchu" @click="tkdxSelDel()"></span>
						</Col>
					</Row>
				</div>
			</div>

		</Dialog>

		<!-- 选择资费模板 -->

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
					max: 1200
				},
				RgdialogSize: {
					size: 60,
					min: 300,
					max: 400
				},
				LgdialogSize: {
					size: 80,
					min: 600,
					max: 1200
				},
				SgdialogSize: {
					size: 90,
					min: 800,
					max: 1355
				},
				tipInfo: {
					iconType: 3,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				labelWidth: "150px",
				offerItem: [],
				dialogTitle: '资费定价模板选择',
				offerTariffList: [],
				offerTariffItem: [],
				offerChannel: [],
				selTemplateType: '',
				treeShowKeyItems: [{
					key: 'typeName',
					span: 24
				}],
				delObj: {
					selId: '',
					index: '',
					type: ''
				},
				priceData: {},
				priceArray: [],
				tariffSelList: [],
				tariffSelListSave: [],
				tariffSelListoll: [],
				templateVal: "",
				templateObj: {
					templateNbr: "",
					templateName: "",
					templateTypeId: "",
				},
				pageInfo: {
					pageSize: 5,
					pageIndex: 1,
					rowCount: 0,
				},
				rgTemp: [{
					rg: ''
				}],
				paramValueRg: {},
				moduleArray: [{
					label: '套餐费(X)元',
					value: '10000001'
				}, {
					label: '附属产品功能费(X)元',
					value: '10000002'
				}, {
					label: '套内流量(X)(M/K/G)',
					value: '10000003'
				}, {
					label: '套内语音(X)分钟',
					value: '10000004'
				}, {
					label: '套内短彩信(X)条',
					value: '10000005'
				}],
				checkboxId: [],
				isShow: false,
				tabIndex: 0,
				tkdxRelevant: { //单选弹框类型相关
					dialogSize: {
						size: 70
					},
					tkdxList: [], //可选列表
					tkdxParamItem: {}, //模板参数对象
					tkdxSelItem: {}, //列表选中对象
					tkdxSearchObj: {
						objId: '',
						objName: '',
						objCode: ''
					},
					tkdxPageInfo: { //单选弹框类型分页
						pageSize: 5,
						pageIndex: 1,
						rowCount: 0,
					}
				},
				ruleList: [],
				paramValueRule: {},
				subsidyList: [],
				paramValueSubsidy: {}
			}
		},
		mounted() {
			this.getofferDetail(10000017);
			this.getOfferTariff();
		},
		watch: {
			selTemplateType(val, oldval) {
				if(val != oldval) {
					this.templateObj.templateNbr = "";
					this.templateObj.templateName = "";
					this.pageInfo.pageIndex = 1;
					if(val.templateTypeId != undefined) {
						this.templateObj.templateTypeId = val.templateTypeId;
					} else {
						this.templateObj.templateTypeId = "";
					}
					this.getOfferTable('');
				}
			}
		},
		methods: {
			adjustTempArr(int, isMore, arr) {
				if(isMore) {
					return arr.slice(0, int)
				} else {
					return arr.slice(int)
				}
			},

			addModule(item) {
				this.getofferDetail(item.value);
				this.checkboxId.push(item.value);
			},
			selectClick() {
				this.offerChannel = [];
				this.$refs.offerTariff.show();
				this.getOfferTree();
				this.getOfferTable('');
			},

			// 展开更多数据
			openClick(item) {
				if(item.classItem == null) {
					this.$set(item, 'classItem', 'Y');
					item.isSee = true;
				} else {
					item.classItem = null;
					item.isSee = false;
				}
			},

			// 保存模板&&查询详情
			offerTariffConfirm() {
				if(this.offerChannel.length > 0) {
					this.$refs.offerTariff.hide();
					this.offerChannel.forEach(item => {

						this.checkboxId = [...new Set([...this.checkboxId, item.tariffTemplateId])]

						this.getofferDetail(item.tariffTemplateId);
					});

				}
			},

			// 搜索框模糊查询
			searchClick(data) {
				this.templateObj.templateName = data;
				this.templateObj.templateTypeId = "";
				this.pageInfo.pageIndex = 1;
				this.selTemplateType = '';
				this.getOfferTable('all');
			},

			// 渠道信息列表事件
			channelClick(item) {
				this.$set(item, 'flag', 'Y');
				//item.flag = 'Y';
				this.offerChannel.push(item);
			},

			// 页面跳转
			pageChange(val) {
				this.pageInfo.pageIndex = val;
				this.getOfferTable('all');
			},

			// 删除已选列表信息
			tariffDel(selId, index, type) {
				this.tipInfo.msg = `确认要删除吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
				this.tipConfirmType = 'tariffDel';
				this.delObj.selId = selId;
				this.delObj.index = index;
				this.delObj.type = type;
			},
			tipConfirm() {
				this.$refs.tip.hide();
				if(this.delObj.type === 0) {
					this.tariffSelList.splice(this.delObj.index, 1);

					this.checkboxId = [...new Set(this.tariffSelList.map(item => item.tariffTemplateInstId))];

					this.tariffSelListoll.forEach(item => {
						if(item.tariffTemplateInstId == this.delObj.selId) {
							item.statusCd = "1100";
						}
					})

				} else {
					// this.offerChannel = this.offerChannel.filter(item => item.channelNbr != this.delObj);
					let indexVal = this.offerChannel[this.delObj.index].tariffTemplateId;
					this.offerTariffItem.find((item) => {
						if(item.tariffTemplateId == indexVal) {
							item.flag = '';
						}
					})
					this.offerChannel.splice(this.delObj.index, 1);
				}
			},

			// 查询资费模板实例
			getOfferTariff() {
				this.$axios.get(this.$api.replace(this.$api.TariffTemplateSave, ['{offerId}'], [this.componentData.offerId])).then((res) => {
					if(res.data.code == this.$api.successCode) {
						if(res.data.tariffTemplateInst != null) {

							this.tariffSelList = [...res.data.tariffTemplateInst];
							for(let ele of this.tariffSelList) {

								//单选弹框显示值修改
								ele.templateParamInsts.filter(eleItem => {
									if(eleItem.templateTypeCode == '4000') {
										let eleItemVal = eleItem.attrValues.find(eleItemValAtt => eleItemValAtt.attrValueId == eleItem.paramValue);

										if(eleItemVal) this.$set(eleItem, 'paramShowValue', eleItemVal.attrValueName);
									}
								})

								for(let val of this.moduleArray) {
									if(ele.tariffTemplateId == val.value) {
										this.checkboxId.push(val.value)
									}
								}
							}
							this.tariffSelListoll = [...res.data.tariffTemplateInst];
						} else {
							this.tariffSelList = [];
							this.tariffSelListoll = [];
						}
						this.$nextTick(() => {
							let aaa = this.$refs.FormItem || [];
							let bbb = [];
							for(let ele of aaa) {
								bbb.push({
									formItemEl: ele.$el,
									spanEl: ele.$el.getElementsByTagName("span")
								})
							}
							for(let i = 0; i < bbb.length; i++) {
								bbb[i].spanEl[0].onmouseenter = () => {
									bbb[i].formItemEl.nextElementSibling.style.display = 'block';
								}
								bbb[i].spanEl[0].onmouseleave = () => {
									bbb[i].formItemEl.nextElementSibling.style.display = 'none';
								}
							}
						})
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},

			// 模板类别树状查询
			getOfferTree() {
				this.$axios.get(this.$api.TemplateTypeTree).then((res) => {
					if(res.data.code == this.$api.successCode) {
						this.offerTariffList = res.data.templateTypeTrees;
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},

			// 资费模板列表查询
			getOfferTable(val) {
				this.offerTariffItem = [];
				if(val == "all") {
					this.templateObj.templateTypeId = '';
				}
				this.$axios.get(this.$api.TariffTemplateList, {
					params: {
						"templateNbr": this.templateObj.templateNbr,
						"templateName": this.templateObj.templateName,
						"templateTypeId": this.templateObj.templateTypeId,
						"limit": this.pageInfo.pageSize,
						"page": this.pageInfo.pageIndex
					}
				}).then((res) => {
					if(res.data.code == this.$api.successCode) {
						this.offerTariffItem = res.data.tariffTemplateDTOPaasPage.content;
						this.pageInfo.rowCount = res.data.tariffTemplateDTOPaasPage.total;

						//判断是否选中
						this.offerChannel.find(item => {
							this.offerTariffItem.find(itemList => {
								if(item.tariffTemplateId == itemList.tariffTemplateId) {
									this.$set(itemList, 'flag', 'Y');
								}
							})
						})
						this.tariffSelList.find(item => {
							this.offerTariffItem.find(itemList => {
								if(item.tariffTemplateId == itemList.tariffTemplateId) {
									this.$set(itemList, 'flag', 'Y');
								}
							})
						})
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},

			// 资费模板详情
			getofferDetail(val) {
				let params = {
					offerId: this.componentData.offerId
				}

				if(this.componentData.commodityType == '30') {
					params.commodityType = '30';
				}

				this.$axios.get(this.$api.replace(this.$api.TariffTemplateDetail, ['{tariffTemplateId}'], [val]), {
					params
				}).then((res) => {
					if(res.data.code == this.$api.successCode) {
						this.priceData = res.data.tariffTemplate;
						if(this.componentData.commodityType == '10') {
							for(let ele of this.priceData.templateParameterRel) {
								if(ele.templateParamId == '100000055') {
									ele.defaultValue = '套餐费';
								} else if(ele.templateParamId == '100000056') {
									ele.defaultValue = '1';
								} else {

								}
							}
						} else if(this.componentData.commodityType == '40') {
							for(let ele of this.priceData.templateParameterRel) {
								if(ele.templateParamId == '100000055') {
									ele.defaultValue = '可选包';
								}
							}
						} else if(this.componentData.commodityType == '70') {
							for(let ele of this.priceData.templateParameterRel) {
								if(ele.templateParamId == '100000055') {
									ele.defaultValue = '加装包';
								}
							}
						}
						//展示数组
						let temArr = [];
						this.priceData.templateParameterRel.forEach(item => {
							let ObjList = {
								"templateParamInstId": "",
								"tariffTemplateInstId": "", //空
								"templateParameterRelId": item.templateParameterRelId,
								"templateParamName": item.templateParamName,
								"templateParamNbr": item.templateParamNbr,
								"templateTypeCode": item.templateTypeCode,
								"parameterDesc": item.parameterDesc,
								"attrValues": item.attrValues,
								"createStaff": 123, //固定
								"updateStaff": 123, //固定
								"statusCd": "1000",
								"createDate": "", //空
								"updateDate": "", //空
								"typeName": item.typeName,
								"isRequired": item.isRequired,
								"defaultValue": item.defaultValue
							}
							temArr.push(ObjList)
						})
						let Obj = {
							"tariffTemplateInstId": "", //空
							"tariffTemplateId": this.priceData.tariffTemplateId,
							"templateInstName": this.priceData.templateName,
							"offerId": this.componentData.offerId, //待传
							"statusCd": "1000",
							"createDate": "", //空
							"updateDate": "", //空
							"templateParamInsts": temArr
						}
						this.tariffSelListoll.push(Obj);
						for(let val of Obj.templateParamInsts) {
							this.$set(val, 'paramValue', val.defaultValue);
						}

						this.tariffSelList.push(Obj);
						this.$nextTick(() => {
							let aaa = this.$refs.FormItem;
							let bbb = [];
							for(let ele of aaa) {
								bbb.push({
									formItemEl: ele.$el,
									spanEl: ele.$el.getElementsByTagName("span")
								})
							}
							for(let i = 0; i < bbb.length; i++) {
								bbb[i].spanEl[0].onmouseenter = () => {
									bbb[i].formItemEl.nextElementSibling.style.display = 'block';
								}
								bbb[i].spanEl[0].onmouseleave = () => {
									bbb[i].formItemEl.nextElementSibling.style.display = 'none';
								}
							}
						})
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},

			//销售品资费模板实例配置
			save(callback) {
				//提交数组
				this.tariffSelListSave = [];
				this.tariffSelListoll.forEach((index, val, arr) => {
					let temArrSave = [];
					arr[val].templateParamInsts.forEach(item => {
						let ObjListSave = {
							"templateParamInstId": item.templateParamInstId == undefined ? "" : item.templateParamInstId,
							"tariffTemplateInstId": item.tariffTemplateInstId == undefined ? "" : item.tariffTemplateInstId, //空
							"templateParameterRelId": item.templateParameterRelId,
							"paramValue": item.paramValue == undefined ? "" : item.paramValue,
							"createStaff": 123, //固定
							"updateStaff": 123, //固定
							"statusCd": "1000",
							"createDate": "", //空
							"updateDate": "" //空
						}
						temArrSave.push(ObjListSave)
					})
					let ObjSave = {
						"tariffTemplateInstId": arr[val].tariffTemplateInstId == undefined ? "" : arr[val].tariffTemplateInstId,
						"tariffTemplateId": arr[val].tariffTemplateId,
						"offerId": this.componentData.offerId, //待传
						"statusCd": arr[val].statusCd,
						"createDate": "", //空
						"updateDate": "", //空
						"templateParamInsts": temArrSave
					}
					this.tariffSelListSave.push(ObjSave)
				})
				this.$validator.validateAll().then((result) => {
					if(result) {
						this.$axios.post(this.$api.replace(this.$api.TariffTemplateSave, ['{offerId}'], [this.componentData.offerId]), this.tariffSelListSave).then((res) => {
							if(res.data.code == this.$api.successCode && res.data.code == null) {
								this.$message.success({ "message": "资费模板保存成功！" })
								callback(true)
								this.getOfferTariff();
                                this.$emit('changeBasic');
							} else {
								this.$message.error({ message: res.data.msg });
								callback(false)
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg })
							callback(false)
						})
					} else {
						this.$message.error({ message: "资费模板验证失败！" })
						callback(false)
					}
                })
			},
			changeItem(val, item) {
				if(val.attrValueId == "160000123") {
					item.templateParamInsts.find(ele => ele.templateParameterRelId == "100000113").paramValue = "2"
				} else if(val.attrValueId == "160000124") {
					item.templateParamInsts.find(ele => ele.templateParameterRelId == "100000113").paramValue = "1"
				} else if(val.attrValueId == "") {
					item.templateParamInsts.find(ele => ele.templateParameterRelId == "100000113").paramValue = ""
				}
				if(val.attrValueId == "160000162") {
					this.filterAttrValues(item, '11')
				} else if(val.attrValueId == "160000163") {
					this.filterAttrValues(item, '12')
				} else if(val.attrValueId == "160000164") {
					this.filterAttrValues(item, '13')
				}
			},
			filterAttrValues(val, nub) {
				let tempInsts = val.templateParamInsts.find(ele => ele.templateParameterRelId == "100000008");
				tempInsts.tempAttrValues ? '' : tempInsts.tempAttrValues = [...tempInsts.attrValues];
				tempInsts.attrValues = tempInsts.tempAttrValues.filter((tItem) => {
					return tItem.attrValue.substring(0, 2) == nub;
				})
			},
			inputClick(val,item, event) {

				// templateTypeCode
				// 1000:单选
				// 2000:复选
				// 3000:输入
				// 4000:弹框单选
				// 5000:弹框复选
				// 6000:文本多行
				// 6000:富文本
				if(item.templateTypeCode == '6000') {
					event.target.blur();
					this.wbdhClick(val,item, event);
				} else if(item.templateTypeCode == '4000') {
					event.target.blur();
					this.tkdxRelevant.tkdxParamItem = item;
					this.tkdxClick();
				} else if(item.templateTypeCode == '8000') {
					event.target.blur();
					this.ruleClick(val,item, event)
				} else if(item.templateTypeCode == '9000') {
					event.target.blur();
					this.subsidyClick(val,item, event);
				}

			},
			subsidyClick(val,item) {
				this.subsidyList = [];
				if(!item.paramValue) {
					this.subsidyList = [{
						returnFloor: '',
						returnUpper: '',
						subsidyPercentage: '',
						subsidyFloor: '',
						subsidyUpper: '',
						effDate: '',
						expDate: '',
						useFloor: '',
						useUpper: ''
					}];
				} else {
					let temp = item.paramValue.split(',');
					let Temp =[];
					for(let ele of temp) {
						Temp.push(ele.split('_'))
					}
					for(let ele of Temp){
						this.subsidyList.push({
							returnFloor: ele[0],
							returnUpper: ele[1],
							subsidyPercentage: ele[2],
							subsidyFloor: ele[3],
							subsidyUpper: ele[4],
							effDate: ele[5],
							expDate: ele[6],
							useFloor: ele[7],
							useUpper: ele[8]
						})
					}
				}
				this.$refs.addSubsidy.show();
				this.paramValueSubsidy = item;
			},
			addSubsidy() {
				let temp = {
					returnFloor: '',
					returnUpper: '',
					subsidyPercentage: '',
					subsidyFloor: '',
					subsidyUpper: '',
					effDate: '',
					expDate: '',
					useFloor: '',
					useUpper: ''
				}
				this.subsidyList.push(temp);
			},
			addSubsidyConfirm() {
				for(let ele of this.subsidyList){
					if(!ele.returnFloor || !ele.returnUpper || !ele.subsidyPercentage || !ele.subsidyFloor || !ele.subsidyUpper || !ele.effDate || !ele.expDate || !ele.useFloor || !ele.useUpper){
						this.$message.warning({message: '请输入红框值！'});
						return;
					}
				}
				let ruleTemp = [];
				for(let ele of this.subsidyList) {
					ruleTemp.push(ele.returnFloor + '_' + ele.returnUpper + '_' + ele.subsidyPercentage + '_' + ele.subsidyFloor + '_' + ele.subsidyUpper + '_' + ele.effDate + '_' + ele.expDate + '_' + ele.useFloor + '_' + ele.useUpper)
				}
				this.paramValueSubsidy.paramValue = ruleTemp.join();
				this.$refs.addSubsidy.hide();
			},
			deleteSubsidy(index){
				this.subsidyList.splice(index,1);
			},
			ruleClick(val,item) {
				this.ruleList = [];
				let objA = val.templateParamInsts.find(sItem => sItem.templateParameterRelId == '100000095');
				if(objA.paramValue == '2'){
					if(!item.paramValue) {
					this.ruleList = [{
						month: '',
						time: '',
						money: '',
						effDate: '0',
						expDate: 1,
						floor: '0',
						upper: 999999999
					}];
				} else {
					let temp = item.paramValue.split(',');
					let Temp =[];
					for(let ele of temp) {
						Temp.push(ele.split('_'))
					}
					for(let ele of Temp){
						this.ruleList.push({
							month: ele[0],
							time: ele[1],
							money: ele[2],
							effDate: ele[3],
							expDate: ele[4],
							floor: ele[5],
							upper: ele[6]
						})
					}
				}
				}else{
					if(!item.paramValue) {
					this.ruleList = [{
						month: '',
						time: '',
						money: '',
						effDate: '',
						expDate: '',
						floor: '0',
						upper: 999999999
					}];
				} else {
					let temp = item.paramValue.split(',');
					let Temp =[];
					for(let ele of temp) {
						Temp.push(ele.split('_'))
					}
					for(let ele of Temp){
						this.ruleList.push({
							month: ele[0],
							time: ele[1],
							money: ele[2],
							effDate: ele[3],
							expDate: ele[4],
							floor: ele[5],
							upper: ele[6]
						})
					}
				}
				}
				
				this.$refs.addRule.show();
				this.paramValueRule = item;
			},
			addRule() {
				let temp = {
					month: '',
					time: '',
					money: '',
					effDate: '0',
					expDate: 1,
					floor: '0',
					upper: 999999999
				}
				this.ruleList.push(temp);
			},
			addRuleConfirm() {
				for(let ele of this.ruleList){
					if(!ele.month || !ele.time || !ele.money || !ele.effDate || !ele.expDate || !ele.floor || !ele.upper){
						this.$message.warning({message: '请输入红框值！'});
						return;
					}
				}
				let ruleTemp = [];
				for(let ele of this.ruleList) {
					ruleTemp.push(ele.month + '_' + ele.time + '_' + ele.money + '_' + ele.effDate + '_' + ele.expDate + '_' + ele.floor + '_' + ele.upper)
				}
				this.paramValueRule.paramValue = ruleTemp.join();
				this.$refs.addRule.hide();
			},
			deleteRule(index){
				this.ruleList.splice(index,1);
			},
			wbdhClick(val,item) { //文本多行类型点击弹框
				this.rgTemp = [];
				if(!item.paramValue) {
					this.rgTemp = [{
						rg: ''
					}];
				} else {
					let temp = item.paramValue.split(',');
					for(let ele of temp) {
						this.rgTemp.push({
							rg: ele
						})
					}
				}
				this.$refs.addRg.show();
				this.paramValueRg = item;
			},
			tkdxClick() { //弹框单选类型点击弹框
				this.$axios.get(this.$api.GetClickDetail, {
					params: {
						templateParamNbr: this.tkdxRelevant.tkdxParamItem.templateParamNbr,
						objId: this.tkdxRelevant.tkdxSearchObj.objId,
						objName: this.tkdxRelevant.tkdxSearchObj.objName,
						objCode: this.tkdxRelevant.tkdxSearchObj.objCode,
						page: this.tkdxRelevant.tkdxPageInfo.pageIndex,
						limit: this.tkdxRelevant.tkdxPageInfo.pageSize
					}
				}).then(res => {
					if(res.data.success) {
						this.$refs.tkdxDialog.show();
						this.tkdxRelevant.tkdxList = res.data.clickDetailPage.content || [];
						this.tkdxRelevant.tkdxPageInfo.pageSize = res.data.clickDetailPage.limit;
						this.tkdxRelevant.tkdxPageInfo.pageIndex = res.data.clickDetailPage.page;
						this.tkdxRelevant.tkdxPageInfo.rowCount = res.data.clickDetailPage.total;

						this.tkdxRelevant.tkdxSelItem = this.getTkdxSelData();

					} else {
						this.$message.error({ message: res.data.detail });
					}

				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			getTkdxSelData() { //获取单选弹框类型已选择的数据
				if(this.tkdxRelevant.tkdxSelItem.objId) {
					return this.tkdxRelevant.tkdxSelItem;
				}

				let eleItemVal = this.tkdxRelevant.tkdxParamItem.attrValues.find(eleItemValAtt => eleItemValAtt.attrValueId == this.tkdxRelevant.tkdxParamItem.paramValue);

				return {
					objCode: eleItemVal.attrValue,
					objId: Number(this.tkdxRelevant.tkdxParamItem.paramValue),
					objName: eleItemVal.attrValueName
				}
			},
			tkdxDialogConfirm() { //单选弹框类型弹框确认
				this.$refs.tkdxDialog.hide();
				this.tkdxRelevant.tkdxParamItem.paramShowValue = this.tkdxRelevant.tkdxSelItem.objName;
				this.tkdxRelevant.tkdxParamItem.paramValue = this.tkdxRelevant.tkdxSelItem.objId;
			},
			tkdxDialogClose() { //单选弹框类型弹框关闭
				this.tkdxRelevant.tkdxSearchObj.objName = '';
				this.tkdxRelevant.tkdxPageInfo.pageIndex = 1;
			},
			tkdxSearchClick(val) { //单选弹框类型查询点击事件
				this.tkdxRelevant.tkdxPageInfo.pageIndex = 1;
				this.tkdxRelevant.tkdxSearchObj.objName = val;
				this.tkdxClick();
			},
			tkdxSelDel() { //单选弹框类型删除已选中
				this.tkdxRelevant.tkdxSelItem = {};
			},
			tkdxPageChange(val) { //单选弹框类型弹框分页
				this.tkdxRelevant.tkdxPageInfo.pageIndex = val;
				this.tkdxClick();
			},
			rgClick() {
				let temp = {
					rg: ''
				}
				this.rgTemp.push(temp)
			},
			addRgConfirm() {
				let rgData = [];

				this.rgTemp = this.rgTemp.filter(item => item.rg != '')

				for(let ele of this.rgTemp) {
					rgData.push(ele.rg);
				}
				this.paramValueRg.paramValue = rgData.join();
				this.$refs.addRg.hide();
			},
			selectMkt(val) {
				return this.checkboxId.filter(item => item.statusCd != '1100').find(item => item == val.value)
			},
			getTemplateColSpan(item) { //获取动态模板的col 大小
				return item.templateTypeCode == '7000' ? 22 : 11;
			},
			getTemplateInputType(item) { //获取动态模板的输入框类型
				return item.templateTypeCode == '7000' ? 'textarea' : 'text';
			},
			getValidate(itemList, item) {
				if(itemList.templateParameterRelId == '100000087') {
					return 'required|between:0,1|is_not:1';
				}
				if(itemList.templateParameterRelId == '100000120' || itemList.templateParameterRelId == '100000121') {
					let objA = item.templateParamInsts.find(sItem => sItem.templateParameterRelId == '100000120'),
						objB = item.templateParamInsts.find(sItem => sItem.templateParameterRelId == '100000121');
					if(objA.paramValue == '' && objB.paramValue == '') {
						return 'required';
					}
				} else if(itemList.templateParameterRelId == '100000088' || itemList.templateParameterRelId == '100000184') {
					let objA = item.templateParamInsts.find(sItem => sItem.templateParameterRelId == '100000088'),
						objB = item.templateParamInsts.find(sItem => sItem.templateParameterRelId == '100000184');
					if(objA.paramValue == '' && objB.paramValue == '') {
						return 'required';
					}
				}

				return itemList.isRequired == '1' ? 'required' : ''
			},
			getDisabled(itemList, item) {
				if(itemList.templateParameterRelId == '100000120') {
					let objB = item.templateParamInsts.find(sItem => sItem.templateParameterRelId == '100000121');
					if(objB.paramValue != '') {
						return 'disabled';
					}
				}else if(itemList.templateParameterRelId == '100000121'){
					let objB = item.templateParamInsts.find(sItem => sItem.templateParameterRelId == '100000120');
					if(objB.paramValue != '') {
						return 'disabled';
					}
				}else if(itemList.templateParameterRelId == '100000088'){
					let objB = item.templateParamInsts.find(sItem => sItem.templateParameterRelId == '100000184');
					if(objB.paramValue != '') {
						return 'disabled';
					}
				}else if(itemList.templateParameterRelId == '100000184'){
					let objB = item.templateParamInsts.find(sItem => sItem.templateParameterRelId == '100000088');
					if(objB.paramValue != '') {
						return 'disabled';
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.prices {
		width: 100%;
		padding-top: 20px;
		.app__table {
			margin-bottom: 20px;
			.tariff-item {
				background: #ffffff;
				margin-bottom: 20px;
				border: 1px solid #afa0a0;
				.border-col {
					border-left: 1px solid gainsboro;
					border-right: 1px solid gainsboro;
					padding: 15px 0;
				}
			}
		}
		.prices-module {
			height: 100px;
			background: #f5f6fa;
			margin-bottom: 20px;
			.row {
				height: 100%;
				line-height: 100px;
				.left-col {
					border-right: 1px solid gainsboro;
				}
				.col {
					text-align: center;
					ul {
						padding-left: 20px;
						li {
							float: left;
							margin-right: 20px;
							.iconfont {
								font-size: 12px;
								cursor: pointer;
							}
							.span {
								color: $mainColor;
							}
						}
					}
				}
			}
		}
	}
	
	.selectbtn {
		margin: 0 10px 10px 0;
	}
	
	.icon-shanchu {
		cursor: pointer;
	}
	
	.app__table {
		position: relative;
		padding: 15px 0;
		.item-open {
			position: absolute;
			bottom: -22px;
			left: 0;
			width: 100%;
			height: 30px;
			background: url(./images/expand.png) no-repeat center;
			cursor: pointer;
            pointer-events: auto;
		}
		.item-close {
			position: absolute;
			bottom: -9px;
			left: 0;
			width: 100%;
			height: 30px;
			background: url(./images/expand_2.png) no-repeat center;
			cursor: pointer;
            pointer-events: auto;
		}
		.local-code {
			position: absolute;
			top: 50%;
			left: 0;
			margin-left: -10px;
			margin-top: -10px;
			.span-local {
				display: block;
				margin: 0 auto;
				width: 20px;
				height: 20px;
				line-height: 20px;
				border-radius: 10px;
				background: #00c0fd;
				color: #ffffff;
				text-align: center;
				text-indent: 0px;
			}
		}
		.local-tit {
			position: absolute;
			top: 50%;
			left: 5.5%;
			margin-left: -10px;
			margin-top: -20px;
			text-align: -webkit-match-parent;
		}
		.tag {
			display: none;
			width: 380px;
			height: 130px;
			border: 1px solid gainsboro;
			position: absolute;
			background-color: #FFF;
			z-index: 99999;
			padding: 10px;
			top: -140px;
			.border-down-empty {
				position: absolute;
				width: 0;
				height: 0;
				border-left: 20px solid transparent;
				border-right: 20px solid transparent;
				border-top: 20px solid gainsboro;
				margin: 50px auto;
				top: 79px;
				left: 90px;
			}
			.border-down-empty span {
				display: block;
				width: 0;
				height: 0;
				border-left: 28px solid transparent;
				border-right: 28px solid transparent;
				border-top: 28px solid #ffffff;
				position: absolute;
				left: -28px;
				top: -30px;
			}
		}
		.local-icon {
			position: absolute;
			top: 50%;
			right: 0;
			margin-left: -10px;
			margin-top: -18px;
			text-align: center !important;
			padding-left: 0 !important;
			.span {
				color: $mainColor;
				cursor: pointer;
			}
		}
	}
	
	.main {
		padding: 20px;
		.sel-box {
			padding-bottom: 20px;
			width: 50%;
		}
		.h-a-add {
			margin: 10px 0;
			text-align: right;
		}
		.rg {
			width: 60%;
			height: 50px;
			.c_btn {
				position: absolute;
				right: -46px;
				top: 3px;
				padding: 5px 10px;
				border-radius: 5px;
				background: #59bffd;
				color: #ffffff;
				cursor: pointer;
			}
		}
		.top {
			width: 100%;
			height: 300px;
			.t-left {
				width: 30%;
				height: 100%;
				float: left;
				border: 1px solid gainsboro;
			}
			.t-right {
				width: 65%;
				height: 100%;
				float: right;
				.span {
					color: $mainColor;
				}
			}
		}
		.y-span {
			display: block;
			margin: 10px 0;
			color: #b6de8f;
		}
		.rule-span{
			cursor: pointer;
		}
		.no-wrap {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.validate /deep/ input{
			border-color: red;
		}
	}
	
	.tkdx-dialog {
		.main {
			padding: 20px;
			.app__table {
				margin-top: 20px;
			}
		}
	}
</style>