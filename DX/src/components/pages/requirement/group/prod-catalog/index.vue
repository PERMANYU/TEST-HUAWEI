<template>
    <div class="prod-catalog">
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
                        <div v-if="flowFlag=='3'" class="app__btn app__btn-show" @click="backClick()">回退</div>
                        <div v-if="toggleFlag" class="app__btn app__btn-show" @click="show()">更多</div>
                        <div v-else class="app__btn app__btn-slide" @click="slide()">收起</div>
                    </div>
                </div>
                <div :class="['require-info',toggleFlag?'active':'']" ref="requirementInfoRef">
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="4">
                            <FormItem labelText="需求单编码：" small>
                                <span>{{requireForm.requirementCode}}</span>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="产品名称：" small>
                                <span>{{requireForm.requirementName}}</span>
                            </FormItem>
                            </Col>
                            <Col :span="5" :offset="1">
                            <FormItem labelText="业务管理部门产品经理：" small>
                                <span>{{requireForm.contName}}</span>
                            </FormItem>
                            </Col>
                            <Col :span="5" :offset="1">
                            <FormItem labelText="业务管理部门产品经理联系电话：" small>
                                <span>{{requireForm.contTele}}</span>
                            </FormItem>
                            </Col>
                        </Form>
                    </Row>
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="4">
                            <FormItem labelText="需求单类型：" small>
                                <span>{{requireForm.requestType == '10' ? '产品' : '销售品'}}</span>
                            </FormItem>
                            </Col>
                            <Col :span="7 " :offset="1 ">
                            <FormItem labelText="业务运营部门产品经理联系电话：" small>
                                <span>{{componentData.itTele}}</span>
                            </FormItem>
                            </Col>
                            <!-- <Col :span="7" :offset="1">
							<FormItem labelText="预期完工时间：" small>
								<span>{{requireForm.expectFinishDate | datetime}}</span>
							</FormItem>
							</Col> -->
                            <Col :span="5" :offset="1">
                            <FormItem labelText="业务管理部门：" small>
                                <span>{{requireForm.deptCode}}</span>
                            </FormItem>
                            </Col>
                            <Col :span="5" :offset="1">
                            <FormItem labelText="需求单功能类型：" small>
                                <span>{{requireForm.actType == "ADD"?"新增":requireForm.actType == "MOD"?"变更":"下架"}}</span>
                            </FormItem>
                            </Col>
                        </Form>
                    </Row>
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="24">
                            <FormItem labelText="产品概述：" small>
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
                        <span @click="deleteDoc(item)" v-show="item.documentType ? Number(item.documentType) >= num && item.documentType != 100007 && item.documentType != 100009 : false">
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
                <div class="content" v-if="prodMembers.length > 0">
                    <Row class="c-title">
                        <div class="app__title ">
                            <i class="iconfont icon-jibenxinxi"></i>
                            <span>需求单产品列表</span>
                        </div>
                        <div class="t-d-add">
                            <span class="app__btn app__btn-add" @click="addProd()">添加产品</span>
                        </div>
                    </Row>
                    <Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title">
                        <Row class="m-title app__table-thead">
                            <Col :span="5">产品编码</Col>
                            <Col :span="6">产品名称</Col>
                            <Col :span="3">最大值</Col>
                            <Col :span="3">最小值</Col>
                            <Col :span="3">默认值</Col>
                            <Col :span="4">操作</Col>
                        </Row>
                        <Row class="app__table-item" v-for="(item,index) in prodMembers" :key="index">
                            <Col :span="5">{{item.prodNbr}}</Col>
                            <Col :span="6">
                            <span :class="['prodtype',item.prodUseType == '1000' ? 'active' : '']">{{item.prodUseType == '1000' ? '主' : '附'}}</span>
                            {{item.prodName}}
                            </Col>
                            <Col :span="3">{{item.maxNum}}</Col>
                            <Col :span="3">{{item.minNum}}</Col>
                            <Col :span="3">{{item.defaultValue}}</Col>
                            <Col class="operation" :span="4">
                            <span @click="prodConfig(item)">配置</span>
                            <span v-if="item.parId != 0" @click="delProd(item)">删除</span>
                            </Col>
                        </Row>
                    </Scroll>
                </div>
                <div class="none-data" v-else>
                    <div class="icon">
                        <div class="i-name">当前暂无数据，请添加产品</div>
                        <div class="i-operation">
                            <span class="app__btn app__btn-confirm" @click="addProd()">添加产品</span>
                            <span class="app__btn app__btn-clear" @click="globalback">返回</span>
                        </div>
                    </div>
                </div>
            </div>

        </Scroll>

        <div class="footer">
            <span class="app__btn app__btn-clear" @click="globalback">返回</span>
        </div>

        <div class="right-menu">
            <div class="m-btn">工作流</div>

            <div class="m-operation">
                <div class="m-o-item" @click="operationFlow">
                    <span>流程查看</span>
                </div>
                <div class="m-o-item" @click="operationSchedule">
                    <span>进度追踪</span>
                </div>
                <div class="m-o-item" @click="getNextFlow">
                    <span>办结</span>
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
        <Dialog dialogTitle="添加产品" ref="addProdDialog" @confirm="addProdSubmit()">
            <Form data-vv-scope="prod" labelWidth="100px">
                <div class="add-prod-dialog">
                    <Row>
                        <Col :span="22" :offset="1">
                        <FormItem labelText="产品名称：" :requiredIcon="true" :errorMessage="errors.first('prod.prodName')">
                            <Input v-validate="'required'" name="prodName" v-model="prodBasic.prodName" data-vv-as="产品名称"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="22" :offset="1">
                        <FormItem labelText="产品描述：" :requiredIcon="true" :errorMessage="errors.first('prod.prodDesc')">
                            <Input v-validate="'required'" type="textarea" name="prodDesc" v-model="prodBasic.prodDesc" data-vv-as="产品描述"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="22" :offset="1">
                        <FormItem labelText="产品主附类型：" :requiredIcon="true" :errorMessage="errors.first('prod.prodUseType')">
                            <RadioGroup v-validate="'required'" :data="prodUseTypeArray" name="prodUseType" data-vv-as="产品主附类型" v-model="prodBasic.prodUseType"></RadioGroup>
                        </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
        </Dialog>

        <Dialog :dialogSize="dialogIpt" dialogTitle="办结" ref="completeProdDialog" @confirm="completeProdSubmit()">
            <div class="complete-prod-dialog">
                <Row>
                    <Col :span="7" v-for="(item,index) in completeProdObj.flowNextTaskDTOS" :key="index">
                    <div>
                        <span>下一环节：{{item.taskDefName}}</span>
                    </div>
                    <Select :data="item.candidateUsers" v-model="item.defaultUser" dataValueStr="userId" dataLabelStr="userName" :saveObject="true" :isNullSel="false"></Select>
                    </Col>
                </Row>
            </div>

        </Dialog>
        <!--流程查看-->
        <Dialog dialogTitle="流程查看" :dialogSize="flowFlowSize" ref="flowFlow" :showConfirmBtn="false">
            <Scroll :isShowRight="true" ref="scroll" class="flowstyle">
                <img :src="adjustImgPath()" @load="reLoad()">
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
                        <Col :title="item.operateDate" :span="5">{{item.operateDate}}</Col>
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
                        <span @click="deleteDoc(item)" v-show="item.documentType ? Number(item.documentType) >= num && item.documentType != 100007 && item.documentType != 100009 : false">
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
            <div slot="btnBox">
                <span class="back" @click="handleBack">返回</span>
            </div>
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
            flowFlag: "",
            requireForm: {},
            requireData: [],
            toggleFlag: false,
            documentList: [],
            tipInfo: {
                iconType: 1,
                msg: "",
                showBtn: {
                    clear: true,
                    save: true
                }
            },
            proType: "xqd",
            delProdId: "", //待删除产品Id
            prodArray: [],
            prodObj: {},
            prodBasic: {},
            prodMembers: [],
            typeDropArray: [
                {
                    label: "全部数据",
                    value: "drop1"
                },
                {
                    label: "子产品",
                    value: "drop2"
                },
                {
                    label: "捆绑产品",
                    value: "drop3"
                }
            ],
            nodeName: "",
            activatedData: null,
            flowNodeObj: null,
            completeProdObj: {},
            dialogSize: {
                size: 80,
                min: 800,
                max: 600
            },
            dialogIpt: {
                size: 80,
                min: 600,
                max: 700
            },
            fileList: [],
            fileType: "",
            offOropen: '',
            flowFlowSize: {
                size: 80,
                min: 900,
                max: 600
            },
            prodUseTypeArray: [
                {
                    label: "主产品",
                    value: "1000"
                },
                {
                    label: "附属产品",
                    value: "2000"
                }
            ], //产品分类
            firstProdMember: null, //最早的产品
            flowScheduleData: [], //追踪记录
            shrinkStyleObj: {
                height: "calc(100% - 95px)"
            },
            num: "3",
            fileZero: 0
        };
    },
    watch: {
        toggleFlag(val, old) {
            this.$nextTick(() => {
                let elRect = this.$refs.requirementInfoRef.getBoundingClientRect();
                console.log(elRect, "elRect");
                this.shrinkStyleObj.height = `calc(100% - ${elRect.height +
                    55}px)`;
            });
        },
        fileType(val, old) {
            let newArray = [];
            this.documentList.forEach(item => {
                newArray.push(Number(item.documentType));
            });
            if (newArray.includes(this.fileType)) {
                this.tipInfo.msg = `此类型附件已上传是否确定继续上传`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.tipInfo.iconType = 3;
                this.tipConfirmType = "fileType";
                this.$refs.tip.show();
            }
        },
        "flowNodeObj.task.nodeName"(old, newValue) {
            if (this.flowNodeObj.task.nodeName) {
                this.getNodeFile();
            }
        }
    },
    mounted() {
        this.activatedData = this.componentData;
        this.getProdMember();
        this.initData();
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
                    if( res.data.success ) {
                        this.prodMembers = res.data.products;
                        this.firstProdMember =
                        this.prodMembers.length > 0
                            ? this.prodMembers[this.prodMembers.length - 1]
                            : {};
                    }
                    this.getNodeAndComponent();
                })
                .catch(err => {
                    console.log(err);
                    this.$message.error({ message: err.response.data.msg });
                });
        },
        //流程查看
        operationFlow() {
            if (!this.firstProdMember.prodId) {
                this.$message.error({ message: "请添加产品！" });
                return;
            }

            if (!this.isExistFlow()) {
                this.$message.error({ message: "暂无流程！" });
                return;
            } else {
                this.$refs.flowFlow.show();
            }
        },
        isExistFlow() {
            if (this.flowNodeObj == null) return false;
            let taskIdTemp = this.flowNodeObj.task;
            console.log(taskIdTemp, "taskIdTemp");
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
            if (!this.firstProdMember.prodId) {
                this.$message.error({ message: "请添加产品！" });
                return;
            }
            this.$refs.flowSchedule.show();
            this.getreRuireData();
        },
        // 进度追踪列表
        getreRuireData() {
            this.$axios
                .get(this.$api.FlowScheduleList, {
                    params: {
                        objType: "2000",
                        objId: this.componentData.requirementId,
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
        requirementDocDownload(item) {
            window.open(this.$api.Shtelpaasstorage + item.docLink);
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
        // 需求单
        initData() {
            //获取详情
            this.$axios
                .get(
                    this.$api.replace(
                        this.$api.QureyRequirementTask,
                        ["{requirementId}"],
                        [this.componentData.requirementId]
                    ),
                    {
                        params: {
                            showMember: 1
                        }
                    }
                )
                .then(res => {
                    if (res.data.success === true) {
                        this.requireForm = res.data.requirementDetail;
                        this.requireData =
                            res.data.requirementDetail.memberList;
                        this.documentList =
                            res.data.requirementDetail.documentList;
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                });
        },
        backClick() {
            this.$refs.backDialog.show();
        },
        show() {
            this.toggleFlag = !this.toggleFlag;
        },
        slide() {
            this.toggleFlag = !this.toggleFlag;
        },
        download() {
            this.$refs.download.show();
        },
        downLoadclick(item) {
            window.open(this.$api.Shtelpaasstorage + item.docLink);
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
                    if (res.data.success == true) {
                        this.flowNodeObj = res.data;
                        this.offOropen = res.data.task.fileUpload;
                        if (res.data.task.nodeName == "productSet") {
                            this.num = 100001;
                        } else if (res.data.task.nodeName == "offerSetWrite") {
                            this.num = 100006;
                        } else {
                            this.num = "";
                        }
                        this.nodeName = res.data.task.nodeName;
                        this.getNextFlow("1");
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
                    this.$message.error({ message: err.response.data.msg });
                });
        },
        globalback() {
            this.$emit("componentView", "list");
        },
        addProd() {
            this.prodBasic = {};
            this.$refs.addProdDialog.show();
        },
        addProdSubmit() {
            this.$validator.validateAll("prod").then(result => {
                if (result) {
                    this.$axios
                        .post(this.$api.AddRequirementProduct, {
                            prodName: this.prodBasic.prodName,
                            prodDesc: this.prodBasic.prodDesc,
                            requirementId: this.componentData.requirementId,
                            parProdId: this.prodBasic.parProdId,
                            manageGrade: "11",
                            prodUseType: this.prodBasic.prodUseType,
                            prodCompType: "10",
                            staff: this.$user.getInfo().id
                        })
                        .then(res => {
                            if (res.data.success) {
                                this.$message.success({
                                    message: '新增成功'
                                });
                                this.$refs.addProdDialog.hide();
                                this.getProdMember();
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
            });
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
        prodConfig(item) {
            item.requirementId = this.componentData.requirementId;
            this.$emit("componentView", "product", item);
        },
        delProd(item) {
            //删除产品
            this.delProdId = item.prodId;
            this.tipInfo.iconType = 3;
            this.tipInfo.msg = "确认要删除选择的记录吗？";
            this.tipInfo.showBtn.clear = true;
            this.tipInfo.showBtn.save = true;
            this.tipConfirmType = "delProd";
            this.$refs.tip.show();
        },
        tipConfirm() {
            if (this.tipConfirmType == "delProd") {
                this.$axios
                    .delete(
                        this.$api.replace(
                            this.$api.DelRequirementProduct,
                            ["{requirementId}"],
                            [this.componentData.requirementId]
                        ),
                        {
                            params: {
                                memberId: this.delProdId,
                                staff: this.$user.getInfo().id
                            }
                        }
                    )
                    .then(res => {
                        if (res.data.success == true) {
                            this.$refs.tip.hide();
                            this.$message.success({ message: "删除成功" });
                            this.getProdMember();
                        } else {
                            this.$message.error({ message: res.data.msg });
                        }
                    })
                    .catch(error => {
                        this.$message.error({ message: "删除失败" });
                    });
            } else if (this.tipConfirmType == "fileType") {
                this.$refs.tip.hide();
            }
        },
        getNextFlow(typ) {
            if (!this.firstProdMember.prodId) {
                this.$message.error({ message: "请添加产品！" });
                return;
            }

            this.$axios
                .post(this.$api.TakeFlowSchedule, {
                    completeOrReturn: "1",
                    requirementId: this.componentData.requirementId,
                    tasks: [
                        {
                            businessTypeCode: "product",
                            objId: this.componentData.requirementId,
                            objType: "2000",
                            taskId: this.flowNodeObj.task.taskId
                                ? this.flowNodeObj.task.taskId
                                : this.completeProdObj.taskId
                        }
                    ],
                    userId: this.$user.getInfo().id
                })
                .then(res => {
                    if (res.data.success === true) {
                        this.completeProdObj = res.data;
                        if (typ != "1") {
                            this.$refs.completeProdDialog.show();
                        }
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                });
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
        showDialog() {
            if (!this.firstProdMember.prodId) {
                this.$message.error({ message: "请添加产品！" });
                return;
            }
            this.getNodeAndComponent();
            this.getfileList();
            this.$refs.addfujian.show();
        },
        handleBack() {
            this.$refs.addfujian.hide();
        },
        completeProdSubmit() {
            console.log(
                this.flowNodeObj.task.taskId,
                this.completeProdObj.taskId
            );
            let completeNextTaskList = this.completeProdObj.flowNextTaskDTOS.map(
                taskItem => {
                    return {
                        assignee: taskItem.defaultUser.userId,
                        elementId: taskItem.taskDefKey
                    };
                }
            );

            this.$axios
                .post(this.$api.HandleSub, {
                    assignee: this.$user.getInfo().id,
                    completeOrReturn: "1",
                    tasks: [
                        {
                            businessTypeCode: "product",
                            comments: this.completeProdObj.comments,
                            nextTaskList: completeNextTaskList,
                            objId: this.firstProdMember.prodId,
                            objType: "2000",
                            requirementId: this.componentData.requirementId,
                            taskId: this.completeProdObj.taskId
                                ? this.completeProdObj.taskId
                                : this.flowNodeObj.task.taskId
                        }
                    ]
                })
                .then(res => {
                    if (res.data.success === true) {
                        this.$message.success({ message: "提交成功！" });
                        this.$emit("componentView", "list");
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(error => {
                    this.$refs.completeProdDialog.hide();
                    this.$message.error({ message: error.response.data.msg });
                });
        }
    }
};
</script>

<style scoped lang="scss">
.prod-catalog {
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    overflow: hidden;

    .basic-info {
        height: 100%;

        .main-box {
            padding: 0 20px;
            border-bottom: 5px solid #f6f7f9;

            .a-v-title1 {
                height: 35px;
                line-height: 35px;
                text-align: right;
                padding-right: 20px;
                background-color: #fafafa;
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
        .a-operation {
            width: 100%;
            padding: 20px;
            margin-top: 10px;
            background-color: #fff;

            &.no-top {
                margin-top: 0;
            }

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
    }
    .t-d-add {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 30px;

        .app__btn-add {
            margin-right: 10px;
        }
    }

    .left-scroll {
        padding: 10px 0 !important;
    }

    .content {
        width: 100%;
        height: 100%;
        padding: 50px 20px 0;

        .c-title {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding-left: 20px;
            .app__title {
                text-indent: 30px;
            }
        }

        .type-drop {
            /deep/ span {
                font-size: 16px;
            }
        }

        .a-c-prod {
            color: $mainColor;
            cursor: pointer;
        }

        .model-prod {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            margin-top: 5px;
            padding: 0 20px 0 10px;
            border: 1px solid #f5f5f5;
            border-radius: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            .m-p-close {
                position: absolute;
                display: block;
                width: 12px;
                height: 12px;
                top: 9px;
                right: 5px;
                cursor: pointer;
                background: url(./images/cur_prod_close.png) no-repeat center;

                &:hover {
                    background: url(./images/cur_prod_close_hover.png) no-repeat
                        center;
                }
            }
        }

        .operation {
            color: $mainColor;

            span {
                cursor: pointer;
                margin-left: 5px;
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

    .none-data {
        width: 100%;
        height: 100%;
        padding-top: 150px;
        text-align: center;

        .icon {
            display: inline-block;
            width: 250px;
            padding-top: 90px;
            background-image: url(./images/none.png);
            background-repeat: no-repeat;
            background-position: center top;

            .i-name {
                height: 30px;
                line-height: 30px;
                font-size: 16px;
                font-weight: bold;
                white-space: nowrap;
            }

            .i-operation {
                width: 100%;
                margin-top: 10px;

                .app__btn {
                    width: 110px;
                }

                .app__btn-confirm {
                    float: left;
                }

                .app__btn-clear {
                    float: right;
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
        line-height: 49px;
        padding: 0 20px;
        border-top: 1px solid #f5f5f5;
        text-align: right;
        background-color: #fff;
    }

    .add-prod-dialog {
        padding: 20px;
    }

    .right-menu {
        position: absolute;
        display: table;
        width: 40px;
        height: 100%;
        top: 0;
        right: -40px;
        background-color: #fff;
        border-left: 1px solid #f2f2f2;
        transition: 0.3s all ease;
        box-shadow: 1px 0 6px #c2d4ee;
        z-index: 999;

        &:hover {
            right: 0;
        }

        .m-btn {
            position: absolute;
            width: 20px;
            height: 50px;
            left: -20px;
            top: calc(50% - 25px);
            cursor: pointer;
            text-align: center;
            color: #fff;
            background-color: $mainColor;
        }

        .m-operation {
            display: table-cell;
            width: 40px;
            height: 100%;
            vertical-align: middle;
            transition: 0.3s all ease;

            .m-o-item {
                height: 50px;
                line-height: 50px;
                padding: 0 5px;
                text-align: center;
                cursor: pointer;

                &:hover {
                    color: #fff;
                    background-color: $mainColor;
                }

                span {
                    display: inline-block;
                    line-height: normal;
                    vertical-align: middle;
                }
            }
        }
    }

    .complete-prod-dialog {
        padding: 40px;
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