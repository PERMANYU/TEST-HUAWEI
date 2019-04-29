<template>
	<div class="basic">
		<div class="app__top">
			<span class="app__top-left">基本信息</span>
			<span class="more" @click="more">扩展信息>></span>
		</div>
		<div class="basic-content">
			<Form labelWidth="130px" labelAlign="left">
				<Row>
					<Col :span="20">
						<FormItem labelText="销售品名称：" :requiredIcon="true" :errorMessage="errors.first('offerName')">
							<Input v-validate="'required'" name="offerName" data-vv-as="销售品名称" v-model="basicData.offerName"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="16">
						<FormItem labelText="商品类型：" :requiredIcon="true" :errorMessage="errors.first('commodityType')">
							<RadioGroup  v-validate="'required'" :data="commodityTypeArray" name="commodityType" data-vv-as="商品类型" v-model="basicData.commodityType" @change="commodityTypeChange"></RadioGroup>
						</FormItem>
					</Col>
					<Col :span="8"  v-if="basicData.commodityType == '10'">
						<FormItem labelWidth="180px" labelText="该成员商品仅在组合内销售：" :requiredIcon="true" :errorMessage="errors.first('onlyGrpSale')">
							<RadioGroup v-validate="'required'" :data="boolSelectArray" name="onlyGrpSale" data-vv-as="该成员商品仅在组合内销售" v-model="basicData.offerExt.onlyGrpSale"></RadioGroup>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
						<FormItem labelText="CRM参照复制销售品：">
							<Input name="copyOfferId" v-model="basicData.offerExtAttr.copyOfferId"></Input>
						</FormItem>
					</Col>
					<Col :span="12" :offset="1">
						<FormItem labelText="付费方式：" :requiredIcon="true" :errorMessage="errors.first('paymentModeCd')">
							<CheckboxGroup :data="paymentModeCdArray" v-validate="'required'" name="paymentModeCd" v-model="basicData.paymentModeCd" data-vv-as="付费方式"></CheckboxGroup>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
						<FormItem labelText="所属目录：" :requiredIcon="true" :errorMessage="errors.first('catalogItemName')">
							<Input v-validate="'required'" name="catalogItemName" data-vv-as="所属目录" v-model="basicData.offerCatalogLocation.loc" @click.native="catalogClick()" ref="catalogItemNameRef"></Input>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1">
						<FormItem labelText="上市时间：" :requiredIcon="true" :errorMessage="errors.first('effDate')">
							<DatePicker v-validate="'required'" :endDate="basicData.expDate" name="effDate" data-vv-as="上市时间" v-model="basicData.effDate"></DatePicker>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1">
						<FormItem labelText="退市时间：" :requiredIcon="true" :errorMessage="errors.first('expDate')">
							<DatePicker v-validate="'required'" :startDate="basicData.effDate" name="expDate" data-vv-as="退市时间" v-model="basicData.expDate"></DatePicker>
						</FormItem>
					</Col>
				</Row>
			</Form>
			<Form labelWidth="120px" labelAlign="left" v-show="isShow">
				<Row>
					<Col :span="7">
						<FormItem labelText="销售品内部名称：" :requiredIcon="true" :errorMessage="errors.first('offerSysName')">
							<Input v-validate="'required'" name="offerSysName" data-vv-as="销售品内部名称" v-model="basicData.offerSysName"></Input>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1">
						<FormItem labelText="销售品类型：" :requiredIcon="true" :errorMessage="errors.first('offerType')">
							<Select v-validate="'required'" :data="offerTypeArray" dataLabelStr="attrValueName" dataValueStr="attrValue" name="offerType" data-vv-as="销售品类型" v-model="basicData.offerType" @change="offerTypeChange"></Select>
						</FormItem>
					</Col>

                    <Col :span="7" :offset="1">
                        <FormItem labelText="销售品子类型：" :requiredIcon="false" :errorMessage="errors.first('offerSubType')">
							<Select v-validate="''" :data="offerSubTypeOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="offerSubType" data-vv-as="销售品类型" v-model="basicData.offerExt.offerSubType" @change="offerTypeChange"></Select>
						</FormItem>
                    </Col>
					
				</Row>

                <Row>
                    <Col :span="7">
					<FormItem labelText="品牌信息：" :requiredIcon="true" :errorMessage="errors.first('brandId')">
						<Select v-validate="'required'" :data="offerBrandArray" dataLabelStr="attrValueName" dataValueStr="attrValue"  name="brandId" data-vv-as="品牌信息" v-model="basicData.brandId"></Select>
					</FormItem>
					</Col>

                    <Col :span="7" :offset="1">
                        <FormItem labelText="销售品系列：" :requiredIcon="false" :errorMessage="errors.first('salesSeries')">
							<Select v-validate="''" :data="salesSeriesOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="salesSeries" data-vv-as="销售品系列" v-model="basicData.offerExt.salesSeries" ></Select>
						</FormItem>
                    </Col>

                    <Col :span="7" :offset="1">
                        <FormItem labelText="销售品档次：" :requiredIcon="false" :errorMessage="errors.first('salesGrade')">
							<Select v-validate="''" :data="salesGradeOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="salesGrade" data-vv-as="销售品档次" v-model="basicData.offerExt.salesGrade" ></Select>
						</FormItem>
                    </Col>
                    
                </Row>
				<Row>
                    <Col :span="7">
						<FormItem labelText="管理级别：" :requiredIcon="true" :errorMessage="errors.first('manageGrade')">
							<Select v-validate="'required'" :data="manageGradeArray" dataLabelStr="attrValueName" dataValueStr="attrValue" name="manageGrade" data-vv-as="管理级别" v-model="basicData.manageGrade"></Select>
						</FormItem>
					</Col>
					
					<Col :span="7" :offset="1">
					<FormItem labelText="集团业务编码：">
						<Input name="offerNbr" data-vv-as="集团业务编码" v-model="basicData.offerNbr"></Input>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="内部编码：" >
						<Input readonly name="innerNbr" data-vv-as="内部编码" v-model="basicData.innerNbr"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
					<FormItem labelText="管理部门：" :requiredIcon="true" :errorMessage="errors.first('offerProviderId')">
						<Select v-validate="'required'" :data="offerProviderArray"  name="offerProviderId" data-vv-as="管理部门" v-model="basicData.offerProviderId"></Select>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="商品类别：" :requiredIcon="true" :errorMessage="errors.first('offerGroupType')">
						<Select v-validate="'required'" :data="offerGroupTypeArray"  name="offerGroupType" data-vv-as="商品类别" v-model="basicData.offerGroupType"></Select>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="月基本费：" :requiredIcon="true" :errorMessage="errors.first('monthlyBasicFee')">
						<Input v-validate="'required'" name="monthlyBasicFee" data-vv-as="月基本费" v-model="basicData.offerExt.monthlyBasicFee"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
					<FormItem labelText="销售品系统分类：" :requiredIcon="true" :errorMessage="errors.first('offerSysType')">
						<Select v-validate="'required'" :data="offerSysTypeArray" dataLabelStr="attrValueName" dataValueStr="attrValue" name="offerSysType" data-vv-as="销售品系统分类" v-model="basicData.offerSysType"></Select>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="两级编码标识：">
						<Input name="extOfferId" v-model="basicData.extOfferId"></Input>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="可选包/促销应用类型：" :requiredIcon="false" :errorMessage="errors.first('optAlloType')">
						<Select v-validate="''" :data="optAlloTypeOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="optAlloType" data-vv-as="促销应用类型" v-model="basicData.offerExt.optAlloType"></Select>
					</FormItem>
					</Col>
				</Row>
                <Row>
					<Col :span="7">
					<FormItem labelText="移动QV统计归类：" :requiredIcon="false" :errorMessage="errors.first('mobielQVType')">
						<Select v-validate="''" :data="QVTypeArray" dataLabelStr="attrValueName" dataValueStr="attrValue" name="mobielQVType" data-vv-as="移动QV统计归类" v-model="basicData.offerExt.mobielQVType"></Select>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="上网包子类型：" :requiredIcon="false" :errorMessage="errors.first('netPackType')">
						<Select v-validate="''" :data="netPackTypeOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="netPackType" data-vv-as="上网包子类型" v-model="basicData.offerExt.netPackType"></Select>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="上网包优惠范围：" :requiredIcon="false" :errorMessage="errors.first('swbyhfw')">
						<Select v-validate="''" :data="swbyhfwOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="swbyhfw" data-vv-as="上网包优惠范围" v-model="basicData.offerExtAttr.swbyhfw"></Select>
					</FormItem>
					</Col>
				</Row>

                <Row>
					<Col :span="7">
					<FormItem labelText="限制订购次数：" :requiredIcon="false" :errorMessage="errors.first('xzdgcs')">
						<Input name="xzdgcs" v-model="basicData.offerExtAttr.xzdgcs" v-validate="'numeric'"></Input>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="流量包统计类型：" :requiredIcon="false" :errorMessage="errors.first('llbtjlx')">
						<Select v-validate="'required'" :data="llbtjlxOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="llbtjlx" data-vv-as="流量包统计类型" v-model="basicData.offerExtAttr.llbtjlx"></Select>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="上网计费属性：" :requiredIcon="false" :errorMessage="errors.first('xNetChgAtt')">
						<Select v-validate="''" :data="xNetChgAttOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="xNetChgAtt" data-vv-as="上网计费属性" v-model="basicData.offerExt.xNetChgAtt"></Select>
					</FormItem>
					</Col>
				</Row>

                <Row>
					<Col :span="7">
					<FormItem labelText="营销规则名称：" :requiredIcon="false" :errorMessage="errors.first('strategy')">
						<Input name="strategy" v-model="basicData.offerExt.strategy" v-validate="''"></Input>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="短信发送类型：" :requiredIcon="false" :errorMessage="errors.first('smsSendType')">
						<Select v-validate="''" :data="smsSendTypeOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="smsSendType" data-vv-as="短信发送类型" v-model="basicData.offerExt.smsSendType"></Select>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="融合标识：" :requiredIcon="false" :errorMessage="errors.first('mergeMark')">
						<Select v-validate="''" :data="mergeMarkOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="mergeMark" data-vv-as="融合标识" v-model="basicData.offerExtAttr.mergeMark"></Select>
					</FormItem>
					</Col>
				</Row>


                <Row>
					<Col :span="7">
					<FormItem labelText="限制退订月数：" :requiredIcon="false" :errorMessage="errors.first('limitUnsubscribeMonth')">
						<Input name="limitUnsubscribeMonth" v-model="basicData.offerExt.limitUnsubscribeMonth" v-validate="'numeric'"></Input>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="年付标志：" :requiredIcon="false" :errorMessage="errors.first('billDayCd')">
						<Select v-validate="''" :data="billDayCdOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="billDayCd" data-vv-as="年付标志" v-model="basicData.offerExt.billDayCd"></Select>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="叠加效果类型：" :requiredIcon="false" :errorMessage="errors.first('overlapType')">
						<Select v-validate="''" :data="overlapTypeOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="overlapType" data-vv-as="叠加效果类型" v-model="basicData.offerExt.overlapType"></Select>
					</FormItem>
					</Col>
				</Row>
                
                <Row>
					<Col :span="7" >
					<FormItem labelText="专题分类：" :requiredIcon="false" :errorMessage="errors.first('packSubType')">
						<Select v-validate="''" :data="packSubTypeOption" dataLabelStr="attrValueName" dataValueStr="attrValue" name="packSubType" data-vv-as="专题分类" v-model="basicData.offerExt.packSubType"></Select>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="新老编码映射：" :requiredIcon="false" :errorMessage="errors.first('innerNbrMapping')">
						<Input name="innerNbrMapping" v-model="basicData.offerExt.innerNbrMapping" v-validate="''"></Input>
					</FormItem>
					</Col>
				</Row>


				<Row>
					<Col :span="7">
					<FormItem labelText="跳过主套餐预存款：">
						<RadioGroup name="skipMainOfferPrestore" :data="boolSelectArray" v-model="basicData.offerExt.skipMainOfferPrestore"></RadioGroup>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="是否收取违约金：">
						<RadioGroup name="penaltyFlag" :data="boolSelectArray" v-model="basicData.offerExt.penaltyFlag"></RadioGroup>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="是否独立销售：" :requiredIcon="true" :errorMessage="errors.first('isIndependent')">
						<RadioGroup :data="boolSelectArray" v-validate="'required'" name="isIndependent" v-model="basicData.isIndependent" data-vv-as="是否独立销售"></RadioGroup>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
					<FormItem labelText="是否主套餐预存款：">
						<RadioGroup name="isMainOfferPrestore" :data="boolSelectArray" v-model="basicData.offerExt.isMainOfferPrestore"></RadioGroup>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="允许发送IBP标识：">
						<RadioGroup name="sendIbpFlag" :data="boolSelectArray" v-model="basicData.offerExt.sendIbpFlag"></RadioGroup>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="是否已同步CRM：">
						<span v-if="basicData.offerExtAttr.isSynchCrm == 1" class="span">是</span>
						<span v-else class="span">否</span>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
					<FormItem labelText="是否已同步Abp：">
						<span v-if="basicData.offerExtAttr.isSynchAbp == 1" class="span">是</span>
						<span v-else class="span">否</span>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="是否发送OCS：">
						<RadioGroup name="isOpenOcs" :data="boolSelectArray" v-model="basicData.offerExt.isOpenOcs"></RadioGroup>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="是否4g销售品：">
						<RadioGroup name="fourg" :data="boolSelectArray" v-model="basicData.offerExtAttr.fourg"></RadioGroup>
					</FormItem>
					</Col>
				</Row>
                
				<Row>
					<Col :span="7">
					<FormItem labelText="是否公免：">
						<RadioGroup name="sfgm" :data="boolSelectArray" v-model="basicData.offerExtAttr.sfgm"></RadioGroup>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="预开通过期激活：">
						<RadioGroup name="yktgqjh" :data="boolSelectArray" v-model="basicData.offerExtAttr.yktgqjh"></RadioGroup>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="集约标志：">
						<RadioGroup name="needSubmitIbp" :data="boolSelectArray" v-model="basicData.offerExt.needSubmitIbp"></RadioGroup>
					</FormItem>
					</Col>
                  
				</Row>
				<Row>
					<Col :span="7">
					<FormItem labelText="限制可选包促销默认依赖：">
						<RadioGroup name="xzkxbmryl" :data="boolSelectArray" v-model="basicData.offerExtAttr.xzkxbmryl"></RadioGroup>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="红包转赠：">
						<RadioGroup name="hbzz" :data="boolSelectArray" v-model="basicData.offerExtAttr.hbzz"></RadioGroup>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="话补机型检查标志：">
						<RadioGroup name="hbModelInspectFlag" :data="boolSelectArray" v-model="basicData.offerExt.hbModelInspectFlag"></RadioGroup>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
					<FormItem labelText="无需短信提示：">
						<RadioGroup name="noSmsPrompt" :data="boolSelectArray" v-model="basicData.offerExt.noSmsPrompt"></RadioGroup>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="提醒业务（对内）：">
						<RadioGroup name="xIRemindFlg" :data="boolSelectArray" v-model="basicData.offerExt.xIRemindFlg"></RadioGroup>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="是否共享：">
						<RadioGroup name="isShare" :data="boolSelectArray" v-model="basicData.offerExt.isShare"></RadioGroup>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
					<FormItem labelText="短信受理：">
						<RadioGroup name="smsFlag" :data="boolSelectArray" v-model="basicData.offerExt.smsFlag"></RadioGroup>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="是否电子渠道可受理：">
						<RadioGroup name="echannelOrderFlag" :data="boolSelectArray" v-model="basicData.offerExt.echannelOrderFlag"></RadioGroup>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="限制开放投诉处理：">
						<RadioGroup name="complaintDealFlg" :data="boolSelectArray" v-model="basicData.offerExt.complaintDealFlg"></RadioGroup>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
					<FormItem labelText="终补检查标志：">
						<RadioGroup name="terminalSubsidy" :data="boolSelectArray" v-model="basicData.offerExt.terminalSubsidy"></RadioGroup>
					</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
					<FormItem labelText="是否紧融合：">
						<RadioGroup name="isTightFuse" :data="boolSelectArray" v-model="basicData.offerExt.isTightFuse"></RadioGroup>
					</FormItem>
					</Col>
                   
				</Row>
				<Row>
					<Col :span="23">
					<FormItem labelText="销售品描述：">
						<Input type="textarea" name="offerDesc" v-model="basicData.offerDesc"></Input>
					</FormItem>
					</Col>
				</Row>
			</Form>
		</div>
		<div class="app__top" v-show="isShow">
			<span class="app__top-left">战略客户分群</span>
		</div>
		<div class="cust-type-content">
			<Form labelWidth="100px" labelAlign="left" v-show="isShow">
				<Row>
					<Col :span="23">
						<FormItem labelText="目标客户群：" :requiredIcon="true" :errorMessage="errors.first('custType')">
							<CheckboxGroup showAll :data="custTypeArray" v-validate="'required'" name="custType" v-model="basicData.custType" data-vv-as="目标客户群"></CheckboxGroup>
						</FormItem>
					</Col>
				</Row>
			</Form>
		</div>



		<Dialog dialogTitle="销售品目录位置" ref="catalogItemDialog" @confirm="catalogItemDialogConfirm">
			<Scroll :isShowRight="true" ref="catalogItemTree">
				<Tree :folder="treeItem" :keys="catalogItemTreeKey" v-for="(treeItem,treeIndex) in catalogItemTree" :key="'tree'+treeIndex" v-model="catalogItemTreeModel" @plugClick="catalogItemTreePlugClick()" :selLevel="9999" />
			</Scroll>
		</Dialog>
	</div>

