<template>
	<div class="constraint">
        <!--客户约束列表-->
        <!-- <div class="mod-title">
            <div>客户约束</div>
        </div>

        <div class="h-a-add">
            <div class="app__btn app__btn-add" @click="custDownload()">下载模板</div>
            <div class="app__btn app__btn-add" @click="custUploadClick()">
                <div>导入</div>
                <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="file" ref="fileRefer" @change="custUploadChange" />
            </div>
        </div>


        <div class="app__table__inner">
            <Row class="app__table-thead">
                <Col :span="5">客户ID</Col>
                <Col :span="5">客户名称</Col>
                <Col :span="5">客户类型</Col>
                <Col :span="5">客户子类型</Col>
                <Col :span="4">操作</Col>
            </Row>
            <Row :class="['app__table-item']" v-for="(item,index) in offerCustRestricts" :key="index">
                <Col :span="5">{{item.rstrObjId ? item.rstrObjId : '无'}}</Col>
                <Col :span="5">{{item.custName ? item.custName : '无'}}</Col>
                <Col :span="5">{{item.custType ? item.custType : '无'}}</Col>
                <Col :span="5">{{item.custSubType ? item.custSubType : '无'}}</Col>
                <Col :span="4">
                <span class="span" @click="deleteCust(item)">删除</span>
                </Col>
            </Row>

            <Row v-show="offerCustRestricts.length == 0" class="app__data-none">
                <Col :span="24"><span>暂无数据</span></Col>
            </Row>
        </div> -->


        <!--资产约束列表-->
        <!-- <div class="mod-title">
            <div>资产约束</div>
        </div>

        <div class="h-a-add">
            <div class="app__btn app__btn-add" @click="assetDownload()">下载模板</div>
            <div class="app__btn app__btn-add" @click="assetUploadClick()">
                <div>导入</div>
                <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="file" ref="fileRef" @change="assetUploadChange" />
            </div>
        </div>


        <div class="app__table__inner">
            <Row class="app__table-thead">
            	<Col :span="5">资产ID</Col>
                <Col :span="5">资产名称</Col>
                <Col :span="5">资产编码</Col>
                <Col :span="5">状态</Col>
                <Col :span="4">操作</Col>
            </Row>
            <Row :class="['app__table-item']" v-for="(item,index) in offerAssetsRestricts" :key="index">
            	<Col :span="5">{{item.rstrObjId ? item.rstrObjId : '无'}}</Col>
                <Col :span="5">{{item.assetsName ? item.assetsName : '无'}}</Col>
                <Col :span="5">{{item.assetsLong ? item.assetsLong : '无'}}</Col>
                <Col :span="5">{{item.statusCd ? item.statusCd : '无'}}</Col>
                <Col :span="4">
                <span class="span" @click="deleteAsset(item)">删除</span>
                </Col>
            </Row>

            <Row v-show="offerAssetsRestricts.length == 0" class="app__data-none">
                <Col :span="24"><span>暂无数据</span></Col>
            </Row>
        </div> -->

		<!--地址约束列表-->
        <!-- <div class="mod-title">
            <div>地址约束</div>
        </div>

		<div class="h-a-add">
            <div class="app__btn app__btn-add" @click="addrDownload()">下载模板</div>
            <div class="app__btn app__btn-add" @click="addrUploadClick()">
                <div>导入模糊地址</div>
                <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="file" ref="fileRefAddr" @change="addrUploadChange" />
            </div>
			<div class="app__btn app__btn-add" @click="addrDetailUploadClick()">
                <div>导入详细地址</div>
                <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="file" ref="fileRefAddrDetail" @change="addrDetailUploadChange" />
            </div>
        </div>

		<div class="app__table__inner">
            <Row class="app__table-thead">
            	<Col :span="6">地址ID</Col>
                <Col :span="6">地址类型</Col>
                <Col :span="8">地址信息</Col>
                <Col :span="4">操作</Col>
            </Row>
            <Row :class="['app__table-item']" v-for="(item, index) in offerAddressDetailsRestricts" :key="index">
            	<Col :span="6">{{item.rstrObjId ? item.rstrObjId : '无'}}</Col>
                <Col :span="6">{{item.rstrObjType == '1004' ? '模糊地址' : item.rstrObjType == '1005' ? '详细地址' : '无'}}</Col>
                <Col :span="8">{{item.rstrObjValue ? item.rstrObjValue : '无'}}</Col>
				<Col :span="4">
					<span class="span" @click="deleteAddr(item)">删除</span>
				</Col>
            </Row>

            <Row v-show="offerAddressDetailsRestricts.length == 0" class="app__data-none">
                <Col :span="24"><span>暂无数据</span></Col>
            </Row>
        </div> -->

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
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				offerId: '',
				offerCustRestricts: [],
				offerAssetsRestricts: [],
				offerAddressDetailsRestricts: [],
				tipSelData: {}
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData() {
				this.$axios.get(this.$api.replace(this.$api.OfferRestricts, ['{offerId}'], [this.componentData.offerId]), {
					params: {
						//						limit: '10',
						//						page: '1'
					}
				}).then(res => {
					if(res.data.success == true) {
						this.offerCustRestricts = res.data.offerCustRestricts;
						this.offerAssetsRestricts = res.data.offerAssetsRestricts;
						this.offerAddressDetailsRestricts = res.data.offerAddressDetailsRestricts;
					} else {
						this.$message.error({ message: '客户约束失败！' });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.msg})
				})
			},
			custDownload() {
				window.open(this.$api.TemplateDownload + '?offerId=' + this.componentData.offerId + '&rstrObjType=1000');
			},
			assetDownload() {
				window.open(this.$api.TemplateDownload + '?offerId=' + this.componentData.offerId + '&rstrObjType=1002');
			},
			addrDownload() {
				window.open(this.$api.TemplateDownload + '?offerId=' + this.componentData.offerId + '&rstrObjType=1004');
			},
			custUploadClick() {
				this.$refs.fileRefer.click();
			},
			custUploadChange(e) {
				if(e.target.files.length === 0) return;
				let files = Array.from(e.target.files);
				let formData = new FormData();
				formData.append('offerId', this.componentData.offerId);
				formData.append('rstrObjType', '1000');
				formData.append('file', files[0]);
				formData.append('createStaff', this.$user.getInfo().id);
				formData.append('updateStaff', this.$user.getInfo().id);

				e.target.value = '';
				this.$axios.post(this.$api.replace(this.$api.TemplateUpload, ['{offerId}'], [this.componentData.offerId]), formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(res => {
					if(res.data.success == true) {
						this.$message.success({ message: '导入成功！' });
						this.getData();
					} else {
						this.$message.error({ message: '导入失败！' });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.message})
				})
			},
			assetUploadClick() {
				this.$refs.fileRef.click();
			},
			assetUploadChange(e) {
				if(e.target.files.length === 0) return;
				let files = Array.from(e.target.files);
				let formData = new FormData();
				formData.append('offerId', this.componentData.offerId);
				formData.append('rstrObjType', '1002');
				formData.append('file', files[0]);
				formData.append('createStaff', this.$user.getInfo().id);
				formData.append('updateStaff', this.$user.getInfo().id);

				e.target.value = '';
				this.$axios.post(this.$api.replace(this.$api.TemplateUpload, ['{offerId}'], [this.componentData.offerId]), formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(res => {
					if(res.data.success == true) {
						this.$message.success({ message: '导入成功！' });
						this.getData();
					} else {
						this.$message.error({ message: '导入失败！' });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.message})
				})
			},
			// 导入模糊地址
			addrUploadClick() {
				this.$refs.fileRefAddr.click();
			},
			addrUploadChange(e) {
				if(e.target.files.length === 0) return;
				let files = Array.from(e.target.files);
				let formData = new FormData();
				formData.append('offerId', this.componentData.offerId);
				formData.append('rstrObjType', '1004');
				formData.append('file', files[0]);
				formData.append('createStaff', this.$user.getInfo().id);
				formData.append('updateStaff', this.$user.getInfo().id);

				e.target.value = '';
				this.$axios.post(this.$api.replace(this.$api.TemplateUpload, ['{offerId}'], [this.componentData.offerId]), formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(res => {
					if(res.data.success == true) {
						this.$message.success({ message: '导入成功！' });
						this.getData();
					} else {
						this.$message.error({ message: '导入失败！' });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.message})
				})
			},
			// 导入详细地址
			addrDetailUploadClick() {
				this.$refs.fileRefAddrDetail.click();
			},
			addrDetailUploadChange(e) {
				if(e.target.files.length === 0) return;
				let files = Array.from(e.target.files);
				let formData = new FormData();
				formData.append('offerId', this.componentData.offerId);
				formData.append('rstrObjType', '1005');
				formData.append('file', files[0]);
				formData.append('createStaff', this.$user.getInfo().id);
				formData.append('updateStaff', this.$user.getInfo().id);

				e.target.value = '';
				this.$axios.post(this.$api.replace(this.$api.TemplateUpload, ['{offerId}'], [this.componentData.offerId]), formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(res => {
					if(res.data.success == true) {
						this.$message.success({ message: '导入成功！' });
						this.getData();
					} else {
						this.$message.error({ message: '导入失败！' });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.message})
				})
			},
			deleteCust(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			deleteAsset(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			deleteAddr(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() {
				if (this.tipSelData.rstrObjType == '1000') {
					this.$axios.post(this.$api.replace(this.$api.OfferRestrict, ['{offerId}'], [this.componentData.offerId]), {
						"offerChannelRels": [{
							offerId: this.componentData.offerId,
							custName: this.tipSelData.custName,
							custLong: this.tipSelData.custLong,
							custType: this.tipSelData.custType,
							offerRestrictId: this.tipSelData.offerRestrictId,
							rstrObjId: this.tipSelData.rstrObjId,
							rstrObjType: '1000',
							statusCd: '1100'
						}]
					}).then(res => {
						if(res.data.success == true) {
							this.getData();
							this.$message.success({ message: '删除成功！' });
							this.$refs.tip.hide();
						} else {
							this.$message.error({ message: '删除失败！' });
						}
					}).catch(error => {
						this.$message.error({message: error.response.data.msg})
					})
				}  else if (this.tipSelData.rstrObjType == '1002') {
					this.$axios.post(this.$api.replace(this.$api.OfferRestrict, ['{offerId}'], [this.componentData.offerId]), {
						"offerChannelRels": [{
							offerId: this.componentData.offerId,
							assetsName: this.tipSelData.assetsName,
							assetsLong: this.tipSelData.assetsLong,
							offerRestrictId: this.tipSelData.offerRestrictId,
							rstrObjId: this.tipSelData.rstrObjId,
							rstrObjType: '1002',
							statusCd: '1100'
						}]
					}).then(res => {
						if(res.data.success == true) {
							this.getData();
							this.$message.success({ message: '成功！' });
							this.$refs.tip.hide();
						} else {
							this.$message.error({ message: '失败！' });
						}
					}).catch(error => {
						this.$message.error({message: error.response.data.msg})
					})
				}  else if (this.tipSelData.rstrObjType == '1004' || this.tipSelData.rstrObjType == '1005') {
					this.$axios.post(this.$api.replace(this.$api.OfferRestrict, ['{offerId}'], [this.componentData.offerId]), {
						"offerChannelRels": [{
							offerId: this.componentData.offerId,
							rstrObjValue: this.tipSelData.rstrObjValue,
							offerRestrictId: this.tipSelData.offerRestrictId,
							rstrObjId: this.tipSelData.rstrObjId,
							rstrObjType: '1004',
							statusCd: '1100'
						}]
					}).then(res => {
						if(res.data.success == true) {
							this.getData();
							this.$message.success({ message: '成功！' });
							this.$refs.tip.hide();
						} else {
							this.$message.error({ message: '失败！' });
						}
					}).catch(error => {
						this.$message.error({message: error.response.data.msg})
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
    /*模块标题*/
    .mod-title{
        width: 100%;
        height: 30px;
        background-color: #f5f6fa;
        border-radius: 16px 16px 0 0;

        div{
            width: 120px;
            height: 30px;
            background-color: $mainColor;
            border-radius: 16px 0 0 0;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            color: white;
        }
    }
    .h-a-add {
        padding: 10px 0;

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

	.constraint {
		width: 100%;

        .app__table__inner {
            margin-bottom: 30px;

            .span {
                color: $mainColor;
                padding: 0 5px;
                cursor: pointer;
            }
        }
        .b-title {
            margin-top: 20px;
        }
	}
</style>
