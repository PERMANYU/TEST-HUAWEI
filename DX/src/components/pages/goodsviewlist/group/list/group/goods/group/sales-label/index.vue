<template>
	<div class="sales-label">
		<div class="app__top">
			<span class="app__top-left">销售品标签</span>
		</div>
		<div class="group">
			<Row>
				<Col :span="4" v-for="(item,index) in laberRelsArr" :key="index">
					{{item.labelName}}：
					<span>{{item.valueName}}</span>
				</Col>
			</Row>
		</div>
		<Row v-if="!laberRelsArr.length" class="app__data-none">
			<Col :span="24">
			<span>当前无数据</span>
			</Col>
		</Row>
		
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				offerId: "",
				labelId: "",
				
				
				
				labelCode: "",
				labelName: "",
				labelType: "30",
				labelPageObj: {
					limit: "5",
					page: "1"
				},
				laberRelsArr: [],
				labelList: [],
				dlabel: {
					labelId: "",
					labelCode: "",
					labelName: "",
					labelType: "",
					labelValueType: ""
				},
				staff: "222",
				labelSelectData: [],
				tipSelData: {},
				laberRelsArrTemp: [],
				labelSearchName:''
			}
		},
		mounted() {
			//this.offerId = this.componentData.offerId;
			this.getObjectLabelRel();
		},
		methods: {
			getObjectLabelRel() {   
				this.$axios.get(this.$api.replace(this.$api.ObjectLabelRel, ['{offerId}'], [this.componentData.offerId]), {
                    params: {
                        labelType: '30'
                    }
                }).then(res => {
					if(res.data.success == true) {
						console.log(res,'销售品标签')
						this.laberRelsArr = res.data.labelResList;
						for(let ele of this.laberRelsArr) {
							for(let value of ele.labelValues) {
								if(ele.labelValueId == value.labelValueId) {
									ele.valueName = value.valueName
								}
							}
						}
					} else {
						this.$message.error({ message: res.data.msg });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.msg})
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.sales-label {
		width: 100%;
		
		.group {
			.col {
				background: #eff6fc;
				margin-right: 10px;
				margin-bottom: 10px;
				padding-left: 10px;
				color: $mainColor;
				.span {
					display: block;
					width: 8px;
					height: 8px;
					background: url(images/bqsc.png) no-repeat;
					position: absolute;
					right: 10px;
					top: 18px;
					cursor: pointer;
				}
			}
		}
	}
</style>