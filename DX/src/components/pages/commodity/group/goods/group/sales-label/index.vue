<template>
	<div class="sales-label">
		<div class="app__top" @click="elShowClick()">
			<span class="app__top-left">销售品标签</span>
			<i :class="['iconfont','icon-xiala12',elIsShow ? 'active' : '']" @click.stop="elShowClick()"></i>
		</div>
		<div class="h-a-add" v-show="elIsShow">
			<div class="app__btn app__btn-add" @click='addLabel()'>添加</div>
		</div>
		<div class="group"  v-show="elIsShow">
			<Row>
				<Col :span="4" v-for="(item,index) in laberRelsArr" :key="index">
					{{item.labelName}}：
					<span v-if="item.labelValueType == '2000'">{{item.valueName}}</span>
					<span v-if="item.labelValueType == '1000'">{{item.labelValue}}</span>
					<span class="span" @click="deleteLaberRelsArr(item)"></span>
				</Col>
			</Row>
		</div>
		<Row v-if="!laberRelsArr.length && elIsShow" class="app__data-none">
			<Col :span="24">
			<span>当前无数据 请先选择标签！</span>
			</Col>
		</Row>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加标签" ref="addLabel" @confirm="saveLabel" @close="labelDialogClose">
			<Scroll class="main" :isShowRight="true">
				<div class="search">
					<Search placeholder="请输入标签名称搜索" @search="labelNameSearch"></Search>
				</div>
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="6">标签编码</Col>
						<Col :span="6">标签名称</Col>
						<Col :span="4">标签类型</Col>
						<Col :span="5">属性类型</Col>
						<Col :span="3">操作</Col>
					</Row>
					<Row v-if="labelList.length>0" :class="['app__table-item']" v-for="(item,index) in labelList" :key="index">
						<Col :span="6">{{item.labelCode}}</Col>
						<Col :span="6">{{item.labelName}}</Col>
						<Col :span="4">{{item.labelType == "10"?"客户":item.labelType == "20"?"产品":item.labelType == "30"?"销售品":item.labelType == "40"?"产品实例": item.labelType == "50" ? "销售品实例" : '无'}}</Col>
						<Col :span="5">{{item.labelValueType=="1000"?"输入型":"枚举型"}}</Col>
						<Col :span="3">
						<span v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addLabelClick(item)"></span>
						<span v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteLabelClick(item)"></span>
						</Col>
					</Row>
					<Row v-if="labelList.length===0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据 请先选择标签</span>
						</Col>
					</Row>
				</div>
				<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange" :isCenter="true">
				</Pagination>
				<span class="y-span" v-if="labelSelectData.length>0">已选</span>
				<div class="app__table__inner" v-if="labelSelectData.length>0">
					<Row class="app__table-thead">
						<Col :span="4">标签编码</Col>
						<Col :span="4">标签名称</Col>
						<Col :span="4">类型</Col>
						<Col :span="4">属性值类别</Col>
						<Col :span="4">配置参数</Col>
						<Col :span="4">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in delmkt(labelSelectData)" :key="index">
						<Col :span="4">{{item.labelCode}}</Col>
						<Col :span="4">{{item.labelName}}</Col>
						<Col :span="4">{{item.labelType == "10"?"客户":item.labelType == "20"?"产品":item.labelType == "30"?"销售品":item.labelType == "40"?"产品实例": item.labelType == "50"? "销售品实例" : '无'}}</Col>
						<Col :span="4">{{item.labelValueType=="1000"?"输入型":"枚举型"}}</Col>
						<Col :span="4" v-if="item.labelValueType == '2000'">
						<Select v-model="item.labelValueId" :data="item.selectData"></Select>
						</Col>
						<Col :span="4" v-if="item.labelValueType == '1000'">
						<Input v-model="item.labelValue"></Input>
						</Col>
						<Col :span="4">
						<span class="iconfont icon-shanchu" @click="deleteLabel(index,item)"></span>
						</Col>
					</Row>
				</div>
			</Scroll>
		</Dialog>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
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
				dialogSize: {
					size: 80,
					min: 600,
					max: 800
				},
				pageInfo: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
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
				labelSearchName:'',
				elIsShow: false
			}
		},
		mounted() {
			this.offerId = this.componentData.offerId;
			this.getObjectLabelRel();
		},
		methods: {
			getObjectLabelRel() {
				this.$axios.get(this.$api.replace(this.$api.ObjectLabelRel, ['{offerId}'], [this.offerId]), {
					params: {
						labelType: '30'
					}
				}).then(res => {
					if(res.data.success == true) {
						this.laberRelsArr = res.data.labelResList.content || [];
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
			//2.1.	标签列表查询(分页)
			getLabel() {
				this.$axios.get(this.$api.LabelList, {
					params: {
						labelCode: '',
						labelName: this.labelSearchName,
						labelType: '30',
						page: this.pageInfo.pageIndex,
						limit: this.pageInfo.pageSize
					}
				}).then(res => {
					if(res.data.success == true) {
						this.labelList = res.data.labelList.content;
						this.pageInfo.rowCount = res.data.labelList.total;
					} else {
						this.$message.error({ message: res.data.msg });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.msg})
				})
			},
			pageChange(page) {
				this.pageInfo.pageIndex = page;
				this.getLabel();
			},
			addLabelClick(item) {
				if(item.labelValueType == '2000') {
					this.$axios.get(this.$api.replace(this.$api.Label, ['{labelId}'], [item.labelId]), {
						params: {
							//						limit: '10',
							//						page: '1'
						}
					}).then(res => {
						if(res.data.success == true) {
							let aaa = res.data.dLabelValueDTOList;
							let temp = [];
							for(let ele of aaa) {
								temp.push({
									label: ele.valueName,
									value: ele.labelValue
								})
							}
							this.$set(item, 'selectData', temp);
							let Temp = {
								labelCode: item.labelCode,
								labelName: item.labelName,
								labelType: item.labelType,
								labelValueType: item.labelValueType,
								labelId: item.labelId,
								statusCd: item.statusCd,
								labelValue: '',
								labelValueId: item.labelValueId,
								selectData: item.selectData,
								objectLabelRelId: item.objectLabelRelId
							}
							this.labelSelectData.push(Temp);
						} else {
							this.$message.error({ message: res.data.msg });
						}
					}).catch(error => {
						this.$message.error({message: error.response.data.msg})
					})
				} else {
					let Temp = {
						labelCode: item.labelCode,
						labelName: item.labelName,
						labelType: item.labelType,
						labelValueType: item.labelValueType,
						labelId: item.labelId,
						statusCd: item.statusCd,
						labelValue: item.labelValue,
						labelValueId: '',
						objectLabelRelId: item.objectLabelRelId
					}
					this.labelSelectData.push(Temp);
				}
			},
			deleteLabelClick(item) {
				for(var i=0;i<this.labelSelectData.length;i++){
					if(this.labelSelectData[i].labelId == item.labelId){
						this.labelSelectData.splice(i,1);
					}
				}
			},
			addLabel() {
				this.labelSelectData = [];
				for(let ele of this.laberRelsArr) {
					if(ele.labelValueType == '2000') {
						this.$axios.get(this.$api.replace(this.$api.Label, ['{labelId}'], [ele.labelId]), {
							params: {
								//						limit: '10',
								//						page: '1'
							}
						}).then(res => {
							if(res.data.success == true) {
								let aaa = res.data.dLabelValueDTOList;
								let temp = [];
								for(let val of aaa) {
									temp.push({
										label: val.valueName,
										value: val.labelValue
									})
								}
								this.$set(ele, 'selectData', temp);
								let Temp = {
									labelCode: ele.labelCode,
									labelName: ele.labelName,
									labelType: ele.labelType,
									labelValueType: ele.labelValueType,
									labelId: ele.labelId,
									statusCd: '1000',
									labelValue: '',
									labelValueId: ele.labelValueId,
									objectLabelRelId: ele.objectLabelRelId,
									selectData: ele.selectData
								}
								this.labelSelectData.push(Temp);
							} else {
								this.$message.error({ message: res.data.msg });
							}
						}).catch(error => {
							this.$message.error({message: error.response.data.msg})
						})
					} else {
						let Temp = {
							labelCode: ele.labelCode,
							labelName: ele.labelName,
							labelType: ele.labelType,
							labelValueType: ele.labelValueType,
							labelId: ele.labelId,
							statusCd: '1000',
							labelValue: ele.labelValue,
							labelValueId: '',
							objectLabelRelId: ele.objectLabelRelId
						}
						this.labelSelectData.push(Temp);
					}
				}
				this.$refs.addLabel.show();
				this.getLabel();
			},
			deleteLabel(index,item) {
				item.statusCd = '1100'
			},
			saveLabel() {
				this.laberRelsArr = [];
				for(let ele of this.labelSelectData) {
					let temp = {};
					if(ele.labelValueType == '2000') {
						temp = {
							"labelCode": ele.labelCode,
							"labelName": ele.labelName,
							"labelType": ele.labelType,
							"labelValueType": ele.labelValueType,
							"labelId": ele.labelId,
							"labelValue": "",
							"labelValueId": ele.labelValueId,
							"objectLabelRelId": ele.objectLabelRelId,
							"statusCd": ele.statusCd,
							"selectData": ele.selectData
						}
						this.laberRelsArr.push(temp);
					} else {
						temp = {
							"labelCode": ele.labelCode,
							"labelName": ele.labelName,
							"labelType": ele.labelType,
							"labelValueType": ele.labelValueType,
							"labelId": ele.labelId,
							"labelValue": ele.labelValue,
							"labelValueId": '',
							"objectLabelRelId": ele.objectLabelRelId,
							"statusCd": ele.statusCd,
							"selectData": []
						}
						this.laberRelsArr.push(temp);
					}
				}
				for(let ele of this.laberRelsArr) {
					for(let val of ele.selectData) {
						if(ele.labelValueId == val.value) {
							ele.valueName = val.label
						}
					}
				}
				this.saveOnly();
				this.$refs.addLabel.hide();
			},
			deleteLaberRelsArr(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() {
				this.tipSelData.statusCd = '1100';
				this.saveOnly();
				this.$refs.tip.hide();
			},
			delmkt(arr) {
				return [...arr].filter(item => item.statusCd != '1100');
			},
			selectMkt(val) {
				return this.labelSelectData.filter(item => item.statusCd != '1100').find(item => item.labelId == val.labelId)
			},
			saveOnly() {
				this.laberRelsArrTemp = [];
				for(let ele of this.laberRelsArr) {
					let temp = {};
					if(ele.labelValueType == '2000') {
						temp = {
							"labelId": ele.labelId,
							"labelValue": "",
							"labelValueId": ele.labelValueId,
							"objectLabelRelId": ele.objectLabelRelId,
							"statusCd": ele.statusCd,
							"updateStaff": 10000
						}
						this.laberRelsArrTemp.push(temp);
					} else {
						temp = {
							"labelId": ele.labelId,
							"labelValue": ele.labelValue,
							"labelValueId": '',
							"objectLabelRelId": ele.objectLabelRelId,
							"statusCd": ele.statusCd,
							"updateStaff": 10000
						}
						this.laberRelsArrTemp.push(temp);
					}
				}
				this.$axios.post(this.$api.replace(this.$api.ObjectLabelRel, ['{offerId}'], [this.offerId]),
					this.laberRelsArrTemp
				).then(res => {
					if(res.data.success == true) {
						this.getObjectLabelRel()
						this.$message.success({ message: '销售品标签保存成功！' });
					} else {
						this.$message.error({ message: res.data.msg });
					}
				}).catch(error => {
						this.$message.error({message: error.response.data.msg})
				})
			},
			labelNameSearch(val){
				this.labelSearchName = val;
				this.pageInfo.pageIndex = 1;
				this.getLabel(val);
			},
			labelDialogClose(){
				this.labelSearchName = '';
				this.pageInfo.pageIndex = 1;
			},
			elShowClick(){
				this.elIsShow = !this.elIsShow;
			}
		}
	}
</script>

<style scoped lang="scss">
	.sales-label {
		width: 100%;
		
		.app__top{
			cursor: pointer;
            pointer-events: auto;

			.icon-xiala12{
				position: absolute;
				top: 8px;
				right: 10px;
				font-size: 16px;
				color: $mainColor;
				transition: all .3s ease;

				&.active{
					transform: rotate(-180deg);
				}
			}
		}

		.h-a-add {
			margin: 10px 0;
		}
		.app__table {
			.span {
				color: $mainColor;
				padding: 0 5px;
				cursor: pointer;
			}
		}
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
	
	.main {
		padding: 20px;
		.search {
			width: 300px;
			margin-bottom: 20px;
		}
		.y-span {
			display: block;
			margin: 10px 0;
			color: #b6de8f;
		}
		.icon-xuanzhong-fang{
			color: $mainColor;
		}
	}
</style>