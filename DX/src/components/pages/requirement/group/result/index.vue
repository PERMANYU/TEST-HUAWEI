<template>
	<div class="result_wrap">
		<div class="result_content">
			<div class="tj"></div>
			<h3>你发起的需求单提交成功</h3>
			<Row>
				<Col :span="10" :offset="2">
				<FormItem labelText="需求单编号：">
					<span class="r-text">{{requireForm.requirementCode}}</span>
				</FormItem>
				</Col>
				<Col :span="10" :offset="2">
				<FormItem labelText="需求单名称：">
					<span class="r-text">{{requireForm.requirementName}}</span>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col :span="8" :offset="4">
				<div class="app__btn app__btn-set" @click="setPage()">配置</div>
				</Col>
				<Col :span="8">
				<div class="app__btn app__btn-back" @click="globalback">返回</div>
				</Col>
			</Row>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				requireForm: {
					requirementCode: "",
					requirementName: ""
				}
			}
		},
		mounted() {
			this.initData()
		},
		methods: {
			initData() {
				if(this.componentData.requirementId) {
					this.$axios.get(this.$api.replace(this.$api.QureyRequirementTask,['{requirementId}'],[this.componentData.requirementId]),{
						params: {
							showMember: 1
						}
					}).then(res => {
						if(res.data.success === true){
							this.requireForm = res.data.requirementDetail;
						} else {
							this.$message.error({ message: res.data.msg })
						}
					}).catch(error => {
						this.$message.error({ message: res.data.msg })
					})
				}
			},
			setPage() {
				if(this.requireForm.requestType == "10"){
					this.$emit('componentView', 'prodCatalog', this.componentData);
				}else{
					this.$emit('componentView', 'info', this.componentData)
				}
			},
			globalback() {
				this.$emit('componentView', 'list')
			}
		}
	}
</script>

<style scoped lang="scss">
	.result_wrap {
		position: relative;
		width: 100%;
		height: 100%;
		.result_content {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 320px;
			height: 228px;
			margin-top: -160px;
			margin-left: -114px;
			.tj {
				width: 100%;
				height: 88px;
				background: url(images/tj.png) no-repeat center;
				background-size: 106px 88px;
			}
			h3 {
				font-family: MicrosoftYaHei-Bold;
				font-size: 18px;
				font-stretch: normal;
				line-height: 40px;
				letter-spacing: 0px;
				color: #333333;
				text-align: center;
			}

			.r-text{
				white-space: nowrap;
			}
		}
	}
</style>