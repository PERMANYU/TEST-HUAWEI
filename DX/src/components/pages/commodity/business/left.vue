<template>
	<div class="left">
		<div class="title">
			<span>{{isOpen ? '操作栏' : ''}}</span>
			<span :class="['icon','iconfont',isOpen ? 'icon-shouqi' : 'icon-zhankai']" @click="leftClick()"></span>
		</div>

		<!--菜单-->
		<ul class="operation-box">
			<div v-show="componentData.actType != 'MOD'">
			<li class="border-b" @click="clickSee()" v-if="componentData.requirementId">
				<span class="iconfont icon-chhakan1130 icon-left"></span>
				<span>查看需求单</span>
				<span class="iconfont icon-dayu icon-right"></span>
			</li>

			<li class="border-b" @click="showDemand()" v-if="!componentData.requirementId">
				<span class="iconfont icon-lianjie1130 icon-left"></span>
				<span>关联需求单</span>
				<span class="iconfont icon-dayu icon-right"></span>
			</li>
			</div>

			<li @click="toAbpSubmit()" v-if="nodeName=='goods'||!nodeName">
				<span class="iconfont icon-tongbujifei1130 icon-left"></span>
				<span>同步计费</span>
				<span class="iconfont icon-dayu icon-right"></span>
			</li>

			<!--未同步显示-->
			<li class="border-b" @click="toPpmSubmit()" v-if="nodeName=='goods'||!nodeName">
				<span class="iconfont icon-tongbucrm icon-left"></span>
				<span>同步CRM</span>
				<span class="iconfont icon-dayu icon-right"></span>
			</li>
			<div v-show="componentData.actType != 'MOD'">
			<li @click="operationFlow()" v-if="componentData.requirementId || taskIdTemp">
				<span class="iconfont icon-jindu icon-left"></span>
				<span>流程查看</span>
				<span class="iconfont icon-dayu icon-right"></span>
			</li>

			<li v-if="componentData.requirementId || taskIdTemp" @click="operationSchedule()">
				<span class="iconfont icon-mubiao icon-left"></span>
				<span>进度追踪</span>
				<span class="iconfont icon-dayu icon-right"></span>
			</li>

			<li v-if="code != 4" @click="operationSubmit()">
				<span class="iconfont icon-banjie icon-left"></span>
				<span>办结</span>
				<span class="iconfont icon-dayu icon-right"></span>
			</li>

			<li v-if="componentData.taskId || taskIdTemp" @click="operationBack()">
				<span class="iconfont icon-fanhui1130 icon-left"></span>
				<span>回退</span>
				<span class="iconfont icon-dayu icon-right"></span>
			</li>
			</div>
		</ul>

		<Dialog dialogTitle="流程查看" :dialogSize="flowFlowSize" ref="flowFlow" :showConfirmBtn="false">
			<Scroll :isShowRight="true" ref="scroll" class="flowstyle">
				<img :src="adjustImgPath()" @load="reLoad()" v-if="processInstanceId != '' ">
			</Scroll>
		</Dialog>

		<Dialog dialogTitle="进度追踪" :dialogSize="dialogSize" ref="flowSchedule" :showConfirmBtn="false">
			<Scroll class="dialog-schedule" :isShowRight="true">
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="6">环节</Col>
						<Col :span="3">操作人</Col>
						<Col :span="5">办理时间</Col>
						<Col :span="5">办理时长</Col>
						<Col :span="3">备注</Col>
						<Col :span="2">状态</Col>
					</Row>
					<Row class="app__table-item" v-for="(item,index) in flowScheduleData" :key="index">
						<Col :span="6">{{item.taskName}}</Col>
						<Col :span="3">{{item.operator}}</Col>
						<Col class="no-wrap" :title="item.operateDate" :span="5">{{item.operateDate}}</Col>
						<Col :span="5">{{item.duration}}</Col>
						<Col class="no-wrap" :title="item.operateDesc" :span="3">{{item.operateDesc}}</Col>
						<Col :span="2">{{item.operatorStatus == '1' ? '同意' : item.operatorStatus == '0' ? '回退' : '无'}}</Col>
					</Row>
					<Row v-if="flowScheduleData.length == 0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
				</div>
			</Scroll>
			<!--  <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange"> -->
			</Pagination>
		</Dialog>

		<Dialog class="dialog-submit" :dialogSize="BdialogSize" dialogTitle="办结" ref="flowSubmit" @confirm="handleSub">
			<Scroll class="dialog-examine" :isShowRight="true">
				<div v-if="isSinge == '1'">
					<div class="flow">下一环节：
						<Select :data="handleData" dataValueStr="taskDefKey" dataLabelStr="taskDefName" v-model="selected"></Select>
					</div>
					<div v-show="selected">处理人：
						<Select v-show="item.taskDefKey == selected" v-for="(item,index) in handleData" :key="index" :data="item.candidateUsers" dataValueStr="userId" dataLabelStr="userName" v-model="item.defaultUser.userId"></Select>
					</div>
				</div>
				<div v-else v-for="(item,index) in handleData" :key="index" class="flow_bottom">
					<span class="span"><span class="number">{{index+1}}</span>下一环节 : {{item.taskDefName}}</span>
					<Select v-if="item.candidateUsers" :data="item.candidateUsers" dataValueStr="userId" dataLabelStr="userName" v-model="item.defaultUser.userId"></Select>
				</div>
				<p>
					描述：
				</p>
				<div>
					<textarea class="app__textarea" v-model="handleOption"></textarea>
				</div>

                <div class="file-type" v-show="isfileUpload == 'true'">
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
		<Dialog dialogTitle="办理人" :dialogSize="dialogSize" ref="flowPerson" @confirm="handlePersonSub">
			<Scroll class="dialog-examine" :isShowRight="true">
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="8">选择</Col>
						<Col :span="16">办理人姓名</Col>
					</Row>
					<Row class="app__table-item" v-for="(item,index) in handlePersonData" :key="index">
						<Col :span="8">
						<Radio name="transactor" v-model="flowPersonItem" :label="item"></Radio>
						</Col>
						<Col :span="16">{{item.userName}}</Col>
					</Row>
				</div>
			</Scroll>
		</Dialog>

		<Dialog class="dialog-back" dialogTitle="回退" :dialogSize="BdialogSize" ref="flowBack" @confirm="handleBackSub">
			<Scroll class="dialog-examine" :isShowRight="true">
				<div v-for="(item,index) in regressesData" :key="index">
					<span class="span"><span class="number">{{index+1}}</span>下一环节 : {{item.taskDefName}}</span>
					<Input v-model="item.defaultUser.userName" disabled></Input>
				</div>
				<p>
					描述：
				</p>
				<div>
					<textarea class="app__textarea" v-model="handleBackOption"></textarea>
				</div>
			</Scroll>
		</Dialog>

		<Dialog dialogTitle="审核" ref="flowExamine">
			<Scroll class="dialog-examine" :isShowRight="true">
				<div class="d-e-sel">
					<Radio name="radio1">审核通过</Radio>
					<Radio name="radio1" class="radio-nofirst">审核不通过</Radio>
				</div>
				<p>
					审核意见：
				</p>
				<div>
					<textarea class="app__textarea"></textarea>
				</div>
			</Scroll>
		</Dialog>

		<!--查看需求单弹框-->
		<Dialog :dialogSize="{min: 800,max: 900}" class="see-dialog" dialogTitle="查看需求单" ref="seeDtail" :initBtn="true">
			<Row>
				<Col :span="8">
				<label>需求单编码：</label>
				<span>{{requireForm.requirementCode}}</span>
				</Col>

				<Col :span="8">
				<label>需求单类型：</label>
				<span>{{requireForm.requestType == '10' ? '产品' : '销售品'}}</span>
				</Col>

				<Col :span="8">
				<label>需求单名称：</label>
				<span>{{requireForm.requirementName}}</span>
				</Col>

				<Col :span="8">
				<label>发起部门：</label>
				<span>{{requireForm.deptCode}}</span>
				</Col>

				<Col :span="8">
				<label>业务联系人：</label>
				<span>{{requireForm.contName}}</span>
				</Col>

				<Col :span="8">
				<label>业务联系人电话：</label>
				<span>{{requireForm.contTele}}</span>
				</Col>

				<Col :span="8">
				<label>IT对口人：</label>
				<span>{{requireForm.itName}}</span>
				</Col>

				<Col :span="8">
				<label>IT对口人电话：</label>
				<span>{{requireForm.itTele}}</span>
				</Col>

				<Col :span="8">
				<label>预期完工时间：</label>
				<span>{{requireForm.expectFinishDate | date}}</span>
				</Col>

				<Col :span="24">
				<label>需求单描述：</label>
				<textarea disabled>{{requireForm.requirementDesc}}</textarea>
				<!--<span class="Desc"></span>-->
				</Col>
			</Row>

			<!--自定义按钮-->
			<template slot="btnBox">
				<span class="back" @click="btnCancel()">取消</span>
			</template>
		</Dialog>

		<!--关联需求单弹框-->
		<Dialog :dialogSize="{min: 800,max: 1000}" class="demand-box" dialogTitle="关联需求单" ref="demand" @confirm="demandConfirm()">
			<div class="main">
				<div class="h-dialog-search">
					<Search placeholder="请输入需求单名称" @search="search2"></Search>
				</div>

				<div class="app__table__inner h-d-item">
					<Row class="app__table-thead">
						<Col :span="4">选择</Col>
						<Col :span="10">需求单名称</Col>
						<Col :span="10">需求单编码</Col>
					</Row>

					<Row :class="['m-item app__table-item']" v-for="(item,index) in requirementList" :key="index">
						<Col :span="4">
						<i class="select" :class="{active:selectInfo==item}" @click="selectClick(item)"></i>
						</Col>
						<Col :span="10" class="app__cut-txt" :title="item.requirementName">{{item.requirementName}}</Col>
						<Col :span="10">{{item.requirementCode}}</Col>
					</Row>

					<!--暂无数据-->
					<div class="app__data-none" v-show="requirementList.length===0">
						<span>暂无数据</span>
					</div>
				</div>

				<Pagination :pageIndex="pageInfo2.pageIndex" :pageSize="pageInfo2.pageSize" :rowCount="pageInfo2.rowCount" :perPages=1 @change="pageChange2" :isCenter="true">
				</Pagination>
			</div>
		</Dialog>

        <Tip ref="tipDocument" :tipObj="tipInfo" @confirm="tipDocumentConfirm()"></Tip>

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
				requireForm: {}, //需求单详情
				requirementList: [], //需求单列表
				requirementName: '', //需求单名称
				pageInfo2: {
					pageIndex: 1, // 当前页
					pageSize: 6, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				selectInfo: '',
				isOpen: true,
				flowFlowSize: {
					size: 80,
					min: 900,
					max: 600
				},
				dialogSize: {
					size: 80,
					min: 800,
					max: 600
				},
				BdialogSize: {
					size: 50,
					min: 600,
					max: 600
				},
				staffTree: {
					name: '选择人员',
					children: [{
						name: '业务部',
						children: [{
							name: '张三三',
							children: [{
								name: 'ffff'
							}, {
								name: 'ssss'
							}]
						}, {
							name: '李思思'
						}]
					}, {
						name: '市场部',
						children: [{
							name: '王捂捂'
						}, {
							name: '邱明明'
						}]
					}, {
						name: '营销部',
						children: [{
							name: '王捂捂'
						}, {
							name: '邱明明'
						}]
					}, {
						name: '营销部',
						children: [{
							name: '王捂捂'
						}, {
							name: '邱明明'
						}]
					}, {
						name: '营销部',
						children: [{
							name: '王捂捂'
						}, {
							name: '邱明明'
						}]
					}]
				},
				flowScheduleData: [], //追踪记录
				handleData: [], // 办结列表
				regressesData: [], // 回退列表
				handlePersonData: [], // 办结列表
				handleOption: "", // 审核意见
				flowItem: {},
				flowPersonItem: {},
				staffKeys: [{
					key: 'name'
				}],
				treeModel: '',
				pageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},

				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				tipType: '',
				tipSelData: '',
				taskIdTemp: '',
				flowBackItem: {},
				handleBackOption: '',
				nextTaskList: [],
				code: '',
				processInstanceId: '',
				processDefinitionId: '',
				nodeName: '',
				selected: '',
				isSinge: '',
				tasks: [],
				completeOrReturn: 1,
                isfileUpload:'',
                fileType:'',
                fileList:[],
                documentList:[],
                flowNodeObj:{},
                upNum:'',
			}
		},
		mounted() {
		},
		methods: {
            //查询节点和组件数据
			getNodeAndComponent () {
				this.$axios.get(this.$api.GetNodeAndComponent, {
					params: {
						objType: "1000",
						objId: this.componentData.offerId,
						requirementId: this.componentData.requirementId,
						userId: this.$user.getInfo().id
					}
                }).then(res => {
                    if(res.data.success) {
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
                            this.fileList = res.data.nodeFiles ? res.data.nodeFiles : [];
                            this.fileType = this.fileList ? this.fileList[0].fileTypeId : '';
                        }
                    })
                    .catch( err => {
                        this.$message.error({ message: err.response.data.msg });
                    });
            },
			setTask(item) {
				this.taskIdTemp = item.taskId;
				this.code = item.status;
				this.processInstanceId = item.processInstanceId;
				this.processDefinitionId = item.processDefinitionId;
				this.nodeName = item.nodeName
			},
			//点击查看需求单
			clickSee() {
				this.$refs.seeDtail.show();
				this.getSeeDtail();
			},
			//关闭弹框
			btnCancel() {
				this.$refs.seeDtail.hide();
			},
			getSeeDtail() {
				this.$axios.get(this.$api.replace(this.$api.QureyRequirementTask, ['{requirementId}'], [this.componentData.requirementId]), {
					params: {
						showMember: 1
					}
				}).then(res => {
					if(res.data.success === true) {
						this.requireForm = res.data.requirementDetail;
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: res.data.msg })
				})
			},
			//点击关联需求单
			showDemand() {
				this.$refs.demand.show();
				this.getDemandData();
			},
			//获取需求单列表
			getDemandData() {
				this.$axios.get(this.$api.QureyRequirementList, {
					params: {
						requirementName: this.requirementName,
						requirementCode: '',
						requestType: '',
						statusCd: '1200',
						staff: '',
						page: this.pageInfo2.pageIndex,
						limit: this.pageInfo2.pageSize
					}
				}).then(res => {
					if(res.data.success) {
						this.requirementList = res.data.requirementPage.content;
						this.pageInfo2.rowCount = res.data.requirementPage.total;

					} else {
						this.$message.error({ "message": "需求单列表查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			search2(val) {
				this.requirementName = val;
				this.pageChange2(1);
			},
			pageChange2(page) {
				this.pageInfo2.pageIndex = page;
				this.getDemandData();
			},
			//点击一条需求单
			selectClick(item) {
				if(this.selectInfo != item) {
					this.selectInfo = item;
				} else {
					this.selectInfo = '';
				}
			},
			demandConfirm() {
				if(this.selectInfo) {
					this.getRelevantData();
				} else {
					this.$message.error({ "message": "请选择需要关联的需求单！" })
				}
			},
			//关联一条需求单
			getRelevantData() {
				this.$axios.post(this.$api.replace(this.$api.AddRequirementMem, ['{requirementId}'], [this.selectInfo.requirementId]), {
					requirementId: this.selectInfo.requirementId,
					memberType: '11',
					memberId: this.componentData.offerId,
					staff: this.$user.getInfo().id
				}).then(res => {
					if(res.data.success === true) {
						this.$message.success({ "message": "关联成功！" });
						this.$refs.demand.hide();
						this.componentData.requirementId = this.selectInfo.requirementId;
						this.$emit('bindRequirementId');

					} else {
						this.$message.error({ "message": "操作失败！" })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			operationFlow() {
				//流程查看
				this.$refs.flowFlow.show();
			},
			adjustImgPath() {
				if(this.processInstanceId) {
					return `${this.$api.FlowImgPath.instance}/${this.processInstanceId}`;
				} else {
					return `${this.$api.FlowImgPath.definitions}/${this.processDefinitionId}`;
				}
			},
			reLoad() {
				this.$refs.flowFlow.initHeight();
				this.$refs.scroll.initScroll();
			},
			operationSchedule() {
				//流程追踪
				this.$refs.flowSchedule.show();
				this.getreRuireData();
			},
			operationSubmit() {
                this.getNodeAndComponent();
				//办结
				if(this.componentData.requirementId){
					this.$parent.$refs.component.save().then(result => {
						if(result) {
							this.$refs.flowSubmit.show();
							this.getFlowSet();
						}
					})
				}else{
					this.$message.error({ message: "请先关联需求单！" })
				}
			},
			operationBack() {
				//回退
				this.$refs.flowBack.show();
				this.getFlowBack();
			},
			operationExamine() {
				//审核
				this.$refs.flowExamine.show();
			},
			backDialogPlugClick() {
				this.$refs.flowBack.initHeight();
				this.$refs.backDialogScroll.initScroll();
			},
			submitDialogPlugClick() {
				this.$refs.flowSubmit.initHeight();
				this.$refs.submitDialogScroll.initScroll();
			},
			leftClick() {
				if(this.isOpen) {
					this.$el.style.width = '60px';
				} else {
					this.$el.style.width = '200px';
				}
				this.isOpen = !this.isOpen;
				this.$emit('leftClick', this.isOpen);
			},
			pageChange() {},
			// 进度追踪列表
			getreRuireData() {
				this.$axios.get(this.$api.FlowScheduleList, {
					params: {
						"objType": "1000",
						"objId": this.componentData.offerId,
						"requirementId": this.componentData.requirementId
					}
				}).then(res => {
					if(res.data.success === true) {
						this.flowScheduleData = res.data.traceList;
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},

			// 办结下一节点查询列表
			getFlowSet() {
				this.$axios.post(this.$api.TakeFlowSchedule, {
					"completeOrReturn": "1",
					"requirementId": this.componentData.requirementId,
					"tasks": [{
						"businessTypeCode": "offer",
						"objId": this.componentData.offerId,
						"objType": "1000",
						"taskId": this.taskIdTemp
					}],
					"userId": this.$user.getInfo().id

				}).then(res => {
					if(res.data.success === true) {
						this.isSinge = res.data.isSinge;
						this.handleData = res.data.flowNextTaskDTOS;
						this.taskIdTemp = res.data.taskId;
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			// 办理人列表
			getPerson(item) {
				this.$refs.flowSubmit.hide();
				this.$refs.flowPerson.show();
				this.handlePersonData = item.candidateUsers;
			},
			handlePersonSub() {
				this.$refs.flowPerson.hide();
				this.$refs.flowSubmit.show();
				if(Object.keys(this.flowPersonItem).length != 0) {
					this.handleData.defaultUser.userId = this.flowPersonItem.userId;
					this.handleData.defaultUser.userName = this.flowPersonItem.userName;
				}
			},
			// 办结
			handleSub() {
				this.nextTaskList = [];
				if(this.handleData.length > 0) {
					

					if(this.isSinge == '1') {
						if(!this.selected){
							this.$message.error({message:'请先选择环节！'})
							return;
						}

						if(this.handleData.find( item => !item.defaultUser.userId)){
							this.$message.error({message:'请选择处理人！'})
							return;
						}

						for(let ele of this.handleData) {
							if(this.selected == ele.taskDefKey) {
								this.completeOrReturn = ele.completeOrReturn;
								let temp = {
									assignee: ele.defaultUser.userId,
									elementId: ele.taskDefKey
								}
								this.nextTaskList.push(temp);
							}
						}
						this.$axios.post(this.$api.HandleSub, {
							"assignee": this.$user.getInfo().id,
							"completeOrReturn": this.completeOrReturn,
							"tasks": [{
								"businessTypeCode": "offer",
								"comments": this.handleOption,
								"nextTaskList": this.nextTaskList,
								"objId": this.componentData.offerId,
								"objType": "1000",
								"requirementId": this.componentData.requirementId,
								"taskId": this.taskIdTemp
							}]

						}).then(res => {
							if(res.data.success === true) {
								this.flowScheduleData = res.data.offerList;
								this.$refs.flowSubmit.hide();
								this.$message.success({ message: '成功！' });
								this.$emit('flowBack');
							} else {
								this.$message.error({ message: res.data.msg })
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg })
						})
					} else {
						if(this.handleData.find( item => !item.defaultUser.userId)){
							this.$message.error({message:'请选择处理人！'})
							return;
						}
						for(let ele of this.handleData) {
							let temp = {
								assignee: ele.defaultUser.userId,
								elementId: ele.taskDefKey
							}
							this.nextTaskList.push(temp)
						}
						this.$axios.post(this.$api.HandleSub, {
							"assignee": this.$user.getInfo().id,
							"completeOrReturn": '1',
							"tasks": [{
								"businessTypeCode": "offer",
								"comments": this.handleOption,
								"nextTaskList": this.nextTaskList,
								"objId": this.componentData.offerId,
								"objType": "1000",
								"requirementId": this.componentData.requirementId,
								"taskId": this.taskIdTemp
							}]

						}).then(res => {
							if(res.data.success === true) {
								this.flowScheduleData = res.data.offerList;
								this.$refs.flowSubmit.hide();
								this.$message.success({ message: '成功！' });
								this.$emit('flowBack');
							} else {
								this.$message.error({ message: res.data.msg })
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg })
						})
					}
				} else {
					// this.$message.error({message: "请选择下一环节"})
					this.$axios.post(this.$api.HandleSub, {
						"taskId": this.taskIdTemp,
						"assignee": this.$user.getInfo().id,
						// "assignee": '2',
						"completeOrReturn": "1",
						"objType": "1000",
						"objId": this.componentData.offerId,
						"requirementId": this.componentData.requirementId,
						//                      "offerId": "544128",
						"comments": this.handleOption,
						"nextTaskList": []
					}).then(res => {
						if(res.data.success === true) {
							this.flowScheduleData = res.data.offerList;
							this.$refs.flowSubmit.hide();
							this.$message.success({ message: '流程结束！' });
							this.$emit('flowBack');
						} else {
							this.$message.error({ message: res.data.msg })
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg })
					})
				}
			},
			// 回退下一节点列表
			getFlowBack() {
				this.$axios.post(this.$api.TakeFlowSchedule, {
					"completeOrReturn": "0",
					"requirementId": this.componentData.requirementId,
					"tasks": [{
						"businessTypeCode": "offer",
						"objId": this.componentData.offerId,
						"objType": "1000",
						"taskId": this.taskIdTemp
					}],
					"userId": this.$user.getInfo().id
				}).then(res => {
					if(res.data.success === true) {
						this.regressesData = res.data.flowNextTaskDTOS;
						this.taskIdTemp = res.data.taskId;
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			tipConfirm() {
				if(this.tipType === 'Abp') {
					this.toAbp()
				} else if(this.tipType === 'Ppm') {
					this.toPpm()
				}
			},
			//同步计费数据
			toAbp() {
				this.$axios.get(this.$api.QryToAbp, {
					params: {
						offerId: this.componentData.offerId
					}
				}).then(res => {
					if(res.data.success) {
						this.$message.success({ message: "同步成功！" });
						this.$refs.tip.hide();
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			//同步CRM数据
			toPpm() {
				this.$axios.get(this.$api.QryToPpm, {
					params: {
						offerId: this.componentData.offerId
					}
				}).then(res => {
					if(res.data.success) {
						this.$message.success({ message: "同步成功！" });
						this.$refs.tip.hide();

						//同步成功后 基本信息重新查询
						this.$emit('goodsBasicReInfo')
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			//同步计费
			toAbpSubmit(item) {
				if(this.componentData.requirementId) {
					this.tipType = 'Abp';
					//this.tipSelData = item;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认同步计费？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				} else {
					this.$message.error({ message: "请先关联需求单！" })
				}
			},
			//同步CRM
			toPpmSubmit(item) {
				if(this.componentData.requirementId) {
					this.tipType = 'Ppm';
					//this.tipSelData = item;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认同步CRM？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				} else {
					this.$message.error({ message: "请先关联需求单！" })
				}
			},
			// 回退下一节点提交
			handleBackSub() {
				this.nextTaskList = [];
				//              if(Object.keys(this.flowBackItem).length != 0 && this.regressesData.length >0){
				if(this.regressesData.length > 0) {
					for(let ele of this.regressesData) {
						let temp = {
							assignee: ele.defaultUser.userId,
							elementId: ele.taskDefKey
						}
						this.nextTaskList.push(temp);
					}
					this.$axios.post(this.$api.HandleSub, {
						//						"taskId": this.taskIdTemp,
						//						"assignee": this.$user.getInfo().id,
						//						// "assignee": '2',
						//						"completeOrReturn": "0",
						//						"offerId": this.componentData.offerId,
						//						"requirementId": this.componentData.requirementId,
						//						//                         "offerId": "544128",
						//						"comments": this.handleBackOption,
						//						"nextTaskList": this.nextTaskList
						"assignee": this.$user.getInfo().id,
						"completeOrReturn": "0",
						"tasks": [{
							"businessTypeCode": "offer",
							"comments": this.handleBackOption,
							"nextTaskList": this.nextTaskList,
							"objId": this.componentData.offerId,
							"objType": "1000",
							"requirementId": this.componentData.requirementId,
							"taskId": this.taskIdTemp
						}]
					}).then(res => {
						if(res.data.success === true) {
							this.flowScheduleData = res.data.offerList;
							this.$refs.flowBack.hide();
							this.$message.success({ message: '成功！' });
							this.$emit('flowBack');
						} else {
							this.$message.error({ message: res.data.msg })
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg })
					})
				} else {
					//                  this.$message.error({message: "请选择下一环节"})
				}
			},
            requirementDocDownload(item) {//下载
                window.open(this.$api.Shtelpaasstorage + item.docLink)
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
	/*查看需求单详情弹框*/
	
	.see-dialog {
		.row {
			padding: 20px 0;
			.col {
				padding-left: 30px;
				label {
					display: inline-block;
					font-size: 12px;
					color: #222222;
				}
				span {
					font-size: 12px;
					color: #666666;
					word-wrap: break-word;
				}
				textarea {
					width: 70%;
					height: 100px;
					padding: 10px;
					resize: none;
					background-color: #f5f6fa;
					border: solid 1px #f0f0f0;
					vertical-align: top;
					font-size: 12px;
					color: #666666;
					word-wrap: break-word;
				}
			}
		}
	}
	
	.h-dialog-search {
		width: 50%;
		margin: 20px 10px 10px 20px;
	}
	
	.demand-box {
		color: #777;
		text-align: center;
		.content {
			min-height: 420px;
		}
		/*选择样式*/
		.select {
			display: inline-block;
			width: 16px;
			height: 16px;
			background: url("../images/kuang.png") no-repeat;
			background-size: 100% 100%;
			vertical-align: text-bottom;
			cursor: pointer;
		}
		.active {
			background: url("../images/choosebox-blue.png") no-repeat;
			background-size: 100% 100%;
		}
	}
	
	.left {
		position: absolute;
		top: 0;
		left: 0;
		width: 200px;
		height: 100%;
		border-right-width: 10px;
		border-right-style: solid;
		border-right-color: #f5f5f5;
		transition: .3s all ease;
		overflow: hidden;
		.title {
			height: 20px;
			line-height: 20px;
			margin: 20px 30px 20px 0;
			font-size: 16px;
			color: $mainColor;
			text-align: center;
			border-left-width: 5px;
			border-left-style: solid;
			border-left-color: $mainColor;
			white-space: nowrap;
			.icon {
				position: absolute;
				display: block;
				right: -15px;
				top: 3px;
				width: 14px;
				height: 14px;
				cursor: pointer;
			}
		}
		/*左侧菜单样式*/
		.operation-box {
			width: 100%;
			border-top: solid 1px #f0f0f0;
			border-bottom: solid 1px #f0f0f0;
			li {
				width: 100%;
				height: 48px;
				line-height: 46px;
				list-style: none;
				font-size: 14px;
				color: $mainColor;
				cursor: pointer;
				overflow: hidden;
				.icon-left {
					margin-left: 18px;
					margin-right: 6px;
				}
				.icon-right {
					float: right;
					margin-right: 20px;
				}
				&:hover {
					color: white;
					background-color: $mainColor;
				}
			}
			.border-b {
				border-bottom: solid 1px #f0f0f0;
			}
			.color-o {
				color: #ff9805;
			}
		}
		.operation {
			height: 40px;
			line-height: 40px;
			padding-left: 50px;
			cursor: pointer;
			background-repeat: no-repeat;
			background-position: 20px center;
			white-space: nowrap;
			&:hover {
				color: $mainColor;
			}
			&.flow {
				background-image: url(./../images/lcck.png);
			}
			&.schedule {
				background-image: url(./../images/jdzz.png);
			}
			&.submit {
				background-image: url(./../images/tj.png);
			}
			&.back {
				background-image: url(./../images/ht.png);
			}
			&.examine {
				background-image: url(./../images/sh.png);
			}
		}
		.dialog-schedule {
			padding: 20px !important;
			.app__table {
				margin-top: 20px;
			}
			.see {
				color: $mainColor;
				cursor: pointer;
			}
		}
		.dialog-submit {
			padding: 20px;
		}
		.dialog-back {
			padding: 20px;
		}
		.update-flow {
			cursor: pointer;
			color: #59bffd;
		}
		.dialog-examine {
			padding: 20px !important;
			.flow {
				margin-bottom: 20px;
			}
			.flow_bottom {
				margin-bottom: 10px;
			}
			.span {
				display: block;
				margin-bottom: 20px;
				color: $mainColor;
				.number {
					display: inline-block;
					width: 15px;
					height: 15px;
					border: 1px solid $mainColor;
					text-align: center;
					line-height: 13px;
					border-radius: 50%;
					background: $mainColor;
					color: #ffffff;
					margin-right: 10px;
				}
			}
			.d-e-sel {
				height: 40px;
				line-height: 40px;
			}
			.radio-nofirst {
				margin-left: 100px;
			}
			p {
				margin: 10px 0;
			}
		}

        .file-type {
            .span {
                display: inline-block;
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
	}
	
	.no-wrap {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		cursor: pointer;
	}
	
	.flowstyle {
		text-align: center;
	}
</style>