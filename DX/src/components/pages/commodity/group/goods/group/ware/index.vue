<template>
	<div class="ware">
		<div class="app__top">
			<span class="app__top-left">促销规则</span>
		</div>
		<div class="prices-module">
			<Row>
        		<Col :span="4" class="left-col">计费模板</Col>
        		<Col :span="20">
        			<Row>
        				<Col :span="24">
    						<ul>
    							<li v-for="(item,index) in moduleArray" :key="index">
    								<span v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addModule(item)">&nbsp;{{item.label}}</span>
    								<span v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang span" @click="deleteMod(item)">&nbsp;{{item.label}}</span>
    							</li>
    						</ul>
        				</Col>
        			</Row>
        		</Col>
        	</Row>
		</div>
		<div class="app__table" v-for="(item,index) in procModeInsts" :key="index">
			<Row :class="['app__table-item']">
				<Col :span="5" class="local-tit">{{item.procModeName}}</Col>
				<Col :span="16" :offset="5" class="border-col">
				<Row :class="item.classItem==null?'item-active':''">
					<Col :span="11" v-for="(attr,i) in item.procModeInstAttrs" :key="i">
					<FormItem v-if="attr.isRequired == '1'" labelWidth="150px" :labelText="attr.attrName" :errorMessage="errors.first(attr.attrName + index + i)" :requiredIcon="true">
						<Input v-if="attr.attrValueType == '1000'" v-model="attr.procModeInstAttrValue" :name="attr.attrName + index + i" v-validate="'required'" :data-vv-as="attr.attrName"></Input>
						<Select v-else v-model="attr.procModeInstAttrValue" :data="attr.attrValues" dataValueStr="attrValue" dataLabelStr="attrValueName" :name="attr.attrName + index + i" v-validate="'required'" :data-vv-as="attr.attrName"></Select>
					</FormItem>
					<FormItem v-if="attr.isRequired == '0'" labelWidth="150px" :labelText="attr.attrName" :requiredIcon="false">
						<Input v-if="attr.attrValueType == '1000'" v-model="attr.procModeInstAttrValue"></Input>
						<Select v-else v-model="attr.procModeInstAttrValue" :data="attr.attrValues" dataValueStr="attrValue" dataLabelStr="attrValueName"></Select>
					</FormItem>
					</Col>
				</Row>
				</Col>
				<Col :span="3" class="local-icon">
				<span class="span" @click="deleteModule(item,index)">删除</span>
				</Col>
			</Row>
			<div :class="item.classItem==null?'item-open':'item-close'" @click="openClick(item)"></div>
		</div>
		 <Row v-if="!procModeInsts.length" class="app__data-none">
                <Col>
                    <span>当前无数据 请先选择资费模板</span>
                </Col>
            </Row>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				dialogSize: {
					size: 80,
					min: 700,
					max: 900
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				dialogTitle: '',
				procModeInsts: [],
				modelPromotioncheck: [],
				procModesIdList: [],
				promotionModelList: [],
				procModeInstAttrs: [],
				procModetAttrs: [],
				modeInstAttrs: [],
				offerId: '',
				moduleArray: [],
				procModeIdSelected: [],
				tipSelData: {},
				tipSelIndex: 0
			}
		},
		mounted() {
			this.offerId = this.componentData.offerId;
			this.findPromotion();
			this.procModePage();
		},
		watch: {
			procModeIdSelected(val, oldVal) {
				if(val.length<=oldVal.length){
					return
				}else{
					if(val !== oldVal) {
						this.$axios.get(this.$api.replace(this.$api.ProcMode, ['{procModeId}'], [val[val.length-1]]), {
							params: {
	
							}
						}).then(
	
						).then(res => {
							if(res.data.success == true) {
								this.procModeInsts.push(res.data.procModeInsts[0])
							} else {
								this.$message.error({message: res.data.msg})
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg })
						})
					}
				}
			}
		},
		methods: {
			findPromotion() {
				this.procModeIdSelected = [];
				this.procModeInsts = [];
				if(this.offerId) {
					this.$axios.get(this.$api.replace(this.$api.Promotion, ['{offerId}'], [this.offerId]), {
						params: {
							statusCd: '1000'
						}
					}).then(

					).then(res => {
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
				}
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
			addModule(item) {
				this.$axios.get(this.$api.replace(this.$api.ProcMode, ['{procModeId}'], [item.value]), {
					params: {

					}
				}).then(

				).then(res => {
					if(res.data.success == true) {
						this.procModeInsts.push(res.data.procModeInsts[0])
					} else {
						this.$message.error({message: res.data.msg})
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			deleteMod(item) {
				for(var i=0;i<this.procModeInsts.length;i++){
					if(this.procModeInsts[i].procModeId == item.value){
						this.procModeInsts.splice(i,1);
					}
				}
			},
			save(callback) {
				let tempArray = this.procModeInsts.map( item => {
					return {
						procModeInstId: item.procModeInstId,
						procModeId: item.procModeId,
						offerId: this.offerId,
						procModeInstAttrs:item.procModeInstAttrs.map(attrsItem => {
							return {
								procModeInstAttrId:attrsItem.procModeInstAttrId,
								procModeInstId: attrsItem.procModeInstId,
								procModeAttrRelId: attrsItem.procModeAttrRelId,
								procModeInstAttrValue: attrsItem.procModeInstAttrValue,
								statusCd:'1000'
							}
						}),
						statusCd:'1000'
					}
				})
				this.$validator.validateAll().then((result) => {
					if(result) {
						this.$axios.post(this.$api.replace(this.$api.AddPromotion, ['{offerId}'], [this.offerId]), {
							"procModeInst": tempArray
						}).then(
							
						).then(res => {
							if(res.data.success == true) {
								this.findPromotion();
								this.$message.success({ message: '促销规则保存成功！' });
								callback(true)
							} else {
								this.$message.error({message: res.data.msg})
								callback(false)
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg })
							callback(false)
						})
					}else{
						this.$message.error({ message: '促销规则表单验证失败！' });
						callback(false)
					}
				})
			},
			deleteModule(item,index) {
					this.tipType = 'DEL';
					this.tipSelData = item;
					this.tipSelIndex = index;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认删除？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
			},
			selectProcMode() {
				this.modelPromotioncheck = [];
				for(let ele of this.procModes) {
					this.modelPromotioncheck.push(ele.procModeId)
				}
				this.dialogTitle = "选择促销规则模板"
				this.$refs.addModelDialog.show();
				this.procModePage()
			},
			tipConfirm() {
				if(this.tipSelData.offerId){
					this.$axios.post(this.$api.replace(this.$api.AddPromotion, ['{offerId}'], [this.offerId]), {
						"procModeInst": [{
							"procModeInstId": this.tipSelData.procModeInstId,
							"procModeId": this.tipSelData.procModeId,
							"offerId": this.tipSelData.offerId,
							"createStaff": "11",
							"updateStaff": "11",
							"statusCd": "1100",
							"createDate": "2018-10-16T00:00:00Z",
							"updateDate": "2018-10-16T00:00:00Z",
							"procModeInstAttrs": this.tipSelData.procModeInstAttrs
						}]
					}).then(
	
					).then(res => {
						if(res.data.success == true) {
							this.findPromotion();
							this.$refs.tip.hide();
							this.$message.success({message: '促销规则删除成功！'});
						} else {
							this.$message.error({message: res.data.msg})
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg });
					})
				}else{
					this.$refs.tip.hide();
					this.procModeInsts.splice(this.tipSelIndex,1);
					if(this.procModeInsts.length == 0){
						this.procModeIdSelected = [];
					}else{
						this.procModeIdSelected = this.procModeIdSelected.filter( selItem => selItem != this.tipSelData.procModeId);	
					}
				}
			},
			selectMkt(val) {
				return this.procModeInsts.filter(item => item.statusCd != '1100').find(item => item.procModeId == val.value)
			}
		}
	}
</script>

<style scoped lang="scss">
	.ware {
		width: 100%;
		.prices-module{
        	height: 100px;
        	background: #f5f6fa;
        	margin-bottom: 20px;
        	.row{
        		height: 100%;
        		line-height: 100px;
        		.left-col{
        			border-right: 1px solid gainsboro;
        			/*line-height: 100px;*/
        		}
        		.col{
        		text-align: center;
        		ul{
        			padding-left: 20px;
        			li {
        			height: 30px;	
        			float: left;
        			margin-right: 20px;
        			.iconfont {
        				font-size: 12px;
        				cursor: pointer;
        			}
        			.span{
        				color: $mainColor;
        			}
        		}
        		}
        	}
        	}
        }
		.app__table {
			.app__table-item{
				background: #ffffff;
				border: 1px solid gainsboro;
				.border-col{
					border-left: 1px solid gainsboro;
					border-right: 1px solid gainsboro;
					padding: 15px 0;
				}
				.local-tit{
		            position: absolute;
		            top: 50%;
		            /*left: 9.5%;*/
		            margin-left: -10px;
		            margin-top: -20px;
		            text-align: center;
		        }
			}
			.row{
				margin-bottom: 10px;
				/*padding: 15px 0;*/
				/*.col{
					text-align: center;
				}*/
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
            text-align: center;
            padding-left: 0;
            .span{
            	color: $mainColor;
            	cursor: pointer;
            }
        }
		.item-active {
			max-height: 170px;
			overflow: hidden;
		}
		.item-open {
			position: absolute;
			bottom: -21px;
			left: 0;
			width: 100%;
			height: 30px;
			background: url(./images/expand.png) no-repeat center;
			cursor: pointer;
		}
		.item-close {
			position: absolute;
			bottom: -8px;
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