<template>
	<div class="flow">
		<Scroll>
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>产品业务流程</span>
			</div>
			<div class="selectbtn app__btn app__btn-add" @click="AddProductService">添加</div>

			<div class="app__table">
					<Row class='app__table-thead'>
						<Col :span='4'>业务流程编码</Col>
                        <Col :span='7'>业务流程名称</Col>
                        <Col :span="6">付费方式</Col>
                        <Col :span="6">选择接入产品</Col>
                        <Col :span='1'>操作</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in tabList" v-if="item.actType != 'DEL'" :key="index">
                        <Col :span='4'>{{item.serviceOfferNbr}}</Col>
                        <Col :span='7'>{{item.serviceOfferName}}</Col>
                        <Col :span="6">
							<Select multiple  :isNullSel="false"   v-validate="'required'" name="pay" :data="allPay" data-vv-as="付费方式" v-model="item.paymentMode"></Select>
                        </Col>
                        <Col :span='6'>
                            <Input readonly type="text" v-model.trim="item.followProdName" :title="item.followProdName"></Input>
                        </Col>
                        <Col :span='1' class="blue-font">
                            <span  @click="delProduct('product',index)">删除</span>
                        </Col>
                    </Row>
					<Row class="app__data-none" v-show="!tabList.length">
						<Col>
							<span>对不起，暂无数据</span>
						</Col>
					</Row>
			</div>

			<!--产品服务提供关系约束配置-->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>产品业务流程约束配置</span>
			</div>
			<div class="selectbtn app__btn app__btn-add" @click="AddprodServRelRstrCfg()">添加</div>
			<div class="">
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span='7'>A端业务流程名称</Col>
						<Col :span='8'>Z端业务流程名称</Col>
						<Col :span='8'>约束类型</Col>
						<Col :span='1'>操作</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in RelRstrCfgList" v-if="item.actType != 'DEL'" :key="index">
						<!-- <Col :span='5' v-show="false">
								<Input readonly type="text" v-model="item.prodId" :class="[RelRstrCfgList[index].prodId ? '' : 'picker-validate-error']" ref="validataItem" v-bind:title="RelRstrCfgList[index].prodId" class="  disabled"></Input>
						</Col> -->
						<Col :span='7'>
								<Input readonly type="text" v-model="item.aServiceOfferName" class="disabled folder" :class="[RelRstrCfgList[index].aServiceOfferName ? '' : 'picker-validate-error']" ref="validataItem" v-bind:title="item.aServiceOfferName" @click.stop.native="AservicePopup(index)"></Input>
						</Col>
						<Col :span='8'>
								<Input readonly type="text" v-model="item.zServiceOfferName" class="disabled folder" :class="[RelRstrCfgList[index].zServiceOfferName ? '' : 'picker-validate-error']" ref="validataItem" v-bind:title="item.zServiceOfferName" @click.stop.native="ZservicePopup(index)"></Input>
						</Col>
						<Col :span='8'>
							<Select v-model="RelRstrCfgList[index].rstrType" :data="rstrTypeOption" @change="ModprodServRelRstrCfg(index)" :class="[RelRstrCfgList[index].rstrType ? '' : 'picker-validate-error']" ref="validataItem">
							</Select>
						</Col>
						<Col :span='1' class="blue-font">
							<span  @click="delServProduct('servProduct',index)">删除</span>
						</Col>
					</Row>

					<Row class="app__data-none" v-show="RelRstrCfgList.length == 0">
						<span>对不起，暂无数据</span>
					</Row>
				</div>
			</div>

			<!--产品状态服务提供关系约束配置-->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>产品状态业务流程约束配置</span>
			</div>
			<div class="selectbtn app__btn app__btn-add" @click="AddprodStatusServRstrCfg()">添加</div>
			<div class="">
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span='5'>业务流程名称</Col>
						<Col :span='4'>业务流程编码</Col>
						<Col :span='4'>产品状态</Col>
						<Col :span='3'>约束类型</Col>
						<Col :span='3'>停机类型</Col>
						<Col :span='3'>提示信息</Col>
						<Col :span='2'>操作</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in StatusServRstrCfgList" v-if="item.actType != 'DEL'" :key="index">
						<Col :span='5'>
								<Input redonly type="text" v-model="item.serviceOfferName" class="disabled folder" v-bind:title="StatusServRstrCfgList[index].serviceOfferName" :class="[StatusServRstrCfgList[index].serviceOfferName ? '' : 'picker-validate-error']" ref="validataItem"></Input>
								<i class="icon icon-file"></i>
						</Col>
						<Col :span='4'>
								<Input readonly type="text" v-model="item.serviceOfferNbr" class="disabled" v-bind:title="StatusServRstrCfgList[index].serviceOfferNbr" :class="[StatusServRstrCfgList[index].serviceOfferNbr ? '' : 'picker-validate-error']" ref="validataItem"></Input>
						</Col>
						<Col :span='4'>
							<Select v-model="StatusServRstrCfgList[index].prodStatusCd" :data="prodStatusCdOption" @change="ModprodStatusServRstrCfg(index)" :class="[StatusServRstrCfgList[index].prodStatusCd ? '' : 'picker-validate-error']" ref="validataItem">
							</Select>
						</Col>
						<Col :span='3'>
								<Select v-model="StatusServRstrCfgList[index].rstrType" :data="rstrTypeOption" @change="ModprodStatusServRstrCfg(index)" :class="[StatusServRstrCfgList[index].rstrType ? '' : 'picker-validate-error']" ref="validataItem">
								</Select>
						</Col>
						<Col :span='3'>
							<Select v-model="StatusServRstrCfgList[index].stopType" :data="stopTypeArray"  @change="ModprodStatusServRstrCfg(index)">
							</Select>
						</Col>
						<Col :span='3'>
							<Input type="text" v-model="item.promptMsg" class="disabled" v-if="StatusServRstrCfgList[index].rstrType == '2000'" v-model.trim="StatusServRstrCfgList[index].promptMsg" @click="ModprodStatusServRstrCfg(index)" placeholder="请输入提示信息"></Input>
							<Input readonly type="text" class="disabled" v-else v-model.trim="StatusServRstrCfgList[index].promptMsg" :disabled="true" ></Input>
						</Col>
						<Col :span='2' class="blue-font">
						    <span @click="copyStatusProduct(item,index)">复制</span>
						    <span @click="delStatusProduct('statusProduct',index)">删除</span>
						</Col>
					</Row>

					<Row class="app__data-none" v-show="isNoExistVaild(StatusServRstrCfgList)">
						<span>对不起，暂无数据</span>
					</Row>
				</div>
			</div>
		</Scroll>

		<!-- 根产品列表 对应产品-->
		<Dialog :dialogTitle="dialogTitle" ref="followDialog" @confirm="addfollowSumbit()" @close="addfollowSubmitClose()">
			<div class="f-dialog">
				<div class="search">
						<Search placeholder="请输入内容"></Search>
				</div>
				<div class="flowTableWrap app__table">
						<Row class="app__table-thead">
							<Col :span="8">选择</Col>
							<Col :span="8">产品编码</Col>
							<Col :span="8">产品编码</Col>
						</Row>
						<Row class="app__table-item"  v-if="followList.length > 0" v-for="(item, index) in followList" :key="index">
							<Col :span="8"><Radio name="item" :label="item" v-model="followCheck" :value="{prodId:item.prodId,prodName:item.prodName}" class="checkBox"></Radio></Col>
							<Col :span="8">{{item.prodNbr}}</Col>
							<Col :span="8">{{item.prodName}}</Col>
						</Row>
					<page v-if="followList.length>0"  :pageIndex="pageFollObj.pageIndex" :pageSize="pageFollObj.pageSize" :rowCount="pageFollObj.pageCount"></page>
				</div>
				<Row class="app__data-none" v-show="followList.length == 0">
					<span>对不起，暂无数据</span>
				</Row>
			</div>
		</Dialog>




		<!-- 添加产品状态业务流程约束配置 -->
		<Dialog :dialogTitle="dialogTitle" ref="processServer" @confirm="sureProcessService">
			<Scroll>
					<div class="app__table">
						<Row class="app__table-thead">
							<Col :span="11">业务流程编码</Col>
							<Col :span="11">业务流程名称</Col>
							<Col :span="2">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in tabList" v-if="item.actType != 'DEL'"
						:key="index">
							<Col :span="11">{{item.serviceOfferNbr}}</Col>
							<Col :span="11">{{item.serviceOfferName}}</Col>
							<Col class="blue-font" :span="2" @click.stop.native="addProcessServer(item)">
								<span v-if="showYes(item)" class="iconfont icon-xuanzhong-fang" ></span>
								<span v-else class="iconfont icon-weixuanzhong-fang"></span>
							</Col>
						</Row>

						<Row class="app__data-none" v-show="tabList.length == 0">
							<span>对不起，暂无数据</span>
						</Row>
					</div>

					<div class="a-l-sel" v-if="serverSpecsSelTemp.length > 0">
						<Row class="a-l-top">
							<Col :span="3">已选择</Col>
						</Row>
					</div>

				<div class="app__table a-l-sel" v-if="serverSpecsSelTemp.length > 0">
					<Row class="app__table-thead">
						<Col :span="4">业务流程编码</Col>
						<Col :span="4">业务流程名称</Col>
						<Col :span="4">产品状态</Col>
						<Col :span="3">约束类型</Col>
						<Col :span="4">停机类型</Col>
						<Col :span="3">提示信息</Col>
						<Col :span="2">操作</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in serverSpecsSelTemp" :key="index"  >

						<Col :span="4">{{item.serviceOfferNbr}}</Col>
						<Col :span="4">{{item.serviceOfferName}}</Col>
						<Col :span="4">
							<Select v-model="item.prodStatusCd" :data="prodStatusCdOption" >
							</Select>
						</Col>
						<Col :span="3">
							<Select v-model="item.rstrType" :data="rstrTypeOption">
							</Select>
						</Col>
						<Col :span="4">
							<Select v-model="item.stopType" :data="stopTypeArray"  >
							</Select>
						</Col>
						<Col :span="3">
							<Input type="text" v-model="item.promptMsg" class="disabled" v-if="item.rstrType == '2000'"   placeholder="请输入提示信息"></Input>
							<Input readonly type="text" class="disabled" v-else v-model.trim="item.promptMsg" :disabled="true" ></Input>
						</Col>
						<Col :span="2" class="blue-font">
							<span  @click.native="serverClick(item)">删除</span>
						</Col>
					</Row>
				</div>
			</Scroll>
		</Dialog>

		<!-- 添加产品业务流程  -->
		<Dialog dialogTitle="添加产品业务流程" ref="AddRelDialog" :dialogSize="productDialogSize" @confirm="addRelDialogSubmit" @close="addRelDialogClose">
			<Scroll>
				<Form class="f-dialog" labelAlign="left" labelWidth="150px">
					<FormItem labelText="选择服务提供：" :errorMessage="errors.first('tabServiceList')" :requiredIcon="true">
						<Input v-validate="'required'" placeholder="请选择服务提供" @click.stop.native="findServerData()"  name="tabServiceList" data-vv-as="服务提供" v-model="serviceObj.serviceOfferName"></Input>
					</FormItem>
					<FormItem labelText="当前对应接入类产品：" :errorMessage="errors.first('followobj')" :requiredIcon="true">
						<Select v-validate="'required'" placeholder="请输入产品名称进行输入" :isSearch="true" :isNullSel="false" @load="replacefollow"  dataLabelStr="prodName" sSearch dataValueStr="prodId"  :data="serviceObj.followObj"  name="followobj" data-vv-as="选择对应接入类产品" v-model="serviceObj.follow"></Select>
					</FormItem>
					<FormItem labelText="当前产品付费方式：" :errorMessage="errors.first('pay')" :requiredIcon="true">
						 <Select multiple   :isNullSel="false"   v-validate="'required'" name="pay" :data="allPay" data-vv-as="付费方式" v-model="serviceObj.paymentMode"></Select>
					</FormItem>
				</Form>
			</Scroll>
		</Dialog>
        

		<!-- 选择服务提供 -->
		<Dialog :dialogSize="dialogSize" class="h-dialog" :dialogTitle="dialogTitle" ref="server" @confirm="sureServiceProduct">
			<Scroll class="scroll" :isShowRight="true" ref="scroll">
				<div class="a-v-table app__table">
					<Tree v-for="(item,index) in serverOfferData"  @plugClick="plugClick" v-model="selTemplateType" :selLevel="3" :folder="item" :key="index" :children-str="'childrenNode'" :init-level="1" :level-str="'level'" :keys="treeShowKeyItems" ></Tree>
				</div>
            </Scroll>
		</Dialog>

		<Dialog :dialogTitle="AdialogTitle" ref="AserverName" @confirm="AsureServiceProduct">
			<div  class="f-dialog">
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="12">Z端服务提供名称</Col>
						<Col :span="12">已选中</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in tabList" :key="index"  @click.native="AserverNameClick(item)" v-if="item.actType !== 'DEL'">

						<Col :span="12">{{item.serviceOfferName}}</Col>
						<Col class="blue-font" :span="12">
							<span :class="[AserverNameSel(item) ? 'icon-xuanzhong-fang' :'icon-weixuanzhong-fang','iconfont']"></span>
						</Col>
					</Row>
					<Row class="app__data-none" v-show="isNoExistVaild(tabList)">
		                <span>对不起，暂无数据</span>
		            </Row>
				</div>
			</div>
		</Dialog>

		<Dialog :dialogTitle="ZdialogTitle" ref="ZserverName" @confirm="ZsureServiceProduct">
			<div class="f-dialog">
				<div class="app__table" >
					<Row class="app__table-thead">
						<Col :span="12">Z端服务提供名称</Col>
						<Col :span="12">已选中</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in tabList" :key="index" @click.native="ZserverNameClick(item)" v-if="item.actType !== 'DEL'">

						<Col :span="12">{{item.serviceOfferName}}</Col>
						<Col class="blue-font" :span="12">
							<span :class="[ZserverNameSel(item) ? 'icon-xuanzhong-fang' :'icon-weixuanzhong-fang','iconfont']"></span>
						</Col>
					</Row>
					<Row class="app__data-none" v-show="isNoExistVaild(tabList)">
		                <span>对不起，暂无数据</span>
		            </Row>
				</div>
			</div>
		</Dialog>


		<!-- 停机类型多选 -->
		<Dialog :dialogTitle="dialogTitle" ref="stopTypeDialog" @confirm="stopTypeDialogSubmit">
			<div class="stop-type-list">
				<div>
					<span :class="['s-t-all',findAllSelStopType() ? 'active' : '']" @click="selAllStopType()">全选</span>
				</div>
				<ul>
					<li v-for="(sItem,sIndex) of stopTypeArray" :key="sIndex" :class="{active:findSelStopType(sItem)}" @click="selStopType(sItem)">{{sItem.label}}</li>
				</ul>
			</div>
		</Dialog>
		 <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default{
        props:{
            componentData:{}
        },
		data(){
			return{
				dialogTitle: "服务列表",
				pageFollObj: {
					pageIndex: 1,
					pagecount: 1,
					pageSize: 10
				},
				tipInfo:{
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
                },
                dialogSize: {
					size: 80,
					min: 600,
					max: 800
				},
				productDialogSize:{
					size: 60,
					min: 300,
					max: 400
				},
				pageFollObj: {
					pageIndex: 1,
					pagecount: 1,
					pageSize: 10
				},
				allPay:[
                    {            // 所有的付费方式
                        value: "1200",
                        label: '后付费'
                    },{
                        value: "1201",
                        label: '准预付费'
                    },{
                        value: "2100",
                        label: '预付费'
                    }
                ],
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 0      // 总条数
                },
				serverList:[],//服务提供列表
				serverBox:[],//服务提供
				followCheck:[],//根产品列表
				rstrTypeOption:[
					{value:1000,label:'禁止'},
					{value:2000,label:'提示'}
				],
				prodStatusCdOption:[
					{value:1000,label:'有效'},
					{value:1100,label:'无效'},
					{value:1200,label:'未生效'},
					{value:1300,label:'已归档'},
				],
				isDialogShow: false,
				serachServiceOfferName: "",
				serachStandardCd: "",
				prodServiceOfferRels: [],
				tabList: [],
				AddProductType: "ADD",
				prodServiceRelId: "",
				//				prodId: '',
				serviceOfferId: "",
				staff: 2222,
				areaSelectedOpen: false, // 是否展开
				prodServRelRstrCfgs: [],
				levelInputSel: [3, 4],
				RelRstrCfgList: [],
				AddRelRstrCfgType: "ADD",
				prodStatusServRstrCfgs: [],
				StatusServRstrCfgList: [],
				AddStatusServRstrCfgType: "ADD",
				cfgId: 0,
				areaSelectedOpen: false, // 是否展开
				dialogVisible: false,
				AdialogTitle: "",
				ZdialogTitle: "",
				dialogTitle: "",
				tablePopupFlag: "A",
				index: 0,
				AserverNameData: [],
				ZserverNameData: [],
				serverSpecsSelTemp: [],
				stateServerData: [],
				stateServerSpecsSelTemp: [],
				treeShowKeyItems: [{ key: "serviceOfferName" }, { key: "standardCd" }],
				treeInputSelObj: {
					key: "serviceOfferId",
					allArray: []
				},
				serverTreeObj:'',
				serviceObj:{
					tabObj:'',
					serviceOfferId:'',
					serviceOfferName:'',
					followObj:[],
					follow:'',
					paymentMode:[]
				},
				stopTypeArray: [
                    {
                    value: "100000",
                    label: "申请停机"
                    },
                    {
                    value: "110000",
                    label: "挂失停机"
                    },
                    {
                    value: "120000",
                    label: "停机保号"
                    },
                    {
                    value: "130000",
                    label: "欠费停机"
                    },
                    {
                    value: "130001",
                    label: "欠费单停"
                    },
                    {
                    value: "130002",
                    label: "欠费双停"
                    },
                    {
                    value: "140000",
                    label: "预拆机停机"
                    },
                    {
                    value: "150000",
                    label: "违章停机"
                    },
                    {
                    value: "160000",
                    label: "数据异常停机"
                    },
                    {
                    value: "170000",
                    label: "局方原因停机"
                    },
                    {
                    value: "150001",
                    label: "非实名违章单停"
                    },
                    {
                    value: "150002",
                    label: "非实名违章双停"
                    },
                    {
                    value: "150003",
                    label: "一证超五卡不合规单停"
                    },
                    {
                    value: "150004",
                    label: "一证超五卡不合规双停"
                    },
                    {
                    value: "200000",
                    label: "去激活停机"
                    },
                    {
                    value: "200001",
                    label: "测试期停机"
                    }
                ],
				tabList:[],
				selStopTypeArray: [],
				curCopyObj: {},
				followObj: {},
				followList: [],
				delList:[],//删除暂存
                delType:'',
                serverOfferData:{},
                selTemplateType:'',//服务提供
                treeShowKeyItems: [{ key: 'serviceOfferName' }],
			}
		},
		watch: {
				componentData: function(val, oldval) {
					this.tabList = [];
					this.RelRstrCfgList = [];
					this.StatusServRstrCfgList = [];
					this.getData();
				},
		},
		mounted() {
			this.getData();
		},
		methods:{
			save(){//保存按钮
				if (this.$refs.validataItem) {
					for (let item of this.$refs.validataItem) {
					let itemCN = item.$el ? item.$el.className : item.className;
					if (
						itemCN.indexOf("picker-validate-error") > -1 ||
						itemCN.indexOf("validate-error") > -1
					) {
						this.$message.error({message:'红框必须全部输入'})

						return;
					}
					}
				}

				this.$validator.validateAll().then(result => {
					if (result) {
					const tabValues = [];
					const RelRstrCfgValues = [];
					const StatusServRstrCfgValues = [];
						if (this.tabList.length > 0) {
							for (let val of this.tabList) {
							let tabObj = {
								actType: val.actType,
								staff: 2222,
								prodServiceRelId: val.prodServiceRelId,
								prodId: val.prodId,
								serviceOfferId: val.serviceOfferId,
								followProdId: val.followProdId,
								paymentMode: val.paymentMode.join('|')
							};
								tabValues.push(tabObj);
							}
						} else {
					}
					if (this.RelRstrCfgList.length > 0) {
						for (let val of this.RelRstrCfgList) {
						let RelRstrCfgObj = {
							actType: val.actType,
							staff: 2222,
							prodServiceRelRulId: val.prodServiceRelRulId,
							prodId: val.prodId,
							rstrType: val.rstrType,
							remark: val.remark,
							aServiceOfferId: val.aServiceOfferId,
							zServiceOfferId: val.zServiceOfferId
						};
						RelRstrCfgValues.push(RelRstrCfgObj);
						}
					}
					if (this.StatusServRstrCfgList.length > 0) {
						for (let val of this.StatusServRstrCfgList) {
						let StatusServRstrCfgObj = {
							actType: val.actType,
							staff: 2222,
							cfgId: Number(val.cfgId),
							prodId: Number(val.prodId),
							serviceOfferId: Number(val.serviceOfferId),
							prodStatusCd: val.prodStatusCd,
							rstrType: val.rstrType,
							promptMsg: val.promptMsg,
							remark: val.remark,
							stopType: val.stopType
						};
						StatusServRstrCfgValues.push(StatusServRstrCfgObj);
						}
					}
					this.$axios
						.post(this.$api.replace(this.$api.ModProductServiceOfferRel, ['{prodId}'], [this.componentData.prodId]), {
								prodId: this.componentData.prodId,
								staff: 2222,
								prodServiceOfferRels: tabValues,
								prodServRelRstrCfgs: RelRstrCfgValues,
								prodStatusServRstrCfgs: StatusServRstrCfgValues
						})
						.then(res => {
						if (res.data.success == true) {
							this.$message.success({ message : '成功！' })
						} else {
							this.$message.error({ message : res.dat.msg })
							}
						});
					}
				});
			},
			getData() {
				this.$axios
					.post(this.$api.QryOrdProdServiceOfferRel, {
						prodId: this.componentData.prodId,
						prodAttrId: "",
						scopeInfos: [
						{
							scope: "prodServiceOfferRel"
						},
						{
							scope: "prodServRelRstrCfgList"
						},
						{
							scope: "prodStatusServRstrCfgList"
						}
						]
					})
					.then(res => {
					this.prodServiceOfferRels = res.data.prodServiceOfferRelList
						.prodServiceOfferRels
						? res.data.prodServiceOfferRelList.prodServiceOfferRels
						: [];
					for (let val of this.prodServiceOfferRels) {
						let tabObj = {
							prodNbr: val.prodNbr,
							actType: "kIP",
							applyRegionId: val.applyRegionId,
							prodId: val.prodId,
							prodName: val.prodName,
							remark: val.remark,
							prodServiceRelId: val.prodServiceRelId,
							serviceOfferId: val.serviceOfferId,
							serviceOfferName: val.serviceOfferName,
							serviceOfferNbr: val.serviceOfferNbr,
							paymentMode: val.paymentMode.split('|'),
							followProdName: val.followProdName,
							followProdId: val.followProdId,
							statusCd: val.statusCd,
							staff: val.staff,
							serFrom: "net"
						};
						this.tabList.push(tabObj);
					}
				console.log(this.tabList);
					this.prodServRelRstrCfgs = res.data.prodServRelRstrCfgList
						.prodServRelRstrCfgs
						? res.data.prodServRelRstrCfgList.prodServRelRstrCfgs
						: [];
					for (let val of this.prodServRelRstrCfgs) {
						let RelRstrCfgObj = {
							aServiceOfferId: val.aServiceOfferId,
							aServiceOfferName: val.aServiceOfferName,
							aServiceOfferNbr: val.aServiceOfferNbr,
							actType: "KIP",
							applyRegionId: val.applyRegionId,
							prodServiceRelRulId: val.prodServiceRelRulId,
							prodId: val.prodId,
							remark: val.remark,
							rstrType: val.rstrType,
							zServiceOfferId: val.zServiceOfferId,
							zServiceOfferName: val.zServiceOfferName,
							zServiceOfferNbr: val.zServiceOfferNbr,
							serFrom: "net"
						};
						this.RelRstrCfgList.push(RelRstrCfgObj);
					}

					this.prodStatusServRstrCfgs = res.data.prodStatusServRstrCfgList
						.prodStatusServRstrCfgs
						? res.data.prodStatusServRstrCfgList.prodStatusServRstrCfgs
						: [];
					for (let val of this.prodStatusServRstrCfgs) {
						let prodStatusServRstrCfgObj = {
							cfgId: val.cfgId,
							actType: "KIP",
							applyRegionId: val.applyRegionId,
							prodId: val.prodId,
							prodStatusCd: val.prodStatusCd,
							promptMsg: val.promptMsg,
							rstrType: val.rstrType,
							serviceOfferId: val.serviceOfferId,
							serviceOfferName: val.serviceOfferName,
							serviceOfferNbr: val.serviceOfferNbr,
							stopType: val.stopType,
							serFrom: "net"
						};
						this.StatusServRstrCfgList.push(prodStatusServRstrCfgObj);
					}
					if (res.data.success == true) {
					} else {
						this.$message.error({ message : res.data.msg })
					}
				});
			},
			findSelStopType(item) {
				return this.selStopTypeArray.filter(s => s.value == item.value)[0];
            },
			selStopType(item) {
				this.selStopTypeArray.filter(s => s.value == item.value)[0]
					? (this.selStopTypeArray = this.selStopTypeArray.filter(
						s => s.value != item.value
					))
					: this.selStopTypeArray.push(item);
			},
			isNoExistVaild(arr) {
				let arrTemp = arr.filter(item => item.actType != "DEL");
				return arrTemp == 0;
			},
			selAllStopType() {
     		 	this.stopTypeArray.length != this.selStopTypeArray.length
				? (this.selStopTypeArray = [...this.stopTypeArray])
				: (this.selStopTypeArray = []);
    		},
            //选择业务流程树(产品配置-关联业务流程-选择业务流程)
			findServerData() {
                this.$axios.get(this.$api.ServiceOffer, {
                    params: {
                        standardCd: '4000000000'
                    }
                }).then(res => {
					if (res.data.success) {
                        this.serverOfferData = res.data.serviceOffers;
                        this.dialogTitle = "服务列表";
                        this.selTemplateType = '';
						this.$refs.server.show();
					} else {
						this.$message.error({ message:res.data.msg })
					}
				});
			},
			AddProductService() {
				this.serviceObj.follow = ''
				this.serviceObj.serviceOfferName = ''
				this.$refs.AddRelDialog.show();
			},
			addProcessServer(item){
				this.serverSpecsSelTemp.filter(obj => obj.serviceOfferNbr == item.serviceOfferNbr)[0] ?
				this.serverSpecsSelTemp = this.serverSpecsSelTemp.filter(obj => obj.serviceOfferNbr != item.serviceOfferNbr) :
				this.serverSpecsSelTemp.push(item)
			},
			serverClick(item){
				console.log(item);
				this.serverSpecsSelTemp.filter(obj => obj.serviceOfferNbr == item.serviceOfferNbr)[0] ?
				this.serverSpecsSelTemp = this.serverSpecsSelTemp.filter(obj => obj.serviceOfferNbr != item.serviceOfferNbr) :
				this.serverSpecsSelTemp.push(item)
			},

			addRelDialogSubmit(){//添加产品业务流程确认按钮

				console.log(this.serviceObj.tabObj);
				let Obj = {
					prodNbr: this.serviceObj.tabObj ? this.serviceObj.tabObj.prodNbr : '',
					applyRegionId: this.serviceObj.tabObj ? this.serviceObj.tabObj.applyRegionId : '',
					prodId: this.componentData.prodId　?　 this.componentData.prodId　: '',
					prodName: this.serviceObj.tabObj ? this.serviceObj.tabObj.prodName : '',
					remark: this.serviceObj.tabObj ? this.serviceObj.tabObj.remark : '',
					prodServiceRelId: this.serviceObj.tabObj ? this.serviceObj.tabObj.prodServiceRelId : '',
					serviceOfferId: this.serviceObj.tabObj ? this.serviceObj.tabObj.serviceOfferId : '',
					serviceOfferName: this.serviceObj.tabObj ? this.serviceObj.tabObj.serviceOfferName : '',
					serviceOfferNbr: this.serviceObj.tabObj ? this.serviceObj.tabObj.standardCd : '',
					paymentMode: this.serviceObj.paymentMode ? this.serviceObj.paymentMode : '',
					actType: "ADD",
					followProdName:this.findFollowProdId(),
					followProdId:this.serviceObj.follow,
					statusCd: this.serviceObj.tabObj ? this.serviceObj.tabObj.statusCd : '',
					staff:222,
					serFrom: "net"
				};
				this.$validator.validateAll().then((result) => {
					if(result){
						this.tabList.push(Obj)
						console.log(Obj);
						this.$refs.AddRelDialog.hide();
					}
				})

			},
			findFollowProdId(){
				let obj = this.serviceObj.followObj.find( item =>
					item.prodId == this.serviceObj.follow
				);
				return obj ? obj.prodName : ''
			},
			replacefollow() {//选择接入产品
                this.$axios.get(this.$api.replace(this.$api.QureyOrdParProdList, ['{prodId}'], [this.componentData.prodId]),{
                    params : {
                        prodId:this.componentData.prodId,
                        staff:this.staff
                    }
                }).then((res) => {
					if(res.data.success == true ){
                        res.data.products == null ? this.$message.error({ message : res.data.msg }) :
                        this.serviceObj.followObj = res.data.products ? res.data.products : [];
                    }else{
                        this.$message.error({ message : res.data.msg })
                    }
                }).catch(res => {
                    this.$message.error({ message : res.data.msg })
                })
            },
			addProductSubmit() {

			},
			addProductClose() {

			},
			showPaymentSelect(){

			},
			findAllSelStopType() {
				return this.stopTypeArray.length == this.selStopTypeArray.length;
			},
			delProduct(type,index){
				this.delType = type;
				this.index = index;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = '确认要删除选择的记录吗？';
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show()
			},
			tipConfirm(){
				if(this.delType == 'product'){
						if (this.tabList[this.index].serFrom == "net") {
						this.tabList[this.index].actType = "DEL";
						this.$refs.tip.hide();
					} else {
						this.tabList.splice(this.index, 1);
						this.$refs.tip.hide();
					}
				}else if(this.delType == 'servProduct'){
					if (this.RelRstrCfgList[this.index].serFrom == "net") {
							this.RelRstrCfgList[this.index].actType = "DEL";
							this.$refs.tip.hide();
						} else {
							this.RelRstrCfgList.splice(this.index, 1);
							this.$refs.tip.hide();
						}
				}else if(this.delType == 'statusProduct'){
					if (this.StatusServRstrCfgList[this.index].serFrom == "net") {
						this.StatusServRstrCfgList[this.index].actType = "DEL";
						this.$refs.tip.hide();
					} else {
						this.StatusServRstrCfgList.splice(this.index, 1);
						this.$refs.tip.hide();
					}
				}

			},
			//修改产品服务关系约束
			ModprodServRelRstrCfg(index) {
				if (this.RelRstrCfgList[index].serFrom == "net") {
					this.RelRstrCfgList[index].actType = "MOD";
				} else {
					this.RelRstrCfgList[index].actType = "ADD";
				}
			},
				//删除产品状态服务提供关系约束配置
			delStatusProduct(type,index) {
				this.delType = type;
				this.index = index;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = '确认要删除选择的记录吗？';
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();

			},
			copyStatusProduct(obj,index){
				this.selStopTypeArray = [];
				this.dialogTitle = "停机类型";
				this.$refs.stopTypeDialog.show();
				this.curCopyObj = obj;
			},
			AddprodServRelRstrCfg() {
				this.AddRelRstrCfgType = "ADD";
				let RelRstrCfgObj = {
					aServiceOfferId: "",
					aServiceOfferName: "",
					aServiceOfferNbr: "",
					actType: this.AddRelRstrCfgType,
					applyRegionId: this.applyRegionId,
					prodServiceRelRulId: this.prodServiceRelRulId,
					prodId: "",
					remark: "",
					rstrType: "",
					zServiceOfferId: "",
					zServiceOfferName: "",
					zServiceOfferNbr: "",
					serFrom: "local"
				};
				if (!this.RelRstrCfgList) {
					this.RelRstrCfgList = [];
				}
				this.RelRstrCfgList.push(RelRstrCfgObj);
			},
			//删除产品服务提供关系约束配置
			delServProduct(type, index) {
				this.delType = type;
				this.index = index;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = '确认要删除选择的记录吗？';
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			//A端选择服务提供信息列表
			AservicePopup(index) {
				this.AserverNameData = [];
				this.tablePopupFlag = "C";
				this.index = index;
				this.AdialogTitle = "A端服务提供名称列表";
				this.$refs.AserverName.show();
				if (this.RelRstrCfgList[index].serFrom == "net") {
					this.RelRstrCfgList[index].actType = "MOD";
				} else {
					this.RelRstrCfgList[index].actType = "ADD";
				}
			},
			//Z端选择服务提供信息列表
			ZservicePopup(index) {
				this.ZserverNameData = [];
				this.tablePopupFlag = "C";
				this.index = index;
				this.ZdialogTitle = "Z端服务提供名称列表";
				this.$refs.ZserverName.show();
				if (this.RelRstrCfgList[index].serFrom == "net") {
					this.RelRstrCfgList[index].actType = "MOD";
				} else {
					this.RelRstrCfgList[index].actType = "ADD";
				}
			},
			AserverNameClick(attr) {
				//选择属性input点击
				this.AserverNameData.filter(
					item => item.serviceOfferNbr == attr.serviceOfferNbr
				)[0]
					? (this.AserverNameData = [])
					: (this.AserverNameData = [attr]);
    		},
			AserverNameSel(attr) {
			//属性默认是否选中
			return this.AserverNameData.filter(
				item => item.serviceOfferNbr == attr.serviceOfferNbr
			)[0]
				? true
				: false;
			},
			ZserverNameClick(attr) {
				this.ZserverNameData.filter(
					item => item.serviceOfferNbr == attr.serviceOfferNbr
				)[0]
					? (this.ZserverNameData = [])
					: (this.ZserverNameData = [attr]);
			},
			ZserverNameSel(attr) {
			return this.ZserverNameData.filter(
				item => item.serviceOfferNbr == attr.serviceOfferNbr
			)[0]
				? true
				: false;
    		},
			addRelDialogClose(){
				this.serviceObj.follow = ''
				this.serviceObj.paymentMode = []
			},
			stopTypeDialogSubmit() {
				this.selStopTypeArray.filter(item => {
					let stopTypeTemp = JSON.parse(JSON.stringify(this.curCopyObj));
					stopTypeTemp.stopType = item.value;
					stopTypeTemp.actType = "ADD";
					this.StatusServRstrCfgList.push(stopTypeTemp);

					return true;
				});
				this.$refs.stopTypeDialog.hide();
    		},
			sureProcessService(){//添加产品状态业务流程约束配置保存
				this.serverSpecsSelTemp.forEach( item => {
					 let prodStatusServRstrCfgObj = {
						cfgId: item.cfgId,
						actType: this.AddStatusServRstrCfgType,
						applyRegionId: item.applyRegionId,
						prodId: item.prodId,
						prodStatusCd: item.prodStatusCd,
						promptMsg: item.promptMsg,
						rstrType: item.rstrType,
						serviceOfferId: item.serviceOfferId,
						serviceOfferName: item.serviceOfferName,
						serviceOfferNbr: item.serviceOfferNbr,
						stopType: item.stopType,
						serFrom: "local"
					};
					 if (!this.StatusServRstrCfgList) {
						this.StatusServRstrCfgList = [];
					}
					this.StatusServRstrCfgList.push(prodStatusServRstrCfgObj);
				})
				this.$refs.processServer.hide();
            },
            sureServiceProduct() {
                this.serviceObj.tabObj = this.selTemplateType;
				this.serviceObj.serviceOfferName = this.selTemplateType.serviceOfferName;
				this.$refs.server.hide();
            },
            
			AddprodStatusServRstrCfg(){
				this.AddStatusServRstrCfgType = 'ADD';
				this.stateServerSpecsSelTemp = [];
				this.dialogTitle = '添加产品状态业务流程约束配置';
				this.$refs.processServer.show();
			},
			AsureServiceProduct() {
				let index = this.index;

				if (this.AserverNameData.length == 0) {
					this.$message.info({ message : '请选择一条服务提供信息'})
				} else if (this.AserverNameData.length > 1) {
					this.$message.info({ message : '只能选择一条服务提供信息'})
				}
				if (
					this.AserverNameData[0].serviceOfferName ==
					this.RelRstrCfgList[index].zServiceOfferName
				) {
					this.$message.info({ message : '不可与Z端服务提供名称相同'})
				} else {
					this.RelRstrCfgList[
					index
					].aServiceOfferName = this.AserverNameData[0].serviceOfferName;
					this.RelRstrCfgList[
					index
					].aServiceOfferId = this.AserverNameData[0].serviceOfferId;
					this.RelRstrCfgList[index].prodId = this.AserverNameData[0].prodId;
				}
				this.AserverNameData = [];
				this.$refs.AserverName.hide();
			},
			ZsureServiceProduct() {
				let index = this.index;
				if (this.ZserverNameData.length == 0) {
					this.$message.info({ message : '请选择一条服务提供信息' })
				} else if (this.ZserverNameData.length > 1) {
					this.$message.info({ message : '只能选择一条服务提供信息' })
				}
				if (
					this.ZserverNameData[0].serviceOfferName ==
					this.RelRstrCfgList[index].aServiceOfferName
				) {
					this.$message.info({ message : '不可与A端服务提供名称相同' })
				} else {
					this.RelRstrCfgList[
					index
					].zServiceOfferName = this.ZserverNameData[0].serviceOfferName;
					this.RelRstrCfgList[
					index
					].zServiceOfferId = this.ZserverNameData[0].serviceOfferId;
					this.RelRstrCfgList[index].prodId = this.ZserverNameData[0].prodId;
				}
				this.ZserverNameData = [];
				this.$refs.ZserverName.hide();
    		},
			ZserverNameSel(attr) {
				return this.ZserverNameData.filter(
					item => item.serviceOfferNbr == attr.serviceOfferNbr
				)[0]
					? true
					: false;
			},
			AserverNameSel(attr) {
				//属性默认是否选中
				return this.AserverNameData.filter(
					item => item.serviceOfferNbr == attr.serviceOfferNbr
				)[0]
					? true
					: false;
			},
			//修改产品状态服务提供约束
			ModprodStatusServRstrCfg(index) {
				if (this.StatusServRstrCfgList[index].serFrom == "net") {
					this.StatusServRstrCfgList[index].actType = "MOD";
				} else {
					this.StatusServRstrCfgList[index].actType = "ADD";
				}
			},
			showYes(item) {//
				return this.serverSpecsSelTemp.filter(obj => obj.serviceOfferNbr == item.serviceOfferNbr)[0]
				? true
				: false;
            },
            plugClick() {
				this.$refs.server.initHeight();
				this.$refs.scroll.initScroll();
			},
		}
	}
