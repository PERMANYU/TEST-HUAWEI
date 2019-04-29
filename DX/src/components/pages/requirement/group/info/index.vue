<template>
	<div class="info">
		<Scroll class="basic-info" :isShowRight="true" ref="basicScroll">
			<div class="main-box">
				<div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>需求单信息</span>
					</div>
					<div class="h-a-add">
						<div v-if="flowFlag=='3'" class="app__btn app__btn-show" @click="backClick()">回退</div>
						<!-- <div v-if="toggleFlag" class="app__btn app__btn-show" @click="show()">更多</div>
						<div v-else class="app__btn app__btn-slide" @click="slide()">收起</div> -->
						
						<div v-if="toggleFlag" class="app__btn app__btn-slide" @click="slide()">收起</div>
						<div  v-else class="app__btn app__btn-show" @click="show()">更多</div>
						
						
					</div>
				</div>
				<div :class="['require-info',toggleFlag?'':'active']">
					<Row>
						<Form labelWidth="120px" labelAlign="left">
							<Col :span="6">
							<FormItem labelText="需求单编码：" small>
								<span>{{requireForm.requirementCode}}</span>
							</FormItem>
							</Col>

							<Col :span="5" :offset="1">
							<FormItem labelText="需求单名称：" small>
								<span class="over-col" :title="requireForm.requirementName">{{requireForm.requirementName}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="业务联系人：" small>
								<span>{{requireForm.contName}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="业务联系人电话：" small>
								<span>{{requireForm.contTele}}</span>
							</FormItem>
							</Col>
							<Col :span="6">
							<FormItem labelText="需求单类型：" small>
								<span>{{requireForm.requestType == '10' ? '产品' : '销售品'}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="预期完工时间：" small>
								<span>{{requireForm.expectFinishDate | date}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="发起部门：" small>
								<span>{{requireForm.deptCode}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="需求单功能类型：" small>
								<span>{{requireForm.actType == "ADD"?"新增":requireForm.actType == "MOD"?"变更":"下架"}}</span>
							</FormItem>
							</Col>
							<Col :span="6">
							<FormItem labelText="发起时间：" small>
								<span>{{requireForm.createDate | date}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
								<FormItem labelText="需求单发起人：">
									<span>{{requireForm.staffName}}</span>
								</FormItem>
							</Col>
                            <Col :span="5" :offset="1" v-show="requireForm.requestType == '11' && requireForm.actType == 'ADD'">
								<FormItem labelText="是否跳过业务测试：">
									<span>{{requireForm.isSkipBusiTest == '1' ? '是' : requireForm.isSkipBusiTest == '0' ? '否' : ''}}</span>
								</FormItem>
							</Col>
							<Col :span="24">
							<FormItem labelText="需求单描述：" small>
								<pre v-html="requireForm.requirementDesc"></pre>
							</FormItem>
							</Col>
							<Col :span="24" v-if="documentList.length>0">
							<FormItem labelText="附件下载：" small>
								<span class="app__btn app__btn-confirm" @click="download()">附件下载</span>
							</FormItem>
							</Col>
						</Form>
					</Row>
				</div>
				<!-- 附件上传 -->
				<div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>附件上传</span>
					</div>
                    <span class="filebox" @click="showDialog">
                        <span>附件上传</span>
                    </span>
				</div>
				<div class="require-info app__table__inner">
					<Row class="app__table-thead">
                        <Col :span="6">类型</Col>
                        <Col :span="6">附件名称</Col>
                        <Col :span="4">上传人</Col>
                        <Col :span="4">上传时间</Col>
                        <Col :span="4">操作</Col>
					</Row>
                    <Row :class="['app__table-item']" v-for="(item,index) in uploadQueryPageList" :key="index">
                        <Col :span="6">{{item.documentTypeName ? item.documentTypeName : '需求单附件'}}</Col>
                        <Col :span="6">{{item.docName}}</Col>
                        <Col :span="4">{{item.uploadName}}</Col>
                        <Col :span="4">{{item.createDate | date }}</Col>
                        <Col :span="4">
                            <span @click="requirementDocDownload(item)">
                                下载
                            </span>
                            <span @click="deleteDoc(item)">
                                删除
                            </span>
                        </Col>
                    </Row>
                    <Row v-if="!uploadQueryPageList.length" class="app__data-none">
                            <Col :span="24"><span>当前无数据!</span></Col>
                    </Row>

                    <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
			        </Pagination>
				</div>
				<div v-if="flowFlag=='1'">
					<div class="a-v-title1">
						<div class="app__title ">
							<i class="iconfont icon-jibenxinxi"></i>
							<span>选择营销支撑对口人</span>
						</div>
					</div>
					<div class="app__table__inner goods-box">
						<Row class="creategoods">
							<Form labelWidth="120px" labelAlign="left">
								<Col :span="6">
								<FormItem labelText="人员：" small>
									<Select :data="candidateUsers" dataValueStr="userId" dataLabelStr="userName" v-model="defaultUser.userId"></Select>
								</FormItem>
								</Col>
							</Form>
						</Row>
					</div>
				</div>
				<div v-if="flowFlag=='2'">
					<div class="a-v-title1">
						<div class="app__title ">
							<i class="iconfont icon-jibenxinxi"></i>
							<span>分配人员</span>
						</div>
					</div>
					<div class="app__table__inner goods-box">
						<Row class="creategoods">
							<Form labelWidth="120px" labelAlign="left">
								<Col :span="24">
								<RadioGroup :data="operationList" name="offertype" v-model="operation" @change="changeRadio"></RadioGroup>
								</Col>
								<Col :span="6">
								<FormItem labelText="人员：" small>
									<Select v-if="operation=='1'" :data="candidateUsersa" dataValueStr="userId" dataLabelStr="userName" v-model="defaultUsera.userId"></Select>
									<span v-else>{{defaultUsera.userName}}</span>
								</FormItem>
								</Col>
							</Form>
						</Row>
					</div>
				</div>

				<div v-if="flowFlag=='3'">
					<div class="a-v-title1">
						<div class="app__title ">
							<i class="iconfont icon-jibenxinxi"></i>
							<span>需求单销售品列表</span>
						</div>
					</div>

					<div class="goods-content">
						<!--销售品操作按钮组件-->
						<div class="app__table__inner goods-box">
							<Menubtn :showNeedBtn="false" :requirementId="getRequirementId" @next="goCommodity" @getList="initData" :actType="requireForm.actType" :checkArr="checkArr">
							</Menubtn>

							<Row>
								<Col :span="24" class="creategoods">
								<div class="goods-wrap">
									<Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
										<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
											<Col :span="3">
											<span>序号</span>
											</Col>
											<DragItem :span="item.span" :value="item" v-for="(item,index) in tableTitleData" :key="index">
												<span>{{item.name}}</span>
											</DragItem>
											<Col :span="3">
											<span>操作</span>
											</Col>
										</DragGroup>

										<Row :class="['m-item app__table-item']" v-for="(offerItem,offerIndex) in requireData" :key="offerIndex">
											<Col :span="3">{{offerIndex + 1}}</Col>
											<Col class="over-col" :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="titleIndex" :title="adjustTabelItemText(offerItem,titleItem.param)">
											<span>{{adjustTabelItemText(offerItem,titleItem.param)}}</span>
											</Col>
											<Col :span="3">
											<span class="span" @click="deal(offerItem)">处理</span>
											<span class="span" @click="delRuireData(offerItem)">删除</span>
											</Col>
										</Row>
										<Row v-if="!requireData.length" class="app__data-none">
											<Col :span="24"><span>当前无数据!</span></Col>
										</Row>
									</Scroll>
								</div>

								</Col>
							</Row>
						</div>
					</div>
				</div>
			</div>
		</Scroll>

		<div class="footer">
			<span v-if="flowFlag=='1'" class="app__btn app__btn-confirm" @click="subClick()">提交</span>
			<span v-if="flowFlag=='2'" class="app__btn app__btn-confirm" @click="subClick()">分配</span>
			<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
		</div>

		<Dialog class="add-commodity" :dialogSize="addCommodityDialogSize" dialogTitle="添加销售品" ref="addCommodityDialog" :initBtn="true">
			<Scroll :isShowRight="true">
				<Form data-vv-scope="commodity" labelWidth="100px">
					<Row>
						<Col>
						<FormItem labelText="销售品名称：" :requiredIcon="true" :errorMessage="errors.first('commodity.offerName')">
							<Input v-validate="'required'" v-model="commodityObj.offerName" name="offerName" data-vv-as="销售品名称"></Input>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
						<FormItem labelText="商品类型：" :requiredIcon="true" :errorMessage="errors.first('commodity.commodityType')">
							<Select v-validate="'required'" :data="commodityTypeArray" v-model="commodityObj.commodityType" name="commodityType" data-vv-as="商品类型"></Select>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
						<FormItem labelText="销售品类型：" :requiredIcon="true" :errorMessage="errors.first('commodity.offerType')">
							<Select v-validate="'required'" :data="offerTypeArray" v-model="commodityObj.offerType" name="offerType" data-vv-as="销售品类型"></Select>
						</FormItem>
						</Col>
					</Row>
				</Form>
			</Scroll>
			<template slot="btnBox">
				<span class="back" @click="btnCancel()">取消</span>
				<span class="next" @click="addCommodityDialogConfirm()">下一步</span>
			</template>
		</Dialog>
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
		<!--回退-->
		<Dialog class="add-commodity" dialogTitle="回退" ref="backDialog" @confirm="backDialogSubmit" @close="backconstraint">
			<Row>
				<Col :span="24">
				<FormItem labelText="人员：" small>
					<span>{{defaultUserb.userName}}</span>
				</FormItem>
				</Col>
			</Row>
		</Dialog>


        <!-- 附件上传 -->
        <Dialog :dialogSize="dialogIpt" class="h-dialog" dialogTitle="添加附件" ref="addfujian" :initBtn="true">
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
                    <Row :class="['app__table-item']" v-for="(item,index) in documentList" :key="index">
                        <Col :span="6">{{item.documentTypeName ? item.documentTypeName : '需求单附件'}}</Col>
                        <Col :span="6">{{item.docName}}</Col>
                        <Col :span="4">{{item.uploadName}}</Col>
                        <Col :span="4">{{item.createDate | date }}</Col>
                        <Col :span="4">
                        <span @click="requirementDocDownload(item)">
                            下载
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
            <div slot="btnBox">
                <span class="back" @click="handleBack">返回</span>
            </div>
        </Dialog>

		<Tip ref="tipDocument" :tipObj="tipInfo" @confirm="tipDocumentConfirm()"></Tip>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
                dialogIpt: {
                    size: 80,
                    min: 600,
                    max: 700
                },
				flowFlag: "",
				requireForm: {},
				requireData: [],
				toggleFlag: true,
				salesTypeList: [{
					"salesTypeId": "1",
					"salesTypeName": "销售品",
					"children": [{
						"salesTypeId": "11",
						"salesTypeName": "销售品11",
						"children": []
					}]
				}, {
					"salesTypeId": "2",
					"salesTypeName": "销售品",
					"children": [{
						"salesTypeId": "21",
						"salesTypeName": "销售品11",
						"children": []
					}]
				}],
				commodityTypeArray: [{
					label: '销售品',
					value: '10'
				}, {
					label: '附属销售品',
					value: '20'
				}, {
					label: '组合销售品',
					value: '30'
				}],
				offerTypeArray: [{
					label: '基础销售品',
					value: '10'
				}, {
					label: '套餐销售品',
					value: '11'
				}, {
					label: '可选包',
					value: '12'
				}, {
					label: '促销',
					value: '13'
				}, {
					label: '政企协议',
					value: '14'
				}, {
					label: '加装包',
					value: '20'
				}],
				selTemplateType: "",
				treeShowKeyItems: [{ key: "salesTypeName" }],
				treeInputSelObj: {
					key: "salesTypeId",
					allArray: []
				},
				modelIndex: "1",
				tableTitleData: [{
					name: '销售品名称',
					param: 'memberName',
					span: 11
				}, {
					name: '状态',
					param: 'flowStatus',
					span: 7
				}],
				activatedData: null,
				addCommodityDialogSize: {
					size: 40,
					max: 450,
					min: 400
				},
				commodityObj: {
					offerName: '',
					commodityType: '',
					offerType: ''
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				tipSelData: {},
				checkArr: [],
				documentList: [],
				taskIdTemp: "",
				candidateUsers: [],
				defaultUser: {
					userId: "",
					userName: ""
				},
				flowNextTaskDTOS: [],
				candidateUsersa: [],
				defaultUsera: {
					userId: "",
					userName: ""
				},
				flowNextTaskDTOSa: [],
				operationList: [{
					label: '接受分配',
					value: '1'
				}, {
					label: '驳回',
					value: '0'
				}],
				defaultUserb: {
					userId: "",
					userName: ""
				},
				flowNextTaskDTOSb: [],
                operation: "1",
                uploadQueryPageList:[],
                pageInfo:{
                    pageIndex: 1,
					pageSize: 5,
					rowCount: 0
                },
                fileType:'',
                fileList:[],
			}
		},
		computed: {
			getRequirementId() {
				return this.activatedData ? this.activatedData.requirementId : this.componentData.requirementId;
			}
		},
		mounted() {
			this.initData();
            this.getNodeAndComponent();
            this.getPageDocumentObj();
		},
		methods: {
			//查询节点和组件数据
			getNodeAndComponent() {
				this.$axios.get(this.$api.GetNodeAndComponent, {
					params: {
						objType: "3000",
						objId: this.activatedData.requirementId,
						requirementId: this.componentData.requirementId,
						userId: this.$user.getInfo().id
					}
				}).then(res => {
					if(res.data.success == true) {
						this.taskIdTemp = res.data.task.taskId
						if(res.data.task.taskName == "需求单发起" || !res.data.task.taskName) {
							this.flowFlag = "1"
							this.operation = "1"

						} else if(res.data.task.taskName == "需求单指派") {
							this.flowFlag = "2"
							this.operation = "1"
						} else {
							this.flowFlag = "3"
							this.operation = "0"
						}

						this.$nextTick(() => {
							this.takeFlowSchedule()
						})
					} else {
						this.$message.error({ message: '查询节点失败！' });
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			//办结查询节点
			takeFlowSchedule() {
				this.$axios.post(this.$api.TakeFlowSchedule, {
					tasks: [{
						objType: "3000",
						objId: this.activatedData.requirementId,
						taskId: this.taskIdTemp,
						businessTypeCode: "requirement",
					}],
					requirementId: this.activatedData.requirementId,
					userId: this.$user.getInfo().id,
					completeOrReturn: this.operation
				}).then(res => {
					if(res.data.success) {
						this.taskIdTemp = res.data.taskId
						if(this.flowFlag == "1") {
							this.flowNextTaskDTOS = [...res.data.flowNextTaskDTOS]
							this.candidateUsers = [...res.data.flowNextTaskDTOS["0"].candidateUsers]
							this.defaultUser = res.data.flowNextTaskDTOS["0"].defaultUser
						} else if(this.flowFlag == "2") {
							this.flowNextTaskDTOSa = [...res.data.flowNextTaskDTOS]
							if(this.operation == "1") {
								this.candidateUsersa = [...res.data.flowNextTaskDTOS["0"].candidateUsers]
							}
							this.defaultUsera = res.data.flowNextTaskDTOS["0"].defaultUser
						} else {
							this.flowNextTaskDTOSb = [...res.data.flowNextTaskDTOS]
							this.defaultUserb = res.data.flowNextTaskDTOS["0"].defaultUser
						}

					}
				})
			},
			changeRadio(val) {
				this.takeFlowSchedule()
			},
			backClick() {
				this.$refs.backDialog.show()
			},
			backDialogSubmit() {
				this.subClick()
			},
			backconstraint() {

			},
			//跳转配置页面
			goCommodity(obj) {
				let componentDataTemp = {
					offerId: obj.offerId,
					offerName: obj.offerName,
					requirementId: obj.requirementId,
					taskId: '',
					processInstanceId: ''
				};
				this.$emit('componentView', 'commodity', componentDataTemp);
			},
			initData() {
				//获取详情
				this.activatedData = this.activatedData || this.componentData;
				if(!this.activatedData) return;
				this.$axios.get(this.$api.replace(this.$api.QureyRequirementTask, ['{requirementId}'], [this.activatedData.requirementId]), {
					params: {
						showMember: 1
					}
				}).then(res => {
					if(res.data.success === true) {
						this.requireForm = res.data.requirementDetail;
						this.requireData = res.data.requirementDetail.memberList;
						this.documentList = res.data.requirementDetail.documentList
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			// 需求单成员列表
			getreRuireData() {
				this.activatedData = this.activatedData || this.componentData;
				if(!this.activatedData) return;
				this.$axios.get(this.$api.replace(this.$api.GetRequestMemberList, ['{requirementId}'], [this.activatedData.requirementId]), {
					params: {
						// "userId": 1763051,
						// "requirementId": 1000000945
						"userId": this.$user.getInfo().id,
						"requirementId": this.activatedData.requirementId
					}
				}).then(res => {
					if(res.data.success === true) {
						this.requireData = res.data.requestMemberDTOList;
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
            },
            getPageDocumentObj() {
                this.$axios.get(this.$api.AttachmentUploadQueryPage,{ 
                    params: {
                        objId: this.componentData.requirementId,
                        objType: '1001',
                        page:this.pageInfo.pageIndex,
                        limit:this.pageInfo.pageSize,
                    }
                }).then( res => {
                    if(res.data.success == true) {
                        this.uploadQueryPageList = res.data.documentList.content;
                        this.pageInfo = {
                            pageIndex:res.data.documentList.page,
                            pageSize:res.data.documentList.limit,
                            rowCount:res.data.documentList.total,
                        }
                    } else {
                        this.$message.error({ message: '附件查询失败！' });
                    }
                }).catch( err => {
                    this.$message.error({ message: err.response.data.msg });
                })
            },
            pageChange(page) {
                this.pageInfo.pageIndex = page;
                this.getPageDocumentObj();
            },
			// 删除需求单成员
			delRuireData(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() {
				this.activatedData = this.activatedData || this.componentData;
				if(!this.activatedData) return;
				this.$axios.delete(this.$api.replace(this.$api.DelRequirementRow, ['{requirementId}', '{requestMemberId}'], [this.activatedData.requirementId, this.tipSelData.requestMemberId]), {
					params: {
						staff: this.$user.getInfo().id
					}
				}).then(res => {
					if(res.data.success === true) {
						this.$message.success({ message: '删除成功！' });
						this.initData();
						this.$refs.tip.hide();
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			show() {
				this.toggleFlag = !this.toggleFlag
				this.$nextTick(() => {
					this.$refs.basicScroll.init();
				})
			},
			slide() {
				this.toggleFlag = !this.toggleFlag
				this.$nextTick(() => {
					this.$refs.basicScroll.init();
				})
			},
			createModel() {
				this.modelIndex = "1"
			},
			copyGoods() {
				this.modelIndex = "2"
			},
			deal(val) {
				val.offerCode = this.activatedData.requirementCode;
				val.requirementId = this.activatedData.requirementId;
				val.offerId = val.memberId;
				val.offerName = val.memberName;
				this.$emit('componentView', 'commodity', val)
			},
			//提交
			subClick() {
				let nextTaskList = []
				if(this.flowFlag == "1") {
					for(let ele of this.flowNextTaskDTOS) {
						let temp = {
							assignee: ele.defaultUser.userId,
							elementId: ele.taskDefKey
						}
						nextTaskList.push(temp);
					}
				} else if(this.flowFlag == "2") {
					for(let ele of this.flowNextTaskDTOSa) {
						let temp = {
							assignee: ele.defaultUser.userId,
							elementId: ele.taskDefKey
						}
						nextTaskList.push(temp);
					}
				} else {
					for(let ele of this.flowNextTaskDTOSb) {
						let temp = {
							assignee: ele.defaultUser.userId,
							elementId: ele.taskDefKey
						}
						nextTaskList.push(temp);
					}
				}
				this.$axios.post(this.$api.HandleSub, {
					"assignee": this.$user.getInfo().id,
					"completeOrReturn": this.operation,
					"tasks": [{
						"taskId": this.taskIdTemp,
						"requirementId": this.activatedData.requirementId,
						"objType": "3000",
						"objId": this.activatedData.requirementId,
						"businessTypeCode": "requirement",
						"comments": this.reviewDesc,
						"nextTaskList": nextTaskList
					}],
				}).then(res => {
					if(res.data.success === true) {
						this.$message.success({ message: '提交成功！' });
						this.$emit('componentView', 'list')
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			//分配
			allot() {},
			//返回
			globalback() {
				this.$emit('componentView', 'list')
			},
			dragchange(val) {
				this.tableTitleData = val;
			},
			download() {
				this.$refs.download.show();
			},
			downLoadclick(item) {
				window.open(this.$api.Shtelpaasstorage + item.docLink)
			},
			// 附件上传
			custUploadClick() {
                if (!this.fileType) {
                    this.$message.error({ message: "请选择类型" });
                    return;
                }
                this.$refs.fileRef.click();
            },
			custUploadChange(e) {
				if(this.componentData.requirementId) {
					if(e.target.files.length === 0) return;
					let files = Array.from(e.target.files);
					if(files[0].size > 0) {
						let formData = new FormData();
						formData.append('objId', this.componentData.requirementId);
						formData.append('objType', '1001');
						formData.append('center', 'cpc');
						formData.append('file', files[0]);
						formData.append('docName', files[0].name);
                        formData.append("documentType", this.fileType);
                        formData.append('createStaff ', this.$user.getInfo().id);
						e.target.value = '';
						this.$axios.post(this.$api.PushDocumentObj, formData, {
							headers: {
								"Content-Type": "multipart/form-data"
							}
						}).then(res => {
							if(res.data.success == true) {
                                this.$message.success({ message: '附件上传成功！' });
                                this.getPageDocumentObj();
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
				} else {
					if(e.target.files.length === 0) return;
					let files = Array.from(e.target.files);
					if(files[0].size > 0) {
						let formData = new FormData();
						formData.append('objId', this.sequence);
						formData.append('objType', '1001');
						formData.append('center', 'cpc');
						formData.append('file', files[0]);
						formData.append('docName', files[0].name);
                        formData.append("documentType", this.fileType);
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
				}
			},
			tipConfirm() {
				this.$refs.tip.hide();
				if(this.componentData.requirementId) {
					this.$axios.get(this.$api.DeleteDocumentRels, {
						params: {
							objId: this.tipSelData.objId,
							objType: '1001',
							docLink: this.tipSelData.documentId
						}
					}).then(res => {
						if(res.data.success == true) {
							this.$message.success({ message: "附件删除成功！" });
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
								this.$message.error({ message: error.response.data.msg });
							})
						} else {
							this.$message.error({ message: '附件删除失败！' });
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg });
					})
				} else {
					this.$axios.get(this.$api.DeleteDocumentRels, {
						params: {
							objId: this.tipSelData.objId,
							objType: '1001',
							docLink: this.tipSelData.documentId
						}
					}).then(res => {
						if(res.data.success == true) {
							this.$message.success({ message: "附件删除成功！" });
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
								this.$message.error({ message: error.response.data.msg });
							})
						} else {
							this.$message.error({ message: '附件删除失败！' });
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg });
					})
				}
			},
			getDocumentObj() {
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
					this.$message.error({ message: error.response.data.msg });
				})
			},
			getMemberType(type) {
				switch(type) {
					case "10":
						return '基础销售品';
					case "11":
						return '套餐销售品';
					case "12":
						return '可选包';
					case "13":
						return '促销';
					case "14":
						return '政企协议';
					default:
						return "未知";
				}
			},
			getStatusCd(type) { //获取销售品状态
				switch(type) {
					case "10":
						return '处理';
					case "11":
						return '配置';
					case "12":
						return '测试';
					case "13":
						return '审批';
					case "14":
						return '发布';
					case "15":
						return '已办结';
					default:
						return "处理";
				}
			},
			adjustTabelItemText(item, param) {
				let val = item[param];
				switch(param) {
					case 'offerType':
						return this.getMemberType(val);
					case 'flowStatus':
						return this.getStatusCd(val);
					default:
						return val;
				}
			},
			addCommodity() {
				this.commodityObj.offerName = '';
				this.commodityObj.commodityType = '';
				this.commodityObj.offerType = '';

				this.$refs.addCommodityDialog.show();
			},
			addCommodityDialogConfirm() {
				this.$validator.validateAll('commodity').then((result) => {
					if(result) {
						this.$axios.post(this.$api.NewProperty, {
							requirementId: this.activatedData.requirementId,
							offerName: this.commodityObj.offerName,
							commodityType: this.commodityObj.commodityType,
							offerType: this.commodityObj.offerType,
							offerGroupType: 'C',
							manageGrade: '12',
							manageRegionId: '831000',
							statusCd: '1200',
							isIndependent: "0",
							createStaff: this.$user.getInfo().id,
							updateStaff: this.$user.getInfo().id
						}).then(res => {
							if(res.data.success) {
								this.$refs.addCommodityDialog.hide();
								this.initData();
								this.$message.success({ message: '新建销售品成功！' })
							} else {
								this.$message.error({ message: '新建销售品失败！' })
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg })
						})
					}
				})
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
				if(this.componentData.requirementId) {
					this.$axios.get(this.$api.DeleteDocumentRels, {
						params: {
							objId: this.tipSelData.objId,
							objType: '1001',
							docLink: this.tipSelData.docLink
						}
					}).then(res => {
						if(res.data.success == true) {
							this.$message.success({ message: "附件删除成功！" });
                            this.getPageDocumentObj();
                        }
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg });
					})
				} else {
					this.$axios.get(this.$api.DeleteDocumentRels, {
						params: {
							objId: this.tipSelData.objId,
							objType: '1001',
							docLink: this.tipSelData.docLink
						}
					}).then(res => {
						if(res.data.success == true) {
							this.$message.success({ message: "附件删除成功！" });
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
								this.$message.error({ message: error.response.data.msg });
							})
						} else {
							this.$message.error({ message: '附件删除失败！' });
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg });
					})
				}
			},
            handleBack() {
                this.$refs.addfujian.hide();
            },
			btnCancel() {
				this.$refs.addCommodityDialog.hide();
			},
			download() {
				this.$refs.download.show();
			},
			downLoadclick(item) {
				window.open(this.$api.Shtelpaasstorage + item.docLink)
            },
            showDialog() {
                this.getNodeFile();
                this.getDocumentObj();
                this.$refs.addfujian.show();
            },
            getNodeFile() {
                //获取附件类型
                this.$axios
                    .get(this.$api.GetNodeFile, {
                    params: {
                        nodeName: '',
                        processDefinitionId: this.componentData.flowDefId,
                    }
                })
                .then( res => {
                    if (res.data.success) {
                        this.fileList = res.data.nodeFiles ? res.data.nodeFiles : [];
                        this.fileType = this.fileList ? this.fileList[0].fileTypeId : '';
                    }
                })
                .catch( err => {
                    this.$message.error({ message: err.response.data.msg });
                });
            },
		},

		components: {
			Menubtn: () =>
				import('@/components/pages/goods/group/list/group/menubtn'),
		}
	}
</script>

<style scoped lang="scss">
	.info {
		width: 100%;
		height: 100%;
		padding-bottom: 50px;
		.add-commodity {
			.scroll {
				padding: 20px !important;
			}
		}
	}
	
	.basic-info {
		height: 100%;
		padding: 0 20px;
		.main-box {
			padding-right: 20px;
		}
		.a-v-title1 {
			height: 50px;
			line-height: 50px;
			text-align: right;
			padding-right: 20px;
			.v-t-item {
				display: block;
				width: 80px;
				margin-left: 20px;
				text-align: center;
				color: $mainColor;
				float: left;
			}
			.app__title {
				float: left;
			}
			.h-a-add {
				display: inline-block;
				height: 30px;
				line-height: normal;
			}
		}
		.require-info {
			width: 100%;
			padding: 20px;
			background: #fdfdfd;
			border: 1px solid #eeeeee;
			&.active {
				height: 100px;
				overflow-y: hidden;
			}
			.m-title {
				.col.m-t-name {
					border-right: 1px solid $mainColor;
				}
			}
			.m-item {
				.m-i-name {
					color: $mainColor;
					border-right: 1px solid $mainColor;
					cursor: pointer;
				}
			}
			.col {
				&:hover {
					.col-search {
						display: block;
					}
				}
			}
		}
		.goods-content {
			width: 100%;
			padding: 0 0 30px;
			.goods-box {
				padding: 10px;
				border: 1px solid #eee;
				background: #fdfdfd;
				.menu-btn {
					padding-bottom: 10px;
				}
			}
			.goods-content-left {
				border-right: 1px solid #eee;
			}
			.creategoods {
				padding: 0;
			}
		}
	}
	
	.modeltab {
		background-color: #eee;
		text-align: center;
		color: #999;
		&.active {
			background-color: #fff;
			color: $mainColor;
		}
	}
	
	.span {
		color: $mainColor;
		padding: 0 5px;
		cursor: pointer;
	}
	
	.filebox {
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
	
	.footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 50px;
		line-height: 49px;
		padding: 0 20px;
		border-top: 1px solid #f5f5f5;
		text-align: right;
		background-color: #fff;
	}
	.over-col{
		display: block;
		overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
	}
</style>