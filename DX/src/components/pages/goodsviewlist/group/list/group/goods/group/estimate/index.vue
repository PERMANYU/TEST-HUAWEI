<template>
	<div class="estimate">
		<Form labelWidth="100px" labelAlign="left" class="from-bg">
			<Row>
				<Col :span="20">
				<FormItem labelText="毛利预估模板" :errorMessage="errors.first('offerType')">
					<RadioGroup v-validate="'required'" :data="offerTypeArray" name="templateType" data-vv-as="毛利预估模板" v-model="temData.templateType" disabled></RadioGroup> 
				</FormItem>
				</Col>
			</Row>
		</Form>
		<div class="broad">
			<Form labelWidth="220px" labelAlign="right" v-show="temData.templateType==10">
				<div class="broad-top">
					<div class="broad-top-title"><span>预<br>估</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<span class="icondist iconfont icon-jibenxinxi"><p>基础信息</p></span>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="评估周期(月)：" :requiredIcon="true" >
									<span>{{aloneData.accessmentCycle}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="套餐内流量（GB）：" :requiredIcon="true" >
									<span>{{aloneData.flow}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8" >
								<FormItem labelText="套餐内语音（分钟）：" :requiredIcon="true" >
									<span>{{aloneData.voice}}</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-fazhanyewu"><p>发展业务量</p></span>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="预估发展用户数(户）：" :requiredIcon="true" >
									<span>{{aloneData.developUserNum}}</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
						<span class="icondist2 iconfont icon-qian"><p>收入</p></span>
						<Row class="broad-st">
							<Col :span="8">
							<FormItem labelText="预估用户月消费额(元/月户）：" :requiredIcon="true" >
								<span>{{aloneData.userMonthlyAmount}}</span>
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
								<Col :span="8">
								<FormItem labelText="单用户终端补贴(元/户）：" :requiredIcon="true" >
									<span>{{aloneData.userTeriminalSubsidy}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="单用户话费补贴(元/户）：" :requiredIcon="true" >
									<span>{{aloneData.userTravelSubsidy}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="单用户翼支付资源(元/户）：" :requiredIcon="true" >
									<span>{{aloneData.userYzfzyCost}}</span>
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
								<Col :span="8">
								<FormItem labelText="预估总收入(元)：" :requiredIcon="true" >
									<span class="orange" v-model="aloneData.grossIncome">{{aloneData.grossIncome}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="预估总成本(元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="aloneData.totalCost">{{aloneData.totalCost}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="销售品预估毛利（元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="aloneData.grossProfit">{{aloneData.grossProfit}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="销售品预估毛利率（%）：" :requiredIcon="true" >
									
									<span class="orange" v-model="aloneData.grossRate">{{aloneData.grossRate}}%</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-qian"><p>税后</p></span>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="预估总收入(元)：" :requiredIcon="true" >
									
									<span class="orange" v-model="aloneData.taxGrossIncome">{{aloneData.taxGrossIncome}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="预估总成本(元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="aloneData.taxTotalCost">{{aloneData.taxTotalCost}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="销售品预估毛利（元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="aloneData.taxGrossProfit">{{aloneData.taxGrossProfit}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="销售品预估毛利率（%）：" :requiredIcon="true" >
									
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
			<Form labelWidth="220px" labelAlign="right" v-show="temData.templateType==20">
				<div class="broad-top">
					<div class="broad-top-title"><span>预<br>估</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<span class="icondist iconfont icon-jibenxinxi"><p>基础信息</p></span>
							<Row class="broad-st">
							<Col :span="8" >
								<FormItem labelText="评估周期(月)：" :requiredIcon="true" >
									<span>{{broadData.accessmentCycle}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8" >
								<FormItem labelText="每户智能组网数（点/户）：" :requiredIcon="true" >
									<span>{{broadData.networkNum}}</span>
								</FormItem>
								</Col>
								<Col :span="8" class="broad-st colright">
								<FormItem labelText="每户宽带数(路/户)：" :requiredIcon="true" >
									<span>{{broadData.fixedTelNum}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8" >
								<FormItem labelText="每户非标清IPTV路数（点/户）：" :requiredIcon="true" >
									<span>{{broadData.noStandardDefinitIptyNum}}</span>
								</FormItem>
								</Col>
								<Col :span="8" class="broad-st colright">
								<FormItem labelText="每户标清IPTV路数（路/户）：" :requiredIcon="true" >
									<span>{{broadData.standardDefinitIptyNum}}</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-fazhanyewu"><p>发展业务量</p></span>
							<Row class="broad-st">
								<Col :span="8" >
								<FormItem labelText="预估发展用户数(户）：" :requiredIcon="true" >
									<span>{{broadData.developUserNum}}</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-qian"><p>收入</p></span>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="预估用户月消费额(元/月户）：" :requiredIcon="true" >
									<span>{{broadData.userMonthlyAmount}}</span>
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
								<Col :span="8" >
								<FormItem labelText="单用户赠款(元）：" :requiredIcon="true" >
									<span>{{broadData.userGrant}}</span>
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
								<Col :span="8">
								<FormItem labelText="预估总收入(元)：" :requiredIcon="true" >
									<span class="orange" v-model="broadData.grossIncome">{{broadData.grossIncome}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="预估总成本(元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="broadData.totalCost">{{broadData.totalCost}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="销售品预估毛利（元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="broadData.grossProfit">{{broadData.grossProfit}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="销售品预估毛利率（%）：" :requiredIcon="true" >
									
									<span class="orange" v-model="broadData.grossRate">{{broadData.grossRate}}%</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-qian"><p>税后</p></span>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="预估总收入(元)：" :requiredIcon="true" >
									
									<span class="orange" v-model="broadData.taxGrossIncome">{{broadData.taxGrossIncome}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="预估总成本(元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="broadData.taxTotalCost">{{broadData.taxTotalCost}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="销售品预估毛利（元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="broadData.taxGrossProfit">{{broadData.taxGrossProfit}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="销售品预估毛利率（%）：" :requiredIcon="true" >
									
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
			<Form labelWidth="220px" labelAlign="right" v-show="temData.templateType==30">
				<div class="broad-top">
					<div class="broad-top-title"><span>预<br>估</span></div>
					<div class="broad-top-body">
						<div class="body-data">
							<span class="icondist iconfont icon-jibenxinxi"><p>基础信息</p></span>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem  labelText="评估周期(月)：" :requiredIcon="true" >
									<span>{{fusionData.accessmentCycle}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st ">
								<Col :span="8">
								<FormItem labelText="餐内语音(分钟）：" :requiredIcon="true" >
									<span>{{fusionData.voice}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="套餐内流量（GB）：" :requiredIcon="true" >
									<span>{{fusionData.flow}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="每户固定电话数（路/户）：" :requiredIcon="true" >
									<span>{{fusionData.fixedTelNum}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="每户智能组网数（点/户）：" :requiredIcon="true" >
									<span>{{fusionData.networkNum}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="每户标清IPTV路数（路/户）：" :requiredIcon="true" >
									<span>{{fusionData.standardDefinitIptyNum}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="每户非标清IPTV路数（路/户）：" :requiredIcon="true" >
									<span>{{fusionData.noStandardDefinitIptyNum}}</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-fazhanyewu"><p>发展业务量</p></span>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="预估发展用户数(户）：" :requiredIcon="true" >
									<span>{{fusionData.developUserNum}}</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-qian"><p>收入</p></span>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="预估用户月消费额(元/月户）：" :requiredIcon="true" >
									<span>{{fusionData.userMonthlyAmount}}</span>
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
								<Col :span="8">
								<FormItem labelText="单用户终端补贴(元/户）：" :requiredIcon="true" >
									<span>{{fusionData.userTeriminalSubsidy}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="单用户话费补贴(元/户）：" :requiredIcon="true" >
									<span>{{fusionData.userTravelSubsidy}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="单用户赠款(元/户）：" :requiredIcon="true" >
									<span>{{fusionData.userGrant}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="组合销售品赠款(元/组）：" :requiredIcon="true" >
									<span>{{fusionData.grpOfferGrant}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="单用户翼支付资源-成本类（元/户）：" :requiredIcon="true" >
									<span>{{fusionData.userYzfzyCost}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="单用户翼支付资源-减收类(元/户）：" :requiredIcon="true" >
									<span>{{fusionData.userYzfzyReduction}}</span>
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
								<Col :span="8">
								<FormItem labelText="预估总收入(元)：" :requiredIcon="true" >
									<span class="orange" v-model="fusionData.grossIncome">{{fusionData.grossIncome}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="预估总成本(元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="fusionData.totalCost">{{fusionData.totalCost}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="销售品预估毛利（元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="fusionData.grossProfit">{{fusionData.grossProfit}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="销售品预估毛利率（%）：" :requiredIcon="true" >
									
									<span class="orange" v-model="fusionData.grossRate">{{fusionData.grossRate}}%</span>
								</FormItem>
								</Col>
							</Row>
						</div>
						<div class="body-data">
							<span class="icondist2 iconfont icon-qian"><p>税后</p></span>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="预估总收入(元)：" :requiredIcon="true" >
									
									<span class="orange" v-model="fusionData.taxGrossIncome">{{fusionData.taxGrossIncome}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="预估总成本(元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="fusionData.taxTotalCost">{{fusionData.taxTotalCost}}</span>
								</FormItem>
								</Col>
							</Row>
							<Row class="broad-st">
								<Col :span="8">
								<FormItem labelText="销售品预估毛利（元）：" :requiredIcon="true" >
									
									<span class="orange" v-model="fusionData.taxGrossProfit">{{fusionData.taxGrossProfit}}</span>
								</FormItem>
								</Col>
								<Col class="broad-st colright" :span="8">
								<FormItem labelText="销售品预估毛利率（%）：" :requiredIcon="true" >
									
									<span class="orange" v-model="fusionData.taxGrossRate">{{fusionData.taxGrossRate}}%</span>
								</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</Form>
		</div>
		
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
					templateType:20
				},
				aloneData:{                   //单移动套餐
					
				},    
				broadData:{                         //单宽带套餐
					
				},
				fusionData:{             //融合
					
				},             
			}
		},
		
		mounted() {
			//this.offerId = this.componentData.offerId;
            this.getGross()
        },
        methods:{
        	getGross(){
                this.$axios.get(this.$api.OrdOffer+'/'+this.componentData.offerId+'/offerGrossForecast', {
                    params: {
                        //statusCd:1000
                    }
                }).then((res) => {
                    console.log(res,'查询毛利预估')
                    //return
                    if (res.data.success) {
                        if (res.data.ordOfferGrossForecast!=null) {
                        	this.temData.templateType = res.data.ordOfferGrossForecast.templateType

	                        if (this.temData.templateType==10) {
			            		this.aloneData = res.data.ordOfferGrossForecast
			            		this.offerTypeArray = [{label: '单移动套餐',value: '10'}]
			            	} else if(this.temData.templateType==20){
			            		this.offerTypeArray = [{label: '单宽带套餐',value: '20'}]
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
			            		this.offerTypeArray = [{label: '融合套餐',value: '30'}]
			            		this.fusionData = res.data.ordOfferGrossForecast
			            	}
                        }
                    }
                })
            },
            
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
				height: 320px;
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
				height: 120px;
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
				height: 370px;
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
				height: 60px;
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
				height: 410px;
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
				height: 180px;
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