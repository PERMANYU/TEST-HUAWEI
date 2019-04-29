<template>
	<div class="basic">
		<div class="app__top">
			<span class="app__top-left">基本信息</span>
		</div>
		<div class="basic-content">
			<Form labelWidth="100px" labelAlign="left">
				<Row class="main-list">
					<Col :span="12">
					<FormItem labelText="商品名称：" small>
						<span class="over-col" :title="basicData.offerName">{{basicData.offerName}}</span>
					</FormItem>
					</Col>

					<Col :span="12">
					<FormItem labelText="商品类型：" small>
						<span class="span">{{getCommodityType(basicData.commodityType)}}</span>
					</FormItem>
					</Col>

					<Col :span="12">
					<label>复制商品ID：</label>
					<span class="span">{{offerExtAttr.copyOfferId}}</span>
					</Col>
					
					<Col :span="12">
					<label>该成员商品仅在组合内销售：</label>
					<span class="span">{{basicDataExt.onlyGrpSale == '1' ? '是' : basicDataExt.onlyGrpSale == '0' ? '否' : '---'}}</span>
					</Col>

					<Col :span="12">
					<label>付费方式：</label>
					<span class="span">{{getPaymentModeCd(basicData.offerPaymentModes)}}</span>
					</Col>

					<Col :span="12">
					<label>所属目录：</label>
					<span class="span" :title="OfferCatalogLocation.loc">{{OfferCatalogLocation.loc}}</span>
					</Col>

					<Col :span="12">
					<label>上市时间：</label>
					<span class="span">{{basicData.effDate | date}}</span>
					</Col>

					<Col :span="12">
					<label>退市时间：</label>
					<span class="span">{{basicData.expDate | date}}</span>
					</Col>

					<Col :span="12">
					<label>销售品内部名称：</label>
					<span class="span">{{basicData.offerSysName}}</span>
					</Col>

					<Col :span="12">
					<label>商品子类型：</label>
					<span class="span">{{basicData.offerType}}</span>
					</Col>

					<Col :span="12">
					<label>管理级别：</label>
					<span class="span">{{basicData.manageGrade}}</span>
					</Col>

					<Col :span="12">
					<label>品牌信息：</label>
					<span class="span">{{basicData.brandName}}</span>
					</Col>

					<Col :span="12">
					<label>集团业务编码：</label>
					<span class="span">{{basicData.offerNbr}}</span>
					</Col>

					<Col :span="12">
					<label>内部编码：</label>
					<span class="span">{{basicData.innerNbr}}</span>
					</Col>

					<Col :span="12">
					<label>管理部门：</label>
					<span class="span">{{basicData.offerProviderId}}</span>
					</Col>

					<Col :span="12">
					<label>商品类别：</label>
					<span class="span">{{basicData.offerGroupType}}</span>
					</Col>

					<Col :span="12">
					<label>月基本费：</label>
					<span class="span">{{basicDataExt.monthlyBasicFee}}</span>
					</Col>

					<Col :span="12">
					<label>销售品系统分类：</label>
					<span class="span">{{basicData.offerSysType}}</span>
					</Col>

					<Col :span="12">
					<label>两级编码标识：</label>
					<span class="span">{{basicData.extOfferId}}</span>
					</Col>

					<Col :span="12">
					<label>跳过主套餐预付款：</label>
					<span class="span">{{basicDataExt.skipMainOfferPrestore == '1' ? '是' : basicDataExt.skipMainOfferPrestore == '0' ? '否' : '---'}}</span>
					</Col>

					<Col :span="12">
					<label>是否收取违约金：</label>
					<span class="span">{{basicDataExt.penaltyFlag == '1' ? '是' : basicDataExt.penaltyFlag == '0' ? '否' : '---'}}</span>
					</Col>

					<Col :span="12">
					<label>是否独立销售：</label>
					<span class="span">{{basicData.isIndependent == '1' ? '是' : basicData.isIndependent == '0' ? '否' : '---'}}</span>
					</Col>

					<Col :span="12">
					<label>是否主套餐预付款：</label>
					<span class="span">{{basicDataExt.isMainOfferPrestore == '1' ? '是' : basicDataExt.isMainOfferPrestore == '0' ? '否' : '---'}}</span>
					</Col>

					<Col :span="12">
					<label>是否同步ABP：</label>
					<span class="span">{{offerExtAttr.isSynchAbp == '1' ? '是' : offerExtAttr.isSynchAbp == '0' ? '否' : '---'}}</span>
					</Col>

					<Col :span="12">
					<label>是否同步CRM：</label>
					<span class="span">{{offerExtAttr.isSynchCrm == '1' ? '是' : offerExtAttr.isSynchCrm == '0' ? '否' : '---'}}</span>
					</Col>

                    <Col :span="12">
                        <label>销售品系列：</label>
                        <span class="span">{{basicDataExt.salesSeriesName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>销售品档次：</label>
                        <span class="span">{{basicDataExt.salesGradeName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>可选包/促销应用类型：</label>
                        <span class="span">{{basicDataExt.optAlloTypeName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>移动QV统计归类：</label>
                        <span class="span">{{basicDataExt.mobielQVTypeName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>上网包子类型：</label>
                        <span class="span">{{basicDataExt.netPackTypeName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>上网包优惠范围：</label>
                        <span class="span">{{offerExtAttr.swbyhfwName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>限制订购次数：</label>
                        <span class="span">{{offerExtAttr.xzdgcs}}</span>
                    </Col>

                    <Col :span="12">
                        <label>流量包统计类型：</label>
                        <span class="span">{{offerExtAttr.llbtjlxName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>上网计费属性：</label>
                        <span class="span">{{basicDataExt.xNetChgAttName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>营销规则名称：</label>
                        <span class="span">{{basicDataExt.strategy}}</span>
                    </Col>

                    <Col :span="12">
                        <label>短信发送类型：</label>
                        <span class="span">{{basicDataExt.smsSendTypeName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>融合标识：</label>
                        <span class="span">{{offerExtAttr.mergeMark}}</span>
                    </Col>

                    <Col :span="12">
                        <label>限制退订月数：</label>
                        <span class="span">{{basicDataExt.limitUnsubscribeMonth}}</span>
                    </Col>

                    <Col :span="12">
                        <label>年付标志：</label>
                        <span class="span">{{basicDataExt.billDayCdName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>叠加效果类型：</label>
                        <span class="span">{{basicDataExt.overlapTypeName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>专题分类：</label>
                        <span class="span">{{basicDataExt.packSubTypeName}}</span>
                    </Col>

                    <Col :span="12">
                        <label>新老编码映射：</label>
                        <span class="span">{{basicDataExt.innerNbrMapping}}</span>
                    </Col>

                     <Col :span="12">
	                    <label>是否发送OCS：</label>
	                    <span class="span">{{basicDataExt.isOpenOcs == '1' ? '是' : basicDataExt.isOpenOcs == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>是否4g销售品：</label>
	                    <span class="span">{{offerExtAttr.fourg == '1' ? '是' : offerExtAttr.fourg == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>是否公免：</label>
	                    <span class="span">{{offerExtAttr.sfgm == '1' ? '是' : offerExtAttr.sfgm == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>预开通过期激活：</label>
	                    <span class="span">{{offerExtAttr.yktgqjh == '1' ? '是' : offerExtAttr.yktgqjh == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                    
                     <Col :span="12">
	                    <label>限制可选包促销默认依赖：</label>
	                    <span class="span">{{offerExtAttr.xzkxbmryl == '1' ? '是' : offerExtAttr.xzkxbmryl == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>红包转赠：</label>
	                    <span class="span">{{offerExtAttr.hbzz == '1' ? '是' : offerExtAttr.hbzz == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>话补机型检查标志：</label>
	                    <span class="span">{{basicDataExt.hbModelInspectFlag == '1' ? '是' : basicDataExt.hbModelInspectFlag == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>无需短信提示：</label>
	                    <span class="span">{{basicDataExt.noSmsPrompt == '1' ? '是' : basicDataExt.noSmsPrompt == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>提醒业务（对内）：</label>
	                    <span class="span">{{basicDataExt.xIRemindFlg == '1' ? '是' : basicDataExt.xIRemindFlg == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>是否共享：</label>
	                    <span class="span">{{basicDataExt.isShare == '1' ? '是' : basicDataExt.isShare == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>短信受理：</label>
	                    <span class="span">{{basicDataExt.smsFlag == '1' ? '是' : basicDataExt.smsFlag == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>是否电子渠道可受理：</label>
	                    <span class="span">{{basicDataExt.echannelOrderFlag == '1' ? '是' : basicDataExt.echannelOrderFlag == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>限制开放投诉处理：</label>
	                    <span class="span">{{basicDataExt.complaintDealFlg == '1' ? '是' : basicDataExt.complaintDealFlg == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>终补检查标志：</label>
	                    <span class="span">{{basicDataExt.terminalSubsidy == '1' ? '是' : basicDataExt.terminalSubsidy == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>是否紧融合：</label>
	                    <span class="span">{{basicDataExt.isTightFuse == '1' ? '是' : basicDataExt.isTightFuse == '0' ? '否' : '---'}}</span>
	                </Col>
                    
                     <Col :span="12">
	                    <label>集约标志：</label>
	                    <span class="span">{{basicDataExt.needSubmitIbp == '1' ? '是' : basicDataExt.needSubmitIbp == '0' ? '否' : '---'}}</span>
	                </Col>

					<Col :span="24">
	                    <label>销售品描述：</label>
	                    <span class="span">{{basicData.offerDesc}}</span>
	                </Col>

				</Row>
			</Form>
		</div>
		<div class="app__top">
			<span class="app__top-left">战略客户分群</span>
		</div>
		<div class="cust-type-content">
			<Form labelWidth="100px" labelAlign="left">
				<Row>
					<Col :span="23">
					<FormItem labelText="目标客户群：">
						<span v-for="item in basicDataGrp">{{item.custType== '1100' ? '住宅' : item.custType == '1000' ? '政企' : ''}}</span>
					</FormItem>
					</Col>
				</Row>
			</Form>
		</div>
	</div>

</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				basicData: {},
				offerPaymentModes: [],
				basicDataGrp: [],
				custTypeArray: [{
					label: '住宅',
					value: '1100'
				}, {
					label: '政企',
					value: '1000'
				}],
				offerExtAttr: {},
				basicDataExt: {}, //基本信息数据拓展信息
				OfferCatalogLocation: {},
				offerTargetCustGrp: '',
				paymentModeCdArray: [{ //后付费
					label: '后付费',
					value: '1200'
				}, {
					label: '准实时预付费',
					value: '1201'
				}, {
					label: '预付费',
					value: '2100'
                }],
                offerBrandArray: [{//品牌信息
					label: '天翼领航',
					value: '1000'
				}, {
					label: '天翼e家',
					value: '1100'
				}, {
					label: '天翼',
					value: '1200'
				}, {
					label: '天翼飞YOUNG',
					value: '1201'
				}, {
					label: '天翼宽带',
					value: '1202'
				}, {
					label: '天翼其他',
					value: '1203'
				}, {
					label: '政企非品牌',
					value: '1300'
				}, {
					label: '家庭非品牌',
					value: '1400'
				}, {
					label: '个人非品牌',
					value: '1500'
				}, {
					label: '号码百事通',
					value: '1600'
				}, {
					label: '其他',
					value: '9999'
				}, {
					label: '未知',
					value: '-1'
                },
                {
                    label: '无客户品牌',
					value: '2000'
                },
                {
                    label: '其他非品牌',
					value: '2001'
                },
                {
                    label: '天翼-可选包',
					value: '2002'
                },
                {
                    label: '商务领航',
					value: '2003'
                },
                {
                    label: '公免',
					value: '2004'
                },
                {
                    label: '新时空',
					value: '2005'
                },
                {
                    label: '133/153老套餐',
					value: '2006'
                },
                {
                    label: '我的e家',
					value: '2007'
                },
                {
                    label: '基础销售品',
					value: '2008'
                },
                {
                    label: '天翼',
					value: '2009'
                },
                {
                    label: '商务领航',
					value: '2010'
                },
                {
                    label: '联通老套餐',
					value: '2011'
                },
                {
                    label: '无',
					value: '2012'
                },
                {
                    label: '个人客户品牌',
					value: '2013'
                },
                ],
                //可选包/促销应用类型
                optAlloTypeOption:[
                    {
                        label:'3G上网包',
                        value:'10000',
                    },{
                        label:'4G上网包',
                        value:'10001',
                    },{
                        label:'4G上网包路径二专用',
                        value:'10002',
                    },{
                        label:'WiFi上网包',
                        value:'10003',
                    },{
                        label:'不允许升4G的3G上网包',
                        value:'10004',
                    },{
                        label:'副卡',
                        value:'10005',
                    },{
                        label:'副卡资费包',
                        value:'10009',
                    },{
                        label:'升4G可保留上网包',
                        value:'10010',
                    },{
                        label:'存费送费',
                        value:'10006',
                    },{
                        label:'普通',
                        value:'10011',
                    },{
                        label:'订购业务送费',
                        value:'10007',
                    },{
                        label:'购机送费',
                        value:'10008',
                    }
                ],
                QVTypeArray: [{ //移动QV统计归类
					label: 'Onstar',
					value: '01'
				}, {
					label: 'e6/e9',
					value: '02'
				}, {
					label: '个性化/行业套餐',
					value: '03'
				}, {
					label: '乐享/自主',
					value: '04'
				}, {
					label: '乐享副卡',
					value: '05'
				}, {
					label: '其他',
					value: '06'
				}, {
					label: '商旅系列',
					value: '07'
				}, {
					label: '天翼行',
					value: '08'
				}, {
					label: '天翼领航',
					value: '09'
				}, {
					label: '校园',
					value: '10'
				}, {
					label: '总机套餐',
					value: '11'
				}, {
					label: '无线宽带',
					value: '12'
				}, {
					label: '时尚系列',
					value: '13'
				}, {
					label: '易通卡/大众',
					value: '14'
				}, {
					label: '畅聊系列',
					value: '15'
				}, {
					label: '联通老套餐',
					value: '16'
				}, {
					label: '4G无线宽带',
					value: '17'
				}, {
					label: '4G乐享',
					value: '18'
				}, {
					label: '4G云卡',
					value: '19'
				}, {
					label: '4G其他',
					value: '20'
				}, {
					label: '4G副卡',
					value: '21'
				}, {
					label: '飞young',
					value: '22'
				}, {
					label: '飞young云卡',
					value: '23'
				}, {
					label: '乐享云卡',
					value: '24'
				}, {
					label: '卓越计划',
					value: '25'
                }],
                //上网包子类型
                netPackTypeOption:[
                    {
                        label:'全时段上网包',
                        value:'10003',
                    },
                    {
                        label:'增值业务定向上网包',
                        value:'10001',
                    },
                    {
                        label:'忙闲时上网包',
                        value:'10004',
                    },
                    {
                        label:'达量降速上网包',
                        value:'10000',
                    },
                ],
                //上网包优惠范围i
                swbyhfwOption:[
                    {
                        label:'国内',
                        value:'1000',
                    },
                    {
                        label:'国内+国际漫游（分别计费）',
                        value:'1001',
                    },
                    {
                        label:'国内23：00-7：00',
                        value:'1002',
                    },
                    {
                        label:'国际漫游',
                        value:'1003',
                    },
                    {
                        label:'本地',
                        value:'1004',
                    },
                    {
                        label:'本地+国内漫游（分别计费）',
                        value:'1005',
                    },
                    {
                        label:'本地23：00-7：00',
                        value:'1006',
                    },
                ],
                //流量包统计类型
                llbtjlxOption:[
                    {
                        label:'上网卡流量包',
                        value:'15'
                    },
                    {
                        label:'其他后向',
                        value:'13'
                    },
                    {
                        label:'其他手机上网',
                        value:'14'
                    },
                    {
                        label:'后向定向',
                        value:'11'
                    },
                    {
                        label:'后向非定向',
                        value:'12'
                    },
                    {
                        label:'定向-其他定向',
                        value:'10'
                    },
                    {
                        label:'定向-政企应用定向类',
                        value:'6'
                    },
                    {
                        label:'定向-时间定向类',
                        value:'7'
                    },
                    {
                        label:'定向-社会应用定向类',
                        value:'5'
                    },
                    {
                        label:'定向-终端定向类',
                        value:'9'
                    },
                    {
                        label:'定向-自主应用定向类',
                        value:'4'
                    },
                    {
                        label:'月包',
                        value:'19'
                    },
                    {
                        label:'短期包',
                        value:'16'
                    },
                    {
                        label:'跨月包',
                        value:'18'
                    },
                    {
                        label:'通用流量-加油包',
                        value:'2'
                    },
                    {
                        label:'通用流量-国际及港澳台漫游',
                        value:'3'
                    },
                ],
                smsSendTypeOption: [{
					label: '手机流量上网月包',
					value: '10001'
				}, {
					label: '手机上网加油包、跨月包',
					value: '10002'
				}, {
					label: '套餐/促销/通用模板',
					value: '10003'
				}, {
					label: '月包模板',
					value: '10004'
				}, {
					label: '短期包/加油包/跨月包模板',
					value: '10005'
				}, {
					label: '后向包模板',
					value: '10006'
				}, {
					label: '个性化模板',
					value: '10007'
				}, {
					label: '无',
					value: '10008'
				}, {
					label: '港澳台模板',
					value: '10009'
				}, {
					label: '套餐/促销模板',
					value: '10010'
				}, {
					label: '多国包模板',
					value: '10011'
                }],
                //年付标志
                billDayCdOption:[
                    {
                        label:'一个月',
                        value:'10000'
                    },
                    {
                        label:'三个月',
                        value:'10001'
                    },
                    {
                        label:'半年',
                        value:'10003'
                    },
                    {
                        label:'七个月',
                        value:'10002'
                    },
                    {
                        label:'一年',
                        value:'10004'
                    },
                    {
                        label:'两年',
                        value:'10005'
                    },
                ],
                //叠加效果类型
                overlapTypeOption:[
                    {
                        label:'基础类',
                        value:'1003'
                    },
                    {
                        label:'活动类',
                        value:'1000'
                    },
                    {
                        label:'靓号类',
                        value:'1001'
                    },
                    {
                        label:'其它类',
                        value:'1002'
                    },
                ],
                //专题分类
                packSubTypeOption:[
                    {
                        label:'话音包',
                        value:'9',
                    },
                    {
                        label:'龙计划促销',
                        value:'18',
                    },
                    {
                        label:'合约计划',
                        value:'2',
                    },
                    {
                        label:'合约计划（3G智能机）',
                        value:'12',
                    },
                    {
                        label:'电子购物券',
                        value:'17',
                    },
                    {
                        label:'等价卡',
                        value:'11',
                    },
                    {
                        label:'员工合约',
                        value:'3',
                    },
                    {
                        label:'2G换3G终补',
                        value:'6',
                    },
                    {
                        label:'充值送费1',
                        value:'7',
                    },
                    {
                        label:'充值送费2',
                        value:'16',
                    },
                    {
                        label:'翼支付终补',
                        value:'4',
                    },
                    {
                        label:'全家享话补',
                        value:'15',
                    },
                    {
                        label:'翼支付线上版',
                        value:'5',
                    },
                    {
                        label:'翼支付空促销',
                        value:'8',
                    },
                    {
                        label:'快速终补',
                        value:'19',
                    },
                    {
                        label:'礼包',
                        value:'13',
                    },
                    {
                        label:"云卡补贴",
                        value:"1"
                    },
                    {
                        label:"云卡预存",
                        value:"10"
                    },
                    {
                        label:"以旧换新",
                        value:"14"
                    }
                ],
			}
		},
		mounted() {
			this.initData();
		},
		methods: {
			initData(offerId) {
				this.$axios.get(this.$api.replace(this.$api.OfferBasic, ["{offerId}"], [this.componentData.offerId]), {

				}).then((res) => {
					console.log(res, '基本信息')
					if(res.data.success) {
						this.basicData = res.data.offer
						this.basicDataGrp = res.data.offer.offerTargetCustGrpList
						if(res.data.offer.offerExt != null) {
							this.basicDataExt = res.data.offer.offerExt
						}
						this.offerTargetCustGrp = res.data.offer.offerTargetCustGrpList
						this.offerPaymentModes = res.data.offer.offerPaymentModes
						this.offerExtAttr = res.data.offer.offerExtAttr
						if(res.data.offer.offerCatalogLocation != null) {
							this.OfferCatalogLocation = res.data.offer.offerCatalogLocation
						}
						//商品子类型
						switch(this.basicData.offerType) {
							case '10':
								this.basicData.offerType = '基础销售品';
								break;
							case '11':
								this.basicData.offerType = '套餐销售品';
								break;
							case '12':
								this.basicData.offerType = '可选包';
								break;
							case '13':
								this.basicData.offerType = '促销';
								break;
							case '14':
								this.basicData.offerType = '政企协议';
								break;
							case '20':
								this.basicData.offerType = '加装包';
								break;
							case '30':
								this.basicData.offerType = '关联包';
								break;
						}
						//管理级别
						switch(this.basicData.manageGrade) {
							case '10':
								this.basicData.manageGrade = '集团框架级';
								break;
							case '11':
								this.basicData.manageGrade = '集团实例级';
								break;
							case '12':
								this.basicData.manageGrade = '省公司实例级';
								break;
							case '13':
								this.basicData.manageGrade = '本地网级';
								break;
							case '14':
								this.basicData.manageGrade = '省公司框架级';
								break;
							case '15':
								this.basicData.manageGrade = '转售实例级';
								break;
						}
						//管理部门
						switch(this.basicData.offerProviderId) {
							case '10':
								this.basicData.offerProviderId = '市场部';
								break;
							case '11':
								this.basicData.offerProviderId = '政企客户部';
								break;
							case '12':
								this.basicData.offerProviderId = '公众客户部';
								break;
							case '13':
								this.basicData.offerProviderId = '创新事业部';
								break;
						}
						//移动分类
						switch(this.basicData.mobielQVType) {
							case '01':
								this.basicData.mobielQVType = 'Onstar';
								break;
							case '02':
								this.basicData.mobielQVType = 'e6/e9';
								break;
							case '03':
								this.basicData.mobielQVType = '个性化/行业套餐';
								break;
							case '04':
								this.basicData.mobielQVType = '乐享/自主';
								break;
							case '05':
								this.basicData.mobielQVType = '乐享副卡';
								break;
							case '06':
								this.basicData.mobielQVType = '其他';
								break;
							case '07':
								this.basicData.mobielQVType = '商旅系列';
								break;
							case '08':
								this.basicData.mobielQVType = '天翼行';
								break;
							case '09':
								this.basicData.mobielQVType = '天翼领航';
								break;
							case '10':
								this.basicData.mobielQVType = '校园';
								break;
							case '11':
								this.basicData.mobielQVType = '总机套餐';
								break;
							case '12':
								this.basicData.mobielQVType = '无线宽带';
								break;
							case '13':
								this.basicData.mobielQVType = '时尚系列';
								break;
							case '14':
								this.basicData.mobielQVType = '易通卡/大众';
								break;
							case '15':
								this.basicData.mobielQVType = '畅聊系列';
								break;
							case '16':
								this.basicData.mobielQVType = '联通老套餐';
								break;
							case '17':
								this.basicData.mobielQVType = '4G无线宽带';
								break;
							case '18':
								this.basicData.mobielQVType = '4G乐享';
								break;
							case '19':
								this.basicData.mobielQVType = '4G云卡';
								break;
							case '20':
								this.basicData.mobielQVType = '4G其他';
								break;
							case '21':
								this.basicData.mobielQVType = '4G副卡';
								break;
							case '22':
								this.basicData.mobielQVType = '飞young';
								break;
							case '23':
								this.basicData.mobielQVType = '飞young云卡';
								break;
							case '24':
								this.basicData.mobielQVType = '乐享云卡';
								break;
							case '25':
								this.basicData.mobielQVType = '卓越计划';
								break;
						}
						//销售品系统分类
						switch(this.basicData.offerSysType) {
							case '1000':
								this.basicData.offerSysType = '接入类基础销售品';
								break;
							case '1100':
								this.basicData.offerSysType = '功能类基础销售品';
								break;
							case '1200':
								this.basicData.offerSysType = '单接入类可选包/促销';
								break;
							case '1400':
								this.basicData.offerSysType = '无接入类可选包/促销';
								break;
							case '1500':
								this.basicData.offerSysType = '多接入类可选包/促销';
								break;
						}
						//品牌信息
						switch(this.basicData.offerSysType) {
							case '1000':
								this.basicData.offerSysType = '天翼领航';
								break;
							case '1100':
								this.basicData.offerSysType = '天翼翼家';
								break;
							case '1200':
								this.basicData.offerSysType = '天翼';
								break;
							case '1201':
								this.basicData.offerSysType = '天翼飞YOUNG';
								break;
							case '1202':
								this.basicData.offerSysType = '天翼宽带';
								break;
							case '1203':
								this.basicData.offerSysType = '天翼其他';
								break;
							case '1300':
								this.basicData.offerSysType = '政企非品牌';
								break;
							case '1400':
								this.basicData.offerSysType = '家庭非品牌';
								break;
							case '1500':
								this.basicData.offerSysType = '个人非品牌';
								break;
							case '1600':
								this.basicData.offerSysType = '号码百事通';
								break;
							case '9999':
								this.basicData.offerSysType = '其他';
								break;
							case '-1':
								this.basicData.offerSysType = '未知';
								break;
                        }
                        
                        //可选包/促销应用类型
                        this.basicDataExt.optAlloType = 
                        this.optAlloTypeOption.filter(item => item.value == this.basicDataExt.optAlloType)[0] ? this.optAlloTypeOption.filter(item => item.value == this.basicDataExt.optAlloType)[0].label : '';
                        //移动QV统计归类
                        this.basicDataExt.mobielQVType = 
                        this.QVTypeArray.filter(item => item.value == this.basicDataExt.mobielQVType)[0] ? this.QVTypeArray.filter(item => item.value == this.basicDataExt.mobielQVType)[0].label : '';
                        //上网包子类型
                        this.basicDataExt.netPackType = 
                        this.netPackTypeOption.filter(item => item.value == this.basicDataExt.netPackType)[0] ? this.netPackTypeOption.filter(item => item.value == this.basicDataExt.netPackType)[0].label : '';
                        //上网包优惠范围
                        this.offerExtAttr.swbyhfw = 
                        this.swbyhfwOption.filter(item => item.value == this.offerExtAttr.swbyhfw)[0] ? this.swbyhfwOption.filter(item => item.value == this.offerExtAttr.swbyhfw)[0].label : '';
                        //流量包统计类型
                        this.offerExtAttr.llbtjlx = 
                        this.llbtjlxOption.filter(item => item.value == this.offerExtAttr.llbtjlx)[0] ? this.llbtjlxOption.filter(item => item.value == this.offerExtAttr.llbtjlx)[0].label : '';
                        //短信发送类型
                        this.basicDataExt.smsSendType = 
                        this.smsSendTypeOption.filter(item => item.value == this.basicDataExt.smsSendType)[0] ? this.smsSendTypeOption.filter(item => item.value == this.basicDataExt.smsSendType)[0].label : '';
                        //年付标志
                        this.basicDataExt.billDayCd = 
                        this.billDayCdOption.filter(item => item.value == this.basicDataExt.billDayCd)[0] ? this.billDayCdOption.filter(item => item.value == this.basicDataExt.billDayCd)[0].label : '';
                        //叠加效果类型
                        this.basicDataExt.overlapType = 
                        this.overlapTypeOption.filter(item => item.value == this.basicDataExt.overlapType)[0] ? this.overlapTypeOption.filter(item => item.value == this.basicDataExt.overlapType)[0].label : '';
                        //专题分类
                        this.basicDataExt.packSubType = 
                        this.packSubTypeOption.filter(item => item.value == this.basicDataExt.packSubType)[0] ? this.packSubTypeOption.filter(item => item.value == this.basicDataExt.packSubType)[0].label : '';
                        
						this.$emit('commodityTypeChange', this.basicData.commodityType);
					}
				}).catch( err => {
                    this.$message.error({ message : err.response.data.msg })
                })
			},
			getPaymentModeCd(arr) {
				let newArr = [];
				(arr ? arr : []).forEach(element => {
					newArr.push(this.paymentModeCdArray.find(item => item.value == element.paymentModeCd).label);
				});
				return newArr.join()
            },
			getCommodityType(type) {
				return {
					'10': '商品',
					'30': '组合商品',
					'40': '可选包',
					'50': '促销',
					'60': '关联包',
					'70': '加装包'
				}[type];
            },
		}
	}
</script>

<style scoped lang="scss">
	.over-col {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.app__top {
		margin-top: 10px;
	}
	
	.basic {
		width: 100%;
		.basic-content {
			padding: 0 20px;
			margin: 20px 0;
		}
		.cust-type-content {
			padding: 0 20px;
			margin: 20px 0 0;
			span {
				margin-left: 10px;
			}
		}
	}
</style>