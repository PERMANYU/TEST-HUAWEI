<template>
    <div class="approval">
        <Scroll class="basic-info" :isShowRight="true">
            <div class="main-box">
                <div class="a-v-title1">
                    <div :class="['p-t-block',proType=='xqd' ? 'active' : '']" @click="offerPaneBlockClick('xqd')">
                        <i class="iconfont icon-weifabu"></i>
                        <span>需求单和产品信息</span>
                    </div>
                    <div :class="['p-t-block',proType=='fjxx' ? 'active' : '']" @click="offerPaneBlockClick('fjxx')">
                        <i class="iconfont icon-yifabu"></i>
                        <span>附件信息</span>
                    </div>
                    <div class="fjsc" v-if="offOropen != 'false'">
                        <span class="span" @click="showDialog">
                            <span>
                                附件上传
                            </span>
                        </span>
                    </div>
                    <div class="h-a-add">
                        <div v-if="toggleFlag" class="app__btn app__btn-show" @click="show()">更多</div>
                        <div v-else class="app__btn app__btn-slide" @click="slide()">收起</div>
                    </div>
                </div>
                <div :class="['require-info',toggleFlag?'active':'']">
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="4">
                            <FormItem labelText="需求单编码：" small>
                                <span>{{componentData.requirementCode}}</span>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="产品名称：" small>
                                <span>{{componentData.requirementName}}</span>
                            </FormItem>
                            </Col>
                            <Col :span="5" :offset="1">
                            <FormItem labelText="业务管理部门产品经理：" small>
                                <span>{{componentData.contName}}</span>
                            </FormItem>
                            </Col>
                            <Col :span="5" :offset="1">
                            <FormItem labelText="业务管理部门产品经理联系电话：" small>
                                <span>{{componentData.contTele}}</span>
                            </FormItem>
                            </Col>
                        </Form>
                    </Row>
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="4">
                            <FormItem labelText="需求单类型：" small>
                                <span>{{componentData.requestType == '10' ? '产品' : '销售品'}}</span>
                            </FormItem>
                            </Col>
                            <!-- <Col :span="7" :offset="1">
							<FormItem labelText="预期完工时间：" small>
								<span>{{componentData.expectFinishDate | datetime}}</span>
							</FormItem>
							</Col> -->
                            <Col :span="7 " :offset="1 ">
                            <FormItem labelText="业务运营部门产品经理联系电话：" small>
                                <span>{{componentData.itTele}}</span>
                            </FormItem>
                            </Col>
                            <Col :span="5" :offset="1">
                            <FormItem labelText="业务管理部门：" small>
                                <span>{{componentData.deptCode}}</span>
                            </FormItem>
                            </Col>
                            <Col :span="5" :offset="1">
                            <FormItem labelText="需求单功能类型：" small>
                                <span>{{componentData.actType == "ADD"?"新增":componentData.actType == "MOD"?"变更":"下架"}}</span>
                            </FormItem>
                            </Col>
                        </Form>
                    </Row>
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="24">
                            <FormItem labelText="产品概述：" small>
                                <pre v-html="componentData.requirementDesc"></pre>
                            </FormItem>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </div>

            <div class="a-operation" v-show="proType =='fjxx'">
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
                        <span v-show="item.documentType ? item.documentType == num : false" @click="deleteDoc(item)">
                            删除
                        </span>
                        </Col>
                    </Row>
                    <Row v-if="!documentList.length" class="app__data-none">
                        <Col>
                        <span>暂无数据</span>
                        </Col>
                    </Row>
                </div>
            </div>

            <div v-show="proType =='xqd'">
                <div class="prod-member app__table">
                    <Row class="m-title app__table-thead">
                        <Col :span="4">产品编码</Col>
                        <Col :span="8">产品名称</Col>
                        <Col :span="4">最大值</Col>
                        <Col :span="4">最小值</Col>
                        <Col :span="4">默认值</Col>
                    </Row>
                    <Row class="app__table-item" v-for="(item,index) in prodMembers" :key="index">
                        <Col :span="4">{{item.prodNbr}}</Col>
                        <Col :span="8">
                        <span :class="['prodtype',item.prodUseType == '1000' ? 'active' : '']">{{item.prodUseType == '1000' ? '主' : '附'}}</span>
                        {{item.prodName}}
                        </Col>
                        <Col :span="4">{{item.maxNum}}</Col>
                        <Col :span="4">{{item.minNum}}</Col>
                        <Col :span="4">{{item.defaultValue}}</Col>
                    </Row>
                </div>

                <div class="a-operation">
                    <Row class="title">
                        审核操作
                        <div class="right-btn">
                            <div class="app__btn app__btn-set " @click="operationSchedule">进度追踪</div>
                            <div class="app__btn app__btn-set" @click="operationFlow">流程查看</div>
                        </div>
                    </Row>
                    <Row>
                        <RadioGroup v-validate="'required'" name="testResapprovalResultult" :data="approvalResultArray" v-model="completeOrReturn" label="1" data-vv-as="审核操作结果"></RadioGroup>
                    </Row>
                    <Row>
                        <Col :span="7" v-for="(item,index) in completeProdObj.flowNextTaskDTOS" :key="index">
                        <div>
                            <span>下一环节：{{item.taskDefName}}</span>
                        </div>
                        <Select :data="item.candidateUsers" v-model="item.defaultUser" dataValueStr="userId" dataLabelStr="userName" :saveObject="true" :isNullSel="false"></Select>
                        </Col>
                        <div v-if="completeProdObj.flowNextTaskDTOS.length == 0">
                            <span>下一环节：结束</span>
                        </div>
                    </Row>
                    <Row>
                        <Col :span="15">
                        <span>审核意见：</span>
                        <Input type="textarea" v-model="completeProdObj.comments"></Input>
                        </Col>
                    </Row>
                </div>
            </div>

        </Scroll>
        <div class="footer">
            <span class="btn submit" @click="completeProdSubmit">提交</span>
            <span class="btn back" @click="globalback">返回</span>
        </div>
        <!--流程查看-->
        <Dialog dialogTitle="流程查看" :dialogSize="flowFlowSize" ref="flowFlow" :showConfirmBtn="false">
            <Scroll :isShowRight="true" ref="scroll" class="flowstyle">
                <img :src="adjustImgPath()" @load="reLoad()">
            </Scroll>
        </Dialog>

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
                        <span @click="deleteDoc(item)" v-show="item.documentType ? item.documentType == num : false">
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

        <Dialog dialogTitle="进度追踪" :dialogSize="dialogSize" ref="flowSchedule" :showConfirmBtn="false">
            <Scroll :isShowRight="true">
                <div class="app__table dialog-schedule">
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
                        <Col :title="item.operateDesc" :span="3">
                        <span class="operate-desc">{{item.operateDesc}}</span>
                        </Col>
                        <Col :span="2">{{item.operatorStatus == '1' ? '同意' : item.operatorStatus == '0' ? '回退' : '无'}}</Col>
                    </Row>
                    <Row v-if="flowScheduleData.length == 0" class="app__data-none">
                        <Col :span="24">
                        <span>当前无数据</span>
                        </Col>
                    </Row>
                </div>
            </Scroll>
        </Dialog>
    </div>