</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				basicData: {
					offerCatalogLocation: {},
					offerExt: {},
					offerPaymentModes: {},
					offerTargetCustGrpList: {},
					offerExtAttr: {}
				},
				commodityTypeArray: [{
					label: '商品',
					value: '10'
				}, {
					label: '组合商品',
					value: '30'
				}, {
					label: '可选包',
					value: '40'
				}, {
					label: '促销',
					value: '50'
				}, {
					label: '关联包',
					value: '60'
				}, {
					label: '加装包',
					value: '70'
				}],
				manageGradeArray: [],
				offerTypeArray: [],
				offerProviderArray: [{
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
                }],
                offerBrandArray: [],
				offerSysTypeArray: [],
				QVTypeArray: [],
				custTypeArray: [{
					label: '住宅',
					value: '1100'
				}, {
					label: '政企',
					value: '1000'
				}],
				paymentModeCdArray: [{
					label: '后付费',
					value: '1200'
				}, {
					label: '准实时预付费',
					value: '1201'
				}, {
					label: '预付费',
					value: '2100'
				}],
				boolSelectArray: [{
					label: '是',
					value: '1'
				}, {
					label: '否',
					value: '0'
				}],
				smsSendTypeOption: [],
				offerGroupTypeArray: [{
					label: 'A1',
					value: 'A1'
				}, {
					label: 'A2',
					value: 'A2'
				}, {
					label: 'B1',
					value: 'B1'
				}, {
					label: 'B2',
					value: 'B2'
                }],
                //可选包/促销应用类型
                optAlloTypeOption:[],
                //上网包子类型
                netPackTypeOption:[],
                //上网包优惠范围i
                swbyhfwOption:[],
                //流量包统计类型
                llbtjlxOption:[],
                //上网计费属性
                xNetChgAttOption:[],
                //融合标识
                mergeMarkOption:[],
                //年付标志
                billDayCdOption:[],
                //叠加效果类型
                overlapTypeOption:[],
                //专题分类
                packSubTypeOption:[],
                //销售品子类型
                offerSubTypeOption:[],
                
                //销售品系列
                salesSeriesOption:[],
                
                //销售品档次
                salesGradeOption:[
                ],
				catalogItemTree: [],
				catalogItemTreeKey: [{
					key: 'catalogItemName',
					span: 24
				}],
				catalogItemTreeModel: '',
				isShow: false,
				isSynchCrm: [{
					label: '是',
					value: '1'
				},{
					label: '否',
					value: '0'
				}]
			}
        },
        watch: {
            'basicData.offerType'(old,newValue) {
              let attrValueId = this.offerTypeArray.filter(item => item.attrValue == old)[0] ? this.offerTypeArray.filter(item => item.attrValue == old)[0].attrValueId : '';
                this.getEncoding('销售品子类型',attrValueId);
            },
            'basicData.brandId'(old,newValue){
              let attrValueId = this.offerBrandArray.filter(item => item.attrValue == old)[0] ? this.offerBrandArray.filter(item => item.attrValue == old)[0].attrValueId : '';
                this.getEncoding('销售品系列',attrValueId)
            },
            'basicData.offerExt.salesSeries'(old,newValue) {
              let attrValueId = this.salesSeriesOption.filter(item => item.attrValue == old)[0] ? this.salesSeriesOption.filter(item => item.attrValue == old)[0].attrValueId : '';
                this.getEncoding('销售品档次',attrValueId)
			},
			'basicData.offerName'(old,newValue) {
				let dateYear = new Date().getFullYear(),
					dateMonth1 = new Date().getMonth() + 1,
					dateMonth = (dateMonth1 < 10 ? '0'+dateMonth1 : dateMonth1),
					newDate = dateYear +''+ dateMonth;
				this.basicData.offerSysName = newDate +'-'+ old
			}

        },
		mounted() {
            this.initJson();//获取所有下拉的
            this.initData();
		},
		methods: {
            initJson() {
                this.$axios.get(this.$api.replace(this.$api.GetOnlybusiObj,['{busiObjId}'],[0]),{
                    params:{
                        busiObjId:0,
                        busiObjNbr:'ffdffff',
                    }
                }).then( res => {
                    if(res.data.success) {
                        let allArray = res.data.busiObj.busiObjAttrs;
                        allArray.filter( item => item.attrSpec.attrName == '销售品类型')[0].busiObjAttrValues.map(item => {
                            this.offerTypeArray.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '客户品牌')[0].busiObjAttrValues.map(item => {
                            this.offerBrandArray.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '销售品系列')[0].busiObjAttrValues.map(item => {
                            this.salesSeriesOption.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '管理级别')[0].busiObjAttrValues.map(item => {
                            this.manageGradeArray.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '销售品系统分类')[0].busiObjAttrValues.map(item => {
                            this.offerSysTypeArray.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '可选包/促销应用类型')[0].busiObjAttrValues.map(item => {
                            this.optAlloTypeOption.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '移动QV统计归类')[0].busiObjAttrValues.map(item => {
                            this.QVTypeArray.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '上网包子类型')[0].busiObjAttrValues.map(item => {
                            this.netPackTypeOption.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '上网包优惠范围')[0].busiObjAttrValues.map(item => {
                            this.swbyhfwOption.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '流量包统计类型')[0].busiObjAttrValues.map(item => {
                            this.llbtjlxOption.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '上网计费属性')[0].busiObjAttrValues.map(item => {
                            this.xNetChgAttOption.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '短信发送类型')[0].busiObjAttrValues.map(item => {
                            this.smsSendTypeOption.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '融合标识')[0].busiObjAttrValues.map(item => {
                            this.mergeMarkOption.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '专题分类')[0].busiObjAttrValues.map(item => {
                            this.packSubTypeOption.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '年付标志')[0].busiObjAttrValues.map(item => {
                            this.billDayCdOption.push(item.attrValue)
                        });
                        allArray.filter( item => item.attrSpec.attrName == '叠加效果类型')[0].busiObjAttrValues.map(item => {
                            this.overlapTypeOption.push(item.attrValue)
                        });
                    }
                }).catch( err => {
                    this.$message.error({ message : err.response.data.msg })
                })
            },
			reInitData(){
				this.initData();
			},
			initData() {
				this.$axios.get(this.$api.replace(this.$api.OfferBasic, ["{offerId}"], [this.componentData.offerId]), {

				}).then(res => {
					if(res.data.success) {
						let tempBasicData = res.data.offer;
						tempBasicData.custType = res.data.offer.offerTargetCustGrpList ? res.data.offer.offerTargetCustGrpList.map(item => item.custType) : [];
						if(tempBasicData.custType.length == 0) {
							this.$set(tempBasicData, 'custType', ['1000', '1100'])
						}
						tempBasicData.paymentModeCd = res.data.offer.offerPaymentModes ? res.data.offer.offerPaymentModes.map(item => item.paymentModeCd) : [];
						if(tempBasicData.paymentModeCd.length == 0) {
							this.$set(tempBasicData, 'paymentModeCd', ['1200', '2100'])
						}
						tempBasicData.offerCatalogLocation = tempBasicData.offerCatalogLocation || {
							loc: '',
							catalogItemId: ''
						};
						tempBasicData.offerExt = tempBasicData.offerExt || {};
						tempBasicData.offerPaymentModes = tempBasicData.offerPaymentModes || {};
						if(!tempBasicData.offerSysType) {
							tempBasicData.offerSysType = '1000'
						}
						if(!tempBasicData.brandId) {
							tempBasicData.brandId = '1200'
						}
						if(!tempBasicData.manageGrade) {
							tempBasicData.manageGrade = '12'
						}
						if(!tempBasicData.offerGroupType) {
							tempBasicData.offerGroupType = 'B1'
						}
						if(!tempBasicData.brandId) {
							tempBasicData.brandId = '1200'
						}
						if(!tempBasicData.offerProviderId) {
							tempBasicData.offerProviderId = this.$user.getInfo().departId;
						}
						if(!tempBasicData.offerExt.monthlyBasicFee) {
							tempBasicData.offerExt.monthlyBasicFee = 0
						}
						if(!tempBasicData.offerSysName) {
							tempBasicData.offerSysName = tempBasicData.offerName
						}
						if(!tempBasicData.offerExt.skipMainOfferPrestore) {
							tempBasicData.offerExt.skipMainOfferPrestore = '0'
						}
						if(!tempBasicData.offerExt.penaltyFlag) {
							tempBasicData.offerExt.penaltyFlag = '0'
						}
						if(!tempBasicData.offerExt.sendIbpFlag) {
							tempBasicData.offerExt.sendIbpFlag = '0'
						}
						if(!tempBasicData.offerExt.onlyGrpSale) {
							tempBasicData.offerExt.onlyGrpSale = '0'
						}
						if(tempBasicData.commodityType == '10') {
							if(!tempBasicData.isIndependent) {
								tempBasicData.isIndependent = '1'
							}
						} else {
							if(!tempBasicData.isIndependent) {
								tempBasicData.isIndependent = '0'
							}
						}

						this.basicData = tempBasicData;
						this.$emit('commodityTypeChange',tempBasicData.commodityType);
					}
				}).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },

            initMonthlyBasicFeeM() {
                this.$axios.get(this.$api.replace(this.$api.OfferBasic, ["{offerId}"], [this.componentData.offerId]), {

                }).then( res => {
                    if(res.data.success) {
                        this.basicData.offerExt.monthlyBasicFee = res.data.offer.offerExt.monthlyBasicFee
                    }
                }).catch( err => {
                    this.$message.error( { message : err.response.data.msg })
                })
            },
            
            //获取目录树
            catalogClick() {

            	//获取目录树类型
            	// 10102:销售品目录
            	// 10103:规则目录
            	// 10104:集团新产品目录
            	// 10105:可选包目录
            	// 10106:促销目录
            	// 10107:客户标签目录
            	// 10108:政企合同目录
            	
            	let catalogId = {
            		'14':'10108', //14:政企协议
            		'13':'10106', //13:促销
            		'12':'10105' //12:可选包
            	}[this.basicData.offerType];

            	catalogId = catalogId || '10102';

                this.$axios.get(`${this.$api.Catalog}/${catalogId}`,{
                    params:{

                    }
                }).then(res => {
                    if (res.data.success) {
                        this.catalogItemTree = res.data.catalogDetail.catalogItems||[];
                        this.$nextTick(() => {
							this.$refs.catalogItemDialog.show();
						})

                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },

            //获取属性编码 
            getEncoding(name,Nbr) {
                this.$axios.get(this.$api.Attrspec,{
                    params: {
                        attrName:name,
                        attrNbr:'',
                        offset:'',
                        pageNumber:1,
                        pageSize:5
                    }
                }).then( res => {
                    if(res.data.success) {
                        let attrId = res.data.attrSpecPage.content[0] ? res.data.attrSpecPage.content[0].attrId : '';
                        this.getJson(name,attrId,Nbr)
                    }
                }).catch( err => {
                    this.$message.error({ message : err.response.data.msg })
                })
            },


            getJson(name,attrId,parAttrValueId) { // 联动json
                this.$axios.get(this.$api.replace(this.$api.AttrSpecMore,['{attrId}'],[attrId]),{
                    params: {
                        attrId:attrId,
                        attrValueName:'',
                        parAttrValueId:parAttrValueId,
                    }
                }).then( res => {
                    if(res.data.success) {
                        switch (name) {
                            case '销售品子类型':
                        this.offerSubTypeOption = res.data.attrSpecDetail.attrValueList;
                                break;
                            case '销售品系列':
                        this.salesSeriesOption = res.data.attrSpecDetail.attrValueList;
                                break;
                            case '销售品档次':
                        this.salesGradeOption = res.data.attrSpecDetail.attrValueList;
                                break;
                            default:
                                break;
                        }
                    }
                }).catch( err => {
                    this.$message.error({ message : err.response.data.msg })
                })
            },

			catalogItemTreePlugClick() {
				this.$refs.catalogItemDialog.initHeight();
				this.$refs.catalogItemTree.initScroll();
			},
			catalogItemDialogConfirm() {
				this.basicData.offerCatalogLocation.loc = this.catalogItemTreeModel.catalogItemName;
				this.basicData.offerCatalogLocation.catalogItemId = this.catalogItemTreeModel.catalogItemId;

				this.$refs.catalogItemDialog.hide();
				this.$refs.catalogItemNameRef.focus();
				setTimeout(() => {
					this.$refs.catalogItemNameRef.blur();
				}, 100)
			},
			adjustSaveOfferPaymentModes() {
				let tempArray = [];
				this.basicData.paymentModeCd.filter(item => {
					tempArray.push({
						paymentModeCd: item
					})
					return true;
				})
				return tempArray;
			},
			adjustSaveOfferTargetCustGrps() {
				let tempArray = [];
				this.basicData.custType.filter(item => {
					tempArray.push({
						custType: item
					})
					return true;
				})
				return tempArray;
			},
			save(callback) {
				this.$validator.validateAll().then((result) => {
					if(result) {
						this.$axios.put(this.$api.replace(this.$api.OfferBasic, ["{offerId}"], [this.componentData.offerId]), {
							offerId: this.componentData.offerId,
							commodityType: this.basicData.commodityType,
							offerType: this.basicData.offerType,
							offerSysType: this.basicData.offerSysType,
							offerGroupType: this.basicData.offerGroupType,
							offerName: this.basicData.offerName,
							offerSysName: this.basicData.offerSysName,
							offerSysPyName: this.basicData.offerSysPyName || "",
							offerNbr: this.basicData.offerNbr,
							innerNbr: this.basicData.innerNbr,
							offerDesc: this.basicData.offerDesc || "",
							effDate: new Date(this.basicData.effDate),
							expDate: new Date(this.basicData.expDate),
							manageGrade: this.basicData.manageGrade,
							offerProviderId: this.basicData.offerProviderId,
							brandId: this.basicData.brandId,
							initialCredValue: this.basicData.initialCredValue,
							isIndependent: this.basicData.isIndependent,
                            offerExtId: 33,
							extOfferId: this.basicData.extOfferId,
							offerCatalogLocation: {
								offerCatLocId: '',
								catalogItemId: this.basicData.offerCatalogLocation.catalogItemId
							},
							offerPaymentModes: this.adjustSaveOfferPaymentModes(),
							offerTargetCustGrpList: this.adjustSaveOfferTargetCustGrps(),
							offerExt: {
								offerExtId: this.basicData.offerExt.offerExtId,
                                mobielQVType: this.basicData.offerExt.mobielQVType,
                                innerNbrMapping:this.basicData.offerExt.innerNbrMapping,
								isShare: this.basicData.offerExt.isShare,
								monthlyBasicFee: this.basicData.offerExt.monthlyBasicFee,
								limitMonthUnsubscribe: this.basicData.offerExt.limitMonthUnsubscribe,
								offerSubType: this.basicData.offerExt.offerSubType,
								sendIbpFlag: this.basicData.offerExt.sendIbpFlag,
								hbModelInspectFlag: this.basicData.offerExt.hbModelInspectFlag,
								noSmsPrompt: this.basicData.offerExt.noSmsPrompt,
								skipMainOfferPrestore: this.basicData.offerExt.skipMainOfferPrestore,
								penaltyFlag: this.basicData.offerExt.penaltyFlag,
								isOpenOcs: this.basicData.offerExt.isOpenOcs,
								limitUnsubscribeMonth: this.basicData.offerExt.limitUnsubscribeMonth,
								isMainOfferPrestore: this.basicData.offerExt.isMainOfferPrestore,
                                onlyGrpSale: this.basicData.offerExt.onlyGrpSale,
                                optAlloType: this.basicData.offerExt.optAlloType,
                                netPackType: this.basicData.offerExt.netPackType,
                                xNetChgAtt: this.basicData.offerExt.xNetChgAtt,
                                smsSendType: this.basicData.offerExt.smsSendType,
                                xIRemindFlg: this.basicData.offerExt.xIRemindFlg,
                                smsFlag: this.basicData.offerExt.smsFlag,
                                echannelOrderFlag: this.basicData.offerExt.echannelOrderFlag,
                                complaintDealFlg: this.basicData.offerExt.complaintDealFlg,
                                terminalSubsidy: this.basicData.offerExt.terminalSubsidy,
                                billDayCd: this.basicData.offerExt.billDayCd,
                                overlapType: this.basicData.offerExt.overlapType,
                                packSubType: this.basicData.offerExt.packSubType,
                                isTightFuse: this.basicData.offerExt.isTightFuse,
                                needSubmitIbp: this.basicData.offerExt.needSubmitIbp,
                                strategy: this.basicData.offerExt.strategy,
                                salesSeries: this.basicData.offerExt.salesSeries,
                                salesGrade: this.basicData.offerExt.salesGrade,
							},
							offerExtAttr: {
                                copyOfferId: this.basicData.offerExtAttr.copyOfferId,
								offerExtAttrId: this.basicData.offerExtAttr.offerExtAttrId,
								yktgqjh: this.basicData.offerExtAttr.yktgqjh,
								fourg: this.basicData.offerExtAttr.fourg,
								sfgm: this.basicData.offerExtAttr.sfgm,
								hbzz: this.basicData.offerExtAttr.hbzz,
								swbyhfw: this.basicData.offerExtAttr.swbyhfw,
								llbtjlx: this.basicData.offerExtAttr.llbtjlx,
								xzkxbmryl: this.basicData.offerExtAttr.xzkxbmryl,
								mergeMark: this.basicData.offerExtAttr.mergeMark,
								xzdgcs: this.basicData.offerExtAttr.xzdgcs,
							},
							updateStaff: this.$user.getInfo().id,
						}).then(res => {
							if(res.data.success) {
								this.$set(this.componentData,'offerName',this.basicData.offerName);
								this.initData()
								this.$message.success({ message: '基本信息保存成功！' })
								this.$emit('saveStatus', true);
								callback(true);
							}else{
								this.$message.error({ message: '基本信息保存失败！' })
								callback(false);
							}

						}).catch(error => {
							this.$message.error({ message: error.response.data.msg })
							callback(false);
						})
					}else{
						this.$message.error({ message: '基本信息表单验证失败！' })
						callback(false);
					}
				})
			},
			more() {
				if(this.isShow) {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
			},
			commodityTypeChange(val){ //商品类型切换
				let chageArray = {
					"10": "11",
					"30": "15",
					"40": "12",
					"50": "13",
					"60": "12",
					"70": "12"
				}//销售品类型:销售品子类型对应关系

				if(this.basicData.offerType != chageArray[val]){
					this.offerTypeChange(chageArray[val])
				}

				this.basicData.offerType = chageArray[val];

				this.$emit('commodityTypeChange',val);
			},
			offerTypeChange(val){ //销售品类型切换
				this.basicData.offerCatalogLocation.loc = '';
                this.basicData.offerCatalogLocation.catalogItemId = '';
			}
		}
	}
</script>

<style scoped lang="scss">
	.basic {
        width: 100%;

		.more {
			position: absolute;
			top: 0;
			right: 10px;
			height: 30px;
			line-height: 30px;
			color: $mainColor;
			cursor: pointer;
            pointer-events: auto;
		}

		.basic-content{
			padding: 0 20px;
			margin: 20px 0;
		}

		.cust-type-content{
			padding: 0 20px;
			margin: 20px 0 0;
		}
	}
</style>