</script>

<style scoped lang="scss">
.flow {
  width: 100%;
  height: 100%;
  padding: 0 20px !important;
		.selectbtn{
			float: right;
			margin-top: 15px;
		}

  .a-l-sel{
		border-top: 1px solid #dadada;
		.a-l-top{
			text-align: left;
			font-weight: bold;
			height: 30px;
			line-height: 30px;
			color: #b6de8f;
		}

	}
 	 /*已选*/
	.selected{
		height: 30px;
		min-height: 30px;
		margin-top:5.5px;
		background-color:#fff;
		line-height: 25px;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
	}
		.f_title {
			display: flex;
			height: 50px;
			line-height: 50px;
			justify-content: space-between;
			font-size: 14px;
			color: $mainColor;
			padding-left: 30px;
		}
	}

.f-dialog{
	padding: 20px 10px;
	.search{
		width: 300px;
		margin-bottom:20px;
	}
}

.stop-type-list {
	padding: 5px 5px;
  	font-size: 0.12rem;
	.s-t-all {
		padding: 5px 10px;
		cursor: pointer;
		border: 1px solid #dadbdf;
		border-radius: 5px;

		&.active {
		color: $mainColor;
		border: 1px solid $mainColor;
		}

		&:hover {
		border: 1px solid $mainColor;
		}
	}

	ul {
		display: flex;
		flex-wrap: wrap;

		li {
		padding: 5px 10px;
		cursor: pointer;
		border: 1px solid #dadbdf;
		margin: 10px 10px 0 0;
		border-radius: 5px;

			&.active {
				color: $mainColor;
				border: 1px solid $mainColor;
			}

			&:hover {
				border: 1px solid $mainColor;
			}
		}
	}
}
/*选择付费弹框*/
.i-area{
		padding: 10px 0;

	.i-title{
		border-bottom: solid 1px #f0f0f0;

		span{
			display: inline-block;
			width: 100px;
			height: 30px;
			line-height: 30px;
			font-size: 12px;
			color: white;
			text-align: center;
			background-color: $mainColor;
			border-radius: 4px 4px 0 0;
		}
		button{
			float: right;
			width: 60px;
			height: 24px;
			line-height: 22px;
			font-size: 12px;
			color: $mainColor;
			background-color: white;
			border-radius: 4px;
			border: solid 1px $mainColor;
			outline:none;
			cursor: pointer;

			i{
				display: inline-block;
				width: 12px;
				height: 10px;
				background-image: url("./images/info-yes.png");
				background-size: 100% 100%;
				float: left;
				margin-top: 6px;
				margin-left: 6px;
			}
		}
	}

	.i-content{
		padding-top: 16px;
		padding-bottom: 10px;

		.area{
			text-align: center;
			display: inline-block;
			width: 20%;
			height: 24px;
			line-height: 22px;
			font-size: 12px;
			color: #333333;
			background-color: white;
			border-radius: 4px;
			border: solid 1px #d5d5d5;
			margin: 8px 2%;
			cursor: pointer;
		}

		.activeArea{
			color: $mainColor;
			border: solid 1px $mainColor;

			i{
				display: inline-block;
				width: 12px;
				height: 10px;
				background-image: url("./images/info-yes.png");
				background-size: 100% 100%;
				float: left;
				margin-top: 6px;
				margin-left: 6px;
			}
		}
	}
}
.treecenter{
	margin-left:100px;
}
.blue-font span{
	color: $mainColor !important;
	cursor: pointer;
}
</style>

<style>
.picker-validate-error input{
	border: 1px solid #f1886b !important;
}
.validate-error  input{
	border: 1px solid #f1886b !important;
}
.tree_table{text-align:center;}

</style>
