<template>
	<transition name="fade">
		<div class="release">
			<Scroll :isShowRight="true" ref="scroll">
				<div class="a-header">
					<div class="a-title">审核</div>
					<div class="a-close" @click="btnBack()"></div>
				</div>
				<div class="a-value">
					<div class="app__title bold">
						<!--<i class="iconfont icon-jibenxinxi"></i>-->
						<span>{{tempBasicData.offerName}}</span>
						<i class="iconfont icon-chakan1214" @click="jumpTo"></i>
					</div>

					<div class="a-info">
						<Row class="a-info-content">
							<Form labelWidth="110px">
								<Col :span="6">
								<FormItem labelText="销售品名称：" small>
									<span>{{tempBasicData.offerName}}</span>
								</FormItem>
								</Col>
								<Col :span="6">
								<FormItem labelText="商品类型：" small>
									<span>{{tempBasicData.commodityType=="10"?"商品":tempBasicData.commodityType=="30"?"组合商品":tempBasicData.commodityType=="40"?"可选包":tempBasicData.commodityType=="50"?"促销":tempBasicData.commodityType=="60"?"关联包":"加装包"}}</span>
								</FormItem>
								</Col>
								<Col :span="6">
								<FormItem labelText="上市时间：" small>
									<span>{{tempBasicData.effDate | date}}</span>
								</FormItem>
								</Col>
								<Col :span="6">
								<FormItem labelText="退市时间：" small>
									<span>{{tempBasicData.expDate | date}}</span>
								</FormItem>
								</Col>
							</Form>
						</Row>
					</div>
				</div>

				<div class="a-value">
					<div class="app__title">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>需求单信息</span>
					</div>

					<div class="a-info">
						<Row>
							<Col :span="4" class="col-left">需求单名称</Col>
							<Col :span="8" class="col-right">{{requirementData.requirementName}}</Col>
							<Col :span="4" class="col-left">需求单编码</Col>
							<Col :span="8" class="col-right">{{requirementData.requirementCode}}</Col>
							<Col :span="4" class="col-left">需求单类型</Col>
							<Col :span="8" class="col-right">{{requirementData.requestType == "10"?"产品":requirementData.requestType == "11"?"销售品":requirementData.requestType == "12"?"目录":"转售销售品"}}</Col>
							<Col :span="4" class="col-left">需求单功能类型</Col>
							<Col :span="8" class="col-right">{{requirementData.actType=="ADD"?"新增":requirementData.actType=="MOD"?"变更":"下架"}}</Col>
							<Col :span="4" class="col-left">业务联系人</Col>
							<Col :span="8" class="col-right">{{requirementData.contName}}</Col>
							<Col :span="4" class="col-left">发起时间</Col>
							<Col :span="8" class="col-right">{{requirementData.createDate | datetime}}</Col>
						</Row>
					</div>
				</div>
				<div class="a-value">
					<div class="app__title">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>审核操作</span>
					</div>
						

					<div class="a-info">
						<Row>
							<Col :span="24">
							<RadioGroup :data="operationList" name="offerType" v-model="operation" @change="changeRadio"></RadioGroup>
							</Col>
						</Row>
						<Row>
							<Col :span="8" v-if="flowNextTaskDTOS.length>0" v-for="(item,index) in flowNextTaskDTOS" :key="index">
							<Row>
								<Col :span="24">
								<Row>
									<Col :span="1">
									<span class="radius-index">{{index + 1}}</span>
									</Col>
									<Col :span="22" v-if="operation=='1'">
									<FormItem labelText="下一环节：" small>
										<span>{{item.taskDefName}}</span>
									</FormItem>
									</Col>
									<Col :span="22" v-else>
									<FormItem labelText="上一环节：" small>
										<span>{{item.taskDefName}}</span>
									</FormItem>
									</Col>
									<Col :span="20">
									<Select v-if="item.candidateUsers" :data="item.candidateUsers" dataValueStr="userId" dataLabelStr="userName" v-model="item.defaultUser.userId"></Select>
									<div class="pre-name" v-else>{{item.defaultUser.userName}}</div>
									</Col>
								</Row>
								</Col>
							</Row>
							</Col>
						</Row>
						<Row>
							<Col :span="16">
							<h3>审核意见</h3>
							<Input type="textarea" name="reviewDesc" v-model="reviewDesc"></Input>
							</Col>
						</Row>
						<Row v-if="documentList.length>0">
							<Col :span="16">
							<FormItem labelText="附件下载：" small>
								<span class="app__btn app__btn-confirm" @click="download()">附件下载</span>
							</FormItem>
							</Col>
						</Row>
					</div>


                    <div class="app__title">
                        <i class="iconfont icon-jibenxinxi"></i>
						<span>附件上传</span>

                        <span class="filebox" @click="UploadClick">
                            <span>附件上传</span>
                        </span>
                    </div>



				</div>
			</Scroll>
			<!--底部保存返回-->
			<div class="a-operation">
				<div class="">
					<div class="btn-page-box">
						<span class="app__btn app__btn-confirm" @click="save()">提交</span>
					</div>
				</div>
			</div>
			<!--下载附件-->
			<Dialog class="add-commodity" dialogTitle="附件下载" ref="download" :showBtn="false">
				<Scroll :isShowRight="true" class="downloadScroll">
					<div class="app__table__inner">
						<Row class="app__table-thead flow">
                            <Col :span="6">类型</Col>
                            <Col :span="6">附件名称</Col>
                            <Col :span="4">上传人</Col>
                            <Col :span="4">上传时间</Col>
                            <Col :span="4">操作</Col>
						</Row>
						<Row class="app__table-item" v-for="(item,index) in documentList" :key="index">
                            <Col :span="6">{{item.documentTypeName ? item.documentTypeName : '需求单附件'}}</Col>
                            <Col :span="6">{{item.docName}}</Col>
                            <Col :span="4">{{item.uploadName}}</Col>
                            <Col :span="4">{{item.createDate | date }}</Col>
							<Col :span="4">
							<span class="iconfont icon-xiazai1128" @click="downLoadclick(item)">下载</span>
							</Col>
						</Row>
					</div>

				</Scroll>
			</Dialog>


            <Dialog class="add-commodity" dialogTitle="附件上传" ref="fileUp" :initBtn="true">
                <Scroll class="main">
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
                    <div class="app__table__inner">
                        <Row class="app__table-thead">
                            <Col :span="6">类型</Col>
                            <Col :span="6">附件名称</Col>
                            <Col :span="4">上传人</Col>
                            <Col :span="4">上传时间</Col>
                            <Col :span="4">操作</Col>
                        </Row>
                        <Row :class="['app__table-item']" v-for="(item,index) in documentPageList" :key="index">
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
                    <Row v-if="!documentPageList.length" class="app__data-none">
                        <Col>
                        <span>暂无数据</span>
                        </Col>
                    </Row>
                </Scroll>
                <div slot="btnBox">
                    <span class="back" @click="handleBack">返回</span>
                </div>
            </Dialog>
		</div>
	</transition>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				operation: "1",
				reviewDesc: "",
				operationList: [{
					label: '同意',
					value: '1'
				}, {
					label: '不同意',
					value: '0'
				}],
				flowNextTaskDTOS: [],
				requirementData: {},
				documentList:[],
                tempBasicData:{},
                fileType:'',
                documentPageList:[],
                fileList:[],
                flowNodeObj:{},
                upNum:'',
			}
		},
		mounted() {
			this.requirementData = this.componentData.requirementData;
			this.documentList = this.componentData.requirementData.documentList
			this.initData()
            this.getFlowSet()
            console.log(this.componentData);
		},
		methods: {
			//销售品详情
			initData() {
				this.$axios.get(this.$api.replace(this.$api.OfferBasic, ["{offerId}"], [this.componentData.offerId]), {

				}).then(res => {
					if(res.data.success) {
						this.tempBasicData = res.data.offer
					}
				}).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
			},
			// 办结/回退下一节点查询列表
			getFlowSet() {
				this.$axios.post(this.$api.TakeFlowSchedule, {
					"completeOrReturn": this.operation,
					"requirementId": this.componentData.requirementId,
					"tasks": [{
						"businessTypeCode": "offer",
						"objId": this.componentData.offerId,
						"objType": "1000",
						"taskId": this.componentData.taskId
					}],
					"userId": this.$user.getInfo().id
				}).then(res => {
					if(res.data.success === true) {
						if(res.data.flowNextTaskDTOS) {
							this.flowNextTaskDTOS = res.data.flowNextTaskDTOS
						}
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			btnBack() {
				this.$emit('componentView', 'info', this.componentData);
			},
			changeRadio(val) {
				this.getFlowSet()
			},
			download() {
				this.$refs.download.show();
			},
			downLoadclick(item) {
				window.open(this.$api.Shtelpaasstorage + item.docLink)
			},
			save() {
				let nextTaskList = []
				for(let ele of this.flowNextTaskDTOS) {
					let temp = {
						assignee: ele.defaultUser.userId,
						elementId: ele.taskDefKey
					}
					nextTaskList.push(temp);
				}
				this.$axios.post(this.$api.HandleSub, {
					"assignee": this.$user.getInfo().id,
						"completeOrReturn": this.operation,
						"tasks": [{
							"businessTypeCode": "offer",
							"comments": this.reviewDesc,
							"nextTaskList": nextTaskList,
							"objId": this.componentData.offerId,
							"objType": "1000",
							"requirementId": this.componentData.requirementId,
							"taskId": this.componentData.taskId
						}]
				}).then(res => {
					if(res.data.success === true) {
						this.$emit('componentView', 'list');
						this.$message.success({ message: '审核成功！' });
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			jumpTo() {
				window.open(`${this.$api.WindowOpenServer}/goodsviewlist/${this.componentData.offerId}/${this.componentData.requirementId}`);
            },
            UploadClick() {
                this.getNodeAndComponent();
            },
            custUploadClick() {
                if (!this.fileType) {
                    this.$message.error({ message: "请选择类型" });
                    return;
                }
                this.$refs.fileRef.click();
            },
            custUploadChange(e) {
                    if (e.target.files.length === 0) return;
                    let files = Array.from(e.target.files);
                    if (files[0].size > 0) {
                        let formData = new FormData();
                        formData.append("objId", this.componentData.requirementId);
                        formData.append("objType", "1001");
                        formData.append("center", "cpc");
                        formData.append('createStaff ', this.$user.getInfo().id);
                        formData.append("file", files[0]);
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
                            this.documentPageList = res.data.documentList;
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
            requirementDocDownload(item) {
                window.open(this.$api.Shtelpaasstorage + item.docLink);
            },
            deleteDoc(item) {
                this.$axios
                .get(this.$api.DeleteDocumentRels, {
                    params: {
                        objId: item.objId,
                        objType: "1001",
                        docLink: item.docLink
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.$message.success({
                            message: "附件删除成功！"
                        });
                        this.$axios
                            .get(this.$api.GetDocumentObjList, {
                                params: {
                                    objId: this.componentData.requirementId,
                                    objType: "1001"
                                }
                            })
                        .then(res => {
                            if (res.data.success == true) {
                                this.documentPageList =
                                    res.data.documentList;
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
                        })
                        }
                }).catch( err => {
                    this.$message.error({message:err.response.data.msg})
                });
            },
            handleBack() {
                this.$refs.fileUp.hide();
            },
            //查询节点和组建数据
            getNodeAndComponent() {
                this.$axios.get(this.$api.GetNodeAndComponent, {
					params: {
						objType: "1000",
						objId: this.componentData.offerId,
						requirementId: this.componentData.requirementId,
						userId: this.$user.getInfo().id
                    }
                }).then( res => {
                    if(res.data.success) {
                        this.flowNodeObj = res.data;

                        if( this.flowNodeObj.task.nodeName == 'preServiceAudit') {
                            this.upNum = 100030;
                        } else if(this.flowNodeObj.task.nodeName == 'isReadyRelease') {
                            this.upNum = 100028;
                        } else if(this.flowNodeObj.task.nodeName == 'salesPreparation') {
                            this.upNum = 100029
                        }
                        this.getNodeFile();
                        this.getfileList();
                        this.$refs.fileUp.show();
                    }
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
		}
	}
</script>

<style scoped lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}
	
	.fade-enter,
	.fade-leave-to {
		top: -100% !important;
	}
	
	.release {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding-bottom: 50px;
		z-index: 201;
		background-color: #fff;
		.a-header {
			width: 100%;
			height: 30px;
			line-height: 30px;
			color: $mainColor;
			font-size: 14px;
			text-align: center;
			.a-title {
				display: inline-block;
				padding-left: 30px;
				font-size: 16px;
				/*background-image: url(./images/new_attribute.png);
				background-repeat: no-repeat;
				background-position: 0px;*/
			}
			.a-close {
				position: absolute;
				width: 18px;
				height: 18px;
				top: 11px;
				right: 11px;
				cursor: pointer;
				background: url(./images/close.png) no-repeat center;
			}
		}
		.a-progress {
			width: 100%;
			height: 100px;
			.a-p-item {
				position: absolute;
				width: 80px;
				height: 60px;
				padding-top: 35px;
				margin-top: 20px;
				text-align: center;
				z-index: 1;
				&.active {
					padding-top: 45px;
					.p-i-circle {
						width: 40px;
						height: 40px;
						top: 0;
						left: 20px;
						background-color: $mainColor;
					}
					.p-i-icon {
						width: 26px;
						height: 26px;
						top: 7px;
						left: 27px;
					}
					.a-p-name {
						color: $mainColor;
					}
				}
				&.success {
					.p-i-circle {
						background-color: $mainColor;
					}
					.p-i-icon {}
				}
				.p-i-circle {
					position: absolute;
					width: 20px;
					height: 20px;
					top: 10px;
					left: 30px;
					background-color: #ccc;
					border-radius: 50%;
					transition: all .5s ease;
				}
				.p-i-icon {
					position: absolute;
					width: 10px;
					height: 10px;
					top: 15px;
					left: 35px;
					background-color: #fff;
					border-radius: 50%;
					transition: all .5s ease;
					background-size: 0px 0px;
				}
				.p-i-bg {
					width: 0;
					height: 0;
					top: 50%;
					left: 50%;
					margin: -8px 0 0 -8px;
				}
			}
			.a-p-line {
				position: absolute;
				width: calc(100% - 120px);
				height: 6px;
				top: 38px;
				left: 60px;
				background-color: #ccc;
				z-index: 0;
				.p-l-progress {
					width: 0;
					height: 100%;
					background-color: $mainColor;
					transition: all .5s ease;
				}
			}
			.a-p-info {
				left: 20px;
				&.active {
					.p-i-bg {
						width: 16px;
						height: 16px;
						background-image: url(./images/step1.png);
						background-repeat: no-repeat;
						background-position: center;
						background-size: 100%;
					}
				}
			}
			.a-p-val {
				left: calc(50% - 40px);
				&.active {
					.p-i-bg {
						width: 16px;
						height: 16px;
						background-image: url(./images/step2.png);
						background-repeat: no-repeat;
						background-position: center;
						background-size: 100%;
					}
				}
			}
			.a-p-complete {
				left: calc(100% - 100px);
			}
		}
		.a-info {
			padding-left: 20px;
			padding-right: 30px;
			color: #999;
			.a-info-content {
				padding-top: 10px;
				background-color: #f5f6fa;
			}
			.no-first {
				margin-left: 30px;
			}
			.radius-index {
				display: inline-block;
				vertical-align: super;
				text-align: center;
				width: 16px;
				height: 16px;
				line-height: 16px;
				border-radius: 50%;
				color: #fff;
				background-color: $mainColor;
			}
			.col-left {
				text-indent: 10px;
				background-color: #f5f6fa;
				border: 1px solid #eeeeee;
			}
			.col-right {
				text-indent: 10px;
				border: 1px solid #eeeeee;
			}
		}
		.a-value {
			.app__title {
				width: 100%;
				height: 40px;
				line-height: 40px;
				margin-bottom: 10px;
				padding-left: 20px;
				&.bold {
					border-bottom: 1px solid #eeeeee;
					font-weight: 600;
					font-size: 16px;
				}
				span{
					color: #333333;
					margin-right: 10px;
				}

                .filebox {
                    padding: 5px 10px;
                    border: 1px solid #75d3aa;
                    color: #75d3aa;
                    border-radius: 5px;
                    margin-right: 20px;
                    cursor: pointer;
                    span {
                        color: #75d3aa !important;
                    }
                }
			}
		}
		.a-operation {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #fff;
			box-shadow: 0 -2px 1px #f1f5fa;
			.btn-page-box {
				text-align: right;
				padding-right: 20px;
				span {
					margin-left: 20px;
				}
			}
		}
	}
	.downloadScroll{
		padding: 20px;
	}
	.pre-name {
		height: 30px;
		line-height: 30px;
		text-indent: 10px;
		border: 1px solid #eeeeee;
	}
    .main {
        padding: 10px 20px 20px;
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
	.icon-xiazai1128 {
		cursor: pointer;
		font-size: 12px;
		margin-right: 5px;
		color: #ff9600;
	}
</style>