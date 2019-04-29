<template>
	<div class="apportion">
		<div class="app__table" v-show="offerapportionoffermemberextls[0].offerApporationType != '30'">
			<table cellspacing="0" cellpadding="0" class="table">
				<thead>
					<tr>
						<th>销售品名称</th>
						<th>销售品原价（元）</th>
						<th>套内产品</th>
						<th>接入产品</th>
						<th>业务量</th>
						<th>公允价值(元)</th>
						<th>收入费用项编码</th>
						<th>静态分摊价格(元)</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="(item,index) in offerapportionoffermemberextls">
						<tr v-for="(itemList,i) in item.offerapportionmemberextls" :key="i">
							<td v-show="i == '0'" :rowspan="item.offerapportionmemberextls.length">{{item.offerName}}</td>
							<td v-show="i == '0'" :rowspan="item.offerapportionmemberextls.length">{{item.offerOriginalPrice}}</td>
							<td class="tag-td">
								<span v-if="itemList.notApportionProd == '2'" class="tag-span" @mouseenter="enterProd(i)" @mouseleave="leave()"></span>
								<span v-else>{{itemList.fairValueName}}</span>
								<div class="tag" v-show="itemList.notApportionProd == '2' && i==currentProd">
									<div class="border-down-empty">
										<span></span>
									</div>
									{{itemList.notApportionProdMemo}}
								</div>
							</td>
							<td>{{itemList.productName}}</td>
							<td>{{itemList.busiNum}}</td>
							<td class="tag-td">
								<span v-if="itemList.notApportionProd == '2'" class="tag-span" @mouseenter="enter(i)" @mouseleave="leave()"></span>
								<span v-else>{{itemList.apportionFairValue}}</span>
								<div class="tag" v-show="itemList.notApportionProd == '2' && i==current">
									<div class="border-down-empty">
										<span></span>
									</div>
									{{itemList.notApportionProdMemo}}
								</div>
							</td>
							<td v-if="itemList.isShowCode == '2'">{{itemList.chrgItemsCode}}</td>
							<td v-else class="chr-td">
								<Input v-if="itemList.notApportionProd != '2'" v-model="itemList.chrgItemsCode"></Input>
							</td>
							<td class="table-td">{{itemList.apportionValue}}</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>
		<div class="app__table" v-show="offerapportionoffermemberextls[0].offerApporationType == '30'">
			<table cellspacing="0" cellpadding="0" class="table">
				<thead>
					<tr>
						<th>销售品名称</th>
						<th>销售品原价(元)</th>
						<th>是否参与公允价值</th>
						<th>套内产品</th>
						<th>接入产品</th>
						<th>业务量</th>
						<th>公允价值(元)</th>
						<th>静态分摊价格(元)</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="(item,index) in offerapportionoffermemberextls">
						<tr v-for="(itemList,i) in item.offerapportionmemberextls" :key="i">
							<td v-show="i == '0'" :rowspan="item.offerapportionmemberextls.length">{{item.offerName}}</td>
							<td v-show="i == '0'" :rowspan="item.offerapportionmemberextls.length">{{item.offerOriginalPrice}}</td>
							<td v-show="i == '0'" :rowspan="item.offerapportionmemberextls.length">{{item.isFair}}</td>
							<td>{{itemList.fairValueName}}</td>
							<td>{{itemList.productName}}</td>
							<td>{{itemList.busiNum}}</td>
							<td>{{itemList.apportionFairValue}}</td>
							<td class="table-td">{{itemList.apportionValue}}</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>
		<div class="basic-content">
			<Form labelWidth="160px" labelAlign="left">
				<Row v-show="offerapportionoffermemberextls[0].offerApporationType == '10'">
					<Col :span="12">
					<FormItem labelText="是否纳入组合套餐分摊：">
						<RadioGroup :data="boolSelectArray" v-model="offerapportionoffermemberextls[0].isCombinationSharing"></RadioGroup>
					</FormItem>
					</Col>
				</Row>
				<Row v-show="offerapportionoffermemberextls[0].offerApporationType == '40' || offerapportionoffermemberextls[0].offerApporationType == '50' || offerapportionoffermemberextls[0].offerApporationType == '60'">
					<Col :span="11">
					<FormItem labelText="是否纳入主套餐分摊：">
						<RadioGroup :data="mainSharingArray" v-model="offerapportionoffermemberextls[0].isMainSharing"></RadioGroup>
					</FormItem>
					</Col>
					<Col :span="12" :offset="1" v-show="offerapportionoffermemberextls[0].offerApporationType == '60'">
						<FormItem labelText="金额(元)：">
							<Input v-model="offerapportionoffermemberextls[0].feeVal"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row v-show="offerapportionoffermemberextls[0].offerApporationType == '60'">
					<Col :span="11">
						<FormItem labelText="原产品：">
							<Input v-model="offerapportionoffermemberextls[0].oldProd"></Input>
						</FormItem>
					</Col>
					<Col :span="12" :offset="1">
						<FormItem labelText="目标产品：">
							<Input v-model="offerapportionoffermemberextls[0].targetProd"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row v-show="offerapportionoffermemberextls[0].offerApporationType != '30'">
					<Col :span="24">
					<FormItem labelText="备注：">
						<Input type="textarea" v-model="offerapportionoffermemberextls[0].remark"></Input>
					</FormItem>
					</Col>
				</Row>
				<Col :span="24" v-show="offerapportionoffermemberextls[0].offerApporationType != '30'">
				<FormItem labelText="附件上传：">
					<span class="span" @click="custUploadClick">
							<span>附件上传</span>
					<input type="file" class="file" ref="fileRef" @change="custUploadChange" />
					</span>
					<div v-show="documentList.length>0">已上传文件<span>{{documentList.length}}</span>个：<span class="have-span" v-for="(item,index) in documentList" :key="index">{{item.docName}}<span class="delete" @click="deleteDoc(item)"></span><span class="down-load" @click="downLoad(item)"></span></span>
					</div>
				</FormItem>
				</Col>
			</Form>
		</div>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		props:{
			componentData:{}
		},
		data() {
			return {
				boolSelectArray: [{
					label: '是',
					value: '1'
				}, {
					label: '否',
					value: '0'
				}],
				mainSharingArray: [{
					label: '是',
					value: '1'
				}, {
					label: '否',
					value: '2'
				}],
				documentList: [],
				offerapportionoffermemberextls: [{
					offerApporationType: ''
				}],
				offerappor: [],
				tipSelData: {},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				current: 0,
				currentProd: 0
			}
		},
		mounted() {
			this.getOfferApportMemberList();
			this.$axios.get(this.$api.GetDocumentObjList, {
				params: {
					objId: this.componentData.offerId,
					objType: '100027'
				}
			}).then(res => {
				if(res.data.success == true) {
					this.documentList = res.data.documentList;
				} else {
					this.$message.error({ message: '附件查询失败！' });
				}
			}).catch(error => {
				this.$message.error({message: error.response.data.msg});
			})
		},
		methods: {
			getOfferApportMemberList() {
				this.$axios.get(this.$api.replace(this.$api.Offerapportionmember,['{offerId}'],[this.componentData.offerId]),{
                    params: {

                    }
                }).then(res => {
					if(res.data.success === true){
						this.offerapportionoffermemberextls = res.data.offerapportionoffermemberextlsitdto.offerapportionoffermemberextls;
					}else{
						this.$message.error({message: res.data.msg})
					}
				}).catch( error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			custUploadClick() {
				this.$refs.fileRef.click();
			},
			custUploadChange(e) {
				if(e.target.files.length === 0) return;
				let files = Array.from(e.target.files);
				if(files[0].size > 0) {
					let formData = new FormData();
					formData.append('objId', this.componentData.offerId);
					formData.append('objType', '100027 ');
					formData.append('center', 'cpc');
					formData.append('file', files[0]);
                    formData.append('docName', files[0].name);
                    formData.append('createStaff ', this.$user.getInfo().id);
					e.target.value = '';
					this.$axios.post(this.$api.PushDocumentObj, formData, {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}).then(res => {
						if(res.data.success == true) {
							this.$message.success({ message: '附件上传成功！' });
							this.$axios.get(this.$api.GetDocumentObjList, {
								params: {
									objId: this.componentData.offerId,
									objType: '100027'
								}
							}).then(res => {
								if(res.data.success == true) {
									this.documentList = res.data.documentList;
								} else {
									this.$message.error({ message: '附件查询失败！' });
								}
							}).catch(error => {
								this.$message.error({ message: error.response.data.msg });
							})
						} else {
							this.$message.error({ message: '附件上传失败！' });
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg });
					})
				} else {
					this.$message.warning({ message: '请选择大小不为0的文件！' });
					return
				}
			},
			deleteDoc(item) {
				this.tipType = 'DEL';
                this.tipSelData = item;
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `是否确认删除？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
			},
			tipConfirm() {
				 this.$axios.get(this.$api.DeleteDocumentRels, {
                        params: {
                            objId: this.componentData.offerId,
                            objType: '100027',
                            docLink: this.tipSelData.documentId
                        }
                    }).then(res => {
                        if(res.data.success == true) {
                        	this.$refs.tip.hide();
                            this.$message.success({message: "附件删除成功！"});
                            this.$axios.get(this.$api.GetDocumentObjList, {
                                params: {
                                    objId: this.componentData.offerId,
                                    objType: '100027'
                                }
                            }).then(res => {
                                if(res.data.success == true) {
                                    this.documentList = res.data.documentList;
                                } else {
                                    this.$message.error({ message: '附件查询失败！' });
                                }
                            }).catch(error => {
                                this.$message.error({message: error.response.data.msg});
                            })
                        } else {
                            this.$message.error({ message: '附件删除失败！' });
                        }
                    }).catch(error => {
                        this.$message.error({message: error.response.data.msg});
                    })
			},
			downLoad(item) {
				window.open(this.$api.Shtelpaasstorage + item.documentId)
			},
			save() {
				this.offerappor = [];
				this.offerapportionoffermemberextls.forEach((index, val, arr) => {
					let temArrSave = [];
					arr[val].offerapportionmemberextls.forEach(item => {
						let ObjListSave = {
							offerApportionMemberId: item.offerApportionMemberId,
							apportionValue: item.apportionValue,
							updateStaff: item.updateStaff,
							chrgItemsCode: item.chrgItemsCode,
							apportionValue: item.apportionValue
						}
						temArrSave.push(ObjListSave)
					})
					let ObjSave = {
						offerId: arr[val].offerId,
						isMainSharing: arr[val].isMainSharing,
						isCombinationSharing: arr[val].isCombinationSharing,
						feeVal: arr[val].feeVal,
						remark: arr[val].remark,
						oldProd: arr[val].oldProd,
						targetProd: arr[val].targetProd,
						offerapportionmemberextls: temArrSave
					}
					this.offerappor.push(ObjSave)
				})
				
				this.$axios.put(this.$api.saveOfferapportionmember, {
					offerapportionoffermemberextls: this.offerappor
				}).then(res => {
					if(res.data.success === true) {
						this.getOfferApportMemberList();
						this.$message.success({ "message": "保存成功！" })
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: res.data.msg })
				})
			},
			enter(i){
				this.current = i;
			},
			enterProd(i){
				this.currentProd = i;
			},
			leave() {
				this.current = null;
				this.currentProd = null;
			}
		}
	}
</script>

<style scoped lang="scss">
	.apportion {
		width: 100%;
		.basic-content {
			padding: 0 20px;
			margin: 20px 0;
			.span {
				padding: 5px 10px;
				border: 1px solid #75d3aa;
				color: #75d3aa;
				border-radius: 5px;
				margin-right: 20px;
				cursor: pointer;
				.file {
					position: absolute;
					top: 0;
					left: 0;
					width: 0;
					height: 0;
					opacity: 0;
					z-index: -1;
				}
			}
			.have-span {
				padding: 0 50px 0 10px;
				background: #eff7fe;
				margin-right: 10px;
				margin-bottom: 10px;
				color: $mainColor;
				display: inline-block;
				.delete {
					background: url(images/bqsc.png) no-repeat;
					width: 8px;
				    height: 8px;
				    position: absolute;
				    top: 12px;
				    right: 30px;
				    cursor: pointer;
				}
				.down-load {
					background: url(images/down.png) no-repeat;
					width: 10px;
				    height: 10px;
				    position: absolute;
				    top: 10px;
				    right: 10px;
				    cursor: pointer;
				    background-size: cover;
				}
			}
		}
		.table{
			width: 100%;
			border-collapse:collapse;
			border: 1px solid gainsboro;
			thead{
				height: 40px;
				line-height: 40px;
				background: #f5f6fa;
				th{
					border: 1px solid gainsboro;
				}
			}
			tbody{
				tr{
					height: 40px;
					line-height: 40px;
					td{
						border: 1px solid gainsboro;
						text-align: center;
					}
					.table-td{
						color: $mainColor;
					}
					.chr-td{
						padding: 0 10px;
					}
				}
			}
		}
		.tag-td{
			position: relative;
			.tag-span{
				display: inline-block;
				width: 22px;
				height: 22px;
				background: url(images/wain.png) no-repeat;
				margin-bottom: -5px;
				cursor: pointer;
			}
			.tag {
			width: 350px;
			height: 100px;
			border: 1px solid gainsboro;
			position: absolute;
			background-color: #FFF;
			z-index: 99999;
			padding: 10px;
			top: -115px;
			left: -80px;
			.border-down-empty {
				position: absolute;
				width: 0;
				height: 0;
				border-left: 20px solid transparent;
				border-right: 20px solid transparent;
				border-top: 20px solid gainsboro;
				margin: 50px auto;
				top: 48px;
    			left: 90px;
			}
			.border-down-empty span {
				display: block;
				width: 0;
				height: 0;
				border-left: 28px solid transparent;
				border-right: 28px solid transparent;
				border-top: 28px solid #ffffff;
				position: absolute;
				left: -28px;
				top: -30px;
			}
		}
		}
	}
</style>