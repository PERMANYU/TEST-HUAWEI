<template>
	<div class="ware">
		<div class="app__top">
			<span class="app__top-left">促销规则</span>
		</div>
		<div class="app__table" v-for="(item,index) in procModeInsts" :key="index">
			<Row :class="['app__table-item']">
				<Col :span="5" class="local-tit">{{item.procModeName}}</Col>
				<Col :span="16" :offset="4">
				<Row :class="item.classItem==null?'item-active':''">
					<Col :span="11" :offset="1" v-for="(attr,i) in item.procModeInstAttrs" :key="i">
					<FormItem v-if="attr.isRequired == '1'" labelWidth="150px" :labelText="attr.attrName" :errorMessage="errors.first(attr.attrName + index + i)" :requiredIcon="true">
						<Input v-if="attr.attrValueType == '1000'" v-model="attr.procModeInstAttrValue" :name="attr.attrName + index + i" v-validate="'required'" :data-vv-as="attr.attrName" disabled></Input>
						<Select v-else v-model="attr.procModeInstAttrValue" :data="attr.attrValues" dataValueStr="attrValue" dataLabelStr="attrValueName" :name="attr.attrName + index + i" v-validate="'required'" :data-vv-as="attr.attrName" disabled></Select>
					</FormItem>
					<FormItem v-if="attr.isRequired == '0'" labelWidth="150px" :labelText="attr.attrName" :requiredIcon="false">
						<Input v-if="attr.attrValueType == '1000'" v-model="attr.procModeInstAttrValue" disabled></Input>
						<Select v-else v-model="attr.procModeInstAttrValue" :data="attr.attrValues" dataValueStr="attrValue" dataLabelStr="attrValueName" disabled></Select>
					</FormItem>
					</Col>
				</Row>
				</Col>
			</Row>
			<div :class="item.classItem==null?'item-open':'item-close'" @click="openClick(item)"></div>
		</div>
		 <Row v-if="!procModeInsts.length" class="app__data-none">
                <Col>
                    <span>当前无数据 请先选择资费模板</span>
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
				procModeInsts: [],
				procModesIdList: [],
				procModeInstAttrs: [],
				modeInstAttrs: [],
				offerId: '',
				moduleArray: [],
				procModeIdSelected: [],
			}
		},
		mounted() {
			//this.offerId = this.componentData.offerId;
			this.findPromotion();
			//this.procModePage();
		},
		methods: {
			findPromotion() { 
				//this.procModeIdSelected = [];
				//this.procModeInsts = [];
				this.$axios.get(this.$api.replace(this.$api.Promotion, ['{offerId}'], [this.componentData.offerId]), {
                    params: {
                        statusCd: '1000'
                    }
                }).then().then(res => {
						console.log(res,'促销规则')
						if(res.data.success == true) {
							if(res.data.procModeInsts) {
								this.procModeInsts = res.data.procModeInsts;
								for(let ele of this.procModeInsts) {
									this.procModeIdSelected.push(ele.procModeId);
								}
							}

						} else {
							this.$message.error({message: res.data.msg})
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg })
					})
			},
			//3.5.	配置能力模板列表查询
			procModePage() {
				this.$axios.get(this.$api.procModePage, {
					params: {
						procModeCode: '',
						procModeName: '',
						statusCd: '1000',
						page: '1',
						limit: '10'
					}
				}).then(res => {
					if(res.data.success) {
						let procModePage = [];
						procModePage = res.data.procModePage.content;
						for(let ele of procModePage) {
							this.moduleArray.push({
								value: ele.procModeId,
								label: ele.procModeName
							})
						}

					} else {
						this.$message.error({message: res.data.msg})
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			// 展开更多数据
			openClick(item) {
				if(item.classItem == null) {
					this.$set(item, 'classItem', 'Y');
				} else {
					item.classItem = null;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.ware {
		width: 100%;
		.prices-module {
			padding: 20px;
			margin-bottom: 20px;
			margin-top: 10px;
			background: #f5f6fa;
		}
		.app__table {
			.app__table-item{
				background: #ffffff;
				.local-tit{
            position: absolute;
            top: 50%;
            left: 9.5%;
            margin-left: -10px;
            margin-top: -20px;
        }
			}
			.row{
				margin-bottom: 10px;
				padding: 15px 0;
			}
			.icon-shanchu {
			display: block;
			margin: 0 auto;
			width: 20px;
			height: 20px;
			vertical-align: middle;
			cursor: pointer;
		}
		.local-icon{
            position: absolute;
            top: 50%;
            right: 0;
            margin-left: -10px;
            margin-top: -18px;
        }
		.item-active {
			max-height: 170px;
			overflow: hidden;
		}
		.item-open {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 30px;
			background: url(./images/expand.png) no-repeat center;
			cursor: pointer;
		}
		.item-close {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 30px;
			background: url(./images/expand_2.png) no-repeat center;
			cursor: pointer;
		}
		}
		
		.main {
			padding: 20px;
		}
	}
</style>