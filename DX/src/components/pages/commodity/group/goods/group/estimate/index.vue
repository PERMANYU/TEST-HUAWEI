<template>
	<div class="estimate">
		<!-- <Form labelWidth="120px" labelAlign="left">
			<Row>
				<Col :span="8">
				<FormItem labelText="评估周期(月)：" :requiredIcon="true" >
					<Input v-validate="'required'" name="accessmentCycle" v-model="aloneData.accessmentCycle"></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col :span="8">
				<FormItem labelText="每户智能组网数（点/户）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="networkNum" v-model="aloneData.networkNum"></Input>
				</FormItem>
				</Col>
				<Col :span="8">
				<FormItem labelText="每户宽带数(路/户)：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col :span="8">
				<FormItem labelText="每户非标清IPTV路数（点/户）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
				<Col :span="8">
				<FormItem labelText="每户标清IPTV路数（路/户）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col :span="8">
				<FormItem labelText="预估发展用户数(户）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col :span="8">
				<FormItem labelText="预估用户月消费额(元/月户）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col :span="8">
				<FormItem labelText="单用户赠款(元）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col :span="8">
				<FormItem labelText="预估总收入(元)：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
				<Col :span="8">
				<FormItem labelText="预估总成本(元）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col :span="8">
				<FormItem labelText="销售品预估毛利（元）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
				<Col :span="8">
				<FormItem labelText="销售品预估毛利率（%）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col :span="8">
				<FormItem labelText="预估总收入(元)：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
				<Col :span="8">
				<FormItem labelText="预估总成本(元）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col :span="8">
				<FormItem labelText="销售品预估毛利（元）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
				<Col :span="8">
				<FormItem labelText="销售品预估毛利率（%）：" :requiredIcon="true" >
					<Input v-validate="'required'" name="offerName" ></Input>
				</FormItem>
				</Col>
			</Row>
		</Form> -->
		<Form labelWidth="100px" labelAlign="left" class="from-bg" v-if="canSelTemplateType">
			<Row>
				<Col :span="20">
				<FormItem labelText="毛利预估模板" :errorMessage="errors.first('offerType')">
					<RadioGroup v-validate="'required'" :data="offerTypeArray" name="templateType" data-vv-as="毛利预估模板" v-model="temData.templateType"></RadioGroup>
				</FormItem>
				</Col>
			</Row>
		</Form>

		<div class="app__top" v-if="!canSelTemplateType">
			<span class="app__top-left">{{temData.templateType == '30' ? '融合套餐模板' : temData.templateType == '20' ? '单宽带套餐模板' : '单移动套餐模板'}}</span>
		</div>

		<div class="broad">
			<Form labelWidth="220px" labelAlign="right" v-if="temData.templateType==10">
				<div class="broad-top">
					<div class="broad-top-title"><span>预<br>估</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<span class="icondist iconfont icon-jibenxinxi"><p>基础信息</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="评估周期（月）：" :requiredIcon="false">
									<Input number v-model="aloneData.accessmentCycle"></Input>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="套餐内流量（GB）：">
									<Input number name="flow" v-model="aloneData.flow"></Input>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="套餐内语音（分钟）：">
									<Input number name="voice" v-model="aloneData.voice"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-fazhanyewu"><p>发展业务量</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="预估发展用户数(户）：" :requiredIcon="false">
									<Input number v-model="aloneData.developUserNum"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
						<span class="icondist2 iconfont icon-qian"><p>收入</p></span>
						<Row class="broad-st">
							<Col :span="10">
							<FormItem labelText="预估用户月消费额(元/月户）：" :requiredIcon="false">
								<Input number v-model="aloneData.userMonthlyAmount"></Input>
							</FormItem>
							</Col>
						</Row>
						</div>
					</div>
				</div>
				<div class="broad-top2">
					<div class="broad-top-title"><span>成<br>本</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<Row class="broad-st title-top">
								<Col :span="10">
								<FormItem labelText="单用户终端补贴(元/户）：" :requiredIcon="false">
									<Input number v-model="aloneData.userTeriminalSubsidy"></Input>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="单用户话费补贴(元/户）：" :requiredIcon="false">
									<Input number v-model="aloneData.userTravelSubsidy"></Input>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="单用户翼支付资源(元/户）：" :requiredIcon="false">
									<Input number v-model="aloneData.userYzfzyCost"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>

				<div class="broad-top3">
					<div class="broad-top-title"><span>收<br>益</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<span class="icondist iconfont icon-qian"><p>税前</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="预估总收入(元)：">
									<span class="orange" v-model="aloneData.grossIncome">{{aloneData.grossIncome}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="预估总成本(元）：">

									<span class="orange" v-model="aloneData.totalCost">{{aloneData.totalCost}}元</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="销售品预估毛利（元）：">

									<span class="orange" v-model="aloneData.grossProfit">{{aloneData.grossProfit}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="销售品预估毛利率（%）：">

									<span class="orange" v-model="aloneData.grossRate">{{aloneData.grossRate}}%</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-qian"><p>税后</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="预估总收入(元)：">

									<span class="orange" v-model="aloneData.taxGrossIncome">{{aloneData.taxGrossIncome}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="预估总成本(元）：">

									<span class="orange" v-model="aloneData.taxTotalCost">{{aloneData.taxTotalCost}}元</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="销售品预估毛利（元）：">

									<span class="orange" v-model="aloneData.taxGrossProfit">{{aloneData.taxGrossProfit}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="销售品预估毛利率（%）：">

									<span class="orange" v-model="aloneData.taxGrossRate">{{aloneData.taxGrossRate}}%</span>
								</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</Form>
		</div>

		<div class="broad2">
			<Form labelWidth="220px" labelAlign="right" v-if="temData.templateType==20">
				<div class="broad-top">
					<div class="broad-top-title"><span>预<br>估</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<span class="icondist iconfont icon-jibenxinxi"><p>基础信息</p></span>
							<Row class="broad-st">
							<Col :span="10">
								<FormItem labelText="评估周期(月)：" :requiredIcon="false">
									<Input number v-model="broadData.accessmentCycle"></Input>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10" >
								<FormItem labelText="每户智能组网数（点/户）：">
									<Input number name="networkNum" v-model="broadData.networkNum"></Input>
								</FormItem>
								</Col>
								<Col :span="10" class="broad-st">
								<FormItem labelText="每户宽带数(路/户)：">
									<Input number name="fixedTelNum" v-model="broadData.fixedTelNum"></Input>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="每户非标清IPTV路数（点/户）：" :requiredIcon="false">
									<Input number v-model="broadData.noStandardDefinitIptyNum"></Input>
								</FormItem>
								</Col>
								<Col :span="10" class="broad-st">
								<FormItem labelText="每户标清IPTV路数（路/户）：" :requiredIcon="false">
									<Input number v-model="broadData.standardDefinitIptyNum"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-fazhanyewu"><p>发展业务量</p></span>
							<Row class="broad-st">
								<Col :span="10" >
								<FormItem labelText="预估发展用户数(户）：" :requiredIcon="false">
									<Input number v-model="broadData.developUserNum"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-qian"><p>收入</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="预估用户月消费额(元/月户）：" :requiredIcon="false">
									<Input number v-model="broadData.userMonthlyAmount"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>
				<div class="broad-top2">
					<div class="broad-top-title"><span>成<br>本</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<Row class="broad-st title-top">
								<Col :span="10" >
								<FormItem labelText="单用户赠款(元）：" :requiredIcon="false">
									<Input number v-model="broadData.userGrant"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>
				<div class="broad-top3">
					<div class="broad-top-title"><span>收<br>益</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<span class="icondist iconfont icon-qian"><p>税前</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="预估总收入(元)：">
									<span class="orange" v-model="broadData.grossIncome">{{broadData.grossIncome}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="预估总成本(元）：">

									<span class="orange" v-model="broadData.totalCost">{{broadData.totalCost}}元</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="销售品预估毛利（元）：">

									<span class="orange" v-model="broadData.grossProfit">{{broadData.grossProfit}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="销售品预估毛利率（%）：">

									<span class="orange" v-model="broadData.grossRate">{{broadData.grossRate}}%</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-qian"><p>税后</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="预估总收入(元)：">

									<span class="orange" v-model="broadData.taxGrossIncome">{{broadData.taxGrossIncome}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="预估总成本(元）：">

									<span class="orange" v-model="broadData.taxTotalCost">{{broadData.taxTotalCost}}元</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="销售品预估毛利（元）：">

									<span class="orange" v-model="broadData.taxGrossProfit">{{broadData.taxGrossProfit}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="销售品预估毛利率（%）：">

									<span class="orange" v-model="broadData.taxGrossRate">{{broadData.taxGrossRate}}%</span>
								</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>

			</Form>
		</div>

		<div class="broad3">
			<Form labelWidth="220px" labelAlign="right" v-if="temData.templateType==30">
				<div class="broad-top">
					<div class="broad-top-title"><span>预<br>估</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<span class="icondist iconfont icon-jibenxinxi"><p>基础信息</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem  labelText="评估周期(月)：" :requiredIcon="false">
									<Input number v-model="fusionData.accessmentCycle"></Input>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st ">
								<Col :span="10">
								<FormItem labelText="餐内语音(分钟）：">
									<Input number name="voice" v-model="fusionData.voice"></Input>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="套餐内流量（GB）：">
									<Input number name="flow" v-model="fusionData.flow"></Input>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="每户固定电话数（路/户）：">
									<Input number name="fixedTelNum" v-model="fusionData.fixedTelNum"></Input>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="每户智能组网数（点/户）：">
									<Input number name="networkNum" v-model="fusionData.networkNum"></Input>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="每户标清IPTV路数（路/户）：" :requiredIcon="false">
									<Input number v-model="fusionData.standardDefinitIptyNum"></Input>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="每户非标清IPTV路数（路/户）：" :requiredIcon="false">
									<Input number v-model="fusionData.noStandardDefinitIptyNum"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-fazhanyewu"><p>发展业务量</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="预估发展用户数(户）：" :requiredIcon="false">
									<Input number v-model="fusionData.developUserNum"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-qian"><p>收入</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="预估用户月消费额(元/月户）：" :requiredIcon="false">
									<Input number v-model="fusionData.userMonthlyAmount"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>
				<div class="broad-top2">
					<div class="broad-top-title"><span>成<br>本</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<Row class="broad-st title-top">
								<Col :span="10">
								<FormItem labelText="单用户终端补贴(元/户）：" :requiredIcon="false">
									<Input number v-model="fusionData.userTeriminalSubsidy"></Input>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="单用户话费补贴(元/户）：" :requiredIcon="false">
									<Input number v-model="fusionData.userTravelSubsidy"></Input>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="单用户赠款(元/户）：" :requiredIcon="false">
									<Input number name="userGrant" v-model="fusionData.userGrant"></Input>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="组合销售品赠款(元/组）：" :requiredIcon="false">
									<Input number name="grpOfferGrant" v-model="fusionData.grpOfferGrant"></Input>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="单用户翼支付资源-成本类（元/户）：" :requiredIcon="false">
									<Input number name="userYzfzyCost" v-model="fusionData.userYzfzyCost"></Input>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="单用户翼支付资源-减收类(元/户）：" :requiredIcon="false">
									<Input number name="userYzfzyReduction" v-model="fusionData.userYzfzyReduction"></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>
				<div class="broad-top3">
					<div class="broad-top-title"><span>收<br>益</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<span class="icondist iconfont icon-qian"><p>税前</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="预估总收入(元)：">
									<span class="orange" v-model="fusionData.grossIncome">{{fusionData.grossIncome}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="预估总成本(元）：">

									<span class="orange" v-model="fusionData.totalCost">{{fusionData.totalCost}}元</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="销售品预估毛利（元）：">

									<span class="orange" v-model="fusionData.grossProfit">{{fusionData.grossProfit}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="销售品预估毛利率（%）：">

									<span class="orange" v-model="fusionData.grossRate">{{fusionData.grossRate}}%</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-qian"><p>税后</p></span>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="预估总收入(元)：">

									<span class="orange" v-model="fusionData.taxGrossIncome">{{fusionData.taxGrossIncome}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="预估总成本(元）：">

									<span class="orange" v-model="fusionData.taxTotalCost">{{fusionData.taxTotalCost}}元</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="10">
								<FormItem labelText="销售品预估毛利（元）：">

									<span class="orange" v-model="fusionData.taxGrossProfit">{{fusionData.taxGrossProfit}}元</span>
								</FormItem>
								</Col>
								<Col class="broad-st" :span="10">
								<FormItem labelText="销售品预估毛利率（%）：">

									<span class="orange" v-model="fusionData.taxGrossRate">{{fusionData.taxGrossRate}}%</span>
								</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</Form>
		</div>

		<!-- <span class="save" @click="addAttrNameSubmitDialog()">保存</span> -->
	</div>
</template>

<script type="text/javascript">
	export default{
		props: {
			componentData: {}
		},
		data(){
			return{
				offerId:'',
				offerTypeArray: [{
					label: '单移动套餐',
					value: '10'
				}, {
					label: '单宽带套餐',
					value: '20'
				}, {
					label: '融合套餐',
					value: '30'
				}],
				temData:{
					templateType:10
				},
				aloneData:{                   //单移动套餐
					templateType:10,
					accessmentCycle:'',
					flow:'',
					voice:'',
					userTravelSubsidy:'',  //单用户话费补贴
					userTravelSubsidyAll:'',  //话费补贴
					developUserNum:'',
					userMonthlyAmount:'',
					userTeriminalSubsidy:'',
					userTeriminalSubsidyAll:'',
					userYzfzyCost:'',
					userYzfzyCostAll:'',
					grossIncome:'',
					totalCost:'',
					grossProfit:'',
					grossRate:'',
					taxGrossIncome:'',
					taxTotalCost:'',
					taxGrossProfit:'',
					taxGrossRate:'',
					commission:'',         //佣金
					badDebts:'',           //坏账
					voicePro:'',           //省间语音结算净支出
					trafficPro:'',        //省间流量结算净支出
				},
				broadData:{                         //单宽带套餐
					accessmentCycle:'',
					networkNum:'',
					fixedTelNum:'',
					noStandardDefinitIptyNum:'',
					standardDefinitIptyNum:'',
					developUserNum:'',
					userMonthlyAmount:'',
					userGrant:'',
					grossIncome:'',
					totalCost:'',
					grossProfit:'',
					grossRate:'',
					taxGrossIncome:'',
					taxTotalCost:'',
					taxGrossProfit:'',
					taxGrossRate:'',
					odemCost:'',     //光猫成本
					iptvCost:'',     //IPTV机顶盒成本
					grant:'',        //赠款
					commission:'',     //佣金
					materialCharge:'',   //装移机工料费
					badDebtCost:'',       //坏账成本
					equipmentMaintenanceFee:'',  //设备维护费
					videoContentSettlement:'',  //视频内容结算费
				},
				fusionData:{             //融合
					accessmentCycle:'',
					voice:'',
					flow:'',
					fixedTelNum:'',
					networkNum:'',
					standardDefinitIptyNum:'',
					noStandardDefinitIptyNum:'',
					developUserNum:'',
					userMonthlyAmount:'',
					userTeriminalSubsidy:'',
					userTravelSubsidy:'',
					grant:'',        //赠款
					userGrant:'',
					grpOfferGrant:'',
					userYzfzyCost:'',
					userYzfzyReduction:'',
					grossIncome:'',
					taxGrossIncome:'',
					totalCost:'',
					taxTotalCost:'',
					grossProfit:'',
					taxGrossProfit:'',
					taxGrossRate:'',
					networkNumAll:'',
					userTeriminalSubsidyAll:'',
					userYzfzyReductionAll:'',
					userTravelSubsidyAll:'',  //话费补贴
					odemCost:'',     //光猫成本
					iptvCost:'',     //IPTV机顶盒成本
					materialCharge:'',   //装移机工料费
					equipmentMaintenanceFee:'',  //设备维护费
					videoContentSettlement:'',  //视频内容结算费
					userYzfzyCostAll:'',
					commission:'',
					badDebts:'',
				},
				canSelTemplateType:'false'//是否可选择套餐模板
			}
		},
		computed: {
			accessmentCycle() {
		　　　　return this.aloneData.accessmentCycle
		　　},
			developUserNum() {
		　　　　return this.aloneData.developUserNum
		　　},
			userMonthlyAmount() {
		　　　　return this.aloneData.userMonthlyAmount
		　　},
			//单用户话费补贴
			userTravelSubsidy(){
				return this.aloneData.userTravelSubsidy
			},
			//单用户终端补贴
			userTeriminalSubsidy(){
				return this.aloneData.userTeriminalSubsidy
			},
			//单用户翼支付资源-成本类
			userYzfzyCost(){
				return this.aloneData.userYzfzyCost
			},
			//话费补贴
			userTravelSubsidyAll(){
				return this.aloneData.userTravelSubsidyAll
			},
			//终端补贴
			userTeriminalSubsidyAll(){
				return this.aloneData.userTeriminalSubsidyAll
			},
			//翼支付资源
			userYzfzyCostAll(){
				return this.aloneData.userYzfzyCostAll
			},
			//佣金
			commission(){
				return this.aloneData.commission
			},
			//坏账
			badDebts(){
				return this.aloneData.badDebts
			},
			//预估总收入税前
			grossIncome(){
				return this.aloneData.grossIncome
			},
			//预估总收入税后
			taxGrossIncome(){
				return this.aloneData.taxGrossIncome
			},
			//预估总成本税前
			totalCost(){
				return this.aloneData.totalCost
			},
			//预估总成本税后
			taxTotalCost(){
				return this.aloneData.taxTotalCost
			},
			//预估销售品预估毛利
			grossProfit(){
				return this.aloneData.grossProfit
			},
			//预估销售品预估毛利税后
			taxGrossProfit(){
				return this.aloneData.taxGrossProfit
			},


			/*单宽带套餐*/
			accessmentCycle2(){
				return this.broadData.accessmentCycle
			},
			userMonthlyAmount2(){
				return this.broadData.userMonthlyAmount
			},
			developUserNum2(){
				return this.broadData.developUserNum
			},
			//每户宽带数
			fixedTelNum2(){
				return this.broadData.fixedTelNum
			},
			//标清路数
			standardDefinitIptyNum2(){
				return this.broadData.standardDefinitIptyNum
			},
			//非标清路数
			noStandardDefinitIptyNum2(){
				return this.broadData.noStandardDefinitIptyNum
			},
			//总增款
			grant2(){
				return this.broadData.grant
			},
			//赠款
			userGrant2(){
				return this.broadData.userGrant
			},
			//单宽带预估总收入税前
			grossIncome2(){
				return this.broadData.grossIncome
			},
			//单宽带预估总收入税后
			taxGrossIncome2(){
				return this.broadData.taxGrossIncome
			},
			//光猫成本
			odemCost2(){
				return this.broadData.odemCost
			},
			//IPTV机顶盒成本
			iptvCost2(){
				return this.broadData.iptvCost
			},
			//佣金
			commission2(){
				return this.broadData.commission
			},
			//装移机工料费
			materialCharge2(){
				return this.broadData.materialCharge
			},
			//坏账
			badDebts2(){
				return this.broadData.badDebts
			},
			//设备维护费
			equipmentMaintenanceFee2(){
				return this.broadData.equipmentMaintenanceFee
			},
			//视频内容结算费
			videoContentSettlement2(){
				return this.broadData.videoContentSettlement
			},
			//预估总成本税前
			totalCost2(){
				return this.broadData.totalCost
			},
			//预估总成本税后
			taxTotalCost2(){
				return this.broadData.taxTotalCost
			},
			//预估销售品预估毛利
			grossProfit2(){
				return this.broadData.grossProfit
			},
			//预估销售品预估毛利税后
			taxGrossProfit2(){
				return this.broadData.taxGrossProfit
			},



			/*融合*/
			accessmentCycle3() {
		　　　　return this.fusionData.accessmentCycle
		　　},
			developUserNum3() {
		　　　　return this.fusionData.developUserNum
		　　},
			userMonthlyAmount3() {
		　　　　return this.fusionData.userMonthlyAmount
		　　},
			//每户宽带数
			fixedTelNum3(){
				return this.fusionData.fixedTelNum
			},
			//标清路数
			standardDefinitIptyNum3(){
				return this.fusionData.standardDefinitIptyNum
			},
			//非标清路数
			noStandardDefinitIptyNum3(){
				return this.fusionData.noStandardDefinitIptyNum
			},
			//每户智能组网数
            networkNum3(){
            	return this.fusionData.networkNum
            },
            //单用户话费补贴
			userTravelSubsidy3(){
				return this.fusionData.userTravelSubsidy
			},
			//单用户终端补贴
			userTeriminalSubsidy3(){
				return this.fusionData.userTeriminalSubsidy
			},
			//赠款
			userGrant3(){
				return this.fusionData.userGrant
			},
			//单用户翼支付资源-成本类
			userYzfzyCost3(){
				return this.fusionData.userYzfzyCost
			},
			//单用户翼支付资源-减收类
			userYzfzyReduction3(){
				return this.fusionData.userYzfzyReduction
			},
			//话费补贴
			userTravelSubsidyAll3(){
				return this.fusionData.userTravelSubsidyAll
			},
			//终端补贴
			userTeriminalSubsidyAll3(){
				return this.fusionData.userTeriminalSubsidyAll
			},
			//翼支付资源
			userYzfzyCostAll3(){
				return this.fusionData.userYzfzyCostAll
			},
			//翼支付资源减收
			userYzfzyReductionAll3(){
				return this.fusionData.userYzfzyReductionAll
			},
			//佣金
			commission3(){
				return this.fusionData.commission
			},
			//坏账
			badDebts3(){
				return this.fusionData.badDebts
			},
			//光猫成本
			odemCost3(){
				return this.fusionData.odemCost
			},
			//IPTV机顶盒成本
			iptvCost3(){
				return this.fusionData.iptvCost
			},
			//装移机工料费
			materialCharge3(){
				return this.fusionData.materialCharge
			},
			//设备维护费
			equipmentMaintenanceFee3(){
				return this.fusionData.equipmentMaintenanceFee
			},
			//视频内容结算费
			videoContentSettlement3(){
				return this.fusionData.videoContentSettlement
			},
			//总增款
			grant3(){
				return this.fusionData.grant
			},
			//融合预估总收入税前
			grossIncome3(){
				return this.fusionData.grossIncome
			},
			//融合预估总收入税后
			taxGrossIncome3(){
				return this.fusionData.taxGrossIncome
			},
			//预估总成本税前
			totalCost3(){
				return this.fusionData.totalCost
			},
			//预估总成本税后
			taxTotalCost3(){
				return this.fusionData.taxTotalCost
			},
			//预估销售品预估毛利
			grossProfit3(){
				return this.fusionData.grossProfit
			},
			//预估销售品预估毛利税后
			taxGrossProfit3(){
				return this.fusionData.taxGrossProfit
			},
		},
		watch:{
            accessmentCycle(newValue){
            	//税前预估总收入
            	this.aloneData.grossIncome = (Number(newValue)*this.aloneData.developUserNum*this.aloneData.userMonthlyAmount).toFixed(2)
            	//税后预估总收入
            	this.aloneData.taxGrossIncome = ((Number(newValue)*this.aloneData.developUserNum*this.aloneData.userMonthlyAmount)/(1+0.0879)).toFixed(2)
            },
            //预估发展人数
            developUserNum(newValue){
            	//税前预估总收入
            	this.aloneData.grossIncome = (Number(newValue)*this.aloneData.accessmentCycle*this.aloneData.userMonthlyAmount).toFixed(2)
            	//税后预估总收入
            	this.aloneData.taxGrossIncome = ((Number(newValue)*this.aloneData.accessmentCycle*this.aloneData.userMonthlyAmount)/(1+0.0879)).toFixed(2)
            	//话费补贴
            	this.aloneData.userTravelSubsidyAll = Number(newValue)*this.aloneData.userTravelSubsidy
            	//console.log(this.aloneData.userTravelSubsidyAll,'///')
            	//终端补贴
            	this.aloneData.userTeriminalSubsidyAll = Number(newValue)*this.aloneData.userTeriminalSubsidy
            	//console.log(this.aloneData.userTeriminalSubsidyAll,'///')
            	//翼支付资源
            	this.aloneData.userYzfzyCostAll = Number(newValue)*this.aloneData.userYzfzyCost
            	//console.log(this.aloneData.userYzfzyCostAll,'///')

            },
            userMonthlyAmount(newValue){
            	//税前预估总收入
            	this.aloneData.grossIncome = (Number(newValue)*this.aloneData.accessmentCycle*this.aloneData.developUserNum).toFixed(2)
            	//税后预估总收入
            	this.aloneData.taxGrossIncome = ((Number(newValue)*this.aloneData.accessmentCycle*this.aloneData.developUserNum)/(1+0.0879)).toFixed(2)
            },
            //单用户话费补贴
            userTravelSubsidy(newValue){
            	this.aloneData.userTravelSubsidyAll = Number(newValue)*this.aloneData.developUserNum
            	//console.log(this.aloneData.userTravelSubsidyAll,'///')
            },
            //单用户终端补贴
            userTeriminalSubsidy(newValue){
            	this.aloneData.userTeriminalSubsidyAll = Number(newValue)*this.aloneData.developUserNum
            	//console.log(this.aloneData.userTeriminalSubsidyAll)
            },
            //翼支付资源
            userYzfzyCost(newValue){
            	this.aloneData.userYzfzyCostAll = Number(newValue)*this.aloneData.developUserNum
            	//console.log(this.aloneData.userYzfzyCostAll)
            },
            //话费补贴
			userTravelSubsidyAll(newValue){
				//税前总成本
				this.aloneData.totalCost = (Number(newValue)+this.aloneData.userTeriminalSubsidyAll+this.aloneData.userYzfzyCostAll+this.aloneData.commission+this.aloneData.badDebts+(this.aloneData.grossIncome*0.0123+this.aloneData.grossIncome*0.017)).toFixed(2)
				//税后总成本
				this.aloneData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.aloneData.userTeriminalSubsidyAll)/(1+0.0879)+this.aloneData.userYzfzyCostAll+(this.aloneData.commission)/(1+0.06)+(this.aloneData.badDebts)/(1+0.0879)+((this.aloneData.grossIncome*0.0123)/(1+0.11)+(this.aloneData.grossIncome*0.017)/(1+0.06))).toFixed(2)
				/*console.log(this.aloneData.taxTotalCost,'///')
				console.log((Number(newValue)),'/1')
				console.log((this.aloneData.userTeriminalSubsidyAll),'/2')
				console.log(this.aloneData.userYzfzyCostAll,'/3')
				console.log((this.aloneData.commission),'/3.5')
				console.log((this.aloneData.badDebts),'/4')
				console.log((this.aloneData.grossIncome*0.0123),'/5')
				console.log((this.aloneData.grossIncome*0.017),'/6')*/
			},
			//终端补贴
			userTeriminalSubsidyAll(newValue){
				this.aloneData.totalCost = (Number(newValue)+this.aloneData.userYzfzyCostAll+this.aloneData.userTravelSubsidyAll+this.aloneData.badDebts+this.aloneData.commission+(this.aloneData.grossIncome*0.0123+this.aloneData.grossIncome*0.017)).toFixed(2)
				//税后
				this.aloneData.taxTotalCost = ((Number(newValue))/(1+0.0879)+this.aloneData.userYzfzyCostAll+(this.aloneData.userTravelSubsidyAll)/(1+0.17)+(this.aloneData.badDebts)/(1+0.0879)+(this.aloneData.commission)/(1+0.06)+((this.aloneData.grossIncome*0.0123)/(1+0.11)+(this.aloneData.grossIncome*0.017)/(1+0.06))).toFixed(2)
			},
			//翼支付资源总额
			userYzfzyCostAll(newValue){
				this.aloneData.totalCost = (Number(newValue)+this.aloneData.userTravelSubsidyAll+this.aloneData.userTeriminalSubsidyAll+this.aloneData.badDebts+this.aloneData.commission+(this.aloneData.grossIncome*0.0123+this.aloneData.grossIncome*0.017)).toFixed(2)
				//税后
				this.aloneData.taxTotalCost = (Number(newValue)+(this.aloneData.userTravelSubsidyAll)/(1+0.17)+(this.aloneData.userTeriminalSubsidyAll)/(1+0.0879)+(this.aloneData.badDebts)/(1+0.0879)+(this.aloneData.commission)/(1+0.06)+((this.aloneData.grossIncome*0.0123)/(1+0.11)+(this.aloneData.grossIncome*0.017)/(1+0.06))).toFixed(2)
			},
			//佣金
			commission(newValue){
				if (newValue=='') {

				} else {
					this.aloneData.totalCost = (Number(newValue)+this.aloneData.userTravelSubsidyAll+this.aloneData.userTeriminalSubsidyAll+this.aloneData.badDebts+this.aloneData.userYzfzyCostAll+(this.aloneData.grossIncome*0.0123+this.aloneData.grossIncome*0.017)).toFixed(2)
					//税后
					this.aloneData.taxTotalCost = ((Number(newValue))/(1+0.06)+(this.aloneData.userTravelSubsidyAll)/(1+0.17)+(this.aloneData.userTeriminalSubsidyAll)/(1+0.0879)+(this.aloneData.badDebts)/(1+0.0879)+this.aloneData.userYzfzyCostAll+((this.aloneData.grossIncome*0.0123)/(1+0.11)+(this.aloneData.grossIncome*0.017)/(1+0.06))).toFixed(2)
					}

			},
			//坏账
			badDebts(newValue){
				if (newValue=='') {

				} else {
					this.aloneData.totalCost = (Number(newValue)+this.aloneData.userTravelSubsidyAll+this.aloneData.userTeriminalSubsidyAll+this.aloneData.userYzfzyCostAll+this.aloneData.commission+(this.aloneData.grossIncome*0.0123+this.aloneData.grossIncome*0.017)).toFixed(2)
					//税后
					this.aloneData.taxTotalCost = ((Number(newValue))/(1+0.0879)+(this.aloneData.userTravelSubsidyAll)/(1+0.17)+(this.aloneData.userTeriminalSubsidyAll)/(1+0.0879)+this.aloneData.userYzfzyCostAll+(this.aloneData.commission)/(1+0.06)+((this.aloneData.grossIncome*0.0123)/(1+0.11)+(this.aloneData.grossIncome*0.017)/(1+0.06))).toFixed(2)
				}

			},
            //预估总收入税前
            grossIncome(newValue){
            	//佣金计算
            	this.aloneData.commission = Number(newValue)*0.0264
            	//console.log(this.aloneData.commission)
            	//坏账
            	this.aloneData.badDebts = Number(newValue)*0.0087
            	//console.log(this.aloneData.badDebts)
            	//省间语音结算净支出
            	this.aloneData.voicePro = Number(newValue)*0.0123
            	//console.log(this.aloneData.voicePro)
            	//省间流量结算净支出
            	this.aloneData.trafficPro = Number(newValue)*0.017
            	//console.log(this.aloneData.trafficPro)
            	//税前毛利
            	this.aloneData.grossProfit = (Number(newValue)-this.aloneData.totalCost).toFixed(2)
            	//毛利率
            	this.aloneData.grossRate = (this.aloneData.grossProfit/Number(newValue)).toFixed(2)
            },
            //预估总收入税后
			taxGrossIncome(newValue){
				//税后毛利率
				this.aloneData.taxGrossRate = (this.aloneData.taxGrossProfit/Number(newValue)).toFixed(2)
			},
            //预估总成本税前
			totalCost(newValue){
				//console.log(newValue,'预估总成本税前')
				this.aloneData.grossProfit = (this.aloneData.grossIncome-Number(newValue)).toFixed(2)
			},
			//预估总成本税后
			taxTotalCost(newValue){
				this.aloneData.taxGrossProfit = (this.aloneData.taxGrossIncome - Number(newValue)).toFixed(2)
			},
			//预估销售品预估毛利
			grossProfit(newValue){
				this.aloneData.grossRate = (Number(newValue)/this.aloneData.grossIncome).toFixed(2)*100
			},
			//预估销售品预估毛利税后
			taxGrossProfit(newValue){
				//税后毛利率
				this.aloneData.taxGrossRate = (Number(newValue)/this.aloneData.taxGrossIncome).toFixed(2)*100
			},


			/*单宽带套餐*/
			//评估周期
			accessmentCycle2(newValue){
            	//税前预估总收入
            	this.broadData.grossIncome = (Number(newValue)*this.broadData.developUserNum*this.broadData.userMonthlyAmount).toFixed(2)
            	//税后预估总收入
            	this.broadData.taxGrossIncome = ((Number(newValue)*this.broadData.developUserNum*this.broadData.userMonthlyAmount)/(1+0.0879)).toFixed(2)
            	//设备维护费
            	/*this.broadData.equipmentMaintenanceFee = Number(newValue)*10*this.broadData.developUserNum+Number(newValue)*10*this.broadData.developUserNum+Number(newValue)*10*this.broadData.developUserNum*/
            },

            //标清路数
			standardDefinitIptyNum2(newValue){
				//console.log(newValue,'标清路数')
				//视频内容结算费
            	this.broadData.videoContentSettlement = Number(newValue)*10*this.broadData.developUserNum+Number(newValue)*10*this.broadData.noStandardDefinitIptyNum
            	//IPTV机顶盒成本
            	this.broadData.iptvCost = 180*this.broadData.developUserNum*0.05*(Number(newValue)+Number(this.broadData.noStandardDefinitIptyNum))
            	//console.log(this.broadData.iptvCost,'/')
            	//设备维护费
            	this.broadData.equipmentMaintenanceFee = this.broadData.developUserNum*10*this.broadData.accessmentCycle+Number(newValue)*10*this.broadData.accessmentCycle+(Number(newValue)+Number(this.broadData.noStandardDefinitIptyNum))*10*this.broadData.accessmentCycle
			},
			//非标清路数
			noStandardDefinitIptyNum2(newValue){
				//视频内容结算费
            	this.broadData.videoContentSettlement = Number(newValue)*10*this.broadData.developUserNum+Number(newValue)*10*this.broadData.standardDefinitIptyNum
            	//IPTV机顶盒成本
            	this.broadData.iptvCost = 180*this.broadData.developUserNum*0.05*(Number(newValue)+Number(this.broadData.standardDefinitIptyNum))
            	//设备维护费
            	this.broadData.equipmentMaintenanceFee = this.broadData.developUserNum*10*this.broadData.accessmentCycle+Number(newValue)*10*this.broadData.accessmentCycle+(Number(this.broadData.standardDefinitIptyNum)+Number(newValue))*10*this.broadData.accessmentCycle
			},
            //预估用户月消费额
            userMonthlyAmount2(newValue){
            	//console.log(newValue,'预估用户月消费额')
            	//税前预估总收入
            	this.broadData.grossIncome = (Number(newValue)*Number(this.broadData.accessmentCycle)*Number(this.broadData.developUserNum)).toFixed(2)
            	//税后预估总收入
            	this.broadData.taxGrossIncome = ((Number(newValue)*Number(this.broadData.accessmentCycle)*Number(this.broadData.developUserNum))/(1+0.0879)).toFixed(2)
            },
            //光猫成本
			odemCost2(newValue){
				//税前预估总成本
            	this.broadData.totalCost = (Number(newValue)+this.broadData.iptvCost+this.broadData.grant+this.broadData.commission+this.broadData.materialCharge+this.broadData.badDebts+this.broadData.equipmentMaintenanceFee+this.broadData.videoContentSettlement).toFixed(2)
            	/*console.log(Number(newValue),'光猫成本1')
            	console.log(this.broadData.iptvCost,'光猫成本2')
            	console.log(this.broadData.grant,'光猫成本3')
            	console.log(this.broadData.commission,'光猫成本4')
            	console.log(this.broadData.materialCharge,'光猫成本5')
            	console.log(this.broadData.badDebts,'光猫成本6')
            	console.log(this.broadData.equipmentMaintenanceFee,'光猫成本7')
            	console.log(this.broadData.videoContentSettlement,'光猫成本8')*/


            	//税后预估总成本
            	this.broadData.taxTotalCost = (Number(newValue)/(1+0.17)+this.broadData.iptvCost/(1+0.17)+this.broadData.grant/(1+0.0879)+this.broadData.commission/(1+0.06)+this.broadData.materialCharge/(1+0.0627)+this.broadData.badDebts/(1+0.0879)+this.broadData.equipmentMaintenanceFee/(1+0.06)+this.broadData.videoContentSettlement/(1+0.06)).toFixed(2)
			},
			//IPTV机顶盒成本
			iptvCost2(newValue){
				//税前预估总成本
				if (newValue=='') {

				} else {
					this.broadData.totalCost = (Number(newValue)+this.broadData.odemCost+this.broadData.grant+this.broadData.commission+this.broadData.materialCharge+this.broadData.badDebts+this.broadData.equipmentMaintenanceFee+this.broadData.videoContentSettlement).toFixed(2)
	            	//税后预估总成本
	            	this.broadData.taxTotalCost = (Number(newValue)/(1+0.17)+this.broadData.odemCost/(1+0.17)+this.broadData.grant/(1+0.0879)+this.broadData.commission/(1+0.06)+this.broadData.materialCharge/(1+0.0627)+this.broadData.badDebts/(1+0.0879)+this.broadData.equipmentMaintenanceFee/(1+0.06)+this.broadData.videoContentSettlement/(1+0.06)).toFixed(2)
				}

			},
			//佣金
			commission2(newValue){
				//税前预估总成本
				if (newValue == '') {

				} else {
					this.broadData.totalCost = (Number(newValue)+this.broadData.iptvCost+this.broadData.grant+this.broadData.odemCost+this.broadData.materialCharge+this.broadData.badDebts+this.broadData.equipmentMaintenanceFee+this.broadData.videoContentSettlement).toFixed(2)

	            	//税后预估总成本
	            	this.broadData.taxTotalCost = ((Number(newValue)/(1+0.06)+this.broadData.odemCost/(1+0.17)+this.broadData.grant/(1+0.0879)+this.broadData.iptvCost/(1+0.17)+this.broadData.materialCharge/(1+0.0627)+this.broadData.badDebts/(1+0.0879)+this.broadData.equipmentMaintenanceFee/(1+0.06)+this.broadData.videoContentSettlement/(1+0.06))).toFixed(2)
				}

            	/*console.log(Number(newValue)/(1+0.06),'光猫成本1')
            	console.log(this.broadData.odemCost/(1+0.17),'光猫成本2')
            	console.log(this.broadData.grant/(1+0.0879),'光猫成本3')
            	console.log(this.broadData.iptvCost/(1+0.17),'光猫成本4')
            	console.log(this.broadData.materialCharge/(1+0.0627),'光猫成本5')
            	console.log(this.broadData.badDebts/(1+0.0879),'光猫成本6')
            	console.log(this.broadData.equipmentMaintenanceFee/(1+0.06),'光猫成本7')
            	console.log(this.broadData.videoContentSettlement/(1+0.06),'光猫成本8')*/
			},
			//装移机工料费
			materialCharge2(newValue){
				//税前预估总成本
            	this.broadData.totalCost = (Number(newValue)+this.broadData.iptvCost+this.broadData.grant+this.broadData.commission+this.broadData.odemCost+this.broadData.badDebts+this.broadData.equipmentMaintenanceFee+this.broadData.videoContentSettlement).toFixed(2)

            	//税后预估总成本
            	this.broadData.taxTotalCost = (Number(newValue)/(1+0.0627)+this.broadData.odemCost/(1+0.17)+this.broadData.grant/(1+0.0879)+this.broadData.iptvCost/(1+0.17)+this.broadData.commission/(1+0.06)+this.broadData.badDebts/(1+0.0879)+this.broadData.equipmentMaintenanceFee/(1+0.06)+this.broadData.videoContentSettlement/(1+0.06)).toFixed(2)
			},
			//坏账
			badDebts2(newValue){
				//税前预估总成本
				if (newValue == '') {

				} else {
					this.broadData.totalCost = (Number(newValue)+this.broadData.iptvCost+this.broadData.grant+this.broadData.commission+this.broadData.materialCharge+this.broadData.odemCost+this.broadData.equipmentMaintenanceFee+this.broadData.videoContentSettlement).toFixed(2)
	            	//税后预估总成本
	            	this.broadData.taxTotalCost = (Number(newValue)/(1+0.0879)+this.broadData.odemCost/(1+0.17)+this.broadData.grant/(1+0.0879)+this.broadData.iptvCost/(1+0.17)+this.broadData.commission/(1+0.06)+this.broadData.materialCharge/(1+0.0627)+this.broadData.equipmentMaintenanceFee/(1+0.06)+this.broadData.videoContentSettlement/(1+0.06)).toFixed(2)
				}

			},
			//设备维护费
			equipmentMaintenanceFee2(newValue){
				//税前预估总成本
				if (newValue=='') {

				} else {
					this.broadData.totalCost = (Number(newValue)+this.broadData.iptvCost+this.broadData.grant+this.broadData.commission+this.broadData.materialCharge+this.broadData.badDebts+this.broadData.odemCost+this.broadData.videoContentSettlement).toFixed(2)
	            	//税后预估总成本
	            	this.broadData.taxTotalCost = ((Number(newValue)/(1+0.06)+this.broadData.odemCost/(1+0.17)+this.broadData.grant/(1+0.0879)+this.broadData.iptvCost/(1+0.17)+this.broadData.commission/(1+0.06)+this.broadData.badDebts/(1+0.0879)+this.broadData.materialCharge/(1+0.0627)+this.broadData.videoContentSettlement/(1+0.06))).toFixed(2)
				}

			},
			//视频内容结算费
			videoContentSettlement2(newValue){
				//税前预估总成本
            	this.broadData.totalCost = (Number(newValue)+this.broadData.iptvCost+this.broadData.grant+this.broadData.commission+this.broadData.materialCharge+this.broadData.odemCost+this.broadData.equipmentMaintenanceFee+this.broadData.badDebts).toFixed(2)
            	//税后预估总成本
            	this.broadData.taxTotalCost = ((Number(newValue)/(1+0.06)+this.broadData.odemCost/(1+0.17)+this.broadData.grant/(1+0.0879)+this.broadData.iptvCost/(1+0.17)+this.broadData.commission/(1+0.06)+this.broadData.badDebts/(1+0.0879)+this.broadData.materialCharge/(1+0.0627)+this.broadData.equipmentMaintenanceFee/(1+0.06))).toFixed(2)
			},
			//单用户赠款
            userGrant2(newValue){
            	//console.log(newValue)
            	this.broadData.grant = this.broadData.developUserNum*Number(newValue)
            	console.log(this.broadData.grant)

            },
			//总赠款
            grant2(newValue){
            	//税前预估总成本
            	this.broadData.totalCost = (Number(newValue)+this.broadData.iptvCost+this.broadData.videoContentSettlement+this.broadData.commission+this.broadData.materialCharge+this.broadData.badDebts+this.broadData.equipmentMaintenanceFee+this.broadData.odemCost).toFixed(2)
            	//console.log(this.broadData.totalCost,'....')
            	//税后预估总成本
            	this.broadData.taxTotalCost = ((Number(newValue)/(1+0.0879)+this.broadData.odemCost/(1-0.17)+this.broadData.videoContentSettlement/(1+0.06)+this.broadData.iptvCost/(1+0.17)+this.broadData.commission/(1+0.06)+this.broadData.badDebts/(1+0.0879)+this.broadData.materialCharge/(1+0.0627)+this.broadData.equipmentMaintenanceFee/(1+0.06))).toFixed(2)
            },
            //单宽带预估总收入税前
			grossIncome2(newValue,old){
				//佣金
				this.broadData.commission = Number(newValue)*0.0264
				//console.log(newValue,'./..')
				//console.log(this.broadData.commission,'./.')
				//坏账成本
				this.broadData.badDebts = Number(newValue)*0.0045
				//console.log(this.broadData.badDebts)
				//销售品预估毛利
				if (old!='') {
					this.broadData.grossProfit = (Number(newValue)-this.broadData.totalCost).toFixed(2)
					//console.log(this.broadData.grossProfit)
					//销售品预估毛利率
					this.broadData.grossRate = (this.broadData.grossProfit/Number(newValue)).toFixed(2)
				}
			},
			//单宽带预估总收入税后
			taxGrossIncome2(newValue){
				//销售品预估毛利
				this.broadData.taxGrossProfit = (Number(newValue)-this.broadData.taxTotalCost).toFixed(2)
				//console.log(this.broadData.taxGrossProfit)
				//销售品预估毛利率
				this.broadData.taxGrossRate = (this.broadData.taxGrossProfit/Number(newValue)).toFixed(2)
			},
			//预估发展人数
            developUserNum2(newValue){
            	//console.log(this.broadData.grossIncome,'--1--')
            	//税前预估总收入
            	this.broadData.grossIncome = (Number(newValue)*this.broadData.accessmentCycle*this.broadData.userMonthlyAmount).toFixed(2)
            	//console.log(this.broadData.totalCost,'--2--')
            	//console.log(this.broadData.commission,'----')
            	//税后预估总收入
            	this.broadData.taxGrossIncome = ((Number(newValue)*this.broadData.accessmentCycle*this.broadData.userMonthlyAmount)/(1+0.0879)).toFixed(2)
            	//光猫成本
            	this.broadData.odemCost = 200*Number(newValue)*0.05
            	//console.log(this.broadData.odemCost)
            	//IPTV机顶盒成本
            	this.broadData.iptvCost = 180*Number(newValue)*0.05*(Number(this.broadData.standardDefinitIptyNum)+Number(this.broadData.noStandardDefinitIptyNum))
            	//赠款
            	this.broadData.grant = this.broadData.userGrant*Number(newValue)
            	//console.log(this.broadData.grant,'赠款')
            	//销售品装移机工料费
            	this.broadData.materialCharge = Number(newValue)*300*0.05+Number(newValue)*0*0.05+Number(newValue)*160*0.05
            	//设备维护费
            	this.broadData.equipmentMaintenanceFee = Number(newValue)*10*(this.broadData.accessmentCycle)+Number(newValue)*10*this.broadData.accessmentCycle+(Number(this.broadData.standardDefinitIptyNum)+Number(this.broadData.noStandardDefinitIptyNum))*10*this.broadData.accessmentCycle*Number(newValue)

            	//视频内容结算费
            	this.broadData.videoContentSettlement = Number(newValue)*10*this.broadData.standardDefinitIptyNum+this.broadData.developUserNum*10*this.broadData.noStandardDefinitIptyNum

            },
            //预估销售品预估毛利
			grossProfit2(newValue){
				this.broadData.grossRate = (Number(newValue)/this.broadData.grossIncome).toFixed(2)*100
			},
			//预估销售品预估毛利税后
			taxGrossProfit2(newValue){
				//税后毛利率
				this.broadData.taxGrossRate = (Number(newValue)/this.broadData.taxGrossIncome).toFixed(2)*100
			},
			//预估总成本税前
			totalCost2(newValue){
				//console.log(newValue,'预估总成本税前')
				this.broadData.grossProfit = (this.broadData.grossIncome-Number(newValue)).toFixed(2)
			},
			//预估总成本税后
			taxTotalCost2(newValue){
				this.broadData.taxGrossProfit = (this.broadData.taxGrossIncome - Number(newValue)).toFixed(2)
			},




			/*融合*/
			accessmentCycle3(newValue){
            	//税前预估总收入
            	this.fusionData.grossIncome = (Number(newValue)*this.fusionData.developUserNum*this.fusionData.userMonthlyAmount).toFixed(2)
            	//税后预估总收入
            	this.fusionData.taxGrossIncome = ((Number(newValue)*this.fusionData.developUserNum*this.fusionData.userMonthlyAmount)/(1+0.0879)).toFixed(2)
            },
            //预估发展人数
            developUserNum3(newValue){
            	//税前预估总收入
            	this.fusionData.grossIncome = (Number(newValue)*this.fusionData.accessmentCycle*this.fusionData.userMonthlyAmount).toFixed(2)
            	//税后预估总收入
            	this.fusionData.taxGrossIncome = ((Number(newValue)*this.fusionData.accessmentCycle*this.fusionData.userMonthlyAmount)/(1+0.0879)).toFixed(2)
            	//话费补贴
            	this.fusionData.userTravelSubsidyAll = Number(newValue)*this.fusionData.userTravelSubsidy
            	//console.log(this.fusionData.userTravelSubsidyAll,'///')
            	//终端补贴
            	this.fusionData.userTeriminalSubsidyAll = Number(newValue)*this.fusionData.userTeriminalSubsidy
            	//console.log(this.fusionData.userTeriminalSubsidyAll,'///')
            	//翼支付资源
            	this.fusionData.userYzfzyCostAll = Number(newValue)*this.fusionData.userYzfzyCost
            	//翼支付资源
            	this.fusionData.userYzfzyReductionAll = Number(newValue)*this.fusionData.userYzfzyReduction
            	//console.log(this.fusionData.userYzfzyReductionAll,'///')

            	//光猫成本
            	this.fusionData.odemCost = 200*Number(newValue)*0.19
            	//console.log(this.fusionData.odemCost)
            	//IPTV机顶盒成本
            	this.fusionData.iptvCost = 180*Number(newValue)*0.19*(Number(this.fusionData.standardDefinitIptyNum)+Number(this.fusionData.noStandardDefinitIptyNum))
            	//赠款
            	this.fusionData.grant = this.fusionData.userGrant*Number(newValue)
            	//console.log(this.fusionData.grant,'赠款')
            	//销售品装移机工料费
            	this.fusionData.materialCharge = Number(newValue)*10*0.19+Number(newValue)*10*0.19+Number(newValue)*10*0.19
            	//设备维护费
            	this.fusionData.equipmentMaintenanceFee = Number(newValue)*10*(this.fusionData.accessmentCycle)+Number(newValue)*10*this.fusionData.accessmentCycle+(Number(this.fusionData.standardDefinitIptyNum)+Number(this.fusionData.noStandardDefinitIptyNum))*10*this.fusionData.accessmentCycle*Number(newValue)

            	//视频内容结算费
            	this.fusionData.videoContentSettlement = Number(newValue)*10*this.fusionData.standardDefinitIptyNum+this.fusionData.developUserNum*10*this.fusionData.noStandardDefinitIptyNum

            },
            /*userMonthlyAmount3(newValue){
            	//税前预估总收入
            	this.fusionData.grossIncome = (Number(newValue)*this.fusionData.accessmentCycle*this.fusionData.developUserNum).toFixed(2)
            	//税后预估总收入
            	this.fusionData.taxGrossIncome = ((Number(newValue)*this.fusionData.accessmentCycle*this.fusionData.developUserNum)/(1+0.0879)).toFixed(2)
            },*/
            //单用户话费补贴
            userTravelSubsidy3(newValue){
            	this.fusionData.userTravelSubsidyAll = Number(newValue)*this.fusionData.developUserNum
            	//console.log(this.fusionData.userTravelSubsidyAll,'///')
            },
            //单用户终端补贴
            userTeriminalSubsidy3(newValue){
            	this.fusionData.userTeriminalSubsidyAll = Number(newValue)*this.fusionData.developUserNum
            	//console.log(this.fusionData.userTeriminalSubsidyAll)
            },
            //翼支付资源
            userYzfzyCost3(newValue){
            	this.fusionData.userYzfzyCostAll = Number(newValue)*this.fusionData.developUserNum
            	//console.log(this.fusionData.userYzfzyCostAll)
            },
            //翼支付资源减收类
            userYzfzyReduction3(newValue){
            	this.fusionData.userYzfzyReductionAll = Number(newValue)*this.fusionData.developUserNum
            	//console.log(this.fusionData.userYzfzyReductionAll)
            },
            //话费补贴
			userTravelSubsidyAll3(newValue){
				//税前总成本
				this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTeriminalSubsidyAll+this.fusionData.userYzfzyReductionAll+this.fusionData.userYzfzyCostAll+this.fusionData.commission+this.fusionData.badDebts+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.odemCost+this.fusionData.iptvCost+this.fusionData.grant+this.fusionData.materialCharge+this.fusionData.equipmentMaintenanceFee+this.fusionData.videoContentSettlement)).toFixed(2)

				//税后总成本
				this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTeriminalSubsidyAll)/(1+0.17)+this.fusionData.userYzfzyCostAll+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+(this.fusionData.odemCost/(1+0.17)+this.fusionData.iptvCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.commission/(1+0.06)+this.fusionData.materialCharge/(1+0.0627)+this.fusionData.badDebts/(1+0.0879)+this.fusionData.equipmentMaintenanceFee/(1+0.06)+this.fusionData.videoContentSettlement/(1+0.06))).toFixed(2)
				/*console.log((Number(newValue)),'/1')
				console.log((this.fusionData.userTeriminalSubsidyAll),'/2')
				console.log(this.fusionData.userYzfzyCostAll,'/3')
				console.log((this.fusionData.commission),'/3.5')
				console.log((this.fusionData.badDebts),'/4')
				console.log((this.fusionData.grossIncome*0.0008),'/5')
				console.log((this.fusionData.grossIncome*0.0054),'/6')
				console.log((this.fusionData.grossIncome*0.0099),'/6.5')
				console.log((this.fusionData.odemCost),'/7')
				console.log((this.fusionData.iptvCost),'/8')
				console.log((this.fusionData.grant),'/9')
				console.log((this.fusionData.materialCharge),'/10')
				console.log((this.fusionData.equipmentMaintenanceFee),'/11')
				console.log((this.fusionData.videoContentSettlement),'/12')*/
			},
			//终端补贴
			userTeriminalSubsidyAll3(newValue){
				this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userYzfzyReductionAll+this.fusionData.userYzfzyCostAll+this.fusionData.commission+this.fusionData.badDebts+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.odemCost+this.fusionData.iptvCost+this.fusionData.grant+this.fusionData.materialCharge+this.fusionData.equipmentMaintenanceFee+this.fusionData.videoContentSettlement)).toFixed(2)
				//税后
				this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+this.fusionData.userYzfzyCostAll+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.odemCost/(1+0.17)+this.fusionData.iptvCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.commission/(1+0.06)+this.fusionData.materialCharge/(1+0.0627)+this.fusionData.badDebts/(1+0.0879)+this.fusionData.equipmentMaintenanceFee/(1+0.06)+this.fusionData.videoContentSettlement/(1+0.06))).toFixed(2)
			},
			//翼支付资源总额
			userYzfzyCostAll3(newValue){
				this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userTeriminalSubsidyAll+this.fusionData.commission+this.fusionData.userYzfzyReductionAll+this.fusionData.badDebts+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.odemCost+this.fusionData.iptvCost+this.fusionData.grant+this.fusionData.materialCharge+this.fusionData.equipmentMaintenanceFee+this.fusionData.videoContentSettlement)).toFixed(2)
				//税后
				this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+this.fusionData.userTeriminalSubsidyAll+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.odemCost/(1+0.17)+this.fusionData.iptvCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.commission/(1+0.06)+this.fusionData.materialCharge/(1+0.0627)+this.fusionData.badDebts/(1+0.0879)+this.fusionData.equipmentMaintenanceFee/(1+0.06)+this.fusionData.videoContentSettlement/(1+0.06))).toFixed(2)
			},
			//翼支付资源总额减收
			userYzfzyReductionAll3(newValue){
				//console.log('/////')
				this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userYzfzyCostAll+this.fusionData.userTeriminalSubsidyAll+this.fusionData.commission+this.fusionData.badDebts+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.odemCost+this.fusionData.iptvCost+this.fusionData.grant+this.fusionData.materialCharge+this.fusionData.equipmentMaintenanceFee+this.fusionData.videoContentSettlement)).toFixed(2)
				//税后
				this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.0879)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+(this.fusionData.userYzfzyCostAll)/(1+0.17)+this.fusionData.userTeriminalSubsidyAll+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.odemCost/(1+0.17)+this.fusionData.iptvCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.commission/(1+0.06)+this.fusionData.materialCharge/(1+0.0627)+this.fusionData.badDebts/(1+0.0879)+this.fusionData.equipmentMaintenanceFee/(1+0.06)+this.fusionData.videoContentSettlement/(1+0.06))).toFixed(2)
			},
			//佣金
			commission3(newValue){
				if (newValue == '') {

				} else {
					this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userYzfzyReductionAll+this.fusionData.userTeriminalSubsidyAll+this.fusionData.userYzfzyCostAll+this.fusionData.badDebts+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.odemCost+this.fusionData.iptvCost+this.fusionData.grant+this.fusionData.materialCharge+this.fusionData.equipmentMaintenanceFee+this.fusionData.videoContentSettlement)).toFixed(2)
					//税后
					this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+this.fusionData.userTeriminalSubsidyAll+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.odemCost/(1+0.17)+this.fusionData.iptvCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.userYzfzyCostAll/(1+0.06)+this.fusionData.materialCharge/(1+0.0627)+this.fusionData.badDebts/(1+0.0879)+this.fusionData.equipmentMaintenanceFee/(1+0.06)+this.fusionData.videoContentSettlement/(1+0.06))).toFixed(2)
				}

			},
			//坏账
			badDebts3(newValue){
				if (newValue=='') {

				} else {
					this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userYzfzyReductionAll+this.fusionData.userTeriminalSubsidyAll+this.fusionData.userYzfzyCostAll+this.fusionData.commission+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.odemCost+this.fusionData.iptvCost+this.fusionData.grant+this.fusionData.materialCharge+this.fusionData.equipmentMaintenanceFee+this.fusionData.videoContentSettlement)).toFixed(2)
					//税后
					this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+this.fusionData.userTeriminalSubsidyAll+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.odemCost/(1+0.17)+this.fusionData.iptvCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.userYzfzyCostAll/(1+0.06)+this.fusionData.materialCharge/(1+0.0627)+this.fusionData.commission/(1+0.0879)+this.fusionData.equipmentMaintenanceFee/(1+0.06)+this.fusionData.videoContentSettlement/(1+0.06))).toFixed(2)
				}

			},


			//标清路数
			standardDefinitIptyNum3(newValue){
				//console.log(newValue,'标清路数')
				//视频内容结算费
            	this.fusionData.videoContentSettlement = Number(newValue)*10*this.fusionData.developUserNum+Number(newValue)*10*this.fusionData.noStandardDefinitIptyNum
            	//IPTV机顶盒成本
            	this.fusionData.iptvCost = 180*this.fusionData.developUserNum*0.19*(Number(newValue)+Number(this.fusionData.noStandardDefinitIptyNum))
            	//console.log(this.fusionData.iptvCost,'/')
            	//设备维护费
            	this.fusionData.equipmentMaintenanceFee = this.fusionData.developUserNum*10*this.fusionData.accessmentCycle+Number(newValue)*10*this.fusionData.accessmentCycle+(Number(newValue)+Number(this.fusionData.noStandardDefinitIptyNum))*10*this.fusionData.accessmentCycle
			},
			//非标清路数
			noStandardDefinitIptyNum3(newValue){
				//视频内容结算费
            	this.fusionData.videoContentSettlement = Number(newValue)*10*this.fusionData.developUserNum+Number(newValue)*10*this.fusionData.standardDefinitIptyNum
            	//IPTV机顶盒成本
            	this.fusionData.iptvCost = 180*this.fusionData.developUserNum*0.19*(Number(newValue)+Number(this.fusionData.standardDefinitIptyNum))
            	//设备维护费
            	this.fusionData.equipmentMaintenanceFee = this.fusionData.developUserNum*10*this.fusionData.accessmentCycle+Number(newValue)*10*this.fusionData.accessmentCycle+(Number(this.fusionData.standardDefinitIptyNum)+Number(newValue))*10*this.fusionData.accessmentCycle
			},
            //预估用户月消费额
            userMonthlyAmount3(newValue){
            	//console.log(newValue,'预估用户月消费额')
            	//税前预估总收入
            	this.fusionData.grossIncome = (Number(newValue)*Number(this.fusionData.accessmentCycle)*Number(this.fusionData.developUserNum)).toFixed(2)
            	//税后预估总收入
            	this.fusionData.taxGrossIncome = ((Number(newValue)*Number(this.fusionData.accessmentCycle)*Number(this.fusionData.developUserNum))/(1+0.0879)).toFixed(2)
            },
            //光猫成本
			odemCost3(newValue){
				//税前预估总成本
            	this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userYzfzyReductionAll+this.fusionData.userTeriminalSubsidyAll+this.fusionData.userYzfzyCostAll+this.fusionData.commission+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.badDebts+this.fusionData.iptvCost+this.fusionData.grant+this.fusionData.materialCharge+this.fusionData.equipmentMaintenanceFee+this.fusionData.videoContentSettlement)).toFixed(2)
            	/*console.log(Number(newValue),'光猫成本1')
            	console.log(this.fusionData.iptvCost,'光猫成本2')
            	console.log(this.fusionData.grant,'光猫成本3')
            	console.log(this.fusionData.commission,'光猫成本4')
            	console.log(this.fusionData.materialCharge,'光猫成本5')
            	console.log(this.fusionData.badDebts,'光猫成本6')
            	console.log(this.fusionData.equipmentMaintenanceFee,'光猫成本7')
            	console.log(this.fusionData.videoContentSettlement,'光猫成本8')*/


            	//税后预估总成本
            	this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+this.fusionData.userTeriminalSubsidyAll+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.badDebts/(1+0.17)+this.fusionData.iptvCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.userYzfzyCostAll/(1+0.06)+this.fusionData.materialCharge/(1+0.0627)+this.fusionData.commission/(1+0.0879)+this.fusionData.equipmentMaintenanceFee/(1+0.06)+this.fusionData.videoContentSettlement/(1+0.06))).toFixed(2)
			},
			//IPTV机顶盒成本
			iptvCost3(newValue){
				//税前预估总成本
            	this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userYzfzyReductionAll+this.fusionData.userTeriminalSubsidyAll+this.fusionData.userYzfzyCostAll+this.fusionData.commission+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.badDebts+this.fusionData.odemCost+this.fusionData.grant+this.fusionData.materialCharge+this.fusionData.equipmentMaintenanceFee+this.fusionData.videoContentSettlement)).toFixed(2)
            	//税后预估总成本
            	this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+this.fusionData.userTeriminalSubsidyAll+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.badDebts/(1+0.17)+this.fusionData.odemCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.userYzfzyCostAll/(1+0.06)+this.fusionData.materialCharge/(1+0.0627)+this.fusionData.commission/(1+0.0879)+this.fusionData.equipmentMaintenanceFee/(1+0.06)+this.fusionData.videoContentSettlement/(1+0.06))).toFixed(2)
			},
			//装移机工料费
			materialCharge3(newValue){
				//税前预估总成本
            	this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userYzfzyReductionAll+this.fusionData.userTeriminalSubsidyAll+this.fusionData.userYzfzyCostAll+this.fusionData.commission+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.badDebts+this.fusionData.odemCost+this.fusionData.grant+this.fusionData.iptvCost+this.fusionData.equipmentMaintenanceFee+this.fusionData.videoContentSettlement)).toFixed(2)

            	//税后预估总成本
            	this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+this.fusionData.userTeriminalSubsidyAll+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.badDebts/(1+0.17)+this.fusionData.odemCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.userYzfzyCostAll/(1+0.06)+this.fusionData.iptvCost/(1+0.0627)+this.fusionData.commission/(1+0.0879)+this.fusionData.equipmentMaintenanceFee/(1+0.06)+this.fusionData.videoContentSettlement/(1+0.06))).toFixed(2)
			},
			//设备维护费
			equipmentMaintenanceFee3(newValue){
				//税前预估总成本
            	this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userYzfzyReductionAll+this.fusionData.userTeriminalSubsidyAll+this.fusionData.userYzfzyCostAll+this.fusionData.commission+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.badDebts+this.fusionData.odemCost+this.fusionData.grant+this.fusionData.iptvCost+this.fusionData.materialCharge+this.fusionData.videoContentSettlement)).toFixed(2)
            	//税后预估总成本
            	this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+this.fusionData.userTeriminalSubsidyAll+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.badDebts/(1+0.17)+this.fusionData.odemCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.userYzfzyCostAll/(1+0.06)+this.fusionData.iptvCost/(1+0.0627)+this.fusionData.commission/(1+0.0879)+this.fusionData.materialCharge/(1+0.06)+this.fusionData.videoContentSettlement/(1+0.06))).toFixed(2)
			},
			//视频内容结算费
			videoContentSettlement3(newValue){
				//税前预估总成本
            	this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userYzfzyReductionAll+this.fusionData.userTeriminalSubsidyAll+this.fusionData.userYzfzyCostAll+this.fusionData.commission+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.badDebts+this.fusionData.odemCost+this.fusionData.grant+this.fusionData.iptvCost+this.fusionData.materialCharge+this.fusionData.equipmentMaintenanceFee)).toFixed(2)
            	//税后预估总成本
            	this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+this.fusionData.userTeriminalSubsidyAll+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.badDebts/(1+0.17)+this.fusionData.odemCost/(1+0.17)+this.fusionData.grant/(1+0.0879)+this.fusionData.userYzfzyCostAll/(1+0.06)+this.fusionData.iptvCost/(1+0.0627)+this.fusionData.commission/(1+0.0879)+this.fusionData.materialCharge/(1+0.06)+this.fusionData.equipmentMaintenanceFee/(1+0.06))).toFixed(2)
			},
			//单用户赠款
            userGrant3(newValue){
            	//console.log(newValue)
            	this.fusionData.grant = this.fusionData.developUserNum*Number(newValue)
            	console.log(this.fusionData.grant)

            },
			//总赠款
            grant3(newValue){
            	//税前预估总成本
            	this.fusionData.totalCost = (Number(newValue)+this.fusionData.userTravelSubsidyAll+this.fusionData.userYzfzyReductionAll+this.fusionData.userTeriminalSubsidyAll+this.fusionData.userYzfzyCostAll+this.fusionData.commission+(this.fusionData.grossIncome*0.0008+this.fusionData.grossIncome*0.0054+this.fusionData.grossIncome*0.0099)+(this.fusionData.badDebts+this.fusionData.odemCost+this.fusionData.videoContentSettlement+this.fusionData.iptvCost+this.fusionData.materialCharge+this.fusionData.equipmentMaintenanceFee)).toFixed(2)
            	//console.log(this.fusionData.totalCost,'总赠款')
            	//税后预估总成本
            	this.fusionData.taxTotalCost = ((Number(newValue))/(1+0.17)+(this.fusionData.userTravelSubsidyAll)/(1+0.0879)+this.fusionData.userTeriminalSubsidyAll+(this.fusionData.userYzfzyReductionAll)/(1+0.0879)+((this.fusionData.grossIncome*0.0008)/(1+0.11)+(this.fusionData.grossIncome*0.0054)/(1+0.11)+(this.fusionData.grossIncome*0.0099)/(1+0.06))+(this.fusionData.badDebts/(1+0.17)+this.fusionData.odemCost/(1+0.17)+this.fusionData.videoContentSettlement/(1+0.0879)+this.fusionData.userYzfzyCostAll/(1+0.06)+this.fusionData.iptvCost/(1+0.0627)+this.fusionData.commission/(1+0.0879)+this.fusionData.materialCharge/(1+0.06)+this.fusionData.equipmentMaintenanceFee/(1+0.06))).toFixed(2)
            },
            /*//单宽带预估总收入税前
			grossIncome3(newValue,old){
				//佣金
				this.fusionData.commission = Number(newValue)*0.0264
				//console.log(newValue,'./..')
				//console.log(this.fusionData.commission,'./.')
				//坏账成本
				this.fusionData.badDebts = Number(newValue)*0.0045
				//console.log(this.fusionData.badDebts)
				//销售品预估毛利
				if (old!='') {
					this.fusionData.grossProfit = (Number(newValue)-this.fusionData.totalCost).toFixed(2)
					//console.log(this.fusionData.grossProfit)
					//销售品预估毛利率
					this.fusionData.grossRate = (this.fusionData.grossProfit/Number(newValue)).toFixed(2)
				}
			},*/
			//单宽带预估总收入税后
			taxGrossIncome3(newValue){
				//销售品预估毛利
				this.fusionData.taxGrossProfit = (Number(newValue)-this.fusionData.taxTotalCost).toFixed(2)
				//console.log(this.fusionData.taxGrossProfit)
				//销售品预估毛利率
				this.fusionData.taxGrossRate = (this.fusionData.taxGrossProfit/Number(newValue)).toFixed(2)
			},


            //预估总收入税前
            grossIncome3(newValue,old){
				//销售品预估毛利
				if (old!='') {
					this.fusionData.grossProfit = (Number(newValue)-this.fusionData.totalCost).toFixed(2)
					//console.log(this.fusionData.grossProfit)
					//销售品预估毛利率
					this.fusionData.grossRate = (this.fusionData.grossProfit/Number(newValue)).toFixed(2)
				}
            	//佣金计算
            	this.fusionData.commission = Number(newValue)*0.0264
            	//console.log(this.fusionData.commission,'佣金2')
            	//坏账
            	this.fusionData.badDebts = Number(newValue)*0.0045
            	//console.log(this.fusionData.badDebts)
            	//省间语音结算净支出
            	this.fusionData.voicePro = Number(newValue)*0.0123
            	//console.log(this.fusionData.voicePro)
            	//省间流量结算净支出
            	this.fusionData.trafficPro = Number(newValue)*0.017
            	//console.log(this.fusionData.trafficPro)
            	//税前毛利
            	this.fusionData.grossProfit = (Number(newValue)-this.fusionData.totalCost).toFixed(2)

            	//毛利率
            	this.fusionData.grossRate = (this.fusionData.grossProfit/Number(newValue)).toFixed(2)
            },

            //预估总成本税前
			totalCost3(newValue){
				//console.log(newValue,'预估总成本税前')
				this.fusionData.grossProfit = (this.fusionData.grossIncome-Number(newValue)).toFixed(2)
			},
			//预估总成本税后
			taxTotalCost3(newValue){
				this.fusionData.taxGrossProfit = (this.fusionData.taxGrossIncome - Number(newValue)).toFixed(2)
			},
			//预估销售品预估毛利
			grossProfit3(newValue){
				this.fusionData.grossRate = (Number(newValue)/this.fusionData.grossIncome).toFixed(2)*100
			},
			//预估销售品预估毛利税后
			taxGrossProfit3(newValue){
				//税后毛利率
				this.fusionData.taxGrossRate = (Number(newValue)/this.fusionData.taxGrossIncome).toFixed(2)*100
			},






        },
		mounted() {
			this.getTemplateType();
			this.offerId = this.componentData.offerId;
            this.getGross()
            //this.postGross()
        },
        methods:{
        	setTemplateType(val,canSel = false){
        		this.canSelTemplateType = canSel;
        		this.temData.templateType = val;
        	},
        	getTemplateType(){
        		let constituteItem = this.$parent.$parent.basicObj.items.find( item => item.componentName == 'constitute');
        		if(constituteItem.isShow){
        			let componentConstitute = this.$parent.$parent.$refs[`component-constitute`][0];
        			this.temData.templateType = componentConstitute.getEstimateTemplateType();
        			this.canSelTemplateType = false;
        		}else{
        			this.temData.templateType = 10;
        			this.canSelTemplateType = true;
        		}
        	},
        	getGross(){
                this.$axios.get(this.$api.OrdOffer+'/'+this.offerId+'/offerGrossForecast', {
                    params: {
                        //statusCd:1000
                    }
                }).then((res) => {
                    console.log(res,'查询毛利预估')
                    //return
                    if (res.data.success) {
                    	if(!res.data.ordOfferGrossForecast) return;
                        this.temData.templateType = res.data.ordOfferGrossForecast.templateType

                        if (this.temData.templateType==10) {
		            		this.aloneData = res.data.ordOfferGrossForecast
		            	} else if(this.temData.templateType==20){
		            		//this.broadData = res.data.ordOfferGrossForecast
		            		this.broadData.accessmentCycle = res.data.ordOfferGrossForecast.accessmentCycle
							this.broadData.networkNum = res.data.ordOfferGrossForecast.networkNum
							this.broadData.fixedTelNum = res.data.ordOfferGrossForecast.fixedTelNum
							this.broadData.noStandardDefinitIptyNum = res.data.ordOfferGrossForecast.noStandardDefinitIptyNum
							this.broadData.standardDefinitIptyNum = res.data.ordOfferGrossForecast.standardDefinitIptyNum
							this.broadData.developUserNum = res.data.ordOfferGrossForecast.developUserNum
							this.broadData.userMonthlyAmount = res.data.ordOfferGrossForecast.userMonthlyAmount
							this.broadData.userGrant = res.data.ordOfferGrossForecast.userGrant
							this.broadData.grossIncome = res.data.ordOfferGrossForecast.grossIncome
							this.broadData.totalCost = res.data.ordOfferGrossForecast.totalCost
							this.broadData.grossProfit = res.data.ordOfferGrossForecast.grossProfit
							this.broadData.grossRate = res.data.ordOfferGrossForecast.grossRate
							this.broadData.taxGrossIncome = res.data.ordOfferGrossForecast.taxGrossIncome
							this.broadData.taxTotalCost = res.data.ordOfferGrossForecast.taxTotalCost
							this.broadData.taxGrossProfit = res.data.ordOfferGrossForecast.taxGrossProfit
							this.broadData.taxGrossRate = res.data.ordOfferGrossForecast.taxGrossRate

		            	}else{
		            		this.fusionData = res.data.ordOfferGrossForecast
		            	}
                    }
                })
            },
            //单移动套餐
            postGross(callback){
                this.$axios.post(this.$api.OrdOffer+'/'+this.offerId+'/offerGrossForecast', {
                    offerGrossForecastId:1000001,
					offerId:300093177,
					templateType:10,     //模板类型
					accessmentCycle:this.aloneData.accessmentCycle,  //评估周期
					voice:this.aloneData.voice,            //套内语音
					flow:this.aloneData.flow,              //套餐内流量
					developUserNum:this.aloneData.developUserNum,  //预估发展用户数
					userMonthlyAmount:this.aloneData.userMonthlyAmount,//预估用户月消费额
					userTeriminalSubsidy:this.aloneData.userTeriminalSubsidy, //单用户终端补贴
					userTravelSubsidy:this.aloneData.userTravelSubsidy, //单用户话费补贴
					userYzfzyCost:this.aloneData.userYzfzyCost,        //单用户翼支付资源
					grossIncome:this.aloneData.grossIncome,        //税前预估总收入
					taxGrossIncome:this.aloneData.taxGrossIncome,        //税后预估总收入
					totalCost:this.aloneData.totalCost,       //税前预估总成本
					taxTotalCost:this.aloneData.taxTotalCost,   //税后预估总成本
					grossProfit:this.aloneData.grossProfit,    //税前销售品预估毛利
					taxGrossProfit:this.aloneData.taxGrossProfit,    //税后销售品预估毛利
					grossRate:this.aloneData.grossRate,        //税前销售品预估毛利率
					taxGrossRate:this.aloneData.taxGrossRate,  //税后销售品预估毛利率

                }).then((res) => {
                    if (res.data.success) {
                    	this.$message.success({message : '配置毛利预估单移动成功！'})
                        callback(true)
                    }else{
                    	this.$message.error({message : '配置毛利预估单移动失败！'})
                        callback(false)
                    }
                }).catch(error => {
					this.$message.error({ message: error.response.data.msg })
					callback(false);
				})
            },
            //单宽带套餐
            postGross2(callback){
                this.$axios.post(this.$api.OrdOffer+'/'+this.offerId+'/offerGrossForecast', {
                    offerGrossForecastId:1000001,
					offerId:300093177,
					templateType:20,     //模板类型
					accessmentCycle:this.broadData.accessmentCycle,  //评估周期
					networkNum:this.broadData.networkNum,    //每户智能组网数
					fixedTelNum:this.broadData.fixedTelNum,  //每户宽带数
					noStandardDefinitIptyNum:this.broadData.noStandardDefinitIptyNum, //每户非标清IPTV路数
					standardDefinitIptyNum:this.broadData.standardDefinitIptyNum, //每户标清IPTV路数
					developUserNum:this.broadData.developUserNum,  //预估发展用户数
					userMonthlyAmount:this.broadData.userMonthlyAmount, //预估用户月消费额
					userGrant:this.broadData.userGrant,
					grossIncome:this.broadData.grossIncome,        //税前预估总收入
					taxGrossIncome:this.broadData.taxGrossIncome,        //税后预估总收入
					totalCost:this.broadData.totalCost,       //税前预估总成本
					taxTotalCost:this.broadData.taxTotalCost,   //税后预估总成本
					grossProfit:this.broadData.grossProfit,    //税前销售品预估毛利
					taxGrossProfit:this.broadData.taxGrossProfit,    //税后销售品预估毛利
					grossRate:this.broadData.grossRate,        //税前销售品预估毛利率
					taxGrossRate:this.broadData.taxGrossRate,  //税后销售品预估毛利率

                }).then((res) => {
                    if (res.data.success) {
                    	this.$message.success({message : '配置毛利预估单宽带成功！'})
                        callback(true)
                    }else{
                    	this.$message.error({message : '配置毛利预估单宽带失败！'})
                        callback(false)
                    }
                }).catch(error => {
					this.$message.error({ message: error.response.data.msg })
					callback(false);
				})
            },
            //融合套餐
            postGross3(callback){
                this.$axios.post(this.$api.OrdOffer+'/'+this.offerId+'/offerGrossForecast', {
                    offerGrossForecastId:1000001,
					offerId:300093177,
					templateType:30,     //模板类型
					accessmentCycle:this.fusionData.accessmentCycle,  //评估周期
					networkNum:this.fusionData.networkNum,    //每户智能组网数
					fixedTelNum:this.fusionData.fixedTelNum,  //每户宽带数
					noStandardDefinitIptyNum:this.fusionData.noStandardDefinitIptyNum, //每户非标清IPTV路数
					standardDefinitIptyNum:this.fusionData.standardDefinitIptyNum, //每户标清IPTV路数
					developUserNum:this.fusionData.developUserNum,  //预估发展用户数
					userMonthlyAmount:this.fusionData.userMonthlyAmount, //预估用户月消费额
					grpOfferGrant:this.fusionData.grpOfferGrant,//组合销售品赠款
					voice:this.fusionData.voice,            //套内语音
					flow:this.fusionData.flow,              //套餐内流量
					userMonthlyAmount:this.fusionData.userMonthlyAmount,//预估用户月消费额
					userTeriminalSubsidy:this.fusionData.userTeriminalSubsidy, //单用户终端补贴
					userTravelSubsidy:this.fusionData.userTravelSubsidy, //单用户话费补贴
					userYzfzyCost:this.fusionData.userYzfzyCost,        //单用户翼支付资源
					userYzfzyReduction:this.fusionData.userYzfzyReduction,  //单用户翼支付资源减收类
					userGrant:this.fusionData.userGrant,
					grossIncome:this.fusionData.grossIncome,        //税前预估总收入
					taxGrossIncome:this.fusionData.taxGrossIncome,        //税后预估总收入
					totalCost:this.fusionData.totalCost,       //税前预估总成本
					taxTotalCost:this.fusionData.taxTotalCost,   //税后预估总成本
					grossProfit:this.fusionData.grossProfit,    //税前销售品预估毛利
					taxGrossProfit:this.fusionData.taxGrossProfit,    //税后销售品预估毛利
					grossRate:this.fusionData.grossRate,        //税前销售品预估毛利率
					taxGrossRate:this.fusionData.taxGrossRate,  //税后销售品预估毛利率

                }).then((res) => {
                    if (res.data.success) {
                    	this.$message.success({message : '配置毛利预估融合成功！'})
                        callback(true)
                    }else{
                    	this.$message.error({message : '配置毛利预估融合失败！'})
                        callback(false)
                    }
                }).catch(error => {
					this.$message.error({ message: error.response.data.msg })
					callback(false);
				})
            },
    		//保存
            save(callback){
                this.$validator.validateAll().then((result) => {
                    if(result){
                        if (this.temData.templateType==10) {
                            this.postGross(callback)

                        } else if(this.temData.templateType==20){
                            this.postGross2(callback)

                        }else{
                            this.postGross3(callback)
                        }
                    }else{
                    	this.$message.error({message : '毛利预估表单验证失败！'})
                    }
                })
            }
        }
	}
