<template>
	<div class="add-info">
        <div class="app__title ">
            <i class="iconfont icon-jibenxinxi"></i>
            <span>需求单</span>
        </div>

		<Scroll class="main" ref="listScroll" :isShowRight="true">
			<Row>
				<Form labelWidth="120px" labelAlign="left">
					<Col :span="7">
						<FormItem labelText="需求单编码：">
							<Input readonly name="requirementCode" v-model.trim="requireForm.requirementCode"></Input>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1">
						<FormItem labelText="需求单类型：">
							<Input readonly name="requestType" :value="requireForm.requestType == '10' ? '产品' : '销售品'"></Input>
						</FormItem>
					</Col>
					<Col :span="7" :offset="1">
						<FormItem labelText="产品名称：" :requiredIcon="true" :errorMessage="errors.first('requirementName')">
							<Input v-validate="'required'" name="requirementName" v-model.trim="requireForm.requirementName" data-vv-as="产品名称"
                                   maxlength="30"></Input>
						</FormItem>
					</Col>
                    <Col :span="7" >
						<FormItem labelText="业务运营部门：" :requiredIcon="true" :errorMessage="errors.first('itsmNo')">
							<Input v-validate="'required'" name="itsmNo" v-model.trim="requireForm.itsmNo" data-vv-as="业务运营部门"
                                   maxlength="20"></Input>
						</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
						<FormItem labelText="业务运营部门产品经理：" :requiredIcon="true" :errorMessage="errors.first('itName')">
							<Input v-validate="'required'" name="itName" v-model.trim="requireForm.itName" data-vv-as="业务运营部门产品经理"
                                   maxlength="5"></Input>
						</FormItem>
					</Col>
                    <Col :span="7 " :offset="1 ">
						<FormItem labelText="业务运营部门产品经理联系电话：" :requiredIcon="true" :errorMessage="errors.first('itTele')">
							<Input v-validate="'required|mobile'" name="itTele" v-model.trim="requireForm.itTele" data-vv-as="联系电话"
                                   maxlength="30"></Input>
						</FormItem>
					</Col>
                    <Col :span="7">
						<FormItem labelText="业务管理部门：" :requiredIcon="true" :errorMessage="errors.first('deptCode')">
							<Input v-validate="'required'" name="deptCode" v-model.trim="requireForm.deptCode" data-vv-as="业务管理部门"
                                   maxlength="20"></Input>
						</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
						<FormItem labelText="业务管理部门产品经理：" :requiredIcon="true" :errorMessage="errors.first('contName')">
							<Input v-validate="'required'"  name="contName" v-model.trim="requireForm.contName" data-vv-as="业务管理部门产品经理"
                                   maxlength="5"></Input>
						</FormItem>
					</Col>
                    <Col :span="7" :offset="1">
						<FormItem labelText="业务管理部门产品经理联系电话：" :requiredIcon="true" :errorMessage="errors.first('contTele')">
							<Input v-validate="'required|mobile'" name="contTele" v-model.trim="requireForm.contTele" data-vv-as="联系电话"
                                   maxlength="30"></Input>
						</FormItem>
					</Col>
					<!-- <Col :span="7" :offset="1">
						<FormItem labelText="预期完工时间：" :requiredIcon="true" :errorMessage="errors.first('expectFinishDate')">
							<DatePicker v-validate="'required'" name="expectFinishDate" v-model.trim="requireForm.expectFinishDate" data-vv-as="预期完工时间"></DatePicker>
						</FormItem>
					</Col> -->
                    <Col :span="7" >
                        <FormItem labelText="需求单功能类型：">
                            <Radio name="actType" label="ADD"
                                   v-model="requireForm.actType">新建</Radio>
                            <Radio name="actType" label="MOD"
                                   v-model="requireForm.actType">变更</Radio>
                        </FormItem>
                    </Col>
					<Col :span="23">
						<FormItem labelText="产品概述：" :requiredIcon="true" :errorMessage="errors.first('requirementDesc')">
							<Input v-validate="'required'" type="textarea" name="requirementDesc" v-model.trim="requireForm.requirementDesc" data-vv-as="产品概述"
                                   maxlength="300"></Input>
						</FormItem>
					</Col>
				</Form>
			</Row>
		</Scroll>
		<div class="footer">
			<div class="btn-page-box">
				<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
				<span class="app__btn app__btn-confirm" @click="submit()">下一步</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			componentData:{}
		},
		data() {
			return {
				requireForm: {
					requestType:'10',
                    actType: "ADD",
                    contName:'',
                    contTele:''
				},
				documentList: []
			}
		},
		mounted(){
			if(this.componentData.requirementId){
				this.$axios.get(this.$api.GetDocumentObjList, {
					params: {
						objId: this.componentData.requirementId,
						objType: '1001'
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
			}else {
				this.$axios.get(this.$api.Seq, {
					params: {
						sId: this.$user.getSid()
					}
				}).then(res => {
					if(res.data.success == true) {
						this.sequence = res.data.sequence;
					} else {
						this.$message.error({ message: '序列查询失败！' });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.msg});
				})
			}
			if (this.componentData.requirementId) {
				this.initData();
			}
		},
		methods: {
			initData(){ //初始数据
				if(!this.componentData) return;

				this.$axios.get(this.$api.replace(this.$api.QureyRequirementTask,['{requirementId}'],[this.componentData.requirementId]),{
                    params: {
                        showMember: 1
                    }
                }).then(res => {
					if(res.data.success === true){
						this.requireForm = res.data.requirementDetail;
					}else{
						this.$message.error({message: res.data.msg})
					}
				}).catch( error => {
					this.$message.error({message: res.data.msg})
				})

			},
			globalback() { //返回
				this.$emit('componentView', 'list')
			},
			submit() { //提交
				this.$validator.validateAll().then((result) => {
					if(result){
                        if(!this.componentData.requirementId){
                            //添加
                            this.$axios.post(this.$api.QureyRequirementList,{
                                requirementId: this.sequence,
                                requirementName: this.requireForm.requirementName,
                                requirementDesc: this.requireForm.requirementDesc,
                                requestType: this.requireForm.requestType,
                                actType: this.requireForm.actType,            //需求单动作类型
                                deptCode: this.requireForm.deptCode,
                                contName: this.requireForm.contName,
                                contTele: this.requireForm.contTele,
                                itName: this.requireForm.itName,
                                itTele: this.requireForm.itTele,
                                // expectFinishDate: new Date(this.requireForm.expectFinishDate),
                                itsmNo: this.requireForm.itsmNo,
                                createStaff: this.$user.getInfo().id,
                                statusCd: '1200'
                            }).then(res => {
                                if(res.data.success == true){
                                    this.$message.success({message: '添加成功！'});
                                    this.$emit('componentView', 'result',res.data.requirementDetail);
                                }else{
                                    this.$message.error({message: res.data.msg})
                                }

                            }).catch( error => {
                                this.$message.error({message: error.response.data.msg})
                            })

                        }else{
                            //修改
                            this.$axios.put(this.$api.replace(this.$api.QureyRequirementTask,['{requirementId}'],[this.componentData.requirementId]),{
                                requirementId: this.requireForm.requirementId,
                                requirementCode: this.requireForm.requirementCode,
                                requirementName: this.requireForm.requirementName,
                                requirementDesc: this.requireForm.requirementDesc,
                                requestType: this.requireForm.requestType,
                                actType: this.requireForm.actType,              //需求单动作类型
                                deptCode: this.requireForm.deptCode,
                                contName: this.requireForm.contName,
                                contTele: this.requireForm.contTele,
                                itName: this.requireForm.itName,
                                itTele: this.requireForm.itTele,
                                // expectFinishDate: new Date(this.requireForm.expectFinishDate),
                                itsmNo: this.requireForm.itsmNo,
                                updateStaff: this.$user.getInfo().id,
                                statusCd: '1200'
                            }).then(res => {
                                if(res.data.success == true){
                                    this.$message.success({message: "修改成功！"});
                                    if(this.requireForm.requestType == "10"){
                                        this.$emit('componentView','prodCatalog',this.componentData);
                                    }else{
                                        this.$emit('componentView','info',this.componentData);
                                    }
                                }else{
                                    this.$message.error({message: res.data.msg})
                                }

                            }).catch( error => {
                                this.$message.error({message: error.response.data.msg})
                            })
                        }
					}
				})

			},
			custUploadClick() {
				this.$refs.fileRef.click();
			},
			custUploadChange(e) {
				if(this.componentData.requirementId){
					if(e.target.files.length === 0) return;
					let files = Array.from(e.target.files);
					if(files[0].size>0){
						let formData = new FormData();
					formData.append('objId', this.componentData.requirementId);
					formData.append('objType', '1001');
					formData.append('center', 'cpc');
					formData.append('file', files[0]);
                    formData.append('docName', files[0].name);
                    formData.append('createStaff ', this.$user.getInfo().id);

					this.$axios.post(this.$api.PushDocumentObj, formData, {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}).then(res => {
						if(res.data.success == true) {
							this.$message.success({ message: '附件上传成功！' });
							this.$axios.get(this.$api.GetDocumentObjList, {
								params: {
									objId: this.componentData.requirementId,
									objType: '1001'
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
							this.$message.error({ message: '附件上传失败！' });
						}
					}).catch(error => {
						this.$message.error({message: error.response.data.msg});
					})
					}else{
						this.$message.warning({ message: '请选择大小不为0的文件！' });
						return
					}
				}else{
					if(e.target.files.length === 0) return;
					let files = Array.from(e.target.files);
					console.log(files)
					if(files[0].size>0){
						let formData = new FormData();
					formData.append('objId', this.sequence);
					formData.append('objType', '1001');
					formData.append('center', 'cpc');
					formData.append('file', files[0]);
                    formData.append('docName', files[0].name);
                    formData.append('createStaff ', this.$user.getInfo().id);

					this.$axios.post(this.$api.PushDocumentObj, formData, {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}).then(res => {
						if(res.data.success == true) {
							this.$message.success({ message: '附件上传成功！' });
							this.$axios.get(this.$api.GetDocumentObjList, {
								params: {
									objId: this.sequence,
									objType: '1001'
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
							this.$message.error({ message: '附件上传失败！' });
						}
					}).catch(error => {
						this.$message.error({message: error.response.data.msg});
					})
					}else{
						this.$message.warning({ message: '请选择大小不为0的文件！' });
						return
					}
				}
			},
			deleteDoc(item) {
				if(this.componentData.requirementId){
					this.$axios.get(this.$api.DeleteDocumentRels, {
						params: {
							objId: item.objId,
							objType: '1001',
							docLink: item.documentId
						}
					}).then(res => {
						if(res.data.success == true) {
							this.$message.success({message: "附件删除成功！"});
							this.$axios.get(this.$api.GetDocumentObjList, {
								params: {
									objId: this.componentData.requirementId,
									objType: '1001'
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
				}else{
					this.$axios.get(this.$api.DeleteDocumentRels, {
						params: {
							objId: item.objId,
							objType: '1001',
							docLink: item.documentId
						}
					}).then(res => {
						if(res.data.success == true) {
							this.$message.success({message: "附件删除成功！"});
							this.$axios.get(this.$api.GetDocumentObjList, {
								params: {
									objId: this.sequence,
									objType: '1001'
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
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.add-info {
		width: 100%;
		height: 100%;
		padding: 0 20px 50px;

		.main {
			padding: 20px;
            padding-bottom: 0;
			height: 86%;
			border: 1px solid #eeeeee;
			background: #fdfdfd;
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
				    right: 20px;
				    cursor: pointer;
				}
			}
		}

		.footer {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			box-shadow: 0 -2px 0 #f1f5fa;
			.btn-page-box {
				width: 100%;
				height: 50px;
				padding: 10px 20px;
				font-size: 12px;
				text-align: right;
				background: #ffffff;

				.app__btn-confirm{
					margin-left: 10px;
				}
			}
		}
	}
</style>
