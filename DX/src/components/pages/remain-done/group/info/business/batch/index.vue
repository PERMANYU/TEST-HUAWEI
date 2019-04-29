<template>
	<div>
		<div class="batch">
			<div class="b-huitui" v-show="isNormal" @click="bjClick">办结</div>
			<div class="b-banjie" v-show="isNormal && htIsShow" @click="htClick">回退</div>
			
			<div class="b-tongyi" v-show="isApproval" @click="bjClick">同意</div>
			<div class="b-butongyi" v-show="isApproval" @click="htClick">不同意</div>
		</div>
		

		<!-- <span v-show="isMultiple">不能同时选择处于不同环节的销售品</span> -->

		<Dialog class="bj-dialog" :dialogSize="dialogSize" dialogTitle="办结" ref="bjDialog" @confirm="bjConfirm">
			<Scroll class="b-d-content" :isShowRight="true">
				
				<Form v-if="nextTaskDetail.isSinge == '1'" data-vv-scope="flowForm">
					<div>
						<p>下一环节：</p>
						<Select :data="nextTaskDetail.flowNextTaskDTOS" dataValueStr="taskDefKey" dataLabelStr="taskDefName" v-model="nextTaskKey"></Select>
					</div>
					<div v-show="nextTaskKey">
						<p>处理人：</p>
						<Select v-validate="'required'" :data="flowNextTaskDTO.candidateUsers" dataValueStr="userId" dataLabelStr="userName" v-model="flowNextTaskDTO.defaultUser.userId"></Select>
					</div>
				</Form>
				<Form v-else data-vv-scope="flowForm">
					<div v-for="(item,index) in nextTaskDetail.flowNextTaskDTOS" :key="index">
						<p>下一环节：{{item.taskDefName}}</p>
						<Select v-validate="'required'" :data="item.candidateUsers" dataValueStr="userId" dataLabelStr="userName" v-model="item.defaultUser.userId"></Select>
					</div>
				</Form>
				<p>描述：</p>
				<div>
					<textarea class="app__textarea" v-model="nextTaskDesc"></textarea>
				</div>

                <div v-if="isfileUpload == 'true'">
                    <p>附件上传：</p>
                    <div>
                        <Form data-vv-scope="file">
                            <FormItem labelText="类型：" :requiredIcon="true">
                                <Select name="fileType" :isNullSel="false" data-vv-as="类型" v-model="fileType" v-validate="'required'" dataValueStr="fileTypeId" dataLabelStr="fileTypeName" :data="fileList"></Select>
                            </FormItem>
                            <FormItem labelText="附件：" :requiredIcon="true">
                                <span class="span" @click="custUploadClick">
                                    <span>选择附件上传</span>
                                    <input type="file" class="file" ref="fileRef" @change="custUploadChange" />
                                </span>
                            </FormItem>
                        </Form>   
                    </div>
                </div>

                    
                    <div class="app__table__inner">
                        <Row class="app__table-thead">
                            <Col :span="6">类型</Col>
                            <Col :span="6">附件名称</Col>
                            <Col :span="4">上传人</Col>
                            <Col :span="4">上传时间</Col>
                            <Col :span="4">操作</Col>
                        </Row>
                        <Row :class="['app__table-item']" v-for="(item,index) in documentList" :key="index">
                            <Col :span="6">{{item.documentTypeName ? item.documentTypeName : '需求单附件'}}</Col>
                            <Col :span="6">{{item.docName}}</Col>
                            <Col :span="4">{{item.uploadName}}</Col>
                            <Col :span="4">{{item.createDate | date }}</Col>
                            <Col :span="4">
                            <span @click="requirementDocDownload(item)">
                                下载
                            </span>
                            <span @click="deleteDoc(item)" v-if="item.documentType == upNum">
                                删除
                            </span>
                            </Col>
                        </Row>
                    </div>
                    <Row v-if="!documentList.length" class="app__data-none">
                        <Col>
                        <span>暂无数据</span>
                        </Col>
                    </Row>

                
			</Scroll>
			
		</Dialog>
        <Tip ref="tipDocument" :tipObj="tipInfo" @confirm="tipDocumentConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			requireCheckArr:Array,
			componentData: {}
		},
		data(){
			return{
				dialogSize: { //办结dialog框大小
					size: 50,
					min: 600,
					max: 600
				}, 
				nextTaskDetail:{
                }, //下一节点信息
				nextTaskKey: '', //下一环节key
                nextTaskDesc:'', //提交环节的描述
                documentList:[],
                fileType: "",
                fileList:[],
                flowNodeObj:{},
                tipSelData:{},
                tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
                },
                upNum:'',//上传的编码
                isfileUpload:'',
				nodeCode: ''
			}
		},
		computed:{
			requireCheckStatus(){ //计算选中了几种状态
				
				if(!this.requireCheckArr || this.requireCheckArr.length == 0) return [];
				return [...new Set(this.requireCheckArr.map(item => item.status))];
			},
			isNormal(){ //选中的需求单状态是否流程状态
				
				if(this.requireCheckStatus.length == 0) return false;
				if(this.isMultiple) return false;

				return this.requireCheckStatus[0] != '13';
			},
			isApproval(){ //选中的需求单状态是否审批状态
				
				if(this.requireCheckStatus.length == 0) return false;
				if(this.isMultiple) return false;

				return this.requireCheckStatus[0] == '13';
			},
			isMultiple(){ //选中的需求单状态是否有多种状态状态
				if(this.requireCheckStatus.length > 0 && this.requireCheckStatus.length !== 1){
					this.$message.error({message: '不能同时选择处于不同环节的销售品'});
					return true;
				}else{
					return false;
				}
			},
			htIsShow(){ //是否显示回退
				return this.componentData.statusCd != '1200'; 
			},
			flowNextTaskDTO(){ //选中的环节
				if(this.nextTaskKey){
					return this.nextTaskDetail.flowNextTaskDTOS.find( item => item.taskDefKey == this.nextTaskKey);
				}else{
					return {
						candidateUsers:[],
						defaultUser:{}
					}
				}
			}

		},
		mounted(){
            console.log(this.componentData);
		},
		methods:{
            bjClick(){ //办结点击
                // let nodeArray = []; 
                // this.requireCheckArr.forEach( item => {
                //     if(item.taskDefKey == 'preServiceAudit' || item.taskDefKey == 'isReadyRelease' || item.taskDefKey == 'salesPreparation') {
                //         nodeArray.push(item)
                //     }
                // })
                // if(this.requireCheckArr.length > 1 && nodeArray.length) {
                //     this.$message.error({
                //         message:'附件上传环节，无法批量办结'
                //     })
                //     return
                // }
                this.getNodeAndComponent();
                this.getFlowSet();
            },
            
			bjConfirm(){ //办结dialog确定

				//验证是否选择了环节
				

				if(this.nextTaskDetail.isSinge == '1' && !this.nextTaskKey){
					this.$message.error({message: '请选择环节！'});
					return;
				}

				//验证是否选择了处理人
				this.$validator.validateAll('flowForm').then((result) => {
                    if(result) {
		                let nextTaskList = [];
						if(this.nextTaskDetail.isSinge == '1'){
							nextTaskList = [{
								assignee: this.flowNextTaskDTO.defaultUser.userId,
								elementId: this.flowNextTaskDTO.taskDefKey
							}]
						}else{
							nextTaskList = this.nextTaskDetail.flowNextTaskDTOS.map( item => {
								return {
									assignee: item.defaultUser.userId,
									elementId: item.taskDefKey
								}
							})
						}


						this.$axios.post(this.$api.HandleSub, {
							assignee: this.$user.getStaffId(),
                            completeOrReturn: this.nextTaskKey ? this.flowNextTaskDTO.completeOrReturn : this.nextTaskDetail.flowNextTaskDTOS.length ? this.nextTaskDetail.flowNextTaskDTOS[0].completeOrReturn : 1,
                            nodeCode: this.nodeCode,
							tasks: this.requireCheckArr.map( item => {
								return {
									businessTypeCode: 'offer',
									comments: this.nextTaskDesc,
									nextTaskList,
									objId: item.offerId,
									objType: "1000",
									requirementId: this.componentData.requirementId,
									taskId: item.taskId || this.nextTaskDetail.flowObjTasks.find( objTaskItem => objTaskItem.objId == item.offerId).taskId
								}
							})

						}).then(res => {
							if(res.data.success === true) {
								this.$message.success({ message: '批量操作成功！' })
								this.$refs.bjDialog.hide();

								this.$emit('flowSuccess');
							} else {
								this.$message.error({ message: res.data.msg })
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg })
						})
                    }else{
                    	this.$message.error({message: '请选择处理人！'});
                    	return;
                    }
                })


				

				
			},
			htClick(){ //回退点击
				this.getFlowSet(0);
            },
            //查询节点和组件数据
			getNodeAndComponent() {
				this.$axios.get(this.$api.GetNodeAndComponent, {
					params: {
						objType: "1000",
						objId: this.requireCheckArr[0].offerId,
						requirementId: this.componentData.requirementId,
						userId: this.$user.getInfo().id
					}
                }).then(res => {
                    if(res.data.success) {
						this.nodeCode = res.data.task.nodeName;
                        this.flowNodeObj = res.data;
                        this.isfileUpload = this.flowNodeObj.task.fileUpload;
                        if( this.flowNodeObj.task.nodeName == 'preServiceAudit') {
                            this.upNum = 100030;
                        } else if(this.flowNodeObj.task.nodeName == 'isReadyRelease') {
                            this.upNum = 100028;
                        } else if(this.flowNodeObj.task.nodeName == 'salesPreparation') {
                            this.upNum = 100029
                        }
                        this.getNodeFile();
                        this.getfileList();
                    }
                }).catch(err => {
                    this.$message.error({
                        message:err.response.data.msg
                    })
                })
            },
            getNodeFile() {
                //获取附件类型
                this.$axios
                    .get(this.$api.GetNodeFile, {
                        params: {
                            nodeName: this.flowNodeObj ? this.flowNodeObj.task.nodeName : '',
                            processDefinitionId: this.flowNodeObj ? this.flowNodeObj.task
                            .processDefinitionId : '',
                        }
                    })
                    .then( res => {
                        if (res.data.success) {
                            this.fileList = res.data.nodeFiles;
                            this.fileType = this.fileList ? this.fileList[0].fileTypeId : '';
                        }
                    })
                    .catch( err => {
                        this.$message.error({ message: err.response.data.msg });
                    });
            },
			getFlowSet(completeOrReturn = 1) { //获取流程下一节点信息
				this.$axios.post(this.$api.TakeFlowSchedule, {
					completeOrReturn: completeOrReturn,
					requirementId: this.componentData.requirementId,
					tasks: this.requireCheckArr.map( item => {
						return {
							businessTypeCode: 'offer',
							objId: item.offerId,
							objType: "1000",
							taskId: item.taskId
						}
					}),
					userId: this.$user.getStaffId()

				}).then(res => {
					if(res.data.success === true) {
                        this.nextTaskDetail = res.data;
                        this.$refs.bjDialog.show();
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
            },
            custUploadChange(e) {
                if (e.target.files.length === 0) return;
                let files = Array.from(e.target.files);
                if (files[0].size > 0) {
                    let formData = new FormData();
                    formData.append("objId", this.componentData.requirementId);
                    formData.append("objType", "1001");
                    formData.append("center", "cpc");
                    formData.append("file", files[0]);
                    formData.append('createStaff ', this.$user.getInfo().id);
                    formData.append("docName", files[0].name);
                    formData.append("documentType", this.fileType);
                    this.$axios
                        .post(this.$api.PushDocumentObj, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                this.$message.success({
                                    message: "附件上传成功！"
                                });
                                let numArr = [];
                                this.fileList.forEach(element => {
                                    numArr.push(element.fileTypeId);
                                });
                                console.log(numArr);
                                if (this.fileType >= numArr[numArr.length]) {
                                    this.fileType = "";
                                } else {
                                    this.fileZero += 1;
                                    this.fileType = numArr[this.fileZero];
                                }
                                this.getfileList();
                            } else {
                                this.$message.error({
                                    message: "附件上传失败！"
                                });
                            }
                        })
                        .catch(error => {
                            this.$message.error({
                                message: error.response.data.msg
                            });
                        });
                } else {
                    this.$message.warning({
                        message: "请选择大小不为0的文件！"
                    });
                    return;
                }
            },
            custUploadClick() {
                if (!this.fileType) {
                    this.$message.error({ message: "请选择类型" });
                    return;
                }
                this.$refs.fileRef.click();
            },
            getfileList() {
                this.$axios
                    .get(this.$api.GetDocumentObjList, {
                        params: {
                            objId: this.componentData.requirementId,
                            objType: "1001"
                        }
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            this.documentList = res.data.documentList;
                        } else {
                            this.$message.error({
                                message: "附件查询失败！"
                            });
                        }
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error.response.data.msg
                        });
                    });
            },
            requirementDocDownload(item) {//下载
                window.open(this.$api.Shtelpaasstorage + item.docLink)
            },
            deleteDoc(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tipDocument.show();
            },
            tipDocumentConfirm() {
                this.$refs.tipDocument.hide();
                this.$axios.get(this.$api.DeleteDocumentRels, {
                    params: {
                        objId: this.tipSelData.objId,
                        objType: '1001',
                        docLink: this.tipSelData.docLink
                    }
                }).then(res => {
                    if(res.data.success == true) {
                        this.$message.success({ message: "附件删除成功！" });
                        this.getfileList();
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                })
            }
		}
	}
</script>

<style scoped lang="scss">
	.batch{
		display: inline-block;
		float: right;
		height: 50px;
		line-height: 50px;
		text-align: initial;

		.b-huitui,
		.b-banjie,
		.b-tongyi,
		.b-butongyi{
			display: inline-block;
			height: 30px;
			line-height: 30px;
			margin-left: 10px;
			padding: 0 10px;
			color: $mainColor;
			border: 1px solid $mainColor;
			border-radius: 4px;
			cursor: pointer;

			&:hover{
				background-color: $mainColor;
				color: #fff;
			}
		}


	}

	.bj-dialog{
		line-height: normal;
		text-align: initial;

		.b-d-content{
			padding: 20px !important;

			p{
				margin: 10px 0;
			}
		}

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
	}
</style>