</script>

<style lang="scss" scoped>
	.save{
		padding: 2px 8px;
		background-color: #00c0ff;
		color: #fff;
	}
	.title-top{
		margin-top: 14px;
	}
	.orange{
		color: #ff9805 !important;
	}
	.colright{
		margin-left: 150px;
	}
	.icondist{
		bottom: 10px;
		p{
			display: inline-block;
			padding-left: 10px;
			padding-top: 15px;
		}
	}
	.icondist2{
		bottom: 10px;
		p{
			display: inline-block;
			padding-left: 10px;

		}
	}
	.estimate{
		/deep/ .radio{
			width: 120px;
			text-align: center;
			height: 40px;
			line-height: 5;
		}
		.from-bg{
			background-color: #f5f6fa;
			margin-bottom: 10px;
			/deep/ span{
				line-height: 5;
				padding-left: 15px;
			}

		}
		.broad{
			width: 100%;

			.broad-top{
				width: 100%;
				height: 330px;
				border:1px solid #f5f6fa;

				.broad-top-title{
					float: left;
					width: 4%;
					height: 100%;
					font-size: 14px;
					text-align: center;
					background-color: #f5f6fa;
					span{
						top: 130px;
					}
				}
				.body-data{
					padding-top: 10px;
					.broad-st{
						left: 20px;
						height: 55px;
					}
					span{
						left: 20px;
						font-size: 14px;
						color: #5c9cf3;
					}
				}
				.broad-top-body{
					float: left;
					width: 95%;
				}
			}
			.broad-top2{
				margin-top: 10px;
				width: 100%;
				height: 130px;
				border:1px solid #f5f6fa;
				.broad-top-title{
					float: left;
					width: 4%;
					height: 100%;
					font-size: 14px;
					text-align: center;
					background-color: #f5f6fa;
					span{
						top: 40px;
					}
				}
				.body-data{

					.broad-st{
						left: 20px;
						height: 55px;
					}
					span{
						left: 40px;
						font-size: 14px;
						color: #5c9cf3;
					}

				}
				.broad-top-body{
					float: left;
					width: 95%;
				}
			}
			.broad-top3{
				margin-top: 10px;
				width: 100%;
				height: 280px;
				border:1px solid #f5f6fa;
				.broad-top-title{
					float: left;
					width: 4%;
					height: 100%;
					font-size: 14px;
					text-align: center;
					background-color: #f5f6fa;
					span{
						top: 110px;
					}
				}
				.body-data{
					padding-top: 10px;
					.broad-st{
						left: 20px;
						height: 55px;
					}
					span{
						left: 20px;
						font-size: 14px;
						color: #5c9cf3;
					}
				}
				.broad-top-body{
					float: left;
					width: 95%;
				}
			}
		}
		.broad2{
			width: 100%;
			.broad-top{
				width: 100%;
				height: 390px;
				border:1px solid #f5f6fa;
				.broad-top-title{
					float: left;
					width: 4%;
					height: 100%;
					font-size: 14px;
					text-align: center;
					background-color: #f5f6fa;
					span{
						top: 160px;
					}
				}
				.body-data{
					padding-top: 10px;
					.broad-st{
						left: 20px;
						height: 55px;
					}
					span{
						left: 20px;
						font-size: 14px;
						color: #5c9cf3;
					}
				}
				.broad-top-body{
					float: left;
					width: 95%;
				}
			}
			.broad-top2{
				margin-top: 10px;
				width: 100%;
				height: 80px;
				border:1px solid #f5f6fa;
				.broad-top-title{
					float: left;
					width: 4%;
					height: 100%;
					font-size: 14px;
					text-align: center;
					background-color: #f5f6fa;
					span{
						top: 10px;
					}
				}
				.body-data{
					padding-top: 0px;
					.broad-st{
						left: 20px;
						height: 55px;
					}
					span{
						left: 20px;
						font-size: 14px;
						color: #5c9cf3;
					}

				}
				.broad-top-body{
					float: left;
					width: 95%;
				}
			}
			.broad-top3{
				margin-top: 10px;
				width: 100%;
				height: 280px;
				border:1px solid #f5f6fa;
				.broad-top-title{
					float: left;
					width: 4%;
					height: 100%;
					font-size: 14px;
					text-align: center;
					background-color: #f5f6fa;
					span{
						top: 110px;
					}
				}
				.body-data{
					padding-top: 10px;
					.broad-st{
						left: 20px;
						height: 55px;
					}
					span{
						left: 20px;
						font-size: 14px;
						color: #5c9cf3;
					}
				}
				.broad-top-body{
					float: left;
					width: 95%;
				}
			}
		}
		.broad3{
			width: 100%;
			.broad-top{
				width: 100%;
				height: 440px;
				border:1px solid #f5f6fa;
				.broad-top-title{
					float: left;
					width: 4%;
					height: 100%;
					font-size: 14px;
					text-align: center;
					background-color: #f5f6fa;
					span{
						top: 200px;
					}
				}
				.body-data{
					padding-top: 10px;
					.broad-st{
						left: 20px;
						height: 55px;
					}
					span{
						left: 20px;
						font-size: 14px;
						color: #5c9cf3;
					}
				}
				.broad-top-body{
					float: left;
					width: 95%;
				}
			}
			.broad-top2{
				margin-top: 10px;
				width: 100%;
				height: 190px;
				border:1px solid #f5f6fa;
				.broad-top-title{
					float: left;
					width: 4%;
					height: 100%;
					font-size: 14px;
					text-align: center;
					background-color: #f5f6fa;
					span{
						top: 60px;
					}
				}
				.body-data{
					padding-top: 0px;
					.broad-st{
						left: 20px;
						height: 55px;
					}
					span{
						left: 20px;
						font-size: 14px;
						color: #5c9cf3;
					}

				}
				.broad-top-body{
					float: left;
					width: 95%;
				}
			}
			.broad-top3{
				margin-top: 10px;
				width: 100%;
				height: 280px;
				border:1px solid #f5f6fa;
				.broad-top-title{
					float: left;
					width: 4%;
					height: 100%;
					font-size: 14px;
					text-align: center;
					background-color: #f5f6fa;
					span{
						top: 110px;
					}
				}
				.body-data{
					padding-top: 10px;
					.broad-st{
						left: 20px;
						height: 55px;
					}
					span{
						left: 20px;
						font-size: 14px;
						color: #5c9cf3;
					}
				}
				.broad-top-body{
					float: left;
					width: 95%;
				}
			}
		}
	}
</style>
