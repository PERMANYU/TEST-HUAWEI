<template>
	<div class="accept">
		<div class="app__top">
			<span class="app__top-left">受理规则</span>
		</div>
		<div class="i-content">
			
			<div class="i-title">
				<div class="accept__title">订购规则</div>
				
				<div class="h-a-add">
					<span @click="more">更多信息>></span>
				</div>
			</div>
			<div class="accept__content">
			<Form labelWidth="120px" labelAlign="left">
				<Row>
					<Col :span="7">
					<FormItem labelText="生效方式：" :requiredIcon="true" >
						<span>{{offerOrderRule.effType}}</span>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="失效方式：" :requiredIcon="true">
						<span>{{offerOrderRule.expType}}</span>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="资费有效期：">
						<span>{{offerOrderRule.periodTime}}</span>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
						<FormItem labelText="有效期单位：">
							<span>{{getTime(offerOrderRule.periodUnit)}}</span>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="客户协议期：">
						<span>{{offerOrderRule.periodConstrTime}}</span>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="协议期单位：" >
						<span>{{getTime(offerOrderRule.periodConstrUnit)}}</span>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="7">
						<FormItem labelText="产品存在方式：" :requiredIcon="true">
							<span>{{offerOrderRule.prodExistType}}</span>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1" v-show="offerOrderRule.effType == '1600'">
						<FormItem labelText="指定生效时间：">
							<span>{{offerOrderRule.effDate | date}}</span>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1"  v-show="offerOrderRule.expType == '1600'">
						<FormItem labelText="资费失效时间：">
						<span>{{offerOrderRule.expDate | date}}</span>
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
			<Form labelWidth="120px" labelAlign="left">
				<Row>
					<Col :span="7">
						<FormItem labelText="有效期：" :requiredIcon="false">
						<span>{{offerRemewalRule.periodTime}}</span>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1">
						<FormItem labelText="有效期单位：" :requiredIcon="false">
							<span>{{getTime(offerRemewalRule.periodUnit)}}</span>
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
			<Form labelWidth="120px" labelAlign="left">
				<Row>
					<Col :span="7">
						<FormItem labelText="生效方式：">
							<span>{{offerChangeRule.effType}}</span>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1">
						<FormItem labelText="指定生效时间：" >
							<span>{{offerChangeRule.effDate | date}}</span>
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
			<Form labelWidth="120px" labelAlign="left">
				<Row>
					<Col :span="7">
					<FormItem labelText="生效方式：">
						<span>{{offerUnsubscribeRule.effType}}</span>
					</FormItem>
					</Col>
					<Col :span="7" :offset="1">
					<FormItem labelText="指定生效时间：">
						<span>{{offerUnsubscribeRule.effDate | date}}</span>
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
			<Form labelWidth="120px" labelAlign="left">
				<Row>
					<Col :span="7">
					<FormItem labelText="到期处理方式：" :requiredIcon="false">
						<span>{{offerExpCfg.dealType}}</span>
					</FormItem>
					</Col>
				</Row>
			</Form>
		</div>
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
				dialogSize: {
					size: 80,
					min: 600,
					max: 800
				},
				
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
				serverData: [],
				isShow:false,
			}
		},
		mounted() {
			//this.offerId = this.componentData.offerId;
			this.getRuleData();
			//this.offerOrderRule.expType = "1300"
		},
		methods: {
			getRuleData() {
				this.$axios.get(this.$api.replace(this.$api.OfferRule, ['{offerId}'], [this.componentData.offerId]), {
						params: {
							statusCd: '1000'
						}
					}).then(res => {
					if(res.data.success == true) {
						console.log(res,'受理')
						this.offerOrderRule = res.data.offerOrderRuleDTO;
						this.offerRemewalRule = res.data.offerRemewalRuleDTO;
						this.offerUnsubscribeRule = res.data.offerUnsubscribeRuleDTO;
						this.offerChangeRule = res.data.offerChangeRuleDTO;
						this.offerExpCfg = res.data.offerExpCfgDTO;

						switch(this.offerExpCfg.dealType){
                            case '10': this.offerExpCfg.dealType = '自动续订';
                            break;
                            case '20': this.offerExpCfg.dealType = '再次协议续订';
                            break;
                            case '30': this.offerExpCfg.dealType = '自动退订';
                            break;
                            case '40': this.offerExpCfg.dealType = '自动注销';
                            break;
                        }

						this.offerOrderRule.effType = this.filteffType(this.offerOrderRule.effType)
						this.filtexpType(this.offerOrderRule.expType)
						this.filtExistType(this.offerOrderRule.prodExistType)

						this.offerUnsubscribeRule.effType = this.filteffType(this.offerUnsubscribeRule.effType)
						this.offerChangeRule.effType = this.filteffType(this.offerChangeRule.effType)

					} else {

					}
				}).catch(error => {

				})
			},
			getTime(val) {
				switch(val){
                    case '1000': return '年';
                    break;
                    case '1100': return '月';
                    break;
                    case '1200': return '日';
                    break;
                }
			},
			filteffType(info){
				switch(info){
                    case '1000': return '当月生效';
                    break;
                    case '1100': return '次月生效';
                    break;
                    case '1200': return '用户选择时间生效';
                    break;
                    case '1300': return '立即生效';
                    break;
                    case '1600': return '业务指定时间生效';
                    break;
                    case '1700': return '次日生效';
                    break;
                    case '1800': return '当天生效';
                    break;
                    case '1900': return '次周期生效（物联网专用）';
                    break;
                }
			},
			filtexpType(info){
				switch(info){
                    case '1000': return this.offerOrderRule.expType = '当月失效';
                    break;
                    case '1100': return this.offerOrderRule.expType = '次月失效';
                    break;
                    case '1200': return this.offerOrderRule.expType = '用户选择时间失效';
					break;
					case '1300': return this.offerOrderRule.expType = '立即失效';
					break;
					case '1600': return this.offerOrderRule.expType = '业务指定时间失效';
					break;
					case '1700': return this.offerOrderRule.expType = '次日失效';
                    break;
					case '1800': return this.offerOrderRule.expType = '当天失效';
                    break;
                }
			},
			filtExistType(info){
				switch(info){
                    case '1000': return this.offerOrderRule.prodExistType = '新装';
                    break;
                    case '1100': return this.offerOrderRule.prodExistType = '在用';
                    break;
                    case '1200': return this.offerOrderRule.prodExistType = '新装&在用（全部用户）';
                    break;
                }
			},

			getServerData() {
				
			},
			getServerList() {
				
			},
			
			more() {
				if(this.isShow) {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
			},
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