</template>

<script type="text/javascript">
export default {
    props: {
        componentData: {}
    },
    data() {
        return {
            prodTreeKeys: [
                {
                    key: "prodName"
                }
            ],
            offOropen: false,
            proType: "xqd",
            documentList: [],
            approvalResultArray: [
                {
                    label: "同意",
                    value: "1"
                },
                {
                    label: "不同意",
                    value: "0"
                }
            ],
            fileList: [],
            fileType: "",
            dialogIpt: {
                size: 80,
                min: 600,
                max: 700
            },
            flowNodeObj: null,
            completeOrReturn: "1",
            completeProdObj: {
                flowNextTaskDTOS: []
            }, //办结节点查询数据
            toggleFlag: false,
            flowFlag: "",
            dialogSize: {
                size: 80,
                min: 800,
                max: 600
            },
            flowFlowSize: {
                size: 80,
                min: 900,
                max: 600
            },
            num: "",
            prodMembers: [],
            firstProdMember: null, //最早的产品
            flowScheduleData: [] //追踪记录
        };
    },
    watch: {
        completeOrReturn(val, old) {
            if (val === "1") {
                this.getNextFlow("1");
            } else if (val === "0") {
                this.getNextFlow("0");
            }
        },
        "flowNodeObj.task.nodeName"(old, newValue) {
            if (this.flowNodeObj.task.nodeName) {
                this.getNodeFile();
            }
        }
    },
    mounted() {
        this.getProdMember();
    },
    methods: {
        getProdMember() {
            //获取需求单产品成员列表
            this.$axios
                .get(this.$api.QureyOrdProdMember, {
                    params: {
                        requirementId: this.componentData.requirementId,
                        staff: this.$user.getInfo().id
                    }
                })
                .then(res => {
                    this.prodMembers = res.data.products;
                    this.firstProdMember =
                        this.prodMembers.length > 0
                            ? this.prodMembers[this.prodMembers.length - 1]
                            : {};

                    this.getNodeAndComponent();
                });
        },
        //流程查看
        operationFlow() {
            if (!this.firstProdMember.prodId) {
                this.$message.error({ message: "请添加根产品！" });
                return;
            }
            if (!this.isExistFlow()) {
                this.$message.error({ message: "暂无流程！" });
                return;
            } else {
                this.$refs.flowFlow.show();
            }
        },
        offerPaneBlockClick(type) {
            if (type == "fjxx") {
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
            }
            this.proType = type;
        },
        isExistFlow() {
            if (this.flowNodeObj == null) return false;
            let taskIdTemp = this.flowNodeObj.task;
            if (taskIdTemp.status == "1" || taskIdTemp.status == "4") {
                //1和4
                return taskIdTemp.processInstanceId != null;
            } else {
                return taskIdTemp.processDefinitionId != null;
            }
        },
        adjustImgPath() {
            if (this.flowNodeObj == null) return;
            let taskIdTemp = this.flowNodeObj.task;
            if (taskIdTemp.status == "1" || taskIdTemp.status == "4") {
                //1和4
                return `${this.$api.FlowImgPath.instance}/${
                    taskIdTemp.processInstanceId
                }`;
            } else {
                return `${this.$api.FlowImgPath.definitions}/${
                    taskIdTemp.processDefinitionId
                }`;
            }
        },
        reLoad() {
            this.$refs.flowFlow.initHeight();
            this.$refs.scroll.initScroll();
        },
        // 流程追踪
        operationSchedule() {
            this.$refs.flowSchedule.show();
            this.getreRuireData();
        },
        // 进度追踪列表
        getreRuireData() {
            if (!this.firstProdMember.prodId) {
                this.$message.error({ message: "请添加根产品！" });
                return;
            }

            this.$axios
                .get(this.$api.FlowScheduleList, {
                    params: {
                        objType: "2000",
                        objId: this.firstProdMember.prodId,
                        requirementId: this.componentData.requirementId
                    }
                })
                .then(res => {
                    if (res.data.success === true) {
                        if (res.data.traceList != null) {
                            this.flowScheduleData = res.data.traceList;
                        }
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                });
        },
        download() {
            this.$refs.download.show();
        },
        downLoadclick(item) {
            window.open(this.$api.Shtelpaasstorage + item.docLink);
        },
        show() {
            this.toggleFlag = !this.toggleFlag;
        },
        slide() {
            this.toggleFlag = !this.toggleFlag;
        },
        getNodeAndComponent() {
            if (
                !this.componentData.requirementId ||
                !this.firstProdMember.prodId
            ) {
                return;
            }

            this.$axios
                .get(this.$api.GetNodeAndComponent, {
                    params: {
                        objId: this.componentData.requirementId,
                        objType: "2000",
                        requirementId: this.componentData.requirementId,
                        userId: this.$user.getInfo().id
                    }
                })
                .then(res => {
                    if (res.data.success === true) {
                        this.flowNodeObj = res.data;
                        this.offOropen = res.data.task.fileUpload;
                        if (res.data.task.nodeName == "productSet") {
                            this.num = "3";
                        } else if (res.data.task.nodeName == "offerSetWrite") {
                            this.num = "2";
                        } else if (
                            res.data.task.nodeName == "assessCompAudit"
                        ) {
                            this.num = "100007";
                        } else if (
                            res.data.task.nodeName == "productOnlineAudit"
                        ) {
                            this.num = "100009";
                        } else {
                            this.num = "";
                        }
                        this.getNextFlow("1");
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                });
        },
        getNextFlow(completeOrReturn) {
            if (!this.firstProdMember.prodId) {
                return;
            }

            this.$axios
                .post(this.$api.TakeFlowSchedule, {
                    completeOrReturn: completeOrReturn,
                    requirementId: this.componentData.requirementId,
                    tasks: [
                        {
                            businessTypeCode: "product",
                            objId: this.firstProdMember.prodId,
                            objType: "2000",
                            taskId: this.flowNodeObj.task.taskId
                        }
                    ],
                    userId: this.$user.getInfo().id
                })
                .then(res => {
                    if (res.data.success === true) {
                        this.completeProdObj = res.data;
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                });
        },
        getNodeFile() {
            //获取附件类型
            this.$axios
                .get(this.$api.GetNodeFile, {
                    params: {
                        nodeName: this.flowNodeObj.task.nodeName,
                        processDefinitionId: this.flowNodeObj.task
                            .processDefinitionId
                    }
                })
                .then(res => {
                    if (res.data.success) {
                        this.fileList = res.data.nodeFiles;
                        this.fileType = this.fileList[0].fileTypeId;
                    }
                })
                .catch(err => {
                    // this.$message.error({ message: err.response.data.msg });
                });
        },
        completeProdSubmit() {
            let completeNextTaskList = this.completeProdObj.flowNextTaskDTOS.map(
                taskItem => {
                    return {
                        assignee: taskItem.defaultUser.userId,
                        elementId: taskItem.taskDefKey
                    };
                }
            );

            if (this.completeProdObj.flowNextTaskDTOS.length > 0) {
                this.$axios
                    .post(this.$api.HandleSub, {
                        assignee: this.$user.getInfo().id,
                        completeOrReturn: this.completeOrReturn,
                        tasks: [
                            {
                                businessTypeCode: "product",
                                comments: this.completeProdObj.comments,
                                nextTaskList: completeNextTaskList,
                                objId: this.componentData.requirementId,
                                objType: "2000",
                                requirementId: this.componentData.requirementId,
                                taskId: this.flowNodeObj.task.taskId
                            }
                        ]
                    })
                    .then(res => {
                        if (res.data.success === true) {
                            this.$message.success({ message: "审核成功！" });
                            this.$emit("componentView", "list");
                        } else {
                            this.$message.error({ message: res.data.msg });
                        }
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error.response.data.msg
                        });
                    });
            } else {
                this.$axios
                    .post(this.$api.HandleSub, {
                        assignee: this.$user.getInfo().id,
                        completeOrReturn: this.completeOrReturn,
                        tasks: [
                            {
                                businessTypeCode: "product",
                                comments: this.completeProdObj.comments,
                                nextTaskList: [],
                                objId: this.componentData.requirementId,
                                objType: "2000",
                                requirementId: this.componentData.requirementId,
                                taskId: this.flowNodeObj.task.taskId
                            }
                        ]
                    })
                    .then(res => {
                        if (res.data.success === true) {
                            this.$message.success({ message: "流程结束！" });
                            this.$emit("componentView", "list");
                        } else {
                            this.$message.error({ message: res.data.msg });
                        }
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error.response.data.msg
                        });
                    });
            }
        },
        globalback() {
            this.$emit("componentView", "list");
        },
        showDialog() {
            if (!this.firstProdMember.prodId) {
                this.$message.error({ message: "请添加产品！" });
                return;
            }
            this.getNodeAndComponent();
            this.getfileList("1");
            this.$refs.addfujian.show();
        },
        handleBack() {
            this.$refs.addfujian.hide();
        },
        getfileList(type) {
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
        requirementDocDownload(item) {
            window.open(this.$api.Shtelpaasstorage + item.docLink);
        },
        custUploadClick() {
            if (!this.fileType) {
                this.$message.error({ message: "请选择类型" });
                return;
            }
            this.$refs.fileRef.click();
        },
        custUploadChange(e) {
            if (this.componentData.requirementId) {
                if (e.target.files.length === 0) return;
                let files = Array.from(e.target.files);
                if (files[0].size > 0) {
                    let formData = new FormData();
                    formData.append("objId", this.componentData.requirementId);
                    formData.append("objType", "1001");
                    formData.append("center", "cpc");
                    formData.append("file", files[0]);
                    formData.append("docName", files[0].name);
                    formData.append("documentType", this.fileType);
                    formData.append('createStaff ', this.$user.getInfo().id);

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
            } else {
                if (e.target.files.length === 0) return;
                let files = Array.from(e.target.files);
                console.log(files);
                if (files[0].size > 0) {
                    let formData = new FormData();
                    formData.append("objId", this.sequence);
                    formData.append("objType", "1001");
                    formData.append("center", "cpc");
                    formData.append("file", files[0]);
                    formData.append("docName", files[0].name);
                    formData.append("documentType", this.fileType);
                    formData.append('createStaff ', this.$user.getInfo().id);

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
            }
        },
        deleteDoc(item) {
            if (this.componentData.requirementId) {
                this.$axios
                    .get(this.$api.DeleteDocumentRels, {
                        params: {
                            objId: item.objId,
                            objType: "1001",
                            docLink: item.documentId
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
                                        this.documentList =
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
                                });
                        } else {
                            this.$message.error({ message: "附件删除失败！" });
                        }
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error.response.data.msg
                        });
                    });
            } else {
                this.$axios
                    .get(this.$api.DeleteDocumentRels, {
                        params: {
                            objId: item.objId,
                            objType: "1001",
                            docLink: item.documentId
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
                                        objId: this.sequence,
                                        objType: "1001"
                                    }
                                })
                                .then(res => {
                                    if (res.data.success == true) {
                                        this.documentList =
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
                                });
                        } else {
                            this.$message.error({ message: "附件删除失败！" });
                        }
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error.response.data.msg
                        });
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.approval {
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    background-color: #f2f2f2;

    .basic-info {
        height: 100%;
        .main-box {
            height: 100%;
            padding: 0 20px;
            background-color: #fff;

            .a-v-title1 {
                height: 35px;
                line-height: 35px;
                text-align: right;
                padding-right: 20px;
                background-color: #fafafa;
                .p-t-block {
                    display: block;
                    width: 150px;
                    top: 0px;
                    text-align: center;
                    font-size: 12px;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                    color: #254063;
                    float: left;
                    z-index: 20;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    &.active {
                        height: 35px;
                        line-height: 32px;
                        top: 0px;
                        color: $mainColor;
                        border-top: 3px solid $mainColor;
                        background-color: #fff;
                        box-shadow: 1px -1px 1px 0px rgba(3, 0, 0, 0.09);
                    }
                    .iconfont {
                        font-size: 12px;
                    }
                    .t-b-count {
                        color: #ff8f04;
                    }
                }
                .fjsc {
                    position: absolute;
                    z-index: 10;
                    right: 120px;
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
                padding: 20px 20px 20px;
                &.active {
                    height: 60px;
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
        }
    }

    .prod-member {
        padding: 20px;
        min-height: 200px;
        margin-top: 10px;
        background-color: #fff;

        .content {
            padding: 20px;

            .c-title {
                width: 100%;
                height: 40px;
                line-height: 40px;
                font-weight: bold;
                border-bottom: 1px solid #f2f2f2;

                span {
                    display: inline-block;
                    height: 20px;
                    line-height: 20px;
                    padding-left: 8px;
                    border-left: 8px solid $mainColor;
                }
            }

            .c-step {
                text-align: center;
                background-color: #f2f2f2;
            }

            .c-step-result {
                text-align: center;
                color: $mainColor;

                .col {
                    border: {
                        style: solid;
                        width: 0 0 1px 1px;
                        color: #f2f2f2;
                    }

                    &:last-child {
                        border: {
                            style: solid;
                            width: 0 1px 1px 1px;
                            color: #f2f2f2;
                        }
                    }
                }
            }
        }

        .prodtype {
            display: inline-block;
            width: 18px;
            height: 18px;
            line-height: 18px;
            color: #fff;
            text-align: center;
            background: #d7d7d7;
            &.active {
                background: $mainColor;
            }
        }
    }

    .a-operation {
        width: 100%;
        padding: 20px;
        margin-top: 10px;
        background-color: #fff;

        .title {
            font-size: 18px;
            font-weight: bold;
            border-bottom: 1px solid #f2f2f2;

            .right-btn {
                float: right;
                .app__btn {
                    margin-right: 10px;
                }
            }
        }
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        border-top: 1px solid #f5f5f5;
        text-align: right;
        background-color: #fff;

        .btn {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding: 0 20px;
            margin-right: 10px;
            border-radius: 4px;
            cursor: pointer;
        }

        .submit {
            background-color: #ff9805;
            color: #fff;

            &:hover {
                opacity: 0.8;
            }
        }

        .back {
            background-color: #f5f6fa;
            color: #5b9cf5;

            &:hover {
                background-color: #5b9cf5;
                color: #fff;
            }
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

    .dialog-schedule {
        .operate-desc {
            display: inline-block;
            line-height: normal;
            vertical-align: middle;
        }
    }
}
</style>